import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAttendeeDto } from './dto/create-attendee.dto';
import { UpdateAttendeeDto } from './dto/update-attendee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendee } from './entities/attendee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AttendeesService {
  constructor(@InjectRepository(Attendee) private attendeeRepository: Repository<Attendee>) { }

  async create(createAttendeeDto: CreateAttendeeDto) {
    const attendee = this.attendeeRepository.create(createAttendeeDto)
    return this.attendeeRepository.save(attendee)
  }

  async findAll() {
    return this.attendeeRepository.find()
  }

  async findOne(id: number) {
    return this.attendeeRepository.findOneById(id)
  }

  async update(id: number, updateAttendeeDto: UpdateAttendeeDto) {
    const attendee = await this.attendeeRepository.findOneById(id)
    if(!attendee){
      throw new NotFoundException(`User with id: ${id} not found`)
    }

    Object.assign(attendee, updateAttendeeDto)
    return this.attendeeRepository.save(attendee)

  }

  async remove(id: number) {
    const attendee = await this.attendeeRepository.findOneById(id)
    if(!attendee){
      throw new NotFoundException(`User with id: ${id} not found`)
    }

    return this.attendeeRepository.remove(attendee)
  }
}
