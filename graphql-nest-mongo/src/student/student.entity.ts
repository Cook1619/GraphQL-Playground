import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

// decorated letting typeorm that thisis a table
@Entity()
export class Student {
  // mongo specific
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;
}
