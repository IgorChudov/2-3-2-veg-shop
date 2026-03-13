/* eslint-disable react/react-in-jsx-scope */
import { Paper, Group, Text, ActionIcon, Image, Stack, Divider } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { increaseQuantity, decreaseQuantity, closePopup } from "../../reducers/cartSlice";
import { selectCartItems, selectTotalPrice } from "../../selectors/selectors";
import CartEmpty from "../../assets/cart_empty.svg";
import IconMinus from "../../assets/minus.svg?react";
import IconPlus from "../../assets/plus.svg?react";
import clsx from "clsx";
import classes from "./CartPopup.module.css";

export function CartPopup () {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectTotalPrice);

  return (
    <Paper
      className={classes.paper}
      style={{
        position: "absolute",
        top: 60,
        right: 20,
        zIndex: 1000,
        background: "white",
      }}
    >
      <Stack className={classes.stack}>
        {items.length === 0 ? (
          <Group className={clsx(classes.group, classes["empty-cart-group"])}>
            <Image
              data-testid="empty-cart-image"
              className={classes["empty-cart-image"]}
              src={CartEmpty}
              alt={"Empty cart image"}
            />
            <Text
              data-testid="empty-cart-text"
              className={classes["empty-cart-text"]}>
                You cart is empty!
            </Text>
          </Group>
        ) : (
          items.map((i) => (
            <>
            <Group data-testid="cart-image-group" className={clsx(classes.group, classes["product-group"])} key={i.id}>
              <Image data-testid="cart-product-image" className={classes["cart-image"]}
                src={i.image}
                alt={i.name.split(' - ')[0]}
              />
              <Group className={clsx(classes.group, classes["product-action-group"])}>
                <Group data-testid="cart-product-group" className={clsx(classes.group, classes["product-details-group"])}>
                  <Text data-testid="cart-product-name" className={classes.name}>{i.name.split(' - ')[0]}
                    <span data-testid="cart-product-weight" className={classes.weight}>{i.name.split(' - ')[1]}</span>
                  </Text>
                  <Text data-testid="cart-product-price" className={classes.price}>
                      ${(i.price * i.quantity).toFixed(2)}
                  </Text>
                </Group>
                <Group data-testid="cart-action-group" className={clsx(classes.group, classes["action-group"])}>
                <ActionIcon
                  data-testid="cart-action-minus"
                  className={classes.action}
                  onClick={() => {
                    dispatch(decreaseQuantity(i.id));
                    if (i.quantity === 1) {
                      dispatch(closePopup());
                    }
                  }}
                  variant="default"
                >
                  <IconMinus />
                </ActionIcon>
                <Text data-testid="cart-quantity-text" className={classes["action-text"]}>{i.quantity}</Text>
                <ActionIcon
                  data-testid="cart-action-plus"
                  className={classes.action}
                  onClick={() => dispatch(increaseQuantity(i.id))}
                  variant="default"
                >
                  <IconPlus />
                </ActionIcon>
                </Group>
              </Group>
            </Group>
            <Divider className={classes.divider} />
            </>
          ))
        )}
        {items.length > 0 && <Divider className={clsx(classes.divider, classes["bottom-divider"])} />}
        {items.length > 0 && <Text data-testid="cart-total" className={classes.total}>Total <span className={classes["total-price"]}>${totalPrice}</span></Text>}
      </Stack>
    </Paper>
  );
}
