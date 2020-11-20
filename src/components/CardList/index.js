import React ,{useContext} from "react";
import {Cards} from "../Card";
import {StyledCardWrapper,StyledWrapper} from "./CardList.style";
import {MovieContext} from "../../App";

export const CardList = (props) => {
    const consumer = useContext(MovieContext);
    return (
        <>
        <StyledWrapper>
            <StyledCardWrapper>
                {consumer.movieData && consumer.movieData.map(movie =>{
                    return <Cards 
                                movie={movie}      
                    />
                })
            }
            </StyledCardWrapper>
        </StyledWrapper>
        </>
    )
}