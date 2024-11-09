import { Branch } from "hooks/types";
import styles from "./index.module.css";
import { useEffect, useState, type FC } from "react";
import Item from "../Item";

interface PROPS {
  items: Branch[];
  onSelectItem: (index: number) => void;
  highlightedIndex: number;
  selectedItems: Branch[];
}

const Dropdown: FC<PROPS> = ({
  items,
  onSelectItem,
  highlightedIndex,
  selectedItems,
}) => {
  const [selectedItem, setSelectedItem] = useState<boolean[]>([]);

  useEffect(() => {
    if (items?.length) {
      const initialSelected = items.map((item) =>
        selectedItems.some((selected) => selected.value === item.value)
      );
      setSelectedItem(initialSelected);
    }
  }, [items, selectedItems]);

  const selectItem = (index: number) => {
    const newSelectedItems = [...selectedItem];
    newSelectedItems[index] = !newSelectedItems[index];
    setSelectedItem(newSelectedItems);
    onSelectItem(index);
  };

  return (
    <div className={styles.dropdown}>
      {items.map((item, index) => (
        <Item
          key={item.value}
          isSelected={selectedItem[index]}
          isHighlighted={index === highlightedIndex}
          onClick={() => selectItem(index)}
          value={item.value}
          label={item.label}
        />
      ))}
    </div>
  );
};

export default Dropdown;
