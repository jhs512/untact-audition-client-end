<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';
import { Plugins } from '@capacitor/core';
import router from '@/router';
const { App } = Plugins

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet
  },
  setup() {
    App.addListener('appUrlOpen', function (data: any) {
      const slug = data.url.split("ap.audictionary.com")[1];
      
      if ( slug.startsWith('/member/kakaoLogin')){
        const param = slug.split('code=')[1]
        router.push({name: "kakaoLogin", params: {code: param}})
      } 

      if ( slug.startsWith('/member/emailCert')){
        const params = slug.split('email=')[1];
        const emailBits = params.split('&emailCertKey=')[0];
        const emailCertKeyBits = params.split('&emailCertKey=')[1];
        router.push({name: "emailCert", params: {email: emailBits, emailCertKey: emailCertKeyBits}})
      }

      if ( slug.startsWith('/member/modifyPw')){
        const params = slug.split('email=')[1];
        const emailBits = params.split('&emailCertKey=')[0];
        const emailCertKeyBits = params.split('&emailCertKey=')[1];
        router.push({name: "modifyPw", params: {email: emailBits, emailCertKey: emailCertKeyBits}})
      }

      return{
        router
      }

    })
  }
});
</script>