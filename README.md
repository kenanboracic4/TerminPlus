# TerminPlus

TerminPlus is a robust backend application designed to facilitate the organization and management of sports matches or events. It provides a comprehensive set of APIs for user authentication, match creation, participant management, and more. This platform enables users to register, discover, create, and join various sports activities, fostering a community around shared athletic interests.

## Table of Contents

-   [Key Features & Benefits](#key-features--benefits)
-   [Technologies Used](#technologies-used)
-   [Project Structure](#project-structure)
-   [Prerequisites](#prerequisites)
-   [Installation & Setup](#installation--setup)
-   [Configuration](#configuration)
-   [API Endpoints](#api-endpoints)
-   [Contributing](#contributing)
-   [License](#license)
-   [Acknowledgments](#acknowledgments)

## Key Features & Benefits

*   **User Authentication**: Secure user registration, login, and session management using JWT.
*   **Match Management**: Create, view, and manage sports matches with detailed information such as title, sport type, date, location (latitude/longitude, address), price per person, and needed players.
*   **Participant Management**: Functionality to manage participants for each match.
*   **Database Integration**: Utilizes PostgreSQL with Sequelize ORM for efficient and reliable data storage.
*   **RESTful API**: Provides a clean and intuitive API for seamless integration with frontend applications.
*   **Environment Configuration**: Easy management of sensitive data and settings through environment variables.
*   **CORS Enabled**: Configured to handle Cross-Origin Resource Sharing for broader client accessibility.

## Technologies Used

### Languages

*   JavaScript

### Tools & Frameworks

*   **Backend Runtime**: Node.js
*   **Web Framework**: Express.js
*   **ORM**: Sequelize
*   **Database**: PostgreSQL
*   **Environment Variables**: `dotenv`
*   **CORS**: `cors`
*   **Logging**: `morgan`
*   **Cookie Handling**: `cookie-parser`

## Project Structure

The project follows a modular structure, separating concerns into distinct directories:

```
└── backend/
    ├── .env                # Environment variables
    ├── .gitignore          # Git ignore file
    ├── app.js              # Main Express application file
    └── bin/
        └── www             # Server startup script
    └── config/
        └── db.js           # Database connection configuration
    └── controllers/
        ├── matchController.js  # Logic for handling match-related requests
        └── userController.js   # Logic for handling user-related requests
    └── dao/                # Data Access Objects for database interactions
        ├── matchDao.js
        ├── participantDao.js
        └── userDao.js
    └── middleware/
        └── auth.js         # Authentication middleware (e.g., JWT verification)
    └── models/
        ├── Match.js        # Sequelize model for Match
        ├── Participant.js  # Sequelize model for Participant
        └── index.js        # Model index for associations and initialization
    └── services/           # Business logic services
        ├── matchService.js
        ├── participantService.js
        └── userService.js
    └── routes/             # API route definitions
        ├── index.js
        ├── users.js
        └── matches.js
```

## Prerequisites

Before you begin, ensure you have met the following requirements:

*   **Node.js**: Version 14 or higher. You can download it from [nodejs.org](https://nodejs.org/).
*   **npm** (Node Package Manager): Usually comes bundled with Node.js.
*   **PostgreSQL**: A running instance of PostgreSQL database server.

## Installation & Setup

Follow these steps to get TerminPlus up and running on your local machine:

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/kenanboracic4/TerminPlus.git
    cd TerminPlus/backend
    ```

2.  **Install Dependencies**:
    Navigate to the `backend` directory and install the required Node.js packages:
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**:
    Create a `.env` file in the `backend/` directory based on the `Example.env` (or similar) template. Populate it with your database credentials and other necessary environment variables:

    ```env
    # Database Configuration
    DB_NAME=your_database_name
    DB_USER=your_database_user
    DB_PASS=your_database_password
    DB_HOST=localhost # or your database host
    DB_PORT=5432      # default PostgreSQL port

    # Server Port
    PORT=3000

    # JWT Secret for authentication
    JWT_SECRET=supersecretjwtkey # IMPORTANT: Change this to a strong, random key
    ```

4.  **Database Synchronization**:
    The application is configured to synchronize models with your PostgreSQL database. Upon initial startup, Sequelize will create the necessary tables. Ensure your database server is running before starting the application.

5.  **Start the Server**:
    You can start the server using npm scripts:
    ```bash
    npm start
    ```
    Alternatively, you can run the server directly:
    ```bash
    node ./bin/www
    ```
    The server will typically run on `http://localhost:3000` (or the port specified in your `.env` file).

## Configuration

All important configuration options are managed through environment variables located in the `.env` file in the `backend/` directory.

| Variable       | Description                                  | Example Value      |
| :------------- | :------------------------------------------- | :----------------- |
| `DB_NAME`      | Name of your PostgreSQL database             | `terminplus_db`    |
| `DB_USER`      | Username for your PostgreSQL database        | `postgres`         |
| `DB_PASS`      | Password for your PostgreSQL database user   | `mysecretpassword` |
| `DB_HOST`      | Hostname or IP address of your DB server     | `localhost`        |
| `DB_PORT`      | Port of your PostgreSQL database server      | `5432`             |
| `PORT`         | Port on which the Express server will run    | `3000`             |
| `JWT_SECRET`   | Secret key used for signing JWT tokens.      | `supersecretjwtkey`|

**It is crucial to use strong, unique values for `DB_PASS` and `JWT_SECRET` in a production environment.**

## API Endpoints

The TerminPlus backend exposes several RESTful API endpoints. Here are some key examples:

### User Management

*   **`POST /users/register`**
    *   **Description**: Registers a new user.
    *   **Request Body**:
        ```json
        {
            "name": "John Doe",
            "email": "john.doe@example.com",
            "password": "strongpassword123"
        }
        ```
    *   **Response**: `200 OK` on success, `500 Internal Server Error` with message on failure.

*   **`POST /users/login`**
    *   **Description**: Authenticates a user and returns a JWT token.
    *   **Request Body**:
        ```json
        {
            "email": "john.doe@example.com",
            "password": "strongpassword123"
        }
        ```
    *   **Response**: `200 OK` with `{ token: "jwt_token_here" }` on success, `401 Unauthorized` or `500 Internal Server Error` on failure.

### Match Management (Requires Authentication)

*   **`POST /matches`**
    *   **Description**: Creates a new match. Requires a valid JWT in the `Authorization` header (`Bearer <token>`).
    *   **Request Headers**:
        ```
        Authorization: Bearer <your_jwt_token>
        ```
    *   **Request Body**:
        ```json
        {
            "title": "Basketball Game at Park",
            "sportId": 1,
            "date": "2024-03-15T18:00:00Z",
            "neededPlayers": 10,
            "pricePerPerson": 5.00,
            "latitude": 34.0522,
            "longitude": -118.2437,
            "address": "Grand Park, Los Angeles",
            "description": "Friendly pickup game, all skill levels welcome!"
        }
        ```
    *   **Response**: `200 OK` on success, `401 Unauthorized` or `500 Internal Server Error` on failure.

*   **`GET /matches`**
    *   **Description**: Retrieves a list of all matches. (Authentication might be optional or required depending on full implementation).

*(More endpoints for viewing, updating, deleting matches, and managing participants are expected based on the project structure and DAO files.)*

## Contributing

We welcome contributions to TerminPlus! To contribute, please follow these steps:

1.  **Fork** the repository on GitHub.
2.  **Clone** your forked repository to your local machine.
3.  **Create a new branch** for your feature or bug fix: `git checkout -b feature/your-feature-name` or `git checkout -b bugfix/issue-description`.
4.  **Make your changes**, ensuring they adhere to the project's coding style.
5.  **Write clear, concise commit messages**.
6.  **Push** your branch to your forked repository: `git push origin feature/your-feature-name`.
7.  **Open a Pull Request** to the `main` branch of the original repository, describing your changes in detail.

## License

This project currently has **no specified license**.

It is highly recommended to add a license to clarify how others can use, modify, and distribute your code. Popular open-source licenses include MIT, Apache 2.0, and GPL.

## Acknowledgments

*   Built with [Node.js](https://nodejs.org/) and [Express.js](https://expressjs.com/).
*   Utilizes [Sequelize](https://sequelize.org/) for ORM and [PostgreSQL](https://www.postgresql.org/) for database management.
*   Thanks to the open-source community for providing these powerful tools.
