import { ArrowLeft, Pencil, Truck, Mail, Phone } from "lucide-react";
import CategoryIcon from "@mui/icons-material/Category";
import { useProduct } from "../../hooks/useProducts";
import { formatDate } from "../../utils/formateDate";
import { STOCK_LEVEL } from "../../../config/appConfig";
import { useNavigate } from "react-router-dom";

function ViewProduct({ setViewProduct, productId }) {
  const navigate = useNavigate();

  // ====== fetch product by id ======
  const { data: product } = useProduct(productId);

  const status =
    product?.stock <= STOCK_LEVEL.stock_critical
      ? "critical"
      : product?.stock <= STOCK_LEVEL.stock_low
        ? "low"
        : "good";

  const statusStyle =
    status === "critical"
      ? "bg-[#FEE2E2] text-[#991B1B]"
      : status === "low"
        ? "bg-[#FEF3C7] text-[#92400E]"
        : "bg-[#D1FAE5] text-[#065F46]";

  const createdAT = formatDate(product?.createdAt);
  const updatedAt = formatDate(product?.updatedAt);
  return (
    <div className="w-screen max-w-150">
      {/* edit && update button */}
      <div className="flex items-center justify-between mb-3">
        <span
          onClick={setViewProduct}
          className="text-white hover:text-white/60 transition text-sm flex items-center gap-1 cursor-pointer"
        >
          <ArrowLeft size={17} /> Back
        </span>
        <button
          onClick={() => navigate(`edit-product/${product._id}`)}
          className="rounded bg-white hover:bg-white/80 dark:text-white  dark:bg-gray-400/30 dark:ring dark:ring-gray-300/50 dark:hover:bg-gray-300/10 transition-colors hover:shadow-md px-3 gap-2 py-1 flex items-center justify-between cursor-pointer text-sm"
        >
          <Pencil size={15} />
          Edit
        </button>
      </div>
      {/* ====== edit && update button ====== */}

      <div className="bg-(--color-bg-secondary) h-130 rounded-lg shadow  pt-3 overflow-y-auto">
        {/* product name   */}
        <div className="p-5 border-b border-gray-300/40">
          <h3 className="font-bold text-2xl dark:text-white">
            {product?.name}
          </h3>

          <span className={`px-1 py-0.5 text-xs rounded-lg ${statusStyle}`}>
            <span
              className={`rounded-full mr-1 h-1.5 w-1.5 inline-block ${
                status === "critical"
                  ? "bg-[#991B1B] "
                  : status === "low"
                    ? "bg-[#92400E] "
                    : "bg-[#065F46]"
              }`}
            ></span>
            {status} stock
          </span>
        </div>
        {/* ====== product name  ===== */}

        {/* product body */}
        <div className="px-5">
          {/* stock && price */}
          <div className="flex divide-x divide-gray-300/40">
            {/* stock */}
            <div className="w-[50%] py-3">
              <h5 className="text-sm text-(--color-text)">CURRENT STOCK</h5>
              <span className="text-2xl font-semibold dark:text-white">
                {product?.stock} Units
              </span>
            </div>

            {/* price */}
            <div className="w-[50%] pl-5 py-3">
              <h5 className="text-sm text-(--color-text)">UNIT PRICE</h5>
              <span className="text-2xl font-semibold dark:text-white">
                ${product?.stock}
              </span>
            </div>
          </div>
          {/* ===== stock && price ===== */}
          {/* ------------------------------------------------------------- */}
          {/* category */}
          <div className="py-3 border-b border-gray-300/40 flex items-center justify-between dark:text-white">
            <span className="text-sm flex items-center gap-1 text-(--color-text)">
              <CategoryIcon sx={{ fontSize: "18px" }} /> Category
            </span>
            <span>{product?.categoryId?.name}</span>
          </div>
          {/* ===== category ===== */}
          {/* ------------------------------------------------------------- */}

          {/* supplier info */}
          <div className="py-3 flex flex-col border-b border-gray-300/40 mb-3 gap-2">
            <span className="text-sm flex items-center gap-1 text-(--color-text)">
              <Truck sx={{ fontSize: "18px" }} /> Supplier information
            </span>
            <div className="p-3 space-y-3 bg-gray-950/4 dark:bg-(--color-bg-main)/70 rounded-lg text-(--color-text)">
              <div className="text-black dark:text-white text-lg">
                {product?.supplierId?.name}
              </div>
              <div className="text-sm flex items-center gap-2">
                <Mail size={16} />
                {product?.supplierId?.email}
              </div>
              <div className="text-sm flex items-center gap-2">
                <Phone size={16} />
                {product?.supplierId?.phone}
              </div>
            </div>
          </div>
          {/* ===== supplier info ===== */}

          {/* ------------------------------------------------------------- */}

          {/* description */}
          {product?.description && (
            <fieldset className="flex flex-col py-2 gap-2 border mb-3 border-gray-300 rounded-md px-4">
              <legend className="text-(--color-text)">Description</legend>
              <p className="dark:text-white">{product?.description}</p>
            </fieldset>
          )}
          {/* ===== description ====== */}

          <div className="py-3 flex items-center text-sm">
            <div className="w-[50%] flex flex-col gap-2">
              <span className="text-sm text-(--color-text)">Created At</span>
              <span className="text-black/70 dark:text-white/80">
                {createdAT}
              </span>
            </div>
            <div className="w-[50%] flex flex-col gap-2">
              <span className="text-sm text-(--color-text)">Updated At</span>
              <span className="text-black/70 dark:text-white/80">
                {updatedAt}
              </span>
            </div>
          </div>
        </div>
        {/* ====== product body ====== */}
      </div>
    </div>
  );
}

export default ViewProduct;
