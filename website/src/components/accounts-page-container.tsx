import React from 'react';
import {Grid} from '@material-ui/core';
import './component-styles.css';
import { display_content } from '../models/types';

/*
 * wrapper for all content displayed on the page 
 * @param content the content being displayed on the page
 */
export default function AccountsPageContainer(content: display_content) {
   return (
       <Grid
           container
           spacing={0}
           direction="column"
           alignItems="flex-start"
           justify="flex-start"
           className={'accounts-page-container'}
       >
           <Grid item md={6} className={'accounts-page-subcontainer'}>
               {content}
           </Grid>
       </Grid>
   );
}