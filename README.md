

# annot8 📝

> **Read, Doodle & Write.**
> A beautiful, dual-view workspace designed for seamless PDF reading and note-taking.
<br>

<img width="1919" height="868" alt="image" src="https://github.com/user-attachments/assets/ca44ca56-f219-46cb-b7ab-62d80865b524" />

## 🌟 Introduction

**annot8** combines a sleek PDF viewer with a markdown note-taking workspace, letting you read, annotate, and write simultaneously—all in your browser.

## ✨ Key Features

-   **Dual-View Workspace**: PDF viewer and notes panel side-by-side.
-   **PDF Tools**: Draw, highlight, and add text directly on your document.
-   **Markdown Support**: Write rich notes with syntax highlighting.
-   **Privacy Focused**: Local-only, browser-based processing.
-   **Export**: Download annotated PDFs and notes (`.md`/`.txt`).

## 🛠️ Technology Stack

annot8 is built using a modern, robust tech stack to ensure performance and scalability:

-   **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
-   **Frontend Library**: [React 19](https://react.dev/)
-   **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
-   **PDF Rendering**: [React-PDF](https://github.com/wojtekmaj/react-pdf)
-   **Canvas & Annotation**: [Fabric.js](http://fabricjs.com/)
-   **PDF Manipulation**: [pdf-lib](https://pdf-lib.js.org/)
-   **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)


## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

-   **Node.js**: Version 18.17 or later
-   **npm**: Installed with Node.js

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/ss1ngh/annot8.git
    cd annot8
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```

4.  **Open in Browser**:
    Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 📂 Project Structure

```
annot8/
├── app/                  
│   ├── guide/            
│   ├── workspace/        
│   ├── layout.tsx        
│   └── page.tsx          
├── components/           
│   ├── landing/          
│   ├── notes/            
│   ├── pdf/              
│   └── toolbar/          
├── lib/                  
├── public/              
├── store/                
└── ...config files       
```

## 🗺️ Routes

-   `/` - **Landing Page**: Project introduction and entry point.
-   `/workspace` - **Main Application**: The core interface where file upload, reading, and annotation happen.
-   `/guide` - **User Guide**: Instructions and tips on how to use annot8 effectively.
