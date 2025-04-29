import { useState } from 'react';

const ChapterThree = () => {
	const [jsxChallenges, setJsxChallenges] = useState([
		{
			id: 1,
			title: 'Single Root Element',
			solved: false,
			code: `function Profile() {
  return (
    <h1>User Profile</h1>
    <p>Username: adventurer123</p>
    <p>Level: 42</p>
  );
}`,
			solution: `function Profile() {
  return (
    <div>
      <h1>User Profile</h1>
      <p>Username: adventurer123</p>
      <p>Level: 42</p>
    </div>
  );
}`,
		},
		{
			id: 2,
			title: 'Self-Closing Tags',
			solved: false,
			code: `function Inventory() {
  return (
    <div>
      <h2>Inventory</h2>
      <input type="text" placeholder="Search items">
      <img src="sword.png" alt="Legendary Sword">
    </div>
  );
}`,
			solution: `function Inventory() {
  return (
    <div>
      <h2>Inventory</h2>
      <input type="text" placeholder="Search items" />
      <img src="sword.png" alt="Legendary Sword" />
    </div>
  );
}`,
		},
		{
			id: 3,
			title: 'camelCase Properties',
			solved: false,
			code: `function Button() {
  return (
    <button 
      class="magic-button"
      onclick={handleClick}
      tabindex="1"
    >
      Cast Spell
    </button>
  );
}`,
			solution: `function Button() {
  return (
    <button 
      className="magic-button"
      onClick={handleClick}
      tabIndex="1"
    >
      Cast Spell
    </button>
  );
}`,
		},
	]);
	const [activeChallengeId, setActiveChallengeId] = useState(null);
	const [userCode, setUserCode] = useState('');
	const [codeResult, setCodeResult] = useState(null);
	const [fixedCode, setFixedCode] = useState(false);

	const selectChallenge = (id) => {
		const challenge = jsxChallenges.find((c) => c.id === id);
		setActiveChallengeId(id);
		setUserCode(challenge.code);
		setCodeResult(null);
		setFixedCode(false);
	};

	const checkSolution = () => {
		const challenge = jsxChallenges.find((c) => c.id === activeChallengeId);
		if (!challenge) return;
		let isCorrect = false;
		let feedback = '';
		switch (activeChallengeId) {
			case 1:
				isCorrect =
					/<div>[\s\S]*<h1>[\s\S]*<\/h1>[\s\S]*<p>[\s\S]*<\/p>[\s\S]*<\/div>/.test(
						userCode
					);
				feedback = isCorrect
					? 'Correct! You wrapped everything in a single root element.'
					: 'Remember: JSX must have a single root element.';
				break;
			case 2:
				isCorrect = /<input[\s\S]*\/>[\s\S]*<img[\s\S]*\/>/.test(
					userCode
				);
				feedback = isCorrect
					? 'Correct! All tags are self-closed.'
					: 'Remember: All tags in JSX must be closed.';
				break;
			case 3:
				isCorrect =
					/className=/.test(userCode) &&
					/onClick=/.test(userCode) &&
					/tabIndex=/.test(userCode);
				feedback = isCorrect
					? 'Correct! You used camelCase for all properties.'
					: 'Remember: Use camelCase for JSX properties.';
				break;
			default:
				feedback = '';
		}
		setCodeResult({ isCorrect, feedback });
		if (isCorrect) {
			setJsxChallenges((prev) =>
				prev.map((c) =>
					c.id === activeChallengeId ? { ...c, solved: true } : c
				)
			);
			setFixedCode(true);
		}
	};

	const showSolution = () => {
		const challenge = jsxChallenges.find((c) => c.id === activeChallengeId);
		if (challenge) {
			setUserCode(challenge.solution);
			setFixedCode(true);
			setCodeResult({
				isCorrect: true,
				feedback: 'Here is the correct solution!',
			});
		}
	};

	return (
		<div className='chapter'>
			<h2 className='chapter-title'>
				Chapter 3: The Rules of the Scrolls
			</h2>

			<div className='story-section'>
				<p className='story-paragraph'>
					Like all magical languages, JSX came with certain rules and
					limitations that all craftsmen needed to learn. These
					principles ensured that components would render correctly
					and maintain compatibility with the underlying React system.
				</p>

				<p className='story-paragraph'>
					In the great library of the Component Kingdom, scribes
					documented these rules for all craftsmen to follow when
					working with the JSX scrolls.
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>The JSX Rulebook</h3>

				<div className='jsx-rules'>
					<div className='rule-card'>
						<h4>1. Single Root Element</h4>
						<p>
							Every JSX expression must have a single root element
							wrapping all content.
						</p>
						<div className='rule-example'>
							<div className='incorrect'>
								<h5>Incorrect ❌</h5>
								<pre>{`return (
<h1>Title</h1>
<p>Paragraph</p>
);`}</pre>
							</div>
							<div className='correct'>
								<h5>Correct ✅</h5>
								<pre>{`return (
<div>
<h1>Title</h1>
<p>Paragraph</p>
</div>
);`}</pre>
							</div>
						</div>
						<p className='note'>
							Alternative: Use React Fragments (<> </>) to avoid
							extra DOM elements.
						</p>
					</div>

					<div className='rule-card'>
						<h4>2. Close All Tags</h4>
						<p>
							Unlike HTML, all tags in JSX must be closed,
							including self-closing tags.
						</p>
						<div className='rule-example'>
							<div className='incorrect'>
								<h5>Incorrect ❌</h5>
								<pre>{`<input type="text">
<img src="image.jpg">`}</pre>
							</div>
							<div className='correct'>
								<h5>Correct ✅</h5>
								<pre>{`<input type="text" />
<img src="image.jpg" />`}</pre>
							</div>
						</div>
					</div>

					<div className='rule-card'>
						<h4>3. camelCase Properties</h4>
						<p>
							HTML attributes are written in camelCase in JSX, not
							kebab-case.
						</p>
						<div className='rule-example'>
							<div className='incorrect'>
								<h5>Incorrect ❌</h5>
								<pre>{`<div class="container" onclick={handleClick}>
<input maxlength="10" />
</div>`}</pre>
							</div>
							<div className='correct'>
								<h5>Correct ✅</h5>
								<pre>{`<div className="container" onClick={handleClick}>
<input maxLength="10" />
</div>`}</pre>
							</div>
						</div>
					</div>

					<div className='rule-card'>
						<h4>4. JavaScript Reserved Words</h4>
						<p>
							Some HTML attribute names are replaced in JSX to
							avoid conflicts with JavaScript.
						</p>
						<table className='rule-table'>
							<thead>
								<tr>
									<th>HTML</th>
									<th>JSX</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>class</td>
									<td>className</td>
								</tr>
								<tr>
									<td>for</td>
									<td>htmlFor</td>
								</tr>
								<tr>
									<td>tabindex</td>
									<td>tabIndex</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>JSX Debugging Challenges</h3>
				<p className='instruction'>
					Now it's time to test your knowledge! Each challenge below
					contains JSX code with errors. Select a challenge, fix the
					errors according to the JSX rules, and check your solution.
				</p>

				<div className='jsx-challenges'>
					<div className='challenge-selector'>
						{jsxChallenges.map((challenge) => (
							<button
								key={challenge.id}
								className={`challenge-button ${
									activeChallengeId === challenge.id
										? 'active-challenge'
										: ''
								} ${
									challenge.solved ? 'solved-challenge' : ''
								}`}
								onClick={() => selectChallenge(challenge.id)}>
								{challenge.title}
								{challenge.solved && ' ✓'}
							</button>
						))}
					</div>

					{activeChallengeId ? (
						<div className='challenge-workspace'>
							<h4>
								Challenge:{' '}
								{
									jsxChallenges.find(
										(c) => c.id === activeChallengeId
									)?.title
								}
							</h4>
							<div
								className='code-editor'
								style={{ minHeight: '320px' }}>
								{fixedCode ? (
									<pre
										className='jsx-code'
										style={{
											height: '300px',
											overflowY: 'auto',
											background: '#2c3e50',
											color: '#ecf0f1',
											padding: '10px',
											borderRadius: '4px',
										}}>
										{userCode}
									</pre>
								) : (
									<textarea
										className='jsx-code-editor'
										value={userCode}
										onChange={(e) =>
											setUserCode(e.target.value)
										}
										style={{
											width: '100%',
											height: '300px',
											minHeight: '300px',
											fontFamily: 'monospace',
											padding: '10px',
											border: '1px solid #ccc',
											borderRadius: '4px',
											resize: 'none',
											whiteSpace: 'pre',
											overflowY: 'auto',
										}}
									/>
								)}
							</div>
							<div className='challenge-controls'>
								<button
									className='check-button'
									onClick={checkSolution}
									disabled={fixedCode}>
									Check Solution
								</button>
								<button
									className='solution-button'
									onClick={showSolution}
									disabled={fixedCode}>
									Show Solution
								</button>
							</div>
							{codeResult && (
								<div
									className={`result-feedback ${
										codeResult.isCorrect
											? 'success'
											: 'error'
									}`}>
									<p>{codeResult.feedback}</p>
								</div>
							)}
						</div>
					) : (
						<div className='challenge-placeholder'>
							<p>Select a challenge from above to get started!</p>
						</div>
					)}
				</div>
			</div>

			<div className='lesson-insight'>
				<h3>The Rules Lesson:</h3>
				<p>
					JSX has specific syntax rules that differ from standard HTML
					because it's ultimately converted to JavaScript.
					Understanding these rules—like requiring a single root
					element, using camelCase for attributes, and properly
					closing all tags—is essential for writing valid React
					components. These constraints ensure that your JSX can be
					correctly transformed into the function calls that React
					uses to create elements.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on the Story</h3>
				<p>
					Which JSX rule do you find most surprising or different from
					HTML?
				</p>
				<p>
					How can following these rules help prevent bugs in your
					React components?
				</p>
			</div>
		</div>
	);
};

export default ChapterThree;
