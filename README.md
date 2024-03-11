This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Folder Structure
Below is the structured folder layout of this project:
- **public**
  - **assets**: Contains static assets like images, fonts, or other files that are served publicly.
  - **favicon**: Holds favicon-related files such as `.ico` files for different platforms.

- **src**
  - **components**: Stores React components that are reusable across different parts of the application.
  - **constant**: Contains constant values, configurations, or enums used throughout the application.
  - **context**: Holds React context providers and related context files for managing state at a higher level in the component tree.
  - **hooks**: Contains custom React hooks that encapsulate reusable logic, allowing sharing logic across different components.
  - **lib**: Stores utility functions, helper classes, or third-party libraries used across the application.
  - **pages**: Contains the pages of the application. Each file in this directory corresponds to a route in the app.
    - **api**: Contains API routes, implemented using Next.js API routes feature.
  - **services**: Contains modules responsible for interacting with external services such as APIs or databases (GraphQL).
  - **styles**: Holds global or shared stylesheets, CSS modules, or other styling-related files for the application.