import { Save, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useSuppliers from "../../hooks/useSuppliers";
import { getBlueColor, getRandomColorPair } from "../../utils/colors";
import CancelButton from "../ui/CancelButton";
import Input from "../ui/Input";
import MainButton from "../ui/MainButton";

function CreateSupplierModal({ setIsSupplierModalActive }) {
  // get the blue background and the text colorj
  const { bg, text } = getBlueColor();

  // ========= get the supplier hook ============
  const { addSupplier } = useSuppliers();

  // ========== local states =============
  const [supplierInfo, setSupplierInfo] = useState({
    name: "",
    email: "",
    supplierName: "",
    phone: "",
    notes: "",
    status: "active",
  });

  // remove the scrollbar.
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // submit new supplier
  const handleSubmitNewSupplier = (e) => {
    e.preventDefault();
    let submit = true;

    for (let [key, value] of Object.entries(supplierInfo)) {
      if (value === "" && key !== "notes") {
        submit = false;
      }
    }
    if (!submit) {
      return toast("Missing information in some fields", {
        position: "top-right",
      });
    }

    const { bg: bgColor, text: textColor } = getRandomColorPair(); // create a random color for the badge
    // create the supplier
    const newSupplier = {
      ...supplierInfo,
      supplierBadgeColor: `${bgColor} ${textColor}`,
    };
    // save the supplier
    addSupplier(newSupplier, {
      onSuccess: () => {
        toast.success("Supplier created",{position: "top-right"});
        console.log(newSupplier)
        setIsSupplierModalActive();
      },
      onError: (err) => {
        const errMessage = err.response?.data?.validationError["email"] ?? "Error happened";
        return toast.error(errMessage, { position: "top-right" });
      },
    });
  };

  return (
    <div className="rounded overflow-y-auto shadow-md w-screen max-w-150 bg-(--color-bg-main)">
      {/* header */}
      <div className="p-7 border-b border-gray-300">
        <div className="flex items-center gap-2">
          <span className={`${bg} ${text} p-2 rounded`}>
            <UserPlus />
          </span>
          <h2 className="capitalize font-semibold dark:text-white text-2xl">
            add new supplier
          </h2>
        </div>
        <p className="text-(--color-text)">
          Register a new vendor to manage your supply chain and orders.
        </p>
      </div>
      {/* ==== header ===== */}

      {/* //////////////////////////////////////////////////// */}

      {/* body */}

      <div className="p-7">
        <form onSubmit={handleSubmitNewSupplier}>
          <label>
            <span className="text-(--color-text)">Supplier Name</span>
            <Input
              value={supplierInfo.name}
              onChange={(e) =>
                setSupplierInfo({
                  ...supplierInfo,
                  name: e.target.value,
                })
              }
              className={"mt-3 bg-gray-300/10"}
              placeholder={"e.g. Global Logistics Co."}
              type={"text"}
            />
          </label>

          <div className="flex mt-4 items-center gap-5">
            <label className=" block">
              <span className="text-(--color-text)">Contact Person</span>
              <Input
                value={supplierInfo.supplierName}
                onChange={(e) =>
                  setSupplierInfo({
                    ...supplierInfo,
                    supplierName: e.target.value,
                  })
                }
                className={"mt-3 bg-gray-300/10"}
                placeholder={"Full name of representative"}
                type={"text"}
              />
            </label>
            <label>
              <span className="inline-block text-(--color-text)">Status</span>
              <select
                value={supplierInfo.status || "active"}
                onChange={(e) =>
                  setSupplierInfo({ ...supplierInfo, status: e.target.value })
                }
                className="w-full focus:outline-none mt-3 shadow py-1.5 dark:text-white rounded focus:ring focus:ring-blue-400 bg-gray-300/10 focus:border-none border border-gray-500"
              >
                {["active", "inactive", "pending"].map((status) => (
                  <option key={status} value={status} className="capitalize">
                    {status}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-4 flex max-sm:flex-col sm:items-center max-sm:gap-3 sm:gap-7">
            <label>
              <span className="text-(--color-text)">Email Address</span>
              <Input
                value={supplierInfo.email}
                onChange={(e) =>
                  setSupplierInfo({ ...supplierInfo, email: e.target.value })
                }
                className={"mt-3 bg-gray-300/10"}
                placeholder={"vendor@example.com"}
                type={"text"}
              />
            </label>
            <label>
              <span className="text-(--color-text)">Phone Number</span>
              <Input
                value={supplierInfo.phone}
                onChange={(e) =>
                  setSupplierInfo({
                    ...supplierInfo,
                    phone:
                      e.target.value !== ""
                        ? e.target.valueAsNumber
                        : e.target.value,
                  })
                }
                className={"mt-3 bg-gray-300/10"}
                placeholder={"+212 612345678"}
                type={"number"}
              />
            </label>
          </div>

          <div className="mt-4">
            <label htmlFor="Notes" className="text-(--color-text)">
              Notes
            </label>
            <textarea
              value={supplierInfo.notes}
              onChange={(e) =>
                setSupplierInfo({ ...supplierInfo, notes: e.target.value })
              }
              placeholder="Additional details, delivery terms, or internal notes..."
              id="Notes"
              className="resize-non placeholder:text-gray-300 mt-3 bg-gray-300/10 dark:text-white ring focus:outline-none rounded p-2 focus:border-none ring-gray-300 w-full"
              rows={5}
            ></textarea>
          </div>

          <div className="flex items-center justify-end gap-3 mt-5">
            <CancelButton onClick={setIsSupplierModalActive} className={"px-3"}>
              cancel
            </CancelButton>
            <MainButton Icon={Save} className={"px-15 capitalize"}>
              save supplier
            </MainButton>
          </div>
        </form>
      </div>

      {/* ====== body ====== */}
    </div>
  );
}

export default CreateSupplierModal;
