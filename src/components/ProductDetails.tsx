import {
  Box,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Paper,
  Rating,
  useMediaQuery,
  useTheme
} from '@mui/material';
import React from 'react';
import { Product } from '../types/types';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Typography from '@mui/material/Typography';
import { calculateDiscount } from '../utils';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProductById } from '../api/product.api';

import RatingSection from './RatingSection';
import DetailedInfoSection from './DetailedInfoSection';
import { multiImageConfig } from '../config/react-slick';

interface Props {
  selectedItem?: Product;
  setSelectedItem?: any;
  closeDrawer?: () => void;
}

const ProductDetails: React.FC<Props> = () => {
  const { id } = useParams();

  const theme = useTheme();

  const { data, isLoading, error } = useQuery({
    queryKey: ['product-item', id],
    queryFn: async () => getProductById(parseInt(id ?? ''))
  });

  const onlyXsSize = useMediaQuery(theme.breakpoints.only('xs'));

  return (
    <>
      <Container
        maxWidth={'lg'}
        style={{
          display: 'flex',
          height: '100vh',
          backgroundColor: '#eff0f6'
        }}
      >
        {isLoading && (
          <Box sx={{ margin: 'auto' }}>
            <CircularProgress size={30} sx={{ mt: 5 }} />
          </Box>
        )}
        {error && <Typography variant="h5">Error...</Typography>}
        <Box p={2}>
          {data ? (
            <>
              <Paper>
                <Grid container>
                  <Grid
                    container
                    size={{ sm: 6, xs: 12 }}
                    justifyContent={'center'}
                    alignItems={'center'}
                  >
                    <Grid>
                      {data?.thumbnail ? (
                        <img
                          src={data?.thumbnail}
                          alt="thumbnail"
                          style={{ width: '100%' }}
                        />
                      ) : (
                        ''
                      )}
                    </Grid>
                    {data?.images?.length > 1 ? (
                      <Grid size={12}>
                        <Box sx={{ maxWidth: { sm: '500px', xs: '350px' } }}>
                          <Slider {...multiImageConfig}>
                            {data?.images?.length
                              ? data?.images?.map(
                                  (item: string, ind: number) => {
                                    return (
                                      <img
                                        src={item}
                                        alt="slider image"
                                        key={ind + 1}
                                        style={{
                                          width: '50px !important',
                                          height: '50px !important',
                                          objectFit: 'cover'
                                        }}
                                      />
                                    );
                                  }
                                )
                              : ''}
                          </Slider>
                        </Box>
                      </Grid>
                    ) : (
                      ''
                    )}
                  </Grid>
                  <Grid
                    container
                    size={{ sm: 6, xs: 12 }}
                    spacing={2}
                    direction={'column'}
                    pt={3}
                  >
                    <Grid size={12}>
                      <Typography
                        gutterBottom
                        variant="h2"
                        component="div"
                        fontSize={30}
                        align={onlyXsSize ? 'center' : undefined}
                      >
                        {data?.title}
                      </Typography>
                    </Grid>
                    <Grid
                      container
                      size={12}
                      justifyContent={onlyXsSize ? 'center' : undefined}
                    >
                      <Box sx={{ display: 'inline-flex' }}>
                        <Rating
                          name="read-only"
                          value={data?.rating}
                          readOnly
                          size="small"
                        />{' '}
                        <Typography variant="body2" pl={0.8} color="#2162a1">
                          Ratings{' '}
                          {data?.reviews ? `(${data?.reviews?.length})` : ''}
                        </Typography>
                      </Box>
                    </Grid>

                    <Grid
                      size={12}
                      container
                      justifyContent={onlyXsSize ? 'center' : undefined}
                    >
                      <Box sx={{ display: 'inline-flex' }}>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="div"
                          color={'secondary'}
                        >
                          Brand:
                        </Typography>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="div"
                          pl={1}
                        >
                          {data?.brand ? data?.brand : '-'}
                        </Typography>
                      </Box>
                    </Grid>

                    <Grid size={12}>
                      <Divider />
                    </Grid>
                    <Grid
                      size={12}
                      container
                      justifyContent={onlyXsSize ? 'center' : undefined}
                    >
                      <Typography variant="h2" color="#f57224">
                        {data?.discountPercentage
                          ? `Rs ${calculateDiscount(
                              data?.price,
                              data?.discountPercentage
                            )}`
                          : `Rs ${data?.price}`}
                      </Typography>
                    </Grid>
                    <Grid
                      size={12}
                      container
                      justifyContent={onlyXsSize ? 'center' : undefined}
                    >
                      <Box sx={{ display: 'inline-flex' }}>
                        <Typography
                          variant="h5"
                          sx={{
                            color: 'text.secondary',
                            textDecoration: 'line-through'
                          }}
                        >
                          {data?.price ? `Rs ${data?.price}` : ''}
                        </Typography>
                        <Typography variant="h5" pl={1}>
                          {data?.discountPercentage
                            ? `${data?.discountPercentage} %`
                            : ''}
                        </Typography>
                      </Box>
                    </Grid>

                    <Grid size={12}>
                      <Divider />
                    </Grid>

                    <Grid
                      size={12}
                      container
                      justifyContent={onlyXsSize ? 'center' : undefined}
                    >
                      <Box sx={{ display: 'inline-flex' }}>
                        <Typography
                          variant="h5"
                          sx={{
                            color: 'text.secondary'
                          }}
                        >
                          Minimum order quantity:{' '}
                        </Typography>

                        <Typography
                          variant="h5"
                          sx={{
                            color: 'text.secondary'
                          }}
                          pl={1}
                        >
                          {data?.minimumOrderQuantity ?? 0}
                        </Typography>
                      </Box>
                    </Grid>
                    <Divider />

                    <Grid
                      container
                      size={12}
                      justifyContent={onlyXsSize ? 'center' : undefined}
                    >
                      <Grid size={12}>
                        <Typography
                          variant="h4"
                          align={onlyXsSize ? 'center' : undefined}
                        >
                          Returns and Warranty
                        </Typography>
                      </Grid>

                      <Typography
                        variant="h5"
                        sx={{
                          color: 'text.secondary'
                        }}
                      >
                        {data?.returnPolicy ?? ''}
                      </Typography>

                      <Typography
                        variant="h5"
                        sx={{
                          color: 'text.secondary'
                        }}
                      >
                        {data?.warrantyInformation ?? ''}
                      </Typography>
                    </Grid>

                    <Grid container size={12} spacing={0}>
                      <Grid
                        size={12}
                        container
                        justifyContent={onlyXsSize ? 'center' : undefined}
                      >
                        <img
                          src={data?.meta?.qrCode}
                          alt={'qr'}
                          style={{ height: 100, width: 100 }}
                        />
                      </Grid>
                      <Grid size={12}>
                        <Typography
                          variant="body2"
                          align={onlyXsSize ? 'center' : undefined}
                          pl={1}
                          mb={2}
                        >
                          Scan with mobile
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
              <DetailedInfoSection data={data} />
              <RatingSection data={data} />
            </>
          ) : (
            ''
          )}
        </Box>

        {/* {data ? (
          <Box sx={{ display: { sm: 'block', xs: 'none' } }}>
            <div
              style={{
                width: '300px',
                borderLeft: '1px solid #ccc',
                overflowY: 'auto',
                padding: '20px',
                height: '100vh'
              }}
            >
              <ProductList
                setSelectedItem={setSelectedItem}
                selectedItem={selectedItem}
                closeDrawer={closeDrawer}
              />
            </div>
          </Box>
        ) : (
          ''
        )} */}
      </Container>
    </>
  );
};

export default ProductDetails;
