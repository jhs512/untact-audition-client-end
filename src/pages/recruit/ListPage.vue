<template>
  <ion-page>
    <MainHeader />
    <ion-content>
      <section v-show="globalState.isLogined">
        <div class="px-2 text-center">
          <ion-card v-for="recruit in state.recruits">
            <ion-card-header @click="showDetail(recruit.id)" class="cursor-pointer">
              <ion-card-title>{{recruit.title}}</ion-card-title>
              <ion-card-subtitle>{{recruit.pay}}</ion-card-subtitle>
              <ion-card-subtitle v-if="recruit.dateDiff > 0">기한 : {{recruit.dateDiff}}일</ion-card-subtitle>
              <ion-card-subtitle v-if="recruit.dateDiff == 0">기한 : 오늘까지</ion-card-subtitle>
              <ion-card-subtitle v-if="recruit.dateDiff < 0">기한 마감</ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
              {{recruit.body}}
            </ion-card-content>
          </ion-card>
          
          <ion-infinite-scroll
            @ionInfinite="loadData($event)" 
            threshold="100px" 
            id="infinite-scroll"
            :disabled="isDisabled"
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
import { defineComponent, reactive, onMounted, watch } from 'vue';
import { useGlobalState } from '@/stores'
import { useMainApi } from '@/apis';
import router from '@/router'


export default defineComponent({
  name:'Listpage',
  setup() {
    const mainApi = useMainApi();
    const globalState = useGlobalState();

    let limit:number = 5;
    let isAllRoaded = false;
    let isDisabled = false;

    const state = reactive({
      recruits: [] as any[],
    });

    function showDetail(id:number) {
      router.push('/detail?id=' + id)
    }

    const loadData = (event:any) => {
      setTimeout(() => {
        limit = limit + 3
        recruitList(limit);
        console.log('Loaded data');
        event.target.complete();

        if ( isAllRoaded == true ){
          isDisabled = true;
        }
      }, 500);
    }

    function recruitList(limit: number) {
      mainApi.recruit_list(limit)
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
      recruitList(limit);
    });
    watch(() => limit, (newValue, oldValue) => {
      recruitList(limit);
    })

    return {
      globalState,
      state,
      recruitList,
      limit,
      loadData,
      isDisabled,
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
</style>