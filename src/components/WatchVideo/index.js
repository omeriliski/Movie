import ReactPlayer from 'react-player';
import {StyledVideoWrapper} from './WatchVido.style';
export const WatchVideo=({fragmanKey,youtubeUrl})=>{
    
    return(
        <StyledVideoWrapper>
            {/* playing="true" for autoplay */}
             <ReactPlayer url={`${youtubeUrl}${fragmanKey}`}/>
        </StyledVideoWrapper>
    )
}