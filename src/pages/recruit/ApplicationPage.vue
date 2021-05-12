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
                  <ion-button expand="block" color="light" @click="takeRecentPhoto">사진촬영</ion-button>
                  <div v-if="input.recentImgUrl.length != 0">
                    <ion-img :src="input.recentImgUrl"></ion-img>
                  </div>
                </div>
              </div>

              <div class="border-t-2 my-10"></div>

              <div>
                <ion-label>프로필 사진 업로드</ion-label>
                <ion-button @click="popOpen" expand="block" color="light">사진선택</ion-button>
                <ion-grid v-if="state.profileImgIdsStr.length != 0">
                  <ion-row>
                    <ion-col size="6" v-for="genFile in state.profileImgIdsStr">
                      <ion-img :src="genFile.forPrintUrl"></ion-img>
                    </ion-col>
                  </ion-row>
                </ion-grid>
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

              <div class="mt-10 text-lg">
                <div>현재사진</div>
                <div v-if="input.recentImgUrl.length != 0">
                  <ion-img :src="input.recentImgUrl"></ion-img>
                </div>
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

              <div class="mt-10 text-lg">
                <div>1차 오디션 연기영상.</div>
                <div class="mx-auto image_container">
                  <img v-if="fileType.type.startsWith('image')" src="" alt="" class="mx-auto">
                  <video v-if="fileType.type.startsWith('video')" src="" controls></video>
                </div>
              </div>
              
              
              <div class="mt-10 text-lg">
                <div>프로필 사진</div>
                <ion-grid v-if="state.profileImgIdsStr.length != 0">
                  <ion-row>
                    <ion-col size="6" v-for="genFile in state.profileImgIdsStr">
                      <ion-img :src="genFile.forPrintUrl"></ion-img>
                    </ion-col>
                  </ion-row>
                </ion-grid>
              </div>

              
            
              <div class="text-center my-10">
                <ion-button type="submit" fill="outline" color="dark">최종 제출하기</ion-button>
              </div>
            </div>
          </section>
          
        </form>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref } from 'vue';
import { useMainApi } from '@/apis';
import { IRecruit } from '@/types';
import { useGlobalState } from '@/stores';
import { usePhotoGallery } from '@/composables/usePhotoGallery';
import ProfilePopover from '../../components/ProfileImgPopover.vue';
import '../../components/global.css';
import * as util from '@/utils';
import { popoverController } from '@ionic/vue';
import { profileImage } from '@/stores'
import router from '@/router'


export default defineComponent({
  name:'ApplicationPage',
  components: {
    ProfilePopover
  },
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

    const takeRecentPhoto = () => {
      takePhoto().finally(()=>{

        const recent = reactive({
          fileEl: photos.value[photos.value.length-1].file,
        })

        const showRecentImg = (recentImgFileIdsStr: string) => {
          mainApi.common_application_photo_getRecentImgUrl(recentImgFileIdsStr)
            .then(axiosResponse => {

              if ( axiosResponse.data.fail ) {
                alert(axiosResponse.data.msg);
                return;
              } else {
                input.recentImgUrl = axiosResponse.data.body.imgUrl
              }

            });
        }

        const startRecentPhotoUpload = (onSuccess:Function) => {
          if ( recent.fileEl == null || recent.fileEl.size == 0 ) {
            return;
          }
          
          mainApi.common_application_photo_doUpload(recent.fileEl)
            .then(axiosResponse => {
              if ( axiosResponse.data.fail ) {
                alert(axiosResponse.data.msg);
                return;
              }
              else {
                state.recentImgFileIdsStr = axiosResponse.data.body.genFileIdsStr
                onSuccess(axiosResponse.data.body.genFileIdsStr);
              }
            });
        };
        
        startRecentPhotoUpload(showRecentImg)
      })
    }

    const popOpen = async (ev: Event) => {
      await mainApi.common_ap_genFile_getProfileImgs(util.toIntOrNull(globalState.loginedMember.id))
      .then(axiosResponse => {

        if ( axiosResponse.data.fail ) {
          alert(axiosResponse.data.msg);
          return;
        } else {
          input.profileImgs = axiosResponse.data.body.genFiles
        }
      });
      

      const popover = await popoverController
        .create({
          component: ProfilePopover,
          componentProps:{
            controller: popoverController,
            genFiles: input.profileImgs
          },
          cssClass: 'pop-Img-style',
          event: ev,
        })
      await popover.present();

      const { role } = await popover.onDidDismiss();
    }

    const state = reactive ({
      recruit: {} as IRecruit,
      pageNum: 1,
      regNumber: globalState.loginedMember.regNumber.substring(0,6),
      recentImgFileIdsStr:'',
      videoFileIdsStr:'',
      profileImgIdsStr: profileImage.checkedList
    })

    const input = reactive ({
      fileEl: new File([''],''),
      profileImgs:[] as any[],
      recentImgUrl: ''
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

    const checkAndApplication = () => {
      if (state.recentImgFileIdsStr.length == 0 || input.fileEl == null || input.fileEl.size == 0 || state.profileImgIdsStr.length == 0){
        util.showAlert("Alert", "모든 파일을 업로드 후 진행해주세요", function(){})
        return
      }

      if (!fileType.type.startsWith("video")){
        util.showAlert("Alert", "1차 오디션 연기영상은 동영상 파일을 업로드 해주세요", function(){})
        return
      }

      const startApplication = () => {
        let ids = []
        for ( let i = 0; i < state.profileImgIdsStr.length; i++){
          ids.push(util.toStringOrNull(state.profileImgIdsStr[i].id))
        }
        let profileImgIdsStr = JSON.stringify(ids)
        application(state.videoFileIdsStr, state.recentImgFileIdsStr, profileImgIdsStr, util.toIntOrNull(localStorage.getItem("loginedMemberId")), props.id)
      }

      const startVideoFileUpload = (onSuccess:Function) => {
        if ( !!!input.fileEl ) {
          onSuccess("");
          return;
        }
        
        mainApi.common_application_video_doUpload(input.fileEl)
          .then(axiosResponse => {
            if ( axiosResponse.data.fail ) {
              alert(axiosResponse.data.msg);
              return;
            }
            else {
              state.videoFileIdsStr = axiosResponse.data.body.genFileIdsStr
              onSuccess();
            }
          });
      };
      
      startVideoFileUpload(startApplication);
     
    }

    function application(videoFileIdsStr:string, recentImgFileIdsStr:string, profileImgIdsStr:string, loginedMemberId:number, recruitId:number) {
      mainApi.application_doWrite(videoFileIdsStr, recentImgFileIdsStr, profileImgIdsStr, loginedMemberId, recruitId)
        .then(axiosResponse => {
          if ( axiosResponse.data.fail ) {
            alert(axiosResponse.data.msg);
            return;
          }
          else {
            util.showAlert("Alert", axiosResponse.data.msg, function(){})
            router.replace('/detail?id=' + props.id)
            profileImage.checkedList = []
          }
        })
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
      photos,
      fileElRef,
      input,
      setThumbnail,
      fileType,
      popOpen,
      takeRecentPhoto,
      checkAndApplication
    }
  }
})
</script>

<style scoped>
</style>