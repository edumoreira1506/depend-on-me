import React from 'react';

// TODO abstract these 2 fields to be css dimensions type
// TODO abstract height and width to be size enums (big, small, etc)
export interface BlankSpaceParams {
    width?:      string;
    height?:     string;
    fill?:       boolean;
}

export function BlankSpace(params: BlankSpaceParams) {
    let width:  string  = params.width  !== undefined ? params.width    : '0';
    let height: string  = params.height !== undefined ? params.height   : '0';
    let fill:   boolean = params.fill   !== undefined ? params.fill     : false;
    return (
        <div style={{minHeight: height, minWidth: width, flexGrow: fill ? 1 : 0}}/>
    );
}