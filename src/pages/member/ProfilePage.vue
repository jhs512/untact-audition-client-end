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
            <div><div class="w-2/5">쌍커풀 유무 :</div><div class="w-2/4">{{globalState.loginedMember.eyelid}}</div></div>
            <div><div class="w-2/5">특징 :</div><div class="w-2/4">{{globalState.loginedMember.feature}}</div></div>
            <div><div class="w-2/5">커리어 :</div><div class="w-2/4">{{globalState.loginedMember.filmgraphy}}</div></div>
            <div><div class="w-2/5">희망분야 :</div><div class="w-2/4">{{globalState.loginedMember.jobArea}}</div></div>
          </div>
        </span>

        <span v-if="segment.value == 'applying'">applying text</span>
        <span v-if="segment.value == 'like'">like text</span>

      </section>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { actionSheetController, alertController  } from '@ionic/vue';
import { defineComponent, reactive } from 'vue';
import { useGlobalState } from '@/stores'
import { close } from 'ionicons/icons';

export default defineComponent({
  name: 'ProfilePage',
  setup() {
    const state = reactive({
      url : "background-image: url('https://picsum.photos/id/237/536/354')"
    })

    const globalState = useGlobalState();
    const segment = reactive({
      value: 'profile'
    })

    function segmentChanged(event:any) {
      segment.value = event.target.value;
    }

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
                state.url = "background-image: url('https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png')";
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

    return {
      segmentChanged,
      segment,
      globalState,
      presentActionSheet,
      state
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