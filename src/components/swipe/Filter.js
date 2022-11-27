import { useState } from "react";
import RangeSlider from "./RangeSlider";

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
    });
  };

  return (
    <div className="fixed top-12 z-10 bg-white w-full text-center min-h-[2rem]">
      <div onClick={() => setDisplayed(!displayed)}>Filter</div>
      {displayed && (
        <div>
          <RangeSlider
            rangeSlider={rangeSlider}
            changeRangeSlider={changeRangeSlider}
          />
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
