import React from "react";
import BackToTop from "./BackToTop";

import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <div>
      <Header />      
      <main className="dark:bg-gray-800 w-full px-4 pb-12">
          <div className="container max-w-4xl mx-auto antialiased pt-6">{children}</div>
      </main>
      <Footer />  
      <BackToTop />
    </div>
  );
}