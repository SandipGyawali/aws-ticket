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

  @Column({ type: 'boolean', default: false })
  checked_in: boolean

  @Column({ type: "timestamptz", nullable: true })
  check_in_time: Date

  @Column({ type: 'boolean', default: false })
  lunch: boolean

  @Column({ type: 'boolean', default: false })
  lunch2: boolean

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

}
