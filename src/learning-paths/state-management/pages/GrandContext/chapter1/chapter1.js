import { useState } from 'react';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';
import StorySection from '../../../../../components/content/StorySection';

const ChapterOne = () => {
	const [theme, setTheme] = useState('light');
	const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

	return (
		<div className={`chapter ${theme}`}>
			<ChapterIntro chapterNumber={1} title="The Context Keepers' Hall" />

			<StorySection
				paragraphs={[
					`The Grand Hall was breathtaking - a vast circular chamber with a domed ceiling covered in constellations of glowing threads. Each thread connected different points throughout the hall, creating an intricate web of light that pulsed with data.`,
					<>
						"Welcome, young Aria," came a gentle voice from the
						center of the hall. A tall figure in flowing robes
						approached, her hands gracefully tracing patterns in the
						air that made the threads glow brighter. "I am{' '}
						<strong>Contextia</strong>, Keeper of the Grand
						Context."
					</>,
					`Binary whistled in awe. "Look at all those connections! They bypass the normal prop chains entirely!"`,
				]}
			/>

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

			<StorySection
				paragraphs={[
					<>
						"You see," Contextia explained, gesturing to the glowing
						threads, "in the early days of React Kingdom, components
						had to pass messages through every single component in
						between - what we call 'prop drilling.' But Context
						allows us to create <strong>direct connections</strong>{' '}
						between any provider and its consumers, no matter how
						far apart they are!"
					</>,
					`Aria watched in fascination as data seemed to teleport along the threads. "It's like... magical portals for data!"`,
					`"Precisely!" Contextia smiled. "Let me show you how it works with a simple example - theme management for an entire application."`,
				]}
			/>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: The Theme Network
				</h3>
				<InstructionBox character='Contextia gestures to a control panel.'>
					"This controls the theme for the entire hall. Notice how
					changing it here instantly affects all connected components,
					without passing the theme through every level!"
				</InstructionBox>

				<div className='royal-controls'>
					<button className='royal-button' onClick={toggleTheme}>
						Activate {theme === 'light' ? 'Dark' : 'Light'} Theme
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

			<div className='story-section'>
				<p className='story-paragraph'>
					"The magic happens in three steps," Contextia explained,
					weaving glowing symbols in the air that formed into code.
				</p>
			</div>

			<CodeExample
				title='The Context Creation Ritual'
				discoveredBy='Grand Hall Archives'
				code={`// 1. Create a Context - the magical thread
const ThemeContext = React.createContext({
  theme: 'light',
  toggleTheme: () => {},
});

// 2. Create a Provider - the source of truth
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };
  
  // The value prop contains what flows through the threads
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Consume the Context - tap into the thread
function ThemeToggle() {
  // useContext hook connects to the thread
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
      <Header />     {/* Can access theme */}
      <MainContent /> {/* Can access theme */}
      <Footer />     {/* Can access theme */}
    </ThemeProvider>
  );
}`}
			/>

			<div className='character-guidance'>
				<h3>Contextia's Guidelines for Context Usage:</h3>
				<ul>
					<li>
						<strong>Global Application State:</strong> User
						authentication, themes, language preferences
					</li>
					<li>
						<strong>Deeply Nested Data Needs:</strong> When many
						components at different levels need the same data
					</li>
					<li>
						<strong>Avoiding Prop Drilling:</strong> When passing
						props through multiple levels becomes unwieldy
					</li>
					<li>
						<strong>Cross-Cutting Concerns:</strong> Features that
						affect many parts of your application
					</li>
				</ul>
			</div>

			<div className='common-patterns'>
				<h3>Advanced Context Patterns:</h3>
				<div className='pattern'>
					<h4>1. Multiple Contexts for Separation</h4>
					<pre className='pattern-code'>
						{`// Separate contexts for different concerns
const ThemeContext = React.createContext();
const UserContext = React.createContext();
const LanguageContext = React.createContext();

// Layer them in your app
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
					<h4>2. Context with useReducer</h4>
					<pre className='pattern-code'>
						{`// Combine Context with reducer for complex state
const AppContext = React.createContext();

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

			<ChapterSummary
				characterIntros={[
					{
						name: `Contextia`,
						description: `Keeper of the Grand Context in the vast circular hall covered with constellations of glowing threads. Her hands gracefully trace patterns in the air that make the threads glow brighter, connecting different points throughout the hall. "Context allows us to create direct connections between any provider and its consumers, no matter how far apart they are. It's like magical portals for data!"`,
					},
				]}
				lessonInsight={{
					title: "Contextia's Wisdom:",
					content:
						'Context is like creating a network of invisible threads throughout your component tree. Any component can tap into these threads to access shared data without prop drilling. But remember - Context is powerful but not always the answer. Use it for truly global data that many components need. For localized state, props are still your best friend. The key is knowing when each tool is most appropriate.',
				}}
				reflectionQuestions={[
					'How does the metaphor of "magical threads" help you visualize how Context connects providers and consumers?',
					'Can you think of data in your applications that would benefit from Context instead of prop drilling?',
				]}
				journalEntry={{
					title: "Aria's Journal - Day 10 (Morning)",
					content:
						"Context is incredible! It's like having a network of magical portals that can transport data directly to where it's needed. No more passing props through components that don't need them. Contextia showed me how a Provider broadcasts values and any Consumer can tap into that broadcast. It reminds me of how Binary can instantly share data with any component!",
				}}
			/>
		</div>
	);
};

export default ChapterOne;
