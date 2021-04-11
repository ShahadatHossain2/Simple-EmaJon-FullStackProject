import React from 'react';
import { Elements} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SimplePayForm from './SimplePayForm';

const stripePromise = loadStripe('pk_test_51IeBWmKGzVRjLceq7dRyGlIcRHxa8rzqbK1AkHIT2z0UxXVPaGPhRtZfDfPsG5BK5TePeNxgS8ynzGRqdN7afzPe00ZCJhH6se');

const ProcessPayment = ({handlePaymet}) => {
    return (
        <Elements stripe={stripePromise}>
            <SimplePayForm handlePaymet={handlePaymet}></SimplePayForm>
        </Elements>
    );
};

export default ProcessPayment;