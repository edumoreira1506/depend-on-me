import React from 'react';
import {Grid} from '@material-ui/core';
import './component-styles.css';

/**
 * simple wrapper for defining what type can de displayed by this component.
 */
// NOTE: this is not redundant, moreso it is an infrastructure choice that will
// allow for flexiblity within this component if and when design constraints 
// change with the intent of reducing the overhead of refactoring code elsewhere
type display_content = any;


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
           justify="center"
           className={'accounts-page-container'}
       >
           <Grid item md={6} className={'accounts-page-subcontainer'}>
               {content}
           </Grid>
       </Grid>
   );
}