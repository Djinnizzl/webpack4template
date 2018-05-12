import * as React from 'react'
import { TweenMax } from 'gsap'

const styles = require('./styles.scss')

export default class Line extends React.Component {

    line: HTMLElement

    componentDidMount() {
        TweenMax.from(this.line, 0.5, {
            opacity: 0,
            scale: 0,
            delay: 3
        })
    }

    componentWillLeave(done) {
        TweenMax.to(this.line, 0.5, {
            scale: 0,
            opacity: 0,
            transformOrigin: 'right',
            onComplete: () => done()
        })
    }

    render () {
        return (
            <div className={styles.line} ref={el => this.line = el}></div>
        )
    }

}