 Pokemon API

A REST API built with Express (Node.js) and MongoDB (Mongoose), supporting full CRUD on a hand-crafted set of 15 Pokemon. Built for the Build Your Own API Server Challenge (ITCC 14).

Live URL: https://pokemon-api-6yz1.onrender.com
(free tier — first request after inactivity may take 30-60s to wake up)

 Tech Stack

Node.js, Express, MongoDB, Mongoose, dotenv

 Setup

bash
git clone <your-repo-url>
cd pokemon-api
npm install
cp .env.example .env   # then add your MongoDB connection string to MONGO_URI
npm run seed            # loads the 15 sample Pokemon
npm start                # runs on http://localhost:3000


Data Model

json
{
  "_id": "66f1a2b3c4d5e6f7a8b9c0d1",
  "name": "Blazekit",
  "type": ["Fire"],
  "stats": { "hp": 45, "attack": 60, "defense": 40, "speed": 65 },
  "generation": 1,
  "description": "A small fire-fox Pokemon."
}

Required: `name`, `type` (array), `stats` (hp/attack/defense/speed). Optional: `generation`, `description`.

Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/pokemon` | Get all Pokemon |
| GET | `/pokemon/:id` | Get one Pokemon |
| POST | `/pokemon` | Create a Pokemon |
| PUT | `/pokemon/:id` | Update a Pokemon |
| DELETE | `/pokemon/:id` | Delete a Pokemon |

GET /pokemon
bash
curl http://localhost:3000/pokemon

→ `200 OK` — array of all Pokemon

GET /pokemon/:id
bash
curl http://localhost:3000/pokemon/66f1a2b3c4d5e6f7a8b9c0d1

→ `200 OK` with the Pokemon, or `404` if not found

POST /pokemon
bash
curl -X POST http://localhost:3000/pokemon \
  -H "Content-Type: application/json" \
  -d '{"name": "Emberpup", "type": ["Fire"], "stats": {"hp": 40, "attack": 55, "defense": 35, "speed": 60}}'

→ `201 Created` with the new Pokemon, or `400` if a required field is missing

PUT /pokemon/:id
bash
curl -X PUT http://localhost:3000/pokemon/66f1a2b3c4d5e6f7a8b9c0e2 \
  -H "Content-Type: application/json" \
  -d '{"stats": {"hp": 42, "attack": 58, "defense": 35, "speed": 62}}'
→ `200 OK` with the updated Pokemon, or `404` if not found
DELETE /pokemon/:id
bash
curl -X DELETE http://localhost:3000/pokemon/66f1a2b3c4d5e6f7a8b9c0e2

→ `200 OK` with a confirmation message, or `404` if not found

Status Codes

`200` success · `201` created · `400` bad request · `404` not found · `500` server error
