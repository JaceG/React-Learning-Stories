import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const ChapterThree = () => {
	const {
		portalState,
		modalPortals,
		createModalPortal,
		closeModalPortal
	} = useOutletContext();

	const [portalStack, setPortalStack] = useState([]);
	const [advancedPattern, setAdvancedPattern] = useState('wizard');
	const [wizardStep, setWizardStep] = useState(1);
	const [splitViewActive, setSplitViewActive] = useState(false);

	const advancedPatterns = [
		{
			id: 'wizard',
			name: 'Multi-Step Wizard',
			icon: '🧙',
			description: 'Sequential navigation through portal steps'
		},
		{
			id: 'split',
			name: 'Split View',
			icon: '✂️',
			description: 'Multiple portals side by side'
		},
		{
			id: 'nested',
			name: 'Nested Portals',
			icon: '🪆',
			description: 'Portals within portals'
		},
		{
			id: 'contextual',
			name: 'Contextual Portals',
			icon: '💭',
			description: 'Position-aware tooltips and popovers'
		}
	];

	const navigationMasteryConcepts = [
		{
			concept: 'URL State Sync',
			mastered: true,
			description: 'Keep URL and UI in perfect harmony'
		},
		{
			concept: 'Deep Linking',
			mastered: true,
			description: 'Direct access to any application state'
		},
		{
			concept: 'Navigation Guards',
			mastered: true,
			description: 'Protect routes with validation'
		},
		{
			concept: 'Transition Choreography',
			mastered: true,
			description: 'Smooth, meaningful animations'
		},
		{
			concept: 'Portal Management',
			mastered: true,
			description: 'Complex overlay systems'
		}
	];

	const handleWizardNavigation = (direction) => {
		if (direction === 'next' && wizardStep < 4) {
			setWizardStep(wizardStep + 1);
		} else if (direction === 'prev' && wizardStep > 1) {
			setWizardStep(wizardStep - 1);
		}
	};

	const addPortalToStack = () => {
		const newPortal = {
			id: Date.now(),
			level: portalStack.length + 1,
			title: `Portal Level ${portalStack.length + 1}`
		};
		setPortalStack([...portalStack, newPortal]);
	};

	const removePortalFromStack = (id) => {
		setPortalStack(portalStack.filter(p => p.id !== id));
	};

	return (
		<div className='chapter'>
			<h2 className='chapter-title'>
				Chapter 3: Mastery of the Portal Realms
			</h2>

			<div className='story-section'>
				<div className='journey-culmination'>
					<p className='story-paragraph'>
						The demonstration reached its climax as <strong>Aria</strong> prepared to 
						showcase the most advanced portal patterns. The entire React Kingdom had 
						gathered - this was more than a lesson, it was a celebration of mastery.
					</p>

					<p className='story-paragraph'>
						"You've seen individual techniques," Aria addressed the assembly, her voice 
						carrying the confidence of true understanding. "Now witness how they 
						<strong>orchestrate together</strong>. Advanced patterns like <strong>wizard 
						flows</strong>, <strong>split views</strong>, and <strong>contextual portals</strong> 
						aren't just navigation - they're the culmination of everything React offers."
					</p>

					<p className='story-paragraph'>
						She created a complex demonstration with <strong>Binary</strong>'s help - a 
						multi-step wizard with form validation, nested modals with shared context, 
						and smooth transitions that preserved state. Every master in attendance saw 
						their teachings reflected in her work.
					</p>

					<p className='story-paragraph'>
						<strong>Master Aurelius</strong> stood. "Citizens of the React Kingdom, we 
						witness not just technical mastery, but true understanding. Aria has shown us 
						that navigation is not just about moving through space - it's about 
						<strong>guiding users on meaningful journeys</strong> using every tool in our 
						kingdom."
					</p>
				</div>

				<div className='advanced-patterns-showcase'>
					<h3>Advanced Portal Patterns</h3>
					
					<div className='pattern-selector'>
						{advancedPatterns.map(pattern => (
							<div
								key={pattern.id}
								className={`pattern-card ${advancedPattern === pattern.id ? 'selected' : ''}`}
								onClick={() => setAdvancedPattern(pattern.id)}>
								<span className='pattern-icon'>{pattern.icon}</span>
								<h4>{pattern.name}</h4>
								<p>{pattern.description}</p>
							</div>
						))}
					</div>

					<div className='pattern-demonstration'>
						{advancedPattern === 'wizard' && (
							<div className='wizard-demo'>
								<h4>Multi-Step Portal Wizard</h4>
								<div className='wizard-progress'>
									{[1, 2, 3, 4].map(step => (
										<div
											key={step}
											className={`progress-step ${wizardStep >= step ? 'completed' : ''} ${wizardStep === step ? 'active' : ''}`}>
											<span className='step-number'>{step}</span>
											<span className='step-label'>Step {step}</span>
										</div>
									))}
								</div>
								<div className='wizard-content'>
									<h5>Current Step: {wizardStep}</h5>
									<p>Wizard content for step {wizardStep}</p>
									<div className='wizard-navigation'>
										<button 
											onClick={() => handleWizardNavigation('prev')}
											disabled={wizardStep === 1}>
											← Previous
										</button>
										<button 
											onClick={() => handleWizardNavigation('next')}
											disabled={wizardStep === 4}>
											Next →
										</button>
									</div>
								</div>
							</div>
						)}

						{advancedPattern === 'nested' && (
							<div className='nested-portal-demo'>
								<h4>Nested Portal Stack</h4>
								<div className='portal-stack-view'>
									{portalStack.map((portal, index) => (
										<div
											key={portal.id}
											className='stacked-portal'
											style={{ 
												zIndex: index + 1,
												transform: `scale(${1 - index * 0.05}) translateY(${index * 10}px)`
											}}>
											<h5>{portal.title}</h5>
											<button onClick={() => removePortalFromStack(portal.id)}>
												Close
											</button>
										</div>
									))}
								</div>
								<button onClick={addPortalToStack}>
									Add Portal Layer
								</button>
							</div>
						)}
					</div>
				</div>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Advanced Navigation Patterns
				</h3>

				<div className='code-example'>
					<pre>{`// Multi-Step Wizard with Route Persistence
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function WizardFlow({ steps }) {
  const navigate = useNavigate();
  const { stepId } = useParams();
  const currentStep = parseInt(stepId) || 1;
  
  const [wizardData, setWizardData] = useState({});
  const [visitedSteps, setVisitedSteps] = useState([1]);
  
  const goToStep = (step) => {
    if (step >= 1 && step <= steps.length) {
      navigate(\`/wizard/step/\${step}\`);
      setVisitedSteps(prev => 
        prev.includes(step) ? prev : [...prev, step]
      );
    }
  };
  
  const canNavigateToStep = (step) => {
    // Can always go back
    if (step < currentStep) return true;
    // Can only go forward one step at a time
    return step === currentStep + 1;
  };
  
  const saveStepData = (data) => {
    setWizardData(prev => ({
      ...prev,
      [currentStep]: data
    }));
  };
  
  return (
    <div className="wizard-container">
      <WizardProgress 
        steps={steps}
        currentStep={currentStep}
        visitedSteps={visitedSteps}
        onStepClick={goToStep}
        canNavigate={canNavigateToStep}
      />
      
      <WizardStep
        step={steps[currentStep - 1]}
        data={wizardData[currentStep]}
        onSave={saveStepData}
        onNext={() => goToStep(currentStep + 1)}
        onPrev={() => goToStep(currentStep - 1)}
        isFirst={currentStep === 1}
        isLast={currentStep === steps.length}
      />
    </div>
  );
}

// Route configuration
const wizardRoutes = {
  path: "wizard",
  element: <WizardLayout />,
  children: [
    {
      index: true,
      element: <Navigate to="step/1" replace />
    },
    {
      path: "step/:stepId",
      element: <WizardFlow steps={wizardSteps} />
    },
    {
      path: "complete",
      element: <WizardComplete />
    }
  ]
};`}</pre>
				</div>

				<div className='code-example'>
					<pre>{`// Split View Portal System
function SplitViewManager() {
  const [leftPanel, setLeftPanel] = useState(null);
  const [rightPanel, setRightPanel] = useState(null);
  const [splitRatio, setSplitRatio] = useState(50);
  
  return (
    <div className="split-view-container">
      <div 
        className="panel left-panel" 
        style={{ width: \`\${splitRatio}%\` }}>
        <PanelRouter 
          panel="left"
          content={leftPanel}
          onNavigate={setLeftPanel}
        />
      </div>
      
      <div 
        className="split-divider"
        onMouseDown={handleDragStart}
      />
      
      <div 
        className="panel right-panel" 
        style={{ width: \`\${100 - splitRatio}%\` }}>
        <PanelRouter 
          panel="right"
          content={rightPanel}
          onNavigate={setRightPanel}
        />
      </div>
    </div>
  );
}

// Contextual Portal Positioning
function ContextualPortal({ 
  anchor, 
  children, 
  placement = 'bottom' 
}) {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  
  useEffect(() => {
    if (!anchor) return;
    
    const updatePosition = () => {
      const rect = anchor.getBoundingClientRect();
      const positions = {
        top: {
          top: rect.top - 10,
          left: rect.left + rect.width / 2
        },
        bottom: {
          top: rect.bottom + 10,
          left: rect.left + rect.width / 2
        },
        left: {
          top: rect.top + rect.height / 2,
          left: rect.left - 10
        },
        right: {
          top: rect.top + rect.height / 2,
          left: rect.right + 10
        }
      };
      
      setPosition(positions[placement]);
    };
    
    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);
    
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [anchor, placement]);
  
  return createPortal(
    <div 
      className={\`contextual-portal \${placement}\`}
      style={{
        position: 'fixed',
        top: position.top,
        left: position.left,
        transform: 'translate(-50%, 0)'
      }}>
      {children}
    </div>,
    document.body
  );
}`}</pre>
				</div>

				<div className='navigation-orchestration'>
					<h3>Complete Navigation System</h3>
					<div className='code-example'>
						<pre>{`// Unified Navigation Architecture
const NavigationSystem = {
  // Route configuration
  routes: createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      errorElement: <ErrorBoundary />,
      loader: rootLoader,
      children: [
        // Public routes
        {
          path: 'public',
          element: <PublicLayout />,
          children: publicRoutes
        },
        // Protected routes with guards
        {
          path: 'app',
          element: <ProtectedRoute><AppLayout /></ProtectedRoute>,
          children: [
            // Feature modules with lazy loading
            {
              path: 'dashboard',
              lazy: () => import('./features/dashboard'),
              handle: { preload: true }
            },
            // Nested wizard flow
            {
              path: 'onboarding',
              element: <WizardLayout />,
              children: wizardRoutes
            },
            // Modal routes
            {
              path: 'settings',
              element: <SettingsLayout />,
              children: [
                {
                  path: 'modal/:modalId',
                  element: <ModalRouter />
                }
              ]
            }
          ]
        }
      ]
    }
  ]),
  
  // Navigation state management
  navigationStore: {
    history: [],
    breadcrumbs: [],
    activeModals: [],
    transitions: new Map(),
    guards: new Map()
  },
  
  // Utility functions
  utils: {
    preloadRoute: (path) => {
      // Preload route components and data
    },
    
    canNavigate: (to, from, user) => {
      // Check all guards
      const guards = navigationStore.guards.get(to);
      return guards?.every(guard => guard(user)) ?? true;
    },
    
    getTransition: (from, to) => {
      // Get appropriate transition
      return navigationStore.transitions.get(\`\${from}->\${to}\`);
    }
  }
};

// Hook for navigation state
function useNavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const matches = useMatches();
  
  return {
    currentPath: location.pathname,
    breadcrumbs: useBreadcrumbs(matches),
    canGoBack: useCanGoBack(),
    navigateWithTransition: useTransitionNavigate(navigate),
    preload: NavigationSystem.utils.preloadRoute
  };
}`}</pre>
					</div>
				</div>

				<div className='best-practices-summary'>
					<h3>Navigation Best Practices</h3>
					<div className='practice-grid'>
						<div className='practice-card'>
							<h4>URL Design</h4>
							<ul>
								<li>Make URLs human-readable</li>
								<li>Use consistent patterns</li>
								<li>Support deep linking</li>
								<li>Handle 404s gracefully</li>
							</ul>
						</div>
						<div className='practice-card'>
							<h4>Performance</h4>
							<ul>
								<li>Lazy load route components</li>
								<li>Preload critical routes</li>
								<li>Optimize bundle splitting</li>
								<li>Cache route data</li>
							</ul>
						</div>
						<div className='practice-card'>
							<h4>User Experience</h4>
							<ul>
								<li>Show loading states</li>
								<li>Preserve scroll position</li>
								<li>Animate transitions</li>
								<li>Provide breadcrumbs</li>
							</ul>
						</div>
						<div className='practice-card'>
							<h4>Accessibility</h4>
							<ul>
								<li>Announce route changes</li>
								<li>Manage focus properly</li>
								<li>Support keyboard nav</li>
								<li>Test with screen readers</li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			<div className='navigation-mastery'>
				<h3>Your Navigation Mastery</h3>
				<div className='mastery-summary'>
					{navigationMasteryConcepts.map(item => (
						<div key={item.concept} className='mastery-item'>
							<span className='mastery-icon'>⭐</span>
							<div className='mastery-details'>
								<h4>{item.concept}</h4>
								<p>{item.description}</p>
							</div>
							<span className='mastery-status'>Mastered!</span>
						</div>
					))}
				</div>
			</div>

			<div className='navigation-master-ceremony'>
				<h3>The Navigation Master Ceremony</h3>
				<div className='grand-finale'>
					<p className='story-paragraph'>
						As Aria's demonstration concluded, the Great Hall erupted in appreciation. 
						<strong>Marina</strong> stepped forward, tears of pride in her eyes.
					</p>
					
					<p className='story-paragraph'>
						"When I requested Aria for the Navigation Corps," Marina announced, "I knew 
						her comprehensive knowledge would bring new insights. But she has exceeded 
						every expectation. She hasn't just learned our ways - she has revolutionized 
						them."
					</p>
					
					<div className='testimonials-section'>
						<div className='master-testimonial'>
							<p><strong>Elder useState:</strong> "Her state management in portals shows 
							mastery beyond her years."</p>
						</div>
						<div className='master-testimonial'>
							<p><strong>Captain Thunk:</strong> "The way she orchestrates effects with 
							navigation is simply brilliant."</p>
						</div>
						<div className='master-testimonial'>
							<p><strong>Commander Validus:</strong> "Form validation across portal 
							boundaries - we never imagined it possible!"</p>
						</div>
					</div>
				</div>
			</div>

			<div className='aria-final-address'>
				<h3>Aria's Vision for the Future</h3>
				<div className='final-speech'>
					<p className='aria-words'>
						"My journey through the React Kingdom taught me that no concept exists in 
						isolation," Aria addressed the assembly. "Components need state, state needs 
						effects, forms need validation, and navigation ties it all together. But most 
						importantly, I learned that true mastery comes from teaching others."
					</p>
					
					<p className='aria-words'>
						"I choose to stay and guide future apprentices. Not just in navigation, but 
						in seeing React as one unified system. Every apprentice deserves to discover 
						these connections, to feel the joy of understanding how it all works together."
					</p>
					
					<p className='binary-moment'>
						<strong>Binary</strong> projected a holographic map of the React Kingdom, 
						showing how every quarter connected through the Central Citadel. "We did it, 
						Aria! From uncertain apprentice to Kingdom Guide!"
					</p>
				</div>
			</div>

			<div className='new-role-announcement'>
				<h3>A New Chapter Begins</h3>
				<p className='story-paragraph'>
					<strong>Master Aurelius</strong> placed a ceremonial medallion around Aria's 
					neck. "By unanimous decision of all Quarter Masters, we hereby appoint 
					<strong>Aria</strong> as the first <strong>React Kingdom Integration Guide</strong>. 
					She will help future apprentices see not just the parts, but the whole."
				</p>
				
				<p className='story-paragraph'>
					The crowd cheered as Aria stood with the masters - no longer a student, but 
					a teacher, mentor, and guide. Her journey through components, state, props, 
					hooks, forms, and navigation had transformed her into something greater: 
					someone who could show others the beauty of how it all connects.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Your Journey Continues</h3>
				<p>
					Like Aria, you've traveled through the entire React Kingdom. You've seen how 
					components provide structure, state brings life, props enable communication, 
					hooks add power, forms connect users, and navigation creates experiences.
				</p>
				<p>
					But your journey doesn't end here. What will you build with this complete 
					understanding? How will you combine these concepts in new and innovative ways? 
					Most importantly, who will you teach along the way?
				</p>
				<p className='final-thought'>
					Remember Aria's greatest lesson: React isn't a collection of separate concepts - 
					it's one beautiful, interconnected system. And now, you understand it all.
				</p>
			</div>
		</div>
	);
};

export default ChapterThree;