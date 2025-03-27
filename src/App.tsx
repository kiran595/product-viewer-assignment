import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import theme from './theme';
import { Product } from './types/types';
import { Box, Breadcrumbs, Grid, Link, Typography } from '@mui/material';
import NotFound from './assets/img/not-found.jpg';

const queryClient = new QueryClient();

const App: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<Product | undefined>();

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div
            style={{
              display: 'flex',
              height: '100vh',
              backgroundColor: '#eff0f6'
            }}
          >
            {/* Left side: Product details (or placeholder) */}
            <div style={{ flex: 1, overflowY: 'auto' }}>
              <Routes>
                <Route
                  path="/product/:id"
                  element={<ProductDetails selectedItem={selectedItem} />}
                />
                <Route
                  path="*"
                  element={
                    <div style={{ padding: '20px' }}>
                      <Grid
                        container
                        justifyContent={'center'}
                        alignItems={'center'}
                      >
                        <img
                          src={NotFound}
                          style={{ width: '80%' }}
                          alt="not-found"
                        />
                        <Grid size={12}>
                          <Typography
                            align="center"
                            variant="h3"
                            color="#707070"
                            pt={2}
                          >
                            No Item Selected
                          </Typography>
                        </Grid>
                      </Grid>{' '}
                    </div>
                  }
                />
              </Routes>
            </div>

            {/* Right side: Product list */}
            <Box sx={{ display: { sm: 'block', xs: 'none' } }}>
              <div
                style={{
                  width: '300px',
                  borderLeft: '1px solid #ccc',
                  overflowY: 'auto',
                  padding: '20px'
                }}
              >
                <ProductList
                  setSelectedItem={setSelectedItem}
                  selectedItem={selectedItem}
                />
              </div>
            </Box>
          </div>
        </Router>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
