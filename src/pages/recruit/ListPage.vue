<template>
  <ion-page>
    <MainHeader />
    <ion-content>
      <section v-show="globalState.isLogined">
        <div class="px-2 text-center">
          <div class="flex justify-end items-center mr-4 mt-2">
            <div @click="setOpen(true, $event)" class="flex items-center">
              <span class="mr-2">필터</span>
              <ion-icon :icon="filterOutline"></ion-icon>
              <ion-popover css-class="pop-over-filter" mode="md" :is-open="isOpenRef" :translucent="true" :onDidDismiss="setClose(false)">
                <ion-content>
                  <div class="p-4">
                    <ion-chip color="primary" :class="`chip_${index}`" @click="addFilter(item)" v-bind:key="item" v-for="(item,index) in filterItems">{{item}}</ion-chip>
                  </div>
                  
                </ion-content>
              </ion-popover>
            </div>
          </div>

          <ion-card v-for="recruit in state.recruits">
            <ion-card-header @click="showDetail(recruit.id)" class="cursor-pointer">
              <ion-card-title>{{recruit.title}}</ion-card-title>
              <ion-card-subtitle>{{recruit.pay}}</ion-card-subtitle>
              <ion-card-subtitle v-if="recruit.dateDiff > 0">기한 : {{recruit.dateDiff}}일</ion-card-subtitle>
              <ion-card-subtitle v-if="recruit.dateDiff == 0">기한 : 오늘까지</ion-card-subtitle>
              <ion-card-subtitle v-if="recruit.dateDiff < 0">기한 마감</ion-card-subtitle>
              <ion-card-subtitle v-if="recruit.extra != null">
                <img :src="recruit.extra.file__common__attachment[1].forPrintUrl" alt="">
              </ion-card-subtitle>
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
import { defineComponent, reactive, onMounted, watch, ref } from 'vue';
import { filterOutline } from 'ionicons/icons';
import { useGlobalState } from '@/stores'
import { useMainApi } from '@/apis';
import router from '@/router';
import '../../components/global.css';
import * as util from '@/utils';


export default defineComponent({
  name:'ListPage',
  setup() {
    const mainApi = useMainApi();
    const globalState = useGlobalState();

    let limit:number = 4;
    let isAllRoaded = false;
    let isDisabled = false;

    const filterItems = [
      "영화",
      "드라마",
      "연극",
      "독립영화",
      "현재 진행중인 공고",
      "남자 캐스팅",
      "여자 캐스팅",
      "성별 무관 캐스팅",
      "영유아 캐스팅",
      "10대 캐스팅",
      "20대 캐스팅",
      "30대 캐스팅",
      "40-50대 캐스팅",
      "60대 이상 캐스팅",
    ] as any

    const filter = reactive({
      filteredList: [] as any
    })

    const isOpenRef = ref(false);

    const setOpen = (isOpened: boolean) => {
      isOpenRef.value = isOpened;
    }
    const setClose = ( isOpened: boolean) => {
      isOpenRef.value = isOpened;
      setTimeout(() => {
         for(var i = 0 ; i < filterItems.length ; i ++){
        if (filter.filteredList.indexOf(filterItems[i]) >= 0 ) {
          document.querySelector<HTMLElement>('.chip_' + i)!.setAttribute("color","danger")
        }
      }
      }, 100);
    }

    function addFilter(item: string){
      if(filter.filteredList.indexOf(item) < 0 ){
        filter.filteredList.push(item);
        document.querySelector<HTMLElement>('.chip_' + filterItems.indexOf(item))!.setAttribute("color","danger")
        recruitList(limit, filter.filteredList)
      } else {
        filter.filteredList.splice(filter.filteredList.indexOf(item), 1);
        document.querySelector<HTMLElement>('.chip_' + filterItems.indexOf(item))!.setAttribute("color","primary")
        recruitList(limit, filter.filteredList)
      }
    }

    const state = reactive({
      recruits: [] as any[],
    });

    function showDetail(id:number) {
      router.push('/detail?id=' + id)
    }

    const loadData = (event:any) => {
      setTimeout(() => {
        limit = limit + 3
        recruitList(limit,filter.filteredList);
        console.log('Loaded data');
        event.target.complete();

        if ( isAllRoaded == true ){
          isDisabled = true;
        }
      }, 500);
    }

    function recruitList(limit: number, keyword:[]) {
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
      recruitList(limit, filter.filteredList);
    });

    watch(() => limit, (newValue, oldValue) => {
      recruitList(limit, filter.filteredList);
    })

    return {
      globalState,
      state,
      recruitList,
      limit,
      loadData,
      isDisabled,
      showDetail,
      filterOutline,
      filterItems,
      isOpenRef,
      setOpen,
      setClose,
      addFilter,
      filter
    }
  }
})
</script>

<style scoped>
.text-size {
  font-size: 12px;
  color:black;
}

.filtered{
  background-color: blue;
}

ion-card {
  border-radius:25px;
  box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.25);
  border:2px solid #DADADA;
}
</style>