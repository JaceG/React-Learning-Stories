import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import CodeExample from '../../../../../components/content/CodeExample';
import StorySection from '../../../../../components/content/StorySection';

const ChapterOne = () => {
	const {
		connectedComponents,
		connectComponents,
		addIntegrationTest,
		componentConflicts,
		harmonyLevel,
	} = useOutletContext();

	const [selectedComponents, setSelectedComponents] = useState([]);
	const [showConflict, setShowConflict] = useState(false);

	// Inn components
	const innComponents = [
		{ id: 'UserForm', name: 'User Form', type: 'input' },
		{
			id: 'ValidationService',
			name: 'Validation Service',
			type: 'service',
		},
		{ id: 'APIClient', name: 'API Client', type: 'network' },
		{ id: 'StateManager', name: 'State Manager', type: 'state' },
		{ id: 'ErrorHandler', name: 'Error Handler', type: 'error' },
	];

	// Simulate component interaction
	const handleComponentClick = (component) => {
		if (selectedComponents.length === 0) {
			setSelectedComponents([component]);
		} else if (selectedComponents.length === 1) {
			const [first] = selectedComponents;
			connectComponents(first.id, component.id);

			// Test the connection
			addIntegrationTest({
				id: Date.now(),
				name: `${first.name} + ${component.name} Integration`,
				status: Math.random() > 0.3 ? 'pass' : 'fail',
				type: Math.random() > 0.7 ? 'state-conflict' : 'normal',
			});

			setSelectedComponents([]);

			// Sometimes show conflicts
			if (Math.random() > 0.7) {
				setShowConflict(true);
			}
		}
	};

	return (
		<div className='chapter'>
			<ChapterIntro chapterNumber={1} title={`Where Components Meet`} />

			<StorySection
				paragraphs={[
					`The Integration Inn was where components from different parts of the kingdom came together. A warm, welcoming place where formerly isolated components learned to work in harmony.`,
					<>
						<strong>Innkeeper Cypress</strong> welcomed them warmly,
						his weathered face showing years of experience.
						"Individual components may work perfectly alone, but put
						them together..." He gestured to the bar where two
						components were already in conflict.
					</>,
					`As if on cue, a Form component and a Validation service began spawning integration bugs - miscommunication errors flying between them like angry sparks. "This is why we need integration testing," Cypress sighed.`,
					<>
						<strong>Aria</strong> watched with interest. "I've
						mastered unit tests and debugging, but this is
						different. These components work fine in isolation!"
					</>,
				]}
			/>

			<div className='interactive-section'>
				<h3 className='section-title'>The Integration Inn Main Hall</h3>

				<div className='integration-inn'>
					<h4>Component Gathering Place</h4>
					<p>Click two components to see how they interact!</p>

					<div className='meeting-hall'>
						{innComponents.map((component) => (
							<div
								key={component.id}
								className={`component-seat ${
									selectedComponents.find(
										(c) => c.id === component.id
									)
										? 'selected'
										: ''
								} ${
									connectedComponents.find((conn) =>
										conn.includes(component.id)
									)
										? 'connected'
										: ''
								}`}
								onClick={() => handleComponentClick(component)}>
								<div className='component-icon'>
									{component.type === 'input' && '📝'}
									{component.type === 'service' && '⚙️'}
									{component.type === 'network' && '🌐'}
									{component.type === 'state' && '💾'}
									{component.type === 'error' && '🛡️'}
								</div>
								<div>{component.name}</div>
							</div>
						))}
					</div>

					{selectedComponents.length === 1 && (
						<p
							style={{
								textAlign: 'center',
								color: '#3498db',
								marginTop: '20px',
							}}>
							Selected: {selectedComponents[0].name} - Choose
							another to test integration
						</p>
					)}
				</div>

				{showConflict && (
					<div className='conflict-zone'>
						<div className='conflict-indicator'>
							Conflict Detected!
						</div>
						<h4>Integration Conflict</h4>
						<div className='conflict-item'>
							<span>
								State synchronization issue between components
							</span>
							<button
								className='resolve-button'
								onClick={() => setShowConflict(false)}>
								Resolve
							</button>
						</div>
						<p
							style={{
								fontSize: '0.9em',
								color: '#666',
								marginTop: '10px',
							}}>
							This happens when components have different
							expectations about shared state or communication
							protocols.
						</p>
					</div>
				)}

				<div className='harmony-meter'>
					<h4>Inn Harmony Level</h4>
					<div className='harmony-bar'>
						<div
							className='harmony-fill'
							style={{
								width: `${Math.min(harmonyLevel, 100)}%`,
							}}>
							<span className='harmony-percentage'>
								{harmonyLevel}%
							</span>
						</div>
					</div>
					<p>
						Connect more components successfully to increase
						harmony!
					</p>
				</div>
			</div>

			<div className='code-section'>
				<div className='code-header'>
					<span className='code-title'>
						Integration Testing Fundamentals
					</span>
					<div className='code-actions'>
						<button
							onClick={() =>
								addIntegrationTest({
									name: 'Manual Test',
									status: 'pass',
									type: 'normal',
								})
							}>
							Run Integration Test
						</button>
					</div>
				</div>
				<CodeExample
					title={`Integration Testing Fundamentals`}
					discoveredBy={`Transcribed by Aria`}
					code={`// Component Integration Testing
// Test how components work together, not in isolation

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Integration Test: Form + Validation + API
describe('User Registration Flow', () => {
  test('complete form submission with validation', async () => {
    // Render multiple integrated components
    render(
      <StateProvider>
        <UserForm 
          validationService={ValidationService}
          apiClient={APIClient}
          onError={ErrorHandler}
        />
      </StateProvider>
    );
    
    // User interactions
    await userEvent.type(
      screen.getByLabelText(/username/i), 
      'AriaTheGuide'
    );
    await userEvent.type(
      screen.getByLabelText(/email/i), 
      'aria@integration.inn'
    );
    await userEvent.type(
      screen.getByLabelText(/password/i), 
      'SecurePass123!'
    );
    
    // Submit triggers multiple component interactions
    await userEvent.click(screen.getByRole('button', { name: /submit/i }));
    
    // Wait for async operations (validation + API call)
    await waitFor(() => {
      expect(screen.getByText(/registration successful/i)).toBeInTheDocument();
    });
    
    // Verify state was updated correctly
    expect(mockStateManager.getUser()).toEqual({
      username: 'AriaTheGuide',
      email: 'aria@integration.inn'
    });
  });
  
  test('handles validation errors across components', async () => {
    render(<IntegratedForm />);
    
    // Submit without filling required fields
    await userEvent.click(screen.getByRole('button', { name: /submit/i }));
    
    // Validation service should communicate with form
    expect(screen.getByText(/username is required/i)).toBeInTheDocument();
    
    // Error handler should be triggered
    expect(ErrorHandler.logError).toHaveBeenCalledWith({
      type: 'VALIDATION_ERROR',
      fields: ['username', 'email', 'password']
    });
  });
});

// Testing Component Communication
describe('Component Message Passing', () => {
  test('parent receives data from child components', async () => {
    const handleDataUpdate = jest.fn();
    
    render(
      <ParentDashboard onDataUpdate={handleDataUpdate}>
        <DataInput />
        <DataProcessor />
        <DataDisplay />
      </ParentDashboard>
    );
    
    // Interact with child component
    await userEvent.type(screen.getByRole('textbox'), 'test data');
    await userEvent.click(screen.getByText(/process/i));
    
    // Verify data flowed through all components
    expect(handleDataUpdate).toHaveBeenCalledWith({
      raw: 'test data',
      processed: 'TEST DATA',
      displayed: true
    });
  });
});`}
				/>
				<div className='code-tooltip'>
					<strong>Cypress's Wisdom:</strong> "See how integration
					tests verify the entire flow? Unit tests check if a wheel
					spins. Integration tests check if the whole cart moves
					forward when you push it."
				</div>
			</div>

			<ChapterSummary
				characterIntros={[
					{
						name: `Innkeeper Cypress`,
						description: `Master of component harmony and integration testing. His philosophy: "A component alone is like a musician practicing scales. Put them in an orchestra, and suddenly you need a conductor. Integration tests are that conductor."`,
					},
				]}
				lessonInsight={{
					title: `The Integration Lesson:`,
					content: (
						<>
							<p>
								Integration testing bridges the gap between unit
								tests and end-to-end tests. While unit tests
								verify components in isolation, integration
								tests ensure they play nicely together. Like
								musicians in an orchestra, each component might
								sound perfect alone, but the real magic happens
								when they harmonize.
							</p>
							<p>
								The key insight: Integration bugs often arise
								from assumptions. Component A assumes Component
								B will send data in a certain format. Component
								B assumes Component A will handle errors.
								Integration tests verify these assumptions hold
								true.
							</p>
						</>
					),
				}}
				reflectionQuestions={[
					`Why do components that work perfectly in unit tests fail when integrated? Consider how isolation removes complexity but also removes real-world interactions. What assumptions might your components be making about each other?`,
					`How is integration testing different from end-to-end testing? Think about the scope and speed trade-offs. Integration tests are faster than E2E but test more than units. Where's the sweet spot for your application?`,
				]}
				journalEntry={{
					title: `Aria's Journal - Day 31 (Morning)`,
					content: `The Integration Inn - where components learn to work in harmony! Innkeeper Cypress welcomed me warmly. At the bar, a Form component and Validation service were already spawning integration bugs - miscommunication errors flying between them! I learned that components work fine in isolation but conflict when integrated. The Inn has five component types: User Form (📝 input), Validation Service (⚙️ service), API Client (🌐 network), State Manager (💾 state), and Error Handler (🛡️ error). The Harmony Meter tracks successful connections. Cypress's wisdom: "A component alone is like a musician practicing scales. Put them in an orchestra, and suddenly you need a conductor."`,
				}}
			/>
		</div>
	);
};

export default ChapterOne;
