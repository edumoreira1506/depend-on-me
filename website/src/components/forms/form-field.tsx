import React from 'react';
import { Box, Grid, TextField } from '@material-ui/core';
import { InvalidFieldsInterface, RequestStateInterface } from '../../models/types';

/**
 * wrapper type for the change event function 
 */
// TODO refactor to higher level file
type func<FieldsInterface, Props, State extends (InvalidFieldsInterface<FieldsInterface> & RequestStateInterface<FieldsInterface>)> = (id: keyof FieldsInterface, parent: React.Component<Props, State>) => (event: React.ChangeEvent<HTMLInputElement>) => void

class FormService <FieldsInterface, Props, State extends (InvalidFieldsInterface<FieldsInterface> & RequestStateInterface<FieldsInterface>)> {
    
    public handleChange: func<FieldsInterface, Props, State> = (id: keyof FieldsInterface, parent: React.Component<Props, State>) => (event: React.ChangeEvent<HTMLInputElement>) => {
        parent.setState({request_data: {...parent.state.request_data, [id]: event.target.value}});

        if (event.target.value === '') {
            parent.setState({invalid_fields: parent.state.invalid_fields.concat(id)});
        } else {
            parent.setState({invalid_fields: parent.state.invalid_fields.filter(function(element){return element !== id;})});
        }
    }
}

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
export interface FormFieldParams<FieldsInterface, Props, State extends (InvalidFieldsInterface<FieldsInterface> & RequestStateInterface<FieldsInterface>)> {
    metadata:       FormFieldMetadata<FieldsInterface>;
    label:          string;
    value:          string;
    error:          boolean;
    type:           string;
    parent:         React.Component<Props, State>;
}

/**
 * UI-data binding function. explicitly binds data to UI component
 * 
 * @param params data used to create this FormField see FormFieldParams for more information.
 */
export function FormField<FieldsInterface, Props, State extends (InvalidFieldsInterface<FieldsInterface> & RequestStateInterface<FieldsInterface>)>(params: FormFieldParams<FieldsInterface, Props, State>) {
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
                    onChange={new FormService<FieldsInterface, Props, State>().handleChange(params.metadata.key, params.parent)}
                    fullWidth                
                />
            </Grid>
        </Box>
    );
}