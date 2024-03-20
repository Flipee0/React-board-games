import { useState } from "react";

const useToggle = (initial: boolean = false): [boolean, () => void] => {
  const [state, setState] = useState(initial);

  const toggleState = () => {
    setState(!state);
  };

  return [state, toggleState];
};

export default useToggle;
