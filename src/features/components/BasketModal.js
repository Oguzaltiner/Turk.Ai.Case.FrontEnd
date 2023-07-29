import React, { useImperativeHandle, useState } from "react";
import Button from "./Elements/Button";
import Modal from "./Modal";


const BasketModal = React.forwardRef(({ }, ref) => {

    const [isVisible, setIsVisible] = useState(false);
    const [modalValues, setModalValues] = useState([]);
    useImperativeHandle(ref, () => ({

        showConfirm({ basket, confirmCallBack }) {

            setModalValues({ basket , confirmCallBack});
            setIsVisible(true);
        },
        hideModal() {
            setIsVisible(false);
        }

    }));


    return (
        <Modal openModal={isVisible} setOpenModal={setIsVisible}>
            <div>
                <div className="sm:flex sm:items-start">
                    {
                        modalValues?.basket?.map((item, key) => {
                            return (
                                <div className="mt-3 mr-4 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <p className="text-md  leading-6 font-bold text-gray-900">
                                    {item?.title}
                                    </p>
                                    <div>
                                        <div className=" flex">
                                            <img
                                                className="object-contain h-48 w-64"
                                                src={item?.images[1]}
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-sm text-gray-500">
                                            Fiyat  :  {item?.price}
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-sm text-gray-500">
                                            Adet   :  {item?.basketCount}
                                        </p>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:justify-end space-x-2">
                    <Button
                        color="gray"
                        hover="gray"
                        size="xs"
                        callback={() => setIsVisible(false)}
                    >
                        {"İptal"}
                    </Button>
                    <Button
                        color="primary"
                        hover="primary"
                        size="xs"
                        callback={() => {
                            modalValues.confirmCallBack()
                            setIsVisible(false)
                        }}
                    >
                        {"Satın Al"}
                    </Button>
                </div>
            </div>
        </Modal>
    );
})
export default BasketModal;