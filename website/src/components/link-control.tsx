import React from 'react';
import Typography from '@material-ui/core/Typography';
import { PropTypes } from '@material-ui/core/index';
import { ThemeStyle } from '@material-ui/core/styles/createTypography';
import { Link } from '@material-ui/core';



// TOOD : export to types file
type variant_type = ThemeStyle | 'srOnly' | 'inherit';
export type function_VA = () => any;

export interface LinkControlParams {
    text:           string;
    align:          PropTypes.Alignment;
    variant:        variant_type;
    handle_click:   function_VA;
}

export function LinkControl(params: LinkControlParams) {
    return (
        <Typography align={params.align}>
            <Link component='button' variant={params.variant} onClick={() => params.handle_click()}> 
                {params.text}
            </Link>
        </Typography>
    );

}