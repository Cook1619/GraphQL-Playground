import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

// decorated letting typeorm that thisis a table
@Entity()
export class Lesson {
  // mongo specific
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  startDate: string;

  @Column()
  endDate: string;

  @Column()
  students: string[];
}
