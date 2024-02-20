import { BrowserRouter } from "react-router-dom";
import "./App.css";
// import Header from "./components/Header";
import AllRoutes from "./components/allRoutes/routes";
import Header from "./components/header/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <AllRoutes />
      {/* <ToastContainer /> */}
      <ToastContainer
        position="top-right"
        autoClose={1200}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        // transition: Bounce,
      />
    </BrowserRouter>
  );
}

export default App;
