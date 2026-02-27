# content-publishing-system-back
content publishing backend system
Backend

Node.js
Express
PostgreSQL (Sequelize)
⚙️ Setup Instructions
1️⃣ Clone the Repository
git clone https://github.com/laradesu/content-publishing-system-back.git
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


🔹 Create Author
POST (http://localhost:6000/API/v1.0.0/author/createAuthor)
Request Body:
{
"name":"Desalegn",
"email":"desu@gmail.com"
}
Response
{
  "success": true,
  "data": {...}
}

Get All Articles
get http://localhost:4000/API/v1.0.0/author/getAuthors

Update Article
put (http://localhost:6000/API/v1.0.0/author/updateAuthor/1)
request
{
    "name": "desalegn",
    "email": "desu@gmail.com"
}
response
{
    "success": true,
    "message": "Author updated successfully",
    "data": {
        "id": 1,
        "name": "desalegn",
        "email": "desu@gmail.com",
        "createdAt": "2026-02-26T08:08:03.819Z",
        "updatedAt": "2026-02-26T08:09:23.355Z"
    }
}
Delete Article
delete http://localhost:6000/API/v1.0.0/author/deleteAuthor/1


Database Schema Description

The application uses PostgreSQL with Sequelize ORM.
All tables use:
underscored: true
timestamps: true (created_at, updated_at)
Indexed foreign keys where needed
Authors Table (authors)

Stores article creators.
Columns
Column	Type	Constraints	Description
id	INTEGER	PK, Auto Increment	Unique author ID
name	VARCHAR(255)	NOT NULL	Author full name
email	VARCHAR(255)	NOT NULL, UNIQUE	Author email
created_at	TIMESTAMP	Auto	Creation timestamp
updated_at	TIMESTAMP	Auto	Update timestamp
Relationships

One Author → Many Articles
(Author.hasMany(Article))
Cascade Rule
If an author is deleted:
ON DELETE CASCADE
All their articles are deleted automatically.

Articles Table (articles)

Stores published and draft articles.
Columns
Column	Type	Constraints	Description
id	INTEGER	PK, Auto Increment	Unique article ID
title	VARCHAR(500)	NOT NULL	Article title
body	VARCHAR(500)	NULL	Article content
tags	TEXT[]	NOT NULL	Array of tags
is_published	BOOLEAN	Default: false	Publish status
author_id	INTEGER	NOT NULL, FK	Linked author
created_at	TIMESTAMP	Auto	Creation date
updated_at	TIMESTAMP	Auto	Update date
Indexes

Index on author_id

Index on is_published

Relationships

Many Articles → One Author
(Article.belongsTo(Author))
Design Decision
Tags are stored as:
TEXT[]
(PostgreSQL Array Type)
This simplifies development by avoiding a join table.

Login Table (logins)

Handles authentication credentials.

Columns
Column	Type	Constraints	Description
id	INTEGER	PK	Unique login ID
username	VARCHAR(255)	UNIQUE	Username
password	VARCHAR(255)	Hashed	Encrypted password
is_active	BOOLEAN	Default: true	Account status
created_at	TIMESTAMP	Auto	Created time
updated_at	TIMESTAMP	Auto	Updated time
Security
Passwords are hashed using bcrypt
Default scope excludes password from queries
Unique index on username

Register Table (registers)

Stores registered users.

Columns
Column	Type	Constraints	Description
id	INTEGER	PK	User ID
title	VARCHAR(255)	NULL	Optional title
full_name	VARCHAR(255)	NULL	Full name
email	VARCHAR(255)	UNIQUE	Email address
phone_number	VARCHAR(255)	NOT NULL	Phone
username	VARCHAR(255)	UNIQUE	Username
password	VARCHAR(255)	NOT NULL	Hashed password
is_active	BOOLEAN	Default: true	Account status
created_at	TIMESTAMP	Auto	Created time
updated_at	TIMESTAMP	Auto	Updated time

Indexes

Unique index on email



Unique index on username

Security
Password is automatically hashed using Sequelize hooks (beforeCreate, beforeUpdate)
Scope allows optional password retrieval when required

Database migrations / seeding scripts
Install Sequelize CLI (if not installed)

Inside your backend folder:

npm install --save-dev sequelize-cli
Create Migration for Authors Table
npx sequelize-cli migration:generate --name create-authors-table
Create Migration for Articles Table
npx sequelize-cli migration:generate --name create-articles-table
Run Migrations
npx sequelize-cli db:migrate
Undo Migration (If Needed)

Undo last migration:

npx sequelize-cli db:migrate:undo
Undo all:

npx sequelize-cli db:migrate:undo:all
