import ChevronDownIcon from "assets/chevron-down.svg?react";
import { useEffect, useRef, useState, forwardRef } from "react";
import useDebounce from "hooks/useDebounce";
import styles from "./index.module.css";
import type { Branch } from "hooks/types";

interface Props {
  className?: string;
  label: string;
  placeholder: string;
  ontouch: () => void;
  onChange: (text: string) => void;
  selectedItems: Branch[];
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      className = "",
      label,
      placeholder,
      ontouch,
      onChange,
      selectedItems,
      onKeyDown,
    },
    ref
  ) => {
    const [query, setQuery] = useState<string>("");
    const debouncedQuery = useDebounce(query, 600);

    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      setQuery(newValue);
    };

    const handleFocusClick = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    // Sync the parent ref with the internal input ref
    useEffect(() => {
      if (ref && typeof ref === "object" && ref !== null) {
        ref.current = inputRef.current;
      }
    }, [ref]);

    useEffect(() => {
      onChange(debouncedQuery);
    }, [debouncedQuery]);

    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }, [selectedItems]);

    return (
      <div
        onFocus={ontouch}
        onClick={handleFocusClick}
        className={`${styles.inputRoot} ${className}`}
      >
        <label htmlFor="text-field">{label}</label>
        <div className={styles.inputWrapper}>
          {selectedItems.map((item) => (
            <span key={item.value} className={styles.selectedItem}>
              {item.label}
            </span>
          ))}
          <div className="relative">
            <input
              id="text-field"
              placeholder={placeholder}
              onChange={handleChange}
              onKeyDown={onKeyDown}
              ref={inputRef}
            />
            <button className={styles.toggleBtn}>
              <ChevronDownIcon />
            </button>
          </div>
        </div>
      </div>
    );
  }
);

Input.displayName = "Input"; // Required when using forwardRef in TypeScript

export default Input;
