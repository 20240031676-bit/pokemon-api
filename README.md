# Pokemon API

A REST API built with **Express (Node.js)** and **MongoDB (Mongoose)** that supports full CRUD
operations on a hand-crafted collection of 15 Pokemon. Built for the Build Your Own API Server
Challenge (ITCC 14).

## Tech Stack

- Node.js / Express — web server and routing
- MongoDB / Mongoose — database and schema validation
- dotenv — environment variable management

## Project Structure

```
pokemon-api/
├── data/
│   └── seedData.js        # 15 hand-crafted Pokemon
├── models/
│   └── Pokemon.js         # Mongoose schema
├── routes/
│   └── pokemonRoutes.js   # CRUD route handlers
├── server.js              # App entry point
├── seed.js                # Loads seedData.js into MongoDB
├── .env.example
├── .gitignore
└── package.json
```

## Setup & Run

1. **Clone the repo and install dependencies**
   ```bash
   git clone <your-repo-url>
   cd pokemon-api
   npm install
   ```

2. **Configure your database connection**

   Copy `.env.example` to `.env` and set your MongoDB connection string:
   ```bash
   cp .env.example .env
   ```
   - Local MongoDB: `MONGO_URI=mongodb://localhost:27017/pokemon_api`
   - MongoDB Atlas: use the connection string from your Atlas cluster

   `.env` is listed in `.gitignore` and is **not** committed to the repository.

3. **Seed the database** with the 15 sample Pokemon:
   ```bash
   npm run seed
   ```

4. **Start the server**:
   ```bash
   npm start
   ```
   The server runs on `http://localhost:3000` by default (configurable via `PORT` in `.env`).

## Data Model

Each Pokemon document looks like this:

```json
{
  "_id": "66f1a2b3c4d5e6f7a8b9c0d1",
  "name": "Blazekit",
  "type": ["Fire"],
  "stats": {
    "hp": 45,
    "attack": 60,
    "defense": 40,
    "speed": 65
  },
  "generation": 1,
  "description": "A small fire-fox Pokemon whose tail flame grows brighter when it is excited.",
  "createdAt": "2026-01-01T12:00:00.000Z",
  "updatedAt": "2026-01-01T12:00:00.000Z"
}
```

Required fields: `name`, `type` (non-empty array), `stats` (object with `hp`, `attack`, `defense`, `speed`).
Optional fields: `generation`, `description`.

## Endpoints

Base URL: `http://localhost:3000`

### GET /pokemon
Returns the full list of Pokemon.

**Request**
```bash
curl http://localhost:3000/pokemon
```

**Response — 200 OK**
```json
[
  {
    "_id": "66f1a2b3c4d5e6f7a8b9c0d1",
    "name": "Blazekit",
    "type": ["Fire"],
    "stats": { "hp": 45, "attack": 60, "defense": 40, "speed": 65 },
    "generation": 1,
    "description": "A small fire-fox Pokemon..."
  },
  { "...": "14 more entries" }
]
```

---

### GET /pokemon/:id
Returns a single Pokemon by its MongoDB `_id`.

**Request**
```bash
curl http://localhost:3000/pokemon/66f1a2b3c4d5e6f7a8b9c0d1
```

**Response — 200 OK**
```json
{
  "_id": "66f1a2b3c4d5e6f7a8b9c0d1",
  "name": "Blazekit",
  "type": ["Fire"],
  "stats": { "hp": 45, "attack": 60, "defense": 40, "speed": 65 },
  "generation": 1,
  "description": "A small fire-fox Pokemon..."
}
```

**Response — 404 Not Found** (id doesn't exist, or is malformed)
```json
{ "error": "Pokemon not found" }
```

---

### POST /pokemon
Creates a new Pokemon. `name`, `type`, and `stats` are required.

**Request**
```bash
curl -X POST http://localhost:3000/pokemon \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Emberpup",
    "type": ["Fire"],
    "stats": { "hp": 40, "attack": 55, "defense": 35, "speed": 60 },
    "generation": 1,
    "description": "A playful fire-type pup."
  }'
```

**Response — 201 Created**
```json
{
  "_id": "66f1a2b3c4d5e6f7a8b9c0e2",
  "name": "Emberpup",
  "type": ["Fire"],
  "stats": { "hp": 40, "attack": 55, "defense": 35, "speed": 60 },
  "generation": 1,
  "description": "A playful fire-type pup."
}
```

**Response — 400 Bad Request** (missing a required field)
```bash
curl -X POST http://localhost:3000/pokemon \
  -H "Content-Type: application/json" \
  -d '{ "name": "Emberpup" }'
```
```json
{ "error": "Missing required field(s): name, type, and stats are all required" }
```

---

### PUT /pokemon/:id
Updates an existing Pokemon. Send any subset of fields to update.

**Request**
```bash
curl -X PUT http://localhost:3000/pokemon/66f1a2b3c4d5e6f7a8b9c0e2 \
  -H "Content-Type: application/json" \
  -d '{ "stats": { "hp": 42, "attack": 58, "defense": 35, "speed": 62 } }'
```

**Response — 200 OK**
```json
{
  "_id": "66f1a2b3c4d5e6f7a8b9c0e2",
  "name": "Emberpup",
  "type": ["Fire"],
  "stats": { "hp": 42, "attack": 58, "defense": 35, "speed": 62 },
  "generation": 1,
  "description": "A playful fire-type pup."
}
```

**Response — 404 Not Found**
```json
{ "error": "Pokemon not found" }
```

---

### DELETE /pokemon/:id
Deletes a Pokemon by its `_id`.

**Request**
```bash
curl -X DELETE http://localhost:3000/pokemon/66f1a2b3c4d5e6f7a8b9c0e2
```

**Response — 200 OK**
```json
{
  "message": "Pokemon deleted successfully",
  "pokemon": {
    "_id": "66f1a2b3c4d5e6f7a8b9c0e2",
    "name": "Emberpup",
    "type": ["Fire"],
    "stats": { "hp": 42, "attack": 58, "defense": 35, "speed": 62 }
  }
}
```

**Response — 404 Not Found**
```json
{ "error": "Pokemon not found" }
```

## Status Codes Used

| Code | Meaning                                       |
|------|------------------------------------------------|
| 200  | Successful GET, PUT, or DELETE                  |
| 201  | Successful POST (resource created)              |
| 400  | Bad request — missing/invalid required field(s) |
| 404  | Resource not found                              |
| 500  | Unexpected server error                         |

## (Optional) Live Deployment

If deployed, the live base URL is: `<add your Render/Railway URL here>`

Example test against the live server:
```bash
curl <your-live-url>/pokemon
```
