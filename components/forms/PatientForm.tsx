'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import CustomFormField from '../CustomFormField'
import SubmitButton from '../SubmitButton'
import { useState } from 'react'
import { UserFormValidation } from '@/lib/validation'
import { useRouter } from "next/navigation"

export enum FromFieldType {
	INPUT = 'input',
	TEXTAREA = 'textarea',
	PHONE_INPUT = 'phoneinput',
	CHECKBOX = 'checkbox',
	DATE_PICKER = 'datePicker',
	SELECT = 'select',
	SKELETON = 'skeleton',
}

const PatientForm = () => {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)
	// 1. Define your form.
	const form = useForm<z.infer<typeof UserFormValidation>>({
		resolver: zodResolver(UserFormValidation),
		defaultValues: {
			name: '',
			email: '',
			phone: '',
		},
	})

	// 2. Define a submit handler.
	async function onSubmit({
		name,
		email,
		phone,
	}: z.infer<typeof UserFormValidation>) {
		setIsLoading(true)

		try {
			// const userData = {
			// 	name,
			// 	email,
			// 	phone,
			// }
			// const user = await createUser(userData)
			// if(user) router.push(`/patients/${user.$id}/register`)
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 flex-1'>
				<section className='mb-12 space-y-4'>
					<h1 className='header'>Hi there 👋</h1>
					<p className='text-dark-700'>Schedule your first appointment.</p>
				</section>
				<CustomFormField
					fieldType={FromFieldType.INPUT}
					control={form.control}
					name='name'
					label='Full Name'
					placeholder='Ruslan Dunets'
					iconSrc='/assets/icons/user.svg'
					iconAlt='user'
				/>
				<CustomFormField
					fieldType={FromFieldType.INPUT}
					control={form.control}
					name='email'
					label='Email'
					placeholder='dunecruslan1@gmail.com'
					iconSrc='/assets/icons/email.svg'
					iconAlt='email'
				/>
				<CustomFormField
					fieldType={FromFieldType.PHONE_INPUT}
					control={form.control}
					name='phone'
					label='Phone Number'
					placeholder='+380000000000'
				/>
				<SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
			</form>
		</Form>
	)
}

export default PatientForm
