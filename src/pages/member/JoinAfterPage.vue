<template>
  <ion-page>
    <ion-content>

      <section class="h-full grid grid-rows-2 place-items-center text-center overflow-hidden">
        <div class="row-start-1">
          <div class="text-3xl font-bold">회원가입 완료</div>
        </div>
        
        <div class="row-start-2 w-64">
          <div class="text-xl font-bold">{{props.email}}</div>
          <div class="text-sm mt-4">인증 메일이 전송 되었습니다.</div>
          <div class="text-sm">인증이 완료되어야지 </div>
          <div class="text-sm mb-10">정상적인 로그인이 가능합니다.</div>
          
          <div class="mb-4 flex justify-center items-center h-full">
            <router-link class="w-full" to="/member/login">
              <ion-button color="light" class="w-full">로그인</ion-button>
            </router-link>
          </div>
        </div>
      </section>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'JoinAfterPage',
  props:{
    email : {
      type: String,
      required: true
    }
  },
  setup(props) {
    
    return{
      props
    }
  }
})
</script>

<style scoped>

</style>