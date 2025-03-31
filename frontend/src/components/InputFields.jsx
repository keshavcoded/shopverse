export const InputField = ({ id, type, placeholder, value, onChange }) => {
  return (
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        required
        value={value}
        onChange={onChange}
        className="block w-full px-3 py-2 pl-10 border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
      />
  );
};
