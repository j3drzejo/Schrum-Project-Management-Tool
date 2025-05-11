import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Team, User } from 'src/typeORM';

@Entity()
export class TeamInvite {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Team, { eager: true, onDelete: 'CASCADE' })
  team: Team;

  @ManyToOne(() => User, { eager: true })
  invitedUser: User;

  @ManyToOne(() => User, { eager: true })
  invitedBy: User;

  @Column({ default: false })
  accepted: boolean;
}
