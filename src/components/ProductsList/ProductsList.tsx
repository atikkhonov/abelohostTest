"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/src/store/authStore";
import { productsService } from "@/src/lib/products";
import type { Product } from "@/src/types";
import ProductCard from "../ProductCard/ProductCard";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import styles from "./ProductsList.module.scss";

export default function ProductsList() {
  const { isAuthenticated } = useAuthStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await productsService.getProducts(12);
        setProducts(response.products);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load products. Please try again later."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.errorMessage}>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Products</h1>
      <div className={styles.productsGrid}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            showAddToCart={isAuthenticated}
          />
        ))}
      </div>
    </div>
  );
}
