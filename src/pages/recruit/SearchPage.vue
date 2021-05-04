<template>
  <ion-page>
    <MainHeader />
    <ion-content>
      <section>
        <div class="font-bold text-xl px-6 py-4">SEARCH</div>
        <ion-searchbar debounce="1000" @ionChange="searchKeyword($event)" class="px-6"></ion-searchbar>

        <div class="font-bold text-sm px-7 py-4">ALL RESULT</div>
        <div class="font-bold text-sm px-7 py-4">'{{state.keyword}}'가 포함된 진행중인 오디션</div>

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
        
      </section>
    </ion-content>

  </ion-page>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useGlobalState } from '@/stores';
import { useMainApi } from '@/apis';
import router from '@/router';

export default defineComponent({
  name:'SearchPage',
  setup() {
    const globalState = useGlobalState();
    const mainApi = useMainApi();

    let limit:number = 5;

    const state = reactive({
      recruits:[] as any[],
      keyword:''
    })

    function showDetail(id:number) {
      router.push('/detail?id=' + id)
    }

    function searchKeyword(event: any) {
      if( event.target.value.length > 0 ){
        mainApi.recruit_listByKeyword(limit, event.target.value)
        .then(axiosResponse => {
          state.recruits = axiosResponse.data.body.recruits
          state.keyword = event.target.value

          for(var i = 0 ; i < state.recruits.length ; i++ ){
            let today = new Date();
            let regDate = new Date(state.recruits[i].deadline);

            state.recruits[i].dateDiff = Math.ceil((regDate.getTime()-today.getTime())/(1000*3600*24)); 
          }
      })
      } else if ( event.target.value.length == 0 ){
        state.recruits = [],
        state.keyword = ''
      }
    }
    
    return {
      globalState,
      searchKeyword,
      showDetail,
      state
    }
  }
})
</script>

<style scoped>
  ion-card {
    border-radius:25px;
    box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.25);
    border:2px solid #DADADA;
  }
</style>