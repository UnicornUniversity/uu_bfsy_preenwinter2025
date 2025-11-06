import { useContext } from "react";
import { UserContext } from "./UserProvider.js";
import { ShoppingListContext } from "./ShoppingListProvider.js";
import Button from "react-bootstrap/Button";
import Icon from "@mdi/react";
import { mdiDeleteOutline } from "@mdi/js";
import Badge from "react-bootstrap/Badge";

function Member({ memberId, ownerId }) {
  const { userMap, authUser } = useContext(UserContext);
  const { handlerMap } = useContext(ShoppingListContext);

  const isOwner = memberId === ownerId;

  const canRemove =
    !isOwner && (authUser?.id === ownerId || authUser?.id === memberId);
  const isYou = authUser?.id === memberId;

  return (
    <div className="d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-center gap-2">
        <span>{userMap[memberId]?.name || `User ${memberId}`}</span>
        {isOwner ? (
          <Badge bg="primary">Owner</Badge>
        ) : isYou ? (
          <Badge bg="light" text="dark">
            You
          </Badge>
        ) : null}
      </div>
      {canRemove ? (
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => handlerMap.removeMember({ memberId })}
        >
          <Icon path={mdiDeleteOutline} size={0.8} className="me-1" />
          <span className="d-none d-sm-inline">Remove</span>
        </Button>
      ) : null}
    </div>
  );
}

export default Member;
