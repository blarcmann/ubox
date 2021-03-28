import React, { useState } from 'react';
import '../../styles/compontents/input.scss'

export default function InputField(props) {
	const [inputType] = useState('password');
	const {
		value,
		type,
		onChange,
		errorState,
		placeholder
	} = props;

	const errStt = errorState ? 'auth-form-item errorState' : 'auth-form-item';

	return (
		<input
			type={type === 'password' ? inputType : type}
			className={`${errStt}`}
			autoComplete="off"
			placeholder={placeholder}
			onChange={onChange}
			value={value}
		/>
	);
}
