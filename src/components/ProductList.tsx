import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getAllProducts } from '../api/product.api';
import { Box, Typography } from '@mui/material';
import ProductCard from './ProductCard';
import { Product } from '../types/types';
import { useNavigate } from 'react-router-dom';

interface Props {
  setSelectedItem: (params?: Product) => void;
  closeDrawer?: any;
  selectedItem?: Product;
}

const ProductList: React.FC<Props> = ({ setSelectedItem, closeDrawer }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['product-list'],
    queryFn: async () => getAllProducts()
  });
  const navigate = useNavigate();
  return (
    <div>
      {isLoading && <Typography variant="h5">Loading...</Typography>}
      {error && <Typography variant="h5">Error...</Typography>}
      {data
        ? data?.products?.map((item, index) => (
            <Box
              sx={{ cursor: 'pointer' }}
              key={index + 1}
              onClick={() => {
                navigate(`/product/${item?.id}`);
                setSelectedItem(item);
                closeDrawer();
              }}
            >
              <ProductCard {...item} />
            </Box>
          ))
        : ''}
    </div>
  );
};

export default ProductList;
