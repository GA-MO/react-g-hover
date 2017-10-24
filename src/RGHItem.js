import React, { Component } from 'react'
import PropTypes from 'prop-types'
import getMatrix from './helpers/getMatrixTransform'

export default class Item extends Component {
  static contextTypes = {
    mousepos: PropTypes.object,
    transformDefault: PropTypes.object,
    transitionDefault: PropTypes.string,
    transformProperty: PropTypes.string,
    transitionProperty: PropTypes.string
  }

  getMovementWithMousePos = () => {
    if (!this.dom) return
    const {
      mousepos,
      transformDefault,
      transitionDefault,
      transformProperty,
      transitionProperty
    } = this.context
    const { rotate, translate, transition } = this.props

    let r = rotate || transformDefault
    let t = translate || transformDefault
    t = this.calculatePosition(t)
    r = this.calculatePosition(r)

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

    this.dom.style[transformProperty] = `matrix3d(${matrix})`
    this.dom.style[transitionProperty] = transit
  }

  calculatePosition(obj) {
    let result = {}
    for (var k in obj) {
      if (!obj[k]) {
        result[k] = [0, 0]
      } else if (typeof obj[k] === 'number') {
        result[k] = [-1 * obj[k], obj[k]]
      }
    }
    return result
  }

  render() {
    this.getMovementWithMousePos()
    return <div className={this.props.className} ref={dom => (this.dom = dom)}>{this.props.children}</div>
  }
}
