import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import 'src/config';
import {
  failToAuthError,
  invalidPhoneNumError,
  invalidTokenError,
  notRegisteredError,
  tokenExpiredError,
} from 'src/others/custom_errors';
import { isValidPhoneNum } from 'src/util';
import {
  ACCESS_TOKEN_EXP_IN,
  REFRESH_TOKEN_EXP_IN,
  SIGNUP_TOKEN_EXP_IN,
  VERIFIED_SIGNUP_TOKEN_EXP_IN,
} from '../constants';
import {
  AllowedPayload,
  MemberAccessTokenPayload,
  MemberAuthorizingTokenPayload,
  MemberRefreshTokenPayload,
} from '../interface/token';
import {
  RefreshAccessTokenRequestDto,
  RefreshAccessTokenResponseDto,
} from './dtos/refresh_access_token_dto';
import { SendAuthCodeRequestDto } from './dtos/send_auth_code_dto';
import { VerifyAuthCodeRequestDto } from './dtos/verify_auth_code_dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async sendAuthCode(params: SendAuthCodeRequestDto): Promise<string> {
    if (!isValidPhoneNum(params.phoneNum)) {
      throw new HttpException(invalidPhoneNumError, HttpStatus.BAD_REQUEST);
    }

    /**
     * 인증번호 할당
     */
    // let authcode = generateAuthcode(args.phonenum)

    const authCode = '123456';
    /**
     * 실제 인증번호 발송
     */
    // var contents = `휴대폰인증 인증번호는 [${authcode}]입니다.`
    // await ctx.popbill.sendSms({ text: contents, to: args.phonenum })

    const jwt = this.jwtService.sign(
      {
        countryCode: params.countryCode,
        phoneNum: params.phoneNum,
        authCode: authCode,
        verified: false,
      } as MemberAuthorizingTokenPayload,
      { expiresIn: SIGNUP_TOKEN_EXP_IN },
    );

    return jwt;
  }

  async verifyAuthCode(params: VerifyAuthCodeRequestDto): Promise<string> {
    let payload: AllowedPayload;

    try {
      payload = this.jwtService.verify(params.jwt);
    } catch (e) {
      if (e.name == 'TokenExpiredError')
        throw new HttpException(tokenExpiredError, HttpStatus.UNAUTHORIZED);
      else throw new HttpException(invalidTokenError, HttpStatus.UNAUTHORIZED);
    }

    if (payload.authCode !== params.authCode) {
      throw new HttpException(failToAuthError, HttpStatus.UNAUTHORIZED);
    }

    const verifiedJwt = this.jwtService.sign(
      {
        countryCode: payload.countryCode,
        phoneNum: payload.phoneNum,
        type: payload.type,
        authCode: payload.authCode,
        verified: true,
      },
      { expiresIn: VERIFIED_SIGNUP_TOKEN_EXP_IN },
    );

    return verifiedJwt;
  }

  async refreshAccessToken(
    params: RefreshAccessTokenRequestDto,
  ): Promise<RefreshAccessTokenResponseDto> {
    const isValidAccount = true;
    let refreshTokenPayload: AllowedPayload;

    try {
      refreshTokenPayload = this.jwtService.verify(params.refreshToken);
    } catch (e) {
      if (e.name == 'TokenExpiredError')
        throw new HttpException(tokenExpiredError, HttpStatus.UNAUTHORIZED);
      else throw new HttpException(invalidTokenError, HttpStatus.UNAUTHORIZED);
    }
    if (!isValidAccount) {
      throw new HttpException(
        notRegisteredError,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const accessToken = this.jwtService.sign(
      {
        id: refreshTokenPayload.id,
        countryCode: refreshTokenPayload.countryCode,
        phoneNum: refreshTokenPayload.phoneNum,
        type: refreshTokenPayload.type,
        verified: true,
      } as MemberAccessTokenPayload,
      { expiresIn: ACCESS_TOKEN_EXP_IN },
    );

    const refreshToken = this.jwtService.sign(
      {
        id: refreshTokenPayload.id,
        countryCode: refreshTokenPayload.countryCode,
        phoneNum: refreshTokenPayload.phoneNum,
        type: refreshTokenPayload.type,
        accessToken: accessToken,
      } as MemberRefreshTokenPayload,
      {
        expiresIn: REFRESH_TOKEN_EXP_IN,
      },
    );
    return { accessToken, refreshToken };
  }
}
