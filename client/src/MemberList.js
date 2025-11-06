import { useContext } from "react";
import Member from "./Member.js";
import { ShoppingListContext } from "./ShoppingListProvider.js";
import ListGroup from "react-bootstrap/ListGroup";

function MemberList() {
  const { shoppingList } = useContext(ShoppingListContext);

  return (
    <ListGroup variant="flush">
      <ListGroup.Item className="bg-light">
        <Member memberId={shoppingList.owner} ownerId={shoppingList.owner} />
      </ListGroup.Item>
      {shoppingList.memberList.map((memberId) => (
        <ListGroup.Item key={memberId}>
          <Member memberId={memberId} ownerId={shoppingList.owner} />
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default MemberList;
