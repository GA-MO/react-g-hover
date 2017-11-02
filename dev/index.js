import React from 'react'
import ReactDOM from 'react-dom'
import { GHoverContainer, GHoverItem } from 'react-g-hover' // React component name in configs/index.js
import '../css/style.css'

class App extends React.Component {
  render() {
    return (
      <div>
        <GHoverContainer className='box-hover'>
          <GHoverItem rotate={{ x: -10, y: -10, z: 3 }}>
            <div className='box'>
              <GHoverItem
                className='border'
                rotate={{ x: 0, y: 0, z: 0 }}
                translate={{ x: 20, y: 20, z: 0 }}
              />
              <div className='box-title'>
                <GHoverItem
                  className='title'
                  rotate={{ x: -10, y: -10, z: 3 }}
                  translate={{ x: 30, y: 30, z: 0 }}
                  transition='all 0.6s ease'
                >
                  GHover
                </GHoverItem>
              </div>
            </div>
          </GHoverItem>
        </GHoverContainer>
      </div>
    )
  }
}

const rootEl = document.getElementById('root')
ReactDOM.render(<App />, rootEl)
