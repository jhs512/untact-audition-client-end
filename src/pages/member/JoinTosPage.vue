<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button @click="historyBack" default-href="/"></ion-back-button>
        </ion-buttons>
        <ion-title class="ion-text-center">이용 약관 동의</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="container px-2 mx-auto">

    
    <div class="h-1 w-full cbg-gray mb-3 mt-5"></div>

    <div>
      <div class="grid custom-grid my-3 gray-color text-xs">
        <input :checked="state.isCheckTos1" v-on:change="checkTos1" ref="agreeCheckElRef" type="checkbox" class="ml-4">
        <div class="text-left">(필수) Audictionary 이용약관</div>
        <div @click="openTos1Modal" class="detail text-center">자세히보기</div>
      </div>
      <div class="grid custom-grid my-3 gray-color text-xs">
        <input :checked="state.isCheckTos2" v-on:change="checkTos2" ref="agreeCheckElRef" type="checkbox" class="ml-4">
        <div class="text-left">(필수) 개인정보 수집 및 이용에 대한 동의</div>
        <div @click="openTos2Modal" class="detail text-center">자세히보기</div>
      </div>
      <!--
      <div class="grid custom-grid my-3 gray-color text-xs">
        <input :checked="state.isCheckTos3" v-on:change="checkTos3" ref="agreeCheckElRef" type="checkbox" class="ml-4">
        <div class="text-left">(필수) 개인정보의 제3자 제공에 대한 동의</div>
        <div @click="openTos3Modal" class="detail text-center">자세히보기</div>
      </div> 
      -->
    </div>

    <div class="h-1 w-full cbg-gray my-3"></div>

    <div class="grid custom-grid2 my-3 gray-color text-xs">
      <input @click="check" v-on:change="check" :checked="state.isCheckTos1 && state.isCheckTos2 && state.isCheckTos3" ref="agreeCheckElRef" type="checkbox" class="ml-4">
      <div class="text-left">약관 내용을 숙지하였으며, 위 모든 약관에 동의합니다.</div>
    </div>

    <div class="grid grid-cols-2 place-items-center gap-6 text-center font-thin mt-8">
      <div class="w-full cbg-gray text-white">
        <div class="block w-full" @click="historyBack">동의하지않습니다.</div>
      </div>
      <div class="w-full bg-agree">
        <button class="w-full" type="button" @click="checkAndAgree">동의합니다.</button>
      </div>
    </div> 
  </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, getCurrentInstance} from 'vue'
import router from '@/router'
import { modalController } from '@ionic/vue'
import AudictionaryTosPage from '../tos/AudictionaryTosPage.vue'
import PrivacyPolicyTosPage from '../tos/PrivacyPolicyTosPage.vue'
//import ThirdPartyTosPage from '../tos/ThirdPartyTosPage.vue'

export default defineComponent({
  name: 'JoinTosPage',
  setup(){
    const historyBack = () => {
      history.back();
    }
    
    const agreeCheckElRef = ref<HTMLInputElement>();

    const state = reactive({
      isCheckTos1: false,
      isCheckTos2: false,
      //isCheckTos3: false
    });

    function checkTos1(event: any) {
      if (event.target.checked) {
        state.isCheckTos1 = true;
      } else {
        state.isCheckTos1 = false;
      }
    }

    function checkTos2(event: any) {
      if (event.target.checked) {
        state.isCheckTos2 = true;
      } else {
        state.isCheckTos2 = false;
      }
    }

    /*
    function checkTos3(event: any) {
      if (event.target.checked) {
        state.isCheckTos3 = true;
      } else {
        state.isCheckTos3 = false;
      }
    }
    */

    function check(event: any){
      if(event.target.checked) {
        state.isCheckTos1 = true;
        state.isCheckTos2 = true;
        //state.isCheckTos3 = true;
      } else {
        state.isCheckTos1 = false;
        state.isCheckTos2 = false;
        //state.isCheckTos3 = false;
      }
    }

    function checkAndAgree() {
      if ( state.isCheckTos1 == false || state.isCheckTos2 == false /*|| state.isCheckTos3 == false */ ) {
        alert('모든 필수 동의 약관에 체크해주시기 바랍니다.');
        return;
      }

      router.push('/member/join')
    }

    async function openTos1Modal(){
      const modal = await modalController
        .create({
          component: AudictionaryTosPage,
          componentProps: {
            modalController: modalController
          }
        })
        return modal.present();
    }

    async function openTos2Modal(){
      const modal = await modalController
        .create({
          component: PrivacyPolicyTosPage,
          componentProps: {
            modalController: modalController
          }
        })
        return modal.present();
    }

    /*
    async function openTos3Modal(){
      const modal = await modalController
        .create({
          component: ThirdPartyTosPage,
          componentProps: {
            modalController: modalController
          }
        })
        return modal.present();
    }
    */

    return{
      historyBack,
      checkAndAgree,
      agreeCheckElRef,
      state,
      check,
      checkTos1,
      checkTos2,
      //checkTos3,
      openTos1Modal,
      openTos2Modal,
      //openTos3Modal
    }
  }
})
</script>

<style scoped>
.cbg-gray{
  background-color: #dadada;
}

.gray-color{
  color: #50555C;
}

.custom-grid{
  grid-template-columns: 40px auto 80px;
}

.custom-grid2{
  grid-template-columns: 40px auto;
}

.detail {
  border:1px solid #dadada;
}

.bg-agree {
  background-color: #C85E5E;
  color: white;
}
</style>

<style>
</style>