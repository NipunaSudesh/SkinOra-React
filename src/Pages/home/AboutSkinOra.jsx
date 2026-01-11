import React from 'react'
import banner6 from "../../assets/images/banner6.png";
import Typography from "../../components/theme/Typography";

export default function AboutSkinOra() {
  return (
    <div className='flex flex-col-reverse lg:flex-row mt-10 gap-4'>
        <div className='lg:w-1/2 w-full item-center flex justify-center'>
            <img src={banner6} alt='banner 6 about skinOra' className='rounded-2xl shadow-xl w-[500px] md:w-[650px] object-cover'/>
        </div>
        <div className='lg:w-1/2 w-full flex flex-col justify-center'>
        <Typography variant="h3" className="text-primary font-bold mb-4">The latest beauty and skincare products at your fingertips…</Typography>
        <Typography variant="body1" className="text-gray-700 mb-4">SkinOra brings all your beauty and skincare essentials together in one trusted place at affordable prices. Explore a wide range of authentic international skincare, hair care, baby care, and wellness products, all carefully selected to suit Sri Lanka’s climate and lifestyle. Enjoy exclusive online deals, easy payments, and island-wide delivery for your convenience.</Typography>
        <Typography variant="body1" className="text-gray-700 mb-4"> We believe skincare is more than a routine—it’s a way of life. That’s why SkinOra offers the latest products from globally trusted brands such as CeraVe, Cetaphil, La Roche-Posay, Neutrogena, Nivea, and more. Upgrade your daily routine with dermatologist-approved products, create wishlists, discover exciting discounts, and enjoy a personalized shopping experience by signing up today. for this give section name cteate image for that skinOra.</Typography>
        </div>
    </div>
  )
}
