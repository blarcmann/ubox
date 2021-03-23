import React, { useState } from 'react';
import '../../styles/compontents/input.scss'

export default function InputField(props) {
	const [inputType, setInputType] = useState('password');
	const {
		value,
		type,
		noBorderBotom,
		onChange,
		errorState,
		placeholder
	} = props;

	const toggleText = () => {
		setInputType(inputType === 'password' ? 'text' : 'password');
	};
	// console.log(toggleText)

	const errStt = errorState ? 'auth-form-item errorState' : 'auth-form-item';

	return (
		<div className={noBorderBotom ? 'no-br-bottom with-icon' : 'with-icon'}>
			<input
				type={type === 'password' ? inputType : type}
				className={`${errStt}`}
				autoComplete="off"
				placeholder={placeholder}
				onChange={onChange}
				value={value}
			/>
			{/* {withIcon ? (
				<img
					src={
						inputType === 'password'
							? require('../assets/svgs/showPassword.svg')
							: require('../assets/svgs/hidePassword.svg')
					}
					alt="*"
					onClick={toggleText}
				/>
			) : (
				''
			)} */}
		</div>
	);
}
