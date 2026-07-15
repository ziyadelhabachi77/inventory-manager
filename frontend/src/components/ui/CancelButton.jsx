function CancelButton({ children, className, onClick }) {
  return (
    <button
    onClick={onClick}
    type="button"
      className={`py-1.5 cursor-pointer rounded-md dark:ring dark:ring-gray-300/20 bg-white not-dark:ring  not-dark:ring-gray-300 dark:bg-(--color-bg-main) bg-(color-bg-secondary) hover:bg-gray-500/20 transition-colors  focus:outline-none border-none text-black  dark:text-white ${className}`}
    >
      {children}
    </button>
  );
}

export default CancelButton;
