import { Module } from '@nestjs/common';
import { AttendeesService } from './attendees.service';
import { AttendeesController } from './attendees.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendee } from './entities/attendee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Attendee])],
  controllers: [AttendeesController],
  providers: [AttendeesService],
})
export class AttendeesModule {}
