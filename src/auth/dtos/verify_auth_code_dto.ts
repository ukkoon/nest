import { ApiProperty } from '@nestjs/swagger';

export class VerifyAuthCodeRequestDto {
  @ApiProperty({ description: '인증번호' })
  authCode: string;

  @ApiProperty({ description: '인증번호 발송시 반환받은 JWT' })
  jwt: string;
}
