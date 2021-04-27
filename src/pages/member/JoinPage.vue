<template>
  <ion-page>
    <ion-content scroll-events="true">
      <form v-on:submit.prevent="checkAndJoin">
        <section v-show="state.pageNum == 1" class="section-1">
          <ion-header>
            <ion-toolbar>
              <ion-buttons slot="start">
                <ion-back-button default-href="/"></ion-back-button>
              </ion-buttons>
              <ion-title class="ion-text-center">회원가입 페이지</ion-title>
            </ion-toolbar>
          </ion-header>
          <div class="container mx-auto">
            <div class="px-6 py-6">
              
                <FormRow title="아이디 (이메일)">
                  <div class="relative flex items-center">
                    <input ref="loginIdElRef" class="form-row-input" type="email" placeholder="@gmail.com" @input="state.idCheckStatus = false">
                    <ion-button @click="checkId" size="small" color="medium" fill="solid" class="absolute right-0 mr-2">중복체크</ion-button>
                  </div>
                </FormRow>
                <FormRow title="비밀번호">
                  <input ref="loginPwElRef" class="form-row-input" type="password">
                </FormRow>
                <FormRow title="비밀번호 확인">
                  <input ref="loginPwConfirmElRef" class="form-row-input" type="password">
                </FormRow>
                <FormRow title="이름">
                  <input ref="nameElRef" class="form-row-input" type="text">
                </FormRow>
                <FormRow title="영문이름">
                  <input ref="engNameElRef" class="form-row-input" type="text">
                </FormRow>
                
                <FormRow title="주민등록번호">
                  <div class="flex items-center w-full mt-2">
                    <ion-input v-model="input.regNumber1El" type="text" ref="regNumber1ElRef" maxlength="6" inputmode="decimal" placeholder="앞 6자리" required="true" enterkeyhint="next"></ion-input>
                      <span class="mx-1">-</span>
                    <ion-input v-model="input.regNumber2El" type="text" ref="regNumber2ElRef" maxlength="7" inputmode="decimal" placeholder="뒤 7자리" required="true" enterkeyhint="next"></ion-input>
                  </div>
                </FormRow>
                <FormRow title="주소">
                  <ion-input readonly="true" v-model="input.addressEl" ref="addressElRef" type="text" placeholder="주소" required="true" enterkeyhint="next" class="input-address relative">
                    <ion-button fill="solid" size="small" color="medium" class="absolute right-0 mr-2" @click="openApi">검색</ion-button>
                  </ion-input>
                  <div v-if="api.isTrue" class="my-4">
                    <VueDaumPostcode @complete="confirm"/>
                  </div>
                  <ion-input v-model="input.address2El" ref="addressElRef" type="text" placeholder="상세주소" required="true" enterkeyhint="next" class="mt-2"></ion-input>
                </FormRow>
                <FormRow title="전화번호">
                  <input ref="cellPhoneNoElRef" class="form-row-input" type="tel">
                </FormRow>

                <div class="cbg-gray flex justify-center items-center h-12 mt-8 rounded">
                  <button type="button" @click="inputCheck" class="w-full h-full text-lg font-bold">다음단계</button>
                </div>
                
              
            </div>
          </div>
        </section>

        <section v-show="state.pageNum == 2" class="section-2">
          
            <ion-header>
            <ion-toolbar>
              <ion-buttons slot="start">
                <ion-back-button @click="pageBack" default-href="/"></ion-back-button>
              </ion-buttons>
              <ion-title class="ion-text-center">회원가입 페이지</ion-title>
            </ion-toolbar>
          </ion-header>

          <div class="container mx-auto">
            <div class="px-6 py-6">
              
                <FormRow title="닉네임">
                  <input ref="nickNameElRef" class="form-row-input" type="text">
                </FormRow>
                <FormRow title="키">
                  <input ref="feetElRef" value="0" class="form-row-input" type="number" pattern="[0-9]">
                </FormRow>
                <FormRow title="몸무게">
                  <input ref="weightElRef" value="0" class="form-row-input" type="number">
                </FormRow>
                <FormRow title="피부색">
                  <input ref="skinToneElRef" class="form-row-input" type="text">
                </FormRow>
                <FormRow title="쌍커풀 유무">
                  <div class="flex">
                    <label class="w-full h-12">
                      <input ref="eyelidElRef" class="form-row-input" name="eyelid" type="radio" v-model="state.eyelidPicked" value=1>
                      <span>있음</span>
                    </label>
                    <label class="w-full h-12">
                      <input ref="eyelidElRef" class="form-row-input" name="eyelid" type="radio" v-model="state.eyelidPicked" value=2>
                      <span>없음</span>
                    </label>
                  </div>
                </FormRow>
                <FormRow title="특징">
                  <input ref="featureElRef" class="form-row-input" type="text">
                </FormRow>
                <FormRow title="커리어">
                  <input ref="filmgraphyElRef" class="form-row-input" type="text">
                </FormRow>
                <FormRow title="희망분야">
                  <input ref="jobAreaElRef" class="form-row-input" type="text">
                </FormRow>
                <FormRow title="소속 회사">
                  <input ref="corpElRef" class="form-row-input" type="text">
                </FormRow>

                <div class="cbg-gray flex justify-center items-center h-12 mt-8 rounded">
                  <button type="submit" class="w-full h-full text-lg font-bold">회원가입</button>
                </div>
                
            </div>
          </div>
        </section>

      </form>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from 'vue';
import { useMainApi } from '@/apis';
import router from '@/router';
import * as Crypto from 'crypto-ts'
import { sha256 } from 'js-sha256'

export default defineComponent({
  name: 'JoinPage',
  setup(){

    const loginIdElRef = ref<HTMLInputElement>();
    const loginPwElRef = ref<HTMLInputElement>();
    const loginPwConfirmElRef = ref<HTMLInputElement>();
    const nameElRef = ref<HTMLInputElement>();
    const engNameElRef = ref<HTMLInputElement>();
    const regNumber1ElRef = ref<HTMLIonInputElement>();
    const regNumber2ElRef = ref<HTMLIonInputElement>();
    const addressElRef = ref<HTMLIonInputElement>();
    const cellPhoneNoElRef = ref<HTMLInputElement>();

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

    const input = reactive({
      addressEl:'',
      address2El:'',
      regNumber1El:'',
      regNumber2El:''
    })

    const state = reactive({
      pageNum: 1,
      eyelidPicked: 1,
      idCheckStatus: false,
      gender: ''
    })

    const nextPage = () => {
      state.pageNum = ++state.pageNum;
    }

    const pageBack = () => {
      state.pageNum = --state.pageNum;
    }

    const scrollToTop = () => {
      document.querySelector('ion-content')?.scrollToTop(500)
    }

    const checkId = () => {
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
      if ( email_check(loginIdEl.value) == false ) {
        alert('이메일 형식으로 아이디를 입력해주세요.')
        loginIdEl.focus();
        return;
      }

      idDupCheck(loginIdEl.value)
    }

    function email_check( email:string ) { 
      var regex = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/; 
      return (email != '' && email != 'undefined' && regex.test(email)); 
    }

    function idDupCheck(loginId:string) {
      mainApi.ap_doIdDupCheck(loginId)
        .then(axiosResponse => {

          if ( axiosResponse.data.resultCode.includes('F-') ) {
            alert('이미 사용중인 아이디입니다.');
            state.idCheckStatus = false;
          } else {
            alert('사용가능한 아이디입니다.');
            state.idCheckStatus = true;
          }
        });
    }

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

    const inputCheck = () => {
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
      if ( state.idCheckStatus == false ){
        alert('아이디 중복확인을 진행해주세요.')
        loginIdEl.focus();
        return
      }
      
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
      // 영문이름 체크
      if ( engNameElRef.value == null ) {
        return;
      }
      const engNameEl = engNameElRef.value;
      engNameEl.value = engNameEl.value.trim();
      if ( engNameEl.value.length == 0 ) {
        alert('영문이름을 입력해주세요.');
        engNameEl.focus();
        return;
      }

      // 주민등록번호 체크
      if ( input.regNumber1El == null ) {
        return;
      }

      if ( input.regNumber1El.length == 0 ) {
        alert('주민등록번호를 제대로 입력해 주세요.');
        return;
      }

      if ( input.regNumber2El.length == 0 ) {
        alert('주민등록번호를 입력해 주세요.');
        return;
      }

      if ( input.regNumber2El.substring(0,1) == '1' || input.regNumber2El.substring(0,1) == '3') {
        state.gender = '남';
      } 
      else {
        state.gender = '여';
      }

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

      nextPage()
      scrollToTop()
    }

    function checkAndJoin() {
      if ( loginIdElRef.value == null ) {
        return;
      }
      const loginIdEl = loginIdElRef.value;
      loginIdEl.value = loginIdEl.value.trim();

      

      if ( loginPwConfirmElRef.value == null ) {
        return;
      }
      const loginPwConfirmEl = loginPwConfirmElRef.value;
      loginPwConfirmEl.value = loginPwConfirmEl.value.trim()
      loginPwConfirmEl.value = sha256(loginPwConfirmEl.value);
      
      if ( nameElRef.value == null ) {
        return;
      }
      const nameEl = nameElRef.value;
      nameEl.value = nameEl.value.trim();
    
      if ( engNameElRef.value == null ) {
        return;
      }
      const engNameEl = engNameElRef.value;
      engNameEl.value = engNameEl.value.trim();

      const regNumberEl = input.regNumber1El + input.regNumber2El;  
      const regNumber = Crypto.AES.encrypt(regNumberEl,'regKey');

      if ( input.address2El.length != 0 ){
        input.addressEl = input.addressEl + " " + input.address2El;
      }
      
      if ( cellPhoneNoElRef.value == null ) {
        return;
      }
      const cellPhoneNoEl = cellPhoneNoElRef.value;
      cellPhoneNoEl.value = cellPhoneNoEl.value.trim();

      
      if ( nickNameElRef.value == null ) {
        return;
      }
      const nickNameEl = nickNameElRef.value;
      nickNameEl.value = nickNameEl.value.trim();

      if ( feetElRef.value?.valueAsNumber == null ) {
        return;
      }
      const feetEl = feetElRef.value.valueAsNumber;
      
      if ( weightElRef.value?.valueAsNumber == null ) {
        return;
      }
      const weightEl = weightElRef.value.valueAsNumber;
      
      if ( skinToneElRef.value == null ) {
        return;
      }
      const skinToneEl = skinToneElRef.value;
      skinToneEl.value = skinToneEl.value.trim();
    
      if ( featureElRef.value == null ) {
        return;
      }
      const featureEl = featureElRef.value;
      featureEl.value = featureEl.value.trim();
      
      if ( filmgraphyElRef.value == null ) {
        return;
      }
      const filmgraphyEl = filmgraphyElRef.value;
      filmgraphyEl.value = filmgraphyEl.value.trim();
      
      if ( jobAreaElRef.value == null ) {
        return;
      }
      const jobAreaEl = jobAreaElRef.value;
      jobAreaEl.value = jobAreaEl.value.trim();
      
      if ( corpElRef.value == null ) {
        return;
      }
      const corpEl = corpElRef.value;
      corpEl.value = corpEl.value.trim();

      join(loginIdEl.value, loginPwConfirmEl.value, nameEl.value, engNameEl.value, state.gender, regNumber.toString(), input.addressEl, cellPhoneNoEl.value, nickNameEl.value, feetEl, weightEl, skinToneEl.value, state.eyelidPicked, featureEl.value, filmgraphyEl.value, jobAreaEl.value, corpEl.value);
    }
    function join(loginId:string, loginPw:string, name:string, engName:string, gender:string, regNumber:string, address:string, cellPhoneNo:string, nickName:string, feet:number, weight:number, skinTone:string, eyelid:number, feature:string, filmgraphy:string, jobArea:string, corp:string) {
      mainApi.ap_doJoin(loginId, loginPw, name, engName, gender, regNumber, address, cellPhoneNo, nickName, feet, weight, skinTone, eyelid, feature, filmgraphy, jobArea, corp)
        .then(axiosResponse => {
          if ( axiosResponse.data.resultCode.includes('F-') ) {
            alert(axiosResponse.data.msg);
            return;
          }

          router.replace('/member/joinAfter?email=' + loginId)
        });
    }

    return {
      checkAndJoin,
      loginIdElRef,
      loginPwElRef,
      loginPwConfirmElRef,
      nameElRef,
      engNameElRef,
      regNumber1ElRef,
      regNumber2ElRef,
      addressElRef,
      cellPhoneNoElRef,
      nickNameElRef,
      feetElRef,
      weightElRef,
      skinToneElRef,
      eyelidElRef,
      featureElRef,
      filmgraphyElRef,
      jobAreaElRef,
      corpElRef,
      inputCheck,
      nextPage,
      pageBack,
      state,
      scrollToTop,
      checkId,
      api,
      openApi,
      confirm,
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