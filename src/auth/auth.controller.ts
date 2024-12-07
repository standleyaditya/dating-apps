import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(200)
  async signup(@Body() createUserDto: CreateUserDto) {
    // Use UsersService to create a new user
    try {
      const user = await this.authService.signup(createUserDto);
      if (!user.user) {
        return {
          responseCode: '400',
          message: user.message,
          data: {},
        };
      } else {
        return {
          responseCode: '200',
          message: user.message,
          user: {
            id: user.user.user_id,
            username: user.user.username,
            email: user.user.email,
          },
        };
      }
    } catch (error) {
      return {
        responseCode: '500',
        message: error.message,
        data: {},
      };
    }
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginDto: LoginDto) {
    try {
      const loginData = await this.authService.login(loginDto);
      if (!loginData.token) {
        return {
          responseCode: '400',
          message: loginData.message,
          data: {},
        };
      }

      return {
        responseCode: '200',
        message: loginData.message,
        data: loginData.token,
      };
    } catch (error) {
      return {
        responseCode: '500',
        message: error.message,
        data: {},
      };
    }
  }

  @Post('signout')
  @HttpCode(200)
  async signOut() {
    return this.authService.signOut();
  }
}
