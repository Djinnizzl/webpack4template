import React, { Component } from 'react';
import { observer } from 'mobx-react'

import styles from './styles.scss'


import { drawPaneStore } from '../../../stores/drawPaneStore'


@observer
export default class Stati extends Component {

    constructor (props) {
        super(props);
    }


    render () {

        const styles = {
            position: 'absolute',
            right: 50,
            bottom: 50
        }

        return (
            <div style={styles}>
                <div>Is In Selection: {drawPaneStore.isMouseInSelection ? 'true' : 'false'}</div>
                <div>Is Drawing: {drawPaneStore.isDrawing ? 'true' : 'false'}</div>
                <div>Is Moving: {drawPaneStore.isMoving ? 'true' : 'false'}</div>
                <div>Is Resizing: {drawPaneStore.isResizing ? 'true' : 'false'}</div>
            </div>
        );
    }
}