import * as React from 'react'
import { observer } from 'mobx-react'

import { drawPaneStore } from '../../stores/drawPaneStore'

import styles from './cropTool.scss'


import MousePosition from './MousePosition'
import DrawPane from './DrawPane'
import Stati from './Stati'
import DebugBox from './DebugBox'


@observer
export default class CropTool extends React.Component {

    render () {
        return (
            <div className={`${styles.skizzleCrop}`} id={'skizzleCrop'}>
                <DrawPane/>
                <MousePosition x={drawPaneStore.clientX} y={drawPaneStore.clientY} />
                <Stati />
                <DebugBox />
            </div>
        )
    }
}