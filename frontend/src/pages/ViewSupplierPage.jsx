import { ArrowLeft, Factory, Mail, MoveDown, Phone, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useCheckSupplierProducts from "../hooks/useCheckSupplierProducts";

function ViewSupplierPage() {
  // ============= local state ===============
  const [limit, setLimit] = useState(4);

  const { id } = useParams();
  const navigate = useNavigate();
  const {supplier, totalProductSupplied, productLimit} = useCheckSupplierProducts(id,limit)


  // handle show more product supplied
  const showMoreProductSupplied = () => {
      if(totalProductSupplied - productLimit?.length >= 4) {
        setLimit((prev) => prev + 4);
      }
      setLimit(limit + (totalProductSupplied - productLimit?.length))
  }

  return (
    <div>
      <Link
        onClick={() => navigate(-1)}
        className="text-(--color-text) w-max
       text-sm flex items-center group gap-1 dark:text-white font-bold"
      >
        <ArrowLeft size={19} className="group-hover:-translate-x-1 transition-transform"/> Back to Supppliers
      </Link>

      {/* grid container (supplier info) */}
      <div className="mt-8 xs:h-55 mb-7 gap-4 sm:grid-row-3 lg:grid-rows-2 max-xs:grid-rows-10 max-xs:grid-cols-1 xs:gap-x-5 xs:gap-y-3 grid grid-cols-3">
        <div className="bg-(--color-bg-secondary) shadow gap-3 py-2 text-center flex xs:row-span-3 lg:row-span-2 justify-center flex-col rounded-md  max-xs:row-span-4 col-span-1">
          {/* icon */}
          <div className="flex items-center justify-center">
            <span className="sm:p-3 p-1 flex items-center bg-[#EBF2FE] dark:bg-[#3B82F6] rounded-md justify-center">
              <Factory
                className="xs:h-10 xs:w-10 h-7 w-7 text-[#3C83F6] dark:text-white"
                strokeWidth={1.5}
              />
            </span>
          </div>
          {/*  supplier name */}
          <p className="sm:text-2xl max-md:text-xl text-md font-semibold dark:text-white">
            {supplier?.name}.
          </p>
          <p className="uppercase mt-2 font-semibold text-xs text-(--color-text)">
            primary suppliers
          </p>
        </div>
        {/* name */}
        <div className="bg-(--color-bg-secondary) shadow sm:row-span-1 lg:row-span-1 xs:col-span-2 xs:col-start-2 lg:col-span-1 lg:col-start-2 flex items-center max-xs:row-span-2 rounded-md">
          <div className="flex items-center gap-3 ps-5">
            <span className="p-1.5 flex items-center bg-[#EBF2FE] dark:bg-[#3B82F6] rounded-md justify-center">
              <User
                size={25}
                className="text-[#3C83F6] dark:text-white"
                strokeWidth={1.5}
              />
            </span>
            <div>
              <p className="text-(--color-text) text-sm">CONTACT PERSON</p>
              <p className="font-semibold text-lg dark:text-white">
                {supplier?.supplierName}
              </p>
            </div>
          </div>
        </div>
        {/* email */}
        <div className="bg-(--color-bg-secondary) shadow sm:row-span-1 lg:row-span-1  flex xs:col-span-2 xs:col-start-2 lg:col-span-1 lg:col-start-3 items-center max-xs:row-span-2 rounded-md">
          <div className="flex items-center gap-3 ps-5">
            <span className="p-1.5 flex items-center bg-[#EBF2FE] dark:bg-[#3B82F6] rounded-md justify-center">
              <Mail
                size={25}
                className="text-[#3C83F6] dark:text-white"
                strokeWidth={1.5}
              />
            </span>
            <div>
              <p className="text-(--color-text) text-sm">EMAIL ADDRESS</p>
              <p className="font-semibold text-lg dark:text-white">
                {supplier?.email}
              </p>
            </div>
          </div>
        </div>
        {/* phone */}
        <div className="bg-(--color-bg-secondary) shadow sm:row-span-1 lg:row-span-1 flex lg:col-span-2 lg:col-start-2 items-center xs:col-span-2 xs:col-start-2 max-xs:row-span-2 rounded-md">
          <div className="flex items-center gap-3 ps-5">
            <span className="p-1.5 flex items-center bg-[#EBF2FE] dark:bg-[#3B82F6] rounded-md justify-center">
              <Phone
                size={25}
                className="text-[#3C83F6] dark:text-white"
                strokeWidth={1.5}
              />
            </span>
            <div>
              <p className="text-(--color-text) text-sm">PHONE NUMBER</p>
              <p className="font-semibold text-lg dark:text-white">
                {supplier?.phone}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* ==== grid container (supplier info) ===== */}

      {/* supplied products */}
      <div className="rounded-md relative overflow-x-auto shadow bg-(--color-bg-secondary)">
        <div className="flex items-center p-4 bg-(--color-bg-secondary) gap-3">
          <h4 className="text-md dark:text-white font-semibold">
            Supplied Products
          </h4>
          <span className="text-xs rounded-2xl text-(--color-text) py-0.5 px-1 bg-gray-300 dark:bg-gray-700">
            {totalProductSupplied} Totals
          </span>
        </div>
        {/* table products supplied*/}
        <table className="min-w-full text-left border-collapse mb-6">
          <thead className="bg-(--color-bg-main)">
            <tr>
              <th className="text-[13px] text-(--color-text) pl-4 py-3">
                PRODUCT NAME
              </th>
              <th className="text-[13px] text-(--color-text) pl-4 py-3">
                CATEGORY
              </th>
              <th className="text-[13px] text-(--color-text) pl-4 py-3">
                STOCK
              </th>
              <th className="text-[13px] text-(--color-text) pl-4 py-3">
                PRICE
              </th>
            </tr>
          </thead>
          <tbody className="bg-(--color-bg-secondary) divide-y divide-gray-200/60">
            {productLimit?.map((p) => (
              <tr key={p?._id}>
                <td className="pl-4 py-3 font-semibold dark:text-white">{p?.name}</td>
                <td className="pl-4 py-3 text-(--color-text)">
                  {p?.categoryId?.name}
                </td>
                <td className="pl-4 py-3 dark:text-white">{p?.stock}</td>
                <td className="pl-4 py-3 font-semibold dark:text-white">${p?.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* ==== table products supplied ====*/}
        {totalProductSupplied !== productLimit?.length && (
          <span onClick={showMoreProductSupplied} className="text-[15px] text-blue-500 cursor-pointer flex items-center gap-1 absolute bottom-0 left-[40%]">
            <MoveDown size={18} /> show more
          </span>
        )}
      </div>

      {/* ==== suppliers's products ==== */}
    </div>
  );
}

export default ViewSupplierPage;
