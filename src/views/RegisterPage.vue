<template>
  <ion-page>
    <ion-content class="login-content" :fullscreen="true">
      <div class="login-wrapper">
        <ion-card class="login-card">
          <ion-card-header>
            <ion-card-title>Criar conta</ion-card-title>
            <ion-card-subtitle>Cadastre-se para começar</ion-card-subtitle>
          </ion-card-header>

          <ion-card-content>
            <ion-item lines="none" class="input-item">
              <ion-icon :icon="mailOutline" slot="start"></ion-icon>
              <ion-input
                v-model="email"
                type="email"
                label="E-mail"
                label-placement="stacked"
                placeholder="seuemail@exemplo.com"
              />
            </ion-item>

            <ion-item lines="none" class="input-item">
              <ion-icon :icon="lockClosedOutline" slot="start"></ion-icon>
              <ion-input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                label="Senha"
                label-placement="stacked"
                placeholder="Crie uma senha"
              />
              <ion-button fill="clear" size="small" slot="end" @click="showPassword = !showPassword">
                <ion-icon :icon="showPassword ? eyeOffOutline : eyeOutline"></ion-icon>
              </ion-button>
            </ion-item>

            <ion-item lines="none" class="input-item">
              <ion-icon :icon="lockClosedOutline" slot="start"></ion-icon>
              <ion-input
                v-model="confirmPassword"
                :type="showPassword ? 'text' : 'password'"
                label="Confirmar senha"
                label-placement="stacked"
                placeholder="Digite a senha novamente"
              />
            </ion-item>

            <ion-button expand="block" class="login-button" :disabled="isLoading" @click="handleRegister">
              {{ isLoading ? 'Criando conta...' : 'Criar conta' }}
            </ion-button>

            <p class="signup-text">
              Já tem uma conta?
              <router-link to="/login">Entrar</router-link>
            </p>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonPage,
} from '@ionic/vue';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { eyeOffOutline, eyeOutline, lockClosedOutline, mailOutline } from 'ionicons/icons';
import { ref } from 'vue';

import { authFirebase } from '@/firebase';
import router from '@/router';

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const showPassword = ref(false);
const isLoading = ref(false);

const handleRegister = async () => {
  const normalizedEmail = email.value.trim();

  if (!normalizedEmail || !password.value || !confirmPassword.value) {
    alert('Preencha todos os campos.');
    return;
  }

  if (password.value !== confirmPassword.value) {
    alert('As senhas não conferem.');
    return;
  }

  if (password.value.length < 6) {
    alert('A senha deve ter pelo menos 6 caracteres.');
    return;
  }

  isLoading.value = true;

  try {
    await createUserWithEmailAndPassword(authFirebase, normalizedEmail, password.value);
    await router.push('/tabs/perfil');
  } catch (error) {
    console.error(error);
    alert('Não foi possível criar a conta. Verifique o e-mail e tente novamente.');
  } finally {
    isLoading.value = false;
  }
};
</script>
