import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import './index.css';

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

/* 페이지 전역 설정 */
import BaseLayout from './components/BaseLayout.vue'

/* ionic component 전역설정 */
import { 
  IonPage, 
  IonToolbar, 
  IonButtons, 
  IonButton, 
  IonTitle, 
  IonHeader, 
  IonContent,
  IonBackButton
} from '@ionic/vue';

import * as Util from './utils/';


// MainApi 불러오기
import { MainApi } from './apis/'

// MainApi 객체 생성
const mainApi = new MainApi();


const app = createApp(App)
  .use(IonicVue)
  .use(router);

app.component('base-layout', BaseLayout);
app.component('ion-page', IonPage);
app.component('ion-toolbar', IonToolbar);
app.component('ion-buttons', IonButtons);
app.component('ion-button', IonButton);
app.component('ion-back-button', IonBackButton);
app.component('ion-title', IonTitle);
app.component('ion-header', IonHeader);
app.component('ion-content', IonContent);

// 전역 라이브러리 등록
app.config.globalProperties.$mainApi = mainApi;
app.config.globalProperties.$router = router;
  
router.isReady().then(() => {
  app.mount('#app');
});