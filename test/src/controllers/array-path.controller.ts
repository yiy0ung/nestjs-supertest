import { Controller, Get } from '@nestjs/common';
import { ApiResult, IPost, PostType, PostType2 } from '@structures';

@Controller(['main', 'v1', 'array'])
export class ArrayPathController {
  /**
   * 동기 함수 테스트
   */
  @Get()
  public getArrayData(): IPost.ISub.IArrayData {
    return {
      data: [1, 2, 3, 4],
    };
  }

  /**
   * 제네릭 응답 + Enum
   */
  @Get()
  public async getGenericData1(): Promise<ApiResult<IPost.ISub.IGeneric<PostType>>> {
    return {
      status: 200,
      payload: {
        data: [PostType.Normal],
      },
    };
  }

  /**
   * 제네릭 응답 + Enum 필드
   */
  @Get()
  public async getGenericData2(): Promise<ApiResult<IPost.ISub.IGeneric<PostType2.Normal>>> {
    return {
      status: 200,
      payload: {
        data: [PostType2.Normal],
      },
    };
  }
}
