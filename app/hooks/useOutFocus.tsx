import React, { useEffect } from "react";

function outFocus(ref: any, setCurrentState: any) {
  const handler = (e: any) => {
    if (ref) {
      if (!ref?.current?.contains(e.target)) {
        setCurrentState(false);
      }
    }
  };
  document.addEventListener("click", handler);
  return () => document.addEventListener("click", handler);
}

export default outFocus;
