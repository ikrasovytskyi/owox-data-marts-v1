import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DataStorageType } from '../enums/data-storage-type.enum';

@Entity()
export class DataStorage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: DataStorageType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  modifiedAt: Date;
}
