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
      <div class="text-center text-xs p-4 font-black">

        <section>
          <div class="text-lg font-extrabold">{{state.recruit.extra__aw_title}}</div>
          <div class="text-xs mt-2">모집기한. {{state.recruit.deadline}}</div>
          <div class="text-right mt-2 text-xs mr-5">
            <span>( {{state.recruit.extra__aw_media}}</span>
            / 
            <span>{{state.recruit.extra__aw_genre}} )</span>
          </div>
          <div v-if="state.recruit.extra != null" >
            <img :src="state.recruit.extra.file__common__attachment[0].forPrintUrl" alt="" class="mx-auto my-5">
          </div>

          <ion-grid >
            <ion-row>
              <ion-col>
                감독. {{state.recruit.extra__aw_director}}
              </ion-col>
            </ion-row>
            <ion-row class="text-left">
              <ion-col>
                프로듀서. {{state.recruit.extra__aw_producer}}
              </ion-col>
              <ion-col>
                캐스팅매니저. {{state.recruit.extra__aw_castingManager}}
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col>
                <div class="text-left mt-10">스토리 라인 (줄거리).</div>
                <div class="border border-black rounded py-2 px-1 mt-1">{{state.recruit.extra__aw_story}}</div>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col>
                <div class="text-left mt-2">기타사항.</div>
                <div class="border border-black rounded py-2 px-1 mt-1">{{state.recruit.extra__aw_etc}}기타사항</div>
              </ion-col>
            </ion-row>
          </ion-grid>
          
        </section>

        <div class="border-t-2 border-black my-10"></div>

        <section>

          <div class="text-lg font-extrabold">배역 상세 내용</div>

          <ion-grid>
            <ion-row class="text-left mt-10">
              <ion-col>
                배역나이. {{state.recruit.extra__ar_age}}
              </ion-col>
              <ion-col>
                배역성별. {{state.recruit.extra__ar_gender}}
              </ion-col>
            </ion-row>
            <ion-row class="text-left">
              <ion-col>
                배역직업. {{state.recruit.extra__ar_job}}
              </ion-col>
              <ion-col>
                대사유무. {{state.recruit.extra__ar_scriptStatus}}
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col>
                <div class="text-left mt-10">배역 상세 설정.</div>
                <div class="border border-black rounded py-2 px-1 mt-1">{{state.recruit.extra__ar_character}}</div>
              </ion-col>
            </ion-row>
          </ion-grid>

        </section>

        <div class="border-t-2 border-black my-10"></div>

        <section>

          <div class="text-lg font-extrabold">촬영 설명</div>

          <ion-grid>
            <ion-row class="text-left mt-10">
              <ion-col>
                촬영기간. {{state.recruit.period}}
              </ion-col>
              <ion-col>
                촬영지역. {{state.recruit.location}}
              </ion-col>
            </ion-row>
            <ion-row class="text-left">
              <ion-col>
                장면 수. {{state.recruit.extra__ar_scenesCount}}컷
              </ion-col>
              <ion-col>
                촬영횟수. {{state.recruit.extra__ar_shootingsCount}}회
              </ion-col>
            </ion-row>
          </ion-grid>
        </section>

        <div class="border-t-2 border-black my-10"></div>

        <section>
          <div class="text-lg font-extrabold">지원 자격 및 필요 서류</div>

          <ion-grid>
            <ion-row class="text-left mt-10">
              <ion-col>
                성별. {{state.recruit.gender}}
              </ion-col>
              <ion-col>
                나이대. {{state.recruit.age}}
              </ion-col>
            </ion-row>
            <ion-row class="mt-10">
              <ion-col class="text-left">
                현재 사진.
              </ion-col>
              <ion-col class="text-right">
                *일주일내 찍은 사진만 가능
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col class="text-left">
                연기영상.
              </ion-col>
              <ion-col class="text-right">
                *직접촬영만 가능
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col class="text-left">
                연기촬영시간.
              </ion-col>
              <ion-col class="text-right">
                {{state.recruit.videoTime}}
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col>
                <div class="text-left mt-10">연기대사.</div>
                <div class="border border-black rounded py-2 px-1 mt-1">{{state.recruit.script}}</div>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col>
                <div class="text-left mt-10">우대사항.</div>
                <div class="border border-black rounded py-2 px-1 mt-1">{{state.recruit.etc}}</div>
              </ion-col>
            </ion-row>
          </ion-grid>

        </section>

        <section class="my-10 flex justify-around">
          <ion-button v-if="state.likeStatus == 'disLike'" @click="likeRecruit" class="w-32" fill="outline" color="dark">LIKE</ion-button>
          <ion-button v-if="state.likeStatus == 'like'" @click="disLikeRecruit" class="w-32" fill="outline" color="primary">DISLIKE</ion-button>
          <ion-button @click="showApplicationPage(state.recruit.id)" class="w-32" color="danger">지원하기</ion-button>
        </section>
        

      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue';
import { useMainApi } from '@/apis'
import { useGlobalState } from '@/stores'
import { IRecruit } from '@/types';
import router from '@/router';
import * as util from '@/utils';


export default defineComponent({
  name:'DetailPage',
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  setup(props) {

    const mainApi = useMainApi();
    const globalState = useGlobalState();

    const state = reactive ({
      recruit: {} as IRecruit,
      likeStatus: ''
    })

    function recruitDetail(id: number) {
      mainApi.recruit_detail(props.id)
        .then(axiosResponse => {
        state.recruit = axiosResponse.data.body.recruit
      });
    }

    async function showApplicationPage(id:number) {
      let count = 0;

      await mainApi.application_getApplications(util.toIntOrNull(globalState.loginedMember.id))
        .then(axiosResponse => {
          if ( axiosResponse.data.fail ) {
            alert(axiosResponse.data.msg);
            return;
          } else if (axiosResponse.data.body.applications.length != 0){
            
            for ( let i = 0; i < axiosResponse.data.body.applications.length; i++){
              if (props.id == axiosResponse.data.body.applications[i].recruitId){
                count++
              } 
            }

            if ( count > 0 ){
              util.showAlert("Alert", "이미 지원한 공고입니다.", function(){})
              return;
            } else {
              router.push('/application?id=' + id)
              return;
            }
          } else {
            router.push('/application?id=' + id)
            return;
          }
      })
    }

    function likeRecruit() {
      mainApi.ap_recruit_like(props.id, util.toIntOrNull(globalState.loginedMember.id))
        .then(axiosResponse => {
          if ( axiosResponse.data.fail ) {
            util.showAlert("Alert", axiosResponse.data.msg, function(){})
            return;
          }
          else {
            util.showAlert("Alert", axiosResponse.data.msg, function(){})
            state.likeStatus = 'like'
          }
      })
    }

    function disLikeRecruit() {
      mainApi.ap_recruit_disLike(props.id, util.toIntOrNull(globalState.loginedMember.id))
        .then(axiosResponse => {
          if ( axiosResponse.data.fail ) {
            util.showAlert("Alert", axiosResponse.data.msg, function(){})
            return;
          }
          else {
            util.showAlert("Alert", axiosResponse.data.msg, function(){})
            state.likeStatus = 'disLike'
          }
      })
    }

    function checkLikeStatus() {
      mainApi.ap_recruit_checkLikeStatus(props.id, util.toIntOrNull(globalState.loginedMember.id))
        .then(axiosResponse => {
          if ( axiosResponse.data.fail ) {
            util.showAlert("Alert", axiosResponse.data.msg, function(){})
            return;
          }
          else {
            if( axiosResponse.data.body.likeStatus == 'like'){
              state.likeStatus = 'like'
            } else if ( axiosResponse.data.body.likeStatus == 'disLike' ){
              state.likeStatus = 'disLike'
            }
            
          }
      })
    }

    onMounted(checkLikeStatus)

    onMounted(() => {
      recruitDetail(props.id);
    });
    


    return{
      recruitDetail,
      state,
      props,
      showApplicationPage,
      likeRecruit,
      disLikeRecruit
    }
  }
})
</script>

<style scoped>
</style>