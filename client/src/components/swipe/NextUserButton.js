const NextUserButton = ({ nextCard }) => {
  return (
    <button
      className="py-2 px-4 h-full bg-indigo-600 text-white border-gray-500 border-solid border rounded"
      onClick={nextCard}
    >
      Next
    </button>
  );
};

export default NextUserButton;
