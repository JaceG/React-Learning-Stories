import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import CodeExample from '../../../../../components/content/CodeExample';
import InstructionBox from '../../../../../components/content/InstructionBox';

const ChapterTwo = () => {
	const [selectedTool, setSelectedTool] = useState(null);
	const [pipelineStages, setPipelineStages] = useState([]);
	const { createFlow, automationLevel, setAutomationLevel } = useOutletContext();

	const ciTools = [
		{
			id: 'github-actions',
			name: 'GitHub Actions',
			icon: '🐙',
			description: 'Native GitHub CI/CD with YAML workflows',
			features: ['Free for public repos', 'Matrix builds', 'Marketplace actions'],
			difficulty: 'Beginner'
		},
		{
			id: 'gitlab-ci',
			name: 'GitLab CI',
			icon: '🦊',
			description: 'Integrated CI/CD with .gitlab-ci.yml',
			features: ['Built-in container registry', 'Auto DevOps', 'Review apps'],
			difficulty: 'Intermediate'
		},
		{
			id: 'jenkins',
			name: 'Jenkins',
			icon: '🎩',
			description: 'Extensible automation server',
			features: ['Plugin ecosystem', 'Pipeline as code', 'Distributed builds'],
			difficulty: 'Advanced'
		},
		{
			id: 'circleci',
			name: 'CircleCI',
			icon: '⭕',
			description: 'Cloud-native CI/CD platform',
			features: ['Docker support', 'Parallelism', 'Orbs marketplace'],
			difficulty: 'Intermediate'
		}
	];

	const pipelineComponents = [
		{ id: 'lint', name: 'Linting', icon: '🔍', time: '30s' },
		{ id: 'unit-test', name: 'Unit Tests', icon: '🧪', time: '2m' },
		{ id: 'integration-test', name: 'Integration Tests', icon: '🔗', time: '5m' },
		{ id: 'build', name: 'Build', icon: '📦', time: '3m' },
		{ id: 'deploy-staging', name: 'Deploy Staging', icon: '🏗️', time: '2m' },
		{ id: 'e2e-test', name: 'E2E Tests', icon: '🎯', time: '10m' },
		{ id: 'deploy-prod', name: 'Deploy Production', icon: '🚀', time: '5m' }
	];

	const addPipelineStage = (component) => {
		if (!pipelineStages.find(s => s.id === component.id)) {
			setPipelineStages([...pipelineStages, component]);
			setAutomationLevel(prev => Math.min(100, prev + 15));
		}
	};

	const removePipelineStage = (componentId) => {
		setPipelineStages(pipelineStages.filter(s => s.id !== componentId));
	};

	const savePipeline = () => {
		if (pipelineStages.length > 0) {
			createFlow({
				id: Date.now(),
				name: 'Custom Pipeline',
				stages: pipelineStages,
				tool: selectedTool?.name || 'Custom'
			});
		}
	};

	return (
		<div className='chapter'>
			<ChapterIntro
				chapterNumber={2}
				title={`The Pipeline Workshop`}
				bridge={`Captain Pipeline showed Aria the pipeline workshop, where automated workflows were crafted like precision instruments. "Each pipeline is a series of gates. Code must pass through each one to reach production."`}
			/>

			<div className='story-section'>
				<p className='story-paragraph'>
					Aria studied the various tools and configurations. "Lint, test, build, deploy - 
					like the quality checkpoints in our kingdom!"
				</p>

				<p className='story-paragraph'>
					Binary calculated efficiency gains. "Automation reduces deployment time by 95%! 
					Manual processes that took hours now complete in minutes!"
				</p>

				<p className='story-paragraph'>
					Debuggora examined the test results flowing through. "Every failure is caught 
					immediately. No more 'works on my machine' mysteries!"
				</p>

				<p className='story-paragraph'>
					"Choose your tools wisely," Captain Pipeline advised. "Each has strengths. The 
					best pipeline is one your team will actually use."
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>Pipeline Builder Workshop</h3>
				
				<InstructionBox character={`Captain Pipeline opens the workshop blueprint station.`}>
					"Choose a CI/CD tool, then build your own pipeline by selecting components. Watch how different configurations affect your automation level and pipeline time!"
				</InstructionBox>
				
				<div style={{ 
					background: 'rgba(46, 204, 113, 0.1)', 
					padding: '15px', 
					borderRadius: '8px',
					marginBottom: '20px',
					textAlign: 'center'
				}}>
					<p style={{ color: '#27ae60', marginBottom: '10px' }}>
						Build your custom pipeline by selecting components below!
					</p>
					<div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
						<div>
							<span style={{ color: '#7f8c8d' }}>Pipeline Stages: </span>
							<span style={{ color: '#27ae60', fontWeight: 'bold' }}>{pipelineStages.length}</span>
						</div>
						<div>
							<span style={{ color: '#7f8c8d' }}>Total Time: </span>
							<span style={{ color: '#27ae60', fontWeight: 'bold' }}>
								{pipelineStages.reduce((sum, s) => {
									const time = parseInt(s.time);
									const unit = s.time.includes('m') ? 60 : 1;
									return sum + (time * unit);
								}, 0)}s
							</span>
						</div>
					</div>
				</div>

				<div className='automation-tools'>
					<h4>Choose Your CI/CD Tool</h4>
					<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px', marginBottom: '30px' }}>
						{ciTools.map((tool) => (
							<div 
								key={tool.id}
								className={`automation-tool ${selectedTool?.id === tool.id ? 'selected' : ''}`}
								onClick={() => setSelectedTool(tool)}
							>
								<div className='tool-header'>
									<span className='tool-icon'>{tool.icon}</span>
									<div className='tool-name'>{tool.name}</div>
								</div>
								<p style={{ fontSize: '0.9em', marginBottom: '10px' }}>{tool.description}</p>
								<div style={{ fontSize: '0.85em' }}>
									{tool.features.map((feature, i) => (
										<div key={i} style={{ color: '#bdc3c7' }}>• {feature}</div>
									))}
								</div>
								<div style={{ 
									marginTop: '10px', 
									padding: '5px 10px', 
									background: tool.difficulty === 'Beginner' ? 'rgba(46, 204, 113, 0.2)' : 
											   tool.difficulty === 'Intermediate' ? 'rgba(241, 196, 15, 0.2)' : 
											   'rgba(231, 76, 60, 0.2)',
									borderRadius: '15px',
									display: 'inline-block',
									fontSize: '0.85em'
								}}>
									{tool.difficulty}
								</div>
							</div>
						))}
					</div>
				</div>

				<div className='pipeline-config'>
					<h4>Build Your Pipeline</h4>
					<div style={{ marginBottom: '20px' }}>
						<h5>Available Components:</h5>
						<div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
							{pipelineComponents.map((component) => (
								<button
									key={component.id}
									onClick={() => addPipelineStage(component)}
									style={{
										padding: '10px 15px',
										background: pipelineStages.find(s => s.id === component.id) ? '#27ae60' : 'rgba(46, 204, 113, 0.2)',
										color: pipelineStages.find(s => s.id === component.id) ? 'white' : '#27ae60',
										border: '1px solid #27ae60',
										borderRadius: '5px',
										cursor: 'pointer',
										display: 'flex',
										alignItems: 'center',
										gap: '5px'
									}}
									disabled={pipelineStages.find(s => s.id === component.id)}
								>
									<span>{component.icon}</span>
									<span>{component.name}</span>
									<span style={{ fontSize: '0.85em', opacity: 0.7 }}>({component.time})</span>
								</button>
							))}
						</div>
					</div>

					{pipelineStages.length > 0 && (
						<div>
							<h5>Your Pipeline:</h5>
							<div className='pipeline-flow'>
								{pipelineStages.map((stage, index) => (
									<>
										<div key={stage.id} className='pipeline-stage' style={{ position: 'relative' }}>
											<button
												onClick={() => removePipelineStage(stage.id)}
												style={{
													position: 'absolute',
													top: '-10px',
													right: '-10px',
													background: '#e74c3c',
													color: 'white',
													border: 'none',
													borderRadius: '50%',
													width: '25px',
													height: '25px',
													cursor: 'pointer',
													fontSize: '12px'
												}}
											>
												✕
											</button>
											<div className='stage-icon'>{stage.icon}</div>
											<div className='stage-name'>{stage.name}</div>
											<div className='stage-status'>{stage.time}</div>
										</div>
										{index < pipelineStages.length - 1 && (
											<div className='pipeline-arrow'>→</div>
										)}
									</>
								))}
							</div>
							<button
								onClick={savePipeline}
								style={{
									marginTop: '20px',
									padding: '10px 20px',
									background: '#27ae60',
									color: 'white',
									border: 'none',
									borderRadius: '5px',
									cursor: 'pointer',
									fontWeight: 'bold',
									display: 'block',
									margin: '20px auto 0'
								}}
							>
								Save Pipeline Configuration
							</button>
						</div>
					)}
				</div>
			</div>

			<CodeExample
				title="Advanced Pipeline Configuration"
				discoveredBy="Captain Pipeline's workshop blueprints"
				code={`# GitLab CI Configuration
# Captain: "Stages ensure order, jobs enable parallelism!"

stages:
  - lint
  - test
  - build
  - deploy

variables:
  NODE_VERSION: "18"

# Lint Stage
lint:
  stage: lint
  image: node:$NODE_VERSION
  script:
    - npm ci --cache .npm --prefer-offline
    - npm run lint
  cache:
    key: $CI_COMMIT_REF_SLUG
    paths:
      - .npm/

# Test Stage - Parallel Jobs
test:unit:
  stage: test
  image: node:$NODE_VERSION
  script:
    - npm ci --cache .npm --prefer-offline
    - npm run test:unit
  coverage: '/Lines\\s*:\\s*(\\d+\\.\\d+)%/'

test:integration:
  stage: test
  image: node:$NODE_VERSION
  services:
    - postgres:14
  script:
    - npm ci --cache .npm --prefer-offline
    - npm run test:integration

# Build Stage
build:
  stage: build
  image: node:$NODE_VERSION
  script:
    - npm ci --cache .npm --prefer-offline
    - npm run build
  artifacts:
    paths:
      - build/
    expire_in: 1 week

# Deploy Stages
deploy:staging:
  stage: deploy
  script:
    - npm run deploy:staging
  environment:
    name: staging
    url: https://staging.example.com
  only:
    - develop

deploy:production:
  stage: deploy
  script:
    - npm run deploy:production
  environment:
    name: production
    url: https://example.com
  when: manual
  only:
    - main

# Binary: "Parallel test execution reduces pipeline time by 67.3%!"
# Debuggora: "Each stage's logs are preserved for debugging!"`}
			/>

			<ChapterSummary
				lessonInsight={{
					title: `The Pipeline Workshop Lesson:`,
					content: `Building effective pipelines is about balance - comprehensive testing without sacrificing speed, automation without losing flexibility. Captain Pipeline's workshop teaches that the best pipeline is one that catches issues early, provides fast feedback, and gives teams confidence to deploy frequently. Start simple, iterate based on needs, and always prioritize developer experience.`
				}}
				reflectionQuestions={[
					`How does building a custom pipeline help teams understand their deployment process?`,
					`What factors should teams consider when choosing between different CI/CD tools?`
				]}
				journalEntry={{
					title: `Aria's Journal - Day 34 (Afternoon)`,
					content: `Captain Pipeline took me to the workshop where automated workflows are crafted like precision instruments! I explored four CI/CD tools: GitHub Actions (beginner-friendly), GitLab CI (integrated DevOps), Jenkins (plugin ecosystem), and CircleCI (cloud-native). Then I built my own pipeline - linting, unit tests, integration tests, build, staging deployment, E2E tests, and production deployment! Binary calculated that automation reduces deployment time by 95%! Debuggora noted that every failure is caught immediately - no more "works on my machine" mysteries. The Captain's advice: "The best pipeline is one your team will actually use."`
				}}
			/>
		</div>
	);
};

export default ChapterTwo;