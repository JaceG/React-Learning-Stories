import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import StoryContent from '../../../../../components/content/StoryContent';

function ChapterOne() {
	const { guardianState, handleGateCheck, attemptedEntries } =
		useOutletContext();

	const [selectedGate, setSelectedGate] = useState(null);
	const [accessLevel, setAccessLevel] = useState('visitor');
	const [teachingMode, setTeachingMode] = useState(false);

	const kingdomGates = [
		{
			id: 'public',
			name: 'Market Square',
			icon: '🏪',
			required: 'none',
			description: 'Open to all citizens',
			reactPattern: 'Basic component access',
		},
		{
			id: 'merchant',
			name: "Trader's Guild",
			icon: '💰',
			required: 'merchant',
			description: 'Requires merchant license',
			reactPattern: 'State-based permissions',
		},
		{
			id: 'academy',
			name: 'Magic Academy',
			icon: '🎓',
			required: 'student',
			description: 'Students and teachers only',
			reactPattern: 'Hook-verified access',
		},
		{
			id: 'royal',
			name: 'Royal Chambers',
			icon: '👑',
			required: 'royal',
			description: 'Royal family and advisors',
			reactPattern: 'Form-validated entry',
		},
	];

	const content = (
		<>
			<div className='chapter'>
				<h2 className='chapter-title'>
					Chapter 1: The Guardian Training
				</h2>

				<div className='chapter-bridge'>
					<p>
						Marina led Aria to the Navigation Corps training
						grounds, where advanced security patterns were taught.
						Here, she would learn how to protect routes with
						authentication and authorization - securing the most
						sensitive areas of React applications.
					</p>
				</div>

				<div className='story-section'>
					<p className='story-paragraph'>
						"Welcome to Guardian Gates training," Marina announced,
						her voice carrying authority and warmth. "Today, I'll
						teach you how to protect routes using authentication and
						authorization. Aria will be learning these patterns
						alongside you."
					</p>

					<p className='story-paragraph'>
						Marina activated a complex security diagram. "Protected
						routes aren't just about checking if someone's logged
						in," she explained. "They're about integrating
						authentication with state management, form validation,
						and intelligent user flows."
					</p>

					<p className='story-paragraph'>
						Aria studied the patterns with fascination. "I can see
						connections to everything I've learned! Authentication
						is like state management, route protection uses
						validation patterns, and user flows connect to the form
						handling I studied in the Western Quarter."
					</p>

					<p className='story-paragraph'>
						"Excellent observations!" Marina praised. "Your journey
						through the React Kingdom gives you the perfect
						foundation for understanding route security. You've
						learned components, state, hooks, and forms - now you'll
						see how they all work together in navigation
						protection."
					</p>

					<p className='story-paragraph'>
						"And now," Marina continued, "you'll learn how to apply
						all that knowledge here. Watch as I demonstrate the
						Guardian Gates system and how it integrates with React
						patterns."
					</p>
					<div className='gate-visualization enhanced'>
						<h3>The Integrated Guardian System</h3>
						{!teachingMode && (
							<button
								className='teaching-toggle'
								onClick={() => setTeachingMode(true)}>
								🎓 Enter Learning Mode
							</button>
						)}

						{teachingMode && (
							<div className='teaching-intro'>
								<p className='marina-teaching'>
									Marina explains: "Watch how each gate
									integrates patterns from across the
									kingdom..."
								</p>
							</div>
						)}

						<div className='gates-grid masters-version'>
							{kingdomGates.map((gate) => (
								<div
									key={gate.id}
									className={`gate-card ${
										selectedGate?.id === gate.id
											? 'selected'
											: ''
									} ${
										guardianState[gate.id]
											? 'accessible'
											: 'locked'
									}`}
									onClick={() => setSelectedGate(gate)}>
									<div className='gate-icon'>{gate.icon}</div>
									<h4>{gate.name}</h4>
									<p className='gate-requirement'>
										Requires: {gate.required}
									</p>
									<p className='gate-description'>
										{gate.description}
									</p>
									{teachingMode && (
										<div className='react-insight'>
											<strong>React Pattern:</strong>
											<p>{gate.reactPattern}</p>
										</div>
									)}
									{guardianState[gate.id] ? (
										<span className='access-badge'>
											✓ Access Granted
										</span>
									) : (
										<span className='access-badge locked'>
											🔒 Locked
										</span>
									)}
								</div>
							))}
						</div>

						{selectedGate && (
							<div className='gate-attempt master-demonstration'>
								<h4>
									Marina's Authentication Flow:{' '}
									{selectedGate.name}
								</h4>
								<div className='demonstration-flow'>
									<div className='marina-part'>
										<strong>Marina's Check:</strong>
										<p>Route authentication</p>
									</div>
									<div className='react-part'>
										<strong>React Integration:</strong>
										<p>Integrated validation</p>
									</div>
								</div>
								<select
									value={accessLevel}
									onChange={(e) =>
										setAccessLevel(e.target.value)
									}>
									<option value='visitor'>Visitor</option>
									<option value='merchant'>Merchant</option>
									<option value='student'>Student</option>
									<option value='royal'>Royal</option>
								</select>
								<button
									onClick={() =>
										handleGateCheck(
											selectedGate.id,
											accessLevel
										)
									}>
									Present Credentials
								</button>
							</div>
						)}
					</div>

					<div className='collaborative-teaching'>
						<p className='story-paragraph'>
							"Notice how each gate type requires different
							patterns," Marina explained. "The Public Market uses
							basic component rendering - anyone can enter. But
							the Royal Chambers? That requires form validation,
							state checks, and multi-factor authentication."
						</p>

						<p className='story-paragraph'>
							Aria studied the examples with growing
							understanding. "I can see how my React foundation
							applies here! Authentication isn't just checking if
							someone's logged in - it's validating their entire
							journey through the application."
						</p>
					</div>
				</div>

				<div className='interactive-section'>
					<h3 className='section-title'>Marina's Guardian Pattern</h3>
					<p className='collaboration-note'>
						Marina demonstrates the integrated approach...
					</p>

					<div className='code-example collaborative'>
						<h3>Basic Protection with Intelligence</h3>
						<pre>{`// Marina's Guardian System with React Integration
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth, useFormValidation, useStatePreservation } from './hooks';

// The Intelligent Guardian Gate
function IntelligentProtectedRoute({ children, requirements = {} }) {
  // Marina's authentication check
  const { user, isLoading } = useAuth();
  const location = useLocation();
  
  // React state preservation
  const { preserveCurrentState } = useStatePreservation();
  
  // React form validation integration
  const { hasUnsavedChanges, validateBeforeLeaving } = useFormValidation();
  
  // Show loading while checking auth
  if (isLoading) {
    return <div className="guardian-checking">Verifying credentials...</div>;
  }
  
  // No user? Preserve state and redirect
  if (!user) {
    // React pattern: Save where they wanted to go
    preserveCurrentState();
    return (
      <Navigate 
        to="/login" 
        state={{ 
          from: location,
          message: "Please authenticate to access this area"
        }} 
      />
    );
  }
  
  // Check additional requirements (React multi-layer validation)
  if (requirements.role && user.role !== requirements.role) {
    return <Navigate to="/unauthorized" />;
  }
  
  if (requirements.permissions) {
    const hasAllPermissions = requirements.permissions.every(
      perm => user.permissions?.includes(perm)
    );
    
    if (!hasAllPermissions) {
      return (
        <div className="permission-denied">
          <h3>Additional Permissions Required</h3>
          <p>Request access from your administrator</p>
        </div>
      );
    }
  }
  
  // All checks passed - render protected content
  return children;
}`}</pre>
					</div>

					<div className='guardian-flow enhanced'>
						<h4>The Complete Authentication Flow</h4>
						<div className='flow-diagram master-flow'>
							<span className='flow-step'>User Intent</span>
							<span className='flow-arrow'>→</span>
							<span className='flow-step marina'>
								Marina: Route Check
							</span>
							<span className='flow-arrow'>→</span>
							<span className='flow-step react'>
								React: State Preservation
							</span>
							<span className='flow-arrow'>→</span>
							<span className='flow-decision'>
								Multi-Layer Validation
							</span>
							<div className='flow-branches enhanced'>
								<div className='flow-branch success'>
									<span className='flow-arrow'>✓</span>
									<span className='flow-step'>
										Access with Context
									</span>
								</div>
								<div className='flow-branch redirect'>
									<span className='flow-arrow'>↻</span>
									<span className='flow-step'>
										Intelligent Redirect
									</span>
								</div>
								<div className='flow-branch denied'>
									<span className='flow-arrow'>✗</span>
									<span className='flow-step'>
										Graceful Denial
									</span>
								</div>
							</div>
						</div>
					</div>

					<div className='code-example'>
						<h3>Advanced Guardian Patterns</h3>
						<pre>{`// Marina's Complete Guardian System

// 1. Form-Aware Protection (Western Quarter Knowledge)
function FormAwareGuardian({ children }) {
  const { user } = useAuth();
  const { formState, saveFormState } = useFormContext();
  const navigate = useNavigate();
  
  // Check auth first
  if (!user) {
    // Save form progress before redirecting
    if (formState.isDirty) {
      saveFormState();
    }
    return <Navigate to="/login" state={{ savedForm: true }} />;
  }
  
  return children;
}

// 2. Stateful Role Protection (Eastern Quarter Patterns)
function StatefulRoleGuard({ role, children }) {
  const { user } = useAuth();
  const { preserveUIState } = useStateManagement();
  const [redirecting, setRedirecting] = useState(false);
  
  useEffect(() => {
    if (!user || user.role !== role) {
      // Preserve current UI state before redirect
      preserveUIState();
      setRedirecting(true);
    }
  }, [user, role]);
  
  if (redirecting) {
    return (
      <Navigate 
        to="/role-required" 
        state={{ requiredRole: role, preservedState: true }}
      />
    );
  }
  
  return user?.role === role ? children : null;
}

// 3. Hook-Enhanced Permission Guard (Hooks Mastery)
function usePermissionGuard(requiredPermissions) {
  const { user } = useAuth();
  const { trackAccess } = useAnalytics();
  
  const hasPermissions = useMemo(() => {
    if (!user) return false;
    
    return requiredPermissions.every(
      perm => user.permissions?.includes(perm)
    );
  }, [user, requiredPermissions]);
  
  useEffect(() => {
    // Track access attempts for security
    trackAccess({
      permissions: requiredPermissions,
      granted: hasPermissions,
      timestamp: Date.now()
    });
  }, [hasPermissions]);
  
  return { hasPermissions, user };
}

// 4. The Ultimate Guardian Pattern
function UltimateGuardian({ 
  requirements = {},
  fallback = '/login',
  children 
}) {
  // Combine all React patterns
  const { hasPermissions } = usePermissionGuard(
    requirements.permissions || []
  );
  const { validateAccess } = useAccessValidation();
  const { preserveJourney } = useJourneyTracking();
  
  // Marina's routing + React validation
  const canAccess = useMemo(() => {
    return validateAccess({
      ...requirements,
      hasPermissions,
      customValidation: requirements.validate
    });
  }, [requirements, hasPermissions]);
  
  if (!canAccess) {
    preserveJourney();
    return <Navigate to={fallback} replace />;
  }
  
  return children;
}`}</pre>
					</div>

					<div className='pattern-integration'>
						<h3>Teaching the Trainees</h3>
						<p className='story-paragraph'>
							"You see," Aria explained, gesturing to the code,
							"each guardian pattern builds on knowledge from
							different quarters. Form-aware guards remember user
							progress. Stateful guards preserve UI state.
							Hook-enhanced guards provide reusable logic."
						</p>

						<p className='story-paragraph'>
							A trainee asked, "But how do we know which pattern
							to use?"
						</p>

						<p className='story-paragraph'>
							Marina smiled. "That's where learning comes in. Aria
							has studied through every quarter, learned every
							pattern. She understands that the best guardian
							isn't the strongest lock, but the smartest system."
						</p>
					</div>
				</div>

				<div className='lesson-insight'>
					<h3>Marina's Wisdom:</h3>
					<p>
						Marina addressed the learning group. "Guardian Gates
						aren't just security checkpoints," she explained.
					</p>
					<p>
						"They're intelligent systems that understand context,"
						Marina continued. "They preserve user state, validate
						forms, track journeys, and provide graceful fallbacks.
						Every React pattern you learn makes these guards
						smarter."
					</p>
					<p>
						"This way," Marina concluded, "we create protection that
						enhances rather than hinders the user experience."
					</p>
					<p>Guardian attempts tracked: {attemptedEntries.length}</p>
					<p className='story-paragraph'>
						Binary projected a summary: "Authentication patterns
						integrated. State preservation active. Validation layers
						configured. Guardian system efficiency: OPTIMAL!"
					</p>
				</div>

				<div className='reflection-section'>
					<h3>Reflect on the Story</h3>
					<p>
						How does integrating state management, form validation,
						and user journey tracking enhance basic route
						protection?
					</p>
					<p className='story-paragraph'>
						What benefits come from preserving user context when
						redirecting for authentication?
					</p>
					<p className='story-paragraph'>
						How does Aria's journey through the React Kingdom help
						her understand these advanced route protection patterns?
					</p>
				</div>
			</div>
		</>
	);

	return <StoryContent content={content} />;
}

export default ChapterOne;
