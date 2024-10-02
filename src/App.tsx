import Accordion from "./Components/Accordion/Accordion"
import ColorGenerator from "./Components/ColorGenerator/ColorGenerator"
import ImageSlider from "./Components/ImageSlider/ImageSlider";
import StarRating from "./Components/StarRating/Star";
import './App.css'
import Loadmore from "./Components/LoadMore/Loadmore";
import Treeview from "./Components/Treeview/Treeview";
import TreeviewMethod2 from "./Components/Treeview/TreeviewMethod2";
import LightDarkMode from "./Components/ModeSwith/LightDarkMode";


const App = () => {
  return (
    <div className="flex flex-col w-screen h-auto overflow-hidden">
      {/* <Accordion/>
      <ColorGenerator/>
      <StarRating/>
      <ImageSlider/>
      <Loadmore/> */}
      {/* <Treeview/> */}
      {/* <TreeviewMethod2/> */}
      <LightDarkMode/>
    </div>
  )
}

export default App
