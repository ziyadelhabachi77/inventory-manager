import { Eye, Trash, EllipsisVertical } from "lucide-react";
import SupplierNameItem from "./SupplierNameItem";
import SupplierStatus from "./SupplierStatus";

function SupplierTable({ suppliers, navigate, setDeleteModal }) {
  return (
    <table className="min-w-full rounded-t-lg border-collapse text-left">
      <thead className="bg-(--color-bg-main) dark:bg-(--color-bg-secondary) ">
        <tr>
          <th className="p-3 text-sm text-(--color-text)">SUPPLIER NAME</th>
          <th className="p-3 text-sm text-(--color-text)">CONTACT PERSON</th>
          <th className="p-3 text-sm text-(--color-text)">EMAIL ADDRESS</th>
          <th className="p-3 text-sm text-(--color-text)">PHONE</th>
          <th className="p-3 text-sm text-(--color-text)">STATUS</th>
          <th className="p-3 text-sm text-(--color-text)">ACTION</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-500/20">
        {suppliers?.map((item) => (
          <tr key={item._id}>
            <td className="py-3 text-sm dark:text-white/90 px-3">
              <SupplierNameItem supplierName={item?.supplierName} supplierBadgeColor={item?.supplierBadgeColor}/>
            </td>
            <td className="py-3 font-semibold text-sm dark:text-white/90 px-3">
              {item.name}
            </td>
            <td className="py-3 text-sm  text-blue-400 px-3">
              {item.email}
            </td>
            <td className="py-3 text-sm dark:text-white/90 px-3">
                {item.phone}
            </td>
            <td className="py-3 text-sm dark:text-white/90 px-3">
                <SupplierStatus status={item.status}/>
            </td>
            <td className="py-3 text-sm dark:text-white/90 px-3">
              <div className="flex w-fit relative group justify-center">
                <EllipsisVertical size={17} className="cursor-pointer" />

                <div className="rounded-md group-hover:flex w-20 bg-white hidden flex-col shadow absolute right-3 z-10 top-0 py-2 px-1">
                  <button onClick={() => navigate(`${item._id}`)} className="py-1 cursor-pointer hover:bg-gray-200/40 text-gray-500 transition-colors hover:text-orange-300 flex items-center justify-center gap-2">
                    <Eye size={14} />
                    View
                  </button>
                  <button onClick={() => setDeleteModal(item._id)} className="py-1 cursor-pointer hover:bg-gray-200/40 text-gray-500 transition-colors hover:text-red-500 flex items-center justify-center gap-2">
                    <Trash size={14} />
                    Delete
                  </button>
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default SupplierTable;
