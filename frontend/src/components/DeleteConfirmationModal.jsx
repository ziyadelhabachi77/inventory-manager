import { TriangleAlert } from "lucide-react";

function DeleteConfirmationModal({ children,setCloseModal, itemName,deleteAction }) {
  return (
    <div className="rounded-md px-5 py-3 min-h-40 w-150 bg-(--color-bg-secondary) ">
      <div className="flex items-center gap-4">
        <span className="p-2 rounded-full text-red-500 bg-[#FEE2E2]  flex items-center justify-between">
          <TriangleAlert />
        </span>
        <h3 className="text-xl font-bold dark:text-white">Delete {children}?</h3>
      </div>
      <p className="mt-3 text-(--color-text)">
        Are you sure you want to delete the {children.toLowerCase()}{" "}
        {itemName ? (
          <span className="text-black font-semibold dark:text-white">
            "{itemName}"
          </span>
        ) : null}
        ? This
        action cannot be undone and will remove all associated data from your
        inventory.
      </p>
      <div className="text-end space-x-3 mt-7">
            <button onClick={setCloseModal} className="px-2 py-2 cursor-pointer rounded-lg text-(--color-text) transition-colors dark:text-white hover:bg-gray-300/20 ring ring-gray-400">Cancel</button>
            <button onClick={deleteAction} className="px-3 py-2 bg-red-500 hover:bg-red-600 transition-colors text-white cursor-pointer rounded-lg">Delete {children}</button>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
