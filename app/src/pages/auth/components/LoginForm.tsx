import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router";
import { CardLayout } from "./CardLayout";

export const LoginForm = () => {
  return (
    <CardLayout
      title="Login"
      description="Enter your email and password to access your account."
    >
      <form>
        <CardContent className="flex flex-col gap-4 *:space-y-2">
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
            Don&apos;t have an account?{" "}
            <Link
              to="/auth/register"
              className="text-primary font-semibold hover:underline"
            >
              Sign up
            </Link>
          </div>
        </CardFooter>
      </form>
    </CardLayout>
  );
};
