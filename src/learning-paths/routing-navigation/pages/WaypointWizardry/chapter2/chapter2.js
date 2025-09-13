import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

const ChapterTwo = () => {
	const {
		activeWaypoint,
		customWaypoints,
		navigateToWaypoint,
		routeTransitions,
		addRouteTransition,
	} = useOutletContext();

	const [showParameterDemo, setShowParameterDemo] = useState(false);
	const [selectedUser, setSelectedUser] = useState(null);
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [queryParams, setQueryParams] = useState({
		sort: 'name',
		filter: 'all',
	});
	const [routeState, setRouteState] = useState({ from: null, data: null });

	// Simulated data
	const users = [
		{ id: 1, name: 'Sir Lancelot', role: 'knight', level: 25 },
		{ id: 2, name: 'Merlin', role: 'wizard', level: 99 },
		{ id: 3, name: 'Arthur', role: 'king', level: 50 },
	];

	const products = [
		{ id: 101, name: 'Healing Potion', category: 'consumable', price: 50 },
		{ id: 102, name: 'Iron Sword', category: 'weapon', price: 200 },
		{ id: 103, name: 'Magic Scroll', category: 'spell', price: 150 },
	];

	const categories = ['all', 'weapon', 'armor', 'consumable', 'spell'];

	return (
		<div className='chapter'>
			<h2 className='chapter-title'>Chapter 2: Dynamic Waypoint Magic</h2>

			<div className='story-section'>
				<div className='collaborative-discussion'>
					<p className='story-paragraph'>
						<strong>Marina</strong> and <strong>Aria</strong> stood
						together at the Waypoint Control Center, examining a
						complex navigation map. "I've been wanting to implement
						dynamic parameters in our waypoint system," Marina
						explained, gesturing to the floating route structures.
					</p>

					<p className='story-paragraph'>
						<strong>Aria</strong> studied the patterns with growing
						understanding. "This reminds me of the dynamic forms I
						learned about in the Western Quarter! Instead of
						hardcoding every possible route, we can use
						<strong>parameters</strong> to make routes adaptable."
					</p>

					<p className='story-paragraph'>
						"Exactly!" Marina smiled. "Watch this." She touched a
						waypoint that suddenly split into thousands of tiny
						lights. "One waypoint pattern like{' '}
						<code>/users/:id</code>
						can serve infinite destinations. It's similar to how
						form components accept props."
					</p>

					<p className='story-paragraph'>
						Aria's eyes lit up with recognition. "And could we use{' '}
						<strong>query parameters</strong>
						for filtering, just like I learned about state for form
						filters? The URL becomes another state container!"{' '}
						<strong>Binary</strong> beeped excitedly, projecting
						examples of dynamic routes.
					</p>
				</div>

				<div className='dynamic-waypoint-demo'>
					<h3>Dynamic Waypoint Laboratory</h3>

					<div className='parameter-section'>
						<h4>User Profiles Portal</h4>
						<p>Select a citizen to view their profile:</p>
						<div className='user-grid'>
							{users.map((user) => (
								<div
									key={user.id}
									className={`user-card ${
										selectedUser?.id === user.id
											? 'selected'
											: ''
									}`}
									onClick={() => setSelectedUser(user)}>
									<h5>{user.name}</h5>
									<p>Role: {user.role}</p>
									<p>Level: {user.level}</p>
									<div className='waypoint-path'>
										<code>/users/{user.id}</code>
									</div>
								</div>
							))}
						</div>
						{selectedUser && (
							<div className='parameter-preview'>
								<h5>Waypoint Activated:</h5>
								<code>/users/{selectedUser.id}</code>
								<p>
									This single waypoint pattern handles all
									user profiles!
								</p>
							</div>
						)}
					</div>

					<div className='query-section'>
						<h4>Merchant's Catalog with Query Magic</h4>
						<div className='query-controls'>
							<label>
								Sort by:
								<select
									value={queryParams.sort}
									onChange={(e) =>
										setQueryParams({
											...queryParams,
											sort: e.target.value,
										})
									}>
									<option value='name'>Name</option>
									<option value='price'>Price</option>
									<option value='category'>Category</option>
								</select>
							</label>
							<label>
								Filter:
								<select
									value={queryParams.filter}
									onChange={(e) =>
										setQueryParams({
											...queryParams,
											filter: e.target.value,
										})
									}>
									{categories.map((cat) => (
										<option key={cat} value={cat}>
											{cat}
										</option>
									))}
								</select>
							</label>
						</div>
						<div className='query-result'>
							<h5>Current Waypoint:</h5>
							<code>
								/products?sort={queryParams.sort}&filter=
								{queryParams.filter}
							</code>
						</div>
						<div className='product-grid'>
							{products
								.filter(
									(p) =>
										queryParams.filter === 'all' ||
										p.category === queryParams.filter
								)
								.sort((a, b) => {
									if (queryParams.sort === 'name')
										return a.name.localeCompare(b.name);
									if (queryParams.sort === 'price')
										return a.price - b.price;
									return 0;
								})
								.map((product) => (
									<div
										key={product.id}
										className='product-card'>
										<h5>{product.name}</h5>
										<p>{product.price} gold</p>
										<span className='category-badge'>
											{product.category}
										</span>
									</div>
								))}
						</div>
					</div>
				</div>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>Mastering Dynamic Routes</h3>

				<div className='code-example'>
					<pre>{`// Dynamic Route Parameters
import { useParams, useSearchParams } from 'react-router-dom';

// Route definition with parameters
const router = createBrowserRouter([
  {
    path: "users/:userId",
    element: <UserProfile />,
    loader: async ({ params }) => {
      // Params are automatically extracted
      return fetch(\`/api/users/\${params.userId}\`);
    }
  },
  {
    path: "products/:category/:productId",
    element: <ProductDetail />,
    loader: async ({ params }) => {
      // Multiple parameters
      const { category, productId } = params;
      return fetch(\`/api/\${category}/\${productId}\`);
    }
  }
]);

// Using parameters in components
function UserProfile() {
  const { userId } = useParams();
  const user = useLoaderData();
  
  return (
    <div className="profile">
      <h1>User #{userId}</h1>
      <h2>{user.name}</h2>
    </div>
  );
}

// Optional parameters
{
  path: "posts/:postId/:commentId?",
  element: <PostView />,
  // commentId is optional
}`}</pre>
				</div>

				<div className='code-example'>
					<pre>{`// Working with Query Parameters
function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Read query parameters
  const sort = searchParams.get('sort') || 'name';
  const filter = searchParams.get('filter') || 'all';
  const page = searchParams.get('page') || '1';
  
  // Update query parameters
  const updateFilter = (newFilter) => {
    setSearchParams(prev => {
      prev.set('filter', newFilter);
      prev.set('page', '1'); // Reset to page 1
      return prev;
    });
  };
  
  // Build URLs with query parameters
  const buildProductUrl = (productId) => {
    const params = new URLSearchParams({
      from: 'catalog',
      ref: filter
    });
    return \`/products/\${productId}?\${params}\`;
  };
  
  return (
    <div>
      <FilterBar 
        currentFilter={filter}
        onFilterChange={updateFilter}
      />
      {/* Product list */}
    </div>
  );
}

// Preserving query parameters during navigation
function NavigationLink({ to, preserveQuery, children }) {
  const [searchParams] = useSearchParams();
  
  const href = preserveQuery 
    ? \`\${to}?\${searchParams.toString()}\`
    : to;
    
  return <Link to={href}>{children}</Link>;
}`}</pre>
				</div>

				<div className='state-navigation'>
					<h3>Waypoint State Transfer</h3>
					<p>
						Sometimes waypoints need to carry invisible cargo -
						state that doesn't appear in the URL:
					</p>

					<div className='state-demo'>
						<div className='state-example'>
							<h4>Sending State Through Waypoints</h4>
							<div className='code-snippet'>
								{`// Navigate with state
navigate('/checkout', { 
  state: { 
    cart: cartItems, 
    from: 'product-page' 
  } 
});

// Access state in destination
const location = useLocation();
const { cart, from } = location.state || {};`}
							</div>
						</div>

						<div className='state-visualization'>
							<div className='state-flow'>
								<div className='flow-node'>Origin Waypoint</div>
								<div className='flow-arrow'>→</div>
								<div className='flow-state'>
									Hidden State Cargo
								</div>
								<div className='flow-arrow'>→</div>
								<div className='flow-node'>
									Destination Waypoint
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className='code-example'>
					<pre>{`// Advanced Dynamic Routing Patterns
// 1. Catch-all routes (splat routes)
{
  path: "files/*",
  element: <FileExplorer />,
  loader: ({ params }) => {
    // params['*'] contains everything after 'files/'
    const filePath = params['*']; // e.g., "documents/2023/report.pdf"
    return fetchFile(filePath);
  }
}

// 2. Route with multiple optional segments
{
  path: "shop/:category?/:subcategory?/:product?",
  element: <Shop />,
  // All segments are optional
  // Matches: /shop, /shop/weapons, /shop/weapons/swords, /shop/weapons/swords/excalibur
}

// 3. Programmatic navigation with parameters
function QuestBoard() {
  const navigate = useNavigate();
  
  const acceptQuest = (questId) => {
    // Navigate with params and state
    navigate(\`/quests/\${questId}/active\`, {
      state: { 
        acceptedAt: new Date(),
        previousLocation: location.pathname 
      }
    });
  };
  
  // Generate dynamic routes
  const createQuestRoute = (quest) => ({
    path: \`quests/\${quest.type}/\${quest.id}\`,
    element: <QuestDetail />,
    loader: () => loadQuestData(quest.id)
  });
}

// 4. Nested dynamic routes
{
  path: "guilds/:guildId",
  element: <GuildLayout />,
  children: [
    {
      path: "members/:memberId",
      element: <MemberProfile />
    },
    {
      path: "quests/:questId",
      element: <GuildQuest />
    }
  ]
}`}</pre>
				</div>

				<div className='waypoint-patterns'>
					<h3>Dynamic Waypoint Patterns</h3>
					<div className='pattern-cards'>
						<div className='pattern-card'>
							<h4>Resource Pattern</h4>
							<code>/resource/:id</code>
							<p>View a specific item</p>
						</div>
						<div className='pattern-card'>
							<h4>Collection Pattern</h4>
							<code>/resources?filter=value</code>
							<p>List with filters</p>
						</div>
						<div className='pattern-card'>
							<h4>Nested Pattern</h4>
							<code>/parent/:id/child/:childId</code>
							<p>Hierarchical resources</p>
						</div>
						<div className='pattern-card'>
							<h4>Action Pattern</h4>
							<code>/resource/:id/action</code>
							<p>Perform operations</p>
						</div>
					</div>
				</div>

				<div className='code-example'>
					<pre>{`// Building a Dynamic Navigation Menu
function DynamicNavMenu() {
  const { guildId } = useParams();
  const location = useLocation();
  
  // Generate context-aware navigation
  const navItems = [
    {
      label: 'Guild Home',
      to: \`/guilds/\${guildId}\`,
      active: location.pathname === \`/guilds/\${guildId}\`
    },
    {
      label: 'Members',
      to: \`/guilds/\${guildId}/members\`,
      active: location.pathname.includes('/members')
    },
    {
      label: 'Treasury',
      to: \`/guilds/\${guildId}/treasury\`,
      active: location.pathname.includes('/treasury'),
      // Include current filters
      preserveQuery: true
    }
  ];
  
  return (
    <nav className="dynamic-nav">
      {navItems.map(item => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) => 
            isActive ? 'active' : ''
          }>
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}`}</pre>
				</div>
			</div>

			<div className='parameter-playground'>
				<h3>Waypoint Parameter Playground</h3>
				<div className='playground-controls'>
					<h4>Build Your Dynamic Route:</h4>
					<div className='route-builder'>
						<input
							type='text'
							placeholder='/users/:userId/posts/:postId'
							className='route-input'
						/>
						<button onClick={() => setShowParameterDemo(true)}>
							Test Route ✨
						</button>
					</div>
					{showParameterDemo && (
						<div className='route-test-result'>
							<p>Example matches:</p>
							<ul>
								<li>/users/123/posts/456</li>
								<li>/users/alice/posts/first-post</li>
								<li>/users/7/posts/about-routing</li>
							</ul>
						</div>
					)}
				</div>
			</div>

			<div className='learning-insight'>
				<h3>Collaborative Discovery</h3>
				<div className='insight-dialogue'>
					<div className='marina-quote'>
						<p>
							"Dynamic parameters are like the component props of
							navigation - they make routes reusable and
							flexible."
						</p>
					</div>
					<div className='student-quote'>
						<p>
							"I see it now! Route parameters are for identity (
							<code>:id</code>), query parameters are for state (
							<code>?filter=active</code>), and navigation state
							is for temporary data that shouldn't be in the URL.
							It all connects to what I learned about state
							management!"
						</p>
					</div>
				</div>
			</div>

			<div className='integration-moment'>
				<h3>Marina's Teaching Moment</h3>
				<p className='story-paragraph'>
					Marina demonstrated the parameter patterns to help Aria
					understand the concepts more deeply. "Let me show you how
					these patterns connect to what you've learned," she
					explained.
				</p>

				<div className='student-learns'>
					<p className='student-explanation'>
						"I think I understand," Aria said, connecting the
						concepts. "In forms, we have controlled inputs that sync
						with state. In routing, URL parameters sync with your
						app's navigation state. Both follow the same principle -
						a single source of truth that updates your UI."
					</p>

					<pre>{`// Marina's integrated example
// Form state (from Western Quarter)
const [filters, setFilters] = useState({ category: 'all' });

// Navigation state (current lesson)
const [searchParams, setSearchParams] = useSearchParams();
const category = searchParams.get('category') || 'all';

// They work the same way!`}</pre>
				</div>
			</div>

			<div className='reflection-section'>
				<h3>Building on Your Journey</h3>
				<p>
					Consider how the dynamic routing patterns you've learned
					here could enhance the form systems you built in the Western
					Quarter. How might you create a multi-step form wizard that
					uses route parameters to track progress?
				</p>
				<p>
					Marina turns to you: "With your comprehensive understanding
					of React, how would you architect a system where form state
					persists across route changes?"
				</p>
			</div>
		</div>
	);
};

export default ChapterTwo;
