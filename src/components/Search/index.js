import {
    StyledSearchWrapper,
    StyledSearchItem,
    StyledSearch
} from "./Search.style"
import {Input} from 'reactstrap';

export const Search = (props) => {
    return(
        <StyledSearchWrapper>
                <Input onChange={text=>props.onSearched(text.target.value)} placeholder="Search a Film..."/>
        </StyledSearchWrapper>
    )
}