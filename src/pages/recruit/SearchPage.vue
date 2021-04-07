<template>
  <ion-page>
    <MainHeader />
    <ion-content>
      <section>
        SearchPage
      </section>
    </ion-content>

  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useGlobalState } from '@/stores';


export default defineComponent({
  name:'SearchPage',
  setup() {

    const globalState = useGlobalState();
    
    return {
      globalState
    }
  }
})
</script>

<style scoped>
</style>