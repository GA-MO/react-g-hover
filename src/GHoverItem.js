import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class GHoverItem extends Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    rotate: PropTypes.object,
    translate: PropTypes.object,
    transition: PropTypes.object
  }

  static defaultProps = {
    className: '',
    style: {},
    rotate: undefined,
    translate: undefined,
    transition: undefined
  }

  static contextTypes = {
    subscriber: PropTypes.func
  }

  componentDidMount() {
    const listener = {
      node: this.dom,
      rotate: this.props.rotate,
      translate: this.props.translate,
      transition: this.props.transition
    }
    this.context.subscriber(listener)
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
