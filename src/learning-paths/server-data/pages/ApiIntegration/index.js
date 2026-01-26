import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { LessonHeader, LessonFooter } from '../../../../components/layout';
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
			<LessonHeader
				title={`API Integration`}
				subtitle={`Journey to the Cloud Citadel and master server communication`}
				opener={`The morning mist parted to reveal the Cloud Citadel - a massive structure floating above the React Kingdom, connected by ethereal data streams. Cloud Keeper Axios greeted Aria and Binary: "Welcome! Here, we bridge the gap between earth and sky, client and server. Your first lesson: speaking with distant servers."`}
				totalChapters={3}
			/>

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

			<LessonFooter
				courseId={`server-data`}
				lessonId={`api-integration`}
				totalChapters={3}
			/>
		</div>
	);
}

export default ApiIntegration;