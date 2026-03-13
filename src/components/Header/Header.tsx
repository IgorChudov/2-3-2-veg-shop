/* eslint-disable react/react-in-jsx-scope */
import { Group, Box, Text, Button } from "@mantine/core";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { CartPopup } from "../CartPopup/CartPopup";
import { togglePopup } from "../../reducers/cartSlice";
import { selectTotalCount, selectPopupOpened } from "../../selectors/selectors";
import CartIcon from "../../assets/cart_icon.svg?react";
import classes from './Header.module.css';

export function Header() {
  const dispatch = useAppDispatch();
  const totalQuantity = useAppSelector(selectTotalCount);
  const opened = useAppSelector(selectPopupOpened);

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
            onClick={() => dispatch(togglePopup())}
          >
              Cart
          </Button>
        </Group>
      </Group>
      {opened && <CartPopup />}
    </Box>
  );
}
