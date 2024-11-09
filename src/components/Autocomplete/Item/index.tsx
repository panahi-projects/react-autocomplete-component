import CheckIcon from "assets/check.svg?react";
import CircleIcon from "assets/circle.svg?react";
import styles from "./index.module.css";
import type { FC } from "react";

type Props = {
  className?: string;
  isSelected: boolean;
  isHighlighted: boolean; // New prop to indicate if the item is highlighted
  label: string;
  value: any;
  onClick: (value: any) => void;
};

const Item: FC<Props> = ({
  isSelected,
  isHighlighted,
  label,
  value,
  onClick,
  className = "",
}) => {
  const onItemClick = () => {
    onClick(value);
  };

  return (
    <div
      className={`${styles.container} ${className} ${
        isHighlighted ? styles.highlighted : ""
      }`} // Apply highlighted style if the item is highlighted
      onClick={onItemClick}
    >
      <p>{label}</p>
      <span className={styles.iconRoot}>
        {isSelected ? (
          <CheckIcon color="#38468e" />
        ) : (
          ""
          // <CircleIcon color="#d1d1d1" />
        )}
      </span>
    </div>
  );
};

export default Item;
