import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import CodeExample from '../../../../../components/content/CodeExample';
import InstructionBox from '../../../../../components/content/InstructionBox';

const ChapterThree = () => {
	const [activeStrategy, setActiveStrategy] = useState(null);
	const [featureFlags, setFeatureFlags] = useState({
		newUI: false,
		betaFeature: false,
		experimentalAPI: false
	});
	const [deploymentMetrics, setDeploymentMetrics] = useState({
		frequency: 0,
		leadTime: '2 days',
		mttr: '30 min',
		changeFailRate: '5%'
	});
	const { createFlow, automationLevel } = useOutletContext();

	const deploymentStrategies = [
		{
			id: 'blue-green',
			name: 'Blue-Green Deployment',
			icon: '🔵🟢',
			description: 'Switch between two identical environments',
			benefits: ['Zero downtime', 'Easy rollback', 'Production testing'],
			diagram: ['Blue (Live)', '→', 'Green (New)', '→', 'Switch']
		},
		{
			id: 'canary',
			name: 'Canary Release',
			icon: '🐤',
			description: 'Gradually roll out to subset of users',
			benefits: ['Risk mitigation', 'Real user feedback', 'Gradual rollout'],
			diagram: ['5% users', '→', '25% users', '→', '100% users']
		},
		{
			id: 'rolling',
			name: 'Rolling Deployment',
			icon: '🎲',
			description: 'Update instances one at a time',
			benefits: ['Resource efficient', 'No downtime', 'Gradual update'],
			diagram: ['Instance 1', '→', 'Instance 2', '→', 'Instance N']
		},
		{
			id: 'feature-flags',
			name: 'Feature Flags',
			icon: '🚩',
			description: 'Deploy code but control feature activation',
			benefits: ['Decouple deploy from release', 'A/B testing', 'Quick disable'],
			diagram: ['Deploy', '→', 'Flag Off', '→', 'Flag On']
		}
	];

	const advancedPatterns = [
		{
			name: 'Progressive Delivery',
			description: 'Combine multiple strategies for maximum control',
			icon: '📈'
		},
		{
			name: 'GitOps',
			description: 'Git as single source of truth for deployments',
			icon: '🔀'
		},
		{
			name: 'Chaos Engineering',
			description: 'Test resilience by introducing failures',
			icon: '🌪️'
		}
	];

	const toggleFeatureFlag = (flag) => {
		setFeatureFlags(prev => ({
			...prev,
			[flag]: !prev[flag]
		}));
	};

	const selectStrategy = (strategy) => {
		setActiveStrategy(strategy);
		createFlow({
			id: Date.now(),
			name: `${strategy.name} Implementation`,
			type: 'deployment-strategy'
		});
		
		// Update metrics to show improvement
		setDeploymentMetrics(prev => ({
			...prev,
			frequency: prev.frequency + 1,
			leadTime: '1 day',
			mttr: '15 min',
			changeFailRate: '2%'
		}));
	};

	return (
		<div className='chapter'>
			<ChapterIntro
				chapterNumber={3}
				title={`The Continuous Fleet`}
				bridge={`Aria's pipeline had grown sophisticated - parallel tests, conditional deployments, automatic rollbacks. "It's like having a crew that never sleeps!" she marveled. Captain Pipeline smiled. "Now let's master the advanced strategies."`}
			/>

			<div className='story-section'>
				<p className='story-paragraph'>
					Captain Pipeline nodded approvingly. "And with feature flags, you can deploy 
					continuously while controlling feature release. Decouple deployment from release!"
				</p>

				<p className='story-paragraph'>
					Binary monitored the metrics. "Deployment frequency increased 10x! Lead time 
					reduced to hours! Mean time to recovery under 30 minutes!"
				</p>

				<p className='story-paragraph'>
					Debuggora tracked the canary deployments. "We can test in production safely, 
					catching issues before they affect all users."
				</p>

				<p className='story-paragraph'>
					"The ultimate goal," Captain Pipeline declared, "is continuous value delivery. 
					Every commit that passes the pipeline should be production-ready."
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>Advanced Deployment Strategies</h3>
				
				<InstructionBox character={`Captain Pipeline unveils the Fleet Admiral's strategy board.`}>
					"Select deployment strategies to see how they work. Toggle feature flags to control feature releases independently of deployments. Watch your DORA metrics improve as you master each strategy!"
				</InstructionBox>
				
				<div style={{ 
					background: 'linear-gradient(135deg, rgba(46, 204, 113, 0.1), rgba(39, 174, 96, 0.1))', 
					padding: '20px', 
					borderRadius: '8px',
					marginBottom: '20px',
					border: '1px solid rgba(46, 204, 113, 0.3)',
					textAlign: 'center'
				}}>
					{automationLevel >= 80 ? (
						<div>
							<div style={{ fontSize: '1.5em', marginBottom: '10px' }}>
								🚢 <strong style={{ color: '#27ae60' }}>Fleet Admiral Status</strong> 🚢
							</div>
							<p style={{ color: '#27ae60' }}>
								You've mastered continuous deployment! Deploy with confidence using advanced strategies.
							</p>
						</div>
					) : (
						<div>
							<p style={{ color: '#27ae60' }}>
								Master deployment strategies to achieve Fleet Admiral status!
							</p>
							<div style={{ marginTop: '10px' }}>
								<span style={{ color: '#7f8c8d' }}>Automation Level: </span>
								<span style={{ color: '#27ae60', fontWeight: 'bold' }}>{automationLevel}%</span>
							</div>
						</div>
					)}
				</div>

				<div className='deployment-strategies'>
					{deploymentStrategies.map((strategy) => (
						<div 
							key={strategy.id}
							className={`strategy-card ${activeStrategy?.id === strategy.id ? 'active' : ''}`}
							onClick={() => selectStrategy(strategy)}
						>
							<div className='strategy-icon'>{strategy.icon}</div>
							<div className='strategy-name'>{strategy.name}</div>
							<p style={{ fontSize: '0.9em', margin: '10px 0' }}>{strategy.description}</p>
							
							<div style={{ fontSize: '0.85em', marginBottom: '10px' }}>
								<strong>Benefits:</strong>
								<ul style={{ marginLeft: '20px', marginTop: '5px' }}>
									{strategy.benefits.map((benefit, i) => (
										<li key={i}>{benefit}</li>
									))}
								</ul>
							</div>
							
							<div style={{ 
								background: 'rgba(0, 0, 0, 0.2)', 
								padding: '10px', 
								borderRadius: '5px',
								fontSize: '0.85em'
							}}>
								{strategy.diagram.join(' ')}
							</div>
						</div>
					))}
				</div>

				<div className='feature-flags'>
					<h4>Feature Flag Control Panel</h4>
					<p style={{ marginBottom: '15px', color: '#bdc3c7' }}>
						Deploy code with flags off, then enable features when ready
					</p>
					{Object.entries(featureFlags).map(([flag, enabled]) => (
						<div key={flag} className='flag-item'>
							<div className='flag-name'>{flag}</div>
							<div 
								className={`flag-toggle ${enabled ? 'active' : ''}`}
								onClick={() => toggleFeatureFlag(flag)}
							>
								{enabled ? 'ON' : 'OFF'}
							</div>
						</div>
					))}
				</div>

				<div className='automation-metrics'>
					<h4>Deployment Metrics (DORA)</h4>
					<div className='metric-card'>
						<div className='metric-value'>{deploymentMetrics.frequency}</div>
						<div className='metric-label'>Deployment Frequency</div>
					</div>
					<div className='metric-card'>
						<div className='metric-value'>{deploymentMetrics.leadTime}</div>
						<div className='metric-label'>Lead Time</div>
					</div>
					<div className='metric-card'>
						<div className='metric-value'>{deploymentMetrics.mttr}</div>
						<div className='metric-label'>MTTR</div>
					</div>
					<div className='metric-card'>
						<div className='metric-value'>{deploymentMetrics.changeFailRate}</div>
						<div className='metric-label'>Change Fail Rate</div>
					</div>
				</div>

				<div style={{ marginTop: '30px' }}>
					<h4>Advanced Patterns</h4>
					<div className='automation-tools'>
						{advancedPatterns.map((pattern) => (
							<div key={pattern.name} className='automation-tool'>
								<div className='tool-header'>
									<span className='tool-icon'>{pattern.icon}</span>
									<div className='tool-name'>{pattern.name}</div>
								</div>
								<p>{pattern.description}</p>
							</div>
						))}
					</div>
				</div>
			</div>

			<CodeExample
				title="Advanced Deployment Patterns"
				discoveredBy="Captain Pipeline's master strategies"
				code={`# Blue-Green Deployment with GitHub Actions
# Captain: "Two environments, zero downtime!"

name: Blue-Green Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      # Build application
      - name: Build
        run: |
          npm ci
          npm run build
      
      # Deploy to Green environment
      - name: Deploy to Green
        run: |
          aws s3 sync build/ s3://green-env-bucket
          aws cloudfront create-invalidation --distribution-id $GREEN_DIST
      
      # Health check
      - name: Health Check Green
        run: |
          for i in {1..10}; do
            if curl -f https://green.example.com/health; then
              echo "Green environment healthy"
              break
            fi
            sleep 30
          done
      
      # Switch traffic
      - name: Switch to Green
        run: |
          aws route53 change-resource-record-sets \\
            --hosted-zone-id $ZONE_ID \\
            --change-batch file://switch-to-green.json
      
      # Verify switch
      - name: Verify Production
        run: curl -f https://example.com/health

# Feature Flag Implementation
# Aria: "Deploy anytime, release when ready!"

import { useFeatureFlag } from './feature-flags';

function App() {
  const newUIEnabled = useFeatureFlag('new-ui');
  const betaFeature = useFeatureFlag('beta-feature');
  
  return (
    <div>
      {newUIEnabled ? <NewUI /> : <LegacyUI />}
      {betaFeature && <BetaFeature />}
    </div>
  );
}

// Canary Deployment Configuration
# Binary: "5% traffic → monitor → 25% → monitor → 100%"
apiVersion: v1
kind: Service
metadata:
  name: my-app
spec:
  selector:
    app: my-app
  ports:
    - port: 80
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app-canary
spec:
  replicas: 1  # Start with 1 replica (5% of traffic)
  selector:
    matchLabels:
      app: my-app
      version: canary`}
			/>

			<ChapterSummary
				lessonInsight={{
					title: `The Continuous Fleet Lesson:`,
					content: `Advanced deployment strategies transform releases from risky events into routine operations. Captain Pipeline's mastery teaches that continuous deployment isn't just about frequency - it's about safety, control, and confidence. Blue-green deployments eliminate downtime, canary releases minimize risk, and feature flags decouple deployment from release. The goal is to make deployments so safe and routine that they become boring.`
				}}
				reflectionQuestions={[
					`How do advanced deployment strategies change the relationship between development teams and production environments?`,
					`What role do metrics play in building confidence in continuous deployment?`
				]}
				journalEntry={{
					title: `Aria's Journal - Day 34 (Evening)`,
					content: `I've achieved Fleet Admiral status at the Automation Harbor! Captain Pipeline taught me four advanced deployment strategies: Blue-Green (zero downtime switching), Canary (gradual rollout to users), Rolling (updating instances one by one), and Feature Flags (decoupling deploy from release). I also explored Progressive Delivery, GitOps, and Chaos Engineering! Binary tracked our DORA metrics improving - deployment frequency up 10x, lead time reduced to hours, MTTR under 30 minutes. Captain Pipeline's final wisdom: "The goal is to make deployments so safe and routine that they become boring." Continuous value delivery achieved!`
				}}
				chapterEnding={[
					`As Aria mastered the final deployment strategy, Captain Pipeline saluted. "Fleet Admiral Aria, you've learned to automate the entire journey from code to production."`,
					`Binary computed the achievement metrics. "Deployment frequency: excellent. Lead time: optimal. Change fail rate: minimal. You've mastered CI/CD!"`,
					`"But automated pipelines need a destination," Captain Pipeline said, pointing toward the horizon. "The Hosting Horizons await - where Harbor Master Domain will teach you where your code actually lives and serves users..."`
				]}
			/>
		</div>
	);
};

export default ChapterThree;