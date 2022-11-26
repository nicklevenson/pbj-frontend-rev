import GenericTag from "./GenericTag";

const Instruments = ({ instruments }) => {
  return (
    <div className="card-tags">
      <b>Plays </b>
      {instruments.map((inst) => {
        return <GenericTag tag={inst.name} key={Math.random() + inst.name} />;
      })}
    </div>
  );
};

export default Instruments;
