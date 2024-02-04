import * as zod from 'zod'

export const createAccountFormValidationSchema = zod.object({
  name: zod.string().min(3),
  surname: zod.string().min(3),
  email: zod
    .string()
    .min(6, 'This field has to be filled!')
    .email('This is not a valid email!'),
  // .refine(
  //   // eslint-disable-next-line
  //   (email) => !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email),
  //   'This email is not in our database!',
  // ),
  password: zod.string().min(8, 'Password needs to be at least 8 characters!'),
})

export type CreateAccountFormData = zod.infer<
  typeof createAccountFormValidationSchema
>
