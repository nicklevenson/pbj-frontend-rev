import { useState, useLayoutEffect } from "react";
import { BsFilter } from "react-icons/bs";
import Div100vh from "react-div-100vh";
import FilterSelections from "./FilterSelections";
import GenericTag from "../tags/GenericTag";
import GenreSelection from "../shared/GenreSelection";
import InstrumentSelection from "../shared/InstrumentSelection";
import ListsApi from "../../api/lists_api";
import RangeSlider from "./RangeSlider";

const Filter = ({ fetchRecs }) => {
  const [displayed, setDisplayed] = useState(false);
  const [instrumentsList, setInstrumentsList] = useState([]);
  const [genresList, setGenresList] = useState([]);
  const [instruments, setInstruments] = useState([]);
  const [genres, setGenres] = useState([]);

  useLayoutEffect(() => {
    setInstrumentsAndGenres();
  }, []);

  const getRecentRange = () => {
    return localStorage.rangeFilter || 500;
  };

  const [rangeSlider, setRangeSlider] = useState(getRecentRange());

  const setInstrumentsAndGenres = async () => {
    const list = await ListsApi.getTagList();

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
    localStorage.setItem("rangeFilter", rangeSlider);
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
    <>
      <div className="z-10 fixed top-0 left-0 w-full">
        <div className="z-20 absolute top-0 left-0 w-full pt-12">
          <div
            className=" bg-white py-1 flex items-center justify-center"
            onClick={() => setDisplayed(!displayed)}
          >
            <BsFilter size={"2rem"} />
          </div>
        </div>

        {displayed && (
          <Div100vh className="bg-white absolute top-0 left-0 w-full">
            <div className="h-full overflow-y-scroll pt-12 pb-48">
              <div className="inner-container">
                <div className="flex flex-col gap-6">
                  <div className="text-center">
                    <RangeSlider
                      rangeSlider={rangeSlider}
                      changeRangeSlider={changeRangeSlider}
                    />
                  </div>
                  <InstrumentSelection
                    list={instrumentsList.filter(
                      (i) => !instruments.includes(i)
                    )}
                    setInstrumentsCallback={setInstrumentsCallback}
                  />

                  <GenreSelection
                    list={genresList.filter((g) => !genres.includes(g))}
                    setGenresCallback={setGenresCallback}
                  />

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
                </div>
              </div>
            </div>

            <div className="fixed bottom-0 left-0 w-full bg-white bg-opacity-90">
              <div className="inner-container">
                <div className="max-w-[350px] mx-auto flex gap-4">
                  <button
                    className="button-blue px-5 flex-1"
                    onClick={sendFilters}
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          </Div100vh>
        )}
      </div>
    </>
  );
};

export default Filter;
