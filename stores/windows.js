import { defineStore } from "pinia";

export const useWindowsStore = defineStore("windows", {
  state: () => ({
    // Height of Fullscreen Window
    // fullscreenWindowHeight: window.innerHeight + "px",

    activeWindow: "",

    // Active Windows Array State
    activeWindows: [],

    // Z-index State
    zIndex: 2,

    // Time Machine / Future Mode State
    isFutureMode: false,
    isTimeWarping: false,
    timeWarpDirection: 'future',

    windows: [
      {
        windowId: "BiographyWindow", // Unique ID
        windowState: "close", // Window State [open, close, minimize]
        displayName: "Biography", // Display Name (title under icon)
        windowComponent: "window", // Window Component (can be changed to use modified windows)
        windowContent: "bio", // Window Content (used under slots)
        windowContentPadding: {
          top: null,
          right: null,
          bottom: null,
          left: null,
        }, // Window Content Padding
        position: "absolute", // Window Position
        positionX: "5vw", // Window Position X (when first opened)
        positionY: "5%", // Window Position Y (when first opened)
        iconImage: "bio.png", // Window Icon Image
        altText: "Biography", // Window Icon Alt Text
        fullscreen: false, // Window Fullscreen State [true, false]
        showInAppGrid: true,
        showInNavbar: true,
      },
      {
        windowId: "ResumeWindow", // Unique ID
        windowState: "close", // Window State [open, close, minimize]
        displayName: "Résumé", // Display Name (title under icon)
        windowComponent: "window", // Window Component (can be changed to use modified windows)
        windowContent: "resume", // Window Content (used under slots)
        windowContentPadding: {
          top: "0",
          right: "0",
          bottom: "0",
          left: "0",
        }, // Window Content Padding
        position: "absolute", // Window Position
        positionX: "10vw", // Window Position X (when first opened)
        positionY: "15vh", // Window Position Y (when first opened)
        iconImage: "resume.png", // Window Icon Image
        altText: "Résumé", // Window Icon Alt Text
        fullscreen: false, // Window Fullscreen State [true, false]
        showInAppGrid: true,
        showInNavbar: true,
      },
      {
        windowId: "ImagePreviewWindow",
        windowState: "close",
        displayName: "Media Viewer",
        windowComponent: "ImagePreviewWindow",
        windowContent: "",
        windowContentPadding: {
          top: "1px",
          right: "10px",
          bottom: "10px",
          left: "10px",
        },
        position: "absolute",
        positionX: "6vw",
        positionY: "12vh",
        iconImage: "file.png",
        altText: "Photos",
        fullscreen: false,
        showInAppGrid: false,
        showInNavbar: false,
        // imagePreview: file.src
      },

    //   {
    //     windowId: "TestBlogWindow",
    //     windowState: "close",
    //     displayName: "Blog",
    //     windowComponent: "window",
    //     windowContent: "testblog",
    //     windowContentPadding: {
    //       top: '0px',
    //       right: '0px',
    //       bottom: '0px',
    //       left: '0px',
    //     },
    //     position: "absolute",
    //     positionX: "6vw",
    //     positionY: "12vh",
    //     iconImage: "noss.webp",
    //     altText: "Blog",
    //     fullscreen: false,
    //     showInAppGrid: true,
    //     showInNavbar: true,
    //   },
    {
        windowId: "AppleWWDC2021",
        windowState: "close",
        displayName: "WWDC 2021",
        windowComponent: "window",
        windowContent: "wwdc2021",
        windowContentPadding: {
          top: null,
          right: null,
          bottom: null,
          left: null,
        },
        position: "absolute",
        positionX: "4vw",
        positionY: "12vh",
        iconImage: "apple.png",
        altText: "Apple WWDC 2021",
        fullscreen: false,
        showInAppGrid: false,
        showInNavbar: false,
      },
      {
        windowId: "AppleWWDC2022",
        windowState: "close",
        displayName: "WWDC 2022",
        windowComponent: "window",
        windowContent: "wwdc2022",
        windowContentPadding: {
          top: null,
          right: null,
          bottom: null,
          left: null,
        },
        position: "absolute",
        positionX: "4vw",
        positionY: "12vh",
        iconImage: "apple2.png",
        altText: "Apple WWDC 2022",
        fullscreen: false,
        showInAppGrid: false,
        showInNavbar: false,
      },
      {
        windowId: "AppleWWDC2023",
        windowState: "close",
        displayName: "WWDC 2023",
        windowComponent: "window",
        windowContent: "wwdc2023",
        windowContentPadding: {
          top: null,
          right: null,
          bottom: null,
          left: null,
        },
        position: "absolute",
        positionX: "4vw",
        positionY: "12vh",
        iconImage: "apple3.png",
        altText: "Apple WWDC 2023",
        fullscreen: false,
        showInAppGrid: false,
        showInNavbar: false,
      },
      {
        windowId: "MailWindow",
        windowState: "close",
        displayName: "Mail",
        windowComponent: "mail",
        windowContent: "",
        windowContentPadding: {
          top: "0",
          right: "0",
          bottom: "0",
          left: "0",
        },
        position: "absolute",
        positionX: "6vw",
        positionY: "12vh",
        iconImage: "mail.png",
        altText: "Mail",
        fullscreen: false,
        showInAppGrid: true,
        showInNavbar: true,
      },
      {
        windowId: "ICPC2023Window",
        windowState: "close",
        displayName: "ICPC 2023",
        windowComponent: "window",
        windowContent: "icpc2023",
        windowContentPadding: {
          top: null,
          right: null,
          bottom: null,
          left: null,
        },
        position: "absolute",
        positionX: "8vw",
        positionY: "15vh",
        iconImage: "star.png",
        altText: "ICPC 2023",
        fullscreen: false,
        showInAppGrid: true,
        showInNavbar: true,
      },
      {
        windowId: "ICPC2024Window",
        windowState: "close",
        displayName: "ICPC 2024",
        windowComponent: "window",
        windowContent: "icpc2024",
        windowContentPadding: {
          top: null,
          right: null,
          bottom: null,
          left: null,
        },
        position: "absolute",
        positionX: "10vw",
        positionY: "20vh",
        iconImage: "star.png",
        altText: "ICPC 2024",
        fullscreen: false,
        showInAppGrid: true,
        showInNavbar: true,
      },
      {
        windowId: "MinesweeperWindow",
        windowState: "close",
        displayName: "Minesweeper",
        windowComponent: "window",
        windowContent: "minesweeper",
        windowContentPadding: {
          top: "0px",
          right: "0px",
          bottom: "0px",
          left: "0px",
        },
        position: "absolute",
        positionX: "18vw",
        positionY: "10vh",
        iconImage: "minesweeper.png",
        altText: "Minesweeper",
        fullscreen: false,
        windowWidth: 340,
        windowHeight: 410,
        windowMinWidth: 260,
        windowMinHeight: 320,
        showInAppGrid: true,
        showInNavbar: true,
      },
      {
        windowId: "FutureWindow",
        windowState: "close",
        displayName: "Take Me to the Future",
        windowComponent: "window",
        windowContent: "",
        windowContentPadding: {
          top: null,
          right: null,
          bottom: null,
          left: null,
        },
        position: "absolute",
        positionX: "20vw",
        positionY: "25vh",
        iconImage: "future.png",
        altText: "Take Me to the Future",
        fullscreen: false,
        showInAppGrid: false,
        showInNavbar: false,
      },
      {
        windowId: "ProjectsWindow",
        windowState: "close",
        displayName: "GitHub Projects",
        windowComponent: "FilesWindow",
        windowContent: "",
        windowContentPadding: {
          top: "0px",
          right: "0px",
          bottom: "0px",
          left: "0px",
        },
        position: "absolute",
        positionX: "12vw",
        positionY: "8vh",
        iconImage: "projects.png",
        altText: "GitHub Projects",
        fullscreen: false,
        showInAppGrid: false,
        showInNavbar: true,
        folderSize: 736287744,
        folderContent: [
          {
            id: 0,
            title: "campus-compass",
            type: "project",
            windowId: "ProjectCampusCompassWindow",
            iconImage: "compass.png",
            altText: "Campus Compass",
            size: 256000,
            repoUrl: "https://github.com/ossmanGR45/campus-compass"
          },
          {
            id: 1,
            title: "drawing-in-javafx",
            type: "project",
            windowId: "ProjectDrawingJavaFXWindow",
            iconImage: "paint.png",
            altText: "JavaFX Drawing App",
            size: 4096,
            repoUrl: "https://github.com/ossmanGR45/drawing-in-javafx"
          },
          {
            id: 2,
            title: "Risk-mangement-system",
            type: "project",
            windowId: "ProjectRiskManagementWindow",
            iconImage: "shield.png",
            altText: "Risk Management System",
            size: 4227072,
            repoUrl: "https://github.com/ossmanGR45/final-integrated-Risk-mangement-system"
          },
          {
            id: 3,
            title: "local-hybrid-rag",
            type: "project",
            windowId: "ProjectLocalHybridRagWindow",
            iconImage: "brain.png",
            altText: "Local Hybrid Search RAG",
            size: 5120,
            repoUrl: "https://github.com/ossmanGR45/local-hybrid-rag"
          },
          {
            id: 4,
            title: "local-rag-fastapi",
            type: "project",
            windowId: "ProjectLocalRagFastApiWindow",
            iconImage: "server.png",
            altText: "Local RAG FastAPI",
            size: 4096,
            repoUrl: "https://github.com/ossmanGR45/local-rag-fastapi"
          },
          {
            id: 5,
            title: "Othmans_portfolio",
            type: "project",
            windowId: "ProjectPortfolioWindow",
            iconImage: "computer.png",
            altText: "Windows 95 Portfolio",
            size: 730291200,
            repoUrl: "https://github.com/ossmanGR45/Othmans_portfolio"
          },
          {
            id: 6,
            title: "projectHCI",
            type: "project",
            windowId: "ProjectHciWindow",
            iconImage: "monitor.png",
            altText: "Project HCI",
            size: 11264,
            repoUrl: "https://github.com/ossmanGR45/projectHCI"
          },
          {
            id: 7,
            title: "QM-Risk-Core",
            type: "project",
            windowId: "ProjectQmWindow",
            iconImage: "gear.png",
            altText: "QM Enterprise Backend",
            size: 1330176,
            repoUrl: "https://github.com/ossmanGR45/QM"
          },
          {
            id: 8,
            title: "reporting-app",
            type: "project",
            windowId: "ProjectReportingWindow",
            iconImage: "report.png",
            altText: "E-Gov Issue Reporting",
            size: 163840,
            repoUrl: "https://github.com/ossmanGR45/reporting"
          }
        ]
      },
      {
        windowId: "ProjectCampusCompassWindow",
        windowState: "close",
        displayName: "Campus Compass",
        windowComponent: "window",
        windowContent: "project-detail",
        windowContentPadding: {
          top: "0px",
          right: "0px",
          bottom: "0px",
          left: "0px",
        },
        position: "absolute",
        positionX: "14vw",
        positionY: "12vh",
        iconImage: "compass.png",
        altText: "Campus Compass",
        fullscreen: false,
        showInAppGrid: true,
        showInNavbar: true,
        projectData: {
          repoName: "campus-compass",
          title: "Campus Compass",
          subtitle: "University Campus Navigation & Student Services Platform",
          iconImage: "compass.png",
          language: "TypeScript",
          languageColor: "#3178c6",
          defaultBranch: "main",
          repoUrl: "https://github.com/ossmanGR45/campus-compass",
          sizeBytes: 256000,
          tags: ["React 18", "TypeScript", "Vite", "Supabase", "Tailwind CSS", "Radix UI", "TanStack Query", "Zod"],
          summary: "A modern university navigation, student portal, and campus utility application. Engineered with React and TypeScript, leveraging Supabase for cloud authentication, real-time database queries, and secure session management.",
          features: [
            "Interactive campus navigation and facility locator for university students",
            "Supabase integration for secure user auth, session management, and profile storage",
            "Tailwind CSS & Radix UI accessible UI primitives with responsive layouts",
            "TanStack Query for asynchronous data caching and optimistic UI updates",
            "Schema-driven form validation with Zod and React Hook Form"
          ],
          quickstart: [
            "git clone https://github.com/ossmanGR45/campus-compass.git",
            "cd campus-compass",
            "npm install",
            "npm run dev"
          ]
        }
      },
      {
        windowId: "ProjectDrawingJavaFXWindow",
        windowState: "close",
        displayName: "JavaFX Drawing App",
        windowComponent: "window",
        windowContent: "project-detail",
        windowContentPadding: {
          top: "0px",
          right: "0px",
          bottom: "0px",
          left: "0px",
        },
        position: "absolute",
        positionX: "16vw",
        positionY: "14vh",
        iconImage: "paint.png",
        altText: "JavaFX Drawing App",
        fullscreen: false,
        showInAppGrid: true,
        showInNavbar: true,
        projectData: {
          repoName: "drawing-in-javafx",
          title: "JavaFX Drawing Application",
          subtitle: "Interactive Desktop Drawing & Graphics Sketchpad",
          iconImage: "paint.png",
          language: "Java",
          languageColor: "#b07219",
          defaultBranch: "main",
          repoUrl: "https://github.com/ossmanGR45/drawing-in-javafx",
          sizeBytes: 4096,
          tags: ["Java", "JavaFX", "Object-Oriented Programming", "Event-Driven Architecture", "GUI"],
          summary: "An interactive desktop drawing application built with JavaFX demonstrating proficiency in Object-Oriented Programming (OOP), modular GUI development, and event-driven architectures in Java.",
          features: [
            "Interactive canvas supporting dynamic stroke widths, colors, and brush modes",
            "Vector drawing primitives including lines, rectangles, circles, and freehand curves",
            "Event-driven architecture listening to mouse drag, click, and hover interactions",
            "Clean separation of UI scene graph components and underlying canvas logic",
            "Lightweight native desktop packaging running smoothly on cross-platform JVMs"
          ],
          quickstart: [
            "git clone https://github.com/ossmanGR45/drawing-in-javafx.git",
            "cd drawing-in-javafx",
            "mvn clean javafx:run"
          ]
        }
      },
      {
        windowId: "ProjectRiskManagementWindow",
        windowState: "close",
        displayName: "Risk Management System",
        windowComponent: "window",
        windowContent: "project-detail",
        windowContentPadding: {
          top: "0px",
          right: "0px",
          bottom: "0px",
          left: "0px",
        },
        position: "absolute",
        positionX: "18vw",
        positionY: "10vh",
        iconImage: "shield.png",
        altText: "Risk Management System",
        fullscreen: false,
        showInAppGrid: true,
        showInNavbar: true,
        projectData: {
          repoName: "final-integrated-Risk-mangement-system",
          title: "Enterprise Risk Management System",
          subtitle: "Institutional Decision Support & Dynamic Heat-Map Risk Engine",
          iconImage: "shield.png",
          language: "TypeScript",
          languageColor: "#3178c6",
          defaultBranch: "main",
          repoUrl: "https://github.com/ossmanGR45/final-integrated-Risk-mangement-system",
          sizeBytes: 4227072,
          tags: ["React", "TypeScript", "Vite", "Tailwind CSS", "REST API", "Heatmap Matrix"],
          summary: "Enterprise web application built for the University of Jordan featuring a multi-stage approval workflow, granular role-based access control (RBAC), and dynamic risk score calculations connected to ASP.NET Core services.",
          features: [
            "Multi-stage workflow with role-based access control (RBAC) for departments and admins",
            "Dynamic assessment engine calculating probability × impact risk scores in real-time",
            "Interactive 5x5 heat-map matrix visualizing organizational risk distribution",
            "Comprehensive audit logs and automated mitigation action tracking",
            "Synchronized with the QM .NET Core enterprise backend database"
          ],
          quickstart: [
            "git clone https://github.com/ossmanGR45/final-integrated-Risk-mangement-system.git",
            "cd final-integrated-Risk-mangement-system",
            "npm install",
            "npm run dev"
          ]
        }
      },
      {
        windowId: "ProjectLocalHybridRagWindow",
        windowState: "close",
        displayName: "Local Hybrid RAG",
        windowComponent: "window",
        windowContent: "project-detail",
        windowContentPadding: {
          top: "0px",
          right: "0px",
          bottom: "0px",
          left: "0px",
        },
        position: "absolute",
        positionX: "20vw",
        positionY: "12vh",
        iconImage: "brain.png",
        altText: "Local Hybrid Search RAG",
        fullscreen: false,
        showInAppGrid: true,
        showInNavbar: true,
        projectData: {
          repoName: "local-hybrid-rag",
          title: "Local Hybrid Search RAG Pipeline",
          subtitle: "Privacy-First Offline AI Search with ChromaDB, BM25 & Ollama",
          iconImage: "brain.png",
          language: "Python",
          languageColor: "#3572A5",
          defaultBranch: "main",
          repoUrl: "https://github.com/ossmanGR45/local-hybrid-rag",
          sizeBytes: 5120,
          tags: ["Python", "FastAPI", "ChromaDB", "BM25", "Ollama", "RRF", "Vector Search"],
          summary: "A 100% offline, privacy-first Retrieval-Augmented Generation (RAG) system combining Dense Vector Search (semantic similarity via ChromaDB) and Sparse Lexical Search (keyword precision via BM25) fused with Reciprocal Rank Fusion.",
          features: [
            "Hybrid retrieval combining dense vector similarity with BM25 sparse keyword search",
            "Reciprocal Rank Fusion (RRF) algorithm to rerank and synthesize top candidate documents",
            "100% offline local inference powered by Ollama with zero external API dependencies",
            "FastAPI asynchronous REST interface for high-throughput document ingestion and querying",
            "Smart overlapping document chunking optimizing context density for LLM responses"
          ],
          quickstart: [
            "git clone https://github.com/ossmanGR45/local-hybrid-rag.git",
            "cd local-hybrid-rag",
            "pip install -r requirements.txt",
            "uvicorn app.main:app --reload"
          ]
        }
      },
      {
        windowId: "ProjectLocalRagFastApiWindow",
        windowState: "close",
        displayName: "Local RAG FastAPI",
        windowComponent: "window",
        windowContent: "project-detail",
        windowContentPadding: {
          top: "0px",
          right: "0px",
          bottom: "0px",
          left: "0px",
        },
        position: "absolute",
        positionX: "22vw",
        positionY: "15vh",
        iconImage: "server.png",
        altText: "Local RAG FastAPI",
        fullscreen: false,
        showInAppGrid: true,
        showInNavbar: true,
        projectData: {
          repoName: "local-rag-fastapi",
          title: "Local RAG API with FastAPI",
          subtitle: "Fast Vector Indexing & Semantic Retrieval with ChromaDB & Ollama",
          iconImage: "server.png",
          language: "Python",
          languageColor: "#3572A5",
          defaultBranch: "main",
          repoUrl: "https://github.com/ossmanGR45/local-rag-fastapi",
          sizeBytes: 4096,
          tags: ["Python", "FastAPI", "ChromaDB", "Ollama", "nomic-embed-text", "REST API"],
          summary: "A privacy-centric local RAG backend built with FastAPI, ChromaDB, and Ollama. Uses nomic-embed-text embeddings for local embedding generation and fast vector search over private documents.",
          features: [
            "Local embedding computation using nomic-embed-text via Ollama",
            "Persistent document indexing in local ChromaDB vector collections",
            "Robust FastAPI endpoint architecture with strict Pydantic schemas",
            "Configurable similarity distance thresholds and top-K parameter tuning",
            "Offline execution ensuring data confidentiality and rapid response times"
          ],
          quickstart: [
            "git clone https://github.com/ossmanGR45/local-rag-fastapi.git",
            "cd local-rag-fastapi",
            "pip install -r requirements.txt",
            "uvicorn main:app --reload"
          ]
        }
      },
      {
        windowId: "ProjectPortfolioWindow",
        windowState: "close",
        displayName: "Windows 95 Portfolio",
        windowComponent: "window",
        windowContent: "project-detail",
        windowContentPadding: {
          top: "0px",
          right: "0px",
          bottom: "0px",
          left: "0px",
        },
        position: "absolute",
        positionX: "15vw",
        positionY: "11vh",
        iconImage: "computer.png",
        altText: "Windows 95 Portfolio",
        fullscreen: false,
        showInAppGrid: false,
        showInNavbar: true,
        projectData: {
          repoName: "Othmans_portfolio",
          title: "Windows 95 Themed Portfolio",
          subtitle: "Retro Nostalgic Interactive Operating System Portfolio in Vue 3",
          iconImage: "computer.png",
          language: "Vue",
          languageColor: "#41b883",
          defaultBranch: "main",
          repoUrl: "https://github.com/ossmanGR45/Othmans_portfolio",
          sizeBytes: 730291200,
          tags: ["Vue 3", "Nuxt 3", "Pinia", "Tailwind CSS", "Interact.js", "Vite"],
          summary: "An authentic, highly customized Windows 95 desktop environment running in the browser. Features draggable/resizable windows, active taskbar, Start Menu, File Explorer, custom icons, and project showcase.",
          features: [
            "Faithful Windows 95 aesthetic with authentic 3D beveled borders and typography",
            "Multi-window management system with z-index stacking, minimize, maximize, and drag",
            "Interactive Start Menu, App Grid, File Explorer with address bars, and Taskbar",
            "Integrated portfolio views: Biography, Résumé viewer, ICPC contests, and GitHub Explorer",
            "Nuxt 3 architecture with Pinia centralized state management and static deployment"
          ],
          quickstart: [
            "git clone https://github.com/ossmanGR45/Othmans_portfolio.git",
            "cd Othmans_portfolio/win95",
            "npm install",
            "npm run dev"
          ]
        }
      },
      {
        windowId: "ProjectHciWindow",
        windowState: "close",
        displayName: "Project HCI",
        windowComponent: "window",
        windowContent: "project-detail",
        windowContentPadding: {
          top: "0px",
          right: "0px",
          bottom: "0px",
          left: "0px",
        },
        position: "absolute",
        positionX: "17vw",
        positionY: "13vh",
        iconImage: "monitor.png",
        altText: "Project HCI",
        fullscreen: false,
        showInAppGrid: true,
        showInNavbar: true,
        projectData: {
          repoName: "projectHCI",
          title: "Human-Computer Interaction (HCI) Prototype",
          subtitle: "Usability-Focused Form Workflows & Interactive Message Interfaces",
          iconImage: "monitor.png",
          language: "HTML",
          languageColor: "#e34c26",
          defaultBranch: "main",
          repoUrl: "https://github.com/ossmanGR45/projectHCI",
          sizeBytes: 11264,
          tags: ["HTML5", "CSS3", "JavaScript", "HCI", "Usability Engineering", "UI/UX"],
          summary: "A Human-Computer Interaction prototype evaluating interface usability principles, progressive input flows, interactive form validation, and user messaging patterns.",
          features: [
            "Multi-stage interactive form interfaces designed to minimize user error",
            "Custom CSS styling testing visual hierarchy and input focus micro-interactions",
            "Responsive message layout evaluating clarity and cognitive load",
            "Clean vanilla JavaScript implementation without heavy external dependencies",
            "Heuristic evaluation design patterns adhering to classic Nielsen usability guidelines"
          ],
          quickstart: [
            "git clone https://github.com/ossmanGR45/projectHCI.git",
            "cd projectHCI",
            "# Open homepage.html in any modern browser"
          ]
        }
      },
      {
        windowId: "ProjectQmWindow",
        windowState: "close",
        displayName: "QM Risk Backend Core",
        windowComponent: "window",
        windowContent: "project-detail",
        windowContentPadding: {
          top: "0px",
          right: "0px",
          bottom: "0px",
          left: "0px",
        },
        position: "absolute",
        positionX: "19vw",
        positionY: "16vh",
        iconImage: "gear.png",
        altText: "QM Enterprise Backend",
        fullscreen: false,
        showInAppGrid: false,
        showInNavbar: true,
        projectData: {
          repoName: "QM",
          title: "QM Enterprise Risk & Quality Core",
          subtitle: "High-Performance ASP.NET Core Clean Architecture Backend",
          iconImage: "gear.png",
          language: "C#",
          languageColor: "#178600",
          defaultBranch: "master",
          repoUrl: "https://github.com/ossmanGR45/QM",
          sizeBytes: 1330176,
          tags: ["C#", "ASP.NET Core", "Entity Framework Core", "SQL Server", "Clean Architecture", "JWT"],
          summary: "Enterprise quality management and institutional risk assessment backend built with C# and ASP.NET Core. Designed with Clean Architecture and Domain-Driven Design (DDD) to support complex multi-department risk calculations.",
          features: [
            "Multi-layered Clean Architecture (DataAccess, Models, Utility, and API presentation)",
            "Entity Framework Core ORM with migrations, seeders, and relational mappings",
            "Comprehensive domain models: Risks, Strategic Goals, Departments, Actions, and Audits",
            "Secure token-based JWT authentication and granular role-based authorization",
            "Unit testing suite validating score calculations and enterprise data integrity"
          ],
          quickstart: [
            "git clone https://github.com/ossmanGR45/QM.git",
            "cd QM",
            "dotnet restore",
            "dotnet run --project WebApplication2"
          ]
        }
      },
      {
        windowId: "ProjectReportingWindow",
        windowState: "close",
        displayName: "E-Gov Issue Reporting",
        windowComponent: "window",
        windowContent: "project-detail",
        windowContentPadding: {
          top: "0px",
          right: "0px",
          bottom: "0px",
          left: "0px",
        },
        position: "absolute",
        positionX: "21vw",
        positionY: "18vh",
        iconImage: "report.png",
        altText: "E-Gov Issue Reporting",
        fullscreen: false,
        showInAppGrid: true,
        showInNavbar: true,
        projectData: {
          repoName: "reporting",
          title: "E-Government Civic Issue Reporting App",
          subtitle: "Cross-Platform Flutter Mobile Application for Municipal Services",
          iconImage: "report.png",
          language: "Dart",
          languageColor: "#00B4AB",
          defaultBranch: "main",
          repoUrl: "https://github.com/ossmanGR45/reporting",
          sizeBytes: 163840,
          tags: ["Flutter", "Dart", "Firebase Auth", "Cloud Firestore", "Mobile", "Cross-Platform"],
          summary: "A cross-platform mobile application developed with Flutter enabling citizens to report civic infrastructure issues (road damage, utility outages, public safety hazards) with live status tracking and Firebase integration.",
          features: [
            "Cross-platform iOS and Android mobile app built with Dart & Flutter",
            "Firebase Authentication for verified citizen access and identity protection",
            "Cloud Firestore backend synchronization for real-time ticket creation and tracking",
            "Media upload capability allowing photo and geolocation attachment to reports",
            "Administrative workflow updating incident resolution statuses in real time"
          ],
          quickstart: [
            "git clone https://github.com/ossmanGR45/reporting.git",
            "cd reporting",
            "flutter pub get",
            "flutter run"
          ]
        }
      },
      {
        windowId: "PhotosWindow", // Unique ID
        windowState: "close", // Window State [open, close, minimize]
        displayName: "Photos", // Display Name (title under icon)
        windowComponent: 'FilesWindow', // Window Component (can be changed to use modified windows)
        windowContent: '', // Window Content (used under slots)
        windowContentPadding: {
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px'
        }, // Window Content Padding
        position: "absolute", // Window Position
        positionX: "5vw", // Window Position X (when first opened)
        positionY: "10vh", // Window Position Y (when first opened)
        positionXLarge: "23vw",
        positionYLarge: "7%",
        iconImage: "photos.png", // Window Icon Image
        altText: "Photos", // Window Icon Alt Text
        fullscreen: false, // Window Fullscreen State [true, false]
        showInAppGrid: false,
        showInNavbar: false,
        folderContent: [
            {
              id: 0,
              title: "Leica Q",
              content: [
                {
                  id: 0,
                  title: "Q-3.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Leica Q/Q-3.JPG",
                  altText: "Q-3.JPG",
                  size: 2477506,
                },
                {
                  id: 1,
                  title: "Q-2.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Leica Q/Q-2.JPG",
                  altText: "Q-2.JPG",
                  size: 1265051,
                },
                {
                  id: 2,
                  title: "Q-1.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Leica Q/Q-1.JPG",
                  altText: "Q-1.JPG",
                  size: 1366527,
                },
              ],
              size: 5109084,
              type: "folder",
              altText: "Leica Q",
            },
            {
              id: 1,
              title: "Yashica FX-7",
              content: [
                {
                  id: 0,
                  title: "FX7-8.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Yashica FX-7/FX7-8.JPG",
                  altText: "FX7-8.JPG",
                  size: 2705525,
                },
                {
                  id: 1,
                  title: "FX7-1.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Yashica FX-7/FX7-1.JPG",
                  altText: "FX7-1.JPG",
                  size: 3285824,
                },
                {
                  id: 2,
                  title: "FX7-2.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Yashica FX-7/FX7-2.JPG",
                  altText: "FX7-2.JPG",
                  size: 2524860,
                },
                {
                  id: 3,
                  title: "FX7-3.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Yashica FX-7/FX7-3.JPG",
                  altText: "FX7-3.JPG",
                  size: 2126399,
                },
                {
                  id: 4,
                  title: "FX7-7.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Yashica FX-7/FX7-7.JPG",
                  altText: "FX7-7.JPG",
                  size: 2391497,
                },
                {
                  id: 5,
                  title: "FX7-6.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Yashica FX-7/FX7-6.JPG",
                  altText: "FX7-6.JPG",
                  size: 1903950,
                },
                {
                  id: 6,
                  title: "FX7-4.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Yashica FX-7/FX7-4.JPG",
                  altText: "FX7-4.JPG",
                  size: 2660198,
                },
                {
                  id: 7,
                  title: "FX7-5.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Yashica FX-7/FX7-5.JPG",
                  altText: "FX7-5.JPG",
                  size: 720153,
                },
              ],
              size: 18318406,
              type: "folder",
              altText: "Yashica FX-7",
            },
            {
              id: 2,
              title: "Mamiya RB67",
              content: [
                {
                  id: 0,
                  title: "RB67-17.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Mamiya RB67/RB67-17.JPG",
                  altText: "RB67-17.JPG",
                  size: 4018715,
                },
                {
                  id: 1,
                  title: "RB67-16.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Mamiya RB67/RB67-16.JPG",
                  altText: "RB67-16.JPG",
                  size: 6310380,
                },
                {
                  id: 2,
                  title: "RB67-14.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Mamiya RB67/RB67-14.JPG",
                  altText: "RB67-14.JPG",
                  size: 5023300,
                },
                {
                  id: 3,
                  title: "RB67-15.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Mamiya RB67/RB67-15.JPG",
                  altText: "RB67-15.JPG",
                  size: 4324262,
                },
                {
                  id: 4,
                  title: "RB67-11.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Mamiya RB67/RB67-11.JPG",
                  altText: "RB67-11.JPG",
                  size: 3841978,
                },
                {
                  id: 5,
                  title: "RB67-10.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Mamiya RB67/RB67-10.JPG",
                  altText: "RB67-10.JPG",
                  size: 1776580,
                },
                {
                  id: 6,
                  title: "RB67-12.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Mamiya RB67/RB67-12.JPG",
                  altText: "RB67-12.JPG",
                  size: 2880049,
                },
                {
                  id: 7,
                  title: "RB67-13.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Mamiya RB67/RB67-13.JPG",
                  altText: "RB67-13.JPG",
                  size: 3496524,
                },
                {
                  id: 8,
                  title: "RB67-8.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Mamiya RB67/RB67-8.JPG",
                  altText: "RB67-8.JPG",
                  size: 3183608,
                },
                {
                  id: 9,
                  title: "RB67-9.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Mamiya RB67/RB67-9.JPG",
                  altText: "RB67-9.JPG",
                  size: 3620249,
                },
                {
                  id: 10,
                  title: "RB67-4.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Mamiya RB67/RB67-4.JPG",
                  altText: "RB67-4.JPG",
                  size: 4628923,
                },
                {
                  id: 11,
                  title: "RB67-5.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Mamiya RB67/RB67-5.JPG",
                  altText: "RB67-5.JPG",
                  size: 3756349,
                },
                {
                  id: 12,
                  title: "RB67-7.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Mamiya RB67/RB67-7.JPG",
                  altText: "RB67-7.JPG",
                  size: 4537069,
                },
                {
                  id: 13,
                  title: "RB67-6.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Mamiya RB67/RB67-6.JPG",
                  altText: "RB67-6.JPG",
                  size: 2526863,
                },
                {
                  id: 14,
                  title: "RB67-2.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Mamiya RB67/RB67-2.JPG",
                  altText: "RB67-2.JPG",
                  size: 3589326,
                },
                {
                  id: 15,
                  title: "RB67-3.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Mamiya RB67/RB67-3.JPG",
                  altText: "RB67-3.JPG",
                  size: 2662097,
                },
                {
                  id: 16,
                  title: "RB67-1.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Mamiya RB67/RB67-1.JPG",
                  altText: "RB67-1.JPG",
                  size: 3956155,
                },
                {
                  id: 17,
                  title: "RB67-22.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Mamiya RB67/RB67-22.JPG",
                  altText: "RB67-22.JPG",
                  size: 1231755,
                },
                {
                  id: 18,
                  title: "RB67-23.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Mamiya RB67/RB67-23.JPG",
                  altText: "RB67-23.JPG",
                  size: 2724006,
                },
                {
                  id: 19,
                  title: "RB67-21.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Mamiya RB67/RB67-21.JPG",
                  altText: "RB67-21.JPG",
                  size: 1118255,
                },
                {
                  id: 20,
                  title: "RB67-20.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Mamiya RB67/RB67-20.JPG",
                  altText: "RB67-20.JPG",
                  size: 1028996,
                },
                {
                  id: 21,
                  title: "RB67-18.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Mamiya RB67/RB67-18.JPG",
                  altText: "RB67-18.JPG",
                  size: 4362951,
                },
                {
                  id: 22,
                  title: "RB67-19.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Mamiya RB67/RB67-19.JPG",
                  altText: "RB67-19.JPG",
                  size: 4082215,
                },
              ],
              size: 78680605,
              type: "folder",
              altText: "Mamiya RB67",
            },
            {
              id: 3,
              title: "Leica M4-P",
              content: [
                {
                  id: 0,
                  title: "M4P-2.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Leica M4-P/M4P-2.JPG",
                  altText: "M4P-2.JPG",
                  size: 616758,
                },
                {
                  id: 1,
                  title: "M4P-3.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Leica M4-P/M4P-3.JPG",
                  altText: "M4P-3.JPG",
                  size: 671916,
                },
                {
                  id: 2,
                  title: "M4P-1.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Leica M4-P/M4P-1.JPG",
                  altText: "M4P-1.JPG",
                  size: 432534,
                },
              ],
              size: 1721208,
              type: "folder",
              altText: "Leica M4-P",
            },
            {
              id: 4,
              title: "Canon FTb",
              content: [
                {
                  id: 0,
                  title: "FTb-3.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Canon FTb/FTb-3.JPG",
                  altText: "FTb-3.JPG",
                  size: 1853391,
                },
                {
                  id: 1,
                  title: "FTb-2.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Canon FTb/FTb-2.JPG",
                  altText: "FTb-2.JPG",
                  size: 294620,
                },
                {
                  id: 2,
                  title: "FTb-1.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Canon FTb/FTb-1.JPG",
                  altText: "FTb-1.JPG",
                  size: 832777,
                },
              ],
              size: 2980788,
              type: "folder",
              altText: "Canon FTb",
            },
            {
              id: 5,
              title: "Minolta Dynax",
              content: [
                {
                  id: 0,
                  title: "Dynax-4.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Minolta Dynax/Dynax-4.JPG",
                  altText: "Dynax-4.JPG",
                  size: 1565244,
                },
                {
                  id: 1,
                  title: "Dynax-5.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Minolta Dynax/Dynax-5.JPG",
                  altText: "Dynax-5.JPG",
                  size: 1424551,
                },
                {
                  id: 2,
                  title: "Dynax-7.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Minolta Dynax/Dynax-7.JPG",
                  altText: "Dynax-7.JPG",
                  size: 1878078,
                },
                {
                  id: 3,
                  title: "Dynax-6.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Minolta Dynax/Dynax-6.JPG",
                  altText: "Dynax-6.JPG",
                  size: 1467924,
                },
                {
                  id: 4,
                  title: "Dynax-2.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Minolta Dynax/Dynax-2.JPG",
                  altText: "Dynax-2.JPG",
                  size: 1929487,
                },
                {
                  id: 5,
                  title: "Dynax-3.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Minolta Dynax/Dynax-3.JPG",
                  altText: "Dynax-3.JPG",
                  size: 1827869,
                },
                {
                  id: 6,
                  title: "Dynax-1.jpg",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Minolta Dynax/Dynax-1.jpg",
                  altText: "Dynax-1.jpg",
                  size: 1505052,
                },
                {
                  id: 7,
                  title: "Dynax-11.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Minolta Dynax/Dynax-11.JPG",
                  altText: "Dynax-11.JPG",
                  size: 2111385,
                },
                {
                  id: 8,
                  title: "Dynax-10.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Minolta Dynax/Dynax-10.JPG",
                  altText: "Dynax-10.JPG",
                  size: 1575287,
                },
                {
                  id: 9,
                  title: "Dynax-12.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Minolta Dynax/Dynax-12.JPG",
                  altText: "Dynax-12.JPG",
                  size: 952801,
                },
                {
                  id: 10,
                  title: "Dynax-8.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Minolta Dynax/Dynax-8.JPG",
                  altText: "Dynax-8.JPG",
                  size: 1650754,
                },
                {
                  id: 11,
                  title: "Dynax-9.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Minolta Dynax/Dynax-9.JPG",
                  altText: "Dynax-9.JPG",
                  size: 1816302,
                },
              ],
              size: 19704734,
              type: "folder",
              altText: "Minolta Dynax",
            },
            {
              id: 6,
              title: "Rolleiflex K4A",
              content: [
                {
                  id: 0,
                  title: "K4A-1.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Rolleiflex K4A/K4A-1.JPG",
                  altText: "K4A-1.JPG",
                  size: 4533313,
                },
                {
                  id: 1,
                  title: "K4A-2.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Rolleiflex K4A/K4A-2.JPG",
                  altText: "K4A-2.JPG",
                  size: 2715035,
                },
                {
                  id: 2,
                  title: "K4A-3.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Rolleiflex K4A/K4A-3.JPG",
                  altText: "K4A-3.JPG",
                  size: 3321761,
                },
                {
                  id: 3,
                  title: "K4A-6.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Rolleiflex K4A/K4A-6.JPG",
                  altText: "K4A-6.JPG",
                  size: 2095538,
                },
                {
                  id: 4,
                  title: "K4A-4.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Rolleiflex K4A/K4A-4.JPG",
                  altText: "K4A-4.JPG",
                  size: 1720820,
                },
                {
                  id: 5,
                  title: "K4A-5.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Rolleiflex K4A/K4A-5.JPG",
                  altText: "K4A-5.JPG",
                  size: 2221798,
                },
              ],
              size: 16608265,
              type: "folder",
              altText: "Rolleiflex K4A",
            },
            {
              id: 7,
              title: "Fuji G617",
              content: [
                {
                  id: 0,
                  title: "G617-3.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Fuji G617/G617-3.JPG",
                  altText: "G617-3.JPG",
                  size: 1783412,
                },
                {
                  id: 1,
                  title: "G617-2.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Fuji G617/G617-2.JPG",
                  altText: "G617-2.JPG",
                  size: 1720995,
                },
                {
                  id: 2,
                  title: "G617-1.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Fuji G617/G617-1.JPG",
                  altText: "G617-1.JPG",
                  size: 1729038,
                },
                {
                  id: 3,
                  title: "G617-5.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Fuji G617/G617-5.JPG",
                  altText: "G617-5.JPG",
                  size: 1506793,
                },
                {
                  id: 4,
                  title: "G617-4.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Fuji G617/G617-4.JPG",
                  altText: "G617-4.JPG",
                  size: 1570263,
                },
              ],
              size: 8310501,
              type: "folder",
              altText: "Fuji G617",
            },
            {
              id: 8,
              title: "Leica M3",
              content: [
                {
                  id: 0,
                  title: "M3-33.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Leica M3/M3-33.JPG",
                  altText: "M3-33.JPG",
                  size: 852940,
                },
                {
                  id: 1,
                  title: "M3-27.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Leica M3/M3-27.JPG",
                  altText: "M3-27.JPG",
                  size: 1744815,
                },
                {
                  id: 2,
                  title: "M3-2.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Leica M3/M3-2.JPG",
                  altText: "M3-2.JPG",
                  size: 910816,
                },
                {
                  id: 3,
                  title: "M3-3.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Leica M3/M3-3.JPG",
                  altText: "M3-3.JPG",
                  size: 1982342,
                },
                {
                  id: 4,
                  title: "M3-26.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Leica M3/M3-26.JPG",
                  altText: "M3-26.JPG",
                  size: 2460131,
                },
                {
                  id: 5,
                  title: "M3-32.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Leica M3/M3-32.JPG",
                  altText: "M3-32.JPG",
                  size: 1022058,
                },
                {
                  id: 6,
                  title: "M3-24.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Leica M3/M3-24.JPG",
                  altText: "M3-24.JPG",
                  size: 1438429,
                },
                {
                  id: 7,
                  title: "M3-30.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Leica M3/M3-30.JPG",
                  altText: "M3-30.JPG",
                  size: 2656606,
                },
                {
                  id: 8,
                  title: "M3-18.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Leica M3/M3-18.JPG",
                  altText: "M3-18.JPG",
                  size: 2572457,
                },
                {
                  id: 9,
                  title: "M3-1.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Leica M3/M3-1.JPG",
                  altText: "M3-1.JPG",
                  size: 947821,
                },
                {
                  id: 10,
                  title: "M3-19.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Leica M3/M3-19.JPG",
                  altText: "M3-19.JPG",
                  size: 2674248,
                },
                {
                  id: 11,
                  title: "M3-31.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Leica M3/M3-31.JPG",
                  altText: "M3-31.JPG",
                  size: 809256,
                },
                {
                  id: 12,
                  title: "M3-25.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Leica M3/M3-25.JPG",
                  altText: "M3-25.JPG",
                  size: 1990432,
                },
                {
                  id: 13,
                  title: "M3-21.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Leica M3/M3-21.JPG",
                  altText: "M3-21.JPG",
                  size: 3539590,
                },
                {
                  id: 14,
                  title: "M3-35.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Leica M3/M3-35.JPG",
                  altText: "M3-35.JPG",
                  size: 869398,
                },
                {
                  id: 15,
                  title: "M3-4.jpg",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Leica M3/M3-4.jpg",
                  altText: "M3-4.jpg",
                  size: 2532715,
                },
                {
                  id: 16,
                  title: "M3-5.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Leica M3/M3-5.JPG",
                  altText: "M3-5.JPG",
                  size: 744483,
                },
                {
                  id: 17,
                  title: "M3-34.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Leica M3/M3-34.JPG",
                  altText: "M3-34.JPG",
                  size: 1035700,
                },
                {
                  id: 18,
                  title: "M3-20.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Leica M3/M3-20.JPG",
                  altText: "M3-20.JPG",
                  size: 2287979,
                },
                {
                  id: 19,
                  title: "M3-36.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Leica M3/M3-36.JPG",
                  altText: "M3-36.JPG",
                  size: 1067729,
                },
                {
                  id: 20,
                  title: "M3-22.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Leica M3/M3-22.JPG",
                  altText: "M3-22.JPG",
                  size: 2322286,
                },
                {
                  id: 21,
                  title: "M3-7.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Leica M3/M3-7.JPG",
                  altText: "M3-7.JPG",
                  size: 827370,
                },
                {
                  id: 22,
                  title: "M3-6.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Leica M3/M3-6.JPG",
                  altText: "M3-6.JPG",
                  size: 1157164,
                },
                {
                  id: 23,
                  title: "M3-23.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Leica M3/M3-23.JPG",
                  altText: "M3-23.JPG",
                  size: 2597351,
                },
                {
                  id: 24,
                  title: "M3-37.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Leica M3/M3-37.JPG",
                  altText: "M3-37.JPG",
                  size: 815457,
                },
                {
                  id: 25,
                  title: "M3-50.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Leica M3/M3-50.JPG",
                  altText: "M3-50.JPG",
                  size: 1119928,
                },
                {
                  id: 26,
                  title: "M3-44.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Leica M3/M3-44.JPG",
                  altText: "M3-44.JPG",
                  size: 757988,
                },
                {
                  id: 27,
                  title: "M3-45.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Leica M3/M3-45.JPG",
                  altText: "M3-45.JPG",
                  size: 1274517,
                },
                {
                  id: 28,
                  title: "M3-51.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Leica M3/M3-51.JPG",
                  altText: "M3-51.JPG",
                  size: 1783101,
                },
                {
                  id: 29,
                  title: "M3-47.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Leica M3/M3-47.JPG",
                  altText: "M3-47.JPG",
                  size: 1008929,
                },
                {
                  id: 30,
                  title: "M3-53.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Leica M3/M3-53.JPG",
                  altText: "M3-53.JPG",
                  size: 2421371,
                },
                {
                  id: 31,
                  title: "M3-52.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Leica M3/M3-52.JPG",
                  altText: "M3-52.JPG",
                  size: 2112080,
                },
                {
                  id: 32,
                  title: "M3-46.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Leica M3/M3-46.JPG",
                  altText: "M3-46.JPG",
                  size: 767638,
                },
                {
                  id: 33,
                  title: "M3-42.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Leica M3/M3-42.JPG",
                  altText: "M3-42.JPG",
                  size: 716074,
                },
                {
                  id: 34,
                  title: "M3-56.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Leica M3/M3-56.JPG",
                  altText: "M3-56.JPG",
                  size: 523248,
                },
                {
                  id: 35,
                  title: "M3-57.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Leica M3/M3-57.JPG",
                  altText: "M3-57.JPG",
                  size: 734875,
                },
                {
                  id: 36,
                  title: "M3-43.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Leica M3/M3-43.JPG",
                  altText: "M3-43.JPG",
                  size: 641204,
                },
                {
                  id: 37,
                  title: "M3-55.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Leica M3/M3-55.JPG",
                  altText: "M3-55.JPG",
                  size: 2078049,
                },
                {
                  id: 38,
                  title: "M3-41.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Leica M3/M3-41.JPG",
                  altText: "M3-41.JPG",
                  size: 944823,
                },
                {
                  id: 39,
                  title: "M3-40.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Leica M3/M3-40.JPG",
                  altText: "M3-40.JPG",
                  size: 804392,
                },
                {
                  id: 40,
                  title: "M3-54.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Leica M3/M3-54.JPG",
                  altText: "M3-54.JPG",
                  size: 641347,
                },
                {
                  id: 41,
                  title: "M3-59.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Leica M3/M3-59.JPG",
                  altText: "M3-59.JPG",
                  size: 1082101,
                },
                {
                  id: 42,
                  title: "M3-58.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Leica M3/M3-58.JPG",
                  altText: "M3-58.JPG",
                  size: 619018,
                },
                {
                  id: 43,
                  title: "M3-63.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Leica M3/M3-63.JPG",
                  altText: "M3-63.JPG",
                  size: 705959,
                },
                {
                  id: 44,
                  title: "M3-62.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Leica M3/M3-62.JPG",
                  altText: "M3-62.JPG",
                  size: 1937518,
                },
                {
                  id: 45,
                  title: "M3-48.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Leica M3/M3-48.JPG",
                  altText: "M3-48.JPG",
                  size: 702641,
                },
                {
                  id: 46,
                  title: "M3-60.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Leica M3/M3-60.JPG",
                  altText: "M3-60.JPG",
                  size: 2063091,
                },
                {
                  id: 47,
                  title: "M3-61.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Leica M3/M3-61.JPG",
                  altText: "M3-61.JPG",
                  size: 1834262,
                },
                {
                  id: 48,
                  title: "M3-49.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Leica M3/M3-49.JPG",
                  altText: "M3-49.JPG",
                  size: 753450,
                },
                {
                  id: 49,
                  title: "M3-12.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Leica M3/M3-12.JPG",
                  altText: "M3-12.JPG",
                  size: 1350738,
                },
                {
                  id: 50,
                  title: "M3-13.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Leica M3/M3-13.JPG",
                  altText: "M3-13.JPG",
                  size: 1123064,
                },
                {
                  id: 51,
                  title: "M3-11.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Leica M3/M3-11.JPG",
                  altText: "M3-11.JPG",
                  size: 763125,
                },
                {
                  id: 52,
                  title: "M3-39.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Leica M3/M3-39.JPG",
                  altText: "M3-39.JPG",
                  size: 597701,
                },
                {
                  id: 53,
                  title: "M3-8.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Leica M3/M3-8.JPG",
                  altText: "M3-8.JPG",
                  size: 1254391,
                },
                {
                  id: 54,
                  title: "M3-9.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Leica M3/M3-9.JPG",
                  altText: "M3-9.JPG",
                  size: 1411428,
                },
                {
                  id: 55,
                  title: "M3-38.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Leica M3/M3-38.JPG",
                  altText: "M3-38.JPG",
                  size: 853279,
                },
                {
                  id: 56,
                  title: "M3-10.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Leica M3/M3-10.JPG",
                  altText: "M3-10.JPG",
                  size: 907174,
                },
                {
                  id: 57,
                  title: "M3-28.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Leica M3/M3-28.JPG",
                  altText: "M3-28.JPG",
                  size: 1956501,
                },
                {
                  id: 58,
                  title: "M3-14.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Leica M3/M3-14.JPG",
                  altText: "M3-14.JPG",
                  size: 1139310,
                },
                {
                  id: 59,
                  title: "M3-15.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Leica M3/M3-15.JPG",
                  altText: "M3-15.JPG",
                  size: 941481,
                },
                {
                  id: 60,
                  title: "M3-29.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Leica M3/M3-29.JPG",
                  altText: "M3-29.JPG",
                  size: 1856275,
                },
                {
                  id: 61,
                  title: "M3-17.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Leica M3/M3-17.JPG",
                  altText: "M3-17.JPG",
                  size: 2771293,
                },
                {
                  id: 62,
                  title: "M3-16.JPG",
                  type: "photo",
                  src: "https://d3eubay99a85fr.cloudfront.net/Win95 Photos/Leica M3/M3-16.JPG",
                  altText: "M3-16.JPG",
                  size: 970795,
                },
              ],
              size: 87783732,
              type: "folder",
              altText: "Leica M3",
            },
          ],
        folderSize: 300000
    },
    ],
  }),

  getters: {
    getFullscreenWindowHeight() {
      let height = "0px";
      if (typeof window !== "undefined") {
        height = window.innerHeight + "px";
      }
      return height;
    },
  },

  actions: {
        getWindowById(windowId) {
            return this.windows.find((window) => window.windowId === windowId)
        },

        getWindowFullscreen(windowId) {
            return this.windows.find((window) => window.windowId === windowId).fullscreen
        },

        getActiveWindow() {
            return this.activeWindow
        },

        setActiveWindow(windowId) {
            this.activeWindow = windowId
        },

        setFullscreen(payload) {
            const getArrItem = () => {
                return this.windows.find(
                    (windows) => windows.windowId === payload.windowId
                );
            }
            const window = getArrItem();
            window.fullscreen = payload.fullscreen;
        },

        zIndexIncrement(windowId) {
            this.zIndex++
            if (document.getElementById(windowId)) {
                document.getElementById(windowId).style.zIndex = this.zIndex
            }
        },

        // Push Active Window
        pushActiveWindow(window) {
            this.activeWindows.push(window)
        },

        // Pop Active Window
        popActiveWindow(window) {
            const windowIndex = this.activeWindows.indexOf(window)
            if (windowIndex !== -1) {
                this.activeWindows.splice(windowIndex, 1)
            }
        },

        pushNewWindow(window) {
            this.windows.push(window)
        },

        setPhotoFolderContent(payload) {
            this.photoFolderContent = payload
        },

        setWindowState(payload) {
            // payload = {'windowState': 'open', 'windowId': 'WindowOne'}

            const getArrItem = () => {
                return this.windows.find(
                    (windows) => windows.windowId === payload.windowId
                );
            }

            const window = getArrItem();

            let preventAppendingOpenWindow = false;
            if (window.windowState == "open" || window.windowState == "minimize") {
                preventAppendingOpenWindow = true;
            }

            if (payload.windowState == "open") {
                window.windowState = payload.windowState;
                setTimeout(() => {
                    this.zIndexIncrement(payload.windowId);
                }, 0);
                setTimeout(() => {
                    this.setActiveWindow(payload.windowId);
                }, 0);
                if (preventAppendingOpenWindow == false) {
                    this.pushActiveWindow(window);
                }
            } else if (payload.windowState == "close") {
                setTimeout(() => {
                    window.windowState = payload.windowState;
                }, 0);
                setTimeout(() => {
                    this.popActiveWindow(window);
                }, 0)
                setTimeout(() => {
                    this.setActiveWindow("nil");
                }, 0)
            } else if (payload.windowState == "minimize") {
                setTimeout(() => {
                    window.windowState = payload.windowState;
                }, 0)
                setTimeout(() => {
                    this.setActiveWindow("nil");
                }, 0)
                
            } else {
                console.log("Error: windowState not found or invalid");
            }
        },

        triggerTimeWarp(direction = 'future') {
            if (this.isTimeWarping) return;
            this.timeWarpDirection = direction;
            this.isTimeWarping = true;
            setTimeout(() => {
                this.isFutureMode = (direction === 'future');
                setTimeout(() => {
                    this.isTimeWarping = false;
                }, 700);
            }, 1300);
        },
    }
});
