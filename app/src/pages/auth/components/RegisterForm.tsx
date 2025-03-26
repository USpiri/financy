import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router";
import { CardLayout } from "./CardLayout";

export const RegisterForm = () => {
  return (
    <CardLayout
      title="Register"
      description="Create an account to start using Financy."
    >
      <form>
        <CardContent className="flex flex-col gap-4 *:space-y-2">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              name="name"
              placeholder="Jhon"
              required
            />
          </div>
          <div>
            <Label htmlFor="lastName">Lastname</Label>
            <Input
              id="lastName"
              type="text"
              name="lastName"
              placeholder="Doe"
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="user@example.com"
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="papsword"
              type="password"
              name="password"
              placeholder="******"
              required
            />
          </div>
        </CardContent>
        <CardFooter className="mt-8 flex flex-col">
          <Button type="submit" className="w-full" variant="secondary">
            Submit
          </Button>
          <div className="mt-2 text-center text-xs">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="text-primary font-semibold hover:underline"
            >
              Sign in
            </Link>
          </div>
        </CardFooter>
      </form>
    </CardLayout>
  );
};
