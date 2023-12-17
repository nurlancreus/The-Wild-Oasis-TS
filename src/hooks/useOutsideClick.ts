import { useEffect, useRef } from "react";

export function useOutsideClick<T extends HTMLElement>(
  handler: () => void,
  listeningCapture = true
) {
  const modalRef = useRef<T>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (modalRef.current && !modalRef.current.contains(target)) {
        handler();
      }
    };

    document.addEventListener("click", handleClick, listeningCapture);

    return () =>
      document.removeEventListener("click", handleClick, listeningCapture);
  }, [handler, listeningCapture]);

  return modalRef;
}
