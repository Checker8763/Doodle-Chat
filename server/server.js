//TODO: Host Website via express
//TODO: Implement the actual backend with websockets
// Maybe Sqlite or Redis as backend for chat rooms and Notifications

const express = require('express');
const cors = require('cors');

const app = express();

//Middleware
app.use(cors());

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server online at: http://localhost:${port}`))