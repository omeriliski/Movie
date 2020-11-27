import ReactPlayer from 'react-player';
import {StyledVideoWrapper} from './WatchVido.style';
export const WatchVideo=({fragmanKey,youtubeUrl})=>{
    
    return(
        <StyledVideoWrapper>
             <ReactPlayer url={`${youtubeUrl}${fragmanKey}`}/>
        </StyledVideoWrapper>
    )
}