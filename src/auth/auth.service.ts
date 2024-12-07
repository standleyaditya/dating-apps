import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
// import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  async signup(createUserDto: CreateUserDto): Promise<any> {
    const emailExist = await this.usersService.findByEmail(createUserDto.email);
    // console.log(emailExist);
    if (emailExist) {
      return { message: 'Email Already Registered' };
    } else {
      createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
      const user = await this.usersService.create(createUserDto);
      return { message: 'User Created', user };
    }
  }

  async login(loginDto: LoginDto): Promise<any> {
    const { email, password } = loginDto;
    const user = await this.usersService.findByEmail(email);
    const cachedData = await this.cacheService.get<{ token: string }>(
      user.user_id,
    );
    if (cachedData) {
      return { message: 'Already Login' };
    }
    if (!user) {
      return { message: 'Invalid credentials' };
    } else {
      const result = await bcrypt.compare(password, user.password);
      if (result) {
        const payload = { email: user.email, sub: user.user_id };
        const token = this.jwtService.sign(payload);
        await this.cacheService.set(user.user_id.toString(), token);
        // const cachedData = await this.cacheService.get(id.toString());
        return { message: 'Login successful', token };
      } else {
        return { message: 'Invalid Password' };
      }
    }
  }

  async signOut(): Promise<any> {
    return { message: 'User signed out successfully' };
  }
}
