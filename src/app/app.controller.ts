import {
  Controller,
  Get,
  Query,
  UseFilters
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';
import { AllExceptionFilter } from 'src/others/exception_filter';
import { AppService } from './app.service';
import {
  GeocodeRequestDto,
  GeocodeResponseDto,
  ReverseGeocodeRequestDto,
  ReverseGeocodeResponseDto,
} from './dtos/geocode_dto';

@ApiTags('일반 API')
@Controller('/')
@UseFilters(AllExceptionFilter)
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) { }

  @ApiOperation({
    summary: 'status check path',
  })
  @ApiCreatedResponse({
    description: 'status code',
    type: Number,
  })
  @Get('')
  async status(): Promise<number> {
    return 200;
  }

  @ApiOperation({
    summary: '지오코딩 (주소->위·경도)',
  })
  @ApiCreatedResponse({
    description: '해당 주소의 위·경도 정보를 반환받습니다.',
    type: GeocodeResponseDto,
  })
  @Get('geocode')
  async geocode(
    @Query() query: GeocodeRequestDto,
  ): Promise<GeocodeResponseDto> {
    return await this.appService.geocode(query);
  }

  @ApiOperation({
    summary: '리버스 지오코딩 (위·경도->주소)',
  })
  @ApiCreatedResponse({
    description: '해당 위·경도의 주소 정보를 반환받습니다.',
    type: String,
  })
  @Get('geocode/reverse')
  async reverseGeocode(
    @Query() query: ReverseGeocodeRequestDto,
  ): Promise<ReverseGeocodeResponseDto> {
    return await this.appService.reverseGeocode(query);
  }
}
