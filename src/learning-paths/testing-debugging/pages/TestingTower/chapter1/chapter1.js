import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';

const ChapterOne = () => {
	const {
		runTest,
		testResults,
		bugsCaught,
		testCoverage,
		detectBug
	} = useOutletContext();

	const [visibleBugs, setVisibleBugs] = useState([]);
	const [debuggoraVision, setDebuggoraVision] = useState(false);
	const [selectedBug, setSelectedBug] = useState(null);

	// Generate initial bugs
	useEffect(() => {
		const bugs = [];
		for (let i = 0; i < 5; i++) {
			const bug = detectBug();
			bugs.push({
				id: i,
				...bug,
				position: {
					top: Math.random() * 250 + 20,
					left: Math.random() * 80 + 10
				},
				icon: bug.type === 'null-pointer' ? '🐛' : bug.type === 'type-error' ? '🦗' : '🕷️'
			});
		}
		setVisibleBugs(bugs);
	}, [detectBug]);

	const catchBug = (bugId) => {
		setVisibleBugs(visibleBugs.map(bug => 
			bug.id === bugId ? { ...bug, caught: true } : bug
		));
		runTest(`Bug ${bugId} Test`);
		setSelectedBug(visibleBugs.find(b => b.id === bugId));
	};

	return (
		<div className='chapter'>
			<ChapterIntro
				chapterNumber={1}
				title={`The Bug Manifestation`}
			/>

			<div className='story-section'>
				<p className='story-paragraph'>
					The optimized kingdom ran swiftly, but strange reports emerged. Components 
					behaved unexpectedly, features broke without warning, and worst of all - 
					bugs had begun manifesting as actual creatures throughout the realm.
				</p>

				<p className='story-paragraph'>
					<strong>Aria</strong> descended into the Underground Realms, where the Testing 
					Tower stood as the first line of defense. At its peak, <strong>Test Master 
					Jasmine</strong> awaited with her companion, <strong>Debuggora</strong>, a wise 
					owl with the ability to see through code to its true behavior.
				</p>

				<p className='story-paragraph'>
					"Guide Aria," Jasmine greeted solemnly, "the bugs multiply faster than we can 
					catch them manually. We need systematic testing - preventive magic rather than 
					reactive fixes."
				</p>

				<p className='story-paragraph'>
					Debuggora hooted, her eyes glowing as she spotted a bug skittering across the 
					floor. "That one's a null pointer exception," she observed. "Born from an 
					untested edge case."
				</p>

			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>Bug Hunter Training Ground</h3>
				
				<InstructionBox character={`Debuggora guides you through the Bug Hunter Training Ground.`}>
					{`Help Aria catch the manifested bugs! Click on each bug creature to write a test that captures it. Watch as your test coverage grows with each successful catch.`}
				</InstructionBox>

				<div className='bug-hunter-ground'>
					{visibleBugs.map(bug => (
						<div
							key={bug.id}
							className={`bug-creature bug-type-${bug.type} ${bug.caught ? 'caught' : ''}`}
							style={{
								top: `${bug.position.top}px`,
								left: `${bug.position.left}%`
							}}
							onClick={() => !bug.caught && catchBug(bug.id)}>
							{bug.icon}
						</div>
					))}
				</div>

				<div className='test-stats'>
					<div className='stat-card'>
						<div className='stat-icon'>🐛</div>
						<div className='stat-value'>{bugsCaught}</div>
						<div className='stat-label'>Bugs Caught</div>
					</div>
					<div className='stat-card'>
						<div className='stat-icon'>🧪</div>
						<div className='stat-value'>{testResults.length}</div>
						<div className='stat-label'>Tests Written</div>
					</div>
					<div className='stat-card'>
						<div className='stat-icon'>🛡️</div>
						<div className='stat-value'>{testCoverage}%</div>
						<div className='stat-label'>Coverage</div>
					</div>
				</div>

				{selectedBug && (
					<div className='test-incantation'>
						<div className='incantation-type'>
							{selectedBug.type.replace('-', ' ').toUpperCase()} TEST
						</div>
						<p>
							<strong>Bug Type:</strong> {selectedBug.type}<br />
							<strong>Severity:</strong> {selectedBug.severity}<br />
							<strong>Test Status:</strong> Protection spell activated!
						</p>
					</div>
				)}

				<div className='debuggora-vision'>
					<h4>Debuggora's Vision</h4>
					<p>Toggle Debuggora's special sight to see the code through her eyes:</p>
					<button 
						className='vision-toggle'
						onClick={() => setDebuggoraVision(!debuggoraVision)}>
						{debuggoraVision ? 'Disable' : 'Enable'} Vision
					</button>
					{debuggoraVision && (
						<div className='vision-active'>
							{`// Debuggora sees untested code paths:
function handleUserInput(value) {
  if (value === null) { // 🐛 Uncaught TypeError!
    return value.toString();
  }
  if (typeof value !== 'string') { // 🦗 Type coercion bug!
    return value + '';
  }
  return value; // 🕷️ Logic error: no validation!
}`}
						</div>
					)}
				</div>
			</div>

			<div className='code-section'>
				<div className='code-header'>
					<span className='code-title'>Ancient Scroll of Testing</span>
					<div className='code-actions'>
						<button onClick={() => runTest('Basic Component Test')}>Run Test</button>
					</div>
				</div>
				<CodeExample
					title={`The First Testing Incantation`}
					discoveredBy={`Transcribed by Aria`}
					code={`// The First Testing Incantation
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// Test spell to catch null pointer bugs
test('component handles null props gracefully', () => {
  render(<UserProfile user={null} />);
  
  // Debuggora's wisdom: Always check for edge cases
  expect(screen.getByText(/no user data/i)).toBeInTheDocument();
});

// Test spell to prevent type errors
test('validates input types before processing', () => {
  const { getByRole } = render(<DataInput />);
  const input = getByRole('textbox');
  
  // Jasmine's technique: Simulate real user behavior
  fireEvent.change(input, { target: { value: '123' } });
  expect(input.value).toBe('123');
});`}
				/>
				<div className='code-tooltip'>
					<strong>Master Jasmine explains:</strong> "Each test is a protective ward. The 
					more tests you write, the stronger your defenses become. Start with the most 
					critical paths - where bugs cause the most damage."
				</div>
			</div>

			{testResults.length > 0 && (
				<div className='test-results-panel'>
					<h4>Test Execution Results</h4>
					{testResults.map((result, index) => (
						<div key={index} className={`test-result ${result.status}`}>
							<span className='test-name'>{result.name}</span>
							<span className='test-time'>{result.time}ms</span>
						</div>
					))}
				</div>
			)}

			<ChapterSummary
				characterIntros={[
					{
						name: `Test Master Jasmine`,
						description: `Guardian of the Testing Tower and master of preventive magic. She believes that every bug caught before production is a victory for the kingdom. Her testing philosophy: "A test written today saves ten bugs tomorrow."`
					},
					{
						name: `Debuggora the Owl`,
						description: `A mystical owl with the power to see code's true behavior. Her keen eyes can spot bugs hiding in the shadows of untested code. She speaks in riddles but her insights are always valuable.`
					}
				]}
				lessonInsight={{
					title: `The Testing Lesson:`,
					content: (
						<>
							<p>
								Testing isn't about proving your code works - it's about proving it continues 
								to work as you change it. Test Master Jasmine teaches that every test is a 
								guardian spell, protecting against future bugs. The Testing Tower stands not 
								to catch bugs after they appear, but to prevent them from manifesting at all.
							</p>
							<p>
								Remember: A bug caught in testing costs minutes to fix. A bug caught in 
								production costs hours, days, or even your users' trust. Choose your battles 
								wisely by testing early and often.
							</p>
						</>
					)
				}}
				reflectionQuestions={[
					`How does visualizing bugs as creatures help understand the importance of testing? Consider how each bug type represents a different kind of error that can creep into your code without proper testing coverage.`,
					`Why is preventive testing more powerful than reactive debugging? Think about the cost of finding and fixing bugs at different stages of development. How does systematic testing change your development workflow?`
				]}
				journalEntry={{
					title: `Aria's Journal - Day 29 (Morning)`,
					content: `The optimized kingdom faces a new threat - bugs have begun manifesting as actual creatures! I descended into the Underground Realms where Test Master Jasmine guards the Testing Tower. Her companion Debuggora, a mystical owl, can see code's true behavior. I learned to identify bug types: null-pointer bugs (🐛), type-error bugs (🦗), and logic-error bugs (🕷️). Debuggora's vision revealed untested code paths glowing with potential bugs! Jasmine's wisdom: "Testing isn't about proving your code works - it's about proving it continues to work as you change it." A bug caught in testing costs minutes; in production, it costs trust.`
				}}
				chapterEnding={[
					`As Aria mastered the art of bug detection, Jasmine smiled. "You've learned to see the bugs, but catching them one by one isn't enough. Tomorrow, I'll teach you the three levels of testing spells - each more powerful than the last..."`
				]}
			/>
		</div>
	);
};

export default ChapterOne;