import React, { Component } from 'react';
import * as _ from 'lodash'
import { observer } from 'mobx-react'

import styles from './styles.scss'


import { drawPaneStore } from '../../../stores/drawPaneStore'


@observer
export default class Stati extends Component {

    constructor (props) {
        super(props);
    }

    renderText = () => {
        return drawPaneStore.debugText.map(txt => <div key={txt.key}>{txt.txt}</div>)
    }

    render () {

        const styles = {
            position: 'absolute',
            right: 50,
            top: 50
        }

        return (
            <div style={styles}>
                <div>{ this.renderText() }</div>
            </div>
        );
    }
}