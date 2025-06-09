import { useParams } from 'react-router-dom';
import ComponentKingdom from '../../../learning-paths/components-basics/pages/ComponentKingdom';
import PropsMessengers from '../../../learning-paths/components-basics/pages/PropsMessengers';
import JsxMagic from '../../../learning-paths/components-basics/pages/JsxMagic';
import ComponentLifecycle from '../../../learning-paths/components-basics/pages/ComponentLifecycle';
import StateSorcerers from '../../../learning-paths/state-management/pages/StateSorcerers';
import MagicalHooks from '../../../learning-paths/state-management/pages/MagicalHooks';
import GrandContext from '../../../learning-paths/state-management/pages/GrandContext';
import StateManagementAdventures from '../../../learning-paths/state-management/pages/StateManagementAdventures';
import PropsCaravans from '../../../learning-paths/props-data-flow/pages/PropsCaravans';
import DataRivers from '../../../learning-paths/props-data-flow/pages/DataRivers';
import PropForge from '../../../learning-paths/props-data-flow/pages/PropForge';
import EventEchoes from '../../../learning-paths/props-data-flow/pages/EventEchoes';
import UseStateSpells from '../../../learning-paths/hooks-in-action/pages/UseStateSpells';
import UseEffectEnchantments from '../../../learning-paths/hooks-in-action/pages/UseEffectEnchantments';
import CustomHookCrafting from '../../../learning-paths/hooks-in-action/pages/CustomHookCrafting';
import HookPatternMastery from '../../../learning-paths/hooks-in-action/pages/HookPatternMastery';
import FormAlchemy from '../../../learning-paths/forms-events/pages/FormAlchemy';
import EventSymphony from '../../../learning-paths/forms-events/pages/EventSymphony';
import ValidationGuardians from '../../../learning-paths/forms-events/pages/ValidationGuardians';
import SubmissionPortals from '../../../learning-paths/forms-events/pages/SubmissionPortals';
import NavigationCompass from '../../../learning-paths/routing-navigation/pages/NavigationCompass';
import GuardianGates from '../../../learning-paths/routing-navigation/pages/GuardianGates';
import WaypointWizardry from '../../../learning-paths/routing-navigation/pages/WaypointWizardry';
import PortalPassages from '../../../learning-paths/routing-navigation/pages/PortalPassages';
import SpeedSanctum from '../../../learning-paths/performance-optimization/pages/SpeedSanctum';
import MemoryMonastery from '../../../learning-paths/performance-optimization/pages/MemoryMonastery';
import LazyLibrary from '../../../learning-paths/performance-optimization/pages/LazyLibrary';
import VirtualizationVault from '../../../learning-paths/performance-optimization/pages/VirtualizationVault';
import TestingTower from '../../../learning-paths/testing-debugging/pages/TestingTower';
import DebugDungeon from '../../../learning-paths/testing-debugging/pages/DebugDungeon';
import IntegrationInn from '../../../learning-paths/testing-debugging/pages/IntegrationInn';
import ErrorEnchantments from '../../../learning-paths/testing-debugging/pages/ErrorEnchantments';
import CompoundComponents from '../../../learning-paths/advanced-patterns/pages/CompoundComponents';
import RenderProps from '../../../learning-paths/advanced-patterns/pages/RenderProps';
import HigherOrderComponents from '../../../learning-paths/advanced-patterns/pages/HigherOrderComponents';
import PortalsRefs from '../../../learning-paths/advanced-patterns/pages/PortalsRefs';
import StateManagementLibraries from '../../../learning-paths/react-ecosystem/pages/StateManagementLibraries';
import StylingSolutions from '../../../learning-paths/react-ecosystem/pages/StylingSolutions';
import FormLibraries from '../../../learning-paths/react-ecosystem/pages/FormLibraries';
import AnimationLibraries from '../../../learning-paths/react-ecosystem/pages/AnimationLibraries';
import ApiIntegration from '../../../learning-paths/server-data/pages/ApiIntegration';
import RealtimeConnections from '../../../learning-paths/server-data/pages/RealtimeConnections';
import CachingCastle from '../../../learning-paths/server-data/pages/CachingCastle';
import GraphQLGateway from '../../../learning-paths/server-data/pages/GraphQLGateway';
import TypeForge from '../../../learning-paths/typescript-react/pages/TypeForge';
import ComponentArmory from '../../../learning-paths/typescript-react/pages/ComponentArmory';
import GenericForge from '../../../learning-paths/typescript-react/pages/GenericForge';
import TypeGuardTower from '../../../learning-paths/typescript-react/pages/TypeGuardTower';

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
	'performance-optimization': {
		'speed-sanctum': <SpeedSanctum />,
		'memory-monastery': <MemoryMonastery />,
		'lazy-library': <LazyLibrary />,
		'virtualization-vault': <VirtualizationVault />,
	},
	'testing-debugging': {
		'testing-tower': <TestingTower />,
		'debug-dungeon': <DebugDungeon />,
		'integration-inn': <IntegrationInn />,
		'error-enchantments': <ErrorEnchantments />,
	},
	'advanced-patterns': {
		'compound-components': <CompoundComponents />,
		'render-props': <RenderProps />,
		'higher-order-components': <HigherOrderComponents />,
		'portals-refs': <PortalsRefs />,
	},
	'react-ecosystem': {
		'state-libraries': <StateManagementLibraries />,
		'styling-solutions': <StylingSolutions />,
		'form-libraries': <FormLibraries />,
		'animation-libraries': <AnimationLibraries />,
	},
	'server-data': {
		'api-integration': <ApiIntegration />,
		'realtime-connections': <RealtimeConnections />,
		'caching-castle': <CachingCastle />,
		'graphql-gateway': <GraphQLGateway />,
	},
	'typescript-react': {
		'type-forge': <TypeForge />,
		'component-armory': <ComponentArmory />,
		'generic-forge': <GenericForge />,
		'type-guard-tower': <TypeGuardTower />,
	},
};
const LessonList = () => {
	const { lessonId, courseId } = useParams();

	if (!courseListMap[courseId] || !courseListMap[courseId][lessonId]) {
		return (
			<div>
				Lesson not found - Course: {courseId}, Lesson: {lessonId}
			</div>
		);
	}

	return <>{courseListMap[courseId][lessonId]}</>;
};

export default LessonList;
