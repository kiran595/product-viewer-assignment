import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../api/product.api';
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import ProductCard from './ProductCard';
import { Product } from '../types/types';
import { useNavigate } from 'react-router-dom';

interface Props {
  setSelectedItem: (params?: Product) => void;
  closeDrawer?: any;
  selectedItem?: Product;
}

const HomeProductList: React.FC<Props> = ({ setSelectedItem, closeDrawer }) => {
  const [itemsPerPage, setItemsPerPage] = useState(0);
  const [skipItem, setSkipItem] = useState(0);

  const [productList, setProductList] = useState<Product[]>([]);

  const handleChangeItemsPerPage = () => {
    setItemsPerPage(itemsPerPage + 8);
    setSkipItem(skipItem + 8);
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['product-list', itemsPerPage],
    queryFn: async () => getAllProducts(8, skipItem)
  });

  useEffect(() => {
    if (data) {
      setProductList([...productList, ...data.products]);
    }
  }, [data]);

  const navigate = useNavigate();
  return (
    <>
      {isLoading && !productList?.length && (
        <Grid
          container
          justifyContent={'center'}
          alignItems={'center'}
          size={12}
        >
          <CircularProgress size={30} sx={{ mt: 5 }} />
        </Grid>
      )}
      {error && <Typography variant="h5">Error...</Typography>}
      <Grid container p={3} spacing={2}>
        <Grid container size={12}>
          {productList?.length
            ? productList?.map((item, index) => (
                <>
                  <Grid size={{ md: 3, sm: 6, xs: 12 }} key={index + 1}>
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
                  </Grid>
                </>
              ))
            : ''}
        </Grid>

        {productList?.length && data && productList?.length < data?.total ? (
          <Grid container size={12} justifyContent={'center'}>
            <Button
              variant="outlined"
              size="large"
              onClick={handleChangeItemsPerPage}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={25} /> : 'Load More'}
            </Button>
          </Grid>
        ) : (
          ''
        )}
      </Grid>
    </>
  );
};

export default HomeProductList;
