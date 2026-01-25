import { useState } from 'react';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';

const ChapterTwo = () => {
	const [user, setUser] = useState(null);
	const login = (username, role) => setUser({ username, role });
	const logout = () => setUser(null);

	return (
		<div className='chapter'>
			<ChapterIntro
				chapterNumber={2}
				title="The Living Threads"
				bridge="Contextia led Aria to a more intricate section of the Grand Hall, where the threads pulsed with different colors and seemed to carry not just data, but also the ability to modify that data."
			/>

			<div className='story-section'>
				<p className='story-paragraph'>
					"What you've seen so far," Contextia explained, "is just the beginning. 
					Context threads can carry more than simple values - they can transport 
					<strong>living state</strong> that components can both read and modify."
				</p>

				<p className='story-paragraph'>
					Binary's circuits sparkled with interest. "So components don't just 
					receive data - they can send changes back through the same threads?"
				</p>

				<p className='story-paragraph'>
					"Exactly!" Contextia waved her hand, and a new set of threads appeared, 
					glowing with a golden light. "Watch as I demonstrate with a user 
					authentication system - one of the most common uses for Context in 
					real applications."
				</p>

				<div className='kingdom-illustration'>
					<div className='royal-palace'>
						<div className='palace-banner'>
							User Context Provider
						</div>
						<div className='throne-room'>
							<div className='throne'>
								<div className='user-avatar'>
									{user
										? user.username.charAt(0).toUpperCase()
										: '?'}
								</div>
								<div className='user-info'>
									{user ? (
										<>
											<div className='user-name'>
												{user.username}
											</div>
											<div className='user-role'>
												{user.role}
											</div>
										</>
									) : (
										<div className='no-user'>
											No Active User
										</div>
									)}
								</div>
							</div>
						</div>
						<div className='castle-gates'>
							<div className='gate-controls'>
								{user ? (
									<button
										className='gate-button logout'
										onClick={logout}>
										Disconnect User
									</button>
								) : (
									<button
										className='gate-button login'
										onClick={() =>
											login('Aria', 'apprentice')
										}>
										Connect as Aria
									</button>
								)}
							</div>
						</div>
					</div>
				</div>

				<p className='story-paragraph'>
					"See how the Provider doesn't just share the user state," Contextia 
					pointed to the glowing threads, "but also the functions to login and 
					logout. Any component connected to this thread can both read the 
					current user AND change it!"
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: The Authentication Network
				</h3>
				<InstructionBox character="Contextia gestures to the control panel.">
					"Try connecting and disconnecting as a user. Watch how every 
					component instantly knows about the change - and they all have 
					the power to trigger these changes themselves!"
				</InstructionBox>

				<div className='kingdom-components'>
					<div
						className={`comp-tree ${
							user ? 'user-logged-in' : 'user-logged-out'
						}`}>
						<div className='comp-node provider'>
							App (UserProvider)
							<span className='context-value'>
								value=
								{`{user: ${
									user
										? `{username: "${user.username}", role: "${user.role}"}`
										: 'null'
								}, login, logout}`}
							</span>
							<div className='comp-children'>
								<div className='comp-node'>
									Navbar
									<div className='comp-children'>
										<div className='comp-node'>Logo</div>
										<div className='comp-node consumer'>
											ProfileMenu (Consumer)
											<span className='using-context'>
												{user
													? `Welcome, ${user.username}!`
													: 'Please connect'}
											</span>
										</div>
									</div>
								</div>
								<div className='comp-node'>
									MainContent
									<div className='comp-children'>
										<div className='comp-node consumer'>
											ProtectedContent (Consumer)
											<span className='using-context'>
												{user
													? 'Showing protected spells!'
													: 'Connection required'}
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='story-section'>
				<p className='story-paragraph'>
					"Let me show you the incantation for creating these living threads," 
					Contextia said, conjuring a scroll of glowing code.
				</p>
			</div>

			<CodeExample
				title="Custom Provider Pattern"
				discoveredBy="Grand Hall Advanced Techniques"
				code={`// 1. Create the Context thread
const UserContext = React.createContext();

// 2. Create a custom Provider with state and functions
function UserProvider({ children }) {
  // State lives in the Provider
  const [user, setUser] = useState(null);
  
  // Functions to modify state
  const login = (username, role) => {
    setUser({ username, role });
  };
  
  const logout = () => {
    setUser(null);
  };
  
  // Bundle state and functions together
  const value = {
    user,      // Current state
    login,     // Function to update
    logout     // Another function
  };
  
  // Provide the bundle to all children
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

// 3. Custom hook for clean access
function useUser() {
  const context = useContext(UserContext);
  
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  
  return context;
}

// 4. Components can read AND modify
function ProfileMenu() {
  const { user, logout } = useUser();
  
  return user ? (
    <div>
      <span>Welcome, {user.username}!</span>
      <button onClick={logout}>Logout</button>
    </div>
  ) : (
    <button onClick={() => navigate('/login')}>Login</button>
  );
}`}
			/>

			<div className='performance-tips'>
				<h3>Contextia's Performance Wisdom:</h3>
				<ul>
					<li>
						<strong>Split contexts by update frequency:</strong> Separate 
						data that changes often from data that rarely changes
					</li>
					<li>
						<strong>Memoize context values:</strong> Prevent unnecessary 
						re-renders with useMemo
						<pre className='tip-code'>
							{`const memoizedValue = useMemo(() => ({ 
  user, login, logout 
}), [user]);

return (
  <UserContext.Provider value={memoizedValue}>
    {children}
  </UserContext.Provider>
);`}
						</pre>
					</li>
					<li>
						<strong>Use custom hooks:</strong> They provide cleaner access 
						and can add error handling
					</li>
				</ul>
			</div>

			<ChapterSummary
				lessonInsight={{
					title: "Contextia's Advanced Wisdom:",
					content: "Custom Context Providers are the heart of many React applications. They combine state, logic, and distribution into one elegant pattern. By bundling data with the functions to modify it, you create a complete state management solution that any component can access. This pattern is perfect for user authentication, shopping carts, theme systems, and any other global state that needs both reading and writing capabilities."
				}}
				reflectionQuestions={[
					'How does the concept of "living threads" that carry both data and functions help you understand custom Context Providers?',
					'What parts of your applications could benefit from this pattern of bundling state with its update functions?'
				]}
				journalEntry={{
					title: "Aria's Journal - Day 10 (Midday)",
					content: "Custom Providers are amazing! They're not just about sharing data - they create complete state management systems. The Provider holds the state and the logic to change it, then shares both through the Context threads. Any component can tap in to both read AND write. It's like having a shared spell book where everyone can read the spells and add new ones!"
				}}
			/>
		</div>
	);
};

export default ChapterTwo;