import * as zod from 'zod'

export const signInAccountFormValidationSchema = zod.object({
  email: zod
    .string()
    .min(1, { message: 'This field has to be filled.' })
    .email('This is not a valid email.')
    .refine(
      // eslint-disable-next-line
      (email) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email),
      'This email is not in our database',
    ),
  password: zod.string().min(8, 'Password needs to be at least 8 characters!'),
})

export type signInAccountFormData = zod.infer<
  typeof signInAccountFormValidationSchema
>
