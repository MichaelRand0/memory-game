import './squareItem.scss'

export const SquareItem = ({clickHandler, checked, id}) => {
  return (
    <div onClick={clickHandler} id={id} data-checked={`${checked}`} className="square__item"></div>
  )
}