import * as React from 'react'
import { observer } from 'mobx-react'
import { toJS } from 'mobx'

import styles from './drawPane'

import { drawPaneStore } from '../../../stores/drawPaneStore'

import SelectionArea from '../SelectionArea'
import ResizingNode from '../ResizingNode'
import ImagePane from '../ImagePane'


@observer
export default class DrawPane extends React.Component {

    componentDidMount () {
        window.addEventListener('resize', this.handleResize)
        this.handleResize()
    }

    componentWillUnmount () {
        window.removeEventListener('resize', this.handleResize)
    }
    
    handleResize = () => {
        drawPaneStore.setOffsetsAndSideLengths(Math.round(this.drawPane.getBoundingClientRect().left), Math.round(this.drawPane.getBoundingClientRect().top), this.drawPane.offsetWidth, this.drawPane.offsetHeight)
    }

    handleMouseDown = (e) => {
        drawPaneStore.setMouseDownPosition(Math.round(e.clientX + window.scrollX), Math.round(e.clientY + window.scrollY))
        if (drawPaneStore.isMouseInSelection && !drawPaneStore.isResizing) {
            drawPaneStore.isMoving = true
        } else {
            drawPaneStore.isDrawing = true
        }
    }
    
    handleMouseMove = (e) => {
        e.preventDefault()
        drawPaneStore.setXY(Math.round(e.clientX + window.scrollX), Math.round(e.clientY + window.scrollY))
        if ( ( e.buttons === 1 || e.buttons === 3 ) )   {
            if (( ['ne', 'se', 'sw', 'nw'].indexOf(drawPaneStore.resizeDirection) !== -1 ) || !drawPaneStore.isResizing) {
                drawPaneStore.setSelectionX()
                drawPaneStore.setSelectionY()
            } else if ( ['n', 's'].indexOf(drawPaneStore.resizeDirection) !== -1 ) {
                drawPaneStore.setSelectionY()
            } else if ( ['e', 'w'].indexOf(drawPaneStore.resizeDirection) !== -1 ) {
                drawPaneStore.setSelectionX()
            }
        }   
    }
    
    handleMouseUp = (e) => {
        drawPaneStore.setMouseUpPosition(Math.round(e.clientX + window.scrollX), Math.round(e.clientY + window.scrollY))
    }

    render () {

        const drawPaneStyles = {
            cursor: drawPaneStore.isMouseInSelection ? 'move' : 'crosshair'
        }

        return (
            <div style={drawPaneStyles} className={`${styles.drawPaneArea}`} onMouseDown={this.handleMouseDown} onMouseMove={this.handleMouseMove} onMouseUp={this.handleMouseUp}  >
                <ImagePane />
                <div ref={r => this.drawPane = r} className={`${styles.drawPane}`} >
                    <SelectionArea >
                        <ResizingNode position={'n'}/>
                        <ResizingNode position={'e'}/>
                        <ResizingNode position={'s'}/>
                        <ResizingNode position={'w'}/>
                        <ResizingNode position={'ne'}/>
                        <ResizingNode position={'se'}/>
                        <ResizingNode position={'sw'}/>
                        <ResizingNode position={'nw'}/>
                    </ SelectionArea>
                </div>
            </div>
        )
    }
}