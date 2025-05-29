import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyPayment } from '../apiService';
import LoadingSpinner from './LoadingSpinner';

declare global {
  interface Window {
    Razorpay: any;
    razorpayInstance: any;
  }
}

interface PaymentFormProps {
  order: any;
  booking: any;
  keyId: string;
  onPaymentSuccess: (booking: any) => void;
  onPaymentError: (error: string) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  order,
  booking,
  keyId,
  onPaymentSuccess,
  onPaymentError
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    const loadRazorpay = async () => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        initializePayment();
      };
    };

    loadRazorpay();

    return () => {
      const script = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const initializePayment = () => {
    const options = {
      key: keyId,
      amount: order.amount,
      currency: order.currency,
      name: 'North East Adventure',
      description: `Booking for ${booking.packageName}`,
      order_id: order.id,
      handler: async function (response: any) {
        try {
          const result = await verifyPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            bookingId: booking.id
          });

          if (result.data.booking.status === 'Confirmed') {
            onPaymentSuccess(result.data.booking);
          } else {
            onPaymentError('Payment verification failed');
          }
        } catch (error: any) {
          onPaymentError(error.response?.data?.message || 'Payment verification failed');
        } finally {
          // Always close the popup
          if (window.razorpayInstance) {
            window.razorpayInstance.close();
            window.razorpayInstance = null;
          }
        }
      },
      prefill: {
        name: booking.customerName,
        email: booking.customerEmail
      },
      theme: {
        color: '#4F46E5'
      },
      modal: {
        ondismiss: () => {
          // Optionally handle popup dismiss
        }
      }
    };

    window.razorpayInstance = new window.Razorpay(options);
    window.razorpayInstance.open();
  };

  return (
    <div className="text-center">
      <LoadingSpinner message="Initializing payment gateway..." />
    </div>
  );
};

export default PaymentForm; 