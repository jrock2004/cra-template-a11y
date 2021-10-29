import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3005;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API endpoints are defined here

app.get('/api/example', (req, res) => {
  return res.send({
    id: '1',
    response: 'Example response',
  });
});

// End of API endpoints are here

app.listen(PORT, () => console.log(`Mock server listening on port ${PORT}!`));
