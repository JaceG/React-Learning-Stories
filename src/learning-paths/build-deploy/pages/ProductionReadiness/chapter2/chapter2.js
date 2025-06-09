import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const ChapterTwo = () => {
	const [activeMonitor, setActiveMonitor] = useState('');
	const [alerts, setAlerts] = useState([]);
	const [performanceScore, setPerformanceScore] = useState(75);
	const [alertsResolved, setAlertsResolved] = useState(0);
	const { 
		monitoringSystems, 
		addMonitoringSystem, 
		promoteRank,
		productionMetrics,
		improveMetric
	} = useOutletContext();

	const monitoringTools = [
		{
			id: 'sentry',
			name: 'Sentry',
			icon: '🚨',
			type: 'Error Tracking',
			features: ['Real-time error alerts', 'Stack trace analysis', 'User context', 'Release tracking'],
			metrics: ['Error rate', 'Affected users', 'Issue trends']
		},
		{
			id: 'datadog',
			name: 'Datadog',
			icon: '📊',
			type: 'APM & Infrastructure',
			features: ['Application performance', 'Infrastructure monitoring', 'Log aggregation', 'Custom dashboards'],
			metrics: ['Response time', 'Throughput', 'Error rate', 'CPU/Memory']
		},
		{
			id: 'new-relic',
			name: 'New Relic',
			icon: '📈',
			type: 'Application Monitoring',
			features: ['Transaction tracing', 'Database queries', 'External services', 'Browser monitoring'],
			metrics: ['Apdex score', 'Response time', 'Error rate']
		},
		{
			id: 'pagerduty',
			name: 'PagerDuty',
			icon: '📟',
			type: 'Incident Management',
			features: ['On-call scheduling', 'Alert routing', 'Escalation policies', 'Incident timeline'],
			metrics: ['MTTD', 'MTTR', 'Alert volume']
		}
	];

	const sampleAlerts = [
		{
			id: 1,
			level: 'high',
			message: 'Error rate spike detected (5% → 12%)',
			service: 'API Gateway',
			time: '2 minutes ago',
			status: 'active'
		},
		{
			id: 2,
			level: 'medium',
			message: 'Database query time increased (120ms → 450ms)',
			service: 'User Service',
			time: '15 minutes ago',
			status: 'active'
		},
		{
			id: 3,
			level: 'low',
			message: 'CDN cache hit rate below threshold (85%)',
			service: 'Static Assets',
			time: '1 hour ago',
			status: 'active'
		}
	];

	const performanceMetrics = [
		{ name: 'First Contentful Paint', target: '< 1.8s', current: '2.1s', status: 'warning' },
		{ name: 'Time to Interactive', target: '< 3.9s', current: '3.2s', status: 'good' },
		{ name: 'Total Blocking Time', target: '< 300ms', current: '420ms', status: 'poor' },
		{ name: 'Cumulative Layout Shift', target: '< 0.1', current: '0.08', status: 'good' }
	];

	const activateMonitoring = (toolId) => {
		const tool = monitoringTools.find(t => t.id === toolId);
		if (!monitoringSystems.find(s => s.id === toolId)) {
			addMonitoringSystem({
				id: toolId,
				name: tool.name,
				icon: tool.icon,
				status: 'active'
			});
			setActiveMonitor(toolId);
			
			// Add sample alerts
			if (alerts.length === 0) {
				setAlerts(sampleAlerts);
			}
			
			// Improve metrics
			improveMetric('errorRate', -2);
			improveMetric('performance', 5);
			
			if (monitoringSystems.length >= 2) {
				promoteRank('Guardian');
			}
		}
	};

	const resolveAlert = (alertId) => {
		setAlerts(alerts.map(alert => 
			alert.id === alertId ? { ...alert, status: 'resolved' } : alert
		));
		setAlertsResolved(prev => prev + 1);
		improveMetric('errorRate', -1);
		improveMetric('uptime', 1);
		
		if (alertsResolved >= 2) {
			promoteRank('Commander');
		}
	};

	const getMetricStatus = (status) => {
		switch(status) {
			case 'good': return { color: '#27ae60', label: 'Good' };
			case 'warning': return { color: '#f39c12', label: 'Needs Improvement' };
			case 'poor': return { color: '#e74c3c', label: 'Poor' };
			default: return { color: '#7f8c8d', label: 'Unknown' };
		}
	};

	return (
		<div className='chapter'>
			<h2 className='chapter-title'>
				Chapter 2: The Monitoring Arsenal
			</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					Commander Deployment led Aria to the monitoring station. "Every production 
					system needs eyes and ears. Monitoring tools are your scouts, alerting you 
					to problems before they become disasters."
				</p>
				
				<p className='story-paragraph'>
					Binary analyzed the data streams. "Current monitoring coverage: 60%. 
					Blind spots detected in user experience metrics and third-party service 
					dependencies."
				</p>

				<p className='story-paragraph'>
					Debuggora investigated an alert. "This error spike started 15 minutes ago. 
					Correlating with the last deployment... Found it! Missing null check in 
					the payment service."
				</p>

				<p className='story-paragraph'>
					"See how monitoring turns mysteries into actionable insights?" Commander 
					said. "Without it, you're flying blind in production."
				</p>

				<p className='story-paragraph'>
					Aria watched the dashboards update in real-time. "It's like having a 
					thousand eyes watching over our application!"
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>Monitoring Command Center</h3>
				
				<div className='monitoring-grid'>
					{monitoringTools.map((tool) => (
						<div 
							key={tool.id}
							className={`monitoring-card ${activeMonitor === tool.id ? 'active' : ''}`}
							onClick={() => activateMonitoring(tool.id)}
						>
							<div className='monitoring-icon'>{tool.icon}</div>
							<div className='monitoring-name'>{tool.name}</div>
							<div style={{ fontSize: '0.9em', color: '#3498db', marginBottom: '10px' }}>
								{tool.type}
							</div>
							<div className='monitoring-metrics'>
								<strong>Key Features:</strong>
								<ul style={{ marginLeft: '20px', marginTop: '5px' }}>
									{tool.features.slice(0, 2).map((feature, i) => (
										<li key={i} style={{ fontSize: '0.85em' }}>{feature}</li>
									))}
								</ul>
							</div>
							{monitoringSystems.find(s => s.id === tool.id) && (
								<div style={{ 
									marginTop: '10px', 
									color: '#27ae60', 
									fontWeight: 'bold',
									textAlign: 'center'
								}}>
									✓ Active
								</div>
							)}
						</div>
					))}
				</div>

				{alerts.length > 0 && (
					<div className={`alert-center ${alerts.some(a => a.level === 'high' && a.status === 'active') ? 'critical' : ''}`}>
						<div className='alert-header'>
							<h4>🚨 Alert Center</h4>
							<div style={{ fontSize: '0.9em' }}>
								Active: {alerts.filter(a => a.status === 'active').length} | 
								Resolved: {alertsResolved}
							</div>
						</div>
						<div className='alert-list'>
							{alerts.map((alert) => (
								<div 
									key={alert.id} 
									className={`alert-item ${alert.level} ${alert.status === 'resolved' ? 'resolved' : ''}`}
								>
									<div className='alert-content'>
										<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
											<span className={`alert-level ${alert.level}`}>
												{alert.level.toUpperCase()}
											</span>
											<strong>{alert.service}</strong>
										</div>
										<div style={{ marginTop: '5px' }}>{alert.message}</div>
										<div style={{ fontSize: '0.85em', color: '#7f8c8d', marginTop: '5px' }}>
											{alert.time}
										</div>
									</div>
									{alert.status === 'active' && (
										<button
											onClick={() => resolveAlert(alert.id)}
											style={{
												padding: '5px 15px',
												background: '#27ae60',
												color: 'white',
												border: 'none',
												borderRadius: '5px',
												cursor: 'pointer'
											}}
										>
											Resolve
										</button>
									)}
								</div>
							))}
						</div>
					</div>
				)}

				<div className='metrics-dashboard'>
					<h4>Production Metrics Dashboard</h4>
					<div className='metrics-grid'>
						<div className='metric-card' style={{ '--metric-value': `${productionMetrics.uptime}%` }}>
							<div className='metric-value' style={{ color: '#27ae60' }}>
								{productionMetrics.uptime}%
							</div>
							<div className='metric-label'>Uptime</div>
							<div className='metric-trend trend-up'>↑ 0.5%</div>
						</div>
						<div className='metric-card' style={{ '--metric-value': `${100 - productionMetrics.errorRate}%` }}>
							<div className='metric-value' style={{ 
								color: productionMetrics.errorRate > 5 ? '#e74c3c' : '#f39c12' 
							}}>
								{productionMetrics.errorRate}%
							</div>
							<div className='metric-label'>Error Rate</div>
							<div className='metric-trend trend-down'>↓ 0.3%</div>
						</div>
						<div className='metric-card' style={{ '--metric-value': `${productionMetrics.performance}%` }}>
							<div className='metric-value' style={{ color: '#3498db' }}>
								{productionMetrics.performance}
							</div>
							<div className='metric-label'>Performance Score</div>
							<div className='metric-trend trend-up'>↑ 5 pts</div>
						</div>
						<div className='metric-card' style={{ '--metric-value': `${productionMetrics.userSatisfaction}%` }}>
							<div className='metric-value' style={{ color: '#9b59b6' }}>
								{productionMetrics.userSatisfaction}%
							</div>
							<div className='metric-label'>User Satisfaction</div>
							<div className='metric-trend trend-up'>↑ 2%</div>
						</div>
					</div>
				</div>

				<div className='strategy-board'>
					<h4>Performance Monitoring</h4>
					{performanceMetrics.map((metric, index) => {
						const status = getMetricStatus(metric.status);
						return (
							<div key={index} style={{
								padding: '15px',
								margin: '10px 0',
								background: 'rgba(0, 0, 0, 0.3)',
								border: `1px solid ${status.color}`,
								borderRadius: '8px',
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center'
							}}>
								<div>
									<strong>{metric.name}</strong>
									<div style={{ fontSize: '0.9em', color: '#7f8c8d', marginTop: '5px' }}>
										Target: {metric.target}
									</div>
								</div>
								<div style={{ textAlign: 'right' }}>
									<div style={{ fontSize: '1.2em', fontWeight: 'bold', color: status.color }}>
										{metric.current}
									</div>
									<div style={{ fontSize: '0.85em', color: status.color }}>
										{status.label}
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>

			<div className='code-example'>
				<div className='scroll-header'>
					<span>Monitoring Integration Examples</span>
					<span className='discovered-by'>Commander's arsenal configuration</span>
				</div>
				<pre>{`# Sentry Error Tracking Setup
// Commander: "Catch every error, miss nothing!"

import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  integrations: [
    new Integrations.BrowserTracing(),
    new Sentry.Replay({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  beforeSend(event, hint) {
    // Filter out sensitive data
    if (event.request?.cookies) {
      delete event.request.cookies;
    }
    return event;
  },
});

# Custom Metrics Tracking
// Binary: "Measure everything that matters!"

class MetricsCollector {
  constructor() {
    this.metrics = {
      pageLoad: [],
      apiLatency: {},
      errorCounts: {},
      userActions: {}
    };
  }

  trackPageLoad(duration) {
    this.metrics.pageLoad.push({
      duration,
      timestamp: Date.now(),
      url: window.location.pathname
    });
    
    // Send to monitoring service
    this.sendToDatadog('page.load.time', duration);
  }

  trackAPICall(endpoint, duration, status) {
    if (!this.metrics.apiLatency[endpoint]) {
      this.metrics.apiLatency[endpoint] = [];
    }
    
    this.metrics.apiLatency[endpoint].push({
      duration,
      status,
      timestamp: Date.now()
    });
    
    // Alert on slow responses
    if (duration > 1000) {
      this.sendAlert('Slow API Response', {
        endpoint,
        duration,
        threshold: 1000
      });
    }
  }

  sendToDatadog(metric, value, tags = {}) {
    // Datadog RUM
    if (window.DD_RUM) {
      window.DD_RUM.addAction(metric, { value, ...tags });
    }
  }
}

# Alert Rules Configuration
// Debuggora: "Smart alerts prevent alert fatigue!"

const alertRules = {
  errorRate: {
    threshold: 5, // percentage
    window: '5m',
    severity: 'high',
    channels: ['pagerduty', 'slack'],
    message: 'Error rate exceeded {threshold}% in the last {window}'
  },
  responseTime: {
    threshold: 1000, // milliseconds
    window: '10m',
    severity: 'medium',
    channels: ['slack'],
    message: 'Response time exceeded {threshold}ms'
  },
  availability: {
    threshold: 99.5, // percentage
    window: '1h',
    severity: 'critical',
    channels: ['pagerduty', 'slack', 'email'],
    message: 'Availability dropped below {threshold}%'
  }
};

# Performance Budget Monitoring
// Aria: "Stay within budget or face the consequences!"

const performanceBudget = {
  javascript: 300 * 1024, // 300KB
  css: 100 * 1024, // 100KB
  images: 500 * 1024, // 500KB
  total: 1024 * 1024, // 1MB
  
  metrics: {
    FCP: 1800, // First Contentful Paint
    LCP: 2500, // Largest Contentful Paint
    TTI: 3800, // Time to Interactive
    CLS: 0.1   // Cumulative Layout Shift
  }
};

// Webpack plugin to enforce budget
new PerformanceBudgetPlugin({
  budget: performanceBudget,
  errorOnBudgetExceed: process.env.NODE_ENV === 'production'
});`}</pre>
			</div>

			<div className='lesson-insight'>
				<h3>The Monitoring Lesson:</h3>
				<p>
					The Monitoring Arsenal reveals that production excellence comes from 
					visibility. Commander Deployment's tools transform the unknown into the 
					known - Sentry catches errors with full context, Datadog tracks performance 
					across the stack, alert rules prevent issues from becoming outages, and 
					performance budgets keep applications fast. Real-time monitoring isn't just 
					about reacting to problems; it's about preventing them through continuous 
					observation and intelligent alerting.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					How does comprehensive monitoring change the way you approach debugging 
					production issues?
				</p>
				<p>
					Why is it important to have different types of monitoring tools working 
					together?
				</p>
			</div>
		</div>
	);
};

export default ChapterTwo;