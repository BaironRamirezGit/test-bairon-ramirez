import { IsNumber, IsOptional, IsString, IsArray } from 'class-validator';

export class CreateOrderDto {
  @IsArray()
  @IsNumber({}, { each: true }) // Cada elemento debe ser un número (IDs de productos)
  productIds: number[];

  @IsOptional()
  @IsString()
  notes?: string;
}
