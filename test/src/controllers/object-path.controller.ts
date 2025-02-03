import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiResult } from '@structures';
import { IPost } from '@structures/IPost';

@Controller({ path: 'main', version: '3' })
export class ObjectPathController {
  /**
   * Query DTO 인터페이스 정의 없이 코드 분석만으로
   * Query-Parameter의 alias type을 정의 테스트
   */
  @Get('posts')
  public async getPostList(
    @Query('page') _page: string,
    @Query('limit') _limit: string,
    @Query() _aliasQuery: { option1: string },
    @Query() _query: IPost.ListQueryDto,
  ): Promise<ApiResult<IPost.IData[]>> {
    return {
      status: 200,
      payload: [
        {
          id: '1',
          title: '제에목',
          desc: '내에용',
        },
      ],
    };
  }

  @Get('posts/:id')
  public async getPost(@Param('id') id: string): Promise<IPost.IData> {
    return {
      id: id,
      title: '제에목',
      desc: '내에용',
    };
  }

  /**
   * Alias 타입 유형 추론
   */
  @Get('/posts/:id/linked-tags')
  public async getPostLinkedTags(@Param('id') id: string): Promise<ApiResult<IPost.Tags>> {
    return {
      status: 200,
      payload: {
        nature: '자연',
        technique: '기술',
      },
    };
  }

  // /**
  //  * 타입 forwarding 유형 추론 (아래 테스트 케이스는 TS 한계로 해결할 수 없음)
  //  */
  // @Get(':id/tags')
  // public async getPostTags(@Param('id') id: string): Promise<ApiResult<IPost.IPostTag>> {
  //   return {
  //     status: 200,
  //     payload: {
  //       name: '',
  //       imageUrl: '',
  //       pictureUrl: '',
  //     },
  //   };
  // }
}
