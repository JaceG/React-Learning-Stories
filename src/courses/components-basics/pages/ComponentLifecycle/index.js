import React, { useState } from 'react';
import '../../../CourseStyles.css';
import './ComponentLifecycle.css';
import LessonNavigation from '../../../../components/layout/LessonNavigation';
import ChapterOne from './chapter1/chapter1';
import ChapterTwo from './chapter2/chapter2';
import ChapterThree from './chapter3/chapter3';

function ComponentLifecycle() {
	const [currentChapter, setCurrentChapter] = useState(1);
	const [isComponentBorn, setIsComponentBorn] = useState(false);
	const [componentAge, setComponentAge] = useState(0);
	const [isComponentRetired, setIsComponentRetired] = useState(false);
	const [lifecycleMessages, setLifecycleMessages] = useState([]);

	// Function to simulate component birth (mounting)
	const birthComponent = () => {
		if (!isComponentBorn && !isComponentRetired) {
			setIsComponentBorn(true);

			// Customize messages based on which chapter is active
			if (currentChapter === 2) {
				addLifecycleMessage(
					'constructor() is called: initializing state and binding methods.'
				);
				addLifecycleMessage(
					'render() is called: component describes its UI.'
				);
				addLifecycleMessage(
					'componentDidMount() is called: component is now in the DOM.'
				);
				addLifecycleMessage(
					'Initial API request sent to fetch user data...'
				);
			} else if (currentChapter === 3) {
				addLifecycleMessage(
					'constructor() is called: initializing component state.'
				);
				addLifecycleMessage(
					'render() is called: component describes its UI.'
				);
				addLifecycleMessage(
					'componentDidMount() is called: ResourceComponent is now in the DOM.'
				);
				addLifecycleMessage('ResourceComponent starts timer interval.');
				addLifecycleMessage(
					'ResourceComponent adds window resize listener.'
				);
				addLifecycleMessage(
					'ResourceComponent subscribes to data stream.'
				);
				addLifecycleMessage(
					'ResourceComponent initiates network requests.'
				);
			} else {
				addLifecycleMessage(
					'Component is born (mounted)! Constructor called.'
				);
				addLifecycleMessage(
					'Component runs setup code in componentDidMount.'
				);
			}
		}
	};

	// Function to simulate component update
	const updateComponent = () => {
		if (isComponentBorn && !isComponentRetired) {
			// Use the function form of setState to ensure we're working with the latest state
			setComponentAge((prevAge) => {
				const newAge = prevAge + 1;

				// Customize messages based on which chapter is active
				if (currentChapter === 2) {
					addLifecycleMessage(
						`shouldComponentUpdate() is called: checking if update is needed.`
					);
					addLifecycleMessage(
						`render() is called during update: component re-renders.`
					);
					addLifecycleMessage(
						`componentDidUpdate() is called: handling side effects after update.`
					);

					if (prevAge === 0) {
						addLifecycleMessage(
							`User data loaded successfully! Profile now displaying.`
						);
					} else {
						addLifecycleMessage(
							`Profile updated with new user data (update #${
								newAge - 1
							}).`
						);
					}
				} else if (currentChapter === 3) {
					addLifecycleMessage(
						`shouldComponentUpdate() is called: checking if update is needed.`
					);
					addLifecycleMessage(
						`render() is called during update: component re-renders.`
					);
					addLifecycleMessage(
						`componentDidUpdate() is called: resources active for ${newAge} seconds.`
					);

					// Messages specific to resource activity
					if (newAge % 3 === 0) {
						addLifecycleMessage(
							`Timer interval fires, updating component state.`
						);
					}
					if (newAge % 4 === 0) {
						addLifecycleMessage(
							`Data subscription receives new data packet.`
						);
					}
					if (newAge % 5 === 0) {
						addLifecycleMessage(
							`New network request initiated to refresh data.`
						);
					}
				} else {
					addLifecycleMessage(
						`Component is updated! Age is now ${newAge}.`
					);
					addLifecycleMessage(
						'Component runs componentDidUpdate after changes.'
					);
				}

				return newAge;
			});
		}
	};

	// Function to simulate component retirement (unmounting)
	const retireComponent = () => {
		if (isComponentBorn && !isComponentRetired) {
			setIsComponentRetired(true);

			// Customize messages based on which chapter is active
			if (currentChapter === 2) {
				addLifecycleMessage(
					'componentWillUnmount() is called: preparing to unmount...'
				);
				addLifecycleMessage(
					'Cleanup tasks performed: canceling network requests, removing event listeners.'
				);
				addLifecycleMessage('Component has been removed from the DOM.');
			} else if (currentChapter === 3) {
				// Only add these messages if we haven't already added a custom unmount message
				if (
					!lifecycleMessages.some((msg) =>
						msg.text.includes('without cleanup')
					)
				) {
					addLifecycleMessage(
						'componentWillUnmount() is called: preparing for cleanup...'
					);
					addLifecycleMessage(
						'Canceling timer interval with clearInterval()'
					);
					addLifecycleMessage(
						'Removing window event listeners with removeEventListener()'
					);
					addLifecycleMessage(
						'Unsubscribing from data sources with unsubscribe()'
					);
					addLifecycleMessage(
						'Aborting network requests with abortController.abort()'
					);
					addLifecycleMessage('All resources properly cleaned up.');
					addLifecycleMessage(
						'Component has been removed from the DOM.'
					);
				}
			} else {
				addLifecycleMessage('Component is retiring...');
				addLifecycleMessage(
					'Component runs cleanup in componentWillUnmount.'
				);
				addLifecycleMessage('Component has been removed from the DOM.');
			}
		}
	};

	// Function to reset the simulation
	const resetDemo = () => {
		setIsComponentBorn(false);
		setComponentAge(0);
		setIsComponentRetired(false);
		setLifecycleMessages([]);
	};

	// Helper to add messages to the lifecycle log
	const addLifecycleMessage = (message) => {
		setLifecycleMessages((prev) => [
			...prev,
			{ text: message, id: Date.now() },
		]);
	};

	// Navigation functions
	const nextChapter = () => {
		if (currentChapter < 3) {
			setCurrentChapter(currentChapter + 1);
		}
	};

	const prevChapter = () => {
		if (currentChapter > 1) {
			setCurrentChapter(currentChapter - 1);
		}
	};

	return (
		<div className='lesson-container'>
			<h1 className='lesson-title'>The Lifecycle Chronicles</h1>
			<p className='lesson-subtitle'>
				The journey of a component from birth to retirement
			</p>

			<div className='chapter-navigation'>
				<button
					onClick={prevChapter}
					disabled={currentChapter === 1}
					className='chapter-nav-button'>
					← Previous Chapter
				</button>
				<span className='chapter-indicator'>
					Chapter {currentChapter} of 3
				</span>
				<button
					onClick={nextChapter}
					disabled={currentChapter === 3}
					className='chapter-nav-button'>
					Next Chapter →
				</button>
			</div>

			{/* Chapter 1: The Component Life Stages */}
			{currentChapter === 1 && (
				<ChapterOne
					birthComponent={birthComponent}
					updateComponent={updateComponent}
					retireComponent={retireComponent}
					resetDemo={resetDemo}
					isComponentBorn={isComponentBorn}
					isComponentRetired={isComponentRetired}
					componentAge={componentAge}
					lifecycleMessages={lifecycleMessages}
					addLifecycleMessage={addLifecycleMessage}
				/>
			)}

			{/* Chapter 2: The Mount and Update Chronicles */}
			{currentChapter === 2 && (
				<ChapterTwo
					birthComponent={birthComponent}
					updateComponent={updateComponent}
					retireComponent={retireComponent}
					resetDemo={resetDemo}
					isComponentBorn={isComponentBorn}
					isComponentRetired={isComponentRetired}
					componentAge={componentAge}
					lifecycleMessages={lifecycleMessages}
					addLifecycleMessage={addLifecycleMessage}
				/>
			)}

			{/* Chapter 3: The Farewell Ceremony */}
			{currentChapter === 3 && (
				<ChapterThree
					birthComponent={birthComponent}
					updateComponent={updateComponent}
					retireComponent={retireComponent}
					resetDemo={resetDemo}
					isComponentBorn={isComponentBorn}
					isComponentRetired={isComponentRetired}
					componentAge={componentAge}
					lifecycleMessages={lifecycleMessages}
					addLifecycleMessage={addLifecycleMessage}
				/>
			)}

			{/* Add chapter-navigation at the bottom, just above LessonNavigation */}
			<div className='chapter-navigation'>
				<button
					onClick={prevChapter}
					disabled={currentChapter === 1}
					className='chapter-nav-button'>
					← Previous Chapter
				</button>
				<span className='chapter-indicator'>
					Chapter {currentChapter} of 3
				</span>
				<button
					onClick={nextChapter}
					disabled={currentChapter === 3}
					className='chapter-nav-button'>
					Next Chapter →
				</button>
			</div>

			<LessonNavigation
				courseId='components-basics'
				lessonId='component-lifecycle'
			/>
		</div>
	);
}

export default ComponentLifecycle;
