import { useParams } from 'react-router-dom';
import ComponentKingdom from '../components-basics/pages/ComponentKingdom';
import PropsMessengers from '../components-basics/pages/PropsMessengers';
import JsxMagic from '../components-basics/pages/JsxMagic';
import ComponentLifecycle from '../components-basics/pages/ComponentLifecycle';
import StateSorcerers from '../state-management/pages/StateSorcerers';
import MagicalHooks from '../state-management/pages/MagicalHooks';
import GrandContext from '../state-management/pages/GrandContext';
import StateManagementAdventures from '../state-management/pages/StateManagementAdventures';

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
};
const LessonList = () => {
	const { lessonId, courseId } = useParams();

	return <>{courseListMap[courseId][lessonId]}</>;
};

export default LessonList;
