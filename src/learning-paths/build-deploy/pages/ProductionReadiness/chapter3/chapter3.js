import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const ChapterThree = () => {
	const [deploymentStrategy, setDeploymentStrategy] = useState('');
	const [rollbackHistory, setRollbackHistory] = useState([]);
	const [incidentResponse, setIncidentResponse] = useState('ready');
	const [productionScore, setProductionScore] = useState(0);
	const { 
		battleReadiness, 
		setBattleReadiness, 
		commanderRank,
		promoteRank,
		productionMetrics 
	} = useOutletContext();

	const deploymentStrategies = [
		{
			id: 'blue-green',
			name: 'Blue-Green Deployment',
			icon: '🔵🟢',
			description: 'Zero-downtime deployment with instant rollback',
			steps: [
				'Deploy to green environment',
				'Run smoke tests',
				'Switch traffic to green',
				'Keep blue as rollback'
			],
			benefits: ['Zero downtime', 'Instant rollback', 'Full testing'],
			risks: ['Double infrastructure cost', 'Database migrations']
		},
		{
			id: 'canary',
			name: 'Canary Release',
			icon: '🐤',
			description: 'Gradual rollout to minimize risk',
			steps: [
				'Deploy to small percentage',
				'Monitor metrics',
				'Gradually increase traffic',
				'Full rollout or rollback'
			],
			benefits: ['Risk mitigation', 'Real user testing', 'Gradual adoption'],
			risks: ['Complex routing', 'Longer deployment time']
		},
		{
			id: 'rolling',
			name: 'Rolling Deployment',
			icon: '🎯',
			description: 'Sequential update of instances',
			steps: [
				'Update instance 1',
				'Health check',
				'Update remaining instances',
				'Verify all healthy'
			],
			benefits: ['Resource efficient', 'Configurable pace', 'Partial rollback'],
			risks: ['Version mixing', 'Slower than blue-green']
		}
	];

	const incidentPlaybook = [
		{ phase: 'Detection', time: '0-5 min', actions: ['Alert triggered', 'On-call notified', 'Initial assessment'] },
		{ phase: 'Response', time: '5-15 min', actions: ['War room opened', 'Impact analysis', 'Communication started'] },
		{ phase: 'Mitigation', time: '15-30 min', actions: ['Rollback if needed', 'Apply hotfix', 'Monitor recovery'] },
		{ phase: 'Resolution', time: '30-60 min', actions: ['Verify fix', 'All-clear signal', 'Post-mortem scheduled'] }
	];

	const productionChecklist = [
		{ category: 'Pre-Deploy', items: ['Code review approved', 'Tests passing', 'Performance validated', 'Security scan clean'] },
		{ category: 'Deploy', items: ['Backup created', 'Rollback plan ready', 'Team notified', 'Monitoring alerts set'] },
		{ category: 'Post-Deploy', items: ['Smoke tests run', 'Metrics normal', 'No error spikes', 'User feedback positive'] },
		{ category: 'Ongoing', items: ['Daily health checks', 'Weekly reviews', 'Monthly drills', 'Quarterly audits'] }
	];

	const selectStrategy = (strategyId) => {
		setDeploymentStrategy(strategyId);
		setBattleReadiness(prev => Math.min(100, prev + 10));
		setProductionScore(prev => prev + 25);
		
		if (productionScore >= 50) {
			promoteRank('Admiral');
		}
	};

	const performRollback = () => {
		const rollback = {
			id: Date.now(),
			version: 'v2.3.1 → v2.3.0',
			reason: 'Performance degradation detected',
			time: new Date().toLocaleTimeString(),
			duration: '45 seconds'
		};
		setRollbackHistory([rollback, ...rollbackHistory]);
		setIncidentResponse('mitigated');
	};

	const runIncidentDrill = () => {
		setIncidentResponse('active');
		let phase = 0;
		const interval = setInterval(() => {
			if (phase < 3) {
				phase++;
			} else {
				clearInterval(interval);
				setIncidentResponse('resolved');
				setBattleReadiness(100);
				if (commanderRank !== 'Admiral') {
					promoteRank('Admiral');
				}
			}
		}, 2000);
	};

	return (
		<div className='chapter'>
			<h2 className='chapter-title'>
				Chapter 3: Battle-Tested Strategies
			</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					"You've learned to monitor and prepare," Commander Deployment said. "Now 
					comes the ultimate test - deployment strategies and incident response. These 
					are your battle tactics."
				</p>
				
				<p className='story-paragraph'>
					Binary calculated probabilities. "Blue-green: 99.9% uptime potential. 
					Canary: 85% risk reduction. Rolling: 60% resource efficiency. Each strategy 
					has optimal use cases."
				</p>

				<p className='story-paragraph'>
					Debuggora studied the incident playbook. "The key is preparation. When 
					production burns, there's no time to figure out what to do. You follow 
					the playbook."
				</p>

				<p className='story-paragraph'>
					"Remember," Commander advised, "the best incident is one that never happens. 
					But when it does, swift action saves the day."
				</p>

				<p className='story-paragraph'>
					Aria stood ready at the deployment console. "From development to production, 
					from monitoring to incident response - I'm ready for anything!"
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>Deployment Strategy Command</h3>
				
				<div style={{ 
					background: 'linear-gradient(135deg, rgba(231, 76, 60, 0.1), rgba(192, 57, 43, 0.1))', 
					padding: '20px', 
					borderRadius: '8px',
					marginBottom: '20px',
					border: '1px solid rgba(231, 76, 60, 0.3)',
					textAlign: 'center'
				}}>
					{battleReadiness === 100 ? (
						<div>
							<div style={{ fontSize: '1.5em', marginBottom: '10px' }}>
								⚔️ <strong style={{ color: '#e74c3c' }}>Production Admiral</strong> ⚔️
							</div>
							<p style={{ color: '#c0392b' }}>
								You've mastered production deployment! Ready to lead any mission.
							</p>
						</div>
					) : (
						<div>
							<p style={{ color: '#e74c3c' }}>
								Master deployment strategies to achieve Admiral rank!
							</p>
							<div style={{ marginTop: '10px' }}>
								<span style={{ color: '#7f8c8d' }}>Current Rank: </span>
								<span style={{ color: '#e74c3c', fontWeight: 'bold' }}>{commanderRank}</span>
							</div>
						</div>
					)}
				</div>

				<div className='strategy-board'>
					<h4>Deployment Strategies</h4>
					{deploymentStrategies.map((strategy) => (
						<div 
							key={strategy.id}
							className='strategy-card'
							onClick={() => selectStrategy(strategy.id)}
							style={{
								borderColor: deploymentStrategy === strategy.id ? '#e74c3c' : 'rgba(231, 76, 60, 0.2)'
							}}
						>
							<div className='strategy-header'>
								<div className='strategy-icon'>{strategy.icon}</div>
								<div>
									<div className='strategy-name'>{strategy.name}</div>
									<div style={{ fontSize: '0.9em', color: '#bdc3c7' }}>
										{strategy.description}
									</div>
								</div>
							</div>
							<div className='strategy-details'>
								<div style={{ marginBottom: '15px' }}>
									<strong>Steps:</strong>
									<ol style={{ marginLeft: '20px', marginTop: '5px' }}>
										{strategy.steps.map((step, i) => (
											<li key={i} style={{ fontSize: '0.9em', marginBottom: '3px' }}>{step}</li>
										))}
									</ol>
								</div>
								<div style={{ display: 'flex', gap: '30px' }}>
									<div>
										<strong style={{ color: '#27ae60' }}>Benefits:</strong>
										<ul style={{ marginLeft: '20px', marginTop: '5px' }}>
											{strategy.benefits.map((benefit, i) => (
												<li key={i} style={{ fontSize: '0.85em', color: '#27ae60' }}>{benefit}</li>
											))}
										</ul>
									</div>
									<div>
										<strong style={{ color: '#e74c3c' }}>Risks:</strong>
										<ul style={{ marginLeft: '20px', marginTop: '5px' }}>
											{strategy.risks.map((risk, i) => (
												<li key={i} style={{ fontSize: '0.85em', color: '#e74c3c' }}>{risk}</li>
											))}
										</ul>
									</div>
								</div>
							</div>
							{deploymentStrategy === strategy.id && (
								<div style={{ 
									marginTop: '15px', 
									textAlign: 'center',
									color: '#e74c3c',
									fontWeight: 'bold'
								}}>
									✓ Selected Strategy
								</div>
							)}
						</div>
					))}
				</div>

				<div className='alert-center'>
					<div className='alert-header'>
						<h4>🚨 Incident Response Center</h4>
						<div>
							Status: <strong style={{ 
								color: incidentResponse === 'active' ? '#e74c3c' : 
									   incidentResponse === 'resolved' ? '#27ae60' : '#3498db' 
							}}>
								{incidentResponse.toUpperCase()}
							</strong>
						</div>
					</div>
					
					<div style={{ marginBottom: '20px', textAlign: 'center' }}>
						<button
							onClick={runIncidentDrill}
							disabled={incidentResponse === 'active'}
							style={{
								padding: '10px 30px',
								background: '#e74c3c',
								color: 'white',
								border: 'none',
								borderRadius: '5px',
								cursor: incidentResponse === 'active' ? 'not-allowed' : 'pointer',
								fontSize: '1.1em',
								fontWeight: 'bold',
								opacity: incidentResponse === 'active' ? 0.7 : 1
							}}
						>
							{incidentResponse === 'active' ? 'Drill in Progress...' : 'Run Incident Drill'}
						</button>
						
						{deploymentStrategy && (
							<button
								onClick={performRollback}
								style={{
									marginLeft: '15px',
									padding: '10px 30px',
									background: '#f39c12',
									color: 'white',
									border: 'none',
									borderRadius: '5px',
									cursor: 'pointer',
									fontSize: '1.1em',
									fontWeight: 'bold'
								}}
							>
								Perform Rollback
							</button>
						)}
					</div>

					<div className='monitoring-grid'>
						{incidentPlaybook.map((phase, index) => (
							<div 
								key={index}
								className='monitoring-card'
								style={{ 
									borderColor: incidentResponse === 'active' && index === 0 ? '#e74c3c' : 
											   incidentResponse === 'resolved' ? '#27ae60' : 
											   'rgba(231, 76, 60, 0.3)'
								}}
							>
								<div className='monitoring-name'>{phase.phase}</div>
								<div style={{ fontSize: '0.9em', color: '#f39c12', marginBottom: '10px' }}>
									{phase.time}
								</div>
								<div className='monitoring-metrics'>
									<ul style={{ marginLeft: '20px' }}>
										{phase.actions.map((action, i) => (
											<li key={i} style={{ fontSize: '0.85em', marginBottom: '3px' }}>{action}</li>
										))}
									</ul>
								</div>
							</div>
						))}
					</div>

					{rollbackHistory.length > 0 && (
						<div style={{ marginTop: '20px' }}>
							<h5>Rollback History</h5>
							{rollbackHistory.map((rollback) => (
								<div key={rollback.id} style={{
									padding: '10px',
									margin: '5px 0',
									background: 'rgba(243, 156, 18, 0.1)',
									border: '1px solid rgba(243, 156, 18, 0.3)',
									borderRadius: '6px',
									fontSize: '0.9em'
								}}>
									<strong>{rollback.version}</strong> - {rollback.reason}
									<div style={{ fontSize: '0.85em', color: '#7f8c8d', marginTop: '3px' }}>
										{rollback.time} | Duration: {rollback.duration}
									</div>
								</div>
							))}
						</div>
					)}
				</div>

				<div className='readiness-checklist'>
					<h4>Production Excellence Checklist</h4>
					{productionChecklist.map((section, index) => (
						<div key={index} style={{ marginBottom: '20px' }}>
							<h5 style={{ color: '#e74c3c', marginBottom: '10px' }}>{section.category}</h5>
							<div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
								{section.items.map((item, i) => (
									<div key={i} style={{
										padding: '10px',
										background: 'rgba(0, 0, 0, 0.3)',
										border: '1px solid rgba(231, 76, 60, 0.2)',
										borderRadius: '6px',
										fontSize: '0.9em',
										display: 'flex',
										alignItems: 'center',
										gap: '10px'
									}}>
										<span style={{ color: '#27ae60' }}>✓</span>
										{item}
									</div>
								))}
							</div>
						</div>
					))}
				</div>
			</div>

			<div className='code-example'>
				<div className='scroll-header'>
					<span>Battle-Tested Production Configurations</span>
					<span className='discovered-by'>Commander's final teachings</span>
				</div>
				<pre>{`# Blue-Green Deployment with AWS
# Commander: "Two environments, zero downtime!"

# ALB Target Groups
resource "aws_lb_target_group" "blue" {
  name     = "app-blue"
  port     = 3000
  protocol = "HTTP"
  vpc_id   = aws_vpc.main.id
  
  health_check {
    enabled             = true
    healthy_threshold   = 2
    unhealthy_threshold = 2
    timeout             = 5
    interval            = 30
    path                = "/health"
  }
}

resource "aws_lb_target_group" "green" {
  name     = "app-green"
  port     = 3000
  protocol = "HTTP"
  vpc_id   = aws_vpc.main.id
  # Same health check configuration
}

# Traffic switching script
#!/bin/bash
CURRENT=$(aws elbv2 describe-listeners --listener-arn $LISTENER_ARN \
  --query 'Listeners[0].DefaultActions[0].TargetGroupArn' --output text)

if [[ $CURRENT == *"blue"* ]]; then
  TARGET=$GREEN_TG_ARN
  echo "Switching from BLUE to GREEN"
else
  TARGET=$BLUE_TG_ARN
  echo "Switching from GREEN to BLUE"
fi

aws elbv2 modify-listener --listener-arn $LISTENER_ARN \
  --default-actions Type=forward,TargetGroupArn=$TARGET

# Canary Deployment Configuration
# Binary: "1% → 10% → 50% → 100% = Safe rollout"

// Kubernetes Flagger configuration
apiVersion: flagger.app/v1beta1
kind: Canary
metadata:
  name: app-canary
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: app
  progressDeadlineSeconds: 60
  service:
    port: 80
  analysis:
    interval: 1m
    threshold: 5
    maxWeight: 50
    stepWeight: 10
    metrics:
    - name: request-success-rate
      thresholdRange:
        min: 99
      interval: 1m
    - name: request-duration
      thresholdRange:
        max: 500
      interval: 30s
    webhooks:
    - name: load-test
      url: http://flagger-loadtester.test/
      timeout: 5s
      metadata:
        cmd: "hey -z 1m -q 10 -c 2 http://app-canary.test/"

# Incident Response Automation
# Debuggora: "Automate the response, not the thinking!"

class IncidentResponder {
  async handleAlert(alert) {
    const incident = await this.createIncident(alert);
    
    // Auto-remediation for known issues
    if (this.canAutoRemediate(alert)) {
      await this.attemptAutoRemediation(alert);
    }
    
    // Notify on-call
    await this.notifyOnCall(incident);
    
    // Start recording
    await this.startIncidentRecording(incident);
    
    // Create war room
    if (alert.severity === 'critical') {
      await this.createWarRoom(incident);
    }
    
    return incident;
  }
  
  async attemptAutoRemediation(alert) {
    const strategies = {
      'high_memory': async () => {
        await this.scaleUp('memory');
        await this.restartUnhealthyPods();
      },
      'high_error_rate': async () => {
        await this.rollback();
        await this.enableCircuitBreaker();
      },
      'slow_response': async () => {
        await this.scaleUp('cpu');
        await this.clearCache();
      }
    };
    
    const strategy = strategies[alert.type];
    if (strategy) {
      await strategy();
    }
  }
}

# Production Readiness Score
# Aria: "Measure readiness, achieve excellence!"

const readinessScore = {
  monitoring: {
    weight: 25,
    checks: [
      'Error tracking configured',
      'APM enabled',
      'Custom metrics defined',
      'Alerts configured'
    ]
  },
  reliability: {
    weight: 25,
    checks: [
      'Health endpoints',
      'Graceful shutdown',
      'Circuit breakers',
      'Retry logic'
    ]
  },
  performance: {
    weight: 25,
    checks: [
      'Load tested',
      'Caching strategy',
      'Database indexes',
      'CDN configured'
    ]
  },
  security: {
    weight: 25,
    checks: [
      'Security headers',
      'HTTPS only',
      'Secrets management',
      'Dependency scanning'
    ]
  }
};

// Calculate and enforce minimum score
const calculateReadiness = () => {
  let totalScore = 0;
  
  Object.entries(readinessScore).forEach(([category, config]) => {
    const passed = config.checks.filter(check => 
      checkPassed(check)
    ).length;
    const categoryScore = (passed / config.checks.length) * config.weight;
    totalScore += categoryScore;
  });
  
  if (totalScore < 80) {
    throw new Error(\`Production readiness score too low: \${totalScore}/100\`);
  }
  
  return totalScore;
};`}</pre>
			</div>

			<div className='lesson-insight'>
				<h3>The Final Lesson:</h3>
				<p>
					Battle-tested strategies transform deployments from risky events into 
					routine operations. Commander Deployment's final wisdom reveals that 
					production excellence comes from preparation, automation, and swift response. 
					Blue-green deployments eliminate downtime, canary releases minimize risk, 
					automated incident response saves precious minutes, and readiness scores 
					ensure nothing is forgotten. The journey from code to production ends not 
					with deployment, but with the confidence that your application can weather 
					any storm.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					How do deployment strategies and incident response plans work together to 
					ensure production reliability?
				</p>
				<p>
					What makes the difference between a good deployment and a great one in 
					production environments?
				</p>
			</div>
		</div>
	);
};

export default ChapterThree;