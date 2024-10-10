import { useEffect, useRef, useState } from "react"


const ScrollTOSection = () => {
 
  const [selectedSection, setselectedSection] = useState('blue');

  const changeHandler = (e:React.ChangeEvent<HTMLSelectElement>) => {
    setselectedSection(e.target.value);
  }

  useEffect(() => {
    // Find the element corresponding to the selected section
    const section = document.getElementById(selectedSection);
    if (section) {
      // Scroll into view if the section exists
      section.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedSection]);



  return (
    <div className="w-screen h-fit flex flex-col">
      
      <select name="section" value={selectedSection} onChange={changeHandler} className="px-4 py-2 self-center" >
        <option value="blue"   >Blue</option>
        <option value="green"  >green</option>
        <option value="amber"  >amber</option>
        <option value="indigo" >indigo</option>
        <option value="fuchia" >fuchia</option>
        <option value="pink"   >pink</option>
        <option value="rose"   >rose</option>
        <option value="violet" >violet</option>
        <option value="emrald" >emrald</option>
        <option value="cyan"   >cyan</option>
        <option value="orange" >orange</option>
      </select>

      <div>
        <div id="blue" className="w-full h-96 bg-blue-500"></div>
        <div id="green" className="w-full h-96 bg-green-500"></div>
        <div id="amber" className="w-full h-96 bg-amber-400"></div>
        <div id="indigo" className="w-full h-96 bg-indigo-500"></div>
        <div id="fuchia" className="w-full h-96 bg-fuchsia-500"></div>
        <div id="pink" className="w-full h-96 bg-pink-500"></div>
        <div id="rose" className="w-full h-96 bg-rose-500"></div>
        <div id="violet" className="w-full h-96 bg-violet-600"></div>
        <div id="emrald" className="w-full h-96 bg-emerald-600"></div>
        <div id="cyan" className="w-full h-96 bg-cyan-500"></div>
        <div id="orange" className="w-full h-96 bg-orange-500"></div>
      </div>
    </div>
  )
}

export default ScrollTOSection