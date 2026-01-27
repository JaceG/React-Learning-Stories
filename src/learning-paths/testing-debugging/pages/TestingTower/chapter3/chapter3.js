import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import CodeExample from '../../../../../components/content/CodeExample';
import StorySection from '../../../../../components/content/StorySection';

const ChapterThree = () => {
	const {
		runTest,
		testResults,
		bugsCaught,
		testCoverage,
		updateCoverage
	} = useOutletContext();

	const [automationActive, setAutomationActive] = useState(false);
	const [ciPipeline, setCiPipeline] = useState({
		build: 'pending',
		test: 'pending',
		coverage: 'pending',
		deploy: 'pending'
	});
	const [guardianTests, setGuardianTests] = useState([]);

	// Simulate automated test execution
	useEffect(() => {
		if (automationActive) {
			const stages = ['build', 'test', 'coverage', 'deploy'];
			let currentStage = 0;

			const interval = setInterval(() => {
				if (currentStage < stages.length) {
					setCiPipeline(prev => ({
						...prev,
						[stages[currentStage]]: 'running'
					}));

					setTimeout(() => {
						setCiPipeline(prev => ({
							...prev,
							[stages[currentStage]]: 'success'
						}));
						
						if (stages[currentStage] === 'test') {
							runTest('Automated Test Suite');
							setGuardianTests([
								{ name: 'Unit Tests', count: 245, status: 'pass' },
								{ name: 'Integration Tests', count: 67, status: 'pass' },
								{ name: 'E2E Tests', count: 12, status: 'pass' }
							]);
						}
						
						currentStage++;
					}, 1500);
				} else {
					clearInterval(interval);
				}
			}, 2000);

			return () => clearInterval(interval);
		}
	}, [automationActive, runTest]);

	const activateAutomation = () => {
		setAutomationActive(true);
		updateCoverage('Entire Kingdom');
	};

	const pipelineStages = [
		{ id: 'build', name: 'Build', icon: '🔨' },
		{ id: 'test', name: 'Test', icon: '🧪' },
		{ id: 'coverage', name: 'Coverage', icon: '📊' },
		{ id: 'deploy', name: 'Deploy', icon: '🚀' }
	];

	return (
		<div className='chapter'>
			<ChapterIntro
				chapterNumber={3}
				title={`The Automated Guardians`}
				bridge={`"Individual tests are powerful," Jasmine explained as they climbed to the tower's highest chamber, "but automated test suites are an army." The chamber contained a massive crystalline structure - the Continuous Integration Engine that runs every test automatically whenever code changes.`}
			/>

			<StorySection
				paragraphs={[
					`"Individual tests are powerful," Jasmine explained as they climbed to the tower's highest chamber, "but automated test suites are an army."`,
					`The chamber contained a massive crystalline structure - the Continuous Integration Engine. "This device," Jasmine gestured proudly, "runs every test automatically whenever code changes. No bug can slip through unnoticed."`,
					`Aria watched in amazement as phantom test runners materialized, each one executing hundreds of tests in seconds. "They never tire, never miss a test, and guard the kingdom day and night."`,
					`Together, they configured the automated testing system. With each setting, more guardian tests awakened, forming an impenetrable defense network around the kingdom's code.`
				]}
			/>

			<div className='interactive-section'>
				<h3 className='section-title'>The Continuous Integration Engine</h3>
				
				<div className='ci-engine'>
					<h4>Automation Control Panel</h4>
					
					{!automationActive ? (
						<div className='automation-starter'>
							<p>Activate the automated testing guardians to protect your code 24/7</p>
							<button 
								className='test-button success'
								onClick={activateAutomation}>
								Activate CI/CD Pipeline
							</button>
						</div>
					) : (
						<div className='pipeline-visualization'>
							<div className='pipeline-stages'>
								{pipelineStages.map((stage, index) => (
									<div key={stage.id} className='pipeline-stage'>
										<div className={`stage-node ${ciPipeline[stage.id]}`}>
											<span className='stage-icon'>{stage.icon}</span>
											<span className='stage-name'>{stage.name}</span>
											{ciPipeline[stage.id] === 'running' && (
												<div className='loading-spinner'></div>
											)}
											{ciPipeline[stage.id] === 'success' && (
												<span className='stage-check'>✓</span>
											)}
										</div>
										{index < pipelineStages.length - 1 && (
											<div className='pipeline-connector'></div>
										)}
									</div>
								))}
							</div>
						</div>
					)}

					{guardianTests.length > 0 && (
						<div className='guardian-tests'>
							<h4>Guardian Test Results</h4>
							<div className='test-summary'>
								{guardianTests.map(suite => (
									<div key={suite.name} className='test-suite-result'>
										<span className='suite-name'>{suite.name}</span>
										<span className='suite-count'>{suite.count} tests</span>
										<span className={`suite-status ${suite.status}`}>
											{suite.status === 'pass' ? '✓ PASS' : '✗ FAIL'}
										</span>
									</div>
								))}
							</div>
							<div className='coverage-report'>
								<h5>Total Coverage: 94%</h5>
								<div className='coverage-bar'>
									<div className='coverage-fill' style={{ width: '94%' }}></div>
								</div>
							</div>
						</div>
					)}
				</div>

				<div className='automation-benefits'>
					<h4>Automated Guardian Benefits</h4>
					<div className='benefit-cards'>
						<div className='benefit-card'>
							<span className='benefit-icon'>⚡</span>
							<h5>Instant Feedback</h5>
							<p>Tests run on every code change</p>
						</div>
						<div className='benefit-card'>
							<span className='benefit-icon'>🛡️</span>
							<h5>24/7 Protection</h5>
							<p>Bugs caught even while you sleep</p>
						</div>
						<div className='benefit-card'>
							<span className='benefit-icon'>📈</span>
							<h5>Quality Metrics</h5>
							<p>Track coverage and test health</p>
						</div>
					</div>
				</div>
			</div>

			<div className='code-section'>
				<div className='code-header'>
					<span className='code-title'>The Automation Spell</span>
					<div className='code-actions'>
						<button onClick={() => runTest('CI Configuration Test')}>Test Configuration</button>
					</div>
				</div>
				<CodeExample
					title={`The Automation Spell`}
					discoveredBy={`Transcribed by Aria`}
					code={`// The Continuous Integration Incantation
// .github/workflows/guardian-tests.yml

name: Guardian Test Army
on: [push, pull_request]

jobs:
  test-fortress:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Summon Node Environment
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Gather Dependencies
        run: npm ci
        
      - name: Activate Linting Guardians
        run: npm run lint
        
      - name: Deploy Test Army
        run: npm test -- --coverage --watchAll=false
        
      - name: Verify Coverage Shield
        run: |
          if [ $(npm run coverage:check) -lt 80 ]; then
            echo "⚠️ Coverage below 80%! Strengthen your defenses!"
            exit 1
          fi
          
      - name: E2E Patrol
        run: npm run test:e2e
        
      - name: Build Kingdom Assets
        run: npm run build

// Package.json Test Scripts
{
  "scripts": {
    "test": "react-scripts test",
    "test:ci": "CI=true npm test -- --coverage",
    "test:e2e": "cypress run",
    "coverage:check": "jest --coverage --coverageThreshold='{ global: { branches: 80, functions: 80, lines: 80, statements: 80 } }'",
    "precommit": "lint-staged && npm test:ci"
  }
}`}
				/>
				<div className='code-tooltip'>
					<strong>Master Jasmine's Final Teaching:</strong> "Automation multiplies your 
					testing power. What once took hours now happens in minutes. The CI/CD pipeline 
					is your tireless army, catching bugs before they reach production."
				</div>
			</div>

			<div className='story-section'>
				<h3>The Testing Mastery Ceremony</h3>
				<StorySection
					paragraphs={[
						`As the automated tests hummed with activity, Jasmine placed a hand on Aria's shoulder. "You've learned well. From catching individual bugs to building an automated defense system, you now possess the knowledge to protect any kingdom."`,
						`Debuggora hooted approvingly, her eyes glowing with pride. "The bugs fear you now, Aria. But remember - vigilance is eternal. New bugs evolve, new patterns emerge. Keep your tests updated, your coverage high, and your automation running."`
					]}
				/>

				<div className='achievement-banner'>
					<h4>🏆 Testing Tower Mastery Achieved! 🏆</h4>
					<p>You have learned:</p>
					<ul>
						<li>Bug detection and prevention</li>
						<li>Three levels of testing magic</li>
						<li>Automated guardian deployment</li>
						<li>Continuous integration mastery</li>
					</ul>
				</div>
			</div>

			<ChapterSummary
				lessonInsight={{
					title: `The Automation Lesson:`,
					content: (
						<>
							<p>
								Automated testing transforms good developers into great ones. It's not about 
								replacing human judgment - it's about freeing humans to focus on creative 
								problems while machines handle repetitive verification. A strong CI/CD pipeline 
								gives you confidence to refactor fearlessly, deploy frequently, and sleep 
								peacefully.
							</p>
							<p>
								The true power of automation isn't just catching bugs - it's creating a culture 
								of quality. When every commit is tested, every merge is verified, and every 
								deployment is validated, excellence becomes automatic.
							</p>
						</>
					)
				}}
				reflectionQuestions={[
					`How has your perspective on testing changed? From seeing tests as extra work to understanding them as guardian spells, consider how this shift in mindset affects your development process.`,
					`What would a codebase without tests look like? Imagine trying to refactor a large application with no test coverage. How would automated testing change your confidence and productivity?`
				]}
				journalEntry={{
					title: `Aria's Journal - Day 29 (Evening)`,
					content: `The tower's highest chamber holds the Continuous Integration Engine - a massive crystalline structure! Phantom test runners materialized, each executing hundreds of tests in seconds. They never tire, never miss a test! I learned to configure GitHub Actions: checkout code, setup Node, run linters, deploy the test army, verify coverage (80% minimum!), E2E patrol, then build. The CI/CD pipeline provides instant feedback, 24/7 protection, and quality metrics. Jasmine's final teaching: "Automated testing transforms good developers into great ones." I now have an army of 324 guardian tests protecting the kingdom day and night!`
				}}
				chapterEnding={[
					`Standing in the Underground Realms, Aria looked at her assembled allies - Jasmine, Debuggora, and the army of automated tests. "We've built a quality fortress," she said. "But even the best tests can't catch every bug. Some hide deeper, in the production shadows. The Debug Dungeon awaits..."`
				]}
			/>
		</div>
	);
};

export default ChapterThree;