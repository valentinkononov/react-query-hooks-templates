export interface BaseEntity {
  id: number;
}

export interface Character extends BaseEntity {
  name: string;
  nickName: string;
  gender: string;
  culture: string;
}

export interface House extends BaseEntity {
  name: string;
  region: string;
  words: string;
}
