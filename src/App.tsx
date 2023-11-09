// Libraries
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";

// Components
import User from "./UserSelect";
import Whole from "./Whole";

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
  // States
  const [selectedListIndex, setSelectedListIndex] = useState<number>(1);
  const [selectedListName, setSelectedListName] = useState<string>("");

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<User />} />
            <Route
              path="/main"
              element={
                <Whole
                  selectedListIndex={selectedListIndex}
                  setSelectedListIndex={setSelectedListIndex}
                  setSelectedListName={setSelectedListName}
                  selectedListName={selectedListName}
                />
              }
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
