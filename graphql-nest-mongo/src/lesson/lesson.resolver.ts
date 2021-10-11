import { LessonType } from './lesson.type';
import { Query, Resolver } from '@nestjs/graphql';

@Resolver((of) => LessonType)
export class LessonResolver {
  @Query((returns) => LessonType)
  lesson() {
    return {
      id: '1234453',
      name: 'Math',
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
    };
  }
}
