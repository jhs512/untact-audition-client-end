<template>
<ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title class="ion-text-center">비밀번호 변경</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="grid grid-rows-2">
        <section class="px-2 mt-5">
          <div class="container mx-auto">
            <div>
              <form v-on:submit.prevent="checkAndModifyPw">
                <FormRow title="비밀번호">
                  <input ref="loginPwElRef" class="form-row-input" type="password" placeholder="영어+특수문자+숫자 8~16자리">
                </FormRow>
                <FormRow title="비밀번호 확인">
                  <input ref="loginPwConfirmElRef" class="form-row-input" type="password">
                </FormRow>
                
                <div class="cbg-gray flex justify-center items-center h-12 mt-8 rounded">
                  <button type="submit" class="w-full h-full text-lg font-bold">비밀번호 변경</button>
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
import { useMainApi } from '@/apis';
import { defineComponent, ref } from 'vue';
import { sha256 } from 'js-sha256';
import * as util from '@/utils';
import router from '@/router';

export default defineComponent({
  name: 'ModifyPwPage',
  props:{
    email : {
      type: String,
      required: true
    },
    emailCertKey:{
      type:String,
      required:true
    }
  },
  setup(props) {

    const loginPwElRef = ref<HTMLInputElement>();
    const loginPwConfirmElRef = ref<HTMLInputElement>();

    const mainApi = useMainApi();

    function pwCheck(pw:string){
      var pwPattern = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
      return (pw != '' && pw != 'undefined' && pwPattern .test(pw)); 
    }


    const checkAndModifyPw = () => {
      // 로그인비번 체크
      if ( loginPwElRef.value == null ) {
        return;
      }
      const loginPwEl = loginPwElRef.value;
      loginPwEl.value = loginPwEl.value.trim();
      if ( loginPwEl.value.length == 0 ) {
        alert('로그인 비번을 입력해주세요.');
        loginPwEl.focus();
        return;
      }

      if ( pwCheck(loginPwEl.value) == false ){
        alert('올바른 비밀번호를 입력해주세요. (영어+특수문자+숫자 8~16자리)');
        loginPwEl.focus();
        return;
      }
      // 로그인비번확인 체크
      if ( loginPwConfirmElRef.value == null ) {
        return;
      }
      const loginPwConfirmEl = loginPwConfirmElRef.value;
      loginPwConfirmEl.value = loginPwConfirmEl.value.trim();
      if ( loginPwEl.value != loginPwConfirmEl.value ) {
        alert('로그인 비번이 일치하지 않습니다.');
        loginPwConfirmEl.focus();
        return;
      }

      loginPwConfirmEl.value = sha256(loginPwConfirmEl.value);

      modifyPw( props.email, loginPwConfirmEl.value, props.emailCertKey )
    }

    function modifyPw( loginId: string, loginPw: string, key: string ){
      mainApi.ap_modifyPw( loginId, loginPw, key )
        .then(axiosResponse => {
          if ( axiosResponse.data.resultCode.includes('F-') ) {
            alert(axiosResponse.data.msg);
            return;
          } else {
            util.showAlert("Alert", axiosResponse.data.msg, function(){
              router.replace('/member/login')
            })
          }
        })
    }
    
    return {
      props,
      checkAndModifyPw,
      loginPwElRef,
      loginPwConfirmElRef
      
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

  .cbg-gray {
    background-color: #dadada;
  }

  .gray-color{
    color: #50555C;
  }
</style>
