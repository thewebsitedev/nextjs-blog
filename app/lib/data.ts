import { sql } from "@vercel/postgres";
import { User, Post } from "./types";
import { unstable_noStore as noStore } from "next/cache";
import { Category } from "./types";
import { set } from "zod";

export async function getUser(email: string) {
    try {
        const user = await sql`SELECT * FROM users WHERE email=${email}`;
        return user.rows[0] as User;
    } catch (error) {
        console.error("Failed to fetch user:", error);
        throw new Error("Failed to fetch user.");
    }
}

export async function fetchLatestPosts(userId: string) {
    noStore();
    try {
        // console.log('Fetching posts data...');
        // await new Promise((resolve) => setTimeout(resolve, 3000));
    
        const data = await sql<Post>`
        SELECT *
        FROM posts
        WHERE posts.userid = ${userId}
        ORDER BY posts.createdat ASC`;

        const latestPosts = data.rows;

        return latestPosts;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch the latest posts.");
    }
}

export async function fetchPostById(postId: string) {
    try {
        const data = await sql<Post>`
        SELECT 
            posts.postid,
            posts.title,
            posts.featuredimage,
            posts.content,
            posts.status
        FROM posts
        WHERE posts.postid = ${postId};`;

        const post = data.rows[0];

        return post;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch the post.");
    }
}

export async function fetchCategories() {
    noStore();
    try {
        const data = await sql<Category>`
        SELECT *
        FROM categories`;

        const categories = data.rows;

        return categories;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch categories.");
    }
}

export async function fetchPosts() {
    noStore();
    try {
        // console.log('Fetching posts data...');
        await new Promise((resolve) => setTimeout(resolve, 10000));
    
        const data = await sql<Post>`
        SELECT *
        FROM posts
        ORDER BY posts.createdat ASC`;

        const posts = data.rows;

        return posts;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch posts.");
    }
}