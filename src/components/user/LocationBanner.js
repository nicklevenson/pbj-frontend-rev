const LocationBanner = ({ location }) => {
  return (
    <div className="card-location">
      <span className="location">Location: {location || "Earth"}</span>
    </div>
  );
};

export default LocationBanner;
