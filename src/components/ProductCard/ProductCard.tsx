import type { Product } from "@/src/types";
import styles from "./ProductCard.module.scss";

interface ProductCardProps {
  product: Product;
  showAddToCart: boolean;
}

export default function ProductCard({
  product,
  showAddToCart,
}: ProductCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img
          src={product.thumbnail}
          alt={product.title}
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{product.title}</h3>
        <p className={styles.category}>{product.category}</p>
        <p className={styles.price}>${product.price.toFixed(2)}</p>
        {showAddToCart && (
          <button className={styles.addToCartButton}>Add to cart</button>
        )}
      </div>
    </div>
  );
}
