import cookieSession from "cookie-session";
import express from "express";

import { INTERVAL_IN_MIN, PORT } from "./appConfig.json";
import pollResult from "./routes/pollResult";
import url from "./routes/url";
import Auth from "./src/Auth";
import DB from "./src/DB";
import Poller from "./src/Poller";

const app = express();

// Establish mongodb connection.
DB.getConnection();
// Start polling.
// setInterval(new Poller().pollAndSaveResults, INTERVAL_IN_MIN * 1000);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieSession({
  name: "session",
  secret: "secret-session-key"
}));

const auth: Auth = new Auth();
app.post("/login", auth.login);
app.use(auth.authorize);

app.use("/urls", url);
app.use("/pollResults", pollResult);

app.listen(PORT || 4000, () => {
  console.log(`Server runnong on port ${PORT || 4000}`);
});
