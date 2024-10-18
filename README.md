# Frontend (React Vite)

This is the frontend of the full-stack application built with React and Vite. The app is deployed on Netlify and connects to a backend API hosted on Railway.

## Features

-  CV manage,register,login,logout,recomondation
- API integration with backend for data management
- Modern UI built with React

## Getting Started

### Prerequisites

- Node.js installed on your local machine
- Backend API (Node.js/Express) running locally or deployed

### Installation

1. Clone this repository:

    ```bash
    git clone https://github.com/DiagM/CVfrontend.git
    cd your-frontend-repo
    ```

2. Install the required dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add the following variable:

    ```bash
    VITE_API_URL=https://your-backend-url.com
    ```

    Replace `https://your-backend-url.com` with your actual backend URL (deployed on Railway or locally).

4. Start the development server:

    ```bash
    npm run dev
    ```

    The server will run on `http://localhost:5173`.

### Deployment

#### Netlify Deployment

1. Push your repository to GitHub if you haven't done so already.
2. Go to [Netlify](https://www.netlify.com/) and create a new site.
3. Connect your GitHub repository to Netlify.
4. In the **Site Settings**, go to **Build & Deploy** > **Environment Variables** and add:

    - `VITE_API_URL=https://your-backend-url.com`

5. Netlify will automatically build and deploy your app.
6. After deployment, you will receive a live site URL from Netlify.

### Built With

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Netlify](https://www.netlify.com/)

## License

This project is licensed under the MIT License.

