import Icon from "@mdi/react";
import { mdiCheckboxMarkedOutline, mdiCheckboxBlankOutline } from "@mdi/js";
import Button from "react-bootstrap/Button";

function Item(props) {
  return (
    <div>
      <Icon
        path={
          props.checked ? mdiCheckboxMarkedOutline : mdiCheckboxBlankOutline
        }
        size={2}
        color={props.checked ? "green" : "red"}
      />
      {props.name}
      <Button variant="danger">Danger</Button>
    </div>
  );
}

export default Item;
