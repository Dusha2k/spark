import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('local-files')
export class LocalFileEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  filename: string;
  @Column()
  path: string;
  @Column()
  mimetype: string;
}
