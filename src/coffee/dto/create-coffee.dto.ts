import { IsString, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class TagDto {
  @IsString()
  nome: string;
}

export class CreateCoffeeDto {
  @IsString()
  nome: string;

  @IsString()
  tipo: string;

  @IsNumber()
  preco: number;

  @IsString()
  descricao: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TagDto)
  tags: TagDto[];
}