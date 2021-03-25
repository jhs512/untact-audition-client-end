<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-title> </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <section class="section-1">
        <div class="main-content">
          <strong>
            <span>Audictionary</span>
          </strong>
        </div>
      </section>
      <section class="section-1">
        <div class="main-content">
          <strong>
            <span>Audictionary</span>
          </strong>
        </div>
      </section>
      <section class="section-1">
        <div class="main-content">
          <strong>
            <span>Audictionary</span>
          </strong>
        </div>
      </section>
      <section class="section-1">
        <div class="main-content">
          <strong>
            <span>Audictionary</span>
          </strong>
        </div>
      </section>
      <section class="section-1">
        <div class="main-content">
          <strong>
            <span>Audictionary</span>
          </strong>
        </div>
      </section>
      <section class="section-1">
        <div class="main-content">
          <strong>
            <span>Audictionary</span>
          </strong>
        </div>
      </section>
      <section class="section-1">
        <div class="main-content">
          <strong>
            <span>Audictionary</span>
          </strong>
        </div>
      </section>
      <section class="section-1">
        <div class="main-content">
          <strong>
            <span>Audictionary</span>
          </strong>
        </div>
      </section>
      <section class="section-1">
        <div class="main-content">
          <strong>
            <span>Audictionary</span>
          </strong>
        </div>
      </section>
      <section class="section-1">
        <div class="main-content">
          <strong>
            <span>Audictionary</span>
          </strong>
        </div>
      </section>
      
      <div class="button">
        <ion-button>asdf</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonButton } from '@ionic/vue';

export default defineComponent({
  name:'OpenPage',
  components: { IonPage, IonHeader, IonToolbar, IonTitle, IonButton }
})
</script>

<style scoped>

.section-1 {
  display: flex;
  justify-content: center;
  height: 60%;
  font-size: 28px;
}

.main-content{
  align-self: center;
}

.button{
  width:100%;
}
</style>