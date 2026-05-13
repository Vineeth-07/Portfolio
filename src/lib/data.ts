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
      "Migrated a legacy banking platform to Java 17/21 and Spring Boot 3.x microservices with Spring Cloud, API Gateway, Saga orchestration, Eureka discovery, and Resilience4j, cutting deployment time by 40% across systems supporting $2B+ in annual retail credit transactions.",
      "Designed and secured REST, GraphQL, and gRPC APIs for onboarding, payments, and account management using Spring Security, OAuth 2.0, JWT, and OpenID Connect, reducing average API response time by 52% while maintaining 98% uptime on payment-critical endpoints.",
      "Built modular Angular and React.js self-service interfaces in TypeScript and SCSS for thousands of daily users across customer web and mobile experiences.",
      "Owned Kafka, RabbitMQ, and IBM MQ event-driven pipelines for real-time transaction processing and AI-assisted fraud detection across risk and compliance workflows.",
      "Optimized Oracle, PostgreSQL, and MongoDB workloads with PL/SQL rewrites, composite indexing, and Redis caching, cutting average query time by 60% on high-volume reporting jobs.",
      "Deployed cloud-native workloads on AWS and Azure with Docker, Kubernetes, Helm, and Terraform, achieving zero-downtime releases and 99.95% infrastructure availability.",
    ],
  },
  {
    company: "Deloitte",
    role: "Java Full Stack Developer",
    location: "Hyderabad, India",
    period: "Jul 2022 - Jul 2024",
    highlights: [
      "Developed and maintained 12+ Java 17 and Spring Boot 3.x microservices supporting consulting workflows, regulatory reporting, and enterprise operations across 5 practice units.",
      "Built and secured RESTful APIs with Spring Security, JNDI, and API gateway patterns, integrating 8 third-party client systems and reducing integration failures by 38%.",
      "Delivered responsive React.js and JavaScript frontends for data entry, analytics dashboards, and client-facing reporting modules that reduced manual processing overhead.",
      "Designed and optimized PostgreSQL, Oracle DB, and MongoDB schemas with Hibernate ORM, stored procedures, and composite indexing, improving query throughput by 45% on datasets above 10M records.",
      "Provisioned AWS environments with Docker, Kubernetes, Terraform, and Helm and enforced delivery quality through Jenkins, GitHub Actions, Maven, SonarQube, and 82% automated test coverage.",
      "Cut QA cycle time by 40% by standardizing CI/CD pipelines, code quality gates, and JUnit 5, Mockito, and Selenium test suites.",
    ],
  },
  {
    company: "3M",
    role: "Java Developer",
    location: "Bangalore, India",
    period: "May 2021 - Jun 2022",
    highlights: [
      "Built and maintained Java 8 and Spring Boot microservices for account management, customer services, and workflow automation supporting 50K+ daily transactions across 3 enterprise business lines.",
      "Developed secure RESTful APIs and integrated Angular and React.js frontends with Spring MVC backend services, reducing client-reported UI defects by 42% through reusable component design and API contract testing.",
      "Designed MySQL and MongoDB data layers using Hibernate ORM and DAO patterns, improving batch-processing speed by 35% on nightly ETL jobs handling 2M+ records.",
      "Automated build, test, and deployment workflows with Maven, Jenkins, and GitHub Actions across a 12-developer Agile team, improving release coordination and branch hygiene.",
      "Strengthened quality with JUnit 5, Mockito, Selenium, RestAssured, and Postman test suites, achieving 78% code coverage and enabling same-day hotfix deployments with low regression risk.",
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
    title: "Retail Credit Microservices Platform",
    link: null,
    subtitle: "Cloud-native banking modernization across Java 21, Spring Cloud, Kafka, and Kubernetes",
    period: "Case Study",
    stack: ["Java 21", "Spring Boot", "Spring Cloud", "Kafka", "PostgreSQL", "Redis", "Kubernetes"],
    accent: "from-[#ff7b00]/30 via-[#ffb703]/20 to-transparent",
    summary:
      "Modernized a monolithic banking stack into resilient microservices with secure APIs, event-driven processing, and multi-cloud deployment practices.",
    outcomes: [
      "Shipped secure REST, GraphQL, and gRPC services with OAuth 2.0, JWT, and OpenID Connect for customer onboarding, payment processing, and account management.",
      "Owned Kafka and RabbitMQ pipelines plus Redis-backed optimization to support realtime transaction flows, fraud detection, and faster high-volume reporting.",
      "Delivered zero-downtime releases through Docker, Kubernetes, Terraform, Jenkins, GitHub Actions, and full-stack observability with ELK, Prometheus, and Grafana.",
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
