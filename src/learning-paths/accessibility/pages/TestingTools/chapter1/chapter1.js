import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';

const ChapterOne = () => {
	const [activeTab, setActiveTab] = useState('automated');
	const [selectedTool, setSelectedTool] = useState(null);
	const [testInProgress, setTestInProgress] = useState(false);
	const [manualTestMode, setManualTestMode] = useState('keyboard');
	const [screenReaderAnnouncements, setScreenReaderAnnouncements] = useState([]);
	
	const { 
		testingStrategy,
		setTestingStrategy,
		automatedTools,
		setAutomatedTools,
		testResults,
		runAccessibilityTest,
		enableTool,
		testingChecklist,
		updateChecklist
	} = useOutletContext();

	const automatedTestingTools = [
		{
			id: 'axe',
			name: 'axe DevTools',
			icon: '🛠️',
			description: 'Catch 57% of WCAG issues automatically',
			features: ['Browser extension', 'CI/CD integration', 'Detailed reports'],
			installCmd: 'npm install --save-dev @axe-core/react'
		},
		{
			id: 'wave',
			name: 'WAVE',
			icon: '🌊',
			description: 'Visual feedback for accessibility issues',
			features: ['Browser extension', 'API access', 'Visual indicators'],
			installCmd: 'Add WAVE extension to browser'
		},
		{
			id: 'lighthouse',
			name: 'Lighthouse',
			icon: '🏮',
			description: 'Built into Chrome DevTools',
			features: ['Performance + A11y', 'CI integration', 'Actionable fixes'],
			installCmd: 'Built into Chrome DevTools'
		},
		{
			id: 'jest',
			name: 'Jest + Testing Library',
			icon: '🧪',
			description: 'Unit test accessibility',
			features: ['Component testing', 'ARIA queries', 'User interactions'],
			installCmd: 'npm install --save-dev jest-axe'
		},
		{
			id: 'cypress',
			name: 'Cypress + axe',
			icon: '🌲',
			description: 'E2E accessibility testing',
			features: ['Full page scans', 'User journeys', 'Visual regression'],
			installCmd: 'npm install --save-dev cypress-axe'
		}
	];

	const manualTestingMethods = [
		{
			id: 'keyboard',
			name: 'Keyboard Navigation',
			icon: '⌨️',
			checks: [
				'Tab through all interactive elements',
				'Shift+Tab navigates backwards',
				'Enter/Space activate buttons',
				'Arrow keys work in menus',
				'Escape closes modals',
				'No keyboard traps'
			]
		},
		{
			id: 'screenreader',
			name: 'Screen Reader',
			icon: '🔊',
			checks: [
				'Page title is announced',
				'Headings create outline',
				'Images have descriptions',
				'Form labels are associated',
				'Error messages are announced',
				'Dynamic content updates'
			]
		},
		{
			id: 'zoom',
			name: 'Zoom Testing',
			icon: '🔍',
			checks: [
				'200% zoom maintains layout',
				'Text remains readable',
				'No horizontal scrolling',
				'Interactive elements visible',
				'Content doesn\'t overlap'
			]
		}
	];

	const quickTests = [
		{
			name: 'Tab Index Audit',
			description: 'Check all focusable elements',
			action: () => {
				console.log('Running tab index audit...');
				const focusable = document.querySelectorAll(
					'a, button, input, select, textarea, [tabindex]'
				);
				console.log(`Found ${focusable.length} focusable elements`);
				return focusable.length;
			}
		},
		{
			name: 'Color Contrast Check',
			description: 'Verify text readability',
			action: () => {
				console.log('Checking color contrast...');
				// Simulated check
				return Math.random() > 0.5 ? 'Pass' : 'Needs Review';
			}
		},
		{
			name: 'ARIA Validator',
			description: 'Validate ARIA usage',
			action: () => {
				console.log('Validating ARIA attributes...');
				const ariaElements = document.querySelectorAll('[role], [aria-label]');
				return `${ariaElements.length} ARIA elements found`;
			}
		}
	];

	const runAutomatedTest = (toolId) => {
		setTestInProgress(true);
		setSelectedTool(toolId);
		
		setTimeout(() => {
			const result = runAccessibilityTest(toolId);
			setTestInProgress(false);
			
			// Simulate screen reader announcement
			if (manualTestMode === 'screenreader') {
				addScreenReaderAnnouncement(
					`Test complete. ${result.errors} errors, ${result.warnings} warnings found.`
				);
			}
		}, 2000);
	};

	const addScreenReaderAnnouncement = (text) => {
		setScreenReaderAnnouncements(prev => [...prev, {
			text,
			timestamp: new Date().toLocaleTimeString()
		}]);
	};

	const performQuickTest = (test) => {
		const result = test.action();
		addScreenReaderAnnouncement(`${test.name}: ${result}`);
	};

	return (
		<div className='chapter testing-tools'>
			<ChapterIntro
				chapterNumber={1}
				title={`The Testing Tower`}
			/>

			<div className='story-section'>
				<p className='story-paragraph'>
					The Testing Tower stood tall, its many windows glowing with different tools. 
					<strong>Master Validator</strong> greeted them. "Welcome to where quality 
					meets inclusion. No single tool catches everything."
				</p>
				
				<p className='story-paragraph'>
					Aria examined the tools. "So many options! Where do we start?"
				</p>

				<p className='story-paragraph'>
					"Layer your defenses. Automated tools catch low-hanging fruit. Manual testing 
					finds nuanced issues. User testing reveals real experiences."
				</p>

				<p className='story-paragraph'>
					Binary scanned the statistics. "Automated tools detect 30-50% of issues. 
					Manual testing essential for complete coverage!"
				</p>

				<p className='story-paragraph'>
					Debuggora studied the patterns. "I see - it's not about choosing one tool, 
					but combining many approaches. Defense in depth!"
				</p>

				<p className='story-paragraph'>
					Master Validator nodded. "Exactly. Build testing into your workflow. Make 
					accessibility checking as natural as syntax checking. Quality is a habit."
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>Testing Strategy Center</h3>
				
				<InstructionBox character={`Master Validator activates the Testing Strategy Center.`}>
					{`"Explore all three approaches - automated, manual, and quick checks. Click on tools to install them, then run tests to see your results. Remember: comprehensive testing combines all three approaches!"`}
				</InstructionBox>
				
				<div className='testing-tower'>
					<div className='demo-controls'>
						<button
							onClick={() => setActiveTab('automated')}
							className={`demo-button ${activeTab === 'automated' ? 'active' : ''}`}
						>
							🤖 Automated Testing
						</button>
						<button
							onClick={() => setActiveTab('manual')}
							className={`demo-button ${activeTab === 'manual' ? 'active' : ''}`}
						>
							👆 Manual Testing
						</button>
						<button
							onClick={() => setActiveTab('quick')}
							className={`demo-button ${activeTab === 'quick' ? 'active' : ''}`}
						>
							⚡ Quick Checks
						</button>
					</div>

					{activeTab === 'automated' && (
						<div>
							<h4 style={{ marginTop: '30px', marginBottom: '20px' }}>
								Automated Testing Tools
							</h4>
							
							<div className='tool-grid'>
								{automatedTestingTools.map((tool) => (
									<div
										key={tool.id}
										className={`tool-card ${automatedTools[tool.id] ? 'enabled' : ''}`}
										onClick={() => {
											if (!automatedTools[tool.id]) {
												enableTool(tool.id);
											} else {
												runAutomatedTest(tool.id);
											}
										}}
									>
										<span className='tool-icon'>{tool.icon}</span>
										<div className='tool-name'>{tool.name}</div>
										<div className='tool-description'>{tool.description}</div>
										
										<div style={{ marginTop: '15px' }}>
											<strong>Features:</strong>
											<ul style={{ marginTop: '5px', paddingLeft: '20px' }}>
												{tool.features.map((feature, idx) => (
													<li key={idx} style={{ fontSize: '0.9em' }}>
														{feature}
													</li>
												))}
											</ul>
										</div>
										
										<div className='installation-status'>
											<span className={`status-indicator ${automatedTools[tool.id] ? 'installed' : ''}`} />
											<span>{automatedTools[tool.id] ? 'Installed' : 'Click to install'}</span>
										</div>
										
										{selectedTool === tool.id && testInProgress && (
											<div style={{
												marginTop: '15px',
												textAlign: 'center',
												color: '#4CAF50'
											}}>
												Running test... 🔄
											</div>
										)}
									</div>
								))}
							</div>

							<div style={{
								marginTop: '30px',
								padding: '20px',
								background: 'rgba(76, 175, 80, 0.1)',
								borderRadius: '10px',
								border: '1px solid rgba(76, 175, 80, 0.3)'
							}}>
								<h5 style={{ marginTop: 0 }}>💡 Pro Tip:</h5>
								<p>
									Combine multiple tools for comprehensive coverage. axe DevTools 
									for development, Lighthouse for CI/CD, and WAVE for visual 
									validation create a strong testing foundation.
								</p>
							</div>
						</div>
					)}

					{activeTab === 'manual' && (
						<div>
							<h4 style={{ marginTop: '30px', marginBottom: '20px' }}>
								Manual Testing Methods
							</h4>
							
							<div className='demo-controls' style={{ marginBottom: '20px' }}>
								{manualTestingMethods.map((method) => (
									<button
										key={method.id}
										onClick={() => setManualTestMode(method.id)}
										className={`demo-button ${manualTestMode === method.id ? 'active' : ''}`}
									>
										{method.icon} {method.name}
									</button>
								))}
							</div>

							{manualTestingMethods.map((method) => (
								method.id === manualTestMode && (
									<div key={method.id} className='testing-checklist'>
										<h5 style={{ marginBottom: '20px' }}>
											{method.icon} {method.name} Checklist
										</h5>
										
										{method.checks.map((check, idx) => (
											<div
												key={idx}
												className={`checklist-item ${testingChecklist[check] ? 'checked' : ''}`}
												onClick={() => updateChecklist(check, !testingChecklist[check])}
											>
												<input
													type='checkbox'
													className='checklist-checkbox'
													checked={testingChecklist[check] || false}
													onChange={(e) => updateChecklist(check, e.target.checked)}
													onClick={(e) => e.stopPropagation()}
												/>
												<span className='checklist-label'>{check}</span>
											</div>
										))}
									</div>
								)
							))}

							{manualTestMode === 'screenreader' && (
								<div style={{
									marginTop: '20px',
									padding: '20px',
									background: 'rgba(0, 0, 0, 0.4)',
									borderRadius: '10px',
									maxHeight: '200px',
									overflow: 'auto'
								}}>
									<h5 style={{ marginTop: 0 }}>Screen Reader Output:</h5>
									{screenReaderAnnouncements.length === 0 ? (
										<p style={{ color: '#7f8c8d' }}>
											Waiting for announcements...
										</p>
									) : (
										screenReaderAnnouncements.map((announcement, idx) => (
											<div key={idx} style={{ marginBottom: '10px' }}>
												<span style={{ color: '#7f8c8d', fontSize: '0.85em' }}>
													{announcement.timestamp}:
												</span>
												<span style={{ marginLeft: '10px' }}>
													{announcement.text}
												</span>
											</div>
										))
									)}
								</div>
							)}
						</div>
					)}

					{activeTab === 'quick' && (
						<div>
							<h4 style={{ marginTop: '30px', marginBottom: '20px' }}>
								Quick Accessibility Checks
							</h4>
							
							<div className='quick-actions'>
								{quickTests.map((test, idx) => (
									<button
										key={idx}
										className='quick-action-button'
										onClick={() => performQuickTest(test)}
									>
										<span className='quick-action-icon'>🔍</span>
										<div className='quick-action-label'>{test.name}</div>
										<div style={{ fontSize: '0.85em', color: '#7f8c8d', marginTop: '5px' }}>
											{test.description}
										</div>
									</button>
								))}
							</div>

							<div style={{
								marginTop: '30px',
								padding: '20px',
								background: 'rgba(255, 193, 7, 0.1)',
								borderRadius: '10px',
								border: '1px solid rgba(255, 193, 7, 0.3)'
							}}>
								<h5 style={{ marginTop: 0 }}>Browser DevTools Shortcuts:</h5>
								<ul style={{ margin: '10px 0 0 0', paddingLeft: '20px' }}>
									<li><strong>Chrome:</strong> F12 → Lighthouse → Accessibility</li>
									<li><strong>Firefox:</strong> F12 → Accessibility Inspector</li>
									<li><strong>Safari:</strong> Develop → Show Web Inspector → Audit</li>
									<li><strong>Edge:</strong> F12 → Issues → Accessibility</li>
								</ul>
							</div>
						</div>
					)}
				</div>

				{testResults.length > 0 && (
					<div>
						<h3 className='section-title' style={{ marginTop: '40px' }}>
							Recent Test Results
						</h3>
						
						<div className='test-results'>
							{testResults.slice(-5).reverse().map((result, idx) => (
								<div key={idx} className='test-result'>
									<span className='test-result-icon'>
										{automatedTestingTools.find(t => t.id === result.tool)?.icon || '🔍'}
									</span>
									<div className='test-result-details'>
										<div className='test-result-tool'>
											{automatedTestingTools.find(t => t.id === result.tool)?.name || result.tool}
										</div>
										<div className='test-result-timestamp'>
											{new Date(result.timestamp).toLocaleString()}
										</div>
									</div>
									<div className='test-result-stats'>
										<span className='stat-badge errors'>
											{result.errors} errors
										</span>
										<span className='stat-badge warnings'>
											{result.warnings} warnings
										</span>
										<span className='stat-badge passes'>
											{result.passes} passes
										</span>
									</div>
								</div>
							))}
						</div>
					</div>
				)}
			</div>

			<CodeExample
				title={`Testing Implementation Guide`}
				discoveredBy={`Master Validator's toolkit`}
				code={`# Accessibility Testing Strategy
// Master Validator: "Test early, test often, test comprehensively!"

# Setting Up Automated Testing

## 1. Development Environment
// Binary: "Catch issues before they reach production!"

// Install axe DevTools for React
npm install --save-dev @axe-core/react

// Add to your App.js (development only)
if (process.env.NODE_ENV !== 'production') {
  import('@axe-core/react').then(axe => {
    axe.default(React, ReactDOM, 1000);
  });
}

## 2. Unit Testing with Jest
// Test individual components

import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('Button is accessible', async () => {
  const { container } = render(
    <button onClick={handleClick}>
      Submit Form
    </button>
  );
  
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

## 3. Testing Complex Components
// Aria: "Test all states and interactions!"

test('Modal is accessible', async () => {
  const { container, getByRole } = render(<Modal isOpen={true} />);
  
  // Check ARIA attributes
  const dialog = getByRole('dialog');
  expect(dialog).toHaveAttribute('aria-modal', 'true');
  expect(dialog).toHaveAttribute('aria-labelledby');
  
  // Check focus management
  expect(document.activeElement).toBe(dialog);
  
  // Run axe
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

# Integration Testing with Cypress

## Setup Cypress + axe
npm install --save-dev cypress cypress-axe

// cypress/support/commands.js
import 'cypress-axe';

// cypress/e2e/a11y.cy.js
describe('Accessibility Tests', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.injectAxe();
  });
  
  it('Homepage is accessible', () => {
    cy.checkA11y();
  });
  
  it('Navigation is keyboard accessible', () => {
    // Tab through navigation
    cy.get('body').tab();
    cy.focused().should('have.attr', 'href', '/home');
    
    cy.get('body').tab();
    cy.focused().should('have.attr', 'href', '/about');
    
    // Check for violations
    cy.checkA11y('nav');
  });
  
  it('Forms are accessible', () => {
    cy.get('input[name="email"]').type('test@example.com');
    
    // Check specific WCAG rules
    cy.checkA11y('form', {
      rules: {
        'label': { enabled: true },
        'color-contrast': { enabled: true }
      }
    });
  });
});

# Manual Testing Protocols

## Keyboard Navigation Testing
// Debuggora: "Every path must be keyboard accessible!"

const keyboardTestProtocol = {
  setup: () => {
    // Unplug your mouse!
    console.log('Starting keyboard-only test');
  },
  
  tests: [
    {
      name: 'Tab Navigation',
      steps: [
        'Press Tab to move forward',
        'Press Shift+Tab to move backward',
        'Verify visible focus indicator',
        'Check logical tab order',
        'Ensure no keyboard traps'
      ]
    },
    {
      name: 'Interactive Elements',
      steps: [
        'Enter/Space activates buttons',
        'Arrow keys navigate menus',
        'Escape closes modals',
        'Home/End keys work in lists'
      ]
    }
  ],
  
  report: (results) => {
    const issues = results.filter(r => !r.pass);
    console.log(\`Found \${issues.length} keyboard issues\`);
  }
};

## Screen Reader Testing
// Platform-specific guides

const screenReaderSetup = {
  windows: {
    reader: 'NVDA',
    start: 'Ctrl + Alt + N',
    stop: 'Insert + Q',
    readAll: 'Insert + Down Arrow',
    navigation: 'H for headings, B for buttons'
  },
  
  mac: {
    reader: 'VoiceOver',
    start: 'Cmd + F5',
    webNavigation: 'Ctrl + Option + Arrow keys',
    rotor: 'Ctrl + Option + U',
    readAll: 'Ctrl + Option + A'
  },
  
  testScript: [
    'Navigate to page',
    'Listen to page title',
    'Navigate by headings (H key)',
    'Test form interactions',
    'Verify dynamic updates',
    'Check image descriptions'
  ]
};

# CI/CD Integration

## GitHub Actions Example
name: Accessibility Tests

on: [push, pull_request]

jobs:
  a11y:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Install dependencies
        run: npm ci
        
      - name: Build application
        run: npm run build
        
      - name: Run Jest a11y tests
        run: npm run test:a11y
        
      - name: Run Cypress a11y tests
        uses: cypress-io/github-action@v2
        with:
          start: npm start
          wait-on: http://localhost:3000
          command: npm run cypress:a11y
          
      - name: Run Lighthouse CI
        uses: treosh/lighthouse-ci-action@v8
        with:
          urls: |
            http://localhost:3000
            http://localhost:3000/about
          uploadArtifacts: true`}
			/>

			<ChapterSummary
				characterIntros={[
					{
						name: `Master Validator`,
						description: `Guardian of the Testing Tower and champion of quality assurance. Her philosophy: "Accessibility testing isn't about finding fault - it's about ensuring everyone can experience what you've created. Test early, test often, test comprehensively."`
					}
				]}
				lessonInsight={{
					title: `The Testing Lesson:`,
					content: `Master Validator teaches us that accessibility testing isn't a one-time check—it's an ongoing practice. Automated tools catch common issues quickly, but they only find about 30-50% of accessibility problems. Manual testing with keyboards and screen readers reveals the real user experience. By combining automated scanning, manual testing, and real user feedback, we build truly inclusive applications. Remember: the best accessibility test is having users with disabilities test your application.`
				}}
				reflectionQuestions={[
					`How does integrating accessibility testing into your development workflow change your approach to building features?`,
					`Why is the combination of automated and manual testing essential for catching the full spectrum of accessibility issues?`
				]}
				journalEntry={{
					title: `Aria's Journal - Day 44 (Morning)`,
					content: `The Testing Tower stands as the final guardian of accessibility! Master Validator welcomed us with her clipboard and magnifying glass, ready to verify every component we've built. I learned the truth about testing: automated tools like axe DevTools catch 30-50% of issues - important, but not everything! Binary scanned the statistics while I explored keyboard navigation, screen reader testing, and quick checks. The key insight: "Layer your defenses." Automated for speed, manual for nuance, user testing for real experiences. Master Validator's wisdom echoes: "Build testing into your workflow. Make accessibility checking as natural as syntax checking."`
				}}
			/>
		</div>
	);
};

export default ChapterOne;
