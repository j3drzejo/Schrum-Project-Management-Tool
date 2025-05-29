import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

import { User } from 'src/typeORM';

@Entity()
export class AccessToken {
  @PrimaryGeneratedColumn('uuid')
  jti: string;

  @ManyToOne(() => User, (user) => user.accessTokens, {
    onDelete: 'CASCADE',
  })
  user: User;

  @Column()
  expiresAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
