import './index.css'

const TabItemRoute = props => {
  const {eachItem, onClickTabItemLabel, isActive} = props
  const {id, label, value} = eachItem

  const onClickTabItem = () => {
    onClickTabItemLabel(id, label, value)
    // console.log(id)
  }

  const activeClassName = isActive
    ? 'active-tab-button'
    : 'book-shelf-tab-button'

  return (
    <li className="book-shelf-tab-Item">
      <button
        type="button"
        className={activeClassName}
        onClick={onClickTabItem}
      >
        {label}
      </button>
    </li>
  )
}

export default TabItemRoute
