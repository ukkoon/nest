import { ApiProperty } from '@nestjs/swagger';

export class GeocodeRequestDto {
  @ApiProperty({
    description: '주소',
    example: '서울시 강남구 대치동 893',
  })
  address: string;
}

export class ReverseGeocodeResponseDto {
  @ApiProperty({ description: '주소' })
  address: string;

  @ApiProperty({ description: '서울/경기 등 대단위 행정구역' })
  area1: string;

  @ApiProperty({ description: '강남구/성동구 등 중단위 행정구역' })
  area2: string;

  @ApiProperty({ description: '대치동/성수동 등 소단위 행정구역' })
  area3?: string;

  @ApiProperty({ description: '면/리 등 최소단위 행정구역' })
  area4?: string;
}

export class GeocodeResponseDto {
  @ApiProperty({ description: '위도' })
  latitude: number;
  @ApiProperty({ description: '경도' })
  longitude: number;

  @ApiProperty({ description: 'Reverse Geocoded Data' })
  reverseGeocodingData: ReverseGeocodeResponseDto;
}

export class ReverseGeocodeRequestDto {
  @ApiProperty({ description: '위도' })
  latitude: number;
  @ApiProperty({ description: '경도' })
  longitude: number;
}
