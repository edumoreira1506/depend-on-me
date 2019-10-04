import React from 'react';
import { Box, Grid, TextField } from '@material-ui/core';

/**
 * wrapper type for the change event function 
 */
// TODO refactor to higher level file
export type handle_change_function_type<ParamType> = (param: ParamType) => (event: React.ChangeEvent<HTMLInputElement>) => void;

/**
 * metadata needed to create a FormField
 */
export type FormFieldMetadata<Type> = {
    key:            keyof Type;
    auto_complete?: string;
};

/**
 * form field parameter wrapper. defines all parameters needed to create a form field
 * 
 * <FieldType> the type of of the field being displayed
 */
export interface FormFieldParams<FieldType> {
    metadata:       FormFieldMetadata<FieldType>;
    label:          string;
    value:          string;
    handle_change:  handle_change_function_type<keyof FieldType>;
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
                    id={params.metadata.key.toString()}
                    label={params.label}
                    value={params.value}
                    margin="normal"
                    autoComplete={params.metadata.auto_complete}
                    onChange={params.handle_change(params.metadata.key)}
                    fullWidth                
                />
            </Grid>
        </Box>
    );
}