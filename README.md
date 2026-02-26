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

API Documentation
🔹 Create Article
POST [/api/articles](http://localhost:6000/API/v1.0.0/article/createArticle)
Request Body:
{
  "title": "Article Title",
  "body": "Markdown content",
  "tags": ["tech", "news"],
  "is_published": true,
  "author_id": 1
}
Response
{
  "success": true,
  "data": {...}
}

Get All Articles
http://localhost:4000/API/v1.0.0/article/get_all_articles

Update Article
put http://localhost:6000/API/v1.0.0/article/update_article/2
request
{
    "is_published": false
}
response
{
    "success": true,
    "data": {
        "id": 2,
        "title": "My First Article",
        "body": "This is the body content of the article. It can be long text.",
        "tags": "{\"technology\",\"programming\",\"webdev\"}",
        "is_published": false,
        "author_id": 2,
        "createdAt": "2026-02-26T08:44:59.279Z",
        "updatedAt": "2026-02-26T08:44:59.279Z"
    }
}
Delete Article
delete http://localhost:6000/API/v1.0.0/article/delete_article/2
