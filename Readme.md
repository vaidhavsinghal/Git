# My First Backend API

I built this project for my backend development assignment while following [Shivani’s Node.js and Express tutorial](https://www.youtube.com/watch?v=KOutPbKc9UM).

The project uses Node.js, Express, and MongoDB Atlas. It lets users register and check their login details, and provides CRUD operations for character posts. I used Postman to send requests and inspect the responses without building a frontend.

## What I learned

This project helped me understand how a request moves through a backend:

- **Routes** match the request’s URL and HTTP method.
- **Controllers** handle the request and send a response.
- **Models** define the data stored in MongoDB.

I also learned how to use environment variables, hash passwords with bcrypt, and track my progress with Git.

## Running the project

You’ll need Node.js and a MongoDB Atlas database.

1. Clone this repository.
2. Open a terminal in the `backend` folder.
3. Install the dependencies:

   ```bash
   npm install
   ```

4. Copy `.env.example` to `.env` and add your Atlas connection string:

   ```env
   MONGODB_URL=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/
   PORT=4000
   ```

5. Add your current public IP address to Atlas’s IP Access List.
6. Start the server:

   ```bash
   npm run dev
   ```

When the database connects, the terminal should show:

```text
MongoDB connected!!! Host: ...
Server is running on port 4000
```

Keep the terminal running while testing with Postman.

## Available endpoints

All paths below start with `http://localhost:4000`.

| Method | Path | What it does |
| --- | --- | --- |
| POST | `/api/v1/users/register` | Creates a user |
| POST | `/api/v1/users/login` | Checks email and password |
| POST | `/api/v1/users/logout` | Returns the tutorial’s logout response |
| POST | `/api/v1/posts/create` | Creates a character post |
| GET | `/api/v1/posts/getPosts` | Lists all posts |
| PATCH | `/api/v1/posts/update/:id` | Updates a post |
| DELETE | `/api/v1/posts/delete/:id` | Deletes a post |

For update and delete requests, replace `:id` with the post’s `_id` from MongoDB or a previous API response.

## Trying it in Postman

To register a test user, send a POST request to `/api/v1/users/register`. Choose **Body → raw → JSON** and enter:

```json
{
  "username": "demostudent",
  "email": "demostudent@example.com",
  "password": "DemoOnly123"
}
```

For login, send the same email and password to `/api/v1/users/login`.

To create a character, send this body to `/api/v1/posts/create`:

```json
{
  "name": "Kina",
  "description": "A martial artist",
  "age": 26
}
```

Copy the returned post ID to test updates and deletion. The Get All Posts request doesn’t need a body.

## How I organised the code

```text
backend/
├── src/
│   ├── config/         # Database connection and constants
│   ├── controllers/    # Request-handling functions
│   ├── models/         # User and Post schemas
│   ├── routes/         # API paths
│   ├── app.js          # Express setup
│   └── index.js        # Server startup
├── .env.example
├── .gitignore
├── package.json
└── package-lock.json
```

## A problem I ran into

The Atlas connection sometimes failed with a TLS error on my college network. I checked DNS resolution, port connectivity, and Atlas’s IP access list while troubleshooting it.

The app now retries the connection up to five times before stopping. This helps with temporary failures, but the connection can still fail. An optional `DNS_SERVER` setting is available for networks that need it; it should be configured for the network being used.

## What this project doesn’t do yet

This follows the tutorial’s basic authentication flow. Passwords are hashed with bcrypt, but login does not create a session or issue a token. The logout endpoint checks whether the user exists and returns a message—it does not end a real session.

The post endpoints are also not protected by authentication. Adding sessions or tokens and restricting who can edit posts would be useful next steps.

## Credits

Based on [Intro to Backend Web Development — Node.js & Express Tutorial for Beginners](https://www.youtube.com/watch?v=KOutPbKc9UM).

I followed the tutorial’s structure, with adjustments for Mongoose 9, extra validation in some endpoints, and database connection retries.

The real `.env` file is excluded from Git. Use `.env.example` to configure your own connection.