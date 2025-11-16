import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { PasswordService } from 'src/common/password/password.service';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>, private passwordService: PasswordService) { }

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create()
    user.username = createUserDto.username
    user.password = await this.passwordService.hashPassword(createUserDto.username)
    return this.userRepository.save(user)
  }

  findAll() {
    return this.userRepository.find()
  }

  findOne(id: number) {
    return this.userRepository.findOneById(id)
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneById(id)
    if (!user) {
      throw new NotFoundException(`User with id: ${id} not found.`)
    }

    if (updateUserDto.password) {
      user.password = await this.passwordService.hashPassword(updateUserDto.password)
    }
    if (updateUserDto.username) {
      user.username = updateUserDto.username
    }
    return this.userRepository.save(user)
  }

  async findByUsername(username:string){
    return this.userRepository.findOneBy({username: username})
  }
  remove(id: number) {
  }
}
