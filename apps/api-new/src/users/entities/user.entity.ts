import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum ROLE {
  ADMIN = "admin",
  VOLUNTEER = "volunteer"
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  username: string

  @Column()
  password: string

  @Column( {
    type: 'enum',
    enum: ROLE,
    default: ROLE.VOLUNTEER
  })
  role: ROLE
}
