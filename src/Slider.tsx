import { useEffect, useRef, useState } from "react";
import "./Slider.scss";

export const Slider = () => {
  const val = useRef(0);

  const [sliderX, setSliderX] = useState(0);
  const inputElement = useRef<HTMLInputElement>(null);
  const buttonFadeTimer = useRef<NodeJS.Timeout | null>(null);
  // const renderCount = useRef(0);
  // renderCount.current++;

  const updateSlider = (v: number, fromButton?: boolean) => {
    console.log("update it", v);
    val.current = v;
    const input = inputElement.current;
    if (input) {
      inputElement.current!.value = v.toString();
      const rect = input.getBoundingClientRect();
      const width = rect.width - 16;
      const x = (width * v) / 100 + 72;
      setSliderX(x);

      input.style.setProperty("--background-size", `${val.current}%`);
      if (fromButton) {
        input.parentElement!.style.setProperty("--slider-hint-opacity", "1");
        if (buttonFadeTimer.current) clearTimeout(buttonFadeTimer.current);
        buttonFadeTimer.current = setTimeout(() => {
          input.parentElement!.style.setProperty("--slider-hint-opacity", "0");
        }, 500);
        return () => {
          if (buttonFadeTimer.current) clearTimeout(buttonFadeTimer.current);
        };
      } else {
        input.parentElement!.style.setProperty("--slider-hint-opacity", "1");
      }
    }
  };
  useEffect(() => {
    updateSlider(val.current, true);
  }, []);

  const liftUp = () => {
    sliderChange();
    inputElement.current?.parentElement!.style.setProperty(
      "--slider-hint-opacity",
      "0"
    );
  };

  const sliderChange = () => {
    if (inputElement.current) updateSlider(inputElement.current!.valueAsNumber);
  };

  // console.log("rerendered", renderCount.current);

  const sliderButton = (negative?: boolean) => (
    <button
      onClick={() =>
        negative
          ? val.current > 0
            ? updateSlider(val.current - 1, true)
            : null
          : val.current < 100
          ? updateSlider(val.current + 1, true)
          : null
      }
      className="button-shape flex-none bg-white shadow-slate-10 shadow-lg"
    >
      {negative ? "-" : "+"}
    </button>
  );

  return (
    <div className="ui-slider border-black relative shadow-md bg-slate-50 rounded-2xl flex p-3">
      {sliderButton(true)}
      <input
        ref={inputElement}
        className="flex-grow bg-red-200"
        onChange={sliderChange}
        onPointerUp={liftUp}
        type="range"
        min="0"
        max="100"
      />
      <span className="range-overlay" style={{ left: `${sliderX}px` }}>
        {val.current}
      </span>
      {sliderButton()}
    </div>
  );
};
