import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { IRecruit , IAp, IApplication } from '@/types';
import { inject } from 'vue'

// API 원형
abstract class HttpClient {
  protected readonly instance: AxiosInstance;

  public constructor(instance: AxiosInstance) {
    this.instance = instance;

    this._initializeRequestInterceptor();
    this._initializeResponseInterceptor();
  }

  private _initializeRequestInterceptor() {
    this.instance.interceptors.request.use(
      this._handleRequest,
      this._handleError,
    );
  }

  private _initializeResponseInterceptor() {
    this.instance.interceptors.response.use(
      this._handleResponse,
      this._handleError,
    );
  }

  protected _handleRequest(config: AxiosRequestConfig): AxiosRequestConfig {
    return config;
  }

  protected _handleResponse(axiosResponse: AxiosResponse): AxiosResponse {
    return axiosResponse;
  }

  protected _handleError(error: AxiosError) {
    if (error.response) {
      // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
      alert('요청을 처리하는 중에 오류가 발생하였습니다.');
    }
    else if (error.request) {
      // 요청이 이루어 졌으나 응답을 받지 못했습니다.
      // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
      // Node.js의 http.ClientRequest 인스턴스입니다.
      alert('서버 또는 네트워크의 상태가 좋지 않습니다.');
    }
    else {
      // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
      console.log('Error', error.message);
    }

    return Promise.reject(error);
  }

  public postByForm<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
    const params = new URLSearchParams();

    for ( const key in data ) {
      params.append(key, data[key]);
    }

    config =  {} as AxiosRequestConfig;

    config.headers = {
      'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Accept': '*/*'
    };

    return this.instance.post(url, params, config);
  }

  public post<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
    return this.instance.post(url, data, config);
  }

  public get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.instance.get(url, config);
  }
}

// 응답타입1
interface Base__IResponseBodyType1 {
  resultCode: string;
  msg: string;
  fail:boolean;
  success:boolean;
}
// /usr/member/authKey 의 응답 타입
export interface MainApi__member_authKey__IResponseBody extends Base__IResponseBodyType1 {
  body: {
    authKey: string;
    member: {
      id: number;
      regDate: string;
      updateDate: string;
      loginId: string;
      name: string;
      engName: string;
      nickName: string;
      gender: string;
      regNumber: string;
      address: string;
      cellPhoneNo: string;
      feet: number;
      weight: number;
      skinTone: string;
      eyelid: number;
      feature: string;
      filmgraphy: string;
      jobArea: string;
      corp: string;
      authLevel: number;
      authStatus: number;
      extra__thumbImg: string;
      extra__fileType: string;
    };
  };
}

// /usr/ap/join 의 응답 타입
export interface MainApi__member_doJoin__IResponseBody extends Base__IResponseBodyType1 {
  body: {
    id: number;
  };
}

// /usr/recruit/list 의 응답 타입
export interface MainApi__recruit_list__IResponseBody extends Base__IResponseBodyType1 {
  body: {
    recruits: IRecruit[],
    isAllLoaded: boolean
  };
}

// /usr/recruit/detail 의 응답 타입
export interface MainApi__recruit_detail__IResponseBody extends Base__IResponseBodyType1 {
  body: {
    recruit: IRecruit
  };
}

// /usr/ap/doIdDupCheck 의 응답 타입
export interface MainApi__ap_doIdDupCheck__IResponseBody extends Base__IResponseBodyType1 {
  body: {
  };
}

// /usr/ap/emailCertForJoin 의 응답 타입
export interface MainApi__ap_emailCertForJoin__IResponseBody extends Base__IResponseBodyType1 {
  body: {
    isCert: boolean
  };
}

// /common/genFile/doUpload 의 응답 타입
export interface MainApi__common_genFile_doUpload__IResponseBody extends Base__IResponseBodyType1 {
  body:{
    genFileIdsStr: string,
  };
}

// /common/genFile/getThumbImgUrl 의 응답 타입
export interface MainApi__common_genFile_getThumbImgUrl__IResponseBody extends Base__IResponseBodyType1 {
  body:{
    imgUrl: string,
  };
}

// /common/genFile/getProfileImgUrls 의 응답 타입
export interface MainApi__common_genFile_getProfileImgUrls__IResponseBody extends Base__IResponseBodyType1 {
  body:{
    imgUrls: string[],
  };
}

// /common/genFile/getProfileImgs 의 응답 타입
export interface MainApi__common_genFile_getProfileImgs__IResponseBody extends Base__IResponseBodyType1 {
  body:{
    genFiles: any[]
  };
}

// /common/genFile/deleteGenFile 의 응답 타입
export interface MainApi__common_genFile_doDeleteGenFile__IResponseBody extends Base__IResponseBodyType1 {
  body:{
  };
}

// /common/genFile/deleteGenFile 의 응답 타입
export interface MainApi__common_genFile_doDeleteProfileImg__IResponseBody extends Base__IResponseBodyType1 {
  body:{
  };
}

// /usr/ap/doModify 의 응답 타입
export interface MainApi__member_doModify__IResponseBody extends Base__IResponseBodyType1 {
  body:{
    authKey: string,
    ap: IAp
  };
}

// /common/genFile/getRecentImgUrl 의 응답 타입
export interface MainApi__common_application_getRecentImg__IResponseBody extends Base__IResponseBodyType1 {
  body:{
    imgUrl: string
  };
}


// /usr/application/write 의 응답 타입
export interface MainApi__application_doWrite__IResponseBody extends Base__IResponseBodyType1 {
  body: {
    id: number;
  };
}

// /usr/application/getApplications 의 응답 타입
export interface MainApi__common_application_getApplications__IResponseBody extends Base__IResponseBodyType1 {
  body: {
    applications: IApplication[];
  };
}

// /usr/application/getApplications 의 응답 타입
export interface MainApi__common_application_getApplicationsAndRecruit__IResponseBody extends Base__IResponseBodyType1 {
  body: {
    applications: any[];
  };
}

// /usr/ap/like 의 응답 타입
export interface MainApi__ap__recruit__like__IResponseBody extends Base__IResponseBodyType1 {
  body: {
  };
}

// /usr/ap/disLike 의 응답 타입
export interface MainApi__ap__recruit__disLike__IResponseBody extends Base__IResponseBodyType1 {
  body: {
  };
}

// /usr/ap/checkLikeStatus 의 응답 타입
export interface MainApi__ap__recruit__checkLikeStatus__IResponseBody extends Base__IResponseBodyType1 {
  body: {
    likeStatus: string
  };
}

// /usr/ap/recruitLikeList 의 응답 타입
export interface MainApi__ap__recruit__likeList__IResponseBody extends Base__IResponseBodyType1 {
  body: {
    likedRecruits: IRecruit[]
  };
}










// http://localhost:8021/usr/ 와의 통신장치
export class MainApi extends HttpClient {
  public constructor() {
    super(
      axios.create({
        baseURL:'http://192.168.219.102:8024',
      })
    );
  }

  protected _handleRequest(config: AxiosRequestConfig) {
    config.params = {};
    config.params.authKey = localStorage.getItem("authKey");
    return config;
  }

  protected _handleResponse(axiosResponse: AxiosResponse): AxiosResponse {
    if ( ["F-A", "F-B"].includes(axiosResponse?.data?.resultCode) ) {
      alert('로그인 후 이용해주세요.');

      localStorage.removeItem("authKey");
      localStorage.removeItem("loginedMemberId");
      localStorage.removeItem("regDate");
      localStorage.removeItem("updateDate");
      localStorage.removeItem("loginedMemberLoginId");
      localStorage.removeItem("loginedMemberName");
      localStorage.removeItem("loginedMemberNickName");
      localStorage.removeItem("loginedMemberCellPhoneNo");
      localStorage.removeItem("loginedMemberEngName");
      localStorage.removeItem("loginedMemberGender");
      localStorage.removeItem("loginedMemberRegNumber");
      localStorage.removeItem("loginedMemberAddress");
      localStorage.removeItem("loginedMemberFeet");
      localStorage.removeItem("loginedMemberWeight");
      localStorage.removeItem("loginedMemberSkinTone");
      localStorage.removeItem("loginedMemberEyelid");
      localStorage.removeItem("loginedMemberFeature");
      localStorage.removeItem("loginedMemberFilmgraphy");
      localStorage.removeItem("loginedMemberJobArea");
      localStorage.removeItem("loginedMemberCorp");
      localStorage.removeItem("loginedMemberAuthLevel");
      localStorage.removeItem("loginedMemberAuthStatus");
      localStorage.removeItem("loginedMemberExtra__thumbImg");
      localStorage.removeItem("loginedMemberExtra__fileType");

      location.replace('/member/login');
    }

    return axiosResponse;
  }
  
  public ap_authKey(loginId: string, loginPw: string) {
    return this.postByForm<MainApi__member_authKey__IResponseBody>(
      `/usr/ap/getAuthKey`,
      {
        loginId, 
        loginPw
      }
    );
  }

  public ap_doJoin(loginId: string, loginPw: string, name: string, engName: string, gender: string, regNumber: string, address: string, cellPhoneNo: string, nickName: string, feet: number, weight: number, skinTone: string, eyelid: number, feature: string, filmgraphy: string, jobArea: string, corp: string) {
    return this.postByForm<MainApi__member_doJoin__IResponseBody>(
      `/usr/ap/doJoin`, 
      {
        loginId,
        loginPw,
        name,
        engName,
        gender,
        regNumber,
        address,        
        cellPhoneNo,
        nickName, 
        feet, 
        weight, 
        skinTone, 
        eyelid, 
        feature, 
        filmgraphy, 
        jobArea, 
        corp
      }
    );
  }

  public recruit_list(limit:number) {
    return this.instance.get<MainApi__recruit_list__IResponseBody>(`/usr/recruit/list?limit=${limit}`);
  }

  public recruit_detail(id:number) {
    return this.instance.get<MainApi__recruit_detail__IResponseBody>(`/usr/recruit/detail?id=${id}`);
  }

  public ap_doIdDupCheck(loginId:string) {
    return this.instance.get<MainApi__ap_doIdDupCheck__IResponseBody>(`/usr/ap/doIdDupCheck?loginId=${loginId}`);
  }

  public ap_emailCertForJoin(email:string, authKey:string) {
    return this.instance.get<MainApi__ap_emailCertForJoin__IResponseBody>(`/usr/ap/emailCertForJoin?email=${email}&authKey=${authKey}` );
  }

  public common_ap_genFile_doUploadForAdd(file:File, id:string) {
    const formDate = new FormData();
    formDate.append("file__ap__" + id + "__thumbnail__attachment__1", file);
    return this.post<MainApi__common_genFile_doUpload__IResponseBody>(
      `/common/genFile/doUpload`, formDate
    );
  }

  public common_profileImg_genFile_doUpload(file:File, id:string, count:string) {
    const formDate = new FormData();
    formDate.append("file__ap__" + id + "__profile__attachment__" + count + "", file);
    return this.post<MainApi__common_genFile_doUpload__IResponseBody>(
      `/common/genFile/doUpload`, formDate
    );
  }

  public common_ap_genFile_getThumbImgUrl(id:number){
    return this.instance.get<MainApi__common_genFile_getThumbImgUrl__IResponseBody>(`/common/genFile/getThumbImgUrl?id=${id}`);
  }

  public common_ap_genFile_getProfileImgUrls(id:number){
    return this.instance.get<MainApi__common_genFile_getProfileImgUrls__IResponseBody>(`/common/genFile/getProfileImgUrls?id=${id}`);
  }

  public common_ap_genFile_getProfileImgs(id:number){
    return this.instance.get<MainApi__common_genFile_getProfileImgs__IResponseBody>(`/common/genFile/getProfileImgs?id=${id}`);
  }
  

  public common_ap_genFile_deleteGenFile(id:number){
    return this.instance.get<MainApi__common_genFile_doDeleteGenFile__IResponseBody>(`/common/genFile/deleteGenFile?id=${id}`);
  }

  public common_ap_genFile_deleteProfileImg(id:number, updateDate:string){
    return this.instance.get<MainApi__common_genFile_doDeleteProfileImg__IResponseBody>(`/common/genFile/deleteProfileImg?id=${id}&updateDate=${updateDate}`);
  }

  public ap_doModify(loginedMemberId: string, nickName: string, feet: number, weight: number, skinTone: string, eyelid: number, feature: string, filmgraphy: string, jobArea: string, corp: string) {
    return this.postByForm<MainApi__member_doModify__IResponseBody>(
      `/usr/ap/doModify`, 
      {
        loginedMemberId,
        nickName, 
        feet, 
        weight, 
        skinTone, 
        eyelid, 
        feature, 
        filmgraphy, 
        jobArea, 
        corp
      }
    );
  }

  public recruit_listByKeyword(limit:number, keyword:string) {
    return this.instance.get<MainApi__recruit_list__IResponseBody>(`/usr/recruit/search?limit=${limit}&keyword=${keyword}`);
  }

  public common_application_photo_doUpload(file:File) {
    const formDate = new FormData();
    formDate.append("file__application__0__photo__attachment__1", file);
    return this.post<MainApi__common_genFile_doUpload__IResponseBody>(
      `/common/genFile/doUpload`, formDate
    );
  }

  public common_application_video_doUpload(file:File) {
    const formDate = new FormData();
    formDate.append("file__application__0__video__attachment__1", file);
    return this.post<MainApi__common_genFile_doUpload__IResponseBody>(
      `/common/genFile/doUpload`, formDate
    );
  }

  public common_application_photo_getRecentImgUrl(recentImgFileIdsStr: string){
    return this.instance.get<MainApi__common_application_getRecentImg__IResponseBody>(`/common/genFile/getRecentImgUrl?recentImgFileIdsStr=${recentImgFileIdsStr}`);
  }

  public application_doWrite(videoFileIdsStr:string, recentImgFileIdsStr:string, profileImgIdsStr:string, memberId:number, recruitId:number) {
    return this.postByForm<MainApi__application_doWrite__IResponseBody>(
      `/usr/application/write`, 
      {
        videoFileIdsStr,
        recentImgFileIdsStr,
        profileImgIdsStr,
        memberId,
        recruitId
      }
    );
  }

  public application_getApplications(memberId: number){
    return this.instance.get<MainApi__common_application_getApplications__IResponseBody>(`/usr/application/getApplications?memberId=${memberId}`);
  }

  public application_getApplicationsAndRecruit(memberId: number){
    return this.instance.get<MainApi__common_application_getApplicationsAndRecruit__IResponseBody>(`/usr/application/getApplicationsAndRecruit?memberId=${memberId}`);
  }

  public ap_recruit_like(recruitId: number, memberId: number){
    return this.instance.get<MainApi__ap__recruit__like__IResponseBody>(`/usr/ap/like?recruitId=${recruitId}&memberId=${memberId}`);
  }

  public ap_recruit_disLike(recruitId: number, memberId: number){
    return this.instance.get<MainApi__ap__recruit__disLike__IResponseBody>(`/usr/ap/disLike?recruitId=${recruitId}&memberId=${memberId}`);
  }

  public ap_recruit_checkLikeStatus(recruitId: number, memberId: number){
    return this.instance.get<MainApi__ap__recruit__checkLikeStatus__IResponseBody>(`/usr/ap/checkLikeStatus?recruitId=${recruitId}&memberId=${memberId}`);
  }

  public recruit_like_list(memberId: number){
    return this.instance.get<MainApi__ap__recruit__likeList__IResponseBody>(`/usr/ap/recruitLikeList?memberId=${memberId}`);
  }

  
} 

export const mainApiSymbol = Symbol('mainApiSymbol');

export const createMainApi = (): MainApi => {
  return new MainApi();
};

export const useMainApi = (): MainApi => inject(mainApiSymbol) as MainApi;