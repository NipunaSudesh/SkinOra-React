import { useEffect } from "react";

const HeartCursor = () => {
  useEffect(() => {
    let lastTime = 0;

    const createHeart = (e) => {
      const now = Date.now();

      // limit heart creation (performance + smooth trail)
      if (now - lastTime < 40) return;
      lastTime = now;

      const heart = document.createElement("div");
      heart.className = "heart";

      heart.style.left = `${e.clientX}px`;
      heart.style.top = `${e.clientY}px`;

      document.body.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 1000);
    };

    window.addEventListener("mousemove", createHeart);

    return () => {
      window.removeEventListener("mousemove", createHeart);
    };
  }, []);

  return null;
};

export default HeartCursor;
