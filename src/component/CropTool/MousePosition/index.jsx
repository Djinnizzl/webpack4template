import * as React from 'react'
import {observer} from 'mobx-react'

const styles = require('./styles.scss')

@observer
export default class MousePosition extends React.Component {

    render () {

        const positionStyles = {
            top: this.props.y + 20,
            left: this.props.x + 20 
        }

        return (
            <div style={positionStyles} className={`${styles.mousePosition}`}>
                {`${this.props.x} / ${this.props.y}`}
            </div>
        )
    }

}