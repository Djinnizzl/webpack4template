import { action, computed, observable } from 'mobx'
import { drawPaneStore } from './drawPaneStore'

export default class ImageStore {

    @observable imageDataSteps = []
    @observable currentImageData = null
    @observable currentImageRealWidth = 0
    @observable currentImageRealHeight = 0
    
    canvas = null
    context = null


    @action
    transformImgSrcToData(src) {
        const img = new Image()
        img.src = src
        img.onload = () => {
            this.currentImageRealWidth = img.naturalWidth
            this.currentImageRealHeight = img.naturalHeight
            this.canvas.crossOrigin="Anonymous"
            this.canvas.width = img.naturalWidth
            this.canvas.height = img.naturalHeight
            this.context.drawImage(img, 0, 0)

            const imgData = this.canvas.toDataURL('image/png')

            this.currentImageData = imgData
            this.imageDataSteps.push(imgData)
        }
    }

    @action
    cut () {

        // drawPaneStore
    }
}   

export const imageStore = new ImageStore()

// TODO drawpanestore connecten (verhältnis original zu darstellung)