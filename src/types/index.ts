export interface IEntity {
  id:number;
  regDate:string;
  updateDate:string;
}

export interface GlobalState {
  loginedMember:IAp;
  isLogined:boolean;
  logout:Function;
}

export interface IAp extends IEntity {
  authKey:string;
  loginId:string, 
  name:string, 
  nickName:string, 
  engName:string, 
  gender:string, 
  regNumber:string, 
  address:string, 
  cellPhoneNo:string, 
  feet:number, 
  weight:number, 
  skinTone:string, 
  eyelid:number, 
  feature:string, 
  filmgraphy:string, 
  jobArea:string, 
  corp:string,
  authLevel:number,
  authStatus:number,
  extra__thumbImg:string,
  extra__fileType:string

}

export interface IRecruit extends IEntity {
  memberId:number;
  title:string;
  body:string;
  roleType:string;
  pay:string;
  location:string;
  period:string;
  deadline:string;
  gender:string;
  age:string;
  script:string;
  videoTime:string;
  etc:string;  

  extra__aw_media: string;
  extra__aw_title: string;
  extra__aw_subtitle: string;
  extra__aw_director: string;
  extra__aw_writer: string;
  extra__aw_corp: string;
  extra__aw_producer: string;
  extra__aw_genre: string;
  extra__aw_castingManager: string;
  extra__aw_story: string;
  extra__aw_etc: string;

  extra__ar_realName: string;
  extra__ar_name: string;
  extra__ar_age: string;
  extra__ar_gender: string;
  extra__ar_scriptStatus : string;
  extra__ar_scenesCount: number;
  extra__ar_shootingsCount: number;
  extra__ar_character: string;
  extra__ar_etc: string;
}

export interface IArtwork extends IEntity {
  recruitmentId:number;
  name:string;
  genre:string;
  corp:string;
  director:string;
  etc:string;
}

export interface IActingRole extends IEntity {
  recruitmentId:number;
  realName:string;
  name:string;
  pay:string;
  age:string;
  job:string;
  scriptStatus:number;
  gender:string;
  scenesCount:number;
  shootingsCount:number;
  character:string;
  etc:string;
}
export interface IGenFile extends IEntity {
  relTypeCode:string;
  relId:number;
  originFileName:string;
  fileExt:string;
  typeCode:string;
  type2Code:string;
  fileSize:number;
  fileExtTypeCode:string;
  scenesCount:number;
  shootingsCount:number;
  character:string;
  etc:string;
}