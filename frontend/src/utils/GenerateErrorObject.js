export function GenerateErrorObject(formState) {
  let obj = {};
  for (let [key, value] of Object.entries(formState)) {
    if (key !== "description" && (value === "" || +value === 0)) {
      if (key === "supplierId") {
        obj[key] = "supplier is required";
      } else if (key === "categoryId") {
        obj[key] = "category is required";
      } else if (key === "stock") {
        obj[key] = "stock must be greater than 0";
      } else if (key === "price" ){
        obj[key] = "price must be greater than 0";
      } else {
        obj[key] = `${key} is required`;
      }
    }
  }
  return obj;
}
