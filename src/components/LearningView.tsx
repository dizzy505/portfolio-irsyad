import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

type LearningProgress = {
  title: string;
  progress: number;
  topics: string[];
};

type LearningViewProps = {
  learningProgress: LearningProgress[];
};

export const LearningView = ({ learningProgress }: LearningViewProps) => {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Learning Journey</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          My continuous learning path and areas of expertise I'm currently focusing on.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-md p-6 md:p-8"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <BookOpen className="w-6 h-6 mr-2" />
            Current Focus
          </h2>
          <div className="space-y-6">
            {learningProgress.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{item.title}</h3>
                  <span className="text-sm text-gray-500">{item.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>
                <ul className="flex flex-wrap gap-2 mt-2">
                  {item.topics.map((topic, i) => (
                    <li 
                      key={i}
                      className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full"
                    >
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
