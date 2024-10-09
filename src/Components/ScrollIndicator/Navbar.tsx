import UseScrollIndicator from "./UseScrollIndicator";

function Navbar() {

    const scrollPercentage = UseScrollIndicator();

  return (
    <div className="h-14 w-full sticky top-0 flex justify-between items-center px-11 py-3 bg-white">
      <div className="flex gap-3 items-center">
        <div className="h-4 w-4 rounded-full bg-yellow-500"></div>
        <div className="h-4 w-4 rounded-full bg-red-500"></div>
        <div className="h-4 w-4 rounded-full bg-blue-500"></div>
      </div>

      <ul className="flex gap-4 font-medium text-lg">
        <li>Home</li>
        <li>About</li>
        <li>Services</li>
      </ul>

      <span  style={{ transform: `translateX(${scrollPercentage - 100}%)` }}  className={` absolute left-0 bottom-0 bg-red-600 h-2 w-full`}></span>
    </div>
  );
}

export default Navbar;
