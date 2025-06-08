import React, { useState, useReducer } from 'react';
import StoryContent from '../../../../../components/content/StoryContent';

function ChapterThree() {
	// Multiple related states
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [data, setData] = useState(null);

	// Example of state that should be combined
	const [userProfile, setUserProfile] = useState({
		name: '',
		email: '',
		preferences: {
			theme: 'light',
			notifications: true,
		},
	});

	// Derived state example
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const fullName = `${firstName} ${lastName}`.trim(); // Derived, not stored

	const simulateDataFetch = async () => {
		setIsLoading(true);
		setError(null);

		try {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1500));
			if (Math.random() > 0.3) {
				setData({
					message: 'Spell data successfully retrieved!',
					power: Math.floor(Math.random() * 100),
				});
			} else {
				throw new Error('The ancient servers are not responding!');
			}
		} catch (err) {
			setError(err.message);
		} finally {
			setIsLoading(false);
		}
	};

	const content = (
		<>
			<div className='chapter'>
				<h2 className='chapter-title'>
					Chapter 3: State Architecture Mastery
				</h2>

				<div className='chapter-bridge'>
					<p>
						On her final day with Professor Hooksworth, Aria was led
						to the Academy's Architecture Chamber - a vast room
						where component structures materialized as living
						blueprints. State flows were visible as glowing streams
						connecting different parts of the hovering diagrams.
					</p>
				</div>

				<div className='story-section'>
					<p className='story-paragraph'>
						"Welcome to your final useState lesson," Hooksworth
						announced, gesturing at the complex diagrams. "You've
						mastered individual spells, but true expertise lies in
						<strong>architecting your state wisely</strong>."
					</p>

					<p className='story-paragraph'>
						Aria watched as he manipulated a diagram showing
						multiple useState calls. "This looks... chaotic," she
						observed.
					</p>

					<p className='story-paragraph'>
						"Indeed! Many developers create what I call 'state soup'
						- dozens of unrelated useState calls swimming together."
						He consolidated several states into one with a wave of
						his wand. "First principle:{' '}
						<strong>Group related state</strong>. If values change
						together, they belong together."
					</p>

					<p className='story-paragraph'>
						Binary projected its own analysis, showing how grouped
						state reduced complexity and prevented synchronization
						bugs.
					</p>

					<p className='story-paragraph'>
						"Your companion sees the pattern!" Hooksworth smiled.
						"Now observe this common mistake..." He pointed to
						redundant state values that could be calculated from
						others.
					</p>

					<div className='code-example'>
						<pre>{`// ❌ Separate states that change together:
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState(null);
const [data, setData] = useState(null);

// ✅ Better: Group related state:
const [fetchState, setFetchState] = useState({
  isLoading: false,
  error: null,
  data: null
});

// ✅ Or consider useReducer for complex state logic`}</pre>
					</div>

					<p className='story-paragraph'>
						"Second principle," Hooksworth continued, vanishing the
						redundant state with a gesture, "
						<strong>Don't sync state</strong>. If you can calculate
						something from existing state, calculate it during
						render. Storing derived values is asking for bugs!"
					</p>

					<p className='story-paragraph'>
						"Like the fullName example?" Aria suggested. "Calculate
						it from firstName and lastName rather than storing it
						separately?"
					</p>

					<p className='story-paragraph'>
						"Brilliant application!" Hooksworth beamed. "You're
						thinking architecturally now. This prevents the
						nightmare of state values disagreeing with each other.
						Let me show you these principles in action."
					</p>
				</div>

				<div className='interactive-section'>
					<h3 className='section-title'>
						State Architecture Laboratory
					</h3>
					<p>
						Explore different state organization patterns and their
						effects!
					</p>

					<div className='spell-workshop'>
						<div className='pattern-showcase'>
							<span className='pattern-badge'>
								Multiple States
							</span>
							<h4>Loading State Pattern</h4>

							<button
								className='spell-button'
								onClick={simulateDataFetch}
								disabled={isLoading}>
								{isLoading ? 'Fetching...' : 'Fetch Spell Data'}
							</button>

							<div
								className='state-visualizer'
								style={{ marginTop: '20px' }}>
								<div
									className={`state-item ${
										isLoading ? 'active' : ''
									}`}>
									<h5>Loading</h5>
									<div className='state-orb'>
										{isLoading ? '⏳' : '✓'}
									</div>
								</div>
								<div
									className={`state-item ${
										error ? 'active' : ''
									}`}>
									<h5>Error</h5>
									<div
										className='state-orb'
										style={{
											background: error
												? '#e74c3c'
												: '#95a5a6',
										}}>
										{error ? '❌' : '—'}
									</div>
								</div>
								<div
									className={`state-item ${
										data ? 'active' : ''
									}`}>
									<h5>Data</h5>
									<div
										className='state-orb'
										style={{
											background: data
												? '#00b894'
												: '#95a5a6',
										}}>
										{data ? '📊' : '—'}
									</div>
								</div>
							</div>

							{error && (
								<div
									className='spell-result'
									style={{
										background: '#ffe5e5',
										borderColor: '#e74c3c',
										marginTop: '15px',
									}}>
									Error: {error}
								</div>
							)}

							{data && (
								<div
									className='spell-result'
									style={{ marginTop: '15px' }}>
									{data.message} (Power: {data.power})
								</div>
							)}
						</div>

						<div
							className='pattern-showcase'
							style={{ marginTop: '20px' }}>
							<span className='pattern-badge'>Derived State</span>
							<h4>Calculate, Don't Sync</h4>

							<div style={{ display: 'grid', gap: '10px' }}>
								<input
									type='text'
									placeholder='First name'
									value={firstName}
									onChange={(e) =>
										setFirstName(e.target.value)
									}
									style={{
										padding: '8px',
										borderRadius: '4px',
										border: '2px solid #6c5ce7',
									}}
								/>
								<input
									type='text'
									placeholder='Last name'
									value={lastName}
									onChange={(e) =>
										setLastName(e.target.value)
									}
									style={{
										padding: '8px',
										borderRadius: '4px',
										border: '2px solid #6c5ce7',
									}}
								/>
							</div>

							<div
								className='spell-result'
								style={{ marginTop: '15px' }}>
								Full Name (Derived):{' '}
								{fullName || 'Enter your name above'}
							</div>

							<p
								style={{
									fontSize: '14px',
									color: '#666',
									marginTop: '10px',
								}}>
								Notice: fullName is calculated from firstName
								and lastName, not stored separately!
							</p>
						</div>

						<button
							className='reset-button'
							onClick={() => {
								setIsLoading(false);
								setError(null);
								setData(null);
								setFirstName('');
								setLastName('');
							}}
							style={{ marginTop: '20px' }}>
							Reset All Examples
						</button>
					</div>
				</div>

				<div className='pattern-showcase'>
					<span className='pattern-badge'>Best Practices</span>
					<h4>State Organization Principles</h4>
					<ul style={{ textAlign: 'left', lineHeight: '1.8' }}>
						<li>📦 Group related state that changes together</li>
						<li>🧮 Calculate derived values during render</li>
						<li>🎯 Keep state as local as possible</li>
						<li>🔄 Consider useReducer for complex state logic</li>
						<li>
							🚫 Avoid duplicate state that can get out of sync
						</li>
					</ul>
				</div>

				<div className='story-section'>
					<div className='character-intro'>
						<h4>Aria's Journal - Day 16 (Evening)</h4>
						<p>
							My final useState lesson was eye-opening! Professor
							Hooksworth taught me state architecture - how to
							organize state thoughtfully rather than creating
							"state soup." Key principles: Group related state
							that changes together (like loading/error/data),
							never sync derived state (calculate it during render
							instead), and keep state as local as possible. The
							Architecture Chamber's visualizations showed how
							poor state design creates tangled webs while good
							architecture flows cleanly. When state logic gets
							complex, useReducer might be better than multiple
							useState calls. Architecture matters!
						</p>
					</div>
				</div>

				<div className='lesson-insight'>
					<h3>State Architecture Mastery:</h3>
					<p>
						Elevate from useState mechanics to state architecture
						wisdom. Group related values that change together,
						preventing synchronization bugs. Calculate derived
						values during render rather than storing redundant
						state. Keep state as local as possible - lift only when
						necessary. When multiple sub-values update together in
						complex patterns, graduate to useReducer. Remember: good
						architecture makes components predictable, maintainable,
						and bug-resistant. Think architecturally, not just
						functionally.
					</p>
				</div>

				<div className='chapter-finale'>
					<p className='story-paragraph'>
						As the Architecture Chamber's diagrams faded, Hooksworth
						placed a hand on Aria's shoulder. "You've graduated from
						useState basics to architectural thinking. This
						foundation will serve you well."
					</p>
					<p className='story-paragraph'>
						"Thank you, Professor," Aria said. "I feel like I
						understand not just how to use useState, but how to use
						it wisely."
					</p>
					<p className='story-paragraph'>
						"That's the difference between a coder and an
						architect," Hooksworth smiled. "Now, I believe the
						Effect Sage awaits you in the Temporal Tower. Prepare
						yourself - useEffect is a different beast entirely!"
					</p>
					<p className='story-paragraph'>
						Binary chirped excitedly, already calculating optimal
						paths to their next lesson. Aria took one last look at
						the Architecture Chamber before heading toward her next
						challenge at the Hooks Academy.
					</p>
				</div>

				<div className='reflection-section'>
					<h3>Reflect on the Story</h3>
					<p>
						How does the Architecture Chamber metaphor help
						visualize state organization?
					</p>
					<p className='story-paragraph'>
						What bugs have you encountered from "state soup" in your
						own projects?
					</p>
					<p className='story-paragraph'>
						When does architectural thinking become more important
						than individual features?
					</p>
				</div>
			</div>
		</>
	);

	return <StoryContent content={content} />;
}

export default ChapterThree;
