import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { compare, hash } from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const user = await this.userService.findOne(registerDto.username);

    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await hash(registerDto.password, 10);

    await this.userService.createUser({
      ...registerDto,
      password: hashedPassword,
    });

    return {
      message: 'User has been created successfully',
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.findOne(loginDto.username);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const isValidPassword = await compare(loginDto.password, user.password);

    if (!isValidPassword) {
      throw new HttpException('Incorrect password', HttpStatus.BAD_REQUEST);
    }

    const payload = {
      sub: user.id,
      username: user.username,
    };

    return {
      message: 'User has been logged in successfully',
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
