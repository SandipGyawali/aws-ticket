import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAttendeeDto } from './create-attendee.dto';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateAttendeeDto extends PartialType(CreateAttendeeDto) { }

export class UpdateLunchDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  userId: number

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  lunchId: number

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  value: boolean
}

export class SessionCheckInDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  userId: number

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  session: string

}
