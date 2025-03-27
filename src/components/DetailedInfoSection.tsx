import { Divider, Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import { Product } from '../types/types';

interface Props {
  data?: Product;
}

const DetailedInfoSection: React.FC<Props> = ({ data }) => {
  return (
    <Paper sx={{ mt: 4 }}>
      <Grid container spacing={2}>
        <Grid container size={12}>
          <Typography variant="h4" p={1}>
            Product details of {data?.title}
          </Typography>
        </Grid>

        <Grid size={12}>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              pl: 2
            }}
          >
            {data?.description ? data?.description : ''}
          </Typography>
        </Grid>

        <Grid size={12}>
          <Divider />
        </Grid>

        <Grid size={12}>
          <Divider />
        </Grid>

        <Grid container size={12}>
          <Typography variant="h4" pl={1}>
            Specifications of {data?.title}
          </Typography>
        </Grid>

        <Grid size={12}>
          <Typography
            variant="body1"
            sx={{
              pl: 2
            }}
          >
            {data?.description ? data?.description : ''}
          </Typography>
        </Grid>

        <Grid container size={12}>
          <Grid size={6}>
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                pl: 2
              }}
            >
              <strong>Brand </strong> <br />
              {data?.brand ? data?.brand : ''}
            </Typography>
          </Grid>

          <Grid size={6}>
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                pl: 2
              }}
            >
              <strong>SKU </strong> <br />
              {data?.sku ? data?.sku : ''}
            </Typography>
          </Grid>

          <Grid size={6}>
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                pl: 2
              }}
            >
              <strong>Category </strong> <br />
              {data?.category ? data?.category : ''}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default DetailedInfoSection;
