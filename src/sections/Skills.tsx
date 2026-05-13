import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Atom,
  Bot,
  Cable,
  Cloud,
  Code2,
  Database,
  Dock,
  GitBranch,
  LayoutTemplate,
  Layers3,
  MonitorSmartphone,
  Network,
  Rocket,
  Server,
  Shield,
  Sparkles,
  TestTube2,
  WandSparkles,
  Wind,
  Workflow,
  Wrench,
} from "lucide-react";
import { skillGroups } from "../lib/data";

const skillIcons: Record<string, LucideIcon> = {
  "React.js": Atom,
  Angular: Layers3,
  JavaScript: Code2,
  TypeScript: Code2,
  HTML5: MonitorSmartphone,
  "CSS / SCSS": Wind,
  Bootstrap: LayoutTemplate,
  "Responsive Design": MonitorSmartphone,
  "Java 17 / 21": Server,
  "Spring Boot": Rocket,
  "Spring Security": Shield,
  "Spring Cloud": Cloud,
  "Hibernate / JPA": Database,
  Microservices: Workflow,
  "Node.js": Server,
  "GraphQL / gRPC": Activity,
  PostgreSQL: Database,
  "Oracle DB": Database,
  MongoDB: Database,
  Redis: Database,
  "Apache Kafka": Workflow,
  RabbitMQ: Cable,
  "REST APIs": Network,
  "SQL / PL-SQL": Database,
  AWS: Cloud,
  Azure: Cloud,
  Docker: Dock,
  Kubernetes: LayoutTemplate,
  Terraform: Wrench,
  Jenkins: GitBranch,
  "JUnit 5": TestTube2,
  Mockito: TestTube2,
  Selenium: TestTube2,
  "OpenAI API": Bot,
  "Generative AI": WandSparkles,
};

export const Skills = () => {
  return (
    <section id="skills" className="section-shell px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="skills-heading-wrap">
          <h2 className="skills-heading">Skills &amp; Technologies</h2>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {skillGroups.map((group) => (
            <div key={group.title} className="skills-column">
              <div className="skills-column-head">
                <h3 className="skills-column-title">{group.title}</h3>
                <div className="skills-column-rule" />
              </div>

              <div className="mt-6 space-y-3">
                {group.items.map((item) => {
                  const Icon = skillIcons[item] ?? Sparkles;

                  return (
                    <div key={item} className="skill-list-card">
                      <span className="skill-list-icon">
                        <Icon size={17} />
                      </span>
                      <span className="skill-list-label">{item}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
