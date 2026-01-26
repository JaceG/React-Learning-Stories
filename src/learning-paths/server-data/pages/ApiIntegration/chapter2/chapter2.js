import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';

const ChapterTwo = () => {
	const {
		selectedMethod,
		setSelectedMethod,
		headers,
		setHeaders,
		selectedProtocol,
		setSelectedProtocol,
		interceptors,
		addInterceptor,
		makeRequest
	} = useOutletContext();

	const [showHeaderForm, setShowHeaderForm] = useState(false);
	const [headerKey, setHeaderKey] = useState('');
	const [headerValue, setHeaderValue] = useState('');
	const [selectedAuthMethod, setSelectedAuthMethod] = useState('bearer');

	const protocols = [
		{ id: 'REST', icon: '🌐', name: 'REST', description: 'Resource-based architecture' },
		{ id: 'GraphQL', icon: '🔮', name: 'GraphQL', description: 'Query language for APIs' },
		{ id: 'WebSocket', icon: '🔌', name: 'WebSocket', description: 'Real-time bidirectional' }
	];

	const authMethods = [
		{ id: 'bearer', name: 'Bearer Token', icon: '🔑' },
		{ id: 'apikey', name: 'API Key', icon: '🗝️' },
		{ id: 'basic', name: 'Basic Auth', icon: '🔐' },
		{ id: 'oauth', name: 'OAuth 2.0', icon: '🔒' }
	];

	const addHeader = () => {
		if (headerKey && headerValue) {
			setHeaders({ ...headers, [headerKey]: headerValue });
			setHeaderKey('');
			setHeaderValue('');
		}
	};

	const removeHeader = (key) => {
		const newHeaders = { ...headers };
		delete newHeaders[key];
		setHeaders(newHeaders);
	};

	return (
		<div className='chapter'>
			<ChapterIntro
				chapterNumber={2}
				title={`The Protocol Chambers`}
				bridge={`Cloud Keeper Axios led them deeper into the Cloud Citadel, where the Protocol Chambers awaited. Each chamber glowed with a different hue, representing the various ways to communicate with distant servers. "You've learned to speak with servers," Axios explained. "Now you'll learn the different languages they understand."`}
			/>

			<div className='story-section'>
				<p className='story-paragraph'>
					<strong>Cloud Keeper Axios</strong> led them through the Protocol 
					Chambers. "Each room represents a different way to communicate: REST, 
					GraphQL, WebSockets. Each has its own customs."
				</p>

				<p className='story-paragraph'>
					In the REST room, Aria learned the verbs: "GET for reading, POST for 
					creating, PUT for updating, DELETE for removing. Like diplomatic 
					actions!"
				</p>

				<p className='story-paragraph'>
					"And headers?" Aria asked, remembering her navigation training.
				</p>

				<p className='story-paragraph'>
					"Ah yes, the credentials and metadata. Authentication tokens, content 
					types - the formal dress code of API communication."
				</p>

				<p className='story-paragraph'>
					<strong>Binary</strong> analyzed the patterns. "Each protocol optimizes 
					for different needs. REST for simplicity, GraphQL for flexibility, 
					WebSockets for real-time!"
				</p>

				<p className='story-paragraph'>
					<strong>Debuggora</strong> warned, "But each protocol can fail in 
					unique ways. Proper error handling is your shield against chaos."
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>Protocol Chambers</h3>
				
				<InstructionBox character={`Axios opens the doors to each Protocol Chamber.`}>
					Choose your communication protocol and configure your diplomatic credentials.
					Each protocol has its own customs and requirements. Select one to begin your training!
				</InstructionBox>
				
				<div className='protocol-chambers'>
					{protocols.map(protocol => (
						<div
							key={protocol.id}
							className={`protocol-room ${selectedProtocol === protocol.id ? 'active' : ''}`}
							onClick={() => setSelectedProtocol(protocol.id)}>
							<div className='protocol-icon'>{protocol.icon}</div>
							<div className='protocol-name'>{protocol.name}</div>
							<div className='protocol-description'>{protocol.description}</div>
						</div>
					))}
				</div>

				<h3 className='section-title'>Headers Workshop</h3>
				<div className='headers-workshop'>
					<p>Configure the formal dress code of your API requests:</p>
					
					<div className='header-list'>
						{Object.entries(headers).map(([key, value]) => (
							<div key={key} className='header-entry'>
								<span>{key}</span>
								<span>{value}</span>
								<button 
									className='remove-header-button'
									onClick={() => removeHeader(key)}>
									Remove
								</button>
							</div>
						))}
					</div>

					{showHeaderForm ? (
						<div className='header-entry'>
							<input
								type='text'
								className='header-input'
								placeholder='Header Key'
								value={headerKey}
								onChange={(e) => setHeaderKey(e.target.value)}
							/>
							<input
								type='text'
								className='header-input'
								placeholder='Header Value'
								value={headerValue}
								onChange={(e) => setHeaderValue(e.target.value)}
							/>
							<button className='add-header-button' onClick={addHeader}>
								Add
							</button>
						</div>
					) : (
						<button 
							className='add-header-button'
							onClick={() => setShowHeaderForm(true)}>
							+ Add Header
						</button>
					)}
				</div>

				<h3 className='section-title'>Authentication Strategies</h3>
				<div className='auth-methods'>
					{authMethods.map(method => (
						<div
							key={method.id}
							className={`auth-badge ${selectedAuthMethod === method.id ? 'active' : ''}`}
							onClick={() => setSelectedAuthMethod(method.id)}>
							{method.icon} {method.name}
						</div>
					))}
				</div>

				<h3 className='section-title'>Interceptor Chain</h3>
				<div className='interceptor-chain'>
					<div className='interceptor-node'>
						<strong>Request</strong>
						<div>Add Auth Token</div>
					</div>
					<div className='interceptor-node'>
						<strong>Transform</strong>
						<div>Format Data</div>
					</div>
					<div className='interceptor-node'>
						<strong>Response</strong>
						<div>Parse Result</div>
					</div>
					<div className='interceptor-node'>
						<strong>Error</strong>
						<div>Handle Failures</div>
					</div>
				</div>
			</div>

			<CodeExample
				title={`Advanced Protocol Patterns`}
				discoveredBy={`Inscribed by Aria in the Protocol Chambers`}
				code={`// Custom Hook - The Ambassador's Tool
function useApiData(endpoint) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchData() {
      try {
        const response = await fetch(endpoint, {
          signal: controller.signal,
          headers: { 'Authorization': 'Bearer ' + getAuthToken() }
        });
        if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
        setData(await response.json());
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message);
      } finally { setLoading(false); }
    }
    fetchData();
    return () => controller.abort(); // Cleanup
  }, [endpoint]);
  return { data, loading, error };
}

// Request Interceptors - Add auth to all requests
class ApiClient {
  addAuthInterceptor() {
    this.interceptors.request.push(async (config) => {
      config.headers.Authorization = \`Bearer \${await getAuthToken()}\`;
      return config;
    });
  }
}`}
			/>

			<ChapterSummary
				lessonInsight={{
					title: `The Protocol Insight:`,
					content: `Each communication protocol serves different needs. REST provides simplicity, GraphQL offers flexibility, WebSockets enable real-time communication. Beyond protocols, robust API integration requires handling errors gracefully, managing authentication securely, and optimizing with interceptors and caching.`
				}}
				reflectionQuestions={[
					`How do different protocols affect application architecture?`,
					`Why is error handling more complex in distributed systems?`
				]}
				journalEntry={{
					title: `Aria's Journal - Day 41 (Afternoon)`,
					content: `The Protocol Chambers are fascinating! Each room glows with different light - REST (🌐), GraphQL (🔮), WebSockets (🔌). I learned that each protocol has its own customs: REST for resource-based APIs, GraphQL for flexible queries, WebSockets for real-time. Created my first interceptor chain: request → transform → response → error. Binary analyzed: "Interceptors handle cross-cutting concerns elegantly!" Debuggora reminded us: "Each protocol can fail uniquely - proper error handling is your shield." Headers are like diplomatic credentials - authentication tokens, content types.`
				}}
			/>
		</div>
	);
};

export default ChapterTwo;