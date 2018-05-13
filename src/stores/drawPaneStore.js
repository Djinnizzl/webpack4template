import { observable, action, computed } from 'mobx'
import * as _ from 'lodash'
import moment from 'moment'


export default class DrawPaneStore {

    @observable debugText = []

    @observable clientX = 0
    @observable clientY = 0
    @observable paneWidth = 0
    @observable paneHeight = 0
    @observable mouseDown = false
    @observable mouseDownX = 0
    @observable mouseDownY = 0
    relativeMouseToSelectionX = 0
    relativeMouseToSelectionY = 0

    // Status
    @observable isDrawing = false
    @observable resizeDirection = null
    @observable isMoving = false
    @observable isResizing = false

    // Selection
    @observable selectionTop = 0
    @observable selectionLeft = 0
    @observable selectionWidth = 0
    @observable selectionHeight = 0


    offsetTop = 0
    offsetLeft = 0


    @action 
    setSelectionX() {
        if (this.isDrawing || this.isResizing) {
            if (this.clientX > this.mouseDownX) {
                this.selectionLeft = this.mouseDownX
                this.selectionWidth = this.clientX - this.mouseDownX
            } else {
                this.selectionLeft = this.clientX
                this.selectionWidth = this.mouseDownX - this.clientX
            }
        } else if (this.isMoving) {
            if (this.clientX - this.relativeMouseToSelectionX < 0) {
                this.selectionLeft = 0
            } else if (this.clientX - this.relativeMouseToSelectionX + this.selectionWidth > this.paneWidth) {
                this.selectionLeft = this.paneWidth - this.selectionWidth
            } else {
                this.selectionLeft = this.clientX - this.relativeMouseToSelectionX
            }
        }
    }

    @action 
    setSelectionY() {
        if (this.isDrawing || this.isResizing) {
            if (this.clientY > this.mouseDownY) {
                this.selectionTop = this.mouseDownY
                this.selectionHeight = this.clientY - this.mouseDownY
            } else {
                this.selectionTop = this.clientY
                this.selectionHeight = this.mouseDownY - this.clientY
            }
        } else if (this.isMoving) {
            if (this.clientY - this.relativeMouseToSelectionY < 0) {
                this.selectionTop = 0
            } else if (this.clientY - this.relativeMouseToSelectionY + this.selectionHeight > this.paneHeight) {
                this.selectionTop = this.paneHeight - this.selectionHeight
            } else {
                this.selectionTop = this.clientY - this.relativeMouseToSelectionY
            }
        }
    }

    @computed get
    isMouseInSelection() {
        if (
            this.clientX > this.selectionLeft 
            && this.clientX < this.selectionLeft + this.selectionWidth
            && this.clientY > this.selectionTop 
            && this.clientY < this.selectionTop + this.selectionHeight
        ) {
            return true
        }
        return false
    }


    @action
    setXY (x,y) {

        const positions = handleXY(x, y, this.offsetLeft, this.offsetTop, this.paneWidth, this.paneHeight)
        this.clientX = positions.xx
        this.clientY = positions.yy
    }

    @action
    setOffsetsAndSideLengths(left, top, width, height) {
        this.offsetLeft = left
        this.offsetTop = top
        this.paneWidth = width
        this.paneHeight = height
    }

    @action
    setMouseDownPosition(x, y) {
        this.mouseDown = true
        const positions = handleXY(x, y, this.offsetLeft, this.offsetTop, this.paneWidth, this.paneHeight)
        if(!this.isResizing) {
            this.mouseDownX = positions.xx
            this.mouseDownY = positions.yy
        }
        this.relativeMouseToSelectionX = positions.xx - this.selectionLeft
        this.relativeMouseToSelectionY = positions.yy - this.selectionTop
    }

    @action
    setMouseUpPosition(x, y) {
        this.mouseDown = false
        const positions = handleXY(x,y, this.offsetLeft, this.offsetTop, this.paneWidth, this.paneHeight)
        this.mouseUpX = positions.xx
        this.mouseUpY = positions.yy

        
        this.isMoving = false
        this.isDrawing = false
        this.isResizing = false
        this.resizeDirection = null
    }


    @action 
    log (txt) {
        const key = moment().unix()
        this.debugText.push({ txt, key })
        setTimeout(() => {
            this.debugText = _.filter(this.debugText, text => text.key < key)
        }, 3000)
    }


}


function handleXY (x, y, offL, offT, pW, pH) {
    let xx = x - offL
    let yy = y - offT

    if (x - offL < 0) {
        xx = 0
    }

    if (y - offT < 0) {
        yy = 0
    }

    if (x - offL > pW) {
        xx = pW 
    }

    if (y - offT > pH) {
        yy = pH 
    }

    return { xx, yy }
}


export const drawPaneStore = new DrawPaneStore()