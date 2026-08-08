'use client';

import * as React from 'react';
import { 
  Terminal, 
  Sparkles, 
  ArrowRight, 
  Cpu, 
  Layers, 
  Code2, 
  Coffee 
} from 'lucide-react';

export interface Environment {
  id: 'node' | 'python' | 'bun' | 'cpp' | 'c' | 'java';
  name: string;
  category: string;
  version: string;
  description: string;
  runtimeImage: string;
  icon: React.ReactNode;
  badgeColor: string;
  defaultProjectName: string;
}

export const ENVIRONMENTS: Environment[] = [
  {
    id: 'node',
    name: 'Node.js',
    category: 'JavaScript / TypeScript',
    version: 'v20.x Alpine',
    description: 'V8-powered asynchronous JavaScript runtime for web servers and tooling.',
    runtimeImage: 'node:20-alpine',
    icon: <Code2 className="h-6 w-6 text-emerald-500" />,
    badgeColor: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    defaultProjectName: 'my-node-app',
  },
  {
    id: 'python',
    name: 'Python 3',
    category: 'Scripting & AI',
    version: 'v3.11 Slim',
    description: 'High-level language for backend services, automation, and data analytics.',
    runtimeImage: 'python:3.11-slim',
    icon: <Terminal className="h-6 w-6 text-blue-500" />,
    badgeColor: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    defaultProjectName: 'my-python-app',
  },
  {
    id: 'bun',
    name: 'Bun',
    category: 'Modern JS Runtime',
    version: 'v1.x Alpine',
    description: 'Ultra-fast all-in-one JavaScript & TypeScript toolkit and package runner.',
    runtimeImage: 'oven/bun:1-alpine',
    icon: <Sparkles className="h-6 w-6 text-amber-500" />,
    badgeColor: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    defaultProjectName: 'my-bun-app',
  },
  {
    id: 'cpp',
    name: 'C++',
    category: 'Systems Programming',
    version: 'GCC 13',
    description: 'High-performance C++20 workspace with full GCC toolchain support.',
    runtimeImage: 'gcc:13-alpine',
    icon: <Cpu className="h-6 w-6 text-purple-500" />,
    badgeColor: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    defaultProjectName: 'my-cpp-project',
  },
  {
    id: 'c',
    name: 'C Language',
    category: 'Low-Level Systems',
    version: 'GCC 13',
    description: 'Bare-metal procedural programming environment with standard glibc.',
    runtimeImage: 'gcc:13-alpine',
    icon: <Layers className="h-6 w-6 text-slate-400" />,
    badgeColor: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
    defaultProjectName: 'my-c-project',
  },
  {
    id: 'java',
    name: 'Java JDK',
    category: 'Enterprise Applications',
    version: 'OpenJDK 21',
    description: 'Modern long-term support (LTS) Java runtime and compiler environment.',
    runtimeImage: 'eclipse-temurin:21-alpine',
    icon: <Coffee className="h-6 w-6 text-red-500" />,
    badgeColor: 'bg-red-500/10 text-red-500 border-red-500/20',
    defaultProjectName: 'my-java-app',
  },
];

interface ProjectEnvVCardProps {
  onSelectEnvironment?: (env: Environment) => void;
  selectedId?: string;
}

export const ProjectEnvVCard = ({
  onSelectEnvironment,
  selectedId,
}: ProjectEnvVCardProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {ENVIRONMENTS.map((env) => {
        const isSelected = selectedId === env.id;

        return (
          <div
            key={env.id}
            onClick={() => onSelectEnvironment?.(env)}
            className={`group relative flex flex-col justify-between rounded-2xl border p-5 transition-all cursor-pointer bg-card ${
              isSelected
                ? 'border-primary ring-2 ring-primary/20 shadow-md'
                : 'border-border hover:border-primary/50 hover:shadow-md'
            }`}
          >
            <div>
              {/* Header Badge & Icon */}
              <div className="flex items-center justify-between">
                <div className="rounded-xl border border-border bg-muted/30 p-2.5">
                  {env.icon}
                </div>
                <span
                  className={`rounded-md border px-2 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider ${env.badgeColor}`}
                >
                  {env.version}
                </span>
              </div>

              {/* Environment Title */}
              <div className="mt-4">
                <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors flex items-center justify-between">
                  <span>{env.name}</span>
                  <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                </h3>
                <p className="text-[11px] font-medium text-muted-foreground/80 mt-0.5">
                  {env.category}
                </p>
              </div>

              {/* Description */}
              <p className="mt-2.5 text-xs text-muted-foreground leading-relaxed line-clamp-2">
                {env.description}
              </p>
            </div>

            {/* Footer Runtime Tag */}
            <div className="mt-5 flex items-center justify-between border-t border-border/50 pt-3 text-[11px] text-muted-foreground font-mono">
              <span>Image:</span>
              <span className="text-foreground font-semibold">{env.runtimeImage}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectEnvVCard;