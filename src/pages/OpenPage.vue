<template>
  <ion-page>
    <ion-content>
      <div class="h-full grid grid-rows-2 place-items-center text-center overflow-hidden">
        <div class="row-start-1">
          <div class="text-4xl font-bold">Audictionary</div>
          <div>(로고)</div>
        </div>
        
        <div class="row-start-2 w-64">
          <div class="text-right">
            <ion-button fill="clear" class="text-size" href="/">
            제작자이신가요?
            </ion-button>
          </div>
          <div class="mb-4 flex justify-center items-center h-full">
            <ion-button color="light" href="/usr/ap/login" class="w-full">
            로그인
            </ion-button>
          </div>
          <div class="flex justify-center items-center h-full">
            <router-link class="w-full" to="/usr/ap/joinTos">
              <ion-button color="light" class="w-full">회원가입</ion-button>
            </router-link>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name:'OpenPage',
})
</script>

<style scoped>

.section-1 {
  display: flex;
  justify-content: center;
  height: 60%;
  font-size: 28px;
}

.main-content{
  align-self: center;
}

.text-size {
  font-size: 12px;
  color:black;
}
</style>