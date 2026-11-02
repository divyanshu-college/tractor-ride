export const openRazorpayCheckout = (data) => {
    const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: "TractorRide",
        description: "Tractor Booking Payment",
        order_id: data.order_id,

        handler: function (response) {
            console.log("Payment Successful!");
            console.log(response);
        },

        prefill: {
            name: "",
            email: "",
            contact: ""
        },

        theme: {
            color: "#16a34a"
        }
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
};

export const createPaymentOrder = async (bookingId, token) => {
    const response = await fetch(
        "http://127.0.0.1:8000/api/payments/create-order/",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                booking_id: bookingId,
            }),
        }
    );

    if (!response.ok) {
        throw new Error("Unable to create payment order");
    }

    return await response.json();
};