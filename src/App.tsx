import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes.tsx";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnHover
      />
    </BrowserRouter>
  );
}
