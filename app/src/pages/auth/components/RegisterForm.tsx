import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router";
import { CardLayout } from "./CardLayout";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";

type FormValues = {
  name: string;
  lastName: string;
  email: string;
  password: string;
};

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const { register: registerUser } = useAuth();

  return (
    <CardLayout
      title="Register"
      description="Create an account to start using Financy."
    >
      <form onSubmit={handleSubmit((data) => registerUser(data))}>
        <CardContent className="flex flex-col gap-4 *:space-y-2">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              {...register("name", { required: true })}
              id="name"
              placeholder="Jhon"
              aria-invalid={errors.name ? "true" : "false"}
            />
            {errors?.name && errors.name.type === "required" && (
              <p className="text-xs text-red-400">* Name is required</p>
            )}
          </div>
          <div>
            <Label htmlFor="lastName">Lastname</Label>
            <Input
              id="lastName"
              {...register("lastName", { required: true })}
              placeholder="Doe"
              aria-invalid={errors.lastName ? "true" : "false"}
            />
            {errors?.lastName && errors.lastName.type === "required" && (
              <p className="text-xs text-red-400">* Lastname is required</p>
            )}
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="user@example.com"
              {...register("email", { required: true })}
              aria-invalid={errors.email ? "true" : "false"}
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
              aria-invalid={errors.password ? "true" : "false"}
            />
            {errors?.password && errors.password.type === "required" && (
              <p className="text-xs text-red-400">* Password is required</p>
            )}
            {errors?.password && errors.password.type === "minLength" && (
              <p className="text-xs text-red-400">
                * Password must have at least 6 characters
              </p>
            )}
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
