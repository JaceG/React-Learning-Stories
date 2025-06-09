import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

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
			<h2 className='chapter-title'>Chapter 2: The Protocol Chambers</h2>

			<div className='chapter-bridge'>
				<p>Axios led them deeper into the Cloud Citadel, where the Protocol 
				Chambers awaited. Each chamber glowed with a different hue, representing 
				the various ways to communicate with distant servers.</p>
			</div>

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
				<p className='instruction'>
					<strong>👉 Choose your communication protocol and configure your diplomatic credentials.</strong>
					Each protocol has its own customs and requirements. Select one to begin your training!
				</p>
				
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

			<div className='code-example'>
				<div className='scroll-header'>
					<span>Advanced Protocol Patterns</span>
					<span className='discovered-by'>Inscribed by Aria in the Protocol Chambers</span>
				</div>
				<pre>
{`// Custom Hook for Data Fetching - The Ambassador's Tool
function useApiData(endpoint) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(endpoint, {
          signal: controller.signal,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getAuthToken()
          }
        });
        
        if (!response.ok) {
          throw new Error(\`HTTP \${response.status}\`);
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
    
    // Cleanup: cancel request if component unmounts
    return () => controller.abort();
  }, [endpoint]);

  return { data, loading, error };
}

// Request Interceptor Pattern - The Diplomatic Protocol
class ApiClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
    this.interceptors = {
      request: [],
      response: []
    };
  }
  
  // Add authentication to all requests
  addAuthInterceptor() {
    this.interceptors.request.push(async (config) => {
      const token = await getAuthToken();
      if (token) {
        config.headers.Authorization = \`Bearer \${token}\`;
      }
      return config;
    });
  }
  
  // Retry failed requests
  addRetryInterceptor() {
    this.interceptors.response.push(async (response) => {
      if (response.status === 401) {
        // Token expired, refresh and retry
        await refreshToken();
        return this.request(response.config);
      }
      return response;
    });
  }
  
  async request(endpoint, options = {}) {
    let config = { ...options };
    
    // Apply request interceptors
    for (const interceptor of this.interceptors.request) {
      config = await interceptor(config);
    }
    
    let response = await fetch(this.baseURL + endpoint, config);
    
    // Apply response interceptors
    for (const interceptor of this.interceptors.response) {
      response = await interceptor(response);
    }
    
    return response;
  }
}

// Error Handling Patterns - Debuggora's Shield
const handleApiError = (error) => {
  if (error.status === 404) {
    return { message: "Resource not found in the Cloud Citadel" };
  } else if (error.status === 401) {
    return { message: "Access denied - diplomatic credentials required" };
  } else if (error.status === 500) {
    return { message: "The Cloud Citadel is experiencing difficulties" };
  } else if (error.name === 'NetworkError') {
    return { message: "Cannot reach the Cloud Citadel - check connection" };
  }
  return { message: "An unexpected error occurred" };
};`}
				</pre>
			</div>

			<div className='lesson-insight'>
				<h3>The Protocol Insight:</h3>
				<p>
					Each communication protocol serves different needs. REST provides 
					simplicity and wide support. GraphQL offers flexibility and efficiency. 
					WebSockets enable real-time bidirectional communication. The key is 
					choosing the right protocol for your use case.
				</p>
				<p>
					Beyond protocols, robust API integration requires handling errors 
					gracefully, managing authentication securely, and optimizing performance 
					through caching and request management. These patterns form the 
					foundation of professional API integration.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on Protocol Mastery</h3>
				<p>
					<strong>How do different protocols affect application architecture?</strong> 
					Consider how REST's resource-based approach differs from GraphQL's 
					query-based model.
				</p>
				<p>
					<strong>Why is error handling more complex in distributed systems?</strong> 
					Think about the various failure points between client and server and 
					how to handle each gracefully.
				</p>
			</div>

			<div className='chapter-ending'>
				<p>
					After mastering the Protocol Chambers, <strong>Aria</strong> felt 
					confident in her communication skills. "Each protocol has its place, 
					its strengths and weaknesses."
				</p>
				<p>
					<strong>Binary</strong> processed the patterns. "Interceptors for 
					cross-cutting concerns, retry logic for resilience, caching for 
					performance. Elegant solutions!"
				</p>
				<p>
					<strong>Debuggora</strong> nodded approvingly. "And proper error 
					handling throughout. You're learning to expect the unexpected."
				</p>
				<p>
					Cloud Keeper Axios smiled. "You're ready for the final challenge - 
					establishing the Data Embassy. There, you'll create permanent, 
					production-ready connections..."
				</p>
			</div>
		</div>
	);
};

export default ChapterTwo;