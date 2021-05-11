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
      const slug = data.url.split(".com")[1];
      
      if ( slug.startsWith('/member/kakaoLogin')){
        const param = slug.split('code=')[1]
        router.push({name: "kakaoLogin", params: {code: param}})
      } 

      return{
        router
      }

    })
  }
});
</script>