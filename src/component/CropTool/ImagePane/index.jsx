import React, { Component } from 'react';

import styles from './styles.scss'


import { imageStore } from '../../../stores/imageStore'


export default class ImagePane extends Component {

    componentDidMount () {
        imageStore.canvas = this.canvas
        imageStore.context = this.canvas.getContext('2d')
        // imageStore.transformImgSrcToData(this.props.src)
        imageStore.transformImgSrcToData('./picture.jpg')
    }

    render () {
        return (
            <div className={`${styles.imagePane}`}>
                <canvas className={`${styles.imagePaneCanvas}`} ref={el => this.canvas = el}></canvas>
            </div>
        );
    }
}