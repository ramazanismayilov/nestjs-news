import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/User.entity';
import { Repository } from 'typeorm';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginDto } from './dto/auth-login.dto';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
  ) {}

  async login(params: AuthLoginDto) {
    const user = await this.userRepo.findOne({
      where: { username: params.username },
    });
    if (!user) throw new UnauthorizedException('User or password is wrong');

    const checkPassword = await compare(params.password, user.password);
    if (!checkPassword)
      throw new UnauthorizedException('User or password is wrong');

    const token = this.jwtService.sign({ userId: user.id });

    return {
      message: 'Login is successfully',
      user: {
        ...user,
        password: undefined,
      },
      token,
    };
  }

  async register(params: AuthRegisterDto) {
    const checkUsername = await this.userRepo.findOne({
      where: { username: params.username },
    });
    if (checkUsername)
      throw new ConflictException('Username is already exists');

    const user = this.userRepo.create(params);
    await user.save();

    return {
      message: 'Register is successfully',
      user,
    };
  }
}
