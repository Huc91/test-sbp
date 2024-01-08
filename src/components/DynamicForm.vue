<script async setup>
//Imports
import { reactive, computed, defineProps, defineEmits } from 'vue'

//Props
const props = defineProps({
    formSchema: {
        type: Object,
        default: () => {},
    },
    submitText: {
        type: String,
        default: 'Submit',
    },
})

const { formSchema, submitText } = props

//Emits
const emit = defineEmits(['submit'])

//Reactive
const formData = reactive({})
const formError = reactive({})

//Computed
const rules = computed(() => {
    const rules = []
    formSchema.fields.forEach((field) => {
        const fieldRules = { model: field.model, rules: {} }
        if (Object.hasOwn(field, 'required'))
            fieldRules.rules.required = field.required
        if (Object.hasOwn(field, 'minLength'))
            fieldRules.rules.minLength = field.minLength
        if (Object.hasOwn(field, 'maxLength'))
            fieldRules.rules.maxLength = field.maxLength
        if (Object.hasOwn(field, 'type') && field.type === 'email')
            fieldRules.rules.isEmail = true
        if (fieldRules.rules) rules.push(fieldRules)
    })
    return rules
})

//Functions
const validateForm = (form, rules) => {
    const errors = []
    rules.forEach((field) => {
        const data = form[field.model]
        formError[field.model] = checkRules(data, field.rules)
        if (checkRules(data, field.rules) !== false) errors.push(true)
    })
    if (errors.length) return false
    return true
}

const checkRules = (data, rules) => {
    if (rules.required) if (!data) return 'Required field'
    if (rules.minLength && typeof data === 'string')
        if (data.length < rules.minLength)
            return `Min ${rules.minLength} characters`
    if (rules.maxLength && typeof data === 'string')
        if (data.length > rules.maxLength)
            return `Max ${rules.maxLength} charaters`
    if (rules.isEmail) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(data)) return `Insert a valid email addres`
    }
    return false
}

const submitForm = () => {
    if (validateForm(formData, rules.value)) {
        console.log('Form Data:', formData)
        emit('submit', formData)
    } else {
        console.log('Form validation failed')
    }
}
</script>

<template>
    <form @submit.prevent="submitForm" class="dynamic-form">
        <div
            v-for="(field, i) in formSchema.fields"
            :key="`${field.model}-${i}`"
            class="dynamic-form__field"
        >
            <label :for="`${field.model}-${i}`">
                {{ `${field.label}${field.required ? '*' : ''}` }}
            </label>
            <template v-if="field.type === 'text'">
                <InputText
                    v-model="formData[field.model]"
                    :placeholder="field.placeholder"
                    :required="field.required"
                    :minlength="field.minLength"
                    :maxlength="field.maxLength"
                    :id="`${field.model}-${i}`"
                    :class="{
                        'p-invalid': formError && formError[field.model],
                    }"
                />
            </template>
            <template v-else-if="field.type === 'email'">
                <InputText
                    v-model="formData[field.model]"
                    :placeholder="field.placeholder"
                    :required="field.required"
                    :class="{
                        'p-invalid': formError && formError[field.model],
                    }"
                    type="email"
                />
            </template>
            <template v-else-if="field.type === 'checkbox'">
                <div class="checkbox__container">
                    <Checkbox
                        v-model="formData[field.model]"
                        :label="field.label"
                        :required="field.required"
                        binary
                        :class="{
                            'p-invalid': formError && formError[field.model],
                        }"
                    />
                    <p
                        v-if="field.description"
                        class="checkbox__description"
                        v-text="field.description"
                    />
                </div>
            </template>
            <template v-else-if="field.type === 'select'">
                <Dropdown
                    v-model="formData[field.model]"
                    :placeholder="field.placeholder"
                    :options="field.options"
                    optionLabel="label"
                    :required="field.required"
                    :class="{
                        'p-invalid': formError && formError[field.model],
                    }"
                />
            </template>
            <p
                v-if="formError && formError[field.model]"
                class="dynamic-form__error"
                v-text="formError[field.model]"
            />
        </div>
        <Button :label="submitText" @click="submitForm" />
    </form>
</template>

<style lang="scss" scoped>
.dynamic-form {
    &__field {
        display: flex;
        flex-direction: column;
        margin-top: 1rem;
        margin-bottom: 1rem;
    }
    &__error {
        color: #ff0000;
    }
}

.checkbox {
    &__container {
        display: flex;
        flex-direction: row;
    }
    &__description {
        display: block;
        margin-left: 0.5rem;
        color: #4c4c4c;
    }
}
</style>
