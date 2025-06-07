import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const ChapterThree = () => {
	const { navigationHistory, handleNavigation } = useOutletContext();

	const [activeNav, setActiveNav] = useState('dashboard');
	const [breadcrumbs, setBreadcrumbs] = useState(['Home', 'Dashboard']);

	const navigationPatterns = [
		{
			name: 'Nested Routes',
			icon: '🏰',
			description: 'Districts within districts',
			code: 'Route > Route > Route',
		},
		{
			name: 'Protected Routes',
			icon: '🔒',
			description: 'Guarded pathways',
			code: 'RequireAuth > Route',
		},
		{
			name: 'Layout Routes',
			icon: '📐',
			description: 'Shared kingdom structures',
			code: 'Layout > Outlet',
		},
		{
			name: 'Programmatic Navigation',
			icon: '🎯',
			description: 'Teleportation spells',
			code: 'useNavigate()',
		},
	];

	return (
		<div className='chapter'>
			<h2 className='chapter-title'>
				Chapter 3: Master Navigator's Secrets
			</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					Marina led her most dedicated students to the Tower of
					Navigation, where the most advanced techniques were kept.
					"You've learned to travel between workshops and carry
					messages," she said, "but the kingdom's structure is more
					complex than simple paths."
				</p>

				<p className='story-paragraph'>
					She unveiled a grand map showing the kingdom's true layout.
					"Look closely," she pointed. "The Component Kingdom has{' '}
					<strong>districts within districts</strong>. The Market
					District contains the Potion Quarter, which houses
					individual shops. These are <strong>nested routes</strong>."
				</p>

				<p className='story-paragraph'>
					Young Param, now more experienced, noticed something.
					"Captain, some areas on the map are marked with locks. Are
					those forbidden zones?"
				</p>

				<p className='story-paragraph'>
					"Ah, you've discovered the <strong>Protected Routes</strong>
					!" Marina smiled. "These pathways require special permission
					- perhaps a royal seal or merchant license. Only those with
					proper credentials may enter."
				</p>

				<div className='route-map'>
					<h4>Advanced Navigation Patterns</h4>
					<div className='route-list'>
						{navigationPatterns.map((pattern) => (
							<div key={pattern.name} className='route-card'>
								<div className='route-icon'>{pattern.icon}</div>
								<h5>{pattern.name}</h5>
								<p>{pattern.description}</p>
								<code>{pattern.code}</code>
							</div>
						))}
					</div>
				</div>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Nested Routes - Districts Within Districts
				</h3>

				<div className='code-example'>
					<pre>{`// Creating Nested Route Structure
function App() {
  return (
    <Routes>
      <Route path="/" element={<Kingdom />}>
        <Route index element={<CastleGates />} />
        <Route path="market" element={<MarketDistrict />}>
          <Route index element={<MarketSquare />} />
          <Route path="potions" element={<PotionShops />} />
          <Route path="armory" element={<WeaponSmith />} />
        </Route>
        <Route path="academy" element={<MagicAcademy />}>
          <Route path="hooks" element={<HookClassroom />} />
          <Route path="state" element={<StateLibrary />} />
        </Route>
      </Route>
    </Routes>
  );
}

// The Market District layout
function MarketDistrict() {
  return (
    <div className="district">
      <h2>Welcome to the Market District</h2>
      <nav>
        <Link to="/market">Main Square</Link>
        <Link to="/market/potions">Potion Quarter</Link>
        <Link to="/market/armory">Weapon Smith</Link>
      </nav>
      <Outlet /> {/* Child routes render here */}
    </div>
  );
}`}</pre>
				</div>

				<div className='router-setup'>
					<div className='setup-step'>
						<h4>Protected Routes - The Guardian Gates</h4>
						<div className='code-snippet'>
							{`// Creating a route guard
function RequireAuth({ children }) {
  const { user } = useAuth();
  const location = useLocation();
  
  if (!user) {
    // Redirect to login, but save the location
    return <Navigate to="/login" state={{ from: location }} />;
  }
  
  return children;
}

// Using protected routes
<Route path="/royal-chamber" element={
  <RequireAuth>
    <RoyalChamber />
  </RequireAuth>
} />

// After login, return to intended destination
function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  
  const handleLogin = () => {
    // ... login logic
    navigate(from, { replace: true });
  };
}`}
						</div>
					</div>
				</div>

				<div className='code-example'>
					<pre>{`// Programmatic Navigation - Teleportation Spells
import { useNavigate } from 'react-router-dom';

function QuestComplete() {
  const navigate = useNavigate();
  
  const handleVictory = async () => {
    // Save quest progress
    await saveProgress();
    
    // Different navigation options
    navigate('/rewards');              // Go to rewards
    navigate(-1);                     // Go back one step
    navigate('/home', { replace: true }); // Replace history
    
    // Navigate with data
    navigate('/hall-of-fame', {
      state: { achievement: 'Dragon Slayer' }
    });
  };
}

// Advanced: Navigation with Loading States
function SmartNavigation() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const navigateWithLoading = async (path) => {
    setIsLoading(true);
    // Prepare data, verify permissions, etc.
    await prepareDestination(path);
    navigate(path);
    setIsLoading(false);
  };
}`}</pre>
				</div>

				<div className='path-visualization'>
					<span className='path-node'>Kingdom</span>
					<span className='path-arrow'>→</span>
					<span className='path-node'>District</span>
					<span className='path-arrow'>→</span>
					<span className='path-node'>Quarter</span>
					<span className='path-arrow'>→</span>
					<span className='path-node'>Shop</span>
				</div>
			</div>

			<div className='code-example'>
				<pre>{`// Layout Routes - Shared Kingdom Architecture
function KingdomLayout() {
  return (
    <div className="kingdom">
      <Header />
      <Navigation />
      <main>
        <Outlet /> {/* Different districts render here */}
      </main>
      <Footer />
    </div>
  );
}

// Breadcrumb Navigation
function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);
  
  return (
    <nav aria-label="breadcrumb">
      <Link to="/">Home</Link>
      {pathnames.map((name, index) => {
        const to = '/' + pathnames.slice(0, index + 1).join('/');
        const isLast = index === pathnames.length - 1;
        
        return isLast ? (
          <span key={to}> / {name}</span>
        ) : (
          <span key={to}> / <Link to={to}>{name}</Link></span>
        );
      })}
    </nav>
  );
}`}</pre>
			</div>

			<div className='lesson-insight'>
					<h3>The Navigation Lesson:</h3>
					<p>
						"A master navigator," Marina explained, "understands
						that the kingdom is not just a collection of separate
						workshops, but an interconnected realm. Nested routes
						reflect the natural hierarchy of your application."
					</p>
					<p>
						"Protected routes ensure that sensitive areas remain
						secure. Just as the Royal Treasury requires proof of
						authorization, your application's private sections need
						authentication."
					</p>
				</div>

			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					How do nested routes help organize complex applications?
					Think about how a kingdom's districts mirror your app's
					feature areas.
				</p>
				<p>
					When would you choose programmatic navigation over
					declarative links? Consider scenarios where navigation
					depends on user actions or async operations.
				</p>
				<p>
					Marina's final wisdom: "The Navigation Compass is not just
					about moving between places - it's about creating intuitive
					journeys that guide citizens naturally through your kingdom.
					Master these patterns, and your application will feel like a
					well-designed city where no one ever gets lost."
				</p>
			</div>
		</div>
	);
};

export default ChapterThree;
