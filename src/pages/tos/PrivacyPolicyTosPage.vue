<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button @click="setClose" default-href="/"></ion-back-button>
        </ion-buttons>
        <ion-title class="ion-text-center">Audictionary</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="text-center my-6 text-xl font-bold">
        <span class="border-b-2 pb-1">개인정보 수집 및 이용에 대한 동의</span>
      </div>
      <div class="px-3 mb-10">
        <h4><strong>1. 개인정보 수집 및 이용 현황</strong></h4>
        <p>(주) 미일 (이하 &#39;회사&#39;는) 고객님의 개인 정보를 중요시하며, &quot;정보 통신망 이용 촉진 및 정 보 보호&quot;에 관한 법률을 준수하고 있습니다. 회사는 개인 정보 취급 방침을 통하여 고객님 께서 제공하시는 개인 정보가 어떠한 용도와 방식으로 이용되고 있으며, 개인 정보 보호를 위해 어떠한 조치가 취해지고 있는지 알려드립니다. </p>
        <p>회사는 개인 정보 취급 방침을 개정하는 경우 웹 사이트 공지 사항 (또는 개별 공지)을 통하여 공지 할 것입니다. </p>
        <ul>
        <li>본 방침은 : 2021 년 5 월 4 일부터 시행됩니다.</li>
        </ul>
        <p>■ 수집하는 개인 정보 항목 </p>
        <p>회사는 회원 가입, 상담, 서비스 신청 등등을 위해 아래와 같은 개인 정보를 수집하고 있습니다. </p>
        <ul>
        <li>수집 항목 : 이름, 생년월일, 성별, 로그인 ID, 비밀번호, 자택 주소, 휴대 전화 번호, 이메일, 프로필 작성시 입력하는 신체 정보 및 연기자 스타일 정보, 서비스 이용 기록, 접속 로그, 쿠키, 접속 IP 정보, 결제 기록을</li>
        <li>개인 정보 수집 방법 : 홈페이지 (회원 가입, 아이디 비밀번호 확인, 고객 센터 메일 문의 등), 전화 / 팩스를 통 한 회원 가입</li>
        </ul>
        <p>■ 개인 정보의 수집 및 이용 목적 </p>
        <p>회사는 수집 한 개인 정보를 다음의 목적을 위해 활용합니다. </p>
        <ul>
        <li>회원 관리</li>
        </ul>
        <p>회원 관리 회원제 서비스 이용에 따른 본인 확인, 개인 식별, 불량 회원의 부정 이용 방지와 비인가 사용 방지, 가입의사 확인, 연령 확인, 만 14 세 미만 아동 개인 정보 수집시 법정 대리인 동의 여부 확인, 불만 처리 등 민원 처리, 고지 사항 전달 </p>
        <ul>
        <li>마케팅 및 광고에 활용</li>
        </ul>
        <p>신규 서비스 (제품) 개발 및 특화, 이벤트 등 광고성 정보 전달, 접속 빈도 파악 또는 회원의 서비스 이용에 대 한 통계 </p>
        <p>■ 개인 정보의 보유 및 이용 기간 </p>
        <p>회사는 개인 정보 수집 및 이용 목적이 달성 된 후에는 예외없이 해당 정보를 지체없이 파기합니다. </p>
        <p>■ 개인 정보의 파기 절차 및 방법 </p>
        <p>회사는 원칙적으로 개인 정보 수집 및 이용 목적이 달성 된 후에는 해당 정보를 지체없이 파기합니다. 파기 절차 및 방법은 다음과 같습니다. </p>
        <ul>
        <li>파기 절차</li>
        </ul>
        <p>회원님이 회원 가입 등을 위해 입력하신 정보는 목적이 달성 된 후 별도의 DB로 옮겨져 (종이의 경우 별도의 서류함) 내부 방침 및 기타 관련 법령에 의한 점보 보호 사유에 따라 (보유 및 이용 기간 참조) 일정 기간 저장된 후 파기되어집니다. </p>
        <p>별도 DB로 옮겨진 개인 정보는 법률에 의한 경우가 아니고서는 보유되어지는 이외의 다른 목적으로 이용 되지 않습니다. </p>
        <ul>
        <li>파기 방법<ul>
        <li>전자적 파일 형태로 저장된 개인 정보는 기록을 재생할 수없는 기술적 방법을 사용하여 삭제합니다.</li>
        <li>종이에 출력 된 개인 정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.</li>
        </ul>
        </li>
        </ul>
        <p>■ 개인 정보 제공 </p>
        <p>회사는 이용자의 개인 정보를 원칙적으로 외부에 제공하지 않습니다. 다만, 아래의 경우에는 예외로합니다.</p>
        <ul>
        <li>이용자들이 사전에 동의 한 경우</li>
        <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사 기관의 요구가있는 경우</li>
        </ul>
        <p>■ 수집 한 개인 정보의 위탁 회사는 고객님의 동의없이 고객님의 정보를 외부 업체에 위탁하지 않습니다. 향후 그러한 필요가 생길 경우, 위탁 대상자와 위탁 업무 내용에 대해 고객님에게 통지하고 필요한 경우 사전 동의를 받도록하겠습니다.</p>
        <p>■ 이용자 및 법정 대리인의 권리와 그 행사 방법 </p>
        <p>이용자 및 법정 대리인은 언제든지 등록되어있는 자신 혹은 당해 만 14 세 미만 아동의 개인 정보를 조회하거나 수정할 수 있으며 가입 해지를 요청할 수도 있습니다. </p>
        <p>이용자 혹은 만 14 세 미만 아동의 개인 정보 조회 / 수정을 위해서는 &#39;개인 정보 변경&#39;(또는 &#39;회원 정보 수정&#39;등)을 가입 해지 (동의 철회)를 위해서는&quot;회원 탈퇴 &quot;를 클릭하여 본인 확인 절차를 거치 신 후 직접 열람, 정정 또는 탈퇴가 가능합니다. </p>
        <p>혹은 개인 정보 관리 책임자에게 서면, 전화 또는 이메일로 연락하시면 지체없이 조치하겠습니다. </p>
        <p>귀하가 개인 정보와 외 오류에 대한 정정을 요청하신 경우에는 정정을 완료하기 전까지 당해 개인 정보를 이용 또는 제공하지 않습니다. 또한 잘못된 개인 정보를 제 3 자에게 이미 제공 한 경우에는 정정 처리 결과를 제 3 자에 게 지체없이 통지하여 점점이 이루어 지도록하겠습니다. </p>
        <p>■ 개인 정보 자동 수집 장치의 설치, 운영 및 그 거부에 관한 사항</p>
        <p>회사는 귀하의 정보를 수시로 저장하고 찾아내는 &#39;쿠키(COOKIE)&#39;등을 운용합니다. 쿠키란 웹 사이트를 운영하는데 이용되는 서버가 귀하의 브라우저에 보내는 아주 작은 텍스트 파일로서 귀하의 컴퓨터 하드 디스크에 저장됩니다. 회사는 다음과 같은 목적을 위해 쿠키를 사용합니다.</p>
        <blockquote>
        <p>쿠키 등 사용 목적 </p>
        </blockquote>
        <p>회원과 비회원의 접속 빈도 나 방문 시간 등을 분석, 이용자의 취향과 관심 분야를 파악 및 자취 추적, 각종이 벤트 참여 정도 및 방문 회수 파악 등을 통한 타겟 마케팅 및 개인 맞춤 서비스 제공 </p>
        <p>귀하는 쿠키 설치에 대한 선택권을 가지고 있습니다. 따라서, 귀하는 웹 브라우저에서 옵션을 설정함으로써 모든 쿠키를 허용하거나, 쿠키가 저장 될 때마다 확인을 거치거나, 아니면 모든 쿠키의 저장을 거부 할 수도 있습니다. </p>
        <blockquote>
        <p>쿠키 설정 거부 방법 </p>
        </blockquote>
        <p>예 : 쿠키 설정을 거부하는 방법으로는 회원님이 사용하시는 웹브라우저의 옵션을 선택 함으로로써 모든 쿠키를 허용하거나 쿠키를 저장할 때마다 확인을 거치거나, 모든 쿠키의 저장을 거부 할 수 있습니다. </p>
        <p>설정 방법 예(인터넷 익스플로어의 경우)<br>: 웹 브라 무저 상단의 도구 &gt; 인터넷 옵션 &gt; 개인 정보</p>
        <p>단, 귀하 께서 쿠키 설치를 거부 하였을 경우 서비스 제공에 어려움이있을 수 있습니다. </p>
        <p>■ 개인 정보에 관한 민원 서비스 회사는 고객의 개인 정보를 보호하고 개인 정보와 관련한 불만을 처리하기 위하여 아래와 같이 관련 부서 및 개인 정보 관리 책임자를 지정하고 있습니다. </p>
        <p>고객 서비스 담당 부서 : 운영팀</p>
        <p>이메일 : <a href="mailto:jnydevelopment@gmail.com">jnydevelopment@gmail.com</a></p>
        <p>귀하께서는 회사의 서비스를 이용 하시며 발생하는 모든 개인 정보 보호 관련 민원을 개인 정보 관리 책임자 혹 온 담당 부서로 신고하실 수 있습니다. 회사는 이용자들의 신고 사항에 대해 신속하게 중분 한 답변을 드릴 것입니다. </p>
        <p>기타 개인 정보 침해에 대한 신고 나 상담이 필요하신 경우에는 아래 기관에 문의하시기 바랍니다. </p>
        <ol>
        <li><p>개인 분쟁 조정위원회 <a href="http://www.kopico.go.kr/main/main.do/">www.kopico.go.kr/main/main.do/</a> 연락처 : 1833-6972</p>
        </li>
        <li><p>정보 보호 마크 인증위원회 <a href="http://www.eprivacy.or.kr/">www.eprivacy.or.kr/</a> 연락처 : 02-550-9500</p>
        </li>
        <li><p>대 검찰 청 인터넷 범죄 수사 센터 <a href="https://spo.go.kr/">https://spo.go.kr/</a> 연락처 : 1301</p>
        </li>
        <li><p>경찰청 사이버 테러 대응 센터<br><a href="https://cyberbureau.police.go.kr/">https://cyberbureau.police.go.kr/</a> 연락처 : 182</p>
        </li>
        </ol>


      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PrivacyPolicyTosPage',
  props:{
    modalController:{
      type: Object,
      required:false
    }
  },
  setup(props){
    function setClose(){
      props.modalController?.dismiss();
    }
    return{
      setClose
    }
  }
})
</script>

<style scoped>
  p, ul, li {
    font-size: 13px;
  }

  ul, li {
    padding: 5px 0 5px 0;
  }
</style>