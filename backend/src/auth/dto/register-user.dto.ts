import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength, IsEnum } from 'class-validator';
import { UserRole } from '../../entities/user.entity';

export class RegisterUserDto {

  @ApiProperty({example: 'User 1', description: 'Nombre de usuario'})
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  name: string;

  @ApiProperty({example: 'usuario123', description: 'Nombre de usuario único'})
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  login: string;

  @ApiProperty({ example: 'password123', description: 'Contraseña del usuario' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'client', enum: UserRole, description: 'Rol del usuario' })
  @IsEnum(UserRole)
  role: UserRole;
}
