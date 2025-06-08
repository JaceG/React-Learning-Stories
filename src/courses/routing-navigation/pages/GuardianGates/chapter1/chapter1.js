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
			ariaPattern: 'Basic component access',
		},
		{
			id: 'merchant',
			name: "Trader's Guild",
			icon: '💰',
			required: 'merchant',
			description: 'Requires merchant license',
			ariaPattern: 'State-based permissions',
		},
		{
			id: 'academy',
			name: 'Magic Academy',
			icon: '🎓',
			required: 'student',
			description: 'Students and teachers only',
			ariaPattern: 'Hook-verified access',
		},
		{
			id: 'royal',
			name: 'Royal Chambers',
			icon: '👑',
			required: 'royal',
			description: 'Royal family and advisors',
			ariaPattern: 'Form-validated entry',
		},
	];

	const content = (
		<>
			<div className='chapter'>
				<h2 className='chapter-title'>Chapter 1: Shared Leadership</h2>

				<div className='chapter-bridge'>
					<p>
						The Navigation Corps training grounds buzzed with
						activity. Marina and Aria stood before a group of eager
						trainees, preparing to unveil the next evolution of
						navigation - secure, intelligent route protection that
						would safeguard the most sensitive areas of the React
						Kingdom.
					</p>
				</div>

				<div className='story-section'>
					<p className='story-paragraph'>
						"Welcome to Guardian Gates training," Marina announced,
						her voice carrying authority and warmth. "Today, Master
						Aria and I will teach you patterns that combine
						navigation security with everything she's mastered
						across the kingdom."
					</p>

					<p className='story-paragraph'>
						Aria stepped forward, Binary projecting a complex
						security diagram. "Protected routes aren't just about
						checking if someone's logged in," she explained.
						"They're about integrating authentication with state
						management, form validation, and intelligent user
						flows."
					</p>

					<p className='story-paragraph'>
						A young trainee raised her hand. "Master Aria, how did
						you learn to combine all these patterns so seamlessly?"
					</p>

					<p className='story-paragraph'>
						Aria smiled, remembering her own journey. "By visiting
						every quarter of our kingdom. In the Northern Quarter, I
						learned that routes are components. In the Eastern
						Quarter, that navigation is state. In the Southern
						Quarter, how data flows through protected paths. And in
						the Western Quarter, how forms and validation create
						secure gateways."
					</p>

					<p className='story-paragraph'>
						"And now," Marina added with pride, "she brings all that
						knowledge here. Watch as we demonstrate the Guardian
						Gates system we've created together."
					</p>
					<div className='gate-visualization enhanced'>
						<h3>The Integrated Guardian System</h3>
						{!teachingMode && (
							<button
								className='teaching-toggle'
								onClick={() => setTeachingMode(true)}>
								🎓 Enter Teaching Mode
							</button>
						)}

						{teachingMode && (
							<div className='teaching-intro'>
								<p className='aria-teaching'>
									"Let me show you how each gate integrates
									patterns from across the kingdom..."
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
										<div className='aria-insight'>
											<strong>Aria's Pattern:</strong>
											<p>{gate.ariaPattern}</p>
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
									Marina & Aria's Authentication Flow:{' '}
									{selectedGate.name}
								</h4>
								<div className='demonstration-flow'>
									<div className='marina-part'>
										<strong>Marina's Check:</strong>
										<p>Route authentication</p>
									</div>
									<div className='aria-part'>
										<strong>Aria's Enhancement:</strong>
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
							patterns," Aria explained to the trainees. "The
							Public Market uses basic component rendering -
							anyone can enter. But the Royal Chambers? That
							requires form validation, state checks, and
							multi-factor authentication."
						</p>

						<p className='story-paragraph'>
							Marina nodded approvingly. "And watch how Aria
							integrates all her knowledge. She's not just
							checking if someone's logged in - she's validating
							their entire journey through the application."
						</p>
					</div>
				</div>

				<div className='interactive-section'>
					<h3 className='section-title'>
						The Marina-Aria Guardian Pattern
					</h3>
					<p className='collaboration-note'>
						The masters demonstrate their integrated approach...
					</p>

					<div className='code-example collaborative'>
						<h3>Basic Protection with Intelligence</h3>
						<pre>{`// Marina's Foundation + Aria's Enhancements
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth, useFormValidation, useStatePreservation } from './hooks';

// The Intelligent Guardian Gate
function IntelligentProtectedRoute({ children, requirements = {} }) {
  // Marina's authentication check
  const { user, isLoading } = useAuth();
  const location = useLocation();
  
  // Aria's state preservation
  const { preserveCurrentState } = useStatePreservation();
  
  // Aria's form validation integration
  const { hasUnsavedChanges, validateBeforeLeaving } = useFormValidation();
  
  // Show loading while checking auth
  if (isLoading) {
    return <div className="guardian-checking">Verifying credentials...</div>;
  }
  
  // No user? Preserve state and redirect
  if (!user) {
    // Aria's pattern: Save where they wanted to go
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
  
  // Check additional requirements (Aria's multi-layer validation)
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
							<span className='flow-step aria'>
								Aria: State Preservation
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
						<pre>{`// The Complete Guardian System by Marina & Aria

// 1. Form-Aware Protection (Aria's Western Quarter Knowledge)
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
  // Combine all of Aria's patterns
  const { hasPermissions } = usePermissionGuard(
    requirements.permissions || []
  );
  const { validateAccess } = useAccessValidation();
  const { preserveJourney } = useJourneyTracking();
  
  // Marina's routing + Aria's validation
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
							Marina smiled. "That's where experience comes in.
							Aria has journeyed through every quarter, mastered
							every pattern. She knows that the best guardian
							isn't the strongest lock, but the smartest system."
						</p>
					</div>
				</div>

				<div className='lesson-insight'>
					<h3>The Masters' Wisdom:</h3>
					<p>
						Marina and Aria stood together before the trainees.
						"Guardian Gates aren't just security checkpoints,"
						Marina began.
					</p>
					<p>
						"They're intelligent systems that understand context,"
						Aria continued. "They preserve user state, validate
						forms, track journeys, and provide graceful fallbacks.
						Every pattern I learned across the kingdom makes these
						guards smarter."
					</p>
					<p>
						"Together," they said in unison, "we've created
						protection that enhances rather than hinders the user
						experience."
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
						How has Aria's complete journey through the React
						Kingdom prepared her to teach these advanced patterns?
					</p>
				</div>
			</div>
		</>
	);

	return <StoryContent content={content} />;
}

export default ChapterOne;
