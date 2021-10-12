import { StudentType } from './student.type';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StudentService } from './student.service';
import { CreateStudentInput } from './create-student.input';

@Resolver(() => StudentType)
export class StudentResolver {
  constructor(private studentService: StudentService) {}

  @Query(() => [StudentType])
  getAllStudents() {
    return this.studentService.getAllStudents();
  }

  @Query(() => StudentType)
  getStudent(@Args('id') id: string) {
    return this.studentService.getStudent(id);
  }

  @Mutation(() => StudentType)
  // We are naming this with @Args('createLessonInput', then typing it)
  createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
  ) {
    return this.studentService.createStudent(createStudentInput);
  }
}
