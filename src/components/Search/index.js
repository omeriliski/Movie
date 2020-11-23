import React,{useContext} from 'react';
import {
    StyledSearchWrapper,
    StyledSearchItem,
    StyledSearch
} from "./Search.style"
import {Input} from 'reactstrap';
import { MovieContext } from '../../App';

export const Search = (props) => {
    const consumer = useContext(MovieContext);


    const searched=(text)=>{
        consumer.setTab(0);
        consumer.setText(text);
        consumer.setCurrentPage(1);
        consumer.fetchData();   
        // setIsSearched(!isSearched)  
        // searchData(text,1)
    }
    return(
        <StyledSearchWrapper>
                <Input onChange={(text)=>searched(text.target.value)} placeholder="Search a Film..."/>
        </StyledSearchWrapper>
    )
}