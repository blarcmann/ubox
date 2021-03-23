import React from 'react';

export default function InputField(props) {
  const {
    value,
    onChange,
    errorState,
    rows,
    placeholder
  } = props;

  const errStt = errorState ? 'auth-form-item errorState' : 'auth-form-item';

  return (
    <div className='text-area'>
      <textarea
        className={`${errStt}`}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        rows={rows}
      ></textarea>

    </div>
  );
}
