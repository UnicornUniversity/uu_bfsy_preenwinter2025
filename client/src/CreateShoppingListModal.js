import { useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { ShoppingListsContext } from "./ShoppingListsProvider.js";
import { UserContext } from "./UserProvider.js";
import Icon from "@mdi/react";
import { mdiClose, mdiContentSave } from "@mdi/js";

function CreateShoppingListModal({ show, onHide }) {
  const { createShoppingList } = useContext(ShoppingListsContext);
  const { authUser } = useContext(UserContext);
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const trimmedName = name.trim();
    if (!trimmedName) {
      setError("Shopping list name is required");
      return;
    }

    setSubmitting(true);
    try {
      createShoppingList({ name: trimmedName });
      setName("");
      onHide?.();
    } catch (err) {
      setError(err?.message || "Failed to create shopping list");
    } finally {
      setSubmitting(false);
    }
  }

  function handleClose() {
    if (!submitting) {
      setName("");
      setError("");
      onHide?.();
    }
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create New Shopping List</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <Form.Group className="mb-3">
            <Form.Label>List Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter shopping list name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={submitting}
              required
              autoFocus
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
            disabled={submitting}
          >
            <Icon path={mdiClose} size={0.8} className="me-1" />
            <span className="d-none d-sm-inline">Cancel</span>
          </Button>
          <Button variant="primary" type="submit" disabled={submitting}>
            <Icon path={mdiContentSave} size={0.8} className="me-1" />
            <span className="d-none d-sm-inline">
              {submitting ? "Creating..." : "Create"}
            </span>
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default CreateShoppingListModal;

