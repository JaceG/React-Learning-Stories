import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const ChapterTwo = () => {
	const {
		runTest,
		testResults,
		updateCoverage,
		protectedComponents
	} = useOutletContext();

	const [activeTestLevel, setActiveTestLevel] = useState(null);
	const [testSpells, setTestSpells] = useState({
		unit: false,
		integration: false,
		e2e: false
	});

	const castTestSpell = (level) => {
		setActiveTestLevel(level);
		setTestSpells({ ...testSpells, [level]: true });
		runTest(`${level.toUpperCase()} Test Suite`);
		
		// Update coverage based on test level
		const components = {
			unit: 'Button Component',
			integration: 'Form System',
			e2e: 'User Journey'
		};
		updateCoverage(components[level]);
	};

	const testLevels = [
		{
			id: 'unit',
			name: 'Unit Tests',
			icon: '🧩',
			description: 'Individual component testing',
			power: 'Catches 60% of bugs',
			example: 'Testing a single button click'
		},
		{
			id: 'integration',
			name: 'Integration Tests',
			icon: '🔗',
			description: 'Component cooperation testing',
			power: 'Catches 30% of bugs',
			example: 'Testing form submission flow'
		},
		{
			id: 'e2e',
			name: 'End-to-End Tests',
			icon: '🎯',
			description: 'Complete user journey testing',
			power: 'Catches 10% of bugs',
			example: 'Testing full checkout process'
		}
	];

	return (
		<div className='chapter'>
			<h2 className='chapter-title'>
				Chapter 2: The Test Incantations
			</h2>

			<div className='chapter-bridge'>
				Having learned to see and catch individual bugs, Aria was ready for more 
				powerful magic...
			</div>

			<div className='story-section'>
				<p className='story-paragraph'>
					Jasmine led Aria deeper into the Testing Tower. "Individual bug catching is 
					useful," she explained, "but we need systematic protection. I will teach you 
					the three levels of testing spells."
				</p>

				<p className='story-paragraph'>
					They entered a circular chamber with three glowing portals. Each portal 
					emanated a different color - blue for unit tests, green for integration tests, 
					and gold for end-to-end tests.
				</p>

				<p className='story-paragraph'>
					"Unit tests for individual components, integration tests for component 
					cooperation, and end-to-end tests for complete user journeys," Jasmine 
					intoned. "Each has its purpose, each its power."
				</p>

				<p className='story-paragraph'>
					Aria studied the portals thoughtfully. "It's like the Validation Guardians," 
					she realized, "but for code correctness rather than data validity."
				</p>

				<p className='story-paragraph'>
					Debuggora perched on Aria's shoulder, whispering insights: "See that bug 
					trying to form? Your test just prevented it from manifesting!"
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>The Three Testing Portals</h3>
				
				<div className='testing-tower'>
					<h4>Choose Your Testing Level</h4>
					<div className='test-portals'>
						{testLevels.map(level => (
							<div 
								key={level.id}
								className={`test-portal ${testSpells[level.id] ? 'activated' : ''} ${activeTestLevel === level.id ? 'active' : ''}`}
								onClick={() => castTestSpell(level.id)}>
								<div className='portal-icon'>{level.icon}</div>
								<h5>{level.name}</h5>
								<p className='portal-description'>{level.description}</p>
								<p className='portal-power'>{level.power}</p>
								<p className='portal-example'>
									<em>Example: {level.example}</em>
								</p>
								{testSpells[level.id] && (
									<div className='spell-active'>✓ Spell Active</div>
								)}
							</div>
						))}
					</div>
				</div>

				{activeTestLevel && (
					<div className='test-demonstration'>
						<h4>Active Test: {activeTestLevel.toUpperCase()}</h4>
						<div className='protection-barrier active'>
							<span className='barrier-label'>Protection Active</span>
							<p>
								Your {activeTestLevel} tests are now protecting the kingdom from bugs!
							</p>
						</div>
					</div>
				)}

				<div className='coverage-map'>
					<h4>Kingdom Protection Coverage</h4>
					{['Button Component', 'Form System', 'User Journey', 'API Layer'].map(zone => (
						<div 
							key={zone}
							className={`coverage-zone ${protectedComponents.includes(zone) ? 'protected' : 'vulnerable'}`}>
							<div className='zone-name'>{zone}</div>
							<div className='zone-status'>
								{protectedComponents.includes(zone) ? 'Protected' : 'Vulnerable'}
							</div>
						</div>
					))}
				</div>
			</div>

			<div className='code-section'>
				<div className='code-header'>
					<span className='code-title'>The Three Testing Incantations</span>
					<div className='code-actions'>
						<button onClick={() => runTest('Testing Pyramid Suite')}>Cast All Spells</button>
					</div>
				</div>
				<div className='code-example'>
					<pre>{`// Level 1: Unit Test Incantation
describe('Button Component', () => {
  test('renders with correct text', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });
  
  test('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Test</Button>);
    fireEvent.click(screen.getByText('Test'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

// Level 2: Integration Test Incantation
describe('Login Form', () => {
  test('submits form with user credentials', async () => {
    render(<LoginForm onSubmit={mockSubmit} />);
    
    // Fill form fields
    await userEvent.type(screen.getByLabelText(/email/i), 'aria@kingdom.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'secret123');
    
    // Submit form
    await userEvent.click(screen.getByRole('button', { name: /login/i }));
    
    // Verify integration
    expect(mockSubmit).toHaveBeenCalledWith({
      email: 'aria@kingdom.com',
      password: 'secret123'
    });
  });
});

// Level 3: End-to-End Test Incantation
describe('User Registration Journey', () => {
  test('complete signup flow', async () => {
    // Navigate to signup
    await page.goto('/signup');
    
    // Fill registration form
    await page.fill('[name="username"]', 'AriaTheGuide');
    await page.fill('[name="email"]', 'aria@testing.com');
    await page.fill('[name="password"]', 'TestMagic123!');
    
    // Submit and verify
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/welcome');
    await expect(page.locator('h1')).toContainText('Welcome, AriaTheGuide!');
  });
});`}</pre>
				</div>
				<div className='code-tooltip'>
					<strong>Jasmine's Wisdom:</strong> "The Testing Pyramid guides us - many unit 
					tests at the base, fewer integration tests in the middle, and selected E2E 
					tests at the peak. Each level catches different bugs, together they form an 
					impenetrable defense."
				</div>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>Binary's New Ability</h3>
				<div className='character-update'>
					<p className='story-paragraph'>
						Binary's circuits glowed with new patterns. "I can now predict where bugs 
						might spawn based on code complexity!" he announced proudly. His display 
						showed heat maps of untested code paths.
					</p>
					<div className='binary-display'>
						<pre>{`// Binary's Bug Prediction Algorithm
{
  "high_risk_areas": [
    { "path": "/components/DataGrid", "complexity": 8.5, "coverage": "12%" },
    { "path": "/hooks/useAuth", "complexity": 7.2, "coverage": "45%" },
    { "path": "/utils/validation", "complexity": 6.8, "coverage": "78%" }
  ],
  "recommendation": "Focus unit tests on DataGrid component first!"
}`}</pre>
					</div>
				</div>
			</div>

			<div className='lesson-insight'>
				<h3>The Test Levels Lesson:</h3>
				<p>
					The three levels of testing work together like layers of armor. Unit tests 
					are your chainmail - numerous small rings that catch most attacks. Integration 
					tests are your plate armor - fewer pieces but covering critical joints. E2E 
					tests are your shield - selective protection for the most important battles.
				</p>
				<p>
					Remember the testing pyramid: A strong base of unit tests, a solid middle of 
					integration tests, and a carefully chosen peak of E2E tests. This structure 
					gives you fast feedback, comprehensive coverage, and maintainable test suites.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on the Testing Levels</h3>
				<p>
					<strong>How do the three levels of testing complement each other?</strong> 
					Consider how unit tests provide fast feedback, integration tests catch 
					component interaction issues, and E2E tests verify complete user workflows.
				</p>
				<p>
					<strong>Why is the testing pyramid shape important?</strong> Think about test 
					execution time, maintenance cost, and debugging difficulty at each level. How 
					does this shape optimize for developer productivity?
				</p>
			</div>

			<div className='chapter-ending'>
				<p>
					As the three portals glowed with activated test spells, Jasmine nodded 
					approvingly. "You've learned to cast individual test spells, but true mastery 
					comes from automation. Tomorrow, we'll build an army of tests that guard the 
					kingdom day and night..."
				</p>
			</div>
		</div>
	);
};

export default ChapterTwo;