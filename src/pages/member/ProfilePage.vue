<template>
  <ion-page>
    <MainHeader />
    <ion-content>
      <section>
        <div class="flex justify-center h-60 items-center">
          <div class="rounded-full w-32 h-32 overflow-hidden">
            <div :style="state.url" class="back-img w-full h-full bg-center bg-no-repeat bg-cover"></div>
          </div>
        </div>
        <div class="text-center flex flex-col justify-center itmes-center border-b">
          <span class="font-semibold text-3xl">{{globalState.loginedMember.nickName}}</span>
          <span class="font-medium text-sm my-2">본명 : {{globalState.loginedMember.name}}</span>
          <div>
            <ion-button @click="presentActionSheet" color="dark" size="small" fill="outline">프로필 편집</ion-button>
          </div>
        </div>

        <ion-segment @ionChange="segmentChanged($event)" value="profile" color="dark">
          <ion-segment-button value="profile">PROFILE</ion-segment-button>
          <ion-segment-button value="applying">APPLYING</ion-segment-button>
          <ion-segment-button value="like">LIKE</ion-segment-button>
        </ion-segment>

        <span v-if="segment.value == 'profile'">
          <div class="profile-list px-8 pt-2 font-semibold">
            <div><div class="w-2/5">이름 :</div><div class="w-2/4">{{globalState.loginedMember.name}}</div></div>
            <div><div class="w-2/5">영문이름 :</div><div class="w-2/4">{{globalState.loginedMember.engName}}</div></div>
            <div><div class="w-2/5">활동명 :</div><div class="w-2/4">{{globalState.loginedMember.nickName}}</div></div>
            <div><div class="w-2/5">키 :</div><div class="w-2/4">{{globalState.loginedMember.feet}}</div></div>
            <div><div class="w-2/5">몸무게 :</div><div class="w-2/4">{{globalState.loginedMember.weight}}</div></div>
            <div><div class="w-2/5">성별 :</div><div class="w-2/4">{{globalState.loginedMember.gender}}</div></div>
            <div><div class="w-2/5">피부색 :</div><div class="w-2/4">{{globalState.loginedMember.skinTone}}</div></div>
            <div><div class="w-2/5">쌍커풀 유무 :</div><div class="w-2/4">{{globalState.loginedMember.eyelid == 1 ? '유' : '무'}}</div></div>
            <div><div class="w-2/5">특징 :</div><div class="w-2/4">{{globalState.loginedMember.feature}}</div></div>
            <div><div class="w-2/5">커리어 :</div><div class="w-2/4">{{globalState.loginedMember.filmgraphy}}</div></div>
            <div><div class="w-2/5">희망분야 :</div><div class="w-2/4">{{globalState.loginedMember.jobArea}}</div></div>
          </div>
          <ion-grid v-if="state.profileImgs.length != 0">
            <ion-row>
              <ion-col size="6" v-for="imgUrl in state.profileImgs">
                <ion-img :src="imgUrl"></ion-img>
              </ion-col>
            </ion-row>
          </ion-grid>
        </span>

        <span v-if="segment.value == 'applying'">applying text</span>
        <span v-if="segment.value == 'like'">like text</span>

      </section>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { actionSheetController, alertController  } from '@ionic/vue';
import { defineComponent, onMounted, reactive } from 'vue';
import { useGlobalState } from '@/stores'
import { close } from 'ionicons/icons';
import { usePhotoGallery, Photo } from '@/composables/usePhotoGallery';
import { useMainApi } from '@/apis';
import * as util from '@/utils';
import router from '@/router';

export default defineComponent({
  name: 'ProfilePage',
  setup() {
    const globalState = useGlobalState();
    const mainApi = useMainApi();

    const state = reactive({
      url : "background-image: url('" + globalState.loginedMember.extra__thumbImg + "')",
      profileImgs: [] as any[],
    })

    const segment = reactive({
      value: 'profile'
    })

    function segmentChanged(event:any) {
      segment.value = event.target.value;
    }

    const { photos, takePhoto } = usePhotoGallery();

    async function presentAlertMultipleButtons() {
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
                localStorage.setItem("loginedMemberExtra__thumbImg", './img/user-icon.png')

                const deleteGenFile = async () => {
                  await mainApi.common_ap_genFile_deleteGenFile(util.toIntOrNull(globalState.loginedMember.id))
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
          header: '프로필 설정',
          cssClass: 'my-custom-class',
          buttons: [
            {
              text: '사진 삭제',
              role: 'destructive',
              handler: () => {
                presentAlertMultipleButtons()
              },
            },
            {
              text: '사진 촬영',
              handler: () => {
                takePhoto().finally(() => {

                  const input = reactive ({
                    fileEl: photos.value[photos.value.length-1].file
                  })

                  const changeThumnailImage = () => {
                    mainApi.common_ap_genFile_getThumbImgUrl(util.toIntOrNull(globalState.loginedMember.id))
                      .then(axiosResponse => {

                        if ( axiosResponse.data.fail ) {
                          alert(axiosResponse.data.msg);
                          return;
                        }
                        else {
                          localStorage.setItem("loginedMemberExtra__thumbImg", axiosResponse.data.body.imgUrl)                          
                          location.reload()
                        }
                      });
                  }

                  const startFileUpload = (onSuccess:Function) => {
                    if ( input.fileEl == null || input.fileEl.size == 0 ) {
                      return;
                    }
                    
                    mainApi.common_ap_genFile_doUploadForAdd(input.fileEl, util.toStringOrNull(globalState.loginedMember.id))
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
                  
                  startFileUpload(changeThumnailImage)
                })
                
              },
            },
            {
              text: '사진 선택',
              handler: () => {
                
              },
            },
            {
              text: '정보 수정',
              handler: () => {
                router.replace('/member/modify')
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

    const showProfileImg = () => {
      mainApi.common_ap_genFile_getProfileImgUrls(util.toIntOrNull(globalState.loginedMember.id))
        .then(axiosResponse => {

          if ( axiosResponse.data.fail ) {
            alert(axiosResponse.data.msg);
            return;
          } else {
            state.profileImgs = axiosResponse.data.body.imgUrls
          }

        });
    }

    onMounted(showProfileImg)

    return {
      segmentChanged,
      segment,
      globalState,
      presentActionSheet,
      state,
      photos,
      takePhoto
    }
  }
})
</script>

<style scoped>

.profile-list > div{
  display: flex;
  margin-bottom: 10px;
}
</style>