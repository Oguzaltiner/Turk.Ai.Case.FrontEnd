import React, { Component } from "react";
import { useState } from "react";
import { useEffect } from "react";
import commonNetwork from "../../common/api/commonNetwork";
import { useLocation } from "react-router-dom";
import Loading from "../components/Loading";


export default function ProductDetail() {
  const [productDetail, setProductDetail] = useState();
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const {id} = location.state;
  useEffect(() => {
    getProductDetail();
  }, [])
  const getProductDetail = async () => {
    var params = {
      id: id
    };
    const { data, isSuccess } = await commonNetwork.get('/Products/GetProductDetailById', params);
    if (isSuccess) {
      setProductDetail(data);
      setLoading(false);
    }
  }

  return (
    loading ? (
      <Loading>Ürün detayı yükleniyor</Loading>
    ) : (

      <div>
        <div className="m-2 p-4 bg-white shadow-md sm:text-sm md:text-sm lg:text-base">
          <div className="flex flex-row break-words">
            <div className="xl:basis-full lg:basis-1/2 md:basis-1/2 sm:basis-1/2 m-1 p-1">
              <div className="bg-primary m-1 p-1 ">
                <span className=" text-white pl-1 ">Ürün Detayı</span>
              </div>
              <div className=" m-1 p-1 ">
                <div className="my-1 py-1  flex flex-row ">
                  <div className="basis-5/12 font-bold ">Ürün Numarası: </div>
                  <div className="basis-7/12 ">{productDetail.id}</div>
                </div>
                <div className="my-1 py-1  flex flex-row ">
                  <div className="basis-5/12 font-bold ">Ürün Başlığı: </div>
                  <div className="basis-7/12 ">{productDetail.title}</div>
                </div> <div className="my-1 py-1  flex flex-row ">
                  <div className="basis-5/12 font-bold ">Ürün Açıklaması:</div>
                  <div className="basis-7/12 ">{productDetail.description}</div>
                </div>
                <div className="my-1 py-1  flex flex-row ">
                <div className="basis-5/12 font-bold ">Ürün Fiyatı: </div>
                <div className="basis-7/12 ">{productDetail.price}</div>
              </div>
              <div className="my-1 py-1  flex flex-row ">
                <div className="basis-5/12 font-bold ">İskonto: </div>
                <div className="basis-7/12 ">{productDetail.discountPercentage}</div>
              </div>
              <div className="my-1 py-1  flex flex-row ">
                <div className="basis-5/12 font-bold ">Ürün Oyu: </div>
                <div className="basis-7/12 ">{productDetail.rating}</div>
              </div>
              <div className="my-1 py-1  flex flex-row ">
                <div className="basis-5/12 font-bold ">Stok: </div>
                <div className="basis-7/12 ">{productDetail.stock}</div>
              </div>
              <div className="my-1 py-1  flex flex-row ">
                <div className="basis-5/12 font-bold "> Marka: </div>
                <div className="basis-7/12 ">{productDetail.brand}</div>
              </div>
              <div className="my-1 py-1  flex flex-row ">
                <div className="basis-5/12 font-bold ">Kategori: </div>
                <div className="basis-7/12 ">{productDetail.category}</div>
              </div>
              <div className="my-1 py-1  flex flex-row ">
                <div className="basis-10/12 font-bold ">Fotoğraf: </div>
                <img src={productDetail.thumbnail} alt="pos" className="bg-cover bg-center text-center  shadow-lg rounded-xl w-28 h-24 flex container flex-1" />
              </div>
              <div className="my-1 py-1  flex flex-row ">
                <div className="basis-5/6 font-bold ">Fotoğraf: </div>
                {
                  productDetail?.images?.map((image,key)=>{
                    return(
                      <img src={image} alt="pos" className="bg-cover bg-center text-center  shadow-lg rounded-xl w-28 h-24 flex container flex-1" />
                    )
                  })
                }
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )

  );
}
