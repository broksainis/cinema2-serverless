import axios from 'axios';

// get JSON data from movie and schedule api
const getDataFromApis = async (url) => {
    const { data: response } = await axios(url); 
    return response;
};

// merge movies with schedule
export const mergeMoviesWithSchedule = async (moviesUrl, scheduleUrl) => {
    const movies = await getDataFromApis(moviesUrl);
    const schedule = await getDataFromApis(scheduleUrl);
    movies.forEach(movie => {
        movie.Events = [];
        if (schedule) {
            schedule.forEach(event => {
                if (event.OriginalTitle === movie.OriginalTitle) {
                    movie.Events.push(event);
                }
            })
        }
    });
    return movies;
};