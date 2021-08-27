import './menu.scss'
export const Menu = ({clickHandler}) => {
  let isResumeGame = localStorage.getItem('level')
  return (
    <div className="menu">
      {isResumeGame ? <button data-type="resume" onClick={clickHandler} className="menu__btn">Продолжить</button> : ''}
      <button data-type="new" onClick={clickHandler} className="menu__btn">Новая игра</button>
      <button onClick={clickHandler} className="menu__btn">Настройки <span style={{color: 'red'}}>(в разработке)</span></button>
    </div>    
  )
}