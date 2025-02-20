import Select from 'react-select'
import { Field, useFormikContext } from 'formik'

const RenderField = ({ id, label, name, type, placeholder, error, className, options }) => {
	const { setFieldValue, values } = useFormikContext()
	return (
		<div className={`relative ${className}`}>
			<label htmlFor={id} className={`block mb-[6px] text-sm text-[#344054] ${label ? '' : 'hidden'}`}>
				{label}
			</label>
			{type === 'select' ? (
				<Select
					id={id}
					name={name}
					options={options}
					isMulti
					placeholder={placeholder}
					className={`w-full ${error ? 'border-red-500' : ''}`}
					value={options.filter((option) => values[name]?.includes(option.value))} // Match selected values
					onChange={(selectedOptions) =>
						setFieldValue(
							name,
							selectedOptions.map((option) => option.value)
						)
					}
					data-testid="user-select"
				/>
			) : (
				<Field
					id={id}
					name={name}
					type={type}
					placeholder={placeholder}
					className={`w-full px-[14px] py-[10px] border rounded-[8px] placeholder:text-[#667085]  ${
						error ? 'border-red-500' : 'border-[#D0D5DD]'
					} focus:outline-none`}
				/>
			)}
			{error && <p className='text-xs text-red-500 absolute -bottom-[20px] left-0'>{error}</p>}
		</div>
	)
}

export default RenderField
