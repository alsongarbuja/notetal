export const CustomInput = ({
  label,
  type = "text",
  isRequired = false,
}: {
  label: string;
  type?: string;
  isRequired?: boolean;
}) => {
  return (
    <div className="mt-2">
      <label htmlFor="test" className="block text-sm font-medium ">
        {label}
      </label>
      <div className="mt-1">
        <input
          // id="test"
          // name="email"
          type={type}
        //   autoComplete="email"
          required={isRequired}
          className="text-black appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
    </div>
  );
};
