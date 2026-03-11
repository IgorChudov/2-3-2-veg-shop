/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from "react";
import { Container, SimpleGrid, Title } from "@mantine/core";
import { ProductCard } from "../components/ProductCard";
import { ProductCardSkeleton } from "../components/skeletons/ProductCardSkeleton";
import { Header } from "../components/Header";
import type { Product } from "../types/types";
import classes from "./App.module.css"

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json")
      .then((res) => res.json())
      .then((data) => {
        setTimeout(() => {
          setProducts(data);
          setLoading(false);
        }, 1000);
      });
  }, []);

  return (
    <>
      <Header />
      <Container className={classes.container}>
        <Title
          data-testid="title"
          className={classes.title}
          order={1}>
            Catalog
        </Title>
          <SimpleGrid className={classes.grid} cols={4}>
            {loading
        ? Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)
            : products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </SimpleGrid>
      </Container>
    </>
  );
}

export default App;
