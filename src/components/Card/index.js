import React,{useState,useContext} from 'react';
import {StyledCardWrapper, StyledOverview, StyledText,StyledTextWrapper} from "./Card.style"
import {
      Card, CardImg, CardBody,
      CardTitle, CardSubtitle, Button,
    } from 'reactstrap'; 
import { MovieContext } from '../../App';

const baseImageUrl = "https://image.tmdb.org/t/p/w500";
export const Cards = (props) => {
    const consumer = useContext(MovieContext);

    return(
        <StyledCardWrapper>
            <Card  width="14rem">
                <CardImg top width="100%" height="300px" src={`${baseImageUrl}${props.movie.poster_path}`} alt="Card image cap" />
                <CardBody >
                    <StyledTextWrapper>
                        <CardTitle tag="h6">{props.movie.title}</CardTitle>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">IMDB: {props.movie.vote_average}</CardSubtitle>
                    </StyledTextWrapper>
                    <Button outline color="info"
                        onClick={() => {
                            consumer.setViewedFilm(props.movie);
                            consumer.watch(props.movie.id);
                            consumer.getPeople(props.movie.id);
                            
                        }}
                    >More</Button>
                </CardBody>
            </Card>
        </StyledCardWrapper>
    )
}