export const profile = {
  name: "Vineeth Dharna",
  title: "Java Full Stack Software Engineer",
  location: "Ohio, USA",
  email: "dharnavineeth@gmail.com",
  github: "https://github.com/Vineeth-07",
  linkedin: "https://linkedin.com/in/vineeth-dharna/",
  image: "/profile-photo.png",
  status: "Open to Java full-stack and backend engineering opportunities",
  intro:
    "I build secure enterprise platforms with Java, Spring Boot, React, cloud-native delivery, and event-driven systems, with strong ownership across APIs, data, observability, and production operations.",
  statement:
    "Java Full Stack Software Engineer with 4+ years of experience designing, developing, and deploying secure enterprise applications across banking, consulting, and manufacturing environments. I work across Java 8/11/17/21, Spring Boot, Spring Security, Spring Cloud, Hibernate/JPA, React, Angular, PostgreSQL, Oracle, MongoDB, Kafka, RabbitMQ, AWS, Azure, Docker, Kubernetes, and CI/CD automation, and I bring a practical interest in AI-assisted workflows, OpenAI integrations, and intelligent automation for modern product teams.",
  heroPanelTitle:
    "Secure APIs, event-driven systems, and cloud-native enterprise delivery.",
  heroFocusLabel: "Core stack",
  heroFocusValue: "Java, Spring Boot, React, Kafka, PostgreSQL",
  heroSpecialtyLabel: "Strength",
  heroSpecialtyValue:
    "OAuth-secured APIs, CI/CD automation, and performance tuning",
};

export const metrics = [
  { value: "4+", label: "Years in enterprise engineering" },
  { value: "52%", label: "API response time reduction" },
  { value: "40%", label: "Deployment cycle improvement" },
  { value: "99.95%", label: "Infrastructure availability delivered" },
];

export const experience = [
  {
    company: "Bread Financial",
    role: "Java Full Stack Developer",
    location: "Ohio, USA",
    period: "May 2025 - Apr 2026",
    highlights: [
      "Developed Java 21 and Spring Boot microservices for retail credit workflows, implementing REST APIs, business logic, and database integrations across distributed backend services.",
      "Built secure RESTful APIs for payment processing and customer onboarding workflows using Spring Security, OAuth 2.0, and JWT, reducing authentication-related support issues by 25%.",
      "Enhanced customer-facing banking experiences using React.js and TypeScript, reducing frontend load times by nearly 20% through reusable, performance-optimized UI components.",
      "Improved PostgreSQL query performance by optimizing complex SQL queries and indexing strategies, reducing reporting execution times by nearly 25%.",
      "Developed event-driven backend workflows using Apache Kafka to enable asynchronous communication between payment, notification, and transaction-processing services, improving system scalability and service decoupling.",
      "Deployed and managed containerized backend services using Docker and Kubernetes in AWS environments, improving deployment consistency and streamlining application releases across multiple environments.",
      "Automated CI/CD workflows using Jenkins, reducing manual deployment effort by 40% and improving release consistency across development and production environments.",
      "Integrated OpenAI APIs into document-processing workflows to automate content generation and reduce repetitive manual support effort by nearly 30%.",
      "Collaborated with product managers, QA teams, and senior engineers during Agile sprints while expanding automated test coverage using JUnit 5 and Mockito, reducing regression risks and improving release quality.",
    ],
  },
  {
    company: "Deloitte",
    role: "Java Full Stack Developer",
    location: "Hyderabad, India",
    period: "Jul 2022 - Aug 2024",
    highlights: [
      "Built Java 17 and Spring Boot backend services for Deloitte’s internal consulting platform, automating regulatory reporting workflows and improving operational efficiency.",
      "Engineered secure RESTful APIs using Spring Security and JWT authentication, reducing integration-related issues by 20% across distributed internal platforms.",
      "Implemented enterprise authentication and directory integrations using LDAP and JNDI to centralize identity management, enforce role-based authorization, and secure platform access across multiple business units.",
      "Modernized client-facing dashboards using Angular and JavaScript, improving user experience and reducing reporting workflow processing delays by nearly 15% through asynchronous messaging with RabbitMQ.",
      "Enhanced Oracle DB reporting performance by optimizing Hibernate query execution, refining JPA persistence strategies, and implementing indexing improvements, reducing query response times by nearly 20%.",
      "Automated infrastructure provisioning in Azure using Terraform, reducing manual configuration effort and improving deployment consistency across internal platforms.",
      "Implemented automated testing workflows using JUnit 5, Mockito, and Selenium, reducing regression risks and improving release quality across Agile delivery cycles.",
    ],
  },
  {
    company: "3M",
    role: "Java Developer",
    location: "Bangalore, India",
    period: "May 2021 - Jun 2022",
    highlights: [
      "Developed and supported Java 8 and Spring Boot microservices for customer management and internal workflow applications, enabling scalable backend processing and business operations.",
      "Engineered secure RESTful APIs using Spring MVC and Spring Security, reducing application support issues by nearly 20% through improved authentication, authorization, and backend validation.",
      "Improved MySQL data-processing efficiency by optimizing Hibernate query execution, refining JPA entity mappings, and reducing ETL reporting job execution times by nearly 18%.",
      "Modernized legacy manufacturing workflows through SOAP and XML-based integrations, maintaining compatibility between newer services and existing enterprise applications processing thousands of XML-based records daily.",
      "Improved release coordination and delivery consistency across an 8-member engineering team by standardizing build workflows and dependency management using Maven.",
      "Performed root-cause analysis and resolved production issues across enterprise applications, reducing recurring support tickets by nearly 15% through systematic debugging, targeted fixes, and improved release validation practices.",
      "Enhanced application quality through API validation, peer code reviews, and release testing while maintaining REST API documentation using Swagger and OpenAPI standards.",
    ],
  },
];

export const projects = [
  {
    title: "Enterprise Sports Retail E-Commerce Platform",
    link: "https://github.com/Vineeth-07",
    subtitle: "JWT-secured commerce platform with Spring Boot, React, TypeScript, and Redis-backed performance tuning",
    period: "Project",
    stack: ["Java 17", "Spring Boot", "React", "TypeScript", "MySQL", "Redis", "GitHub Actions"],
    accent: "from-[#4cc9f0]/30 via-[#3a86ff]/20 to-transparent",
    summary:
      "Architected and delivered a scalable full-stack e-commerce experience with layered MVC design across catalog, cart, checkout, order management, and user account workflows.",
    outcomes: [
      "Implemented JWT-based authentication, registration, login, and database-driven RBAC to eliminate hardcoded credentials across protected endpoints.",
      "Built a responsive storefront with dynamic product search, multi-attribute filtering, recently viewed items, and streamlined cart-to-checkout flows across desktop and mobile.",
      "Authored 23 unit and integration tests with JUnit 5 and Spring Boot Test and wired GitHub Actions CI/CD to validate backend tests and frontend production builds on every push.",
    ],
  },
  {
    title: "TaskFlow AI",
    link: "https://github.com/Vineeth-07/taskflow-ai",
    subtitle: "Collaborative Kanban SaaS with AI-powered task workflows and realtime team coordination",
    period: "GitHub / Live Product",
    stack: ["React.js", "TypeScript", "Socket.IO", "Node.js", "Express.js", "PostgreSQL", "Prisma", "Redis", "OpenAI API"],
    accent: "from-[#ff7b00]/30 via-[#ffb703]/20 to-transparent",
    summary:
      "Independently designed the end-to-end system architecture, from data modelling and API design to cloud deployment across Vercel, Render, and Neon PostgreSQL, for a production-grade full-stack SaaS application.",
    outcomes: [
      "Built a real-time collaborative Kanban board using React.js, TypeScript, and Socket.IO, featuring drag-and-drop task tracking in 5 workflow stages, live notifications, and workspace-scoped activity logs to streamline team coordination.",
      "Developed a Node.js and Express.js REST API backed by PostgreSQL with Prisma ORM and Redis caching and rate limiting, managing 6 relational entities with optimized query performance.",
      "Implemented JWT authentication and RBAC, built activity feeds and audit logging, and designed modular backend components using service-oriented principles, validated with Jest tests.",
      "Integrated OpenAI API for AI-powered task summarization, reducing manual thread review time by 60% and shipping a production-ready AI feature in a live SaaS environment.",
    ],
  },
];

export const skillGroups = [
  {
    title: "Frontend",
    items: [
      "React.js",
      "Angular",
      "JavaScript",
      "TypeScript",
      "HTML5",
      "CSS / SCSS",
      "Bootstrap",
      "Responsive Design",
    ],
  },
  {
    title: "Java & Backend",
    items: [
      "Java 17 / 21",
      "Spring Boot",
      "Spring Security",
      "Spring Cloud",
      "Hibernate / JPA",
      "Microservices",
      "Node.js",
      "GraphQL / gRPC",
    ],
  },
  {
    title: "Data & Messaging",
    items: [
      "PostgreSQL",
      "Oracle DB",
      "MongoDB",
      "Redis",
      "Apache Kafka",
      "RabbitMQ",
      "REST APIs",
      "SQL / PL-SQL",
    ],
  },
  {
    title: "Cloud & Quality",
    items: [
      "AWS",
      "Azure",
      "Docker",
      "Kubernetes",
      "Terraform",
      "Jenkins",
      "JUnit 5",
      "Mockito",
      "Selenium",
      "OpenAI API",
      "Generative AI",
    ],
  },
];

export const education = {
  school: "University of Cincinnati",
  degree: "Master of Engineering in Computer Science",
  period: "Aug 2024 - Apr 2026",
  coursework: [
    "Advanced Algorithms",
    "Large Scale Software Engineering",
    "Distributed Systems",
    "Cloud Computing",
    "Software Testing & QA",
    "Database Systems (SQL)",
    "Full Stack Development",
    "Data Structures",
  ],
};
