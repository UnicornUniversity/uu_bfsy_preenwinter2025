import Icon from "@mdi/react";
import { mdiStickerCheckOutline } from "@mdi/js";

function isEven(n) {
  return n % 2 === 0;
}

function MyComponent(props) {
  return (
    <div style={{ background: isEven(props.index) ? "grey" : undefined }}>
      {`${props.item.amount} ${props.item.name}`}
      {props.item.purchased ? (
        <Icon path={mdiStickerCheckOutline} size={1} />
      ) : null}
    </div>
  );
}

export default MyComponent;
