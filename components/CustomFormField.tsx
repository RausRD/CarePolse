'use client'
import React from 'react'
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Control } from 'react-hook-form'
import Image from 'next/image'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { E164Number } from 'libphonenumber-js/core'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Select, SelectContent, SelectTrigger, SelectValue } from './ui/select'
import { Textarea } from './ui/textarea'
import { Checkbox } from "./ui/checkbox"

export enum FromFieldType {
	INPUT = 'input',
	TEXTAREA = 'textarea',
	PHONE_INPUT = 'phoneinput',
	CHECKBOX = 'checkbox',
	DATE_PICKER = 'datePicker',
	SELECT = 'select',
	SKELETON = 'skeleton',
}

interface CustomProps {
	control: Control<any>
	name: string
	label?: string
	placeholder?: string
	iconSrc?: string
	iconAlt?: string
	disabled?: boolean
	dateFormat?: string
	showTimeSelect?: boolean
	children?: React.ReactNode
	renderSkeleton?: (field: any) => React.ReactNode
	fieldType: FromFieldType
}

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
	const {
		fieldType,
		iconSrc,
		iconAlt,
		placeholder,
		showTimeSelect,
		dateFormat,
		renderSkeleton,
	} = props
	switch (fieldType) {
		case FromFieldType.INPUT:
			return (
				<div className='flex rounded-md border border-dark-500 bg-dark-400'>
					{iconSrc && (
						<Image
							src={iconSrc}
							height={24}
							width={24}
							alt={iconAlt || 'icon'}
							className='ml-2'
						/>
					)}
					<FormControl>
						<Input
							placeholder={placeholder}
							{...field}
							className='shad-input border-0'
						/>
					</FormControl>
				</div>
			)
		case FromFieldType.TEXTAREA:
			return (
				<FormControl>
					<Textarea
						placeholder={placeholder}
						{...field}
						className='shad-textArea'
						disabled={props.disabled}
					/>
				</FormControl>
			)
		case FromFieldType.PHONE_INPUT:
			return (
				<FormControl>
					<PhoneInput
						defaultCountry='UA'
						placeholder={placeholder}
						international
						withCountryCallingCode
						value={field.value as E164Number | undefined}
						onChange={field.onChange}
						className='input-phone'
					/>
				</FormControl>
			)
		case FromFieldType.DATE_PICKER:
			return (
				<div className='flex rounded-md border border-dark-500 '>
					<Image
						src='/assets/icons/calendar.svg'
						height={24}
						width={24}
						alt='calendar'
						className='ml-2'
					/>
					<FormControl className='py-56 bg-black'>
						<DatePicker
							selected={field.value}
							onChange={date => field.onChange(date)}
							dateFormat={dateFormat ?? 'MM/dd/yyy'}
							showTimeSelect={showTimeSelect ?? false}
							timeInputLabel='Time:'
							wrapperClassName='date-picker'
						/>
					</FormControl>
				</div>
			)
		case FromFieldType.SELECT:
			return (
				<FormControl>
					<Select onValueChange={field.onChange} defaultValue={field.value}>
						<FormControl>
							<SelectTrigger className='shad-select-trigger'>
								<SelectValue placeholder={placeholder} />
							</SelectTrigger>
						</FormControl>
						<SelectContent className='shad-select-content'>
							{props.children}
						</SelectContent>
					</Select>
				</FormControl>
			)
		case FromFieldType.SKELETON:
			return renderSkeleton ? renderSkeleton(field) : null
		case FromFieldType.CHECKBOX:
			return (
				<FormControl>
				<div className="flex items-center gap-4">
					<Checkbox id={props.name} checked={field.value} onCheckedChange={field.onChange}/>
					<label htmlFor={props.name} className="checkbox-label">{props.label}</label>
				</div>
				</FormControl>
			)
		default:
			break
	}
}

const CustomFormField = (props: CustomProps) => {
	const { control, fieldType, name, label } = props
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className='flex-1'>
					{fieldType !== FromFieldType.CHECKBOX && label && (
						<FormLabel>{label}</FormLabel>
					)}
					<RenderField field={field} props={props} />
					<FormMessage className='shad-error' />
				</FormItem>
			)}
		/>
	)
}

export default CustomFormField
