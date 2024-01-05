<script async setup>
import { reactive } from 'vue';

const getSchema = async () => {
  try {
    const response = await fetch(
      'https://raw.githubusercontent.com/Huc91/test-sbp/master/formData.json',
      { cache: "no-cache" }
    )

    const jsonFormData = await response.json()
    console.log('JSON data:', jsonFormData)
    return jsonFormData
  } catch (error) {
    console.error('Error fetching data:', error.message)
    return null
  }
}

const formSchema = await getSchema()

const formData = reactive({});

const isFormValid = () => {
  return false
}

const submitForm = () => {
  if (isFormValid) {
    console.log('Form Data:', formSchema)
  } else {
    console.log('Form validation failed')
  }
}
</script>

<template>
  <form @submit.prevent="submitForm" class="dynamic-form">
    <div v-for="(field, i) in formSchema.fields" :key="field.label + i" class="dynamic-form__field">
      <label>{{ field.label }}</label>
      <template v-if="field.type === 'text'">
        <InputText
          v-model="formData[field.model]"
          :placeholder="field.placeholder"
          :required="field.required"
          :minlength="field.minLength"
          :maxlength="field.maxLength"
        />
      </template>
      <template v-else-if="field.type === 'email'">
        <InputText v-model="formData[field.model]" :placeholder="field.placeholder" :required="field.required" />
      </template>
      <template v-else-if="field.type === 'checkbox'">
        <Checkbox :label="field.label" :required="field.required" />
      </template>
      <template v-else-if="field.type === 'select'">
        <Dropdown :options="field.options" :required="field.required" />
      </template>
    </div>
    <input v-model="userInput" type="input" />
    <p>{{ userInput }}</p>
  </form>
</template>
