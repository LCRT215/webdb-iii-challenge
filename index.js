const express = require("express");
const helmet = require("helmet");
const knex = require("knex");
const knexConfig = require("./knexfile");

const db = knex(knexConfig.development);

const server = express();

server.use(helmet());
server.use(express.json());

const errors = {
  "19": "Another record with that value exists"
};

server.get("/api/cohorts", async (req, res) => {
  try {
    const cohorts = await db("cohorts");
    res.status(200).json(cohorts);
  } catch (error) {
    res.status(500).json(error);
  }
});

server.post("/api/cohorts", async (req, res) => {
  try {
    const [id] = await db("cohorts").insert(req.body);

    const cohort = await db("cohorts")
      .where({ id })
      .first();

    res.status(201).json(cohort);
  } catch (error) {
    const message = errors[error.errno] || "We ran into an error";
    res.status(500).json({ message, error });
  }
});

server.get("/api/cohorts/:id", async (req, res) => {
  // get the roles from the database
  try {
    const cohort = await db("cohorts")
      .where({ id: req.params.id })
      .first();
    res.status(200).json(cohort);
  } catch (error) {
    res.status(500).json(error);
  }
});
///////////////////////////////////

server.get("/api/cohorts/:id/students", async (req, res) => {
  try {
    const cohorts = await db("students");
    res.status(200).json(cohorts);
  } catch (error) {
    res.status(500).json(error);
  }
});
const port = process.env.PORT || 4000;
server.listen(port, () =>
  console.log(`\n** API running on http://localhost:${port} **\n`)
);
