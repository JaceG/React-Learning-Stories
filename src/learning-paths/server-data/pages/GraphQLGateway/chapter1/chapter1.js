import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';
import StorySection from '../../../../../components/content/StorySection';

const ChapterOne = () => {
	const {
		currentQuery,
		setCurrentQuery,
		queryResult,
		schema,
		selectedOperation,
		setSelectedOperation,
		isExecuting,
		executeQuery
	} = useOutletContext();

	const [selectedType, setSelectedType] = useState(null);
	const [showQueryBuilder, setShowQueryBuilder] = useState(false);

	const sampleQueries = {
		query: `query GetUser {
  user(id: "1") {
    id
    name
    email
    posts {
      id
      title
    }
  }
}`,
		mutation: `mutation CreatePost {
  createPost(input: {
    title: "GraphQL Mastery"
    content: "Learning with Apollo"
  }) {
    id
    title
    success
  }
}`,
		subscription: `subscription OnPostUpdate {
  postUpdated(id: "1") {
    id
    title
    content
    updatedAt
  }
}`
	};

	const handleTypeClick = (type) => {
		setSelectedType(type);
		// Build a simple query for the selected type
		const fields = schema.fields[type].join('\n    ');
		const query = `query Get${type} {\n  ${type.toLowerCase()} {\n    ${fields}\n  }\n}`;
		setCurrentQuery(query);
	};

	return (
		<div className='chapter'>
			<ChapterIntro
				chapterNumber={1}
				title={`The Query Language`}
			/>

		<StorySection
			paragraphs={[
				<>At the GraphQL Gateway, <strong>Query Master Apollo</strong> introduced a different approach. "REST gives you what the server decides. GraphQL lets you ask for exactly what you need."</>,
				`Aria studied the query language. "It's like having a conversation instead of receiving packages!"`,
				`"Precisely! One endpoint, infinite possibilities. But with great flexibility comes great responsibility."`
			]}
		/>

			<div className='interactive-section'>
				<h3 className='section-title'>The GraphQL Gateway</h3>
				<div className='gateway-visualization'>
					<div className='gateway-structure'>
						<div className='gateway-portal'>
							<h3>🌀 GraphQL Gateway</h3>
							<div className='endpoint-display'>/graphql</div>
							<p style={{marginTop: '20px', opacity: 0.9}}>
								One endpoint to rule them all
							</p>
						</div>
					</div>
				</div>

				<h3 className='section-title'>Operation Types</h3>
				
				<InstructionBox character={`Query Master Apollo presents the three operation types.`}>
					Choose your GraphQL operation type to begin crafting queries!
				</InstructionBox>
				
				<div className='operation-selector'>
					<button
						className={`operation-button ${selectedOperation === 'query' ? 'active' : ''}`}
						onClick={() => {
							setSelectedOperation('query');
							setCurrentQuery(sampleQueries.query);
						}}>
						📖 Query
					</button>
					<button
						className={`operation-button ${selectedOperation === 'mutation' ? 'active' : ''}`}
						onClick={() => {
							setSelectedOperation('mutation');
							setCurrentQuery(sampleQueries.mutation);
						}}>
						✏️ Mutation
					</button>
					<button
						className={`operation-button ${selectedOperation === 'subscription' ? 'active' : ''}`}
						onClick={() => {
							setSelectedOperation('subscription');
							setCurrentQuery(sampleQueries.subscription);
						}}>
						📡 Subscription
					</button>
				</div>

				<h3 className='section-title'>Query Builder</h3>
				<div className='query-builder'>
					<textarea
						className='query-editor'
						value={currentQuery}
						onChange={(e) => setCurrentQuery(e.target.value)}
						placeholder={`Write your ${selectedOperation} here...`}
						spellCheck={false}
					/>
					<button 
						className={`execute-button ${isExecuting ? 'executing' : ''}`}
						onClick={executeQuery}
						disabled={!currentQuery || isExecuting}>
						{isExecuting ? '⚡ Executing...' : '▶️ Execute Query'}
					</button>
				</div>

				{queryResult && (
					<div className='query-result'>
						<div className='result-header'>
							<div className='result-status'>
								<div className='status-indicator'></div>
								<span>Success</span>
							</div>
							<span style={{fontSize: '0.9em', opacity: 0.7}}>
								{selectedOperation.toUpperCase()}
							</span>
						</div>
						<div className='result-data'>
							{JSON.stringify(queryResult, null, 2)}
						</div>
					</div>
				)}

				<h3 className='section-title'>Schema Explorer</h3>
				
				<InstructionBox character={`Apollo unveils the Schema Scrolls.`}>
					Click on a type to explore its fields and build a query!
				</InstructionBox>
				
				<div className='schema-explorer'>
					<div className='schema-types'>
						{schema.types.map(type => (
							<div
								key={type}
								className={`type-card ${selectedType === type ? 'active' : ''}`}
								onClick={() => handleTypeClick(type)}>
								<div className='type-name'>{type}</div>
								<div className='type-fields'>
									{schema.fields[type].length} fields
								</div>
							</div>
						))}
					</div>
					
					{selectedType && (
						<div style={{marginTop: '20px'}}>
							<h4>Fields for {selectedType}:</h4>
							<div className='field-list'>
								{schema.fields[selectedType].map(field => (
									<div key={field} className='field-item'>
										• {field}
									</div>
								))}
							</div>
						</div>
					)}
				</div>

				<h3 className='section-title'>Query Fundamentals</h3>
				<div style={{
					background: '#f8f9fa',
					padding: '20px',
					borderRadius: '8px'
				}}>
					<button
						onClick={() => setShowQueryBuilder(!showQueryBuilder)}
						style={{
							padding: '10px 20px',
							background: '#667eea',
							color: 'white',
							border: 'none',
							borderRadius: '5px',
							cursor: 'pointer',
							marginBottom: '15px'
						}}>
						{showQueryBuilder ? 'Hide' : 'Show'} Query Structure Guide
					</button>
					
					{showQueryBuilder && (
						<div>
							<h4>{selectedOperation === 'query' ? 'Query' : 
								selectedOperation === 'mutation' ? 'Mutation' : 
								'Subscription'} Structure:</h4>
							<pre style={{
								background: '#2d2d2d',
								color: '#f8f8f2',
								padding: '15px',
								borderRadius: '5px',
								overflow: 'auto'
							}}>
{selectedOperation === 'query' ? 
`query OperationName {
  fieldName(arguments: value) {
    field1
    field2
    nestedObject {
      nestedField
    }
  }
}` : 
selectedOperation === 'mutation' ?
`mutation OperationName {
  mutationName(input: {
    field1: value1
    field2: value2
  }) {
    resultField1
    resultField2
    success
  }
}` :
`subscription OperationName {
  subscriptionName(filter: criteria) {
    field1
    field2
    timestamp
  }
}`}
							</pre>
						</div>
					)}
				</div>
			</div>

			<CodeExample
				title={`GraphQL Fundamentals`}
				discoveredBy={`Query Master Apollo's Teachings`}
				code={`// Apollo Client Setup
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache()
});

// Query - Ask for exactly what you need
const GET_USER = gql\`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
      posts { id, title }
    }
  }
\`;

// Mutation - Change data with precision
const CREATE_POST = gql\`
  mutation CreatePost($input: PostInput!) {
    createPost(input: $input) { id, title, content }
  }
\`;

// Subscription - Real-time updates
const POST_SUBSCRIPTION = gql\`
  subscription OnPostUpdate($userId: ID!) {
    postUpdated(userId: $userId) { id, title, updatedAt }
  }
\`;

// React Usage
function UserProfile({ userId }) {
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { id: userId }
  });
  if (loading) return <div>Loading...</div>;
  return <div>{data.user.name}</div>;
}`}
			/>

			<ChapterSummary
				characterIntros={[
					{
						name: `Query Master Apollo`,
						description: `Guardian of the GraphQL Gateway. His wisdom: "REST gives you what the server decides. GraphQL lets you ask for exactly what you need - no more, no less. One endpoint, infinite possibilities."`
					}
				]}
				lessonInsight={{
					title: `The Query Language Lesson:`,
					content: `GraphQL revolutionizes data fetching by allowing clients to request exactly what they need. Unlike REST's fixed endpoints, GraphQL provides a single endpoint with a flexible query language. This eliminates over-fetching and under-fetching, leading to more efficient applications.`
				}}
				reflectionQuestions={[
					`How does GraphQL's "ask for what you need" philosophy improve performance?`,
					`When might REST be simpler than GraphQL?`
				]}
				journalEntry={{
					title: `Aria's Journal - Day 44 (Morning)`,
					content: `The GraphQL Gateway is revolutionary! Query Master Apollo showed me a single endpoint (/graphql) that can handle any data request. Learned three operation types: Query (📖) for reading, Mutation (✏️) for changing, and Subscription (📡) for real-time. Built my first query - asked for user.name and user.posts only! Binary analyzed: "No wasted bytes, no unnecessary requests. Optimal data transfer achieved!" It's like having a conversation with the server instead of receiving packages.`
				}}
			/>
		</div>
	);
};

export default ChapterOne;