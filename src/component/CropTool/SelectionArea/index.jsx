import * as React from 'react'
import { observer } from 'mobx-react' 

const styles = require('./styles.scss')

import { drawPaneStore } from '../../../stores/drawPaneStore'


@observer
export default class SelectionArea extends React.Component {

    render () {

        const selectionAreaStyles = {
            top: drawPaneStore.selectionTop,
            left: drawPaneStore.selectionLeft,
            width: drawPaneStore.selectionWidth,
            height: drawPaneStore.selectionHeight,
        }

        return (
            <div>
                {
                    (true || drawPaneStore.showSelection) && (
                        <div className={`${styles.selectionArea}`} style={selectionAreaStyles}>
                            { this.props.children }
                        </div>
                    )
                }
            </div>
        )
    }
}