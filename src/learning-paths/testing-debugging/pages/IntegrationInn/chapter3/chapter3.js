import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import CodeExample from '../../../../../components/content/CodeExample';
import StorySection from '../../../../../components/content/StorySection';

const ChapterThree = () => {
	const {
		connectedComponents,
		integrationTests,
		mockServices,
		harmonyLevel,
		addIntegrationTest,
		connectComponents
	} = useOutletContext();

	const [feastActive, setFeastActive] = useState(false);
	const [integrationFlow, setIntegrationFlow] = useState([]);
	const [finalTestResults, setFinalTestResults] = useState(null);

	// The complete integration flow
	const fullIntegrationFlow = [
		{ id: 1, name: 'User Input', status: 'pending' },
		{ id: 2, name: 'Form Validation', status: 'pending' },
		{ id: 3, name: 'API Call (Mocked)', status: 'pending' },
		{ id: 4, name: 'State Update', status: 'pending' },
		{ id: 5, name: 'UI Render', status: 'pending' },
		{ id: 6, name: 'Analytics Track', status: 'pending' }
	];

	// Start the integration feast
	const startFeast = () => {
		setFeastActive(true);
		runIntegrationFlow();
	};

	// Simulate the full integration flow
	const runIntegrationFlow = () => {
		let currentStep = 0;
		const interval = setInterval(() => {
			if (currentStep < fullIntegrationFlow.length) {
				setIntegrationFlow(prev => {
					const updated = [...fullIntegrationFlow];
					for (let i = 0; i <= currentStep; i++) {
						updated[i] = { ...updated[i], status: 'success' };
					}
					return updated;
				});
				
				// Add test for each step
				addIntegrationTest({
					id: Date.now() + currentStep,
					name: fullIntegrationFlow[currentStep].name,
					status: 'pass',
					type: 'integration'
				});
				
				currentStep++;
			} else {
				clearInterval(interval);
				setFinalTestResults({
					totalTests: integrationTests.length + 6,
					passed: integrationTests.filter(t => t.status === 'pass').length + 6,
					failed: integrationTests.filter(t => t.status === 'fail').length,
					harmony: 100
				});
			}
		}, 1000);
	};

	// Calculate test statistics
	const testStats = {
		unitTests: 245,
		integrationTests: integrationTests.length,
		mockServices: Object.keys(mockServices).length,
		connectedComponents: connectedComponents.length
	};

	return (
		<div className='chapter'>
			<ChapterIntro
				chapterNumber={3}
				title={`The Integration Feast`}
				bridge={`The inn hosted an integration feast - a celebration where all components worked together in perfect harmony. Innkeeper Cypress raised his glass high. "Tonight, we witness true integration! Every component knows its role, every service is accounted for, and every interaction is tested!"`}
			/>

			<StorySection
				paragraphs={[
					<>The inn hosted an integration feast - a celebration where all components worked together in perfect harmony. <strong>Innkeeper Cypress</strong> raised his glass high.</>,
					`"Tonight, we witness true integration!" he announced. "Every component knows its role, every service is accounted for, and every interaction is tested. This is what we strive for!"`,
					<><strong>Aria</strong> watched as components that once conflicted now danced together seamlessly. Forms validated smoothly, APIs responded predictably (thanks to mocks), and state flowed like water through the system.</>,
					`"To Aria," Cypress toasted, "who taught us that components, like people, must be tested both alone and together! You've shown us the path from isolation to integration!"`
				]}
			/>

			<div className='interactive-section'>
				<h3 className='section-title'>The Grand Integration Test</h3>
				
				{!feastActive ? (
					<div className='integration-feast'>
						<h4>🎉 Integration Feast Ready! 🎉</h4>
						<p>All components are connected, mocks are in place, and tests are prepared.</p>
						<p>Time to run the complete integration flow!</p>
						
						<button 
							className='mock-button'
							style={{ marginTop: '20px', fontSize: '18px', padding: '12px 24px' }}
							onClick={startFeast}>
							Start the Integration Feast
						</button>
					</div>
				) : (
					<div className='interaction-diagram'>
						<h4>Full System Integration Flow</h4>
						
						<div className='integration-flow'>
							{integrationFlow.map((step, index) => (
								<div key={step.id} className='flow-step'>
									<div className={`component-node ${step.status}`}>
										{step.status === 'success' ? '✓' : '⏳'}
									</div>
									<div className='step-name'>{step.name}</div>
									{index < integrationFlow.length - 1 && (
										<div className='flow-arrow'>↓</div>
									)}
								</div>
							))}
						</div>
					</div>
				)}

				<div className='test-suite-panel'>
					<h4>Integration Test Summary</h4>
					
					<div className='test-category'>
						<div className='test-category-header'>Test Coverage Statistics</div>
						<div className='test-stats-grid'>
							<div className='stat-item'>
								<div className='stat-label'>Unit Tests</div>
								<div className='stat-value'>{testStats.unitTests}</div>
							</div>
							<div className='stat-item'>
								<div className='stat-label'>Integration Tests</div>
								<div className='stat-value'>{testStats.integrationTests}</div>
							</div>
							<div className='stat-item'>
								<div className='stat-label'>Mocked Services</div>
								<div className='stat-value'>{testStats.mockServices}</div>
							</div>
							<div className='stat-item'>
								<div className='stat-label'>Connected Components</div>
								<div className='stat-value'>{testStats.connectedComponents}</div>
							</div>
						</div>
					</div>
				</div>

				{finalTestResults && (
					<div className='achievement-banner'>
						<h4>🏆 Integration Mastery Achieved! 🏆</h4>
						<p>The Integration Feast is complete!</p>
						<ul style={{ listStyle: 'none', padding: 0 }}>
							<li>✓ All components working in harmony</li>
							<li>✓ External services properly mocked</li>
							<li>✓ Complete user flows tested</li>
							<li>✓ {finalTestResults.passed} tests passed</li>
							<li>✓ Inn Harmony: {finalTestResults.harmony}%</li>
						</ul>
					</div>
				)}
			</div>

			<div className='code-section'>
				<div className='code-header'>
					<span className='code-title'>Complete Integration Test Suite</span>
					<div className='code-actions'>
						<button onClick={() => !feastActive && startFeast()}>
							Run Full Suite
						</button>
					</div>
				</div>
				<CodeExample
					title={`Complete Integration Test Suite`}
					discoveredBy={`Transcribed by Aria`}
					code={`// The Complete Integration Test Pattern
// Bringing it all together

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

// Setup mock server
const server = setupServer(
  rest.post('/api/users', (req, res, ctx) => {
    return res(ctx.json({ id: 1, status: 'created' }));
  }),
  rest.post('/api/analytics', (req, res, ctx) => {
    return res(ctx.json({ tracked: true }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// The Grand Integration Test
describe('Complete User Registration Flow', () => {
  test('user can register from start to finish', async () => {
    // Setup
    const mockOnSuccess = jest.fn();
    const user = userEvent.setup();
    
    // Render the full app section
    const { container } = render(
      <App>
        <RegistrationFlow onSuccess={mockOnSuccess} />
      </App>
    );
    
    // Step 1: Navigate to registration
    await user.click(screen.getByText(/sign up/i));
    
    // Step 2: Fill out the form
    await user.type(
      screen.getByLabelText(/username/i),
      'IntegrationMaster'
    );
    await user.type(
      screen.getByLabelText(/email/i),
      'master@integration.inn'
    );
    await user.type(
      screen.getByLabelText(/password/i),
      'StrongPassword123!'
    );
    
    // Step 3: Accept terms
    await user.click(screen.getByLabelText(/accept terms/i));
    
    // Step 4: Submit form
    await user.click(screen.getByRole('button', { name: /register/i }));
    
    // Step 5: Wait for async operations
    await waitFor(() => {
      expect(screen.getByText(/verifying/i)).toBeInTheDocument();
    });
    
    // Step 6: Verify success state
    await waitFor(() => {
      expect(screen.getByText(/registration successful/i)).toBeInTheDocument();
    });
    
    // Step 7: Check all integrations worked
    expect(mockOnSuccess).toHaveBeenCalledWith({
      userId: 1,
      username: 'IntegrationMaster'
    });
    
    // Verify analytics was tracked
    const analyticsReqs = server.printHandlers().filter(
      handler => handler.path === '/api/analytics'
    );
    expect(analyticsReqs).toHaveLength(1);
    
    // Verify UI updated correctly
    expect(screen.getByText(/welcome, IntegrationMaster/i)).toBeInTheDocument();
    
    // Verify no errors in console
    expect(console.error).not.toHaveBeenCalled();
  });
  
  test('handles errors gracefully across components', async () => {
    // Override server to return errors
    server.use(
      rest.post('/api/users', (req, res, ctx) => {
        return res(
          ctx.status(409),
          ctx.json({ error: 'Username already exists' })
        );
      })
    );
    
    render(<RegistrationFlow />);
    
    // Fill and submit
    await userEvent.type(
      screen.getByLabelText(/username/i),
      'ExistingUser'
    );
    // ... fill other fields
    await userEvent.click(screen.getByRole('button', { name: /register/i }));
    
    // Error should be displayed
    await waitFor(() => {
      expect(screen.getByText(/username already exists/i)).toBeInTheDocument();
    });
    
    // Form should still be interactive
    expect(screen.getByLabelText(/username/i)).toBeEnabled();
    
    // User can fix and retry
    await userEvent.clear(screen.getByLabelText(/username/i));
    await userEvent.type(screen.getByLabelText(/username/i), 'NewUser');
    
    // Mock success this time
    server.use(
      rest.post('/api/users', (req, res, ctx) => {
        return res(ctx.json({ id: 2, status: 'created' }));
      })
    );
    
    await userEvent.click(screen.getByRole('button', { name: /register/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/registration successful/i)).toBeInTheDocument();
    });
  });
});

// Performance Integration Test
test('registration completes within performance budget', async () => {
  const startTime = performance.now();
  
  render(<RegistrationFlow />);
  
  // Complete registration flow
  // ... user interactions ...
  
  await waitFor(() => {
    expect(screen.getByText(/registration successful/i)).toBeInTheDocument();
  });
  
  const endTime = performance.now();
  const totalTime = endTime - startTime;
  
  // Should complete within 3 seconds
  expect(totalTime).toBeLessThan(3000);
});`}
				/>
				<div className='code-tooltip'>
					<strong>Integration Feast Wisdom:</strong> "A great integration test tells 
					a story - the user's story. It should read like a journey through your 
					application, touching each component along the way, ensuring they all play 
					their part in the grand performance."
				</div>
			</div>

			<ChapterSummary
				lessonInsight={{
					title: `The Integration Mastery Lesson:`,
					content: (
						<>
							<p>
								True integration testing is about confidence. When all your components work 
								together seamlessly, when external dependencies are properly mocked, and 
								when user flows are thoroughly tested, you can deploy with confidence. It's 
								the bridge between "it works on my machine" and "it works for everyone."
							</p>
							<p>
								The Integration Inn teaches us that software, like society, is built on 
								relationships. Components must communicate, cooperate, and handle conflicts 
								gracefully. Integration tests ensure these relationships remain healthy as 
								your application grows.
							</p>
						</>
					)
				}}
				reflectionQuestions={[
					`How do integration tests give you deployment confidence? Consider the difference between knowing individual parts work versus knowing the whole system works. What scenarios do integration tests catch that unit tests miss?`,
					`What's the ideal balance between unit, integration, and E2E tests? Think about the testing pyramid and your specific application needs. How do you decide what to test at each level?`
				]}
				journalEntry={{
					title: `Aria's Journal - Day 31 (Evening)`,
					content: `The Integration Feast! Cypress raised his glass: "Tonight, we witness true integration!" Components that once conflicted now danced together seamlessly. I ran the complete flow: User Input → Form Validation → API Call (mocked) → State Update → UI Render → Analytics Track. All 6 steps passed! The Grand Integration Test tells a user's story - navigate to signup, fill form, accept terms, submit, wait for async, verify success, check analytics. I also wrote error handling tests: 409 status returns "username exists", user can fix and retry. Final stats: 245 unit tests, 67 integration tests, 4 mocked services, Inn Harmony at 100%!`
				}}
				chapterEnding={[
					`As the Integration Feast concluded, Cypress placed a hand on Aria's shoulder. "You've mastered the art of bringing components together. But even the best tests can't prevent all errors. At the Error Enchantments sanctuary, you'll learn the final piece - handling failures gracefully when they inevitably occur..."`
				]}
			/>
		</div>
	);
};

export default ChapterThree;