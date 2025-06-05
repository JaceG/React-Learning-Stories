import { useState, useEffect, useCallback, useRef } from 'react';

const ChapterThree = () => {
	// Custom hook: useDebounce
	const useDebounce = (value, delay) => {
		const [debouncedValue, setDebouncedValue] = useState(value);

		useEffect(() => {
			const handler = setTimeout(() => {
				setDebouncedValue(value);
			}, delay);

			return () => {
				clearTimeout(handler);
			};
		}, [value, delay]);

		return debouncedValue;
	};

	// Custom hook: useWindowSize
	const useWindowSize = () => {
		const [windowSize, setWindowSize] = useState({
			width: window.innerWidth,
			height: window.innerHeight,
		});

		useEffect(() => {
			const handleResize = () => {
				setWindowSize({
					width: window.innerWidth,
					height: window.innerHeight,
				});
			};

			window.addEventListener('resize', handleResize);
			return () => window.removeEventListener('resize', handleResize);
		}, []);

		return windowSize;
	};

	// Custom hook: useInterval
	const useInterval = (callback, delay) => {
		const savedCallback = useRef();

		useEffect(() => {
			savedCallback.current = callback;
		}, [callback]);

		useEffect(() => {
			function tick() {
				savedCallback.current();
			}
			if (delay !== null) {
				let id = setInterval(tick, delay);
				return () => clearInterval(id);
			}
		}, [delay]);
	};

	// Demo states
	const [searchTerm, setSearchTerm] = useState('');
	const debouncedSearchTerm = useDebounce(searchTerm, 500);
	const windowSize = useWindowSize();
	const [seconds, setSeconds] = useState(0);
	const [isTimerRunning, setIsTimerRunning] = useState(false);

	useInterval(() => {
		if (isTimerRunning) {
			setSeconds(s => s + 1);
		}
	}, isTimerRunning ? 1000 : null);

	// Simulated search results
	const [searchResults, setSearchResults] = useState([]);
	useEffect(() => {
		if (debouncedSearchTerm) {
			// Simulate search
			const mockResults = [
				`Result for "${debouncedSearchTerm}": Ancient Scroll`,
				`Result for "${debouncedSearchTerm}": Mystic Tome`,
				`Result for "${debouncedSearchTerm}": Hook Compendium`
			];
			setSearchResults(mockResults);
		} else {
			setSearchResults([]);
		}
	}, [debouncedSearchTerm]);

	return (
		<div className='chapter'>
			<h2 className='chapter-title'>
				Chapter 3: Hook Libraries - The Grand Repository
			</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					Master Reginald led his apprentice to a vast library, its shelves 
					lined with glowing scrolls. "Welcome to the <strong>Grand Repository 
					of Hooks</strong>," he announced. "Here, we store our most valuable 
					custom hooks - tools that solve common problems across the kingdom. 
					These hooks are documented, tested, and ready for any React warrior 
					who needs them."
				</p>

				<div className='library-visualization'>
					<div className='library-shelf'>
						<div className='hook-scroll'>useDebounce</div>
						<div className='hook-scroll'>useWindowSize</div>
						<div className='hook-scroll'>useInterval</div>
						<div className='hook-scroll'>useAsync</div>
						<div className='hook-scroll'>usePrevious</div>
					</div>
				</div>

				<p className='story-paragraph'>
					"A well-organized hook library," the master explained, "is like a 
					kingdom's armory. Each hook is a weapon against complexity, thoroughly 
					tested in battle, documented for future warriors, and ready to be 
					deployed at a moment's notice. Let me show you three of our most 
					prized hooks!"
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: The Hook Library in Action
				</h3>
				<div className='instruction-box'>
					<p>
						<strong>
							Explore three essential hooks from our library and see how they 
							solve common React challenges!
						</strong>
					</p>
				</div>

				<div className='library-demos'>
					<div className='demo-section'>
						<h4>useDebounce - The Patience Hook</h4>
						<div className='debounce-demo'>
							<input
								type='text'
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								placeholder='Type to search...'
								className='search-input'
							/>
							<div className='debounce-info'>
								<p>Immediate value: <code>{searchTerm}</code></p>
								<p>Debounced value: <code>{debouncedSearchTerm}</code></p>
							</div>
							{searchResults.length > 0 && (
								<div className='search-results'>
									<h5>Search Results:</h5>
									{searchResults.map((result, index) => (
										<div key={index} className='result-item'>
											{result}
										</div>
									))}
								</div>
							)}
						</div>
					</div>

					<div className='demo-section'>
						<h4>useWindowSize - The Responsive Hook</h4>
						<div className='window-size-demo'>
							<div className='size-display'>
								<div className='dimension'>
									<span className='label'>Width:</span>
									<span className='value'>{windowSize.width}px</span>
								</div>
								<div className='dimension'>
									<span className='label'>Height:</span>
									<span className='value'>{windowSize.height}px</span>
								</div>
							</div>
							<div className='viewport-viz' style={{
								width: `${Math.min(windowSize.width / 10, 200)}px`,
								height: `${Math.min(windowSize.height / 10, 100)}px`
							}}>
								<span>Mini Viewport</span>
							</div>
							<p className='resize-hint'>↔️ Resize your window to see changes!</p>
						</div>
					</div>

					<div className='demo-section'>
						<h4>useInterval - The Timing Hook</h4>
						<div className='interval-demo'>
							<div className='timer-display'>
								<span className='timer-value'>{seconds}s</span>
							</div>
							<div className='timer-controls'>
								<button 
									className='timer-button'
									onClick={() => setIsTimerRunning(!isTimerRunning)}>
									{isTimerRunning ? 'Pause' : 'Start'} Timer
								</button>
								<button 
									className='timer-button reset'
									onClick={() => {
										setSeconds(0);
										setIsTimerRunning(false);
									}}>
									Reset
								</button>
							</div>
						</div>
					</div>
				</div>

				<div className='code-visualization'>
					<h4>Hook Documentation Example</h4>
					<pre className='magical-code'>
						{`/**
 * useDebounce - Delays updating a value until after wait milliseconds 
 * have elapsed since the last time it was invoked.
 * 
 * @param {any} value - The value to debounce
 * @param {number} delay - The delay in milliseconds
 * @returns {any} - The debounced value
 * 
 * @example
 * const SearchComponent = () => {
 *   const [searchTerm, setSearchTerm] = useState('');
 *   const debouncedSearchTerm = useDebounce(searchTerm, 500);
 *   
 *   useEffect(() => {
 *     // Only search after user stops typing for 500ms
 *     if (debouncedSearchTerm) {
 *       performSearch(debouncedSearchTerm);
 *     }
 *   }, [debouncedSearchTerm]);
 * };
 */
export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}`}
					</pre>

					<h4>Testing Custom Hooks</h4>
					<pre className='magical-code'>
						{`// Testing with React Testing Library
import { renderHook, act } from '@testing-library/react-hooks';
import { useCounter } from './useCounter';

describe('useCounter', () => {
  it('should increment counter', () => {
    const { result } = renderHook(() => useCounter());
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(1);
  });

  it('should reset to initial value', () => {
    const { result } = renderHook(() => useCounter(5));
    
    act(() => {
      result.current.increment();
      result.current.reset();
    });
    
    expect(result.current.count).toBe(5);
  });
});`}
					</pre>
				</div>
			</div>

			<div className='practical-application'>
				<h3>Building a Hook Library: Best Practices</h3>
				<div className='best-practices'>
					<div className='practice-item'>
						<h4>📚 Documentation</h4>
						<ul>
							<li>Clear descriptions and type definitions</li>
							<li>Usage examples and common patterns</li>
							<li>Parameter explanations and return values</li>
						</ul>
					</div>
					<div className='practice-item'>
						<h4>🧪 Testing</h4>
						<ul>
							<li>Unit tests for all hook behaviors</li>
							<li>Edge case coverage</li>
							<li>Integration tests with components</li>
						</ul>
					</div>
					<div className='practice-item'>
						<h4>📦 Organization</h4>
						<ul>
							<li>Logical folder structure</li>
							<li>Consistent naming conventions</li>
							<li>Export from a central index</li>
						</ul>
					</div>
					<div className='practice-item'>
						<h4>🔄 Versioning</h4>
						<ul>
							<li>Semantic versioning</li>
							<li>Change logs</li>
							<li>Migration guides</li>
						</ul>
					</div>
				</div>
			</div>

			<div className='lesson-insight'>
				<h3>The Hook Library Lesson:</h3>
				<p>
					A well-crafted hook library is a treasure trove of reusable solutions. 
					By creating, documenting, and testing custom hooks, you build a powerful 
					toolkit that speeds up development and ensures consistency across your 
					applications. These hooks abstract complex behaviors into simple, 
					reusable functions that can be shared across teams and projects. 
					Remember: a hook saved in the library is worth ten reimplemented 
					in components!
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					How does the library metaphor help you think about organizing and 
					sharing custom hooks? What makes a hook worthy of being added to 
					a shared library?
				</p>
				<p>
					Consider the hooks you've built. Which ones solve problems that 
					other developers might face? How would you document and test them 
					for inclusion in a hook library?
				</p>
			</div>
		</div>
	);
};

export default ChapterThree;