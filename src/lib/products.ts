import apiClient from "./api";
import type { ProductsResponse } from "@/src/types";

export const productsService = {
  async getProducts(limit: number = 12): Promise<ProductsResponse> {
    try {
      const response = await apiClient.get<ProductsResponse>(
        `/products?limit=${limit}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
