import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from '../entities/user.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Registrar un nuevo usuario' })
  @ApiResponse({ status: 201, description: 'Usuario registrado exitosamente', type: User })
  @ApiResponse({ status: 400, description: 'El usuario ya existe' })
  async register(@Body() registerUserDto: RegisterUserDto): Promise<User> {
    return this.authService.register(registerUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Autenticación de usuario' })
  @ApiResponse({
    status: 200,
    description: 'Usuario autenticado exitosamente',
    schema: {
      example: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciales incorrectas',
    schema: {
      example: {
        statusCode: 401,
        message: 'Credenciales incorrectas',
        error: 'Unauthorized',
      },
    },
  })
  @ApiBody({
    description: 'Credenciales del usuario',
    schema: {
      example: {
        login: 'usuario@example.com',
        password: 'ContraseñaSegura123',
      },
    },
  })
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }
}
