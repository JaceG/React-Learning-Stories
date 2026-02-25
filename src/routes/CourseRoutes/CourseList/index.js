import { useParams } from 'react-router-dom';
import ComponentsBasicsOverview from '../../../learning-paths/components-basics/ComponentsBasicsOverview';
import StateManagementOverview from '../../../learning-paths/state-management/StateManagementOverview';
import PropsDataFlowOverview from '../../../learning-paths/props-data-flow/PropsDataFlowOverview';
import HooksInActionOverview from '../../../learning-paths/hooks-in-action/HooksInActionOverview';
import FormsEventsOverview from '../../../learning-paths/forms-events/FormsEventsOverview';
import RoutingNavigationOverview from '../../../learning-paths/routing-navigation/RoutingNavigationOverview';
import PerformanceOptimizationOverview from '../../../learning-paths/performance-optimization/PerformanceOptimizationOverview';
import TestingDebuggingOverview from '../../../learning-paths/testing-debugging/TestingDebuggingOverview';
import AdvancedPatternsOverview from '../../../learning-paths/advanced-patterns/AdvancedPatternsOverview';
import ReactEcosystemOverview from '../../../learning-paths/react-ecosystem/ReactEcosystemOverview';
import ServerDataOverview from '../../../learning-paths/server-data/ServerDataOverview';
import TypeScriptReactOverview from '../../../learning-paths/typescript-react/TypeScriptReactOverview';
import BuildDeployOverview from '../../../learning-paths/build-deploy/BuildDeployOverview';
import FullStackReactOverview from '../../../learning-paths/full-stack-react/FullStackReactOverview';
import AccessibilityOverview from '../../../learning-paths/accessibility/AccessibilityOverview';

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
	'full-stack-react': <FullStackReactOverview />,
	'accessibility': <AccessibilityOverview />,
};
const CourseList = () => {
	const { courseId } = useParams();

	return <>{courseListMap[courseId]}</>;
};

export default CourseList;
