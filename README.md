# content-publishing-system-back
content publishing backend system
Backend

Node.js
Express
PostgreSQL (Sequelize)
⚙️ Setup Instructions
1️⃣ Clone the Repository
git clone https://github.com/YOUR_USERNAME/content-publishing-system-back.git
cd content-publishing-system-back

How to Run the Project
🔹 Backend Setup
cd content-publishing-system-back
npm install

Create .env file:
PORT=4000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=content_db
DB_USER=postgres
DB_PASSWORD=postgres
DB_POOL_MAX=30
NODE_ENV=development
JWT_SECRET=supersecretkey
run backend
npm run dev/start

 backend runs at
 http://localhost:4000
🏗 Architecture Overview
📂 Project Structure
 ├── backend/
│   ├── routes/
│   ├── services/
│   ├── models/
│   └── middlewares/
------server.js
-----constants
----.env
----utils
----config
----migration

Architecture Pattern Used

Backend follows:
server.js(entry)routes → Service → Model pattern
Separation of concerns
Reusable service layer
Centralized validation
