"use client";

import React from "react";
import Lottie from "lottie-react";

interface LottiePlayerProps {
  src: string;
  className?: string;
  loop?: boolean;
}

// Dynamic Lottie loader — accepts path to a JSON file in /public
const LottiePlayer = ({ src, className = "", loop = true }: LottiePlayerProps) => {
  const [animationData, setAnimationData] = React.useState(null);

  React.useEffect(() => {
    fetch(src)
      .then((res) => res.json())
      .then(setAnimationData)
      .catch(console.error);
  }, [src]);

  if (!animationData) return null;

  return (
    <Lottie
      animationData={animationData}
      loop={loop}
      className={className}
    />
  );
};

export default LottiePlayer;
