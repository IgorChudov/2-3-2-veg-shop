/* eslint-disable react/react-in-jsx-scope */
import { Card, Image, Text, Group, Button, ActionIcon } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { addToCart, increaseQuantity, decreaseQuantity, setProductQuantity } from "../reducers/cartSlice";
import { selectProductInCart, selectProductQuantity } from "../selectors/selectors";
import type { Product } from "../types/types";
import IconMinus from "../assets/minus.svg?react";
import IconPlus from "../assets/plus.svg?react";
import CartIcon from "../assets/cart_icon.svg?react";
import clsx from "clsx";
import classes from "./ProductCard.module.css";

export function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch();
  const inCart = useAppSelector(selectProductInCart(product.id));
  const qty = useAppSelector(selectProductQuantity(product.id));

  const [name, weight] = product.name.split(" - ");

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity: qty }));
    dispatch(setProductQuantity({ productId: product.id, quantity: 1 }));
  };

  const handleIncrease = () => {
    dispatch(setProductQuantity({ productId: product.id, quantity: qty + 1}));
  }

  const handleDecrease = () => {
    dispatch(setProductQuantity({ productId: product.id, quantity: Math.max(1, qty - 1) }));
  }

  return (
    <Card className={classes.card}>
      <Card.Section>
        <Image
          data-testid="card-image"
          className={classes.image}
          src={product.image}
          alt={product.name}
        />
      </Card.Section>
      <Group className={classes.group}>
        <Text data-testid="product-name" className={classes.title}>{name}</Text>
            {weight && <Text data-testid="product-weight" className={classes.weight}>{weight}</Text>}
         {!inCart ? (
          <Group className={clsx(classes.group, classes["group-action"])}>
        <ActionIcon
          data-testid="minus-action-button"
          className={classes.action}
          onClick={handleDecrease}
          variant="default"
          >
          <IconMinus />
          </ActionIcon>
          <Text data-testid="quantity-text" className={classes["action-text"]}>{qty}</Text>
          <ActionIcon
            data-testid="plus-action-button"
            className={classes.action}
            onClick={handleIncrease}
            variant="default"
          >
          <IconPlus />
          </ActionIcon>
          </Group>
           ) : (
            <Group className={clsx(classes.group, classes["group-action"])}>
              <ActionIcon
                data-testid="minus-action-button"
                className={classes.action}
                onClick={() => dispatch(decreaseQuantity(product.id))}
                variant="default">
              <IconMinus />
              </ActionIcon>
              <Text data-testid="quantity-text" className={classes["action-text"]}>{inCart.quantity}</Text>
              <ActionIcon
                data-testid="plus-action-button"
                className={classes.action}
                onClick={() => dispatch(increaseQuantity(product.id))}
                variant="default">
              <IconPlus />
              </ActionIcon>
            </Group>
            )}
      </Group>
      <Group className={clsx(classes.group, classes["price-add-group"])}>
        <Text data-testid="product-price" className={classes.price}>${product.price}</Text>
        <Button
          data-testid="add-button"
          rightSection={<CartIcon className={classes["cart-icon"]} />}
          className={classes["add-button"]}
          color="buttons.6"
          c="buttons.8"
          variant="light"
          onClick={handleAddToCart}>
            Add to cart
        </Button>
      </Group>
    </Card>
  );
}