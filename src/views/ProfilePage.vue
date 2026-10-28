<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Meu perfil</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="profile-content">
      <div class="profile-wrapper">
        <ion-card class="profile-card">
          <ion-card-header class="profile-header">
            <ion-avatar class="profile-avatar">
              <img v-if="photoUrl" :src="photoUrl" alt="Foto de perfil" />
              <ion-icon v-else :icon="personCircleOutline" aria-label="Sem foto de perfil" />
            </ion-avatar>
            <ion-card-title>Dados do perfil</ion-card-title>
            <ion-card-subtitle>{{ currentUserEmail }}</ion-card-subtitle>
          </ion-card-header>

          <ion-card-content>
            <ion-item class="profile-field">
              <ion-input
                v-model="name"
                label="Nome"
                label-placement="stacked"
                placeholder="Digite seu nome"
              />
            </ion-item>

            <ion-item class="profile-field">
              <ion-input
                v-model="nickname"
                label="Nickname"
                label-placement="stacked"
                placeholder="Como quer ser chamado?"
              />
            </ion-item>

            <ion-item class="profile-field">
              <ion-input
                v-model="birthDate"
                type="date"
                label="Data de nascimento"
                label-placement="stacked"
              />
            </ion-item>

            <ion-item class="profile-field">
              <ion-input
                v-model="photoUrl"
                type="url"
                label="URL da foto de perfil"
                label-placement="stacked"
                placeholder="https://exemplo.com/minha-foto.jpg"
              />
            </ion-item>

            <ion-button expand="block" :disabled="isSaving" @click="saveProfile">
              {{ isSaving ? 'Salvando...' : 'Salvar perfil' }}
            </ion-button>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonAvatar,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/vue';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { personCircleOutline } from 'ionicons/icons';
import { computed, onMounted, ref } from 'vue';

import { authFirebase, db } from '@/firebase';
import router from '@/router';

const name = ref('');
const birthDate = ref('');
const nickname = ref('');
const photoUrl = ref('');
const isSaving = ref(false);

const currentUserEmail = computed(() => authFirebase.currentUser?.email ?? '');

const loadProfile = async () => {
  const user = authFirebase.currentUser;

  if (!user) {
    await router.replace('/login');
    return;
  }

  const profileSnapshot = await getDoc(doc(db, 'users', user.uid));
  if (!profileSnapshot.exists()) return;

  const profile = profileSnapshot.data();
  name.value = profile.name ?? '';
  birthDate.value = profile.birthDate ?? '';
  nickname.value = profile.nickname ?? '';
  photoUrl.value = profile.photoUrl ?? '';
};

const saveProfile = async () => {
  const user = authFirebase.currentUser;

  if (!user) {
    await router.replace('/login');
    return;
  }

  if (!name.value.trim() || !birthDate.value || !nickname.value.trim()) {
    alert('Preencha nome, nickname e data de nascimento.');
    return;
  }

  if (photoUrl.value && !isValidUrl(photoUrl.value)) {
    alert('Informe uma URL válida para a foto.');
    return;
  }

  isSaving.value = true;

  try {
    await setDoc(
      doc(db, 'users', user.uid),
      {
        uid: user.uid,
        email: user.email,
        name: name.value.trim(),
        birthDate: birthDate.value,
        nickname: nickname.value.trim(),
        photoUrl: photoUrl.value.trim(),
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    );
    alert('Perfil salvo com sucesso.');
  } catch (error) {
    console.error(error);
    alert('Não foi possível salvar o perfil. Verifique as regras do Firestore.');
  } finally {
    isSaving.value = false;
  }
};

const isValidUrl = (value: string) => {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
};

onMounted(loadProfile);
</script>