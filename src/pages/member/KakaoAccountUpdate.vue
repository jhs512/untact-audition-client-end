<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title class="ion-text-center">카카오 로그인 추가정보 등록</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content scroll-events="true">
      <form v-on:submit.prevent="checkAndModify">
        
        <section class="section-2">
          <div class="container mx-auto">
            <div class="px-6 py-6">
                <div class="text-sm font-bold mb-5">* 표시는 필수 입력항목입니다.</div>

                <FormRow title="이름 *">
                  <input ref="nameElRef" class="form-row-input" type="text">
                </FormRow>
                <FormRow title="영문이름 *">
                  <input ref="engNameElRef" class="form-row-input" type="text">
                </FormRow>
                
                <FormRow title="주민등록번호 *">
                  <div class="flex items-center w-full mt-2">
                    <div class="w-1/2">
                      <ion-input v-model="input.regNumber1El" type="text" ref="regNumber1ElRef" maxlength="6" inputmode="decimal" placeholder="YYMMDD" enterkeyhint="next"></ion-input>
                    </div>
                    <span class="mx-1">-</span>
                    <div class="w-1/12">
                      <ion-input v-model="input.regNumber2El" type="text" ref="regNumber2ElRef" maxlength="1" inputmode="decimal" placeholder="" enterkeyhint="next"></ion-input>
                    </div>
                    <div class="ml-4 flex justify-around w-28">
                      <span>*</span>
                      <span>*</span>
                      <span>*</span>
                      <span>*</span>
                      <span>*</span>
                      <span>*</span>
                    </div>
                  </div>
                </FormRow>
                <FormRow title="주소 *">
                  <ion-input readonly="true" v-model="input.addressEl" ref="addressElRef" type="text" placeholder="주소" enterkeyhint="next" class="input-address relative">
                    <ion-button fill="solid" size="small" color="medium" class="absolute right-0 mr-2" @click="openApi">검색</ion-button>
                  </ion-input>
                  <div v-if="api.isTrue" class="my-4">
                    <VueDaumPostcode @complete="confirm"/>
                  </div>
                  <ion-input v-model="input.address2El" ref="addressElRef" type="text" placeholder="상세주소" enterkeyhint="next" class="mt-2"></ion-input>
                </FormRow>
                <FormRow title="전화번호 *">
                  <input ref="cellPhoneNoElRef" class="form-row-input" type="tel" placeholder=" '-' 없이 번호만 입력해주세요.">
                </FormRow>
              
                <FormRow title="닉네임">
                  <input v-model="input.nickNameEl" ref="nickNameElRef" class="form-row-input" type="text">
                </FormRow>
                <FormRow title="키">
                  <input v-model="input.feetEl" ref="feetElRef" class="form-row-input" type="number">
                </FormRow>
                <FormRow title="몸무게">
                  <input v-model="input.weightEl" ref="weightElRef" class="form-row-input" type="number">
                </FormRow>
                <FormRow title="특징">
                  <input v-model="input.featureEl" ref="featureElRef" class="form-row-input" type="text">
                </FormRow>
                <FormRow title="커리어">
                  <input v-model="input.filmgraphyEl" ref="filmgraphyElRef" class="form-row-input" type="text">
                </FormRow>
                <FormRow title="희망분야">
                  <input v-model="input.jobAreaEl" ref="jobAreaElRef" class="form-row-input" type="text">
                </FormRow>
                <FormRow title="소속 회사">
                  <input v-model="input.corpEl" ref="corpElRef" class="form-row-input" type="text">
                </FormRow>

                <FormRow title="프로필 사진 설정">
                  <ion-button @click="presentActionSheet" expand="block" color="light">설정하기</ion-button>
                  <input id="file" ref="profileImgFileElRef" type="file" class="hidden" v-on:change="setThumbnail">
                </FormRow>
                <div class="mx-auto image_container">
                  <img v-if="fileType.type.startsWith('image')" src="" alt="" class="mx-auto">
                  <video v-if="fileType.type.startsWith('video')" src="" controls></video>
                </div>
                <ion-grid v-if="input.profileImgs.length != 0">
                  <ion-row>
                    <ion-col size="6" v-for="imgUrl in input.profileImgs">
                      <ion-img @click="deleteActionSheet(imgUrl)" :src="imgUrl"></ion-img>
                    </ion-col>
                  </ion-row>
                </ion-grid>

                <div class="cbg-gray flex justify-center items-center h-12 mt-8 rounded">
                  <button type="submit" class="w-full h-full text-lg font-bold">수정하기</button>
                </div>
                
            </div>
          </div>
        </section>

      </form>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted, toHandlerKey } from 'vue';
import { actionSheetController, alertController } from '@ionic/vue';
import { usePhotoGallery } from '@/composables/usePhotoGallery';
import { close } from 'ionicons/icons';
import { useMainApi } from '@/apis';
import { useGlobalState } from '@/stores'
import router from '@/router';
import * as util from '@/utils'

export default defineComponent({
  name: 'KakaoAccountUpdate',
  setup(){

    const nameElRef = ref<HTMLInputElement>();
    const engNameElRef = ref<HTMLInputElement>();
    const regNumber1ElRef = ref<HTMLIonInputElement>();
    const regNumber2ElRef = ref<HTMLIonInputElement>();
    const addressElRef = ref<HTMLIonInputElement>();
    const cellPhoneNoElRef = ref<HTMLInputElement>();

    const nickNameElRef = ref<HTMLInputElement>();
    const feetElRef = ref<HTMLInputElement>();
    const weightElRef = ref<HTMLInputElement>();
    const featureElRef = ref<HTMLInputElement>();
    const filmgraphyElRef = ref<HTMLInputElement>();
    const jobAreaElRef = ref<HTMLInputElement>();
    const corpElRef = ref<HTMLInputElement>();
    const profileImgFileElRef = ref<HTMLIonInputElement>();
    
    const mainApi = useMainApi();
    const globalState = useGlobalState();
    const { photos, takePhoto } = usePhotoGallery();

    function phoneCheck(cellPhoneNo: string){
      var phonePattern = /(^02.{0}|^01.{1}|[0-9]{3})([0-9]{4})([0-9]{4})/g;
      return (cellPhoneNo != '' && cellPhoneNo != 'undefined' && phonePattern .test(cellPhoneNo)); 
    }

    function regNumber1Check(regNumber: string){
      var regNumberPattern = /([0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[1,2][0-9]|3[0,1]))/;
      return (regNumber != '' && regNumber != 'undefined' && regNumberPattern .test(regNumber)); 
    }
    function regNumber2Check(regNumber: string){
      var regNumberPattern = /^[1-4]$/;
      return (regNumber != '' && regNumber != 'undefined' && regNumberPattern .test(regNumber)); 
    }

    function nameCheck(name: string){
      var namePattern = /^[가-힣]{2,6}$/;
      return (name != '' && name != 'undefined' && namePattern .test(name)); 
    }

    function engNameCheck(engName: string){
      var engNamePattern = /^[a-zA-Z\s]+$/;
      return (engName != '' && engName != 'undefined' && engNamePattern .test(engName)); 
    }
    

    const input = reactive({
      nickNameEl: '',
      feetEl: 0,
      weightEl: 0,
      featureEl: '',
      filmgraphyEl: '',
      jobAreaEl: '',
      corpEl: '',
      profileImgs: [] as any[],
      fileEl:new File([''],''),
      profileImgCount: 1,
      addressEl:'',
      address2El:'',
      regNumber1El:'',
      regNumber2El:'',
      gender: ''
    })

    const api = reactive({
      isTrue:false
    })

    function openApi(){
      if( api.isTrue ){
        api.isTrue = false;
      } else {
        api.isTrue = true;
      }
    }

    function confirm(result:any){
      if(result.buildingName.length > 0 ){
        input.addressEl = result.address + " ("+result.buildingName +")";
      } else {
        input.addressEl = result.address;
      }
      
      api.isTrue = false;
    }

    var fileType = reactive({
      type:''
    })
    

    async function deleteActionSheet(url:any){
      const deleteSheet = await actionSheetController
        .create({
          header: '사진 삭제',
          cssClass: 'my-custom-class',
          buttons: [
            {
              text: '사진 삭제',
              role: 'destructive',
              handler: () => {
                presentAlertMultipleButtons(url)
              },
            },
            {
              text: 'Cancel',
              icon: close,
              role: 'cancel',
              handler: () => {
              },
            },
          ],
        })
      await deleteSheet.present();

      const { role } = await deleteSheet.onDidDismiss();
    }

    async function presentAlertMultipleButtons(url:any) {
      const alert = await alertController
        .create({
          cssClass: 'my-custom-class',
          header: 'Alert',
          subHeader: '사진 삭제',
          message: '프로필사진을 삭제하시겠습니까?',
          buttons: [
            {
              text: '취소',
              handler: () => {
                return
              }
            },
            {
              text: '삭제',
              handler: () => {
                const updateDate = url.split('updateDate=')

                const deleteGenFile = async () => {
                  await mainApi.common_ap_genFile_deleteProfileImg(util.toIntOrNull(globalState.loginedMember.id), util.toStringOrNull(updateDate[1]))
                    .then(axiosResponse => {
                      if ( axiosResponse.data.fail ) {
                        return;
                      }
                    })
                }

                deleteGenFile()
                location.reload();
              }
            }
          ],
        });
      return alert.present();
    }

    async function presentActionSheet() {
      const actionSheet = await actionSheetController
        .create({
          header: '프로필 사진 설정',
          cssClass: 'my-custom-class',
          buttons: [
            {
              text: '사진 촬영',
              handler: () => {
                takePhoto().finally(() => {

                  const state = reactive ({
                    fileEl: photos.value[photos.value.length-1].file,
                  })

                  if ( localStorage.getItem('profileImgCount') == null ){
                    localStorage.setItem('profileImgCount', '1')
                  } else if ( localStorage.getItem('profileImgCount') != null ){
                    input.profileImgCount = util.toIntOrNull(localStorage.getItem('profileImgCount'))
                    input.profileImgCount = ++input.profileImgCount
                    localStorage.removeItem('profileImgCount')
                    localStorage.setItem('profileImgCount', input.profileImgCount + '')
                  }

                  const showProfileImg = () => {
                    mainApi.common_ap_genFile_getProfileImgUrls(util.toIntOrNull(globalState.loginedMember.id))
                      .then(axiosResponse => {

                        if ( axiosResponse.data.fail ) {
                          alert(axiosResponse.data.msg);
                          return;
                        } else {
                          input.profileImgs = axiosResponse.data.body.imgUrls
                        }

                      });
                  }

                  const startFileUpload = (onSuccess:Function) => {
                    if ( state.fileEl == null || state.fileEl.size == 0 ) {
                      return;
                    }
                    
                    mainApi.common_profileImg_genFile_doUpload(state.fileEl, util.toStringOrNull(globalState.loginedMember.id), util.toStringOrNull(input.profileImgCount))
                      .then(axiosResponse => {
                        if ( axiosResponse.data.fail ) {
                          alert(axiosResponse.data.msg);
                          return;
                        }
                        else {
                          onSuccess();
                        }
                      });
                  };
                  
                  startFileUpload(showProfileImg)
                })
                
              },
            },
            {
              text: '사진 선택',
              handler: () => {
                document.getElementById('file')?.click();
              },
            },
            {
              text: 'Cancel',
              icon: close,
              role: 'cancel',
              handler: () => {
              },
            },
          ],
        });
      await actionSheet.present();

      const { role } = await actionSheet.onDidDismiss();
    }

    function checkAndModify() {

      // 이름 체크
      if ( nameElRef.value == null ) {
        return;
      }
      const nameEl = nameElRef.value;
      nameEl.value = nameEl.value.trim();
      if ( nameEl.value.length == 0 ) {
        alert('이름을 입력해주세요.');
        nameEl.focus();
        return;
      }

      if (nameCheck(nameEl.value) == false){
        alert('올바른 이름을 입력해주세요 ( 한글 2~6 자리 )');
        nameEl.focus();
        return;
      }

      // 영문이름 체크
      if ( engNameElRef.value == null ) {
        return;
      }
      const engNameEl = engNameElRef.value;
      if ( engNameEl.value.length == 0 ) {
        alert('영문이름을 입력해주세요.');
        engNameEl.focus();
        return;
      }

      if ( engNameCheck(engNameEl.value) == false ){
        alert('올바른 영문이름을 입력해주세요. ( 영문만 입력가능 )');
        engNameEl.focus();
        return;
      }

      // 생년월일 체크
      if ( input.regNumber1El == null ) {
        return;
      }

      if ( input.regNumber1El.length == 0 ) {
        alert('생년월일을 입력해 주세요.');
        return;
      }

      if (regNumber1Check(input.regNumber1El) == false){
        alert('올바른 생년월일을 입력해주세요.')
        return;
      }

      if ( input.regNumber2El.length == 0 ) {
        alert('성별 식별 번호를 입력해 주세요.');
        return;
      }

      if (regNumber2Check(input.regNumber2El) == false){
        alert('올바른 식별 번호를 입력해 주세요. ( 1 ~ 4 입력 가능)');
        return;
      }

      if ( input.regNumber2El.substring(0,1) == '1' || input.regNumber2El.substring(0,1) == '3') {
        input.gender = '남';
      } 
      else {
        input.gender = '여';
      }

      const regNumber = input.regNumber1El + input.regNumber2El;

      // 주소 체크
      if ( input.addressEl.length == 0 ) {
        alert('주소를 입력해 주세요.');
        return;
      }

      // 휴대전화번호 체크
      if ( cellPhoneNoElRef.value == null ) {
        return;
      }
      const cellPhoneNoEl = cellPhoneNoElRef.value;
      cellPhoneNoEl.value = cellPhoneNoEl.value.trim();
      if ( cellPhoneNoEl.value.length == 0 ) {
        alert('휴대전화번호를 입력해주세요.');
        cellPhoneNoEl.focus();
        return;
      }

      if(phoneCheck(cellPhoneNoEl.value) == false){
        alert('전화번호 양식에 맞춰 입력해주세요 ( - 없이 숫자만 입력 가능 )');
        cellPhoneNoEl.focus();
        return;
      }

      const startModify = () => {
        modify(util.toStringOrNull(globalState.loginedMember.id), nameEl.value, engNameEl.value, input.gender, regNumber.toString(), input.addressEl, cellPhoneNoEl.value, input.nickNameEl, input.feetEl, input.weightEl, input.featureEl, input.filmgraphyEl, input.jobAreaEl, input.corpEl);
      }

      const startFileUpload = (onSuccess:Function) => {
        if ( input.fileEl == null || input.fileEl.size == 0 ) {
          onSuccess();
          return;
        }

        if ( localStorage.getItem('profileImgCount') == null ){
          localStorage.setItem('profileImgCount', '1')
        } else if ( localStorage.getItem('profileImgCount') != null ){
          input.profileImgCount = util.toIntOrNull(localStorage.getItem('profileImgCount'))
          input.profileImgCount = ++input.profileImgCount
          localStorage.removeItem('profileImgCount')
          localStorage.setItem('profileImgCount', input.profileImgCount + '')
        }
        
        mainApi.common_profileImg_genFile_doUpload(input.fileEl, util.toStringOrNull(globalState.loginedMember.id), util.toStringOrNull(input.profileImgCount))
          .then(axiosResponse => {
            if ( axiosResponse.data.fail ) {
              alert(axiosResponse.data.msg);
              return;
            }
            else {
              onSuccess();
            }
          });
      };
      
      startFileUpload(startModify);
    }

    function modify(loginedMemberId: string, name:string, engName:string, gender:string, regNumber:string, address:string, cellPhoneNo:string, nickName:string, feet:number, weight:number, feature:string, filmgraphy:string, jobArea:string, corp:string) {
      mainApi.ap_doModifyForKakao(loginedMemberId, name, engName, gender, regNumber, address, cellPhoneNo, nickName, feet, weight, feature, filmgraphy, jobArea, corp)
        .then(axiosResponse => {
          if ( axiosResponse.data.resultCode.includes('F-') ) {
            alert(axiosResponse.data.msg);
            return;
          }

          const loginedMember = axiosResponse.data.body.ap;

          if( loginedMember.nickName != null ){
              localStorage.removeItem("loginedMemberNickName");
          }
          if( loginedMember.feet != null ){
              localStorage.removeItem("loginedMemberFeet");
          }
          if( loginedMember.weight != null ){
              localStorage.removeItem("loginedMemberWeight");
          }
          if( loginedMember.feature != null ){
              localStorage.removeItem("loginedMemberFeature");
          }
          if( loginedMember.filmgraphy != null ){
              localStorage.removeItem("loginedMemberFilmgraphy");
          }
          if( loginedMember.jobArea != null ){
              localStorage.removeItem("loginedMemberJobArea");
          }
          if( loginedMember.corp != null ){
              localStorage.removeItem("loginedMemberCorp");
          }

          localStorage.setItem("loginedMemberName", loginedMember.name);
          localStorage.setItem("loginedMemberCellPhoneNo", loginedMember.cellPhoneNo);
          localStorage.setItem("loginedMemberEngName", loginedMember.engName);
          localStorage.setItem("loginedMemberGender", loginedMember.gender);
          localStorage.setItem("loginedMemberRegNumber", loginedMember.regNumber);
          localStorage.setItem("loginedMemberAddress", loginedMember.address);
          localStorage.setItem("loginedMemberNickName", loginedMember.nickName);
          localStorage.setItem("loginedMemberFeet", loginedMember.feet + "");
          localStorage.setItem("loginedMemberWeight", loginedMember.weight + "");
          localStorage.setItem("loginedMemberFeature", loginedMember.feature);
          localStorage.setItem("loginedMemberFilmgraphy", loginedMember.filmgraphy);
          localStorage.setItem("loginedMemberJobArea", loginedMember.jobArea);
          localStorage.setItem("loginedMemberCorp", loginedMember.corp);

          router.replace('/home/main').finally(()=>{location.reload()})

        });
    }

    const showProfileImg = () => {
      mainApi.common_ap_genFile_getProfileImgUrls(util.toIntOrNull(globalState.loginedMember.id))
        .then(axiosResponse => {

          if ( axiosResponse.data.fail ) {
            alert(axiosResponse.data.msg);
            return;
          } else {
            input.profileImgs = axiosResponse.data.body.imgUrls
          }

        });
    }

    function setThumbnail(event:any){
      
      var reader = new FileReader(); 
      fileType.type = event.target.files[0].type as string;
      reader.onload = function(event) { 
        var elements:any;
        if( fileType.type.startsWith("image") ){
          elements = document.querySelectorAll('img'); 
        }else if ( fileType.type.startsWith("video")) {
          elements = document.querySelectorAll('video'); 
        }
        
        if( elements == null ) {
          return;
        }
        if(event.target?.result == null && typeof event.target?.result != 'string' ){
          return;
        }
        if( typeof event.target.result == 'number' || typeof event.target.result == 'bigint'
        || typeof event.target.result == 'boolean' || typeof event.target.result == 'symbol' || typeof event.target.result == 'undefined' ||  
        typeof event.target.result == 'object' || typeof event.target.result == 'function'
        ){
          return
        }

        for ( var i = 0; i < elements.length; i++){
          elements[i].setAttribute("src", event.target.result);
        }

        const imgContainers = document.querySelectorAll(".image_container")

        for ( var i = 0; i < imgContainers.length; i++){
          imgContainers[i].append(elements[i])
        }

        
        
      }; 
        
      reader.readAsDataURL(event.target.files[0]);
      input.fileEl = event.target.files[0];
    }

    onMounted(showProfileImg)
    return {
      checkAndModify,
      nickNameElRef,
      feetElRef,
      weightElRef,
      featureElRef,
      filmgraphyElRef,
      jobAreaElRef,
      corpElRef,
      input,
      confirm,
      presentActionSheet,
      deleteActionSheet,
      presentAlertMultipleButtons,
      setThumbnail,
      fileType,
      profileImgFileElRef,
      nameElRef,
      engNameElRef,
      regNumber1ElRef,
      regNumber2ElRef,
      addressElRef,
      cellPhoneNoElRef,
      api,
      openApi
    }
  }
})
</script>

<style scoped>
input{
  border: solid 2px #dadada;
  height: 48px;
  padding: 0 10px;
}

ion-input{
  border: solid 2px #dadada;
  height: 48px;
  padding: 0 10px;
}

.cbg-gray {
  background-color: #dadada;
}

.red {
  background-color:red;
}

input[type="radio"] {
  width: 100%;
  height: 48px;
  -webkit-appearance: none; /*to disable the default appearance of radio button*/
  -moz-appearance: none;
  overflow-x: hidden;
}

input[type="radio"]:focus { /*no need, if you don't disable default appearance*/
  outline: none; /*to remove the square border on focus*/
}

input[type="radio"]:checked { /*no need, if you don't disable default appearance*/
  background-color: #dadada;
}

label input {
  position: relative;
}
label span {
  position: relative;
  left: 41%;
  top: -42px;
}
</style>

<style>
</style>