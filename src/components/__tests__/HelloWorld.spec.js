import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DynamicForm from '../DynamicForm.vue'

describe('YourComponent', () => {
    it('fill the input and submits the form', async () => {
        const wrapper = mount(DynamicForm, {
            props: {
                formSchema: {
                    fields: [
                        {
                            label: 'Full Name',
                            type: 'text',
                            model: 'fullName',
                            placeholder: 'John Doe',
                            required: true,
                            minLength: 2,
                            maxLength: 50,
                        },
                    ],
                },
                submitText: 'Submit',
            },
        })
        await wrapper.find('input').setValue('test')
        await wrapper.find('form').trigger('submit.prevent')
        expect(wrapper.emitted().submit[0][0].fullName).toEqual('test')
    })
})
