"use client";

import React from "react";

const ShareToTwitterButton = () => {
  const handleClick = () => {
    const text = encodeURIComponent(
      "I just made a stunning gradient using Twradial!\n\nTry it here:"
    );
    const url = encodeURIComponent("https://twradial.vercel.app");
    const twitterIntent = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;

    window.open(twitterIntent, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-2 px-4 py-2 cursor-pointer rounded-lg text-sm bg-blue-500 hover:bg-blue-600 text-white transition"
    >
      Share to 
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256"><path d="M245.66,77.66l-29.9,29.9C209.72,177.58,150.67,232,80,232c-14.52,0-26.49-2.3-35.58-6.84-7.33-3.67-10.33-7.6-11.08-8.72a8,8,0,0,1,3.85-11.93c.26-.1,24.24-9.31,39.47-26.84a110.93,110.93,0,0,1-21.88-24.2c-12.4-18.41-26.28-50.39-22-98.18a8,8,0,0,1,13.65-4.92c.35.35,33.28,33.1,73.54,43.72V88a47.87,47.87,0,0,1,14.36-34.3A46.87,46.87,0,0,1,168.1,40a48.66,48.66,0,0,1,41.47,24H240a8,8,0,0,1,5.66,13.66Z"></path></svg>
    </button>
  );
};

export default ShareToTwitterButton;
