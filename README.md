# Basketball Roster Coach API (Backend)

This is a backend API

- [Installation](#installation)
- [Frontend Repository](#frontend)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [License](#license)

## Installation

1. Clone Repository:<br>
   `git clone https://github.com/duanegero/Basketball-Roster-Coach-API.git`
2. Navigate to the Project Directory
3. Install Dependencies:<br>
   `npm install`
4. Start Server<br>
   `node index.js`

## Frontend

### HTML/CSS/JS Frontend

[Basketball-Roster-Coach-API-Frontend](https://github.com/duanegero/Basketball-Roster-Coach-API-Frontend.git)

### React App

[Court-Command-React-Frontend](https://github.com/duanegero/Court-Command-React-Frontend.git)

## API Endpoints

### Player Endpoints

- GET `/teamName` - Get all players
- GET `/teamName/:id` - Get player from team
- POST `/teamName` - Add new player to team
- PUT `/teamName/:id` - Update player information
- DELETE `/teamName/:id` - Remove player from team

### Coaches Endpoints

- GET `/coaches` - Get all coaches
- GET `/coaches/:id` - Get single coach
- POST `/coaches` - Add new coach to list
- PUT `/coaches/:id` - Update coach information
- DELETE `/coaches/:id` - Remove a coach
