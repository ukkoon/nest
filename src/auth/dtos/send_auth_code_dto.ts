import { ApiProperty } from '@nestjs/swagger';

export class SendAuthCodeRequestDto {
  @ApiProperty({ description: '국가번호', default: 82 })
  countryCode?: number;

  @ApiProperty({ description: '휴대폰 번호' })
  phoneNum: string;
}
