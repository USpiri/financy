import app from "./src";
import { PORT } from "./src/config/constants";

app.listen(PORT, () => {
  console.log(`Financy app listening on port ${PORT}`);
});
