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
                <ion-input v-model="input.fileEl" ref="fileElRef" type="file" class="border my-2" v-on:change="setThumbnail"></ion-input>
                
                <div class="mx-auto image_container">
                  <img v-if="fileType.type.startsWith('image')" src="" alt="" class="mx-auto">
                  <video v-if="fileType.type.startsWith('video')" src="" controls></video>
                </div>
              </div>

              <div class="border-t-2 my-10"></div>

              <div>
                <ion-label>현재 사진 업로드</ion-label>
                <div>
                  <ion-button expand="block" color="light" @click="takePhoto">사진촬영</ion-button>
                </div>

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
              <span class="text-xl border-b-2 border-gray-400">ARTIST INFO</span>

              <div class="mt-10">
                <span>이름. </span>
                <span>{{globalState.loginedMember.name}}</span>
              </div>

              <div class="my-5">
                <span>활동명. </span>
                <span>{{globalState.loginedMember.nickName}}</span>
              </div>

              <div :key="photo" v-for="photo in photos">
                <ion-img :src="photo.webviewPath"></ion-img>
              </div>
              

              <div class="my-5">
                <span>성별. </span>
                <span>{{globalState.loginedMember.gender}}</span>
              </div>

              <div class="my-5">
                <span>생년월일. </span>
                <span>{{state.regNumber}}</span>
              </div>

              <div class="my-5">
                <span>몸무게. </span>
                <span>{{globalState.loginedMember.weight}}</span>
              </div>

              <div class="my-5">
                <span>키. </span>
                <span>{{globalState.loginedMember.feet}}</span>
              </div>

              <div class="my-5">
                <span>특기. </span>
                <span>{{globalState.loginedMember.feature}}</span>
              </div>

              <div class="my-5">
                <span>출연작. </span>
                <span>{{globalState.loginedMember.filmgraphy}}</span>
              </div>

              <div class="mt-10 text-sm">
                <div>1차 오디션 연기영상.</div>
                <div class="mx-auto image_container">
                  <img v-if="fileType.type.startsWith('image')" src="" alt="" class="mx-auto">
                  <video v-if="fileType.type.startsWith('video')" src="" controls></video>
                </div>
              </div>

              
            
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
import { defineComponent, reactive, onMounted, ref } from 'vue';
import { useMainApi } from '@/apis'
import { IRecruit } from '@/types';
import { useGlobalState } from '@/stores'
import { usePhotoGallery } from '@/composables/usePhotoGallery'
import * as Crypto from 'crypto-ts'


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

    const fileElRef = ref<HTMLIonInputElement>();

    const state = reactive ({
      recruit: {} as IRecruit,
      pageNum: 1,
      regNumber: JSON.parse(Crypto.AES.decrypt(globalState.loginedMember.regNumber, 'regKey').toString(Crypto.enc.Utf8).substring(0,6))
    })

    const input = reactive ({
      fileEl: new File([''],'')
    })

    var fileType = reactive({
      type:''
    })

    function setThumbnail(event:any){
      
      var reader = new FileReader(); 
      fileType.type = event.target.files[0].type as string;
      reader.onload = function(event) { 
        var elements:any;
        if( fileType.type.startsWith("image") ){
          elements = document.querySelectorAll('img'); 
        }else if ( fileType.type.startsWith("video")) {
          elements = document.querySelectorAll('video'); 
        }
        
        if( elements == null ) {
          return;
        }
        if(event.target?.result == null && typeof event.target?.result != 'string' ){
          return;
        }
        if( typeof event.target.result == 'number' || typeof event.target.result == 'bigint'
        || typeof event.target.result == 'boolean' || typeof event.target.result == 'symbol' || typeof event.target.result == 'undefined' ||  
        typeof event.target.result == 'object' || typeof event.target.result == 'function'
        ){
          return
        }

        for ( var i = 0; i < elements.length; i++){
          elements[i].setAttribute("src", event.target.result);
        }

        const imgContainers = document.querySelectorAll(".image_container")

        for ( var i = 0; i < imgContainers.length; i++){
          imgContainers[i].append(elements[i])
        }

        
        
      }; 
        
      reader.readAsDataURL(event.target.files[0]);
      input.fileEl = event.target.files[0];
    }

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
      photos,
      fileElRef,
      input,
      setThumbnail,
      fileType
    }
  }
})
</script>

<style scoped>
</style>