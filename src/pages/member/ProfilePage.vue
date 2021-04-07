<template>
  <ion-page>
    <MainHeader />
    <ion-content>
      <section>
        <div class="flex justify-center h-60 items-center">
          <div class="rounded-full w-32 h-32 overflow-hidden">
            <div class="back-img w-full h-full bg-center bg-no-repeat bg-cover"></div>
          </div>
        </div>
        <div class="text-center flex flex-col justify-center itmes-center border-b">
          <span class="font-semibold text-3xl">소민</span>
          <span class="font-medium text-sm my-2">소민하다</span>
        </div>

        <ion-segment @ionChange="segmentChanged($event)" value="profile" color="dark">
          <ion-segment-button value="profile">PROFILE</ion-segment-button>
          <ion-segment-button value="applying">APPLYING</ion-segment-button>
          <ion-segment-button value="like">LIKE</ion-segment-button>
        </ion-segment>

        <span v-if="segment.value == 'profile'">
          <div class="profile-list px-8 pt-2 font-semibold">
            <div><div class="w-2/5">이름 :</div><div class="w-2/4">최형석</div></div>
            <div><div class="w-2/5">영문이름 :</div><div class="w-2/4">Choi hyeong-seok</div></div>
            <div><div class="w-2/5">활동명 :</div><div class="w-2/4">J</div></div>
            <div><div class="w-2/5">키 :</div><div class="w-2/4">secret</div></div>
            <div><div class="w-2/5">몸무게 :</div><div class="w-2/4">secret</div></div>
            <div><div class="w-2/5">성별 :</div><div class="w-2/4">Male</div></div>
            <div><div class="w-2/5">피부색 :</div><div class="w-2/4">황</div></div>
            <div><div class="w-2/5">쌍커풀 유무 :</div><div class="w-2/4">무</div></div>
            <div><div class="w-2/5">특징 :</div><div class="w-2/4">활발함</div></div>
            <div><div class="w-2/5">커리어 :</div><div class="w-2/4">공부중</div></div>
            <div><div class="w-2/5">희망분야 :</div><div class="w-2/4">뮤지컬</div></div>
          </div>
        </span>

        <span v-if="segment.value == 'applying'">applying text</span>
        <span v-if="segment.value == 'like'">like text</span>

      </section>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { homeOutline, videocamOutline, searchOutline, personOutline } from 'ionicons/icons';

export default defineComponent({
  name: 'ProfilePage',
  setup() {

    const segment = reactive({
      value: 'profile'
    })

    function segmentChanged(event:any) {
      segment.value = event.target.value;
    }

    return {
      homeOutline,
      searchOutline,
      videocamOutline,
      personOutline,
      segmentChanged,
      segment
    }
  }
})
</script>

<style scoped>
.back-img {
  background-image: url('https://picsum.photos/id/237/536/354');
}

.profile-list > div{
  display: flex;
  margin-bottom: 10px;
}
</style>