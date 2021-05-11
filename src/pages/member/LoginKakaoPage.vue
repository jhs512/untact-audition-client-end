<template>
<ion-page>
  <ion-content :fullscreen="true">
  <div class="login-form flex flex-col relative min-h-screen mb-20">
    
  </div>
</ion-content>
</ion-page>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import * as Util from '@/utils'
import { useMainApi } from '@/apis';



export default defineComponent({
  name: 'LoginKakaoPage',
  props:{
    code:{
      type: String,
      required:true
    }
  },
  setup(props) {
    const mainApi = useMainApi();

    mainApi.ap_KakaoLogin(props.code)
    .then(axiosResponse => {


          const authKey = axiosResponse.data.body.authKey;
          const loginedMember = axiosResponse.data.body.member;

          localStorage.setItem("isLoginedByKakao", "true");
          localStorage.setItem("loginedMemberType", "kakao");
          localStorage.setItem("authKey", authKey);
          
          localStorage.setItem("loginedMemberId", loginedMember.id + "");
          localStorage.setItem("loginedMemberLoginId", loginedMember.loginId);

          if( axiosResponse.data.body.member.extra == null ){
            localStorage.setItem("loginedMemberExtra__thumbImg", './img/user-icon.png');
          }else{
            localStorage.setItem("loginedMemberExtra__thumbImg", loginedMember.extra.thumbnail_image_url);
          }

          if ( axiosResponse.data.body.member.extra.existsMember ){
            localStorage.setItem("loginedMemberName", loginedMember.name);
            localStorage.setItem("loginedMemberCellPhoneNo", loginedMember.cellPhoneNo);
            localStorage.setItem("loginedMemberEngName", loginedMember.engName);
            localStorage.setItem("loginedMemberGender", loginedMember.gender);
            localStorage.setItem("loginedMemberRegNumber", loginedMember.regNumber);
            localStorage.setItem("loginedMemberAddress", loginedMember.address);
            localStorage.setItem("loginedMemberNickName", loginedMember.nickName);
            localStorage.setItem("loginedMemberFeet", loginedMember.feet + "");
            localStorage.setItem("loginedMemberWeight", loginedMember.weight + "");
            localStorage.setItem("loginedMemberFeature", loginedMember.feature);
            localStorage.setItem("loginedMemberFilmgraphy", loginedMember.filmgraphy);
            localStorage.setItem("loginedMemberJobArea", loginedMember.jobArea);
            localStorage.setItem("loginedMemberCorp", loginedMember.corp);
            Util.showAlert("알림", axiosResponse.data.msg, () => location.replace('/home/main'));
          } else {
            Util.showAlert("알림", axiosResponse.data.msg, () => location.replace('/member/updateKakao'));
          }

    })

    return {

   }
  }
  
  
})
</script>

<style scoped>
input, ion-input {
  border:2px solid #D4D4D4;
}
.login-form {
  color:#555050;
}
.bg-line-sep {
  height:2px;
  background-color:#DADADA;
  border-radius:10px;
}
.btn-next {
  background-color:#C4C4C4;
  border-radius:6px;
}

</style>