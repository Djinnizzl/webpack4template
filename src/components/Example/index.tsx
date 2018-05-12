import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as _ from 'lodash'
import uuid from 'uuid/v4'

import { TweenMax, Power3, TimelineMax } from 'gsap'

import { FormattedMessage  } from 'react-intl'

import EnterLeaveAnimation from '../EnterLeaveAnimation'

const styles = require('./styles.scss')


export default class Component extends React.Component {


    componentDidMount () {
        TweenMax.staggerFrom(document.getElementsByClassName('letter'), 1.2, { ease: Power3.easeInOut, top: 2120, z: -200 }, 0.12, () => {
            TweenMax.staggerTo(document.getElementsByClassName('letter'), 0.4, {opacity: 0, delay: 3.6}, 0.06)
        })
    }

    renderText (txt) {
        return _.map(txt, (letter, index) => {
            return (
                <span key={uuid()} className="letter" style={{ position: 'relative' }}>
                    {letter}
                </span>
            )
        })
    }

    render () {
        return (
            <div>
                <div style={{ perspective: 5000 }} id={styles.boilerplate}>
                    {this.renderText('Boilerplate')}
                </div>
                <div>
                    <FormattedMessage 
                        id={ 'Boilerplate.example' } 
                        defaultMessage={ 'default language example message for {exampleValue}-page' }    
                        values={{ exampleValue: 'BoilerplateXL' }}
                    />
                </div>
                <EnterLeaveAnimation />
            </div>
        )
    }
}