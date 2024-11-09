import { Branch } from "hooks/types";
import useClickOutside from "hooks/useClickOutside";
import { useEffect, useRef, useState } from "react";
import Dropdown from "./Dropdown";
import Input from "./Input";
import type { FC, KeyboardEvent } from "react";

interface PROPS {
  items: Branch[];
  selectedItems: Branch[];
  onInputChange: (value: string) => void;
  onItemSelected: (item: Branch) => void;
  onAddItem: () => void;
  showNewItemButton?: boolean;
  onClearInput?: () => void;
}

const Autocomplete: FC<PROPS> = ({
  items,
  selectedItems,
  onInputChange,
  onItemSelected,
  showNewItemButton,
  onAddItem,
  onClearInput, // Destructure the new prop
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const [componentItems, setComponentItems] = useState<Branch[]>(items);
  const inputRef = useRef<HTMLInputElement>(null);

  const clearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = ""; // Clear the input value
      onClearInput?.(); // Trigger the callback when input is cleared
    }
  };

  const handleClickOutside = () => {
    clearInput();
    setIsVisible(false);
    setHighlightedIndex(-1);
    setComponentItems(items);
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const ref = useClickOutside(handleClickOutside);

  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement | HTMLDivElement>
  ) => {
    if (!isVisible) return;

    if (e.key === "ArrowDown") {
      setHighlightedIndex((prev) =>
        prev < items.length - 1 ? prev + 1 : prev
      );
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
      e.preventDefault();
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      onSelectItem(highlightedIndex);
      e.preventDefault();
    }
  };

  const onSelectItem = (itemIndex: number) => {
    const selectedItem = items[itemIndex];
    if (selectedItem) {
      onItemSelected(selectedItem);
    }
  };

  useEffect(() => {
    setComponentItems(items);
  }, [items]);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <Input
        ref={inputRef}
        label=""
        ontouch={toggleVisibility}
        onChange={onInputChange}
        placeholder="Select an item..."
        selectedItems={selectedItems}
      />
      {showNewItemButton && (
        <span style={styles.addItem} onClick={onAddItem}>
          + Add new item
        </span>
      )}
      {isVisible && (
        <Dropdown
          onSelectItem={onSelectItem}
          items={componentItems}
          highlightedIndex={highlightedIndex}
          selectedItems={selectedItems}
        />
      )}
    </div>
  );
};

interface Styles {
  addItem: React.CSSProperties;
}

const styles: Styles = {
  addItem: {
    color: "#e85858",
    fontSize: "12px",
    display: "inline-block",
    padding: "8px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default Autocomplete;
