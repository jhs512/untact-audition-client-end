<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title class="ion-text-center">로그인 페이지</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="grid grid-rows-2">
        <section class="px-2 mt-5">
          <div class="container mx-auto">
            <div>
              <form v-on:submit.prevent="checkAndLogin">
                <FormRow title="아이디">
                  <input ref="loginIdElRef" class="form-row-input" type="text">
                </FormRow>
                <FormRow title="비밀번호">
                  <input ref="loginPwElRef" class="form-row-input" type="password">
                </FormRow>

                <div class="gray-color text-right text-xs mt-1">
                  <a href="#" class="underline">비밀번호가 기억나지 않으시나요?</a>
                </div>
                
                <div class="cbg-gray flex justify-center items-center h-12 mt-8 rounded">
                  <button type="submit" class="w-full h-full text-lg font-bold">LOGIN</button>
                </div>

                <div class="gray-color text-center text-xs mt-5">
                  <router-link to="/member/joinTos" class="underline">아이디가 없으신가요?</router-link>
                </div>
                
              </form>
            </div>
          </div>
        </section>

        <section class="grid grid-row-auto px-2 row-start-2">

          <div class="flex items-center justify-center">
            <div class="h-px w-36 cbg-gray"></div>
            <div class="mx-5">OR</div>
            <div class="h-px w-36 cbg-gray"></div>
          </div>

          <div class="container mx-auto row-start-2">
            <div class="flex justify-center">
              <a href="#">
                <img src="https://developers.kakao.com/tool/resource/static/img/button/login/full/en/kakao_login_medium_wide.png">  
              </a>
            </div>
          </div>
        </section>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useMainApi } from '@/apis';
import { useRoute } from 'vue-router';
import { sha256 } from 'js-sha256'

export default defineComponent({
  name: 'LoginPage',
  setup() {
    const route = useRoute();
    const mainApi = useMainApi();
    const loginIdElRef = ref<HTMLInputElement>();
    const loginPwElRef = ref<HTMLInputElement>();

    onMounted(() => {
      if ( route.query.loginId != null ) {
        if ( loginIdElRef.value == null ) {
          return;
        }
        if ( loginPwElRef.value == null ) {
          return;
        }
        loginIdElRef.value.value = route.query.loginId as any;
        loginPwElRef.value.focus();
      }
    })

    function checkAndLogin() {
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

      login(loginIdEl.value, sha256(loginPwEl.value));
    }
    function login(loginId:string, loginPw:string) {
      mainApi.ap_authKey(loginId, loginPw)
        .then(axiosResponse => {
          if ( axiosResponse.data.resultCode.includes('F-') ) {
            alert(axiosResponse.data.msg);
            return;
          }

          if ( axiosResponse.data.body.member.authStatus == 0){
            alert('아직 인증이 완료되지 않은 회원입니다. 인증 완료후 로그인 해주시길 바랍니다.')
            return;
          }

          alert(axiosResponse.data.msg);
          

          const authKey = axiosResponse.data.body.authKey;
          const loginedMemberId = axiosResponse.data.body.member.id;
          const regDate = axiosResponse.data.body.member.regDate;
          const updateDate = axiosResponse.data.body.member.updateDate;
          const loginedMemberLoginId = axiosResponse.data.body.member.loginId;
          const loginedMemberName = axiosResponse.data.body.member.name;
          const loginedMemberEngName = axiosResponse.data.body.member.engName;
          const loginedMemberNickName = axiosResponse.data.body.member.nickName;
          const loginedMemberGender = axiosResponse.data.body.member.gender;
          const loginedMemberRegNumber = axiosResponse.data.body.member.regNumber;
          const loginedMemberAddress = axiosResponse.data.body.member.address;
          const loginedMemberCellPhoneNo = axiosResponse.data.body.member.cellPhoneNo;
          const loginedMemberFeet = axiosResponse.data.body.member.feet;
          const loginedMemberWeight = axiosResponse.data.body.member.weight;
          const loginedMemberFeature = axiosResponse.data.body.member.feature;
          const loginedMemberFilmgraphy = axiosResponse.data.body.member.filmgraphy;
          const loginedMemberJobArea = axiosResponse.data.body.member.jobArea;
          const loginedMemberCorp = axiosResponse.data.body.member.corp;
          const loginedMemberAuthLevel = axiosResponse.data.body.member.authLevel;
          const loginedMemberAuthStatus = axiosResponse.data.body.member.authStatus;
          const loginedMemberExtra__thumbImg = axiosResponse.data.body.member.extra__thumbImg;
          const loginedMemberExtra__fileType = axiosResponse.data.body.member.extra__fileType;
      
          localStorage.setItem("authKey", authKey);
          localStorage.setItem("loginedMemberId", loginedMemberId + "");
          localStorage.setItem("regDate", regDate);
          localStorage.setItem("updateDate", updateDate);
          localStorage.setItem("loginedMemberLoginId", loginedMemberLoginId);
          localStorage.setItem("loginedMemberName", loginedMemberName);
          localStorage.setItem("loginedMemberNickName", loginedMemberNickName);
          localStorage.setItem("loginedMemberCellPhoneNo", loginedMemberCellPhoneNo);
          localStorage.setItem("loginedMemberEngName", loginedMemberEngName);
          localStorage.setItem("loginedMemberGender", loginedMemberGender);
          localStorage.setItem("loginedMemberRegNumber", loginedMemberRegNumber);
          localStorage.setItem("loginedMemberAddress", loginedMemberAddress);
          localStorage.setItem("loginedMemberFeet", loginedMemberFeet + "");
          localStorage.setItem("loginedMemberWeight", loginedMemberWeight + "");
          localStorage.setItem("loginedMemberFeature", loginedMemberFeature);
          localStorage.setItem("loginedMemberFilmgraphy", loginedMemberFilmgraphy);
          localStorage.setItem("loginedMemberJobArea", loginedMemberJobArea);
          localStorage.setItem("loginedMemberCorp", loginedMemberCorp);
          localStorage.setItem("loginedMemberAuthLevel", loginedMemberAuthLevel + "");
          localStorage.setItem("loginedMemberAuthStatus", loginedMemberAuthStatus + "");
          if( axiosResponse.data.body.member.extra__thumbImg == null ){
            localStorage.setItem("loginedMemberExtra__thumbImg", './img/user-icon.png');
          }else{
            localStorage.setItem("loginedMemberExtra__thumbImg", loginedMemberExtra__thumbImg);
          }
          localStorage.setItem("loginedMemberExtra__fileType", loginedMemberExtra__fileType);

          location.replace('/')
          
        });
    }
    return {
      checkAndLogin,
      loginIdElRef,
      loginPwElRef,
      
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