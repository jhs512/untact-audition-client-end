<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title class="ion-text-center">비밀번호 찾기</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="grid grid-rows-2">
        <section class="px-2 mt-5">
          <div class="container mx-auto">
            <div>
              <form v-on:submit.prevent="checkAndFindLoginPw">
                <FormRow title="로그인 아이디">
                  <input ref="loginIdElRef" class="form-row-input" type="text">
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
                  <button type="submit" class="w-full h-full text-lg font-bold">비밀번호 찾기</button>
                </div>

                <div class="gray-color text-center text-xs mt-5">
                  <router-link to="/member/joinTos" class="underline">아이디가 없으신가요?</router-link>
                </div>

                <div class="gray-color text-center text-xs mt-5">
                  <router-link to="/member/findLoginId" class="underline">아이디가 기억나지 않으시나요?</router-link>
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

    const loginIdElRef = ref<HTMLInputElement>();
    const regNumber1ElRef = ref<HTMLIonInputElement>();
    const regNumber2ElRef = ref<HTMLIonInputElement>();
    const mainApi = useMainApi();

    const input = reactive({
      regNumber1El:'',
      regNumber2El:''
    })

    

    const checkAndFindLoginPw = () => {

      function idCheck(emailBits:string){
        var idPattern = /^[A-Za-z0-9]{2,19}$/
        return(emailBits != '' && emailBits != 'undefined' && idPattern.test(emailBits))
      }

      function email_check( email:string ) { 
        var emailPattern  = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/; 
        return (email != '' && email != 'undefined' && emailPattern .test(email)); 
      }
      
      function regNumber1Check(regNumber: string){
        var regNumberPattern = /([0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[1,2][0-9]|3[0,1]))/;
        return (regNumber != '' && regNumber != 'undefined' && regNumberPattern .test(regNumber)); 
      }
      function regNumber2Check(regNumber: string){
        var regNumberPattern = /^[1-4]$/;
        return (regNumber != '' && regNumber != 'undefined' && regNumberPattern .test(regNumber)); 
      }

      // 로그인아이디 체크
      if ( loginIdElRef.value == null ) {
        return;
      }
      const loginIdEl = loginIdElRef.value;
      loginIdEl.value = loginIdEl.value.trim();
      if ( loginIdEl.value.length == 0 ) {
        alert('로그인 아이디를 입력해주세요.');
        loginIdEl.focus();
        return;
      }
      const emailBits = loginIdEl.value.split('@');

      if ( idCheck(emailBits[0]) == false ){
        alert('올바른 아이디를 입력해주세요.( 한자리 아이디 및 특수문자 사용 불가 )')
        loginIdEl.focus();
        return;
      }

      if ( email_check(loginIdEl.value) == false ) {
        alert('이메일 형식으로 아이디를 입력해주세요.')
        loginIdEl.focus();
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
      findLoginPw(loginIdEl.value, regNumber)
    }

    function findLoginPw(loginId:string, regNumber:string){
      mainApi.ap_findLoginPw(loginId, regNumber)
        .then(axiosResponse => {
          if ( axiosResponse.data.resultCode.includes('F-') ) {
            alert(axiosResponse.data.msg);
            return;
          } else {
            router.replace('/member/findPwAfter?email=' + loginId )
          }
        })
    }
    return{
      checkAndFindLoginPw,
      loginIdElRef,
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