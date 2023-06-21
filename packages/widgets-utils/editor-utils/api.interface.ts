import {ActionOptions} from '../action/action-options';

export interface MossaicAPI {
    /**
     * Send request to execute the `action` from `scheme`
     * @param actionId action identifier,
     *  for example: "getSubmissions"
     * @param properties action input properties
     *  for example: { submissionId: "my-test-submission", "responseNumber": 2 }
     * @param options additional options, see ActionOptions type,
     *  for the moment options.responseProperties are required
     */
    executeAction<T = unknown>(
        actionId: string,
        properties: Record<string, unknown>,
        options?: ActionOptions
    ): Promise<T | undefined>;
}
