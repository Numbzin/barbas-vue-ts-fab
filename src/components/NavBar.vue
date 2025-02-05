<template>
    <nav
        class="navbar navbar-expand-lg fixed-top"
        @mousemove="updateDataAuth()"
    >
        <div class="container">
            <!-- <a class="navbar-brand" href="#">Navbar</a> -->
            <img
                class="navbar-toggler border-0"
                src="imagem/barbershop-logo.jpg"
                height="40"
                alt=""
            />
            <button
                class="navbar-toggler bg-yellow"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/">Inicio</RouterLink>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/#services">Serviços</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/#about">Sobre Nós</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/#contact">Contato</a>
                    </li>
                </ul>

                <ul v-if="person" class="navbar-nav">
                    <li class="nav-item">
                        <RouterLink
                            class="nav-link"
                            :to="`/profile/${person?.id}`"
                        >
                            {{ person?.name ?? person?.email }}
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" @click="sendLogoff()"> Sair </a>
                    </li>
                </ul>

                <ul v-else class="navbar-nav">
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/login">
                            Entrar
                        </RouterLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { Person } from "@/core/domain/Person";
import { authService } from "@/core/service/auth.service";
import router from "@/router";
import { ref } from "vue";

const person = ref<Person | undefined>();

let times = 0;

function updateDataAuth() {
    clearTimeout(times);
    times = setTimeout(() => {
        person.value = authService.getAuthUser();
    }, 500);
}

function sendLogoff() {
    authService
        .logoff()
        .then(() => {
            updateDataAuth();
            router.push("/");
        })
        .catch(() => {
            alert("Não foi possível sair!");
        });
}

router.beforeEach(() => {
    updateDataAuth();
});
</script>

<style scoped>
.navbar {
    width: 100%;
    backdrop-filter: blur(10px);
    background-color: var(--shadow);
    /* display: flex;
    align-items: flex-start;
    padding: 20px;
    flex-direction: row;
    justify-content: space-around;
    position: sticky;
    top: 0 */
}

/* .nav-links {
    list-style: none;
    display: flex;
    justify-content: flex-start;
} */

/* .nav-links li {
    margin-right: 20px;
} */

.navbar .nav-link {
    text-decoration: none;
    color: var(--white);
    font-size: 1.5rem;
    padding: 5px 15px;
    transition: 0.3s ease;
    border-bottom: solid 4px transparent;
}

.navbar .nav-link:hover,
.navbar .nav-link:active {
    /* background-color: var(--yellow);
    border-radius: 5px; */
    color: var(--yellow);
    border-bottom: solid 4px var(--yellow);
    transition: 0.3s ease;
}
</style>
