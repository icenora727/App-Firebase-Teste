<template>
	<ion-page>
		<ion-content class="login-content" :fullscreen="true">
			<div class="login-wrapper">
				<ion-card class="login-card">
					<ion-card-header>
						<ion-card-title>Entrar</ion-card-title>
						<ion-card-subtitle>Acesse sua conta</ion-card-subtitle>
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
								placeholder="Digite sua senha"
							/>
							<ion-button fill="clear" size="small" slot="end" @click="showPassword = !showPassword">
								<ion-icon :icon="showPassword ? eyeOffOutline : eyeOutline"></ion-icon>
							</ion-button>
						</ion-item>

						<div class="options-row">
							<ion-checkbox v-model="rememberMe" label-placement="end">Lembrar de mim</ion-checkbox>
							<ion-button fill="clear" size="small">Esqueci a senha</ion-button>
						</div>

						<ion-button expand="block" class="login-button" @click="handleLogin">
							Entrar
						</ion-button>

						<p class="signup-text">
							Não tem conta?
							<router-link router-direction="forward" to="/cadastro">Cadastre-se</router-link>
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
	IonCheckbox,
	IonContent,
	IonIcon,
	IonInput,
	IonItem,
	IonPage,
} from '@ionic/vue';
import { eyeOffOutline, eyeOutline, lockClosedOutline, mailOutline } from 'ionicons/icons';
import { ref } from 'vue';

const email = ref('');
const password = ref('');
const rememberMe = ref(false);
const showPassword = ref(false);

import { signInWithEmailAndPassword } from 'firebase/auth';
import { authFirebase } from '@/firebase';
import router from '@/router';

const handleLogin = async () => {
    try {
        await signInWithEmailAndPassword(
            authFirebase,
            email.value.trim(),
            password.value,
        );

        await router.push('/tabs');
    } catch (error: any) {
        console.error(error);
        alert('E-mail ou senha inválidos.');
    }
};

</script>