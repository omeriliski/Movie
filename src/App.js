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
  const apiKey = "24eddd44b256251f253d6d5c6dc7fea0";
  const searchUrl = "https://api.themoviedb.org/3/search/movie";
  // const baseUrl="https://api.themoviedb.org/3/discover/movie";
  const videoUrl="https://api.themoviedb.org/3/movie";
  const youtubeUrl="https://www.youtube.com/watch?v=";
  const genresUrl="https://api.themoviedb.org/3/genre/movie/list";
  const discoverUrl="https://api.themoviedb.org/3/discover/movie";
  const imageUrl="https://image.tmdb.org/t/p/w500";
  const popularPeopleUrl="https://api.themoviedb.org/3/person/popular";

  const [searchedFilm,setsearchedFilm]=useState("");
  const [movieData, setMovieData] = useState(null);
  const [fragman, setFragman] = useState(null);
  const [totalPages,setTotalPages]=useState(1);
  const [isSearched,setIsSearched] =useState(false);
  const [modalFlag,setModalFlag]=useState(false);
  const [genresData,setGenresData] = useState(false);
  const [peopleData,setPeopleData] = useState();
  const [popularPeopleData,setPopularPeopleData] = useState();
  const [viewedFilm,setViewedFilm] = useState();
  const [currentPage,setCurrentPage] = useState(1);
  const [year1,setYear1] = useState();
  const [year2,setYear2] = useState();
  const [personId,setPersonId]=useState();
  const [text,setText] = useState();

  // important for getting Data, 1:years, 2:genres 3:poplular actors
  const [tab, setTab] = useState(0);  
  const [genresId, setGenresId] = useState(12);
  
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
      console.log(res);
      console.log("genres:",genres);
      console.log("pageNo:",pageNo);
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

  const getMoviesbyYear=(year1,year2,pageNo)=>{
    axios.get(`${discoverUrl}?api_key=${apiKey}&primary_release_date.gte=${year1}-01-01&primary_release_date.lte=${year2}-12-31&page=${pageNo}`)
    .then((res) => {
      setMovieData(res.data.results);
      setTotalPages(res.data.total_pages);
    })  
    .catch((err) => console.log(err))
  }

  const getMoviesbyPerson=(personId,pageNo)=>{
    console.log(`${discoverUrl}?api_key=${apiKey}&with_people=${personId}&page=${pageNo}`)
    axios.get(`${discoverUrl}?api_key=${apiKey}&with_people=${personId}&page=${pageNo}`)
    .then((res) => {
      
      console.log("PersonMovies:",res);
      setMovieData(res.data.results);
      setTotalPages(res.data.total_pages);
    })  
    .catch((err) => console.log(err))
  }

  const getPopularPeople=()=>{
    axios.get(`${popularPeopleUrl}?api_key=${apiKey}&page=1`)
    .then((res) => {
      setPopularPeopleData(res.data.results);
    })  
    .catch((err) => console.log(err))
  }

  const fetchData=()=>{
    getPopularPeople();
    searchGenres();
    console.log("TABBBBB",tab);
    switch (tab) {
      case 0:
        console.log("text:",text,"Currentpage:",currentPage);
        searchData(text,currentPage) 
        break;
      case 1:
          getMoviesbyYear(year1,year2,currentPage);
        break;
        case 2:
          discoverMovies(genresId,currentPage);
        break;
        case 3:
          getMoviesbyPerson(personId,currentPage);
        break;
      default:
        break;
    }
  }

  useEffect(() =>{
    fetchData();
  },[year1,currentPage,text,genresId,personId])
  

  return (
    <div className="App">
      <MovieContext.Provider  value={{
        movieData,genresData,totalPages,isSearched,fragman,viewedFilm,peopleData,tab,currentPage,
        youtubeUrl,imageUrl,genresId,year1,year2,popularPeopleData,
        setViewedFilm,setPeopleData,setTab,setGenresId,setCurrentPage,setText,setYear1,setYear2,setPersonId,
        discoverMovies,fetchData,watch,getPeople
        }} >

        <MyNavbar onSearched={text=>{
            
          //discoverMovies(28,1); şimdilik kapattım !!!!!!
        }}/>
        {/* <MyCarousel/> */}
        {/* <Paginate onPageChanged={(currentPage)=>searchData(searchedFilm,currentPage)}/>  şimdilik kapattım !!!!!! */}
        <Paginate />
        <DiscoverMenu/> 
        <CardList />
        {modalFlag && <MyModal/>}
      </MovieContext.Provider>
    </div>
  );
}

export default App;