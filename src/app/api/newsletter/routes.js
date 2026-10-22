// src/app/api/newsletter/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ success: false, message: 'Invalid email address.' }, { status: 400 });
    }

    // Yahan aap apni database logic ya email service (jaise Resend, SendGrid, Nodemailer) integrate kar sakte hain.
    // Filhaal hum success response bhej rahe hain.
    console.log('Newsletter Subscription Email:', email);

    return NextResponse.json({ 
      success: true, 
      message: 'Successfully subscribed to the newsletter!' 
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ success: false, message: 'Something went wrong.' }, { status: 500 });
  }
}