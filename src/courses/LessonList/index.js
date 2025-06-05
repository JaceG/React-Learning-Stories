import { useParams } from 'react-router-dom';
import ComponentKingdom from '../components-basics/pages/ComponentKingdom';
import PropsMessengers from '../components-basics/pages/PropsMessengers';
import JsxMagic from '../components-basics/pages/JsxMagic';
import ComponentLifecycle from '../components-basics/pages/ComponentLifecycle';
import StateSorcerers from '../state-management/pages/StateSorcerers';
import MagicalHooks from '../state-management/pages/MagicalHooks';
import GrandContext from '../state-management/pages/GrandContext';
import StateManagementAdventures from '../state-management/pages/StateManagementAdventures';
import PropsCaravans from '../props-data-flow/pages/PropsCaravans';
import DataRivers from '../props-data-flow/pages/DataRivers';
import PropForge from '../props-data-flow/pages/PropForge';
import EventEchoes from '../props-data-flow/pages/EventEchoes';

const courseListMap = {
	'components-basics': {
		'component-kingdom': <ComponentKingdom />,
		'props-messengers': <PropsMessengers />,
		'jsx-magic': <JsxMagic />,
		'component-lifecycle': <ComponentLifecycle />,
	},
	'state-management': {
		'state-sorcerers': <StateSorcerers />,
		'magical-hooks': <MagicalHooks />,
		'grand-context': <GrandContext />,
		'state-management-adventures': <StateManagementAdventures />,
	},
	'props-data-flow': {
		'props-caravans': <PropsCaravans />,
		'data-rivers': <DataRivers />,
		'prop-forge': <PropForge />,
		'event-echoes': <EventEchoes />,
	},
};
const LessonList = () => {
	const { lessonId, courseId } = useParams();

	if (!courseListMap[courseId] || !courseListMap[courseId][lessonId]) {
		return <div>Lesson not found - Course: {courseId}, Lesson: {lessonId}</div>;
	}

	return <>{courseListMap[courseId][lessonId]}</>;
};

export default LessonList;
