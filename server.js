import app from "./app.js";
import { port } from "./config.js";

const PORT = port || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});