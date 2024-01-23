'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import slugify from 'react-slugify';

const PostFormSchema = z.object({
    postid: z.string(),
    title: z.string(),
    slug: z.string(),
    summary: z.string(),
    featuredimage: z.string(),
    createdat: z.date(),
    content: z.string(),
    userid: z.string(),
    status: z.enum(['published','draft', 'archive'], {
        invalid_type_error: 'Please select a post status.',
    }),
});

const CreatePost = PostFormSchema.omit({ postid: true, createdat: true, slug: true, summary: true, featuredimage: true, userid: true });

export async function createPost(formData: FormData) {
    const { title, content, status } = CreatePost.parse({
        title: formData.get('title'),
        content: formData.get('content'),
        status: formData.get('status'),
    });
    const slug = slugify(title);
    const summary = content.substring(0, 100);
    const createdat = new Date().toISOString().split('T')[0];
    const userid = '410544b2-4001-4271-9855-fec4b6a6442a';
    // Test it out:
    // console.log(rawFormData);
    try {
        await sql`
            INSERT INTO posts (title, content, status, createdat, slug, summary, userid)
            VALUES (${title}, ${content}, ${status}, ${createdat}, ${slug}, ${summary}, ${userid})
        `;
    } catch (error) {
        // If a database error occurs, return a more specific error.
        return {
            message: 'Database Error: Failed to Create Post.',
        };
    }

    revalidatePath('/dashboard/posts');
    redirect('/dashboard/posts');
}

// Use Zod to update the expected types
const UpdatePost = PostFormSchema.omit({ postid: true, createdat: true, summary: true, featuredimage: true, userid: true });

export async function updatePost(id: string, formData: FormData) {
    const { title, content, status, slug } = UpdatePost.parse({
        title: formData.get('title'),
        content: formData.get('content'),
        status: formData.get('status'),
        slug: formData.get('slug'),
    });
   
    const summary = content.substring(0, 100);

    try {
        await sql`
        UPDATE posts
        SET title = ${title}, content = ${content}, status = ${status}, summary = ${summary}, slug = ${slug}
        WHERE postid = ${id}
        `;
    } catch (error) {
        return {
            message: 'Database Error: Failed to Update Post.',
        };
    }
   
    revalidatePath('/dashboard/posts');
    redirect('/dashboard/posts');
}

export async function deletePost(id: string) {
    // throw new Error('Failed to Delete Invoice');
    try {
        await sql`DELETE FROM posts WHERE postid = ${id}`;
        revalidatePath('/dashboard/posts');
        return { message: 'Post Deleted.' };
    } catch (error) {
        return {
            message: 'Database Error: Failed to Delete Post.',
        };
    }
}

// import { signIn } from '@/auth';
// import { AuthError } from 'next-auth';

// const PostFormSchema = z.object({
//     postid: z.string(),
//     title: z.string(),
//     slug: z.string(),
//     summary: z.string(),
//     featuredimage: z.string(),
//     createdat: z.string(),
//     content: z.string(),
//     userid: z.string(),
//     status: z.enum(['published','draft', 'archive'], {
//         invalid_type_error: 'Please select a post status.',
//     }),
// });

// // This is temporary until @types/react-dom is updated
// export type State = {
// 	errors?: {
// 	    title?: string[];
// 	    status?: string[];
//         content?: string[];
// 	};
// 	message?: string | null;
// };

// const CreatePost = PostFormSchema.omit({ postid: true, createdat: true, slug: true, summary: true, featuredimage: true, userid: true });

// export async function createPost(prevState: State, formData: FormData) {
// 	// Validate form using Zod
// 	const validatedFields = CreatePost.safeParse({
// 	  title: formData.get('title'),
// 	  content: formData.get('content'),
// 	  status: formData.get('status'),
// 	});

// 	console.log(validatedFields);
   
// 	// If form validation fails, return errors early. Otherwise, continue.
// 	if (!validatedFields.success) {
// 	  return {
// 		errors: validatedFields.error.flatten().fieldErrors,
// 		message: 'Missing Fields. Failed to Create Post.',
// 	  };
// 	}
   
// 	// Prepare data for insertion into the database
// 	const { title, content, status } = validatedFields.data;
// 	// const date = new Date().toISOString().split('T')[0];
//     const slug = slugify(title);
//     const summary = content.substring(0, 100);
//     const userId = '410544b2-4001-4271-9855-fec4b6a6442a';
   
// 	// Insert data into the database
// 	try {
// 	  await sql`
// 		INSERT INTO posts (title, slug, content, summary, userId, status)
// 		VALUES (${title}, ${slug}, ${content}, ${summary}, ${userId}, ${status})
// 	  `;
// 	} catch (error) {
// 	  // If a database error occurs, return a more specific error.
// 	  return {
// 		message: 'Database Error: Failed to Create Post.',
// 	  };
// 	}
   
// 	// Revalidate the cache for the invoices page and redirect the user.
// 	revalidatePath('/dashboard/posts');
// 	redirect('/dashboard/posts');
//   }

// Use Zod to update the expected types
// const UpdateInvoice = PostFormSchema.omit({ id: true, date: true });

// export async function updateInvoice(id: string, prevState: State, formData: FormData) {
// 	const validatedFields = UpdateInvoice.safeParse({
// 	  customerId: formData.get('customerId'),
// 	  amount: formData.get('amount'),
// 	  status: formData.get('status'),
// 	});

// 	if (!validatedFields.success) {
// 		return {
// 		  errors: validatedFields.error.flatten().fieldErrors,
// 		  message: 'Missing Fields. Failed to Update Invoice.',
// 		};
// 	}

// 	const { customerId, amount, status } = validatedFields.data;
// 	const amountInCents = amount * 100;
   
// 	try {
// 		await sql`
// 		UPDATE invoices
// 		SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
// 		WHERE id = ${id}
// 		`;
// 	} catch (error) {
// 		return {
// 			message: 'Database Error: Failed to Update Invoice.',
// 		};
// 	}
   
// 	revalidatePath('/dashboard/invoices');
// 	redirect('/dashboard/invoices');
// }

// export async function deleteInvoice(id: string) {
// 	throw new Error('Failed to Delete Invoice');
// 	try {
// 		await sql`DELETE FROM invoices WHERE id = ${id}`;
// 		revalidatePath('/dashboard/invoices');
// 		return {
// 			message: 'Deleted Invoice.',
// 		};
// 	} catch (error) {
// 		return {
// 			message: 'Database Error: Failed to Delete Invoice.',
// 		};
// 	}
// }

// export async function authenticate(
// 	prevState: string | undefined,
// 	formData: FormData,
//   ) {
// 	try {
// 	  await signIn('credentials', formData);
// 	} catch (error) {
// 	  if (error instanceof AuthError) {
// 		switch (error.type) {
// 		  case 'CredentialsSignin':
// 			return 'Invalid credentials.';
// 		  default:
// 			return 'Something went wrong.';
// 		}
// 	  }
// 	  throw error;
// 	}
// }