import { useOutletContext } from 'react-router-dom';

const ChapterOne = () => {
	const { 
		activeRoute, 
		handleNavigation,
		compassDirection,
		navigationHistory 
	} = useOutletContext();

	const routes = [
		{ path: '/', name: 'Home', icon: '🏠', description: 'The starting point' },
		{ path: '/about', name: 'About', icon: '📖', description: 'Learn more' },
		{ path: '/products', name: 'Products', icon: '📦', description: 'Browse items' },
		{ path: '/contact', name: 'Contact', icon: '📞', description: 'Get in touch' }
	];

	return (
		<div className='chapter'>
			<h2 className='chapter-title'>
				Chapter 1: The Ancient Navigation Compass
			</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					In the ever-expanding Component Kingdom, where workshops and buildings 
					stretched as far as the eye could see, a problem arose. Citizens would 
					often get lost trying to find specific workshops, and the Props Messengers 
					spent hours searching for the right destinations.
				</p>

				<p className='story-paragraph'>
					Master App, from his tower, summoned <strong>Captain Marina</strong>, a 
					legendary explorer who had mapped every corner of Weblandia. "Marina," 
					App said, "we need a way for citizens to instantly travel between 
					workshops without getting lost."
				</p>

				<p className='story-paragraph'>
					Marina revealed an ancient artifact - the <strong>Navigation Compass</strong>, 
					also known as React Router. "This magical compass," she explained, "can 
					create instant pathways between any locations in our kingdom. No more 
					wandering through streets - just speak your destination, and you're there!"
				</p>

				<div className='compass-chamber'>
					<h3>The Navigation Compass</h3>
					<div className='compass-display'>
						<div 
							className='compass-needle' 
							style={{ transform: `rotate(${compassDirection}deg)` }}
						/>
						<div className='compass-directions'>
							<span className='direction north'>N</span>
							<span className='direction south'>S</span>
							<span className='direction east'>E</span>
							<span className='direction west'>W</span>
						</div>
					</div>

					<div className='route-map'>
						<h4>Kingdom Destinations</h4>
						<div className='route-list'>
							{routes.map(route => (
								<div
									key={route.path}
									className={`route-card ${activeRoute === route.path ? 'active' : ''}`}
									onClick={() => handleNavigation(route.path)}>
									<div className='route-icon'>{route.icon}</div>
									<h5>{route.name}</h5>
									<p>{route.description}</p>
								</div>
							))}
						</div>
					</div>
				</div>

				<p className='story-paragraph'>
					"But how does it work?" asked a curious Props Messenger who had been 
					struggling with deliveries. Marina smiled, "It's quite simple. The compass 
					creates magical portals called <strong>Routes</strong>. Each route knows 
					exactly which workshop to display when someone speaks its path."
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Installing the Navigation System
				</h3>

				<div className='router-setup'>
					<div className='setup-step'>
						<h4>Step 1: Acquire the Compass</h4>
						<div className='code-snippet'>
							npm install react-router-dom
						</div>
					</div>

					<div className='setup-step'>
						<h4>Step 2: Activate the Compass in Your Kingdom</h4>
						<div className='code-snippet'>
{`import { BrowserRouter } from 'react-router-dom';

// Wrap your entire kingdom with the compass's magic
function App() {
  return (
    <BrowserRouter>
      {/* All your workshops and buildings */}
    </BrowserRouter>
  );
}`}
						</div>
					</div>

					<div className='setup-step'>
						<h4>Step 3: Create Your Pathways</h4>
						<div className='code-snippet'>
{`import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeWorkshop />} />
      <Route path="/about" element={<AboutHall />} />
      <Route path="/products" element={<ProductMarket />} />
    </Routes>
  );
}`}
						</div>
					</div>
				</div>

				<div className='path-visualization'>
					<span className='path-node'>Citizen speaks path</span>
					<span className='path-arrow'>→</span>
					<span className='path-node'>Navigation Compass</span>
					<span className='path-arrow'>→</span>
					<span className='path-node'>Workshop appears</span>
				</div>
			</div>

			<div className='code-example'>
				<pre>{`// Creating Portal Links in the Kingdom
import { Link } from 'react-router-dom';

function KingdomDirectory() {
  return (
    <nav className="kingdom-signpost">
      <Link to="/">Return to Castle</Link>
      <Link to="/about">Visit the Library</Link>
      <Link to="/products">Browse the Market</Link>
      <Link to="/contact">Find the Messenger Tower</Link>
    </nav>
  );
}

// Each Link is a magical portal inscription
// Click it, and you're instantly transported!`}</pre>
			</div>

			<div className='lesson-insight'>
				<h3>The Navigation Lesson:</h3>
				<p>Your journey through the kingdom: {navigationHistory.join(' → ')}</p>
				<p>
					The Navigation Compass remembers every step of your journey, creating a 
					trail of breadcrumbs. This allows citizens to use the magical "Back" and 
					"Forward" spells (browser buttons) to retrace their steps through the kingdom!
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					How does instant travel between workshops (client-side routing) improve 
					the kingdom's efficiency compared to the old way of rebuilding everything 
					for each destination (server-side routing)?
				</p>
				<p>
					What advantages do the Props Messengers gain when they can instantly 
					know their current location in the kingdom?
				</p>
			</div>
		</div>
	);
};

export default ChapterOne;