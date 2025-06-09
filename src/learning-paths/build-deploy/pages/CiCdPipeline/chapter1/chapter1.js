import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const ChapterOne = () => {
	const [activeStage, setActiveStage] = useState(null);
	const [pipelineRunning, setPipelineRunning] = useState(false);
	const { createFlow, automatedFlows, automationLevel } = useOutletContext();

	const pipelineStages = [
		{ 
			id: 'source', 
			icon: '📁', 
			name: 'Source Control',
			description: 'Code pushed to repository',
			status: 'waiting'
		},
		{ 
			id: 'build', 
			icon: '🔨', 
			name: 'Build Stage',
			description: 'Compile and bundle code',
			status: 'waiting'
		},
		{ 
			id: 'test', 
			icon: '🧪', 
			name: 'Test Stage',
			description: 'Run automated tests',
			status: 'waiting'
		},
		{ 
			id: 'deploy', 
			icon: '🚀', 
			name: 'Deploy Stage',
			description: 'Deploy to production',
			status: 'waiting'
		}
	];

	const ciConcepts = [
		{
			name: 'Continuous Integration',
			icon: '🔄',
			description: 'Merge code frequently with automated builds',
			benefits: ['Early bug detection', 'Reduced integration issues', 'Faster feedback']
		},
		{
			name: 'Continuous Delivery',
			icon: '📦',
			description: 'Keep code in deployable state always',
			benefits: ['Reliable releases', 'Reduced deployment risk', 'Faster time to market']
		},
		{
			name: 'Continuous Deployment',
			icon: '🚀',
			description: 'Automatically deploy every change to production',
			benefits: ['Immediate user value', 'Rapid iteration', 'No manual bottlenecks']
		}
	];

	const runPipeline = () => {
		setPipelineRunning(true);
		let stageIndex = 0;
		
		const runNextStage = () => {
			if (stageIndex < pipelineStages.length) {
				setActiveStage(pipelineStages[stageIndex].id);
				setTimeout(() => {
					stageIndex++;
					runNextStage();
				}, 1500);
			} else {
				setPipelineRunning(false);
				setActiveStage(null);
				createFlow({
					id: Date.now(),
					name: 'Basic Pipeline',
					stages: pipelineStages.length,
					status: 'success'
				});
			}
		};
		
		runNextStage();
	};

	return (
		<div className='chapter'>
			<h2 className='chapter-title'>
				Chapter 1: The Automation Harbor
			</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					<strong>Captain Pipeline</strong> commanded the Automation Harbor with precision. 
					"Manual deployment is like rowing across the ocean. CI/CD is like having favorable 
					winds that never stop."
				</p>
				
				<p className='story-paragraph'>
					The harbor hummed with automated activity. Code arrived, tests ran, builds completed, 
					deployments launched - all without human intervention. Aria watched in amazement as 
					ships sailed themselves.
				</p>

				<p className='story-paragraph'>
					"It's like the Testing Tower, but automated!" Aria exclaimed, watching quality gates 
					activate automatically as code flowed through.
				</p>

				<p className='story-paragraph'>
					Binary calculated the efficiency. "Processing time reduced by 92.7%! Human error 
					eliminated! Deployment frequency increased exponentially!"
				</p>

				<p className='story-paragraph'>
					Debuggora studied the pipeline flows. "Every stage leaves a trace. If something fails, 
					we know exactly where and why."
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>CI/CD Fundamentals</h3>
				
				<div style={{ 
					background: 'rgba(46, 204, 113, 0.1)', 
					padding: '15px', 
					borderRadius: '8px',
					marginBottom: '20px',
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center'
				}}>
					<div style={{ display: 'flex', gap: '30px' }}>
						<div>
							<span style={{ color: '#7f8c8d', fontSize: '0.9em' }}>Automation Level: </span>
							<span style={{ color: '#27ae60', fontWeight: 'bold' }}>{automationLevel}%</span>
						</div>
						<div>
							<span style={{ color: '#7f8c8d', fontSize: '0.9em' }}>Flows Created: </span>
							<span style={{ color: '#27ae60', fontWeight: 'bold' }}>{automatedFlows.length}</span>
						</div>
					</div>
					{!pipelineRunning && (
						<button 
							onClick={runPipeline}
							style={{
								padding: '8px 16px',
								background: '#27ae60',
								color: 'white',
								border: 'none',
								borderRadius: '5px',
								cursor: 'pointer',
								fontWeight: 'bold'
							}}
						>
							Run Pipeline Demo
						</button>
					)}
				</div>

				<div className='pipeline-visualization'>
					<h4>Pipeline Flow Visualization</h4>
					<div className='pipeline-flow'>
						{pipelineStages.map((stage, index) => (
							<>
								<div 
									key={stage.id}
									className={`pipeline-stage ${activeStage === stage.id ? 'active' : ''} ${
										pipelineRunning && pipelineStages.findIndex(s => s.id === activeStage) > index ? 'success' : ''
									}`}
								>
									<div className='stage-icon'>{stage.icon}</div>
									<div className='stage-name'>{stage.name}</div>
									<div className='stage-status'>{stage.description}</div>
								</div>
								{index < pipelineStages.length - 1 && (
									<div className='pipeline-arrow'>→</div>
								)}
							</>
						))}
					</div>
				</div>

				<div className='automation-tools'>
					{ciConcepts.map((concept) => (
						<div key={concept.name} className='automation-tool'>
							<div className='tool-header'>
								<span className='tool-icon'>{concept.icon}</span>
								<div className='tool-name'>{concept.name}</div>
							</div>
							<p style={{ marginBottom: '15px' }}>{concept.description}</p>
							<div style={{ fontSize: '0.9em' }}>
								<strong>Benefits:</strong>
								<ul style={{ marginLeft: '20px', marginTop: '5px' }}>
									{concept.benefits.map((benefit, i) => (
										<li key={i} style={{ color: '#bdc3c7' }}>{benefit}</li>
									))}
								</ul>
							</div>
						</div>
					))}
				</div>
			</div>

			<div className='code-example'>
				<div className='scroll-header'>
					<span>Captain Pipeline's Automation Manual</span>
					<span className='discovered-by'>Essential CI/CD configuration</span>
				</div>
				<pre>{`# GitHub Actions Workflow
# Captain Pipeline: "Every push triggers the automation!"
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    
    steps:
    # Source Control - Check out code
    - uses: actions/checkout@v3
    
    # Setup - Install Node.js
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    # Dependencies - Install packages
    - name: Install dependencies
      run: npm ci
    
    # Lint - Check code quality
    - name: Run ESLint
      run: npm run lint
    
    # Test - Run automated tests
    - name: Run tests
      run: npm test -- --coverage --watchAll=false
    
    # Build - Create production bundle
    - name: Build application
      run: npm run build
    
    # Deploy - Upload artifacts
    - name: Upload build artifacts
      uses: actions/upload-artifact@v3
      with:
        name: build-files
        path: build/

# Aria's notes: "Each step runs automatically! 
# If any step fails, the pipeline stops and alerts us!"`}</pre>
			</div>

			<div className='lesson-insight'>
				<h3>The Automation Lesson:</h3>
				<p>
					CI/CD transforms deployment from a manual, error-prone process into an automated, 
					reliable flow. Captain Pipeline teaches that automation isn't just about speed - 
					it's about consistency, reliability, and confidence. Every code change follows 
					the same path, undergoes the same checks, and deploys the same way, eliminating 
					human error and enabling rapid iteration.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					How does automation change the way teams approach deployment and releases?
				</p>
				<p>
					What are the key benefits of having every code change go through the same automated pipeline?
				</p>
			</div>
		</div>
	);
};

export default ChapterOne;