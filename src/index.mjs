import express from "express";
import path from "path";
import methodOverride from "method-override";
import { fileURLToPath } from "url";
import { validationResult, matchedData, checkSchema } from "express-validator";
import { postValidationSchema } from "./utils/validationSchemas.mjs";

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

let sampleDb = [
  { id: 1, userName: "Eric", displayName: "Ericman" },
  { id: 2, userName: "Jesh", displayName: "Mesh" },
  { id: 3, userName: "KC", displayName: "Kfc" },
  { id: 4, userName: "Ant", displayName: "Antman" },
  { id: 5, userName: "Zirk", displayName: "Zirkus" },
];

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/users", (req, res) => {
  res.send(sampleDb);
});

app.post("/", checkSchema(postValidationSchema), (req, res) => {
  console.log(validationResult(req));
  const result = matchedData(req);
  const { userName, displayName } = result;
  let id = sampleDb[sampleDb.length - 1].id + 1;
  if (userName && displayName)
    sampleDb.push({ id: id, userName: userName, displayName: displayName });
  return res.redirect("/");
});

app.get("/update", (req, res) => {
  res.render("change");
});

app.patch("/update/:id", (req, res) => {
  const {
    body: { userName, displayName },
    params: { id },
  } = req;
  if (isNaN(id)) return res.status(400).json({ message: "Bad request." });

  const findUserIndex = sampleDb.findIndex((user) => user.id === Number(id));
  if (findUserIndex === -1)
    return res.status(404).send({ message: "User not found" });
  if (findUserIndex !== -1)
    sampleDb[findUserIndex] = {
      ...sampleDb[findUserIndex],
      userName: userName,
      displayName: displayName,
    };
  return res.redirect("/update");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});
