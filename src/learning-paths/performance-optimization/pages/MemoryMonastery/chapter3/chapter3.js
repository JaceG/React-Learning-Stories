import { useState, useEffect, useRef, useCallback } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';
import StorySection from '../../../../../components/content/StorySection';

const ChapterThree = () => {
	const {
		memoryLeaks,
		cleanupLeak,
		retainedSize,
		memoryOptimizations,
		applyOptimization
	} = useOutletContext();

	const [healingProgress, setHealingProgress] = useState(0);
	const [wisdomUnlocked, setWisdomUnlocked] = useState(false);
	const [demonstrations, setDemonstrations] = useState({
		eventCleanup: false,
		weakMapUsage: false,
		refManagement: false,
		memoization: false
	});

	// Example of proper cleanup patterns
	const [timers, setTimers] = useState([]);
	const observerRef = useRef(null);
	const subscriptionRef = useRef(null);

	// Proper event cleanup demonstration
	const demonstrateEventCleanup = useCallback(() => {
		setDemonstrations(prev => ({ ...prev, eventCleanup: true }));
		applyOptimization('eventCleanup');
		setHealingProgress(prev => prev + 25);
	}, [applyOptimization]);

	// WeakMap demonstration
	const demonstrateWeakMap = useCallback(() => {
		setDemonstrations(prev => ({ ...prev, weakMapUsage: true }));
		applyOptimization('weakmap');
		setHealingProgress(prev => prev + 25);
	}, [applyOptimization]);

	// Ref management demonstration
	const demonstrateRefManagement = useCallback(() => {
		setDemonstrations(prev => ({ ...prev, refManagement: true }));
		applyOptimization('refs');
		setHealingProgress(prev => prev + 25);
	}, [applyOptimization]);

	// Memoization demonstration
	const demonstrateMemoization = useCallback(() => {
		setDemonstrations(prev => ({ ...prev, memoization: true }));
		applyOptimization('memoization');
		setHealingProgress(prev => prev + 25);
	}, [applyOptimization]);

	useEffect(() => {
		if (healingProgress >= 100) {
			setWisdomUnlocked(true);
			// Clean all remaining leaks
			memoryLeaks.forEach(leak => cleanupLeak(leak.component));
		}
	}, [healingProgress, memoryLeaks, cleanupLeak]);

	// Cleanup on unmount
	useEffect(() => {
		// Copy ref values for cleanup
		const observer = observerRef.current;
		const subscription = subscriptionRef.current;
		
		return () => {
			// Clean up all timers
			timers.forEach(timer => clearInterval(timer));
			// Clean up observer
			if (observer) {
				observer.disconnect();
			}
			// Clean up subscription
			if (subscription) {
				subscription.unsubscribe();
			}
		};
	}, [timers]);

	return (
		<div className='chapter'>
			<ChapterIntro
				chapterNumber={3}
				title='The Healing Rituals'
				bridge='"Now comes the most important knowledge," Brother Binary said, leading Aria to the Sanctuary of Solutions. "Understanding leaks is only half the battle. You must master the Four Healing Rituals to cure the Memory Plague permanently."'
			/>

			<StorySection
				paragraphs={[
					<>"Now comes the most important knowledge," Brother Binary said, leading <strong>Aria</strong> to the Sanctuary of Solutions. "Understanding leaks is only half the battle. You must master the <strong>Four Healing Rituals</strong> to cure the Memory Plague permanently."</>,
					<>The sanctuary walls glowed with ancient inscriptions, each describing a different healing technique. "These rituals have been refined over generations of monks. Apply them faithfully, and your applications will remain healthy for eternity."</>,
					<>Brother Binary handed Aria a sacred scroll. "The time has come to put your knowledge into practice. Demonstrate each ritual, and the monastery will grant you the title of <strong>Memory Guardian</strong>."</>
				]}
			/>

			<div className='monastery-chamber'>
				<h3>The Sanctuary of Solutions</h3>
				<div className='memory-meter'>
					<div 
						className='memory-used' 
						style={{ 
							width: `${100 - healingProgress}%`,
							background: healingProgress > 50 ? '#10b981' : 'linear-gradient(90deg, #10b981 0%, #f59e0b 70%, #ef4444 100%)'
						}}>
					</div>
					<span className='memory-label'>
						Healing Progress: {healingProgress}%
					</span>
				</div>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					The Four Healing Rituals
				</h3>
				<InstructionBox character="Brother Binary hands you the sacred scroll.">
					Master each healing ritual to cure the Memory Plague. Apply the techniques 
					and watch as the monastery's memory is restored!
				</InstructionBox>

				<div className='optimization-grid'>
					<div 
						className={`optimization-card ${demonstrations.eventCleanup ? 'applied' : ''}`}
						onClick={demonstrateEventCleanup}
						style={{ cursor: demonstrations.eventCleanup ? 'default' : 'pointer' }}>
						<div className='optimization-icon'>🎯</div>
						<div className='optimization-title'>Event Cleanup Ritual</div>
						<p>{demonstrations.eventCleanup ? '✅ Mastered' : 'Click to learn'}</p>
					</div>
					<div 
						className={`optimization-card ${demonstrations.weakMapUsage ? 'applied' : ''}`}
						onClick={demonstrateWeakMap}
						style={{ cursor: demonstrations.weakMapUsage ? 'default' : 'pointer' }}>
						<div className='optimization-icon'>🔮</div>
						<div className='optimization-title'>WeakMap Wisdom</div>
						<p>{demonstrations.weakMapUsage ? '✅ Mastered' : 'Click to learn'}</p>
					</div>
					<div 
						className={`optimization-card ${demonstrations.refManagement ? 'applied' : ''}`}
						onClick={demonstrateRefManagement}
						style={{ cursor: demonstrations.refManagement ? 'default' : 'pointer' }}>
						<div className='optimization-icon'>📍</div>
						<div className='optimization-title'>Reference Discipline</div>
						<p>{demonstrations.refManagement ? '✅ Mastered' : 'Click to learn'}</p>
					</div>
					<div 
						className={`optimization-card ${demonstrations.memoization ? 'applied' : ''}`}
						onClick={demonstrateMemoization}
						style={{ cursor: demonstrations.memoization ? 'default' : 'pointer' }}>
						<div className='optimization-icon'>💎</div>
						<div className='optimization-title'>Memoization Mastery</div>
						<p>{demonstrations.memoization ? '✅ Mastered' : 'Click to learn'}</p>
					</div>
				</div>

				{healingProgress > 0 && healingProgress < 100 && (
					<div className='wisdom-card'>
						<h4>Progress Report</h4>
						<p>You have mastered {healingProgress / 25} of 4 healing rituals. 
						Continue your training to become a Memory Guardian!</p>
					</div>
				)}
			</div>

			<CodeExample
				title="The Sacred Scroll of Memory Healing"
				discoveredBy="Ultimate Memory Patterns"
				code={`// The Four Healing Rituals

// 1. Event Cleanup Ritual
function ProperEventHandling() {
  useEffect(() => {
    const handleResize = () => console.log('Resized');
    const handleScroll = () => console.log('Scrolled');
    
    // ✅ Add listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    
    // ✅ ALWAYS return cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty deps = setup once, cleanup once
}

// 2. WeakMap Wisdom - Prevent reference leaks
const cache = new WeakMap(); // ✅ Allows GC when key is removed

function ComponentWithCache({ data }) {
  // WeakMap doesn't prevent GC of unused objects
  if (!cache.has(data)) {
    cache.set(data, expensiveComputation(data));
  }
  return cache.get(data);
}

// 3. Reference Discipline
function ProperRefManagement() {
  const elementRef = useRef(null);
  const observerRef = useRef(null);
  
  useEffect(() => {
    if (elementRef.current) {
      // ✅ Create observer
      observerRef.current = new IntersectionObserver(entries => {
        // Handle intersection
      });
      
      observerRef.current.observe(elementRef.current);
    }
    
    // ✅ Cleanup observer and refs
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      // Clear ref to prevent retained references
      elementRef.current = null;
    };
  }, []);
  
  return <div ref={elementRef}>Observed Element</div>;
}

// 4. Memoization Mastery - Prevent recreation
function OptimalMemoization() {
  // ✅ Memoize expensive computations
  const expensiveValue = useMemo(() => {
    return heavyComputation(data);
  }, [data]);
  
  // ✅ Memoize callbacks to prevent child re-renders
  const handleClick = useCallback((id) => {
    doSomething(id);
  }, []); // Stable reference
  
  // ✅ Memoize context values
  const contextValue = useMemo(() => ({
    value: expensiveValue,
    onClick: handleClick
  }), [expensiveValue, handleClick]);
  
  return (
    <Context.Provider value={contextValue}>
      <ChildComponents />
    </Context.Provider>
  );
}

// Complete Memory-Safe Component Pattern
function MemoryGuardianComponent({ data }) {
  const [state, setState] = useState(null);
  const timerRef = useRef(null);
  const isMountedRef = useRef(true);
  
  // Safe async operations
  const fetchData = useCallback(async () => {
    try {
      const result = await api.getData();
      // ✅ Check if still mounted
      if (isMountedRef.current) {
        setState(result);
      }
    } catch (error) {
      if (isMountedRef.current) {
        console.error(error);
      }
    }
  }, []);
  
  useEffect(() => {
    // ✅ All setup code here
    fetchData();
    
    timerRef.current = setInterval(() => {
      if (isMountedRef.current) {
        fetchData();
      }
    }, 5000);
    
    // ✅ Comprehensive cleanup
    return () => {
      isMountedRef.current = false;
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [fetchData]);
  
  return <div>{state}</div>;
}`}
			/>

			{wisdomUnlocked && (
				<div className='memory-monk' style={{ marginTop: '30px' }}>
					<h3>🎉 Memory Guardian Achieved!</h3>
					<p>"You have mastered all four healing rituals!" Brother Binary proclaimed. 
					"The Memory Plague retreats before your knowledge. You are now a 
					<strong> Memory Guardian</strong>, protector of application health!"</p>
					<div style={{ marginTop: '20px', textAlign: 'center' }}>
						<p style={{ fontSize: '1.2em', color: '#fbbf24' }}>
							Current Memory Status: {retainedSize === 0 ? '✨ Perfectly Clean!' : `${(retainedSize / 1000).toFixed(1)}KB`}
						</p>
					</div>
				</div>
			)}

			<ChapterSummary
				lessonInsight={{
					title: "The Memory Guardian's Wisdom:",
					content: 'Memory management is not about complex algorithms or clever tricks. It\'s about discipline and consistency. Always clean up what you create, use weak references when appropriate, manage refs carefully, and memoize wisely. These four rituals, applied consistently, will keep your applications healthy and performant throughout their lifetime.'
				}}
				reflectionQuestions={[
					'Aria has become a Memory Guardian, mastering the ancient rituals of memory management. But Brother Binary\'s final lesson is most important: "Knowledge without practice is worthless. Apply these rituals in every component you write."',
					'Will you take the Memory Guardian oath? Will you commit to always cleaning up your effects, managing your references, and keeping your applications healthy?'
				]}
				journalEntry={{
					title: "Aria's Journal - Day 26 (Evening)",
					content:
						"I've mastered the Four Healing Rituals and become a Memory Guardian! 1) Event Cleanup Ritual - ALWAYS return cleanup functions from useEffect. 2) WeakMap Wisdom - use WeakMap/WeakSet for caches so objects can be garbage collected when no longer needed. 3) Reference Discipline - disconnect observers, clear refs on unmount. 4) Memoization Mastery - memoize context values to prevent recreation. The complete pattern: use isMountedRef to check if component is still mounted before setting state after async operations. Brother Binary's wisdom: 'Knowledge without practice is worthless.' Tomorrow: the Lazy Library!",
				}}
				lessonEnding={[
					'With the Memory Plague defeated, the React Kingdom\'s applications ran smoothly once more. Aria had not only learned to identify and fix memory leaks but had become a guardian of memory health. Yet her journey continued, for the Lazy Library awaited, promising secrets of code splitting and lazy loading...'
				]}
			/>
		</div>
	);
};

export default ChapterThree;