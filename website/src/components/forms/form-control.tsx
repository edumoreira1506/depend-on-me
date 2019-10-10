import React from 'react';
import { display_content, named_size, padding_direction } from '../../models/types';
import { Box, Grid } from '@material-ui/core';
import { UtilityService } from '../../services/utility-service';


/**
 * form control parameter wrapper. defines all parameters needed to create a form control
 */
export interface FormControlParams {
    content:        display_content;
    direction:      padding_direction;
    padding_size:   named_size;
}

/**
 * UI-data binding function. explicitly binds data to UI component
 *
 * @param params data used to create this FormControl see FormControlParams for more information.
 */
export function FormControl(params: FormControlParams) {
    return (
        //generate a new unique key, each time this component is rendered
        <Box width={1} key={interal_key++} style={{padding: get_padding_value(params.direction, params.padding_size)}}>
            <Grid item> 
                {params.content}
            </Grid>
        </Box>
    );
}

/**
 * 
 * @param direction where the padding is applied
 * @param padding_size padding size to use
 */
function get_padding_value(direction: padding_direction, padding_size: named_size): string {
    switch (padding_size) {
        case 'x-small': 
            return UtilityService.padding_to_css(direction, '1vw');
        case 'small':
            return UtilityService.padding_to_css(direction, '2vw');
        case 'medium':
            return UtilityService.padding_to_css(direction, '5vw');  
        case 'large':
            return UtilityService.padding_to_css(direction, '10vw');
        default:
            return UtilityService.padding_to_css('none', '0');
    }
}

/**
 * internal key used to identify each of the instances of this component created
 */
let interal_key: number = 0;