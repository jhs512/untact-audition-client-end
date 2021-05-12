<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/"></ion-back-button>
        </ion-buttons>
        <ion-title class="ion-text-center coda-font">Audictionary</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="px-6 pt-4 font-semibold ">
        <div class="text-lg text-center">1차 합격 현황</div>
        <section class="flex">
          <div class="text-sm mt-10 w-full">
            <span class="border-b-2 pb-1 ml-4">1차 합격</span>
            <div v-if="state.applications.length != 0" v-for="application in state.applications" class="flex justify-around items-center bg-gray-100 h-12 rounded mt-5 text-xs">
              <div>가제 : ({{application.extra.Extra__aw_title}})</div>
              <div>배역 : ({{application.extra.Extra__ar_name}})</div>
              <div v-if="application.extra.dateDiff > 0">마감 : {{application.extra.dateDiff}}</div>
              <div v-if="application.extra.dateDiff == 0">마감 : 오늘까지</div>
              <div v-if="application.extra.dateDiff < 0">기한 마감</div>
            </div>
            <div v-if="state.applications.length == 0" class="flex justify-around items-center bg-gray-100 h-12 rounded mt-5 text-xs">
              <span>1차 합격한 내역이 존재하지 않습니다.</span>
            </div>
          </div>
        </section>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue';
import { useMainApi } from '@/apis';
import { useGlobalState } from '@/stores'
import * as util from '@/utils'


export default defineComponent({
  name:'FirstPassApplyingStatusPage',
  setup(){

    const mainApi = useMainApi();
    const globalState = useGlobalState();

    const state = reactive({
      applications: [] as any[]
    })

    

    function getApplicationsAndRecruit (){
      mainApi.application_getApplicationsAndRecruit(util.toIntOrNull(globalState.loginedMember.id))
        .then(axiosResponse => {
          if ( axiosResponse.data.fail ) {
            alert(axiosResponse.data.msg);
            return;
          } else {

            if ( axiosResponse.data.body.applications.length != 0 ){
              for (let i = 0; i < axiosResponse.data.body.applications.length; i++){
                if( axiosResponse.data.body.applications[i].passStatus == 1){
                  state.applications.push(axiosResponse.data.body.applications[i])
                }
              }

              for(var i = 0 ; i < axiosResponse.data.body.applications.length ; i++ ){
                let today = new Date();
                let regDate = new Date(axiosResponse.data.body.applications[i].extra.Extra__deadline);

                axiosResponse.data.body.applications[i].extra.dateDiff = Math.ceil((regDate.getTime()-today.getTime())/(1000*3600*24)); 
              } 
          }
          }
      })
      

    }

    onMounted(getApplicationsAndRecruit)

    return{
      state
    }
  }
  
})
</script>

<style scoped>
</style>