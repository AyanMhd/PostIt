import AppRoutes from "./routes";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <main className="page">
        <div className="container">
          <AppRoutes />
        </div>
      </main>
    </>
  );
}

export default App;
