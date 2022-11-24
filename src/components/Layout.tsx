import React from "react";
import BackToTop from "./BackToTop";

import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <div>
      <Header />      
      <main className="dark:bg-lime-900/10 w-full px-4 pb-12 bg-lime-200/10">
          <div className="container max-w-4xl mx-auto antialiased pt-8">      
            {children}
          </div>
      </main>
      <Footer />  
      <BackToTop />
    </div>
  );
}