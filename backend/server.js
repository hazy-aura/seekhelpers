const express = require('express');
const cors = require('cors');
const connectDB = require('./db/connection');
require('dotenv').config();
const taskRoutes = require('./routes/task.routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', taskRoutes);

const port = process.env.PORT || 3000;

connectDB();
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})