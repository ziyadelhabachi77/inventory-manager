import {Eye,Edit, Trash} from "lucide-react"
import ProductsStatus from "./ProductsStatus";

function ProductsTable({products,navigate, setViewProduct,setDeleteProduct}) {
  return (
    <table className="min-w-full  rounded-t-lg border-collapse text-left">
      <thead className="bg-(--color-bg-main) dark:bg-(--color-bg-secondary) ">
        <tr>
          <th className="p-3 text-sm text-(--color-text)">PRODUCT NAME</th>
          <th className="p-3 text-sm text-(--color-text)">CATEGORY</th>
          <th className="p-3 text-sm text-(--color-text)">STOCK LEVEL</th>
          <th className="p-3 text-sm text-(--color-text)">PRICE</th>
          <th className="p-3 text-sm text-(--color-text)">ACTION</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-500/20">
      {products?.map(item => (
        <tr key={item._id}>
          <td className="py-3 text-sm dark:text-white/90 px-3">{item.name}</td>
          <td className="py-3 text-sm dark:text-white/90 px-3">{item?.categoryId?.name}</td>
          <td className="py-3 text-sm dark:text-white/90 px-3">
            <ProductsStatus stock={item.stock}/>
          </td>
          <td className="py-3 text-sm dark:text-white/90 px-3">$ {item.price}</td>
          <td>
            <span className="flex items-center justify-evenly gap-2">
                <Eye onClick={() => setViewProduct(item._id)} className="text-gray-500 cursor-pointer dark:text-white" size={20}/>
                <Edit onClick={() => navigate(`edit-product/${item._id}`)} className="text-yellow-300 cursor-pointer" size={20}/>
                <Trash onClick={() => setDeleteProduct(item._id,item.name)} className="text-red-600 cursor-pointer" size={20}/>
            </span>
          </td>
        </tr> 

      ))}
       
      </tbody>
    </table>
  );
}

export default ProductsTable;
