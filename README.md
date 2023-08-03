# Database Administration Web Application

This web application provides an intuitive interface for database administration tasks. It allows users to manage SQL queries dynamically, making it easy to add, edit, and execute queries on the database. The application also incorporates user management features, enhancing security and access control.

## Setup

1. Clone the repository to your local machine.
2. Rename the following .dist files without the .dist extension:
   - `.env.dist` => `.env`
   - `elements.js.dist` => `elements.js`
   - `query_log.txt.dist` => `query_log.txt`
   - `users.json.dist` => `users.json`

       3. Edit the `users.json` file to add user accounts. To generate password hashes, run the password generation script using `node password-generate/password-generate.js`. The generated password and its bcrypt hash should be added to the `users.json` file.

4. Edit the `elements.js` file to add SQL queries, descriptions, and labels. Use `$v1`, `$v2`, and so on to indicate variables in the query, and the corresponding input fields will be created for each variable with the specified labels in the application.

5. Ensure you have Docker and Docker Compose installed on your system.

## Running the Application

1. Build the Docker image and start the application using Docker Compose:
```docker-compose up -d```


2. The application will be available at `http://localhost:3111`.

## Usage

1. On the homepage, you will find a list of available queries organized in accordion-style elements.
2. Click on the accordion headers to expand or collapse the query description and input fields.
3. Fill in the required input fields for the query, as indicated by the labels provided in `elements.js`.
4. Click the "Run" button to execute the query. A confirmation popup will appear before execution.
5. The application will perform the database operation based on the query and display the result.

## Docker Configuration

The application includes a Dockerfile and a docker-compose.yml file.

- The Docker container listens on port 3111.
- To build the Docker image and start the application, use the command `docker-compose up -d`.
- After making changes to `users.json` or `elements.js`, restart the Docker container using `docker-compose restart`.

## Acknowledgment

The development of this application was greatly assisted by OpenAI's ChatGPT, an AI langu
