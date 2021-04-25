<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button @click="historyBack" default-href="/"></ion-back-button>
        </ion-buttons>
        <ion-title class="ion-text-center">회원정보 수정</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content scroll-events="true">
      <form v-on:submit.prevent="checkAndModify">
        
        <section class="section-2">
          <div class="container mx-auto">
            <div class="px-6 py-6">
              
                <FormRow title="닉네임">
                  <input v-model="input.nickNameEl" ref="nickNameElRef" class="form-row-input" type="text">
                </FormRow>
                <FormRow title="키">
                  <input v-model="input.feetEl" ref="feetElRef" class="form-row-input" type="number">
                </FormRow>
                <FormRow title="몸무게">
                  <input v-model="input.weightEl" ref="weightElRef" class="form-row-input" type="number">
                </FormRow>
                <FormRow title="피부색">
                  <input v-model="input.skinToneEl" ref="skinToneElRef" class="form-row-input" type="text">
                </FormRow>
                <FormRow title="쌍커풀 유무">
                  <div class="flex">
                    <label class="w-full h-12">
                      <input ref="eyelidElRef" class="form-row-input" name="eyelid" type="radio" v-model="input.eyelidEl" value=1>
                      <span>있음</span>
                    </label>
                    <label class="w-full h-12">
                      <input ref="eyelidElRef" class="form-row-input" name="eyelid" type="radio" v-model="input.eyelidEl" value=2>
                      <span>없음</span>
                    </label>
                  </div>
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
  name: 'ModifyPage',
  setup(){
    const nickNameElRef = ref<HTMLInputElement>();
    const feetElRef = ref<HTMLInputElement>();
    const weightElRef = ref<HTMLInputElement>();
    const skinToneElRef = ref<HTMLInputElement>();
    const eyelidElRef = ref<HTMLInputElement>();
    const featureElRef = ref<HTMLInputElement>();
    const filmgraphyElRef = ref<HTMLInputElement>();
    const jobAreaElRef = ref<HTMLInputElement>();
    const corpElRef = ref<HTMLInputElement>();
    const profileImgFileElRef = ref<HTMLIonInputElement>();
    
    const mainApi = useMainApi();
    const globalState = useGlobalState();
    const { photos, takePhoto } = usePhotoGallery();

    const historyBack = () => {
      router.replace('/member/profile')
    }

    const input = reactive({
      eyelidEl: util.toIntOrNull(globalState.loginedMember.eyelid),
      nickNameEl: globalState.loginedMember.nickName,
      feetEl: util.toIntOrNull(globalState.loginedMember.feet),
      weightEl: util.toIntOrNull(globalState.loginedMember.weight),
      skinToneEl: globalState.loginedMember.skinTone,
      featureEl: globalState.loginedMember.feature,
      filmgraphyEl: globalState.loginedMember.filmgraphy,
      jobAreaEl: globalState.loginedMember.jobArea,
      corpEl: globalState.loginedMember.corp,
      profileImgs: [] as any[],
      fileEl:new File([''],''),
      profileImgCount: 1
    })

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
                console.log('Cancel clicked')
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
                console.log('Cancel clicked')
              },
            },
          ],
        });
      await actionSheet.present();

      const { role } = await actionSheet.onDidDismiss();
    }

    function checkAndModify() {

      const startModify = () => {
        modify(util.toStringOrNull(globalState.loginedMember.id), input.nickNameEl, input.feetEl, input.weightEl, input.skinToneEl, input.eyelidEl, input.featureEl, input.filmgraphyEl, input.jobAreaEl, input.corpEl);
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

    function modify(loginedMemberId: string, nickName:string, feet:number, weight:number, skinTone:string, eyelid:number, feature:string, filmgraphy:string, jobArea:string, corp:string) {
      mainApi.ap_doModify(loginedMemberId, nickName, feet, weight, skinTone, eyelid, feature, filmgraphy, jobArea, corp)
        .then(axiosResponse => {
          if ( axiosResponse.data.resultCode.includes('F-') ) {
            alert(axiosResponse.data.msg);
            return;
          }

          const loginedAp = axiosResponse.data.body.ap;

          if( loginedAp.nickName != null ){
              localStorage.removeItem("loginedMemberNickName");
          }
          if( loginedAp.feet != null ){
              localStorage.removeItem("loginedMemberFeet");
          }
          if( loginedAp.weight != null ){
              localStorage.removeItem("loginedMemberWeight");
          }
          if( loginedAp.skinTone != null ){
              localStorage.removeItem("loginedMemberSkinTone");
          }
          if( loginedAp.eyelid != null ){
              localStorage.removeItem("loginedMemberEyelid");
          }
          if( loginedAp.feature != null ){
              localStorage.removeItem("loginedMemberFeature");
          }
          if( loginedAp.filmgraphy != null ){
              localStorage.removeItem("loginedMemberFilmgraphy");
          }
          if( loginedAp.jobArea != null ){
              localStorage.removeItem("loginedMemberJobArea");
          }
          if( loginedAp.corp != null ){
              localStorage.removeItem("loginedMemberCorp");
          }

          localStorage.setItem("loginedMemberNickName", loginedAp.nickName);
          localStorage.setItem("loginedMemberFeet", loginedAp.feet + "");
          localStorage.setItem("loginedMemberWeight", loginedAp.weight + "");
          localStorage.setItem("loginedMemberSkinTone", loginedAp.skinTone);
          localStorage.setItem("loginedMemberEyelid", loginedAp.eyelid + "");
          localStorage.setItem("loginedMemberFeature", loginedAp.feature);
          localStorage.setItem("loginedMemberFilmgraphy", loginedAp.filmgraphy);
          localStorage.setItem("loginedMemberJobArea", loginedAp.jobArea);
          localStorage.setItem("loginedMemberCorp", loginedAp.corp);

          router.replace('/member/profile').finally(()=>{location.reload()})

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
      skinToneElRef,
      eyelidElRef,
      featureElRef,
      filmgraphyElRef,
      jobAreaElRef,
      corpElRef,
      input,
      confirm,
      historyBack,
      presentActionSheet,
      deleteActionSheet,
      presentAlertMultipleButtons,
      setThumbnail,
      fileType,
      profileImgFileElRef
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