import app from "./app";
import "./database";

app.listen(app.get("port"), () => {
  console.log(`Server on PORT ${app.get("port")}`);
});
