import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

import { Account } from '../../accounts/model/account';
import { Target } from '../../targets/model/target';
import { User } from '../../users/model/user';

@Entity('investments')
class Investment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  account_id: string;

  @ManyToOne(() => Account)
  @JoinColumn({ name: 'account_id' })
  account: Account;

  @Column()
  target_id: string;

  @ManyToOne(() => Target)
  @JoinColumn({ name: 'target_id' })
  target: Target;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  tax: string;

  @Column()
  application_date: Date;

  @Column()
  redeem_date: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { Investment };
