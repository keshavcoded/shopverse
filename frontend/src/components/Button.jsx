import { Loader } from "lucide-react";

export const Button = ({ isLoading, text, loadingText }) => {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="w-full flex justify-center py-2 px-4 cursor-pointer border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-800 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
    >
      {isLoading ? (
        <>
          <Loader className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
          {loadingText}
        </>
      ) : (
        <>{text}</>
      )}
    </button>
  );
};
