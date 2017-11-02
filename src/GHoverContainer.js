import React, { Component } from 'react'
import PropTypes from 'prop-types'
import getCSSPrefix from './helpers/getCSSPrefix'
import getMatrix from './helpers/getMatrixTransform'
import calculatePosition from './helpers/calculatePosition'

export default class GHoverContainer extends Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    transformDefault: PropTypes.object,
    transitionDefault: PropTypes.object,
    perspective: PropTypes.string
  }

  static defaultProps = {
    transformDefault: { x: 0, y: 0, z: 0 },
    transitionDefault: 'all 0.2s ease',
    perspective: '1000px'
  }

  static childContextTypes = {
    subscriber: PropTypes.func
  }

  listeners = []

  setUpDefaultTrasform = () => {
    this.dom.style.perspective = this.props.perspective
    this.dom.style[this.transformProperty] = 'rotateZ(0deg) translateZ(0)'
  }

  getChildContext = () => {
    return {
      subscriber: this.subscriber
    }
  }

  componentDidMount = () => {
    this.setUpDefaultTrasform()
    this.initMouseEvents()
    this.transformProperty = getCSSPrefix('transform')
    this.transitionProperty = getCSSPrefix('transition')
  }

  componentWillUnmount = () => {
    this.listeners = []
    this.removeMouseEvents()
  }

  initMouseEvents = () => {
    this.dom.addEventListener('mouseleave', this.mouseLeave)
    this.dom.addEventListener('mousemove', this.mouseMove)
  }

  removeMouseEvents = () => {
    this.dom.removeEventListener('mouseleave', this.mouseLeave)
    this.dom.removeEventListener('mousemove', this.mouseMove)
  }

  mouseMove = e => {
    window.requestAnimationFrame(() => this.move(e))
  }

  mouseLeave = () => {
    window.requestAnimationFrame(() => this.reset())
  }

  move = e => {
    const mousepos = this.getMousePosition(e)
    this.moveListener(mousepos)
  }

  moveListener = mousepos => {
    if (this.listeners.length > 0) {
      this.listeners.forEach(listener => this.transFormNode(mousepos, listener))
    }
  }

  reset = () => {
    this.moveListener({ x: 0, y: 0 })
  }

  subscriber = listener => {
    this.listeners = [...this.listeners, listener]
  }

  transFormNode = (mousepos, { node, rotate, translate, transition }) => {
    if (!node) return false

    const { transitionDefault, transformDefault } = this.props

    let r = rotate || transformDefault
    let t = translate || transformDefault
    t = calculatePosition(t)
    r = calculatePosition(r)

    const transformsDefaultBase = {
      translate: transformDefault,
      rotate: transformDefault
    }

    let transforms = {
      translate: {
        x: (t.x[1] - t.x[0]) / this.dom.offsetWidth * mousepos.x + t.x[0],
        y: (t.y[1] - t.y[0]) / this.dom.offsetHeight * mousepos.y + t.y[0],
        z: (t.z[1] - t.z[0]) / this.dom.offsetHeight * mousepos.y + t.z[0]
      },
      rotate: {
        x: (r.x[1] - r.x[0]) / this.dom.offsetHeight * mousepos.y + r.x[0],
        y: (r.y[1] - r.y[0]) / this.dom.offsetWidth * mousepos.x + r.y[0],
        z: (r.z[1] - r.z[0]) / this.dom.offsetWidth * mousepos.x + r.z[0]
      }
    }

    transforms = mousepos.x === 0 && mousepos.y === 0 ? transformsDefaultBase : transforms

    const matrix = getMatrix(transforms)
    const transit = transition || transitionDefault

    node.style[this.transformProperty] = `matrix3d(${matrix})`
    node.style[this.transitionProperty] = transit
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
    return mouseposInDOM
  }

  render() {
    const { className, style, children } = this.props
    return (
      <div className={className} style={style} ref={dom => (this.dom = dom)}>
        {children}
      </div>
    )
  }
}
