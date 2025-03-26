import { Outlet } from "react-router";
import { Button } from "../ui/button";
import { LogOut, Plus } from "lucide-react";

export const MainLayout = () => {
  return (
    <div>
      <header className="bg-background sticky top-0 z-10 border-b">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between p-4">
          <h1 className="text-primary font-mono text-sm">Financy</h1>
          <div className="flex gap-2">
            <Button variant="default">
              <Plus /> Add Transaction
            </Button>
            <Button variant="outline" size="icon">
              <LogOut />
            </Button>
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl p-4">
        <Outlet />
      </main>
    </div>
  );
};
