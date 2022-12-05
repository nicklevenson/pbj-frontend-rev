import { GrLocation } from "react-icons/gr";

const LocationBanner = ({ location, distance }) => {
  return (
    <div>
      <div className="flex">
        <GrLocation className="mr-2 my-1" /> <span>{location || "Earth"}</span>
      </div>
      <div className="italic text-gray-500">{distance} Miles Away</div>
    </div>
  );
};

export default LocationBanner;
