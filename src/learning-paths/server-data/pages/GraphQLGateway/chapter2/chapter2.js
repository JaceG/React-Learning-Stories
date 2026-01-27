import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';
import StorySection from '../../../../../components/content/StorySection';

const ChapterTwo = () => {
	const {
		currentQuery,
		setCurrentQuery,
		queryResult,
		schema,
		fragments,
		addFragment,
		executeQuery,
		isExecuting
	} = useOutletContext();

	const [schemaView, setSchemaView] = useState('types');
	const [fragmentName, setFragmentName] = useState('');
	const [fragmentDefinition, setFragmentDefinition] = useState('');
	const [showOptimisticUpdate, setShowOptimisticUpdate] = useState(false);

	const schemaDefinition = `
type User {
  id: ID!
  name: String!
  email: String!
  posts: [Post!]!
  createdAt: DateTime!
}

type Post {
  id: ID!
  title: String!
  content: String!
  author: User!
  comments: [Comment!]!
  published: Boolean!
}

type Comment {
  id: ID!
  text: String!
  author: User!
  post: Post!
  createdAt: DateTime!
}

type Query {
  user(id: ID!): User
  users: [User!]!
  post(id: ID!): Post
  posts(limit: Int): [Post!]!
}

type Mutation {
  createUser(input: UserInput!): User!
  updateUser(id: ID!, input: UserInput!): User!
  createPost(input: PostInput!): Post!
  publishPost(id: ID!): Post!
}

type Subscription {
  postUpdated(userId: ID!): Post!
  commentAdded(postId: ID!): Comment!
}`;

	const handleCreateFragment = () => {
		if (fragmentName && fragmentDefinition) {
			addFragment(fragmentName, fragmentDefinition);
			setFragmentName('');
			setFragmentDefinition('');
		}
	};

	const demonstrateOptimisticMutation = () => {
		setShowOptimisticUpdate(true);
		
		// Show optimistic update immediately
		const optimisticResult = {
			data: {
				updatePost: {
					id: '1',
					title: 'Updated Title (Optimistic)',
					__optimistic: true
				}
			}
		};
		
		// Simulate network delay
		setTimeout(() => {
			const serverResult = {
				data: {
					updatePost: {
						id: '1',
						title: 'Updated Title (Confirmed)',
						__optimistic: false
					}
				}
			};
			setShowOptimisticUpdate(false);
		}, 2000);
	};

	return (
		<div className='chapter'>
			<ChapterIntro
				chapterNumber={2}
				title={`The Schema Scrolls`}
				bridge={`"You've learned to write queries," Query Master Apollo said, leading Aria to the Schema Vault. "But the true power lies in understanding the contract itself. The Schema Scrolls define every field, every type, every relationship - like a detailed treaty between client and server."`}
			/>

		<StorySection
			paragraphs={[
				<>The Schema Scrolls defined the contract between client and server. "Every field, every type, every relationship," <strong>Apollo</strong> explained. "Like a detailed treaty between kingdoms."</>,
				<><strong>Aria</strong> noticed similarities to her upcoming TypeScript training. "Types everywhere!"</>,
				`"Yes! GraphQL and TypeScript are natural allies. Together, they create unbreakable contracts."`
			]}
		/>

			<div className='interactive-section'>
				<h3 className='section-title'>The Schema Scrolls</h3>
				
				<InstructionBox character={`Apollo unrolls the ancient Schema Scrolls.`}>
					Explore the type system that powers GraphQL's flexibility!
				</InstructionBox>

				<div style={{
					display: 'flex',
					gap: '10px',
					marginBottom: '20px'
				}}>
					<button
						className={`operation-button ${schemaView === 'types' ? 'active' : ''}`}
						onClick={() => setSchemaView('types')}>
						📜 Type Definitions
					</button>
					<button
						className={`operation-button ${schemaView === 'graph' ? 'active' : ''}`}
						onClick={() => setSchemaView('graph')}>
						🕸️ Type Graph
					</button>
					<button
						className={`operation-button ${schemaView === 'operations' ? 'active' : ''}`}
						onClick={() => setSchemaView('operations')}>
						⚡ Operations
					</button>
				</div>

				{schemaView === 'types' && (
					<div className='query-builder'>
						<pre className='query-editor' style={{
							background: '#2d2d2d',
							color: '#f8f8f2',
							padding: '20px',
							overflow: 'auto'
						}}>
							{schemaDefinition}
						</pre>
					</div>
				)}

				{schemaView === 'graph' && (
					<div className='type-system-graph'>
						<h4>Type Relationships</h4>
						<div style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							gap: '40px',
							flexWrap: 'wrap',
							marginTop: '30px'
						}}>
							<div className='type-node'>User</div>
							<div>→</div>
							<div className='type-node'>Post</div>
							<div>→</div>
							<div className='type-node'>Comment</div>
						</div>
						<p style={{marginTop: '30px', color: '#7f8c8d'}}>
							Each type connects to others through fields, creating a graph of relationships
						</p>
					</div>
				)}

				{schemaView === 'operations' && (
					<div style={{
						background: '#f8f9fa',
						padding: '20px',
						borderRadius: '8px'
					}}>
						<h4>Available Operations</h4>
						<div style={{
							display: 'grid',
							gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
							gap: '15px',
							marginTop: '15px'
						}}>
							<div style={{
								background: 'white',
								padding: '15px',
								borderRadius: '5px',
								border: '2px solid #3498db'
							}}>
								<strong>Queries</strong>
								<ul style={{marginTop: '10px', marginLeft: '20px'}}>
									<li>user(id)</li>
									<li>users</li>
									<li>post(id)</li>
									<li>posts(limit)</li>
								</ul>
							</div>
							<div style={{
								background: 'white',
								padding: '15px',
								borderRadius: '5px',
								border: '2px solid #e74c3c'
							}}>
								<strong>Mutations</strong>
								<ul style={{marginTop: '10px', marginLeft: '20px'}}>
									<li>createUser</li>
									<li>updateUser</li>
									<li>createPost</li>
									<li>publishPost</li>
								</ul>
							</div>
							<div style={{
								background: 'white',
								padding: '15px',
								borderRadius: '5px',
								border: '2px solid #f39c12'
							}}>
								<strong>Subscriptions</strong>
								<ul style={{marginTop: '10px', marginLeft: '20px'}}>
									<li>postUpdated</li>
									<li>commentAdded</li>
								</ul>
							</div>
						</div>
					</div>
				)}

				<h3 className='section-title'>Fragment Composer</h3>
				<div className='fragment-builder'>
					<p>Create reusable query fragments to avoid repetition:</p>
					
					<div style={{marginTop: '15px'}}>
						<input
							type='text'
							placeholder='Fragment name (e.g., UserInfo)'
							value={fragmentName}
							onChange={(e) => setFragmentName(e.target.value)}
							style={{
								width: '100%',
								padding: '10px',
								marginBottom: '10px',
								border: '1px solid #e0e0e0',
								borderRadius: '5px'
							}}
						/>
						<textarea
							placeholder='Fragment definition (e.g., on User { id name email })'
							value={fragmentDefinition}
							onChange={(e) => setFragmentDefinition(e.target.value)}
							style={{
								width: '100%',
								padding: '10px',
								height: '80px',
								border: '1px solid #e0e0e0',
								borderRadius: '5px',
								fontFamily: 'monospace'
							}}
						/>
						<button
							onClick={handleCreateFragment}
							style={{
								marginTop: '10px',
								padding: '10px 20px',
								background: '#667eea',
								color: 'white',
								border: 'none',
								borderRadius: '5px',
								cursor: 'pointer'
							}}>
							Create Fragment
						</button>
					</div>
					
					{fragments.length > 0 && (
						<div className='fragment-list'>
							{fragments.map((fragment, index) => (
								<div key={index} className='fragment-chip'>
									<span className='fragment-name'>{fragment.name}</span>
									<span style={{opacity: 0.7}}>({fragment.definition})</span>
								</div>
							))}
						</div>
					)}
				</div>

				<h3 className='section-title'>Optimistic Mutations</h3>
				<div style={{
					background: 'white',
					padding: '20px',
					borderRadius: '8px',
					border: '2px solid #e0e0e0'
				}}>
					<p>See how optimistic updates provide instant feedback:</p>
					
					<button
						onClick={demonstrateOptimisticMutation}
						style={{
							marginTop: '15px',
							padding: '10px 20px',
							background: '#27ae60',
							color: 'white',
							border: 'none',
							borderRadius: '5px',
							cursor: 'pointer'
						}}>
						🚀 Demonstrate Optimistic Update
					</button>
					
					{showOptimisticUpdate && (
						<div style={{
							marginTop: '20px',
							padding: '15px',
							background: '#e8f4fd',
							borderRadius: '5px'
						}}>
							<div style={{
								display: 'flex',
								alignItems: 'center',
								gap: '10px'
							}}>
								<div className='status-indicator'></div>
								<span>Update applied optimistically!</span>
							</div>
							<p style={{
								marginTop: '10px',
								fontSize: '0.9em',
								color: '#2980b9'
							}}>
								Waiting for server confirmation...
							</p>
						</div>
					)}
				</div>

				<h3 className='section-title'>Cache Normalization</h3>
				<div className='performance-metrics'>
					<div className='metric-box'>
						<div className='metric-value'>100%</div>
						<div className='metric-label'>Type Safety</div>
					</div>
					<div className='metric-box'>
						<div className='metric-value'>0ms</div>
						<div className='metric-label'>Cache Hits</div>
					</div>
					<div className='metric-box'>
						<div className='metric-value'>1</div>
						<div className='metric-label'>Single Source</div>
					</div>
					<div className='metric-box'>
						<div className='metric-value'>∞</div>
						<div className='metric-label'>Flexibility</div>
					</div>
				</div>
			</div>

			<CodeExample
				title={`Advanced GraphQL Patterns`}
				discoveredBy={`The Schema Scrolls' Secrets`}
				code={`// Type-Safe GraphQL with TypeScript
interface User { id: string; name: string; posts: Post[]; }
interface Post { id: string; title: string; author: User; }

// Fragments - Reusable Query Parts
const USER_FIELDS = gql\`
  fragment UserFields on User { id, name, email }
\`;

const POST_WITH_AUTHOR = gql\`
  fragment PostWithAuthor on Post {
    id, title
    author { ...UserFields }
  }
  \${USER_FIELDS}
\`;

// Optimistic Response - Instant UI
const [updatePost] = useMutation(UPDATE_POST, {
  optimisticResponse: (vars) => ({
    updatePost: {
      __typename: 'Post',
      id: vars.id,
      title: vars.input.title
    }
  }),
  update(cache, { data }) {
    cache.modify({
      id: cache.identify(data.updatePost),
      fields: { title: () => data.updatePost.title }
    });
  }
});

// Cache Normalization
const cache = new InMemoryCache({
  typePolicies: {
    User: { keyFields: ['id'] },
    Query: { fields: { posts: { merge: (existing = [], incoming) => [...existing, ...incoming] }}}
  }
});`}
			/>

			<ChapterSummary
				lessonInsight={{
					title: `The Schema Insight:`,
					content: `GraphQL's type system provides a contract between client and server. Combined with TypeScript, it creates end-to-end type safety. Fragments reduce duplication, optimistic updates improve perceived performance, and cache normalization ensures data consistency across your application.`
				}}
				reflectionQuestions={[
					`How does GraphQL's type system prevent runtime errors?`,
					`What are the benefits of cache normalization?`
				]}
				journalEntry={{
					title: `Aria's Journal - Day 44 (Afternoon)`,
					content: `The Schema Scrolls are like a detailed treaty between client and server! Every field, every type, every relationship is defined. Learned fragments for reusable query parts - no more duplication. Apollo showed cache normalization: when you update User#1, it updates everywhere User#1 appears! Built optimistic updates for instant UI feedback. Binary computed: "Type validation at compile time, zero runtime errors. Maximum safety achieved!" GraphQL and TypeScript are natural allies.`
				}}
			/>
		</div>
	);
};

export default ChapterTwo;