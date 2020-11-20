import React from "react";
import {Cards} from "../Card";
import {StyledCardWrapper,StyledWrapper} from "../CardList/CardList.style";

export const CardList = (props) => {
    return (
        <>
        <StyledWrapper>
            <StyledCardWrapper>
                {/* {props.movieData && props.movieData.map(movie =>{
                    return <Cards 
                                movie={movie} onWatch={(id)=>props.onWatch(id)}
                    />
                })
            } */}
            <div>Hallooo</div>
            </StyledCardWrapper>
        </StyledWrapper>
        </>
    )
}