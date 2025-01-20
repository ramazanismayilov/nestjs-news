import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/User.entity';
import { Repository } from 'typeorm';
import { AuthRegisterDto } from './dto/auth-register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
  ) {}

  async register(params: AuthRegisterDto) {
    const checkUsername = await this.userRepo.findOne({
      where: { username: params.username },
    });
    if (checkUsername)
      throw new ConflictException('Username is already exists');

    const user = this.userRepo.create(params);
    await user.save();

    return user;
  }
}
