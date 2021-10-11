import { Field, ID, ObjectType } from '@nestjs/graphql';

// makes gql aware this is a type
@ObjectType('Lesson')
export class LessonType {
  //makes gql aware this is a field
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  startDate: string;

  @Field()
  endDate: string;
}
