import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import Image from './Image';

@Entity('greenAreas')
export default class GreenArea {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  species: string;

  @Column()
  description: string;

  @OneToMany(() => Image, (image) => image.greenArea, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'greenArea_id' })
  images: Image[];
}
