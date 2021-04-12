<template>
  <ion-page>
    <ion-tabs>
      <ion-tab-bar class="border-t" v-show="globalState.isLogined" slot="bottom">

        <ion-tab-button tab="home" href="/home">
            <ion-icon :icon="homeOutline" />
        </ion-tab-button>
        
        <ion-tab-button tab="search" href="/search">
          <ion-icon :icon="searchOutline" />
        </ion-tab-button>
          
        <ion-tab-button tab="recruit" href="/recruit">
          <ion-label>AD</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="member" href="/member">
          <ion-icon :icon="personOutline" />
        </ion-tab-button>
        
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { homeOutline, videocamOutline, searchOutline, personOutline } from 'ionicons/icons';
import { useGlobalState } from '@/stores'

export default {
  name: 'Tabs',
  setup() {

    const globalState = useGlobalState();

    return {
      homeOutline,
      searchOutline,
      videocamOutline,
      personOutline,
      globalState
    }
  }
}
</script>