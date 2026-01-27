import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';
import StorySection from '../../../../../components/content/StorySection';

const ChapterThree = () => {
	const {
		queryHistory,
		subscriptions,
		clearAll
	} = useOutletContext();

	const [unifiedView, setUnifiedView] = useState('dashboard');
	const [comparisonMode, setComparisonMode] = useState(false);

	const architectureComponents = {
		dashboard: {
			title: 'Unified Dashboard',
			description: 'All data through one gateway'
		},
		performance: {
			title: 'Performance Metrics',
			description: 'Efficiency of GraphQL vs REST'
		},
		ecosystem: {
			title: 'GraphQL Ecosystem',
			description: 'Tools and libraries'
		},
		wisdom: {
			title: 'Choosing Wisely',
			description: 'When to use GraphQL vs REST'
		}
	};

	const performanceComparison = {
		requests: { graphql: 1, rest: 4 },
		dataTransfer: { graphql: '2.5KB', rest: '8.3KB' },
		roundTrips: { graphql: 1, rest: 4 },
		caching: { graphql: 'Normalized', rest: 'Endpoint-based' }
	};

	const ecosystemTools = [
		{ name: 'Apollo Client', type: 'Client', icon: '🚀' },
		{ name: 'GraphQL Playground', type: 'IDE', icon: '🎮' },
		{ name: 'GraphQL Code Generator', type: 'Tooling', icon: '⚙️' },
		{ name: 'Apollo Studio', type: 'Monitoring', icon: '📊' }
	];

	const decisionMatrix = [
		{ 
			scenario: 'Simple CRUD API',
			graphql: 2,
			rest: 5,
			recommendation: 'REST'
		},
		{ 
			scenario: 'Complex nested data',
			graphql: 5,
			rest: 2,
			recommendation: 'GraphQL'
		},
		{ 
			scenario: 'Real-time updates',
			graphql: 5,
			rest: 3,
			recommendation: 'GraphQL'
		},
		{ 
			scenario: 'Public API',
			graphql: 3,
			rest: 4,
			recommendation: 'Depends'
		}
	];

	return (
		<div className='chapter'>
			<ChapterIntro
				chapterNumber={3}
				title={`The Unified Interface`}
				bridge={`"You've mastered queries and understood the schema contract," Query Master Apollo said, ascending to the Gateway's control center. "Now it's time to build the Unified Interface - a complete GraphQL system that serves all data needs through one elegant endpoint."`}
			/>

		<StorySection
			paragraphs={[
				<><strong>Aria</strong> built a complete GraphQL client, efficiently fetching exactly what each component needed. "No over-fetching, no under-fetching," she marveled.</>,
				<><strong>Query Master Apollo</strong> smiled. "You've learned the elegance of GraphQL. But remember, it's a tool. Sometimes REST is simpler, sometimes GraphQL is better. Wisdom lies in choosing."</>
			]}
		/>

			<div className='interactive-section'>
				<h3 className='section-title'>The Unified Interface</h3>
				
				<InstructionBox character={`Apollo reveals the complete GraphQL ecosystem.`}>
					Explore the complete GraphQL ecosystem and learn when to use it!
				</InstructionBox>

				<div style={{
					display: 'flex',
					gap: '10px',
					marginBottom: '20px',
					flexWrap: 'wrap'
				}}>
					{Object.entries(architectureComponents).map(([key, component]) => (
						<button
							key={key}
							className={`operation-button ${unifiedView === key ? 'active' : ''}`}
							onClick={() => setUnifiedView(key)}
							style={{
								background: unifiedView === key ? '#667eea' : '#95a5a6'
							}}>
							{component.title}
						</button>
					))}
				</div>

				{unifiedView === 'dashboard' && (
					<div style={{
						background: '#f8f9fa',
						padding: '20px',
						borderRadius: '8px'
					}}>
						<h4>GraphQL Gateway Statistics</h4>
						
						<div className='performance-metrics'>
							<div className='metric-box'>
								<div className='metric-value'>{queryHistory.length}</div>
								<div className='metric-label'>Queries Executed</div>
							</div>
							<div className='metric-box'>
								<div className='metric-value'>{subscriptions.length}</div>
								<div className='metric-label'>Active Subscriptions</div>
							</div>
							<div className='metric-box'>
								<div className='metric-value'>1</div>
								<div className='metric-label'>Endpoint</div>
							</div>
							<div className='metric-box'>
								<div className='metric-value'>100%</div>
								<div className='metric-label'>Type Coverage</div>
							</div>
						</div>

						<h5 style={{marginTop: '30px'}}>Recent Activity</h5>
						<div className='query-history'>
							{queryHistory.length === 0 ? (
								<p style={{textAlign: 'center', color: '#7f8c8d'}}>
									No queries executed yet
								</p>
							) : (
								queryHistory.slice(-5).reverse().map((item, index) => (
									<div key={index} className='history-item'>
										<span className='history-operation'>
											{item.operation.toUpperCase()}
										</span>
										<span className='history-query'>
											{item.query.split('\n')[0].substring(0, 50)}...
										</span>
										<div className='history-time'>
											{new Date(item.timestamp).toLocaleTimeString()}
										</div>
									</div>
								))
							)}
						</div>
					</div>
				)}

				{unifiedView === 'performance' && (
					<div>
						<div style={{
							background: 'white',
							padding: '20px',
							borderRadius: '8px',
							marginBottom: '20px'
						}}>
							<h4>GraphQL vs REST Comparison</h4>
							<button
								onClick={() => setComparisonMode(!comparisonMode)}
								style={{
									padding: '8px 16px',
									background: '#667eea',
									color: 'white',
									border: 'none',
									borderRadius: '5px',
									cursor: 'pointer',
									marginBottom: '20px'
								}}>
								{comparisonMode ? 'Hide' : 'Show'} Detailed Comparison
							</button>
							
							{comparisonMode && (
								<div style={{
									display: 'grid',
									gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
									gap: '15px'
								}}>
									{Object.entries(performanceComparison).map(([metric, values]) => (
										<div key={metric} style={{
											background: '#f8f9fa',
											padding: '15px',
											borderRadius: '5px',
											textAlign: 'center'
										}}>
											<h5 style={{marginBottom: '10px', textTransform: 'capitalize'}}>
												{metric.replace(/([A-Z])/g, ' $1').trim()}
											</h5>
											<div style={{
												display: 'flex',
												justifyContent: 'space-around',
												alignItems: 'center'
											}}>
												<div>
													<div style={{color: '#667eea', fontWeight: 'bold'}}>
														GraphQL
													</div>
													<div style={{fontSize: '1.2em'}}>
														{values.graphql}
													</div>
												</div>
												<div style={{color: '#e0e0e0'}}>vs</div>
												<div>
													<div style={{color: '#e74c3c', fontWeight: 'bold'}}>
														REST
													</div>
													<div style={{fontSize: '1.2em'}}>
														{values.rest}
													</div>
												</div>
											</div>
										</div>
									))}
								</div>
							)}
						</div>

						<div style={{
							background: '#e8f4fd',
							padding: '20px',
							borderRadius: '8px'
						}}>
							<h5>Query Efficiency Example</h5>
							<p>Fetching a user with their posts and comments:</p>
							<div style={{
								display: 'grid',
								gridTemplateColumns: '1fr 1fr',
								gap: '20px',
								marginTop: '15px'
							}}>
								<div>
									<strong>GraphQL (1 request)</strong>
									<pre style={{
										background: '#2d2d2d',
										color: '#f8f8f2',
										padding: '10px',
										borderRadius: '5px',
										fontSize: '0.8em',
										overflow: 'auto'
									}}>
{`query {
  user(id: "1") {
    name
    posts {
      title
      comments {
        text
      }
    }
  }
}`}
									</pre>
								</div>
								<div>
									<strong>REST (4 requests)</strong>
									<pre style={{
										background: '#2d2d2d',
										color: '#f8f8f2',
										padding: '10px',
										borderRadius: '5px',
										fontSize: '0.8em',
										overflow: 'auto'
									}}>
{`GET /users/1
GET /users/1/posts
GET /posts/1/comments
GET /posts/2/comments`}
									</pre>
								</div>
							</div>
						</div>
					</div>
				)}

				{unifiedView === 'ecosystem' && (
					<div>
						<h4>GraphQL Ecosystem Tools</h4>
						<div style={{
							display: 'grid',
							gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
							gap: '15px',
							marginBottom: '20px'
						}}>
							{ecosystemTools.map(tool => (
								<div key={tool.name} style={{
									background: 'white',
									padding: '20px',
									borderRadius: '8px',
									textAlign: 'center',
									border: '2px solid #e0e0e0',
									transition: 'all 0.3s ease',
									cursor: 'pointer'
								}}>
									<div style={{fontSize: '2em', marginBottom: '10px'}}>
										{tool.icon}
									</div>
									<div style={{fontWeight: 'bold', marginBottom: '5px'}}>
										{tool.name}
									</div>
									<div style={{fontSize: '0.9em', color: '#7f8c8d'}}>
										{tool.type}
									</div>
								</div>
							))}
						</div>

						<div style={{
							background: '#f8f9fa',
							padding: '20px',
							borderRadius: '8px'
						}}>
							<h5>Complete GraphQL Stack</h5>
							<ul style={{marginLeft: '20px', lineHeight: '1.8'}}>
								<li><strong>Server:</strong> Apollo Server, GraphQL Yoga</li>
								<li><strong>Client:</strong> Apollo Client, Relay, URQL</li>
								<li><strong>Tools:</strong> GraphQL Playground, GraphiQL</li>
								<li><strong>Code Gen:</strong> GraphQL Code Generator</li>
								<li><strong>Monitoring:</strong> Apollo Studio, GraphQL Inspector</li>
							</ul>
						</div>
					</div>
				)}

				{unifiedView === 'wisdom' && (
					<div>
						<h4>Choosing Between GraphQL and REST</h4>
						<div style={{
							background: 'white',
							padding: '20px',
							borderRadius: '8px',
							overflow: 'auto'
						}}>
							<table style={{width: '100%', borderCollapse: 'collapse'}}>
								<thead>
									<tr style={{borderBottom: '2px solid #e0e0e0'}}>
										<th style={{padding: '10px', textAlign: 'left'}}>Scenario</th>
										<th style={{padding: '10px', textAlign: 'center'}}>GraphQL</th>
										<th style={{padding: '10px', textAlign: 'center'}}>REST</th>
										<th style={{padding: '10px', textAlign: 'center'}}>Recommendation</th>
									</tr>
								</thead>
								<tbody>
									{decisionMatrix.map((item, index) => (
										<tr key={index} style={{borderBottom: '1px solid #e0e0e0'}}>
											<td style={{padding: '10px'}}>{item.scenario}</td>
											<td style={{padding: '10px', textAlign: 'center'}}>
												<div style={{
													display: 'inline-flex',
													gap: '2px'
												}}>
													{Array(5).fill(0).map((_, i) => (
														<span key={i} style={{
															color: i < item.graphql ? '#667eea' : '#e0e0e0'
														}}>★</span>
													))}
												</div>
											</td>
											<td style={{padding: '10px', textAlign: 'center'}}>
												<div style={{
													display: 'inline-flex',
													gap: '2px'
												}}>
													{Array(5).fill(0).map((_, i) => (
														<span key={i} style={{
															color: i < item.rest ? '#e74c3c' : '#e0e0e0'
														}}>★</span>
													))}
												</div>
											</td>
											<td style={{
												padding: '10px',
												textAlign: 'center',
												fontWeight: 'bold',
												color: item.recommendation === 'GraphQL' ? '#667eea' : 
													   item.recommendation === 'REST' ? '#e74c3c' : '#f39c12'
											}}>
												{item.recommendation}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>

						<div style={{
							background: '#fef5e7',
							padding: '20px',
							borderRadius: '8px',
							marginTop: '20px'
						}}>
							<h5>💡 Apollo's Wisdom</h5>
							<p><strong>Use GraphQL when:</strong></p>
							<ul style={{marginLeft: '20px', marginBottom: '15px'}}>
								<li>You have complex, nested data relationships</li>
								<li>Multiple clients need different data shapes</li>
								<li>You need real-time subscriptions</li>
								<li>Over-fetching/under-fetching is a problem</li>
							</ul>
							<p><strong>Use REST when:</strong></p>
							<ul style={{marginLeft: '20px'}}>
								<li>You have simple, resource-based APIs</li>
								<li>Caching strategies are straightforward</li>
								<li>File uploads/downloads are primary use cases</li>
								<li>Team familiarity with REST is high</li>
							</ul>
						</div>
					</div>
				)}

				<div style={{
					marginTop: '30px',
					textAlign: 'center'
				}}>
					<button
						onClick={clearAll}
						style={{
							padding: '10px 20px',
							background: '#e74c3c',
							color: 'white',
							border: 'none',
							borderRadius: '5px',
							cursor: 'pointer'
						}}>
						🗑️ Clear All Gateway Data
					</button>
				</div>
			</div>

			<CodeExample
				title={`The Unified GraphQL Architecture`}
				discoveredBy={`Query Master Apollo's Complete System`}
				code={`// Complete GraphQL Client Setup
import { ApolloClient, InMemoryCache, split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

// Split link: HTTP for queries/mutations, WS for subscriptions
const splitLink = split(
  ({ query }) => {
    const def = getMainDefinition(query);
    return def.kind === 'OperationDefinition' && def.operation === 'subscription';
  },
  new WebSocketLink({ uri: 'ws://localhost:4000/graphql' }),
  createHttpLink({ uri: '/graphql' })
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    typePolicies: {
      User: { keyFields: ['id'] },
      Query: { fields: { posts: { merge: (existing = [], incoming) => [...existing, ...incoming] }}}
    }
  })
});

// The Unified App
function UnifiedKingdom() {
  return (
    <ApolloProvider client={client}>
      <DataExplorer />
      <RealTimeUpdates />
    </ApolloProvider>
  );
}

// Smart Query - No over/under fetching
function DataExplorer() {
  const { data, loading } = useQuery(gql\`
    query GetKingdomData($userId: ID!) {
      user(id: $userId) { id, name, posts(last: 10) { id, title } }
      systemStats { totalUsers, activeNow }
    }
  \`);
  return loading ? <Loading /> : <Dashboard data={data} />;
}`}
			/>

			<ChapterSummary
				lessonInsight={{
					title: `The Unified Interface Insight:`,
					content: `GraphQL represents a paradigm shift in API design. The unified interface eliminates common REST pain points while introducing real-time subscriptions and intelligent caching. However, it's not always the right choice - simpler applications may benefit from REST's straightforward approach. The wisdom to choose the right tool is as important as mastering it.`
				}}
				reflectionQuestions={[
					`How does GraphQL change the relationship between frontend and backend teams?`,
					`What are the operational considerations of running GraphQL in production?`
				]}
				journalEntry={{
					title: `Aria's Journal - Day 44 (Evening)`,
					content: `The Unified Interface is complete! Built a full GraphQL client with HTTP for queries/mutations and WebSocket for real-time subscriptions. Apollo's decision matrix helped me understand when to use GraphQL vs REST: complex nested data → GraphQL, simple CRUD → REST. Binary computed final statistics: "Complete data layer mastery achieved!" Query Master Apollo's final wisdom: "GraphQL isn't just a query language - it's a complete data management philosophy." The Type Forge awaits next!`
				}}
				chapterEnding={[
					`Standing atop the Cloud Citadel, Aria surveyed her achievements. She could now bridge any gap between client and server, handle real-time data, cache efficiently, and query elegantly.`,
					`Query Master Apollo placed a hand on her shoulder. "You've mastered the four pillars of server communication: API integration, real-time connections, intelligent caching, and flexible querying."`,
					`Binary computed the final statistics. "Complete data layer mastery achieved. Efficiency optimized across all protocols!"`,
					`Master Aurelius appeared. "The Cloud Citadel has served you well. But there's one more frontier - the Type Forge awaits. Ready to make your code unbreakable?"`
				]}
			/>
		</div>
	);
};

export default ChapterThree;