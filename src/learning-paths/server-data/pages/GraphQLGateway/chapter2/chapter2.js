import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

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
			<h2 className='chapter-title'>Chapter 2: The Schema Scrolls</h2>

			<div className='chapter-bridge'>
				<p>With query basics mastered, Query Master Apollo revealed the deeper 
				magic - the Schema Scrolls that define the contract between worlds.</p>
			</div>

			<div className='story-section'>
				<p className='story-paragraph'>
					The Schema Scrolls defined the contract between client and server. 
					"Every field, every type, every relationship," <strong>Apollo</strong> 
					explained. "Like a detailed treaty between kingdoms."
				</p>

				<p className='story-paragraph'>
					<strong>Aria</strong> noticed similarities to her upcoming TypeScript 
					training. "Types everywhere!"
				</p>

				<p className='story-paragraph'>
					"Yes! GraphQL and TypeScript are natural allies. Together, they create 
					unbreakable contracts."
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>The Schema Scrolls</h3>
				<p className='instruction'>
					<strong>👉 Explore the type system that powers GraphQL's flexibility!</strong>
				</p>

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

			<div className='code-example'>
				<div className='scroll-header'>
					<span>Advanced GraphQL Patterns</span>
					<span className='discovered-by'>The Schema Scrolls' Secrets</span>
				</div>
				<pre>
{`// Type-Safe GraphQL with TypeScript - Apollo's Alliance
import { gql, TypedDocumentNode } from '@apollo/client';

// Generated types from schema
interface User {
  id: string;
  name: string;
  email: string;
  posts: Post[];
}

interface Post {
  id: string;
  title: string;
  content: string;
  author: User;
}

// Type-safe query with variables
const GET_USER: TypedDocumentNode<
  { user: User },
  { id: string }
> = gql\`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
      posts {
        id
        title
      }
    }
  }
\`;

// Fragment Composition - Reusable Query Parts
const USER_FIELDS = gql\`
  fragment UserFields on User {
    id
    name
    email
    avatar
  }
\`;

const POST_WITH_AUTHOR = gql\`
  fragment PostWithAuthor on Post {
    id
    title
    content
    author {
      ...UserFields
    }
  }
  \${USER_FIELDS}
\`;

// Complex query with fragments
const FEED_QUERY = gql\`
  query GetFeed($limit: Int!) {
    posts(limit: $limit) {
      ...PostWithAuthor
      comments {
        id
        text
        author {
          ...UserFields
        }
      }
    }
  }
  \${POST_WITH_AUTHOR}
\`;

// Optimistic Response Pattern - Instant UI
const [updatePost] = useMutation(UPDATE_POST, {
  optimisticResponse: (vars) => ({
    updatePost: {
      __typename: 'Post',
      id: vars.id,
      title: vars.input.title,
      content: vars.input.content,
      // Assume success optimistically
      updatedAt: new Date().toISOString()
    }
  }),
  update(cache, { data }) {
    // Update normalized cache
    cache.modify({
      id: cache.identify(data.updatePost),
      fields: {
        title: () => data.updatePost.title,
        content: () => data.updatePost.content
      }
    });
  }
});

// Cache Normalization - Apollo's Magic
const cache = new InMemoryCache({
  typePolicies: {
    User: {
      keyFields: ['id'],
      fields: {
        posts: {
          merge(existing = [], incoming) {
            // Custom merge strategy
            return [...existing, ...incoming];
          }
        }
      }
    },
    Query: {
      fields: {
        posts: {
          // Pagination handling
          keyArgs: ['type'],
          merge(existing, incoming, { args }) {
            const offset = args?.offset || 0;
            const merged = existing ? existing.slice(0) : [];
            
            for (let i = 0; i < incoming.length; ++i) {
              merged[offset + i] = incoming[i];
            }
            
            return merged;
          }
        }
      }
    }
  }
});

// Subscription with Error Handling - Debuggora's Safety
function usePostUpdates(userId: string) {
  const { data, error } = useSubscription(POST_UPDATES, {
    variables: { userId },
    onError: (error) => {
      console.error('Subscription error:', error);
      // Implement retry logic
    },
    shouldResubscribe: true,
    onSubscriptionData: ({ subscriptionData }) => {
      // Handle real-time updates
      if (subscriptionData.data) {
        updateLocalState(subscriptionData.data);
      }
    }
  });
  
  return { updates: data?.postUpdated, error };
}

// Error Boundary for GraphQL - Binary's Protection
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        \`GraphQL error: Message: \${message}, Path: \${path}\`
      );
    });
  }
  
  if (networkError) {
    console.error(\`Network error: \${networkError}\`);
    // Implement retry or fallback
  }
});`}
				</pre>
			</div>

			<div className='lesson-insight'>
				<h3>The Schema Insight:</h3>
				<p>
					GraphQL's type system provides a contract between client and server, 
					ensuring that both sides agree on data structure. Combined with TypeScript, 
					it creates end-to-end type safety. Features like fragments reduce 
					duplication, optimistic updates improve perceived performance, and cache 
					normalization ensures data consistency across your application.
				</p>
			</div>

			<div className='reflection-section'>
				<h3>Reflect on Type Systems</h3>
				<p>
					<strong>How does GraphQL's type system prevent runtime errors?</strong> 
					Consider how compile-time validation catches issues before they reach 
					production.
				</p>
				<p>
					<strong>What are the benefits of cache normalization?</strong> 
					Think about how updating one entity automatically updates all views 
					that reference it.
				</p>
			</div>

			<div className='chapter-ending'>
				<p>
					<strong>Aria</strong> studied the Schema Scrolls intensely. "The types 
					create a perfect understanding between client and server!"
				</p>
				<p>
					<strong>Binary</strong> computed the efficiency. "Type validation at 
					compile time, zero runtime type errors. Maximum safety achieved!"
				</p>
				<p>
					<strong>Debuggora</strong> added, "And with proper error boundaries, 
					even GraphQL errors are handled gracefully."
				</p>
				<p>
					<strong>Query Master Apollo</strong> smiled. "You understand the contract. 
					Now, ready to build the Unified Interface?"
				</p>
			</div>
		</div>
	);
};

export default ChapterTwo;