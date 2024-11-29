import { ApiProperty } from '@nestjs/swagger';

export class StatisticCarResDto {
  @ApiProperty({
    example: '0',
    description: 'The views of the Car',
  })
  public readonly views: number;

  @ApiProperty({
    example: '0',
    description: 'The views of the Car for week',
  })
  public readonly viewsForWeek: number;

  @ApiProperty({
    example: '0',
    description: 'The views of the Car for month',
  })
  public readonly viewsForMonth: number;

  @ApiProperty({
    example: '0',
    description: 'The views of the Car for year',
  })
  public readonly viewsForYear: number;

  @ApiProperty({
    example: '0',
    description: 'The avg price of the Car',
  })
  public readonly avgPrice: number;

  @ApiProperty({
    example: '0',
    description: 'The avg price of the Car by region',
  })
  public readonly avgPriceByRegion: number;
}
