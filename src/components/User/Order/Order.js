import Card from '../../UI/Card';
import OrderForm from "./OrderForm";
import classes from './Order.module.css';

const Order = () => {
    return(
        <section className={classes.order}>
            <Card>
                <OrderForm />
            </Card>
        </section>
    )
}

export default Order;