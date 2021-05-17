<template>
</template>

<script lang="ts">
import { useMainApi } from '@/apis';
import { defineComponent } from 'vue'
import * as Util from '@/utils'
import router from '@/router'

export default defineComponent({
  name: 'EmailCertPage',
  props:{
    email : {
      type: String,
      required: true
    },
    emailCertKey:{
      type:String,
      required: true
    }
  },
  setup(props) {
    const mainApi = useMainApi();
    
    
     mainApi.ap_emailCertForJoin(props.email,props.emailCertKey)
        .then(axiosResponse => {
          
          if ( axiosResponse.data.fail ) {
          Util.showAlert("알림",axiosResponse.data.msg, () => router.push('/'));
            return;
          }
          
          Util.showAlert("알림",axiosResponse.data.msg, () => router.push('/member/login?email=' + props.email));
        });
    
    return {
      
    }
  }
})
</script>
