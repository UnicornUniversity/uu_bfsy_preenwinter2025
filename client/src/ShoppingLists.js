import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingListsContext } from "./ShoppingListsProvider.js";
import { UserContext } from "./UserProvider.js";
import CreateShoppingListModal from "./CreateShoppingListModal.js";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Spinner from "react-bootstrap/Spinner";
import Stack from "react-bootstrap/Stack";
import Icon from "@mdi/react";
import { mdiPlus, mdiArchive, mdiArchiveOff } from "@mdi/js";

function ShoppingLists() {
  const { authUser } = useContext(UserContext);
  const {
    shoppingLists,
    isLoadingLists,
    archiveShoppingList,
    unarchiveShoppingList,
  } = useContext(ShoppingListsContext);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showArchived, setShowArchived] = useState(false);

  function getMemberCount(list) {
    return (list.owner ? 1 : 0) + (list.memberList?.length || 0);
  }

  function getItemStats(list) {
    const totalItems = list.itemList?.length || 0;
    const checkedItems =
      list.itemList?.filter((item) => item.purchased).length || 0;
    return { totalItems, checkedItems };
  }

  function handleCreateNew() {
    setShowCreateModal(true);
  }

  function handleArchive(e, listId, isArchived) {
    e.preventDefault();
    e.stopPropagation();
    try {
      if (isArchived) {
        unarchiveShoppingList({ listId });
      } else {
        archiveShoppingList({ listId });
      }
    } catch (error) {
      console.error("Error archiving shopping list:", error);
      alert(error.message || "Failed to archive shopping list");
    }
  }

  const activeLists = shoppingLists.filter((list) => !list.archived);
  const archivedLists = shoppingLists.filter((list) => list.archived);
  const displayedLists = showArchived ? shoppingLists : activeLists;

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>My Shopping Lists</h2>
        <div className="d-flex gap-2">
          {archivedLists.length > 0 && (
            <Button
              variant={showArchived ? "secondary" : "outline-secondary"}
              onClick={() => setShowArchived(!showArchived)}
            >
              <Icon
                path={showArchived ? mdiArchiveOff : mdiArchive}
                size={0.8}
                className="me-1"
              />
              {showArchived
                ? "Hide Archived"
                : `Show Archived (${archivedLists.length})`}
            </Button>
          )}
          <Button variant="primary" onClick={handleCreateNew}>
            <Icon path={mdiPlus} size={0.8} className="me-1" />
            Create New List
          </Button>
        </div>
      </div>

      {isLoadingLists ? (
        <div className="text-center py-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : displayedLists.length === 0 ? (
        <Card>
          <Card.Body className="text-center py-5">
            <p className="text-muted mb-0">
              {showArchived
                ? "No archived shopping lists found."
                : "No shopping lists found."}
            </p>
            {!showArchived && (
              <Button
                variant="primary"
                className="mt-3"
                onClick={handleCreateNew}
              >
                <Icon path={mdiPlus} size={0.8} className="me-1" />
                Create Your First List
              </Button>
            )}
          </Card.Body>
        </Card>
      ) : (
        <Stack gap={3}>
          {displayedLists.map((list) => {
            const memberCount = getMemberCount(list);
            const { totalItems, checkedItems } = getItemStats(list);
            const isOwner = String(list.owner) === String(authUser?.id);
            const isArchived = list.archived || false;

            return (
              <Card
                key={list.id}
                className="shadow-sm"
                as={Link}
                to={`/shoppingListDetail?id=${list.id}`}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  cursor: "pointer",
                  opacity: isArchived ? 0.75 : 1,
                }}
              >
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="flex-grow-1">
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <Card.Title className="mb-0">{list.name}</Card.Title>
                        {isArchived && <Badge bg="secondary">Archived</Badge>}
                      </div>
                      <div className="d-flex gap-3 flex-wrap">
                        <Badge bg="secondary" className="mb-1">
                          {memberCount}{" "}
                          {memberCount === 1 ? "member" : "members"}
                        </Badge>
                        <Badge bg="info" className="mb-1">
                          {checkedItems} / {totalItems} items checked
                        </Badge>
                      </div>
                    </div>
                    {isOwner && (
                      <Button
                        variant={
                          isArchived ? "outline-success" : "outline-warning"
                        }
                        size="sm"
                        onClick={(e) => handleArchive(e, list.id, isArchived)}
                        className="ms-2"
                      >
                        <Icon
                          path={isArchived ? mdiArchiveOff : mdiArchive}
                          size={0.8}
                          className="me-1"
                        />
                        {isArchived ? "Unarchive" : "Archive"}
                      </Button>
                    )}
                  </div>
                </Card.Body>
              </Card>
            );
          })}
        </Stack>
      )}
      <CreateShoppingListModal
        show={showCreateModal}
        onHide={() => setShowCreateModal(false)}
      />
    </Container>
  );
}

export default ShoppingLists;
