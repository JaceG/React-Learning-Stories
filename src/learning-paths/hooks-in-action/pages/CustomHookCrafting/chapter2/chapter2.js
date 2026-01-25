import React, { useState, useEffect } from 'react';
import StoryContent from '../../../../../components/content/StoryContent';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';

function ChapterTwo() {
	// Custom hook: useLocalStorage
	const useLocalStorage = (key, initialValue) => {
		const [storedValue, setStoredValue] = useState(() => {
			try {
				const item = window.localStorage.getItem(key);
				return item ? JSON.parse(item) : initialValue;
			} catch (error) {
				console.error(
					`Error loading localStorage key "${key}":`,
					error
				);
				return initialValue;
			}
		});

		const setValue = (value) => {
			try {
				setStoredValue(value);
				window.localStorage.setItem(key, JSON.stringify(value));
			} catch (error) {
				console.error(
					`Error setting localStorage key "${key}":`,
					error
				);
			}
		};

		return [storedValue, setValue];
	};

	// Custom hook: useFetch
	const useFetch = (url) => {
		const [data, setData] = useState(null);
		const [loading, setLoading] = useState(true);
		const [error, setError] = useState(null);

		useEffect(() => {
			const fetchData = async () => {
				try {
					setLoading(true);
					// Simulating API call with mock data
					await new Promise((resolve) => setTimeout(resolve, 1000));
					const mockData = {
						message: `Data from ${url}`,
						timestamp: new Date().toISOString(),
						items: [
							'Sword of Truth',
							'Shield of Valor',
							'Helm of Wisdom',
						],
					};
					setData(mockData);
				} catch (err) {
					setError(err);
				} finally {
					setLoading(false);
				}
			};

			if (url) {
				fetchData();
			}
		}, [url]);

		return { data, loading, error };
	};

	// Using our custom hooks
	const [userName, setUserName] = useLocalStorage(
		'craftsman-name',
		'Apprentice'
	);
	const [craftingLevel, setCraftingLevel] = useLocalStorage(
		'crafting-level',
		1
	);
	const { data: inventory, loading, error } = useFetch('/api/inventory');

	const content = (
		<>
			<div className='chapter'>
				<ChapterIntro
					chapterNumber={2}
					title='Advanced Hook Smithing'
					bridge="The next day, Compose led Aria to a more advanced section of the workshop where multiple forges worked in harmony. Here, apprentices weren't just creating simple hooks - they were combining multiple React hooks with browser APIs to forge truly powerful tools."
				/>

				<div className='story-section'>
					<p className='story-paragraph'>
						"Yesterday you learned the basics," Compose began, her
						hands dancing between different energy streams. "Today,
						we forge hooks that bridge React with the outside world.
						Watch as I combine useState and useEffect to create
						something greater!"
					</p>

					<p className='story-paragraph'>
						Binary projected excitement, its sensors detecting the
						complex energy patterns being woven together.
					</p>

					<p className='story-paragraph'>
						"First, observe <strong>useLocalStorage</strong>,"
						Compose demonstrated, pulling localStorage energy into
						her forge. "This hook persists state across browser
						sessions - your data survives even when components
						unmount!"
					</p>

					<p className='story-paragraph'>
						"It's like giving components memory that transcends
						their lifecycle!" Aria exclaimed, understanding the
						implications.
					</p>

					<p className='story-paragraph'>
						"Precisely! And here," Compose gestured to another
						forge, "we have
						<strong>useFetch</strong> - a hook that manages the
						entire lifecycle of data fetching: loading states, error
						handling, and the data itself. Multiple hooks working in
						perfect harmony!"
					</p>

					<div className='smithing-workshop'>
						<div className='hook-combination'>
							<div className='hook-ingredient'>useState</div>
							<div className='plus-sign'>+</div>
							<div className='hook-ingredient'>useEffect</div>
							<div className='equals-sign'>=</div>
							<div className='hook-result'>
								Complex Custom Hook
							</div>
						</div>
					</div>
				</div>

				<div className='interactive-section'>
					<h3 className='section-title'>
						Interactive Exercise: Master-Level Hook Crafting
					</h3>
					<InstructionBox character='Experience the power of composed custom hooks that combine multiple React hooks and browser APIs!'>
						Try changing your name and level - it persists across page refreshes!
					</InstructionBox>

					<div className='advanced-demos'>
						<div className='demo-section'>
							<h4>useLocalStorage Hook - Persistent Memory</h4>
							<div className='localstorage-demo'>
								<div className='input-group'>
									<label>Craftsman Name:</label>
									<input
										type='text'
										value={userName}
										onChange={(e) =>
											setUserName(e.target.value)
										}
										className='forge-input'
									/>
								</div>
								<div className='level-controls'>
									<label>
										Crafting Level: {craftingLevel}
									</label>
									<div className='level-buttons'>
										<button
											className='level-button'
											onClick={() =>
												setCraftingLevel(
													Math.max(
														1,
														craftingLevel - 1
													)
												)
											}>
											Level Down
										</button>
										<button
											className='level-button'
											onClick={() =>
												setCraftingLevel(
													Math.min(
														99,
														craftingLevel + 1
													)
												)
											}>
											Level Up
										</button>
									</div>
								</div>
								<p className='storage-note'>
									💾 Your data is saved! Refresh the page and
									see it persist.
								</p>
							</div>
						</div>

						<div className='demo-section'>
							<h4>useFetch Hook - Data Retrieval</h4>
							<div className='fetch-demo'>
								{loading && (
									<div className='loading-state'>
										<div className='loading-spinner'>
											⚙️
										</div>
										<p>
											Forging connection to distant
											servers...
										</p>
									</div>
								)}
								{error && (
									<div className='error-state'>
										⚠️ Error: {error.message}
									</div>
								)}
								{inventory && (
									<div className='data-display'>
										<h5>Inventory Retrieved:</h5>
										<ul className='inventory-list'>
											{inventory.items.map(
												(item, index) => (
													<li
														key={index}
														className='inventory-item'>
														{item}
													</li>
												)
											)}
										</ul>
										<p className='timestamp'>
											Last updated:{' '}
											{new Date(
												inventory.timestamp
											).toLocaleTimeString()}
										</p>
									</div>
								)}
							</div>
						</div>
					</div>

					<div className='code-visualization'>
						<h4>The useLocalStorage Hook Blueprint</h4>
						<pre className='magical-code'>
							{`// Custom Hook: useLocalStorage
function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.error(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage.
  const setValue = (value) => {
    try {
      // Save state
      setStoredValue(value);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}`}
						</pre>

						<h4>The useFetch Hook Blueprint</h4>
						<pre className='magical-code'>
							{`// Custom Hook: useFetch
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(\`HTTP error! status: \${response.status}\`);
        }
        
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      fetchData();
    }
  }, [url]);

  return { data, loading, error };
}`}
						</pre>
					</div>
				</div>

				<div className='practical-application'>
					<h3>Hook Composition Patterns:</h3>
					<div className='pattern-examples'>
						<div className='pattern-card'>
							<h4>Combining State and Effects</h4>
							<pre className='example-code'>
								{`function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => clearTimeout(handler);
  }, [value, delay]);
  
  return debouncedValue;
}`}
							</pre>
						</div>
						<div className='pattern-card'>
							<h4>Multiple Hooks Working Together</h4>
							<pre className='example-code'>
								{`function useAPI(endpoint) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get(endpoint);
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [endpoint]);
  
  return { data, loading, error, refetch: fetchData };
}`}
							</pre>
						</div>
					</div>
				</div>

				<ChapterSummary
					lessonInsight={{
						title: 'Advanced Hook Composition:',
						content: "Master hook composition by combining multiple primitives into powerful abstractions. useLocalStorage demonstrates state + side effects + browser APIs working together. useFetch shows complete async operation management through coordinated hooks. The pattern: identify repetitive logic involving multiple hooks, extract it into a custom hook that manages the entire lifecycle. Popular compositions include useDebounce, useMediaQuery, useOnClickOutside, and useIntersectionObserver. Think of hooks as composable building blocks - combine them to solve any problem elegantly."
					}}
					reflectionQuestions={[
						'How does the "forging multiple metals" metaphor illuminate hook composition?',
						'What external systems could you bridge with custom hooks?',
						'Why is encapsulating complexity in custom hooks so powerful?'
					]}
					journalEntry={{
						title: "Aria's Journal - Day 18 (Afternoon)",
						content: "Advanced hook composition is mind-blowing! Compose showed me how to combine multiple hooks with browser APIs. useLocalStorage merges useState with localStorage, creating persistent memory that survives component unmounting. useFetch orchestrates useState (for data/loading/error) with useEffect (for the async operation) into a complete data-fetching solution. The key insight: hooks aren't just about React - they're bridges to any external system! By composing simpler hooks, we create powerful abstractions that handle complex scenarios elegantly. It's like forging legendary weapons from multiple magical metals!"
					}}
				/>
			</div>
		</>
	);

	return <StoryContent content={content} />;
}

export default ChapterTwo;
