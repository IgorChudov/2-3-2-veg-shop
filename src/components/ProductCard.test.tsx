/* eslint-disable react/react-in-jsx-scope */
import { screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ProductCard } from "./ProductCard";
import { CartPopup } from "./CartPopup";
import type { Product } from "../types/types";
import { renderWithProviders } from "../test/utils";

const product: Product = {
  id: 1,
  name: "Apple - 1kg",
  price: 10,
  image: "/apple.png",
};

describe("ProductCard component tests", () => {
  it("should render the product card correctly", () => {
    renderWithProviders(
      <ProductCard product={product} />
    );

    expect(screen.getByTestId("card-image")).toBeInTheDocument();
    expect(screen.getByTestId("product-name")).toBeInTheDocument();
    expect(screen.getByTestId("product-weight")).toBeInTheDocument();
    expect(screen.getByTestId("minus-action-button")).toBeInTheDocument();
    expect(screen.getByTestId("quantity-text")).toBeInTheDocument();
    expect(screen.getByTestId("plus-action-button")).toBeInTheDocument();
    expect(screen.getByTestId("product-price")).toBeInTheDocument();
    expect(screen.getByTestId("add-button")).toBeInTheDocument();
    
  });

  it("should change quantity of the product by click on action buttons", () => {
    renderWithProviders(
      <ProductCard product={product} />
    );

    fireEvent.click(screen.getByTestId("plus-action-button"));
    expect(screen.getByTestId("quantity-text")).toHaveTextContent("2");

    fireEvent.click(screen.getByTestId("minus-action-button"));
    expect(screen.getByTestId("quantity-text")).toHaveTextContent("1");
  })

  it("should add the product to the cart", () => {
    renderWithProviders(
      <>
        <ProductCard product={product} />
        <CartPopup />
      </>
    );

    fireEvent.click(screen.getByTestId("add-button"));
    expect(screen.getByTestId("cart-image-group")).toBeInTheDocument();
    expect(screen.getByTestId("cart-product-group")).toBeInTheDocument();
    expect(screen.getByTestId("cart-action-group")).toBeInTheDocument();
    expect(screen.getByTestId("cart-total")).toBeInTheDocument();
  })

  it("should change quantity of the product in the cart by click on action buttons in the card", () => {
    renderWithProviders(
      <>
        <ProductCard product={product} />
        <CartPopup />
      </>
    );
    fireEvent.click(screen.getByTestId("add-button"));
    fireEvent.click(screen.getByTestId("plus-action-button"));
    expect(screen.getByTestId("cart-quantity-text")).toHaveTextContent("2");

    fireEvent.click(screen.getByTestId("minus-action-button"));
    expect(screen.getByTestId("cart-quantity-text")).toHaveTextContent("1");
  })
});