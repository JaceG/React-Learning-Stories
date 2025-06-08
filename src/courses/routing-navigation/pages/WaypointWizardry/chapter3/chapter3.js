import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const ChapterThree = () => {
	const {
		customWaypoints,
		routeTransitions,
		addRouteTransition
	} = useOutletContext();

	const [activeLayout, setActiveLayout] = useState('simple');
	const [selectedTransition, setSelectedTransition] = useState('fade');
	const [nestedRoute, setNestedRoute] = useState('/dashboard');
	const [breadcrumbs, setBreadcrumbs] = useState(['Home', 'Dashboard']);

	const layoutExamples = {
		simple: {
			name: 'Simple Layout',
			description: 'Basic navigation structure',
			routes: ['/', '/about', '/contact']
		},
		nested: {
			name: 'Nested Layout',
			description: 'Hierarchical route structure',
			routes: ['/dashboard', '/dashboard/stats', '/dashboard/settings', '/dashboard/settings/profile']
		},
		parallel: {
			name: 'Parallel Routes',
			description: 'Multiple outlets rendering simultaneously',
			routes: ['/app (main)', '/app (sidebar)', '/app (header)']
		}
	};

	const transitionTypes = [
		{ id: 'fade', name: 'Fade', icon: '🌫️', duration: '300ms' },
		{ id: 'slide', name: 'Slide', icon: '➡️', duration: '400ms' },
		{ id: 'zoom', name: 'Zoom', icon: '🔍', duration: '350ms' },
		{ id: 'flip', name: 'Flip', icon: '🔄', duration: '500ms' }
	];

	return (
		<div className='chapter'>
			<h2 className='chapter-title'>
				Chapter 3: The Nested Waypoint Realms
			</h2>

			<div className='story-section'>
				<div className='aria-marina-collaboration'>
					<p className='story-paragraph'>
						The Waypoint Observatory's upper level revealed the most sophisticated navigation 
						systems. <strong>Marina</strong> and <strong>Aria</strong> worked side by side, 
						designing a new routing architecture for the kingdom's most complex applications.
					</p>

					<p className='story-paragraph'>
						"I've been struggling with this nested route design," Marina admitted, showing 
						Aria a complex waypoint structure. "Users need consistent layouts, but also 
						flexibility at each level."
					</p>

					<p className='story-paragraph'>
						<strong>Aria</strong> studied the patterns thoughtfully. "This reminds me of the 
						component composition patterns from the Northern Quarter! What if we treat each 
						route level like a component that wraps its children?" She began sketching a 
						solution, combining her knowledge of components, context, and layout patterns.
					</p>

					<p className='story-paragraph'>
						Marina's eyes lit up. "Of course! <strong>Nested routes</strong> are just 
						component hierarchies applied to navigation. And with <strong>Outlets</strong>, 
						we can create slots where child routes render - just like the component children 
						pattern!" <strong>Binary</strong> projected their collaborative design, showing 
						how all of Aria's previous learning converged here.
					</p>
				</div>

				<div className='nested-visualization'>
					<h3>Waypoint Realm Architecture</h3>
					
					<div className='layout-selector'>
						<h4>Explore Different Architectures:</h4>
						<div className='layout-tabs'>
							{Object.entries(layoutExamples).map(([key, layout]) => (
								<button
									key={key}
									className={`layout-tab ${activeLayout === key ? 'active' : ''}`}
									onClick={() => setActiveLayout(key)}>
									{layout.name}
								</button>
							))}
						</div>
					</div>

					<div className='layout-display'>
						<h4>{layoutExamples[activeLayout].name}</h4>
						<p>{layoutExamples[activeLayout].description}</p>
						<div className='route-tree'>
							{layoutExamples[activeLayout].routes.map((route, index) => (
								<div 
									key={route}
									className='route-node'
									style={{ marginLeft: `${route.split('/').length * 20}px` }}>
									<span className='route-indicator'>📍</span>
									<code>{route}</code>
								</div>
							))}
						</div>
					</div>

					<div className='breadcrumb-demo'>
						<h4>Dynamic Breadcrumbs</h4>
						<div className='breadcrumb-trail'>
							{breadcrumbs.map((crumb, index) => (
								<span key={index}>
									{index > 0 && <span className='separator'> / </span>}
									<span className='crumb'>{crumb}</span>
								</span>
							))}
						</div>
						<p className='breadcrumb-info'>
							Breadcrumbs automatically update based on your nested route structure!
						</p>
					</div>
				</div>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Mastering Nested Route Architecture
				</h3>

				<div className='code-example'>
					<pre>{`// Nested Routes with Shared Layouts
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        // Nested routes share DashboardLayout
        children: [
          {
            index: true,
            element: <DashboardHome />
          },
          {
            path: "analytics",
            element: <Analytics />,
            handle: { breadcrumb: "Analytics" }
          },
          {
            path: "settings",
            element: <SettingsLayout />,
            handle: { breadcrumb: "Settings" },
            // Another level of nesting
            children: [
              {
                index: true,
                element: <GeneralSettings />
              },
              {
                path: "profile",
                element: <ProfileSettings />,
                handle: { breadcrumb: "Profile" }
              },
              {
                path: "security",
                element: <SecuritySettings />,
                handle: { breadcrumb: "Security" }
              }
            ]
          }
        ]
      }
    ]
  }
]);

// Layout Components
function DashboardLayout() {
  return (
    <div className="dashboard">
      <DashboardSidebar />
      <main className="dashboard-content">
        {/* Child routes render here */}
        <Outlet />
      </main>
    </div>
  );
}

function SettingsLayout() {
  return (
    <div className="settings">
      <SettingsNav />
      {/* Nested settings routes render here */}
      <Outlet />
    </div>
  );
}`}</pre>
				</div>

				<div className='code-example'>
					<pre>{`// Advanced Outlet Patterns
// 1. Named Outlets for Multiple UI Regions
function AppLayout() {
  return (
    <div className="app">
      <header>
        {/* Header has its own routing */}
        <Outlet context={{ region: 'header' }} />
      </header>
      
      <aside>
        {/* Sidebar navigates independently */}
        <Outlet context={{ region: 'sidebar' }} />
      </aside>
      
      <main>
        {/* Main content area */}
        <Outlet context={{ region: 'main' }} />
      </main>
    </div>
  );
}

// 2. Conditional Rendering with Outlets
function ProtectedLayout() {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return (
    <div className="protected-area">
      <UserNav user={user} />
      <Outlet context={{ user }} />
    </div>
  );
}

// 3. Layout with Data Loading
function DataLayout() {
  const data = useLoaderData();
  const navigation = useNavigation();
  
  return (
    <div className={navigation.state === 'loading' ? 'loading' : ''}>
      <DataHeader data={data} />
      <Outlet context={{ parentData: data }} />
    </div>
  );
}`}</pre>
				</div>

				<div className='transition-workshop'>
					<h3>Route Transition Magic</h3>
					<p>Add smooth transitions between your waypoints:</p>
					
					<div className='transition-selector'>
						<h4>Choose Transition Style:</h4>
						<div className='transition-options'>
							{transitionTypes.map(transition => (
								<div
									key={transition.id}
									className={`transition-card ${selectedTransition === transition.id ? 'selected' : ''}`}
									onClick={() => setSelectedTransition(transition.id)}>
									<span className='transition-icon'>{transition.icon}</span>
									<h5>{transition.name}</h5>
									<p>{transition.duration}</p>
								</div>
							))}
						</div>
					</div>

					<div className='transition-preview'>
						<div className={`preview-box transition-${selectedTransition}`}>
							<p>Route Content</p>
						</div>
					</div>
				</div>

				<div className='code-example'>
					<pre>{`// Implementing Route Transitions
import { useLocation, useOutlet } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

function AnimatedOutlet() {
  const location = useLocation();
  const currentOutlet = useOutlet();
  
  return (
    <SwitchTransition mode="out-in">
      <CSSTransition
        key={location.pathname}
        timeout={300}
        classNames="page"
        unmountOnExit>
        <div className="page-wrapper">
          {currentOutlet}
        </div>
      </CSSTransition>
    </SwitchTransition>
  );
}

// CSS for transitions
.page-enter {
  opacity: 0;
  transform: translateX(100%);
}

.page-enter-active {
  opacity: 1;
  transform: translateX(0);
  transition: opacity 300ms, transform 300ms;
}

.page-exit {
  opacity: 1;
  transform: translateX(0);
}

.page-exit-active {
  opacity: 0;
  transform: translateX(-100%);
  transition: opacity 300ms, transform 300ms;
}`}</pre>
				</div>

				<div className='code-example'>
					<pre>{`// Building Dynamic Breadcrumbs
function Breadcrumbs() {
  const matches = useMatches();
  
  const breadcrumbs = matches
    .filter(match => match.handle?.breadcrumb)
    .map((match, index) => {
      const isLast = index === matches.length - 1;
      const breadcrumb = typeof match.handle.breadcrumb === 'function'
        ? match.handle.breadcrumb(match.data)
        : match.handle.breadcrumb;
      
      return (
        <li key={match.id} className="breadcrumb-item">
          {isLast ? (
            <span>{breadcrumb}</span>
          ) : (
            <Link to={match.pathname}>{breadcrumb}</Link>
          )}
        </li>
      );
    });
  
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        {breadcrumbs}
      </ol>
    </nav>
  );
}

// Route-based Page Titles
function RouteAwareTitle() {
  const matches = useMatches();
  const location = useLocation();
  
  useEffect(() => {
    const title = matches
      .filter(match => match.handle?.title)
      .map(match => match.handle.title)
      .reverse()
      .join(' | ');
    
    document.title = title || 'My App';
  }, [location, matches]);
  
  return null;
}`}</pre>
				</div>

				<div className='nested-patterns'>
					<h3>Nested Route Patterns</h3>
					<div className='pattern-grid'>
						<div className='pattern-example'>
							<h4>Dashboard Pattern</h4>
							<pre>{`/dashboard
├── /dashboard/overview
├── /dashboard/analytics
└── /dashboard/settings
    ├── /settings/profile
    └── /settings/security`}</pre>
						</div>
						<div className='pattern-example'>
							<h4>Resource Pattern</h4>
							<pre>{`/posts
├── /posts/new
├── /posts/:id
├── /posts/:id/edit
└── /posts/:id/comments
    └── /comments/:commentId`}</pre>
						</div>
						<div className='pattern-example'>
							<h4>Wizard Pattern</h4>
							<pre>{`/checkout
├── /checkout/cart
├── /checkout/shipping
├── /checkout/payment
└── /checkout/confirm`}</pre>
						</div>
						<div className='pattern-example'>
							<h4>Tab Pattern</h4>
							<pre>{`/profile
├── /profile/posts
├── /profile/followers
├── /profile/following
└── /profile/settings`}</pre>
						</div>
					</div>
				</div>

				<div className='code-example'>
					<pre>{`// Complex Nested Route Example
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "workspace/:workspaceId",
        element: <WorkspaceLayout />,
        loader: workspaceLoader,
        handle: {
          breadcrumb: (data) => data?.workspace?.name
        },
        children: [
          {
            index: true,
            element: <WorkspaceHome />
          },
          {
            path: "projects",
            element: <ProjectList />,
            handle: { breadcrumb: "Projects" }
          },
          {
            path: "projects/:projectId",
            element: <ProjectLayout />,
            loader: projectLoader,
            handle: {
              breadcrumb: (data) => data?.project?.name
            },
            children: [
              {
                index: true,
                element: <ProjectOverview />
              },
              {
                path: "tasks",
                element: <TaskBoard />,
                handle: { breadcrumb: "Tasks" }
              },
              {
                path: "tasks/:taskId",
                element: <TaskDetail />,
                loader: taskLoader,
                handle: {
                  breadcrumb: (data) => \`Task #\${data?.task?.number}\`
                }
              }
            ]
          }
        ]
      }
    ]
  }
]);

// Accessing parent route data in nested components
function TaskDetail() {
  const { workspace, project, task } = useLoaderData();
  const { workspaceId, projectId } = useParams();
  
  return (
    <div>
      <h1>{task.title}</h1>
      <p>In project: {project.name}</p>
      <p>Workspace: {workspace.name}</p>
    </div>
  );
}`}</pre>
				</div>
			</div>

			<div className='aria-innovation'>
				<h3>The Marina-Aria Navigation Framework</h3>
				<p className='story-paragraph'>
					Working together, Marina and Aria created something neither could have built alone - 
					a navigation system that seamlessly integrated all aspects of React.
				</p>
				
				<div className='collaborative-code'>
					<h4>Their Combined Innovation:</h4>
					<pre>{`// Marina's navigation expertise + Aria's holistic understanding
const useSmartNavigation = () => {
  // Aria's state management patterns
  const { user, permissions } = useAuth();
  const { formData, isDirty } = useFormContext();
  
  // Marina's routing expertise
  const navigate = useNavigate();
  const location = useLocation();
  
  // Combined innovation: Context-aware navigation
  const smartNavigate = useCallback((to, options) => {
    // Aria's validation logic
    if (isDirty && !window.confirm('Leave without saving?')) {
      return;
    }
    
    // Marina's route optimization
    const optimizedRoute = generateOptimalPath(to, user.role);
    
    // Unified navigation with state preservation
    navigate(optimizedRoute, {
      ...options,
      state: { 
        ...options?.state,
        previousFormData: formData,
        authLevel: user.role 
      }
    });
  }, [navigate, isDirty, formData, user]);
  
  return { smartNavigate, canNavigate: !isDirty };
};`}</pre>
				</div>
			</div>

			<div className='mastery-recognition'>
				<h3>Full Circle Moment</h3>
				<div className='story-paragraph'>
					<p>As they completed the nested waypoint system, representatives from all quarters 
					arrived to witness the demonstration. <strong>Master Aurelius</strong>, 
					<strong>Elder useState</strong>, <strong>Captain Thunk</strong>, and 
					<strong>Commander Validus</strong> watched as Aria and Marina presented their 
					unified navigation framework.</p>
					
					<p>"This is remarkable," Master Aurelius said. "You've created something that uses 
					every concept in our kingdom - components for structure, state for memory, effects 
					for synchronization, context for sharing, forms for interaction, and now navigation 
					to tie it all together."</p>
					
					<p>Elder useState added, "Aria, you've not just learned our ways - you've shown us 
					new connections we never saw before."</p>
				</div>
			</div>

			<div className='lesson-culmination'>
				<h3>The Complete Picture</h3>
				<p>
					Marina and Aria stood before the assembled masters. "Nested routes aren't just 
					about organization," Marina explained. "They're about creating intuitive user 
					journeys that maintain context and state at every level."
				</p>
				<p>
					Aria continued, "Every concept I've learned builds on the others. Components 
					give us structure, hooks give us behavior, forms give us interaction, and 
					navigation gives us the architecture to connect it all. React isn't separate 
					pieces - it's one unified system."
				</p>
				<p>
					Binary projected a holographic map showing how every quarter of the React Kingdom 
					connected through the Central Citadel's navigation systems. The apprentice who had 
					arrived uncertain was now a master architect, ready to guide others on their journey.
				</p>
			</div>
		</div>
	);
};

export default ChapterThree;