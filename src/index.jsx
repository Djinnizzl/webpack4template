import * as React from 'react'
import * as ReactDOM from 'react-dom'

import * as _ from 'lodash'
import { TweenMax, Power1, TimelineMax } from 'gsap'

import styles from './main.scss'

export default class Component extends React.Component {

    componentDidMount () {
        TweenMax.staggerTo(document.getElementsByClassName('letter'), 1.2, { ease: Power1.easeInOut, top: 70, z: -200, repeat: -1, yoyo: true }, 0.28,)
    }

    renderText (txt) {
        return _.map(txt, letter => {
            return (
                <span className="letter" style={{ position: 'relative' }}>
                    {letter}
                </span>
            )
        })
    }

    render () {
        return (
            <div style={{ perspective: 5000 }} id={styles.boilerplate}>
                {this.renderText('Boilerplate')}
            </div>
        )
    }
}


ReactDOM.render(<Component />, document.getElementById('app'))