import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  mobileNo: string;

  @Column()
  countryCode: string;

  @Column({ default: 'USER' })
  role: 'ADMIN' | 'USER';

  @Column('simple-array', { nullable: true })
  access: string[];
}
