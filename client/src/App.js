import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import {
  Navbar,
  Feed,
  VideoDetail,
  ChannelDetail,
  SearchFeed,
  Auth,
} from "./components";

import { GoogleOAuthProvider } from "@react-oauth/google";

const App = () => (
  <GoogleOAuthProvider clientId={process.env.REACT_APP_PUBLIC_GOOGLE_API_TOKEN}>
    <BrowserRouter>
      <Box sx={{ backgroundColor: "#000" }}>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Feed />} />
          <Route path="/video/:id" element={<VideoDetail />} />
          <Route path="/channel/:id" element={<ChannelDetail />} />
          <Route path="search/:searchTerm" element={<SearchFeed />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Box>
    </BrowserRouter>
  </GoogleOAuthProvider>
);

export default App;
