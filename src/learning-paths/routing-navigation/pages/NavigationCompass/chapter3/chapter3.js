import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import StoryContent from '../../../../../components/content/StoryContent';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';

function ChapterThree() {
	const {
		navigationHistory,
		handleNavigation,
		masterStatus,
		achieveMastery,
	} = useOutletContext();

	const [activeNav, setActiveNav] = useState('dashboard');
	const [breadcrumbs, setBreadcrumbs] = useState(['Home', 'Dashboard']);
	const [synthesisComplete, setSynthesisComplete] = useState(false);

	const unifiedPatterns = [
		{
			name: 'Stateful Nested Routes',
			icon: '🏰',
			description: 'Component hierarchies with preserved state',
			reactIntegration: 'Context + Effects for seamless data flow',
			code: 'StateProvider > Route > Route > Route',
		},
		{
			name: 'Intelligent Protected Routes',
			icon: '🔒',
			description: 'Multi-layer authentication with validation',
			reactIntegration: 'Form validation before route access',
			code: 'ValidateAuth > RequirePermissions > Route',
		},
		{
			name: 'Dynamic Layout Routes',
			icon: '📐',
			description: 'Adaptive layouts based on user context',
			reactIntegration: 'Hooks for responsive route structures',
			code: 'useLayout() > ConditionalOutlet',
		},
		{
			name: 'Predictive Navigation',
			icon: '🎯',
			description: 'AI-assisted route prefetching',
			reactIntegration: 'Effects + Memoization for performance',
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
				<ChapterIntro
					chapterNumber={3}
					title='Advanced Navigation Mastery'
					bridge="Marina led Aria to the advanced Navigation Laboratory. Here, she would learn the most sophisticated routing patterns - techniques that integrate everything she'd studied across her React journey."
				/>

				<div className='story-section'>
					<p className='story-paragraph'>
						"Now for the advanced concepts," Marina explained,
						activating a complex holographic display. "What you've
						learned about components, state, hooks, and forms - it
						all comes together in sophisticated navigation patterns
						that create truly intelligent React applications."
					</p>

					<p className='story-paragraph'>
						Aria watched in fascination as Binary projected her
						learning progress. "This is incredible! Navigation
						really does tie everything together - state management,
						form handling, validation, and user experience. How do
						we build such intelligent systems?"
					</p>

					<p className='story-paragraph'>
						The hologram displayed interconnected patterns, each
						glowing with the colors of different quarters. "Watch,"
						Marina said, "as I show you the ultimate synthesis of
						all React knowledge in navigation form."
					</p>

					<div className='ultimate-patterns-showcase'>
						<h3>The Unified Navigation Architecture</h3>
						<div className='route-list unified'>
							{unifiedPatterns.map((pattern) => (
								<div
									key={pattern.name}
									className='route-card mastery'>
									<div className='route-icon'>
										{pattern.icon}
									</div>
									<h5>{pattern.name}</h5>
									<p className='pattern-desc'>
										{pattern.description}
									</p>
									<div className='react-touch'>
										<strong>React Integration:</strong>
										<p>{pattern.reactIntegration}</p>
									</div>
									<code>{pattern.code}</code>
								</div>
							))}
						</div>
					</div>

					<div className='collaborative-demonstration'>
						<p className='story-paragraph'>
							"Let me show you what I mean," Marina said, her
							hands moving confidently across the interface. Aria
							watched with fascination as her teacher demonstrated
							these advanced navigation patterns.
						</p>
					</div>
				</div>

				<div className='interactive-section'>
					<h3 className='section-title'>
						The Complete Navigation System
					</h3>
					<InstructionBox character='Marina teaches Aria the complete navigation system.'>
						Click the synthesis button below to see all navigation patterns working together.
					</InstructionBox>

					<CodeExample
						title="Marina's Advanced Navigation Framework"
						code={`// The Ultimate Navigation Architecture
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { createContext, useContext, useState, useEffect, useMemo } from 'react';

// React learning: Stateful Route Provider
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

// Marina's expertise with React patterns: Intelligent Protected Route
function IntelligentProtectedRoute({ children, permissions = [] }) {
  const { user } = useAuth(); // React auth context
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
  
  // React addition: Validate before allowing access
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
}`}
					/>

					<div className='advanced-integration'>
						<h3>Navigation with Complete React Integration</h3>
						<div className='integration-examples'>
							<CodeExample
								title="Predictive Navigation Hook"
								code={`// React pattern: Anticipate user navigation
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
};`}
							/>

							<CodeExample
								title="Form-Aware Navigation"
								code={`// Prevent data loss during navigation
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
};`}
							/>
						</div>
					</div>

					{!synthesisComplete && (
						<div className='synthesis-activation'>
							<h3>Activate the Complete System</h3>
							<p>
								Marina stands ready to demonstrate the full
								power of advanced navigation patterns...
							</p>
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
								<p>
									The room erupted in applause as the
									demonstration concluded. The synthesis of
									all React patterns into a unified navigation
									system was complete.
								</p>

								<div className='master-recognition'>
									<h4>Master Status Achieved</h4>
									{Object.entries(masterStatus).map(
										([skill, achieved]) => (
											<div
												key={skill}
												className='skill-status'>
												<span>{skill}:</span>
												<span
													className={
														achieved
															? 'mastered'
															: 'pending'
													}>
													{achieved
														? '✓ Mastered'
														: '○ Learning'}
												</span>
											</div>
										)
									)}
								</div>
							</div>
						</div>
					)}
				</div>

				<ChapterSummary
					lessonInsight={{
						title: 'The Ultimate Navigation Wisdom:',
						content: "Marina's teaching revealed the deepest truth about React navigation: it's not a separate system, but the orchestration of all React patterns. Every route is a component. Every navigation is a state change. Every transition can be guarded by validation. Every journey can be enhanced with effects and context. \"This is what understanding looks like,\" Marina observed with satisfaction. \"Not just knowing individual patterns, but seeing how they create something greater together. You've learned that true knowledge comes from synthesis.\" Binary projected a final message: \"All systems integrated. Navigation framework understanding: 99.9%. React foundation: SOLID. Aria's learning: EXCELLENT.\""
					}}
					reflectionQuestions={[
						'How has understanding navigation as the synthesis of all React patterns changed your perspective on building applications?',
						'What possibilities open up when you treat routing as stateful, validated, and intelligent rather than just URL changes?',
						"As Aria's journey through the React Kingdom concludes, what patterns will you take forward in your own development adventure?"
					]}
					chapterEnding={[
						"Marina smiled with the satisfaction of a teacher whose student had grasped the deepest concepts. \"When I first heard of Aria's arrival in our kingdom, I knew she would be a dedicated learner. Witnessing her journey - from curious apprentice to knowledgeable practitioner - has been truly rewarding.\"",
						"\"You've learned our patterns beautifully,\" Marina continued, addressing Aria directly. \"You've connected concepts across domains. You've shown how a strong React foundation makes advanced navigation concepts accessible.\"",
						"Aria felt the weight of knowledge settling into place. From every quarter of the kingdom, she had learned from dedicated teachers, and now she understood how it all connected."
					]}
				/>
			</div>
		</>
	);

	return <StoryContent content={content} />;
}

export default ChapterThree;
