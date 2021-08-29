/* eslint-disable eqeqeq */
import './square.scss'
import { SquareItem } from './squareItem/squareItem'
import { mixArr } from '../../helpers/mixArr'
import React from 'react'

export class Square extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      level: localStorage.getItem('level') ? Number(localStorage.getItem('level')) : 2,
      record: localStorage.getItem('record') ? Number(localStorage.getItem('record')) : 0,
      isGuessing: false,
      attempts: 0,
      difficult: 0,
      squaresArr: []
    }
    this.activeSquaresLength = 0
    this.handleClick = this.handleClick.bind(this)
  }
  initArr() {
    window.state = this.state
    const { level, difficult } = this.state
    const squaresLength = level * level
    let newArr = []
    for (let i = 0; i < squaresLength; i++) {
      newArr.push({
        id: i + 1,
        guessed: false,
        checked: null
      })
    }
    newArr = mixArr(newArr)
    this.activeSquaresLength = Math.sqrt(newArr.length) - 1 + difficult
    for (let i = 0; i < this.activeSquaresLength; i++) {
      newArr[i].guessed = true
    }
    newArr = mixArr(newArr)
    let visibleArr = newArr.map(square => {
      if (square.guessed) {
        return { ...square, checked: 'visible' }
      } else { return square }
    })
    this.setState(state => {
      return { ...state, isGuessing: true, squaresArr: visibleArr }
    })
    setTimeout(() => {
      this.setState(state => {
        return { ...state, isGuessing: false, squaresArr: newArr }
      })
    }, 2000)
  }
  componentDidMount() {
    this.initArr()
  }
  handleClick(e) {
    const { squaresArr, isGuessing } = this.state
    if (!isGuessing) {
      const updatedArr = squaresArr.map(square => {
        const isGuessed = square.guessed
        if (square.id == e.target.id) {
          return { ...square, checked: isGuessed }
        } else {
          return square
        }
      })
      this.setState(state => {
        return { ...state, squaresArr: updatedArr }
      })
      let guessedArr = []
      guessedArr = updatedArr.filter(square => {
        if (square.guessed && square.checked === true) {
          return square
        }
      })
      if (guessedArr.length == this.activeSquaresLength) {
        this.changeDifficultAndLevel(true)
        setTimeout(() => {
          this.initArr()
        }, 500)
      }
      squaresArr.forEach(square => {
        if (square.id == e.target.id) {
          if (!square.guessed) {
            this.changeDifficultAndLevel(false)
            setTimeout(() => {
              this.initArr()
            }, 500)
          }
        }
      })
    }
  }
  changeDifficultAndLevel(boolean) {
    const { difficult, attempts, record, level } = this.state
    if (boolean) {
      if ((difficult + 1) >= 3) {
        this.setState(state => {
          return { ...state, level: level + 1, difficult: 0 }
        })
        if((level + 1) > record) {
          this.setState(state => {
            return {...state, record: level}
          })
          localStorage.setItem('record', record + 1)
        }
        localStorage.setItem('level', level + 1)
        if (attempts < 3) {
          this.setState(state => {
            return { ...state, attempts: attempts + 1 }
          })
        }
      } else {
        this.setState(state => {
          return { ...state, difficult: difficult + 1 }
        })
      }
    } else {
      if (attempts < 1) {
        if (difficult <= 0) {
          if (level > 2) {
            this.setState(state => {
              return { ...state, level: level - 1, difficult: 0 }
            })
            localStorage.setItem('level', level - 1)
          }
        } else {
          this.setState(state => {
            return { ...state, difficult: difficult - 1 }
          })
        }
      } else {
        this.setState(state => {
          return { ...state, attempts: attempts - 1 }
        })
      }
    }
  }
  render() {
    window.baf = this.state
    const { squaresArr, attempts, isGuessing, record, level } = this.state
    let recordText = record ? `${record} уровень` : 'рекорд еще не установлен!'
    const { clickHandler } = this.props
    const squareWrapperWidth = 60 * squaresArr.length / Math.sqrt(squaresArr.length)
    const squaresElements = squaresArr.map((square, i) => {
      return <SquareItem isGuessing={isGuessing} clickHandler={this.handleClick} checked={square.checked} id={square.id} key={i} />
    })

    return (
      <div className="square">
        <button onClick={clickHandler} data-type="menu" className="menu__btn menu__btn_game">Выйти в меню</button>
        <div className="square__info">
          <h1 style={record ? {color: 'darkorange'} : {color: 'white'}}>Твой рекорд: {recordText}</h1>
          <p>Уровень: {level - 1}</p>
          <p>Попыток: {attempts}</p>
        </div>
        <div className="square__field">
          <div style={{ maxWidth: squareWrapperWidth ? squareWrapperWidth : '' }} className="square__field-wrapper">
            {squaresElements}
          </div>
        </div>
      </div>
    )
  }
}