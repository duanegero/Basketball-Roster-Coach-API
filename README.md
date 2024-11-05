# Basketball Roster Coach API

This API will allow you to create, read, update and delete both players and coaches from specific teams.

- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)


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
  - Will return list of all players from specific team
- **Get Player by ID**
  - `Get/TeamName/:id`
  - Will retrieve details of a specific player from specific team
- **Add New Player**
  - `POST /TeamName`
  - Required: `first_name`, `age`, `email`, `team_name`
  - Example:
    ```json
    {
       "first_name": "John",
       "age": 12,
       "email": "example@example.com,
    }
    ```

