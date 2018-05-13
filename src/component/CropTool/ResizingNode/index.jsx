import React, { Component } from 'react';
import {observer} from 'mobx-react'

import styles from './styles.scss'

import { drawPaneStore } from '../../../stores/drawPaneStore'


export default class ResizingNode extends Component {

    constructor (props) {
        super(props);
    }

    handleMouseDown = (e) => {
        e.preventDefault()
        drawPaneStore.isResizing = true
        drawPaneStore.resizeDirection = this.props.position
        switch (this.props.position) {
            case 'n':
                drawPaneStore.mouseDownY = drawPaneStore.selectionTop + drawPaneStore.selectionHeight
                break;
        
            case 'e':
                drawPaneStore.mouseDownX = drawPaneStore.selectionLeft
                break;
                
            case 's':
                drawPaneStore.mouseDownY = drawPaneStore.selectionTop
                break;
                
            case 'w':
                drawPaneStore.mouseDownX = drawPaneStore.selectionLeft + drawPaneStore.selectionWidth
                break;
                
            case 'ne':
                drawPaneStore.mouseDownY = drawPaneStore.selectionTop + drawPaneStore.selectionHeight
                drawPaneStore.mouseDownX = drawPaneStore.selectionLeft
                break;
        
            case 'se':
                drawPaneStore.mouseDownX = drawPaneStore.selectionLeft
                drawPaneStore.mouseDownY = drawPaneStore.selectionTop
                break;
        
            case 'sw':
                drawPaneStore.mouseDownY = drawPaneStore.selectionTop
                drawPaneStore.mouseDownX = drawPaneStore.selectionLeft + drawPaneStore.selectionWidth
                break;
        
            case 'nw':
                drawPaneStore.mouseDownX = drawPaneStore.selectionLeft + drawPaneStore.selectionWidth
                drawPaneStore.mouseDownY = drawPaneStore.selectionTop + drawPaneStore.selectionHeight
                break;

        }
    }

    render () {
        return (
            <div onMouseMove={this.handleMouseMove} onMouseDown={this.handleMouseDown} className={`${styles.resizingNode} ${styles[this.props.position]}`}></div>
        );
    }
}