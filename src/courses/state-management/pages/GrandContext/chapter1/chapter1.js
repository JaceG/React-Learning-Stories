const ChapterOne = ({ theme, toggleTheme }) => {
	return (
		<div className={`chapter ${theme}`}>
			<h2 className='chapter-title'>
				Chapter 1: The Royal Decree of Context
			</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					In the grand kingdom of Reactopia, there was a wise ruler
					named <strong>Context</strong> who discovered an elegant
					solution to a common problem: how to share information
					across distant parts of the realm without passing messages
					through every village along the way.
				</p>

				<div className='kingdom-illustration'>
					<div className={`castle ${theme}`}>
						<div className='castle-flag'>Provider</div>
						<div className='castle-tower'>
							App (Provider)
							<div className='castle-window'>Theme: {theme}</div>
						</div>
						<div className='castle-body'>
							<div className='village'>
								<div className='house'>Header</div>
								<div className='house'>MainContent</div>
								<div className='house'>
									Sidebar
									<div className='house-window'>Consumer</div>
								</div>
								<div className='house'>
									Footer
									<div className='house-window'>Consumer</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<p className='story-paragraph'>
					"Hear ye, hear ye!" proclaimed King <strong>Context</strong>
					. "No longer shall information travel through every
					component in the hierarchy. Instead, I shall establish a
					direct connection between the royal court (the Provider) and
					any subject who needs to know (the Consumers)."
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: The Royal Theme Decree
				</h3>
				<div className='instruction-box'>
					<p>
						<strong>
							The king has proclaimed a kingdom-wide theme change!
							Click the button below to toggle between light and
							dark mode, and observe how components across the
							realm immediately receive the new theme without prop
							drilling.
						</strong>
					</p>
				</div>

				<div className='royal-controls'>
					<button className='royal-button' onClick={toggleTheme}>
						Royal Decree: Switch to{' '}
						{theme === 'light' ? 'Dark' : 'Light'} Theme
					</button>
				</div>

				<div className='kingdom-components'>
					<div className={`comp-tree ${theme}`}>
						<div className='comp-node provider'>
							App (Provider)
							<span className='context-value'>
								value={`{theme: "${theme}", toggleTheme}`}
							</span>
							<div className='comp-children'>
								<div className='comp-node'>
									Header
									<div className='comp-children'>
										<div className='comp-node'>Logo</div>
										<div className='comp-node consumer'>
											ThemeToggle (Consumer)
											<span className='using-context'>
												Using theme: "{theme}"
											</span>
										</div>
									</div>
								</div>
								<div className='comp-node'>
									Main Content
									<div className='comp-children'>
										<div className='comp-node'>
											Articles
										</div>
									</div>
								</div>
								<div className='comp-node consumer'>
									Footer (Consumer)
									<span className='using-context'>
										Using theme: "{theme}"
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='code-example'>
				<pre className='context-code'>
					{`// 1. Create a Context
const ThemeContext = React.createContext({
  theme: 'light',
  toggleTheme: () => {},
});

// 2. Create a Provider Component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };
  
  // The value prop contains what we want to share
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Consume the Context in a deeply nested component
function ThemeToggle() {
  // Use the useContext hook to access the context value
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  return (
    <button 
      className={\`theme-toggle \${theme}\`}
      onClick={toggleTheme}
    >
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
    </button>
  );
}

// 4. Wrap your app with the Provider
function App() {
  return (
    <ThemeProvider>
      <Header />
      <MainContent />
      <Footer />
    </ThemeProvider>
  );
}`}
				</pre>
			</div>

			<div className='when-to-use'>
				<h3>When to Use Context:</h3>
				<ul>
					<li>
						<strong>Global Data:</strong> User settings,
						authentication state, themes, or language preferences
					</li>
					<li>
						<strong>Deeply Nested Components:</strong> When many
						components need the same data
					</li>
					<li>
						<strong>Avoiding Prop Drilling:</strong> When passing
						props through many levels becomes cumbersome
					</li>
				</ul>
			</div>

			<div className='common-patterns'>
				<h3>Common Context Patterns:</h3>
				<div className='pattern'>
					<h4>1. Multiple Contexts</h4>
					<pre className='pattern-code'>
						{`// Separate contexts for different concerns
const ThemeContext = React.createContext();
const UserContext = React.createContext();
const LanguageContext = React.createContext();

function App() {
  return (
    <ThemeContext.Provider value={themeData}>
      <UserContext.Provider value={userData}>
        <LanguageContext.Provider value={languageData}>
          <MainContent />
        </LanguageContext.Provider>
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
}`}
					</pre>
				</div>
				<div className='pattern'>
					<h4>2. Context + Reducer</h4>
					<pre className='pattern-code'>
						{`const AppContext = React.createContext();

function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}`}
					</pre>
				</div>
			</div>

			<div className='lesson-insight'>
				<h3>The Context Lesson:</h3>
				<p>
					Context provides a way to pass data through the component
					tree without having to pass props down manually at every
					level. This is especially useful for global values like
					themes, user data, or language preferences.
				</p>
				<p>Context has three main parts:</p>
				<ul>
					<li>
						<strong>React.createContext()</strong>: Creates a
						Context object with a default value
					</li>
					<li>
						<strong>Context.Provider</strong>: Component that allows
						consuming components to subscribe to context changes
					</li>
					<li>
						<strong>useContext()</strong>: Hook that lets you read
						and subscribe to context from a functional component
					</li>
				</ul>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					How does the royal decree metaphor help you understand the
					concept of Context in React?
				</p>
				<p>
					What types of information in your applications might benefit
					from being shared via Context rather than props?
				</p>
			</div>
		</div>
	);
};

export default ChapterOne;
