import { Product } from '@/presentation/store/products/product.type';
import axios from 'axios';

const ProductService = {
  // Deprecated
  getProducts: async (): Promise<Product[]> => {
    const response = await axios.get(
      `https://easycl.vtexcommercestable.com.br/api/catalog_system/pub/products/search?fq=productClusterIds:466`,
    );
    if (response?.data) {
      return response.data;
    }
    return [];
  },
  getProductsByClusterId: async ({
    clusterId,
    maxItems,
  }: {
    clusterId: string;
    maxItems: number;
  }): Promise<Product[]> => {
    const response = await axios.get(
      `/api/catalog/products/byClusterId/${encodeURIComponent(
        `${clusterId}&_from=0&_to=${maxItems - 1}`,
      )}`,
    );

    if (response?.data) {
      const products = response?.data;
      return products;
    }
    return [];
  },
  getProductsByIds: async (ids: string): Promise<Product[] | null> => {
    const response = await axios.get(
      `/api/catalog/products/byIds/${encodeURIComponent(ids)}`,
    );
    if (response?.data) return response?.data;
    return null;
  },
  getProductsBySkuIds: async (skus: string): Promise<Product[]> => {
    const response = await axios.get(
      `/api/catalog/products/bySkus/${encodeURIComponent(skus)}`,
    );
    if (response?.data) return response?.data;
    return [];
  },
};
export default ProductService;
