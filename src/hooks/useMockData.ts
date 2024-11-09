import { useState } from "react";
import { Branch } from "./types";

const mockBranches = [
  "Education",
  "Yeeeah, Science",
  "Art",
  "Sport",
  "Games",
  "Health",
];

const useMockBranches = () => {
  const [branches, setBranches] = useState<Branch[]>(
    mockBranches.map((branch, index) => ({ label: branch, value: index }))
  );

  return [branches, setBranches] as const;
};

export default useMockBranches;
