import React, { ChangeEventHandler } from "react";
import { AlertCircle } from "react-feather";

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
  max,
  hasError,
  errorMessage,
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
  hasError: boolean,
  errorMessage: string,
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
          className={`
            text-black 
            appearance-none block w-full px-3 py-2 
            border
            ${hasError ? "border-red-500 border-2" : "border-gray-300"} 
            rounded-md shadow-sm 
            placeholder-gray-400 
            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 
            sm:text-sm`}
        />
        {hasError && <p className="text-red-600 flex gap-1 mt-1"><AlertCircle className="w-5 p-0" />{errorMessage}</p>}
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

export const CustomSwitch = ({
  classes,
  id,
  value,
  label,
  name,
  onChange,
}: {
  classes?: string;
  id: string;
  value: boolean;
  label: string;
  name: string;
  onChange: ChangeEventHandler;
}) => {
  return (
    <div className={`mt-2 ${classes}`}>
      <p className="block text-sm font-medium">
        {label}
      </p>
      <div className="mt-1">
        <label htmlFor={id} className="inline-flex relative items-center cursor-pointer">
        <input name={name} type="checkbox" id={id} className="sr-only peer" checked={value} onChange={onChange} />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
      </div>
    </div>
  )
}