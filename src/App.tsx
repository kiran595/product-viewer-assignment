import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import theme from './theme';
import { Product } from './types/types';
import {
  Box,
  Breadcrumbs,
  Button,
  Drawer,
  Grid,
  IconButton,
  Link,
  Tooltip,
  Typography
} from '@mui/material';
import NotFound from './assets/img/not-found.jpg';
import MenuIcon from '@mui/icons-material/Menu';

const queryClient = new QueryClient();

const App: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<Product | undefined>();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const closeDrawer = () => {
    setOpen(false);
  };

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
              <Box sx={{ display: { sm: 'none', xs: 'block' } }}>
                <Tooltip
                  placement="bottom"
                  title="Click Here To Get Item List "
                >
                  <IconButton onClick={toggleDrawer(true)}>
                    <MenuIcon />
                  </IconButton>
                </Tooltip>
              </Box>

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

            <Drawer open={open} onClose={toggleDrawer(false)}>
              <Box sx={{ display: { sm: 'none', xs: 'block' } }}>
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
                    closeDrawer={closeDrawer}
                  />
                </div>
              </Box>
            </Drawer>
          </div>
        </Router>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
