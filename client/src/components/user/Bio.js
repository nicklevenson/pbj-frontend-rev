const Bio = ({ bio }) => {
  return (
    <div className="italic text-slate-600">{bio ? bio : "I'm a musician!"}</div>
  );
};

export default Bio;
