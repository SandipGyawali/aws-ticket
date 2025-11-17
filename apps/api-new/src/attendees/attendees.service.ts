import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAttendeeDto } from './dto/create-attendee.dto';
import { SessionCheckInDto, UpdateAttendeeDto, UpdateLunchDto } from './dto/update-attendee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendee } from './entities/attendee.entity';
import { Repository } from 'typeorm';
import Papa from "papaparse"

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
    if (!attendee) {
      throw new NotFoundException(`User with id: ${id} not found`)
    }

    Object.assign(attendee, updateAttendeeDto)
    return this.attendeeRepository.save(attendee)

  }

  async remove(id: number) {
    const attendee = await this.attendeeRepository.findOneById(id)
    if (!attendee) {
      throw new NotFoundException(`User with id: ${id} not found`)
    }

    return this.attendeeRepository.remove(attendee)
  }

  async checkIn(id: number) {
    const attendee = await this.findOne(id)
    if (!attendee) {
      throw new NotFoundException(`User with id: ${id} not found`)
    }
    if (attendee.checked_in == true) {
      return {
        success: false,
        message: `Attendee with email ${attendee.email} already checked.`
      }
    }

    attendee.checked_in = true;
    await this.attendeeRepository.save(attendee)
    return {
      success: true,
      message: `Attendee ${attendee.full_name} checked in.`
    }
  }

  async sessionCheckIn(sessionChekInDto: SessionCheckInDto) {
    const { userId, session } = sessionChekInDto;
    const attendee = await this.findOne(userId)
    if (!attendee) {
      throw new NotFoundException(`User with id: ${userId} not found`)
    }

    if (attendee.session_choice.includes(session)) {
      return {
        success: false,
        message: `Attendee with email ${attendee.email} already checked in to session: ${session}.`
      }
    }

    attendee.session_choice.push(session)
    await this.attendeeRepository.save(attendee)
    return {
      success: true,
      message: `Attendee ${attendee.full_name} checked in.`
    }
  }

  async isCheckIn(id: number) {
    const attendee = await this.findOne(id)
    if (!attendee) {
      throw new NotFoundException(`User with id: ${id} not found`)
    }
    return {
      checkedIn: attendee.checked_in
    }
  }

  async updateLunch(updateLunchDto: UpdateLunchDto) {
    const { userId, lunchId, value } = updateLunchDto;
    const validLunchIds = [1, 2]
    const attendee = await this.findOne(userId)
    if (!attendee) {
      throw new NotFoundException(`User with id: ${userId} not found`)
    }
    if (!validLunchIds.includes(lunchId)) {
      throw new NotFoundException(`Lunch: ${lunchId} not found`)
    }

    if (lunchId == 1) {
      attendee.lunch = value
    } else {
      attendee.lunch2 = value
    }
    await this.attendeeRepository.save(attendee)
    return {
      success: true,
      message: `Lunch ${lunchId} set to ${value}`
    }
  }


  async importFromCsv(fileBuffer: Buffer) {

    const parsedData = await this.parseCsv(fileBuffer)

    if (!parsedData || parsedData.length === 0) {
      return {
        success: false,
        message: "No data found in CSV file",
        inserted: 0,
      };
    }
    const { validRecords, errors } = await this.filterValidEntry(parsedData)

    let insertedCount = 0;

    for (const createAttendeeDto of validRecords) {
      try {
        const attendee = this.attendeeRepository.create(createAttendeeDto)
        await this.attendeeRepository.insert(attendee)
        insertedCount++
      } catch (insertError) {
        errors.push(insertError.detail)
        continue;
      }
    }
    return {
      success: true,
      inserted: insertedCount,
      errors: errors,
    }
  }

  private async filterValidEntry(parsedData: any[]) {
    const validRecords: CreateAttendeeDto[] = []
    const errors: any[] = [];

    for (let i = 0; i < parsedData.length; i++) {
      const row = parsedData[i];
      try {
        // Map CSV columns to database schema
        const record: CreateAttendeeDto = {
          full_name: row.full_name || row.Full_Name,
          email: row.email,
          phone: row.phone,
          food_preference: row.food_preference || "",
          session_choice: row.session_choice || [],
          checked_in: row.checked_in || false,
          check_in_time: row.check_in_time || null,
          lunch: row.lunch || false,
          lunch2: row.lunch2 || false,
        };

        // Basic validation
        if (!record.full_name || !record.phone || !record.email) {
          errors.push({
            row: i + 1,
            data: row,
            error: "Missing required fields: first_name, last_name, or email",
          });
          continue;
        }

        validRecords.push(record);
      } catch (error) {
        errors.push({
          row: i + 1,
          data: row,
          error: error instanceof Error ? error.message : "Unknown error",
        });
      }
    }
    return {
      validRecords,
      errors
    }
  }

  private async parseCsv(fileBuffer: Buffer): Promise<any[]> {
    return new Promise((resolve, reject) => {
      Papa.parse(fileBuffer.toString("utf-8"), {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
        complete: (results) => resolve(results.data),
        error: (err: any) => reject(err),
      })
    })
  }

}
