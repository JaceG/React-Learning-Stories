import React from 'react';
import { Link } from 'react-router-dom';
import '../CourseStyles.css';

function BuildDeployOverview() {
  const lessons = [
    {
      id: 'build-optimization',
      title: 'Build Optimization',
      description: 'Optimize bundles, code splitting, and performance for production builds.',
      icon: '📦'
    },
    {
      id: 'environment-config',
      title: 'Environment Configuration',
      description: 'Master environment variables, feature flags, and multi-environment setups.',
      icon: '⚙️'
    },
    {
      id: 'deployment-strategies',
      title: 'Deployment Strategies',
      description: 'Deploy to Vercel, Netlify, AWS, and implement advanced deployment patterns.',
      icon: '🚀'
    },
    {
      id: 'ci-cd-react',
      title: 'CI/CD for React',
      description: 'Set up automated testing, building, and deployment pipelines.',
      icon: '🔄'
    }
  ];

  return (
    <div className='course-overview'>
      <div className='course-header'>
        <Link to='/courses' className='back-link'>← Back to Courses</Link>
        <h1 className='course-title'>Build & Deploy</h1>
        <p className='course-description'>
          Visit the Launch Pad where applications transform from code to production. 
          Master the arts of optimization, configuration, and deployment to deliver 
          your React applications to users worldwide with confidence.
        </p>
      </div>

      <div className='course-prerequisites'>
        <h3>Prerequisites</h3>
        <p>
          This course covers DevOps concepts and requires:
        </p>
        <ul>
          <li>Experience building React applications</li>
          <li>Basic command line knowledge</li>
          <li>Understanding of npm/yarn scripts</li>
          <li>Familiarity with Git and GitHub</li>
        </ul>
        <p className='prerequisite-note'>
          💡 Recommended: Basic knowledge of web servers and hosting
        </p>
      </div>

      <div className='lessons-grid'>
        {lessons.map((lesson) => (
          <Link 
            key={lesson.id} 
            to={`/courses/build-deploy/${lesson.id}`} 
            className='lesson-card'
          >
            <div className='lesson-icon'>{lesson.icon}</div>
            <h3 className='lesson-title'>{lesson.title}</h3>
            <p className='lesson-description'>{lesson.description}</p>
            <div className='lesson-progress'>
              <span>3 chapters</span>
              <span className='progress-indicator coming-soon'>Coming Soon</span>
            </div>
          </Link>
        ))}
      </div>

      <div className='learning-objectives'>
        <h3>What You'll Learn</h3>
        <ul>
          <li>🎯 Webpack configuration and optimization</li>
          <li>🎯 Code splitting and lazy loading</li>
          <li>🎯 Bundle analysis and size reduction</li>
          <li>🎯 Environment variables and secrets</li>
          <li>🎯 Deployment to major platforms</li>
          <li>🎯 GitHub Actions for React</li>
          <li>🎯 Testing in CI/CD pipelines</li>
          <li>🎯 Progressive Web App deployment</li>
        </ul>
      </div>
    </div>
  );
}

export default BuildDeployOverview;