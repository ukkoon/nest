import {
  HttpException,
  HttpStatus,
  Injectable,
  Query
} from '@nestjs/common';
import { fetch } from 'cross-fetch';
import {
  invalidGeocodeParamsError
} from 'src/others/custom_errors';

import 'src/config';
import {
  GeocodeRequestDto,
  GeocodeResponseDto,
  ReverseGeocodeRequestDto,
  ReverseGeocodeResponseDto,
} from './dtos/geocode_dto';

@Injectable()
export class AppService {
  naverApiHost = 'https://naveropenapi.apigw.ntruss.com';

  async geocode(
    @Query() query: GeocodeRequestDto,
  ): Promise<GeocodeResponseDto> {
    const apiPath = 'map-geocode/v2/geocode';

    try {
      const response = await fetch(
        `${this.naverApiHost}/${apiPath}?query=${encodeURI(query.address)}`,
        {
          method: 'GET',
          headers: {
            'X-NCP-APIGW-API-KEY-ID': process.env.NAVER_API_KEY_ID,
            'X-NCP-APIGW-API-KEY': process.env.NAVER_API_KEY,
          },
        },
      );

      const responseJson = await response.json();


      if (responseJson.status == 'OK' && responseJson.meta.totalCount > 0) {
        const latitude = responseJson.addresses[0].y;
        const longitude = responseJson.addresses[0].x;

        const reverseGeocodingData = await this.reverseGeocode({
          latitude,
          longitude,
        });

        return {
          latitude,
          longitude,
          reverseGeocodingData,
        };
      } else throw Error();
    } catch (e) {
      throw new HttpException(
        invalidGeocodeParamsError,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async reverseGeocode(
    @Query() query: ReverseGeocodeRequestDto,
  ): Promise<ReverseGeocodeResponseDto> {
    const apiPath = 'map-reversegeocode/v2/gc';

    try {
      const response = await fetch(
        `${this.naverApiHost}/${apiPath}?coords=${query.longitude},${query.latitude}&output=json&orders=addr`,
        {
          method: 'GET',
          headers: {
            'X-NCP-APIGW-API-KEY-ID': process.env.NAVER_API_KEY_ID,
            'X-NCP-APIGW-API-KEY': process.env.NAVER_API_KEY,
          },
        },
      );
      const responseJson = await response.json();

      if (responseJson.status.name == 'ok' && responseJson.results.length > 0) {
        const target = responseJson.results[0];

        const area1 = target.region.area1.name;
        const area2 = target.region.area2.name;
        const area3 = target.region.area3.name ?? '';
        const area4 = target.region.area4.name ?? '';
        const number1 = target.land.number1;
        const number2 = Boolean(target.land.number2)
          ? `-${target.land.number2}`
          : '';

        return {
          address: `${area1} ${area2} ${area3} ${area4} ${number1}${number2}`,
          area1: area1,
          area2: area2,
          area3: area3,
          area4: area4,
        };
      } else throw Error();
    } catch (e) {
      throw new HttpException(
        invalidGeocodeParamsError,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
