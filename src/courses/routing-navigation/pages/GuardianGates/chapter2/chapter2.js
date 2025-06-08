import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import StoryContent from '../../../../../components/content/StoryContent';

function ChapterTwo() {
	const { authState, handleLogin, handleLogout, redirectPath } =
		useOutletContext();

	const [showLoginFlow, setShowLoginFlow] = useState(false);
	const [credentials, setCredentials] = useState({
		username: '',
		role: 'visitor',
	});
	const [demonstrationMode, setDemonstrationMode] = useState(false);

	const authFlowSteps = [
		{
			id: 1,
			status: 'pending',
			label: 'User attempts to access protected route',
			ariaNote: 'Component tries to render',
		},
		{
			id: 2,
			status: 'pending',
			label: 'Guardian checks authentication',
			ariaNote: 'Hook validates state',
		},
		{
			id: 3,
			status: 'pending',
			label: 'Redirect to login with return path',
			ariaNote: 'State preserved in context',
		},
		{
			id: 4,
			status: 'pending',
			label: 'User provides credentials',
			ariaNote: 'Form validation applied',
		},
		{
			id: 5,
			status: 'pending',
			label: 'Return to original destination',
			ariaNote: 'Navigation with preserved state',
		},
	];

	const getStepStatus = (stepId) => {
		if (!showLoginFlow) return 'pending';
		if (stepId <= authState.currentStep) return 'complete';
		return 'pending';
	};

	const content = (
		<>
			<div className='chapter'>
				<h2 className='chapter-title'>
					Chapter 2: Advanced Authentication Flows
				</h2>

				<div className='chapter-bridge'>
					<p>
						The training continued in the Guardian Archives, where
						ancient memory crystals lined the walls. Marina and Aria
						prepared to demonstrate the most sophisticated
						authentication patterns to their eager students.
					</p>
				</div>

				<div className='story-section'>
					<p className='story-paragraph'>
						"Authentication isn't just about checking credentials,"
						Aria began, activating a memory crystal that began to
						glow. "It's about preserving the entire user journey.
						Let me show you what I learned across the kingdom."
					</p>

					<p className='story-paragraph'>
						Marina nodded approvingly. "Aria's right. Modern
						guardians don't just turn people away - they remember
						intentions, preserve state, and create seamless
						experiences."
					</p>

					<p className='story-paragraph'>
						A trainee raised her hand. "Master Aria, how do you
						combine authentication with all the patterns you've
						learned?"
					</p>

					<p className='story-paragraph'>
						Aria smiled, remembering her journey. "In the Eastern
						Quarter, I learned that authentication is state. In the
						Western Quarter, that login forms need validation. In
						the South, how user data flows through protected routes.
						Watch as Marina and I demonstrate the{' '}
						<strong>Complete Authentication Flow</strong>."
					</p>

					<p className='story-paragraph'>
						Binary projected an intricate diagram. "Authentication
						system online! Integrating: State Management ✓, Form
						Validation ✓, Context Preservation ✓, Intelligent
						Redirection ✓!"
					</p>
					<div className='auth-flow-demo advanced'>
						<h3>The Integrated Authentication System</h3>

						{!demonstrationMode && (
							<button
								className='demo-toggle'
								onClick={() => setDemonstrationMode(true)}>
								🎭 Begin Live Demonstration
							</button>
						)}

						<div className='auth-status enhanced'>
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
							{demonstrationMode && (
								<div className='aria-insight'>
									<p>
										"Notice how we preserve the user's
										intention even when redirecting..."
									</p>
								</div>
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
										<option value='merchant'>
											Merchant
										</option>
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

						<div className='flow-visualization enhanced'>
							<h4>Marina & Aria's Authentication Flow</h4>
							{authFlowSteps.map((step) => (
								<div
									key={step.id}
									className={`flow-step ${getStepStatus(
										step.id
									)}`}>
									<span className='step-number'>
										{step.id}
									</span>
									<div className='step-content'>
										<span className='step-label'>
											{step.label}
										</span>
										{demonstrationMode && (
											<span className='aria-note'>
												{step.ariaNote}
											</span>
										)}
									</div>
									{getStepStatus(step.id) === 'complete' && (
										<span className='checkmark'>✓</span>
									)}
								</div>
							))}
						</div>
					</div>

					<div className='collaborative-explanation'>
						<p className='story-paragraph'>
							"Each step integrates patterns from across the
							kingdom," Aria explained. "Authentication isn't
							isolated - it touches every system we've built."
						</p>
					</div>
				</div>

				<div className='interactive-section'>
					<h3 className='section-title'>
						The Complete Authentication Architecture
					</h3>
					<p className='collaboration-note'>
						Marina and Aria present their unified authentication
						system...
					</p>

					<div className='code-example collaborative'>
						<h3>Intelligent Protected Routes</h3>
						<pre>{`// Marina's Foundation + Aria's Complete Integration
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth, useFormState, useJourneyTracking } from './hooks';

function IntelligentProtectedRoute({ 
  children, 
  requiredRole,
  validateBeforeAccess 
}) {
  // Marina's authentication check
  const { user, isLoading } = useAuth();
  const location = useLocation();
  
  // Aria's state preservation from Eastern Quarter
  const { preserveFormState } = useFormState();
  const { trackJourney } = useJourneyTracking();
  
  // Track user's journey for analytics
  useEffect(() => {
    trackJourney({
      attempted: location.pathname,
      authenticated: !!user,
      timestamp: Date.now()
    });
  }, [location, user]);
  
  if (isLoading) {
    return (
      <div className="guardian-thinking">
        <LoadingCrystal />
        <p>Guardian verifying credentials...</p>
      </div>
    );
  }
  
  if (!user) {
    // Aria's pattern: Preserve ALL state before redirect
    preserveFormState();
    
    return (
      <Navigate 
        to="/login" 
        state={{ 
          from: location,
          message: "Authentication required",
          preservedState: true
        }} 
        replace 
      />
    );
  }
  
  // Aria's multi-layer validation
  if (requiredRole && user.role !== requiredRole) {
    return (
      <Navigate 
        to="/upgrade-access" 
        state={{ 
          currentRole: user.role,
          requiredRole,
          from: location 
        }}
      />
    );
  }
  
  // Additional validation if needed
  if (validateBeforeAccess && !validateBeforeAccess(user)) {
    return <AdditionalVerification user={user} />;
  }
  
  return children;
}`}</pre>
					</div>

					<div className='code-example'>
						<h3>Enhanced Auth Context with Journey Memory</h3>
						<pre>{`// The Marina-Aria Auth Context Pattern
import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function IntelligentAuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [journey, setJourney] = useState([]);
  const navigate = useNavigate();
  
  // Aria's pattern: Track complete user journey
  const trackUserJourney = (action) => {
    setJourney(prev => [...prev, {
      action,
      timestamp: Date.now(),
      user: user?.id
    }]);
  };
  
  // Check for existing session with state restoration
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Check for saved session
        const savedUser = await getStoredAuth();
        
        // Aria's addition: Restore preserved state
        if (savedUser) {
          const preservedState = await getPreservedState(savedUser.id);
          if (preservedState) {
            restoreUserState(preservedState);
          }
        }
        
        setUser(savedUser);
        trackUserJourney('session_restored');
      } finally {
        setLoading(false);
      }
    };
    
    initializeAuth();
  }, []);
  
  const login = async (credentials, returnTo) => {
    // Marina's secure authentication
    const userData = await authenticateUser(credentials);
    
    // Aria's enhancements
    trackUserJourney('login_success');
    
    // Restore any preserved form data
    const savedForms = await getSavedForms(userData.id);
    if (savedForms) {
      restoreFormData(savedForms);
    }
    
    setUser(userData);
    
    // Intelligent navigation
    if (returnTo) {
      navigate(returnTo, { replace: true, state: { justAuthenticated: true } });
    }
    
    return userData;
  };
  
  const logout = async () => {
    // Aria's pattern: Save state before logout
    if (user) {
      await preserveUserState(user.id, getCurrentState());
    }
    
    trackUserJourney('logout');
    setUser(null);
    clearStoredAuth();
    
    // Navigate to home with logout message
    navigate('/', { state: { message: 'Successfully logged out' } });
  };
  
  const contextValue = {
    user,
    loading,
    journey,
    login,
    logout,
    trackUserJourney,
    // Aria's additions
    hasRole: (role) => user?.roles?.includes(role),
    hasPermission: (permission) => user?.permissions?.includes(permission),
    isAuthenticated: !!user
  };
  
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}`}</pre>
					</div>

					<div className='auth-patterns enhanced'>
						<h3>Marina & Aria's Authentication Patterns</h3>
						<div className='pattern-grid masters-edition'>
							<div className='pattern-card'>
								<h4>Stateful Sessions</h4>
								<p className='marina'>Marina: Secure cookies</p>
								<p className='aria'>
									Aria: + State preservation
								</p>
								<code>httpOnly + state cache</code>
							</div>
							<div className='pattern-card'>
								<h4>Smart Tokens</h4>
								<p className='marina'>Marina: JWT validation</p>
								<p className='aria'>Aria: + Journey tracking</p>
								<code>JWT + context memory</code>
							</div>
							<div className='pattern-card'>
								<h4>Federated Auth</h4>
								<p className='marina'>Marina: OAuth flow</p>
								<p className='aria'>Aria: + Form recovery</p>
								<code>OAuth + state restore</code>
							</div>
						</div>
						<div className='pattern-explanation'>
							<p className='story-paragraph'>
								"Notice how each pattern combines security with
								user experience," Aria explained. "We're not
								just checking if someone can enter - we're
								making their journey smooth and memorable."
							</p>
						</div>
					</div>

					<div className='code-example'>
						<h3>The Ultimate Authentication Flow</h3>
						<pre>{`// Marina & Aria's Complete Auth System
import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// The Master Authentication Hook
function useMasterAuth() {
  const navigate = useNavigate();
  const location = useLocation();
  const { preserveState, restoreState } = useStatePreservation();
  const { validateForm } = useFormValidation();
  
  const [authState, setAuthState] = useState({
    user: null,
    loading: true,
    journey: [],
    lastActivity: null
  });
  
  // Initialize with intelligence
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Check multiple auth sources
        const sessionUser = await checkSessionAuth();
        const tokenUser = await checkTokenAuth();
        const user = sessionUser || tokenUser;
        
        if (user) {
          // Aria's pattern: Restore complete state
          const savedState = await restoreState(user.id);
          if (savedState?.returnPath) {
            navigate(savedState.returnPath);
          }
        }
        
        setAuthState(prev => ({
          ...prev,
          user,
          loading: false
        }));
      } catch (error) {
        console.error('Auth initialization failed:', error);
        setAuthState(prev => ({ ...prev, loading: false }));
      }
    };
    
    initAuth();
  }, []);
  
  // Intelligent login with full context
  const login = useCallback(async (credentials) => {
    try {
      // Validate credentials (Western Quarter pattern)
      const isValid = await validateForm(credentials);
      if (!isValid) throw new Error('Invalid credentials format');
      
      // Authenticate
      const user = await authenticateUser(credentials);
      
      // Track journey
      const journey = [...authState.journey, {
        action: 'login',
        timestamp: Date.now(),
        from: location.pathname
      }];
      
      setAuthState({
        user,
        loading: false,
        journey,
        lastActivity: Date.now()
      });
      
      // Navigate to intended destination or dashboard
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
      
      return { success: true, user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }, [authState.journey, location, navigate]);
  
  // Graceful logout with state preservation
  const logout = useCallback(async () => {
    if (authState.user) {
      // Aria's pattern: Save state before logout
      await preserveState(authState.user.id, {
        lastRoute: location.pathname,
        journey: authState.journey,
        preferences: getUserPreferences()
      });
    }
    
    // Clear auth
    await clearAllAuth();
    setAuthState({
      user: null,
      loading: false,
      journey: [],
      lastActivity: null
    });
    
    navigate('/goodbye', { 
      state: { message: 'Thank you for visiting!' } 
    });
  }, [authState, location, navigate]);
  
  return {
    ...authState,
    login,
    logout,
    isAuthenticated: !!authState.user,
    checkPermission: (permission) => 
      authState.user?.permissions?.includes(permission),
    trackActivity: () => 
      setAuthState(prev => ({ ...prev, lastActivity: Date.now() }))
  };
}`}</pre>
					</div>

					<div className='masters-insight'>
						<p className='story-paragraph'>
							"This is the power of synthesis," Marina said
							proudly. "Aria has taken every pattern she learned
							and woven them into our authentication system."
						</p>

						<p className='story-paragraph'>
							Aria nodded. "Authentication touches everything -
							components render based on auth state, forms
							validate credentials, effects track sessions, and
							context provides access throughout the app. It's all
							connected."
						</p>
					</div>
				</div>
				<div className='lesson-insight'>
					<h3>The Masters' Lesson:</h3>
					<p>
						The trainees watched in awe as Marina and Aria
						demonstrated the complete system. "Authentication isn't
						just about security," Marina began.
					</p>
					<p>
						"It's about creating intelligent, stateful experiences,"
						Aria continued. "Every pattern I learned - from
						component lifecycle to form validation - enhances how
						users authenticate and navigate."
					</p>
					<p>
						"Together," they concluded, "we've created
						authentication that remembers, adapts, and guides users
						seamlessly through their journey."
					</p>
					<p className='story-paragraph'>
						Binary displayed the results: "Authentication system
						optimized! State preservation: ACTIVE. Journey tracking:
						ENABLED. User experience: EXCEPTIONAL!"
					</p>
				</div>

				<div className='reflection-section'>
					<h3>Reflect on the Story</h3>
					<p>
						How does integrating state preservation, form
						validation, and journey tracking enhance traditional
						authentication flows?
					</p>
					<p className='story-paragraph'>
						What advantages come from treating authentication as
						part of the overall user journey rather than an isolated
						security checkpoint?
					</p>
					<p className='story-paragraph'>
						How has Aria's complete mastery of React patterns
						transformed simple login/logout into an intelligent
						authentication system?
					</p>
				</div>
			</div>
		</>
	);

	return <StoryContent content={content} />;
}

export default ChapterTwo;
