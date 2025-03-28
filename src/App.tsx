import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeProductList from './components/HomeProductList';
import ProductDetails from './components/ProductDetails';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import theme from './theme';
import { Product } from './types/types';
import { Box, Drawer, IconButton, Tooltip } from '@mui/material';
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

  let currentLocation = window.location;

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
              {currentLocation?.pathname?.startsWith('/product/') && (
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
              )}

              <Routes>
                <Route
                  path="/product/:id"
                  element={
                    <ProductDetails
                      selectedItem={selectedItem}
                      closeDrawer={closeDrawer}
                      setSelectedItem={setSelectedItem}
                    />
                  }
                />
                <Route
                  path="*"
                  element={
                    <HomeProductList
                      setSelectedItem={setSelectedItem}
                      selectedItem={selectedItem}
                      closeDrawer={closeDrawer}
                    />
                  }
                />
              </Routes>
            </div>

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
                  <HomeProductList
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
