### Introduction
NextGen blog is an efficient, scalable, and user-friendly web application. Utilizing Next.js 14, the latest version of the React framework, this application not only embraces server-side rendering and static site generation for optimal performance but also leverages the recently introduced partial prerendering in Next.js 14.

#### Folder Structure

- **/app**: Contains all the routes, components, and logic for the application.
- **/app/lib**: Contains reusable utility functions and data fetching functions.
- **/app/ui**: Contains all the UI components such as cards, tables, and forms.
- **/public**: Contains all the static assets.
- **/scripts**: Contains a seeding script to populate database.

### Project Setup

#### Cloning the Repository

First, clone the repository to your local machine using Git. Open a terminal and run the following command:

```
git clone https://github.com/thewebsitedev/nextjs-blog.git
cd nextjs-blog
```

#### Installing Dependencies
Now install the project dependencies using npm:
```
npm install
```
Or if you prefer using yarn, simply run:
```
yarn
```

#### Configuring Environment Variables
The project requires certain environment variables to be set for features like database access and authentication to work correctly. You'll need to create a .env.local file in the root of the project directory. Here's a template of what should be included:

```
POSTGRES_URL=
POSTGRES_PRISMA_URL=
POSTGRES_URL_NON_POOLING=
POSTGRES_USER=
POSTGRES_HOST=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=
AUTH_SECRET=
AUTH_URL=
```
> Note: I will send the variables I used in the email.

#### Running the Project
Finally, you can run the project in development mode using the following command:
```
npm run dev
```
Or if you're using yarn:
```
yarn dev
```
Or using vercel
```
vercel dev
```

Open [http://localhost:3000](http://localhost:3000) on a browser to see the result.

### CSS Framework
By integrating Tailwind CSS, a utility-first CSS framework, the project benefits from a highly customizable and responsive design, ensuring that the blog is as aesthetically pleasing as it is functional. Tailwind's component-friendly architecture, coupled with Headless UI and Heroicons, enables a rich, interactive user interface without sacrificing accessibility or usability.

### Authentication
I have utlizes bcrypt for hashing and securely managing user passwords, and Next-Auth for handling authentication and session management. This ensures that the user data is secure. I have also used the @vercel/postgres library to manage the database. This ensures that the application can handle growth without compromising on performance. I have made use of a middleware to ensure that only authenticated users can access certain routes. This ensures that the application is secure.

The user can logout and end session by clicking on the logout button in the navbar.

Pages:
- **Login** - /login
- **Register** - /signup

### Validation
The utilization of Zod for schema validation emphasizes the project's dedication to reliability and robust data handling. The forms are validated on both the client and server side to ensure that the data is valid and consistent.

### Blog Functionality

#### Blog Posts
All the posts are visible on the homepage with proper **pagination**. The user can also edit and delete their posts from the dashboard. The user can also view all the posts on the homepage. The user can also view a single post by clicking on the post card. The user can also view all the posts in a category by clicking on the category name.

#### Search
The user can also search for posts by typing in the search bar.

#### Dashboard
Users can create, edit and delete their own blog posts. Once logged in, a user can navgiate to the dashboard page `/dashboard` where they can create a new post. 

The project utilizes modern JavaScript libraries and frameworks, such as React Markdown for rendering markdown content, react-toastify for displaying notifications, and use-debounce for enhancing user input handling.

### SEO Optimization
The project's use of Next.js 14's built-in SEO optimization features, such as automatic generation of meta tags and canonical links, ensures that the blog is optimized for search engines. The inclusion of the next-sitemap library further enhances the blog's SEO capabilities by generating a sitemap for the application.

Main metadata for the blog is defined in the layout.tsx file in the root of the app folder. For dynamic metadata, generateMetadata() function is used wherever appropriate.

**Opengraph**: opengraph-image.png in the root of the app folder is used to generate the og:image meta tag for the blog's homepage.

### Code Reusability (DRY)
The project utlizes the DRY principle to ensure that code is reusable and maintainable. The use of React components, such as the PostCard component, allows for the creation of a consistent and cohesive user interface, while the use of React hooks, such as useDebounce, ensures that code is efficient.

### Bonus Features

#### Bonus Feature 1: SSR for blog posts
I have used SSR for blog posts. This means that the blog posts are rendered on the server and sent to the client as HTML. This ensures that the blog posts are SEO optimized and load faster. I have utilised partial prerendering for the blog posts. This means that the blog posts are only prerendered when they are visited. This ensures that the blog posts are not prerendered unnecessarily. For posts to appear gracefully, I have used Suspense from React to display a loading skeleton while the post is being fetched. This ensures that the user experience is not compromised

#### Bonus Feature 2: Categories, Category Pages
I have added categories to the blog. This means that each post can be assigned a category. I have also added category pages. This means that each category has its own page. This ensures that the blog is more organized and easier to navigate.

### Challenges and Solutions

#### Challenge 1: Partial Prerendering
Since it is a very new feature therefore I had to spend some time reading the documentation to understand it properly.

#### Challenge 2: Authentication
I went with Next-Auth for authentication. I had to spend some time reading the documentation to understand it properly. Since I used a postgres database, I made use of the credentials provider instead of going through the API route using JWT tokens. Moving forward, Next.js will favouring the use of server authentication instead of client authentication to minimise security concerns introduced with API calls. Therefore, I decided to go with the credentials provider.