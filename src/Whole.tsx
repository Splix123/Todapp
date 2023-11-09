// Components
import Content from "./components/Content";
import Navbar from "./components/Navbar";

// Types
type Props = {
  selectedListIndex: number;
  setSelectedListIndex: (index: number) => void;
  setSelectedListName: (name: string) => void;
  selectedListName: string;
};

function Whole({
  selectedListIndex,
  setSelectedListIndex,
  setSelectedListName,
  selectedListName,
}: Props) {
  return (
    <>
      <Navbar
        selectedListIndex={selectedListIndex}
        setSelectedListIndex={setSelectedListIndex}
        setSelectedListName={setSelectedListName}
      />
      <Content
        selectedListIndex={selectedListIndex}
        selectedListName={selectedListName}
      />
    </>
  );
}

export default Whole;
