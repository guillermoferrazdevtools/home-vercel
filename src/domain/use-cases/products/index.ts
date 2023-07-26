import ProductService  from '@/application/services/products';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getProductsBySkus = createAsyncThunk('/get/catalog/products/skus', async (skus: string) => {
  try {
    const response =  await ProductService.getProductsBySkuIds(skus);
    if(response?.length > 0) return response;
    return []
  } catch (err) {
    console.error('Error on getContent: ', err);
  }
});
