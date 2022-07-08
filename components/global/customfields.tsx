import React, { ChangeEventHandler } from "react";

export const CustomInput = ({
  label,
  type = "text",
  isRequired = true,
  name,
  placeholder,
  id,
  value="",
  onChange,
  classes="col-span-1",
  min,
  max
}: {
  label: string;
  type?: string;
  isRequired?: boolean;
  id?: string;
  name: string,
  placeholder?: string,
  value?: string | number,
  onChange: ChangeEventHandler,
  classes?: string, 
  min?: number,
  max?: number,
}) => {
  return (
    <div className={`mt-2 ${classes}`}>
      <label htmlFor={id} className="block text-sm font-medium ">
        {label}
      </label>
      <div className="mt-1">
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          min={min}
          max={max}
          autoComplete="email"
          required={isRequired}
          placeholder={placeholder}
          onChange={onChange}
          className="text-black appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
    </div>
  );
};

export const CustomSelect = ({
  label,
  isRequired = true,
  name,
  placeholder,
  id,
  value="",
  onChange,
  classes="col-span-1",
  options
}: {
  label: string;
  isRequired?: boolean;
  id?: string;
  name: string,
  placeholder?: string,
  value?: string | number,
  onChange: ChangeEventHandler,
  classes?: string, 
  options: { name: string, value: string }[],
}) => {
  return (
    <div className={`mt-2 ${classes}`}>
      <label htmlFor={id} className="block text-sm font-medium ">
        {label}
      </label>
      <div className="mt-1">
        <select
          id={id}
          name={name}
          value={value}
          required={isRequired}
          placeholder={placeholder}
          onChange={onChange}
          className="text-black appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">-- Select --</option>
          {
            options.map(option => (
              <option value={option.value} key={option.value}>{option.name}</option>
            ))
          }
        </select>
      </div>
    </div>
  )
}