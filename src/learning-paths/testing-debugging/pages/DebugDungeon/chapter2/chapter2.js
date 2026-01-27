import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import CodeExample from '../../../../../components/content/CodeExample';
import StorySection from '../../../../../components/content/StorySection';

const ChapterTwo = () => {
	const {
		activeDebugTool,
		activateTool,
		bugTrail,
		foundBugs,
		captureBug,
		stackTrace,
	} = useOutletContext();

	const [selectedTrace, setSelectedTrace] = useState(null);
	const [traceDepth, setTraceDepth] = useState(0);
	const [sourceMap, setSourceMap] = useState({
		'Dashboard.js:42': 'handleUserAction()',
		'utils.js:156': 'processData()',
		'api.js:89': 'fetchWithRetry()',
		'hooks.js:23': 'useAsyncData()',
	});

	const stackTraceExample = [
		{
			line: 'TypeError: Cannot read property "map" of undefined',
			file: 'UserList.js:34',
			method: 'at UserList.render',
			key: 'error',
		},
		{
			line: 'at runWithPriority (scheduler.development.js:697)',
			file: 'scheduler.development.js:697',
			method: 'React internals',
			key: 'react1',
		},
		{
			line: 'at commitRoot (react-dom.development.js:24482)',
			file: 'react-dom.development.js:24482',
			method: 'React DOM commit',
			key: 'react2',
		},
		{
			line: 'at DataProvider.fetchUsers (DataProvider.js:78)',
			file: 'DataProvider.js:78',
			method: 'Data fetching',
			key: 'app1',
		},
		{
			line: 'at async handleRefresh (Dashboard.js:42)',
			file: 'Dashboard.js:42',
			method: 'User action handler',
			key: 'app2',
		},
	];

	const navigateTrace = (trace, index) => {
		setSelectedTrace(index);
		setTraceDepth(index);
		if (trace.key.startsWith('app')) {
			captureBug({
				type: 'async-error',
				component: trace.method,
				file: trace.file,
				line: trace.line,
			});
		}
	};

	const asyncBugs = [
		{ id: 1, name: 'Unhandled Promise', status: 'pending' },
		{ id: 2, name: 'Stale Closure', status: 'active' },
		{ id: 3, name: 'Memory Leak', status: 'growing' },
	];

	return (
		<div className='chapter'>
			<ChapterIntro
				chapterNumber={2}
				title={`The Stack Trace Labyrinth`}
				bridge={`The party navigated through a labyrinth of stack traces. The walls were covered in glowing error messages, each one a path leading deeper into the code. "Each line tells you where you've been," Logsworth pointed with his staff, "leading back to the bug's origin. But beware - some traces are red herrings."`}
			/>

			<StorySection
				paragraphs={[
					`The party navigated through a labyrinth of stack traces. The walls were covered in glowing error messages, each one a path leading deeper into the code.`,
					`Logsworth pointed to the traces with his staff. "Each line tells you where you've been, leading back to the bug's origin. But beware - some traces are red herrings, showing symptoms rather than causes."`,
					<>
						<strong>Binary</strong> projected holographic stack
						traces in the air, highlighting the path through each
						error. "I can differentiate between framework code and
						your application code," he announced, color-coding the
						traces.
					</>,
					`Debuggora perched on a floating error message, translating: "This cryptic 'Cannot read property of undefined' actually means your async data hasn't loaded yet. The real bug is three levels up!"`,
				]}
			/>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Navigate the Stack Trace Labyrinth
				</h3>

				<div className='stack-trace-labyrinth'>
					<h4>Current Stack Trace</h4>
					{stackTraceExample.map((trace, index) => (
						<div
							key={trace.key}
							className={`trace-line ${selectedTrace === index ? 'highlighted' : ''} ${trace.key.startsWith('app') ? 'app-code' : ''}`}
							onClick={() => navigateTrace(trace, index)}>
							<div className='trace-content'>
								<span className='trace-error'>
									{trace.line}
								</span>
								<span className='trace-location'>
									{trace.file}
								</span>
								<span className='trace-method'>
									{trace.method}
								</span>
							</div>
							{index < stackTraceExample.length - 1 && (
								<div className='trace-connector'>↓</div>
							)}
						</div>
					))}
				</div>

				{selectedTrace !== null && (
					<div className='source-map-nav'>
						<h4>Source Map Navigation</h4>
						<p>Current depth: {traceDepth} levels deep</p>
						{Object.entries(sourceMap).map(([location, method]) => (
							<div key={location} className='source-file'>
								<span className='file-path'>
									{location.split(':')[0]}
								</span>
								<span className='line-number'>
									:{location.split(':')[1]}
								</span>
								<span className='method-name'> - {method}</span>
							</div>
						))}
					</div>
				)}

				<div className='async-debugging'>
					<h4>Async Bug Patterns</h4>
					<div className='async-bug-list'>
						{asyncBugs.map((bug) => (
							<div key={bug.id} className='async-bug-card'>
								<h5>{bug.name}</h5>
								<div className='bug-status'>
									Status: {bug.status}
								</div>
								<div className='bug-indicator'>
									{bug.status === 'pending' && '⏳'}
									{bug.status === 'active' && '🔥'}
									{bug.status === 'growing' && '📈'}
								</div>
							</div>
						))}
					</div>
				</div>

				<div className='debuggora-insights'>
					<h4>Pattern Recognition</h4>
					<div className='insight-message'>
						"Notice how the error occurs in UserList, but the root
						cause is in DataProvider? This is the essence of stack
						trace reading - follow the breadcrumbs backward to find
						where things first went wrong."
					</div>
				</div>
			</div>

			<div className='code-section'>
				<div className='code-header'>
					<span className='code-title'>
						Advanced Stack Trace Analysis
					</span>
					<div className='code-actions'>
						<button onClick={() => activateTool('devtools')}>
							Analyze Stack
						</button>
					</div>
				</div>
				<CodeExample
					title={`Advanced Stack Trace Analysis`}
					discoveredBy={`Transcribed by Aria`}
					code={`// Source Map Navigation
// Enable source maps in production for better debugging
// webpack.config.js
module.exports = {
  devtool: 'source-map', // Full source maps
  // or 'hidden-source-map' for production
};

// Async Debugging Patterns
// 1. The Unhandled Promise Bug
const fetchUserData = async (userId) => {
  try {
    const response = await api.get(\`/users/\${userId}\`);
    return response.data;
  } catch (error) {
    // BUG: Error not properly propagated
    console.error('Fetch failed:', error);
    // Should: throw error; or return null;
  }
};

// 2. The Stale Closure Bug
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    // BUG: Closure captures initial userId
    const timer = setTimeout(() => {
      // This might use old userId if prop changed!
      fetchUserData(userId).then(setUser);
    }, 1000);
    
    return () => clearTimeout(timer);
    // Missing dependency: userId
  }, []); // Should be: }, [userId]);
}

// 3. The Memory Leak Pattern
function LiveDataFeed() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    // BUG: Subscription not cleaned up
    const subscription = dataService.subscribe(newData => {
      setData(prev => [...prev, newData]); // Also grows infinitely!
    });
    
    // Missing: return () => subscription.unsubscribe();
  }, []);
}

// Stack Trace Enhancement
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    // Enhance stack trace with component tree
    const enhancedError = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      props: this.props,
      state: this.state,
      timestamp: new Date().toISOString()
    };
    
    // Log to monitoring service
    errorReporter.log(enhancedError);
  }
}

// Custom Stack Trace Parser
function parseStackTrace(stack) {
  const lines = stack.split('\\n');
  return lines.map(line => {
    const match = line.match(/at (.*) \\((.*?):(\\d+):(\\d+)\\)/);
    if (match) {
      return {
        method: match[1],
        file: match[2],
        line: match[3],
        column: match[4],
        isAppCode: !match[2].includes('node_modules')
      };
    }
    return { raw: line };
  }).filter(item => item.isAppCode);
}`}
				/>
				<div className='code-tooltip'>
					<strong>Binary's Analysis:</strong> "I've highlighted your
					application code in blue and framework code in gray. Focus
					on the blue lines - that's where your bugs live. The gray
					lines just show how you got there."
				</div>
			</div>

			<ChapterSummary
				lessonInsight={{
					title: `The Stack Trace Navigation Lesson:`,
					content: (
						<>
							<p>
								Stack traces are like breadcrumb trails through
								your code. Each line shows a function call,
								building a path from where the error was thrown
								back to where it originated. The art is learning
								which breadcrumbs matter and which are just
								noise.
							</p>
							<p>
								Three critical skills: First, distinguish your
								code from framework code. Second, identify the
								actual error versus its symptoms. Third,
								understand async stack traces, where cause and
								effect may be separated by time and multiple
								event loops.
							</p>
						</>
					),
				}}
				reflectionQuestions={[
					`Why are async bugs harder to trace? Consider how JavaScript's event loop breaks the direct connection between cause and effect. An error in a promise might only surface when the promise resolves, far from where the problem began.`,
					`How do source maps change debugging? Think about the transformation from minified production code to readable source code. Source maps are the bridge that lets you debug the code you wrote, not the code that runs.`,
				]}
				journalEntry={{
					title: `Aria's Journal - Day 30 (Afternoon)`,
					content: `The Stack Trace Labyrinth! Walls covered in glowing error messages, each a path leading deeper into the code. Binary projected holographic traces, color-coding framework code (grey) from my application code (blue). Debuggora translated: "This 'Cannot read property of undefined' means async data hasn't loaded - the real bug is three levels up!" I learned three async bug patterns: Unhandled Promises (missing .catch()), Stale Closures (capturing old values), and Memory Leaks (subscriptions not cleaned up). Source maps are crucial - enable 'source-map' in webpack to debug readable code. The art: distinguishing symptoms from root causes!`,
				}}
			/>
		</div>
	);
};

export default ChapterTwo;
