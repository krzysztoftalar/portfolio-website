import { ReactPlugin } from '@microsoft/applicationinsights-react-js';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { globalHistory } from '@reach/router';

const reactPlugin = new ReactPlugin();
const appInsights = new ApplicationInsights({
    config: {
        connectionString:
            process.env.GATSBY_AZURE_APPLICATION_INSIGHTS_CONNECTION_STRING,
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

if (process.env.GATSBY_AZURE_APPLICATION_INSIGHTS_CONNECTION_STRING) {
    appInsights.loadAppInsights();
}

export { reactPlugin, appInsights };
