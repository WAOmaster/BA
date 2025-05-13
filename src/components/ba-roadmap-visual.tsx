import React, { useState, useEffect, useMemo } from 'react';
import { ChevronRight, Award, BarChart2, Cpu, Layers, Check, Moon, Sun } from 'lucide-react';

// Define types for the color scheme
interface ColorScheme {
  primary: string;
  secondary: string;
  border: string;
  text: string;
  icon: string;
}

// Define the phase colors with proper types
const phaseColors: Record<string, ColorScheme> = {
  foundation: {
    primary: 'bg-gradient-to-r from-purple-500 to-indigo-600',
    secondary: 'bg-purple-100',
    border: 'border-purple-500',
    text: 'text-purple-700',
    icon: 'text-purple-500'
  },
  intermediate: {
    primary: 'bg-gradient-to-r from-blue-500 to-cyan-600',
    secondary: 'bg-blue-100',
    border: 'border-blue-500',
    text: 'text-blue-700',
    icon: 'text-blue-500'
  },
  advanced: {
    primary: 'bg-gradient-to-r from-green-500 to-teal-600',
    secondary: 'bg-green-100',
    border: 'border-green-500',
    text: 'text-green-700',
    icon: 'text-green-500'
  },
  'ai-integration': {
    primary: 'bg-gradient-to-r from-red-500 to-orange-600',
    secondary: 'bg-red-100',
    border: 'border-red-500',
    text: 'text-red-700',
    icon: 'text-red-500'
  }
};

// Define types for the RoadmapNode props
interface RoadmapNodeProps {
  title: string;
  description: string;
  isExpanded: boolean;
  onClick: () => void;
  isActive: boolean;
  level: number;
  colorScheme: ColorScheme;
  icon: React.ReactNode;
}

const RoadmapNode: React.FC<RoadmapNodeProps> = ({ 
  title, 
  description, 
  isExpanded, 
  onClick, 
  isActive, 
  level, 
  colorScheme, 
  icon 
}) => {
  const bgColor = isActive 
    ? `${colorScheme.secondary} ${colorScheme.border}` 
    : 'bg-gray-50 border-gray-300 hover:bg-gray-100';
  
  const marginClass = level === 1 ? 'ml-0' : level === 2 ? 'ml-8' : 'ml-16';
  
  return (
    <div 
      className={`${marginClass} mb-3 p-4 border-l-4 rounded-lg shadow-md cursor-pointer transition-all duration-1000 ${bgColor} hover:shadow-lg`} 
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {icon && <div className={`mr-3 ${colorScheme.icon}`}>{icon}</div>}
          <h3 className={`font-semibold ${isActive ? colorScheme.text : 'text-gray-800'}`}>{title}</h3>
        </div>
        <ChevronRight 
          className={`transform transition-transform duration-1000 ${isExpanded ? 'rotate-90' : ''} ${colorScheme.icon}`} 
          size={20} 
        />
      </div>
      {isExpanded && (
        <div className="mt-3 text-gray-700 pl-7 transition-all duration-1000">
          {description}
        </div>
      )}
    </div>
  );
};

// Define types for roadmap item
interface SubItem {
  id: string;
  title: string;
  description: string;
  level: number;
  icon: React.ReactNode;
}

interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  level: number;
  icon: React.ReactNode;
  subItems?: SubItem[];
}

// Define type for roadmap data
interface RoadmapData {
  [key: string]: RoadmapItem[];
}

const BusinessAnalystRoadmap: React.FC = () => {
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({});
  const [activePhase, setActivePhase] = useState<string>('foundation');
  const [animatePhase, setAnimatePhase] = useState<boolean>(false);
  const [autoExpanding, setAutoExpanding] = useState<boolean>(false);
  const [currentExpandingIndex, setCurrentExpandingIndex] = useState<number>(0);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  
  // Define roadmapData with useMemo to prevent recreating it on every render
  const roadmapData: RoadmapData = useMemo(() => ({
    foundation: [
      {
        id: 'business-fundamentals',
        title: 'Business Fundamentals',
        description: 'Master the essentials of business operations, financial reporting, strategic planning, and value creation. Understand business models, organizational structures, and market dynamics to effectively analyze how changes impact the organization.',
        level: 1,
        icon: <Award size={24} />
      },
      {
        id: 'requirements-elicitation',
        title: 'Requirements Elicitation',
        description: 'Develop expertise in stakeholder interviews, facilitation techniques, and workshop management. Learn to identify hidden requirements, resolve conflicting needs, and prioritize features based on business value and technical constraints.',
        level: 1,
        icon: <Layers size={24} />
      },
      {
        id: 'documentation',
        title: 'Documentation Skills',
        description: 'Create professional user stories, use cases, process flows, and business requirements documents. Master clear communication through diagrams, wireframes, and specifications that bridge business needs and technical implementation.',
        level: 1,
        icon: <Check size={24} />
      },
      {
        id: 'data-analysis',
        title: 'Basic Data Analysis',
        description: 'Learn fundamental statistical concepts like mean, median, variance, and correlation. Develop skills in Excel for data manipulation, pivot tables, and basic modeling to extract meaningful insights from business data.',
        level: 1,
        icon: <BarChart2 size={24} />
      }
    ],
    intermediate: [
      {
        id: 'process-modeling',
        title: 'Process Modeling & BPMN',
        description: 'Master Business Process Model and Notation (BPMN) to create detailed, standardized process models. Learn to identify inefficiencies, bottlenecks, and opportunities for automation in complex business workflows.',
        level: 1,
        icon: <Layers size={24} />
      },
      {
        id: 'sql',
        title: 'SQL & Database Concepts',
        description: 'Develop proficiency in SQL queries for data extraction and analysis. Understand database structure, relationships, normalization, and how to optimize queries for performance when working with large datasets.',
        level: 1,
        icon: <Award size={24} />
      },
      {
        id: 'visualization',
        title: 'Data Visualization',
        description: 'Create compelling dashboards and reports using tools like Tableau, Power BI, or Looker. Master the principles of effective data visualization to transform complex data into actionable insights for stakeholders.',
        level: 1,
        icon: <BarChart2 size={24} />
      },
      {
        id: 'agile',
        title: 'Agile Methodologies',
        description: 'Become proficient in Scrum, Kanban, and other agile frameworks. Learn backlog refinement, sprint planning, and how to effectively collaborate with development teams in iterative delivery environments.',
        level: 1,
        icon: <Check size={24} />
      }
    ],
    advanced: [
      {
        id: 'product-management',
        title: 'Product Management Skills',
        description: 'Develop strategic product roadmaps, conduct competitive analysis, and lead market research initiatives. Learn to identify market opportunities, define product vision, and align features with customer needs and business goals.',
        level: 1,
        icon: <Award size={24} />
      },
      {
        id: 'python',
        title: 'Python for Business Analysis',
        description: 'Leverage Python for advanced data analysis, process automation, and predictive modeling. Use libraries like Pandas, NumPy, and Scikit-learn to process large datasets and extract deeper insights than possible with traditional tools.',
        level: 1,
        icon: <Cpu size={24} />
      },
      {
        id: 'change-management',
        title: 'Change Management',
        description: 'Lead organizational transformation initiatives with structured approaches to managing change. Learn to assess change readiness, develop communication plans, and ensure successful adoption of new processes and systems.',
        level: 1,
        icon: <Layers size={24} />
      },
      {
        id: 'enterprise-architecture',
        title: 'Enterprise Architecture',
        description: 'Understand how systems, data, and processes integrate across the organization. Learn to map business capabilities to technology components and help guide strategic technology decisions aligned with business objectives.',
        level: 1,
        icon: <BarChart2 size={24} />
      }
    ],
    'ai-integration': [
      {
        id: 'ai-fundamentals',
        title: 'AI Fundamentals',
        description: 'Build a solid foundation in machine learning concepts, AI capabilities, limitations, and ethical considerations for business applications. Understand the different types of AI and how they can be applied to solve business problems.',
        level: 1,
        icon: <Cpu size={24} />,
        subItems: [
          {
            id: 'ml-basics',
            title: 'Machine Learning Basics',
            description: 'Master the fundamentals of supervised vs. unsupervised learning, common algorithms, and when to apply different approaches. Learn to evaluate model performance and understand the tradeoffs between different machine learning techniques.',
            level: 2,
            icon: <Cpu size={20} />
          },
          {
            id: 'ai-ethics',
            title: 'AI Ethics & Governance',
            description: 'Develop frameworks for responsible AI implementation, addressing bias, fairness, transparency, and privacy concerns. Learn to create AI governance structures that ensure ethical use of AI within your organization.',
            level: 2,
            icon: <Award size={20} />
          }
        ]
      },
      {
        id: 'ai-tools',
        title: 'AI Tools for Business Analysis',
        description: 'Master AI-powered analytics tools, low-code/no-code AI platforms, and large language model assistants. Learn to leverage these tools to automate routine tasks, generate insights, and enhance your productivity as a business analyst.',
        level: 1,
        icon: <BarChart2 size={24} />,
        subItems: [
          {
            id: 'llm-prompting',
            title: 'LLM Prompt Engineering',
            description: 'Design effective prompts for large language models to automate documentation, generate analysis, and enhance productivity. Master techniques for prompt chaining, context management, and optimizing outputs for business use cases.',
            level: 2,
            icon: <Check size={20} />
          },
          {
            id: 'ai-automation',
            title: 'AI Process Automation',
            description: 'Identify opportunities for AI-powered automation and implement solutions using tools like Power Automate, Zapier, and custom AI components. Create intelligent workflows that reduce manual effort and improve accuracy.',
            level: 2,
            icon: <Layers size={20} />
          }
        ]
      },
      {
        id: 'data-for-ai',
        title: 'Data Preparation for AI',
        description: 'Master techniques for preparing and structuring data for AI model training, validation, and implementation. Learn data cleaning, feature engineering, and how to ensure data quality and governance for machine learning projects.',
        level: 1,
        icon: <BarChart2 size={24} />
      },
      {
        id: 'ai-use-cases',
        title: 'AI Use Case Identification',
        description: 'Develop expertise in identifying and evaluating potential AI applications in business processes. Learn to calculate ROI, develop compelling business cases, and prioritize AI initiatives based on business impact and feasibility.',
        level: 1,
        icon: <Award size={24} />,
        subItems: [
          {
            id: 'ai-implementation',
            title: 'AI Implementation Strategy',
            description: 'Create comprehensive strategies for successful AI adoption, including change management, training programs, and integration with existing systems. Develop roadmaps for AI transformation that align with business objectives.',
            level: 2,
            icon: <Layers size={20} />
          },
          {
            id: 'ai-metrics',
            title: 'AI Performance Metrics',
            description: 'Define and implement KPIs for AI implementations to ensure they deliver business value and meet requirements. Learn to monitor model performance, drift, and business impact to continuously improve AI solutions.',
            level: 2,
            icon: <BarChart2 size={20} />
          }
        ]
      }
    ]
  }), []);
  
  useEffect(() => {
    // Reset expanded nodes when changing phases
    setExpandedNodes({});
    setCurrentExpandingIndex(0);
    
    // Animation on phase change
    setAnimatePhase(true);
    const animTimer = setTimeout(() => setAnimatePhase(false), 2000); // Extended to 2 seconds
    
    return () => clearTimeout(animTimer);
  }, [activePhase]);
  
  useEffect(() => {
    if (!autoExpanding) return;
    
    const phaseData = roadmapData[activePhase];
    
    // If we've expanded all nodes in this phase, move to next phase after delay
    if (currentExpandingIndex >= phaseData.length) {
      const phaseChangeTimer = setTimeout(() => {
        setActivePhase(current => {
          const phases = ['foundation', 'intermediate', 'advanced', 'ai-integration'];
          const currentIndex = phases.indexOf(current);
          return phases[(currentIndex + 1) % phases.length];
        });
      }, 5000); // Extended to 5 seconds
      
      return () => clearTimeout(phaseChangeTimer);
    }
    
    // Expand current node
    const currentNode = phaseData[currentExpandingIndex];
    if (currentNode) {
      setExpandedNodes(prev => {
        const newState = { ...prev, [currentNode.id]: true };
        
        // Also expand subItems if they exist
        if (currentNode.subItems) {
          currentNode.subItems.forEach(subItem => {
            newState[subItem.id] = true;
          });
        }
        
        return newState;
      });
      
      // Move to next node after delay
      const timer = setTimeout(() => {
        setCurrentExpandingIndex(prev => prev + 1);
      }, 7000); // Extended to 7 seconds
      
      return () => clearTimeout(timer);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePhase, currentExpandingIndex, autoExpanding]);
  
  const toggleNode = (id: string) => {
    // When user manually toggles a node, disable auto-expanding
    setAutoExpanding(false);
    
    setExpandedNodes(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  const resetAndAutoExpand = () => {
    setExpandedNodes({});
    setCurrentExpandingIndex(0);
    setAutoExpanding(true);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  
  const renderNodes = (phase: string) => {
    const colorScheme = phaseColors[phase];
    return roadmapData[phase].map((item: RoadmapItem, index: number) => {
      const showSubItems = expandedNodes[item.id] && item.subItems;
      
      return (
        <React.Fragment key={item.id}>
          <RoadmapNode 
            title={item.title}
            description={item.description}
            isExpanded={!!expandedNodes[item.id]}
            onClick={() => toggleNode(item.id)}
            isActive={true}
            level={item.level}
            colorScheme={colorScheme}
            icon={item.icon}
          />
          {showSubItems && item.subItems?.map(subItem => (
            <RoadmapNode
              key={subItem.id}
              title={subItem.title}
              description={subItem.description}
              isExpanded={!!expandedNodes[subItem.id]}
              onClick={() => toggleNode(subItem.id)}
              isActive={true}
              level={subItem.level}
              colorScheme={colorScheme}
              icon={subItem.icon}
            />
          ))}
        </React.Fragment>
      );
    });
  };
  
  return (
    <div className={`max-w-4xl mx-auto p-6 rounded-xl shadow-xl transition-all duration-1000 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white'}`}>
      <div className="flex justify-between items-center mb-4">
        <div className="text-center flex-grow">
          <h1 className={`text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 ${darkMode ? 'opacity-90' : ''}`}>
            Business Analyst Roadmap with AI Integration
          </h1>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>An interactive guide to developing modern business analysis skills</p>
        </div>
        <button 
          onClick={toggleDarkMode} 
          className={`p-2 rounded-full transition-colors duration-300 ${
            darkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-800 text-white'
          }`}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
      
      <div className="flex justify-between mb-8 flex-wrap gap-2">
        {[
          {key: 'foundation', label: 'Foundation', icon: <Award size={18} />},
          {key: 'intermediate', label: 'Intermediate', icon: <Layers size={18} />},
          {key: 'advanced', label: 'Advanced', icon: <BarChart2 size={18} />},
          {key: 'ai-integration', label: 'AI Integration', icon: <Cpu size={18} />}
        ].map((phase, index) => {
          const isActive = activePhase === phase.key;
          const colors = phaseColors[phase.key];
          return (
            <button
              key={phase.key}
              className={`px-4 py-3 rounded-lg font-medium flex items-center transition-all duration-1000 ${
                isActive 
                  ? colors.primary + ' text-white shadow-lg transform scale-105' 
                  : darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => {
                setActivePhase(phase.key);
                resetAndAutoExpand();
              }}
            >
              <div className="mr-2">
                {phase.icon}
              </div>
              <div>
                <span className="text-sm">Stage {index + 1}</span>
                <div>{phase.label}</div>
              </div>
            </button>
          );
        })}
      </div>
      
      <div className={`transition-all duration-2000 ${animatePhase ? 'opacity-70 transform translate-x-4' : 'opacity-100'}`}>
        <div className={`p-4 mb-6 rounded-lg ${phaseColors[activePhase].primary} text-white`}>
          <h2 className="text-xl font-bold mb-2 flex items-center">
            {activePhase === 'foundation' && <>Foundation Skills <Award className="ml-2" size={24} /></>}
            {activePhase === 'intermediate' && <>Intermediate Skills <Layers className="ml-2" size={24} /></>}
            {activePhase === 'advanced' && <>Advanced Skills <BarChart2 className="ml-2" size={24} /></>}
            {activePhase === 'ai-integration' && <>AI Integration Skills <Cpu className="ml-2" size={24} /></>}
          </h2>
          <p>
            {activePhase === 'foundation' && 'Building your core business analysis skills and knowledge foundation.'}
            {activePhase === 'intermediate' && 'Developing technical capabilities and methodologies to enhance your analytical work.'}
            {activePhase === 'advanced' && 'Mastering specialized skills that elevate you to senior business analyst positions.'}
            {activePhase === 'ai-integration' && 'Incorporating artificial intelligence to transform the business analyst role for the future.'}
          </p>
        </div>
        
        {renderNodes(activePhase)}
      </div>
      
      <div className={`mt-8 p-5 rounded-lg shadow-md border-l-4 border-blue-500 ${darkMode ? 'bg-gradient-to-r from-blue-900/30 to-indigo-900/30' : 'bg-gradient-to-r from-blue-50 to-indigo-50'}`}>
        <h3 className={`font-semibold ${darkMode ? 'text-blue-400' : 'text-blue-700'} mb-2 flex items-center`}>
          <Award className="mr-2" size={20} /> LinkedIn Profile Tip:
        </h3>
        <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
          {activePhase === 'foundation' && 'Highlight specific business domains you understand deeply. Recruiters value business analysts who can speak the language of the industry they serve.'}
          {activePhase === 'intermediate' && 'Showcase your technical toolkit with concrete examples of how you\'ve applied these skills to solve real business problems.'}
          {activePhase === 'advanced' && 'Feature case studies on your profile that demonstrate measurable business impact from your advanced analysis work.'}
          {activePhase === 'ai-integration' && 'Position yourself as an "AI Translator" who can bridge technical AI capabilities with business needs—this hybrid skill set commands premium salaries.'}
        </p>
      </div>
      
      <div className="flex justify-between items-center mt-6">
        <button 
          onClick={resetAndAutoExpand}
          className={`px-4 py-2 rounded-md flex items-center transition-colors duration-300 ${
            darkMode 
              ? 'bg-blue-700 text-white hover:bg-blue-600' 
              : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
          </svg>
          Start Animation
        </button>
        <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Created with Claude • Perfect for LinkedIn
        </div>
      </div>
    </div>
  );
};

export default BusinessAnalystRoadmap;
