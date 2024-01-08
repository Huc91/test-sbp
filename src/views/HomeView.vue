<script setup>
import { isProxy, toRaw } from 'vue'
import DynamicForm from '../components/DynamicForm.vue'

const getSchema = async () => {
    try {
        const response = await fetch(
            'https://raw.githubusercontent.com/Huc91/test-sbp/master/formData.json',
            {
                cache: 'no-cache',
            },
        )

        const jsonFormData = await response.json()
        console.log('JSON data:', jsonFormData)
        return jsonFormData
    } catch (error) {
        console.error('Error fetching data:', error.message)
        return null
    }
}

//@submit I can do stuff I need to with the form, like sending data to BE
const sendData = (event) => {
    if (isProxy(event)) {
        const data = toRaw(event)
        console.log('form data -->', data)
        //Send request to BE
        // try {
        //   const response = await fetch('backend_url', {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data),
        //   });

        // if (!response.ok) {
        //   throw new Error(`Error: ${response.status} - ${response.statusText}`);
        // }

        //   const result = await response.json();
        //   console.log('Success:', result);
        // } catch (error) {
        //   console.error('Error:', error.message);
        // }
    }
    return
}

const formSchema = await getSchema()
</script>

<template>
    <main>
        <Card>
            <template #title> A Dynamic Form </template>
            <template #content>
                <DynamicForm :form-schema="formSchema" @submit="sendData" />
            </template>
        </Card>
    </main>
</template>
