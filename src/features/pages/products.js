import { useEffect, useState } from "react";
import commonNetwork from "../../common/api/commonNetwork";
import Button from "../components/Elements/Button";
import { NavLink } from "react-router-dom";
import BasketModal from "../components/BasketModal";
import { useRef } from "react";
import { Alert } from "@mui/material";
import { toast } from "react-toastify";


export default function Products() {
  const [productList, setProductList] = useState([]);
  const basketModalRef = useRef();
  const [basket, setBasket] = useState([]);
  const [count, setCount] = useState(0);
  useEffect(() => {
    getAllProducts();
  }, [])
  const getAllProducts = async () => {
    console.log("girdi");
    const { data, isSuccess } = await commonNetwork.get('/Products/GetAllProducts');
    console.log("girdi",data);

    if (isSuccess) {
      setProductList(data);
    }
  }
  
  const fetchProducts = async () => {
    const { data, isSuccess } = await commonNetwork.post('/Products/AddProductsThanApi');
    if (isSuccess) {
      getAllProducts();
    }
  }
  const removeProducts = async () => {
    const { data, isSuccess, errorMessage } = await commonNetwork.get('/Products/RemoveAll');
    if (isSuccess) {
      toast.success("Ürünler başarıyla silindi");
      setProductList([]);
    } else {
      toast.success("Ürünler  silinirken hata oluştu : Hata detayı" + errorMessage);

    }
  }

  const addToBasket = (product) => {
    var oldBasket = [];
    var basketProduct;
    var isBasket = false;
    if (basket.length == 0) {
      if (product.stock > 0) {
        product.basketCount = 1;
        oldBasket.push(product);
        toast.success(product.title + "  isimli ürün sepete başarıyla eklendi");
        setBasket(oldBasket);
      }
    } else {

      var productBasketCount = 1;
      //sepetteki ürün ve stok kontrolü
      basket?.map((item, key) => {
        if (Number(item.id) == Number(product.id)) {
          isBasket = true;
          basketProduct = item;
        }
        else {
          oldBasket.push(item);
        }
      })
      //sepette var ise sepetteki ürün sayısı ile stok arasındaki kontrol
      if (isBasket) {
        if (basketProduct.stock > basketProduct.basketCount) {
          basketProduct.basketCount++;
          oldBasket.push(basketProduct)
          toast.success(product.title + "  isimli ürün sepete başarıyla eklendi");
          setBasket(oldBasket);
        }
      }
      //sepette yok ise stok var mı kontrolü
      else {
        if (product.stock > 0) {
          oldBasket.push(product)
          product.basketCount = 1;
          toast.success(product.title + "  isimli ürün sepete başarıyla eklendi");
          setBasket(oldBasket);
        }
      }
    }
    getBasketCount();
  }
  const getBasketCount = () => {
    var count = 0;
    basket.map((item, key) => {
      count += item.basketCount;
    })
    setCount(count);
  }
  const salesOrder = () => {
    var isInStock = true;
    basket.map((item, key) => {
      if (item.stock < item.basketCount) {
        isInStock = false;
      }
    })
    if (isInStock) {
      toast.success("Satın alma işlemi başarıyla gerçekleşmiştir");
    } else {
      toast.error("Stoktaları kontrol ediniz");
    }
  }

  return (
    <>
      <div className="w-full bg-red">
        <div className="p-4 flex flex-col justify-center space-y-2">
          <div className="flex justify-between">
            <div>
              <span className="font-bold text-contrast-90 text-2xl	">
                Ürünler
              </span>
            </div>

            <div className="justify-between mr-4">
             
              <Button size="xl" className={"mr-4"} color="primary" hover="gray" callback={() => {
                fetchProducts();
              }}
              >
                Ürünleri Servisten Çek
              </Button>
              <Button size="xl" className={"mr-4"} color="error" hover="gray" callback={() => {
                removeProducts();
              }}
              >
                Tüm Ürünleri Sil
              </Button>
              <Button size="xl" color="warning" hover="error" callback={() => {
                basketModalRef.current.showConfirm({
                  basket,
                  confirmCallBack: () => salesOrder()
                });

              }}
              >
                Sepeti Görüntüle (Ürün Sayısı -{count})
              </Button>


            </div>
          </div>


          <div class="bg-white">
            <div class="mx-auto max-w-2xl px-2 py-2 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
              <h2 class="sr-only">Products</h2>
              <div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {
                  productList.length != 0 ? (
                    productList.map((item, key) => {
                      return (
                        <a href="#" class="group">
                          <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                            <img src={item.images[0]} class="w-28 h-44 " />
                          </div>
                          <h3 class="mt-4 text-sm text-gray-700">{item.title}</h3>
                          <p class="mt-1 text-lg font-medium text-gray-900">{item.price}₺</p>
                          <div className="mt-2 text-lg items-start">
                            <NavLink state={{ id: item.id }} className="text-blue-600" to={"/product-detail"}>
                              Detaya Git
                            </NavLink>
                          </div>
                          <div className="mt-2 text-lg items-start">
                            <Button size="xl" color="success" callback={() => {
                              addToBasket(item);

                            }}
                            >
                              Sepete Ekle
                            </Button>
                          </div>
                        </a>
                      );
                    }

                    )
                  ) : (
                    <div>Ürün Yok</div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <BasketModal ref={basketModalRef}></BasketModal>
    </>
  );
}
