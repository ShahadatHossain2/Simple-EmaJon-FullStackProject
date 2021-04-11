import React, { useContext, useState } from 'react';
import { userContext } from '../../App';
import ProcessPayment from '../ProcessPayment/ProcessPayment';
import { useForm } from "react-hook-form";
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';

const Shipment = () => {
    
    const { register, handleSubmit, watch, formState :{errors} } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const [shippingData, setShippingData] = useState({});
    const onSubmit = data => {
        setShippingData(data);
    };

    const handlePaymet = paymentId => {
        console.log(paymentId);
      const savedCart = getDatabaseCart();
      const orderDetails = { ...loggedInUser, paymentId : paymentId, products: savedCart, shipment: shippingData, orderTime: new Date() };
  
      fetch('http://localhost:5000/addOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderDetails)
      })
        .then(res => res.json())
        .then(data => {
          if (data) {
            processOrder();
            alert('Your order placed successfully');
          }
  
        });
    }
    return (
        <div className="row">
            <div className="col-md-6">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input defaultValue={loggedInUser.name} {...register("name", { required: true })} placeholder="Name" /> <br/>
                    {errors.exampleRequired && <span>This field is required</span>}
                    <input defaultValue={loggedInUser.email} {...register("email", { required: true })} placeholder="Email" /> <br/>
                    {errors.exampleRequired && <span>This field is required</span>}
                    <input defaultValue={""} {...register("phoneNo", { required: true })} placeholder="Phone no" /> <br/>
                    {errors.exampleRequired && <span>This field is required</span>}
                    <input defaultValue={""} {...register("Address", { required: true })} placeholder="Address" /> <br/>
                    {errors.exampleRequired && <span>This field is required</span>}
                    <input type="submit" />
                </form>
            </div>
            <div  className="col-md-6">
                <h3>Please Pay For</h3>
                <ProcessPayment handlePaymet={handlePaymet}></ProcessPayment>
            </div>
        </div>
    );
};

export default Shipment;