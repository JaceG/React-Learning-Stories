import React from 'react';
import { useOutletContext } from 'react-router-dom';
import StoryContent from '../../../../../components/content/StoryContent';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';

function ChapterOne() {
	const {
		activeRoute,
		handleNavigation,
		compassDirection,
		navigationHistory,
		masterStatus,
	} = useOutletContext();

	const routes = [
		{
			path: '/',
			name: 'Home',
			icon: '🏠',
			description: 'The starting point',
		},
		{
			path: '/about',
			name: 'About',
			icon: '📖',
			description: 'Learn more',
		},
		{
			path: '/products',
			name: 'Products',
			icon: '📦',
			description: 'Browse items',
		},
		{
			path: '/contact',
			name: 'Contact',
			icon: '📞',
			description: 'Get in touch',
		},
	];

	const content = (
		<>
			<div className='chapter'>
				<ChapterIntro
					chapterNumber={1}
					title='The Navigation Command Center'
				/>

				<div className='story-section'>
					<p className='story-paragraph'>
						"<strong>Welcome, young navigator!</strong>" Marina's
						voice carried warmth and excitement. "I've heard
						wonderful things about your journey through the React
						Kingdom. Portal Keeper Sage sent word of your progress
						in Forms & Events. I'm excited to teach you about
						routing and navigation!"
					</p>

					<p className='story-paragraph'>
						Aria looked around in wonder, Binary hovering excitedly
						beside her. "Captain Marina, your navigation systems are
						legendary. I'm eager to learn from you!"
					</p>

					<p className='story-paragraph'>
						Marina gestured to the floating maps. "Excellent
						attitude! Navigation builds on everything you've
						learned. It's not just about moving between pages - it's
						about maintaining state across routes, managing effects
						during transitions, handling forms that span multiple
						views, and creating seamless user experiences. Your
						Academy training will help you understand these concepts
						quickly."
					</p>

					<p className='story-paragraph'>
						Binary projected Aria's learning progress: "Foundation
						knowledge confirmed! Components: ✓, State Management: ✓,
						Props & Data Flow: ✓, Hooks Training: ✓, Forms & Events:
						✓. Ready for navigation training!"
					</p>

					<div className='marina-teaching'>
						<h3>The Navigation Vision</h3>
						<p className='story-paragraph'>
							Marina activated the central hologram. "Let me show
							you something fascinating - how navigation systems
							integrate everything you've learned. I think you'll
							find the patterns quite familiar."
						</p>

						<p className='story-paragraph'>
							Aria studied the projections with growing
							understanding. "This is amazing! Routes look like
							specialized components that conditionally render
							based on location state. Is navigation just another
							form of state management?"
						</p>

						<p className='story-paragraph'>
							"Exactly!" Marina's enthusiasm was contagious. "And
							look here - when users navigate, it triggers
							effects, updates context, and can even validate
							forms before allowing route changes. Everything
							connects, just like you've been learning!"
						</p>
					</div>

					<div className='compass-chamber evolved'>
						<h3>The Master's Navigation Compass</h3>
						<p className='marina-explanation'>
							"This isn't just any compass," Marina explained. "As
							you learn navigation patterns, we can explore how
							routing leverages all of React's power that you've
							been studying."
						</p>

						<div className='compass-display enhanced'>
							<div
								className='compass-needle'
								style={{
									transform: `rotate(${compassDirection}deg)`,
								}}
							/>
							<div className='compass-directions'>
								<span className='direction north'>N</span>
								<span className='direction south'>S</span>
								<span className='direction east'>E</span>
								<span className='direction west'>W</span>
							</div>
							<div className='master-badges'>
								{Object.entries(masterStatus).map(
									([skill, achieved]) => (
										<div
											key={skill}
											className={`badge ${
												achieved
													? 'achieved'
													: 'pending'
											}`}
											title={skill}>
											{achieved ? '✓' : '○'}
										</div>
									)
								)}
							</div>
						</div>

						<div className='route-map collaborative'>
							<h4>Integrated Route Architecture</h4>
							<div className='route-list'>
								{routes.map((route) => (
									<div
										key={route.path}
										className={`route-card ${
											activeRoute === route.path
												? 'active'
												: ''
										}`}
										onClick={() =>
											handleNavigation(route.path)
										}>
										<div className='route-icon'>
											{route.icon}
										</div>
										<h5>{route.name}</h5>
										<p>{route.description}</p>
										<div className='integration-hint'>
											{route.path === '/' &&
												'← State persistence here'}
											{route.path === '/about' &&
												'← Context provides data'}
											{route.path === '/products' &&
												'← Effects load content'}
											{route.path === '/contact' &&
												'← Form validation active'}
										</div>
									</div>
								))}
							</div>
						</div>
					</div>

					<div className='collaborative-insight'>
						<p className='story-paragraph'>
							"You see it immediately," Marina observed with
							admiration. "Most struggle to understand that
							routing is just another layer of React's component
							system. But with your comprehensive knowledge..."
						</p>

						<p className='story-paragraph'>
							"It's all connected," Aria finished. "Routes are
							components. Navigation updates state. Browser
							history triggers effects. And we can guard routes
							with the same validation patterns I used in the
							Western Quarter!"
						</p>

						<p className='story-paragraph'>
							Binary displayed the synthesis: "Pattern recognition
							complete! Navigation = Components + State + Effects
							+ Context + Validation. Aria's learning progress:
							EXCELLENT!"
						</p>
					</div>
				</div>

				<div className='interactive-section'>
					<h3 className='section-title'>
						Building the Integrated Navigation System
					</h3>
					<InstructionBox character='Marina teaches Aria navigation patterns, building on her React foundation.'>
						Click on different routes above to see how navigation
						updates the compass direction.
					</InstructionBox>

					<div className='router-setup integrated'>
						<div className='setup-step marina-contribution'>
							<h4>Marina's Foundation: Core Router Setup</h4>
							<div className='code-snippet'>
								{`import { BrowserRouter } from 'react-router-dom';

// Marina: "The router provides the navigation context"
function App() {
  return (
    <BrowserRouter>
      <NavigationProvider> {/* React integration */}
        {/* All your workshops and buildings */}
      </NavigationProvider>
    </BrowserRouter>
  );
}`}
							</div>
						</div>

						<div className='setup-step react-enhancement'>
							<h4>React Learning: State Integration</h4>
							<div className='code-snippet'>
								{`// React pattern: State persistence across routes
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
							<h4>Marina's Teaching: Intelligent Routes</h4>
							<div className='code-snippet'>
								{`// Marina teaches: Routes that leverage all React patterns
import { Routes, Route, Navigate } from 'react-router-dom';

function AppRoutes() {
  const { user } = useAuth(); // React hook patterns
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

				<CodeExample
					title="Marina's Navigation Pattern"
					discoveredBy='Transcribed by Aria'
					code={`// A navigation system that uses everything
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';

function IntelligentNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { formData } = useFormContext(); // React patterns
  const [canNavigate, setCanNavigate] = useState(true);
  
  // Marina's navigation expertise
  const handleNavigation = (path) => {
    // React validation integration
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
      // React effect patterns in action
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
}`}
				/>

				<ChapterSummary
					lessonInsight={{
						title: 'The Collaborative Discovery:',
						content: `Your navigation journey: ${navigationHistory.join(' → ')}. Marina taught Aria that navigation in React isn't just about changing URLs - it's about orchestrating the entire application state. By learning Marina's routing expertise and applying her React foundation, Aria discovered how navigation systems can preserve state, validate transitions, manage effects, and provide seamless user experiences. This is what happens when a dedicated student learns from an expert teacher!`,
					}}
					reflectionQuestions={[
						"How does understanding routing as an extension of React's component system change your approach to navigation?",
						'What advantages come from integrating state management, effects, and validation into your routing logic?',
						"How does Aria's React foundation help her understand Marina's navigation concepts more quickly?",
					]}
					journalEntry={{
						title: "Aria's Journal - Day 21 (Morning)",
						content:
							"Today I arrived at the Central Citadel to meet Captain Marina! The architecture is breathtaking - crystal spires connecting all quarters of the kingdom through navigation pathways. Marina immediately helped me see that routing isn't just about changing URLs - it's about orchestrating the entire application experience. Routes are components! Navigation updates state! Browser history triggers effects! I can already see how everything I've learned connects here. The Navigation Compass she showed me tracks our journey through the app, just like state tracks data flow. Binary is excited to catalog all these new patterns!",
					}}
				/>
			</div>
		</>
	);

	return <StoryContent content={content} />;
}

export default ChapterOne;
