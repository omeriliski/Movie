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
          <FilmBody className="ml-4" >
            <WatchVideo youtubeUrl={consumer.youtubeUrl} fragmanKey={consumer?.fragman?.key} />
            <FilmDetails className="ml-4">
              <FilmText >
                <Media heading className="mb-4 mt-4">
                  <h6 className="text-danger">IMDB: <span className="text-success">{consumer.viewedFilm.vote_average}</span> </h6>
                </Media>
                <Media heading>
                  <h6 className="text-danger">GENRES: </h6>
                  {consumer.viewedFilm.genre_ids.map(e=><h6 className="text-success" >{consumer.genresData.find(a=>e==a.id).name}</h6>)}
                <Media heading heading className="mt-4">
                  <h6 className="text-danger d-block">RELEASE DATE:</h6>
                  <h6 className="text-success d-block">{consumer.viewedFilm.release_date}</h6>
                </Media>
                <Media heading heading className="mt-4">
                  <h6 className="text-danger d-block">POPULARITY:</h6>
                  <h6 className="text-success d-block">{consumer.viewedFilm.popularity}</h6>
                </Media>    
              </Media>
      
              </FilmText>
              <Actors>
                <Media className="pb-3 border-bottom border-info">
                  <Media >
                    <ActorImage>
                      <img className="rounded border border-success" width="50" height="auto" 
                          src={`${consumer.imageUrl}${consumer.peopleData?.crew.find(e=>e.job=="Director")?.profile_path}`}></img>
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
                    <img className="rounded border border-success" width="50" height="auto" src={`${consumer.imageUrl}${consumer?.peopleData?.cast[0]?.profile_path}`}></img>
                    </ActorImage>
                  </Media>
                  <Media className="pl-2" body>
                    <Media>
                      <h6>{consumer.peopleData?.cast[0]?.name}</h6> 
                    </Media>
                      ({consumer.peopleData?.cast[0]?.character})
                  </Media>
                </Media>

                <Media className="mt-4">
                  <Media>
                    <ActorImage>
                      <img className="rounded border border-success" width="50" height="auto" src={`${consumer.imageUrl}${consumer?.peopleData?.cast[1]?.profile_path}`}></img>
                    </ActorImage>
                  </Media>
                  <Media className="pl-2" body >
                    <Media heading>
                    <h6>{consumer.peopleData?.cast[1]?.name}</h6> 
                    </Media>
                      ({consumer.peopleData?.cast[1]?.character})
                  </Media>
                </Media>
                <Media className="mt-4">
                  <Media>
                    <ActorImage>
                      <img className="rounded border border-success" width="50" height="auto" src={`${consumer.imageUrl}${consumer.peopleData?.cast[2]?.profile_path}`}></img>
                    </ActorImage>
                  </Media>
                  <Media className="pl-2" body>
                    <Media heading>
                    <h6>{consumer.peopleData?.cast[2]?.name}</h6> 
                    </Media>
                      ({consumer.peopleData?.cast[2]?.character})
                  </Media>
                </Media>
              </Actors>
            </FilmDetails>
          </FilmBody>
        </ModalBody>
        <ModalFooter>
        <Media className="text-center">
          {consumer.viewedFilm.overview}
        </Media>
        </ModalFooter>
      </Modal>
    </div>
  );
}
