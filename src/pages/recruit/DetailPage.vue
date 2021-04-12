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
          <div class="text-right mt-2 text-xs">
            <span>{{state.recruit.extra__aw_media}}</span>
            / 
            <span>{{state.recruit.extra__aw_genre}}</span>
          </div>
          <div class="">감독. {{state.recruit.extra__aw_director}}</div>
          <div class="flex justify-around">
            <span>프로듀서.</span><span>{{state.recruit.extra__aw_producer}}</span>
            <span>캐스팅매니저.</span><span>{{state.recruit.extra__aw_castingManager}}</span>
          </div>
          <div class="text-left mt-6">
            <div class="">스토리 라인(줄거리).</div>
            <div class="border border-black rounded py-2 px-1 mt-1">{{state.recruit.extra__aw_story}}</div>
          </div>
          <div class="text-left mt-6">
            <div class="">기타사항.</div>
            <div class="border border-black rounded py-2 px-1 mt-1">{{state.recruit.extra__aw_etc}}기타사항</div>
          </div>
        </section>

        <div class="border-t-2 border-black my-10"></div>

        <section>
          <div class="text-lg font-extrabold">배역 상세 내용</div>
          <div class="mt-2">배역. {{state.recruit.extra__ar_name}}</div>
          <div class="flex justify-around mt-2">
            <span>배역나이. </span><span>{{state.recruit.extra__ar_age}}</span>
            <span>배역성별. </span><span>{{state.recruit.extra__ar_gender}}</span>
          </div>
          <div class="flex justify-around mt-2">
            <span>배역직업. </span><span>{{state.recruit.extra__ar_job}}</span>
            <span>대사유무. </span><span>{{state.recruit.extra__ar_scriptStatus}}</span>
          </div>

          <div class="text-left mt-6">
            <div class="">배역 상세 설정.</div>
            <div class="border border-black rounded py-2 px-1 mt-1">{{state.recruit.extra__ar_character}}</div>
          </div>

        </section>

        <div class="border-t-2 border-black my-10"></div>

        <section>
          <div class="text-lg font-extrabold">촬영 설명</div>
          
          <div class="flex justify-around mt-2">
            <span>촬영기간. </span><span>{{state.recruit.period}}</span>
            <span>촬영지역. </span><span>{{state.recruit.location}}</span>
          </div>

          <div class="flex justify-around mt-2">
            <span>장면 수. </span><span>{{state.recruit.extra__ar_scenesCount}}컷</span>
            <span>촬영횟수. </span><span>{{state.recruit.extra__ar_shootingsCount}}회</span>
          </div>

          <div class="text-left mt-6">
            <div class="">배역 상세 설정.</div>
            <div class="border border-black rounded py-2 px-1 mt-1">{{state.recruit.extra__ar_character}}</div>
          </div>
        </section>

        <div class="border-t-2 border-black my-10"></div>

        <section>
          <div class="text-lg font-extrabold">지원 자격 및 필요 서류</div>
          
          <div class="flex justify-around mt-2 mb-10">
            <span>성별. </span><span>{{state.recruit.gender}}</span>
            <span>나이대. </span><span>{{state.recruit.age}}</span>
          </div>
          
          <div class="flex justify-between mt-2">
            <span>현재 사진. </span><span class="text-xs">*일주일내 찍은 사진만 가능</span>
          </div>

          <div class="flex justify-between mt-2">
            <span>연기영상. </span><span class="text-xs">*직접촬영만 가능</span>
          </div>
          
          <div class="flex justify-between">
            <span>연기촬영시간. </span><span>{{state.recruit.videoTime}}</span>
          </div>

          <div class="text-left mt-6">
            <div class="">연기대사.</div>
            <div class="border border-black rounded py-2 px-1 mt-1">{{state.recruit.script}}</div>
          </div>

          <div class="text-left mt-6">
            <div class="">우대사항.</div>
            <div class="border border-black rounded py-2 px-1 mt-1">{{state.recruit.etc}}</div>
          </div>

        </section>

        <section class="my-10 flex justify-around">
          <ion-button class="w-32" fill="outline" color="dark">좋아요</ion-button>
          <ion-button @click="showApplicationPage(state.recruit.id)" class="w-32" color="danger">지원하기</ion-button>
        </section>
        

      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue';
import { useMainApi } from '@/apis'
import { IRecruit } from '@/types';
import router from '@/router';


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

    const state = reactive ({
      recruit: {} as IRecruit
    })

    function recruitDetail(id: number) {
      mainApi.recruit_detail(props.id)
        .then(axiosResponse => {
        state.recruit = axiosResponse.data.body.recruit
      });
    }

    function showApplicationPage(id:number) {
      router.push('/application?id=' + id)
    }

    onMounted(() => {
      recruitDetail(props.id);
    });
    


    return{
      recruitDetail,
      state,
      props,
      showApplicationPage
    }
  }
})
</script>

<style scoped>
</style>