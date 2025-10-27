import { useState, useEffect, useMemo } from "react";
import Icon from "@mdi/react";
import { mdiStickerCheckOutline, mdiCheckboxBlankOutline } from "@mdi/js";

function isEven(n) {
  return n % 2 === 0;
}

function MyComponent(props) {
  const [purchased, setPurchased] = useState(props.item.purchased);
  const [mouseEntered, setMouseEntered] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setTimeout(() => setTime(new Date()), 1000);
  }, [time]);

  // example of useMemo
  const myTime = useMemo(() => {}, []);

  return (
    <div style={{ background: isEven(props.index) ? "grey" : undefined }}>
      {`${props.item.amount} ${props.item.name}`}
      {time.toLocaleTimeString()}
      <Icon
        style={{ background: mouseEntered ? "grey" : undefined }}
        path={purchased ? mdiStickerCheckOutline : mdiCheckboxBlankOutline}
        size={1}
        color={purchased ? "green" : "red"}
        onMouseEnter={() => setMouseEntered(true)}
        onMouseLeave={() => setMouseEntered(false)}
        onClick={() => setPurchased((current) => !current)}
      />
    </div>
  );
}

export default MyComponent;
