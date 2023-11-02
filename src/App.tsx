// Libraries
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Components
import Navbar from "./components/Navbar";
import Content from "./components/Content";

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
  // State for the current Todo-List (default is 1)
  const [selectedListIndex, setSelectedListIndex] = useState<number>(1);
  const [selectedListName, setSelectedListName] = useState<string>("");

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Router>
          <div>
            <Navbar
              selectedListIndex={selectedListIndex}
              setSelectedListIndex={setSelectedListIndex}
              setSelectedListName={setSelectedListName}
            />
            <div className="Content">
              <Routes>
                <Route
                  path="/"
                  element={
                    <Content
                      selectedListIndex={selectedListIndex}
                      selectedListName={selectedListName}
                    />
                  }
                />
              </Routes>
            </div>
          </div>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
