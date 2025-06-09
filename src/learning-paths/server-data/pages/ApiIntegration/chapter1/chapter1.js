import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

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
			<h2 className='chapter-title'>Chapter 1: The Cloud Citadel Beckons</h2>

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
				<p className='instruction'>
					<strong>👉 Explore the Cloud Citadel's data streams and practice making your first API request!</strong>
					Hover over the data streams to see different formats, then use the request builder to communicate with the server.
				</p>
				
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

			<div className='character-intro'>
				<h4>Cloud Keeper Axios</h4>
				<p>
					Master of server communication and guardian of the Cloud Citadel. 
					Their wisdom: "Server communication is like diplomatic correspondence - 
					you must speak the right language, follow protocols, and handle delays 
					gracefully. Patience and error handling are as important as the request 
					itself."
				</p>
			</div>

			<div className='code-example'>
				<div className='scroll-header'>
					<span>Cloud Communication Spells</span>
					<span className='discovered-by'>Discovered by Aria in the Cloud Citadel</span>
				</div>
				<pre>
{`// Basic Fetch Spell - Speaking with the Cloud Citadel
async function fetchKingdomData() {
  try {
    // Sending a diplomatic request to the server
    const response = await fetch('/api/kingdoms/react');
    
    // Check if the server responded favorably
    if (!response.ok) {
      throw new Error(\`Server declined: \${response.status}\`);
    }
    
    // Parse the server's response
    const data = await response.json();
    console.log('Kingdom data received:', data);
    return data;
    
  } catch (error) {
    console.error('Communication failed:', error);
    // Handle the error gracefully
  }
}

// Async/Await Pattern - Patient Communication
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
  
  return (
    <div>
      <h2>Kingdom Status</h2>
      {/* Display kingdom data */}
    </div>
  );
}`}
				</pre>
			</div>

			<div className='lesson-insight'>
				<h3>The API Lesson:</h3>
				<p>
					Server communication is like diplomatic correspondence - you must speak 
					the right language, follow protocols, and handle delays gracefully. 
					Cloud Keeper Axios teaches that patience and error handling are as 
					important as the request itself.
				</p>
				<p>
					Every API request involves multiple states: loading, success, and error. 
					Managing these states properly creates a smooth user experience even 
					when the network is unpredictable. The key is to always expect the 
					unexpected.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on Server Communication</h3>
				<p>
					<strong>How does thinking of APIs as "diplomatic correspondence" help 
					understand async communication?</strong> Consider how protocols, 
					patience, and proper etiquette apply to both diplomacy and API requests.
				</p>
				<p>
					<strong>Why is error handling crucial when dealing with external data 
					sources?</strong> Think about all the ways a network request can fail 
					and how your app should respond to each scenario.
				</p>
			</div>

			<div className='chapter-ending'>
				<p>
					Cloud Keeper Axios gestured to the flowing data streams. "You've taken 
					your first steps into server communication, Ambassador Aria. You 
					understand the basics of speaking with distant servers."
				</p>
				<p>
					<strong>Aria</strong> watched the data flow between client and server. 
					"It's like extending React's reach beyond its borders."
				</p>
				<p>
					<strong>Binary</strong> processed the new protocols. "So many ways to 
					communicate! GET, POST, PUT, DELETE - each with its purpose."
				</p>
				<p>
					"Come," said Axios, "let's explore the Protocol Chambers. There you'll 
					learn advanced patterns for robust server communication..."
				</p>
			</div>
		</div>
	);
};

export default ChapterOne;