import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { EntityId } from 'typeorm/repository/EntityId';
import { UserDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async deleteById(id: EntityId): Promise<import('typeorm').DeleteResult> {
    return await this.userRepository.softDelete(id);
  }

  async findById(id: EntityId): Promise<UserDto> {
    const foundResult = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    return plainToInstance(UserDto, foundResult, {
      excludeExtraneousValues: true,
    });
  }

  async updateById(
    id: EntityId,
    user: UserDto,
  ): Promise<import('typeorm').UpdateResult> {
    delete user.fullName;
    return await this.userRepository.update(id, user);
  }

  async save(user: UserDto): Promise<UserDto> {
    const saveResult = await this.userRepository.save(user);
    return plainToInstance(UserDto, saveResult, {
      excludeExtraneousValues: true,
    });
  }
}
