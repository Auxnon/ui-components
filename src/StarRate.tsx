import { useState } from "react";

export const StarRate = () => {
  const [score, setScore] = useState(2.3);
  const scoreIndex = (() => {
    const arr = [0, 0, 0, 0, 0];
    let i;
    for (i = 0; i < score; i++) {
      arr[i] = 1;
    }
    arr[i - 1] = score - (i - 1);
    console.log(arr);
    return arr;
  })();

  const setFill = (v: number) =>
    ({
      "--fill": Math.round(v * 100) + "%",
    } as React.CSSProperties);

  const rateHandler = (i: number) => {
    setScore(i);
  };

  return (
    <div className="bg-red text-left">
      {[0, 1, 2, 3, 4].map((i) => (
        <button
          className="star-icon h-10 w-10"
          style={setFill(scoreIndex[i])}
          onClick={() => rateHandler(i + 1)}
          key={i}
        ></button>
      ))}
    </div>
  );
};
