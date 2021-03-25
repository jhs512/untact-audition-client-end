<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button @click="historyBack" default-href="/"></ion-back-button>
        </ion-buttons>
        <ion-title class="ion-text-center">회원가입 페이지</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      asdf
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'JoinTosPage',
  setup(){
    const historyBack = () => {
      history.back();
    }
    return {
      historyBack
    }
  }
})
</script>

<style scoped>
</style>

<style>
</style>