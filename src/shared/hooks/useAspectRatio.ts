import React, { useEffect, useState } from "react";

const useAspectRatio = (
  element: React.RefObject<HTMLDivElement>,
  aspectRatio: number,
) => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      element.current!.style.height =
        element.current!.offsetWidth * (1 / aspectRatio) + "px";
      setX(element.current!.offsetWidth);
      setY(element.current!.offsetHeight);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [aspectRatio, element]);

  return [x, y];
};

export default useAspectRatio;
