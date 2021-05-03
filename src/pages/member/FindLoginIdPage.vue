<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title class="ion-text-center">아이디 찾기</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="grid grid-rows-2">
        <section class="px-2 mt-5">
          <div class="container mx-auto">
            <div>
              <form v-on:submit.prevent="checkAndFindLoginId">
                <FormRow title="이름">
                  <input ref="nameElRef" class="form-row-input" type="text">
                </FormRow>

                <FormRow title="주민등록번호">
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
                
                <div class="cbg-gray flex justify-center items-center h-12 mt-8 rounded">
                  <button type="submit" class="w-full h-full text-lg font-bold">아이디 찾기</button>
                </div>

                <div class="gray-color text-center text-xs mt-5">
                  <router-link to="/member/joinTos" class="underline">아이디가 없으신가요?</router-link>
                </div>

                <div class="gray-color text-center text-xs mt-5">
                  <router-link to="/member/findLoginPw" class="underline">비밀번호가 기억나지 않으시나요?</router-link>
                </div>
                
              </form>
            </div>
          </div>
        </section>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import { useMainApi } from '@/apis';
import * as util from '@/utils';
import router from '@/router';

export default defineComponent({
  name: 'FindLoginIdPage',
  setup() {

    const nameElRef = ref<HTMLInputElement>();
    const regNumber1ElRef = ref<HTMLIonInputElement>();
    const regNumber2ElRef = ref<HTMLIonInputElement>();
    const mainApi = useMainApi();

    const input = reactive({
      regNumber1El:'',
      regNumber2El:''
    })

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

    const checkAndFindLoginId = () => {
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

      const regNumber = input.regNumber1El + input.regNumber2El;

      findLoginId(nameEl.value, regNumber);
    }

    function findLoginId(name:string, regNumber:string){
      mainApi.ap_findLoginId(name, regNumber)
        .then(axiosResponse => {
          if ( axiosResponse.data.resultCode.includes('F-') ) {
            alert(axiosResponse.data.msg);
            return;
          } else {
            util.showAlert("Alert", "회원님의 로그인 아이디 : " + axiosResponse.data.body.loginId, function(){
              router.replace('/member/login?email=' + axiosResponse.data.body.loginId)
            })
            
          }
        })
    }
    return{
      checkAndFindLoginId,
      nameElRef,
      regNumber1ElRef,
      regNumber2ElRef,
      input
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

  .gray-color{
    color: #50555C;
  }
</style>