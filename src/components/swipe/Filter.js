import { useState } from "react";
import RangeSlider from "./RangeSlider";
import { BsFilter } from "react-icons/bs";
import InstrumentSelection from "../shared/InstrumentSelection";

const Filter = ({ fetchRecs }) => {
  const [displayed, setDisplayed] = useState(false);
  const [rangeSlider, setRangeSlider] = useState(500);
  const [instruments, setInstruments] = useState([]);
  const [genres, setGenres] = useState([]);

  const changeRangeSlider = (e) => {
    setRangeSlider(parseInt(e.target.value));
  };

  const sendFilters = () => {
    fetchRecs({
      range: rangeSlider,
      instruments: instruments.length > 0 ? instruments : null,
    });
  };

  const setInstrumentsCallback = (instrument) => {
    setInstruments((prev) => [...prev, instrument]);
  };

  const handleRemoveInstrument = (instrument) => {
    const newInstruments = instruments.filter((inst) => inst !== instrument);
    setInstruments(newInstruments);
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
            setInstrumentsCallback={setInstrumentsCallback}
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
