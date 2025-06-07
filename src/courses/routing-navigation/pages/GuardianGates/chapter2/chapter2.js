import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const ChapterTwo = () => {
	const { authState, handleLogin, handleLogout, redirectPath } =
		useOutletContext();

	const [showLoginFlow, setShowLoginFlow] = useState(false);
	const [credentials, setCredentials] = useState({
		username: '',
		role: 'visitor',
	});

	const authFlowSteps = [
		{
			id: 1,
			status: 'pending',
			label: 'User attempts to access protected route',
		},
		{ id: 2, status: 'pending', label: 'Guardian checks authentication' },
		{
			id: 3,
			status: 'pending',
			label: 'Redirect to login with return path',
		},
		{ id: 4, status: 'pending', label: 'User provides credentials' },
		{ id: 5, status: 'pending', label: 'Return to original destination' },
	];

	const getStepStatus = (stepId) => {
		if (!showLoginFlow) return 'pending';
		if (stepId <= authState.currentStep) return 'complete';
		return 'pending';
	};

	return (
		<div className='chapter'>
			<h2 className='chapter-title'>Chapter 2: The Memory of Stone</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					Marina led Param to the ancient Guardian Archives, where the
					secrets of the stone guardians were kept. "There's something
					remarkable about these guardians," she said, her voice
					echoing in the stone chamber. "They have perfect memory."
				</p>

				<p className='story-paragraph'>
					"Perfect memory?" Param asked, puzzled. "What do they need
					to remember?"
				</p>

				<p className='story-paragraph'>
					Marina smiled. "Imagine a visitor arrives at the Royal
					Treasury but lacks credentials. The guardian turns them
					away, directing them to get proper authorization. But here's
					the magic - the guardian{' '}
					<strong>remembers where they wanted to go</strong>."
				</p>

				<p className='story-paragraph'>
					She demonstrated with a glowing crystal that recorded paths.
					"When the visitor returns with credentials, the guardian
					doesn't just let them in - it
					<strong>escorts them to their original destination</strong>.
					No need to navigate again. This is what we call{' '}
					<strong>
						authentication flow with redirect preservation
					</strong>
					."
				</p>

				<div className='auth-flow-demo'>
					<h3>The Guardian's Memory Crystal</h3>

					<div className='auth-status'>
						<p>
							Current Status:{' '}
							{authState.isAuthenticated ? (
								<span className='status-badge authenticated'>
									Authenticated as {authState.user?.role}
								</span>
							) : (
								<span className='status-badge unauthenticated'>
									Not Authenticated
								</span>
							)}
						</p>
						{redirectPath && (
							<p>
								Intended Destination:{' '}
								<code>{redirectPath}</code>
							</p>
						)}
					</div>

					<div className='auth-controls'>
						{!authState.isAuthenticated ? (
							<div className='login-form'>
								<h4>Present Your Credentials</h4>
								<input
									type='text'
									placeholder='Your name'
									value={credentials.username}
									onChange={(e) =>
										setCredentials({
											...credentials,
											username: e.target.value,
										})
									}
								/>
								<select
									value={credentials.role}
									onChange={(e) =>
										setCredentials({
											...credentials,
											role: e.target.value,
										})
									}>
									<option value='visitor'>Visitor</option>
									<option value='merchant'>Merchant</option>
									<option value='student'>Student</option>
									<option value='royal'>Royal</option>
								</select>
								<button
									onClick={() => {
										handleLogin(credentials);
										setShowLoginFlow(true);
									}}>
									Authenticate
								</button>
							</div>
						) : (
							<div className='logout-section'>
								<p>Welcome, {authState.user?.username}!</p>
								<button onClick={handleLogout}>
									Leave Kingdom
								</button>
							</div>
						)}
					</div>

					<div className='flow-visualization'>
						<h4>Authentication Flow</h4>
						{authFlowSteps.map((step) => (
							<div
								key={step.id}
								className={`flow-step ${getStepStatus(
									step.id
								)}`}>
								<span className='step-number'>{step.id}</span>
								<span className='step-label'>{step.label}</span>
								{getStepStatus(step.id) === 'complete' && (
									<span className='checkmark'>✓</span>
								)}
							</div>
						))}
					</div>
				</div>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Implementing Authentication Flow
				</h3>

				<div className='code-example'>
					<pre>{`// Protected Route with Redirect Memory
import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();
  
  if (!user) {
    // Save the attempted destination
    return <Navigate 
      to="/login" 
      state={{ from: location }} 
      replace 
    />;
  }
  
  return children;
}

// Login Component with Return Navigation
function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  // Extract the return path
  const from = location.state?.from?.pathname || "/";
  
  const handleSubmit = async (credentials) => {
    try {
      await login(credentials);
      // Return to original destination
      navigate(from, { replace: true });
    } catch (error) {
      setError('Invalid credentials');
    }
  };
  
  return (
    <div className="login-portal">
      <h2>Guardian's Challenge</h2>
      <p>You were trying to reach: {from}</p>
      {/* Login form */}
    </div>
  );
}`}</pre>
				</div>

				<div className='code-example'>
					<pre>{`// Complete Auth Context with Redirect Handling
import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const savedUser = await getStoredAuth();
        setUser(savedUser);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);
  
  const login = async (credentials) => {
    const userData = await authenticateUser(credentials);
    setUser(userData);
    // Store auth token/session
    localStorage.setItem('authToken', userData.token);
    return userData;
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
  };
  
  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

// Loading State Handler
function App() {
  const { loading } = useAuth();
  
  if (loading) {
    return <div className="loading-crystal">Awakening guardians...</div>;
  }
  
  return <Routes>...</Routes>;
}`}</pre>
				</div>

				<div className='auth-patterns'>
					<h3>Common Authentication Patterns</h3>
					<div className='pattern-grid'>
						<div className='pattern-card'>
							<h4>Session-Based</h4>
							<p>
								Guardian remembers you with a royal seal
								(cookie)
							</p>
							<code>httpOnly cookies</code>
						</div>
						<div className='pattern-card'>
							<h4>Token-Based</h4>
							<p>Carry a magic token that proves identity</p>
							<code>JWT in localStorage</code>
						</div>
						<div className='pattern-card'>
							<h4>OAuth/Social</h4>
							<p>Another kingdom vouches for you</p>
							<code>Google, GitHub login</code>
						</div>
					</div>
				</div>

				<div className='code-example'>
					<pre>{`// Handling Different Auth States
function ProtectedArea() {
  const { user, loading } = useAuth();
  const location = useLocation();
  
  // Still checking credentials
  if (loading) {
    return <LoadingGuardian />;
  }
  
  // Not authenticated
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  
  // Wrong role/permissions
  if (!hasRequiredRole(user, 'admin')) {
    return <AccessDenied role={user.role} required="admin" />;
  }
  
  // All checks passed!
  return <AdminDashboard />;
}

// Persisting Auth Across Reloads
function usePersistedAuth() {
  const [user, setUser] = useState(() => {
    // Check for saved session
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  
  // Update storage when user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);
  
  return [user, setUser];
}`}</pre>
				</div>
			</div>
			<div className='lesson-insight'>
				<h3>The Guardian Lesson:</h3>
				<p>
					"The beauty of the guardian's memory," Marina explained, "is
					that it creates a seamless experience. Visitors don't lose
					their way when asked to authenticate. They're simply taking
					a detour to get their papers in order."
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					Why is preserving the intended destination important for
					user experience? How would users feel if they had to
					navigate again after logging in?
				</p>
				<p>
					Consider the security implications: What information should
					you store about a user's session? What should remain on the
					server?
				</p>
			</div>
		</div>
	);
};

export default ChapterTwo;
