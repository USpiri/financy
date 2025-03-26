import { Outlet } from "react-router";
import { Navbar } from "../navbar/Navbar";
import { Footer } from "../footer/Footer";

export const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <main className="mx-auto w-full max-w-5xl p-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
