import React, { ChangeEventHandler } from "react";

export const CustomInput = ({
  label,
  type = "text",
  isRequired = false,
  name,
  placeholder,
  id,
  onChange
}: {
  label: string;
  type?: string;
  isRequired?: boolean;
  id?: string;
  name: string,
  placeholder?: string,
  onChange: ChangeEventHandler,
}) => {
  return (
    <div className="mt-2">
      <label htmlFor={id} className="block text-sm font-medium ">
        {label}
      </label>
      <div className="mt-1">
        <input
          id={id}
          name={name}
          type={type}
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
