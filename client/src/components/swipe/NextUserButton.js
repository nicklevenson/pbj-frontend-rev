const NextUserButton = ({ nextCard }) => {
  return (
    <button
      className="button-indigo flex-1 px-5"
      onClick={nextCard}
    >
      Next
    </button>
  );
};

export default NextUserButton;
