import React from 'react';
import { Box, Grid, TextField } from '@material-ui/core';

/**
 * wrapper type for the change event function 
 */
// TODO refactor to higher level file
export type change_event_function_1PV<ParamType> = (param: ParamType) => (event: React.ChangeEvent<HTMLInputElement>) => void;

/**
 * form field parameter wrapper. defines all parameters needed to create a form field
 * 
 * <FieldType> the type of of the field being displayed
 */
export interface FormFieldParams<FieldType> {
    field:          keyof FieldType;
    label:          string;
    value:          string;
    auto_complete:  string;
    handle_change:  change_event_function_1PV<keyof FieldType>;
    error:          boolean;
    type:           string;
}

/**
 * UI-data binding function. explicitly binds data to UI component
 * 
 * @param params data used to create this FormField see FormFieldParams for more information.
 */
export function FormField<FieldType>(params: FormFieldParams<FieldType>) {
    return (
        <Box width={1}>
            <Grid item >
                <TextField 
                    error={params.error}
                    type={params.type}
                    id={params.field.toString()}
                    label={params.label}
                    value={params.value}
                    margin="normal"
                    autoComplete={params.auto_complete}
                    onChange={params.handle_change(params.field)}
                    fullWidth                
                />
            </Grid>
        </Box>
    );
}