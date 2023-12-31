import { useEffect } from "react";

export const useClickOutside = (ref, action) => {
  useEffect(() => {
    const handleClickOutside = (event) =>
      ref.current && !ref.current.contains(event.target) && action();
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref]);
};
