<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button @click="setClose" default-href="/"></ion-back-button>
        </ion-buttons>
        <ion-title class="ion-text-center">Audictionary</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="text-center my-6 text-xl font-bold">
        <span class="border-b-2 pb-1">개인정보의 제3자 제공에 대한 동의</span>
      </div>
      <div class="px-3 mb-10">

      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ThirdPartyTosPage',
  props:{
    modalController:{
      type: Object,
      required:true
    }
  },
  setup(props){
    function setClose(){
      props.modalController.dismiss();
    }
    return{
      setClose
    }
  }
  
})
</script>

<style scoped>
  p, ul, li {
    font-size: 13px;
  }

  ul, li {
    padding: 5px 0 5px 0;
  }

</style>