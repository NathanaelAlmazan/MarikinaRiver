"use server";
import React from 'react';
import Header from './Header';
import Footer from './Footer';

export default async function AppBarLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
}