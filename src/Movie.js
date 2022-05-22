import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useParams } from "react-router-dom";
import { format } from 'date-fns';
import { mergeMoviesWithSchedule } from './api/api';

const moviesFetchUri = '/.netlify/functions/moviesFetch';
const scheduleFetchUri = '/.netlify/functions/scheduleFetch';

function Movie() {
    const param = parseInt(useParams().ID);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchMovieData = async () => {
            try {
                const data = await mergeMoviesWithSchedule(moviesFetchUri, scheduleFetchUri);
                const movieData = data.find(movie => {
                    return movie.ID === param;
                })
                setData(movieData);
            } catch (error) {
                console.error(error.message);
            }
        }
        fetchMovieData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            {data && data.ShortSynopsis &&
                <div>
                    <p>{data.ShortSynopsis}</p>
                </div>
            }
            {data && data.Events && data.Events.length > 0 &&
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Atrašanās vieta</TableCell>
                                <TableCell align="right">Seansa sākums</TableCell>
                                <TableCell align="right">Valoda</TableCell>
                                <TableCell align="right">Veids</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.Events.map((event) => (
                                <TableRow
                                    key={event.ID}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {event.Theatre}
                                    </TableCell>
                                    <TableCell align="right">{format(new Date(event.dttmShowStart), 'yyyy-MM-dd HH:mm')}</TableCell>
                                    <TableCell align="right">{event.SpokenLanguage.Name}</TableCell>
                                    <TableCell align="right">{event.PresentationMethod}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            }
        </div>

    );
}

export default Movie;