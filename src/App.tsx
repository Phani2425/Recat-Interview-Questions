import Accordion from "./Components/Accordion/Accordion"
import ColorGenerator from "./Components/ColorGenerator/ColorGenerator"
import ImageSlider from "./Components/ImageSlider/ImageSlider";
import StarRating from "./Components/StarRating/Star";
import './App.css'
import Loadmore from "./Components/LoadMore/Loadmore";
import Treeview from "./Components/Treeview/Treeview";
import TreeviewMethod2 from "./Components/Treeview/TreeviewMethod2";
import LightDarkMode from "./Components/ModeSwith/LightDarkMode";
import ScrollIndicator from "./Components/ScrollIndicator/ScrollIndicator";
import Navbar from "./Components/ScrollIndicator/Navbar";
import HomeForModal from "./Components/Modal/HomeForModal";
import GitFInder from "./Components/GitHubProfileFinder/GitFInder";


const App = () => {
  return (
    <div className="flex flex-col w-screen h-auto ">
      <Navbar/>
      <Accordion/>
      <ColorGenerator/>
      <StarRating/>
      <ImageSlider/>
      <Loadmore/>
      <Treeview/>
      <TreeviewMethod2/>
      <LightDarkMode/>
      <ScrollIndicator/>
      <HomeForModal/>
      <GitFInder/>
    </div>
  )
}

export default App
