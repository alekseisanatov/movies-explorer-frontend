import React, {useState, useEffect} from "react";
import './MoviesCardList.css';
import Preloader from "../Preloader/Preloader";
import { desktopWidth, tabletWidth} from "../../../utils/constants";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({movies, isLoading, searchError}) {
  const [currentCount, setCurrentCount] = useState(0);
  const [extraFilmNumber, setExtraFilmNumber] = useState(3);
  const [moviesRender, setMoviesRender] = useState([]);

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
  }, [movies]);

  return (
    <>
      <div className={'card-list__line'}>
        <div className="break-line_type_dark"></div>
      </div>
        <div className={'card-list'}>
          <Preloader isActive={isLoading}/>
          {!isLoading && (
            <div className="card-list__movies">
              {moviesRender.map((movie) => {
                return <MoviesCard key={movie.id}
                                   title={movie.nameRU}
                                   duration={movie.duration}
                                   image={movie.image.url}
                                   link={movie.trailerLink} />
              })}
              {searchError !== '' && !isLoading && <h3 className={'card-list__empty card-list__empty_active'}>{searchError}</h3>}
            </div>
          )}
        </div>
      {currentCount < movies.length && <button className={`card-list__button`} onClick={renderExtraFilms}>Ещё</button>}
    </>
  );
};

export default MoviesCardList;