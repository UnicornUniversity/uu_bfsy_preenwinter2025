import Icon from "@mdi/react";
import {
  mdiCheckboxMarkedOutline,
  mdiCheckboxBlankOutline,
  mdiDeleteOutline,
} from "@mdi/js";
import Button from "react-bootstrap/Button";

function Item({ name, amount, purchased, onToggle, onRemove, disabled }) {
  return (
    <div className="d-flex align-items-center justify-content-between py-2 px-2 border-bottom">
      <button
        type="button"
        className="btn btn-link p-0 d-flex align-items-center gap-2 text-decoration-none"
        onClick={onToggle}
        disabled={disabled}
        aria-label={purchased ? "Mark as unpurchased" : "Mark as purchased"}
      >
        <Icon
          path={purchased ? mdiCheckboxMarkedOutline : mdiCheckboxBlankOutline}
          size={1}
          color={purchased ? "#198754" : "#6c757d"}
        />
        <span
          className={purchased ? "text-decoration-line-through text-muted" : ""}
        >
          {amount ? `${amount} ` : ""}
          {name}
        </span>
      </button>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={onRemove}
        disabled={disabled}
      >
        <Icon path={mdiDeleteOutline} size={0.8} className="me-1" />
        <span className="d-none d-sm-inline">Remove</span>
      </Button>
    </div>
  );
}

export default Item;
