const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = 3000;
const mongoURI = 'mongodb+srv://himanshi200214:PortfolioHimanshi@cluster0.835yp4q.mongodb.net/<database>?retryWrites=true&w=majority';
const dbName = 'PORTFOLIO_HIMANSHI';

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/submit', (req, res) => {
  const { name, email, subject, message } = req.body;

  MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) {
      console.error('Failed to connect to the database:', err);
      res.sendStatus(500);
      return;
    }

    const db = client.db(dbName);
    const collection = db.collection('contacts');

    collection.insertOne({ name, email, subject, message }, (err, result) => {
      if (err) {
        console.error('Failed to insert the document:', err);
        res.sendStatus(500);
        return;
      }

      console.log('Document inserted successfully');
      res.sendStatus(200);
    });
  });
});

app.listen(3000, () => {
  console.log(`Server is running on port ${port}`);
});
