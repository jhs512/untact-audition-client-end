<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button></ion-back-button>
      </ion-buttons>
      <div class="flex justify-end">
        <ion-title class="ion-text-center coda-font">Audictionary</ion-title>
        <ion-icon @click="setOpen(true, $event)" class="mr-2" size="large" name="menu-outline"></ion-icon>
      </div>
      <ion-popover mode="md" css-class="pop-over-style" :is-open="isOpenRef" :translucent="true" :onDidDismiss="setClose(false)">
        <Popover></Popover>
      </ion-popover>
    </ion-toolbar>
  </ion-header>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { menuOutline } from 'ionicons/icons';
import Popover from './TitleMenuPopover.vue'
import './global.css';

export default defineComponent({
  name: 'MainHeader',
  components:{
    Popover
  },
  setup(){
    const isOpenRef = ref(false);
    const event = ref();

    const setOpen = (isOpened: boolean) => {
      isOpenRef.value = isOpened;
    }
    const setClose = ( isOpened: boolean) => {
      isOpenRef.value = isOpened;
    }
    return{
      menuOutline,
      isOpenRef,
      event,
      setOpen,
      setClose
    }
  }
})
</script>

<style scoped>

</style>
