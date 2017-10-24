import React from 'react'
import ReactDOM from 'react-dom'
import { RGHContainer, RGHItem } from 'react-g-hover' // React component name in configs/index.js
import '../css/style.css'

class App extends React.Component {
  render() {
    return (
      <div>
        <RGHContainer className='box-hover'>
          <RGHItem rotate={{ x: -10, y: -10, z: 3 }}>
            <div className='box'>
              <RGHItem
                className='border'
                rotate={{ x: 0, y: 0, z: 0 }}
                translate={{ x: 20, y: 20, z: 0 }}
              />
              <div className='box-title'>
                <RGHItem
                  className='title'
                  rotate={{ x: -10, y: -10, z: 3 }}
                  translate={{ x: 30, y: 30, z: 0 }}
                  transition='all 0.6s ease'
                >
                  Hkak
                </RGHItem>
              </div>
            </div>
          </RGHItem>
        </RGHContainer>
      </div>
    )
  }
}

const rootEl = document.getElementById('root')
ReactDOM.render(<App />, rootEl)
