import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

const ChapterTwo = () => {
	const {
		portalState,
		routeAnimations,
		setRouteAnimations,
		saveScrollPosition,
		restoreScrollPosition,
		scrollPositions
	} = useOutletContext();

	const [activeTransition, setActiveTransition] = useState('slide-right');
	const [scrollBehavior, setScrollBehavior] = useState('smooth');
	const [transitionDemo, setTransitionDemo] = useState({
		current: 'page1',
		isTransitioning: false
	});

	const transitionStyles = [
		{
			id: 'slide-right',
			name: 'Slide Right',
			icon: '➡️',
			enter: 'translateX(100%)',
			exit: 'translateX(-100%)'
		},
		{
			id: 'slide-up',
			name: 'Slide Up',
			icon: '⬆️',
			enter: 'translateY(100%)',
			exit: 'translateY(-100%)'
		},
		{
			id: 'fade-scale',
			name: 'Fade & Scale',
			icon: '💫',
			enter: 'scale(0.8) opacity(0)',
			exit: 'scale(1.2) opacity(0)'
		},
		{
			id: 'rotate-3d',
			name: '3D Rotate',
			icon: '🎯',
			enter: 'rotateY(90deg)',
			exit: 'rotateY(-90deg)'
		}
	];

	const scrollBehaviors = [
		{ id: 'instant', name: 'Instant', description: 'Jump to top immediately' },
		{ id: 'smooth', name: 'Smooth', description: 'Smooth scroll to top' },
		{ id: 'preserve', name: 'Preserve', description: 'Remember scroll position' }
	];

	const simulateTransition = (newPage) => {
		setTransitionDemo({ current: transitionDemo.current, isTransitioning: true });
		
		setTimeout(() => {
			setTransitionDemo({ current: newPage, isTransitioning: false });
		}, 400);
	};

	return (
		<div className='chapter'>
			<h2 className='chapter-title'>
				Chapter 2: The Art of Portal Transitions
			</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					"Creating portals is only the beginning," Marina said, guiding Param 
					to a chamber filled with swirling energy. "The true art lies in 
					<strong>how travelers move between dimensions</strong>."
				</p>

				<p className='story-paragraph'>
					She waved her hand, and the air shimmered with different patterns. 
					"Poor transitions can disorient travelers, making them lose their 
					sense of place. But with the right <strong>transition enchantments</strong>, 
					movement between portals becomes a graceful dance."
				</p>

				<p className='story-paragraph'>
					"Watch this," Marina demonstrated, moving her hand through different 
					gestures. The portals responded with slides, fades, and elaborate 
					3D rotations. "Each transition tells a story about the relationship 
					between origins and destinations."
				</p>

				<p className='story-paragraph'>
					"And remember," she added, "transitions aren't just visual. We must 
					also consider <strong>scroll restoration</strong> - ensuring travelers 
					arrive exactly where they expect, whether at the top of a new realm 
					or returning to their exact position."
				</p>

				<div className='transition-laboratory'>
					<h3>Transition Effects Laboratory</h3>
					
					<div className='transition-selector'>
						<h4>Choose Your Transition:</h4>
						<div className='transition-options'>
							{transitionStyles.map(style => (
								<div
									key={style.id}
									className={`transition-card ${activeTransition === style.id ? 'selected' : ''}`}
									onClick={() => setActiveTransition(style.id)}>
									<span className='transition-icon'>{style.icon}</span>
									<h5>{style.name}</h5>
								</div>
							))}
						</div>
					</div>

					<div className='transition-demo'>
						<h4>Live Transition Preview</h4>
						<div className='demo-container'>
							<div className={`demo-page ${transitionDemo.isTransitioning ? `transitioning-${activeTransition}` : ''}`}>
								<h5>{transitionDemo.current === 'page1' ? 'Origin Portal' : 'Destination Portal'}</h5>
								<p>Current Page: {transitionDemo.current}</p>
							</div>
						</div>
						<div className='demo-controls'>
							<button 
								onClick={() => simulateTransition(transitionDemo.current === 'page1' ? 'page2' : 'page1')}
								disabled={transitionDemo.isTransitioning}>
								Travel to {transitionDemo.current === 'page1' ? 'Destination' : 'Origin'} ✨
							</button>
						</div>
					</div>

					<div className='scroll-behavior-selector'>
						<h4>Scroll Behavior Magic:</h4>
						<div className='behavior-options'>
							{scrollBehaviors.map(behavior => (
								<div
									key={behavior.id}
									className={`behavior-card ${scrollBehavior === behavior.id ? 'selected' : ''}`}
									onClick={() => setScrollBehavior(behavior.id)}>
									<h5>{behavior.name}</h5>
									<p>{behavior.description}</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Implementing Smooth Transitions
				</h3>

				<div className='code-example'>
					<pre>{`// Page Transition Component
import { useLocation, useOutlet } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

function AnimatedRoutes() {
  const location = useLocation();
  const outlet = useOutlet();
  
  const pageVariants = {
    initial: {
      opacity: 0,
      x: '100%'
    },
    in: {
      opacity: 1,
      x: 0
    },
    out: {
      opacity: 0,
      x: '-100%'
    }
  };
  
  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.4
  };
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}>
        {outlet}
      </motion.div>
    </AnimatePresence>
  );
}

// Direction-aware transitions
function DirectionalTransition({ children }) {
  const location = useLocation();
  const [prevPath, setPrevPath] = useState(location.pathname);
  
  // Determine transition direction
  const getDirection = () => {
    const paths = ['/home', '/products', '/about', '/contact'];
    const prevIndex = paths.indexOf(prevPath);
    const currIndex = paths.indexOf(location.pathname);
    
    return currIndex > prevIndex ? 'forward' : 'backward';
  };
  
  useEffect(() => {
    setPrevPath(location.pathname);
  }, [location]);
  
  const variants = {
    enter: (direction) => ({
      x: direction === 'forward' ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction === 'forward' ? '-100%' : '100%',
      opacity: 0
    })
  };
  
  return (
    <motion.div
      custom={getDirection()}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.3 }}>
      {children}
    </motion.div>
  );
}`}</pre>
				</div>

				<div className='code-example'>
					<pre>{`// Scroll Position Management
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Custom hook for scroll restoration
function useScrollRestoration() {
  const location = useLocation();
  const scrollPositions = useRef({});
  
  useEffect(() => {
    // Save scroll position before navigation
    const savePosition = () => {
      scrollPositions.current[location.key] = {
        x: window.scrollX,
        y: window.scrollY
      };
    };
    
    // Handle browser back/forward
    window.addEventListener('beforeunload', savePosition);
    
    return () => {
      savePosition();
      window.removeEventListener('beforeunload', savePosition);
    };
  }, [location]);
  
  useEffect(() => {
    // Restore scroll position
    const { key } = location;
    const savedPosition = scrollPositions.current[key];
    
    if (savedPosition) {
      // Restore previous position
      window.scrollTo(savedPosition.x, savedPosition.y);
    } else {
      // New page - scroll to top
      window.scrollTo(0, 0);
    }
  }, [location]);
}

// Smooth scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pathname]);
  
  return null;
}

// Conditional scroll restoration
function SmartScroll({ children }) {
  const location = useLocation();
  const [scrollBehavior, setScrollBehavior] = useState('auto');
  
  useEffect(() => {
    // Different behavior for different routes
    if (location.pathname.includes('/gallery')) {
      // Preserve scroll in gallery
      setScrollBehavior('manual');
    } else if (location.state?.preserveScroll) {
      // Preserve if explicitly requested
      setScrollBehavior('manual');
    } else {
      // Default to top
      window.scrollTo(0, 0);
    }
  }, [location]);
  
  return children;
}`}</pre>
				</div>

				<div className='transition-patterns'>
					<h3>Transition Patterns</h3>
					<div className='pattern-showcase'>
						<div className='pattern-item'>
							<h4>Shared Element Transitions</h4>
							<p>Elements that persist across routes</p>
							<div className='code-snippet'>
{`// FLIP animation for shared elements
<motion.div
  layoutId="shared-hero"
  className="hero-image"
  transition={{ duration: 0.6 }}
/>`}
							</div>
						</div>
						<div className='pattern-item'>
							<h4>Staggered Transitions</h4>
							<p>Sequential element animations</p>
							<div className='code-snippet'>
{`{items.map((item, i) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: i * 0.1 }}
  />
))}`}
							</div>
						</div>
						<div className='pattern-item'>
							<h4>Loading Transitions</h4>
							<p>Smooth loading states</p>
							<div className='code-snippet'>
{`<AnimatePresence>
  {loading ? (
    <LoadingSpinner />
  ) : (
    <Content />
  )}
</AnimatePresence>`}
							</div>
						</div>
						<div className='pattern-item'>
							<h4>Exit Animations</h4>
							<p>Graceful component removal</p>
							<div className='code-snippet'>
{`<motion.div
  exit={{ 
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.2 }
  }}
/>`}
							</div>
						</div>
					</div>
				</div>

				<div className='code-example'>
					<pre>{`// Advanced Route Transition System
class TransitionManager {
  constructor() {
    this.transitions = new Map();
    this.defaultTransition = 'fade';
  }
  
  // Register custom transitions between routes
  register(from, to, transition) {
    const key = \`\${from}->\${to}\`;
    this.transitions.set(key, transition);
  }
  
  // Get transition for route change
  getTransition(from, to) {
    // Check for specific transition
    const key = \`\${from}->\${to}\`;
    if (this.transitions.has(key)) {
      return this.transitions.get(key);
    }
    
    // Check for reverse transition
    const reverseKey = \`\${to}->\${from}\`;
    if (this.transitions.has(reverseKey)) {
      const reverse = this.transitions.get(reverseKey);
      return this.reverseTransition(reverse);
    }
    
    return this.defaultTransition;
  }
  
  reverseTransition(transition) {
    // Reverse the animation direction
    return {
      ...transition,
      enter: transition.exit,
      exit: transition.enter
    };
  }
}

// Usage with React Router
function TransitionRouter() {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState(location);
  const transitionManager = useRef(new TransitionManager());
  
  // Configure transitions
  useEffect(() => {
    const tm = transitionManager.current;
    
    // Home to Products: slide right
    tm.register('/', '/products', {
      name: 'slide-right',
      duration: 0.4,
      enter: { x: '100%' },
      exit: { x: '-100%' }
    });
    
    // Products to Detail: zoom in
    tm.register('/products', '/products/:id', {
      name: 'zoom',
      duration: 0.5,
      enter: { scale: 0.8, opacity: 0 },
      exit: { scale: 1.2, opacity: 0 }
    });
  }, []);
  
  const transition = transitionManager.current.getTransition(
    prevLocation.pathname,
    location.pathname
  );
  
  useEffect(() => {
    setPrevLocation(location);
  }, [location]);
  
  return (
    <AnimatedOutlet transition={transition} />
  );
}`}</pre>
				</div>

				<div className='performance-tips'>
					<h3>Transition Performance</h3>
					<div className='tips-grid'>
						<div className='tip-card'>
							<h4>Use CSS Transforms</h4>
							<p>Prefer transform and opacity for smooth 60fps animations</p>
						</div>
						<div className='tip-card'>
							<h4>Will-Change Property</h4>
							<p>Hint browser about upcoming animations</p>
						</div>
						<div className='tip-card'>
							<h4>Reduce Paint Areas</h4>
							<p>Animate containers, not individual elements</p>
						</div>
						<div className='tip-card'>
							<h4>GPU Acceleration</h4>
							<p>Use 3D transforms to trigger hardware acceleration</p>
						</div>
					</div>
				</div>

				<div className='code-example'>
					<pre>{`// View Transitions API (Experimental)
// Native browser transitions between pages
async function navigateWithTransition(url) {
  if (!document.startViewTransition) {
    // Fallback for browsers without support
    window.location.href = url;
    return;
  }
  
  // Start view transition
  const transition = document.startViewTransition(async () => {
    // Update DOM
    await updatePageContent(url);
  });
  
  // Wait for transition to complete
  await transition.finished;
}

// CSS for view transitions
::view-transition-old(root) {
  animation: 0.3s ease-out fadeOut;
}

::view-transition-new(root) {
  animation: 0.3s ease-in fadeIn;
}

// React integration
function useViewTransition() {
  const navigate = useNavigate();
  
  const navigateWithTransition = useCallback((to) => {
    if (!document.startViewTransition) {
      navigate(to);
      return;
    }
    
    document.startViewTransition(() => {
      flushSync(() => {
        navigate(to);
      });
    });
  }, [navigate]);
  
  return navigateWithTransition;
}`}</pre>
				</div>
			</div>

			<div className='transition-choreography'>
				<h3>Transition Choreography</h3>
				<div className='choreography-timeline'>
					<div className='timeline-item'>
						<span className='time'>0ms</span>
						<span className='event'>Exit animation begins</span>
					</div>
					<div className='timeline-item'>
						<span className='time'>200ms</span>
						<span className='event'>Old content removed</span>
					</div>
					<div className='timeline-item'>
						<span className='time'>250ms</span>
						<span className='event'>New content mounted</span>
					</div>
					<div className='timeline-item'>
						<span className='time'>450ms</span>
						<span className='event'>Enter animation complete</span>
					</div>
				</div>
			</div>

			<div className='lesson-insight'>
				<h3>The Portal Lesson:</h3>
				<p>
					"The best transitions are invisible - they enhance the journey without 
					drawing attention to themselves. They should feel natural, like turning 
					pages in a book or walking through doorways. The magic is in making 
					complex choreography feel effortless."
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					How do transitions affect the perceived performance of your application? 
					Consider the balance between smooth animations and quick navigation.
				</p>
				<p>
					What role does motion design play in helping users understand the 
					spatial relationships between different parts of your application?
				</p>
			</div>
		</div>
	);
};

export default ChapterTwo;