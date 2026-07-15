import { Search, ListFilter,Plus } from "lucide-react";
import { MainButton } from "../index";
import SelectInput from "../ui/Select";
import useCategories from "../../hooks/useCategories";

function ProductsFilter({ setState, state, setOpenCreateForm, handleFilterChange }) {
  const {categories,isLoading} = useCategories()
  return (
    <div className="flex max-lg:flex-col-reverse  lg:gap-8 max-lg:gap-2 flex-wrap items-center p-2 rounded bg-(--color-bg-secondary) lg:justify-between">
      {/* searchbar + category selection */}
      <div className="flex w-full max-xs:flex-wrap lg:flex-1 max-lg:justify-between gap-3 divide-x dark:divide-gray-100/70 divide-black ">
        <div className="w-full xs:w-[70%] relative pr-3">
          <input
            type="text"
            value={state?.input}
            name="input"
            onChange={setState}
            className="p-1 pl-8 bg-gray-300/20 focus:ring-2 focus:ring-blue-700/70 dark:bg-gray-300/10 dark:text-white w-full focus:outline-none ring ring-gray-400/70 border-none rounded-md"
            placeholder="Search products..."
          />
          <Search
            size={20}
            className="absolute top-1/2 left-2 -translate-y-1/2 text-gray-500"
          />
        </div>
        {/* select category */}
        <div className="w-40 text-end relative">
          <SelectInput isLoading={isLoading} className={"bg-gray-100 dark:bg-gray-700/50"} placeholder={"All categories"} options={categories || []} state={state} setState={handleFilterChange}/>
          <ListFilter
            size={15}
            className="absolute text-black dark:text-white top-1/2 -translate-y-1/2 left-2"
          />
        </div>
        {/* == select cateogory ==*/}
      </div>
      {/* new product button */}
      <MainButton Icon={Plus} onClick={setOpenCreateForm} className="w-full px-8 max-lg:self-end xs:w-auto">
        Add Product
      </MainButton>
    </div>
  );
}

export default ProductsFilter;
