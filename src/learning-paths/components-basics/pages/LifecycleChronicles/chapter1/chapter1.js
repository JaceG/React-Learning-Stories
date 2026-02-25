import { useState } from 'react';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import StorySection from '../../../../../components/content/StorySection';
import useNarrative from '../../../../../hooks/useNarrative';

const ChapterOne = () => {
	const { narrative, loading } = useNarrative('components-basics', 'LifecycleChronicles', 1);

	const [isComponentBorn, setIsComponentBorn] = useState(false);
	const [componentAge, setComponentAge] = useState(0);
	const [isComponentRetired, setIsComponentRetired] = useState(false);
	const [lifecycleMessages, setLifecycleMessages] = useState([]);

	const birthComponent = () => {
		if (!isComponentBorn && !isComponentRetired) {
			setIsComponentBorn(true);
			addLifecycleMessage(
				'Component is born (mounted)! Constructor called.'
			);
			addLifecycleMessage(
				'Component runs setup code in componentDidMount.'
			);
		}
	};

	const updateComponent = () => {
		if (isComponentBorn && !isComponentRetired) {
			setComponentAge((prevAge) => {
				const newAge = prevAge + 1;
				addLifecycleMessage(
					`Component is updated! Age is now ${newAge}.`
				);
				addLifecycleMessage(
					'Component runs componentDidUpdate after changes.'
				);
				return newAge;
			});
		}
	};

	const retireComponent = () => {
		if (isComponentBorn && !isComponentRetired) {
			setIsComponentRetired(true);
			addLifecycleMessage('Component is retiring...');
			addLifecycleMessage(
				'Component runs cleanup in componentWillUnmount.'
			);
			addLifecycleMessage('Component has been removed from the DOM.');
		}
	};

	const resetDemo = () => {
		setIsComponentBorn(false);
		setComponentAge(0);
		setIsComponentRetired(false);
		setLifecycleMessages([]);
	};

	const addLifecycleMessage = (message) => {
		setLifecycleMessages((prev) => [
			...prev,
			{ id: Date.now() + Math.random(), text: message },
		]);
	};

	if (loading || !narrative) return <div className="chapter loading">Loading...</div>;

	return (
		<div className='chapter'>
			<ChapterIntro chapterNumber={1} title={narrative.title} />

			<StorySection
				paragraphs={narrative.storySections[0]}
			/>

			<div className='lifecycle-diagram'>
				<div className='lifecycle-stage'>
					<div className='lifecycle-icon mounting'></div>
					<h3>Mounting</h3>
					<p>Component enters the DOM</p>
					<ul>
						<li>Constructor</li>
						<li>render</li>
						<li>componentDidMount</li>
					</ul>
				</div>

				<div className='lifecycle-connector'></div>

				<div className='lifecycle-stage'>
					<div className='lifecycle-icon updating'></div>
					<h3>Updating</h3>
					<p>Component re-renders when props or state change</p>
					<ul>
						<li>shouldComponentUpdate</li>
						<li>render</li>
						<li>componentDidUpdate</li>
					</ul>
				</div>

				<div className='lifecycle-connector'></div>

				<div className='lifecycle-stage'>
					<div className='lifecycle-icon unmounting'></div>
					<h3>Unmounting</h3>
					<p>Component leaves the DOM</p>
					<ul>
						<li>componentWillUnmount</li>
					</ul>
				</div>
			</div>

			<StorySection
				paragraphs={narrative.storySections[1]}
			/>

			<div className='interactive-section'>
				<h3 className='section-title'>
					Interactive Exercise: The Time Keeper's Hourglass
				</h3>
				<InstructionBox character='Chronos hands you a magical hourglass.'>
					"This hourglass will let you control a component's
					lifecycle. Watch carefully as it moves through each stage of
					existence."
				</InstructionBox>

				<div className='lifecycle-demo'>
					<div className='component-visualization'>
						{!isComponentBorn && !isComponentRetired ? (
							<div className='component-unborn'>
								<p>Component waiting to be created...</p>
							</div>
						) : isComponentBorn && !isComponentRetired ? (
							<div className='component-active'>
								<div className='component-header'>
									<h4>DemoComponent</h4>
								</div>
								<div className='component-body'>
									<p>Age: {componentAge}</p>
									<p>Status: Active</p>
								</div>
							</div>
						) : (
							<div className='component-retired'>
								<p>Component has been unmounted.</p>
							</div>
						)}
					</div>

					<div className='lifecycle-controls'>
						<button
							onClick={birthComponent}
							disabled={isComponentBorn}
							className='lifecycle-button mount-button'>
							Mount Component
						</button>
						<button
							onClick={updateComponent}
							disabled={!isComponentBorn || isComponentRetired}
							className='lifecycle-button update-button'>
							Update Component
						</button>
						<button
							onClick={retireComponent}
							disabled={!isComponentBorn || isComponentRetired}
							className='lifecycle-button unmount-button'>
							Unmount Component
						</button>
						<button
							onClick={resetDemo}
							className='lifecycle-button reset-button'>
							Reset Demo
						</button>
					</div>

					<div className='lifecycle-log'>
						<h4>Lifecycle Log:</h4>
						<div className='log-entries'>
							{lifecycleMessages.length === 0 ? (
								<p className='empty-log'>
									No lifecycle events yet. Try mounting the
									component.
								</p>
							) : (
								lifecycleMessages.map((message) => (
									<div key={message.id} className='log-entry'>
										{message.text}
									</div>
								))
							)}
						</div>
					</div>
				</div>
			</div>

			<StorySection
				paragraphs={narrative.storySections[2]}
			/>

			<ChapterSummary
				characterIntros={narrative.characterIntros}
				lessonInsight={narrative.lessonInsight}
				reflectionQuestions={narrative.reflectionQuestions}
				journalEntry={narrative.journalEntry}
				lessonEnding={narrative.lessonEnding}
			/>
		</div>
	);
};

export default ChapterOne;
