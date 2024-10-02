import { useEffect, useState } from "react";

const Loadmore = () => {
  const [products, setproducts] = useState<any>(null);
  const [loading, setloading] = useState(false);
  const [url, seturl] = useState<string>(
    `https://dummyjson.com/products?limit=16&skip=10`
  );
  const [count, setcount] = useState<number>(0);
  const [showProducts, setshowProducts] = useState<boolean>(false);

  const fetchProducts = async () => {
    setloading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data) {
        const updatedProducts = products
          ? [...products, ...data.products]
          : data.products;
        setproducts(updatedProducts);
      }
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log("An unknown error occurred");
      }
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    seturl(`https://dummyjson.com/products?limit=16&skip=${count * 16}`);
  }, [count]);

  useEffect(() => {
    fetchProducts();
  }, [url]);

  return (
    <div className="w-screen h-fit flex flex-col justify-center items-center gap-5 my-5">
      {loading ? (
        <div className="custom-loader"></div>
      ) : (
        <>
        <button  className={`px-4 py-2 rounded-lg bg-yellow-500 font-semibold cursor-pointer ${showProducts && 'hidden'}`} onClick={()=> {setshowProducts(!showProducts)}}>Show Products</button>
        {
           showProducts && (
            <>
          <div className="grid grid-cols-2 md:grid-cols-4 w-9/12 mx-auto gap-3 ">
            {
              products && products.map((product:any) => (
                <div className="flex flex-col gap-2 shadow-xl p-4 rounded-lg hover:scale-105 hover:shadow-2xl transition-all duration-200 ">

                  <img
                  src={product.thumbnail}
                  alt="product"
                  className="object-cover rounded-t-lg "
                  />

                  <h1>{product.title}</h1>
                  <p>{product.description.length > 50 ? `${product.description.substring(0,50)}...` : product.description} </p>
                  <span className="font-bold text-xl text-green-500">{`$ ${product.price}`}</span>

                </div>
              ))
            }
          </div>
          <div>
            <div
              className={` text-center text-xl font-bold ${
                count < 4 ? "hidden" : "block"
              }`}
            >
              You have reached more than 50 products
            </div>
            <button
              disabled={count < 4 ? false : true}
              onClick={() => setcount(count + 1)}
              className="px-4 py-2 rounded-lg bg-yellow-500 font-semibold cursor-pointer"
            >
              Load More
            </button>
          </div>
        </>
           )
        }
        </>
      )}
    </div>
  );
};

export default Loadmore;
