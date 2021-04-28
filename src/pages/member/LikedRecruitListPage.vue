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
        <div class="text-lg text-center">좋아요 리스트</div>
        <section class="flex">
          <div class="text-sm mt-10 w-full">
              <div v-if="state.likedRecruitsEmpty != ''">{{state.likedRecruitsEmpty}}</div>
                <div v-if="state.likedRecruitsEmpty == ''">
                  <ion-list>
                    <ion-item v-for="likedRecruit in state.likedRecruits">
                      <div @click="showRecruitDetail(likedRecruit.id)" class="text-xs flex items-center py-1 w-full">
                        <div class="w-24 flex justify-center">
                          <ion-thumbnail v-if="likedRecruit.extra != null">
                            <ion-img :src="likedRecruit.extra.file__common__attachment[0].forPrintUrl"></ion-img>
                          </ion-thumbnail>
                        </div>
                        <div class="flex-1">
                          <div class="text-sm font-bold pt-1">
                            <ion-label>{{likedRecruit.extra__aw_director}} 감독</ion-label>
                          </div>
                          <div class="pt-0.5">
                            <ion-label>가제 : {{likedRecruit.extra__aw_title}}</ion-label>
                          </div>
                          <div class="pb-1">
                            <ion-label>배역 : {{likedRecruit.extra__ar_name}}</ion-label>
                          </div>
                        </div>
                      </div>
                    </ion-item>
                  </ion-list>

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
import { useGlobalState } from '@/stores';
import * as util from '@/utils';
import { IRecruit } from '@/types';
import router from '@/router';


export default defineComponent({
  name:'LikedRecruitListPage',
  setup(){

    const mainApi = useMainApi();
    const globalState = useGlobalState();

    const state = reactive({
      likedRecruits: [] as IRecruit[],
      likedRecruitsEmpty: ''
    })

    

    function showLikeList(){
      mainApi.recruit_like_list(util.toIntOrNull(globalState.loginedMember.id))
        .then(axiosResponse => {
          if ( axiosResponse.data.fail ) {
            state.likedRecruitsEmpty = axiosResponse.data.msg
            return;
          } else {
            if ( axiosResponse.data.body.likedRecruits.length != 0 ){
              for (let i = axiosResponse.data.body.likedRecruits.length -1; i >= 0; i--){
                if( axiosResponse.data.body.likedRecruits[i] != null )
                state.likedRecruits.push(axiosResponse.data.body.likedRecruits[i])
              }
            }
          }
      })
    }

    function showRecruitDetail(id: number){
      router.push('/detail?id=' + id)
    }

    onMounted(showLikeList)

    return{
      state,
      showRecruitDetail
    }
  }
  
})
</script>

<style scoped>
</style>