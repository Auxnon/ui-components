import "./Shop.scss";
import { StarRate } from "./StarRate";
import { Cost } from "./Cost";
import { useEffect, useState } from "react";

export const Shop = () => {
  //   const [count, setCount] = useState(0);
  const [bookmark, setBookmark] = useState(false);
  const [imgUrl, setImgUrl] = useState("");

  const bookmarkHandler = () => {
    setBookmark(!bookmark)
  };

  useEffect(() => {
    fetch("https://picsum.photos/200").then((res) => {
      if (res.ok) {
        setImgUrl(res.url);
      }
    });
  }, []);

  return (
    <div className="rounded-2xl bg-slate-50 [&>*]:m-0 p-4">
      <h1 className=" text-xl font-bold">Product Name</h1>
      <div className="flex justify-center items-center">
        <div className=" w-48 h-48 m-4">
          {imgUrl ? (
            <img
              src={imgUrl}
              alt="product"
              className="w-full h-full rounded-2xl"
            />
          ) : (
            <div className="w-full h-full rounded-2xl crossed-pattern"></div>
          )}
        </div>
      </div>
      <div className="flex py-2">
        <div className="flex-grow">
          <Cost></Cost>
          <StarRate></StarRate>
          {/* <div className="ui-shop-price text-left">3.00$</div> */}
        </div>
        <button
          className={`bookmark-icon${
            bookmark ? "" : "-hollow"
          } ui-shop-bookmark grow-0 bg-slate-200 h-12 w-12 sh`}
          onClick={bookmarkHandler}
        ></button>
      </div>
      <button className="primary w-48">Add to Card</button>
    </div>
  );
};
