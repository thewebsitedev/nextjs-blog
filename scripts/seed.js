const { db } = require("@vercel/postgres");
const {
    users,
    categories,
    posts,
    postCategories,
} = require("../app/lib/placeholder-data.js");
const bcrypt = require("bcrypt");

/**
 * Asynchronously seeds the "users" table in the database with predefined user data.
 * It first ensures the "uuid-ossp" extension is enabled in the PostgreSQL database to
 * allow automatic generation of UUID values. Then, it checks if the "users" table exists,
 * creating it if necessary with columns for userId, name, email, password, and avatar.
 * Each user's password is hashed for security before insertion. If a user with the same
 * userId already exists, the insertion is skipped to avoid duplicates.
 *
 * This function is designed to be run as part of an initial database setup or seeding
 * process to populate the "users" table with initial data.
 *
 * @param {Object} client - The database client instance used to execute SQL queries.
 * @returns {Promise<Object>} A promise that resolves to an object containing the result of the
 *          CREATE TABLE operation and an array of results for each user insertion. The promise
 *          is rejected if any error occurs during the seeding process, with an error message
 *          indicating the failure reason.
 */
async function seedUsers(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        // Create the "users" table if it doesn't exist
        const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        userId UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        avatar VARCHAR(255)
      );
    `;

        console.log(`Created "users" table`);

        // Insert data into the "users" table
        const insertedUsers = await Promise.all(
            users.map(async (user) => {
                // hash password for security
                const hashedPassword = await bcrypt.hash(user.password, 10);
                return client.sql`
        INSERT INTO users (userId, name, email, password, avatar)
        VALUES (${user.userId}, ${user.name}, ${user.email}, ${hashedPassword}, ${user.avatar})
        ON CONFLICT (userId) DO NOTHING;
      `;
            })
        );

        console.log(`Seeded ${insertedUsers.length} users`);

        return {
            createTable,
            users: insertedUsers,
        };
    } catch (error) {
        console.error("Error seeding users:", error);
        throw error;
    }
}

/**
 * Seed the "categories" table.
 *
 * @param {*} client
 * @returns Object with "createTable" and "categories" properties
 */
async function seedCategories(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        // Create the "categories" table if it doesn't exist
        const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS categories (
          categoryId SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          slug VARCHAR(255) UNIQUE NOT NULL,
          description TEXT NOT NULL,
          createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `;

        console.log(`Created "categories" table`);

        // Insert data into the "categories" table
        const insertedCategories = await Promise.all(
            categories.map(
                (category) => client.sql`
          INSERT INTO categories (name, slug, description)
          VALUES (${category.name}, ${category.slug}, ${category.description})
          ON CONFLICT (categoryId) DO NOTHING;
        `
            )
        );

        console.log(`Seeded ${insertedCategories.length} categories`);

        return {
            createTable,
            categories: insertedCategories,
        };
    } catch (error) {
        console.error("Error seeding categories:", error);
        throw error;
    }
}

async function seedPosts(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        // Create the "posts" table if it doesn't exist
        const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS posts (
        postId UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        content TEXT NOT NULL,
        summary TEXT NOT NULL,
        createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        userId UUID REFERENCES users(userId),
        status VARCHAR(50),
        featuredImage VARCHAR(255)
    );
    `;

        console.log(`Created "posts" table`);

        // Insert data into the "posts" table
        const insertedPosts = await Promise.all(
            posts.map(
                (post) => client.sql`
        INSERT INTO posts (postId, title, slug, content, summary, userId, status, featuredImage)
        VALUES ( ${post.postId}, ${post.title}, ${post.slug}, ${post.content}, ${post.summary}, ${post.userId}, ${post.status}, ${post.featuredImage})
        ON CONFLICT (postId) DO NOTHING;
      `
            )
        );

        console.log(`Seeded ${insertedPosts.length} posts`);

        return {
            createTable,
            posts: insertedPosts,
        };
    } catch (error) {
        console.error("Error seeding posts:", error);
        throw error;
    }
}

async function seedPostCategories(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        // Create the "postCategories" table if it doesn't exist
        const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS postCategories (
        postCategoryId UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        postId UUID REFERENCES posts(postId),
        categoryId INTEGER REFERENCES categories(categoryId)
    );
    `;

        console.log(`Created "postCategories" table`);

        // Insert data into the "postCategories" table
        const insertedPostCategories = await Promise.all(
            postCategories.map(
                (postCategory) => client.sql`
        INSERT INTO postCategories (postId, categoryId)
        VALUES (${postCategory.postId}, ${postCategory.categoryId})
        ON CONFLICT (postCategoryId) DO NOTHING;
      `
            )
        );

        console.log(`Seeded ${insertedPostCategories.length} postCategories`);

        return {
            createTable,
            postCategories: insertedPostCategories,
        };
    } catch (error) {
        console.error("Error seeding postCategories:", error);
        throw error;
    }
}

async function main() {
    const client = await db.connect();

    await seedUsers(client);
    await seedCategories(client);
    await seedPosts(client);
    await seedPostCategories(client);

    await client.end();
}

main().catch((err) => {
    console.error(
        "An error occurred while attempting to seed the database:",
        err
    );
});
