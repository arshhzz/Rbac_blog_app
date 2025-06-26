# Blog App
##(RBAC) system in a blog platform.

## Setup

Backend:
1. cd Backend  
2. npm install  
3. Create `.env` file with:  

Libraries Used (Backend):

JWT for authentication tokens
Bcrypt for password hashing
Zod for input validation
Express, MongoDB, and Mongoose for API and database integration

PORT=5000
MONGO_URI=yourMongoUrL here
JWT_SECRET=secret123 > this is an example .env, put your own credentials in it, to work as per expectations.

4. node index.js

Frontend:
1. cd Frontend  
2. npm install  
3. npm run dev

Frontend Tech Stack:

React.js
Axios
Tailwind CSS
React Router DOM

## Features

For Users ::
if you are an user, you will be able to view the blog website and read the blogs published/posted by admins
-you can like them and see the author and post details down the blog.
That's all.

For Admin ::
You can create blogs, update the old ones and can even delete the ones you want to, also you have all the features of 
a user.

// Admin role can be created via backend by the code runner/host only, could be done via a GUI like Compass. (Since we using MONGO).

