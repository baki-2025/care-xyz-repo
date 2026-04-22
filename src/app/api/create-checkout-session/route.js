import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { bookingData } = await request.json();

    const sessionStripe = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "bdt",
            product_data: {
              name: bookingData.serviceName,
            },
            unit_amount: bookingData.totalCost * 100, // paisa
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
      metadata: {
        email: session.user.email,
        service: bookingData.serviceName,
        durationPlan: bookingData.durationPlan,
        durationValue: bookingData.durationValue,
        location: JSON.stringify(bookingData.location),
        totalCost: bookingData.totalCost,
        userId: session.user.id,
        serviceId: bookingData.serviceId,
      },
    });

    return NextResponse.json({ url: sessionStripe.url });
  } catch (error) {
    console.error("Stripe Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}