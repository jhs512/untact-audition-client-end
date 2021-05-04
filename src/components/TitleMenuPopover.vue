<template>
  <ion-content class="ion-padding">
             <ion-item lines="none" button="true">
              <ion-label @click="notService" color="light" class="text-center">
                이것만은 꼭!
              </ion-label>
            </ion-item>

             <ion-item lines="none" button="true">
              <ion-label @click="notService" color="light" class="text-center">
                공지사항
              </ion-label>
            </ion-item>

             <ion-item lines="none" button="true">
              <ion-label @click="notService" color="light" class="text-center">
                문의사항
              </ion-label>
            </ion-item>

             <ion-item lines="none" button="true">
              <ion-label @click="notService" color="light" class="text-center">
                About Audictionary
              </ion-label>
            </ion-item>

            <ion-item lines="none" button="true">
              <ion-label @click="logout" color="light" class="text-center">
                로그아웃
              </ion-label>
            </ion-item>
  </ion-content>
</template>

<script>
import { useGlobalState } from '@/stores';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TitleMenuPopover',
  setup(){
    const globalState = useGlobalState();

    const logout = () => {
      globalState.logout();
    }

    function notService(){
      alert('추후 서비스 예정입니다.')
    }

    return{
      logout,
      notService
    }
  }
});
</script>

<style scoped>
ion-content{
  --background: #C85E5E;
}
ion-item {
  --background: #C85E5E;
}
ion-item::after{
  content:'';
  display:block;
  background-color:white;
  width:90%;
  height:1px;
  margin:0 auto;
}
</style>