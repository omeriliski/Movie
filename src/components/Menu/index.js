import {
    StyledWrapper,
    StyledMenuWrapper, 
    StyledMenuItem,
    StyledSearchWrapper,
    StyledSearchItem,
    StyledSearch
} from "./Menu.style"

export const Menu = (props) => {
    return (
            <StyledWrapper>
                <StyledMenuWrapper>
                    <StyledMenuItem>Home</StyledMenuItem>
                    <StyledMenuItem>Discover</StyledMenuItem>
                    <StyledMenuItem>About us</StyledMenuItem>
                    <StyledMenuItem>Privacy Policy</StyledMenuItem>
                </StyledMenuWrapper>
                
            </StyledWrapper>
    )
}