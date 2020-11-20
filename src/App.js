import React,{ useState,useEffect, createContext } from 'react';
import './App.css';
import {CardList} from "./components/CardList";
import {Menu} from "./components/Menu";
import {Paginate} from './components/Pagination';
import {MyNavbar} from './components/Navbar';
import {MyCarousel} from './components/Carousel';
import {WatchVideo} from './components/WatchVideo';
import {MyModal} from './components/Modal';
import axios from "axios";
import { DiscoverMenu } from './components/Discover';

let modalFlag=false;

export const MovieContext = createContext(); 

function App(props) {
  const apiKey = "";
  const searchUrl = "https://api.themoviedb.org/3/search/movie";
  // const baseUrl="https://api.themoviedb.org/3/discover/movie";
  const videoUrl="https://api.themoviedb.org/3/movie";
  const youtubeUrl="https://www.youtube.com/watch?v=";
  const genresUrl="https://api.themoviedb.org/3/genre/movie/list";
  const discoverUrl="https://api.themoviedb.org/3/discover/movie";
  const imageUrl="https://image.tmdb.org/t/p/w500";

  const [searchedFilm,setsearchedFilm]=useState("");
  const [movieData, setMovieData] = useState(null);
  const [fragman, setFragman] = useState(null);
  const [totalPages,setTotalPages]=useState(1);
  const [isSearched,setIsSearched] =useState(false);
  const [modalFlag,setModalFlag]=useState(false);
  const [genresData,setGenresData] = useState(false);
  const [peopleData,setPeopleData] = useState();
  const [viewedFilm,setViewedFilm] = useState();
  // important for getting Data, 1:years, 2:genres 3:poplular actors
  const [tab, setTab] = useState(0);  
  const [typeId,setTypeId] = useState(12);
  
  // const [cPage,setCPage] =useState();

  const searchData = (text,pageNo) => {
    // text = text==="" ? "a":text;
    axios.get(searchUrl,{
        params:{
            api_key: apiKey,
            page:pageNo,
            query:text || "a"
        }
    })
    .then((res) => {
        setMovieData(res.data.results);
        setTotalPages(res.data.total_pages);
    })  
    .catch((err) => console.log(err))
  }
  
  const watch=(id)=>{
    axios.get(`${videoUrl}/${id}/videos?api_key=${apiKey}`)
    .then((res) => {
      setFragman(res.data.results[0]);
      setModalFlag(true);
  })  
  .catch((err) => console.log(err));
  //don't delete hier,for modal
  setModalFlag(false) ;
  }

  const searchGenres=()=>{
    axios.get(`${genresUrl}?api_key=${apiKey}`)
    .then((res) => {
      setGenresData(res.data.genres);
    })  
    .catch((err) => console.log(err))
    
  }

  const discoverMovies=(genres,pageNo)=>{
    axios.get(`${discoverUrl}?api_key=${apiKey}&with_genres=${genres}&page=${pageNo}`)
    .then((res) => {
      setMovieData(res.data.results);
      setTotalPages(res.data.total_pages);
    })  
    .catch((err) => console.log(err))
    
  }

  const getPeople=(filmId)=>{
    axios.get(`${videoUrl}/${filmId}/credits?api_key=${apiKey}`)
    .then((res) => {
      setPeopleData(res.data);
      console.log("personelUrl",`${videoUrl}/${filmId}/credits?api_key=${apiKey}`);
      
    })  
    .catch((err) => console.log(err))
  }

  const getMoviesbyYear=(year)=>{
    axios.get(`${discoverUrl}?api_key=${apiKey}&primary_release_date.gte=${year}-01-01&primary_release_date.lte=${year}-12-31`)
    .then((res) => {
      console.log("year:",res);
      
    })  
    .catch((err) => console.log(err))
  }

  useEffect(() =>{
    // searchData(searchedFilm,1);    şimdilik kapattım !!!!!!
    discoverMovies(typeId,1);
    searchGenres();
    getMoviesbyYear(2010)
  },[])

  return (
    <div className="App">
      <MyNavbar onSearched={text=>{
        setsearchedFilm(text)
        setIsSearched(!isSearched)  
        searchData(text,1)   
        //discoverMovies(28,1); şimdilik kapattım !!!!!!
      }}/>
      {/* <MyCarousel/> */}
      <MovieContext.Provider  value={{
          movieData,genresData,totalPages,isSearched,fragman,viewedFilm,peopleData,tab,
          youtubeUrl,imageUrl,
          setTypeId,setViewedFilm,watch,getPeople,setPeopleData,setTab
          }} >
        {/* <Paginate onPageChanged={(currentPage)=>searchData(searchedFilm,currentPage)}/>  şimdilik kapattım !!!!!! */}
        <Paginate onPageChanged={(currentPage)=>discoverMovies(typeId,currentPage)}/>
        <DiscoverMenu onSelected={(id)=>{setTypeId(id)
                                    discoverMovies(id,1);
                                }}/> 
        <CardList />
        {modalFlag && <MyModal/>}
      </MovieContext.Provider>
    </div>
  );
}

export default App;


{/* !!!While I used Context, i deleted next line */}
{/* <Paginate totalPages={totalPages} isSearched={isSearched} onPageChanged={(currentPage)=>searchData(searchedFilm,currentPage)}/> */}
{/* <CardList movieData={movieData} onWatch={watch}/> */}
{/* {modalFlag && <MyModal filmName={fragman.name} fragmanKey={fragman.key} youtubeUrl={youtubeUrl}/>} */}