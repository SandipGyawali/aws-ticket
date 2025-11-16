import { IsArray, IsBoolean, IsDate, IsEmail, IsNotEmpty, IsOptional } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateAttendeeDto {
  @IsNotEmpty()
  @ApiProperty()
  full_name: string

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @ApiProperty()
  phone: string

  @IsNotEmpty()
  @ApiProperty()
  food_preference: string

  @IsArray()
  @ApiProperty()
  @IsOptional()
  session_choice: string[]

  @ApiProperty({ default: false })
  @IsBoolean()
  checked_in: boolean

  @ApiProperty({
    type: Date
  })
  @IsOptional()
  check_in_time: string
  
  @IsOptional()
  @ApiProperty()
  lunch: boolean

  @IsOptional()
  @ApiProperty()
  lunch2: boolean
}
