/* eslint-disable react/react-in-jsx-scope */
import { useEffect } from "react";
import { Container, SimpleGrid, Title } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { selectIsProductsLoading, selectProducts } from "../selectors/selectors";
import { fetchProducts } from "../reducers/productsSlice";
import { ProductCard } from "../components/ProductCard/ProductCard";
import { ProductCardSkeleton } from "../components/skeletons/ProductCardSkeleton";
import { Header } from "../components/Header/Header";
import classes from "./App.module.css"

function App() {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const loading = useAppSelector(selectIsProductsLoading);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

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
