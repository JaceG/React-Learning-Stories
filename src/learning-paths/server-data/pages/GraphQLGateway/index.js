import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import LessonNavigation from '../../../../components/layout/LessonNavigation';
import '../../../CourseStyles.css';
import './GraphQLGateway.css';

function GraphQLGateway() {
	const [currentQuery, setCurrentQuery] = useState('');
	const [queryResult, setQueryResult] = useState(null);
	const [schema, setSchema] = useState({
		types: ['User', 'Post', 'Comment'],
		fields: {
			User: ['id', 'name', 'email', 'posts'],
			Post: ['id', 'title', 'content', 'author', 'comments'],
			Comment: ['id', 'text', 'author', 'post']
		}
	});
	const [queryHistory, setQueryHistory] = useState([]);
	const [selectedOperation, setSelectedOperation] = useState('query');
	const [fragments, setFragments] = useState([]);
	const [subscriptions, setSubscriptions] = useState([]);
	const [isExecuting, setIsExecuting] = useState(false);

	const navigate = useNavigate();
	const location = useLocation();

	// Determine current chapter from URL
	const chapterMatch = location.pathname.match(/chapter(\d)/);
	const currentChapter = chapterMatch ? Number(chapterMatch[1]) : 1;

	const goToChapter = (chapter) => {
		navigate(`chapter${chapter}`);
	};

	// Execute GraphQL query
	const executeQuery = async () => {
		setIsExecuting(true);
		
		// Simulate query execution
		await new Promise(resolve => setTimeout(resolve, 800));
		
		// Parse and execute query
		const result = simulateGraphQLExecution(currentQuery, selectedOperation);
		setQueryResult(result);
		
		// Add to history
		setQueryHistory(prev => [...prev, {
			query: currentQuery,
			operation: selectedOperation,
			timestamp: Date.now(),
			result: result
		}].slice(-10));
		
		setIsExecuting(false);
	};

	// Simulate GraphQL execution
	const simulateGraphQLExecution = (query, operation) => {
		if (operation === 'query') {
			// Simple query simulation
			if (query.includes('user')) {
				return {
					data: {
						user: {
							id: '1',
							name: 'Aria',
							email: 'aria@reactkingdom.com',
							posts: [
								{ id: '1', title: 'Learning GraphQL' },
								{ id: '2', title: 'Query Mastery' }
							]
						}
					}
				};
			} else if (query.includes('posts')) {
				return {
					data: {
						posts: [
							{ id: '1', title: 'GraphQL Basics', author: { name: 'Aria' } },
							{ id: '2', title: 'Advanced Queries', author: { name: 'Binary' } }
						]
					}
				};
			}
		} else if (operation === 'mutation') {
			return {
				data: {
					createPost: {
						id: '3',
						title: 'New Post',
						success: true
					}
				}
			};
		} else if (operation === 'subscription') {
			// Add to active subscriptions
			const subId = Date.now();
			setSubscriptions(prev => [...prev, { id: subId, query, active: true }]);
			return {
				subscription: {
					id: subId,
					status: 'active'
				}
			};
		}
		
		return { data: null };
	};

	// Add fragment
	const addFragment = (name, definition) => {
		setFragments(prev => [...prev, { name, definition }]);
	};

	// Clear all data
	const clearAll = () => {
		setCurrentQuery('');
		setQueryResult(null);
		setQueryHistory([]);
		setSubscriptions([]);
	};

	// Simulate subscription updates
	useEffect(() => {
		if (subscriptions.some(sub => sub.active)) {
			const interval = setInterval(() => {
				setSubscriptions(prev => prev.map(sub => {
					if (sub.active && Math.random() > 0.7) {
						return {
							...sub,
							lastUpdate: {
								data: `Update at ${new Date().toLocaleTimeString()}`,
								timestamp: Date.now()
							}
						};
					}
					return sub;
				}));
			}, 3000);
			
			return () => clearInterval(interval);
		}
	}, [subscriptions]);

	return (
		<div className='lesson-container'>
			<h1 className='lesson-title'>GraphQL Gateway</h1>
			<p className='lesson-subtitle'>
				Master the art of precise data fetching with GraphQL
			</p>

			<div className='chapter-navigation'>
				<button
					onClick={() => goToChapter(currentChapter - 1)}
					disabled={currentChapter === 1}
					className='chapter-nav-button'>
					← Previous Chapter
				</button>
				<span className='chapter-indicator'>
					Chapter {currentChapter} of 3
				</span>
				<button
					onClick={() => goToChapter(currentChapter + 1)}
					disabled={currentChapter === 3}
					className='chapter-nav-button'>
					Next Chapter →
				</button>
			</div>

			{/* Render the current chapter */}
			<Outlet
				context={{
					currentQuery,
					setCurrentQuery,
					queryResult,
					schema,
					queryHistory,
					selectedOperation,
					setSelectedOperation,
					fragments,
					subscriptions,
					isExecuting,
					executeQuery,
					addFragment,
					clearAll
				}}
			/>

			<div className='chapter-navigation'>
				<button
					onClick={() => goToChapter(currentChapter - 1)}
					disabled={currentChapter === 1}
					className='chapter-nav-button'>
					← Previous Chapter
				</button>
				<span className='chapter-indicator'>
					Chapter {currentChapter} of 3
				</span>
				<button
					onClick={() => goToChapter(currentChapter + 1)}
					disabled={currentChapter === 3}
					className='chapter-nav-button'>
					Next Chapter →
				</button>
			</div>

			<LessonNavigation
				courseId='server-data'
				lessonId='graphql-gateway'
			/>
		</div>
	);
}

export default GraphQLGateway;