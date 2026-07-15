import { Search, Plus } from "lucide-react";
import { MainButton } from "../index";

function OrdersFilter({ setState, state, handleStatusChange, navigate }) {
  const status = ["All", "Pending", "Completed", "Canceled"];

  const { statusState } = state;

  return (
    <div className="flex flex-col-reverse gap-3">
      {/* searchbar + status */}
      <div className="flex items-center justify-between flex-col lg:flex-row gap-3 bg-(--color-bg-secondary) py-3 rounded px-1">
        <div className="relative w-full lg:w-[70%]">
          <input
            type="text"
            value={state?.input}
            name="input"
            onChange={setState}
            className="p-1 pl-8 bg-gray-300/20 focus:ring-2 focus:ring-blue-700/70 dark:bg-gray-300/10 dark:text-white w-full focus:outline-none ring ring-gray-400/70 border-none rounded-md"
            placeholder="Search order by customer name or product name..."
          />
          <Search
            size={20}
            className="absolute top-1/2 left-2 -translate-y-1/2 text-gray-500"
          />
        </div>
        {/* select status */}

        <div className="flex items-center max-sm:flex-wrap gap-2">
          {status.map((s, i) => (
            <button
              key={i}
              onClick={() => handleStatusChange(s.toLowerCase())}
              className={`rounded-md cursor-pointer py-1 px-3 ring ring-gray-300/50 ${s.toLowerCase() === (statusState || "all") ? "bg-[#EBF2FE] text-[#3C83F6]" : "text-(--color-text)"}`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* == select status ==*/}
      </div>
      {/* new product button */}
      <MainButton
        Icon={Plus}
        onClick={() => navigate("create-order")}
        className="w-40 ms-auto"
      >
        Add Order
      </MainButton>
    </div>
  );
}

export default OrdersFilter;
