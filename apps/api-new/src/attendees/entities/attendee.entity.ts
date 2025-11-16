import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Attendee {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  full_name: string

  @Column({ unique: true })
  email: string

  @Column()
  phone: string

  @Column()
  food_preference: string

  @Column({
    type: 'text',
    array: true,
    default: [],
  })
  session_choice: string[]

  @Column({ default: false })
  checked_in: boolean

  @Column("timestamp")
  check_in_time: Date

  @Column({ default: false })
  lunch: boolean

  @Column({ default: false })
  lunch2: boolean

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

}
