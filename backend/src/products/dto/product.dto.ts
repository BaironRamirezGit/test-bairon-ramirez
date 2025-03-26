import { IsString, IsNumber, IsOptional, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ description: 'Nombre del producto', example: 'Laptop Gamer' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Precio del producto', example: 1500 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiPropertyOptional({ description: 'Descripción del producto', example: 'Una laptop de alto rendimiento' })
  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateProductDto {
  @ApiPropertyOptional({ description: 'Nuevo nombre del producto', example: 'PC de escritorio' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'Nuevo precio del producto', example: 1200 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @ApiPropertyOptional({ description: 'Nueva descripción del producto', example: 'Un PC con gran capacidad de procesamiento' })
  @IsOptional()
  @IsString()
  description?: string;
}
