import { ProductModel } from '@/presentation/store/products/product.type';

export type ProductCarouselStruct = {
  clusterId: string;
  items: string;
  fieldName: 'clusterId' | 'skuId' | 'productId';
  onAddToCart: (product: ProductModel) => void;
  maxItems: number;
};
