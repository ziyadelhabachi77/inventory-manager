import { Plus, Search, SearchX } from "lucide-react";
import { useEffect, useState } from "react";
import {
  CreateSupplierModal,
  DataNotfound,
  DeleteConfirmModal,
  MainButton,
  ModalFormContainer,
} from "../components";
import SupplierTable from "../components/suppliers/SupplierTable";
import useSuppliers from "../hooks/useSuppliers";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function SuppliersPage() {
  const navigate = useNavigate();
  // =======  fetch supplier =========
  const { suppliers, isFetching, deleteSupplierMutation } = useSuppliers();

  // =======   local state ===========
  const [status, setStatus] = useState("");
  const [isSupplierModalActive, setIsSupplierModalActive] = useState(false);
  const [searchSupplierInput, setSearchSupplierInpout] = useState("");
  const [debouncedSearchValue, setDebouceSearchValue] = useState(searchSupplierInput);
  const [deleteSupplierModal, setDeleteSupplierModal] = useState({show: false, id: null});


  // ======= events handlers ==========

  // close the supplier model popup
  const cancelCreateSupplierModal = () => {
    setIsSupplierModalActive(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouceSearchValue(searchSupplierInput);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchSupplierInput]);

  const filteredSuppliers = suppliers?.filter((s) => {
    // Status filter if status selected
    if (status && s?.status.toLowerCase() !== status.toLowerCase()) return false;

    // Search filter if search exists
    if (debouncedSearchValue?.trim()) {
      return (
        s?.email?.toLowerCase().includes(debouncedSearchValue.toLowerCase()) ||
        s?.name?.toLowerCase().includes(debouncedSearchValue.toLowerCase()) ||
        s?.supplierName
          ?.toLowerCase()
          .includes(debouncedSearchValue.toLowerCase())
      );
    }

    return true;
  });

  // handle delete supplier
  const handleDeleteSupplier = () => {
    deleteSupplierMutation(deleteSupplierModal.id);
    toast.success("Supplier has been removed",{position: "top-right"});
    setDeleteSupplierModal({show:false, id:null})
  }
  
  return (
    <div>
      {isSupplierModalActive && (
        <ModalFormContainer>
          <CreateSupplierModal
            setIsSupplierModalActive={cancelCreateSupplierModal}
          />
        </ModalFormContainer>
      )}

      {deleteSupplierModal.show && (
        <ModalFormContainer>
          <DeleteConfirmModal confirmDeleteSupplier={handleDeleteSupplier} closeDeleteModal={() => setDeleteSupplierModal({show:false,id: null})} id={deleteSupplierModal.id}/>
        </ModalFormContainer>
      )}

      {/* /* supplier header */}
      <section className="space-y-1 mb-6">
        <h2 className="text-2xl font-semibold text-black dark:text-white">
          Supplier Directory
        </h2>
        <p className="text-(--color-text) text-sm capitalize">
          Manage and track your vendor information efficiently.
        </p>
      </section>
      {/* == supplier header ==  */}

      {/* main button to create a supplier */}
      <div className="text-end mb-4">
        <MainButton
          onClick={() => setIsSupplierModalActive(true)}
          Icon={Plus}
          className={"px-7"}
        >
          Add Supplier
        </MainButton>
      </div>
      {/* ==== main button to create a supplier ==== */}

      {/* filter && searach supplier */}
      <div className="flex mb-5 items-center justify-between flex-col lg:flex-row gap-3 bg-(--color-bg-secondary) py-3 rounded px-1">
        <div className="relative w-full lg:w-[70%]">
          <input
            type="text"
            value={searchSupplierInput}
            name="input"
            onChange={(e) => setSearchSupplierInpout(e.target.value)}
            className="p-1 pl-8 bg-gray-300/20 focus:ring-2 focus:ring-blue-700/70 dark:bg-gray-300/10 dark:text-white w-full focus:outline-none ring ring-gray-400/70 border-none rounded-md"
            placeholder="Search by supplier name, email or contact..."
          />
          <Search
            size={20}
            className="absolute top-1/2 left-2 -translate-y-1/2 text-gray-500"
          />
        </div>

        <div className="flex items-center max-sm:flex-wrap gap-2">
          {["", "Active", "Pending", "Inactive"].map((s, i) => (
            <button
              key={i}
              onClick={() => setStatus(s)}
              className={`rounded-md cursor-pointer py-1 px-3 ring ring-gray-300/50 ${s === status ? "bg-[#EBF2FE] text-[#3C83F6]" : "text-(--color-text)"}`}
            >
              {s === "" ? "All" : s}
            </button>
          ))}
        </div>
      </div>
      {/* ==== filter && searach supplier ==== */}

      {/* suppliers table info */}

      {filteredSuppliers?.length === 0 ? (
        <DataNotfound Icon={SearchX}>
          We couldn’t find any suppliers matching your search.
        </DataNotfound>
      ) : (
        <div
          className={`${isFetching ? "opacity-0" : "opacity-100"} transition-opacity duration-200 rounded-lg overflow-x-auto bg-(--color-bg-secondary) ring shadow min-h-100 flex flex-col justify-between shadow-black/30 dark:shadow-white/20 ring-white/10`}
        >
          <SupplierTable setDeleteModal={(id) => setDeleteSupplierModal({show: true, id})} suppliers={filteredSuppliers} navigate={navigate}/>
        </div>
      )}
      {/* ===== suppliers table info ==== */}
    </div>
  );
}

export default SuppliersPage;
