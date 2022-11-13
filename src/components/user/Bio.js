const Bio = ({ bio }) => {
  return <div className="card-bio">{bio ? bio : "I'm a musician!"}</div>;
};

export default Bio;
