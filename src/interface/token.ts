import { ApiProperty } from '@nestjs/swagger';
import { JwtPayload } from 'jsonwebtoken';

export class IdInfo {
  @ApiProperty({ description: '유효기한 30일의 JWT' })
  accessToken: string;

  @ApiProperty({ description: 'accessToken 갱신을 위한 유효기한 180일의 JWT' })
  refreshToken: string;
}

export interface AccessTokenPayload extends JwtPayload {
  verified: boolean;
}

export interface RefreshTokenPayload extends JwtPayload {
  accessToken: string;
}

export interface AdminAuthorizingTokenPayload extends AccessTokenPayload {
  email: string;
  otp: string;
}

export interface AdminAccessTokenPayload extends AccessTokenPayload {
  email: string;
}

export interface AdminRefreshTokenPayload extends RefreshTokenPayload {
  email: string;
}

export interface MemberAuthorizingTokenPayload extends AccessTokenPayload {
  countryCode: number;
  phoneNum: string;
  authCode: string;
}

export interface MemberAccessTokenPayload extends AccessTokenPayload {
  id: number;
}

export interface MemberRefreshTokenPayload extends RefreshTokenPayload {
  id: number;
}
export type AllowedPayload =
  | AdminAccessTokenPayload
  | AdminAuthorizingTokenPayload
  | AdminRefreshTokenPayload
  | MemberAccessTokenPayload
  | MemberAuthorizingTokenPayload
  | MemberRefreshTokenPayload;
