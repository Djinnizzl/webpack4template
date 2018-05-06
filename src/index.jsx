import * as React from 'react'
import * as ReactDOM from 'react-dom'

import styles from './main.scss'

export default class Component extends React.Component {

    render () {
        return (
            <div id={styles.boilerplate}>
                Boilerplate
            </div>
        )
    }
}


ReactDOM.render(<Component />, document.getElementById('app'))