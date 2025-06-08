import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const ChapterTwo = () => {
	const {
		mockServices,
		createMockService,
		addIntegrationTest,
		harmonyLevel
	} = useOutletContext();

	const [activeMocks, setActiveMocks] = useState([]);
	const [mockCreationMode, setMockCreationMode] = useState(false);
	const [selectedService, setSelectedService] = useState(null);

	// Available services to mock
	const externalServices = [
		{ 
			id: 'userAPI', 
			name: 'User API', 
			icon: '👤',
			realResponse: { status: 'unknown', data: null },
			mockResponse: { status: 200, data: { id: 1, name: 'Test User' } }
		},
		{ 
			id: 'paymentGateway', 
			name: 'Payment Gateway', 
			icon: '💳',
			realResponse: { status: 'timeout', error: 'Network error' },
			mockResponse: { status: 200, success: true, transactionId: 'MOCK-123' }
		},
		{ 
			id: 'emailService', 
			name: 'Email Service', 
			icon: '📧',
			realResponse: { status: 'rate-limited' },
			mockResponse: { status: 200, sent: true, messageId: 'msg-456' }
		},
		{ 
			id: 'analyticsTracker', 
			name: 'Analytics Tracker', 
			icon: '📊',
			realResponse: { status: 'blocked-by-adblocker' },
			mockResponse: { status: 200, tracked: true }
		}
	];

	const createMock = (service) => {
		createMockService(service.id, service.mockResponse);
		setActiveMocks([...activeMocks, service.id]);
		addIntegrationTest({
			id: Date.now(),
			name: `${service.name} Mock Test`,
			status: 'pass',
			type: 'mock'
		});
	};

	const toggleMockCreation = () => {
		setMockCreationMode(!mockCreationMode);
		setSelectedService(null);
	};

	return (
		<div className='chapter'>
			<h2 className='chapter-title'>
				Chapter 2: The Mock Service
			</h2>

			<div className='chapter-bridge'>
				With components now cooperating, it was time to handle external dependencies...
			</div>

			<div className='story-section'>
				<p className='story-paragraph'>
					<strong>Cypress</strong> led Aria to a special room in the inn - the Mock 
					Service Chamber. "Real services are unreliable guests," he explained. "They 
					arrive late, speak different languages, or don't show up at all."
				</p>

				<p className='story-paragraph'>
					The room was filled with magical mirrors, each reflecting a different 
					service. "These are mock services - fake versions of external dependencies. 
					They look and act like the real thing, but they're completely under our 
					control."
				</p>

				<p className='story-paragraph'>
					<strong>Aria</strong> examined the mirrors closely. "Like illusion magic," 
					she mused, "making components believe they're talking to real services when 
					they're actually talking to our controlled versions."
				</p>

				<p className='story-paragraph'>
					<strong>Debuggora</strong> hooted approvingly from her perch: "Mocking 
					isolates problems. If the test fails with a mock, you know it's your code, 
					not the external service causing issues."
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>Mock Service Creation Chamber</h3>
				
				<div className='mock-service-bar'>
					<h4>
						<span className='service-icon'>🪞</span>
						External Service Mocking
					</h4>
					
					<button 
						className='mock-button'
						onClick={toggleMockCreation}>
						{mockCreationMode ? 'Exit Mock Mode' : 'Create Mock Services'}
					</button>
					
					<div className='mock-services-list'>
						{externalServices.map(service => (
							<div 
								key={service.id}
								className={`mock-service-card ${activeMocks.includes(service.id) ? 'active' : ''}`}
								onClick={() => mockCreationMode && setSelectedService(service)}>
								<div style={{ fontSize: '30px', marginBottom: '10px' }}>{service.icon}</div>
								<div className='service-name'>{service.name}</div>
								<div className='service-status'>
									{activeMocks.includes(service.id) ? '✓ Mocked' : 'Real Service'}
								</div>
							</div>
						))}
					</div>
				</div>

				{selectedService && mockCreationMode && (
					<div className='mock-workshop'>
						<h4>Configure Mock: {selectedService.name}</h4>
						
						<div className='mock-comparison'>
							<div className='real-service'>
								<h5>Real Service Response:</h5>
								<div className='mock-template'>
									<pre>{JSON.stringify(selectedService.realResponse, null, 2)}</pre>
								</div>
							</div>
							
							<div className='mock-service'>
								<h5>Mock Service Response:</h5>
								<div className='mock-template'>
									<pre>{JSON.stringify(selectedService.mockResponse, null, 2)}</pre>
								</div>
							</div>
						</div>
						
						<div className='mock-controls'>
							<button 
								className='mock-button'
								onClick={() => createMock(selectedService)}>
								Activate Mock
							</button>
							<button 
								className='mock-button'
								onClick={() => setSelectedService(null)}>
								Cancel
							</button>
						</div>
					</div>
				)}

				{Object.keys(mockServices).length > 0 && (
					<div className='test-suite-panel'>
						<h4>Active Mock Services</h4>
						<div className='test-category'>
							<div className='test-category-header'>Mocked Dependencies</div>
							{Object.entries(mockServices).map(([service, response]) => (
								<div key={service} className='integration-test'>
									<span className='test-name'>{service}</span>
									<span className='test-status pass'>Active</span>
								</div>
							))}
						</div>
					</div>
				)}
			</div>

			<div className='code-section'>
				<div className='code-header'>
					<span className='code-title'>Mock Service Mastery</span>
					<div className='code-actions'>
						<button onClick={() => createMockService('demo', { status: 200 })}>
							Create Demo Mock
						</button>
					</div>
				</div>
				<div className='code-example'>
					<pre>{`// Creating Test Doubles - The Art of Mocking

// 1. API Mocking Strategies
// Mock at the function level
const mockFetch = jest.fn();
global.fetch = mockFetch;

mockFetch.mockResolvedValueOnce({
  ok: true,
  json: async () => ({ 
    user: { id: 1, name: 'Aria', role: 'Guide' } 
  })
});

// Mock at the module level
jest.mock('../api/userService', () => ({
  getUser: jest.fn().mockResolvedValue({
    id: 1,
    name: 'Aria',
    kingdom: 'React'
  }),
  updateUser: jest.fn().mockResolvedValue({ success: true })
}));

// 2. Service Worker Mocking (MSW)
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  // Mock User API
  rest.get('/api/users/:id', (req, res, ctx) => {
    const { id } = req.params;
    return res(
      ctx.status(200),
      ctx.json({
        id,
        name: 'Test User',
        email: 'test@integration.inn'
      })
    );
  }),
  
  // Mock Payment Gateway
  rest.post('/api/payment', async (req, res, ctx) => {
    const { amount } = await req.json();
    
    // Simulate different responses
    if (amount > 1000) {
      return res(
        ctx.status(400),
        ctx.json({ error: 'Amount exceeds limit' })
      );
    }
    
    return res(
      ctx.status(200),
      ctx.json({
        transactionId: 'mock-tx-123',
        status: 'completed',
        amount
      })
    );
  })
);

// Start server before tests
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// 3. Timer and Browser API Mocking
describe('Component with Timers', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  
  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });
  
  test('debounced search works correctly', async () => {
    render(<SearchComponent />);
    
    const input = screen.getByRole('searchbox');
    await userEvent.type(input, 'test query');
    
    // Fast-forward timers
    act(() => {
      jest.advanceTimersByTime(500);
    });
    
    expect(mockSearchAPI).toHaveBeenCalledWith('test query');
  });
});

// 4. Module Mocking Patterns
// Partial mocking - keep some real implementation
jest.mock('../utils/validation', () => {
  const actual = jest.requireActual('../utils/validation');
  return {
    ...actual,
    validateEmail: jest.fn().mockReturnValue(true), // Mock this
    validatePhone: actual.validatePhone // Keep real implementation
  };
});

// 5. Mock Verification
test('integration with mocked services', async () => {
  const mockAnalytics = {
    track: jest.fn(),
    identify: jest.fn()
  };
  
  render(
    <AnalyticsProvider client={mockAnalytics}>
      <UserDashboard />
    </AnalyticsProvider>
  );
  
  // User action
  await userEvent.click(screen.getByText(/upgrade plan/i));
  
  // Verify mock was called correctly
  expect(mockAnalytics.track).toHaveBeenCalledWith('Plan Upgrade Clicked', {
    currentPlan: 'basic',
    targetPlan: 'premium',
    userId: expect.any(String)
  });
  
  // Verify call order
  expect(mockAnalytics.identify).toHaveBeenCalledBefore(
    mockAnalytics.track
  );
});`}</pre>
				</div>
				<div className='code-tooltip'>
					<strong>Mock Creation Wisdom:</strong> "Mocks should be simple and focused. 
					Don't try to replicate the entire service - just the parts your test needs. 
					Remember: mocks are lies that help us find the truth about our code."
				</div>
			</div>

			<div className='lesson-insight'>
				<h3>The Mocking Lesson:</h3>
				<p>
					Mocking is about control and isolation. By replacing external dependencies 
					with predictable doubles, you can test your code's behavior without worrying 
					about network issues, rate limits, or service downtime. It's like practicing 
					a play with understudies - you know exactly what they'll say and when.
				</p>
				<p>
					The art of mocking lies in balance. Mock too little, and your tests become 
					flaky and slow. Mock too much, and your tests might pass while real 
					integration fails. The key is mocking at the right boundaries - typically 
					external services, not your own code.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on Mock Services</h3>
				<p>
					<strong>When should you use mocks versus real services?</strong> Consider 
					the trade-offs: speed vs realism, control vs authenticity. How do you 
					ensure your mocks stay in sync with real service behavior?
				</p>
				<p>
					<strong>What are the dangers of over-mocking?</strong> Think about tests 
					that pass with mocks but fail in production. How can you balance isolation 
					with integration confidence?
				</p>
			</div>

			<div className='chapter-ending'>
				<p>
					As the mock services hummed with activity, Cypress nodded approvingly. 
					"You've learned to create controlled environments for testing. Tomorrow, 
					we celebrate with the Integration Feast - where all components work together 
					in perfect harmony. The ultimate integration test awaits..."
				</p>
			</div>
		</div>
	);
};

export default ChapterTwo;