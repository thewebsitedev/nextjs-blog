'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import slugify from 'react-slugify';
import { auth, signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
import { getUser } from './data';
import { State } from './types';

const PostFormSchema = z.object({
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

const CreatePost = PostFormSchema.omit({ postid: true, createdat: true, slug: true, summary: true, featuredimage: true, userid: true });

export async function createPostCategoryRelation(postid: string, categoryid: FormDataEntryValue) {
    const cid = categoryid.toString();
    try {
        await sql`
            INSERT INTO postcategories (categoryid, postid)
            VALUES (${cid}, ${postid})
        `;
    } catch (error) {
        // If a database error occurs, return a more specific error.
        return {
            message: 'Database Error: Failed to create post category relationship.',
        };
    }
}

export async function createPost(prevState: State, formData: FormData) {
    // throw new Error('Failed to add post');
    const validatedFields = CreatePost.safeParse({
        title: formData.get('title'),
        content: formData.get('content'),
        status: formData.get('status')
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if ( ! validatedFields.success ) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Invoice.',
        };
    }

    // Prepare data for insertion into the database
    const { title, content, status } = validatedFields.data;
    // generate a slug from title
    const slug = slugify(title);
    // generate a summary from content
    const summary = content.substring(0, 200);
    // get user id
    const session = await auth();
    const email = session?.user?.email;
    const user = await getUser(email);
    // get categories
    const categories = formData.getAll('category');

    let postid = '';

    try {
        const newPost = await sql`
            INSERT INTO posts (title, content, status, createdat, slug, summary, userid)
            VALUES (${title}, ${content}, ${status}, NOW(), ${slug}, ${summary}, ${user.userid})
            RETURNING postid
        `;
        postid = newPost.rows[0].postid;
    } catch (error) {
        // If a database error occurs, return a more specific error.
        return {
            message: 'Database Error: Failed to Create Post.',
        };
    }

    if (categories.length > 0) {
        Array.from(categories).map((category) => createPostCategoryRelation(postid, category));
    }

    revalidatePath('/dashboard/posts');

    return { message: 'success' };

    // redirect('/dashboard/posts');
}

export async function deletePostCategoryRelation(postid: string) {
    try {
        await sql`
            DELETE FROM postcategories
            WHERE postid = ${postid}
        `;
    } catch (error) {
        // If a database error occurs, return a more specific error.
        return {
            message: 'Database Error: Failed to delete post category relationship.',
        };
    }
}

// Use Zod to update the expected types
const UpdatePost = PostFormSchema.omit({ postid: true, createdat: true, summary: true, featuredimage: true, userid: true });

export async function updatePost(id: string, prevState: State, formData: FormData) {
    // throw new Error('Failed to edit post');
    const validatedFields = UpdatePost.safeParse({
        title: formData.get('title'),
        content: formData.get('content'),
        status: formData.get('status'),
        slug: formData.get('slug'),
    });

    if ( ! validatedFields.success ) {
		return {
		  errors: validatedFields.error.flatten().fieldErrors,
		  message: 'Missing Fields. Failed to Update Invoice.',
		};
	}

    const { title, content, status, slug } = validatedFields.data;

    // generate a summary from content
    const summary = content.substring(0, 200);
    // get categories
    const categories = formData.getAll('category');
    // get current date
    // const updatedat = new Date().toISOString().split('T')[0];

    try {
        await sql`
        UPDATE posts
        SET title = ${title}, content = ${content}, status = ${status}, summary = ${summary}, slug = ${slug}, updatedat = NOW()
        WHERE postid = ${id}
        `;
    } catch (error) {
        return {
            message: 'Database Error: Failed to Update Post.',
        };
    }

    // Delete all post category relationships
    await deletePostCategoryRelation(id);

    if (categories.length > 0) {
        Array.from(categories).map((category) => createPostCategoryRelation(id, category));
    }

    revalidatePath('/dashboard/posts');

    return { message: 'success' };
    // redirect('/dashboard/posts');
}

export async function deletePost(id: string) {
    // throw new Error('Failed to delete post');
    try {
        // first delete all post category relationships
        await deletePostCategoryRelation(id);
        // then delete the post
        await sql`DELETE FROM posts WHERE postid = ${id}`;
        
        revalidatePath('/dashboard/posts');
        return { message: 'Post Deleted.' };
    } catch (error) {
        return {
            message: 'Database Error: Failed to Delete Post.',
        };
    }
}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
  ) {
    try {
      await signIn('credentials', formData);
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return 'Invalid credentials.';
          default:
            return 'Something went wrong.';
        }
      }
      throw error;
    }
}

export async function logout() {
    await signOut();
}