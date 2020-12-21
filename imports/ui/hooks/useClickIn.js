import React, {useEffect, useState, useCallback, useRef} from "react";

const useClickIn = (ref) => {
  const [value, setValue] = useState(true);
  const [isInElement, setIsInElement] = useState(false);

  const setMouseIn = () => {
    setIsInElement(true)
  }
  const setMouseOut = () => {
    setIsInElement(false)
  }

  const mouseClick = useCallback((e) => {
    if (isInElement) {
      setValue(true)
    } else {
      setValue(false)
    }
  }, [isInElement, ref.current])

  const setRef = useCallback(node => {
    if (ref.current) {
      document.removeEventListener('click', mouseClick, false);
      ref.current.removeEventListener("mouseleave", setMouseOut, false);
      ref.current.removeEventListener("mouseenter", setMouseIn, false);
    }
    setValue(true);
    if (node) {
      document.addEventListener('click', mouseClick, false);
      node.addEventListener("mouseleave", setMouseOut, false);
      node.addEventListener("mouseenter", setMouseIn, false);
    }
    ref.current = node;
  }, [mouseClick])

  return [setRef, value]
}

export default useClickIn