import { object, string, TypeOf } from "zod";

export const createUserSchema = object({
  body: object({
    name: string({
      required_error: "Name is Required",
    }),
    password: string({
      required_error: "Password is Required",
    }).min(6, "Password too short - should be 6 chars minimum"),
    passwordConfirm: string({
      required_error: "password confirm is required",
    }),
    email: string({
      required_error: "email is required",
    }).email("not a valid email"),
  }).refine((data) => data.password === data.passwordConfirm, {
    message: "password do not match",
    path: ["passwordConfirm"],
  }),
});

export type CreateUserInput = Omit<
  TypeOf<typeof createUserSchema>,
  "body.passwordConfirm"
>;
