import { LogOut, Plus, Sun } from "lucide-react";
import { Link } from "react-router";
import { Button } from "../ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useUIStore } from "@/store/ui.store";

export const Navbar = () => {
  const { logout } = useAuth();
  const openTransactions = useUIStore((state) => state.toggleTransactionsModal);

  return (
    <header className="bg-background sticky top-0 z-10 border-b">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between p-4">
        <Link to="/">
          <h1 className="text-primary font-mono text-sm">Financy</h1>
        </Link>
        <div className="flex gap-2">
          <Button variant="ghost">
            <Sun />
          </Button>
          <Button variant="default" onClick={() => openTransactions(true)}>
            <Plus /> <span className="max-sm:hidden">Add Transaction</span>
          </Button>
          <Button variant="outline" size="icon" onClick={logout}>
            <LogOut />
          </Button>
        </div>
      </div>
    </header>
  );
};
