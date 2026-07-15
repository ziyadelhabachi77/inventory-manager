

function MainButton({ children, className, onClick, Icon, disabled = false }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`py-2 text-sm rounded-md bg-[#3C83F6] hover:bg-blue-700 dark:hover:bg-blue-500/80 active:scale-95 transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 text-white text-center ${className}`}
    >
      <span className="flex items-center justify-center gap-1">
        {Icon && <Icon size={18} />}
        {children}
      </span>
    </button>
  );
}

export default MainButton;
