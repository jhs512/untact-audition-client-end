<template>
  <ion-page>
    <MainHeader />
    <ion-content>
      <section v-show="globalState.isLogined">
        <div class="px-6 pt-4 text-xs font-semibold">
          <span class="subtitle">방금 올라온 공고</span>
        </div>
        <div class="px-2 text-center">
          <ion-card v-for="recruit in state.recruits">
            <ion-card-header @click="showDetail(recruit.id)" class="cursor-pointer">
              <ion-card-title>가제 : ({{recruit.title}})</ion-card-title>
              <ion-card-subtitle>감독 : ({{recruit.extra__aw_director}})</ion-card-subtitle>
              <ion-card-subtitle v-if="recruit.dateDiff > 0">기한 : {{recruit.dateDiff}}일</ion-card-subtitle>
              <ion-card-subtitle v-if="recruit.dateDiff == 0">기한 : 오늘까지</ion-card-subtitle>
              <ion-card-subtitle v-if="recruit.dateDiff < 0">기한 마감</ion-card-subtitle>
              <ion-card-subtitle v-if="recruit.extra != null">
                <img :src="recruit.extra.file__common__attachment[1].forPrintUrl" alt="">
              </ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
              <div>배역: ({{recruit.extra__ar_name}})</div>
              <div>특징: ({{recruit.extra__ar_character}})</div>
            </ion-card-content>
          </ion-card>
        </div>

        <div class="px-6 pt-4 text-xs font-semibold">
          <span class="subtitle">많이 물어본 질문</span>
        </div>

        <div class="px-2 text-center">
          <ion-card>
            <ion-card-header class="cursor-pointer font-bold py-7">
              <ion-card-title class="font-bold pb-5">캐스팅은 어떻게 진행되나요?</ion-card-title>
              <ion-card-subtitle class="font-bold justify-end mr-10 flex items-center">알아보기 <ion-icon :icon="arrowForwardOutline"></ion-icon></ion-card-subtitle>
            </ion-card-header>
          </ion-card>
          <ion-card>
            <ion-card-header class="cursor-pointer font-bold py-7">
              <ion-card-title class="font-bold pb-5">익명성 보장이 되나요?</ion-card-title>
              <ion-card-subtitle class="font-bold justify-end mr-10 flex items-center">알아보기 <ion-icon :icon="arrowForwardOutline"></ion-icon></ion-card-subtitle>
            </ion-card-header>
          </ion-card>
        </div>

      </section>
    </ion-content>

  </ion-page>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue';
import { useGlobalState } from '@/stores';
import { useMainApi } from '@/apis';
import router from '@/router';
import * as util from '@/utils';
import { arrowForwardOutline } from 'ionicons/icons';

export default defineComponent({
  name:'MainPage',
  setup() {
    const mainApi = useMainApi();
    const globalState = useGlobalState();

    let limit:number = 2;

    const state = reactive({
      recruits: [] as any[],
    });

    function showDetail(id:number) {
      router.push('/detail?id=' + id)
    }

    function recruitList(limit: number, keyword:[]|null) {
      mainApi.recruit_list(util.toStringOrNull(limit), keyword)
        .then(axiosResponse => {
          state.recruits = axiosResponse.data.body.recruits

          for(var i = 0 ; i < state.recruits.length ; i++ ){
            let today = new Date();
            let regDate = new Date(state.recruits[i].deadline);

            state.recruits[i].dateDiff = Math.ceil((regDate.getTime()-today.getTime())/(1000*3600*24)); 
          }
        });
    }

    onMounted(() => { 
      recruitList(limit, null);
    });

    return {
      globalState,
      state,
      recruitList,
      showDetail,
      arrowForwardOutline
    }
  }
})
</script>

<style scoped>
  .text-size {
    font-size: 12px;
    color:black;
  }

  ion-card {
    border-radius:25px;
    box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.25);
    border:2px solid #DADADA;
  }

  .subtitle{
    background: linear-gradient(white 60%,rgba(200, 94, 94, 0.44) 10%);
  }

  ion-icon {
    --ionicon-stroke-width: 60px;
  }
</style>