import { useState } from 'react';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import StorySection from '../../../../../components/content/StorySection';

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
		<ChapterIntro
			chapterNumber={3}
			title='The Rules of the Scrolls'
			bridge="As the afternoon sun cast long shadows through the academy's stained glass windows, Professor Syntaxis led Aria to the Hall of Sacred Rules, where ancient tablets glowed with ethereal light."
		/>

		<StorySection
			paragraphs={[
				`"Every magical language has its laws," Syntaxis explained, gesturing to the tablets. "JSX may seem flexible, but it demands strict adherence to certain rules. Break them, and your spells will fail."`,
				`Binary zipped around the tablets, illuminating each rule as he passed. "I've seen many apprentices struggle with these!" the sprite warned. "But once you understand why each rule exists, they become second nature."`,
				`Aria pulled out her journal, ready to document these sacred laws. "I'm ready to learn, Professor. Show me what pitfalls to avoid."`
			]}
		/>

			<div className='interactive-section'>
				<h3 className='section-title'>The JSX Rulebook</h3>
				<InstructionBox character="Professor Syntaxis presents the Sacred Rules of JSX.">
					Study each rule carefully - these are the foundations of writing valid JSX code.
				</InstructionBox>

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
				<h3 className='section-title'>Interactive Exercise: The Debugging Trials</h3>
				<InstructionBox character="Professor Syntaxis presents you with broken scrolls.">
					"These scrolls contain JSX spells with errors. Can you fix them 
					according to the sacred rules? Binary will check your work!"
				</InstructionBox>

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

			<ChapterSummary
				lessonInsight={{
					title: 'The Rules Lesson:',
					content:
						'JSX has specific syntax rules that differ from standard HTML because it\'s ultimately converted to JavaScript. Understanding these rules—like requiring a single root element, using camelCase for attributes, and properly closing all tags—is essential for writing valid React components. These constraints ensure that your JSX can be correctly transformed into the function calls that React uses to create elements. As Binary says: "Rules aren\'t limitations - they\'re guardrails for success!"',
				}}
				reflectionQuestions={[
					'How do the glowing tablets metaphor help you remember the importance of JSX rules?',
					'Which of the three main rules (single root, closed tags, camelCase) do you think causes the most confusion for beginners?',
				]}
				journalEntry={{
					title: "Aria's Journal - Day 6 (Evening)",
					content:
						"What a day at the JSX Magic Academy! I feel like I've learned a whole new language. JSX seemed strange at first - mixing HTML with JavaScript - but now I see its elegance. The rules make sense when you understand that everything becomes JavaScript in the end. I can't wait to see what the Lifecycle Sanctum holds tomorrow!",
				}}
				chapterEnding={[
					'As the sun set over the JSX Magic Academy, Aria closed her journal, her mind buzzing with new knowledge. She had learned the ancient language of JSX, discovered how to embed dynamic expressions, and mastered the sacred rules.',
					'"You\'ve done well, young apprentice," Professor Syntaxis said proudly. "You now possess the knowledge to write powerful component spells. But remember - JSX is just the beginning. Tomorrow, you\'ll journey to the Lifecycle Sanctum to learn how components live, update, and eventually fade away."',
					'Binary gave Aria a tiny high-five. "You\'re going to love the Lifecycle Chronicles! The Time Keepers there are amazing!"',
				]}
			/>
		</div>
	);
};

export default ChapterThree;
