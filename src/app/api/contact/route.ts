import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validation des champs requis
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Les champs nom, email et message sont requis.' },
        { status: 400 }
      );
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Format d\'email invalide.' },
        { status: 400 }
      );
    }

    // Configuration du transporteur email
    // Vous pouvez utiliser différents services SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true', // true pour 465, false pour les autres ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Vérification de la configuration
    if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      console.error('Configuration SMTP manquante. Veuillez configurer SMTP_USER et SMTP_PASSWORD dans vos variables d\'environnement.');
      return NextResponse.json(
        { error: 'Configuration serveur email manquante. Veuillez contacter l\'administrateur.' },
        { status: 500 }
      );
    }

    // Email destinataire (utilise TO_EMAIL si défini, sinon valeur par défaut)
    const recipientEmail = process.env.TO_EMAIL || 'contact@codgeni.com';

    // Contenu de l'email
    const mailOptions = {
      from: `"${name}" <${process.env.SMTP_USER}>`,
      replyTo: email,
      to: recipientEmail,
      subject: subject || `Nouveau message de contact de ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #000099; border-bottom: 2px solid #000099; padding-bottom: 10px;">
            Nouveau message de contact
          </h2>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Nom:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${subject ? `<p><strong>Sujet:</strong> ${subject}</p>` : ''}
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border-left: 4px solid #000099; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Message:</h3>
            <p style="color: #666; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #999; font-size: 12px;">
            <p>Ce message a été envoyé depuis le formulaire de contact du site CodGeni.</p>
            <p>Vous pouvez répondre directement à cet email pour contacter ${name} (${email}).</p>
          </div>
        </div>
      `,
      text: `
Nouveau message de contact

Nom: ${name}
Email: ${email}
${subject ? `Sujet: ${subject}` : ''}

Message:
${message}
      `,
    };

    // Envoi de l'email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Email envoyé avec succès!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de l\'envoi de l\'email. Veuillez réessayer plus tard.' },
      { status: 500 }
    );
  }
}




