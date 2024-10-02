import { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

const apiurl = "https://picsum.photos/v2/list";

const ImageSlider = () => {
  const [images, setimages] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchImages = async () => {
    try {
      const response = await fetch(apiurl);
      const data = await response.json();

      if (data) {
        setimages(data);
      }
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log("An unknown error occurred");
      }
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div
      className={`w-full h-screen flex flex-col justify-around items-center`}
    >
      <div className="w-[600px] h-[420px] m-auto shadow-2xl rounded-lg flex justify-center items-center px-3 py-3">
        {images && images.length > 0 ? (
          <div className="relative flex justify-center items-center w-full h-full">
            <img
              className="rounded-xl object-fill w-full h-full"
              key={images.id}
              src={images[currentPage].download_url}
              alt="api"
            />

            <div
              className=" cursor-pointer absolute h-20 w-20 rounded-full bg-gray-500 bg-opacity-60 right-2 top-[40%] flex justify-center items-center"
              onClick={() => {
                setCurrentPage((currentPage + 1) % images.length);
              }}
            >
              <IoIosArrowForward size={40} className="text-white" />
            </div>
            <div
              className=" cursor-pointer absolute h-20 w-20 rounded-full bg-gray-500 bg-opacity-60 left-2 top-[40%] flex justify-center items-center"
              onClick={() => {
                if (currentPage === 0) {
                  setCurrentPage(images.length - 1);
                } else {
                  setCurrentPage(currentPage - 1);
                }
              }}
            >
              <IoIosArrowBack size={40} className="text-white" />
            </div>

            <div className="absolute bottom-3 flex gap-1 overflow-hidden">
              {images &&
                images.map((image: any, index:number) => (
                  <div
                    key={image.id}
                    className={`h-3 w-3 rounded-full   ${
                      currentPage === index ? "bg-blue-500 " : "bg-white"
                    }`}
                  ></div>
                ))}
            </div>
          </div>
        ) : (
          <div className="custom-loader"></div>
        )}
      </div>
    </div>
  );
};

export default ImageSlider;
