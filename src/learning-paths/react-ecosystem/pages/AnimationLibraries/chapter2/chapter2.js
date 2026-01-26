import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';

const ChapterTwo = () => {
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

	const [activeDojo, setActiveDojo] = useState('framer-motion');
	const [demoAnimation, setDemoAnimation] = useState('fade');
	const [showPerformance, setShowPerformance] = useState(false);
	const [gesturePatterns, setGesturePatterns] = useState([]);
	const [performanceMetrics, setPerformanceMetrics] = useState({});

	// Animation dojos (libraries)
	const animationDojos = [
		{
			id: 'framer-motion',
			name: 'Framer Motion Dojo',
			icon: '🎭',
			sensei: 'Sensei Framer',
			philosophy: 'Declarative animations that feel magical',
			strengths: ['Gesture support', 'Layout animations', 'SVG morphing'],
			signature: 'AnimatePresence for exit animations',
			color: '#FF0080'
		},
		{
			id: 'react-spring',
			name: 'React Spring School',
			icon: '🌊',
			sensei: 'Professor Spring',
			philosophy: 'Physics-based animations for natural movement',
			strengths: ['Spring physics', 'Gesture integration', 'Performance'],
			signature: 'useSpring hook for fluid motion',
			color: '#7B61FF'
		},
		{
			id: 'lottie',
			name: 'Lottie Laboratory',
			icon: '🎨',
			sensei: 'Doctor Lottie',
			philosophy: 'Complex animations from design tools',
			strengths: ['After Effects import', 'Complex animations', 'Designer-friendly'],
			signature: 'JSON-based animation data',
			color: '#00D9FF'
		},
		{
			id: 'react-transition-group',
			name: 'Transition Temple',
			icon: '⛩️',
			sensei: 'Monk Transition',
			philosophy: 'Simple transitions between states',
			strengths: ['Lightweight', 'CSS transitions', 'Component lifecycle'],
			signature: 'CSSTransition component',
			color: '#61DAFB'
		}
	];

	// Animation patterns
	const animationPatterns = {
		fade: { name: 'Fade In/Out', complexity: 'Basic' },
		slide: { name: 'Slide Motion', complexity: 'Basic' },
		scale: { name: 'Scale Transform', complexity: 'Basic' },
		rotate: { name: 'Rotation', complexity: 'Intermediate' },
		morph: { name: 'Shape Morphing', complexity: 'Advanced' },
		stagger: { name: 'Staggered Children', complexity: 'Intermediate' },
		gesture: { name: 'Gesture-Driven', complexity: 'Advanced' },
		physics: { name: 'Physics-Based', complexity: 'Advanced' }
	};

	// Gesture patterns
	const gestureTypes = [
		{ id: 'drag', name: 'Drag', icon: '👆' },
		{ id: 'swipe', name: 'Swipe', icon: '👉' },
		{ id: 'pinch', name: 'Pinch', icon: '🤏' },
		{ id: 'rotate', name: 'Rotate', icon: '🔄' },
		{ id: 'hover', name: 'Hover', icon: '🫰' },
		{ id: 'tap', name: 'Tap', icon: '👇' }
	];

	// Visit a dojo
	const visitDojo = (dojo) => {
		setActiveDojo(dojo.id);
		focusDojo(dojo.id);
		
		// Generate performance metrics
		const newMetrics = {
			bundleSize: Math.floor(Math.random() * 50) + 20,
			performance: Math.floor(Math.random() * 30) + 70
		};
		
		setPerformanceMetrics(prev => ({
			...prev,
			[dojo.id]: newMetrics
		}));
		
		if (masteredAnimations.length >= 3) {
			evolve('master');
		}
	};

	// Master an animation pattern
	const practiceAnimation = (pattern) => {
		masterAnimation(activeDojo, pattern);
		setDemoAnimation(pattern);
	};

	// Learn a gesture
	const learnGesture = (gesture) => {
		if (!gesturePatterns.find(g => g.id === gesture.id)) {
			setGesturePatterns([...gesturePatterns, gesture]);
		}
		if (gesturePatterns.length >= 3) {
			evolve('fluid');
		}
	};

	return (
		<div className='chapter'>
			<ChapterIntro
				chapterNumber={2}
				title={`The Animation Dojos`}
				bridge={`"You've learned the philosophy of motion," Master Kinetic said. "Now it's time for practice." The monastery's three dojos awaited: CSS Transitions for foundation, React Spring for physics-based animation, and Framer Motion for declarative power. Each dojo taught different techniques for different needs.`}
			/>

			<div className='story-section'>
				<p className='story-paragraph'>
					<strong>Abbess Motia</strong> led Aria through the monastery's many 
					dojos. "Each school has mastered different aspects of motion. Learn 
					their techniques, understand their philosophies."
				</p>

				<p className='story-paragraph'>
					In the <strong>Framer Motion Dojo</strong>, elements danced with 
					declarative ease. <strong>Sensei Framer</strong> demonstrated: 
					"Watch how naturally components animate in and out!"
				</p>

				<p className='story-paragraph'>
					The <strong>React Spring School</strong> felt different - everything 
					moved with physics. <strong>Professor Spring</strong> explained: 
					"No duration, just tension and friction. Natural motion!"
				</p>

				<p className='story-paragraph'>
					<strong>Binary</strong> analyzed each approach. "Different algorithms, 
					different optimizations. Fascinating variations!"
				</p>

				<p className='story-paragraph'>
					<strong>Debuggora</strong> tested performance. "Each library makes 
					different trade-offs. Bundle size versus features, ease versus control."
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>Interactive Exercise: Animation Dojo Training</h3>
				
				<InstructionBox character={`Master Kinetic opens the training dojos.`}>
					Train in each dojo: CSS Transitions, React Spring, and Framer Motion. 
					Master each animation library's unique approach and philosophy!
				</InstructionBox>
				
				<div className='animation-dojos'>
					{animationDojos.map(dojo => (
						<div
							key={dojo.id}
							className={`dojo-card ${
								activeDojo === dojo.id ? 'selected' : ''
							} ${currentDojo === dojo.id ? 'focused' : ''}`}
							onClick={() => visitDojo(dojo)}
							style={{ '--dojo-color': dojo.color }}>
							<span className='dojo-icon'>{dojo.icon}</span>
							<div className='dojo-name'>{dojo.name}</div>
							<div className='dojo-philosophy'>"{dojo.philosophy}"</div>
							{activeDojo === dojo.id && (
								<div style={{ marginTop: '15px' }}>
									<strong style={{ color: dojo.color }}>Master:</strong> {dojo.sensei}
									<div style={{ marginTop: '10px' }}>
										<strong>Strengths:</strong>
										<ul style={{ marginTop: '5px', paddingLeft: '20px' }}>
											{dojo.strengths.map((strength, i) => (
												<li key={i}>{strength}</li>
											))}
										</ul>
									</div>
									<div style={{ 
										marginTop: '10px',
										fontStyle: 'italic',
										color: '#bdc3c7'
									}}>
										Signature: {dojo.signature}
									</div>
								</div>
							)}
						</div>
					))}
				</div>

				<div className='animation-showcase'>
					<h4>Practice Animation Patterns</h4>
					<div style={{ marginBottom: '20px' }}>
						<label style={{ marginRight: '10px' }}>Pattern:</label>
						<select
							value={demoAnimation}
							onChange={(e) => practiceAnimation(e.target.value)}
							style={{
								padding: '8px',
								background: 'rgba(255, 255, 255, 0.1)',
								border: '1px solid #f093fb',
								borderRadius: '5px',
								color: '#ecf0f1'
							}}>
							{Object.entries(animationPatterns).map(([key, pattern]) => (
								<option key={key} value={key}>
									{pattern.name} ({pattern.complexity})
								</option>
							))}
						</select>
					</div>

					<div className='demo-stage'>
						<div 
							className='demo-element'
							style={{
								animation: demoAnimation === 'fade' ? 'fadeDemo 2s infinite' : 
										  demoAnimation === 'slide' ? 'slideDemo 2s infinite' :
										  demoAnimation === 'scale' ? 'scaleDemo 2s infinite' :
										  demoAnimation === 'rotate' ? 'rotateDemo 2s infinite' : 'none'
							}}>
							{activeDojo.toUpperCase()}
						</div>
					</div>

					<style>{`
						@keyframes fadeDemo {
							0%, 100% { opacity: 0; }
							50% { opacity: 1; }
						}
						@keyframes slideDemo {
							0%, 100% { transform: translateX(-50px); }
							50% { transform: translateX(50px); }
						}
						@keyframes scaleDemo {
							0%, 100% { transform: scale(0.5); }
							50% { transform: scale(1.2); }
						}
						@keyframes rotateDemo {
							from { transform: rotate(0deg); }
							to { transform: rotate(360deg); }
						}
					`}</style>
				</div>

				<div className='gesture-learning' style={{ marginTop: '40px' }}>
					<h4>Gesture Mastery</h4>
					<div className='gesture-grid'>
						{gestureTypes.map(gesture => (
							<div
								key={gesture.id}
								className={`gesture-item ${
									gesturePatterns.find(g => g.id === gesture.id) ? 'learned' : ''
								}`}
								onClick={() => learnGesture(gesture)}>
								<div className='gesture-icon'>{gesture.icon}</div>
								<div className='gesture-name'>{gesture.name}</div>
							</div>
						))}
					</div>
				</div>

				<div className='mastered-animations' style={{ marginTop: '40px' }}>
					<h4>Mastered Techniques</h4>
					<div className='animation-patterns'>
						{masteredAnimations.map((mastery, index) => (
							<div key={mastery.id} className='pattern-card mastered'>
								<div className='pattern-title'>
									{mastery.library}
								</div>
								<div className='pattern-description'>
									Pattern: {animationPatterns[mastery.pattern]?.name || mastery.pattern}
								</div>
							</div>
						))}
						{masteredAnimations.length === 0 && (
							<p style={{ color: '#7f8c8d' }}>
								Practice animations in different dojos to master them
							</p>
						)}
					</div>
				</div>

				<div className='performance-visualization'>
					<h4>Dojo Performance Comparison</h4>
					<button
						onClick={() => setShowPerformance(!showPerformance)}
						style={{
							padding: '10px 20px',
							background: '#f093fb',
							color: '#2c3e50',
							border: 'none',
							borderRadius: '5px',
							cursor: 'pointer',
							marginBottom: '20px'
						}}>
						{showPerformance ? 'Hide' : 'Show'} Performance Metrics
					</button>

					{showPerformance && (
						<div className='perf-chart'>
							<div className='perf-bars'>
								{Object.entries(performanceMetrics).map(([library, metrics]) => (
									<div key={library} style={{ textAlign: 'center' }}>
										<div 
											className='perf-bar'
											style={{ height: `${metrics.performance || 0}%` }}>
											<div className='perf-value'>
												{metrics.performance || 0}%
											</div>
										</div>
										<div className='perf-label'>
											{library}<br />
											<span style={{ fontSize: '0.8em' }}>
												{metrics.bundleSize || 0}kb
											</span>
										</div>
									</div>
								))}
							</div>
						</div>
					)}
				</div>
			</div>

			<CodeExample
				title={`Animation Library Implementations`}
				discoveredBy={`Dojo Masters' Wisdom`}
				code={`// Animation Library Deep Dive

// 1. Framer Motion - Declarative & Exit Animations
<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
  whileHover={{ scale: 1.1 }} drag dragConstraints={{ left: -100, right: 100 }} />
<AnimatePresence>{show && <motion.div exit={{ y: 50 }} />}</AnimatePresence>

// 2. React Spring - Physics-Based
const styles = useSpring({ from: { opacity: 0 }, to: { opacity: 1 }, config: config.wobbly });
<animated.div style={styles}>Spring physics!</animated.div>

// Gesture integration
const bind = useGesture({ onDrag: ({ offset: [x, y] }) => api.start({ x, y }) });
<animated.div {...bind()} style={{ x, y }} />

// 3. Lottie - Designer Animations (After Effects → React)
<Lottie options={{ animationData, loop: true }} height={400} width={400} />

// 4. React Transition Group - CSS-based
<TransitionGroup>
  <CSSTransition key={item} timeout={500} classNames="item">{children}</CSSTransition>
</TransitionGroup>

// 5. Advanced: Staggered Lists & Scroll Animations
const container = { visible: { transition: { staggerChildren: 0.2 } } };
const isInView = useInView(ref, { once: true });`}
			/>

			<ChapterSummary
				lessonInsight={{
					title: `The Dojo Insight:`,
					content: `Each animation library represents a different philosophy. Framer Motion emphasizes developer experience with its declarative API. React Spring focuses on physics for natural motion. Lottie enables designer-developer collaboration. React Transition Group keeps things simple. The key is matching the library to your needs.`
				}}
				reflectionQuestions={[
					`How do different animation APIs affect development?`,
					`When is physics-based animation worth the complexity?`
				]}
				journalEntry={{
					title: `Aria's Journal - Day 40 (Afternoon)`,
					content: `Trained in all the Animation Dojos! Framer Motion: declarative API, variants for orchestration, AnimatePresence for exit animations, layout animations, and drag gestures. React Spring: physics-based (mass, tension, friction), wobbly/stiff/molasses configs, gesture integration with @use-gesture/react. Lottie: complex designer animations from After Effects! React Transition Group: simple CSS-based transitions. ${masteredAnimations.length} animations mastered! Dojo Masters' Wisdom: "Framer Motion for DX, Spring for natural physics, Lottie for complex visuals, Transition Group for simplicity."`
				}}
			/>
		</div>
	);
};

export default ChapterTwo;