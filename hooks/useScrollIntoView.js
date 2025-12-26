import { useRef } from "react";

export default function useScrollIntoView() {
  const ref = useRef(null);

  const onFocus = () => {
    setTimeout(() => {
      ref.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 300); // wait for keyboard
  };

  return { ref, onFocus };
}
