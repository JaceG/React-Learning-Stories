import { useState } from 'react';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import StorySection from '../../../../../components/content/StorySection';

const ChapterThree = () => {
	const [consumerCount, setConsumerCount] = useState(0);
	const [optimizationEnabled, setOptimizationEnabled] = useState(false);

	const toggleConsumer = () =>
		setConsumerCount((count) => (count === 0 ? 3 : 0));
	const toggleOptimization = () => setOptimizationEnabled((prev) => !prev);

	return (
		<div className='chapter'>
		<ChapterIntro
			chapterNumber={3}
			title="The Thread Optimization"
			bridge="As Aria mastered the basics of Context, Contextia led her to the highest tower of the Grand Hall, where ancient scrolls contained the secrets of Context optimization."
		/>

		<StorySection
			paragraphs={[
				<>"Aria," Contextia began, her expression serious, "with great power comes great responsibility. Context threads are magical, but they have a cost. Every time a Provider's value changes, <strong>all</strong> connected consumers re-render."</>,
				`Binary's lights dimmed slightly. "All of them? Even if they don't care about the part that changed?"`,
				`"Precisely the problem," Contextia nodded. "Watch this demonstration. When Context is unoptimized, a single change creates a cascade of unnecessary updates throughout the network."`
			]}
		/>

		<div className='kingdom-illustration advanced'>
					<div className='optimization-castle'>
						<div className='castle-banner'>
							Context Optimization Chamber
						</div>
						<div className='castle-core'>
							<div
								className={`optimization-orb ${
									optimizationEnabled ? 'active' : 'inactive'
								}`}
								onClick={toggleOptimization}>
								{optimizationEnabled
									? 'Optimized'
									: 'Unoptimized'}
							</div>
						</div>
						<div className='kingdom-stats'>
							<div className='stat'>
								Active Consumers: {consumerCount}
							</div>
							<div className='stat'>
								Optimization:{' '}
								{optimizationEnabled ? 'Enabled' : 'Disabled'}
							</div>
						</div>
					</div>
					<div className='kingdom-villages'>
						{Array(consumerCount)
							.fill()
							.map((_, i) => (
								<div
									key={i}
									className={`village-consumer ${
										optimizationEnabled ? 'optimized' : ''
									}`}>
									Consumer {i + 1}
								</div>
							))}
						<button
							className='add-consumer'
							onClick={toggleConsumer}>
							{consumerCount > 0 ? 'Remove' : 'Add'} Consumers
						</button>
				</div>
			</div>

		<StorySection
			paragraphs={[
				`"See how in the unoptimized state, all consumers flash when any value changes?" Contextia explained. "But with optimization, only the consumers that actually use the changed data re-render. Let me show you the techniques."`
			]}
		/>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: Optimization Techniques
				</h3>
				<InstructionBox character="Contextia reveals two scrolls.">
					"Toggle the optimization orb above to see the difference. Add 
					consumers to observe how optimization prevents the cascade of 
					unnecessary re-renders!"
				</InstructionBox>

				<div className='optimization-comparison'>
					<div className='comparison-item'>
						<h4>❌ Unoptimized: Single Monolithic Context</h4>
						<pre className='comparison-code'>
							{`// Everything bundled together - BAD!
const AppContext = React.createContext();

function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState([]);
  
  // Every change causes ALL consumers to re-render!
  const value = {
    user,
    theme,
    notifications,
    login: (userData) => setUser(userData),
    logout: () => setUser(null),
    toggleTheme: () => setTheme(t => t === 'light' ? 'dark' : 'light'),
    addNotification: (msg) => setNotifications([...notifications, msg])
  };
  
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}`}
						</pre>
						<div className='consequence'>
							<strong>Problem:</strong> Adding a notification causes 
							theme components to re-render unnecessarily!
						</div>
					</div>
					<div className='comparison-item'>
						<h4>✅ Optimized: Split & Memoized Contexts</h4>
						<pre className='comparison-code'>
							{`// Split by concern - GOOD!
const UserContext = React.createContext();
const ThemeContext = React.createContext();
const NotificationContext = React.createContext();

// Each provider handles its own domain
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  // Memoize to prevent object recreation
  const value = useMemo(() => ({
    theme,
    toggleTheme: () => setTheme(t => t === 'light' ? 'dark' : 'light')
  }), [theme]);
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// Compose providers cleanly
function AppProviders({ children }) {
  return (
    <UserProvider>
      <ThemeProvider>
        <NotificationProvider>
          {children}
        </NotificationProvider>
      </ThemeProvider>
    </UserProvider>
  );
}`}
						</pre>
						<div className='consequence'>
							<strong>Benefit:</strong> Components only re-render when 
							their specific context changes!
						</div>
					</div>
				</div>
			</div>

			<div className='advanced-patterns'>
				<h3>Contextia's Advanced Patterns:</h3>

				<div className='pattern-card'>
					<h4>1. Context Selectors Pattern</h4>
					<pre className='pattern-code'>
						{`// Custom hook with selector for fine-grained subscriptions
function useSelectedContext(selector) {
  const context = useContext(AppContext);
  
  // Only re-render when selected value changes
  return useMemo(() => selector(context), [
    selector(context)
  ]);
}

// Component only re-renders on theme changes
function ThemeDisplay() {
  const theme = useSelectedContext(state => state.theme);
  
  return <div className={theme}>Theme: {theme}</div>;
}`}
					</pre>
					<p>
						This pattern lets components subscribe to specific slices of 
						context, reducing unnecessary renders.
					</p>
				</div>

				<div className='pattern-card'>
					<h4>2. Provider Composition Pattern</h4>
					<pre className='pattern-code'>
						{`// Avoid "Provider Hell" with composition
const providers = [
  ThemeProvider,
  UserProvider,
  NotificationProvider
];

function ComposeProviders({ providers, children }) {
  return providers.reduceRight(
    (children, Provider) => <Provider>{children}</Provider>,
    children
  );
}

// Clean usage
function App() {
  return (
    <ComposeProviders providers={providers}>
      <MainApp />
    </ComposeProviders>
  );
}`}
					</pre>
					<p>
						This eliminates deeply nested providers while maintaining 
						separation of concerns.
					</p>
				</div>
			</div>

			<div className='character-guidance'>
				<h3>Contextia's Optimization Checklist:</h3>
				<ol>
					<li>
						<strong>Split contexts by update frequency</strong> - Separate 
						frequently changing data from stable data
					</li>
					<li>
						<strong>Memoize context values</strong> - Prevent object 
						recreation on every render
						<pre className='technique-code'>
							{`const value = useMemo(() => ({
  user,
  login,
  logout
}), [user]); // Only recreate when user changes`}
						</pre>
					</li>
					<li>
						<strong>Use React.memo on consumers</strong> - Skip re-renders 
						when props haven't changed
					</li>
					<li>
						<strong>Keep state close to usage</strong> - Not everything 
						needs to be in Context
					</li>
					<li>
						<strong>Consider alternatives</strong> - Sometimes composition 
						or props are better than Context
					</li>
				</ol>
			</div>

			<div className='character-guidance'>
				<h3>When to Apply These Optimizations:</h3>
				<ul>
					<li>Large applications with many Context consumers</li>
					<li>When profiling reveals Context-related performance issues</li>
					<li>Contexts containing frequently updating data</li>
					<li>Components that only need small parts of context data</li>
				</ul>
				<p className='warning'>
					⚠️ Remember: <em>"Premature optimization is the root of all evil."</em> 
					Start simple, measure performance, then optimize where needed.
				</p>
			</div>

			<ChapterSummary
				lessonInsight={{
					title: "Contextia's Final Wisdom:",
					content: "Context is powerful, but with great power comes the need for wisdom. In small applications, a single Context might suffice. But as your application grows, optimization becomes crucial. Split contexts by domain and update frequency, memoize values, and use React.memo strategically. Most importantly, measure before optimizing - React DevTools Profiler is your friend. Remember, the goal is not just performance, but also maintainable, understandable code."
				}}
				reflectionQuestions={[
					'How does the metaphor of organizing threads into separate channels help you understand Context optimization?',
					'What signals would tell you it\'s time to split a Context in your own applications?'
				]}
				journalEntry={{
					title: "Aria's Journal - Day 10 (Evening)",
					content: "Context optimization is crucial for large applications! The key insights: split contexts by how often they change, memoize context values to prevent recreation, and use React.memo on consumer components. It's like organizing the thread network into separate channels - each carrying only related data to interested consumers. No more wasteful re-renders!"
				}}
				chapterEnding={[
					"As the day drew to a close, Contextia handed Aria a crystal containing all the Context patterns they'd studied. \"You've learned well, young developer. Context is now yours to wield wisely.\"",
					"Binary buzzed with excitement. \"Tomorrow we explore the final frontier of state management - the grand unification of all these techniques!\"",
					"Aria carefully stored the crystal in her satchel, her mind racing with possibilities. She had learned to create threads that connected components across vast distances, to make those threads carry living state, and to optimize them for performance. Tomorrow would bring the ultimate challenge - combining everything into a complete state management strategy."
				]}
			/>
		</div>
	);
};

export default ChapterThree;