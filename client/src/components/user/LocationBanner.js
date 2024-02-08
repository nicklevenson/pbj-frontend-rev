import { GrLocation } from "react-icons/gr";

const LocationBanner = ({ location, distance }) => {
  const renderDistance = () => {
    if (distance === 0) {
      return "Nearby";
    }

    return `${distance} Miles Away`;
  }
  return (
    <div>
      <div className="flex">
        <GrLocation className="mr-2 my-1" /> <span>{location || "Earth"}</span>
      </div>
      <div className="italic text-gray-500">{renderDistance()}</div>
    </div>
  );
};

export default LocationBanner;
