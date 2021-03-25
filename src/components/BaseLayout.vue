<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title> {{ pageTitle }} </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <slot />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent
} from '@ionic/vue'

export default defineComponent({
  name: 'BaseLayout',
  props: ['pageTitle'],
  component: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent
  }
})
</script>
