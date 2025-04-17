const ChapterThree = ({
	jsxChallenges,
	activeChallengeId,
	selectChallenge,
	userCode,
	setUserCode,
	checkSolution,
	codeResult,
	showSolution,
	fixedCode,
}) => {
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
								<textarea
									className='jsx-code-editor'
									value={userCode}
									onChange={(e) =>
										setUserCode(e.target.value)
									}
									disabled={fixedCode}
									style={{
										width: '100%',
										height: '300px',
										minHeight:
											'300px' /* Added this property */,
										fontFamily: 'monospace',
										padding: '10px',
										border: '1px solid #ccc',
										borderRadius: '4px',
										resize: 'none',
										whiteSpace: 'pre',
										overflowY: 'auto',
									}}
								/>
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
		</div>
	);
};

export default ChapterThree;
