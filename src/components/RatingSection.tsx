import { Divider, Grid, Paper, Rating, Typography } from '@mui/material';
import React from 'react';
import { Product } from '../types/types';
import moment from 'moment';

interface Props {
  data?: Product;
}

const RatingSection: React.FC<Props> = ({ data }) => {
  return (
    <Paper sx={{ mt: 4, p: 1 }}>
      <Grid container spacing={2}>
        <Grid container size={12}>
          <Typography variant="h4" p={1}>
            Ratings & Reviews of {data?.title}
          </Typography>
        </Grid>

        <Grid size={12}>
          <Rating
            name="read-only"
            value={data?.rating}
            readOnly
            size="small"
            sx={{ pl: 2 }}
          />
        </Grid>

        <Grid size={12}>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              pl: 2.4
            }}
          >
            {data?.reviews ? `${data?.reviews?.length}` : ''} Ratings
          </Typography>
        </Grid>

        <Grid size={12}>
          <Divider />
        </Grid>

        <Grid container size={12}>
          <Typography
            variant="h5"
            sx={{
              color: 'text.secondary'
            }}
            pl={1}
          >
            Product Reviews
          </Typography>
        </Grid>

        <Grid size={12}>
          <Divider />
        </Grid>

        {data?.reviews?.length
          ? data?.reviews?.map((item, index) => (
              <Grid container key={index + 1} size={12} mb={3} p={2}>
                <Grid container size={12}>
                  <Grid size={6}>
                    <Rating
                      name="read-only"
                      value={item?.rating}
                      readOnly
                      size="small"
                    />
                  </Grid>

                  <Grid size={6}>
                    <Typography
                      variant="h5"
                      sx={{
                        color: 'text.secondary'
                      }}
                      align="right"
                    >
                      {item?.date
                        ? moment(item?.date).format('MMM Do YYYY')
                        : ''}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid size={12}>
                  <Typography
                    variant="h5"
                    sx={{
                      color: 'text.secondary'
                    }}
                  >
                    {item?.reviewerName}
                  </Typography>
                </Grid>

                <Grid size={12}>
                  <Typography variant="h6">{item?.comment}</Typography>
                </Grid>

                <Grid size={12}>
                  <Divider />
                </Grid>
              </Grid>
            ))
          : ''}
      </Grid>
    </Paper>
  );
};

export default RatingSection;
