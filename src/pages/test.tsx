import Autocomplete from "components/Autocomplete";
import { Branch } from "hooks/types";
import useMockBranches from "hooks/useMockData";
import { useEffect, useState, type FC } from "react";

const TestPage: FC = () => {
  const [branches, setBranches] = useMockBranches();
  const [filteredItems, setFilteredItems] = useState<Branch[]>([]);
  const [selectedItems, setSelectedItems] = useState<Branch[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isNewItemButtonVisible, setIsNewItemButtonVisible] =
    useState<boolean>(false);

  useEffect(() => {
    setFilteredItems(branches);
  }, [branches]);

  const onInputChange = (text: string) => {
    setInputValue(text);
    const newBranches = branches.filter((branch) =>
      branch.label.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredItems(text.length ? newBranches : branches);

    const foundItems = filteredItems.filter(
      (x) => x.label.toLowerCase() === text.toLowerCase()
    );

    setIsNewItemButtonVisible(!foundItems.length && text.length > 0);
  };

  const onClearInput = () => {
    setFilteredItems(branches); // Reset filteredItems when input is cleared
  };

  const handleItemSelected = (item: Branch) => {
    const foundItems = selectedItems.filter((x) => x.value === item.value);

    if (!foundItems.length) {
      setSelectedItems((prev) => [...prev, item]);
    } else {
      const newSelectedItems = selectedItems.filter(
        (x) => x.value !== item.value
      );
      setSelectedItems(newSelectedItems);
    }
  };

  const onAddItem = () => {
    const newBranch: Branch = {
      label: inputValue,
      value: branches.length,
    };
    const found = branches.findIndex(
      (x) => x.label.toLowerCase() === newBranch.label.toLowerCase()
    );

    if (found < 0) {
      handleItemSelected(newBranch);
      setBranches([...branches, newBranch]);
      setIsNewItemButtonVisible(false);
    }
  };

  return (
    <main className="page">
      <Autocomplete
        onItemSelected={handleItemSelected}
        items={filteredItems}
        selectedItems={selectedItems}
        onInputChange={onInputChange}
        showNewItemButton={isNewItemButtonVisible}
        onAddItem={onAddItem}
        onClearInput={onClearInput} // Pass the clear input handler
      />
    </main>
  );
};

export default TestPage;
