import React from 'react';
import { useOutletContext } from 'react-router-dom';
import StoryContent from '../../../../../components/content/StoryContent';

function ChapterOne() {
	const { 
		activeRoute, 
		handleNavigation,
		compassDirection,
		navigationHistory,
		masterStatus
	} = useOutletContext();

	const routes = [
		{ path: '/', name: 'Home', icon: '🏠', description: 'The starting point' },
		{ path: '/about', name: 'About', icon: '📖', description: 'Learn more' },
		{ path: '/products', name: 'Products', icon: '📦', description: 'Browse items' },
		{ path: '/contact', name: 'Contact', icon: '📞', description: 'Get in touch' }
	];

	const content = (
		<>
		<div className='chapter'>
			<h2 className='chapter-title'>Chapter 1: Masters Meeting as Equals</h2>
			
			<div className='chapter-bridge'>
				<p>The Central Citadel's Navigation Command Center hummed with energy. Holographic 
				maps of the entire React Kingdom floated in the air, showing real-time data flows 
				and component connections. At the center stood Captain Marina, her eyes lighting up 
				as Aria entered.</p>
			</div>

			<div className='story-section'>
				<p className='story-paragraph'>
					"<strong>Aria the Form Architect!</strong>" Marina's voice carried both respect and 
					excitement. "I've been following your journey since you first entered our kingdom. 
					Master Aurelius speaks of your component innovations. The Council of Hooks praises 
					your pattern mastery. Even Portal Keeper Sage says you revolutionized submission 
					systems."
				</p>
				
				<p className='story-paragraph'>
					Aria bowed respectfully, Binary hovering excitedly beside her. "Captain Marina, 
					your navigation systems are legendary. I'm honored you requested me."
				</p>
				
				<p className='story-paragraph'>
					Marina gestured to the floating maps. "Please, we're colleagues now. I need someone 
					who truly understands how all of React works together. Navigation isn't just about 
					moving between pages - it's about maintaining state across routes, managing effects 
					during transitions, handling forms that span multiple views, and creating seamless 
					user experiences."
				</p>
				
				<p className='story-paragraph'>
					Binary projected Aria's accumulated knowledge: "Master certifications detected! 
					Components: ✓, State Management: ✓, Props & Data Flow: ✓, Hooks Mastery: ✓, 
					Forms & Events: ✓. Navigation synthesis probability: 99.8%!"
				</p>

				<div className='aria-marina-collaboration'>
					<h3>The Navigation Vision</h3>
					<p className='story-paragraph'>
						Marina activated the central hologram. "I've been working on something revolutionary - 
						a navigation system that integrates everything you've mastered. But I've hit challenges 
						that require your unique perspective."
					</p>
					
					<p className='story-paragraph'>
						Aria studied the projections, her trained eye immediately spotting patterns. "I see 
						it! Routes are specialized components that conditionally render based on location state. 
						The navigation itself is just another form of state management!"
					</p>
					
					<p className='story-paragraph'>
						"Exactly!" Marina's enthusiasm was contagious. "And look here - when users navigate, 
						it triggers effects, updates context, and can even validate forms before allowing 
						route changes. Everything connects!"
					</p>
				</div>

				<div className='compass-chamber evolved'>
					<h3>The Master's Navigation Compass</h3>
					<p className='marina-explanation'>
						"This isn't just any compass," Marina explained. "With your expertise, we can 
						transform it into something that leverages all of React's power."
					</p>
					
					<div className='compass-display enhanced'>
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
						<div className='master-badges'>
							{Object.entries(masterStatus).map(([skill, achieved]) => (
								<div 
									key={skill} 
									className={`badge ${achieved ? 'achieved' : 'pending'}`}
									title={skill}>
									{achieved ? '✓' : '○'}
								</div>
							))}
						</div>
					</div>

					<div className='route-map collaborative'>
						<h4>Integrated Route Architecture</h4>
						<div className='route-list'>
							{routes.map(route => (
								<div
									key={route.path}
									className={`route-card ${activeRoute === route.path ? 'active' : ''}`}
									onClick={() => handleNavigation(route.path)}>
									<div className='route-icon'>{route.icon}</div>
									<h5>{route.name}</h5>
									<p>{route.description}</p>
									<div className='integration-hint'>
										{route.path === '/' && '← State persistence here'}
										{route.path === '/about' && '← Context provides data'}
										{route.path === '/products' && '← Effects load content'}
										{route.path === '/contact' && '← Form validation active'}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				<div className='collaborative-insight'>
					<p className='story-paragraph'>
						"You see it immediately," Marina observed with admiration. "Most struggle to 
						understand that routing is just another layer of React's component system. But 
						with your comprehensive knowledge..."
					</p>
					
					<p className='story-paragraph'>
						"It's all connected," Aria finished. "Routes are components. Navigation updates 
						state. Browser history triggers effects. And we can guard routes with the same 
						validation patterns I used in the Western Quarter!"
					</p>
					
					<p className='story-paragraph'>
						Binary displayed the synthesis: "Pattern recognition complete! Navigation = 
						Components + State + Effects + Context + Validation. Marina + Aria collaboration 
						efficiency: MAXIMUM!"
					</p>
				</div>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Building the Integrated Navigation System
				</h3>
				<p className='collaboration-note'>
					Marina and Aria work together, combining their expertise...
				</p>

				<div className='router-setup integrated'>
					<div className='setup-step marina-contribution'>
						<h4>Marina's Foundation: Core Router Setup</h4>
						<div className='code-snippet'>
{`import { BrowserRouter } from 'react-router-dom';

// Marina: "The router provides the navigation context"
function App() {
  return (
    <BrowserRouter>
      <NavigationProvider> {/* Aria adds this */}
        {/* All your workshops and buildings */}
      </NavigationProvider>
    </BrowserRouter>
  );
}`}
						</div>
					</div>

					<div className='setup-step aria-enhancement'>
						<h4>Aria's Enhancement: State Integration</h4>
						<div className='code-snippet'>
{`// Aria: "Let me add state persistence across routes"
import { createContext, useContext, useState, useEffect } from 'react';

const NavigationContext = createContext();

export function NavigationProvider({ children }) {
  const [navigationState, setNavigationState] = useState({});
  const location = useLocation();
  
  // Preserve state across navigation
  useEffect(() => {
    // Your effect patterns from Eastern Quarter
  }, [location]);
  
  return (
    <NavigationContext.Provider value={navigationState}>
      {children}
    </NavigationContext.Provider>
  );
}`}
						</div>
					</div>

					<div className='setup-step combined-wisdom'>
						<h4>Combined Wisdom: Intelligent Routes</h4>
						<div className='code-snippet'>
{`// Marina + Aria: Routes that leverage all React patterns
import { Routes, Route, Navigate } from 'react-router-dom';

function AppRoutes() {
  const { user } = useAuth(); // Aria's hook patterns
  const { isValid } = useFormValidation(); // From Western Quarter
  
  return (
    <Routes>
      <Route path="/" element={<HomeWorkshop />} />
      <Route 
        path="/dashboard" 
        element={
          user ? <Dashboard /> : <Navigate to="/login" />
        } 
      />
      <Route 
        path="/checkout"
        element={
          isValid ? <Checkout /> : <Navigate to="/cart" />
        }
      />
    </Routes>
  );
}`}
						</div>
					</div>
				</div>

				<div className='path-visualization mastery'>
					<span className='path-node'>User Intent</span>
					<span className='path-arrow'>→</span>
					<span className='path-node'>Navigation Event</span>
					<span className='path-arrow'>→</span>
					<span className='path-node'>State Update</span>
					<span className='path-arrow'>→</span>
					<span className='path-node'>Route Validation</span>
					<span className='path-arrow'>→</span>
					<span className='path-node'>Component Render</span>
				</div>
			</div>

			<div className='code-example'>
				<h3>The Marina-Aria Navigation Pattern</h3>
				<pre>{`// A navigation system that uses everything
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';

function IntelligentNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { formData } = useFormContext(); // Aria's patterns
  const [canNavigate, setCanNavigate] = useState(true);
  
  // Marina's navigation expertise
  const handleNavigation = (path) => {
    // Aria's validation integration
    if (hasUnsavedChanges(formData)) {
      if (!confirm('You have unsaved changes. Continue?')) {
        return;
      }
    }
    
    // Navigate with state
    navigate(path, { 
      state: { 
        from: location.pathname,
        timestamp: Date.now()
      }
    });
  };
  
  // Effect to sync with browser history
  useEffect(() => {
    const handlePopState = (e) => {
      // Aria's effect patterns in action
      validateNavigation(e.state);
    };
    
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);
  
  return (
    <nav className="intelligent-nav">
      <Link 
        to="/" 
        onClick={(e) => {
          e.preventDefault();
          handleNavigation('/');
        }}>
        Home
      </Link>
      {/* More intelligent links */}
    </nav>
  );
}`}</pre>
			</div>

			<div className='lesson-insight'>
				<h3>The Collaborative Discovery:</h3>
				<p>Your navigation journey: {navigationHistory.join(' → ')}</p>
				<p>
					Marina and Aria discovered that navigation in React isn't just about changing URLs - 
					it's about orchestrating the entire application state. By combining Marina's routing 
					expertise with Aria's comprehensive React knowledge, they created a navigation system 
					that preserves state, validates transitions, manages effects, and provides a seamless 
					user experience. This is what happens when masters collaborate as equals!
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					How does understanding routing as an extension of React's component system change 
					your approach to navigation?
				</p>
				<p className='story-paragraph'>
					What advantages come from integrating state management, effects, and validation 
					into your routing logic?
				</p>
				<p className='story-paragraph'>
					How does Aria's comprehensive knowledge enhance Marina's navigation expertise?
				</p>
			</div>
		</div>
		</>
	);
	
	return <StoryContent content={content} />;
}

export default ChapterOne;