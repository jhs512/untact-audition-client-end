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
import { defineComponent, ref, reactive, onMounted } from 'vue';
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
    
    const mainApi = useMainApi();
    const globalState = useGlobalState();

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
    })

    function checkAndModify() {
      modify(util.toStringOrNull(globalState.loginedMember.id), input.nickNameEl, input.feetEl, input.weightEl, input.skinToneEl, input.eyelidEl, input.featureEl, input.filmgraphyEl, input.jobAreaEl, input.corpEl);
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
      historyBack
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