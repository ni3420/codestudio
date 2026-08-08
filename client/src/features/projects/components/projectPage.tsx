'use client';

import * as React from 'react';
import { ProjectEnvVCard, Environment } from './project-env-card';
import { CreateProjectModal } from './create-project-model';

export const ProjectsPage = () => {
  const [selectedEnv, setSelectedEnv] = React.useState<Environment | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleSelectEnvironment = (env: Environment) => {
    setSelectedEnv(env);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEnv(null);
  };

  return (
    <div className="mx-auto max-w-7xl p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Create a New Project
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          Select a runtime environment below to initialize your cloud workspace sandbox.
        </p>
      </div>

      <ProjectEnvVCard
        selectedId={selectedEnv?.id}
        onSelectEnvironment={handleSelectEnvironment}
      />

      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        environment={selectedEnv}
      />
    </div>
  );
};

export default ProjectsPage;