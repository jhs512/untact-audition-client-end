import { createApp, reactive, computed } from 'vue'
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
import FormRow from './components/FormRow.vue';


// 전역상태 만들기
const authKey = localStorage.getItem("authKey")
const loginedMemberId = Util.toIntOrNull(localStorage.getItem("loginedMemberId"))
const regDate = localStorage.getItem("regDate")
const updateDate = localStorage.getItem("updateDate")
const loginedMemberName = localStorage.getItem("loginedMemberName")
const loginedMemberNickName = localStorage.getItem("loginedMemberNickName")
const loginedMemberLoginId = localStorage.getItem("loginedMemberLoginId")
const loginedMemberCellphoneNo = localStorage.getItem("loginedMemberCellphoneNo")
const loginedMemberEngName = localStorage.getItem("loginedMemberEngName")
const loginedMemberGender = localStorage.getItem("loginedMemberGender")
const loginedMemberRegNumber = localStorage.getItem("loginedMemberRegNumber")
const loginedMemberAddress = localStorage.getItem("loginedMemberAddress")
const loginedMemberFeet = Util.toIntOrNull(localStorage.getItem("loginedMemberFeet"))
const loginedMemberWeight = Util.toIntOrNull(localStorage.getItem("loginedMemberWeight"))
const loginedMemberSkinTone = localStorage.getItem("loginedMemberSkinTone")
const loginedMemberEyelid = localStorage.getItem("loginedMemberEyelid")
const loginedMemberFeature = localStorage.getItem("loginedMemberFeature")
const loginedMemberFilmgraphy = localStorage.getItem("loginedMemberFilmgraphy")
const loginedMemberJobArea = localStorage.getItem("loginedMemberJobArea")
const loginedMemberCorp = localStorage.getItem("loginedMemberCorp")
const loginedMemberAuthLevel = localStorage.getItem("loginedMemberAuthLevel")

const globalShare:any = reactive ({
  fullPath:"",
  loginedMember:{
    authKey,
    id:loginedMemberId,
    loginId:loginedMemberLoginId,
    regDate:regDate,
    updateDate:updateDate,
    name:loginedMemberName,
    nickName:loginedMemberNickName,
    cellphoneNo:loginedMemberCellphoneNo,
    engName:loginedMemberEngName,
    gender:loginedMemberGender,
    regNumber:loginedMemberRegNumber,
    address:loginedMemberAddress,
    feet:loginedMemberFeet,
    weight:loginedMemberWeight,
    skinTone:loginedMemberSkinTone,
    eyelid:loginedMemberEyelid,
    feature:loginedMemberFeature,
    Filmgraphy:loginedMemberFilmgraphy,
    jobArea:loginedMemberJobArea,
    corp:loginedMemberCorp,
    authLevel:loginedMemberAuthLevel
  },
  isLogined: computed(() => globalShare.loginedMember.id !== null ),
  isMainLayoutVisible: computed(() => 
    globalShare.fullPath !== "/" && 
    globalShare.fullPath !== "" &&
    globalShare.fullPath !== "/usr/member/login" &&
    globalShare.fullPath !== "/usr/member/join" &&
    globalShare.fullPath !== "/usr/ap/join" &&
    globalShare.fullPath !== "/usr/pd/join" &&
    globalShare.fullPath !== "/usr/member/joinTos" 
  ),
  logout: () => {
    localStorage.removeItem("authKey");
    localStorage.removeItem("loginedMemberId");
    localStorage.removeItem("regDate");
    localStorage.removeItem("updateDate");
    localStorage.removeItem("loginedMemberLoginId");
    localStorage.removeItem("loginedMemberName");
    localStorage.removeItem("loginedMemberNickName");
    localStorage.removeItem("loginedMemberCellphoneNo");
    localStorage.removeItem("loginedMemberEngName")
    localStorage.removeItem("loginedMemberGender")
    localStorage.removeItem("loginedMemberRegNumber")
    localStorage.removeItem("loginedMemberAddress")
    localStorage.removeItem("loginedMemberFeet")
    localStorage.removeItem("loginedMemberWeight")
    localStorage.removeItem("loginedMemberSkinTone")
    localStorage.removeItem("loginedMemberEyelid")
    localStorage.removeItem("loginedMemberFeature")
    localStorage.removeItem("loginedMemberFilmgraphy")
    localStorage.removeItem("loginedMemberJobArea")
    localStorage.removeItem("loginedMemberCorp")
    localStorage.removeItem("loginedMemberAuthLevel")

    location.replace('/member/login');
  }
})

// MainApi 불러오기
import { MainApi } from './apis/'

// MainApi 객체 생성
const mainApi = new MainApi();


router.beforeEach((to, from, next) => {
  globalShare.fullPath = to.fullPath;
  next();
});

const app = createApp(App, { globalShare })
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
app.component('FormRow', FormRow);

// 전역 라이브러리 등록
app.config.globalProperties.$mainApi = mainApi;
app.config.globalProperties.$router = router;
  
router.isReady().then(() => {
  app.mount('#app');
});