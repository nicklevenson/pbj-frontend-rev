import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Div100vh from "react-div-100vh";
import GenericSelection from "../shared/GenericSelection";
import GenericTag from "../tags/GenericTag";
import GenreSelection from "../shared/GenreSelection";
import InstrumentSelection from "../shared/InstrumentSelection";
import ListsApi from "../../api/lists_api";
import UserApi from "../../api/user-api";

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
    UserApi.updateTag(name, kind, action).then(() => {
      attemptFetchUser();
    });
  };

  if (!currentUser) return null;

  const { instruments, genres, generic } = currentUser.tags;

  return (
    <Div100vh className="z-10 overflow-y-scroll fixed top-0 left-0 w-full bg-white">
      <div className="flex flex-col h-full">
        <div className="bg-gradient-animation pt-12">
          <div className="inner-container flex items-end justify-start">
            <h1 className="text-white text-xl font-bold">
              Let's get some peanut butter on that sandwich
            </h1>
          </div>
        </div>

        <div className="flex-1 pb-12">
          <div className="inner-container flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <InstrumentSelection
                list={instrumentsList.filter((i) => !instruments.includes(i))}
                setInstrumentsCallback={setInstrumentsCallback}
                title="What instruments do you play?"
                submitable={true}
              />

              <div className="flex gap-2">
                {instruments.map((inst) => {
                  return (
                    <GenericTag
                      tag={inst.name}
                      key={Math.random() + inst.name}
                      editable={true}
                      removeTag={() =>
                        updateTag(inst.name, "instrument", "remove")
                      }
                    />
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <GenreSelection
                list={genresList.filter((g) => !genres.includes(g))}
                setGenresCallback={setGenresCallback}
                title="What genres do you like?"
                submitable={true}
              />

              <div className="flex gap-2">
                {genres.map((genre) => {
                  return (
                    <GenericTag
                      tag={genre.name}
                      key={Math.random() + genre.name}
                      editable={true}
                      removeTag={() => updateTag(genre.name, "genre", "remove")}
                    />
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <GenericSelection
                list={genericList.filter((g) => !generic.includes(g))}
                setGenericsCallback={setGenericCallback}
                submitable={true}
              />

              <div className="flex gap-2">
                {generic.map((gen) => {
                  return (
                    <GenericTag
                      tag={gen.name}
                      key={Math.random() + gen.name}
                      editable={true}
                      removeTag={() => updateTag(gen.name, "generic", "remove")}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white bg-opacity-90">
          <div className="inner-container">
            <div className="max-w-[350px] mx-auto flex gap-4">
              <button
                className="flex-1 button-outlined"
                onClick={() => {
                  navigate("/welcome/step1");
                }}
              >
                Go Back
              </button>
              <button
                className={canSubmit ? "flex-1 button-blue" : "flex-1 button-disabled"}
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
        </div>
      </div>
    </Div100vh>
  );
};

export default WelcomeStepTwo;
