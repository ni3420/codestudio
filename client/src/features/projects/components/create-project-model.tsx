'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from 'convex/react';
import { useUser } from '@clerk/nextjs';
import { api } from '@/../convex/_generated/api';
import { Environment } from './project-env-card';
import { X, Lock, Globe, Loader2, Code2 } from 'lucide-react';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  environment: Environment | null;
}

export const CreateProjectModal = ({
  isOpen,
  onClose,
  environment,
}: CreateProjectModalProps) => {
  const router = useRouter();
  const { user } = useUser();
  const createProject = useMutation(api.projects.createProject);

  // 1. Derive or track environment changes directly without useEffect
  const [prevEnvId, setPrevEnvId] = React.useState<string | null>(null);
  const [projectName, setProjectName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [visibility, setVisibility] = React.useState<'private' | 'public'>('private');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Sync state directly during render when environment changes
  if (environment && environment.id !== prevEnvId) {
    setPrevEnvId(environment.id);
    setProjectName(environment.defaultProjectName);
  }

  if (!isOpen || !environment) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !projectName.trim()) return;

    try {
      setIsSubmitting(true);

      const projectId = await createProject({
        userId:user?.id,
        name: projectName.trim(),
        description: description.trim() || undefined,
        environment: environment.id,
        runtimeImage: environment.runtimeImage,
      });

      onClose();
      router.push(`/projects/${projectId}`);
    } catch (err) {
      console.error('Failed to launch workspace:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <div className="rounded-xl border border-border bg-muted/40 p-2">
              {environment.icon}
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">
                Initialize {environment.name}
              </h3>
              <p className="text-xs text-muted-foreground">{environment.version}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1">
              Project Name
            </label>
            <input
              type="text"
              required
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="e.g. my-awesome-app"
              className="w-full rounded-xl border border-input bg-background px-3 py-2 text-xs text-foreground focus:outline-hidden focus:ring-2 focus:ring-ring font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground mb-1">
              Description <span className="text-muted-foreground font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What are you building?"
              className="w-full rounded-xl border border-input bg-background px-3 py-2 text-xs text-foreground focus:outline-hidden focus:ring-2 focus:ring-ring"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Workspace Visibility
            </label>
            <div className="grid grid-cols-2 gap-2 rounded-xl border border-border bg-muted/20 p-1">
              <button
                type="button"
                onClick={() => setVisibility('private')}
                className={`flex items-center justify-center gap-2 rounded-lg py-1.5 text-xs font-medium transition-all ${
                  visibility === 'private'
                    ? 'bg-background shadow-xs text-foreground font-semibold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Lock className="h-3.5 w-3.5" />
                <span>Private</span>
              </button>
              <button
                type="button"
                onClick={() => setVisibility('public')}
                className={`flex items-center justify-center gap-2 rounded-lg py-1.5 text-xs font-medium transition-all ${
                  visibility === 'public'
                    ? 'bg-background shadow-xs text-foreground font-semibold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Globe className="h-3.5 w-3.5" />
                <span>Public</span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-xl px-4 py-2 text-xs font-medium text-muted-foreground hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !projectName.trim()}
              className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-xs hover:opacity-90 active:scale-95 transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Launching IDE...</span>
                </>
              ) : (
                <>
                  <Code2 className="h-3.5 w-3.5" />
                  <span>Start Coding</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectModal;