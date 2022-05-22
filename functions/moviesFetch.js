const { XMLParser } = require('fast-xml-parser');
const request = require('request');

const PARSER_OPTIONS = {
    ignoreAttributes: false
};

const APOLLO_KINO_EVENTS_URL = 'https://www.apollokino.lv/xml/Events?listType=NowInTheaters';

const getCurrentMoviesList = async (url) => {
    return new Promise((resolve, reject) => {
        request(url, (error, res, body) => {
            if (!error && res.statusCode == 200) {
                const parser = new XMLParser(PARSER_OPTIONS);
                const jsonContent = parser.parse(body);
                const events = jsonContent.Events.Event;
                resolve(events);
            } else {
                reject(error);
            }
        });
    })
};

module.exports.handler = async (event, context) => {
    const movies = await getCurrentMoviesList(APOLLO_KINO_EVENTS_URL);
    return {
        statusCode: 200,
        body: JSON.stringify(movies)
    }
}