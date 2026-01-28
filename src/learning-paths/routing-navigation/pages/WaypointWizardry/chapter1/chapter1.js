import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import StoryContent from '../../../../../components/content/StoryContent';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';
import StorySection from '../../../../../components/content/StorySection';

function ChapterOne() {
	const {
		activeWaypoint,
		waypointHistory,
		createWaypoint,
		navigateToWaypoint,
		masterMode,
		setMasterMode,
		reactPatterns,
	} = useOutletContext();

	const [showCreationProcess, setShowCreationProcess] = useState(false);
	const [customWaypoint, setCustomWaypoint] = useState({
		name: '',
		path: '',
		icon: '📍',
		description: '',
		reactEnhancement: '',
	});

	const predefinedWaypoints = [
		{
			id: 'home',
			name: 'Castle Keep',
			path: '/',
			icon: '🏰',
			description: 'The heart of the kingdom',
			coordinates: { x: 50, y: 50 },
			reactPattern: 'Component-based navigation hub',
		},
		{
			id: 'market',
			name: 'Grand Bazaar',
			path: '/products',
			icon: '🏪',
			description: 'Where merchants gather',
			coordinates: { x: 20, y: 30 },
			reactPattern: 'State-managed product catalog',
		},
		{
			id: 'academy',
			name: 'Arcane Academy',
			path: '/learn',
			icon: '🎓',
			description: 'Center of knowledge',
			coordinates: { x: 80, y: 20 },
			reactPattern: 'Hook-powered learning paths',
		},
		{
			id: 'forge',
			name: 'Dragon Forge',
			path: '/craft',
			icon: '🔥',
			description: 'Where magic items are made',
			coordinates: { x: 30, y: 70 },
			reactPattern: 'Form-validated crafting system',
		},
	];

	const waypointIcons = ['📍', '⭐', '💎', '🗺️', '🧭', '🏴', '🎯', '🔮'];

	const content = (
		<>
			<div className='chapter'>
				<ChapterIntro
					chapterNumber={1}
					title='Advanced Waypoint Patterns'
					bridge="Marina guided Aria into the Waypoint Sanctum's crystal dome, where light refracted into countless rainbows. Here, surrounded by floating navigation orbs, she would learn the most advanced routing patterns that could adapt and respond to user behavior."
				/>

				<StorySection
					paragraphs={[
						`"Welcome to advanced waypoint training," Marina began, her voice resonating through the chamber. "Today, I'll teach you how waypoints become more than destinations - they become intelligent navigation nodes."`,
						`Marina activated a complex navigation matrix. "In your journey through every quarter, you've learned that routes are living entities. They breathe with state, pulse with effects, communicate through props, and transform through hooks."`,
						`Aria watched with growing understanding. "So routes can be intelligent? How do we make them respond to user context and behavior?"`,
						<>
							"By integrating every pattern you've learned,"
							Marina replied, activating the sanctum's holographic
							display. "Watch as I demonstrate the{' '}
							<strong>Waypoint Architecture Pattern</strong> -
							where navigation becomes a symphony of all React
							knowledge."
						</>,
						`Binary chirped excitedly: "System initialization! Marina's routing: LOADED. Aria's foundation: READY. Waypoint intelligence: ACTIVATING!"`,
					]}
				/>

				<div className='waypoint-map master-architecture'>
					<h3>Marina's Advanced Navigation Architecture</h3>

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
								predefinedWaypoints.map((waypoint, index) => {
									const nextIndex =
										(index + 1) %
										predefinedWaypoints.length;
									const next = predefinedWaypoints[nextIndex];
									return (
										<g key={`connection-${waypoint.id}`}>
											<line
												x1={waypoint.coordinates.x}
												y1={waypoint.coordinates.y}
												x2={next.coordinates.x}
												y2={next.coordinates.y}
												stroke='rgba(147, 51, 234, 0.3)'
												strokeWidth='1'
												strokeDasharray='2,2'
												className='intelligent-path'
											/>
											<text
												x={
													(waypoint.coordinates.x +
														next.coordinates.x) /
													2
												}
												y={
													(waypoint.coordinates.y +
														next.coordinates.y) /
													2
												}
												fontSize='3'
												fill='#9333ea'
												textAnchor='middle'>
												state flow
											</text>
										</g>
									);
								})}

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
								onClick={() => navigateToWaypoint(waypoint.id)}>
								<span className='waypoint-icon'>
									{waypoint.icon}
								</span>
								<div className='waypoint-info'>
									<h5>{waypoint.name}</h5>
									<p>{waypoint.description}</p>
									<code>{waypoint.path}</code>
									{masterMode && (
										<div className='react-pattern'>
											<strong>React Pattern:</strong>
											<p>{waypoint.reactPattern}</p>
										</div>
									)}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			<StorySection
				paragraphs={[
					`"Notice how each waypoint isn't just a destination," Marina explained. "The Castle Keep uses component composition. The Grand Bazaar manages product state. The Academy leverages custom hooks. The Forge validates with forms."`,
					`Aria studied the patterns with fascination. "I can see how they all communicate through the navigation system! This is incredible - routes that understand context, preserve state, and adapt to user needs."`,
				]}
			/>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Marina's Waypoint Architecture
				</h3>
				<InstructionBox character='Click "Activate Master Vision" to see how React patterns integrate with each waypoint!'>
					Click on different waypoints to navigate and watch the
					compass track your journey.
				</InstructionBox>

				<CodeExample
					title='Intelligent Route Configuration'
					code={`// Marina's Advanced Routing with React Integration
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { StateProvider, useAppState } from './react-patterns';

// The Master Router Architecture
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      // React pattern: Wrap routes with state management
      <StateProvider>
        <IntelligentLayout />
      </StateProvider>
    ),
    // Marina's error boundaries
    errorElement: <SmartErrorBoundary />,
    // React pattern: Root data prefetching
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
          // React integrations
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
          // React pattern: Prepare state before render
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
          // React pattern: Validate before loading
          const isValidStage = await validateStage(params.stage);
          if (!isValidStage) {
            throw new Response("Invalid journey stage", { status: 404 });
          }
          
          return loadStageData(params.stage);
        },
        // Form actions with intelligence
        action: async ({ request, params }) => {
          const formData = await request.formData();
          
          // React validation integration
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
}`}
				/>

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
							<div className='form-group react-enhancement'>
								<label>React Pattern Integration</label>
								<select
									value={customWaypoint.reactEnhancement}
									onChange={(e) =>
										setCustomWaypoint({
											...customWaypoint,
											reactEnhancement: e.target.value,
										})
									}>
									<option value=''>Select Pattern...</option>
									<option value='state'>
										State Management
									</option>
									<option value='hooks'>Custom Hooks</option>
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
										customWaypoint.reactEnhancement
											? `
    // React ${customWaypoint.reactEnhancement} integration
    await prepare${customWaypoint.reactEnhancement}State(data);`
											: ''
									}
    return data;
  },
  handle: {
    title: "${customWaypoint.name}",
    icon: "${customWaypoint.icon}",
    description: "${customWaypoint.description}"${
		customWaypoint.reactEnhancement
			? `,
    pattern: "${customWaypoint.reactEnhancement}",
    stateKey: "${customWaypoint.path.slice(1)}"`
			: ''
	}
  }
}`}
							</div>
							<p className='creation-note'>
								Marina: "Excellent route structure!"
								<br />
								Student: "And beautifully integrated with React
								patterns!"
							</p>
						</div>
					)}
				</div>

				<CodeExample
					title='The Complete Waypoint System'
					code={`// Marina's Advanced Route Architecture
import { createBrowserRouter, useNavigation, useMatches } from 'react-router-dom';
import { useRouteState, useRouteEffects, useRouteValidation } from './react-hooks';

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
    
    // React enhancements
    if (config.stateManagement) {
      route.element = <StateWrapper config={config}>{route.element}</StateWrapper>;
    }
    
    if (config.validation) {
      this.validators.set(config.path, config.validation);
    }
    
    this.routes.push(route);
    return route;
  }
  
  // React intelligent wrapper
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
      
      // React prefetching
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
      // React additions
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
  // React enhancements
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
}`}
				/>

				<div className='waypoint-features master-features'>
					<h3>Marina's Waypoint Enhancements</h3>
					<div className='feature-grid master-grid'>
						<div className='feature-card'>
							<h4>Intelligent Loaders</h4>
							<p className='marina'>Marina: Data fetching</p>
							<p className='integration'>
								Integration: + State prefetching
							</p>
							<code>{`loader: intelligentLoader()`}</code>
						</div>
						<div className='feature-card'>
							<h4>Smart Actions</h4>
							<p className='marina'>Marina: Form handling</p>
							<p className='integration'>
								Integration: + Validation flow
							</p>
							<code>{`action: validatedAction()`}</code>
						</div>
						<div className='feature-card'>
							<h4>Reactive Boundaries</h4>
							<p className='marina'>Marina: Error catching</p>
							<p className='integration'>
								Integration: + State recovery
							</p>
							<code>{`errorElement: <SmartError />`}</code>
						</div>
						<div className='feature-card'>
							<h4>Predictive Loading</h4>
							<p className='marina'>Marina: Lazy loading</p>
							<p className='integration'>
								Integration: + Preload hints
							</p>
							<code>{`lazy: predictiveImport()`}</code>
						</div>
					</div>
				</div>

				<StorySection
					paragraphs={[
						`"Each enhancement builds on the foundation," Marina explained. "We're not just loading data - we're orchestrating entire user experiences."`,
					]}
				/>

				<div className='masters-demonstration'>
					<h3>Live Architecture Demonstration</h3>
				</div>

				<StorySection
					paragraphs={[
						`Marina demonstrated the complete waypoint system to the learning group. "This shows how we can transform simple routing into an intelligent navigation ecosystem," she explained.`,
						`Aria watched with amazement. "The way state flows through the routes... it's like watching a river system that knows where it needs to go!"`,
						`Marina smiled with teaching satisfaction. "This is what learning looks like - not just knowing patterns, but understanding how they weave together into something greater."`,
						`Binary projected the final statistics: "Waypoint intelligence: MAXIMUM! Pattern integration: COMPLETE! Marina's teaching + Aria's learning: EXCELLENT! Future students will study this system for generations!"`,
					]}
				/>

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

				<ChapterSummary
					lessonInsight={{
						title: "Marina's Wisdom:",
						content:
							"Waypoints are living entities. They breathe with state, pulse with effects, communicate through context, and evolve through user interaction. Navigation isn't just about moving between pages - it's about orchestrating entire application experiences. Every route is a complete React application in miniature, with all the patterns working in harmony!",
					}}
					reflectionQuestions={[
						'How does treating routes as intelligent entities that integrate all React patterns change your approach to application architecture?',
						'What possibilities open up when waypoints can preserve state, execute effects, validate transitions, and adapt to user behavior?',
						"How does Aria's journey through the React Kingdom help her understand Marina's advanced navigation architecture concepts?",
					]}
					journalEntry={{
						title: "Aria's Journal - Day 23 (Morning)",
						content:
							"Marina brought me to the Waypoint Sanctum - a vast chamber where glowing orbs trace navigation paths through the air! Today I learned that routes aren't just paths, they're intelligent waypoints. Each route can have loaders for data fetching, actions for form handling, error boundaries for graceful failures, and metadata (handles) for breadcrumbs and titles. I built a WaypointArchitect class that creates routes with intelligent wrappers, enhanced loaders with prefetching, and comprehensive metadata. The route configuration becomes a declarative description of the entire application! Binary is mapping the navigation graph!",
					}}
				/>
			</div>
		</>
	);

	return <StoryContent content={content} />;
}

export default ChapterOne;
