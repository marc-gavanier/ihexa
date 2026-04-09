import { logClientInfo } from '@/libraries/logger/log-client.action';

type StandardErrors = Record<string, { message: string; type: string }[]>;
type ValidationResult = { fields: StandardErrors };
type ValidatorFn<TFormData> = (params: { value: TFormData }) => ValidationResult;

export const withValidationLogging =
  <TFormData extends Record<string, unknown>>(validator: ValidatorFn<TFormData>, formId: string): ValidatorFn<TFormData> =>
  (params) => {
    const result = validator(params);
    const errorEntries = Object.entries(result.fields);

    if (errorEntries.length > 0) {
      logClientInfo({
        event: 'validation:error',
        payload: {
          formId,
          fields: errorEntries.map(([name, errors]) => ({
            name,
            value: params.value[name],
            errors
          }))
        }
      }).catch(() => {});
    }

    return result;
  };
