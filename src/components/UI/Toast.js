import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Toast = () => {
    
    const orderReceived = useSelector(state => state.isOrderReceived);
    toast.info('This is a custom toast Notification!');
    useEffect(() => {
        console.log('toast on order received', orderReceived)
        if(orderReceived)
            toast.info('This is a custom toast Notification!');
    }, [orderReceived])
    

    return(
        <>
            <ToastContainer />
        </>
    )
}

export default Toast;