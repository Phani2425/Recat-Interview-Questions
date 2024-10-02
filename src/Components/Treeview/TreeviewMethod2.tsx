import navData from './data'
import TreeviewParent from './TreeviewParent'

const TreeviewMethod2 = () => {
  return (
    <div className="w-screen h-screen relative">
      <ul className="absolute bg-blue-600 text-white left-0 w-[30%] h-full px-3 py-2">

         <TreeviewParent data={navData.navigation} />

      </ul>
    </div>
  )
}

export default TreeviewMethod2