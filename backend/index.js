const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));

// In-memory storage
let grievances = [];
let nextId = 1;

// Swagger setup
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Grievance Platform API",
      version: "1.0.0",
    },
  },
  apis: ["./index.js"],
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

/**
 * @swagger
 * components:
 *   schemas:
 *     Grievance:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         location:
 *           type: string
 *         category:
 *           type: string
 *         status:
 *           type: string
 *         created_at:
 *           type: string
 *         updated_at:
 *           type: string
 *
 * /api/grievances:
 *   get:
 *     summary: List all grievances
 *     responses:
 *       200:
 *         description: a list of grievances
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Grievance'
 *   post:
 *     summary: Create a new grievance
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               location:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Grievance'
 *
 * /api/grievances/{id}:
 *   get:
 *     summary: Get grievance by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: single grievance
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Grievance'
 *       404:
 *         description: Not found
 *   put:
 *     summary: Update grievance
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               location:
 *                 type: string
 *               status:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated
 *   delete:
 *     summary: Delete grievance
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Deleted
 */

// Routes
app.get("/api/grievances", (req, res) => {
  const status = req.query.status;
  if (status) {
    return res.json(grievances.filter((g) => g.status === status));
  }
  res.json(grievances);
});

app.get("/api/grievances/:id", (req, res) => {
  const id = Number(req.params.id);
  const g = grievances.find((x) => x.id === id);
  if (!g) return res.status(404).json({ error: "Not found" });
  res.json(g);
});

app.post("/api/grievances", (req, res) => {
  const { title, description, location, category } = req.body;
  if (!title || !description)
    return res
      .status(400)
      .json({ error: "title and description required" });
  const g = {
    id: nextId++,
    title,
    description,
    location: location || "",
    category: category || "General",
    status: "open",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  grievances.unshift(g);
  res.status(201).json(g);
});

app.put("/api/grievances/:id", (req, res) => {
  const id = Number(req.params.id);
  const g = grievances.find((x) => x.id === id);
  if (!g) return res.status(404).json({ error: "Not found" });

  const { title, description, location, status, category } = req.body;
  if (title !== undefined) g.title = title;
  if (description !== undefined) g.description = description;
  if (location !== undefined) g.location = location;
  if (status !== undefined) g.status = status;
  if (category !== undefined) g.category = category;
  g.updated_at = new Date().toISOString();

  res.json(g);
});

app.delete("/api/grievances/:id", (req, res) => {
  const id = Number(req.params.id);
  const idx = grievances.findIndex((x) => x.id === id);
  if (idx === -1) return res.status(404).json({ error: "Not found" });
  grievances.splice(idx, 1);
  res.status(204).send();
});

// seed sample data
grievances.push({
  id: nextId++,
  title: "Potholes on Main Street",
  description: "Large potholes causing problems near market area.",
  location: "Main Street",
  category: "Road Problem",
  status: "open",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
});
grievances.push({
  id: nextId++,
  title: "Streetlight not working",
  description: "Streetlight near Block C has been off for 2 weeks.",
  location: "Block C",
  category: "Garbage Problem",
  status: "in_progress",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log("Backend running on port", PORT));