import { Link, Outlet } from "react-router";
import { Button } from "../ui/button";
import { LogOut, Plus, Sun } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export const MainLayout = () => {
  const { logout } = useAuth();

  return (
    <div>
      <header className="bg-background sticky top-0 z-10 border-b">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between p-4">
          <Link to="/">
            <h1 className="text-primary font-mono text-sm">Financy</h1>
          </Link>
          <div className="flex gap-2">
            <Button variant="ghost">
              <Sun />
            </Button>
            <Button variant="default">
              <Plus /> <span className="max-sm:hidden">Add Transaction</span>
            </Button>
            <Button variant="outline" size="icon" onClick={logout}>
              <LogOut />
            </Button>
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl p-4">
        <Outlet />
      </main>
      <footer className="py-10 text-center font-mono text-xs font-semibold opacity-50">
        by{" "}
        <a
          href="https://github.com/USpiri"
          target="_blank"
          className="hover:underline"
        >
          Uspiri
        </a>
      </footer>
    </div>
  );
};
