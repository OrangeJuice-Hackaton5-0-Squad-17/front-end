import * as zod from 'zod'

const MAX_FILE_SIZE = 5000000

const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

export const createProjectFormSchema = zod.object({
  image: zod
    .any()
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max image size is 5MB!`,
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.',
    ),
  title: zod.string().min(1).max(50),
  tags: zod.string().min(1).max(50),
  link: zod.string().min(1).max(50),
  description: zod.string().min(1).max(200),
})

export type CreateProjectFormData = zod.infer<typeof createProjectFormSchema>
