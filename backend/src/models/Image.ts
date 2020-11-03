import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import GreenArea from './GreenArea';

@Entity('images')
export default class Image {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  path: string;

  @ManyToOne(() => GreenArea, (greenArea) => greenArea.images)
  @JoinColumn({ name: 'GreenArea_id' })
  greenArea: GreenArea;
}
