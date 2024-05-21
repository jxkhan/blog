const express = require('express')
const app = express()
const routes = require('./routes/routes.js')

app.use(express.json( ))  

app.use("/api/v1/", routes)

try {
    app.listen(3000, () => {
      console.log('Server started on port 3000');
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }



