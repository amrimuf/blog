import clsx from "clsx";
import React from "react";

import BackToTop from "./BackToTop";
import Footer from "./Footer";
import Header from "./Header";
import useLoaded from '@/hooks/useLoaded';

export default function Layout({ children }: { children: React.ReactNode }) {
  const isLoaded = useLoaded();

  return (
    <div>
      {/* <Header />       */}
      <main className="min-h-screen dark:bg-lime-900/10 w-full px-4 pb-12 bg-lime-200/10">
          <div className={clsx("container max-w-4xl mx-auto antialiased pt-8", isLoaded && 'fade-in-start')}>      
            {children}
          </div>
      </main>
      <Footer />  
      <BackToTop />
    </div>
  );
}