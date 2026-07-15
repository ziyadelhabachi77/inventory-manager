const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDb = require("./config/dbConnection");
const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5050;

async function startServer() {
  await connectDb();
  app.use("/api/suppliers", require("./routes/supplierRoutes"));
  app.use("/api/category", require("./routes/categoryRoutes"));
  app.use("/api/products", require("./routes/productRoutes"));
  app.use("/api/orders", require("./routes/orderRoutes"));
  app.listen(port, "0.0.0.0", () => {
    console.log(`server start en port ${port}`);
  });
}
startServer();

app.use(require("./middleware/errorHandler"));
