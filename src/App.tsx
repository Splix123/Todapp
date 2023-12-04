// Libraries
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";

// Components
import User from "./UserSelect";
import Content from "./components/Content";
import Navbar from "./components/Navbar";

// CSS
import "./App.css";

// Enable React-Query
const queryClient = new QueryClient();

// Enable Dark-mode
const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<User />} />
            <Route
              path="/main"
              element={
                <>
                  <Navbar />
                  <Content />
                </>
              }
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
