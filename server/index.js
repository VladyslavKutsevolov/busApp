const express = require('express');

const app = express();
const mongoose = require('mongoose');
const config = require('config');

app.use(express.json({ extended: true }));

// Route files
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));

const PORT = config.get('PORT') || 5000;

async function start() {
  try {
    await mongoose.connect(config.get('mongoURI'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    app.listen(PORT, () => console.log(`Server listen on port: ${PORT}`));
  } catch (error) {
    console.log('Server Error', error.message);
    process.exit(1);
  }
}
start();
