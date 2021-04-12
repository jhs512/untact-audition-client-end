<template>
  <ion-page>
    
    <ion-content>
        
        <form v-on:submit.prevent="checkAndApplication">
          <section v-show="state.pageNum == 1">
            <ion-header>
              <ion-toolbar>
                <ion-buttons slot="start">
                  <ion-back-button default-href="/"></ion-back-button>
                </ion-buttons>
                <ion-title class="ion-text-center">지원서 제출</ion-title>
              </ion-toolbar>
            </ion-header>
            
            <div class="text-xs p-4 font-black">

              <ion-card class="text-center mb-10">
                <ion-card-header>
                  <ion-card-title>{{state.recruit.extra__aw_title}}</ion-card-title>
                  <ion-card-subtitle>{{state.recruit.extra__aw_subtitle}}</ion-card-subtitle>
                  <ion-card-subtitle>{{state.recruit.extra__ar_name}}</ion-card-subtitle>
                </ion-card-header>
                <ion-card-content>
                  {{state.recruit.extra__ar_character}}
                </ion-card-content>
              </ion-card>

              <div>
                <ion-label>1차 오디션 영상 업로드</ion-label>
                <ion-input type="file" class="border my-2"></ion-input>
                <ion-button @click="takePhoto">사진촬영</ion-button>

                <ion-grid>
                  <ion-row>
                    <ion-col size="6" :key="photo" v-for="photo in photos">
                      <ion-img :src="photo.webviewPath"></ion-img>
                    </ion-col>
                  </ion-row>
                </ion-grid>
              </div>

              <div class="border-t-2 my-10"></div>

              <div>
                <ion-label>현재 사진 업로드</ion-label>
                <ion-input type="file" class="border my-2"></ion-input>
              </div>

              <div class="border-t-2 my-10"></div>

              <div>
                <ion-label>프로필 사진 업로드</ion-label>
                <ion-input type="file" class="border my-2"></ion-input>
              </div>

              <div class="text-center my-10">
                <ion-button @click="nextPage" fill="outline" color="dark">지원서 최종 확인하기</ion-button>
              </div>
            </div>
          </section>

          <section v-show="state.pageNum == 2">
            <ion-header>
              <ion-toolbar>
                <ion-buttons slot="start">
                  <ion-back-button @click="pageBack" default-href="/"></ion-back-button>
                </ion-buttons>
                <ion-title class="ion-text-center">최종 지원서</ion-title>
              </ion-toolbar>
            </ion-header>
            <div class="text-xs p-4 font-black">
              <span class="border-b-2 border-gray-400">ARTIST INFO</span>

              <div>{{globalState.loginedMember.name}}</div>
            
              <div class="text-center my-10">
                <ion-button fill="outline" color="dark">최종 제출하기</ion-button>
              </div>
            </div>
          </section>
          
        </form>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue';
import { useMainApi } from '@/apis'
import { IRecruit } from '@/types';
import { useGlobalState } from '@/stores'
import { usePhotoGallery, Photo } from '@/composables/usePhotoGallery'


export default defineComponent({
  name:'ApplicationPage',
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const globalState = useGlobalState();
    const mainApi = useMainApi();
    const { photos, takePhoto } = usePhotoGallery();

    const state = reactive ({
      recruit: {} as IRecruit,
      pageNum: 1
    })

    function recruitDetail(id: number) {
      mainApi.recruit_detail(props.id)
        .then(axiosResponse => {
        state.recruit = axiosResponse.data.body.recruit
      });
    }

    const nextPage = () => {
      state.pageNum = ++state.pageNum;
    }

    const pageBack = () => {
      state.pageNum = --state.pageNum;
    }

    onMounted(() => {
      recruitDetail(props.id);
    });
    


    return{
      recruitDetail,
      state,
      props,
      nextPage,
      pageBack,
      globalState,
      takePhoto,
      photos
    }
  }
})
</script>

<style scoped>
</style>