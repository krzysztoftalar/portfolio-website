import {
    useAppInsightsContext,
    useTrackEvent as useTrackAzureEvent,
} from '@microsoft/applicationinsights-react-js';

export const useTrackEvent = (eventName: string, eventData: any) => {
    const appInsights = useAppInsightsContext();
    return useTrackAzureEvent(appInsights, eventName, eventData);
};
