import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const ChapterTwo = () => {
	const { 
		activeRoute, 
		handleNavigation,
		currentView,
		switchView 
	} = useOutletContext();

	const [selectedParam, setSelectedParam] = useState('');
	const [queryParams, setQueryParams] = useState({});

	const dynamicRoutes = [
		{ pattern: '/user/:id', example: '/user/123', description: 'User profile' },
		{ pattern: '/product/:category/:id', example: '/product/books/42', description: 'Product details' },
		{ pattern: '/workshop/:name', example: '/workshop/state-sorcerers', description: 'Workshop page' }
	];

	const viewContent = {
		home: { title: 'Welcome to the Kingdom', content: 'The grand entrance where all journeys begin.' },
		about: { title: 'The Royal Library', content: 'Ancient scrolls containing the kingdom\'s history.' },
		products: { title: 'The Grand Market', content: 'Treasures and tools from across the realm.' },
		contact: { title: 'Messenger Tower', content: 'Send word to any corner of the kingdom.' }
	};

	return (
		<div className='chapter'>
			<h2 className='chapter-title'>
				Chapter 2: Navigating with Purpose
			</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					Captain Marina gathered the Props Messengers in the Navigation Hall. 
					"Now that you understand basic pathways," she began, "let me show you 
					the compass's true power. Not all destinations are fixed - some change 
					based on who's traveling or what they seek."
				</p>

				<p className='story-paragraph'>
					A young messenger named <strong>Param</strong> raised his hand. "But Captain, 
					what if I need to deliver a message to a specific citizen? There are 
					thousands in the kingdom!"
				</p>

				<p className='story-paragraph'>
					Marina's eyes sparkled. "Excellent question! The Navigation Compass can 
					create <strong>dynamic routes</strong> using special markers called 
					<strong>parameters</strong>. Watch this!" She adjusted the compass, and 
					new pathways appeared with glowing placeholders.
				</p>

				<div className='navigation-demo'>
					<h3>The Kingdom's Main Districts</h3>
					<div className='demo-nav'>
						<button 
							className={`nav-link ${currentView === 'home' ? 'active' : ''}`}
							onClick={() => switchView('home')}>
							Castle
						</button>
						<button 
							className={`nav-link ${currentView === 'about' ? 'active' : ''}`}
							onClick={() => switchView('about')}>
							Library
						</button>
						<button 
							className={`nav-link ${currentView === 'products' ? 'active' : ''}`}
							onClick={() => switchView('products')}>
							Market
						</button>
						<button 
							className={`nav-link ${currentView === 'contact' ? 'active' : ''}`}
							onClick={() => switchView('contact')}>
							Messenger Tower
						</button>
					</div>
					<div className='route-content'>
						<h4>{viewContent[currentView].title}</h4>
						<p>{viewContent[currentView].content}</p>
					</div>
				</div>

				<p className='story-paragraph'>
					"But there's more," Marina continued, pulling out a special crystal. 
					"Sometimes you need to carry extra information with you - like search 
					preferences or filter settings. That's where <strong>query parameters</strong> 
					come in. They're like notes attached to your travel permit."
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Dynamic Routes & Parameters
				</h3>

				<div className='route-map'>
					<h4>Flexible Pathways</h4>
					{dynamicRoutes.map((route, index) => (
						<div key={index} className='route-card'>
							<p><strong>Pattern:</strong> {route.pattern}</p>
							<p><strong>Example:</strong> {route.example}</p>
							<p><strong>Purpose:</strong> {route.description}</p>
						</div>
					))}
				</div>

				<div className='code-example'>
					<pre>{`// Dynamic Routes with Parameters
import { useParams } from 'react-router-dom';

// Define the route pattern
<Route path="/user/:userId" element={<UserProfile />} />

// Access parameters in the component
function UserProfile() {
  const { userId } = useParams();
  
  return (
    <div>
      <h2>Citizen Profile #{userId}</h2>
      {/* Load specific citizen data */}
    </div>
  );
}

// Multiple parameters work too!
<Route path="/kingdom/:district/:building" element={<Building />} />

function Building() {
  const { district, building } = useParams();
  // Now you know exactly where to go!
}`}</pre>
				</div>

				<div className='router-setup'>
					<div className='setup-step'>
						<h4>Query Parameters - Travel Notes</h4>
						<div className='code-snippet'>
{`// Adding query parameters
<Link to="/market?category=potions&sort=price">
  Browse Potions by Price
</Link>

// Reading query parameters
import { useSearchParams } from 'react-router-dom';

function Market() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const sortBy = searchParams.get('sort');
  
  // Filter and sort products accordingly
}`}
						</div>
					</div>
				</div>
			</div>

			<div className='code-example'>
				<pre>{`// Navigation with State - Carrying Hidden Messages
import { useNavigate } from 'react-router-dom';

function SecretMission() {
  const navigate = useNavigate();
  
  const startMission = () => {
    // Navigate with hidden state
    navigate('/messenger-tower', {
      state: { 
        secret: 'The dragon awakens at midnight',
        sender: 'Royal Guard'
      }
    });
  };
  
  return <button onClick={startMission}>Begin Mission</button>;
}

// Receiving the hidden message
function MessengerTower() {
  const location = useLocation();
  const { secret, sender } = location.state || {};
  
  // Access the secret information!
}`}</pre>
			</div>

			<div className='lesson-insight'>
				<h3>The Navigation Lesson:</h3>
				<p>
					"Remember," Marina advised, "parameters are like addresses in the kingdom. 
					'/user/123' takes you to citizen 123's home, while '/user/456' takes you 
					to citizen 456. The route pattern stays the same, but the destination 
					changes based on the parameter!"
				</p>
				<p>
					"Query parameters are perfect for temporary settings - like how you want 
					your market stall items sorted, or which page of results you're viewing. 
					They don't change the main destination, just how it's presented."
				</p>
			</div>


			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					How do dynamic routes help the kingdom scale? Imagine if you had to 
					create a separate route for each of the thousands of citizens!
				</p>
				<p>
					When would you use URL parameters versus query parameters? Think about 
					what information is essential to the destination versus optional preferences.
				</p>
			</div>
		</div>
	);
};

export default ChapterTwo;