import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useSpring } from 'framer-motion';
import { Menu, X, Home, User, Briefcase, Award, BookOpen, Mail, Phone, Github, Linkedin, FileText } from 'lucide-react';
import N8NChatWidget from './components/N8NChatWidget';
import { ProjectsView } from './components/ProjectsView';
import { CertificatesView } from './components/CertificatesView';
import { LearningView } from './components/LearningView';
import { ContactView } from './components/ContactView';

// Types
type View = 'home' | 'about' | 'skills' | 'experience' | 'projects' | 'certificates' | 'learning' | 'contact';

type NavigationItem = {
  id: string;
  label: string;
  icon: JSX.Element;
  view: View;
};

type Project = {
  id: string;
  title: string;
  description: string;
  previewImages: string[];
  githubUrl?: string;
  liveUrl?: string;
  technologies: string[];
};

type Certificate = {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  image: string | string[];
  description?: string;
};

type WorkExperience = {
  id: string;
  company: string;
  position: string;
  period: string;
  description: string[];
};

type SkillCategory = {
  id: string;
  title: string;
  items: string[];
};

// Navigation
const navigation: NavigationItem[] = [
  { id: 'home', label: 'Home', icon: <Home size={20} />, view: 'home' },
  { id: 'about', label: 'About', icon: <User size={20} />, view: 'about' },
  { id: 'skills', label: 'Skills', icon: <Briefcase size={20} />, view: 'skills' },
  { id: 'experience', label: 'Experience', icon: <FileText size={20} />, view: 'experience' },
  { id: 'projects', label: 'Projects', icon: <Briefcase size={20} />, view: 'projects' },
  { id: 'certificates', label: 'Certificates', icon: <Award size={20} />, view: 'certificates' },
  { id: 'learning', label: 'Learning', icon: <BookOpen size={20} />, view: 'learning' },
  { id: 'contact', label: 'Contact', icon: <Mail size={20} />, view: 'contact' },
];

// Sample data
const projects: Project[] = [
  {
    id: 'world-layoffs',
    title: 'World Layoffs Data Analysis',
    description: 'Processed and analyzed global layoffs dataset using SQL to explore workforce reduction trends across industries and regions. Identified surge in layoffs during 2022, primarily in tech, retail, and consumer goods sectors, with the US and Europe as major hotspots.',
    previewImages: ['/images/world-layoffs1.png', '/images/world-layoffs.png', '/images/world-layoffs2.png'],
    githubUrl: 'https://github.com/dizzy505/world-layoffs',
    liveUrl: 'https://porto-irsyad.netlify.app',
    technologies: ['SQL', 'Data Cleaning', 'EDA', 'Data Analysis', 'Power BI']
  },
  {
    id: 'jkn-sentiment',
    title: 'Mobile JKN Sentiment Analysis',
    description: 'Scraped and preprocessed 10,000+ Google Play reviews of Mobile JKN app using Python and NLP techniques. Performed sentiment labeling and keyword analysis to detect user frustration patterns and app usage satisfaction.',
    previewImages: [
      '/images/jkn-sentiment.jpg',
      '/images/jkn-sentiment2.jpg',
      '/images/jkn-sentiment3.jpg',
      '/images/jkn-sentiment4.jpg',
      '/images/jkn-sentiment5.jpg',
      '/images/jkn-sentiment6.png',
      '/images/jkn-sentiment7.png'
    ],
    githubUrl: 'https://github.com/dizzy505/SentimentAnalysisJKN',
    liveUrl: 'https://sentiment-jkn.streamlit.app/',
    technologies: ['Python', 'Sentiment Analysis', 'NLP', 'Streamlit']
  },
  {
    id: 'bike-sales',
    title: 'Bike Sales Analysis',
    description: 'Cleaned and analyzed bike sales data from over 1,000 transactions to uncover customer trends using demographic segmentation. Built scoring model and interactive dashboard for stakeholder use, focusing on age, income, marital status, and commuting habits.',
    previewImages: [
      '/images/bike-sales.png',
      '/images/bike-sales2.png',
      '/images/bike-sales3.png'
    ],
    githubUrl: 'https://github.com/dizzy505/bikes-sales',
    liveUrl: 'https://public.tableau.com/views/BikeSalesDashboard_17460906746870/Dashboard1',
    technologies: ['Data Cleaning', 'EDA', 'Dashboard', 'Analytics']
  },
  {
    id: 'career-guide',
    title: 'Expert System CareerGuide.id',
    description: 'Built a backward chaining rule-based expert system in Python with Streamlit interface for personalized career recommendations. Mapped user interests and education background to career domains using logical inference and visualized recommendation path.',
    previewImages: [
      '/images/career-guide.jpg',
      '/images/career-guide2.jpg',
      '/images/career-guide3.jpg',
      '/images/career-guide4.jpg',
      '/images/career-guide5.jpg'
    ],
    githubUrl: 'https://github.com/dizzy505/Career-Guide',
    liveUrl: 'https://app-career-guide.streamlit.app/',
    technologies: ['Python', 'Streamlit', 'Expert System', 'Career Recommendation']
  },
  {
    id: 'ckd-prediction',
    title: 'Chronic Kidney Disease Prediction',
    description: 'Explored and visualized 25+ clinical variables from CKD dataset to uncover early indicators of kidney issues. Developed a machine learning classification model with Streamlit interface to predict CKD risk and visualize contributing factors.',
    previewImages: [
      '/images/ckd-prediction.jpg',
      '/images/ckd-prediction2.png',
      '/images/ckd-prediction3.png'
    ],
    githubUrl: 'https://github.com/dizzy505/kidney-disease',
    liveUrl: 'https://kidney-predictor.streamlit.app/',
    technologies: ['Python', 'Streamlit', 'Machine Learning', 'Healthcare']
  }
];

const certificates: Certificate[] = [
  {
    id: 'bnsp',
    title: 'Computer Network Engineering',
    issuer: 'BNSP',
    issueDate: '2022 - 2025',
    image: '/images/sertif bnsp.jpg',
    description: 'Certificate of Competence - Qualification Level 2 in Computer Network Engineering.'
  },
  {
    id: 'mtcna',
    title: 'MikroTik Certified Network Associate',
    issuer: 'MikroTik',
    issueDate: '2021 - 2024',
    image: '/images/sertif mtcna.jpg',
    description: 'MTCNA Certification in Network Administration.'
  },
  {
    id: 'dqlab',
    title: 'DQLab Bootcamp Certificates',
    issuer: 'DQLab',
    issueDate: '2023',
    image: ['/images/sertif dqlab.jpg', '/images/sertif dqlab 2.jpg', '/images/sertif dqlab 3.jpg'],
    description: 'Python Fundamental for Data Science, R Fundamental for Data Science, Fundamental SQL Using SELECT Statement.'
  },
  {
    id: 'udemy',
    title: 'Microsoft Excel and Google Sheets for Data Analysis',
    issuer: 'Udemy',
    issueDate: '2025',
    image: '/images/sertif udemy.jpg',
    description: 'Advanced data analysis techniques using Excel and Google Sheets.'
  },
  {
    id: 'IBMSkillsBuild',
    title: 'Data Classification and Summarization Using IBM Granite',
    issuer: 'IBM Skills Build',
    issueDate: '2025',
    image: ['/images/Sertif IBM.jpg', '/images/Sertif Hacktive8.jpg'],
    description: 'Data classification and summarization techniques using IBM Granite.'
  }
];

const workExperiences: WorkExperience[] = [
  {
    id: 'kopindosat',
    company: 'KOPINDOSAT',
    position: 'Freelance Drafter',
    period: '2024 - 2025',
    description: [
      'Created detailed railway blueprints and track layouts',
      'Developed precise technical drawings for railway infrastructure'
    ]
  },
  {
    id: 'ministry-agriculture',
    company: 'Ministry of Agriculture',
    position: 'Data Entry Internship',
    period: 'Nov 2019 - Jan 2020',
    description: [
      'Conducted the input process for ministerial correspondence into the system',
      'Ensured efficient management of data inputted in Excel',
      'Adhered to meticulous archiving procedures for both incoming and outgoing letters'
    ]
  },
  {
    id: 'korpolarud',
    company: 'KORPOLAIRUD BAHARKAM POLRI',
    position: 'IT Support Internship',
    period: 'Aug 2019 - Oct 2019',
    description: [
      'Contributed to server maintenance activities to ensure optimal system availability',
      'Engaged in analysis and planning for ship plotting and monitoring operations',
      'Provided support in addressing IT-related issues, including analysis, diagnosis, and troubleshooting',
      'Offered necessary IT solutions to meet organizational needs'
    ]
  }
];

const skills: SkillCategory[] = [
  {
    id: 'programming',
    title: 'Programming',
    items: ['Python', 'SQL', 'R', 'HTML/CSS']
  },
  {
    id: 'data-analysis',
    title: 'Data Analysis',
    items: ['Data Cleaning', 'EDA', 'Data Mining', 'Machine Learning', 'NLP']
  },
  {
    id: 'tools',
    title: 'Tools',
    items: ['Jupyter Notebook', 'Excel', 'Workbench', 'Power BI', 'Tableau', 'Looker Studio']
  },
  {
    id: 'soft-skills',
    title: 'Soft Skills',
    items: ['Analytical Thinking', 'Problem Solving', 'Team Collaboration', 'Business Acumen']
  }
];

const learningProgress = [
  { 
    topic: 'SQL', 
    progress: 100, 
    subtopics: [
      'Beginner: SELECT, WHERE, GROUP BY, ORDER BY, HAVING, LIMIT, Aliasing',
      'Intermediate: JOINs, UNIONs, String Functions, CASE, Subqueries, Window Functions',
      'Advanced: CTEs, Temp Tables, Stored Procedures, Triggers & Events'
    ]
  },
  { 
    topic: 'Excel', 
    progress: 100, 
    subtopics: [
      'Pivot Tables',
      'Advanced Formulas',
      'XLOOKUP and VLOOKUP',
      'Conditional Formatting',
      'Charts and Visualizations',
      'Data Cleaning Techniques'
    ]
  },
  { 
    topic: 'Tableau', 
    progress: 100, 
    subtopics: [
      'Create Visualizations',
      'Calculated Fields and Bins',
      'Joins'
    ]
  },
  { 
    topic: 'Power BI', 
    progress: 100, 
    subtopics: [
      'Power Query',
      'Create and Manage Relationships',
      'DAX',
      'Drill Down',
      'Conditional Formatting',
      'Bins and Lists',
      'Proper Visualization'
    ]
  },
  { 
    topic: 'Machine Learning', 
    progress: 100, 
    subtopics: [
      'Fundamental Classification Concepts',
      'Supervised & Unsupervised Learning',
      'Deep Learning',
      'Statistical Analysis',
      'Optimization Techniques',
      'Natural Language Processing'
    ]
  }
];

// View Components
const HomeView = () => (
  <section id="home" className="min-h-screen flex items-center justify-center py-20">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 text-center md:text-left mb-12 md:mb-0">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4"
          >
            Hi, I'm <span className="text-blue-600">Irsyad</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-gray-600 mb-8"
          >
            Fresh Graduate | Future Data Analyst
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap gap-4 justify-center md:justify-start"
          >
            <a
              href="#projects"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Contact Me
            </a>
          </motion.div>
        </div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="md:w-1/2 flex justify-center"
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
            <div className="absolute inset-0 bg-blue-100 rounded-full transform rotate-6"></div>
            <img
              src="/images/icad3.jpg"
              alt="Irsyad"
              className="relative w-full h-full object-cover rounded-full border-4 border-white shadow-xl"
            />
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const AboutView = () => (
  <section id="about" className="py-20 bg-gray-50">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
          About <span className="text-blue-600">Me</span>
        </h2>
        
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
          <div className="flex flex-col md:flex-row items-center mb-8">
            <div className="w-32 h-32 md:w-40 md:h-40 mb-6 md:mb-0 md:mr-8">
              <img
                src="/images/icad3.jpg"
                alt="Profile"
                className="w-full h-full object-cover rounded-full border-4 border-blue-100"
              />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Irsyad Faruq Ardiansyah</h3>
              <p className="text-gray-600 mb-2">Data Enthusiast</p>
              <p className="text-gray-500 text-sm">Fresh Graduate of Informatics Engineering from Indraprasta PGRI University</p>
            </div>
          </div>
          
          <div className="prose prose-lg text-gray-600 max-w-none">
            <p className="mb-4">
              I am a fresh graduate of Informatics Engineering from Indraprasta PGRI University. I possess strong analytical skills with the ability to collect,
              process, and analyze data; design data-driven strategies and plans; and develop predictive models to support decision-making and optimize business outcomes.
            </p>
            <p className="mb-4">
              I pride myself on being adaptable, working well in team environments, and maintaining continuous enthusiasm for learning new things.
            </p>
            <p>
              I'm passionate about transforming raw data into actionable insights and building solutions that help stakeholders make better, data-informed decisions.
            </p>
            
            <div className="mt-8">
              <h4 className="font-semibold text-lg mb-4 text-gray-900">Education</h4>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4 py-1">
                  <h5 className="font-medium text-gray-900">Bachelor of Informatics Engineering</h5>
                  <p className="text-gray-600">Universitas Indraprasta PGRI • 2021 - Present • GPA: 3.56/4.00</p>
                  <p className="text-gray-600 mt-1"><span className="font-medium">Relevant Courses:</span> Data Mining, Database System, Image Processing, Neural Networks</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4 py-1">
                  <h5 className="font-medium text-gray-900">Organizational Experience</h5>
                  <p className="text-gray-600">Participated in Program Kreativitas Mahasiswa Karsa Cipta (PKM-KC) with the proposal "Inovasi Teknologi Pemilihan Bangku Stadion Menggunakan RFID Terintegrasi Android" and successfully passed the funding stage.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

const SkillsView = () => (
  <section id="skills" className="py-20 bg-gray-50">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
          My <span className="text-blue-600">Skills</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.items.map((skill) => (
                  <span 
                    key={skill}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

const ExperienceView = () => (
  <section id="experience" className="py-20 bg-gray-50">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
          Work <span className="text-blue-600">Experience</span>
        </h2>
        
        <div className="space-y-8">
          {workExperiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={"relative pb-8"}
            >
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{exp.position}</h3>
                    <p className="text-blue-600 font-medium">{exp.company}</p>
                  </div>
                  <div className="mt-2 sm:mt-0">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                      {exp.period}
                    </span>
                  </div>
                </div>
                <ul className="mt-4 space-y-2">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-blue-500 mr-2 mt-1">•</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

// Main App Component
const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showBackToTop, setShowBackToTop] = useState(false);
  // Removed unused modal and selection states to keep code lean

  const scaleX = useSpring(0, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isMenuOpen]);

  // Handle scroll events to update active section and scroll progress
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
      
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'certificates', 'learning', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            window.history.replaceState(null, '', `#${section}`);
            break;
          }
        }
      }
      
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const scrollPercent = (scrollTop / (scrollHeight - clientHeight)) * 100;
      scaleX.set(scrollPercent);
    };
    
    // Handle initial scroll position based on hash
    if (window.location.hash) {
      const targetId = window.location.hash.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        setTimeout(() => {
          targetElement.scrollIntoView({ behavior: 'smooth' });
          setActiveSection(targetId);
        }, 100);
      }
    }
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scaleX]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    // Always close menu first to unlock body scroll on mobile
    setIsMenuOpen(false);
    if (element) {
      // Delay scrolling slightly so overflow re-enables before scroll
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(sectionId);
        window.history.pushState(null, '', `#${sectionId}`);
      }, 50);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // (Modal handlers removed)

  // Render all sections in a single page
  const renderSections = () => (
    <>
      <HomeView />
      <AboutView />
      <SkillsView />
      <ExperienceView />
      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="container mx-auto px-4">
          <ProjectsView
            projects={projects.map((p) => ({
              id: p.id,
              title: p.title,
              description: p.description,
              images: p.previewImages.map((src) => src.replace('/images/', '')),
              tags: p.technologies,
              github: p.githubUrl,
              link: p.liveUrl,
            }))}
            setSelectedProject={() => { /* no-op */ }}
          />
        </div>
      </section>

      {/* Certificates Section */}
      <section id="certificates" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <CertificatesView
            certificates={certificates.map((c) => ({
              title: c.title,
              issuer: c.issuer,
              period: c.issueDate,
              images: (Array.isArray(c.image) ? c.image : [c.image]).map((src) => src.replace('/images/', '')),
              description: c.description || '',
            }))}
            setSelectedCertificate={() => { /* no-op */ }}
          />
        </div>
      </section>

      {/* Learning Section */}
      <section id="learning" className="py-20">
        <div className="container mx-auto px-4">
          <LearningView
            learningProgress={learningProgress.map((l) => ({
              title: (l as any).topic || (l as any).title,
              progress: l.progress,
              topics: (l as any).subtopics || (l as any).topics,
            }))}
          />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <ContactView />
        </div>
      </section>
    </>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 overflow-x-hidden">
      {/* Scroll progress indicator */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-blue-200 z-50"
        style={{ scaleX, transformOrigin: '0%' }}
      />

      {/* Header */}
      <header className="fixed w-full bg-white/80 backdrop-blur-md shadow-sm z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-xl font-bold text-blue-700 hover:text-blue-600 transition-colors"
              >
                Irsyad
              </button>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.view)}
                  className={`${
                    activeSection === item.view 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'
                  } px-4 py-2 rounded-md text-sm font-medium transition-all duration-200`}
                >
                  <div className="flex items-center space-x-2">
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                </button>
              ))}
            </nav>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-blue-600 p-3 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            id="mobile-menu"
            className="md:hidden overflow-hidden bg-white/95 backdrop-blur-sm fixed top-16 inset-x-0 z-40 shadow-lg border-t border-gray-100 max-h-[calc(100vh-4rem)] overflow-y-auto pb-[max(1rem,env(safe-area-inset-bottom))]"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.view)}
                  className={`${
                    activeSection === item.view 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                    } w-full text-left px-4 py-3 rounded-md text-base font-medium flex items-center space-x-3 transition-colors`}
                >
                  <span className="text-blue-500">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop overlay to close mobile menu on outside tap */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 top-16 bg-black/30 md:hidden z-30"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main content with all sections */}
      <main className="pt-16">
        {renderSections()}
      </main>

      {/* Chat Widget */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 right-4 z-30"
            style={{ height: 'calc(100vh - 100px)' }}
          >
            <N8NChatWidget />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back to top button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-4 right-20 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-xl z-50 transition-all duration-300 hover:scale-110"
            aria-label="Back to top"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              &copy; {new Date().getFullYear()} Irsyad Faruq Ardiansyah. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a 
                href="https://github.com/dizzy505" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-600 transition-colors"
                aria-label="GitHub"
                title="GitHub"
              >
                <Github size={20} />
              </a>
              <a 
                href="https://linkedin.com/in/IrsyadFaruqArdiansyah" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-600 transition-colors"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="mailto:irsyad3254@gmail.com" 
                className="text-gray-500 hover:text-blue-600 transition-colors"
                aria-label="Email"
                title="Email"
              >
                <Mail size={20} />
              </a>
              <a 
                href="https://wa.me/6287775439677" 
                className="text-gray-500 hover:text-blue-600 transition-colors flex items-center"
                aria-label="WhatsApp"
                title="WhatsApp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone size={18} className="mr-1" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Image Modal removed (unused) */}
      <N8NChatWidget />
    </div>
  );
};

export default App;
