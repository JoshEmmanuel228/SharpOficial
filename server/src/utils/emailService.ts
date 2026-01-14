import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';

// Load env vars
dotenv.config({ path: path.join(__dirname, '../../.env') });

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export const sendAppointmentEmail = async (appointmentData: any) => {
    const { name, email, phone, address, date, time, product, price } = appointmentData;

    console.log(`[Email] Intentando enviar correo a admin: ${process.env.EMAIL_USER}`);

    const formattedDate = new Date(date).toLocaleDateString('es-MX', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    // WhatsApp Link Generation
    const waMessage = `Hola ${name}, confirmo tu cita para entrega de ${product || 'producto'} el día ${formattedDate} a las ${time} en ${address}. Total: $${price}. ¿Alguna duda?`;
    const waLink = `https://wa.me/${phone?.replace(/\D/g, '')}?text=${encodeURIComponent(waMessage)}`;

    const mailOptions = {
        from: `"Sharp Official Citas" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        subject: `📅 Nueva Cita Agendada: ${name}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #333; background-color: #000; color: #fff;">
                <h1 style="color: #facc15; text-align: center;">Nueva Cita Agendada</h1>
                
                <div style="background-color: #111; padding: 15px; border-radius: 8px; margin-top: 20px;">
                    <h3 style="color: #facc15; border-bottom: 1px solid #333; padding-bottom: 10px;">👤 Cliente</h3>
                    <p><strong>Nombre:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Teléfono:</strong> <a href="tel:${phone}" style="color: #facc15;">${phone}</a></p>
                    <p><strong>Dirección:</strong> ${address}</p>
                </div>

                <div style="background-color: #111; padding: 15px; border-radius: 8px; margin-top: 20px;">
                    <h3 style="color: #facc15; border-bottom: 1px solid #333; padding-bottom: 10px;">📅 Cita</h3>
                    <p><strong>Producto:</strong> ${product || 'No especificado'}</p>
                    <p><strong>Valor:</strong> $${price || '0'}</p>
                    <p><strong>Fecha:</strong> ${formattedDate}</p>
                    <p><strong>Hora:</strong> ${time}</p>
                </div>

                <div style="text-align: center; margin-top: 30px;">
                    <a href="${waLink}" style="background-color: #25D366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 16px;">
                        💬 Confirmar por WhatsApp
                    </a>
                </div>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('📧 Admin notification sent');
    } catch (error) {
        console.error('❌ Error sending admin email:', error);
    }
};

export const sendAppointmentClientEmail = async (appointmentData: any) => {
    const { name, email, address, date, time, product, price } = appointmentData;

    if (!email) return;

    const formattedDate = new Date(date).toLocaleDateString('es-MX', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    const mailOptions = {
        from: `"Sharp Official" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `✅ Cita Confirmada: ${product || 'Entrega'}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #333; background-color: #000; color: #fff;">
                <div style="text-align: center; padding-bottom: 20px;">
                    <h1 style="color: #facc15; margin: 0;">¡Cita Confirmada!</h1>
                </div>
                
                <p>Hola <strong>${name}</strong>, hemos agendado tu entrega correctamente.</p>

                <div style="background-color: #111; padding: 15px; border-radius: 8px; margin-top: 20px; border: 1px solid #333;">
                    <h3 style="color: #facc15; margin-top: 0;">📍 Detalles</h3>
                    <p><strong>Producto:</strong> ${product}</p>
                    <p><strong>Importe a pagar:</strong> $${price}</p>
                    <p><strong>Fecha:</strong> ${formattedDate}</p>
                    <p><strong>Hora:</strong> ${time}</p>
                    <p><strong>Lugar:</strong> ${address}</p>
                </div>

                <p style="margin-top: 20px; color: #aaa; font-size: 14px;">
                    Te contactaremos 30 minutos antes de llegar para confirmar tu ubicación.
                </p>

                <p style="margin-top: 10px; color: #aaa; font-size: 14px;">
                    También te enviamos la información por WhatsApp. Cualquier duda ponte en contacto con <a href="mailto:mexaion018@gmail.com" style="color: #facc15;">mexaion018@gmail.com</a>.
                </p>

                <div style="text-align: center; margin-top: 30px; font-size: 12px; color: #666; border-top: 1px solid #333; padding-top: 20px;">
                    Sharp Official - Estilo y Calidad
                </div>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`📧 Client confirmation sent to ${email}`);
    } catch (error) {
        console.error('❌ Error sending client email:', error);
    }
};

export const sendOrderEmail = async (orderData: any) => {
    const { _id, user, cartItems, total, paymentMethod } = orderData;
    const { fullName, address, city, zipCode, phone, email, deliveryDate, deliveryTime, deliveryStation } = user;

    console.log(`[Email] Sending order confirmation to admin: ${process.env.EMAIL_USER}`);

    const itemsHtml = cartItems.map((item: any) => `
        <div style="display: flex; gap: 10px; margin-bottom: 10px; border-bottom: 1px solid #333; padding-bottom: 10px;">
            <img src="${item.imageUrls[0]}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;" />
            <div>
                <p style="margin: 0; color: #fff; font-weight: bold;">${item.name}</p>
                <p style="margin: 0; color: #aaa; font-size: 12px;">Cant: ${item.quantity} ${item.size ? `| Talla: ${item.size}` : ''}</p>
                <p style="margin: 0; color: #facc15;">$${item.price * item.quantity}</p>
            </div>
        </div>
    `).join('');

    const formattedDate = new Date().toLocaleDateString('es-MX', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });



    // WhatsApp Message
    const waMessage = `Hola ${fullName}, gracias por tu compra en Sharp Official. \n\nConfirmamos tu pedido de:\n${cartItems.map((i: any) => `- ${i.name} (${i.quantity})`).join('\n')}\n\nTotal: $${total}\n\nEntregaremos el ${deliveryDate} a las ${deliveryTime} en la estación ${deliveryStation}.\n\nPara cualquier duda, estamos a tus órdenes.`;
    const waLink = `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(waMessage)}`;


    const mailOptions = {
        from: `"Sharp Official Pedidos" <${process.env.EMAIL_USER}>`,
        to: 'mexaion018@gmail.com',
        subject: `🛒 Nuevo Pedido de ${fullName}`,
        html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #000; color: #fff; border: 1px solid #333;">
                <div style="background-color: #facc15; padding: 20px; text-align: center;">
                    <h1 style="color: #000; margin: 0;">¡Nuevo Pedido Recibido!</h1>
                </div>
                
                <div style="padding: 20px;">
                    <p style="font-size: 16px; color: #ccc;">Has recibido un nuevo pedido el ${formattedDate}</p>

                    <div style="background-color: #111; padding: 15px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #333;">
                        <h3 style="color: #facc15; margin-top: 0; border-bottom: 1px solid #333; padding-bottom: 10px;">👤 Detalles del Cliente</h3>
                        <p style="margin: 5px 0;"><strong>Nombre:</strong> ${fullName}</p>
                        <p style="margin: 5px 0;"><strong>Email:</strong> ${email || 'No proporcionado'}</p>
                        <p style="margin: 5px 0;"><strong>Dirección:</strong> ${address}, ${city} CP: ${zipCode}</p>
                        <p style="margin: 5px 0;"><strong>Teléfono:</strong> <a href="tel:${phone}" style="color: #facc15; text-decoration: none;">${phone}</a></p>
                        <p style="margin: 5px 0;"><strong>Método de Pago:</strong> ${paymentMethod === 'cash' ? '💵 Efectivo / Contraentrega' : paymentMethod}</p>
                    </div>

                    <div style="background-color: #111; padding: 15px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #333;">
                        <h3 style="color: #facc15; margin-top: 0; border-bottom: 1px solid #333; padding-bottom: 10px;">📍 Detalles de Entrega</h3>
                        <p style="margin: 5px 0;"><strong>Fecha:</strong> ${deliveryDate}</p>
                        <p style="margin: 5px 0;"><strong>Hora:</strong> ${deliveryTime}</p>
                        <p style="margin: 5px 0;"><strong>Estación Suburbano:</strong> <span style="color: #facc15;">${deliveryStation}</span></p>
                    </div>

                    <div style="background-color: #111; padding: 15px; border-radius: 8px; border: 1px solid #333;">
                        <h3 style="color: #facc15; margin-top: 0; border-bottom: 1px solid #333; padding-bottom: 10px;">📦 Resumen del Pedido</h3>
                        ${itemsHtml}
                        <div style="text-align: right; margin-top: 15px; font-size: 18px;">
                            <strong>Total: <span style="color: #facc15;">$${total}</span></strong>
                        </div>
                    </div>

                    <div style="margin-top: 30px; text-align: center; border-top: 1px solid #333; padding-top: 20px;">
                        <h3 style="color: #facc15;">⚙️ Acciones de Administrador</h3>
                        <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                            <a href="${waLink}" style="background-color: #25D366; color: white; padding: 12px 20px; text-decoration: none; border-radius: 6px; font-weight: bold;">💬 Enviar Confirmación por WhatsApp</a>
                        </div>
                    </div>
                </div>

                <div style="text-align: center; padding: 20px; color: #666; font-size: 12px; border-top: 1px solid #333;">
                   Sharp Official Automated System
                </div>
            </div>
        `
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('📧 Order email sent successfully:', info.messageId);
        return true;
    } catch (error) {
        console.error('❌ Error sending order email:', error);
        return false;
    }
};

export const sendClientConfirmationEmail = async (orderData: any) => {
    const { user, cartItems, total } = orderData;
    const { fullName, email, deliveryDate, deliveryTime, deliveryStation } = user;

    console.log(`[Email] Sending confirmation to client: ${email}`);

    if (!email) {
        console.log('No email provided for client confirmation.');
        return false;
    }

    // Get the first item's image for the email
    const mainImage = cartItems[0]?.imageUrls[0];

    const mailOptions = {
        from: `"Sharp Official" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `✅ Confirmación de tu Pedido Sharp Official`,
        html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #000; color: #fff; border: 1px solid #333;">
                <div style="background-color: #facc15; padding: 20px; text-align: center;">
                    <h1 style="color: #000; margin: 0;">¡Pedido Confirmado!</h1>
                </div>
                
                <div style="padding: 20px;">
                    <p style="font-size: 16px; color: #ccc;">Hola <strong>${fullName}</strong>, gracias por tu compra.</p>
                    <p style="color: #ccc;">Tu pedido ha sido confirmado y procesado correctamente. Aquí están los detalles de tu entrega:</p>

                     <div style="text-align: center; margin: 20px 0;">
                        ${mainImage ? `<img src="${mainImage}" alt="Producto" style="max-width: 100%; height: auto; border-radius: 8px; border: 1px solid #333;" />` : ''}
                    </div>

                    <div style="background-color: #111; padding: 15px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #333;">
                        <h3 style="color: #facc15; margin-top: 0; border-bottom: 1px solid #333; padding-bottom: 10px;">📍 Tu Cita de Entrega</h3>
                        <p style="margin: 5px 0;"><strong>Lugar:</strong> Estación Suburbano ${deliveryStation}</p>
                        <p style="margin: 5px 0;"><strong>Fecha:</strong> ${deliveryDate}</p>
                        <p style="margin: 5px 0;"><strong>Hora:</strong> ${deliveryTime}</p>
                        <p style="margin: 5px 0; color: #facc15;">Recuerda llevar el monto exacto: $${total}</p>
                    </div>

                    <div style="background-color: #111; padding: 15px; border-radius: 8px; border: 1px solid #333;">
                        <h3 style="color: #facc15; margin-top: 0; border-bottom: 1px solid #333; padding-bottom: 10px;">📦 Artículos</h3>
                        ${cartItems.map((item: any) => `
                            <p style="margin: 5px 0;">- ${item.name} x${item.quantity} ($${item.price})</p>
                        `).join('')}
                    </div>
                </div>

                <div style="text-align: center; padding: 20px; color: #666; font-size: 12px; border-top: 1px solid #333;">
                   Sharp Official - Estilo y Calidad
                </div>
            </div>
        `
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('📧 Client confirmation email sent successfully:', info.messageId);
        return true;
    } catch (error) {
        console.error('❌ Error sending client email:', error);
        return false;
    }
};
