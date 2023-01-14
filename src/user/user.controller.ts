import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { Delete, Get } from '@nestjs/common/decorators';
import { DeleteResult, UpdateResult } from 'typeorm';
import { EntityId } from 'typeorm/repository/EntityId';
import { UserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  createUser(@Body() user: UserDto): Promise<UserDto> {
    return this.userService.save(user);
  }
  @Put(':id')
  updateUserById(
    @Param('id') id: EntityId,
    @Body() user: UserDto,
  ): Promise<UpdateResult> {
    return this.userService.updateById(id, user);
  }
  @Get(':id')
  getUserById(@Param('id') id: EntityId): Promise<UserDto> {
    return this.userService.findById(id);
  }
  @Delete(':id')
  deleteUserById(@Param('id') id: EntityId): Promise<DeleteResult> {
    return this.userService.deleteById(id);
  }
}
