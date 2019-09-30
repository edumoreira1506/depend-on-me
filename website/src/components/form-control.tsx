import React from 'react';
import { display_content, named_size } from '../models/types';
import { Box, Grid } from '@material-ui/core';
import { padding_to_css } from '../services/utility-service';


/**
 * renders content in a padded box
 * @param content item being rendered by this component
 * @param padding_direction where the padding is applied
 * @param padding_size padding size to use
 */
export function FormControl(content: display_content, padding_direction: padding_direction, padding_size: named_size) {
    return (
        <Box width={1} style={{padding: get_padding_value(padding_direction, padding_size)}}>
            <Grid item> 
                {content}
            </Grid>
        </Box>
    );
}

/**
 * 
 * @param padding_direction where the padding is applied
 * @param padding_size padding size to use
 */
function get_padding_value(padding_direction: padding_direction, padding_size: named_size): string {
    switch (padding_size) {
        case 'small':
            return padding_to_css(padding_direction, '2vw');
        case 'medium':
            return padding_to_css(padding_direction, '5vw');  
        case 'large':
            return padding_to_css(padding_direction, '10vw');
        default:
            return padding_to_css('none', '0');
    }
}