const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const db = require('./db/queries');

const app = express();
const port = 3000;

const staticPath = path.resolve(__dirname, 'trainning-anh-pha');

app.use(express.static(staticPath));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/accounts', db.getAccounts);
app.get('/accounts/:id', db.getAccountById);
app.post('/accounts', db.createAccount);
app.put('/accounts/:id', async (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body;

  console.log("Received update request for userId:", userId);
  console.log("Updated user data:", updatedUser);

  try {
    const result = await db.updateUserInDatabase(userId, updatedUser);
    res.status(200).send(`User with ID ${userId} updated successfully.`);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).send('Failed to update user.');
  }
});

app.delete('/accounts/:id', db.deleteAccount);

// Serve HTML file
app.get('/registration-form/Registration.html', (req, res) => {
  res.sendFile(path.resolve(staticPath, 'registration-form', 'Registration.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
