import { useContext, useMemo } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { ShoppingListContext } from "./ShoppingListProvider.js";
import { UserContext } from "./UserProvider.js";
import Icon from "@mdi/react";
import { mdiAccountPlus, mdiClose } from "@mdi/js";

function AddMemberModal({ show, onHide }) {
  const { shoppingList, handlerMap } = useContext(ShoppingListContext);
  const { userMap } = useContext(UserContext);

  const candidates = useMemo(() => {
    const allIds = Object.keys(userMap);
    const excluded = new Set(
      [...(shoppingList?.memberList || []), shoppingList?.owner].filter(Boolean)
    );
    return allIds.filter((id) => !excluded.has(id)).map((id) => userMap[id]);
  }, [userMap, shoppingList]);

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add member</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {candidates.length === 0 ? (
          <div className="text-muted small">No available users to add.</div>
        ) : (
          <ListGroup variant="flush">
            {candidates.map((u) => (
              <ListGroup.Item
                key={u.id}
                className="d-flex justify-content-between align-items-center"
              >
                <span>{u.name}</span>
                <Button
                  size="sm"
                  variant="outline-primary"
                  onClick={() => {
                    handlerMap.addMember({ memberId: u.id });
                    onHide?.();
                  }}
                >
                  <Icon path={mdiAccountPlus} size={0.8} className="me-1" />
                  <span className="d-none d-sm-inline">Add</span>
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          <Icon path={mdiClose} size={0.8} className="me-1" />
          <span className="d-none d-sm-inline">Close</span>
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddMemberModal;
