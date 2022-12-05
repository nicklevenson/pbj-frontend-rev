import { useState, useLayoutEffect } from "react";
import RangeSlider from "./RangeSlider";
import { BsFilter } from "react-icons/bs";
import InstrumentSelection from "../shared/InstrumentSelection";
import ListsApi from "../../api/lists_api";
import GenreSelection from "../shared/GenreSelection";

const Filter = ({ fetchRecs }) => {
  const [displayed, setDisplayed] = useState(false);
  const [rangeSlider, setRangeSlider] = useState(500);
  const [instrumentsList, setInstrumentsList] = useState([]);
  const [genresList, setGenresList] = useState([]);
  const [instruments, setInstruments] = useState([]);
  const [genres, setGenres] = useState([]);

  useLayoutEffect(() => {
    setInstrumentsAndGenres();
  }, []);

  const setInstrumentsAndGenres = async () => {
    const list = await ListsApi.getInstrumentsAndGenres();

    setInstrumentsList(list.instruments);
    setGenresList(list.genres);
  };

  const changeRangeSlider = (e) => {
    setRangeSlider(parseInt(e.target.value));
  };

  const sendFilters = () => {
    fetchRecs({
      range: rangeSlider,
      instruments: instruments.length > 0 ? instruments : null,
      genres: genres.length > 0 ? genres : null,
    });
  };

  const setInstrumentsCallback = (instrument) => {
    setInstruments((prev) => [...prev, instrument]);
  };

  const setGenresCallback = (genre) => {
    setGenres((prev) => [...prev, genre]);
  };

  const handleRemoveInstrument = (instrument) => {
    const newInstruments = instruments.filter((inst) => inst !== instrument);
    setInstruments(newInstruments);
  };

  const handleRemoveGenre = (genre) => {
    const newGenres = genres.filter((gr) => gr !== genre);
    setGenres(newGenres);
  };

  return (
    <div className="fixed top-12 z-10 bg-white w-full text-center min-h-[2rem]">
      <div onClick={() => setDisplayed(!displayed)}>
        <BsFilter size={"2rem"} className="mx-auto" />
      </div>
      {displayed && (
        <div>
          <RangeSlider
            rangeSlider={rangeSlider}
            changeRangeSlider={changeRangeSlider}
          />
          <InstrumentSelection
            list={instrumentsList}
            setInstrumentsCallback={setInstrumentsCallback}
          />
          <GenreSelection
            list={genresList}
            setGenresCallback={setGenresCallback}
          />
          {instruments?.map((instrument) => {
            return (
              <div key={instrument}>
                {instrument}{" "}
                {displayed ? (
                  <button onClick={() => handleRemoveInstrument(instrument)}>
                    X
                  </button>
                ) : null}
              </div>
            );
          })}
          <br />
          {genres?.map((genre) => {
            return (
              <div key={genre}>
                {genre}{" "}
                {displayed ? (
                  <button onClick={() => handleRemoveGenre(genre)}>X</button>
                ) : null}
              </div>
            );
          })}
          <hr />
          <button className="connect-button" onClick={sendFilters}>
            Apply
          </button>
        </div>
      )}
    </div>
  );
};

export default Filter;
