import React, { useEffect, useState } from "react";
import CardFeature from "./CardFeature";
import FilterProduct from "./FilterProduct";
import { useSelector } from "react-redux";

const Allproduct = ({ heading }) => {
  const productData = useSelector((state) => state.product.productList);
  const categoryList = [...new Set(productData.map((el) => el.category))];

  //filter data display
  const [filterby, setFilterBy] = useState("");
  const [dataFilter, setDataFilter] = useState([]);
  useEffect(() => {
    setDataFilter(productData);
  }, [productData]);

  const handleFilterProduct = (category) => {
    setFilterBy(category)
    const filter = productData.filter(
      (el) => el.category.toLowerCase() === category.toLowerCase()
    );
    setDataFilter(() => {
      return [...filter];
    });
  };

  const loadingArrayFeature = new Array(7).fill(null);
  return (
    <div className="my-5">
      <h2 className="font-bold text-slate-800 text-2xl mb-4 py-5 ">
        {heading}
      </h2>
      <div className="flex gap-5 justify-center overflow-scroll scrollbar-none">
        {categoryList[0] ? (
          categoryList.map((el) => {
            return (
              <FilterProduct
                category={el}
                key={el}
                isActive={el.toLowerCase() === filterby.toLowerCase()}
                onClick={() => handleFilterProduct(el)}
              />
            );
          })
        ) : (
          <div className="flex items-center h-full justify-center">
            <p>loading...</p>
          </div>
        )}
      </div>
      <div className="flex flex-wrap justify-center gap-5">
        {dataFilter[0]
          ? dataFilter.map((el) => {
              return (
                <CardFeature
                  key={el._id}
                  id={el._id}
                  image={el.image}
                  name={el.name}
                  category={el.category}
                  price={el.price}
                />
              );
            })
          : loadingArrayFeature.map((el, index) => {
              return (
                <CardFeature
                  key={index + "allProduct"}
                  loading={"Loading..."}
                />
              );
            })}
      </div>
    </div>
  );
};

export default Allproduct;
