import React from "react";

const Typography = ({ variant, className, children }) => {
  let Component = "p"; // Default component

  // Handle HTML element mapping
  switch (variant) {
    case "h1":
    case "display-1":
    case "display-2":
    case "display-3":
    case "display-4":
    case "display-5":
      Component = "h1";
      break;
    case "h2":
      Component = "h2";
      break;
    case "h3":
      Component = "h3";
      break;
    case "h4":
      Component = "h4";
      break;
    case "h5":
      Component = "h5";
      break;
    case "h6":
      Component = "h6";
      break;
    default:
      break;
  }

  // Define base classes
  let classes = "text-base font-normal";

  // Handle size variants
  switch (variant) {
    case "display-1":
      classes =
        "text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight";
      break;
    case "display-2":
      classes =
        "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight";
      break;
    case "display-3":
      classes =
        "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight";
      break;
    case "display-4":
      classes =
        "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight";
      break;
    case "display-5":
      classes =
        "text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight";
      break;
    case "h1":
      classes = "text-3xl sm:text-4xl md:text-5xl font-medium";
      break;
    case "h2":
      classes = "text-2xl sm:text-3xl md:text-4xl font-medium";
      break;
    case "h3":
      classes = "text-xl sm:text-2xl md:text-3xl font-medium";
      break;
    case "h4":
      classes = "text-lg sm:text-xl md:text-2xl font-medium";
      break;
    case "h5":
      classes = "text-base sm:text-lg md:text-xl font-medium";
      break;
    case "h6":
      classes = "text-sm sm:text-base md:text-lg font-medium";
      break;
    case "large":
      classes = "text-lg md:text-xl lg:text-2xl";
      break;
    case "hero":
      classes = "text-base md:text-lg lg:text-xl";
      break;
    case "medium":
      classes = "text-base md:text-lg font-medium";
      break;
    case "base-text":
      classes = "text-base md:text-lg";
      break;
    case "small":
      classes = "text-sm md:text-base";
      break;
    default:
      break;
  }

  // Combine classes with any additional className props
  const combinedClasses = `${classes} ${className || ""}`.trim();

  return <Component className={combinedClasses}>{children}</Component>;
};

export default Typography;
