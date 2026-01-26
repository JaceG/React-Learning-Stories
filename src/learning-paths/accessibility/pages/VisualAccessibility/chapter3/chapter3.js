import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';

const ChapterThree = () => {
	const [motionPreference, setMotionPreference] = useState('auto');
	const [animationSpeed, setAnimationSpeed] = useState(1);
	const [pauseAnimations, setPauseAnimations] = useState(false);
	const [autoplayEnabled, setAutoplayEnabled] = useState(false);
	const [animationDemos, setAnimationDemos] = useState({
		bounce: true,
		spin: true,
		pulse: true,
		slide: true
	});
	const [vestibularTest, setVestibularTest] = useState({
		parallax: false,
		zoom: false,
		shake: false
	});
	
	const { 
		motionSettings,
		setMotionSettings,
		prefersReducedMotion,
		setPrefersReducedMotion,
		animationControls,
		setAnimationControls
	} = useOutletContext();

	// Detect system motion preference
	useEffect(() => {
		const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
		setPrefersReducedMotion(mediaQuery.matches);
		
		const handleChange = (e) => {
			setPrefersReducedMotion(e.matches);
		};
		
		mediaQuery.addEventListener('change', handleChange);
		return () => mediaQuery.removeEventListener('change', handleChange);
	}, [setPrefersReducedMotion]);

	const motionExamples = [
		{
			name: 'Bounce',
			description: 'Bouncing animation',
			className: 'bounce',
			vestibular: 'Low risk'
		},
		{
			name: 'Spin',
			description: 'Spinning animation',
			className: 'spin',
			vestibular: 'Medium risk'
		},
		{
			name: 'Pulse',
			description: 'Pulsing animation',
			className: 'pulse',
			vestibular: 'Low risk'
		},
		{
			name: 'Slide',
			description: 'Sliding animation',
			className: 'slide',
			vestibular: 'Low risk'
		}
	];

	const vestibularTriggers = [
		{
			name: 'Parallax Scrolling',
			risk: 'High',
			description: 'Background moves at different speed than foreground',
			alternative: 'Static backgrounds or synchronized movement'
		},
		{
			name: 'Zooming/Scaling',
			risk: 'High',
			description: 'Rapid scaling or perspective changes',
			alternative: 'Fade transitions or stepped scaling'
		},
		{
			name: 'Screen Shake',
			risk: 'Very High',
			description: 'Whole screen movement or vibration',
			alternative: 'Localized emphasis effects'
		},
		{
			name: 'Auto-advancing Carousels',
			risk: 'Medium',
			description: 'Content that moves without user control',
			alternative: 'Manual controls with pause button'
		}
	];

	const animationBestPractices = [
		{
			category: 'Duration',
			good: '200-500ms for micro-interactions',
			bad: 'Animations longer than 1 second',
			reason: 'Shorter animations reduce discomfort'
		},
		{
			category: 'Easing',
			good: 'ease-out or linear',
			bad: 'bounce or elastic easing',
			reason: 'Natural easing prevents jarring movements'
		},
		{
			category: 'Distance',
			good: 'Small, localized movements',
			bad: 'Large viewport-spanning animations',
			reason: 'Minimal movement reduces vestibular triggers'
		}
	];

	const handleMotionPreferenceChange = (preference) => {
		setMotionPreference(preference);
		setMotionSettings({
			...motionSettings,
			preference: preference
		});
	};

	const toggleAnimation = (animationType) => {
		setAnimationDemos(prev => ({
			...prev,
			[animationType]: !prev[animationType]
		}));
	};

	return (
		<div className='chapter visual-accessibility'>
			<ChapterIntro
				chapterNumber={3}
				title={`The Motion Manor`}
				bridge={`"One final realm awaits," Guardian Spectrum said, leading Aria toward a building that seemed to float and shift. "Color and contrast are but two pillars of visual accessibility. The third is motion." A new guardian emerged from the swirling walls - Guardian Equilibrium, who walked with perfect balance despite the world moving around them.`}
			/>

			<div className='story-section'>
				<p className='story-paragraph'>
					The Motion Manor floated mysteriously, its walls shifting and dancing. 
					<strong>Guardian Equilibrium</strong> steadied them. "Motion can disorient. 
					Some users experience vestibular disorders. Respect their needs."
				</p>
				
				<p className='story-paragraph'>
					Aria's animations were elaborate. "But movement makes interfaces feel alive!"
				</p>

				<p className='story-paragraph'>
					"Life shouldn't cause suffering. Provide controls. Honor prefers-reduced-motion."
				</p>

				<p className='story-paragraph'>
					Binary calculated probabilities. "1 in 3 people over 40 experience dizziness 
					from parallax scrolling. Significant user impact detected!"
				</p>

				<p className='story-paragraph'>
					Debuggora observed the patterns. "I see - animation enhances when wanted, 
					but never when harmful. User control is paramount."
				</p>

				<p className='story-paragraph'>
					Guardian Equilibrium demonstrated. "Motion is powerful. Use it thoughtfully. 
					Always provide alternatives and controls. Let users choose their experience."
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>Motion Control Center</h3>

				<InstructionBox character={`Guardian Equilibrium steadies the room.`}>
					{`"Control is everything. Test different motion preferences and see how your animations affect users. Remember - 1 in 3 people over 40 experience dizziness from parallax scrolling."`}
				</InstructionBox>
				
				<div className='motion-manor'>
					<div className='motion-controls'>
						<button
							onClick={() => handleMotionPreferenceChange('auto')}
							className={`motion-control-button ${motionPreference === 'auto' ? 'active' : ''}`}
						>
							Auto (System)
						</button>
						<button
							onClick={() => handleMotionPreferenceChange('reduced')}
							className={`motion-control-button ${motionPreference === 'reduced' ? 'active' : ''}`}
						>
							Reduced Motion
						</button>
						<button
							onClick={() => handleMotionPreferenceChange('full')}
							className={`motion-control-button ${motionPreference === 'full' ? 'active' : ''}`}
						>
							Full Motion
						</button>
					</div>

					<div style={{
						marginTop: '20px',
						padding: '15px',
						background: 'rgba(255, 215, 0, 0.1)',
						borderRadius: '10px',
						border: '1px solid rgba(255, 215, 0, 0.3)'
					}}>
						<p style={{ margin: 0 }}>
							<strong>System Preference:</strong> {prefersReducedMotion ? 'Reduced Motion' : 'Full Motion'}
						</p>
						<p style={{ margin: '10px 0 0 0', fontSize: '0.9em', color: '#bdc3c7' }}>
							{prefersReducedMotion ? 
								'Your system prefers reduced motion. Animations are minimized.' :
								'Your system allows full motion. All animations are enabled.'
							}
						</p>
					</div>

					<h4 style={{ marginTop: '40px', marginBottom: '20px' }}>Animation Examples</h4>
					
					<div className='motion-examples'>
						{motionExamples.map((example) => (
							<div key={example.name} className='motion-example-card'>
								<h5>{example.name}</h5>
								<div 
									className={`motion-element ${animationDemos[example.className.toLowerCase()] && motionPreference !== 'reduced' ? example.className : ''}`}
									style={{
										animationDuration: `${animationSpeed}s`,
										animationPlayState: pauseAnimations ? 'paused' : 'running'
									}}
								/>
								<p style={{ fontSize: '0.9em', margin: '10px 0' }}>
									{example.description}
								</p>
								<p style={{ fontSize: '0.85em', color: '#bdc3c7' }}>
									Vestibular Risk: {example.vestibular}
								</p>
								<button
									onClick={() => toggleAnimation(example.className.toLowerCase())}
									style={{
										marginTop: '10px',
										padding: '5px 15px',
										background: animationDemos[example.className.toLowerCase()] ? '#DC143C' : '#32CD32',
										border: 'none',
										borderRadius: '15px',
										color: 'white',
										cursor: 'pointer',
										fontSize: '0.85em'
									}}
								>
									{animationDemos[example.className.toLowerCase()] ? 'Stop' : 'Start'}
								</button>
							</div>
						))}
					</div>

					<div style={{
						marginTop: '30px',
						display: 'flex',
						gap: '20px',
						alignItems: 'center',
						flexWrap: 'wrap'
					}}>
						<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
							<label>Animation Speed:</label>
							<input
								type="range"
								min="0.5"
								max="3"
								step="0.5"
								value={animationSpeed}
								onChange={(e) => setAnimationSpeed(parseFloat(e.target.value))}
								style={{ width: '150px' }}
							/>
							<span>{animationSpeed}x</span>
						</div>
						
						<button
							onClick={() => setPauseAnimations(!pauseAnimations)}
							style={{
								padding: '8px 20px',
								background: pauseAnimations ? '#32CD32' : '#DC143C',
								border: 'none',
								borderRadius: '20px',
								color: 'white',
								cursor: 'pointer'
							}}
						>
							{pauseAnimations ? '▶ Resume All' : '⏸ Pause All'}
						</button>
					</div>
				</div>

				<h3 className='section-title' style={{ marginTop: '40px' }}>Vestibular Trigger Awareness</h3>
				
				<div style={{
					background: 'rgba(0, 0, 0, 0.3)',
					borderRadius: '15px',
					padding: '25px'
				}}>
					<p style={{ marginBottom: '20px' }}>
						Some animations can trigger vestibular disorders, causing dizziness, nausea, or headaches:
					</p>
					
					<div style={{ display: 'grid', gap: '15px' }}>
						{vestibularTriggers.map((trigger) => (
							<div
								key={trigger.name}
								style={{
									padding: '20px',
									background: 'rgba(0, 0, 0, 0.3)',
									borderRadius: '10px',
									border: `2px solid ${
										trigger.risk === 'Very High' ? '#DC143C' :
										trigger.risk === 'High' ? '#FF6347' :
										'#FFA500'
									}`
								}}
							>
								<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
									<h4 style={{ margin: 0 }}>{trigger.name}</h4>
									<span style={{
										padding: '5px 15px',
										background: trigger.risk === 'Very High' ? '#DC143C' :
											trigger.risk === 'High' ? '#FF6347' : '#FFA500',
										borderRadius: '15px',
										fontSize: '0.85em',
										fontWeight: 'bold'
									}}>
										{trigger.risk} Risk
									</span>
								</div>
								<p style={{ margin: '10px 0', fontSize: '0.9em' }}>
									{trigger.description}
								</p>
								<p style={{ margin: 0, fontSize: '0.85em', color: '#32CD32' }}>
									<strong>Alternative:</strong> {trigger.alternative}
								</p>
							</div>
						))}
					</div>
				</div>

				<h3 className='section-title' style={{ marginTop: '40px' }}>Animation Best Practices</h3>
				
				<div style={{
					background: 'rgba(0, 0, 0, 0.3)',
					borderRadius: '15px',
					padding: '25px'
				}}>
					<div style={{ display: 'grid', gap: '20px' }}>
						{animationBestPractices.map((practice) => (
							<div key={practice.category}>
								<h4 style={{ marginBottom: '15px', color: '#FFD700' }}>
									{practice.category}
								</h4>
								<div style={{ display: 'grid', gap: '10px' }}>
									<div style={{
										padding: '15px',
										background: 'rgba(50, 205, 50, 0.1)',
										border: '1px solid #32CD32',
										borderRadius: '8px'
									}}>
										<strong>✓ Good:</strong> {practice.good}
									</div>
									<div style={{
										padding: '15px',
										background: 'rgba(220, 20, 60, 0.1)',
										border: '1px solid #DC143C',
										borderRadius: '8px'
									}}>
										<strong>✗ Bad:</strong> {practice.bad}
									</div>
									<p style={{ margin: '10px 0 0 0', fontSize: '0.9em', color: '#bdc3c7' }}>
										{practice.reason}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>

				<h3 className='section-title' style={{ marginTop: '40px' }}>Autoplay Controls</h3>
				
				<div style={{
					background: 'rgba(0, 0, 0, 0.3)',
					borderRadius: '15px',
					padding: '25px'
				}}>
					<div style={{
						display: 'flex',
						alignItems: 'center',
						gap: '20px',
						marginBottom: '20px'
					}}>
						<button
							onClick={() => setAutoplayEnabled(!autoplayEnabled)}
							style={{
								padding: '10px 25px',
								background: autoplayEnabled ? '#DC143C' : '#32CD32',
								border: 'none',
								borderRadius: '25px',
								color: 'white',
								cursor: 'pointer',
								fontWeight: 'bold'
							}}
						>
							Autoplay: {autoplayEnabled ? 'ON' : 'OFF'}
						</button>
						<span style={{ color: '#bdc3c7' }}>
							{autoplayEnabled ? 
								'Content will automatically advance' : 
								'User must manually control content'
							}
						</span>
					</div>
					
					<div style={{
						padding: '20px',
						background: 'rgba(123, 104, 238, 0.1)',
						borderRadius: '10px',
						border: '1px solid rgba(123, 104, 238, 0.3)'
					}}>
						<h5 style={{ marginTop: 0 }}>WCAG Guidelines for Auto-playing Content:</h5>
						<ul style={{ margin: '10px 0 0 0', paddingLeft: '20px' }}>
							<li>Provide pause/stop controls for any auto-playing content</li>
							<li>Auto-playing content should not last more than 5 seconds</li>
							<li>Users should be able to disable auto-play globally</li>
							<li>Essential animations should not auto-play</li>
						</ul>
					</div>
				</div>
			</div>

			<CodeExample
				title={`Motion Accessibility Implementation`}
				discoveredBy={`Guardian Equilibrium's balance`}
				code={`# Motion and Animation Accessibility
// Guardian Equilibrium: "Movement with purpose, stillness with grace!"

# Respecting Motion Preferences

## CSS Media Query
// Always check user preferences first
@media (prefers-reduced-motion: reduce) {
  /* Remove all non-essential animations */
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  /* Keep essential transitions short */
  .essential-transition {
    transition-duration: 0.2s !important;
  }
}

## JavaScript Detection
// Binary: "System preferences = User comfort!"

function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (event) => {
      setPrefersReducedMotion(event.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  return prefersReducedMotion;
}

# Safe Animation Patterns

## Conditional Animation Component
// Aria: "Give users control over their experience!"

function AnimatedComponent({ children, animation, duration = 300 }) {
  const prefersReducedMotion = useReducedMotion();
  const [animationEnabled, setAnimationEnabled] = useState(true);
  
  const animationStyle = {
    animation: animationEnabled && !prefersReducedMotion 
      ? \`\${animation} \${duration}ms ease-out\`
      : 'none',
    transition: prefersReducedMotion 
      ? 'opacity 0.2s ease-out' 
      : \`all \${duration}ms ease-out\`
  };
  
  return (
    <div style={animationStyle}>
      {children}
      <button 
        onClick={() => setAnimationEnabled(!animationEnabled)}
        aria-label={animationEnabled ? 'Disable animation' : 'Enable animation'}
      >
        {animationEnabled ? '⏸' : '▶'}
      </button>
    </div>
  );
}

## Vestibular-Safe Animations
// Debuggora: "Small movements, big impact!"

/* Good - Subtle, localized animations */
.safe-animation {
  /* Opacity changes are generally safe */
  animation: fadeIn 0.3s ease-out;
  
  /* Small transforms */
  transform: translateY(0);
  transition: transform 0.2s ease-out;
}

.safe-animation:hover {
  transform: translateY(-2px);
}

/* Bad - Vestibular triggers */
.unsafe-animation {
  /* Avoid large movements */
  animation: spin 2s linear infinite; ❌
  
  /* Avoid parallax effects */
  transform: translate3d(0, 0, 0); ❌
  
  /* Avoid bouncing/elastic easing */
  animation-timing-function: cubic-bezier(.68,-0.55,.27,1.55); ❌
}

# Animation Controls

## Play/Pause Controls
function VideoPlayer({ src, autoplay = false }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  
  useEffect(() => {
    // Never autoplay if user prefers reduced motion
    if (autoplay && !prefersReducedMotion) {
      videoRef.current?.play();
      setIsPlaying(true);
    }
  }, [autoplay, prefersReducedMotion]);
  
  return (
    <div className="video-container">
      <video 
        ref={videoRef}
        src={src}
        loop={!prefersReducedMotion}
      />
      
      {/* Always visible controls */}
      <div className="video-controls" aria-live="polite">
        <button
          onClick={() => {
            if (isPlaying) {
              videoRef.current?.pause();
            } else {
              videoRef.current?.play();
            }
            setIsPlaying(!isPlaying);
          }}
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
        
        <button
          onClick={() => {
            videoRef.current.currentTime = 0;
            videoRef.current?.pause();
            setIsPlaying(false);
          }}
          aria-label="Stop video"
        >
          ⏹
        </button>
      </div>
    </div>
  );
}

# Carousel/Slideshow Accessibility

## Accessible Carousel
function AccessibleCarousel({ slides, autoAdvance = false }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const intervalRef = useRef(null);
  
  useEffect(() => {
    // No auto-advance if reduced motion preferred
    if (autoAdvance && !prefersReducedMotion && !isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % slides.length);
      }, 5000); // 5 seconds max per WCAG
    }
    
    return () => clearInterval(intervalRef.current);
  }, [autoAdvance, prefersReducedMotion, isPaused, slides.length]);
  
  return (
    <div 
      className="carousel"
      role="region"
      aria-label="Image carousel"
      aria-live={isPaused ? 'polite' : 'off'}
    >
      {/* Pause button always visible */}
      <button
        className="carousel-pause"
        onClick={() => setIsPaused(!isPaused)}
        aria-label={isPaused ? 'Resume carousel' : 'Pause carousel'}
      >
        {isPaused ? '▶' : '⏸'}
      </button>
      
      {/* Slide indicators */}
      <div className="carousel-indicators" role="tablist">
        {slides.map((_, index) => (
          <button
            key={index}
            role="tab"
            aria-selected={currentSlide === index}
            aria-label={\`Slide \${index + 1} of \${slides.length}\`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
      
      {/* Slides with smooth transitions */}
      <div 
        className="carousel-slides"
        style={{
          transform: \`translateX(-\${currentSlide * 100}%)\`,
          transition: prefersReducedMotion 
            ? 'none' 
            : 'transform 0.3s ease-out'
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            role="tabpanel"
            aria-hidden={currentSlide !== index}
          >
            {slide}
          </div>
        ))}
      </div>
    </div>
  );
}

# Loading and Progress Animations

## Accessible Loading Spinner
// Keep it simple and non-disorienting
function LoadingSpinner({ size = 40 }) {
  const prefersReducedMotion = useReducedMotion();
  
  if (prefersReducedMotion) {
    // Static loading indicator
    return (
      <div 
        className="loading-static"
        role="status"
        aria-label="Loading"
      >
        <span aria-hidden="true">⏳</span>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
  
  return (
    <div 
      className="loading-spinner"
      role="status"
      aria-label="Loading"
      style={{
        width: size,
        height: size,
        animation: 'spin 1s linear infinite'
      }}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

# Page Transitions

## Respectful Page Transitions
function PageTransition({ children, location }) {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <CSSTransition
      key={location.pathname}
      timeout={prefersReducedMotion ? 0 : 300}
      classNames={prefersReducedMotion ? 'fade' : 'slide'}
    >
      <div className="page">
        {children}
      </div>
    </CSSTransition>
  );
}

/* CSS for transitions */
.fade-enter { opacity: 0; }
.fade-enter-active { 
  opacity: 1;
  transition: opacity 0.2s ease-out;
}

.slide-enter {
  opacity: 0;
  transform: translateX(20px);
}
.slide-enter-active {
  opacity: 1;
  transform: translateX(0);
  transition: all 0.3s ease-out;
}

# Testing Motion Accessibility

## Manual Testing Checklist
1. Enable reduced motion in OS settings
2. Verify all animations stop or reduce
3. Check that content is still understandable
4. Test pause/play controls with keyboard
5. Verify no auto-playing content over 5 seconds

## Automated Testing
// Test for motion preferences
test('respects prefers-reduced-motion', () => {
  // Mock the media query
  window.matchMedia = jest.fn().mockImplementation(query => ({
    matches: query === '(prefers-reduced-motion: reduce)',
    media: query,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  }));
  
  const { container } = render(<AnimatedComponent />);
  const element = container.firstChild;
  
  // Should have reduced animation
  expect(element).toHaveStyle('animation: none');
});

# Real-World Examples

## Notification Toast
function Toast({ message, duration = 3000 }) {
  const [isVisible, setIsVisible] = useState(true);
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <div
      className={\`toast \${isVisible ? 'visible' : ''}\`}
      role="alert"
      aria-live="polite"
      style={{
        transition: prefersReducedMotion 
          ? 'opacity 0.2s' 
          : 'all 0.3s ease-out'
      }}
    >
      {message}
      <button
        onClick={() => setIsVisible(false)}
        aria-label="Dismiss notification"
      >
        ×
      </button>
    </div>
  );
}`}
			/>

			<ChapterSummary
				lessonInsight={{
					title: `The Motion Lesson:`,
					content: `Guardian Equilibrium teaches us that motion should enhance, not harm. With vestibular disorders affecting millions, respecting motion preferences isn't optional—it's essential. By implementing proper controls, respecting system preferences, and avoiding known triggers like parallax scrolling and screen shake, we create interfaces that delight without causing discomfort. Remember: the best animations are those users can control, and the most accessible interfaces work beautifully both with and without motion.`
				}}
				reflectionQuestions={[
					`How does providing motion controls change the relationship between your interface and users with vestibular sensitivities?`,
					`Why is "prefers-reduced-motion" more than just turning off animations, and how can we create equally engaging experiences without relying on movement?`
				]}
				journalEntry={{
					title: `Aria's Journal - Day 42 (Evening)`,
					content: `The Motion Manor was disorienting at first - walls shifting, floors rippling. Guardian Equilibrium taught me that motion can harm as well as delight. One in three people over 40 experience dizziness from parallax scrolling! I learned to respect prefers-reduced-motion, provide play/pause controls, and avoid vestibular triggers like screen shake and rapid zooming. Animation duration matters too: 200-500ms for micro-interactions. The Guardian's wisdom: "Life shouldn't cause suffering. Provide controls. Honor preferences." The best interfaces work beautifully both with and without motion.`
				}}
				chapterEnding={[
					`As the Motion Manor finally stilled, Guardian Spectrum and Guardian Equilibrium stood together. "You have mastered the three pillars of visual accessibility," they said in unison.`,
					`Binary computed the achievements. "Color independence: achieved. Contrast ratios: mastered. Motion control: implemented. Visual accessibility level: excellent."`,
					`"But visual accessibility is just one facet," Guardian Spectrum added with a knowing smile. "The Semantic Sanctuary awaits, where you will learn that structure is as important as appearance. The screen reader users cannot see your beautiful colors - they need semantic meaning instead."`
				]}
			/>
		</div>
	);
};

export default ChapterThree;