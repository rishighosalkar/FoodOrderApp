import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Toast = () => {
    
    toast.info('This is a custom toast Notification!', {
        position: toast.POSITION.TOP_CENTER,
        className: 'toast-message'
    });

    return(
        <ToastContainer />
    )
}

export default Toast;