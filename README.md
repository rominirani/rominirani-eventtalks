# TechForward Conference Website

A simple, single-page website for a one-day tech conference. This application displays a schedule of talks and allows users to filter them by category in real-time.

## Features

- **Dynamic Schedule:** The schedule is generated dynamically from a JSON data file.
- **Live Search:** Filter talks by category instantly without a page reload.
- **Automatic Timings:** The application automatically calculates the start and end times for each talk, including breaks.
- **Easy to Customize:** Talk details (titles, speakers, descriptions) can be easily updated by modifying the `talks.json` file.
- **Node.js Backend:** A lightweight Express server to serve the application and data.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/rominirani/rominirani-eventtalks.git
    cd rominirani-eventtalks
    ```

2.  **Install NPM packages:**
    ```sh
    npm install
    ```

### Running the Application

1.  **Start the server:**
    ```sh
    npm start
    ```

2.  **Open in your browser:**
    Navigate to `http://localhost:8080` (or the port you have configured in `server.js`).

## Project Structure

```
.
├── public/
│   ├── app.js         # Frontend JavaScript for DOM manipulation and API calls
│   ├── index.html     # Main HTML file
│   └── styles.css     # CSS for styling
├── .gitignore         # Files and folders to be ignored by Git
├── package.json       # Project metadata and dependencies
├── package-lock.json  # Exact versions of dependencies
├── README.md          # This file
├── server.js          # The Node.js Express server
└── talks.json         # Data file containing all talk information
```

## API Endpoint

The application uses a single API endpoint to fetch the talk data:

- **GET `/api/talks`**

  Returns a JSON array of talk objects. Each object has the following structure:

  ```json
  {
    "title": "The Future of Artificial Intelligence",
    "speakers": ["Dr. Evelyn Reed"],
    "categories": ["AI", "Machine Learning"],
    "duration": 60,
    "description": "A deep dive into the latest advancements in AI..."
  }
  ```

## Technologies Used

- **Backend:** [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/)
- **Frontend:** HTML, CSS, Vanilla JavaScript
