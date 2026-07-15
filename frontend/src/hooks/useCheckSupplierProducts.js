import useProducts from "./useProducts";
import useSuppliers from "./useSuppliers";

function useCheckSupplierProducts(id,limit=undefined) {
  const { products } = useProducts();
  const { suppliers } = useSuppliers();

  // get supplier by id
  const supplier = suppliers?.find((s) => s._id == id);
  // get all product of this supplier
  const suppliedProducts = products?.data?.filter((p) => p.supplierId === id);

  // get the total of product supplied of this supplier
  const totalProductSupplied = suppliedProducts?.length;

  // the product limit length to display in the page
  const productLimit = suppliedProducts?.splice(0, limit);

  return {supplier, totalProductSupplied, productLimit}
}

export default useCheckSupplierProducts;
