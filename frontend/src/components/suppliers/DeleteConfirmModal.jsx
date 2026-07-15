import { CircleAlert, Trash } from "lucide-react";
import useCheckSupplierProducts from "../../hooks/useCheckSupplierProducts";
import { useNavigate } from "react-router-dom";

function DeleteConfirmModal({ id, closeDeleteModal, confirmDeleteSupplier }) {
  const navigate = useNavigate();
  const { totalProductSupplied, supplier } = useCheckSupplierProducts(id);

  return totalProductSupplied > 0 ? (
    <div className="bg-white w-full space-y-3 text-center max-w-100 p-5 rounded-md shadow">
      <div>
        <span className="p-3 inline-block mx-auto bg-red-200 rounded-full ">
          <CircleAlert className="fill-red-500 text-red-950" />
        </span>
      </div>
      <span className="font-semibold text-2xl inline-block">
        Cannot Delete Supplier
      </span>

      <div className="p-2 bg-[#F2F3FD] text-center">
        <p className="text-gray-600">
          This supplier cannot be deleted because they currently providing{" "}
          <span className="text-black font-semibold">
            {totalProductSupplied} products.
          </span>{" "}
          Please ressign or delete these products before removing the supplier.
        </p>
      </div>

      <button
        onClick={closeDeleteModal}
        className="w-full py-2  bg-blue-700 mt-5 hover:bg-blue-800 transition-colors text-white rounded-md cursor-pointer"
      >
        Ok
      </button>
      <button onClick={() => navigate(supplier._id)} className="text-gray-500 cursor-pointer hover:underline">
        View Products
      </button>
    </div>
  ) : (
    <div className="bg-white w-full  text-center max-w-100 p-5 rounded-md shadow">
      <div>
        <span className="p-3 inline-block mx-auto bg-red-200 rounded-full ">
          <Trash className="text-red-500 " />
        </span>
      </div>
      <span className="font-semibold text-2xl inline-block">
        Delete Supplier?
      </span>

       <div className="p-2 text-center">
        <p className="text-gray-600">
          Are you sure you want to delete{" "}
          <span className="text-black font-semibold">
            "{supplier?.name}"?
          </span>{" "}
        </p>
      </div>

      <button onClick={confirmDeleteSupplier} className="py-2 w-full rounded-lg bg-red-500 hover:bg-red-600 transition-colors cursor-pointer text-white">Delete Supplier</button>
      <button onClick={closeDeleteModal} className="w-full py-2 rounded-lg cursor-pointer bg-gray-300 hover:bg-gray-400  transition-colors mt-2">Cancel</button>
    </div>
  );
}

export default DeleteConfirmModal;
