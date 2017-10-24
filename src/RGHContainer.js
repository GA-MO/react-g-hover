import React, { Component } from 'react'
import PropTypes from 'prop-types'
import getCSSPrefix from './helpers/getCSSPrefix'

export default class RGHContainer extends Component {
  state = {
    mousepos: {
      x: 0,
      y: 0
    }
  }

  static defaultProps = {
    transformDefault: { x: 0, y: 0, z: 0 },
    transitionDefault: 'all 0.2s ease',
    perspective: '1000px'
  }

  static childContextTypes = {
    mousepos: PropTypes.object,
    transformDefault: PropTypes.object,
    transitionDefault: PropTypes.string,
    transformProperty: PropTypes.string,
    transitionProperty: PropTypes.string
  }

  setUpDefaultTrasform = () => {
    this.dom.style.perspective = this.props.perspective
    this.dom.style[this.transformProperty] = 'rotateZ(0deg) translateZ(0)'
  }

  getChildContext = () => {
    return {
      mousepos: this.state.mousepos,
      transformDefault: this.props.transformDefault,
      transitionDefault: this.props.transitionDefault,
      transformProperty: this.transformProperty,
      transitionProperty: this.transitionProperty
    }
  }

  componentDidMount = () => {
    this.setUpDefaultTrasform()
    this.initMouseEvents()
    this.transformProperty = getCSSPrefix('transform')
    this.transitionProperty = getCSSPrefix('transition')
  }

  initMouseEvents = () => {
    const mouseMove = e => window.requestAnimationFrame(() => this.getMousePosition(e))
    const mouseLeave = () => window.requestAnimationFrame(() => this.reset())

    this.dom.addEventListener('mouseleave', mouseLeave)
    this.dom.addEventListener('mousemove', mouseMove)
  }

  reset = () => {
    this.setState({
      mousepos: {
        x: 0,
        y: 0
      }
    })
  }

  getMousePosition = e => {
    const bound = this.dom.getBoundingClientRect()
    const pageScroll = {
      left: document.body.scrollLeft + document.documentElement.scrollLeft,
      top: document.body.scrollTop + document.documentElement.scrollTop
    }
    const mousepos = {
      x: e.clientX + pageScroll.left,
      y: e.clientY + pageScroll.top
    }
    const mouseposInDOM = {
      x: mousepos.x - bound.left - pageScroll.left,
      y: mousepos.y - bound.top - pageScroll.top
    }

    this.setState({
      mousepos: mouseposInDOM
    })
  }

  render() {
    return <div className={this.props.className} ref={dom => (this.dom = dom)}>{this.props.children}</div>
  }
}
