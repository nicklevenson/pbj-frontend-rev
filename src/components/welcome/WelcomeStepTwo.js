
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import UserApi from "../../api/user-api";
import InstrumentSelection from "../shared/InstrumentSelection";
import GenericTag from "../tags/GenericTag";
import GenreSelection from "../shared/GenreSelection";
import GenericSelection from "../shared/GenericSelection";
import ListsApi from "../../api/lists_api";

const WelcomeStepTwo = () => {
  const navigate = useNavigate();
  const { currentUser, attemptFetchUser } = useOutletContext();

  const [instrumentsList, setInstrumentsList] = useState([]);
  const [genresList, setGenresList] = useState([]);
  const [genericList, setGenericList] = useState([]);
  const [canSubmit, setCanSubmit] = useState(false);

  const setInstrumentsCallback = (instrument) => {
    updateTag(instrument, "instrument", "add");
  };

  const setGenresCallback = (genre) => {
    updateTag(genre, "genre", "add");
  };

  const setGenericCallback = (tag) => {
    updateTag(tag, "generic", "add");
  };

  const setLists = async () => {
    const list = await ListsApi.getTagList();

    setInstrumentsList(list.instruments);
    setGenresList(list.genres);
    setGenericList(list.generic);
  };

  useLayoutEffect(() => {
    setLists();
  }, []);
  
  useEffect(() => {
    if (currentUser) {
      if (currentUser.tags.instruments.length > 0 || currentUser.tags.genres.length > 0 || currentUser.tags.generic.length > 0) {
        setCanSubmit(true);
      } else {
        setCanSubmit(false);
      }
    }
  }, [currentUser]);

  const updateTag = (name, kind, action) => {
    UserApi.updateTag(name, kind, action)
      .then(() => {
        attemptFetchUser();
      }
    );
  }

  if (!currentUser) return null;
    
  const { instruments, genres, generic } = currentUser.tags;

  return (        
    <div className="absolute inset-0 bg-gray-200 w-full h-full z-10 overflow-y-scroll pb-28">
      <h1 className="mt-8 text-2xl font-bold mb-4 text-center">Let's get some peanut butter on that sandwich</h1>
      <div>
        <div className="my-8"></div>
        <InstrumentSelection
          list={instrumentsList.filter((i) => !instruments.includes(i))}
          setInstrumentsCallback={setInstrumentsCallback}
          title="What instruments do you play?"
        />
        
        <div className="w-[80%] mx-auto">
          {instruments.map((inst) => {
            return <GenericTag tag={inst.name} key={Math.random() + inst.name} editable={true} removeTag={() =>
              updateTag(inst.name, "instrument", "remove")
            } />;
          })}
        </div>

        <div className="my-8"></div>
        <GenreSelection
          list={genresList.filter((g) => !genres.includes(g))}
          setGenresCallback={setGenresCallback}
          title="What genres do you like?"
        />

        <div className="w-[80%] mx-auto">
          {genres.map((genre) => {
            return <GenericTag tag={genre.name} key={Math.random() + genre.name} editable={true} removeTag={() =>
              updateTag(genre.name, "genre", "remove")
            } />;
          })}
        </div>

        <div className="my-8"></div>

        <GenericSelection
          list={genericList.filter((g) => !generic.includes(g))}
          setGenericsCallback={setGenericCallback}
        />
          
        <div className="w-[80%] mx-auto">
          {generic.map((gen) => {
            return <GenericTag tag={gen.name} key={Math.random() + gen.name} editable={true} removeTag={() =>
              updateTag(gen.name, "generic", "remove")
            } />;
          })}
        </div>
      </div>

       <div className="fixed z-[10000] bottom-16 w-full flex">
        <button
          className="bg-green-500 text-white rounded p-2 w-[80%] mx-auto"
          onClick={() => {
            navigate("/welcome/step1");
          }}
        >
          Go Back
        </button>
      </div>

      <div className="fixed z-[10000] bottom-4 w-full flex">
        <button className={`${canSubmit ? 'bg-blue-500' : 'bg-gray-300'} text-white rounded p-2 w-[80%] mx-auto`}
          onClick={() => {
            attemptFetchUser();
            navigate("/welcome/step3");
          }}
          disabled={!canSubmit}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default WelcomeStepTwo;