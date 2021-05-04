<template>
  <ion-page>
    <MainHeader />
    <ion-content>
      <section v-show="globalState.isLogined">
        <div class="px-6 pt-4 text-xs font-semibold">방금 올라온 공고</div>
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
          
          <ion-infinite-scroll
            @ionInfinite="loadData($event)" 
            threshold="100px" 
            id="infinite-scroll"
          >
            <ion-infinite-scroll-content
              loading-spinner="bubbles"
              loading-text="불러오는 중입니다...">
            </ion-infinite-scroll-content>
          </ion-infinite-scroll>

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

export default defineComponent({
  name:'MainPage',
  setup() {
    const mainApi = useMainApi();
    const globalState = useGlobalState();

    let limit:number = 5;
    let isAllRoaded = false;

    const state = reactive({
      recruits: [] as any[],
    });

    const loadData = (event:any) => {
      setTimeout(() => {
        limit = limit + 3
        recruitList(limit, null);
        console.log('Loaded data');
        event.target.complete();

        if ( isAllRoaded == true ){
          document.getElementById('infinite-scroll')?.setAttribute('disabled', 'true');
        }
      }, 500);
    }

    function showDetail(id:number) {
      router.push('/detail?id=' + id)
    }

    function recruitList(limit: number, keyword:[]|null) {
      mainApi.recruit_list(util.toStringOrNull(limit), keyword)
        .then(axiosResponse => {
          state.recruits = axiosResponse.data.body.recruits
        
          if ( axiosResponse.data.body.isAllLoaded == true ){
            isAllRoaded = true;
          }

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
      limit,
      loadData,
      showDetail
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
</style>