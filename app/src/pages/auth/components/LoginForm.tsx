import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router";
import { CardLayout } from "./CardLayout";
import { useAuth } from "@/hooks/useAuth";
import { useForm } from "react-hook-form";

type FormValues = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const { login, error } = useAuth();

  return (
    <CardLayout
      title="Login"
      description="Enter your email and password to access your account."
    >
      <form onSubmit={handleSubmit((data) => login(data.email, data.password))}>
        <CardContent className="flex flex-col gap-4 *:space-y-2">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="user@example.com"
              {...register("email", { required: true })}
              aria-invalid={errors.email || error ? "true" : "false"}
            />
            {errors?.email && errors.email.type === "required" && (
              <p className="text-xs text-red-400">* Email is required</p>
            )}
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="papsword"
              type="password"
              placeholder="******"
              {...register("password", { required: true, minLength: 6 })}
              aria-invalid={errors.password || error ? "true" : "false"}
            />
            {errors?.password && errors.password.type === "required" && (
              <p className="text-xs text-red-400">* Password is required</p>
            )}
            {errors?.password && errors.password.type === "minLength" && (
              <p className="text-xs text-red-400">
                * Password must have at least 6 characters
              </p>
            )}
            {error !== null && <p className="text-xs text-red-400">{error}</p>}
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
