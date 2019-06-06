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

server.get("/api/cohorts/:id/students", async (req, res) => {
  try {
    const cohorts = await db("students");
    res.status(200).json(cohorts);
  } catch (error) {
    res.status(500).json(error);
  }
});

server.put("/api/cohorts/:id", async (req, res) => {
  try {
    const count = await db("cohorts")
      .where({ id: req.params.id })
      .update(req.body);

    if (count > 0) {
      const cohort = await db("cohorts")
        .where({ id: req.params.id })
        .first();

      res.status(200).json(cohort);
    } else {
      res.status(404).json({ message: "Cohort not found" });
    }
  } catch (error) {}
});

server.delete("/api/cohorts/:id", async (req, res) => {
  try {
    const count = await db("cohorts")
      .where({ id: req.params.id })
      .del();

    if (count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Cohort not found" });
    }
  } catch (error) {}
});

/////////////////STUDENT ENDPOINTS////////////////

server.get("/students", async (req, res) => {
  try {
    const students = await db("students");
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json(error);
  }
});

server.post("/students", async (req, res) => {
  try {
    const [id] = await db("students").insert(req.body);

    const student = await db("students")
      .where({ id })
      .first();

    res.status(201).json(student);
  } catch (error) {
    const message =
      errors[error.errno] || "We ran into an error adding the student";
    res.status(500).json({ message, error });
  }
});

server.get("/students/:id", async (req, res) => {
  // get the roles from the database
  try {
    const student = await db("students")
      .where({ id: req.params.id })
      .first();
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json(error);
  }
});

server.put("/students/:id", async (req, res) => {
  try {
    const count = await db("students")
      .where({ id: req.params.id })
      .update(req.body);

    if (count > 0) {
      const student = await db("students")
        .where({ id: req.params.id })
        .first();

      res.status(200).json(student);
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {}
});

server.delete("/students/:id", async (req, res) => {
  try {
    const count = await db("students")
      .where({ id: req.params.id })
      .del();

    if (count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {}
});
const port = process.env.PORT || 4000;
server.listen(port, () =>
  console.log(`\n** API running on http://localhost:${port} **\n`)
);
