<template>
    <div>
        <div class="mb-3">
            <label :for="`${props.label}Input`" class="form-label">
                {{ label }}
            </label>
            <input
                v-bind="$attrs"
                v-model="value"
                class="form-control"
                :id="`${props.label}Input`"
                :type="props.type"
                :placeholder="props.help"
                :required="props.required"
                @blur="validateField(value)"
                @input="validateField(value)"
            />
            <div class="form-text" :class="!isValid ? '' : 'notMessage'">
                <span v-if="!isValid"> {{ props.message }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { maskPhone } from "@/core/helpers/mask";
import {
    isEmail,
    isPassword,
    isPhone,
    isValue,
} from "@/core/helpers/validator";
import { computed, ref, defineEmits, defineProps } from "vue";

const props = defineProps({
    type: {
        type: String,
        default: "text",
        validator(value: string) {
            return ["text", "password", "email", "tel"].includes(value);
        },
    },
    label: {
        type: String,
        default: undefined,
    },
    help: {
        type: String,
        default: undefined,
    },
    message: {
        type: String,
        default: undefined,
    },
    required: {
        type: Boolean,
        default: false,
    },
    validation: {
        type: Boolean,
        default: undefined,
    },

    modelValue: {
        type: String,
        default: undefined,
        required: true,
    },
});

const isValid = ref(true);

const emit = defineEmits(["update:modelValue"]);

const value = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        value = applyMask(value);
        emit("update:modelValue", value);
    },
});

function validateField(value?: string) {
    if (typeof props.validation == "boolean") {
        isValid.value = props.validation || !props.required;
        return;
    }

    switch (props.type) {
        case "email":
            isValid.value = isEmail(value) || !props.required;
            break;
        case "password":
            isValid.value = isPassword(value) || !props.required;
            break;
        case "tel":
            isValid.value = isPhone(value) || !props.required;
            break;

        default:
            isValid.value = isValue(value) || !props.required;
    }
}

function applyMask(value?: string) {
    switch (props.type) {
        case "tel":
            return maskPhone(value ?? "");

        default:
            return value;
    }
}
</script>

<style scoped>
.form-text {
    font-size: 0.8rem;
    padding: 0;
    text-align: right;
    color: red;
}
.form-text.notMessage {
    padding: 0.6rem 0;
}
</style>
'
