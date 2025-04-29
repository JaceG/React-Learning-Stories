import { useState } from 'react';

const ChapterTwo = () => {
	const [user, setUser] = useState(null);
	const login = (username, role) => setUser({ username, role });
	const logout = () => setUser(null);

	return (
		<div className='chapter'>
			<h2 className='chapter-title'>
				Chapter 2: Building the Royal Court (Custom Context Providers)
			</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					As the kingdom of Reactopia grew more complex, King{' '}
					<strong>Context</strong> realized that his royal decrees
					needed more structure. It wasn't enough to simply pass
					static information - the subjects needed a way to request
					changes to the kingdom's state as well.
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
											Not Logged In
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
										Leave Castle (Logout)
									</button>
								) : (
									<button
										className='gate-button login'
										onClick={() =>
											login('AdventureSeeker', 'explorer')
										}>
										Enter Castle (Login)
									</button>
								)}
							</div>
						</div>
					</div>
				</div>

				<p className='story-paragraph'>
					"A well-designed Context Provider," the king's advisor
					explained, "should not only share information but provide
					the means to update it. Like a royal decree that includes
					both laws and the procedures to amend them."
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: The Royal Authentication System
				</h3>
				<div className='instruction-box'>
					<p>
						<strong>
							Use the buttons above to login and logout of the
							kingdom's authentication system. Notice how
							components throughout the realm immediately
							recognize your presence without passing props
							through every level!
						</strong>
					</p>
				</div>

				<div className='kingdom-components'>
					<div className='comp-tree'>
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
													? `Hello, ${user.username}!`
													: 'Please log in'}
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
													? 'Showing secret content!'
													: 'Login required'}
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='code-example'>
				<pre className='context-code'>
					{`// 1. Create the Context
const UserContext = React.createContext();

// 2. Create a custom Provider with state and functions
function UserProvider({ children }) {
  // State to hold the user information
  const [user, setUser] = useState(null);
  
  // Login function - could include API calls in real app
  const login = (username, role) => {
    setUser({ username, role });
  };
  
  // Logout function
  const logout = () => {
    setUser(null);
  };
  
  // Create a value object with both state and functions
  const value = {
    user,      // The current state
    login,     // Function to update state
    logout     // Another function to update state
  };
  
  // Provide the value to all children
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

// 3. Custom hook for easy context usage
function useUser() {
  const context = useContext(UserContext);
  
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  
  return context;
}

// 4. Consume the context in a component
function ProfileMenu() {
  // Get both state and functions in one call
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
				</pre>
			</div>

			<div className='performance-tips'>
				<h3>Context Performance Tips:</h3>
				<ul>
					<li>
						<strong>Split contexts:</strong> Use separate contexts
						for data that changes at different frequencies
					</li>
					<li>
						<strong>Memoize values:</strong> Use useMemo to prevent
						unnecessary re-renders
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
						<strong>Context selectors:</strong> Let components
						subscribe to only what they need
					</li>
				</ul>
			</div>

			<div className='lesson-insight'>
				<h3>The Custom Context Provider Lesson:</h3>
				<p>
					A well-designed Context Provider does more than just pass
					static values - it creates a self-contained state management
					system by combining:
				</p>
				<ul>
					<li>
						<strong>State:</strong> Data that components need to
						access
					</li>
					<li>
						<strong>Functions:</strong> Methods to update that data
					</li>
					<li>
						<strong>Logic:</strong> Business rules that control how
						data can change
					</li>
				</ul>
				<p>
					This pattern creates a clean separation of concerns where:
				</p>
				<ul>
					<li>The Provider manages state and its update logic</li>
					<li>
						Consumer components just use the state and call
						functions
					</li>
				</ul>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					How does the concept of a royal court with both laws and
					procedures to amend them help you understand the purpose of
					a custom Context Provider?
				</p>
				<p>
					What types of state in your applications would benefit from
					being managed in a custom Context Provider?
				</p>
			</div>
		</div>
	);
};

export default ChapterTwo;
