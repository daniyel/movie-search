const config = require('config');
const axios = require('axios');

const API_KEY = config.get('omdb.apiKey');
const URL = config.get('omdb.uri');

const createPages = () => {
    return Array.from(
        new Array(
            Math.ceil(config.get('omdb.amount') / config.get('omdb.perPage'))
        ),
        (val, index) => ++index
    );
}

module.exports = {
    index: async(req, res) => {
        const { keyword } = req.query;
        const s = keyword;
        const pages = createPages();

        try {
            const responses = await axios.all(
                pages.map(page => axios.get(URL, {
                    params: { apikey: API_KEY, s, page }
                }))
            );

            const movies = responses.map(response => {
                const { data: { Search, Response } } = response;
                if (Response === 'True') {
                    return Search;
                }
            });

            const moviesFlatten = [].concat(...movies);

            console.log(moviesFlatten);

            res.set('Cache-Control', `private, max-age=${config.get('cache.maxAge')}`);
            res.json(moviesFlatten);
        } catch (err) {
            res.status(400).send(err.message);
        }
    }
};
