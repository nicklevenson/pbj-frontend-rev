import { useState, useLayoutEffect } from "react";
import RangeSlider from "./RangeSlider";
import { BsFilter } from "react-icons/bs";
import InstrumentSelection from "../shared/InstrumentSelection";
import ListsApi from "../../api/lists_api";
import GenreSelection from "../shared/GenreSelection";
import GenericTag from "../tags/GenericTag";
import FilterSelections from "./FilterSelections";

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
    setDisplayed(false);
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
    <div
      className={`fixed top-12 z-10 bg-white w-full text-center ${
        displayed && "max-h-screen min-h-screen"
      } overflow-y-scroll`}
    >
      <div onClick={() => setDisplayed(!displayed)}>
        <BsFilter size={"2rem"} className="mx-auto" />
      </div>
      {displayed && (
        <div className="mb-40">
          <RangeSlider
            rangeSlider={rangeSlider}
            changeRangeSlider={changeRangeSlider}
          />
          <InstrumentSelection
            list={instrumentsList.filter((i) => !instruments.includes(i))}
            setInstrumentsCallback={setInstrumentsCallback}
          />
          <br />
          <GenreSelection
            list={genresList.filter((g) => !genres.includes(g))}
            setGenresCallback={setGenresCallback}
          />
          <br />

          <FilterSelections
            selections={instruments}
            heading={"Plays"}
            removeCallback={handleRemoveInstrument}
          />

          <FilterSelections
            selections={genres}
            heading={"Listens To"}
            removeCallback={handleRemoveGenre}
          />
          <div className="fixed bottom-0 h-20 w-full">
            <button
              className="text-xl font-bold w-52 bg-gray-600 text-white p-2 rounded"
              onClick={sendFilters}
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
