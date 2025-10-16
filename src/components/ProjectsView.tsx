import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X } from "lucide-react";

type Project = {
  id: string;
  title: string;
  description: string;
  images: string[];
  tags: string[];
  link?: string;
  github?: string;
};

type ProjectsViewProps = {
  projects: Project[];
  setSelectedProject: (project: Project | null) => void;
};

export const ProjectsView = ({ projects, setSelectedProject }: ProjectsViewProps) => {
  // Track current image index for each project card
  const [imageIndexes, setImageIndexes] = useState<Record<string, number>>({});
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const handlePrev = (projectId: string, length: number) => {
    setImageIndexes((prev) => ({
      ...prev,
      [projectId]: prev[projectId] === undefined ? length - 1 : (prev[projectId] - 1 + length) % length,
    }));
  };

  const handleNext = (projectId: string, length: number) => {
    setImageIndexes((prev) => ({
      ...prev,
      [projectId]: prev[projectId] === undefined ? 1 : (prev[projectId] + 1) % length,
    }));
  };

  return (
    <>
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-4">My Projects</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Here are some of the projects I've worked on. Each project represents a unique challenge and learning opportunity.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => { setActiveProject(project); setSelectedProject(project); }}
          >
            <div className="h-48 bg-gray-200 overflow-hidden relative group">
              {(() => {
                const currIdx = imageIndexes[project.id] ?? 0;
                const total = project.images.length;
                const src = `/images/${project.images[currIdx]}`;
                return (
                  <>
                    <img
                      src={src}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {total > 1 && (
                      <>
                        <button
                          className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-8 h-8 flex items-center justify-center"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePrev(project.id, total);
                          }}
                          aria-label="Previous image"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <button
                          className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-8 h-8 flex items-center justify-center"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNext(project.id, total);
                          }}
                          aria-label="Next image"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <div className="absolute bottom-2 left-0 right-0 flex items-center justify-center gap-1">
                          {project.images.map((_, dotIdx) => (
                            <span
                              key={dotIdx}
                              className={`h-1.5 w-1.5 rounded-full ${dotIdx === currIdx ? 'bg-white' : 'bg-white/50'}`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </>
                );
              })()}
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, i) => (
                  <span 
                    key={i} 
                    className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-2 mt-auto">
                {project.github && (
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg transition-colors text-sm font-medium"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                )}
                {project.link && (
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Website</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>

    {/* Details Modal */}
    <AnimatePresence>
      {activeProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          onClick={() => setActiveProject(null)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative bg-black">
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-3 right-3 z-10 text-white/90 hover:text-white bg-black/40 hover:bg-black/60 rounded-full p-2"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>
              {(() => {
                const idx = imageIndexes[activeProject!.id] ?? 0;
                const total = activeProject!.images.length;
                const src = `/images/${activeProject!.images[idx]}`;
                return (
                  <div className="relative">
                    <img src={src} alt={activeProject!.title} className="w-full max-h-[85vh] object-contain bg-black" />
                    {total > 1 && (
                      <>
                        <button
                          className="absolute top-1/2 left-3 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center"
                          onClick={() => handlePrev(activeProject!.id, total)}
                          aria-label="Previous image"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                        </button>
                        <button
                          className="absolute top-1/2 right-3 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center"
                          onClick={() => handleNext(activeProject!.id, total)}
                          aria-label="Next image"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                        </button>
                      </>
                    )}
                  </div>
                );
              })()}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
;
