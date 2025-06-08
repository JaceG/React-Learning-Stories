import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import StoryContent from '../../../../../components/content/StoryContent';

function ChapterOne() {
	const {
		activeWaypoint,
		waypointHistory,
		createWaypoint,
		navigateToWaypoint,
		masterMode,
		setMasterMode,
		ariaPatterns,
	} = useOutletContext();

	const [showCreationProcess, setShowCreationProcess] = useState(false);
	const [customWaypoint, setCustomWaypoint] = useState({
		name: '',
		path: '',
		icon: '📍',
		description: '',
		ariaEnhancement: '',
	});

	const predefinedWaypoints = [
		{
			id: 'home',
			name: 'Castle Keep',
			path: '/',
			icon: '🏰',
			description: 'The heart of the kingdom',
			coordinates: { x: 50, y: 50 },
			ariaPattern: 'Component-based navigation hub',
		},
		{
			id: 'market',
			name: 'Grand Bazaar',
			path: '/products',
			icon: '🏪',
			description: 'Where merchants gather',
			coordinates: { x: 20, y: 30 },
			ariaPattern: 'State-managed product catalog',
		},
		{
			id: 'academy',
			name: 'Arcane Academy',
			path: '/learn',
			icon: '🎓',
			description: 'Center of knowledge',
			coordinates: { x: 80, y: 20 },
			ariaPattern: 'Hook-powered learning paths',
		},
		{
			id: 'forge',
			name: 'Dragon Forge',
			path: '/craft',
			icon: '🔥',
			description: 'Where magic items are made',
			coordinates: { x: 30, y: 70 },
			ariaPattern: 'Form-validated crafting system',
		},
	];

	const waypointIcons = ['📍', '⭐', '💎', '🗺️', '🧭', '🏴', '🎯', '🔮'];

	const content = (
		<>
			<div className='chapter'>
				<h2 className='chapter-title'>
					Chapter 1: Architecting the Future
				</h2>

				<div className='chapter-bridge'>
					<p>
						The Waypoint Sanctum's crystal dome refracted light into
						countless rainbows. Marina and Aria stood at the center,
						surrounded by floating navigation orbs. The kingdom's
						brightest minds had gathered to witness the unveiling of
						revolutionary navigation architecture.
					</p>
				</div>

				<div className='story-section'>
					<p className='story-paragraph'>
						"Welcome, architects of the future," Marina began, her
						voice resonating through the chamber. "Today, Master
						Aria and I will show you how waypoints become more than
						destinations - they become intelligent navigation
						nodes."
					</p>

					<p className='story-paragraph'>
						Aria stepped forward, Binary projecting a complex
						navigation matrix. "In my journey through every quarter,
						I discovered that routes are living entities. They
						breathe with state, pulse with effects, communicate
						through props, and transform through hooks."
					</p>

					<p className='story-paragraph'>
						A young architect raised her hand. "Master Aria, how do
						you make routes intelligent?"
					</p>
					<p className='story-paragraph'>
						"By integrating every pattern," Aria replied, activating
						the sanctum's holographic display. "Watch as Marina and
						I demonstrate the{' '}
						<strong>Waypoint Architecture Pattern</strong> - where
						navigation becomes a symphony of all React knowledge."
					</p>

					<p className='story-paragraph'>
						Binary chirped excitedly: "System initialization!
						Marina's routing: LOADED. Aria's patterns: INTEGRATED.
						Waypoint intelligence: ACTIVATING!"
					</p>

					<div className='waypoint-map master-architecture'>
						<h3>The Marina-Aria Navigation Architecture</h3>

						{!masterMode && (
							<button
								className='master-mode-toggle'
								onClick={() => setMasterMode(true)}>
								✨ Activate Master Vision
							</button>
						)}

						<div className='map-container enhanced'>
							<svg
								viewBox='0 0 100 100'
								className='waypoint-svg master-enhanced'>
								{/* Draw intelligent connections */}
								{masterMode &&
									predefinedWaypoints.map(
										(waypoint, index) => {
											const nextIndex =
												(index + 1) %
												predefinedWaypoints.length;
											const next =
												predefinedWaypoints[nextIndex];
											return (
												<g
													key={`connection-${waypoint.id}`}>
													<line
														x1={
															waypoint.coordinates
																.x
														}
														y1={
															waypoint.coordinates
																.y
														}
														x2={next.coordinates.x}
														y2={next.coordinates.y}
														stroke='rgba(147, 51, 234, 0.3)'
														strokeWidth='1'
														strokeDasharray='2,2'
														className='intelligent-path'
													/>
													<text
														x={
															(waypoint
																.coordinates.x +
																next.coordinates
																	.x) /
															2
														}
														y={
															(waypoint
																.coordinates.y +
																next.coordinates
																	.y) /
															2
														}
														fontSize='3'
														fill='#9333ea'
														textAnchor='middle'>
														state flow
													</text>
												</g>
											);
										}
									)}

								{/* Draw intelligent waypoints */}
								{predefinedWaypoints.map((waypoint) => (
									<g key={waypoint.id}>
										<circle
											cx={waypoint.coordinates.x}
											cy={waypoint.coordinates.y}
											r={masterMode ? '10' : '8'}
											fill={
												activeWaypoint === waypoint.id
													? '#8b5cf6'
													: '#e9d5ff'
											}
											stroke='#7c3aed'
											strokeWidth='2'
											className='waypoint-node intelligent'
											onClick={() =>
												navigateToWaypoint(waypoint.id)
											}
										/>
										<text
											x={waypoint.coordinates.x}
											y={waypoint.coordinates.y + 2}
											textAnchor='middle'
											fontSize='8'
											className='waypoint-icon'>
											{waypoint.icon}
										</text>
										<text
											x={waypoint.coordinates.x}
											y={waypoint.coordinates.y + 15}
											textAnchor='middle'
											fontSize='4'
											fill='#6b7280'>
											{waypoint.name}
										</text>
									</g>
								))}
							</svg>
						</div>

						<div className='waypoint-legend master-enhanced'>
							<h4>Intelligent Waypoint System</h4>
							{predefinedWaypoints.map((waypoint) => (
								<div
									key={waypoint.id}
									className={`waypoint-item ${
										activeWaypoint === waypoint.id
											? 'active'
											: ''
									}`}
									onClick={() =>
										navigateToWaypoint(waypoint.id)
									}>
									<span className='waypoint-icon'>
										{waypoint.icon}
									</span>
									<div className='waypoint-info'>
										<h5>{waypoint.name}</h5>
										<p>{waypoint.description}</p>
										<code>{waypoint.path}</code>
										{masterMode && (
											<div className='aria-pattern'>
												<strong>Aria's Pattern:</strong>
												<p>{waypoint.ariaPattern}</p>
											</div>
										)}
									</div>
								</div>
							))}
						</div>
					</div>

					<div className='masters-dialogue'>
						<p className='story-paragraph'>
							"Notice how each waypoint isn't just a destination,"
							Aria explained to the assembled architects. "The
							Castle Keep uses component composition. The Grand
							Bazaar manages product state. The Academy leverages
							custom hooks. The Forge validates with forms."
						</p>

						<p className='story-paragraph'>
							Marina added, "And they all communicate through our
							unified navigation system. This is the future -
							routes that understand context, preserve state, and
							adapt to user needs."
						</p>
					</div>
				</div>

				<div className='interactive-section'>
					<h3 className='section-title'>
						The Marina-Aria Waypoint Architecture
					</h3>
					<p className='collaboration-note'>
						The masters demonstrate their revolutionary routing
						patterns...
					</p>

					<div className='code-example collaborative'>
						<h3>Intelligent Route Configuration</h3>
						<pre>{`// Marina's Foundation + Aria's Intelligence
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { StateProvider, useAppState } from './aria-patterns';

// The Master Router Architecture
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      // Aria's pattern: Wrap routes with state management
      <StateProvider>
        <IntelligentLayout />
      </StateProvider>
    ),
    // Marina's error boundaries
    errorElement: <SmartErrorBoundary />,
    // Aria's pattern: Root data prefetching
    loader: async () => {
      const [user, preferences, notifications] = await Promise.all([
        fetchUser(),
        fetchPreferences(),
        fetchNotifications()
      ]);
      return { user, preferences, notifications };
    },
    children: [
      {
        index: true,
        element: <IntelligentHome />,
        // Enhanced metadata
        handle: {
          title: "Kingdom Central",
          icon: "🏰",
          breadcrumb: "Home",
          // Aria's additions
          preload: ['user', 'preferences'],
          stateKey: 'home',
          effects: ['trackVisit', 'prefetchCommon']
        }
      },
      {
        path: "dashboard",
        // Lazy loading with intelligence
        lazy: async () => {
          const module = await import("./routes/Dashboard");
          // Aria's pattern: Prepare state before render
          await prepareRouteState('dashboard');
          return module;
        },
        handle: {
          title: "Command Center",
          icon: "📋",
          breadcrumb: "Dashboard",
          requiresAuth: true,
          // Context-aware permissions
          permissions: (user) => user.role === 'admin' || user.isDashboardEnabled,
          // State preservation
          preserveOnExit: true
        }
      },
      {
        path: "journey/:stage",
        element: <JourneyTracker />,
        // Dynamic loader with validation
        loader: async ({ params }) => {
          // Aria's pattern: Validate before loading
          const isValidStage = await validateStage(params.stage);
          if (!isValidStage) {
            throw new Response("Invalid journey stage", { status: 404 });
          }
          
          return loadStageData(params.stage);
        },
        // Form actions with intelligence
        action: async ({ request, params }) => {
          const formData = await request.formData();
          
          // Aria's validation integration
          const validation = await validateStageProgress(formData);
          if (!validation.isValid) {
            return { errors: validation.errors };
          }
          
          // Process with state preservation
          return processStageAdvancement(params.stage, formData);
        },
        handle: {
          breadcrumb: (data) => data?.stage?.name || "Journey",
          // Reactive permissions
          requiresAuth: true,
          canAccess: (user, data) => {
            return user.completedStages?.includes(data?.previousStage);
          }
        }
      }
    ]
  }
]);

// Intelligent Route Metadata Hook
export function useRouteIntelligence() {
  const matches = useMatches();
  const { user } = useAuth();
  const { preserveState, restoreState } = useStatePreservation();
  
  // Extract and enhance route metadata
  const routeInfo = useMemo(() => {
    const current = matches[matches.length - 1];
    const handle = current?.handle || {};
    
    return {
      title: handle.title,
      icon: handle.icon,
      canAccess: handle.canAccess ? handle.canAccess(user, current.data) : true,
      requiresAuth: handle.requiresAuth,
      shouldPreserve: handle.preserveOnExit,
      effects: handle.effects || []
    };
  }, [matches, user]);
  
  // Execute route effects
  useEffect(() => {
    routeInfo.effects.forEach(effect => {
      executeRouteEffect(effect, { user, route: routeInfo });
    });
  }, [routeInfo.effects]);
  
  // Handle state preservation
  useEffect(() => {
    return () => {
      if (routeInfo.shouldPreserve) {
        preserveState(routeInfo.title, getCurrentRouteState());
      }
    };
  }, [routeInfo]);
  
  return routeInfo;
}`}</pre>
					</div>

					<div className='waypoint-creation master-workshop'>
						<h3>Architect an Intelligent Waypoint</h3>
						<div className='creation-form enhanced'>
							<div className='form-group'>
								<label>Waypoint Name</label>
								<input
									type='text'
									value={customWaypoint.name}
									onChange={(e) =>
										setCustomWaypoint({
											...customWaypoint,
											name: e.target.value,
										})
									}
									placeholder='Mystic Grove'
								/>
							</div>
							<div className='form-group'>
								<label>Path</label>
								<input
									type='text'
									value={customWaypoint.path}
									onChange={(e) =>
										setCustomWaypoint({
											...customWaypoint,
											path: e.target.value,
										})
									}
									placeholder='/grove'
								/>
							</div>
							<div className='form-group'>
								<label>Icon</label>
								<div className='icon-selector'>
									{waypointIcons.map((icon) => (
										<button
											key={icon}
											className={`icon-option ${
												customWaypoint.icon === icon
													? 'selected'
													: ''
											}`}
											onClick={() =>
												setCustomWaypoint({
													...customWaypoint,
													icon,
												})
											}>
											{icon}
										</button>
									))}
								</div>
							</div>
							<div className='form-group'>
								<label>Description</label>
								<textarea
									value={customWaypoint.description}
									onChange={(e) =>
										setCustomWaypoint({
											...customWaypoint,
											description: e.target.value,
										})
									}
									placeholder='A peaceful place for meditation...'
								/>
							</div>
							{masterMode && (
								<div className='form-group aria-enhancement'>
									<label>Aria's Pattern Integration</label>
									<select
										value={customWaypoint.ariaEnhancement}
										onChange={(e) =>
											setCustomWaypoint({
												...customWaypoint,
												ariaEnhancement: e.target.value,
											})
										}>
										<option value=''>
											Select Pattern...
										</option>
										<option value='state'>
											State Management
										</option>
										<option value='hooks'>
											Custom Hooks
										</option>
										<option value='context'>
											Context Providers
										</option>
										<option value='forms'>
											Form Validation
										</option>
									</select>
								</div>
							)}
							<button
								className='create-waypoint-btn master-create'
								onClick={() => {
									createWaypoint(customWaypoint);
									setShowCreationProcess(true);
								}}>
								Architect Waypoint ✨
							</button>
						</div>

						{showCreationProcess && (
							<div className='creation-result master-result'>
								<h4>Intelligent Waypoint Architected!</h4>
								<div className='code-snippet'>
									{`{
  path: "${customWaypoint.path}",
  element: <${customWaypoint.name.replace(/\s+/g, '')} />,
  loader: async () => {
    // Marina's data loading
    const data = await fetchRouteData();
    ${
		customWaypoint.ariaEnhancement
			? `
    // Aria's ${customWaypoint.ariaEnhancement} integration
    await prepare${customWaypoint.ariaEnhancement}State(data);`
			: ''
	}
    return data;
  },
  handle: {
    title: "${customWaypoint.name}",
    icon: "${customWaypoint.icon}",
    description: "${customWaypoint.description}"${
										customWaypoint.ariaEnhancement
											? `,
    pattern: "${customWaypoint.ariaEnhancement}",
    stateKey: "${customWaypoint.path.slice(1)}"`
											: ''
									}
  }
}`}
								</div>
								<p className='creation-note'>
									Marina: "Excellent route structure!"
									<br />
									Aria: "And beautifully integrated with React
									patterns!"
								</p>
							</div>
						)}
					</div>

					<div className='code-example'>
						<h3>The Complete Waypoint System</h3>
						<pre>{`// Marina & Aria's Advanced Route Architecture
import { createBrowserRouter, useNavigation, useMatches } from 'react-router-dom';
import { useRouteState, useRouteEffects, useRouteValidation } from './aria-hooks';

// Intelligent Route Factory
class WaypointArchitect {
  constructor() {
    this.routes = [];
    this.metadata = new Map();
    this.validators = new Map();
  }
  
  // Marina's route creation
  createWaypoint(config) {
    const route = {
      path: config.path,
      element: this.wrapWithIntelligence(config.element, config),
      loader: this.enhanceLoader(config.loader, config),
      action: this.enhanceAction(config.action, config),
      errorElement: config.errorElement || <IntelligentError />,
      handle: this.buildMetadata(config)
    };
    
    // Aria's enhancements
    if (config.stateManagement) {
      route.element = <StateWrapper config={config}>{route.element}</StateWrapper>;
    }
    
    if (config.validation) {
      this.validators.set(config.path, config.validation);
    }
    
    this.routes.push(route);
    return route;
  }
  
  // Aria's intelligent wrapper
  wrapWithIntelligence(element, config) {
    return (
      <RouteIntelligence config={config}>
        {element}
      </RouteIntelligence>
    );
  }
  
  // Enhanced loader with prefetching
  enhanceLoader(loader, config) {
    return async (args) => {
      // Marina's base loading
      const data = loader ? await loader(args) : {};
      
      // Aria's prefetching
      if (config.prefetch) {
        await Promise.all(
          config.prefetch.map(key => prefetchData(key))
        );
      }
      
      // State restoration
      if (config.preserveState) {
        const savedState = await restoreRouteState(config.path);
        return { ...data, savedState };
      }
      
      return data;
    };
  }
  
  // Build comprehensive metadata
  buildMetadata(config) {
    return {
      title: config.title,
      icon: config.icon,
      breadcrumb: config.breadcrumb || config.title,
      requiresAuth: config.requiresAuth,
      permissions: config.permissions,
      // Aria's additions
      stateKey: config.stateKey,
      effects: config.effects || [],
      validators: config.validators || [],
      preserveOnExit: config.preserveState,
      analyticsEvent: config.analytics
    };
  }
}

// Using the Waypoint Architect
const architect = new WaypointArchitect();

// Create intelligent routes
architect.createWaypoint({
  path: "marketplace",
  element: <Marketplace />,
  title: "Grand Marketplace",
  icon: "🏪",
  // Marina's features
  loader: marketplaceLoader,
  requiresAuth: true,
  // Aria's enhancements
  stateManagement: true,
  preserveState: true,
  prefetch: ['products', 'categories'],
  validation: {
    onEnter: validateMarketAccess,
    onExit: confirmUnsavedChanges
  },
  effects: ['trackVisit', 'loadUserPreferences'],
  analytics: 'marketplace_view'
});

// The Intelligent Navigation Component
function IntelligentNavigation() {
  const matches = useMatches();
  const navigation = useNavigation();
  const { preserveState } = useRouteState();
  const { executeEffects } = useRouteEffects();
  
  // Current route intelligence
  const currentRoute = useMemo(() => {
    const match = matches[matches.length - 1];
    return {
      ...match,
      isLoading: navigation.state === 'loading',
      isSubmitting: navigation.state === 'submitting',
      metadata: match?.handle || {}
    };
  }, [matches, navigation]);
  
  // Execute route effects
  useEffect(() => {
    if (currentRoute.metadata.effects) {
      executeEffects(currentRoute.metadata.effects, {
        route: currentRoute,
        user: currentUser
      });
    }
  }, [currentRoute]);
  
  // Handle state preservation
  useEffect(() => {
    return () => {
      if (currentRoute.metadata.preserveOnExit) {
        preserveState(currentRoute.pathname);
      }
    };
  }, [currentRoute]);
  
  return (
    <nav className="intelligent-nav">
      {/* Navigation UI */}
    </nav>
  );
}`}</pre>
					</div>

					<div className='waypoint-features master-features'>
						<h3>Marina & Aria's Waypoint Enhancements</h3>
						<div className='feature-grid master-grid'>
							<div className='feature-card'>
								<h4>Intelligent Loaders</h4>
								<p className='marina'>Marina: Data fetching</p>
								<p className='aria'>
									Aria: + State prefetching
								</p>
								<code>{`loader: intelligentLoader()`}</code>
							</div>
							<div className='feature-card'>
								<h4>Smart Actions</h4>
								<p className='marina'>Marina: Form handling</p>
								<p className='aria'>Aria: + Validation flow</p>
								<code>{`action: validatedAction()`}</code>
							</div>
							<div className='feature-card'>
								<h4>Reactive Boundaries</h4>
								<p className='marina'>Marina: Error catching</p>
								<p className='aria'>Aria: + State recovery</p>
								<code>{`errorElement: <SmartError />`}</code>
							</div>
							<div className='feature-card'>
								<h4>Predictive Loading</h4>
								<p className='marina'>Marina: Lazy loading</p>
								<p className='aria'>Aria: + Preload hints</p>
								<code>{`lazy: predictiveImport()`}</code>
							</div>
						</div>
						<div className='feature-explanation'>
							<p className='story-paragraph'>
								"Each enhancement builds on the foundation,"
								Aria explained. "We're not just loading data -
								we're orchestrating entire user experiences."
							</p>
						</div>
					</div>

					<div className='masters-demonstration'>
						<h3>Live Architecture Demonstration</h3>
						<p className='story-paragraph'>
							The assembled architects watched in awe as Marina
							and Aria demonstrated their complete waypoint
							system. Master Aurelius from the Northern Quarter
							stood up. "This is remarkable! You've transformed
							simple routing into an intelligent navigation
							ecosystem!"
						</p>

						<p className='story-paragraph'>
							The State Sorcerer added, "The way state flows
							through your routes... it's like watching a river
							system that knows where it needs to go!"
						</p>

						<p className='story-paragraph'>
							Marina smiled at Aria. "This is what true mastery
							looks like - not just knowing patterns, but weaving
							them into something greater."
						</p>

						<p className='story-paragraph'>
							Binary projected the final statistics: "Waypoint
							intelligence: MAXIMUM! Pattern integration:
							COMPLETE! Marina + Aria collaboration: LEGENDARY!
							Future architects will study this system for
							generations!"
						</p>
					</div>
				</div>

				<div className='journey-tracker master-journey'>
					<h3>Your Architectural Journey</h3>
					<div className='journey-path enhanced'>
						{waypointHistory.map((waypoint, index) => (
							<div key={index} className='journey-step'>
								<span className='step-icon'>📍</span>
								<span className='step-name'>{waypoint}</span>
								{masterMode && (
									<span className='step-pattern'>
										{index % 4 === 0
											? 'component'
											: index % 4 === 1
											? 'state'
											: index % 4 === 2
											? 'hook'
											: 'form'}
									</span>
								)}
								{index < waypointHistory.length - 1 && (
									<span className='step-arrow'>→</span>
								)}
							</div>
						))}
					</div>
				</div>

				<div className='lesson-insight'>
					<h3>The Masters' Wisdom:</h3>
					<p>
						Marina and Aria stood together, their combined knowledge
						radiating through the chamber. "Waypoints are living
						entities," Marina began.
					</p>
					<p>
						"They breathe with state, pulse with effects,
						communicate through context, and evolve through user
						interaction," Aria continued.
					</p>
					<p>
						"Together," they said in unison, "we've shown you that
						navigation isn't just about moving between pages - it's
						about orchestrating entire application experiences."
					</p>
					<p className='story-paragraph'>
						The young architect who had asked the first question
						stood up. "I understand now! Every route is a complete
						React application in miniature, with all the patterns
						working in harmony!"
					</p>
					<p className='story-paragraph'>
						"Exactly!" Aria beamed with pride. "You're ready to
						architect the future."
					</p>
				</div>

				<div className='reflection-section'>
					<h3>Reflect on the Story</h3>
					<p>
						How does treating routes as intelligent entities that
						integrate all React patterns change your approach to
						application architecture?
					</p>
					<p className='story-paragraph'>
						What possibilities open up when waypoints can preserve
						state, execute effects, validate transitions, and adapt
						to user behavior?
					</p>
					<p className='story-paragraph'>
						How has Aria's complete journey through the React
						Kingdom prepared her to architect these revolutionary
						navigation systems with Marina?
					</p>
				</div>
			</div>
		</>
	);

	return <StoryContent content={content} />;
}

export default ChapterOne;
