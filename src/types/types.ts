import { Prisma } from '@prisma/client'

export type User = {
  id: number
  email: string
  name: string
  password: string
  posts: Post[] // relação 1:N com posts
}

export type Category = {
  id: number
  name: string
}


export type Post = Prisma.PostGetPayload<{
  include: { author: true; category: true }
}>


export type PostFormAction = (
  prevState: { message: string; success: boolean } | null,
  formData: FormData
) => Promise<{ message: string; success: boolean }>


export type PostFormProps = {
  initialData?: Partial<Post>;
  action: PostFormAction;
  submitLabel?: string;
};
