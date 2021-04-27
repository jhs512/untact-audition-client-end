<template>
  <ion-content class="ion-padding">
    <div class="flex justify-between border-b-2 mb-4 pb-4 px-6">
      <ion-button @click="confirm" >Confirm</ion-button>
      <ion-button @click="closePopover">Cancel</ion-button>
    </div>

    <div v-if="state.genFiles.length == 0">{{state.status}}</div>

    <ion-grid v-if="state.genFiles.length != 0">
      <ion-row>
        <ion-col size="6" v-for="genFile in state.genFiles">
          <ion-img class="relative" @click="selected(genFile)" :src="genFile.forPrintUrl"></ion-img>
          <ion-checkbox class="absolute top-2 left-2" color="primary" :checked="genFile.isChecked" @update:modelValue="genFile.isChecked = $event"
        :modelValue="genFile.isChecked" @ionChange="checkProfile(genFile, $event)"></ion-checkbox>
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-content>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue';
import { profileImage } from '@/stores'
import { alertController } from '@ionic/vue'
import * as util from '@/utils'

export default defineComponent({
  name: 'ProfileImgPopover',
  props:{
    genFiles : {
      type: Array,
      required: false
    },
    controller : {
      type: Object,
      required: true
    }
  },
  setup(props){
    const state = reactive({
      genFiles : [] as any,
      status: '',
    })

    const showProfileImgs = () => {
      if ( props.genFiles?.length == 0 ){
        state.status = '등록된 사진이 존재하지 않습니다.'
        return
      } else {
        state.genFiles = props.genFiles

        for(var i = 0 ; i < state.genFiles.length ; i++){
          for(var j = 0; j < profileImage.checkedList.length ; j++ ){
            if(state.genFiles[i].id == profileImage.checkedList[j].id){
              state.genFiles[i].isChecked = true
            }
          }
        }

      }
    }

    const selected = (genFile:any) => {
      genFile.isChecked = !genFile.isChecked
    }

    function checkProfile(genFile:any, event:any){
      if(event.detail.checked){
        genFile.isChecked = true;
        profileImage.checkedList.push(genFile);
      } else {
        for(var i = 0 ; i < profileImage.checkedList.length ; i++){
          if(genFile.id == profileImage.checkedList[i].id){
            profileImage.checkedList.splice(i,1);
            break;
          }
        }
      }
      
    }

    function closePopover() {
      if ( profileImage.checkedList.length != 0 ){
        async function showAlert() {
          const alert = await alertController
          .create({
            header: "Alert",
            message: "체크를 모두 해제하시겠습니까?",
            buttons:[  
            {
              text: 'YES',
              handler: () => {
                unChecked(popDismiss)
              }
            },
            {
              text: 'NO',
              handler: () => {
                props.controller.dismiss()
              }
            }
            ]
          });
          return alert.present();
        }

        showAlert()
      } else {
        props.controller.dismiss()
      }

      function unChecked ( onSuccess:Function ) {
        if ( profileImage.checkedList.length != 0 ){
          for(var i = 0 ; i < state.genFiles.length ; i++){
            for(var j = 0; j < profileImage.checkedList.length ; j++ ){
              if(state.genFiles[i].id == profileImage.checkedList[j].id){
                if( state.genFiles[i].isChecked == true ){
                  state.genFiles[i].isChecked = false
                  onSuccess()
                } else if ( state.genFiles[i].isChecked == false ){
                  onSuccess()
                }
              } 
              else {
                onSuccess()
              }
            }
          }
        } 
        else {
          onSuccess()
        }
      }
      
      function popDismiss(){
        props.controller.dismiss()
      }
    }

    function confirm() {
      if ( profileImage.checkedList.length == 0 ){
        util.showAlert("Alert", "선택된 사진이 없습니다.", goReturn)
        
        function goReturn() {
          return
        }
      } else {
        props.controller.dismiss()
      }
    }

    onMounted(showProfileImgs)
    return{
      props,
      state,
      selected,
      closePopover,
      checkProfile,
      confirm
    }
  }
});
</script>

<style scoped>
</style>