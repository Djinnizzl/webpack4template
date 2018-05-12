import * as React from 'react'
import { TweenMax } from 'gsap'
import TransitionGroup from 'react-addons-transition-group'

const styles = require('./styles.scss')

import Line from '../Line'

interface State {
    showLine: boolean
}

export default class EnterLeaveAnimation extends React.Component {
   
    state = {
        showLine: true
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                showLine: !this.state.showLine
            })
        }, 6080)
    }


    render () {
        return (
            <div className={styles.animBox}>
                <TransitionGroup>
                    {this.state.showLine && <Line />}
                </TransitionGroup>
            </div>
        )
    }

}