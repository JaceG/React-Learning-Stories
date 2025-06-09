import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import LessonNavigation from '../../../../components/layout/LessonNavigation';
import '../../../CourseStyles.css';
import './ApiIntegration.css';

function ApiIntegration() {
	const [selectedMethod, setSelectedMethod] = useState('GET');
	const [apiResponse, setApiResponse] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [headers, setHeaders] = useState({});
	const [requestBody, setRequestBody] = useState('');
	const [selectedProtocol, setSelectedProtocol] = useState('REST');
	const [interceptors, setInterceptors] = useState([]);
	const [cacheEnabled, setCacheEnabled] = useState(false);
	const [retryCount, setRetryCount] = useState(0);

	const navigate = useNavigate();
	const location = useLocation();

	// Determine current chapter from URL
	const chapterMatch = location.pathname.match(/chapter(\d)/);
	const currentChapter = chapterMatch ? Number(chapterMatch[1]) : 1;

	const goToChapter = (chapter) => {
		navigate(`chapter${chapter}`);
	};

	// Simulate API request
	const makeRequest = async (endpoint, options = {}) => {
		setIsLoading(true);
		setError(null);
		
		// Simulate network delay
		await new Promise(resolve => setTimeout(resolve, 1000));
		
		try {
			// Mock successful response
			const mockResponse = {
				status: 200,
				data: {
					message: "Connection to Cloud Citadel established!",
					endpoint,
					method: options.method || 'GET',
					timestamp: new Date().toISOString()
				}
			};
			setApiResponse(mockResponse);
		} catch (err) {
			setError(err.message);
		} finally {
			setIsLoading(false);
		}
	};

	// Add interceptor
	const addInterceptor = (type, handler) => {
		setInterceptors([...interceptors, { type, handler }]);
	};

	// Toggle cache
	const toggleCache = () => {
		setCacheEnabled(!cacheEnabled);
	};

	// Handle retry
	const handleRetry = () => {
		setRetryCount(retryCount + 1);
		// Trigger request retry logic
	};

	return (
		<div className='lesson-container'>
			<h1 className='lesson-title'>API Integration</h1>
			<p className='lesson-subtitle'>
				Journey to the Cloud Citadel and master server communication
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
					selectedMethod,
					setSelectedMethod,
					apiResponse,
					setApiResponse,
					isLoading,
					setIsLoading,
					error,
					setError,
					headers,
					setHeaders,
					requestBody,
					setRequestBody,
					makeRequest,
					selectedProtocol,
					setSelectedProtocol,
					interceptors,
					addInterceptor,
					cacheEnabled,
					toggleCache,
					retryCount,
					handleRetry
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
				lessonId='api-integration'
			/>
		</div>
	);
}

export default ApiIntegration;