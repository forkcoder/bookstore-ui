import React from 'react';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import HomePage from '../pages/HomePage';
import BookPage from '../pages/BookPage';

const nonAuthRoutes = [
    { path: "/login", component: <LoginPage /> },
    { path: "/register", component: <RegisterPage /> }
];

const authRoutes = [
    { path: "/home", component: <HomePage /> },
    { path: "/books", component: <BookPage /> }
];
export { nonAuthRoutes, authRoutes };