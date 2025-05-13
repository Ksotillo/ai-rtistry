# AIrtistry - AI Art Social Platform

AIrtistry is a Next.js-based social platform for sharing, discovering, and discussing AI-generated artwork. The platform enables users to showcase their AI art creations, follow other artists, interact with posts, and engage with a community of AI art enthusiasts.

## Features

- **News Feed**: Browse AI artwork from friends, recent posts, or popular content
- **Post Creation**: Share AI-generated artwork with prompts, model information, and descriptions
- **Interactions**: Like, comment, save, or report posts
- **Stories**: View ephemeral content from other users
- **Friends System**: Find, follow, and manage connections with other artists
- **Direct Messaging**: Communicate with other users
- **User Profiles**: Customize your profile and manage settings
- **Content Discovery**: Explore recommended topics and suggested users

## Project Structure

The project has been refactored into a modular component architecture:

```
app/
├── components/
│   ├── friends/        # Friend-related components
│   ├── layout/         # Layout components (Sidebar, MobileMenu, etc.)
│   ├── sections/       # Major section components (NewsFeed, Messages, etc.)
│   └── ui/             # Reusable UI components
├── types/              # TypeScript type definitions
├── utils/              # Utility functions and constants
├── hooks/              # Custom React hooks
├── context/            # React context providers
└── page.tsx            # Main page component
```

## Getting Started

First, install dependencies:

```bash
npm install
# or
yarn install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Technologies Used

- **Next.js** - React framework for production
- **React** - UI library
- **TypeScript** - Type-safe JavaScript
- **React-Toastify** - Toast notifications
- **Lucide React** - Icon library
- **Tailwind CSS** - Utility-first CSS framework

## Development Notes

This project is organized using a component-based architecture. Each major section of the application has been modularized for better maintainability and code organization.

- **Components**: Reusable UI elements and section-specific components
- **Types**: Shared TypeScript definitions
- **Utils**: Helper functions and data utilities

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
