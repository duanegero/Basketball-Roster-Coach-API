# Basketball Roster Coach API

This API will allow you to create, read, update and delete both players and coaches from specific teams.

- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [License](#license)


## Installation
1. Clone Repository:<br>
   git clone https://github.com/duanegero/Basketball-Roster-Coach-API.git<br>
2. Install Dependencies<br>
   npm install<br>
3. Start Server<br>
   node index.js<br>
## Usage
After starting the server you can access API at http://localhost:3000.<br>
Use [Postman](https://www.postman.com/) to test API<br>
info about frontend<br>

## Endpoints
### Players

- **Get All Player(Team)**
  - `GET /TeamName`
  - Will return list of all players from specific team.
- **Get Player by ID**
  - `Get/TeamName/:id`
  - Will retrieve details of a specific player from specific team.
- **Add New Player**
  - `POST /TeamName`
  - Required: `first_name`, `age`, `email`
  - Example:
    ```json
    {
       "first_name": "John",
       "age": 12,
       "email": "example@example.com"
    }
    ```
- **Update a Player**
  - `PUT /TeamName/:id`
  - Updates information for a specific player by their TeamName and ID.
  - Required: `first_name`, `age`, `email`
  - Example:
    ```json
    {
       "first_name": "John",
       "age": 13,
       "email": "john.new@example.com"
    }
    ```

- **Delete a Player**
  - `DELETE /TeamName/:id`
  - Removes a player from Team and database.

### Coaches
- **Get Coach by ID**
  - `GET /:id`
  - Will retrieve details of a specific Coach
- **Add New Coach**
    - `POST /`
  - Required: `first_name`, `team`, `assistant_coach`
  - Example:
    ```json
    {
       "first_name": "Jane",
       "team": "team One",
       "assistant_coach": "James"
    }
    ```
- **Update Coach**
   - `PUT /:id`
   - Updates information for a specific coach by ID.
   - Example:
     ```json
     {
       "first_name": "John",
       "team": "exampleTeam",
       "assistant_coach": "Frank"
     }
     ```
  - **Delete a Coach**
    - `DELETE /coaches/:id`
    - Removes a coach from database.

