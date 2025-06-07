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
				<p className='story-paragraph'>
					Marina led Param deeper into the Waypoint Sanctum, where the architecture 
					became increasingly complex. "You've mastered individual waypoints," she 
					said, "but the real power comes from <strong>nested waypoint realms</strong>."
				</p>

				<p className='story-paragraph'>
					They entered a chamber where waypoints floated in intricate patterns, 
					some containing other waypoints within them like Russian dolls. "These 
					are <strong>nested routes</strong>," Marina explained. "They allow you 
					to build complex navigation hierarchies while keeping each section 
					independent."
				</p>

				<p className='story-paragraph'>
					She gestured to a particularly elegant structure. "See how the Dashboard 
					waypoint contains Settings, which in turn contains Profile? Each level 
					can have its own <strong>layout wrapper</strong>, creating consistent 
					experiences across related pages."
				</p>

				<p className='story-paragraph'>
					"And watch this," Marina touched two waypoints simultaneously. "With 
					<strong>parallel routes</strong> and <strong>named outlets</strong>, 
					multiple parts of your interface can navigate independently. Imagine a 
					sidebar that stays on its own route while the main content changes!"
				</p>

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

			<div className='waypoint-mastery'>
				<h3>Your Waypoint Mastery</h3>
				<div className='mastery-checklist'>
					<div className='mastery-item completed'>
						<span className='check'>✓</span>
						<span>Created static waypoints</span>
					</div>
					<div className='mastery-item completed'>
						<span className='check'>✓</span>
						<span>Mastered dynamic parameters</span>
					</div>
					<div className='mastery-item completed'>
						<span className='check'>✓</span>
						<span>Understood nested route architecture</span>
					</div>
					<div className='mastery-item'>
						<span className='check'>🎯</span>
						<span>Next: Portal Passages - Advanced navigation patterns</span>
					</div>
				</div>
			</div>

			<div className='lesson-insight'>
				<h3>The Waypoint Lesson:</h3>
				<p>
					"Nested routes are like architectural blueprints. They define not just 
					where you can go, but how different parts of your interface relate to 
					each other. Each parent route can wrap its children with consistent 
					layout and behavior."
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					How would you structure routes for a complex application like a project 
					management tool with workspaces, projects, tasks, and team members? 
					Consider how deep nesting affects URL readability and user experience.
				</p>
				<p>
					When would you choose deep nesting versus flat routes with query parameters? 
					What are the trade-offs in terms of code organization and user navigation?
				</p>
			</div>
		</div>
	);
};

export default ChapterThree;