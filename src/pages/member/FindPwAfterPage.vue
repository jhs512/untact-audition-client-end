<template>
  <ion-page>
    <ion-content>

      <section class="h-full grid grid-rows-2 place-items-center text-center overflow-hidden">
        <div class="row-start-1">
          <div class="text-3xl font-bold">메일 전송 완료</div>
        </div>
        
        <div class="row-start-2 w-64">
          <div class="text-xl font-bold">{{props.email}}</div>
          <div class="text-sm mt-4">비밀번호 변경 페이지가 전송 되었습니다.</div>
          <div class="text-sm">비밀번호 변경 후</div>
          <div class="text-sm">로그인이 가능합니다.</div>
          <div class="text-sm mb-10">꼭 비밀번호 변경후 이용 바랍니다.</div>
          
          <div class="mb-4 flex justify-center items-center h-full">
            <ion-button @click="goLogin" color="light" class="w-full">로그인</ion-button>
          </div>
        </div>
      </section>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import router from '@/router'

export default defineComponent({
  name: 'FindPwAfterPage',
  props:{
    email : {
      type: String,
      required: true
    }
  },
  setup(props) {

    const goLogin = () => {
      router.replace('/member/login?email=' + props.email)
    }
    
    return{
      props,
      goLogin
    }
  }
})
</script>

<style scoped>

</style>