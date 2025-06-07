import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const ChapterOne = () => {
	const { guardianState, handleGateCheck, attemptedEntries } =
		useOutletContext();

	const [selectedGate, setSelectedGate] = useState(null);
	const [accessLevel, setAccessLevel] = useState('visitor');

	const kingdomGates = [
		{
			id: 'public',
			name: 'Market Square',
			icon: '🏪',
			required: 'none',
			description: 'Open to all citizens',
		},
		{
			id: 'merchant',
			name: "Trader's Guild",
			icon: '💰',
			required: 'merchant',
			description: 'Requires merchant license',
		},
		{
			id: 'academy',
			name: 'Magic Academy',
			icon: '🎓',
			required: 'student',
			description: 'Students and teachers only',
		},
		{
			id: 'royal',
			name: 'Royal Chambers',
			icon: '👑',
			required: 'royal',
			description: 'Royal family and advisors',
		},
	];

	return (
		<div className='chapter'>
			<h2 className='chapter-title'>
				Chapter 1: The Guardian Gates Awaken
			</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					After the Navigation Compass brought order to the Component
					Kingdom, a new challenge emerged. Thieves had been caught
					trying to enter the Royal Treasury, and unauthorized
					visitors were disrupting classes at the Magic Academy.
				</p>

				<p className='story-paragraph'>
					Master App summoned Captain Marina once more. "We need
					protection," he declared. "Not all who can navigate should
					access every destination. Can your compass help?"
				</p>

				<p className='story-paragraph'>
					Marina revealed ancient stone guardians that had protected
					the kingdom for centuries. "These are the{' '}
					<strong>Guardian Gates</strong>," she explained. "They stand
					watch at important passages, checking credentials before
					allowing entry. In our world, we call them{' '}
					<strong>Route Guards</strong>
					or <strong>Protected Routes</strong>."
				</p>

				<p className='story-paragraph'>
					Param, now a senior messenger, was intrigued. "But how do
					they know who should pass?" he asked, remembering his
					struggles delivering sensitive messages to restricted areas.
				</p>

				<div className='gate-visualization'>
					<h3>The Kingdom's Guardian Gates</h3>
					<div className='gates-grid'>
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
						<div className='gate-attempt'>
							<h4>Attempt Entry: {selectedGate.name}</h4>
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
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>Implementing Guardian Gates</h3>

				<div className='code-example'>
					<pre>{`// Basic Route Protection
import { Navigate } from 'react-router-dom';

// The Guardian Gate Component
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  
  if (!user) {
    // No credentials? Back to the login portal!
    return <Navigate to="/login" />;
  }
  
  // Credentials verified - proceed!
  return children;
}

// Protecting Your Routes
function App() {
  return (
    <Routes>
      {/* Public routes - no guardian needed */}
      <Route path="/" element={<PublicSquare />} />
      <Route path="/login" element={<LoginPortal />} />
      
      {/* Protected routes - guardian on duty */}
      <Route path="/treasury" element={
        <ProtectedRoute>
          <RoyalTreasury />
        </ProtectedRoute>
      } />
    </Routes>
  );
}`}</pre>
				</div>

				<div className='guardian-flow'>
					<div className='flow-diagram'>
						<span className='flow-step'>Visitor Arrives</span>
						<span className='flow-arrow'>→</span>
						<span className='flow-step'>Guardian Checks</span>
						<span className='flow-arrow'>→</span>
						<span className='flow-decision'>Has Credentials?</span>
						<div className='flow-branches'>
							<div className='flow-branch'>
								<span className='flow-arrow'>✓</span>
								<span className='flow-step'>Enter</span>
							</div>
							<div className='flow-branch'>
								<span className='flow-arrow'>✗</span>
								<span className='flow-step'>
									Redirect to Login
								</span>
							</div>
						</div>
					</div>
				</div>

				<div className='code-example'>
					<pre>{`// Different Types of Protection

// 1. Simple Authentication Check
function RequireAuth({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

// 2. Role-Based Access Control
function RequireRole({ role, children }) {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  if (user.role !== role) {
    return <Navigate to="/unauthorized" />;
  }
  
  return children;
}

// 3. Multi-Level Permission Check
function RequirePermission({ permissions, children }) {
  const { user } = useAuth();
  
  const hasPermission = permissions.every(
    perm => user?.permissions?.includes(perm)
  );
  
  if (!hasPermission) {
    return <AccessDenied />;
  }
  
  return children;
}`}</pre>
				</div>
			</div>

			<div className='lesson-insight'>
				<h3>The Guardian Lesson:</h3>
				<p>
					"The Guardian Gates are not meant to be obstacles," Marina
					explained, "but protectors. They ensure that sensitive areas
					remain secure while still allowing authorized visitors to
					pass freely. A good guardian is firm but fair."
				</p>
				<p>Attempted entries: {attemptedEntries.length}</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					Why is client-side route protection important even though
					real security happens on the server? Think about user
					experience and preventing unnecessary requests.
				</p>
				<p>
					How would you handle a visitor who bookmarks a protected
					page? What should happen when they return later?
				</p>
			</div>
		</div>
	);
};

export default ChapterOne;
