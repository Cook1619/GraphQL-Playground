import { Field, ID, ObjectType } from '@nestjs/graphql';

// makes gql aware this is a type
@ObjectType('Student')
export class StudentType {
  //makes gql aware this is a field
  @Field((type) => ID)
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;
}
