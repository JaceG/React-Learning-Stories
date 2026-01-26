import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';

const ChapterThree = () => {
	const {
		animationTechniques,
		learnTechnique,
		currentDojo,
		focusDojo,
		masteredAnimations,
		masterAnimation,
		monasteryStage,
		evolve
	} = useOutletContext();

	const [selectedProject, setSelectedProject] = useState(null);
	const [kingdomAchieved, setKingdomAchieved] = useState(false);
	const [gesturePatterns, setGesturePatterns] = useState([]);
	
	// Calculate fluidity level based on progress
	const fluidityLevel = Math.min(100, 
		(animationTechniques.length * 20) + 
		(masteredAnimations.length * 15)
	);

	// Animation project scenarios
	const animationProjects = [
		{
			id: 'dashboard',
			name: 'Data Dashboard',
			icon: '📊',
			requirements: ['Data visualization', 'Smooth transitions', 'Loading states'],
			recommendation: 'Framer Motion + CSS',
			reasoning: 'Declarative API for complex state transitions, CSS for simple hovers'
		},
		{
			id: 'mobile-app',
			name: 'Mobile-First App',
			icon: '📱',
			requirements: ['Gesture support', 'Page transitions', 'Pull to refresh'],
			recommendation: 'React Spring + Gestures',
			reasoning: 'Natural physics for mobile interactions, excellent gesture integration'
		},
		{
			id: 'marketing-site',
			name: 'Marketing Website',
			icon: '🌐',
			requirements: ['Scroll animations', 'Hero animations', 'Micro-interactions'],
			recommendation: 'Framer Motion + Lottie',
			reasoning: 'Scroll triggers and orchestration, Lottie for complex hero animations'
		},
		{
			id: 'game-ui',
			name: 'Game Interface',
			icon: '🎮',
			requirements: ['Complex animations', 'Performance critical', 'Sound sync'],
			recommendation: 'React Spring + Custom',
			reasoning: 'Fine-grained performance control, physics for game feel'
		},
		{
			id: 'ecommerce',
			name: 'E-commerce Site',
			icon: '🛍️',
			requirements: ['Cart animations', 'Product transitions', 'Skeleton screens'],
			recommendation: 'Framer Motion',
			reasoning: 'Layout animations for cart, shared element transitions'
		}
	];

	// Animation best practices
	const bestPractices = [
		{
			practice: 'Performance First',
			description: 'Use transform and opacity, avoid layout thrashing',
			example: 'transform: translateX() not left/right'
		},
		{
			practice: 'Accessibility',
			description: 'Respect prefers-reduced-motion, provide alternatives',
			example: '@media (prefers-reduced-motion: reduce)'
		},
		{
			practice: 'Purpose-Driven',
			description: 'Every animation should have a clear purpose',
			example: 'Guide attention, provide feedback, enhance delight'
		},
		{
			practice: 'Consistency',
			description: 'Maintain consistent timing and easing across your app',
			example: 'Design tokens for animation values'
		}
	];

	// Animation decision factors
	const decisionMatrix = [
		{
			factor: 'Bundle Size',
			framerMotion: '~50KB',
			reactSpring: '~30KB',
			lottie: '~150KB',
			transitionGroup: '~10KB'
		},
		{
			factor: 'Learning Curve',
			framerMotion: 'Moderate',
			reactSpring: 'Steep',
			lottie: 'Easy',
			transitionGroup: 'Easy'
		},
		{
			factor: 'Gesture Support',
			framerMotion: 'Excellent',
			reactSpring: 'Excellent',
			lottie: 'None',
			transitionGroup: 'None'
		},
		{
			factor: 'Performance',
			framerMotion: 'Great',
			reactSpring: 'Excellent',
			lottie: 'Good',
			transitionGroup: 'Good'
		}
	];

	// Check kingdom achievement
	const checkKingdom = () => {
		if (animationTechniques.length >= 3 && masteredAnimations.length >= 4 && gesturePatterns.length >= 3) {
			setKingdomAchieved(true);
			evolve('fluid-master');
		}
	};

	// Select project
	const selectProject = (project) => {
		setSelectedProject(project);
		checkKingdom();
	};

	return (
		<div className='chapter'>
			<ChapterIntro
				chapterNumber={3}
				title={`The Fluid Kingdom`}
				bridge={`Aria had trained in all three dojos, mastering CSS transitions, spring physics, and declarative animation. "You're ready for the final lesson," Abbess Motia announced. "The Fluid Kingdom - where all animation knowledge comes together. True mastery is knowing which tool serves which purpose."`}
			/>

			<div className='story-section'>
				<p className='story-paragraph'>
					<strong>Abbess Motia</strong> led Aria to the monastery's highest 
					tower. "You've learned individual techniques. Now, see how they 
					compose into fluid experiences."
				</p>

				<p className='story-paragraph'>
					The view revealed a fully animated dashboard - data flowing like 
					rivers, transitions smooth as silk, gestures responding instantly. 
					"This is the Fluid Kingdom," Abbess Motia explained.
				</p>

				<p className='story-paragraph'>
					<strong>Aria</strong> watched in awe. "Every movement has purpose. 
					Nothing feels arbitrary or excessive."
				</p>

				<p className='story-paragraph'>
					"Exactly," nodded Abbess Motia. "Animation isn't decoration - it's 
					communication. Motion guides attention, provides feedback, and creates 
					delight without distraction."
				</p>

				<p className='story-paragraph'>
					<strong>Binary</strong> calculated the complexity. "So many moving 
					parts, yet performance remains smooth. The optimization is impressive!"
				</p>

				<p className='story-paragraph'>
					<strong>Debuggora</strong> added, "And notice the accessibility - users 
					who prefer reduced motion get a different but equally functional experience."
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>Interactive Exercise: Building the Fluid Kingdom</h3>
				
				<InstructionBox character={`Abbess Motia presents the Final Challenge.`}>
					Combine all your animation knowledge to build complex, performant animations. 
					Choose the right tool for each animation need!
				</InstructionBox>
				
				<div className='approach-comparison'>
					<h4>Animation Project Analyzer</h4>
					<div className='animation-dojos'>
						{animationProjects.map(project => (
							<div
								key={project.id}
								className={`dojo-card ${
									selectedProject?.id === project.id ? 'selected' : ''
								}`}
								onClick={() => selectProject(project)}
								style={{ cursor: 'pointer' }}>
								<div className='dojo-icon'>{project.icon}</div>
								<div className='dojo-name'>{project.name}</div>
								<div className='dojo-philosophy'>
									<strong>Requirements:</strong>
									<ul style={{ 
										marginTop: '10px', 
										paddingLeft: '20px',
										textAlign: 'left' 
									}}>
										{project.requirements.map((req, i) => (
											<li key={i}>{req}</li>
										))}
									</ul>
								</div>
								{selectedProject?.id === project.id && (
									<div style={{
										marginTop: '15px',
										padding: '15px',
										background: 'rgba(240, 147, 251, 0.2)',
										borderRadius: '5px'
									}}>
										<strong>Recommendation:</strong> {project.recommendation}
										<p style={{ margin: '5px 0 0 0', fontSize: '0.9em' }}>
											{project.reasoning}
										</p>
									</div>
								)}
							</div>
						))}
					</div>
				</div>

				<div className='character-guidance' style={{ marginTop: '40px' }}>
					<h4>Animation Best Practices</h4>
					<div className='animation-patterns'>
						{bestPractices.map((practice, index) => (
							<div key={index} className='pattern-card'>
								<div className='pattern-title'>{practice.practice}</div>
								<div className='pattern-description'>{practice.description}</div>
								<code style={{
									display: 'block',
									marginTop: '10px',
									padding: '10px',
									background: 'rgba(0, 0, 0, 0.3)',
									borderRadius: '5px',
									fontSize: '0.9em'
								}}>
									{practice.example}
								</code>
							</div>
						))}
					</div>
				</div>

				<div className='decision-matrix' style={{ marginTop: '40px' }}>
					<h4>Library Decision Matrix</h4>
					<table className='comparison-table'>
						<thead>
							<tr>
								<th>Factor</th>
								<th>Framer Motion</th>
								<th>React Spring</th>
								<th>Lottie</th>
								<th>Transition Group</th>
							</tr>
						</thead>
						<tbody>
							{decisionMatrix.map((item, index) => (
								<tr key={index}>
									<td><strong>{item.factor}</strong></td>
									<td style={{ color: '#FF0080' }}>{item.framerMotion}</td>
									<td style={{ color: '#7B61FF' }}>{item.reactSpring}</td>
									<td style={{ color: '#00D9FF' }}>{item.lottie}</td>
									<td style={{ color: '#61DAFB' }}>{item.transitionGroup}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				<div className='fluidity-achievement' style={{ marginTop: '40px' }}>
					<h4>Your Animation Journey</h4>
					<div style={{
						background: 'rgba(255, 255, 255, 0.1)',
						padding: '30px',
						borderRadius: '15px',
						textAlign: 'center'
					}}>
						<div style={{ fontSize: '1.2em', marginBottom: '20px' }}>
							Fluidity Level: {fluidityLevel}%
						</div>
						<div style={{ marginBottom: '10px' }}>
							Techniques Learned: {animationTechniques.length}
						</div>
						<div style={{ marginBottom: '10px' }}>
							Animations Mastered: {masteredAnimations.length}
						</div>
						<div style={{ marginBottom: '10px' }}>
							Gestures Understood: {gesturePatterns.length}
						</div>
					</div>
				</div>

				{kingdomAchieved && (
					<div className='fluid-achievement'>
						<h4>🌊 Fluid Kingdom Achievement!</h4>
						<p>You've mastered the art of motion! You understand that great 
						animation enhances rather than distracts, guides rather than 
						confuses, delights rather than annoys. Use this power wisely!</p>
					</div>
				)}
			</div>

			<CodeExample
				title={`Building Fluid Experiences`}
				discoveredBy={`Fluid Kingdom Wisdom`}
				code={`// Complete Animation System Implementation

// 1. Animation System Setup
// Design tokens for consistent motion
const animationTokens = {
  duration: {
    instant: 0,
    fast: 200,
    normal: 300,
    slow: 500,
    slowest: 1000
  },
  easing: {
    ease: [0.4, 0, 0.2, 1],
    easeIn: [0.4, 0, 1, 1],
    easeOut: [0, 0, 0.2, 1],
    spring: { type: 'spring', damping: 25, stiffness: 300 }
  },
  scale: {
    pressed: 0.95,
    hover: 1.05,
    inactive: 0.8
  }
};

// 2. Accessible Animation Wrapper
import { motion, useReducedMotion } from 'framer-motion';

function AccessibleMotion({ children, ...props }) {
  const shouldReduceMotion = useReducedMotion();
  
  if (shouldReduceMotion) {
    // Instant transitions for reduced motion
    return (
      <motion.div
        {...props}
        transition={{ duration: 0 }}
      >
        {children}
      </motion.div>
    );
  }
  
  return <motion.div {...props}>{children}</motion.div>;
}

// 3. Complete Dashboard Example
function AnimatedDashboard() {
  const [selectedMetric, setSelectedMetric] = useState(null);
  const [data, setData] = useState(generateData());
  
  return (
    <motion.div className="dashboard" layout>
      {/* Animated Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ...animationTokens.easing.spring }}
      >
        <h1>Analytics Dashboard</h1>
      </motion.header>
      
      {/* Metric Cards with Stagger */}
      <motion.div 
        className="metrics-grid"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
        initial="hidden"
        animate="show"
      >
        {data.metrics.map((metric) => (
          <MetricCard
            key={metric.id}
            metric={metric}
            isSelected={selectedMetric === metric.id}
            onClick={() => setSelectedMetric(metric.id)}
          />
        ))}
      </motion.div>
      
      {/* Detail View with Shared Layout */}
      <AnimatePresence mode="wait">
        {selectedMetric && (
          <DetailView
            key={selectedMetric}
            metricId={selectedMetric}
            onClose={() => setSelectedMetric(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// 4. Gesture-Rich Mobile Interface
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';

function PullToRefresh({ onRefresh, children }) {
  const [{ y }, api] = useSpring(() => ({ y: 0 }));
  const threshold = 100;
  
  const bind = useDrag(
    ({ down, movement: [, my], memo = y.get() }) => {
      if (down) {
        api.start({ y: Math.max(0, memo + my) });
      } else {
        if (memo + my > threshold) {
          onRefresh();
        }
        api.start({ y: 0 });
      }
      return memo;
    },
    { axis: 'y', bounds: { top: 0 }, rubberband: true }
  );
  
  return (
    <animated.div {...bind()} style={{ y }}>
      <animated.div
        style={{
          opacity: y.to([0, threshold], [0, 1]),
          transform: y.to(y => \`rotate(\${y * 2}deg)\`)
        }}
        className="refresh-indicator"
      >
        🔄
      </animated.div>
      {children}
    </animated.div>
  );
}

// 5. Marketing Site with Scroll Animations
import { useScroll, useTransform } from 'framer-motion';

function HeroSection() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  return (
    <section className="hero">
      <motion.div 
        className="hero-background"
        style={{ y }}
      />
      <motion.div 
        className="hero-content"
        style={{ opacity }}
      >
        <h1>Welcome to the Future</h1>
        {/* Lottie animation for complex visuals */}
        <Lottie options={heroAnimationOptions} />
      </motion.div>
    </section>
  );
}

// 6. E-commerce Cart Animation
function ShoppingCart() {
  const [items, setItems] = useState([]);
  
  return (
    <motion.div className="cart" layout>
      <AnimatePresence>
        {items.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={animationTokens.easing.spring}
            className="cart-item"
          >
            <motion.img 
              src={item.image}
              layoutId={\`product-\${item.id}\`}
            />
            <span>{item.name}</span>
            <button onClick={() => removeItem(item.id)}>
              Remove
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
      
      {/* Cart total with number animation */}
      <motion.div className="cart-total">
        Total: <AnimatedNumber value={calculateTotal(items)} />
      </motion.div>
    </motion.div>
  );
}

// 7. Performance Optimization Patterns

// Optimize re-renders with memo
const OptimizedAnimation = React.memo(({ value }) => {
  return (
    <motion.div
      animate={{ x: value * 100 }}
      transition={{ type: 'spring' }}
    />
  );
});

// Use CSS variables for dynamic values
function PerformantHover() {
  const [hoverX, setHoverX] = useState(0);
  
  return (
    <div
      className="hover-container"
      style={{ '--hover-x': hoverX }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setHoverX((e.clientX - rect.left) / rect.width);
      }}
    >
      {/* CSS handles the animation */}
      <div className="hover-effect" />
    </div>
  );
}

// 8. Animation Orchestration
const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

function App() {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageTransition}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={animationTokens.easing.spring}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

// 9. Testing Animations
import { render, waitFor } from '@testing-library/react';

test('animation completes', async () => {
  const onComplete = jest.fn();
  
  render(
    <motion.div
      animate={{ x: 100 }}
      transition={{ duration: 0.1 }}
      onAnimationComplete={onComplete}
    />
  );
  
  await waitFor(() => expect(onComplete).toHaveBeenCalled(), {
    timeout: 200
  });
});

// 10. Animation Debug Tools
if (process.env.NODE_ENV === 'development') {
  // Slow down all animations
  window.__SLOW_ANIMATIONS__ = true;
  
  // Visual animation debugger
  import('framer-motion').then(({ visualElement }) => {
    visualElement.animationState.setProps({
      transition: { duration: 2 }
    });
  });
}`}
			/>

			<ChapterSummary
				lessonInsight={{
					title: `The Fluid Kingdom Insight:`,
					content: `Animation mastery isn't about using every technique - it's about choosing the right technique for each situation. Performance, accessibility, and purpose should guide every animation decision. The best animations feel inevitable, not arbitrary - they guide users, provide feedback, and create delight without overwhelming.`
				}}
				reflectionQuestions={[
					`How do you balance delight with usability?`,
					`What role does performance play in animation decisions?`
				]}
				journalEntry={{
					title: `Aria's Journal - Day 40 (Evening)`,
					content: `Achieved Animation Mastery in the Fluid Kingdom! Built real-world projects: page transitions with route-based animations, interactive dashboards with staggered children and shared layout transitions, gesture-rich mobile interfaces with pull-to-refresh, marketing sites with scroll animations and parallax, e-commerce cart animations with AnimatePresence. Monastery Stage: ${monasteryStage}! Learned performance optimization: React.memo for animated components, CSS variables for hover effects, testing animations with Jest/RTL. Fluid Kingdom Wisdom: "Every motion should enhance user experience. The best animations are the ones users don't consciously notice - they just make the experience feel right."`
				}}
				chapterEnding={[
					`Abbess Motia observed Aria's final project - a fully animated dashboard with smooth transitions, meaningful gestures, and perfect performance. "You understand now. Animation is a language."`,
					`Aria reflected on her journey through the ecosystem. "State management for complex data, styling for beautiful UIs, forms for user input, animation for engagement. They're all pieces of a larger whole."`,
					`Binary compiled the final analysis. "Each library in the ecosystem serves React's greater purpose - building exceptional user experiences."`,
					`Master Aurelius appeared at the monastery entrance. "Well done, Ambassador. You've explored our allied kingdoms and brought back wisdom. The React Kingdom is stronger for your journey. The Cloud Citadel awaits - it's time to bridge the gap between client and server!"`
				]}
			/>
		</div>
	);
};

export default ChapterThree;