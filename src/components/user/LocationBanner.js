import { GrLocation } from "react-icons/gr";

const LocationBanner = ({ location }) => {
  return (
    <div className="card-location flex">
      <GrLocation className="mr-2 my-1" /> <span>{location || "Earth"}</span>
    </div>
  );
};

export default LocationBanner;
