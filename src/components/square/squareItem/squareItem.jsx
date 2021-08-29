import './squareItem.scss'

export const SquareItem = ({clickHandler, checked, isGuessing, id}) => {
  const dataClass = isGuessing == true && checked == null ? '' : checked
  return (
    <div onClick={clickHandler} id={id} data-checked={`${dataClass}`} className='square__item'></div>
  )
}