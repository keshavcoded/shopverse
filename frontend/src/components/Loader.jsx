const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="relative">
        <div className="w-10 h-10 border-gray-300 border-2 rounded-full" />
        <div className="w-10 h-10 border-blue-500 border-t-2 animate-spin rounded-full absolute left-0 top-0" />
        <div className="sr-only">Loading</div>
      </div>
    </div>
  );
};

export default Loader;
