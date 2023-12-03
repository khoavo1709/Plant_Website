const AddToCardFailureToast = ({ message }: { message: string }) => {
  return (
    <div className="flex items-center justify-center h-12 w-full max-w-max space-x-4 bg-white rounded-lg shadow-lg outline outline-red-900/10 outline-1">
      <p className="text-sm font-normal mx-4 text-red-900/80">{message}</p>
    </div>
  );
};

export default AddToCardFailureToast;
