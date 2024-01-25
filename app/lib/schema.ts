import { z } from 'zod';

// Define a schema for the post form values
export const PostFormSchema = z.object({
    postid: z.string(),
    title: z.string({
        invalid_type_error: 'Please enter a title.',
    }).min(10, {
        message: 'Title must be at least 10 characters.',
    }),
    slug: z.string(),
    summary: z.string(),
    featuredimage: z.string(),
    createdat: z.date(),
    content: z.string({
        invalid_type_error: 'Please enter content.',
    }).min(100, {
        message: 'Content must be at least 100 characters.',
    }),
    userid: z.string(),
    status: z.enum(['published','draft', 'archived'], {
        invalid_type_error: 'Please select a post status.',
    }),
});

// Define a schema for the user form values
export const UserSchema = z.object({
    userid: z.string(),
    name: z.string({
        invalid_type_error: 'Please enter a name.',
    }).min(2, {
        message: 'Name must be at least 2 characters.',
    }),
    email: z.string()
        .min(1, { message: "Please enter valid email address." })
        .email("Please enter valid email address."),
    password: z.string().min(2, {
        message: 'Password must be minimum 6 characters.',
    }),
});