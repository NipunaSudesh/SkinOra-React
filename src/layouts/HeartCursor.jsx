import { useEffect, useRef } from "react";

const HeartCursor = () => {
  const isMouseDown = useRef(false);
  const lastTime = useRef(0);

  useEffect(() => {
    const createHeart = (e) => {
      const now = Date.now();

      // do not create heart when clicking
      if (isMouseDown.current) return;

      // limit heart frequency
      if (now - lastTime.current < 40) return;
      lastTime.current = now;

      const heart = document.createElement("div");
      heart.className = "heart";

      heart.style.left = `${e.clientX}px`;
      heart.style.top = `${e.clientY}px`;

      document.body.appendChild(heart);

      setTimeout(() => heart.remove(), 1000);
    };

    const handleMouseDown = () => {
      isMouseDown.current = true;
    };

    const handleMouseUp = () => {
      isMouseDown.current = false;
    };

    window.addEventListener("mousemove", createHeart);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", createHeart);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return null;
};

export default HeartCursor;
