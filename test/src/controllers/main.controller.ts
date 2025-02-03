import {
  Body,
  Controller,
  Get,
  Query as NestQuery,
  Param,
  Post,
  Put,
  Version,
} from '@nestjs/common';
import { IUser, UserResponseDto } from '@structures/IMember';
import { RequestUser } from '../decorators/RequestUser';

@Controller('main')
export class MainController {
  // Example
  @Get()
  getHello(): string {
    return 'hello';
  }

  // Example
  // Example
  @Get()
  getHello2(): string {
    return 'hello2';
  }

  // Example
  /* Example */
  @Get()
  getHello3(): string {
    return 'hello3';
  }

  /** Example */
  @Get('users/:userId')
  public getUser(@Param('userId') _userId: number): UserResponseDto {
    return {
      id: _userId,
      name: `name-${_userId}`,
    };
  }

  /**
   * alias-type 반환 테스트
   */
  @Version('2')
  @Get('alias-users')
  public async getAliasUser(): Promise<{ name: string }> {
    return {
      name: 'KEVIN',
    };
  }

  /**
   * 유니온 타입 응답값 테스트
   */
  @Version('2')
  @Get('union-users')
  public async getUnionUser(): Promise<IUser.IUnion1 | IUser.IUnion2> {
    return {
      a: 1,
      b: 2,
      c: 3,
    };
  }

  /**
   * 유니온 타입 응답값 테스트
   */
  @Version('2')
  @Post('intersection-users')
  public async getIntersectionUser(): Promise<IUser.IIntersection1 | IUser.IIntersection2> {
    return {
      a: 1,
      b: 2,
      c: 3,
    };
  }

  /**
   * 일반적인 POST 메소드 케이스 테스트.
   *
   * Create Comment.
   *
   * Lorem Ipsum is simply dummy text of the printing and typesetting industry.
   * Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
   */
  @Version('2')
  @Post('users')
  public async createUser(@Body() body: IUser.CreateDto): Promise<UserResponseDto> {
    return {
      id: 1,
      name: body.name,
    };
  }

  /** 주석이 조금 다른 PUT 메소드 케이스 테스트.
   * Update Comment.
   * Lorem Ipsum is simply dummy text of the printing and typesetting industry.
   * Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
   * @Todo to do
   * @param {string} userId user.id
   */
  @Put('users/:userId')
  public updateUser(
    @Param('userId') userId: string,
    @NestQuery() query: IUser.UpdateDto,
    @Body() body: { email: string; eeId: number },
    @RequestUser() _user: IUser,
  ): UserResponseDto {
    console.log(userId);
    console.log(query);
    console.log(body);
    return {
      id: 1,
      name: 'name1',
    };
  }
}
