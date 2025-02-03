export namespace ITag {
  export type ISummary = INormal | INormalV2;

  export interface INormal {
    name: string;

    pictureUrl: string;
  }

  export interface INormalV2 {
    name: string;

    imageUrl: string;
  }
}
