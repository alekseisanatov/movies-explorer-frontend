import React, {useState, useEffect} from "react";
import './MoviesCardList.css';
import Preloader from "../Preloader/Preloader";
import { desktopWidth, tabletWidth} from "../../../utils/constants";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({movies, isLoading, searchError, isSavedMoviesPage, isMovieAdded, onMovieClick}) {
  const [currentCount, setCurrentCount] = useState(0);
  const [extraFilmNumber, setExtraFilmNumber] = useState(3);
  const [moviesRender, setMoviesRender] = useState([]);
  const [isItFirstTimeOnPage, setItIsFirstTimeOnPage] = useState(true);

  useEffect(() => {
    if(localStorage.getItem('filteredMovies') || isLoading) {
      setItIsFirstTimeOnPage(false);
    }
  }, [])

  useEffect(() => {
    if(localStorage.getItem('filteredMovies') || isLoading) {
      setItIsFirstTimeOnPage(false);
    }
  }, [isLoading])

  const getCountData = (windowWidth) => {
    if (windowWidth < tabletWidth) {
      return { firstRender: 5, extraRender: 1};
    } else if (windowWidth >= tabletWidth && windowWidth <= desktopWidth) {
      return { firstRender: 7, extraRender: 2};
    }
    return {firstRender: 12, extraRender: 3};
  }

  const renderExtraFilms = () => {
    const count = Math.min(movies.length, currentCount + extraFilmNumber);
    const extraMoviesList = movies.slice(currentCount, count);
    setMoviesRender([...moviesRender, ...extraMoviesList]);
    setCurrentCount(count);
  }

  const handleResize = () => {
    const windowSize = window.innerWidth;
    setExtraFilmNumber(getCountData(windowSize));
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const windowSize = window.innerWidth;
    setExtraFilmNumber(getCountData(windowSize).extraRender);
    const count = Math.min(movies.length, getCountData(windowSize).firstRender);
    setMoviesRender(movies.slice(0, count));
    setCurrentCount(count);
  }, [movies, onMovieClick]);

  return (
    <>
      <div className={'card-list__line'}>
        <div className="break-line_type_dark"></div>
      </div>
        <div className={'card-list'}>
          <Preloader isActive={isLoading}/>
          {searchError === '' && isItFirstTimeOnPage && !isSavedMoviesPage && <div className={'card-list__empty card-list__empty_active'}>Введите название фильма</div>}
          {!isLoading && !isSavedMoviesPage && (
            <div className="card-list__movies">
              {moviesRender.map((movie) => {
                return <MoviesCard key={movie.id}
                                   movie={movie}
                                   isMovieAdded={isMovieAdded}
                                   onMovieClick={onMovieClick}
                                   isSavedMoviesPage={isSavedMoviesPage}/>
              })}
              {searchError !== '' && !isLoading && <h3 className={'card-list__empty card-list__empty_active'}>{searchError}</h3>}
            </div>
          )}
          {!isLoading && isSavedMoviesPage &&
            (
              <div className={'card-list__movies'}>
                {movies.map((movie) => {
                  return <MoviesCard key={Math.random(0, 1500)}
                                     movie={movie}
                                     onMovieClick={onMovieClick}
                                     isMovieAdded={isMovieAdded}
                                     isSavedMoviesPage={isSavedMoviesPage}/>
                })}
                {searchError !== '' && !isLoading && <h3 className={'card-list__empty card-list__empty_active'}>{searchError}</h3>}
              </div>
            )
          }
        </div>
      {currentCount < movies.length && !isSavedMoviesPage && !isLoading && <button className={`card-list__button`} onClick={renderExtraFilms}>Ещё</button>}
    </>
  );
};

export default MoviesCardList;