<template>
  <ion-page>
    <MainHeader />
    <ion-content>
      <div>{{state.recruit.id}}</div>
      <div>{{state.recruit.title}}</div>
      <div>{{state.recruit.regDate}}</div>
      <div>{{state.recruit.updateDate}}</div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue';
import { useMainApi } from '@/apis'
import { IRecruit } from '@/types';


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

    onMounted(() => {
      recruitDetail(props.id);
    });
    


    return{
      recruitDetail,
      state,
      props
    }
  }
})
</script>

<style scoped>
</style>