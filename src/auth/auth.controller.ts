import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { SendAuthCodeRequestDto } from 'src/auth/dtos/send_auth_code_dto';
import { AllExceptionFilter } from '../others/exception_filter';
import { AuthService } from './auth.service';
import {
  RefreshAccessTokenRequestDto,
  RefreshAccessTokenResponseDto,
} from './dtos/refresh_access_token_dto';
import { VerifyAuthCodeRequestDto } from './dtos/verify_auth_code_dto';

@ApiTags('(공통)인증 API')
@UseFilters(AllExceptionFilter)
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: '휴대폰 번호 인증문자 발송',
    description:
      '주어진 휴대폰 번호로 인증코드를 보내고 인증되지 않은 JWT를 반환받습니다. (개발하는 동안에는 인증번호로 123456를 이용하세요.)',
  })
  @ApiCreatedResponse({
    description: '인증되지 않은 JWT를 반환받습니다. (3분 유효)',
    type: String,
  })
  @Post('auth-code/send')
  async sendAuthCode(
    @Body()
    body: SendAuthCodeRequestDto,
  ): Promise<string> {
    return this.authService.sendAuthCode(body);
  }

  @ApiOperation({
    summary: '휴대폰 번호 인증',
    description: '주어진 인증번호와 JWT로부터 휴대폰 번호를 인증합니다.',
  })
  @ApiCreatedResponse({
    description:
      '휴대폰 번호가 인증된 JWT입니다(30분 유효). 계정 가입과 계정 찾기 등에 이용할 수 있습니다.',
    type: String,
  })
  @Post('auth-code/verify')
  async verifyAuthCode(
    @Body() body: VerifyAuthCodeRequestDto,
  ): Promise<string> {
    return this.authService.verifyAuthCode({
      authCode: body.authCode,
      jwt: body.jwt,
    });
  }

  @ApiOperation({
    summary: 'accessToken 갱신',
    description:
      '주어진 refreshToken을 이용해 accessToken과 refreshToken을 갱신합니다.',
  })
  @ApiCreatedResponse({
    description: 'accessToken과 refreshToken을 반환받습니다.',
    type: RefreshAccessTokenResponseDto,
  })
  @Post('refresh-access-token')
  async refreshAccessToken(
    @Body() body: RefreshAccessTokenRequestDto,
  ): Promise<RefreshAccessTokenResponseDto> {
    return this.authService.refreshAccessToken(body);
  }
}
