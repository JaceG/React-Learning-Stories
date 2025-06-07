import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const ChapterOne = () => {
	const { 
		activeWaypoint,
		waypointHistory,
		createWaypoint,
		navigateToWaypoint 
	} = useOutletContext();

	const [showCreationProcess, setShowCreationProcess] = useState(false);
	const [customWaypoint, setCustomWaypoint] = useState({
		name: '',
		path: '',
		icon: '📍',
		description: ''
	});

	const predefinedWaypoints = [
		{
			id: 'home',
			name: 'Castle Keep',
			path: '/',
			icon: '🏰',
			description: 'The heart of the kingdom',
			coordinates: { x: 50, y: 50 }
		},
		{
			id: 'market',
			name: 'Grand Bazaar',
			path: '/products',
			icon: '🏪',
			description: 'Where merchants gather',
			coordinates: { x: 20, y: 30 }
		},
		{
			id: 'academy',
			name: 'Arcane Academy',
			path: '/learn',
			icon: '🎓',
			description: 'Center of knowledge',
			coordinates: { x: 80, y: 20 }
		},
		{
			id: 'forge',
			name: 'Dragon Forge',
			path: '/craft',
			icon: '🔥',
			description: 'Where magic items are made',
			coordinates: { x: 30, y: 70 }
		}
	];

	const waypointIcons = ['📍', '⭐', '💎', '🗺️', '🧭', '🏴', '🎯', '🔮'];

	return (
		<div className='chapter'>
			<h2 className='chapter-title'>
				Chapter 1: The Art of Waypoint Creation
			</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					After mastering the Guardian Gates, Marina led Param to a mystical 
					chamber filled with floating, glowing orbs. Each orb pulsed with a 
					different color, and ethereal paths connected them like a constellation.
				</p>

				<p className='story-paragraph'>
					"Welcome to the <strong>Waypoint Sanctum</strong>," Marina announced, 
					her voice echoing in the vast space. "These are not just navigation 
					points - they are <strong>magical anchors</strong> that remember state, 
					preserve context, and guide travelers through complex journeys."
				</p>

				<p className='story-paragraph'>
					She gestured to a particularly bright orb. "Each waypoint is more than 
					a destination. It carries <strong>metadata</strong> - information about 
					what lies there, who can access it, and what state it should maintain. 
					This is what we call <strong>route configuration</strong>."
				</p>

				<p className='story-paragraph'>
					"But the true magic," she continued, touching an orb that immediately 
					expanded to show a miniature scene within, "is that waypoints can be 
					<strong>dynamic</strong>. They can adapt based on who approaches them, 
					what time it is, or what the traveler carries with them."
				</p>

				<div className='waypoint-map'>
					<h3>The Kingdom's Waypoint Network</h3>
					<div className='map-container'>
						<svg viewBox="0 0 100 100" className='waypoint-svg'>
							{/* Draw connections between waypoints */}
							{predefinedWaypoints.map((waypoint, index) => {
								const nextIndex = (index + 1) % predefinedWaypoints.length;
								const next = predefinedWaypoints[nextIndex];
								return (
									<line
										key={`line-${waypoint.id}`}
										x1={waypoint.coordinates.x}
										y1={waypoint.coordinates.y}
										x2={next.coordinates.x}
										y2={next.coordinates.y}
										stroke="rgba(147, 51, 234, 0.3)"
										strokeWidth="0.5"
										strokeDasharray="2,2"
									/>
								);
							})}
							
							{/* Draw waypoints */}
							{predefinedWaypoints.map(waypoint => (
								<g key={waypoint.id}>
									<circle
										cx={waypoint.coordinates.x}
										cy={waypoint.coordinates.y}
										r="8"
										fill={activeWaypoint === waypoint.id ? '#8b5cf6' : '#e9d5ff'}
										stroke="#7c3aed"
										strokeWidth="2"
										className='waypoint-node'
										onClick={() => navigateToWaypoint(waypoint.id)}
									/>
									<text
										x={waypoint.coordinates.x}
										y={waypoint.coordinates.y + 2}
										textAnchor="middle"
										fontSize="8"
										className='waypoint-icon'>
										{waypoint.icon}
									</text>
									<text
										x={waypoint.coordinates.x}
										y={waypoint.coordinates.y + 15}
										textAnchor="middle"
										fontSize="4"
										fill="#6b7280">
										{waypoint.name}
									</text>
								</g>
							))}
						</svg>
					</div>
					
					<div className='waypoint-legend'>
						<h4>Active Waypoints</h4>
						{predefinedWaypoints.map(waypoint => (
							<div 
								key={waypoint.id}
								className={`waypoint-item ${activeWaypoint === waypoint.id ? 'active' : ''}`}
								onClick={() => navigateToWaypoint(waypoint.id)}>
								<span className='waypoint-icon'>{waypoint.icon}</span>
								<div className='waypoint-info'>
									<h5>{waypoint.name}</h5>
									<p>{waypoint.description}</p>
									<code>{waypoint.path}</code>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Crafting Your First Waypoints
				</h3>

				<div className='code-example'>
					<pre>{`// Basic Route Configuration
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
        // Route metadata
        handle: {
          title: "Welcome to the Kingdom",
          icon: "🏰",
          breadcrumb: "Home"
        }
      },
      {
        path: "quests",
        element: <QuestBoard />,
        handle: {
          title: "Available Quests",
          icon: "🗺️",
          breadcrumb: "Quests",
          requiresAuth: true
        }
      },
      {
        path: "quests/:questId",
        element: <QuestDetail />,
        // Dynamic breadcrumb based on data
        handle: {
          breadcrumb: (data) => data?.quest?.title || "Quest"
        }
      }
    ]
  }
]);

// Using route metadata in components
function Breadcrumbs() {
  const matches = useMatches();
  
  return (
    <nav aria-label="breadcrumb">
      {matches
        .filter(match => match.handle?.breadcrumb)
        .map((match, index) => {
          const breadcrumb = typeof match.handle.breadcrumb === 'function'
            ? match.handle.breadcrumb(match.data)
            : match.handle.breadcrumb;
            
          return (
            <span key={match.id}>
              {index > 0 && " > "}
              <Link to={match.pathname}>{breadcrumb}</Link>
            </span>
          );
        })}
    </nav>
  );
}`}</pre>
				</div>

				<div className='waypoint-creation'>
					<h3>Create a Custom Waypoint</h3>
					<div className='creation-form'>
						<div className='form-group'>
							<label>Waypoint Name</label>
							<input
								type='text'
								value={customWaypoint.name}
								onChange={(e) => setCustomWaypoint({...customWaypoint, name: e.target.value})}
								placeholder='Mystic Grove'
							/>
						</div>
						<div className='form-group'>
							<label>Path</label>
							<input
								type='text'
								value={customWaypoint.path}
								onChange={(e) => setCustomWaypoint({...customWaypoint, path: e.target.value})}
								placeholder='/grove'
							/>
						</div>
						<div className='form-group'>
							<label>Icon</label>
							<div className='icon-selector'>
								{waypointIcons.map(icon => (
									<button
										key={icon}
										className={`icon-option ${customWaypoint.icon === icon ? 'selected' : ''}`}
										onClick={() => setCustomWaypoint({...customWaypoint, icon})}>
										{icon}
									</button>
								))}
							</div>
						</div>
						<div className='form-group'>
							<label>Description</label>
							<textarea
								value={customWaypoint.description}
								onChange={(e) => setCustomWaypoint({...customWaypoint, description: e.target.value})}
								placeholder='A peaceful place for meditation...'
							/>
						</div>
						<button 
							className='create-waypoint-btn'
							onClick={() => {
								createWaypoint(customWaypoint);
								setShowCreationProcess(true);
							}}>
							Create Waypoint ✨
						</button>
					</div>

					{showCreationProcess && (
						<div className='creation-result'>
							<h4>Waypoint Created!</h4>
							<div className='code-snippet'>
{`{
  path: "${customWaypoint.path}",
  element: <${customWaypoint.name.replace(/\s+/g, '')} />,
  handle: {
    title: "${customWaypoint.name}",
    icon: "${customWaypoint.icon}",
    description: "${customWaypoint.description}"
  }
}`}
							</div>
						</div>
					)}
				</div>

				<div className='code-example'>
					<pre>{`// Advanced Route Configuration
const routes = [
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorBoundary />,
    loader: rootLoader,
    children: [
      {
        path: "shop",
        element: <Shop />,
        handle: { 
          title: "Merchant's Emporium",
          preload: true // Preload this route's data
        },
        children: [
          {
            path: "category/:categoryId",
            element: <Category />,
            loader: categoryLoader,
            handle: {
              // Dynamic title based on loader data
              title: (data) => \`\${data.category.name} - Shop\`
            }
          },
          {
            path: "item/:itemId",
            element: <ItemDetail />,
            loader: itemLoader,
            action: purchaseAction,
            handle: {
              requiresAuth: true,
              minLevel: 10 // Custom requirement
            }
          }
        ]
      },
      {
        path: "guild",
        // Lazy load this route
        lazy: () => import("./routes/guild"),
        handle: {
          title: "Adventurer's Guild",
          requiresAuth: true
        }
      }
    ]
  }
];

// Route-based navigation menu
function NavigationMenu() {
  const navigation = useNavigation();
  
  // Extract routes with navigation metadata
  const menuItems = routes[0].children
    .filter(route => route.handle?.title)
    .map(route => ({
      path: route.path,
      title: route.handle.title,
      icon: route.handle.icon,
      requiresAuth: route.handle.requiresAuth
    }));
  
  return (
    <nav className="main-nav">
      {menuItems.map(item => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }>
          {item.icon && <span>{item.icon}</span>}
          {item.title}
        </NavLink>
      ))}
    </nav>
  );
}`}</pre>
				</div>

				<div className='waypoint-features'>
					<h3>Waypoint Enhancement Spells</h3>
					<div className='feature-grid'>
						<div className='feature-card'>
							<h4>Loader Functions</h4>
							<p>Fetch data before rendering</p>
							<code>{`loader: async () => fetch('/api/data')`}</code>
						</div>
						<div className='feature-card'>
							<h4>Action Functions</h4>
							<p>Handle form submissions and mutations</p>
							<code>{`action: async ({ request }) => {...}`}</code>
						</div>
						<div className='feature-card'>
							<h4>Error Boundaries</h4>
							<p>Graceful error handling per route</p>
							<code>{`errorElement: <ErrorPage />`}</code>
						</div>
						<div className='feature-card'>
							<h4>Lazy Loading</h4>
							<p>Load routes on demand</p>
							<code>{`lazy: () => import('./route')`}</code>
						</div>
					</div>
				</div>

				<div className='code-example'>
					<pre>{`// Creating a Route Factory
function createWaypoint(config) {
  return {
    path: config.path,
    element: config.protected 
      ? <RequireAuth>{config.element}</RequireAuth>
      : config.element,
    loader: config.loader,
    action: config.action,
    errorElement: config.errorElement || <DefaultError />,
    handle: {
      title: config.title,
      icon: config.icon,
      breadcrumb: config.breadcrumb || config.title,
      ...config.metadata
    }
  };
}

// Usage
const questRoutes = [
  createWaypoint({
    path: "quests",
    element: <QuestList />,
    title: "Quest Board",
    icon: "📜",
    loader: questListLoader,
    protected: true
  }),
  createWaypoint({
    path: "quests/:id",
    element: <QuestDetail />,
    title: "Quest Details",
    loader: questDetailLoader,
    action: acceptQuestAction,
    protected: true,
    metadata: {
      minLevel: 5,
      requiredItems: ['map', 'compass']
    }
  })
];`}</pre>
				</div>
			</div>

			<div className='journey-tracker'>
				<h3>Your Navigation Journey</h3>
				<div className='journey-path'>
					{waypointHistory.map((waypoint, index) => (
						<div key={index} className='journey-step'>
							<span className='step-icon'>📍</span>
							<span className='step-name'>{waypoint}</span>
							{index < waypointHistory.length - 1 && <span className='step-arrow'>→</span>}
						</div>
					))}
				</div>
			</div>

			<div className='lesson-insight'>
				<h3>The Waypoint Lesson:</h3>
				<p>
					"Waypoints are more than destinations - they're the backbone of your 
					application's navigation architecture. By enriching them with metadata, 
					you enable features like breadcrumbs, navigation menus, and conditional 
					rendering based on route properties."
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					How would you structure waypoints for a complex application with multiple 
					user types, each seeing different navigation options? Consider how metadata 
					can drive dynamic UI generation.
				</p>
				<p>
					What advantages do route-based configurations offer over traditional 
					component-based navigation systems?
				</p>
			</div>
		</div>
	);
};

export default ChapterOne;