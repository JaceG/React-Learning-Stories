import React, { useState, useEffect, useCallback, useRef } from 'react';
import StoryContent from '../../../../../components/content/StoryContent';

function ChapterThree() {
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

	useInterval(
		() => {
			if (isTimerRunning) {
				setSeconds((s) => s + 1);
			}
		},
		isTimerRunning ? 1000 : null
	);

	// Simulated search results
	const [searchResults, setSearchResults] = useState([]);
	useEffect(() => {
		if (debouncedSearchTerm) {
			// Simulate search
			const mockResults = [
				`Result for "${debouncedSearchTerm}": Ancient Scroll`,
				`Result for "${debouncedSearchTerm}": Mystic Tome`,
				`Result for "${debouncedSearchTerm}": Hook Compendium`,
			];
			setSearchResults(mockResults);
		} else {
			setSearchResults([]);
		}
	}, [debouncedSearchTerm]);

	const content = (
		<>
			<div className='chapter'>
				<h2 className='chapter-title'>
					Chapter 3: Hook Libraries - The Grand Repository
				</h2>

				<div className='chapter-bridge'>
					<p>
						On the final day at the Synthesis Workshop, Compose led
						Aria to a magnificent library adjoining the forges.
						Crystalline shelves held thousands of glowing hook
						patterns, each one a tested solution to common React
						challenges.
					</p>
				</div>

				<div className='story-section'>
					<p className='story-paragraph'>
						"Welcome to the Grand Repository!" Compose announced
						with pride. "Every hook forged here is documented,
						tested, and battle-proven. This is where individual
						creativity becomes collective wisdom."
					</p>

					<p className='story-paragraph'>
						Binary scanned the shelves, downloading documentation at
						an impressive rate, its display showing excitement at
						the vast collection.
					</p>

					<p className='story-paragraph'>
						"A hook library," Compose explained, pulling several
						glowing patterns from the shelves, "transforms solved
						problems into reusable tools. Why should every developer
						reinvent debouncing or window size detection?"
					</p>

					<p className='story-paragraph'>
						"It's like a shared armory!" Aria realized. "Each hook
						is a weapon against complexity, available to all who
						need it."
					</p>

					<p className='story-paragraph'>
						"Precisely! Let me show you our most essential hooks,"
						Compose said, activating three patterns. "These solve
						problems so common, they've become fundamental tools in
						every React developer's arsenal."
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
				</div>

				<div className='interactive-section'>
					<h3 className='section-title'>
						Interactive Exercise: The Hook Library in Action
					</h3>
					<div className='instruction-box'>
						<p>
							<strong>
								Explore three essential hooks from our library
								and see how they solve common React challenges!
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
									onChange={(e) =>
										setSearchTerm(e.target.value)
									}
									placeholder='Type to search...'
									className='search-input'
								/>
								<div className='debounce-info'>
									<p>
										Immediate value:{' '}
										<code>{searchTerm}</code>
									</p>
									<p>
										Debounced value:{' '}
										<code>{debouncedSearchTerm}</code>
									</p>
								</div>
								{searchResults.length > 0 && (
									<div className='search-results'>
										<h5>Search Results:</h5>
										{searchResults.map((result, index) => (
											<div
												key={index}
												className='result-item'>
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
										<span className='value'>
											{windowSize.width}px
										</span>
									</div>
									<div className='dimension'>
										<span className='label'>Height:</span>
										<span className='value'>
											{windowSize.height}px
										</span>
									</div>
								</div>
								<div
									className='viewport-viz'
									style={{
										width: `${Math.min(
											windowSize.width / 10,
											200
										)}px`,
										height: `${Math.min(
											windowSize.height / 10,
											100
										)}px`,
									}}>
									<span>Mini Viewport</span>
								</div>
								<p className='resize-hint'>
									↔️ Resize your window to see changes!
								</p>
							</div>
						</div>

						<div className='demo-section'>
							<h4>useInterval - The Timing Hook</h4>
							<div className='interval-demo'>
								<div className='timer-display'>
									<span className='timer-value'>
										{seconds}s
									</span>
								</div>
								<div className='timer-controls'>
									<button
										className='timer-button'
										onClick={() =>
											setIsTimerRunning(!isTimerRunning)
										}>
										{isTimerRunning ? 'Pause' : 'Start'}{' '}
										Timer
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
								<li>
									Parameter explanations and return values
								</li>
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

				<div className='story-section'>
					<div className='character-intro'>
						<h4>Aria's Journal - Day 18 (Evening)</h4>
						<p>
							The Grand Repository was awe-inspiring! Compose
							showed me how individual hooks become collective
							wisdom through proper organization. I explored three
							essential patterns: useDebounce (delays updates
							until user stops typing - perfect for search!),
							useWindowSize (responsive design made simple), and
							useInterval (declarative setInterval that plays nice
							with React). The key insight: documentation and
							testing transform personal hooks into shareable
							assets. Every hook should have clear docs, usage
							examples, comprehensive tests, and semantic
							versioning. A well-maintained hook library
							accelerates entire teams. Why solve the same
							problems repeatedly?
						</p>
					</div>
				</div>

				<div className='lesson-insight'>
					<h3>Repository Wisdom:</h3>
					<p>
						Transform individual solutions into collective assets
						through well-organized hook libraries. Essential
						patterns like useDebounce, useWindowSize, and
						useInterval solve universal problems. Excellence
						requires comprehensive documentation (JSDoc, examples,
						edge cases), thorough testing (unit tests, integration
						tests, edge cases), logical organization (categories,
						consistent naming, central exports), and proper
						versioning (semantic versioning, changelogs, migration
						guides). Remember: a hook in the library saves countless
						hours across your entire organization.
					</p>
				</div>

				<div className='chapter-finale'>
					<p className='story-paragraph'>
						As they prepared to leave the Synthesis Workshop,
						Compose handed Aria a crystal containing the workshop's
						hook patterns. "You've learned to create, compose, and
						share hooks. This knowledge makes you a true React
						artificer."
					</p>
					<p className='story-paragraph'>
						"Thank you, Master Compose," Aria said, clutching the
						crystal. "I never imagined hooks could be so powerful -
						not just as tools, but as shared knowledge."
					</p>
					<p className='story-paragraph'>
						"Remember," Compose smiled, "the best abstractions
						emerge from real problems. Don't force patterns -
						discover them. Now, Pattern Weaver Synthesis awaits in
						the Integration Sanctum. There you'll learn to combine
						everything into true mastery."
					</p>
					<p className='story-paragraph'>
						Binary projected a summary of all the hooks they'd
						learned, already organizing them into its own internal
						library. Together, they headed toward their final lesson
						at the Hooks Academy.
					</p>
				</div>

				<div className='reflection-section'>
					<h3>Reflect on the Story</h3>
					<p>
						How does the repository transform individual creativity
						into collective wisdom?
					</p>
					<p className='story-paragraph'>
						What makes a hook "library-worthy" versus a one-off
						solution?
					</p>
					<p className='story-paragraph'>
						Why is documentation as important as the code itself?
					</p>
				</div>
			</div>
		</>
	);

	return <StoryContent content={content} />;
}

export default ChapterThree;
