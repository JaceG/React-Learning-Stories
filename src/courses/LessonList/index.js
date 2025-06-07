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
import UseStateSpells from '../hooks-in-action/pages/UseStateSpells';
import UseEffectEnchantments from '../hooks-in-action/pages/UseEffectEnchantments';
import CustomHookCrafting from '../hooks-in-action/pages/CustomHookCrafting';
import HookPatternMastery from '../hooks-in-action/pages/HookPatternMastery';
import FormAlchemy from '../forms-events/pages/FormAlchemy';
import EventSymphony from '../forms-events/pages/EventSymphony';
import ValidationGuardians from '../forms-events/pages/ValidationGuardians';
import SubmissionPortals from '../forms-events/pages/SubmissionPortals';
import NavigationCompass from '../routing-navigation/pages/NavigationCompass';
import GuardianGates from '../routing-navigation/pages/GuardianGates';
import WaypointWizardry from '../routing-navigation/pages/WaypointWizardry';
import PortalPassages from '../routing-navigation/pages/PortalPassages';

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
	'hooks-in-action': {
		'use-state-spells': <UseStateSpells />,
		'use-effect-enchantments': <UseEffectEnchantments />,
		'custom-hook-crafting': <CustomHookCrafting />,
		'hook-pattern-mastery': <HookPatternMastery />,
	},
	'forms-events': {
		'form-alchemy': <FormAlchemy />,
		'event-symphony': <EventSymphony />,
		'validation-guardians': <ValidationGuardians />,
		'submission-portals': <SubmissionPortals />,
	},
	'routing-navigation': {
		'navigation-compass': <NavigationCompass />,
		'guardian-gates': <GuardianGates />,
		'waypoint-wizardry': <WaypointWizardry />,
		'portal-passages': <PortalPassages />,
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
