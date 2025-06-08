import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import StoryContent from '../../../../../components/content/StoryContent';

function ChapterThree() {
	const { 
		navigationHistory, 
		handleNavigation,
		masterStatus,
		achieveMastery
	} = useOutletContext();

	const [activeNav, setActiveNav] = useState('dashboard');
	const [breadcrumbs, setBreadcrumbs] = useState(['Home', 'Dashboard']);
	const [synthesisComplete, setSynthesisComplete] = useState(false);

	const unifiedPatterns = [
		{
			name: 'Stateful Nested Routes',
			icon: '🏰',
			description: 'Component hierarchies with preserved state',
			ariaIntegration: 'Context + Effects for seamless data flow',
			code: 'StateProvider > Route > Route > Route',
		},
		{
			name: 'Intelligent Protected Routes',
			icon: '🔒',
			description: 'Multi-layer authentication with validation',
			ariaIntegration: 'Form validation before route access',
			code: 'ValidateAuth > RequirePermissions > Route',
		},
		{
			name: 'Dynamic Layout Routes',
			icon: '📐',
			description: 'Adaptive layouts based on user context',
			ariaIntegration: 'Hooks for responsive route structures',
			code: 'useLayout() > ConditionalOutlet',
		},
		{
			name: 'Predictive Navigation',
			icon: '🎯',
			description: 'AI-assisted route prefetching',
			ariaIntegration: 'Effects + Memoization for performance',
			code: 'usePredictiveNav() > preloadRoute()',
		},
	];

	const completeSynthesis = () => {
		setSynthesisComplete(true);
		achieveMastery();
	};

	const content = (
		<>
		<div className='chapter'>
			<h2 className='chapter-title'>Chapter 3: The Ultimate Navigation Synthesis</h2>
			
			<div className='chapter-bridge'>
				<p>The entire Navigation Corps assembled in the Grand Synthesis Chamber. Word had 
				spread throughout the kingdom - Marina and Aria were about to unveil something 
				revolutionary. Masters from every quarter had gathered to witness this historic moment.</p>
			</div>

			<div className='story-section'>
				<p className='story-paragraph'>
					Marina addressed the assembly. "Fellow navigators, what Aria and I have created 
					goes beyond traditional routing. By combining her mastery of components, state, 
					hooks, and forms with our navigation expertise, we've developed patterns that 
					will transform how we build React applications."
				</p>
				
				<p className='story-paragraph'>
					Aria stepped forward, Binary projecting a complex hologram above them. "Navigation 
					isn't just about moving between views. It's about maintaining application state, 
					preserving user context, validating transitions, and creating intelligent systems 
					that anticipate user needs."
				</p>
				
				<p className='story-paragraph'>
					The hologram displayed interconnected patterns, each glowing with the colors of 
					different quarters. "Watch," Aria said, "as we demonstrate the ultimate synthesis 
					of all React knowledge."
				</p>

				<div className='ultimate-patterns-showcase'>
					<h3>The Unified Navigation Architecture</h3>
					<div className='route-list unified'>
						{unifiedPatterns.map((pattern) => (
							<div key={pattern.name} className='route-card mastery'>
								<div className='route-icon'>{pattern.icon}</div>
								<h5>{pattern.name}</h5>
								<p className='pattern-desc'>{pattern.description}</p>
								<div className='aria-touch'>
									<strong>Aria's Enhancement:</strong>
									<p>{pattern.ariaIntegration}</p>
								</div>
								<code>{pattern.code}</code>
							</div>
						))}
					</div>
				</div>

				<div className='collaborative-demonstration'>
					<p className='story-paragraph'>
						"Let me show you what we mean," Aria said, her hands moving confidently across 
						the interface. Marina watched with pride as her colleague demonstrated their 
						combined creation.
					</p>
				</div>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					The Complete Navigation System
				</h3>
				<p className='synthesis-note'>
					Marina and Aria present their masterwork...
				</p>

				<div className='code-example ultimate'>
					<h3>The Marina-Aria Navigation Framework</h3>
					<pre>{`// The Ultimate Navigation Architecture
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { createContext, useContext, useState, useEffect, useMemo } from 'react';

// Aria's contribution: Stateful Route Provider
const RouteStateContext = createContext();

export function RouteStateProvider({ children }) {
  const location = useLocation();
  const [routeStates, setRouteStates] = useState({});
  
  // Preserve component state across navigation
  const preserveState = (path, state) => {
    setRouteStates(prev => ({ ...prev, [path]: state }));
  };
  
  // Restore state when returning to route
  const restoreState = (path) => {
    return routeStates[path] || null;
  };
  
  return (
    <RouteStateContext.Provider value={{ preserveState, restoreState }}>
      {children}
    </RouteStateContext.Provider>
  );
}

// Marina's expertise + Aria's patterns: Intelligent Protected Route
function IntelligentProtectedRoute({ children, permissions = [] }) {
  const { user } = useAuth(); // Aria's auth context
  const { validate } = useFormValidation(); // From Western Quarter
  const navigate = useNavigate();
  const location = useLocation();
  
  // Multi-layer protection
  const canAccess = useMemo(() => {
    if (!user) return false;
    if (permissions.length === 0) return true;
    
    return permissions.every(permission => 
      user.permissions.includes(permission)
    );
  }, [user, permissions]);
  
  // Aria's addition: Validate before allowing access
  useEffect(() => {
    const checkAccess = async () => {
      if (!canAccess) {
        // Save attempted destination
        navigate('/login', { 
          state: { 
            from: location,
            requiredPermissions: permissions 
          }
        });
        return;
      }
      
      // Additional validation for sensitive routes
      if (location.state?.requiresValidation) {
        const isValid = await validate(location.state.validationData);
        if (!isValid) {
          navigate('/validation-required');
        }
      }
    };
    
    checkAccess();
  }, [canAccess, location]);
  
  return canAccess ? children : null;
}

// The Complete Route Structure
function AppRoutes() {
  return (
    <RouteStateProvider>
      <Routes>
        <Route path="/" element={<KingdomLayout />}>
          {/* Public routes with state preservation */}
          <Route index element={<CentralCitadel />} />
          <Route path="quarters" element={<QuartersLayout />}>
            <Route path="northern" element={<ComponentsQuarter />} />
            <Route path="eastern" element={<StateQuarter />} />
            <Route path="southern" element={<PropsQuarter />} />
            <Route path="western" element={<FormsQuarter />} />
          </Route>
          
          {/* Protected routes with validation */}
          <Route path="masters" element={
            <IntelligentProtectedRoute permissions={['master']}>
              <MastersLayout />
            </IntelligentProtectedRoute>
          }>
            <Route path="council" element={<MastersCouncil />} />
            <Route path="archives" element={<SecretArchives />} />
          </Route>
          
          {/* Dynamic routes with prefetching */}
          <Route path="apprentice/:id" element={<ApprenticeProfile />} 
            loader={({ params }) => prefetchApprenticeData(params.id)}
          />
          
          {/* Multi-step forms across routes */}
          <Route path="certification" element={<CertificationWizard />}>
            <Route path="step/:stepId" element={<WizardStep />} />
          </Route>
        </Route>
      </Routes>
    </RouteStateProvider>
  );
}`}</pre>
				</div>

				<div className='advanced-integration'>
					<h3>Navigation with Complete React Integration</h3>
					<div className='integration-examples'>
						<div className='example-card'>
							<h4>Predictive Navigation Hook</h4>
							<pre>{`// Aria's pattern: Anticipate user navigation
const usePredictiveNavigation = () => {
  const location = useLocation();
  const { user } = useAuth();
  const analytics = useAnalytics();
  
  useEffect(() => {
    // Analyze user patterns
    const likelyNextRoute = analytics.predictNextRoute(
      location.pathname,
      user.history
    );
    
    // Prefetch likely destination
    if (likelyNextRoute) {
      prefetchRouteData(likelyNextRoute);
    }
  }, [location]);
  
  return { 
    preload: prefetchRouteData,
    likelihood: analytics.getRouteLikelihood
  };
};`}</pre>
						</div>
						
						<div className='example-card'>
							<h4>Form-Aware Navigation</h4>
							<pre>{`// Prevent data loss during navigation
const useFormAwareNavigation = () => {
  const navigate = useNavigate();
  const { formState, saveForm } = useFormContext();
  
  const safeNavigate = useCallback(async (to, options) => {
    if (formState.isDirty) {
      const shouldSave = await confirmDialog(
        'Save your changes?'
      );
      
      if (shouldSave) {
        await saveForm();
      } else if (!confirm('Discard changes?')) {
        return; // Cancel navigation
      }
    }
    
    navigate(to, options);
  }, [formState, navigate, saveForm]);
  
  return safeNavigate;
};`}</pre>
						</div>
					</div>
				</div>

				{!synthesisComplete && (
					<div className='synthesis-activation'>
						<h3>Activate the Complete System</h3>
						<p>Marina and Aria stand ready to demonstrate the full power of their creation...</p>
						<button 
							className='synthesis-button'
							onClick={completeSynthesis}>
							⚡ Initiate Navigation Synthesis
						</button>
					</div>
				)}

				{synthesisComplete && (
					<div className='synthesis-complete'>
						<h3>🎉 The Ultimate Synthesis Achieved!</h3>
						<div className='achievement-display'>
							<p>The room erupted in applause as the demonstration concluded. The synthesis 
							of all React patterns into a unified navigation system was complete.</p>
							
							<div className='master-recognition'>
								<h4>Master Status Achieved</h4>
								{Object.entries(masterStatus).map(([skill, achieved]) => (
									<div key={skill} className='skill-status'>
										<span>{skill}:</span>
										<span className={achieved ? 'mastered' : 'pending'}>
											{achieved ? '✓ Mastered' : '○ Learning'}
										</span>
									</div>
								))}
							</div>
						</div>
					</div>
				)}
			</div>

			<div className='lesson-insight'>
				<h3>The Ultimate Navigation Wisdom:</h3>
				<p>
					Marina and Aria's collaboration revealed the deepest truth about React navigation: 
					it's not a separate system, but the orchestration of all React patterns. Every 
					route is a component. Every navigation is a state change. Every transition can 
					be guarded by validation. Every journey can be enhanced with effects and context.
				</p>
				<p>
					"This is what mastery looks like," Marina announced to the assembly. "Not just 
					knowing individual patterns, but understanding how they create something greater 
					together. Aria has shown us that true expertise comes from synthesis."
				</p>
				<p>
					Binary projected a final message: "All systems integrated. Navigation framework 
					efficiency: 99.9%. React mastery: COMPLETE. Aria's journey: LEGENDARY."
				</p>
			</div>

			<div className='marina-tribute'>
				<h3>Marina's Recognition</h3>
				<p className='story-paragraph'>
					Marina stepped forward, her voice carrying across the chamber. "When I first 
					heard of Aria's arrival in our kingdom, I knew she was special. But witnessing 
					her journey - from uncertain apprentice to innovative master - has been truly 
					inspiring."
				</p>
				
				<p className='story-paragraph'>
					"You didn't just learn our patterns," Marina continued, addressing Aria directly. 
					"You transformed them. You showed us connections we never saw. You elevated our 
					entire understanding of what React can be."
				</p>
				
				<p className='story-paragraph'>
					The assembled masters nodded in agreement. From every quarter of the kingdom, 
					they had watched Aria grow, and now they witnessed her triumph.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on the Journey</h3>
				<p>
					How has understanding navigation as the synthesis of all React patterns changed 
					your perspective on building applications?
				</p>
				<p className='story-paragraph'>
					What possibilities open up when you treat routing as stateful, validated, and 
					intelligent rather than just URL changes?
				</p>
				<p className='story-paragraph'>
					As Aria's journey through the React Kingdom concludes, what patterns will you 
					take forward in your own development adventure?
				</p>
			</div>
		</div>
		</>
	);
	
	return <StoryContent content={content} />;
}

export default ChapterThree;