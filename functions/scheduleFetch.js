const { XMLParser } = require('fast-xml-parser');
const request = require('request');

const PARSER_OPTIONS = {
    ignoreAttributes: false
};

// app constants
const APOLLO_KINO_SCHEDULE_URL = 'https://www.apollokino.lv/xml/Schedule/';

const getCurrentSchedule = async (url) => {
    return new Promise((resolve, reject) => {
        request(url, (error, res, body) => {
            if (!error && res.statusCode == 200) {
                const parser = new XMLParser(PARSER_OPTIONS);
                const jsonContent = parser.parse(body);
                const shows = jsonContent.Schedule.Shows.Show;
                resolve(shows);
            } else {
                reject(error);
            }
        });
    })
};

module.exports.handler = async (event, context) => {
    const schedule = await getCurrentSchedule(APOLLO_KINO_SCHEDULE_URL);
    return {
        statusCode: 200,
        body: JSON.stringify(schedule)
    }
}