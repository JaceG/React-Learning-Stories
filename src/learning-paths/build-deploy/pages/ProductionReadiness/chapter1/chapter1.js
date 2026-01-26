import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import CodeExample from '../../../../../components/content/CodeExample';
import InstructionBox from '../../../../../components/content/InstructionBox';

const ChapterOne = () => {
	const [selectedChecks, setSelectedChecks] = useState([]);
	const [healthStatus, setHealthStatus] = useState('unknown');
	const [securityScore, setSecurityScore] = useState(0);
	const { battleReadiness, setBattleReadiness, promoteRank, addMonitoringSystem } = useOutletContext();

	const readinessChecks = [
		{
			id: 'error-boundaries',
			category: 'Stability',
			title: 'Error Boundaries',
			description: 'Catch JavaScript errors in component tree',
			icon: '🛡️',
			points: 15
		},
		{
			id: 'environment-vars',
			category: 'Security',
			title: 'Environment Variables',
			description: 'Secure configuration management',
			icon: '🔐',
			points: 20
		},
		{
			id: 'performance-budget',
			category: 'Performance',
			title: 'Performance Budget',
			description: 'Bundle size and load time limits',
			icon: '⚡',
			points: 15
		},
		{
			id: 'monitoring',
			category: 'Observability',
			title: 'Monitoring Setup',
			description: 'Application and error monitoring',
			icon: '📊',
			points: 20
		},
		{
			id: 'backup-strategy',
			category: 'Reliability',
			title: 'Backup Strategy',
			description: 'Data backup and recovery plan',
			icon: '💾',
			points: 15
		},
		{
			id: 'security-headers',
			category: 'Security',
			title: 'Security Headers',
			description: 'HTTPS, CSP, HSTS configuration',
			icon: '🔒',
			points: 15
		}
	];

	const healthChecks = [
		{ name: 'API Health', endpoint: '/health', status: 'healthy' },
		{ name: 'Database Connection', endpoint: '/db/health', status: 'healthy' },
		{ name: 'Cache Status', endpoint: '/cache/health', status: 'warning' },
		{ name: 'External Services', endpoint: '/services/health', status: 'healthy' }
	];

	const performCheck = (checkId) => {
		if (!selectedChecks.includes(checkId)) {
			const check = readinessChecks.find(c => c.id === checkId);
			setSelectedChecks([...selectedChecks, checkId]);
			setBattleReadiness(prev => Math.min(100, prev + check.points));
			
			if (check.category === 'Security') {
				setSecurityScore(prev => Math.min(100, prev + 25));
			}
			
			if (selectedChecks.length >= 3) {
				promoteRank('Defender');
			}
		}
	};

	const runHealthCheck = () => {
		setHealthStatus('checking');
		setTimeout(() => {
			setHealthStatus('healthy');
			addMonitoringSystem({
				id: 'health-monitor',
				name: 'Health Monitor',
				icon: '🏥',
				status: 'active'
			});
		}, 2000);
	};

	const getStatusColor = (status) => {
		switch(status) {
			case 'healthy': return '#27ae60';
			case 'warning': return '#f39c12';
			case 'critical': return '#e74c3c';
			default: return '#7f8c8d';
		}
	};

	return (
		<div className='chapter'>
			<ChapterIntro
				chapterNumber={1}
				title={`The Production War Room`}
			/>

			<div className='story-section'>
				<p className='story-paragraph'>
					Binary scanned the monitoring dashboards. "Current uptime: 99.5%. Error 
					rate: 0.3%. Performance score: 85/100. Room for improvement detected."
				</p>

				<p className='story-paragraph'>
					Debuggora examined the error logs. "Error boundaries will catch component 
					failures. But what about unhandled promise rejections and network errors?"
				</p>

				<p className='story-paragraph'>
					"Production readiness isn't just about code," Commander Deployment explained. 
					"It's about monitoring, security, performance, and being prepared for the 
					unexpected."
				</p>

				<p className='story-paragraph'>
					Aria surveyed the war room's displays. "So many things to check before 
					deployment. Where do we even begin?"
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>Production Readiness Checklist</h3>
				
				<InstructionBox character={`Commander Deployment gestures to the battle readiness assessment board.`}>
					{`"Every deployment is a mission. Complete these critical checks to ensure your application survives first contact with real users. Click each check to activate it and increase your battle readiness score."`}
				</InstructionBox>
				
				<div className='war-room-dashboard'>
					<div className='dashboard-header'>
						<h4>Battle Readiness Assessment</h4>
						<div className='battle-status'>
							<div className='status-indicator'>
								<div className='status-value'>{battleReadiness}%</div>
								<div className='status-label'>Overall Readiness</div>
							</div>
							<div className='status-indicator'>
								<div className='status-value' style={{ color: '#f39c12' }}>
									{selectedChecks.length}/6
								</div>
								<div className='status-label'>Checks Complete</div>
							</div>
							<div className='status-indicator'>
								<div className='status-value' style={{ color: '#3498db' }}>
									{securityScore}%
								</div>
								<div className='status-label'>Security Score</div>
							</div>
						</div>
					</div>

					<div className='readiness-checklist'>
						<h4>Critical Checks</h4>
						{readinessChecks.map((check) => (
							<div 
								key={check.id}
								className={`checklist-item ${selectedChecks.includes(check.id) ? 'completed' : ''}`}
								onClick={() => performCheck(check.id)}
							>
								<div className='checklist-checkbox'>
									{selectedChecks.includes(check.id) && '✓'}
								</div>
								<div className='checklist-content'>
									<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
										<span style={{ fontSize: '1.5em' }}>{check.icon}</span>
										<div>
											<div className='checklist-title'>{check.title}</div>
											<div className='checklist-description'>{check.description}</div>
											<div style={{ fontSize: '0.85em', color: '#7f8c8d', marginTop: '5px' }}>
												Category: {check.category} | Points: +{check.points}
											</div>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>

					{selectedChecks.length >= 4 && (
						<div style={{ 
							marginTop: '20px', 
							padding: '15px',
							background: 'rgba(46, 204, 113, 0.1)',
							border: '1px solid rgba(46, 204, 113, 0.3)',
							borderRadius: '8px',
							textAlign: 'center'
						}}>
							<div style={{ fontSize: '1.2em', color: '#27ae60' }}>
								🎖️ Production Readiness Level: {battleReadiness >= 80 ? 'EXCELLENT' : 'GOOD'} 🎖️
							</div>
						</div>
					)}
				</div>

				<div className='metrics-dashboard'>
					<h4>System Health Monitoring</h4>
					<div style={{ marginBottom: '20px', textAlign: 'center' }}>
						<button
							onClick={runHealthCheck}
							disabled={healthStatus === 'checking'}
							style={{
								padding: '10px 30px',
								background: healthStatus === 'healthy' ? '#27ae60' : '#3498db',
								color: 'white',
								border: 'none',
								borderRadius: '5px',
								cursor: healthStatus === 'checking' ? 'not-allowed' : 'pointer',
								fontSize: '1.1em',
								fontWeight: 'bold',
								opacity: healthStatus === 'checking' ? 0.7 : 1
							}}
						>
							{healthStatus === 'checking' ? 'Checking...' : 
							 healthStatus === 'healthy' ? '✓ All Systems Operational' : 
							 'Run Health Check'}
						</button>
					</div>

					{healthStatus !== 'unknown' && (
						<div className='monitoring-grid'>
							{healthChecks.map((check, index) => (
								<div 
									key={index}
									className='monitoring-card'
									style={{ borderColor: getStatusColor(check.status) }}
								>
									<div className='monitoring-icon' 
									     style={{ color: getStatusColor(check.status) }}>
										{check.status === 'healthy' ? '✓' : 
										 check.status === 'warning' ? '⚠️' : '✗'}
									</div>
									<div className='monitoring-name'>{check.name}</div>
									<div className='monitoring-metrics'>
										<div>Endpoint: {check.endpoint}</div>
										<div style={{ 
											marginTop: '5px', 
											color: getStatusColor(check.status),
											fontWeight: 'bold'
										}}>
											Status: {check.status.toUpperCase()}
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>

			<CodeExample
				title={`Production Readiness Configuration`}
				discoveredBy={`Commander's battle-tested setup`}
				code={`# Error Boundaries Implementation
// Commander: "Catch errors before users see them!"

import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log to monitoring service
    console.error('Error caught by boundary:', error, errorInfo);
    
    // Send to error tracking (e.g., Sentry)
    if (window.Sentry) {
      window.Sentry.captureException(error, {
        contexts: { react: { componentStack: errorInfo.componentStack } }
      });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>Oops! Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

# Health Check Endpoint
// Binary: "Monitor all critical systems!"

// Express health check
app.get('/health', async (req, res) => {
  const health = {
    uptime: process.uptime(),
    timestamp: Date.now(),
    status: 'healthy',
    checks: {}
  };

  // Check database
  try {
    await db.ping();
    health.checks.database = 'healthy';
  } catch (error) {
    health.checks.database = 'unhealthy';
    health.status = 'degraded';
  }

  // Check cache
  try {
    await redis.ping();
    health.checks.cache = 'healthy';
  } catch (error) {
    health.checks.cache = 'unhealthy';
  }

  res.status(health.status === 'healthy' ? 200 : 503).json(health);
});

# Security Headers Configuration
// Debuggora: "Headers are your first line of defense!"

// Helmet.js for Express
const helmet = require('helmet');

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https://api.example.com"]
    }
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));

# Environment Variables Validation
// Aria: "Never hardcode secrets!"

const requiredEnvVars = [
  'NODE_ENV',
  'API_URL',
  'DATABASE_URL',
  'JWT_SECRET',
  'SENTRY_DSN'
];

function validateEnv() {
  const missing = requiredEnvVars.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    throw new Error(\`Missing environment variables: \${missing.join(', ')}\`);
  }
}`}
			/>

			<ChapterSummary
				lessonInsight={{
					title: `The War Room Principle:`,
					content: `Production readiness begins in the War Room, where every potential issue is anticipated and prepared for. Commander Deployment's wisdom shows that successful production deployments require comprehensive checks: error boundaries catch failures gracefully, health endpoints monitor system status, security headers protect against attacks, and proper environment configuration ensures secrets remain secret. The battle against downtime is won through preparation, not luck.`
				}}
				reflectionQuestions={[
					`Why is it important to have multiple layers of error handling in production applications?`,
					`How does proactive monitoring help prevent issues before users experience them?`
				]}
				characterIntros={[
					{
						name: `Commander Deployment`,
						description: `Master strategist of the Production War Room who oversees all deployment operations. Her philosophy: "Every deployment is a mission - prepare for success, plan for failure."`
					}
				]}
				journalEntry={{
					title: `Aria's Journal - Day 36 (Morning)`,
					content: `I've entered the Production War Room, where Commander Deployment stands vigilant before a wall of monitors. This is the final frontier of our journey - where code meets the real world. I learned about the critical production readiness checks: error boundaries that catch component failures gracefully, health endpoints that monitor system vitals, security headers that defend against attacks, and environment variable validation that keeps secrets safe. Binary's dashboard showed 99.5% uptime and 0.3% error rate - good, but there's always room for improvement. Commander's wisdom: "The battle against downtime is won through preparation, not luck." Each checkbox I completed felt like armor being added before battle.`
				}}
			/>
		</div>
	);
};

export default ChapterOne;