const ChapterThree = ({
	consumerCount,
	toggleConsumer,
	optimizationEnabled,
	toggleOptimization,
}) => {
	return (
		<div className='chapter'>
			<h2 className='chapter-title'>
				Chapter 3: The Great Context Optimization
			</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					As the kingdom of Reactopia flourished, its Context system
					became the backbone of communication. But with growth came
					challenges. The royal messengers were overwhelmed, carrying
					updates to every corner of the realm whenever the smallest
					decree changed. King <strong>Context</strong> sought wisdom
					from the elder optimization wizards to make his kingdom more
					efficient.
				</p>

				<div className='kingdom-illustration advanced'>
					<div className='optimization-castle'>
						<div className='castle-banner'>
							Optimized Context Kingdom
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
							{consumerCount > 0 ? 'Remove' : 'Add'} Consumer
						</button>
					</div>
				</div>

				<p className='story-paragraph'>
					"Your majesty," advised the chief architect, "we must
					restructure the kingdom. By splitting your decrees into
					smaller, focused proclamations and using the sacred
					optimization techniques of memoization, we can ensure
					updates reach only those who truly need them."
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: Context Performance Optimization
				</h3>
				<div className='instruction-box'>
					<p>
						<strong>
							Toggle the optimization orb above to see how proper
							Context optimization prevents unnecessary
							re-renders. Add consumers to see the difference in
							performance between optimized and unoptimized
							approaches.
						</strong>
					</p>
				</div>

				<div className='optimization-comparison'>
					<div className='comparison-item'>
						<h4>Unoptimized Context</h4>
						<pre className='comparison-code'>
							{`// Everything in a single context
const AppContext = React.createContext();

function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState([]);
  
  // Every value change causes ALL consumers to re-render
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
							<strong>Consequence:</strong> When any part of the
							context value changes (e.g., adding a notification),{' '}
							<em>all components</em> using this context
							re-render, even if they only use the theme.
						</div>
					</div>
					<div className='comparison-item'>
						<h4>Optimized Context</h4>
						<pre className='comparison-code'>
							{`// Split contexts by concern
const UserContext = React.createContext();
const ThemeContext = React.createContext();
const NotificationContext = React.createContext();

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
}

// Each provider is responsible for its own domain
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  // useMemo prevents unnecessary re-renders
  const value = useMemo(() => ({
    theme,
    toggleTheme: () => setTheme(t => t === 'light' ? 'dark' : 'light')
  }), [theme]);
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}`}
						</pre>
						<div className='consequence'>
							<strong>Benefit:</strong> Components only re-render
							when the specific context they consume changes.
							Theme components won't re-render when notifications
							change.
						</div>
					</div>
				</div>
			</div>

			<div className='advanced-patterns'>
				<h3>Advanced Context Patterns:</h3>

				<div className='pattern-card'>
					<h4>1. Context Selectors</h4>
					<pre className='pattern-code'>
						{`// Create a custom hook with a selector
function useSelectedContext(selector) {
  const context = useContext(AppContext);
  
  // Only update when the selected slice changes
  return useMemo(() => selector(context), [
    selector(context)
  ]);
}

// In a component - only re-renders when theme changes
function ThemeDisplay() {
  // Only subscribe to theme changes
  const theme = useSelectedContext(state => state.theme);
  
  return <div className={theme}>Theme: {theme}</div>;
}`}
					</pre>
					<p>
						This pattern allows components to subscribe only to the
						specific parts of context they need.
					</p>
				</div>

				<div className='pattern-card'>
					<h4>2. Context Module Pattern</h4>
					<pre className='pattern-code'>
						{`// auth-context.js
const AuthContext = React.createContext();

// Actions
const login = (dispatch, credentials) => {
  dispatch({ type: 'LOGIN_START' });
  return authAPI.login(credentials)
    .then(user => {
      dispatch({ type: 'LOGIN_SUCCESS', user });
      return user;
    })
    .catch(error => {
      dispatch({ type: 'LOGIN_FAIL', error });
      return Promise.reject(error);
    });
};

// Provider encapsulates all auth state and logic
function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  
  // Create a stable actions object with useCallback
  const actions = useMemo(() => ({
    login: (credentials) => login(dispatch, credentials),
    logout: () => dispatch({ type: 'LOGOUT' })
  }), []);
  
  const value = useMemo(() => ({ ...state, ...actions }), [state, actions]);
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}`}
					</pre>
					<p>
						This pattern combines Context with a reducer and
						memoized actions for a clean state management solution.
					</p>
				</div>

				<div className='pattern-card'>
					<h4>3. Providers Composition</h4>
					<pre className='pattern-code'>
						{`// Compose multiple contexts without nesting
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

// Usage
function App() {
  return (
    <ComposeProviders providers={providers}>
      <MainApp />
    </ComposeProviders>
  );
}`}
					</pre>
					<p>
						This avoids the "Provider hell" of deeply nested context
						providers.
					</p>
				</div>
			</div>

			<div className='optimization-techniques'>
				<h3>Context Optimization Techniques:</h3>
				<ol>
					<li>
						<strong>Split contexts by domain</strong> - Create
						separate contexts for different concerns (auth, theme,
						etc.)
					</li>
					<li>
						<strong>Memoize context values</strong> - Use useMemo to
						prevent unnecessary re-renders
						<pre className='technique-code'>
							{`// Memoize the context value
const value = useMemo(() => ({
  user,
  login,
  logout
}), [user]); // Only recreate when user changes`}
						</pre>
					</li>
					<li>
						<strong>Memoize expensive child components</strong> -
						Use React.memo for context consumers
						<pre className='technique-code'>
							{`// Memoize the consumer component
const UserProfile = React.memo(function UserProfile({ onEdit }) {
  const { user } = useUserContext();
  return (
    <div>
      <h2>{user.name}</h2>
      <button onClick={onEdit}>Edit Profile</button>
    </div>
  );
});`}
						</pre>
					</li>
					<li>
						<strong>Use state colocation</strong> - Keep state as
						close as possible to where it's used
					</li>
					<li>
						<strong>Implement context selectors</strong> - Let
						components subscribe to specific parts of context
					</li>
				</ol>
			</div>

			<div className='when-to-optimize'>
				<h3>When to Optimize Context:</h3>
				<ul>
					<li>
						<strong>Large-scale applications</strong> with many
						context consumers
					</li>
					<li>
						When you notice <strong>performance issues</strong>{' '}
						related to unnecessary re-renders
					</li>
					<li>
						When your context value contains{' '}
						<strong>frequently changing data</strong>
					</li>
					<li>
						When components only need <strong>small subsets</strong>{' '}
						of the context value
					</li>
				</ul>
				<p>
					Remember:{' '}
					<em>Premature optimization is the root of all evil</em>.
					Start with the simplest implementation and optimize only
					when needed.
				</p>
			</div>

			<div className='context-alternatives'>
				<h3>When Context Might Not Be the Answer:</h3>
				<div className='alternatives-table'>
					<div className='alternative-row'>
						<div className='alternative-name'>
							Component Composition
						</div>
						<div className='alternative-description'>
							Pass components as props instead of data. This
							"inversion of control" can often eliminate the need
							for context.
						</div>
					</div>
					<div className='alternative-row'>
						<div className='alternative-name'>
							Atomic State Management
						</div>
						<div className='alternative-description'>
							Libraries like Recoil or Jotai allow for
							fine-grained subscriptions to atomic pieces of
							state, which can be more performant than context for
							certain use cases.
						</div>
					</div>
					<div className='alternative-row'>
						<div className='alternative-name'>
							State Management Libraries
						</div>
						<div className='alternative-description'>
							For truly complex state with many interactions,
							dedicated state management libraries like Redux
							(with RTK) or MobX might offer better performance
							and developer experience.
						</div>
					</div>
				</div>
			</div>

			<div className='lesson-insight'>
				<h3>The Context Optimization Lesson:</h3>
				<p>
					Context is a powerful way to share state across your React
					application, but it comes with performance considerations.
					React re-renders all components that consume a context
					whenever the context value changes. This can lead to
					unnecessary renders when components only need a small piece
					of the context data.
				</p>
				<p>
					Optimizing Context involves several strategies: splitting
					contexts by domain, memoizing context values with useMemo,
					implementing context selectors, and using React.memo for
					consumer components. These techniques allow you to maintain
					the convenience of Context while avoiding performance
					bottlenecks in larger applications.
				</p>
				<p>
					Remember that premature optimization should be avoided—start
					with the simplest implementation and measure performance
					before applying these optimization techniques.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					How does the story of optimizing the kingdom's communication
					system help you understand the performance challenges with
					Context in large React applications?
				</p>
				<p>
					In your own applications, how would you decide when to split
					a context into multiple smaller contexts versus when to keep
					everything in a single context?
				</p>
			</div>
		</div>
	);
};

export default ChapterThree;
