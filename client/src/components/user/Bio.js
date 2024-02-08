const Bio = ({ bio }) => {
  return (
    <div className="italic text-gray-600">{bio ? bio : "I'm a musician!"}</div>
  );
};

export default Bio;
