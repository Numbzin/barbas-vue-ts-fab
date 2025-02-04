<template>
    <section class="form-access">
        <form action="">
            <div class="form-group">
                <label for="email">E-mail</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    v-model="email"
                    placeholder="email@host.com.br"
                    autofocus
                />
            </div>

            <div class="form-group">
                <label for="password">Senha</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    v-model="senha"
                    placeholder="senha"
                />
            </div>

            <div class="form-group-inline">
                <input type="checkbox" name="remember" id="rem" />
                <label for="rem">Lembre-me</label>
            </div>

            <div class="form-group">
                <button type="button" @click="sendLoginEmail">Entrar</button>
            </div>

            <div>
                <p>
                    Novo aqui?
                    <RouterLink to="/person-add">cadastre-se</RouterLink>
                </p>
                <p>
                    <router-link to="/person-recovery">
                        esqueceu a senha?
                    </router-link>
                </p>
            </div>

            <div class="form-group">
                <button type="button" @click="sendLoginGoogle()">Google</button>
            </div>
        </form>
        <div>
            <ErrorComponent :message="errorLogin" />
        </div>
    </section>
    <div v-if="errorLogin" class="alert alert-danger" role="alert">
        {{ errorLogin }}
    </div>
</template>

<script setup lang="ts">
import { authService } from "@/core/service/auth.service";
import router from "@/router";
import { ref } from "vue";

const email = ref("");
const senha = ref("");
const errorLogin = ref();

//const user = authService.getAuthUser();

function sendLoginEmail() {
    authService
        .loginEmail(email.value, senha.value)
        .then(res => {
            router.push("/");
        })
        .catch(error => {
            errorLogin.value = error;
        });
}

function sendLoginGoogle() {
    authService
        .loginGoogle()
        .then(res => {
            router.push("/");
        })
        .catch(error => {
            errorLogin.value = error;
        });
}
</script>

<style scoped>
@import "@/assets/css/login.css";
.alert.alert-danger {
    position: absolute;
    top: 100px;
    left: 50%;
    width: 50%;
    transform: translateX(-50%);
}
</style>
