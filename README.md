# My Rewolf by Karsten Taylor

# Application summary

- This app was designed for a creative agency. It allows them to focus their work on their clients' and potential clients' needs. When a free account is created you will have access to a discovery form that will allow you to answer a questionnaire. These questions are designed so
  Rewolf may assess your needs.

- In order to test the application without creating an account you may use the following credentials:

Administrator account: admin@admin.com
Administrator password: Adminpass1!

User account: test@test.com
User password: Testuser1!

Live App: https://rewolf-client.vercel.app
Client Repo: https://github.com/karstentaylor/myrewolf-client.git

## API Endpoints:

### Users Endpoints

`/`

- Method: `GET`
- Request Params: nothing, but the user must be an administrator
  - returns a list of all the users in the database
- Response: -`200`

  ```javascript
  {
  	[
  		{
  			id: 1,
  			email: 'test1@email.com',
  			name: 'Test user 1',
  			password: 'Password1!',
  			admin: false,
  		},
  		{
  			id: 2,
  			email: 'test2@email.com',
  			name: 'Test user 2',
  			password: 'Password1!',
  			admin: false,
  		}, //...
  	];
  }
  ```

  - `400` if failed

- Method: `POST`

  - Request Params:

    - Creates an account

    ```javascript
    {
        email: 'test1@email.com',
        name: 'Test user 1',
        password: 'Password1!',
    }
    ```

  - Response:
    - `400` if failed
    - `201`
    - `/:id`

`/:id`

- Method: `GET`

  - Request Params:

    - Returns a user by its id

    ```javascript
    {
        id: 1,
    }
    ```

  - Response:

    - `200`

    ```javascript
    {
        email: 'test1@email.com',
        name: 'Test user 1',
        password: 'Password1!',
    }
    ```

    - `400` if failed

- Method: `PATCH`

  - Request Params:

    - Update user password

    ```javascript
    {
        id: 1,
        user_prefs: "newpassword",
    }
    ```

  - Response:
    - `204`
    - `409` if failed

- Method: `DELETE`

  - Request Params:

    - Delets a user data

    ```javascript
    {
        id: 1,
    }
    ```

  - Response:
    - `204`
    - `400` if failed

### Auth Endpoints

POST /api/auth/token
Logs in to an existing account

`/token`

- Method: `POST`

  - Request Params:

    - Create user JWT

    ```javascript
    {
        email: 'test1@email.com',
        password: 'Password1!',
    }
    ```

  - Response:

    ```javascript
    jwtToken = 'string';
    ```

    - `400` if failed

- Method: `PUT`

  - Request Params:

    - Assigns user JWT

    ```javascript
    {
        id: 1,
        email: 'test1@email.com',
        name: test1,
    }
    ```

  - Response:

    ```javascript
    jwtToken = 'string';
    ```

### Discovery Endpoints

`/`

- Method: `GET`

  -Request Params: User must be logged in in order to get to the discovery form.

  - Gets discovery questions from DB

  ```
  {
  	(1, 'What works and what hasn’t in the past with social / how would you like your feed to evolve?'),
    (2, 'How would you define success for each social media channel?'),
    (3, 'What would you like to see more of on your feed?'),
    (4, 'Are there any other brands or accounts that inspire you?'),
    (5, 'How do you want to be seen? How do you want people to view / look up to you?'),
    (6, 'Who do you see are your direct competitors? What do you feel sets you apart from them?'),
    (7, 'Who is your target audience? Who do you relate to, who do you wish to speak to the most?');
  }
  ```

- Method: `POST`

  -Request Params:

  -Answers discovery questions and posts them to the DB

  ````javascript
    {
        answer: 'Posting random photos does not work for us',
    }
    ```

  - Response:

   - `200` and then reloads home

    - `400` if failed
  ````

## Technology

Made with the Express framework, React, Node.JS, and PostgreSQL. Uses postgrator to perform table migrations to SQL database and knex library to write make changes to the tables.
