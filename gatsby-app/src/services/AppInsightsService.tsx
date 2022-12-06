import { ReactPlugin } from '@microsoft/applicationinsights-react-js';
import {
    ApplicationInsights,
    ITelemetryItem,
} from '@microsoft/applicationinsights-web';
import { globalHistory } from '@reach/router';

const reactPlugin = new ReactPlugin();
const appInsights = new ApplicationInsights({
    config: {
        connectionString:
            'InstrumentationKey=bb207abd-66f1-469f-a3fb-49cdc92d356e;IngestionEndpoint=https://westeurope-5.in.applicationinsights.azure.com/;LiveEndpoint=https://westeurope.livediagnostics.monitor.azure.com/',
        extensions: [reactPlugin],
        extensionConfig: {
            [reactPlugin.identifier]: { history: globalHistory },
        },
        disableAjaxTracking: false,
        autoTrackPageVisitTime: true,
        enableCorsCorrelation: true,
        enableRequestHeaderTracking: true,
        enableResponseHeaderTracking: true,
    },
});
appInsights.loadAppInsights();

appInsights.addTelemetryInitializer((env: ITelemetryItem) => {
    env.tags = env.tags || [];
    env.tags['ai.cloud.role'] = 'testTag';
});

export { reactPlugin, appInsights };
