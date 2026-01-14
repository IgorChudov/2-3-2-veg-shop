/* eslint-disable react/react-in-jsx-scope */
import { Card, Image, Text, Group, Button, ActionIcon } from "@mantine/core";
import { useState } from "react";
import { useCart } from "../hooks/useCart";
import type { Product } from "../types/types";
import classes from "./ProductCard.module.css";
import clsx from "clsx";
import IconMinus from "../assets/minus.svg?react";
import IconPlus from "../assets/plus.svg?react";
import CartIcon from "../assets/cart_icon.svg?react";

export function ProductCard({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const { addToCart, items, increaseQuantity, decreaseQuantity } = useCart();

  const inCart = items.find((i) => i.id === product.id);

  const [name, weight] = product.name.split(" - ");

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
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          variant="default"
          >
          <IconMinus />
          </ActionIcon>
          <Text data-testid="quantity-text" className={classes["action-text"]}>{qty}</Text>
          <ActionIcon
            data-testid="plus-action-button"
            className={classes.action}
            onClick={() => setQty((q) => q + 1)}
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
                onClick={() => decreaseQuantity(product.id)}
                variant="default">
              <IconMinus />
              </ActionIcon>
              <Text data-testid="quantity-text" className={classes["action-text"]}>{inCart.quantity}</Text>
              <ActionIcon
                data-testid="plus-action-button"
                className={classes.action}
                onClick={() => increaseQuantity(product.id)}
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
          onClick={(() => {addToCart(product, qty)})}>
            Add to cart
        </Button>
      </Group>
    </Card>
  );
}