import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';

const ChapterOne = () => {
	const {
		selectedMethod,
		setSelectedMethod,
		apiResponse,
		isLoading,
		error,
		makeRequest
	} = useOutletContext();

	const [endpoint, setEndpoint] = useState('/api/kingdoms/react');
	const [hoveredStream, setHoveredStream] = useState(null);

	const dataStreams = [
		{ id: 'json', icon: '📋', name: 'JSON' },
		{ id: 'xml', icon: '📜', name: 'XML' },
		{ id: 'graphql', icon: '🔮', name: 'GraphQL' }
	];

	const handleSendRequest = () => {
		makeRequest(endpoint, { method: selectedMethod });
	};

	return (
		<div className='chapter'>
			<ChapterIntro
				chapterNumber={1}
				title={`The Cloud Citadel Beckons`}
			/>

			<div className='story-section'>
				<p className='story-paragraph'>
					The morning mist parted to reveal the Cloud Citadel - a massive 
					structure floating above the React Kingdom, connected by ethereal 
					data streams. Master Aurelius stood beside Aria on the observation deck.
				</p>

				<p className='story-paragraph'>
					"Ambassador Aria," he began, using her new title with pride, "you've 
					mastered client-side React. But modern applications need data from 
					beyond our borders. The Cloud Citadel holds the keys to server 
					communication."
				</p>

				<p className='story-paragraph'>
					As they approached via sky bridge, <strong>Cloud Keeper Axios</strong> 
					greeted them. "Welcome! Here, we bridge the gap between earth and sky, 
					client and server. Your first lesson: speaking with distant servers."
				</p>

				<p className='story-paragraph'>
					<strong>Binary's</strong> circuits adapted, growing new communication 
					modules. "I'm detecting multiple data streams, Aria. JSON, XML, 
					GraphQL... each has its own patterns!"
				</p>

				<p className='story-paragraph'>
					<strong>Debuggora</strong>, now a permanent companion, observed: "And 
					each stream has its own patterns, protocols, and pitfalls. Timing and 
					error handling will be crucial."
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>The Cloud Citadel</h3>
				
				<InstructionBox character={`Cloud Keeper Axios gestures to the flowing data streams.`}>
					Explore the Cloud Citadel's data streams and practice making your first API request!
					Hover over the data streams to see different formats, then use the request builder to communicate with the server.
				</InstructionBox>
				
				<div className='cloud-citadel-illustration'>
					<div className='citadel'>
						<div className='citadel-clouds'>
							<span style={{ fontSize: '1.5em' }}>☁️ Cloud Citadel ☁️</span>
						</div>
						<div className='citadel-tower'>
							<div>API Gateway</div>
							<div style={{ fontSize: '0.8em', marginTop: '10px' }}>
								Server Communication Hub
							</div>
						</div>
						<div className='citadel-bridge'>
							{dataStreams.map(stream => (
								<div
									key={stream.id}
									className={`data-stream ${hoveredStream === stream.id ? 'active' : ''}`}
									onMouseEnter={() => setHoveredStream(stream.id)}
									onMouseLeave={() => setHoveredStream(null)}
									title={stream.name}>
									{stream.icon}
								</div>
							))}
						</div>
					</div>
				</div>

				<h3 className='section-title'>API Request Builder</h3>
				<div className='api-request-builder'>
					<div className='request-controls'>
						<div>
							<label>Method:</label>
							<div className='method-selector'>
								{['GET', 'POST', 'PUT', 'DELETE'].map(method => (
									<button
										key={method}
										className={`method-button ${method} ${selectedMethod === method ? 'active' : ''}`}
										onClick={() => setSelectedMethod(method)}>
										{method}
									</button>
								))}
							</div>
						</div>
						
						<div>
							<label>Endpoint:</label>
							<input
								type='text'
								className='endpoint-input'
								value={endpoint}
								onChange={(e) => setEndpoint(e.target.value)}
								placeholder='/api/kingdoms/react'
							/>
						</div>
					</div>

					<button
						className='send-request-button'
						onClick={handleSendRequest}
						disabled={isLoading}>
						{isLoading ? (
							<>
								<span className='loading-spinner'></span>
								Connecting to Citadel...
							</>
						) : (
							'Send Request to Cloud Citadel'
						)}
					</button>

					{error && (
						<div className='error-display'>
							<strong>Connection Failed:</strong> {error}
						</div>
					)}

					{apiResponse && (
						<div className='response-display'>
							<div className='response-header'>
								<span className={`status-code ${apiResponse.status === 200 ? 'success' : 'error'}`}>
									Status: {apiResponse.status}
								</span>
								<span>Format: JSON</span>
							</div>
							<div className='response-body'>
								{JSON.stringify(apiResponse.data, null, 2)}
							</div>
						</div>
					)}
				</div>
			</div>

			<CodeExample
				title={`Cloud Communication Spells`}
				discoveredBy={`Discovered by Aria in the Cloud Citadel`}
				code={`// Basic Fetch Spell - Speaking with the Cloud Citadel
async function fetchKingdomData() {
  try {
    const response = await fetch('/api/kingdoms/react');
    if (!response.ok) throw new Error(\`Server declined: \${response.status}\`);
    return await response.json();
  } catch (error) {
    console.error('Communication failed:', error);
  }
}

// React Component - Patient Communication
function KingdomDashboard() {
  const [kingdomData, setKingdomData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const data = await fetchKingdomData();
        setKingdomData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) return <div>Connecting to Cloud Citadel...</div>;
  if (error) return <div>Connection failed: {error}</div>;
  return <div><h2>Kingdom Status</h2></div>;
}`}
			/>

			<ChapterSummary
				characterIntros={[
					{
						name: `Cloud Keeper Axios`,
						description: `Master of server communication and guardian of the Cloud Citadel. Their wisdom: "Server communication is like diplomatic correspondence - you must speak the right language, follow protocols, and handle delays gracefully."`
					}
				]}
				lessonInsight={{
					title: `The API Lesson:`,
					content: `Server communication is like diplomatic correspondence - you must speak the right language, follow protocols, and handle delays gracefully. Every API request involves multiple states: loading, success, and error. Managing these states properly creates a smooth user experience even when the network is unpredictable.`
				}}
				reflectionQuestions={[
					`How does thinking of APIs as "diplomatic correspondence" help understand async communication?`,
					`Why is error handling crucial when dealing with external data sources?`
				]}
				journalEntry={{
					title: `Aria's Journal - Day 41 (Morning)`,
					content: `The Cloud Citadel floats majestically above the React Kingdom! Cloud Keeper Axios welcomed us and taught the fundamentals of server communication. I learned the fetch API - it's like sending diplomatic correspondence to distant servers. Key insight: every request has three states (loading, success, error) and handling them properly is crucial. Binary grew new communication modules detecting JSON, XML, and GraphQL streams. Axios's wisdom: "Patience and error handling are as important as the request itself." Made my first successful API call - Status 200!`
				}}
			/>
		</div>
	);
};

export default ChapterOne;