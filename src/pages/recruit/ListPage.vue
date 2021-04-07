<template>
  <ion-page>
    <MainHeader />
    <ion-content>
      <section v-show="globalState.isLogined">
        <div class="px-2 text-center">
          <ion-card v-for="recruit in state.recruits">
            <ion-card-header>
              <ion-card-title>{{recruit.title}}</ion-card-title>
              <ion-card-subtitle>{{recruit.pay}}</ion-card-subtitle>
              <ion-card-subtitle>{{recruit.deadline}}</ion-card-subtitle>
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
import { IRecruit } from '@/types';


export default defineComponent({
  name:'Listpage',
  setup() {
    const mainApi = useMainApi();
    const globalState = useGlobalState();

    let limit:number = 5;
    let isAllRoaded = false;
    let isDisabled = false;

    const state = reactive({
      recruits: [] as IRecruit[],
    });

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
      isDisabled
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