import { useParams } from 'react-router-dom';
import ComponentsBasicsOverview from '../components-basics/ComponentsBasicsOverview';
import StateManagementOverview from '../state-management/StateManagementOverview';
import PropsDataFlowOverview from '../props-data-flow/PropsDataFlowOverview';
import HooksInActionOverview from '../hooks-in-action/HooksInActionOverview';
import FormsEventsOverview from '../forms-events/FormsEventsOverview';
import RoutingNavigationOverview from '../routing-navigation/RoutingNavigationOverview';
import PerformanceOptimizationOverview from '../performance-optimization/PerformanceOptimizationOverview';
import TestingDebuggingOverview from '../testing-debugging/TestingDebuggingOverview';
import AdvancedPatternsOverview from '../advanced-patterns/AdvancedPatternsOverview';
import ReactEcosystemOverview from '../react-ecosystem/ReactEcosystemOverview';
import ServerDataOverview from '../server-data/ServerDataOverview';
import TypeScriptReactOverview from '../typescript-react/TypeScriptReactOverview';
import BuildDeployOverview from '../build-deploy/BuildDeployOverview';
import ReactNativeOverview from '../react-native/ReactNativeOverview';
import AccessibilityOverview from '../accessibility/AccessibilityOverview';

const courseListMap = {
	'components-basics': <ComponentsBasicsOverview />,
	'state-management': <StateManagementOverview />,
	'props-data-flow': <PropsDataFlowOverview />,
	'hooks-in-action': <HooksInActionOverview />,
	'forms-events': <FormsEventsOverview />,
	'routing-navigation': <RoutingNavigationOverview />,
	'performance-optimization': <PerformanceOptimizationOverview />,
	'testing-debugging': <TestingDebuggingOverview />,
	'advanced-patterns': <AdvancedPatternsOverview />,
	'react-ecosystem': <ReactEcosystemOverview />,
	'server-data': <ServerDataOverview />,
	'typescript-react': <TypeScriptReactOverview />,
	'build-deploy': <BuildDeployOverview />,
	'react-native': <ReactNativeOverview />,
	'accessibility': <AccessibilityOverview />,
};
const CourseList = () => {
	const { courseId } = useParams();

	return <>{courseListMap[courseId]}</>;
};

export default CourseList;
