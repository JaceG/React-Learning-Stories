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

// 1. Design Tokens for Consistent Motion
const animationTokens = {
  duration: { instant: 0, fast: 200, normal: 300, slow: 500 },
  easing: { spring: { type: 'spring', damping: 25, stiffness: 300 } },
  scale: { pressed: 0.95, hover: 1.05 }
};

// 2. Accessible Animation Wrapper
const shouldReduceMotion = useReducedMotion();
if (shouldReduceMotion) return <motion.div transition={{ duration: 0 }}>{children}</motion.div>;

// 3. Dashboard with Stagger
<motion.div variants={{ show: { transition: { staggerChildren: 0.1 } } }} animate="show">

// 4. Pull-to-Refresh Gesture
const bind = useDrag(({ movement: [, my] }) => api.start({ y: Math.max(0, my) }));

// 5. Parallax Scroll
const { scrollYProgress } = useScroll();
const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

// 6. E-commerce: layoutId for shared element transitions
<motion.img layoutId={\`product-\${id}\`} />

// 7. Performance: React.memo + CSS variables for dynamic values

// 8. Page Transitions with AnimatePresence
<AnimatePresence mode="wait"><motion.div key={path} exit={{ opacity: 0 }} /></AnimatePresence>

// 9. Testing: await waitFor(() => expect(onComplete).toHaveBeenCalled())`}
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