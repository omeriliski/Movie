/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React, { useEffect, useState, useContext} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Media } from 'reactstrap';
import { WatchVideo } from '../WatchVideo';
import { MovieContext } from '../../App';
import { FilmBody, FilmDetails, Actor, ActorImage, ActorDetails, Actors, FilmText } from './Modal.style';

export const MyModal = (props) => {

  const consumer = useContext(MovieContext);
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(true);
  const toggle = () => setModal(!modal);
  console.log(consumer.genresData)
  return (
    <div>
      <Button color="danger" onClick={toggle}>{buttonLabel}</Button>
      <Modal size="xl" isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader cssModule={{ 'modal-title': 'w-100 text-center' }} toggle={toggle}><h3>{consumer.viewedFilm.title.toUpperCase()}</h3></ModalHeader>
        <ModalBody>
          <FilmBody>
            <WatchVideo youtubeUrl={consumer.youtubeUrl} fragmanKey={consumer.fragman.key} />
            <FilmDetails>
              <FilmText>
                <Media heading className="mb-3">
                  <h6 className="text-danger">IMDB: <span className="text-success">{consumer.viewedFilm.vote_average}</span> </h6>
                </Media>
                <Media heading>
                  <h6 className="text-danger">GENRES: </h6>
                  {consumer.viewedFilm.genre_ids.map(e=><h6 className="text-success" >{consumer.genresData.find(a=>e==a.id).name}</h6>)}
                    {/* // consumer.genresData.find(e=>e.id==consumer.viewedFilm.genre_ids[0]).name}
                    // consumer.genresData.find(e=>(consumer.viewedFilm.genre_ids.indexOf(e.id)>-1)).name  */}
                <Media heading heading className="mt-3">
                  <h6 className="text-danger d-block">RELEASE DATE:</h6>
                  <h6 className="text-success d-block">{consumer.viewedFilm.release_date}</h6>
                </Media>
                <Media heading heading className="mt-3">
                  <h6 className="text-danger d-block">POPULARITY:</h6>
                  <h6 className="text-success d-block">{consumer.viewedFilm.popularity}</h6>
                </Media>    
              </Media>
      
              </FilmText>
              <Actors>
                <Media className="pb-3 border-bottom border-info">
                  <Media >
                    <ActorImage>
                      <img className="rounded border border-success" width="60" height="60" 
                          src={`${consumer.imageUrl}${consumer.peopleData?.crew.find(e=>e.job=="Director").profile_path}`}></img>
                    </ActorImage>
                  </Media>
                  <Media className="pl-2" body>
                    <Media>
                      <h6>{consumer.peopleData?.crew.map(e=>e.job=="Director" ? e.name:null)}</h6> 
                    </Media>
                      (Director) 
                  </Media>
                </Media>

                <Media className="mt-4">
                  <Media>
                    <ActorImage>
                      <img className="rounded border border-success" width="60" height="60" src={`${consumer.imageUrl}${consumer.peopleData?.cast[0].profile_path}`}></img>
                    </ActorImage>
                  </Media>
                  <Media className="pl-2" body>
                    <Media>
                      <h6>{consumer.peopleData?.cast[0].name}</h6> 
                    </Media>
                      ({consumer.peopleData?.cast[0].character})
                  </Media>
                </Media>

                <Media className="mt-4">
                  <Media>
                    <ActorImage>
                      <img className="rounded border border-success" width="60" height="60" src={`${consumer.imageUrl}${consumer.peopleData?.cast[1].profile_path}`}></img>
                    </ActorImage>
                  </Media>
                  <Media className="pl-2" body >
                    <Media heading>
                    <h6>{consumer.peopleData?.cast[1].name}</h6> 
                    </Media>
                      ({consumer.peopleData?.cast[1].character})
                  </Media>
                </Media>
                <Media className="mt-4">
                  <Media>
                    <ActorImage>
                      <img className="rounded border border-success" width="60" height="60" src={`${consumer.imageUrl}${consumer.peopleData?.cast[2].profile_path}`}></img>
                    </ActorImage>
                  </Media>
                  <Media className="pl-2" body>
                    <Media heading>
                    <h6>{consumer.peopleData?.cast[2].name}</h6> 
                    </Media>
                      ({consumer.peopleData?.cast[2].character})
                  </Media>
                </Media>
              </Actors>
            </FilmDetails>
          </FilmBody>
        </ModalBody>
        <ModalFooter>
        <Media>
          {consumer.viewedFilm.overview}
        </Media>
          {/* <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button> */}
        </ModalFooter>
      </Modal>
    </div>
  );
}
