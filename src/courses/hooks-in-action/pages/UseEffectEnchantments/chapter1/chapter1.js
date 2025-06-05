import React, { useState, useEffect } from 'react';
import StoryContent from '../../../../../components/content/StoryContent';

function Chapter1() {
  // Component lifecycle tracking
  const [componentAge, setComponentAge] = useState(0);
  const [isActive, setIsActive] = useState(true);
  
  // Different effect examples
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [apiData, setApiData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Track effect execution
  const [effectCounts, setEffectCounts] = useState({
    mount: 0,
    mouse: 0,
    window: 0,
    cleanup: 0
  });

  // Effect 1: Component mount/unmount (empty deps)
  useEffect(() => {
    setEffectCounts(prev => ({ ...prev, mount: prev.mount + 1 }));
    
    const interval = setInterval(() => {
      setComponentAge(prev => prev + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
      setEffectCounts(prev => ({ ...prev, cleanup: prev.cleanup + 1 }));
    };
  }, []); // Only runs once on mount

  // Effect 2: Mouse tracking (with cleanup)
  useEffect(() => {
    if (isActive) {
      setEffectCounts(prev => ({ ...prev, mouse: prev.mouse + 1 }));
      
      const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({
          x: Math.round(e.clientX - rect.left),
          y: Math.round(e.clientY - rect.top)
        });
      };

      const element = document.querySelector('.mouse-tracker');
      if (element) {
        element.addEventListener('mousemove', handleMouseMove);
        
        return () => {
          element.removeEventListener('mousemove', handleMouseMove);
        };
      }
    }
  }, [isActive]); // Runs when isActive changes

  // Effect 3: Window resize (with debouncing)
  useEffect(() => {
    setEffectCounts(prev => ({ ...prev, window: prev.window + 1 }));
    
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWindowWidth(window.innerWidth);
      }, 300);
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []); // Only runs once

  // Simulate API call
  const fetchMagicalData = async () => {
    setIsLoading(true);
    setApiData(null);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setApiData({
      spell: 'Wingardium Leviosa',
      power: Math.floor(Math.random() * 100),
      element: ['Fire', 'Water', 'Earth', 'Air'][Math.floor(Math.random() * 4)]
    });
    setIsLoading(false);
  };

  const content = (
    <>
      <div className='chapter'>
        <h2 className='chapter-title'>Chapter 1: The Lifecycle Enchantments</h2>

        <div className='story-section'>
          <p className='story-paragraph'>
            In a tower overlooking the React Kingdom, Master Effectus stood before his students, 
            surrounded by floating hourglasses and mystical timers. His robes shimmered with the 
            patterns of time itself.
          </p>

          <p className='story-paragraph'>
            "Welcome, young enchanters," Master Effectus began, his voice echoing with wisdom. 
            "Today, you'll learn the most powerful spell in the functional wizard's arsenal: 
            <strong> useEffect</strong>. This enchantment allows you to synchronize your components 
            with the outside world."
          </p>

          <p className='story-paragraph'>
            He waved his staff, and glowing runes appeared in the air. "In the old days, class 
            components had lifecycle methods: componentDidMount, componentDidUpdate, and 
            componentWillUnmount. The useEffect spell combines all three into one elegant incantation."
          </p>

          <div className='code-example'>
            <pre>{`// The basic useEffect enchantment
useEffect(() => {
  // This runs after render
  console.log('Effect running!');
  
  // The cleanup spell (optional)
  return () => {
    console.log('Cleaning up!');
  };
}, []); // Dependencies array`}</pre>
          </div>

          <p className='story-paragraph'>
            "The cleanup function," Master Effectus explained, pointing to the return statement, 
            "is your protection spell. It prevents memory leaks and ensures your effects don't 
            linger when they shouldn't. Always clean up your timers, subscriptions, and listeners!"
          </p>
        </div>

        <div className='interactive-section'>
          <h3 className='section-title'>The Lifecycle Laboratory</h3>
          <p>Explore different types of effects and their lifecycles:</p>

          <div className='effect-workshop'>
            {/* Component Lifecycle Display */}
            <div className='lifecycle-stage'>
              <h4>🕰️ Component Lifecycle</h4>
              <div className='stage-info'>
                <p>Component has been alive for: <strong>{componentAge} seconds</strong></p>
                <div className='effect-counter'>
                  Mount effects run: <span className='count-badge'>{effectCounts.mount}</span>
                </div>
              </div>
            </div>

            {/* Mouse Tracking Effect */}
            <div className='effect-demo'>
              <h4>🖱️ Mouse Tracking Effect</h4>
              <div 
                className='mouse-tracker'
                style={{
                  height: '150px',
                  background: isActive ? '#e3f2fd' : '#f5f5f5',
                  border: '2px solid #2196f3',
                  borderRadius: '8px',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'background 0.3s'
                }}
              >
                {isActive && (
                  <>
                    <div 
                      className='mouse-follower'
                      style={{
                        position: 'absolute',
                        left: mousePosition.x - 10,
                        top: mousePosition.y - 10,
                        width: '20px',
                        height: '20px',
                        background: '#2196f3',
                        borderRadius: '50%',
                        pointerEvents: 'none',
                        transition: 'none'
                      }}
                    />
                    <p style={{textAlign: 'center', marginTop: '60px', color: '#666'}}>
                      Move your mouse here! ({mousePosition.x}, {mousePosition.y})
                    </p>
                  </>
                )}
                {!isActive && (
                  <p style={{textAlign: 'center', marginTop: '60px', color: '#999'}}>
                    Effect paused - listener removed
                  </p>
                )}
              </div>
              <div style={{display: 'flex', gap: '10px', marginTop: '10px'}}>
                <button 
                  className='spell-button' 
                  onClick={() => setIsActive(!isActive)}
                >
                  {isActive ? 'Pause Effect' : 'Resume Effect'}
                </button>
                <div className='effect-counter'>
                  Effect runs: <span className='count-badge'>{effectCounts.mouse}</span>
                </div>
              </div>
            </div>

            {/* Window Resize Effect */}
            <div className='effect-demo'>
              <h4>🪟 Window Resize Effect</h4>
              <div className='window-info'>
                <p>Current window width: <strong>{windowWidth}px</strong></p>
                <p style={{fontSize: '14px', color: '#666'}}>
                  (Resize your browser window to see the effect with debouncing)
                </p>
                <div className='effect-counter'>
                  Setup runs: <span className='count-badge'>{effectCounts.window}</span>
                </div>
              </div>
            </div>

            {/* Async Effect Example */}
            <div className='effect-demo'>
              <h4>✨ Async Effect Pattern</h4>
              <button 
                className='spell-button' 
                onClick={fetchMagicalData}
                disabled={isLoading}
              >
                {isLoading ? 'Casting Spell...' : 'Fetch Magical Data'}
              </button>
              
              {apiData && (
                <div className='spell-result' style={{marginTop: '15px'}}>
                  <p><strong>Spell:</strong> {apiData.spell}</p>
                  <p><strong>Power:</strong> {apiData.power}%</p>
                  <p><strong>Element:</strong> {apiData.element}</p>
                </div>
              )}
            </div>

            <button 
              className='reset-button' 
              onClick={() => {
                setComponentAge(0);
                setIsActive(true);
                setApiData(null);
                setEffectCounts({ mount: 0, mouse: 0, window: 0, cleanup: 0 });
              }}
              style={{marginTop: '20px'}}
            >
              Reset All Examples
            </button>
          </div>
        </div>

        <div className='effect-patterns'>
          <h4>Common Effect Patterns</h4>
          <div className='pattern-grid'>
            <div className='pattern-card'>
              <h5>🎭 componentDidMount</h5>
              <pre>{`useEffect(() => {
  // Runs once after mount
}, []); // Empty deps`}</pre>
            </div>
            <div className='pattern-card'>
              <h5>🔄 componentDidUpdate</h5>
              <pre>{`useEffect(() => {
  // Runs after every render
}); // No deps array`}</pre>
            </div>
            <div className='pattern-card'>
              <h5>🧹 componentWillUnmount</h5>
              <pre>{`useEffect(() => {
  return () => {
    // Cleanup
  };
}, []);`}</pre>
            </div>
          </div>
        </div>

        <div className='lesson-insight'>
          <h3>The Lifecycle Lesson:</h3>
          <p>
            useEffect is your window to the outside world in functional components. It handles 
            side effects like API calls, timers, event listeners, and DOM manipulation. The key 
            is understanding when effects run (controlled by the dependency array) and always 
            cleaning up resources to prevent memory leaks. Effects run after the render is 
            committed to the screen, ensuring the DOM is ready for manipulation.
          </p>
        </div>

        <div className='reflection-section'>
          <h3>Reflect on the Story</h3>
          <p>
            Why is cleanup important when dealing with timers and event listeners?
          </p>
          <p>
            How does the dependency array control when an effect runs?
          </p>
          <p>
            What happens if you forget to include a dependency in the array?
          </p>
        </div>
      </div>
    </>
  );

  return <StoryContent content={content} />;
}

export default Chapter1;