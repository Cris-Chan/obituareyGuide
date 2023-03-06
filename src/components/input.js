import React, { useState } from "react";
import { useSpring, animated } from "react-spring";

const Input = ({
  onChange,
  value,
  prompt = " ",
  onClick,
  type = "text",
  props,
}) => {
  const [shake, setShake] = useState(false);
  const animation = useSpring({
    transform: shake ? "translate3d(-8px, 0, 0)" : "translate3d(8px, 0, 0)",
  });

  const handleClick = () => {
    if (!value) {
      var flip = 0;
      const intervalId = setInterval(() => {
        flip += 1;
        console.log(flip);
        if (flip % 2 == 0) {
          console.log("flip");
          setShake(false);
        } else {
          console.log("flop");
          setShake(true);
        }
        if (flip > 5) {
          clearInterval(intervalId);
        }
      }, 100);
    } else onClick();
  };

  return (
    <animated.div
      className="w-4/5 flex-1 flex-col justify-center"
      style={animation}
    >
      <div className="w-full flex justify-center text-center">
        <h1 className="text-4xl font-bold text-gray-50">{prompt}</h1>
      </div>
      <div>
        {type === "text" && (
          <input
            value={value}
            onChange={(e) => {
              onChange(e);
            }}
            className="text-3xl font-black text-center my-4 h-16 w-full p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-passaresecondary-100 ring-inset"
            style={{ backgroundColor: "white" }}
          />
        )}
        {type === "number" && (
          <input
            type="number"
            value={value}
            onChange={(e) => {
              onChange(e);
            }}
            className="text-3xl font-black text-center my-4 h-16 w-full p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-passaresecondary-100 ring-inset"
            style={{ backgroundColor: "white" }}
          />
        )}
        {type === "textarea" && (
          <textarea
            value={value}
            onChange={(e) => {
              onChange(e);
            }}
            className="text-3xl font-black text-center my-4 h-32 w-full p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-passaresecondary-100 ring-inset"
            style={{ backgroundColor: "white", scrollPaddingBlock: "10px" }}
          />
        )}
      </div>
      <div className="w-full flex justify-end">
        <button
          onClick={handleClick}
          className="border-white border-4 active:border-passareprimary hover:bg-passaresecondary rounded-sm w-20 h-10 bg-passareprimary text-gray-50"
        >
          Next
        </button>
      </div>
    </animated.div>
  );
};

export default Input;
