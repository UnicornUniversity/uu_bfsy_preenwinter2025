import { useContext, useMemo, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import { ShoppingListContext } from "./ShoppingListProvider.js";
import { UserContext } from "./UserProvider.js";
import Item from "./Item";
import Icon from "@mdi/react";
import { mdiPlus } from "@mdi/js";

function ItemList() {
  const { shoppingList, handlerMap } = useContext(ShoppingListContext);
  const { authUser } = useContext(UserContext);

  const canEdit = useMemo(() => {
    const id = authUser?.id;
    if (!id) return false;
    return (
      shoppingList.owner === id || shoppingList.memberList.includes(String(id))
    );
  }, [authUser, shoppingList]);

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  function handleAdd(e) {
    e.preventDefault();
    handlerMap.addItem({ name, amount });
    setName("");
    setAmount("");
  }

  return (
    <Stack gap={3}>
      {canEdit ? (
        <Form onSubmit={handleAdd} className="d-flex gap-2">
          <Form.Control
            placeholder="Amount (e.g., 2 l)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{ maxWidth: 160 }}
          />
          <Form.Control
            placeholder="Item name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Button type="submit">
            <Icon path={mdiPlus} size={0.8} className="me-1" />
            <span className="d-none d-sm-inline">Add</span>
          </Button>
        </Form>
      ) : null}

      <ListGroup variant="flush">
        {shoppingList.itemList.map((it, index) => (
          <ListGroup.Item key={`${it.name}-${index}`} className="p-0">
            <Item
              name={it.name}
              amount={it.amount}
              purchased={it.purchased}
              onToggle={() => handlerMap.toggleItemPurchased({ index })}
              onRemove={() => handlerMap.removeItem({ index })}
              disabled={!canEdit}
            />
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Stack>
  );
}

export default ItemList;
