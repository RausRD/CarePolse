'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl } from '@/components/ui/form'
import CustomFormField, { FromFieldType } from '../CustomFormField'
import SubmitButton from '../SubmitButton'
import { useState } from 'react'
import { UserFormValidation } from '@/lib/validation'
import { useRouter } from 'next/navigation'
import { createUser } from '@/lib/actions/patient.actions'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Doctors, GenderOptions, IdentificationTypes } from '@/constants'
import { Label } from '../ui/label'
import { SelectItem } from '../ui/select'
import Image from 'next/image'
import FileUploader from "../FileUploader"

const RegisterForm = ({ user }: { user: User }) => {
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
	const onSubmit = async ({
		name,
		email,
		phone,
	}: z.infer<typeof UserFormValidation>) => {
		setIsLoading(true)

		try {
			const user = {
				name,
				email,
				phone,
			}

			const newUser = await createUser(user)

			if (newUser) {
				router.push(`/patients/${newUser.$id}/register`)
			}
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-12 flex-1'
			>
				<section className='space-y-4'>
					<h1 className='header'>Welcome 👋</h1>
					<p className='text-dark-700'>Let us know more about yourself</p>
				</section>
				<section className='space-y-6'>
					<div className='mb-9 space-y-1'>
						<h2 className='sub-header'>Personal Information</h2>
					</div>
				</section>
				<CustomFormField
					fieldType={FromFieldType.INPUT}
					control={form.control}
					name='name'
					label='Full Name'
					placeholder='ex: Ruslan'
					iconSrc='/assets/icons/user.svg'
					iconAlt='user'
				/>
				<div className='flex flex-col gap-6 xl:flex-row'>
					<CustomFormField
						fieldType={FromFieldType.INPUT}
						control={form.control}
						name='email'
						label='Email Address'
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
				</div>
				<div className='flex flex-col gap-6 xl:flex-row'>
					<CustomFormField
						fieldType={FromFieldType.DATE_PICKER}
						control={form.control}
						name='birthDate'
						label='Date of Birth'
					/>
					<CustomFormField
						fieldType={FromFieldType.SKELETON}
						control={form.control}
						name='gender'
						label='Gender'
						renderSkeleton={field => (
							<FormControl>
								<RadioGroup
									className='flex h-11 gap-6 xl:justify-between'
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									{GenderOptions.map(option => (
										<div key={option} className='radio-group'>
											<RadioGroupItem value={option} id={option} />
											<Label htmlFor={option} className='cursor-pointer'>
												{option}
											</Label>
										</div>
									))}
								</RadioGroup>
							</FormControl>
						)}
					/>
				</div>
				<div className='flex flex-col gap-6 xl:flex-row'>
					<CustomFormField
						fieldType={FromFieldType.INPUT}
						control={form.control}
						name='address'
						label='Address'
						placeholder='14th Street, New York'
					/>
					<CustomFormField
						fieldType={FromFieldType.INPUT}
						control={form.control}
						name='occupation'
						label='Occupation'
						placeholder='Softwer Engineer'
					/>
				</div>
				<div className='flex flex-col gap-6 xl:flex-row'>
					<CustomFormField
						fieldType={FromFieldType.INPUT}
						control={form.control}
						name='emergencyContactName'
						label='Emergency Contact Name'
						placeholder='Guardian`s name'
					/>
					<CustomFormField
						fieldType={FromFieldType.PHONE_INPUT}
						control={form.control}
						name='emergencyContactNumber'
						label='Emergency Contact Number'
						placeholder='+380000000000'
					/>
				</div>
				<section className='space-y-6'>
					<div className='mb-9 space-y-1'>
						<h2 className='sub-header'>Medical Information</h2>
					</div>
				</section>
				<CustomFormField
					fieldType={FromFieldType.SELECT}
					control={form.control}
					name='primaryPhysician'
					label='Primary Physitian'
					placeholder='Select a Physician'
				>
					{Doctors.map(doctor => (
						<SelectItem key={doctor.name} value={doctor.name}>
							<div className='flex cursor-pointer items-center gap-2'>
								<Image
									src={doctor.image}
									width={32}
									height={32}
									alt={doctor.name}
									className='rounded-full border border-dark-500'
								/>
								<p>{doctor.name}</p>
							</div>
						</SelectItem>
					))}
				</CustomFormField>
				<div className='flex flex-col gap-6 xl:flex-row'>
					<CustomFormField
						fieldType={FromFieldType.INPUT}
						control={form.control}
						name='insuranceProvider'
						label='Insurance Provider'
						placeholder='BlueCross BlueShield'
					/>
					<CustomFormField
						fieldType={FromFieldType.INPUT}
						control={form.control}
						name='insurancePolicyNumber'
						label='Insurance Policy Number'
						placeholder='ABC123456789'
					/>
				</div>
				<div className='flex flex-col gap-6 xl:flex-row'>
					<CustomFormField
						fieldType={FromFieldType.TEXTAREA}
						control={form.control}
						name='allergies'
						label='Allergies (if any)'
						placeholder='Peanuts, Penicillin, Pollen'
					/>
					<CustomFormField
						fieldType={FromFieldType.TEXTAREA}
						control={form.control}
						name='currentMedication'
						label='Current Medication (if any)'
						placeholder='Ibuprophen 200mg, Paracetamol 500mg'
					/>
				</div>
				<div className='flex flex-col gap-6 xl:flex-row'>
					<CustomFormField
						fieldType={FromFieldType.TEXTAREA}
						control={form.control}
						name='familyMedicalHistory'
						label='Family Medical History'
						placeholder='Mother had brain cancer, Father had heart disease'
					/>
					<CustomFormField
						fieldType={FromFieldType.TEXTAREA}
						control={form.control}
						name='patMedicalHistory'
						label='Pat Medical History'
						placeholder='Appendectromy, Tonsillectomy'
					/>
				</div>
				<section className='space-y-6'>
					<div className='mb-9 space-y-1'>
						<h2 className='sub-header'>Identification and Verification</h2>
					</div>
				</section>
				<CustomFormField
					fieldType={FromFieldType.SELECT}
					control={form.control}
					name='identificationType'
					label='Identification Type'
					placeholder='Select an identification type'
				>
					{IdentificationTypes.map(type => (
						<SelectItem key={type} value={type}>
							{type}
						</SelectItem>
					))}
				</CustomFormField>
				<CustomFormField
					fieldType={FromFieldType.INPUT}
					control={form.control}
					name='identificationNumber'
					label='Identification Number'
					placeholder='123456789'
				/>
				<CustomFormField
					fieldType={FromFieldType.SKELETON}
					control={form.control}
					name='identificationDocument'
					label='Scanned Copy of Identification Document'
					renderSkeleton={field => (
						<FormControl>
							<FileUploader files={field.value} onChange={field.onChange}/>
						</FormControl>
					)}
				/>
				<SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
			</form>
		</Form>
	)
}

export default RegisterForm
