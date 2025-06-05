import { useState, useEffect } from 'react';

const ChapterTwo = () => {
	// Custom hook: useLocalStorage
	const useLocalStorage = (key, initialValue) => {
		const [storedValue, setStoredValue] = useState(() => {
			try {
				const item = window.localStorage.getItem(key);
				return item ? JSON.parse(item) : initialValue;
			} catch (error) {
				console.error(`Error loading localStorage key "${key}":`, error);
				return initialValue;
			}
		});

		const setValue = (value) => {
			try {
				setStoredValue(value);
				window.localStorage.setItem(key, JSON.stringify(value));
			} catch (error) {
				console.error(`Error setting localStorage key "${key}":`, error);
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
					await new Promise(resolve => setTimeout(resolve, 1000));
					const mockData = {
						message: `Data from ${url}`,
						timestamp: new Date().toISOString(),
						items: ['Sword of Truth', 'Shield of Valor', 'Helm of Wisdom']
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
	const [userName, setUserName] = useLocalStorage('craftsman-name', 'Apprentice');
	const [craftingLevel, setCraftingLevel] = useLocalStorage('crafting-level', 1);
	const { data: inventory, loading, error } = useFetch('/api/inventory');

	return (
		<div className='chapter'>
			<h2 className='chapter-title'>
				Chapter 2: Advanced Hook Smithing
			</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					As the apprentice's skills grew, Master Reginald revealed the deeper 
					secrets of the forge. "Now," he said, wiping sweat from his brow, 
					"we shall combine multiple hooks to create truly powerful tools. 
					Watch as I forge the <strong>useLocalStorage</strong> hook, which 
					remembers data even when the kingdom sleeps, and the mighty 
					<strong>useFetch</strong> hook, which retrieves treasures from 
					distant lands!"
				</p>

				<div className='smithing-workshop'>
					<div className='hook-combination'>
						<div className='hook-ingredient'>useState</div>
						<div className='plus-sign'>+</div>
						<div className='hook-ingredient'>useEffect</div>
						<div className='equals-sign'>=</div>
						<div className='hook-result'>Complex Custom Hook</div>
					</div>
				</div>

				<p className='story-paragraph'>
					The forge glowed with an ethereal light as multiple hooks were 
					combined into one. "See how we can use <em>useState</em> for managing 
					data, <em>useEffect</em> for side effects, and combine them with 
					browser APIs or network requests. This is the true art of hook 
					composition!"
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: Master-Level Hook Crafting
				</h3>
				<div className='instruction-box'>
					<p>
						<strong>
							Experience the power of composed custom hooks that combine 
							multiple React hooks and browser APIs!
						</strong>
					</p>
				</div>

				<div className='advanced-demos'>
					<div className='demo-section'>
						<h4>useLocalStorage Hook - Persistent Memory</h4>
						<div className='localstorage-demo'>
							<div className='input-group'>
								<label>Craftsman Name:</label>
								<input
									type='text'
									value={userName}
									onChange={(e) => setUserName(e.target.value)}
									className='forge-input'
								/>
							</div>
							<div className='level-controls'>
								<label>Crafting Level: {craftingLevel}</label>
								<div className='level-buttons'>
									<button 
										className='level-button'
										onClick={() => setCraftingLevel(Math.max(1, craftingLevel - 1))}>
										Level Down
									</button>
									<button 
										className='level-button'
										onClick={() => setCraftingLevel(Math.min(99, craftingLevel + 1))}>
										Level Up
									</button>
								</div>
							</div>
							<p className='storage-note'>
								💾 Your data is saved! Refresh the page and see it persist.
							</p>
						</div>
					</div>

					<div className='demo-section'>
						<h4>useFetch Hook - Data Retrieval</h4>
						<div className='fetch-demo'>
							{loading && (
								<div className='loading-state'>
									<div className='loading-spinner'>⚙️</div>
									<p>Forging connection to distant servers...</p>
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
										{inventory.items.map((item, index) => (
											<li key={index} className='inventory-item'>
												{item}
											</li>
										))}
									</ul>
									<p className='timestamp'>
										Last updated: {new Date(inventory.timestamp).toLocaleTimeString()}
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

			<div className='lesson-insight'>
				<h3>The Hook Composition Lesson:</h3>
				<p>
					Complex custom hooks are built by combining simpler hooks. Like a 
					master blacksmith forging a legendary weapon from multiple metals, 
					you can create powerful abstractions by composing useState, useEffect, 
					and other hooks. This pattern allows you to encapsulate complex logic, 
					manage side effects, and create reusable solutions for common problems 
					like data fetching, local storage synchronization, and state management 
					with side effects.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					How does combining multiple hooks create more powerful abstractions? 
					Think about how each hook contributes its unique capability to the whole.
				</p>
				<p>
					What other combinations of hooks could you create? Consider problems 
					like form validation, animation timing, or real-time data synchronization.
				</p>
			</div>
		</div>
	);
};

export default ChapterTwo;