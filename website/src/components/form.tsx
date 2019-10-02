import React from 'react';
import {FormField, FormFieldParams} from './form-field';
import { Grid } from '@material-ui/core';
import { FormControlParams, FormControl } from '.././components/form-control';

export function Form<FieldType>(fields: FormFieldParams<FieldType>[], controls: FormControlParams[]) {
    return (
        <form noValidate autoComplete='off'>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
            >
                {/* field group */}
                {fields.map(item => {
                    /* <item> is a parameter not a control so we need to wrap it into a control */
                    return FormField<FieldType>(item);
                })}

                {/* control group */}
                {controls.map(item => {
                    /* <item> is a parameter not a control so we need to wrap it into a control */
                    return FormControl(item);
                })}
            </Grid>
        </form>
    );
}