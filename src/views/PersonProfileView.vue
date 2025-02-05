<template>
    <div>
        {{ person }}
    </div>
</template>

<script setup lang="ts">
import { Person } from "@/core/domain/Person";
import { personService } from "@/core/service/person.service";
import router from "@/router";
import { onMounted, ref } from "vue";

const person = ref<Person | undefined>();

onMounted(() => {
    const idRouter = router.currentRoute.value.params.id.toString();
    personService.get(idRouter).then(res => {
        if (res.exists()) {
            person.value = { ...res.data } as Person;
        }
    });
});
</script>

<style scoped></style>
