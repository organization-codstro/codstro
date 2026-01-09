import { Code, Database, Smartphone, Brain } from 'lucide-react';
import { Major } from '../../types/Mbit/Mbit';


export const majors: Major[] = [
  {
    id: 1,
    name: 'Frontend Development',
    icon: Code,
    description: 'Create user interfaces and experiences for web applications',
    focus: 'HTML, CSS, JavaScript, React, Vue, UI/UX Design',
    careers: 'Frontend Developer, UI Developer, Web Designer',
    color: 'from-blue-500 to-cyan-500',
    detailedDescription: 'Frontend development focuses on everything users see and interact with in web applications. You will create beautiful, responsive interfaces that provide seamless user experiences across all devices. This field combines technical skills with creative design thinking.',
    keySkills: [
      'HTML5, CSS3, JavaScript (ES6+)',
      'React, Vue, or Angular frameworks',
      'Responsive web design',
      'UI/UX principles',
      'CSS preprocessors (Sass, Less)',
      'Build tools (Webpack, Vite)',
      'Version control (Git)',
      'Web performance optimization',
      'Accessibility standards (WCAG)',
      'Cross-browser compatibility'
    ],
    learningPath: [
      'Start with HTML & CSS fundamentals',
      'Master JavaScript basics and ES6+',
      'Learn responsive design principles',
      'Study one major framework (React recommended)',
      'Understand state management',
      'Practice with real projects',
      'Learn build tools and workflows',
      'Explore advanced CSS techniques',
      'Study web performance optimization',
      'Build a portfolio of projects'
    ],
    salaryRange: '$60,000 - $150,000',
    jobOutlook: 'Excellent - High demand across all industries',
    famousCompanies: [
      'Google',
      'Facebook/Meta',
      'Netflix',
      'Airbnb',
      'Spotify',
      'Adobe'
    ],
    dayInLife: [
      'Review designs from UI/UX team',
      'Implement new features in React',
      'Fix cross-browser compatibility issues',
      'Optimize page load performance',
      'Collaborate with backend developers',
      'Conduct code reviews',
      'Attend stand-up meetings',
      'Test responsive layouts on different devices'
    ]
  },
  {
    id: 2,
    name: 'Backend Development',
    icon: Database,
    description: 'Build server-side logic, APIs, and database management',
    focus: 'Node.js, Python, Java, SQL, APIs, Server Architecture',
    careers: 'Backend Developer, API Engineer, Database Administrator',
    color: 'from-green-500 to-emerald-500',
    detailedDescription: 'Backend development powers everything behind the scenes. You will build robust servers, design efficient databases, and create APIs that enable applications to function. This role focuses on logic, security, and performance.',
    keySkills: [
      'Programming languages (Node.js, Python, Java)',
      'RESTful API design',
      'Database design (SQL and NoSQL)',
      'Authentication and authorization',
      'Server architecture',
      'API documentation',
      'Caching strategies',
      'Security best practices',
      'Microservices architecture',
      'Cloud services (AWS, Azure, GCP)'
    ],
    learningPath: [
      'Choose a backend language (Node.js or Python recommended)',
      'Learn HTTP and REST principles',
      'Master SQL databases (PostgreSQL)',
      'Understand NoSQL databases (MongoDB)',
      'Study authentication methods (JWT, OAuth)',
      'Learn API design patterns',
      'Practice with real backend projects',
      'Explore cloud platforms',
      'Study system design',
      'Learn containerization (Docker)'
    ],
    salaryRange: '$70,000 - $160,000',
    jobOutlook: 'Excellent - Critical role in all tech companies',
    famousCompanies: [
      'Amazon',
      'Microsoft',
      'Twitter',
      'Stripe',
      'Uber',
      'LinkedIn'
    ],
    dayInLife: [
      'Design new API endpoints',
      'Optimize database queries',
      'Debug production issues',
      'Write unit and integration tests',
      'Review system architecture',
      'Monitor server performance',
      'Implement security measures',
      'Collaborate with frontend team on API contracts'
    ]
  },
  {
    id: 3,
    name: 'Mobile Development',
    icon: Smartphone,
    description: 'Develop applications for iOS and Android platforms',
    focus: 'Swift, Kotlin, React Native, Flutter, Mobile UI',
    careers: 'iOS Developer, Android Developer, Mobile App Developer',
    color: 'from-purple-500 to-pink-500',
    detailedDescription: 'Mobile development brings applications to billions of smartphone users worldwide. You will create native or cross-platform apps that provide rich experiences on mobile devices. This field requires understanding mobile-specific challenges like battery life, touch interfaces, and varied screen sizes.',
    keySkills: [
      'iOS (Swift) or Android (Kotlin) development',
      'Cross-platform frameworks (React Native, Flutter)',
      'Mobile UI/UX patterns',
      'App store deployment',
      'Mobile performance optimization',
      'Push notifications',
      'Offline functionality',
      'Mobile security',
      'Device APIs (camera, GPS, sensors)',
      'App analytics and monitoring'
    ],
    learningPath: [
      'Choose platform: Native (iOS/Android) or Cross-platform',
      'Learn Swift for iOS or Kotlin for Android',
      'Or learn React Native/Flutter for cross-platform',
      'Study mobile UI patterns',
      'Understand mobile app lifecycle',
      'Practice with simple apps',
      'Learn data persistence strategies',
      'Study app store guidelines',
      'Build and deploy apps to stores',
      'Learn mobile performance optimization'
    ],
    salaryRange: '$65,000 - $155,000',
    jobOutlook: 'Very Good - Growing mobile-first world',
    famousCompanies: [
      'Apple',
      'Google',
      'Instagram',
      'Snapchat',
      'WhatsApp',
      'TikTok'
    ],
    dayInLife: [
      'Implement new app features',
      'Test on multiple devices',
      'Optimize app performance',
      'Fix device-specific bugs',
      'Integrate with backend APIs',
      'Prepare app store releases',
      'Monitor crash reports',
      'Update for new OS versions'
    ]
  },
  {
    id: 4,
    name: 'Data Science',
    icon: Brain,
    description: 'Analyze data and build machine learning models',
    focus: 'Python, R, Machine Learning, Statistics, Data Visualization',
    careers: 'Data Scientist, ML Engineer, Data Analyst',
    color: 'from-orange-500 to-red-500',
    detailedDescription: 'Data Science combines programming, statistics, and domain knowledge to extract insights from data. You will build machine learning models, analyze trends, and help organizations make data-driven decisions. This rapidly growing field is transforming every industry.',
    keySkills: [
      'Python (NumPy, Pandas, Scikit-learn)',
      'Statistics and probability',
      'Machine learning algorithms',
      'Data visualization (Matplotlib, Seaborn)',
      'SQL for data querying',
      'Deep learning (TensorFlow, PyTorch)',
      'Feature engineering',
      'Model evaluation and validation',
      'Big data tools (Spark)',
      'Data cleaning and preprocessing'
    ],
    learningPath: [
      'Learn Python basics',
      'Study statistics and probability',
      'Master Pandas for data manipulation',
      'Learn data visualization',
      'Understand machine learning fundamentals',
      'Practice with real datasets (Kaggle)',
      'Study supervised learning algorithms',
      'Learn unsupervised learning techniques',
      'Explore deep learning basics',
      'Build portfolio projects with real impact'
    ],
    salaryRange: '$80,000 - $180,000',
    jobOutlook: 'Excellent - Rapidly growing field',
    famousCompanies: [
      'Google',
      'Facebook/Meta',
      'Amazon',
      'Netflix',
      'Tesla',
      'OpenAI'
    ],
    dayInLife: [
      'Explore and clean data',
      'Build predictive models',
      'Create data visualizations',
      'Present findings to stakeholders',
      'Optimize model performance',
      'Deploy models to production',
      'Monitor model accuracy',
      'Collaborate with engineers to integrate models'
    ]
  }
];
