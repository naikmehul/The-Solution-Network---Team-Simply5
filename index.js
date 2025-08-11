/**
 * Local Grievance Backend (in-memory)
 * - Implements the API_CONTRACT.md you provided
 * - Swagger UI: GET /api-docs
 *
 * Usage:
 * 1. npm install (already installed if you followed earlier)
 * 2. npm run dev
 * 3. Visit: http://localhost:5000/api-docs
 */

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.SECRET_KEY || 'verysecretkey_for_assignment';

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve uploaded files
const UPLOAD_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);
app.use('/uploads', express.static(UPLOAD_DIR));

// ========== In-memory "DB" ==========
let users = [];        // User objects
let issues = [];       // Issue objects
let comments = [];     // Comment objects
let attachments = [];  // Attachment objects

let nextUserId = 1;
let nextIssueId = 1;
let nextCommentId = 1;
let nextAttachmentId = 1;

// ========== Multer setup for file uploads ==========
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    // make filename unique
    const unique = `${Date.now()}-${Math.round(Math.random()*1e9)}${path.extname(file.originalname)}`;
    cb(null, unique);
  }
});
const upload = multer({ storage });

// ========== Auth middleware ==========
function authMiddleware(req, res, next) {
  const header = req.headers['authorization'];
  if (!header) return res.status(401).json({ success: false, message: "Unauthorized" });
  const parts = header.split(' ');
  if (parts.length !== 2) return res.status(401).json({ success: false, message: "Unauthorized" });
  const token = parts[1];
  jwt.verify(token, SECRET_KEY, (err, payload) => {
    if (err) return res.status(401).json({ success: false, message: "Unauthorized" });
    // payload { id, name, iat, exp }
    req.user = payload;
    next();
  });
}

// ========== Swagger setup ==========
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Local Grievance API',
      version: '1.0.0',
      description: 'In-memory API for Local Grievance assignment'
    },
    servers: [{ url: `http://localhost:${PORT}` }]
  },
  apis: ['./index.js']
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id: { type: string }
 *         name: { type: string }
 *         email: { type: string }
 *         createdAt: { type: string, format: date-time }
 *         updatedAt: { type: string, format: date-time }
 *     Issue:
 *       type: object
 *       properties:
 *         id: { type: string }
 *         title: { type: string }
 *         description: { type: string }
 *         category: { type: string }
 *         priority: { type: string }
 *         status: { type: string }
 *         location: { type: string }
 *         createdAt: { type: string, format: date-time }
 *         updatedAt: { type: string, format: date-time }
 *     Comment:
 *       type: object
 *       properties:
 *         id: { type: string }
 *         issueId: { type: string }
 *         text: { type: string }
 *         authorId: { type: string }
 *         createdAt: { type: string, format: date-time }
 *     Attachment:
 *       type: object
 *       properties:
 *         id: { type: string }
 *         issueId: { type: string }
 *         fileUrl: { type: string }
 *         uploadedAt: { type: string, format: date-time }
 */

// ========== Root/test ==========
/**
 * @openapi
 * /:
 *   get:
 *     summary: Test server
 *     responses:
 *       200:
 *         description: Running message
 */
app.get('/', (req, res) => {
  res.send('Backend is running ✅');
});

// ========== AUTH ROUTES ==========

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     summary: Register User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name: { type: string }
 *               email: { type: string }
 *               password: { type: string }
 *     responses:
 *       201:
 *         description: Created
 */
app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }
  const exists = users.find(u => u.email === email.toLowerCase());
  if (exists) {
    return res.status(409).json({ success: false, message: "Email already registered" });
  }
  const hashed = bcrypt.hashSync(password, 10);
  const id = `u${nextUserId++}`;
  const now = new Date().toISOString();
  const user = { id, name, email: email.toLowerCase(), password: hashed, createdAt: now, updatedAt: now };
  users.push(user);
  return res.status(201).json({
    success: true,
    data: { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt }
  });
});

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: Login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string }
 *               password: { type: string }
 *     responses:
 *       200:
 *         description: OK
 */
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === (email || '').toLowerCase());
  if (!user) return res.status(401).json({ success: false, message: "Invalid email or password" });
  const ok = bcrypt.compareSync(password, user.password);
  if (!ok) return res.status(401).json({ success: false, message: "Invalid email or password" });

  const token = jwt.sign({ id: user.id, name: user.name }, SECRET_KEY, { expiresIn: '8h' });
  return res.json({ success: true, token, user: { id: user.id, name: user.name } });
});

// ========== USERS ==========

/**
 * @openapi
 * /api/users/me:
 *   get:
 *     summary: View profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile
 */
app.get('/api/users/me', authMiddleware, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) return res.status(401).json({ success: false, message: "Unauthorized" });
  return res.json({ success: true, data: { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt } });
});

/**
 * @openapi
 * /api/users/me:
 *   put:
 *     summary: Update profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               password: { type: string }
 *     responses:
 *       200:
 *         description: Updated
 */
app.put('/api/users/me', authMiddleware, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) return res.status(401).json({ success: false, message: "Unauthorized" });
  const { name, password } = req.body;
  if (name) user.name = name;
  if (password) user.password = bcrypt.hashSync(password, 10);
  user.updatedAt = new Date().toISOString();
  return res.json({ success: true, data: { id: user.id, name: user.name, email: user.email, updatedAt: user.updatedAt } });
});

// ========== ISSUES ==========

/**
 * @openapi
 * /api/issues:
 *   post:
 *     summary: Create issue
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, description, category, priority, location]
 *             properties:
 *               title: { type: string }
 *               description: { type: string }
 *               category: { type: string }
 *               priority: { type: string }
 *               location: { type: string }
 *     responses:
 *       201:
 *         description: Created
 */
app.post('/api/issues', authMiddleware, (req, res) => {
  const { title, description, category, priority, location } = req.body;
  if (!title || !description || !category || !priority || !location) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }
  const id = `i${nextIssueId++}`;
  const now = new Date().toISOString();
  const issue = {
    id,
    title,
    description,
    category,
    priority,
    status: "Open",
    location,
    createdAt: now,
    updatedAt: now,
    reporterId: req.user.id
  };
  issues.push(issue);
  return res.status(201).json({ success: true, data: { id: issue.id, title: issue.title, status: issue.status, createdAt: issue.createdAt } });
});

/**
 * @openapi
 * /api/issues:
 *   get:
 *     summary: View all issues (with optional pagination)
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer }
 *       - in: query
 *         name: limit
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: list
 */
app.get('/api/issues', (req, res) => {
  if (!issues || issues.length === 0) {
    return res.status(404).json({ success: false, message: "No issues found" });
  }
  let results = issues.map(i => ({ id: i.id, title: i.title, status: i.status }));
  // pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || results.length;
  const start = (page - 1) * limit;
  const paged = results.slice(start, start + limit);
  return res.json({ success: true, data: paged });
});

/**
 * @openapi
 * /api/issues/{id}:
 *   put:
 *     summary: Update issue details
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Updated
 */
app.put('/api/issues/:id', authMiddleware, (req, res) => {
  const issue = issues.find(i => i.id === req.params.id);
  if (!issue) return res.status(404).json({ success: false, message: "Issue not found" });
  // Update allowed fields
  const allowed = ['title', 'description', 'category', 'priority', 'location', 'status'];
  allowed.forEach(field => {
    if (req.body[field] !== undefined) issue[field] = req.body[field];
  });
  issue.updatedAt = new Date().toISOString();
  return res.json({ success: true, message: "Issue details updated successfully" });
});

/**
 * @openapi
 * /api/issues/{id}/status:
 *   patch:
 *     summary: Update issue status
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status: { type: string }
 *     responses:
 *       200:
 *         description: Updated status
 */
app.patch('/api/issues/:id/status', authMiddleware, (req, res) => {
  const issue = issues.find(i => i.id === req.params.id);
  if (!issue) return res.status(404).json({ success: false, message: "Issue not found" });
  const { status } = req.body;
  if (!status) return res.status(400).json({ success: false, message: "Missing status in request" });
  issue.status = status;
  issue.updatedAt = new Date().toISOString();
  return res.json({ success: true, message: "Issue status updated successfully" });
});

// ========== COMMENTS ==========

/**
 * @openapi
 * /api/issues/{id}/comments:
 *   post:
 *     summary: Add comment to issue
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text: { type: string }
 *     responses:
 *       201:
 *         description: Comment added
 */
app.post('/api/issues/:id/comments', authMiddleware, (req, res) => {
  const issue = issues.find(i => i.id === req.params.id);
  if (!issue) return res.status(404).json({ success: false, message: "Issue not found" });
  const { text } = req.body;
  if (!text) return res.status(400).json({ success: false, message: "Missing comment text" });
  const id = `c${nextCommentId++}`;
  const createdAt = new Date().toISOString();
  const comment = { id, issueId: issue.id, text, authorId: req.user.id, createdAt };
  comments.push(comment);
  return res.status(201).json({ success: true, message: "Comment added successfully" });
});

/**
 * @openapi
 * /api/issues/{id}/comments:
 *   get:
 *     summary: View comments for an issue
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: list of comments
 */
app.get('/api/issues/:id/comments', (req, res) => {
  const issue = issues.find(i => i.id === req.params.id);
  if (!issue) return res.status(404).json({ success: false, message: "Issue not found" });
  const issueComments = comments.filter(c => c.issueId === req.params.id);
  if (!issueComments || issueComments.length === 0) return res.status(404).json({ success: false, message: "No comments found for this issue" });
  return res.json(issueComments);
});

// ========== SEARCH & FILTER ==========
/**
 * @openapi
 * /api/issues/search:
 *   get:
 *     summary: Search and filter issues
 *     parameters:
 *       - in: query
 *         name: keyword
 *       - in: query
 *         name: status
 *       - in: query
 *         name: category
 *       - in: query
 *         name: priority
 *       - in: query
 *         name: location
 *     responses:
 *       200:
 *         description: search results
 */
app.get('/api/issues/search', (req, res) => {
  const { keyword, status, category, priority, location } = req.query;
  let results = issues.slice();

  if (keyword) {
    const k = keyword.toLowerCase();
    results = results.filter(i => (i.title && i.title.toLowerCase().includes(k)) || (i.description && i.description.toLowerCase().includes(k)));
  }
  if (status) results = results.filter(i => i.status === status);
  if (category) results = results.filter(i => i.category === category);
  if (priority) results = results.filter(i => i.priority === priority);
  if (location) results = results.filter(i => i.location && i.location.includes(location));

  if (!results || results.length === 0) {
    return res.status(404).json({ success: false, message: "No matching issues found" });
  }
  // return full issue objects as in contract sample
  return res.json(results.map(i => ({
    id: i.id,
    title: i.title,
    status: i.status,
    category: i.category,
    priority: i.priority,
    location: i.location
  })));
});

// ========== ATTACHMENTS ==========
/**
 * @openapi
 * /api/issues/{id}/attachments:
 *   post:
 *     summary: Upload attachment for an issue
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: uploaded
 */
app.post('/api/issues/:id/attachments', upload.single('file'), (req, res) => {
  const issue = issues.find(i => i.id === req.params.id);
  if (!issue) return res.status(404).json({ success: false, message: "Issue not found" });
  if (!req.file) return res.status(400).json({ success: false, message: "Invalid file format" });

  const id = `a${nextAttachmentId++}`;
  const uploadedAt = new Date().toISOString();
  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  const a = { id, issueId: issue.id, fileUrl, uploadedAt };
  attachments.push(a);

  return res.status(201).json(a);
});

/**
 * @openapi
 * /api/issues/{id}/attachments:
 *   get:
 *     summary: View attachments for an issue
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: attachments list
 */
app.get('/api/issues/:id/attachments', (req, res) => {
  const issue = issues.find(i => i.id === req.params.id);
  if (!issue) return res.status(404).json({ success: false, message: "Issue not found" });
  const list = attachments.filter(a => a.issueId === req.params.id);
  if (!list || list.length === 0) return res.status(404).json({ success: false, message: "No attachments found for this issue" });
  return res.json(list);
});

// ========== Swagger security definition addition ==========
/**
 * @openapi
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

// ========== Start server ==========
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger docs: http://localhost:${PORT}/api-docs`);
});
