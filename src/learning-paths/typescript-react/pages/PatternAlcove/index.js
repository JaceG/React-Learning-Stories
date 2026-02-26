import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import LessonHeader from '../../../../components/layout/LessonHeader';
import LessonFooter from '../../../../components/layout/LessonFooter';
import '../../../CourseStyles.css';
import './PatternAlcove.css';

function PatternAlcove() {
	const [forgedGenerics, setForgedGenerics] = useState([]);
	const [selectedGeneric, setSelectedGeneric] = useState(null);
	const [forgeLevel, setForgeLevel] = useState('apprentice');
	const [genericMastery, setGenericMastery] = useState(0);

	// Forge a new generic
	const forgeGeneric = (generic) => {
		setForgedGenerics([...forgedGenerics, generic]);
		setGenericMastery(prev => Math.min(100, prev + 10));
	};

	// Select a generic pattern
	const selectGeneric = (generic) => {
		setSelectedGeneric(generic);
	};

	// Level up the forge
	const levelUp = (newLevel) => {
		setForgeLevel(newLevel);
	};

	return (
		<div className='lesson-container'>
			<LessonHeader
				title={`The Generic Forge`}
				subtitle={`Master the art of flexible, reusable types with TypeScript generics`}
				opener={`Deep within the TypeScript Kingdom lay the Generic Forge, where types were shaped to fit any need. Master Typhos, the legendary type smith, awaited his newest apprentice. "Generics," he said, striking his anvil with a glowing type parameter, "are the key to true reusability. They allow components to adapt without losing type safety. Are you ready to forge your first flexible type?"`}
				totalChapters={3}
			/>

			<Outlet
				context={{
					forgedGenerics,
					forgeGeneric,
					selectedGeneric,
					selectGeneric,
					forgeLevel,
					levelUp,
					genericMastery,
					setGenericMastery
				}}
			/>

			<LessonFooter
				courseId={`typescript-react`}
				lessonId={`pattern-alcove`}
				totalChapters={3}
			/>
		</div>
	);
}

export default PatternAlcove;
