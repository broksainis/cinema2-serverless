import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Image } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import { format } from 'date-fns'
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
        <Container>
            <Row>
                {data && data.Images &&
                    <Col md={4}>
                        <Image className="d-block mx-auto img-fluid w-100" src={data.Images.EventMediumImagePortrait} fluid={true}></Image>
                    </Col>}
                {data && data.ShortSynopsis &&
                    <Col md={8}>
                        <h1 className="text-center">{data.OriginalTitle}</h1>
                        <p>{data.ShortSynopsis}</p>
                        <p>{data.Genres}</p>
                        <p>{data.RatingLabel}</p>
                    </Col>
                }
            </Row>
            <Row>
                <Col>
                    {data && data.Events && data.Events.length > 0 &&
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Vieta</th>
                                    <th>Seansa sākums</th>
                                    <th>Valoda</th>
                                    <th>Veids</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.Events.map((e, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{e.Theatre}</td>
                                        <td>{format(new Date(e.dttmShowStart), 'yyyy-MM-dd HH:mm')}</td>
                                        <td>{e.SpokenLanguage.Name}</td>
                                        <td>{e.PresentationMethod}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    }
                </Col>
            </Row>
        </Container>
    );
}

export default Movie;