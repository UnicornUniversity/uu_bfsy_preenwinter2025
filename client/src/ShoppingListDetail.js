import { useContext } from "react";
import { UserContext } from "./UserProvider.js";
import { ShoppingListContext } from "./ShoppingListProvider.js";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Form from "react-bootstrap/Form";
import Icon from "@mdi/react";
import {
  mdiPencilOutline,
  mdiContentSave,
  mdiClose,
  mdiAccountPlus,
} from "@mdi/js";

import MemberList from "./MemberList";
import AddMemberModal from "./AddMemberModal";
import { useState } from "react";
import ItemList from "./ItemList";

function ShoppingListDetail(props) {
  const { authUser } = useContext(UserContext);
  const { shoppingList, handlerMap } = useContext(ShoppingListContext);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameDraft, setNameDraft] = useState("");

  return (
    <Container className="py-4">
      <Row className="mb-3">
        <Col>
          <Card>
            <Card.Body className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center gap-2">
                {isEditingName ? (
                  <Form
                    className="d-flex align-items-center gap-2"
                    onSubmit={(e) => {
                      e.preventDefault();
                      handlerMap.updateName({
                        name: nameDraft || shoppingList.name,
                      });
                      setIsEditingName(false);
                    }}
                  >
                    <Form.Control
                      size="sm"
                      value={nameDraft}
                      onChange={(e) => setNameDraft(e.target.value)}
                    />
                    <Button type="submit" size="sm" variant="success">
                      <Icon path={mdiContentSave} size={0.8} className="me-1" />
                      <span className="d-none d-sm-inline">Save</span>
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline-secondary"
                      onClick={() => setIsEditingName(false)}
                    >
                      <Icon path={mdiClose} size={0.8} className="me-1" />
                      <span className="d-none d-sm-inline">Cancel</span>
                    </Button>
                  </Form>
                ) : (
                  <Card.Title className="mb-0">{shoppingList.name}</Card.Title>
                )}
                <Badge bg="secondary">
                  {(shoppingList.owner ? 1 : 0) +
                    shoppingList.memberList.length}{" "}
                  members
                </Badge>
              </div>
              {shoppingList.owner === authUser?.id && !isEditingName ? (
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => {
                    setNameDraft(shoppingList.name || "");
                    setIsEditingName(true);
                  }}
                >
                  <Icon path={mdiPencilOutline} size={0.8} className="me-1" />
                  <span className="d-none d-sm-inline">Edit</span>
                </Button>
              ) : null}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-3">
        <Col md={4}>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <span>Members</span>
              {shoppingList.owner === authUser?.id ? (
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => setShowAddModal(true)}
                >
                  <Icon path={mdiAccountPlus} size={0.8} className="me-1" />
                  <span className="d-none d-sm-inline">Add member</span>
                </Button>
              ) : null}
            </Card.Header>
            <Card.Body className="p-0">
              <MemberList />
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card>
            <Card.Header>Items</Card.Header>
            <Card.Body>
              <ItemList />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <AddMemberModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
      />
    </Container>
  );
}

export default ShoppingListDetail;
