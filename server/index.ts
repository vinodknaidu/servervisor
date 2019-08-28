import cookieSession from "cookie-session";
import express from "express";

const { PORT } = require("./appConfig.json")
import Auth from "./src/Auth";
import DB from "./src/DB";

const app = express();

// Establish mongodb connection.
DB.getConnection();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieSession({
  name: "session",
  secret: "secret-session-key"
}));

const auth: Auth = new Auth();
app.post("/login", auth.login);
app.use(auth.authorize);

app.listen(PORT || 4000, () => {
  console.log(`Server runnong on port ${PORT || 4000}`);
});
