"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { auth, signIn, signOut, createUser } from "@/auth";
import { AuthError } from "next-auth";
import { getUser } from "./data";
import { State, UserState } from "./types";
import { PostFormSchema, UserSchema } from "./schema";
import slugify from "react-slugify";

// Use Zod to update the expected types
const CreatePost = PostFormSchema.omit({
    postid: true,
    createdat: true,
    slug: true,
    summary: true,
    featuredimage: true,
    userid: true,
});

// create post and category relation
export async function createPostCategoryRelation(
    postid: string,
    categoryid: FormDataEntryValue
) {
    // get category id from form data
    const cid = categoryid.toString();
    try {
        // insert into postcategories table
        await sql`
            INSERT INTO postcategories (categoryid, postid)
            VALUES (${cid}, ${postid})
        `;
    } catch (error) {
        // If a database error occurs, return a more specific error.
        return {
            message:
                "Database Error: Failed to create post category relationship.",
        };
    }
}

// create post
export async function createPost(prevState: State, formData: FormData) {
    // throw new Error('Failed to add post');
    const validatedFields = CreatePost.safeParse({
        title: formData.get("title"),
        content: formData.get("content"),
        status: formData.get("status"),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to Create Invoice.",
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
    const categories = formData.getAll("category");

    let postid = "";

    try {
        // Insert the new post into the database
        const newPost = await sql`
            INSERT INTO posts (title, content, status, createdat, slug, summary, userid)
            VALUES (${title}, ${content}, ${status}, NOW(), ${slug}, ${summary}, ${user.userid})
            RETURNING postid
        `;
        // Get the postid of the newly created post
        postid = newPost.rows[0].postid;
    } catch (error) {
        // If a database error occurs, return a more specific error.
        return {
            message: "Database Error: Failed to Create Post.",
        };
    }

    // Create post category relationships
    if (categories.length > 0) {
        Array.from(categories).map((category) =>
            createPostCategoryRelation(postid, category)
        );
    }

    // revalidate the cache
    revalidatePath("/dashboard/posts");

    return { message: "success" };
}

// delete post category relation
export async function deletePostCategoryRelation(postid: string) {
    try {
        // delete from postcategories table
        await sql`
            DELETE FROM postcategories
            WHERE postid = ${postid}
        `;
    } catch (error) {
        // If a database error occurs, return a more specific error.
        return {
            message:
                "Database Error: Failed to delete post category relationship.",
        };
    }
}

// Use Zod to update the post expected types
const UpdatePost = PostFormSchema.omit({
    postid: true,
    createdat: true,
    summary: true,
    featuredimage: true,
    userid: true,
});

// update post
export async function updatePost(
    id: string,
    prevState: State,
    formData: FormData
) {
    // validate fields
    const validatedFields = UpdatePost.safeParse({
        title: formData.get("title"),
        content: formData.get("content"),
        status: formData.get("status"),
        slug: formData.get("slug"),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to Update Invoice.",
        };
    }

    // Prepare data for insertion into the database
    const { title, content, status, slug } = validatedFields.data;

    // generate a summary from content
    const summary = content.substring(0, 200);
    // get categories
    const categories = formData.getAll("category");

    try {
        // Update the post in the database
        await sql`
        UPDATE posts
        SET title = ${title}, content = ${content}, status = ${status}, summary = ${summary}, slug = ${slug}, updatedat = NOW()
        WHERE postid = ${id}
        `;
    } catch (error) {
        return {
            message: "Database Error: Failed to Update Post.",
        };
    }

    // Delete all old post category relationships
    await deletePostCategoryRelation(id);

    // Create post category relationships
    if (categories.length > 0) {
        Array.from(categories).map((category) =>
            createPostCategoryRelation(id, category)
        );
    }

    // revalidate the cache
    revalidatePath(`/${slug}`);
    revalidatePath("/dashboard/posts");

    return { message: "success" };
}

// delete post using post id
export async function deletePost(id: string) {
    try {
        // first delete all post category relationships
        await deletePostCategoryRelation(id);
        // then delete the post
        await sql`DELETE FROM posts WHERE postid = ${id}`;
        // revalidate the cache
        revalidatePath("/dashboard/posts");

        return { message: "success" };
    } catch (error) {
        return {
            message: "Database Error: Failed to Delete Post.",
        };
    }
}

// Use Zod to update the user expected types
const User = UserSchema.omit({ userid: true });

// create new user
export async function signUp(prevState: UserState, formData: FormData) {
    // Validate the input data
    const validatedFields = User.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if ( ! validatedFields.success ) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to ceate user.",
        };
    }
    // Prepare data for insertion into the database
    const { name, email, password } = validatedFields.data;

    try {
        // Call createUser to register the new user
        await createUser(name, email, password);
    } catch (error) {
        // If a database error occurs, return a more specific error.
        return {
            message: "Database Error: Failed to Create User.",
        };
    }

    try {
        // after registeration, sign in the user
        await signIn("credentials", formData);
    } catch (error) {
        // If a database error occurs, return a more specific error.
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return {
                        message: "Invalid credentials.",
                    };
                default:
                    return {
                        message: "Something went wrong.",
                    };
            }
        }
    }

    return { message: "success" };
}

// login user
export async function authenticate(
    prevState: string | undefined,
    formData: FormData
) {
    try {
        // Call signIn to authenticate the user
        await signIn("credentials", formData);
    } catch (error) {
        // If a database error occurs, return a more specific error.
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return "Invalid credentials.";
                default:
                    return "Something went wrong.";
            }
        }
        throw error;
    }
}

// logout user
export async function logout() {
    // Call signOut to logout the user
    await signOut();
}
