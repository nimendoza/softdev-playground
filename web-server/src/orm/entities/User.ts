import bcrypt from 'bcryptjs';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ name: 'hashed_password' })
  private hashedPassword!: string;

  setPassword(password: string) {
    this.hashedPassword = bcrypt.hashSync(password);
  }

  matchesPassword(password: string) {
    return bcrypt.compareSync(password, this.hashedPassword);
  }

  constructor() {
    super();
  }
};