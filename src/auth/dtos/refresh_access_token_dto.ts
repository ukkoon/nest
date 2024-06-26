import { ApiProperty } from '@nestjs/swagger';

export class RefreshAccessTokenRequestDto {
  @ApiProperty({ description: 'refreshToken' })
  refreshToken: string;
}

export class RefreshAccessTokenResponseDto {
  @ApiProperty({ description: 'accessToken' })
  accessToken: string;

  @ApiProperty({ description: 'refreshToken' })
  refreshToken: string;
}
