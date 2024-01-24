import { sql } from "@vercel/postgres";
import { User, Post } from "./types";
import { unstable_noStore as noStore } from "next/cache";
import { Category } from "./types";
import { set } from "zod";

const ITEMS_PER_PAGE = 10;
const ARTICLES_PER_PAGE = 6;

export async function getUser(email: string | undefined | null) {
    try {
        const user = await sql`SELECT * FROM users WHERE email=${email}`;
        return user.rows[0] as User;
    } catch (error) {
        console.error("Failed to fetch user:", error);
        throw new Error("Failed to fetch user.");
    }
}

export async function getUserById(id: string | undefined | null) {
    try {
        const user = await sql`SELECT * FROM users WHERE userid=${id}`;
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
        ORDER BY posts.createdat DESC
        LIMIT ${ITEMS_PER_PAGE}`;

        const latestPosts = data.rows;

        return latestPosts;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch the latest posts.");
    }
}

export async function fetchPostById(postId: string) {
    noStore();
    try {
        const data = await sql<Post>`
        SELECT 
            posts.postid,
            posts.title,
            posts.featuredimage,
            posts.content,
            posts.status,
            posts.slug
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
    // console.log({
    //     POSTGRES_URL: process.env.POSTGRES_URL,
    //     POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING
    // });
    try {
        const data = await sql<Category>`
        SELECT
            categories.categoryid,
            categories.name,
            categories.description
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
        // await new Promise((resolve) => setTimeout(resolve, 10000));
    
        const data = await sql<Post>`
        SELECT 
            posts.postid,
            posts.title,
            posts.slug,
            posts.content,
            posts.createdAt,
            posts.updatedAt,
            posts.userid
        FROM posts
        WHERE posts.status = 'published'
        ORDER BY posts.createdat ASC
        LIMIT ${ARTICLES_PER_PAGE}`;

        const posts = data.rows;

        return posts;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch posts.");
    }
}

export async function fetchPostBySlug(slug: string) {
    noStore();
    try {
        const data = await sql<Post>`
        SELECT 
            posts.postid,
            posts.title,
            posts.summary,
            posts.featuredimage,
            posts.content,
            posts.status,
            posts.createdAt,
            posts.userid
        FROM posts
        WHERE posts.slug = ${slug};`;

        const post = data.rows[0];

        return post;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch the post.");
    }
}

export async function fetchPostCategories(postid: string | null) {
    noStore();
    try {
        const data = await sql<Category>`
        SELECT 
            categories.categoryid,
            categories.name,
            categories.description
        FROM categories
        INNER JOIN postcategories ON postcategories.categoryid = categories.categoryid
        WHERE postcategories.postid = ${postid};`;

        const categories = data.rows;

        return categories;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch the post.");
    }
}

export async function fetchUserPostsPages(userId: string | undefined) {
    noStore();
    try {
        const count = await sql`SELECT COUNT(*)
        FROM posts
        WHERE posts.userid = ${userId}
    `;
        const totalPosts = Number(count.rows[0].count);
        const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
        return {
            totalPages,
            totalPosts,
        };
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch total number of invoices.');
    }
}

export async function fetchUserPaginatedPosts( userId: string | undefined, query: string, currentPage: number ) {
    noStore();

    // await new Promise((resolve) => setTimeout(resolve, 10000));

    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    try {
      const posts = await sql<Post>`
        SELECT
            posts.postid,
            posts.title,
            posts.createdat,
            posts.status
        FROM posts
        WHERE
            posts.userid = ${userId}
        ORDER BY posts.createdat DESC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `;
  
      return posts.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch posts.');
    }
}

export async function fetchPostsPages( query: string ) {
    noStore();
    try {
        const count = await sql`SELECT COUNT(*)
        FROM posts
        WHERE 
            posts.status = 'published' AND (
            LOWER(posts.title) ILIKE LOWER(${`%${query}%`}) OR 
            LOWER(posts.summary) ILIKE LOWER(${`%${query}%`}) OR
            LOWER(posts.content) ILIKE LOWER(${`%${query}%`})
            )
    `;
        const totalPosts = Number(count.rows[0].count);
        const totalPages = Math.ceil(Number(count.rows[0].count) / ARTICLES_PER_PAGE);
        return {
            totalPages,
            totalPosts,
        };
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch total number of invoices.');
    }
}

export async function fetchPaginatedPosts( query: string, currentPage: number ) {
    noStore();

    // await new Promise((resolve) => setTimeout(resolve, 10000));

    const offset = (currentPage - 1) * ARTICLES_PER_PAGE;

    try {
      const posts = await sql<Post>`
        SELECT
            posts.postid,
            posts.title,
            posts.summary,
            posts.createdat,
            posts.status
        FROM posts
        WHERE
            posts.status = 'published' AND (
            LOWER(posts.title) ILIKE LOWER(${`%${query}%`}) OR
            LOWER(posts.summary) ILIKE LOWER(${`%${query}%`}) OR
            LOWER(posts.content) ILIKE LOWER(${`%${query}%`})
            )
        ORDER BY posts.createdat DESC
        LIMIT ${ARTICLES_PER_PAGE} OFFSET ${offset}
      `;
  
      return posts.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch posts.');
    }
}