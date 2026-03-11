/* eslint-disable react/react-in-jsx-scope */
import { screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CartPopup } from "./CartPopup";
import { ProductCard } from "./ProductCard";
import type { Product } from "../types/types";
import { renderWithProviders } from "../test/utils";

const product: Product = {
  id: 1,
  name: "Apple - 1kg",
  price: 10,
  image: "/apple.png",
};

describe("CartPopup component test", () => {
  it("should render the cart popup correctly", () => {
    renderWithProviders(
      <>
        <ProductCard product={product} />
        <CartPopup />
      </>
    );

    expect(screen.getByTestId("empty-cart-image")).toBeInTheDocument();
    expect(screen.getByTestId("empty-cart-image")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("add-button"));
    expect(screen.getByTestId("cart-product-image")).toBeInTheDocument();
    expect(screen.getByTestId("cart-product-name")).toBeInTheDocument();
    expect(screen.getByTestId("cart-product-weight")).toBeInTheDocument();
    expect(screen.getByTestId("cart-action-minus")).toBeInTheDocument();
    expect(screen.getByTestId("cart-quantity-text")).toBeInTheDocument();
    expect(screen.getByTestId("cart-action-plus")).toBeInTheDocument();
    expect(screen.getByTestId("cart-product-price")).toBeInTheDocument();
    expect(screen.getByTestId("cart-total")).toBeInTheDocument();
  });

  it("should change quantity of the product in the cart by click on action buttons", () => {
    renderWithProviders(
      <>
        <ProductCard product={product} />
        <CartPopup />
      </>
    );

    fireEvent.click(screen.getByTestId("add-button"));
    fireEvent.click(screen.getByTestId("cart-action-plus"));
    expect(screen.getByTestId("cart-quantity-text")).toHaveTextContent("2");

    fireEvent.click(screen.getByTestId("cart-action-minus"));
    expect(screen.getByTestId("cart-quantity-text")).toHaveTextContent("1");
  })

  it("should change quantity of the product in the card by click on action buttons in the cart", () => {
    renderWithProviders(
      <>
        <ProductCard product={product} />
        <CartPopup />
      </>
    );

    fireEvent.click(screen.getByTestId("add-button"));
    fireEvent.click(screen.getByTestId("cart-action-plus"));
    expect(screen.getByTestId("quantity-text")).toHaveTextContent("2");
    
    fireEvent.click(screen.getByTestId("cart-action-minus"));
    expect(screen.getByTestId("quantity-text")).toHaveTextContent("1");
  })

  it("should delete the product from the cart if it's quantity < 1", () => {
    renderWithProviders(
      <>
        <ProductCard product={product} />
        <CartPopup />
      </>
    );

    fireEvent.click(screen.getByTestId("add-button"));
    fireEvent.click(screen.getByTestId("cart-action-minus"));
    expect(screen.getByTestId("empty-cart-image")).toBeInTheDocument();
  })
});