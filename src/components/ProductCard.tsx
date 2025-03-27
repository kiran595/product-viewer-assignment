import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Product } from '../types/types';
import { Box, Chip, Grid, Rating } from '@mui/material';
import { calculateDiscount, stockStatus } from '../utils';

const ProductCard: React.FC<Product> = (item) => {
  return (
    <Card sx={{ maxWidth: 345, mb: 2 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={item?.thumbnail}
          alt={'item card'}
        />
        <CardContent>
          <Grid container>
            <Grid container size={12} justifyContent={'flex-end'}>
              <Chip
                label={stockStatus(item?.availabilityStatus ?? '')}
                size="small"
                color={
                  item?.availabilityStatus?.toLowerCase() === 'low stock'
                    ? 'default'
                    : 'success'
                }
                sx={{ mb: 1 }}
              />
            </Grid>
            <Grid size={12}>
              <Typography gutterBottom variant="h4" component="div">
                {item?.brand ? `${item?.brand} -` : ''} {item?.title}
              </Typography>
            </Grid>
            <Grid size={12}>
              <Typography gutterBottom variant="h5" component="div">
                Category: {item?.category}
              </Typography>
            </Grid>

            <Grid size={12}>
              <Typography variant="h4" color="#f57224">
                {item?.discountPercentage
                  ? `Rs ${calculateDiscount(
                      item?.price,
                      item?.discountPercentage
                    )}`
                  : `Rs ${item?.price}`}
              </Typography>
            </Grid>
            <Grid size={12}>
              <Box sx={{ display: 'inline-flex' }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    textDecoration: 'line-through'
                  }}
                >
                  {item?.price ? `Rs ${item?.price}` : ''}
                </Typography>
                <Typography variant="body2" pl={1}>
                  {item?.discountPercentage
                    ? `${item?.discountPercentage} %`
                    : ''}
                </Typography>
              </Box>
            </Grid>
            <Grid size={12}>
              <Box sx={{ display: 'inline-flex' }}>
                <Rating
                  name="read-only"
                  value={item?.rating}
                  readOnly
                  size="small"
                />{' '}
                <Typography variant="body2" pl={0.8} color="#2162a1">
                  {item?.reviews ? `(${item?.reviews?.length})` : ''}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;
