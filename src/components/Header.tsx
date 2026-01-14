/* eslint-disable react/react-in-jsx-scope */
import { Group, Box, Text, Button } from "@mantine/core";
import { useState } from "react";
import { CartPopup } from "./CartPopup";
import { useCart } from "../hooks/useCart";
import classes from './Header.module.css'
import CartIcon from "../assets/cart_icon.svg?react"

export function Header() {
  const [opened, setOpened] = useState(false);
  const { items } = useCart();
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Box className={classes.box}>
      <Group className={classes.group}>
        <Text className={classes.title}>
          Vegetable <span className={classes.highlight}>SHOP</span>
        </Text>
        <Group>
          <Button
            data-testid="cart-button"
            className={classes.button}
            leftSection={totalQuantity > 0 ? (
            <span data-testid="quantity" className={classes.badge}>{totalQuantity}</span>
          ) : null}
            rightSection={<CartIcon />}
            color="buttons.6"
            onClick={() => setOpened((o) => !o)}
          >
              Cart
          </Button>
        </Group>
      </Group>
      {opened && <CartPopup />}
    </Box>
  );
}