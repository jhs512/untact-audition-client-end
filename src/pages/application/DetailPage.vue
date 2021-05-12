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
        <div class="text-lg text-center">지원현황</div>
        <section class="flex">
          <div class="text-sm mt-10 w-full">
            <span class="border-b-2 pb-1 ml-4">지원 완료</span>
            <div v-for="(endApplyingApplication,index) in state.applications">
              <div v-if="endApplyingApplication.passStatus == 0 && state.endApplyingApplications.length != 0 && index < 3" class="flex justify-around items-center bg-gray-100 h-12 rounded mt-5 text-xs">
                <div>가제 : ({{endApplyingApplication.extra.Extra__aw_title}})</div>
                <div>배역 : ({{endApplyingApplication.extra.Extra__ar_name}})</div>
                <div v-if="endApplyingApplication.extra.dateDiff > 0">마감 : {{endApplyingApplication.extra.dateDiff}}</div>
                <div v-if="endApplyingApplication.extra.dateDiff == 0">마감 : 오늘까지</div>
                <div v-if="endApplyingApplication.extra.dateDiff < 0">기한 마감</div>
              </div>
            </div>
            <div v-if="state.endApplyingApplications.length == 0" class="flex justify-around items-center bg-gray-100 h-12 rounded mt-5 text-xs">
              <span>지원완료한 내역이 존재하지 않습니다.</span>
            </div>

            <div class="text-right text-xs w-full mt-2 pr-3">
              <router-link class="text-black" to="/applying/endApplyingStatus">
                <span>모두 보기</span>
              </router-link>
            </div>
          </div>
        </section>

        <section class="flex">
          <div class="text-sm mt-10 w-full">
            <span class="border-b-2 pb-1 ml-4">1차 합격</span>
            <div v-for="(firstPassApplication,index) in state.applications">
              <div v-if="firstPassApplication.passStatus == 1 && state.firstPassApplications.length != 0 && index < 3" class="flex justify-around items-center bg-gray-100 h-12 rounded mt-5 text-xs">
                <div>가제 : ({{firstPassApplication.extra.Extra__aw_title}})</div>
                <div>배역 : ({{firstPassApplication.extra.Extra__ar_name}})</div>
                <div v-if="firstPassApplication.extra.dateDiff > 0">마감 : {{firstPassApplication.extra.dateDiff}}</div>
                <div v-if="firstPassApplication.extra.dateDiff == 0">마감 : 오늘까지</div>
                <div v-if="firstPassApplication.extra.dateDiff < 0">기한 마감</div>
              </div>
            </div>
            <div v-if="state.firstPassApplications.length == 0" class="flex justify-around items-center bg-gray-100 h-12 rounded mt-5 text-xs">
              <span>1차 합격한 내역이 존재하지 않습니다.</span>
            </div>

            <div class="text-right text-xs w-full mt-2 pr-3">
              <router-link class="text-black" to="/applying/firstPassApplyingStatus">
                <span>모두 보기</span>
              </router-link>
            </div>
          </div>
        </section>

        <section class="flex">
          <div class="text-sm mt-10 w-full">
            <span class="border-b-2 pb-1 ml-4">최종 합격</span>
            <div v-for="(finalPassApplication,index) in state.applications">
              <div v-if="finalPassApplication.passStatus == 2 && state.finalPassApplications.length != 0 && index < 3" class="flex justify-around items-center bg-gray-100 h-12 rounded mt-5 text-xs">
                <div>가제 : ({{finalPassApplication.extra.Extra__aw_title}})</div>
                <div>배역 : ({{finalPassApplication.extra.Extra__ar_name}})</div>
                <div v-if="finalPassApplication.extra.dateDiff > 0">마감 : {{finalPassApplication.extra.dateDiff}}</div>
                <div v-if="finalPassApplication.extra.dateDiff == 0">마감 : 오늘까지</div>
                <div v-if="finalPassApplication.extra.dateDiff < 0">기한 마감</div>
              </div>
            </div>
            <div v-if="state.finalPassApplications.length == 0" class="flex justify-around items-center bg-gray-100 h-12 rounded mt-5 text-xs">
              <span>최종합격한 내역이 존재하지 않습니다.</span>
            </div>

            <div class="text-right text-xs w-full mt-2 pr-3">
              <router-link class="text-black" to="/applying/finalPassApplyingStatus">
                <span>모두 보기</span>
              </router-link>
            </div>
          </div>
        </section>

        <section class="flex mb-20">
          <div class="text-sm mt-10 w-full">
            <span class="border-b-2 pb-1 ml-4">불합격</span>
            <div v-for="(passFailApplication,index) in state.applications">
              <div v-if="passFailApplication.passStatus == -1 && state.passFailApplications.length != 0 && index < 3" class="flex justify-around items-center bg-gray-100 h-12 rounded mt-5 text-xs">
                <div>가제 : ({{passFailApplication.extra.Extra__aw_title}})</div>
                <div>배역 : ({{passFailApplication.extra.Extra__ar_name}})</div>
                <div v-if="passFailApplication.extra.dateDiff > 0">마감 : {{passFailApplication.extra.dateDiff}}</div>
                <div v-if="passFailApplication.extra.dateDiff == 0">마감 : 오늘까지</div>
                <div v-if="passFailApplication.extra.dateDiff < 0">기한 마감</div>
              </div>
            </div>
            <div v-if="state.passFailApplications.length == 0" class="flex justify-around items-center bg-gray-100 h-12 rounded mt-5 text-xs">
              <span>불합격한 내역이 존재하지 않습니다.</span>
            </div>

            <div class="text-right text-xs w-full mt-2 pr-3">
              <router-link class="text-black" to="/applying/passFailApplyingStatus">
                <span>모두 보기</span>
              </router-link>
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
  name:'DetailPage',
  setup(){

    const mainApi = useMainApi();
    const globalState = useGlobalState();

    const state = reactive({
      applications: [] as any[],
      endApplyingApplications: [] as any[],
      firstPassApplications: [] as any[],
      finalPassApplications: [] as any[],
      passFailApplications: [] as any[]
    })

    

    function getApplicationsAndRecruit (){
      mainApi.application_getApplicationsAndRecruit(util.toIntOrNull(globalState.loginedMember.id))
        .then(axiosResponse => {
          if ( axiosResponse.data.fail ) {
            alert(axiosResponse.data.msg);
            return;
          } else {
            state.applications = axiosResponse.data.body.applications

            if ( axiosResponse.data.body.applications.length != 0 ){
              for (let i = 0; i < axiosResponse.data.body.applications.length; i++){
                if ( axiosResponse.data.body.applications[i].passStatus == -1 ){
                  state.passFailApplications.push(axiosResponse.data.body.applications[i])
                }
                else if ( axiosResponse.data.body.applications[i].passStatus == 0 ){
                  state.endApplyingApplications.push(axiosResponse.data.body.applications[i])
                }
                else if ( axiosResponse.data.body.applications[i].passStatus == 1 ){
                  state.firstPassApplications.push(axiosResponse.data.body.applications[i])
                }
                else if ( axiosResponse.data.body.applications[i].passStatus == 2 ){
                  state.finalPassApplications.push(axiosResponse.data.body.applications[i])
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