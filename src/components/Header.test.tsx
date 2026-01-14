/* eslint-disable react/react-in-jsx-scope */
import { screen, fireEvent, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Header } from "./Header";
import type { Product } from "../types/types";
import { ProductCard } from "./ProductCard";
import { CartProvider } from "../hooks/useCart";
import { renderWithMantine } from "../test/utils";

const product: Product = {
  id: 1,
  name: "Apple - 1kg",
  price: 10,
  image: "/apple.png",
};

describe("Header component tests", () => {
  it("should render header", () => {
    renderWithMantine(
      <CartProvider>
        <Header />
      </CartProvider>
    );
    expect(screen.getByText(/Vegetable/i)).toBeInTheDocument();
    expect(screen.getByText(/Cart/i)).toBeInTheDocument();
  });

  it("should open and close the cart popup", () => {
    renderWithMantine(
      <CartProvider>
        <Header />
      </CartProvider>
    );

    const button = screen.getByRole("button", { name: /Cart/i });

    fireEvent.click(button);
    expect(screen.getByText(/You cart is empty/i)).toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.queryByText(/You cart is empty/i)).not.toBeInTheDocument();
  });

  it("should render the quantity badge after adding the product to the cart", () => {
    renderWithMantine(
      <CartProvider>
        <Header />
        <ProductCard product={product} />
      </CartProvider>
    );

    const cartBtn = screen.getByTestId("cart-button");
    fireEvent.click(screen.getByTestId("add-button"));
    const quantitySpan = within(cartBtn).getByText("1");
    expect(quantitySpan).toBeInTheDocument();
  });
});