const express = require('express');
const cors = require('cors');
const config = require('config');

const app = express();
const search = require('./routes/search');
const cache = require('./middlewares/cache');

app.use(cors());

app.get('/api/search', cache(), search.index);

app.listen(config.get('server.port'), () => {
    console.log(`Movie server listening on port ${config.get('server.port')}!`);
});
