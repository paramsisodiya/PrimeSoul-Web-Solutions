'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  id: number
  text: string
  sender: 'bot' | 'user'
  options?: string[]
}

interface QAItem {
  id: string
  triggers: string[]
  reply: string
  options?: string[]
}

const BOT_NAME = 'PrimeSoul AI Assistant'

// ─── STOP WORDS (Hindi + English common filler words) ────────────────────────
const STOP_WORDS = new Set([
  // English
  'a', 'an', 'the', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
  'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
  'should', 'may', 'might', 'shall', 'can', 'need', 'dare', 'ought',
  'used', 'to', 'of', 'in', 'for', 'on', 'with', 'at', 'by', 'from',
  'as', 'into', 'through', 'during', 'before', 'after', 'above', 'below',
  'between', 'out', 'off', 'over', 'under', 'again', 'further', 'then',
  'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'each',
  'every', 'both', 'few', 'more', 'most', 'other', 'some', 'such', 'no',
  'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very',
  'just', 'because', 'but', 'and', 'or', 'if', 'while', 'what', 'which',
  'who', 'whom', 'this', 'that', 'these', 'those', 'am', 'it', 'its',
  'i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'you', 'your', 'yours',
  'he', 'him', 'his', 'she', 'her', 'hers', 'they', 'them', 'their',
  'tell', 'about', 'give', 'want', 'get', 'got', 'also', 'like',
  // Hindi
  'kya', 'hai', 'hain', 'tha', 'thi', 'the', 'ho', 'hota', 'hoti', 'hote',
  'hoga', 'hogi', 'hoge', 'kar', 'karo', 'kare', 'karein', 'karta', 'karti',
  'karte', 'ka', 'ki', 'ke', 'ko', 'par', 'pe', 'se', 'mein', 'me',
  'hum', 'ham', 'aap', 'tum', 'aur', 'ya', 'agar', 'toh', 'to', 'bhi',
  'nahi', 'na', 'mat', 'abhi', 'yeh', 'ye', 'woh', 'wo', 'iska', 'iski',
  'iske', 'uska', 'uski', 'uske', 'kuch', 'koi', 'sab', 'bahut', 'zyada',
  'kam', 'thoda', 'bohot', 'bilkul', 'bas', 'sirf', 'phir', 'fir',
  'mera', 'meri', 'mere', 'tera', 'teri', 'tere', 'humara', 'humari',
  'humare', 'apka', 'apki', 'apke', 'aapka', 'aapki', 'aapke',
  'mujhe', 'mujhko', 'tumhe', 'tumko', 'unhe', 'unko', 'inhe', 'inko',
  'please', 'plz', 'pls', 'batao', 'bata', 'bataiye', 'batayen',
  'de', 'do', 'dena', 'dijiye', 'dedo', 'sir', 'bhai', 'bro',
  'jee', 'ji', 'haan', 'naa', 'accha', 'achha', 'ok', 'okay',
  'wala', 'wali', 'wale', 'chahiye', 'chahte', 'chaahiye',
  'kaise', 'kaisa', 'kaisi', 'kitna', 'kitni', 'kitne',
  'jaise', 'jaisa', 'jaisi', 'sabse', 'pehle', 'baad',
])

// ─── SYNONYM MAP (maps common alternate spellings to canonical words) ────────
const SYNONYM_MAP: Record<string, string> = {
  'websight': 'website', 'sight': 'site', 'sayt': 'site', 'sait': 'site',
  'webside': 'website', 'vebsite': 'website', 'websit': 'website',
  'prise': 'price', 'prais': 'price', 'praicing': 'pricing',
  'desine': 'design', 'dizain': 'design', 'dezign': 'design',
  'sarvis': 'service', 'servise': 'service',
  'contect': 'contact', 'contakt': 'contact', 'kontak': 'contact',
  'numbar': 'number', 'nambar': 'number',
  'fone': 'phone', 'phon': 'phone',
  'whatsap': 'whatsapp', 'watsapp': 'whatsapp', 'watsap': 'whatsapp', 'wp': 'whatsapp',
  'wattsapp': 'whatsapp', 'whtsapp': 'whatsapp',
  'logo': 'logo', 'bannr': 'banner', 'bannar': 'banner',
  'postar': 'poster', 'postir': 'poster',
  'grafhic': 'graphic', 'grafic': 'graphic',
  'seyo': 'seo', 'eso': 'seo',
  'facebuk': 'facebook', 'fb': 'facebook', 'fasebook': 'facebook',
  'instagarm': 'instagram', 'insta': 'instagram', 'ig': 'instagram',
  'googal': 'google', 'googl': 'google', 'gugl': 'google', 'gugal': 'google',
  'apk': 'app', 'aplication': 'application', 'aplikation': 'application',
  'portfoilo': 'portfolio', 'porfolio': 'portfolio', 'portflio': 'portfolio',
  'revew': 'review', 'reveiw': 'review', 'reviw': 'review',
  'testomonial': 'testimonial', 'testimonel': 'testimonial',
  'maintanance': 'maintenance', 'maintainance': 'maintenance', 'meintenence': 'maintenance',
  'suport': 'support', 'sapport': 'support',
  'domayn': 'domain', 'domein': 'domain',
  'hoisting': 'hosting', 'hostng': 'hosting',
  'imeyl': 'email', 'emal': 'email', 'emel': 'email',
  'lokeshan': 'location', 'locaton': 'location',
  'adres': 'address', 'adress': 'address', 'addres': 'address',
  'pament': 'payment', 'paymet': 'payment', 'paymant': 'payment',
  'refand': 'refund', 'refnd': 'refund',
  'discont': 'discount', 'diskaunt': 'discount',
  'ofer': 'offer', 'ofar': 'offer',
  'internshp': 'internship', 'intrnship': 'internship',
  'joab': 'job', 'jab': 'job', 'naukri': 'job', 'nokri': 'job',
  'traning': 'training', 'trainig': 'training',
  'secuirty': 'security', 'securty': 'security', 'sikurity': 'security',
  'ssl': 'ssl', 'https': 'ssl',
  'spead': 'speed', 'sped': 'speed',
  'responcive': 'responsive', 'responsiv': 'responsive',
  'mobail': 'mobile', 'mobaile': 'mobile',
  'andriod': 'android', 'androd': 'android',
  'dvelopment': 'development', 'developmnt': 'development',
  'markting': 'marketing', 'marketng': 'marketing',
  'campain': 'campaign', 'campayn': 'campaign',
  'branding': 'branding', 'brandng': 'branding',
  'analytisc': 'analytics', 'analtics': 'analytics',
  'ecomerce': 'ecommerce', 'ecommerece': 'ecommerce', 'ecom': 'ecommerce',
  'startap': 'startup', 'strtup': 'startup',
  'bisness': 'business', 'buisness': 'business', 'busness': 'business',
  'copmany': 'company', 'compny': 'company', 'kampani': 'company',
  'coustomer': 'customer', 'custmer': 'customer', 'cusotmer': 'customer',
  'revishan': 'revision', 'revison': 'revision',
  'chanje': 'change', 'changs': 'changes',
  'urgant': 'urgent', 'urjent': 'urgent',
  'grantee': 'guarantee', 'garanti': 'guarantee', 'garanty': 'guarantee',
  'waranti': 'warranty', 'waranty': 'warranty',
  'skolship': 'scholarship', 'frii': 'free', 'fri': 'free',
  'sasta': 'cheap', 'sasti': 'cheap', 'saste': 'cheap', 'mehenga': 'expensive',
  'mehengi': 'expensive', 'mehenge': 'expensive',
}

// ─── MASSIVE Q&A DATABASE (200+ entries) ─────────────────────────────────────
const QA_DATABASE: QAItem[] = [

  // ═══════════════════════════════════════════════════════════════════════════
  // GREETINGS & SMALL TALK
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'greetings',
    triggers: [
      'hi', 'hello', 'hey', 'namaste', 'helo', 'hie', 'hola', 'yo', 'sup',
      'gm', 'good morning', 'good evening', 'good afternoon', 'good night',
      'shubh prabhat', 'shubh sandhya', 'hnji', 'haan ji', 'ji',
      'jai shree ram', 'jai hind', 'pranam', 'namaskar', 'radhe radhe',
      'assalamualaikum', 'sat sri akal', 'vanakkam',
    ],
    reply: 'Namaste! 🙏 Main PrimeSoul AI Assistant hoon. Aapki kaise madad kar sakta hoon?\n\nAap mujhse pooch sakte hain:\n💰 Pricing & packages\n🛠️ Services details\n⏱️ Project timeline\n📁 Portfolio & past work\n📞 Contact information\n\nYa koi bhi sawaal type karein!',
    options: ['💰 Pricing', '🛠️ Services', '⏱️ Timeline', '📁 Portfolio', '📞 Contact'],
  },
  {
    id: 'thanks',
    triggers: [
      'thanks', 'thank you', 'thankyou', 'thank u', 'thnx', 'thx', 'ty',
      'shukriya', 'dhanyawad', 'dhanyavaad', 'bohot shukriya', 'bahut dhanyawad',
      'thanks a lot', 'many thanks', 'appreciate', 'appreciated',
    ],
    reply: 'Aapka bahut-bahut shukriya! 😊 Koi aur sawaal ho toh zaroor poochhen — hum hamesha available hain.\n\nSeedha baat karna chahein toh: wa.me/918770404559',
    options: ['📞 Contact', '🛠️ Services', '💰 Pricing'],
  },
  {
    id: 'bye',
    triggers: [
      'bye', 'goodbye', 'good bye', 'byebye', 'bye bye', 'tata', 'alvida',
      'chalo', 'ok bye', 'tc', 'take care', 'see you', 'see ya',
      'band karo', 'bas', 'theek hai', 'thik hai', 'acha theek hai',
    ],
    reply: 'Shukriya PrimeSoul choose karne ke liye! 🙏 Jab bhi zaroorat ho — hum bus ek message door hain.\n\n📱 WhatsApp: wa.me/918770404559\n🌐 Website: primesoul.tech',
    options: ['📞 Contact'],
  },
  {
    id: 'how_are_you',
    triggers: [
      'how are you', 'kaise ho', 'kya haal hai', 'kya haal', 'kaisa hai',
      'how r u', 'howdy', 'wassup', 'whats up', 'kya chal raha',
      'sab theek', 'aap kaise hain', 'how is it going', 'howz it',
    ],
    reply: 'Main bilkul ready hoon aapki help karne ke liye! 💪 Bataiye kya jaanna chahte hain — website, pricing, services, ya kuch aur?',
    options: ['💰 Pricing', '🛠️ Services', '📞 Contact'],
  },
  {
    id: 'who_are_you_bot',
    triggers: [
      'tum kaun ho', 'tu kaun hai', 'you are bot', 'are you bot', 'are you real',
      'are you human', 'bot ho kya', 'robot ho', 'ai ho', 'real person',
      'insaan ho ya robot', 'human ya ai', 'chatbot', 'automated',
    ],
    reply: 'Main PrimeSoul AI Assistant hoon — ek smart chatbot jo aapke sawalon ka turant jawab deta hai! 🤖\n\nLekin agar aap kisi real person se baat karna chahein toh:\n📱 WhatsApp: 8770404559\n📧 Email: info@primesoul.tech',
    options: ['📞 Contact', '💬 Open WhatsApp'],
  },
  {
    id: 'language',
    triggers: [
      'hindi mein baat karo', 'hindi me bolo', 'english mein', 'english me bolo',
      'hinglish', 'language', 'bhasha', 'konsi language',
    ],
    reply: 'Main Hindi, English, aur Hinglish — teeno mein baat kar sakta hoon! 🗣️ Aap jis bhi language mein comfortable hain, usme poochiye.',
    options: ['🛠️ Services', '💰 Pricing'],
  },
  {
    id: 'joke_fun',
    triggers: [
      'joke', 'mazak', 'funny', 'maza', 'entertain', 'bored', 'bore',
      'kuch mazedaar', 'hasa do', 'laugh',
    ],
    reply: 'Haha! 😄 Main joke toh nahi sunata, lekin aapki website zaroor banwa sakta hoon jo sabko hasaaye... khushi se! 😉\n\nKya kaam karna hai bataiye?',
    options: ['🛠️ Services', '💰 Pricing', '📞 Contact'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PRICING & BUDGET — DETAILED
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'pricing_general',
    triggers: [
      'price kya hai', 'pricing', 'kitna paisa lagega', 'cost kya hai', 'fees',
      'charges', 'rate', 'budget', 'price', 'cost', 'paisa', 'kitne paise',
      'paise', 'ratecard', 'rate card', 'package', 'packages', 'kitna lagega',
      'kitne me banega', 'price list', 'price batao', 'cost batao',
      'kitna kharcha', 'kharcha', 'expenditure', 'investment',
      'how much', 'what is the cost', 'rates', 'plan', 'plans',
      'show me pricing', 'pricing details', 'price range',
    ],
    reply: '💰 Hamare packages:\n\n🌐 Website Design: ₹5,000 - ₹25,000\n⚡ Full-Stack Web App: ₹25,000 - ₹1,00,000+\n📱 Meta Ads Setup: ₹3,000 - ₹10,000/month\n📲 Social Media Mgmt: ₹5,000 - ₹15,000/month\n🎨 Graphic Design: ₹500/design se\n🔍 SEO Package: ₹3,000/month se\n📍 Google Business: ₹1,500 - ₹3,000 (one-time)\n🔧 Maintenance: ₹299 - ₹999/month\n\nExact quote ke liye project details share karein!',
    options: ['🛠️ Services', '📞 Contact', '📁 Portfolio'],
  },
  {
    id: 'website_pricing',
    triggers: [
      'website ka price', 'website kitne ki', 'website cost', 'website charges',
      'website rate', 'website package', 'web design price', 'web development cost',
      'site banana kitne ka', 'website banwana kitne ka', 'website ka rate',
      'website ki cost', 'website banane ka kharcha', 'website price list',
    ],
    reply: '🌐 Website Packages:\n\n💼 Basic (5 pages): ₹5,000 - ₹8,000\n🚀 Professional (10 pages + CMS): ₹8,000 - ₹15,000\n👑 Premium (Custom + E-commerce): ₹15,000 - ₹25,000\n⚡ Full-Stack App: ₹25,000 - ₹1,00,000+\n\nSab mein include hai:\n✅ Responsive design\n✅ SEO optimization\n✅ Free hosting setup\n✅ 30 days free support\n\nCustom quote chahiye? Contact karein!',
    options: ['📞 Contact', '⏱️ Timeline', '📁 Portfolio'],
  },
  {
    id: 'cheap_expensive',
    triggers: [
      'sasta', 'cheap', 'affordable', 'low cost', 'kam budget', 'budget friendly',
      'mehenga', 'expensive', 'costly', 'overpriced', 'zyada price',
      'sasta wala', 'sabse sasta', 'cheapest', 'lowest price', 'minimum price',
      'free mein', 'free me karo', 'muft', 'no budget', 'paisa nahi hai',
      'kam paisa', 'thoda budget', 'tight budget',
    ],
    reply: 'Hum har budget ke liye solutions dete hain! 💡\n\n• Students/Startups ke liye: ₹5,000 se basic website\n• Small business: ₹8,000-15,000 professional site\n• Growing business: ₹15,000+ premium solutions\n\nHum quality mein compromise nahi karte, lekin aapke budget mein best value dete hain. Baat karte hain? 🤝',
    options: ['💰 Pricing', '📞 Contact'],
  },
  {
    id: 'payment_mode',
    triggers: [
      'payment kaise kare', 'payment mode', 'upi', 'advance', 'payment',
      'pay kaise', 'bank transfer', 'cash', 'gpay', 'google pay',
      'phonepe', 'paytm', 'neft', 'rtgs', 'imps', 'online payment',
      'payment method', 'payment option', 'how to pay', 'paise kaise de',
      'advance dena hoga', 'advance kitna', 'token money',
    ],
    reply: '💳 Payment Options:\n\n✅ UPI (GPay, PhonePe, Paytm)\n✅ Bank Transfer (NEFT/RTGS/IMPS)\n✅ Cash payment\n\n📋 Payment Structure:\n• 50% advance project start par\n• 50% delivery/completion par\n\nBade projects mein milestone-based payment bhi possible hai!',
    options: ['💰 Pricing', '📞 Contact'],
  },
  {
    id: 'emi_installment',
    triggers: [
      'emi', 'installment', 'kist', 'kisht', 'part payment', 'installment option',
      'monthly payment', 'emi available', 'kist par', 'thoda thoda dena',
      'payment plan', 'flexible payment', 'ek saath nahi de sakte',
    ],
    reply: 'Haan! Bade projects (₹25,000+) par hum flexible payment plan offer karte hain: 💳\n\n• 2-3 installments mein payment\n• Milestone-based payment option\n• Custom payment schedule\n\nDetails ke liye WhatsApp karein: 8770404559',
    options: ['📞 Contact', '💰 Pricing'],
  },
  {
    id: 'discount_offer',
    triggers: [
      'discount', 'offer', 'coupon', 'deal', 'sale', 'promotion',
      'koi offer hai', 'discount milega', 'thoda kam karo', 'price kam karo',
      'negotiate', 'bargain', 'concession', 'special price', 'student discount',
      'bulk discount', 'combo offer', 'referral discount',
    ],
    reply: '🎉 Current Offers:\n\n🔥 First project par 10% discount!\n👥 Referral bonus — friend ko lao, dono ko benefit\n📦 Combo deal — Website + Social Media = 15% off\n🎓 Students/Startups ke liye special rates\n📱 Bulk design orders par discount\n\nOffer claim karne ke liye contact karein!',
    options: ['📞 Contact', '💰 Pricing'],
  },
  {
    id: 'refund_policy',
    triggers: [
      'refund', 'money back', 'cancel', 'cancellation', 'paisa wapas',
      'refund policy', 'kya refund milega', 'agar cancel karna ho',
      'project cancel', 'satisfaction guarantee', 'not satisfied',
    ],
    reply: '📋 Refund Policy:\n\n• Project start hone se pehle — full refund\n• Design phase mein cancel — partial refund (work done minus)\n• Development ke baad — no refund (lekin changes free)\n\nHum 100% client satisfaction ensure karte hain. Agar koi issue ho toh pehle baat karte hain! 🤝',
    options: ['📞 Contact', '💬 Open WhatsApp'],
  },
  {
    id: 'invoice_receipt',
    triggers: [
      'invoice', 'receipt', 'bill', 'gst', 'tax', 'gst bill',
      'invoice milega', 'bill chahiye', 'tax invoice', 'payment receipt',
    ],
    reply: 'Haan! Hum proper invoice/receipt provide karte hain har payment ke liye. GST billing bhi available hai for business clients. 🧾',
    options: ['📞 Contact', '💰 Pricing'],
  },
  {
    id: 'compare_others',
    triggers: [
      'comparison', 'compare', 'vs', 'versus', 'aur companies', 'competitors',
      'dusre se kya farak', 'kyu choose kare', 'why primesoul', 'why choose',
      'better than others', 'dusre saste hain', 'fiverr', 'upwork', 'freelancer',
      'wix', 'wordpress', 'godaddy', 'squarespace',
    ],
    reply: '🏆 PrimeSoul ko kyun choose karein?\n\n✅ Personal attention — dedicated team, not outsourced\n✅ Hindustani support — Hindi + English dono mein\n✅ Affordable prices — international quality, local rates\n✅ 30 days free support — delivery ke baad bhi\n✅ Fast delivery — 3-7 din mein basic website\n✅ Real portfolio — 35+ live projects\n\nWix/GoDaddy = DIY templates\nPrimeSoul = Custom, professional, personal! 💎',
    options: ['📁 Portfolio', '💰 Pricing', '📞 Contact'],
  },
  {
    id: 'quote_estimate',
    triggers: [
      'quote', 'estimate', 'quotation', 'proposal', 'get a quote',
      'quote chahiye', 'estimate do', 'proposal bhejo', 'quotation send karo',
      'custom quote', 'project estimate', 'cost estimate',
    ],
    reply: 'Bilkul! Free quotation ke liye bas ye bataiye:\n\n1️⃣ Kaunsi service chahiye?\n2️⃣ Project ka brief/idea\n3️⃣ Aapka budget range\n4️⃣ Deadline (agar hai)\n\nYe details WhatsApp par bhejein: 8770404559\nYa contact form fill karein: primesoul.tech/contact\n\nHum 2-4 ghante mein detailed proposal bhej denge! 📋',
    options: ['📞 Contact', '💬 Open WhatsApp', 'Go to Contact Page'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SERVICES — COMPREHENSIVE
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'services_all',
    triggers: [
      'kya kya karte ho', 'services kya hai', 'kya offer karte ho', 'what services',
      'services', 'service', 'kya kaam karte ho', 'all services', 'service list',
      'kya kya bana sakte ho', 'what do you do', 'what you offer', 'offerings',
      'service details', 'full service list', 'sab services batao',
    ],
    reply: '🛠️ Hamari Services:\n\n🌐 Website Design & Development\n⚡ Full-Stack Web Applications\n📱 Meta Ads (Facebook/Instagram)\n📍 Google Business Profile\n📲 Social Media Management\n🎨 Graphic Design & Branding\n🔍 SEO & Performance\n🎯 UI/UX Design\n✉️ Email Marketing\n📊 Data Analytics\n🔧 Maintenance & Support\n🆔 Brand Identity\n📝 Content Strategy\n\nKaunsi service mein interest hai?',
    options: ['💰 Pricing', '⏱️ Timeline', '📁 Portfolio', '📞 Contact'],
  },
  {
    id: 'website_design',
    triggers: [
      'website banate ho', 'website design', 'web development', 'website', 'web design',
      'site banwana', 'site design', 'website chahiye', 'website banana',
      'mujhe website chahiye', 'i need website', 'i want website',
      'website banwani hai', 'new website', 'web page', 'webpage',
      'website develop', 'build website', 'create website', 'make website',
    ],
    reply: 'Haan! 🌐 Hum professional websites banate hain:\n\n• 🏢 Business websites\n• 🏫 School/College websites\n• 💼 Portfolio websites\n• 🛒 E-commerce / Online stores\n• 📰 News portals & blogs\n• ⚡ Custom web applications\n• 📄 Landing pages\n\n✅ Mobile responsive\n✅ Fast loading\n✅ SEO optimized\n✅ Modern design\n\nStarting ₹5,000 se. Baat karein?',
    options: ['💰 Pricing', '📁 Portfolio', '📞 Contact', '⏱️ Timeline'],
  },
  {
    id: 'ecommerce',
    triggers: [
      'ecommerce', 'e-commerce', 'online store', 'online shop', 'online dukaan',
      'products sell', 'online selling', 'shopping website', 'cart website',
      'payment gateway', 'product listing', 'online business',
      'apna store banana', 'online bechna', 'ecom website',
    ],
    reply: '🛒 E-Commerce Solutions:\n\n✅ Product catalog & management\n✅ Shopping cart & checkout\n✅ Payment gateway (Razorpay/Stripe)\n✅ Order tracking\n✅ Inventory management\n✅ Customer accounts\n✅ Mobile responsive\n✅ Admin dashboard\n\nStarting ₹15,000 se. Kitne products hain aapke?',
    options: ['💰 Pricing', '📞 Contact', '⏱️ Timeline'],
  },
  {
    id: 'landing_page',
    triggers: [
      'landing page', 'single page', 'one page', 'sales page',
      'lead page', 'squeeze page', 'conversion page', 'funnel page',
      'ek page ka website', 'simple page',
    ],
    reply: '📄 Landing Pages:\n\nHigh-converting, fast-loading landing pages banate hain:\n✅ Eye-catching design\n✅ Clear CTA buttons\n✅ Lead capture forms\n✅ Mobile optimized\n✅ Fast loading (< 3 sec)\n✅ Analytics integration\n\nStarting ₹3,000 se. 3-5 din mein ready!',
    options: ['💰 Pricing', '📞 Contact'],
  },
  {
    id: 'school_website',
    triggers: [
      'school website', 'college website', 'education website', 'institute website',
      'school ka site', 'vidyalaya website', 'coaching website', 'academy website',
      'university website', 'school portal',
    ],
    reply: '🏫 School/Education Websites:\n\n✅ Admission forms & online enrollment\n✅ Faculty & staff directory\n✅ Photo gallery & events\n✅ Notice board & announcements\n✅ Result portal\n✅ Fee payment integration\n✅ Parent-Teacher communication\n\nHumne SVNS School Khilchipur ka website banaya hai! Starting ₹8,000 se.',
    options: ['📁 Portfolio', '💰 Pricing', '📞 Contact'],
  },
  {
    id: 'business_website',
    triggers: [
      'business website', 'company website', 'corporate website', 'professional website',
      'business site', 'company site', 'apni company ka website', 'firm ka website',
    ],
    reply: '🏢 Business Website Features:\n\n✅ Professional design\n✅ About us & team page\n✅ Services/Products showcase\n✅ Contact form & Google Map\n✅ Client testimonials\n✅ Blog section\n✅ WhatsApp integration\n✅ SEO optimized\n\nStarting ₹5,000. 1-2 weeks mein ready!',
    options: ['💰 Pricing', '📁 Portfolio', '📞 Contact'],
  },
  {
    id: 'portfolio_website',
    triggers: [
      'portfolio site', 'personal website', 'resume website', 'cv website',
      'freelancer website', 'artist website', 'photographer website',
      'personal portfolio', 'apna portfolio banana',
    ],
    reply: '💼 Portfolio Websites:\n\n✅ Stunning visual design\n✅ Project showcase gallery\n✅ About me section\n✅ Skills & experience\n✅ Blog integration\n✅ Contact form\n✅ Social media links\n\nStarting ₹5,000. Perfect for freelancers, artists, developers!',
    options: ['💰 Pricing', '📁 Portfolio', '📞 Contact'],
  },
  {
    id: 'news_blog',
    triggers: [
      'news portal', 'news website', 'blog website', 'magazine website',
      'samachar website', 'e-newspaper', 'epaper', 'digital newspaper',
      'blog banana', 'blogging website', 'content website',
    ],
    reply: '📰 News Portal / Blog:\n\n✅ Category-wise articles\n✅ Admin panel for easy publishing\n✅ Image & video support\n✅ Comment system\n✅ Share buttons\n✅ SEO optimized\n✅ Fast loading\n✅ Google News ready\n\nHumne MP Darpan E-News Portal banaya hai! Starting ₹10,000.',
    options: ['📁 Portfolio', '💰 Pricing', '📞 Contact'],
  },
  {
    id: 'meta_ads',
    triggers: [
      'meta ads', 'facebook ads', 'instagram ads', 'digital marketing', 'ads chalana',
      'ads', 'ad campaign', 'fb ads', 'insta ads', 'marketing', 'online marketing',
      'paid ads', 'sponsored', 'promotion', 'boost', 'boost post',
      'facebook marketing', 'instagram marketing', 'social media ads',
      'lead generation ads', 'leads chahiye', 'customers chahiye',
      'online promotion', 'digital promotion', 'ad run',
    ],
    reply: '📱 Meta Ads Management:\n\n✅ Facebook & Instagram Ads\n✅ Target audience research\n✅ Ad creative design\n✅ Campaign setup & optimization\n✅ A/B testing\n✅ Weekly performance reports\n✅ Budget optimization\n\n🎯 Campaign types:\n• Lead Generation\n• Brand Awareness\n• Product Sales\n• Website Traffic\n• App Installs\n\nStarting ₹3,000/month. ROI guaranteed approach! 📊',
    options: ['💰 Pricing', '📞 Contact'],
  },
  {
    id: 'google_ads',
    triggers: [
      'google ads', 'google advertising', 'ppc', 'pay per click',
      'search ads', 'google par ad', 'sem', 'search engine marketing',
      'google ad campaign',
    ],
    reply: '🔍 Google Ads:\n\nAbhi hum primarily Meta Ads (Facebook/Instagram) par focus karte hain. Google Ads ke liye hum select cases mein help kar sakte hain.\n\nAlternatively, SEO se organic Google ranking improve kar sakte hain — free mein traffic aata hai! 🚀',
    options: ['🔍 SEO', '📞 Contact', '🛠️ Services'],
  },
  {
    id: 'google_business',
    triggers: [
      'google business', 'gbp', 'google map', 'google pe dikhna', 'google maps',
      'gmb', 'local business listing', 'map listing', 'google listing',
      'google par business', 'maps par dikhna', 'local seo',
      'google my business', 'business profile', 'google search mein aana',
    ],
    reply: '📍 Google Business Profile:\n\n✅ Profile create & verify\n✅ Complete optimization\n✅ Photos & posts\n✅ Review management\n✅ Local SEO setup\n✅ Google Maps ranking\n✅ Insights & analytics\n\nAapka business Google Maps aur local search mein top par aayega! One-time ₹1,500-3,000.',
    options: ['💰 Pricing', '📞 Contact'],
  },
  {
    id: 'social_media',
    triggers: [
      'social media', 'instagram manage', 'facebook page', 'content posting',
      'smm', 'social media management', 'page manage', 'reels', 'insta page',
      'social media handle', 'post banana', 'content create', 'social strategy',
      'engagement badhana', 'followers badhana', 'social presence',
      'facebook manage', 'instagram growth', 'social media marketing',
    ],
    reply: '📲 Social Media Management:\n\n✅ Content calendar planning\n✅ 15-30 posts/month\n✅ Festival & event creatives\n✅ Reels & story ideas\n✅ Hashtag strategy\n✅ Engagement management\n✅ Monthly analytics report\n✅ Competitor analysis\n\nPlatforms: Facebook, Instagram, LinkedIn\nStarting ₹5,000/month.',
    options: ['💰 Pricing', '📞 Contact', '📁 Portfolio'],
  },
  {
    id: 'graphic_design',
    triggers: [
      'graphic design', 'logo', 'banner', 'poster', 'creative', 'graphics',
      'designing', 'brochure', 'visiting card', 'flyer', 'pamphlet',
      'letterhead', 'brand kit', 'social media post', 'thumbnail',
      'youtube thumbnail', 'cover photo', 'invitation', 'card design',
      'menu design', 'catalog', 'catalogue', 'standee', 'flex',
      'hoarding', 'billboard', 'design chahiye', 'creative chahiye',
    ],
    reply: '🎨 Graphic Design Services:\n\n✅ Logo Design\n✅ Business Cards / Visiting Cards\n✅ Social Media Posts & Stories\n✅ Banners, Posters, Flyers\n✅ Brochures & Catalogs\n✅ YouTube Thumbnails\n✅ Letterheads & Envelopes\n✅ Menu Cards\n✅ Invitations\n✅ Standees & Flex\n\nPer design ₹500 se. Bulk orders par discount! 🎉',
    options: ['💰 Pricing', '📞 Contact', '📁 Portfolio'],
  },
  {
    id: 'logo_design',
    triggers: [
      'logo banwana', 'logo design', 'logo chahiye', 'brand logo',
      'company ka logo', 'business logo', 'logo price', 'logo cost',
      'professional logo', 'custom logo',
    ],
    reply: '🆔 Logo Design:\n\n✅ 3 unique concepts\n✅ Unlimited revisions (until satisfied)\n✅ All file formats (PNG, SVG, PDF, AI)\n✅ Brand color palette\n✅ Business card mockup free\n✅ Social media kit included\n\nStarting ₹2,000. Delivery 2-4 din mein! 🎨',
    options: ['💰 Pricing', '📞 Contact'],
  },
  {
    id: 'seo',
    triggers: [
      'seo', 'google ranking', 'search engine', 'website rank', 'google rank',
      'seo package', 'rank website', 'search ranking', 'organic traffic',
      'keyword ranking', 'backlinks', 'on page seo', 'off page seo',
      'google mein rank', 'website optimize', 'page speed', 'site speed',
      'search engine optimization', 'seo kaise kare',
    ],
    reply: '🔍 SEO Services:\n\n✅ On-Page SEO (meta tags, content, structure)\n✅ Off-Page SEO (backlinks, citations)\n✅ Local SEO (Google Maps ranking)\n✅ Technical SEO (speed, mobile, schema)\n✅ Keyword research\n✅ Competitor analysis\n✅ Monthly progress reports\n✅ Content optimization\n\nPackage ₹3,000/month se. Results 2-3 months mein dikhne lagte hain! 📈',
    options: ['💰 Pricing', '📞 Contact'],
  },
  {
    id: 'mobile_app',
    triggers: [
      'app banana', 'mobile app', 'android app', 'ios app', 'apk',
      'play store app', 'app development', 'app chahiye', 'mobile application',
      'app store', 'flutter app', 'react native', 'native app',
    ],
    reply: '📱 App Development:\n\nHum Progressive Web Apps (PWA) banate hain jo:\n✅ Mobile par perfectly kaam karti hain\n✅ Home screen par add ho sakti hain\n✅ Offline bhi kaam karti hain\n✅ App jaisi feel deti hain\n\n⚠️ Native Android/iOS app abhi available nahi hai.\n\nPWA se 90% app ki zaroorat poori hoti hai — aur cost bhi kam! Baat karein?',
    options: ['🛠️ Services', '📞 Contact', '💰 Pricing'],
  },
  {
    id: 'web_application',
    triggers: [
      'web application', 'web app', 'full stack', 'fullstack', 'dashboard',
      'admin panel', 'crm', 'erp', 'management system', 'booking system',
      'inventory system', 'custom software', 'saas', 'portal',
      'login system', 'user management', 'database', 'backend',
    ],
    reply: '⚡ Full-Stack Web Applications:\n\n✅ Custom dashboards & admin panels\n✅ Booking & reservation systems\n✅ Inventory management\n✅ CRM solutions\n✅ User authentication & roles\n✅ Database design\n✅ API development\n✅ Real-time features\n✅ Payment integration\n\nTech Stack: Next.js, React, Node.js, Firebase, MongoDB\nStarting ₹25,000. Timeline 3-6 weeks.',
    options: ['💰 Pricing', '📞 Contact', '⏱️ Timeline'],
  },
  {
    id: 'ui_ux',
    triggers: [
      'ui design', 'ux design', 'ui ux', 'uiux', 'user interface',
      'user experience', 'figma', 'prototype', 'wireframe', 'mockup',
      'design system', 'app design', 'interface design',
    ],
    reply: '🎯 UI/UX Design:\n\n✅ User research & persona creation\n✅ Wireframes & mockups\n✅ Interactive prototypes (Figma)\n✅ Design system creation\n✅ Mobile-first approach\n✅ Usability testing\n✅ Modern, clean aesthetics\n\nStarting ₹5,000. Pehle design approve, phir development!',
    options: ['💰 Pricing', '📞 Contact', '📁 Portfolio'],
  },
  {
    id: 'email_marketing',
    triggers: [
      'email marketing', 'newsletter', 'email campaign', 'bulk email',
      'email automation', 'drip campaign', 'email blast', 'mailchimp',
      'email template',
    ],
    reply: '✉️ Email Marketing:\n\n✅ Email template design\n✅ Campaign strategy\n✅ Subscriber list management\n✅ Automation setup\n✅ A/B testing\n✅ Performance analytics\n\nStarting ₹3,000/month. Great for customer retention & re-engagement! 📧',
    options: ['💰 Pricing', '📞 Contact'],
  },
  {
    id: 'content_writing',
    triggers: [
      'content writing', 'copywriting', 'blog writing', 'article writing',
      'content', 'website content', 'product description', 'copy',
      'content creator', 'content chahiye', 'likhna', 'content strategy',
    ],
    reply: '📝 Content Services:\n\n✅ Website content writing\n✅ Blog articles\n✅ Product descriptions\n✅ Social media captions\n✅ Ad copy\n✅ SEO content\n\nHindi + English dono mein content available hai! Starting ₹500/article.',
    options: ['💰 Pricing', '📞 Contact'],
  },
  {
    id: 'brand_identity',
    triggers: [
      'branding', 'brand identity', 'brand building', 'brand strategy',
      'brand guideline', 'brand kit', 'corporate identity', 'brand package',
      'complete branding', 'brand banwana', 'rebranding',
    ],
    reply: '🆔 Brand Identity Package:\n\n✅ Logo design (3 concepts)\n✅ Color palette & typography\n✅ Business card design\n✅ Letterhead & envelope\n✅ Social media brand kit\n✅ Brand guidelines document\n✅ Email signature\n\nComplete brand identity starting ₹8,000. Aapka brand professional dikhega! 💎',
    options: ['💰 Pricing', '📞 Contact', '📁 Portfolio'],
  },
  {
    id: 'video_animation',
    triggers: [
      'video', 'animation', 'motion graphics', 'video editing',
      'intro video', 'explainer video', 'product video', 'reel edit',
      'video banana', 'animated video',
    ],
    reply: '🎬 Video & Animation:\n\nAbhi hum basic video editing aur social media reels/stories create karte hain. Full animation studio service coming soon!\n\nAvailable services:\n✅ Social media reels\n✅ Product showcase videos\n✅ Basic video editing\n✅ Logo animation\n\nAdvanced needs ke liye baat karein!',
    options: ['📞 Contact', '🛠️ Services'],
  },
  {
    id: 'photography',
    triggers: [
      'photography', 'photoshoot', 'product photography', 'photo',
      'photo shoot', 'photographer', 'studio', 'photo editing',
    ],
    reply: '📸 Photography:\n\nHum directly photography service nahi dete, lekin:\n✅ Photo editing & retouching karte hain\n✅ Product image optimization for websites\n✅ Social media image creation\n\nPhotography ke liye hum trusted photographers recommend kar sakte hain!',
    options: ['🛠️ Services', '📞 Contact'],
  },
  {
    id: 'wordpress',
    triggers: [
      'wordpress', 'word press', 'wp theme', 'wordpress theme', 'cms',
      'wordpress plugin', 'elementor', 'divi', 'wordpress developer',
      'wordpress website', 'wp developer',
    ],
    reply: '🔧 WordPress Development:\n\nHum primarily custom-coded websites (Next.js/React) banate hain, lekin WordPress bhi available hai:\n\n✅ Custom WordPress themes\n✅ Plugin development\n✅ WooCommerce setup\n✅ WordPress migration\n✅ Speed optimization\n\nCustom-coded sites WordPress se faster aur secure hote hain! Kaunsa option prefer karenge?',
    options: ['📞 Contact', '💰 Pricing'],
  },
  {
    id: 'redesign',
    triggers: [
      'redesign', 'revamp', 'makeover', 'website update', 'modernize',
      'purana website', 'old website', 'website change', 'website upgrade',
      'website improve', 'naya design chahiye', 'site purani lag rahi',
      'website outdated',
    ],
    reply: '🔄 Website Redesign:\n\n✅ Modern, fresh design\n✅ Better user experience\n✅ Mobile responsiveness\n✅ Speed optimization\n✅ SEO improvement\n✅ Content migration\n✅ New features add\n\nPurani website ko naya look denge! Starting ₹5,000. Pehle existing site ka link bhejein.',
    options: ['📞 Contact', '💰 Pricing', '📁 Portfolio'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // TECHNOLOGY & TECHNICAL QUESTIONS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'tech_stack',
    triggers: [
      'technology', 'tech stack', 'kis language mein', 'coding language',
      'framework', 'react', 'nextjs', 'next js', 'nodejs', 'node js',
      'javascript', 'typescript', 'programming', 'coding', 'development tool',
      'konsi technology', 'tailwind', 'bootstrap', 'html css',
    ],
    reply: '💻 Hamara Tech Stack:\n\n🔵 Frontend: React, Next.js 14, TypeScript\n🎨 Styling: Tailwind CSS, Framer Motion\n🟢 Backend: Node.js, Express\n🗄️ Database: Firebase, MongoDB, PostgreSQL\n☁️ Hosting: Vercel, AWS, Firebase Hosting\n🔧 Tools: Git, Figma, VS Code\n\nModern, fast, scalable, aur secure! 🚀',
    options: ['🛠️ Services', '📞 Contact'],
  },
  {
    id: 'responsive_mobile',
    triggers: [
      'responsive', 'mobile friendly', 'mobile responsive', 'phone pe chalega',
      'tablet pe chalega', 'all devices', 'screen size', 'mobile version',
      'mobile mein chalega', 'phone mein dikhega',
    ],
    reply: '📱 100% Responsive!\n\nHamari har website:\n✅ Mobile pe perfectly chalti hai\n✅ Tablet pe bhi fit baithti hai\n✅ Desktop pe stunning dikhti hai\n✅ All browsers support (Chrome, Safari, Firefox)\n\nMobile-first approach — pehle mobile design, phir desktop! 🎯',
    options: ['🛠️ Services', '📞 Contact'],
  },
  {
    id: 'security_ssl',
    triggers: [
      'security', 'ssl', 'https', 'secure', 'hack', 'hacking',
      'data safe', 'privacy', 'ssl certificate', 'website safe',
      'safe hai', 'suraksha', 'cyber security',
    ],
    reply: '🔒 Website Security:\n\n✅ Free SSL Certificate (HTTPS)\n✅ Secure authentication\n✅ Data encryption\n✅ Regular security updates\n✅ DDoS protection\n✅ Secure hosting\n✅ Backup systems\n\nAapki aur aapke customers ki data safety hamari priority hai! 🛡️',
    options: ['🛠️ Services', '📞 Contact'],
  },
  {
    id: 'speed_performance',
    triggers: [
      'speed', 'fast', 'performance', 'loading time', 'slow',
      'page speed', 'website speed', 'optimization', 'optimize',
      'tez', 'dhire load', 'jaldi open', 'core web vitals',
    ],
    reply: '⚡ Speed & Performance:\n\nHamari websites:\n✅ < 3 second loading time\n✅ Core Web Vitals optimized\n✅ Image optimization\n✅ Code minification\n✅ CDN integration\n✅ Lazy loading\n✅ Caching strategies\n\nGoogle PageSpeed score 90+ guarantee! 🚀',
    options: ['🛠️ Services', '📞 Contact'],
  },
  {
    id: 'analytics_tracking',
    triggers: [
      'analytics', 'tracking', 'google analytics', 'visitor count',
      'traffic', 'data', 'insights', 'reporting', 'visitors kitne',
      'website ki report', 'performance track',
    ],
    reply: '📊 Analytics & Tracking:\n\n✅ Google Analytics 4 setup\n✅ Meta Pixel integration\n✅ Conversion tracking\n✅ User behavior analysis\n✅ Monthly reports\n✅ Heatmap analysis\n✅ Goal tracking\n\nAapko pata chalega kitne log visit karte hain, kahan se aate hain, kya karte hain!',
    options: ['🛠️ Services', '📞 Contact'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // TIMELINE & DELIVERY
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'timeline_general',
    triggers: [
      'kitne din lagenge', 'time kitna lagega', 'kab ready hoga', 'deadline',
      'timeline', 'duration', 'kitna time', 'delivery time', 'kitne din',
      'kab milega', 'kab tak banega', 'how long', 'time frame', 'turnaround',
      'delivery date', 'completion time', 'project duration', 'jaldi chahiye',
      'kab tak ho jayega', 'kitne hafte', 'kitne week',
    ],
    reply: '⏱️ Project Timelines:\n\n📄 Landing Page: 2-4 din\n🌐 Basic Website (5 pages): 3-7 din\n🏢 Business Website: 1-2 hafta\n🛒 E-commerce Site: 2-3 hafta\n⚡ Full-Stack Web App: 3-6 hafta\n🎨 Logo Design: 2-4 din\n🖼️ Graphic Design: 1-3 din\n📱 Social Media Setup: 2-3 din\n\n🚀 Rush delivery bhi available hai (extra charges)!\n\nProject size aur complexity par depend karta hai.',
    options: ['💰 Pricing', '📞 Contact'],
  },
  {
    id: 'rush_urgent',
    triggers: [
      'urgent', 'jaldi', 'rush', 'asap', 'emergency', 'kal chahiye',
      'aaj chahiye', 'jaldi karo', 'quick', 'fast delivery', 'express',
      'rush order', 'urgent project', 'tight deadline', 'tomorrow',
      'jaldi banana', 'bahut jaldi',
    ],
    reply: '🚨 Rush/Urgent Delivery:\n\nHaan! Rush delivery available hai:\n\n⚡ Landing page: 24-48 hours\n⚡ Basic website: 3-5 din\n⚡ Graphic designs: Same day possible\n\n📌 Rush delivery mein 20-30% extra charges lagte hain.\n\nUrgent hai? Abhi WhatsApp karein: 8770404559',
    options: ['💬 Open WhatsApp', '📞 Contact'],
  },
  {
    id: 'delay_late',
    triggers: [
      'late ho gaya', 'delay', 'time zyada lag raha', 'deadline miss',
      'kab tak hoga', 'bahut time ho gaya', 'jaldi karo na', 'kab doge',
    ],
    reply: 'Hum timeline ko seriously lete hain! ⏰\n\n✅ Har project ka clear deadline hota hai\n✅ Regular updates milte hain\n✅ Agar koi delay ho, pehle se inform karte hain\n\nAgar aapka koi ongoing project hai aur delay ho raha hai, toh seedha call karein: 8770404559. Hum solve karenge! 🤝',
    options: ['📞 Contact', '💬 Open WhatsApp'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PROCESS & HOW WE WORK
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'process',
    triggers: [
      'kaise kaam karte ho', 'process kya hai', 'kaise shuru kare', 'steps',
      'workflow', 'procedure', 'how it works', 'how to start',
      'project kaise start hota', 'working process', 'methodology',
      'kaise banate ho', 'development process',
    ],
    reply: '📋 Hamara Process:\n\n1️⃣ Free Consultation — Requirements samjhna\n2️⃣ Proposal & Quote — Budget aur timeline fix\n3️⃣ Design Phase — Mockup/wireframe approval\n4️⃣ Development — Coding & building\n5️⃣ Review & Feedback — Aapke changes\n6️⃣ Testing — Har device par check\n7️⃣ Launch! — Website live 🚀\n8️⃣ Support — 30 days free support\n\nSimple, transparent, aur client-first approach! 🎯',
    options: ['⏱️ Timeline', '📞 Contact', '💰 Pricing'],
  },
  {
    id: 'free_consultation',
    triggers: [
      'free consultation', 'call karna', 'baat karni hai', 'meeting',
      'consultation', 'strategy call', 'book call', 'schedule call',
      'discuss project', 'meeting schedule', 'video call',
      'zoom call', 'google meet', 'free call',
    ],
    reply: '📞 Free Consultation:\n\n✅ 30-minute free strategy call\n✅ Project discussion\n✅ Best approach recommendation\n✅ Budget estimation\n✅ No obligation!\n\n📅 Book karein: calendly.com/paramsisodiya061/30min\n📱 Ya seedha WhatsApp: 8770404559\n\nHum Zoom/Google Meet par bhi call le sakte hain!',
    options: ['📞 Contact', '💬 Open WhatsApp'],
  },
  {
    id: 'revisions_changes',
    triggers: [
      'revision', 'changes', 'modification', 'edit', 'update karna',
      'badalna hai', 'change karna', 'design change', 'pasand nahi aaya',
      'kuch aur chahiye', 'modify', 'alter', 'thoda change',
      'revision kitne', 'changes free hai', 'unlimited revision',
    ],
    reply: '✏️ Revisions & Changes:\n\n✅ Design phase mein — unlimited revisions\n✅ Development mein — 3 rounds of changes free\n✅ Delivery ke baad — 30 days tak minor changes free\n✅ Major feature additions — quoted separately\n\nHum tab tak kaam karte hain jab tak aap 100% satisfied na ho! 😊',
    options: ['📞 Contact', '🛠️ Services'],
  },
  {
    id: 'requirements',
    triggers: [
      'kya chahiye mujhe', 'kya dena hoga', 'kya provide karna hoga',
      'content kaun dega', 'images kaun dega', 'material chahiye',
      'what do i need', 'requirements', 'mujhe kya ready karna hoga',
    ],
    reply: '📋 Aapko ye provide karna hoga:\n\n✅ Business name & details\n✅ Logo (agar hai, nahi toh hum bana denge)\n✅ Content/text (hum bhi likh sakte hain)\n✅ Photos (stock photos bhi use kar sakte hain)\n✅ Color preference (optional)\n✅ Reference websites (optional)\n\nBaaki sab hum handle karenge! Don\'t worry 😊',
    options: ['📞 Contact', '🛠️ Services'],
  },
  {
    id: 'ownership_source',
    triggers: [
      'ownership', 'source code', 'code milega', 'transfer',
      'mera hoga', 'rights', 'intellectual property', 'ip rights',
      'website meri hogi', 'code access', 'github access',
    ],
    reply: '✅ 100% Ownership Aapka!\n\n• Website ka full source code aapko milega\n• Domain aapke naam par hoga\n• Hosting access aapka hoga\n• Design files (Figma/PSD) bhi milenge\n• No lock-in — kabhi bhi kisi aur se kaam karwa sakte hain\n\nHum transparent hain — sab kuch aapka! 🤝',
    options: ['📞 Contact', '🛠️ Services'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PORTFOLIO, TRUST & CREDIBILITY
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'portfolio',
    triggers: [
      'portfolio', 'kaam dekha hai', 'previous work', 'example', 'past projects',
      'sample', 'demo', 'work show', 'projects dikhao', 'kaam dikhao',
      'case study', 'client work', 'live projects', 'website dikhao',
      'kya banaya hai', 'kya kya banaya', 'show work',
    ],
    reply: '📁 Hamara Portfolio:\n\n🏫 SVNS School Khilchipur — School website\n☀️ A&S Solar Solutions — Solar company site\n📰 MP Darpan — E-News Portal\n🎓 Sankalp Shikhar Academy — Education platform\n🔧 Multiple local business websites\n📱 Social media campaigns\n\n🌐 Full portfolio: primesoul.tech/portfolio\n\n35+ projects delivered! Har ek mein quality guaranteed! 💎',
    options: ['🌐 Open Portfolio Page', '💰 Pricing', '📞 Contact'],
  },
  {
    id: 'client_reviews',
    triggers: [
      'client', 'customers', 'kitne clients', 'reviews', 'testimonials',
      'ratings', 'feedback', 'satisfied clients', 'happy clients',
      'kya bolte hain clients', 'client feedback', 'star rating',
      'google review', 'recommendation',
    ],
    reply: '⭐ Client Satisfaction:\n\n✅ 35+ businesses served\n✅ 100% client satisfaction\n✅ 5-star Google reviews\n✅ Repeat clients — trust ka proof!\n\n🏢 Industries: Schools, Solar, News, Real Estate, Restaurants, Startups, E-commerce\n\nTestimonials dekhein: primesoul.tech/#testimonials\nGoogle par search karein: "PrimeSoul Web Solutions" ⭐',
    options: ['📁 Portfolio', '📞 Contact'],
  },
  {
    id: 'trust_genuine',
    triggers: [
      'trusted', 'genuine', 'fraud to nahi', 'real company', 'trust',
      'legit', 'safe', 'is it real', 'fake to nahi', 'scam',
      'vishwas', 'bharosa', 'reliable', 'trustworthy', 'authentic',
      'paisa doob jayega', 'dhoka', 'fraud', 'asli hai',
    ],
    reply: '🛡️ 100% Genuine & Trusted!\n\n✅ Registered business entity\n✅ Rajgarh, MP mein physically located\n✅ 3+ saal ka track record\n✅ 35+ verified projects live\n✅ Real client testimonials\n✅ Google verified business\n✅ Transparent pricing & process\n\n🔍 Verify karein:\n• Google: "PrimeSoul Web Solutions"\n• Website: primesoul.tech\n• Call: 8770404559\n\nPehle free call karein, phir decide karein! 🤝',
    options: ['📞 Contact', '📁 Portfolio', '💬 Open WhatsApp'],
  },
  {
    id: 'industries',
    triggers: [
      'industry', 'sector', 'kin logon ke liye', 'kis type ke client',
      'domain', 'niche', 'specialization', 'expert kis mein',
      'kaunse business ke liye', 'mere jaise business',
    ],
    reply: '🏢 Hum in industries mein kaam karte hain:\n\n🏫 Education — Schools, Colleges, Coaching\n☀️ Solar & Energy companies\n🏥 Healthcare & Clinics\n🍽️ Restaurants & Hotels\n🛒 E-commerce & Retail\n🏠 Real Estate\n📰 News & Media\n💼 Professional Services\n🚀 Startups\n🏭 Manufacturing\n👗 Fashion & Lifestyle\n🔧 Local Businesses\n\nHar industry ke liye customized solutions! 💎',
    options: ['📁 Portfolio', '📞 Contact', '💰 Pricing'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CONTACT & COMMUNICATION
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'contact',
    triggers: [
      'contact', 'number', 'phone', 'call', 'reach', 'mobile number',
      'phone number', 'contact number', 'sampark', 'connect', 'touch',
      'get in touch', 'contact details', 'contact info', 'contact karo',
      'kaise contact kare', 'how to contact', 'reach out',
    ],
    reply: '📞 Contact Information:\n\n📱 WhatsApp: 8770404559 (fastest!)\n📧 Email: info@primesoul.tech\n📍 Location: Rajgarh, Madhya Pradesh\n🌐 Website: primesoul.tech\n📋 Contact Form: primesoul.tech/contact\n📅 Free Call Book: calendly.com/paramsisodiya061/30min\n\n⏰ Response time: 2-4 ghante mein!',
    options: ['💬 Open WhatsApp', 'Go to Contact Page'],
  },
  {
    id: 'whatsapp',
    triggers: [
      'whatsapp', 'message', 'wa me', 'whatsapp chat', 'whatsapp message',
      'whatsapp number', 'msg karo', 'message karo', 'dm', 'dm karo',
      'inbox', 'ping', 'text karo',
    ],
    reply: '📱 WhatsApp par seedha message karein:\n\n🔗 wa.me/918770404559\n\n⏰ Hum 2-4 ghante mein reply karte hain!\n💡 Tip: Apna project idea briefly batayein for fastest response.',
    options: ['💬 Open WhatsApp', '📞 Contact'],
  },
  {
    id: 'location',
    triggers: [
      'location', 'address', 'office', 'kahan ho', 'city', 'where located',
      'office address', 'rajgarh', 'headquarter', 'hq', 'branch',
      'kahan se ho', 'konsa shehar', 'konsi jagah', 'madhya pradesh',
    ],
    reply: '📍 Location:\n\n🏢 PrimeSoul Web Solutions\n📍 Rajgarh, Madhya Pradesh, India\n\n🌍 Lekin hum India bhar mein serve karte hain!\n✅ Sab kaam online hota hai\n✅ Video calls par meetings\n✅ Screen sharing par demos\n\nChahe aap kahi bhi ho — hum available hain! 🇮🇳',
    options: ['📞 Contact', '💬 Open WhatsApp'],
  },
  {
    id: 'email',
    triggers: [
      'email', 'mail', 'gmail', 'email address', 'email id', 'mail id',
      'email karo', 'mail karo', 'email bhejo',
    ],
    reply: '📧 Email:\n\ninfo@primesoul.tech\n\nEmail par detailed project brief bhej sakte hain. Lekin quick response ke liye WhatsApp better hai: 8770404559 📱',
    options: ['💬 Open WhatsApp', '📞 Contact'],
  },
  {
    id: 'social_links',
    triggers: [
      'social media links', 'instagram page', 'facebook page primesoul',
      'linkedin', 'twitter', 'youtube channel', 'social profiles',
      'aapka instagram', 'aapka facebook', 'follow kahan kare',
    ],
    reply: '🔗 Hamari Social Media Profiles:\n\n📸 Instagram: @primesoul.tech\n📘 Facebook: PrimeSoul Web Solutions\n💼 LinkedIn: PrimeSoul Web Solutions\n🌐 Website: primesoul.tech\n\nFollow karein for tips, updates, aur latest work! 🚀',
    options: ['📞 Contact', '🛠️ Services'],
  },
  {
    id: 'working_hours',
    triggers: [
      'working hours', 'timing', 'kab available ho', 'office time',
      'open time', 'close time', 'holiday', 'sunday', 'weekend',
      'kab kaam karte ho', 'reply kab milega', 'available kab ho',
    ],
    reply: '⏰ Working Hours:\n\n📅 Monday - Saturday: 10 AM - 8 PM\n📅 Sunday: Available on WhatsApp\n\n💡 Emergency/urgent kaam ke liye hum after hours bhi available hain!\n\nWhatsApp par message karein — jaldi reply milega! 📱',
    options: ['📞 Contact', '💬 Open WhatsApp'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ABOUT COMPANY & TEAM
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'about_company',
    triggers: [
      'kaun ho', 'about', 'company', 'primesoul kya hai', 'about us',
      'who are you', 'primesoul', 'about company', 'company profile',
      'aap kaun ho', 'ye company kya hai', 'organization', 'firm',
      'agency', 'startup', 'about primesoul',
    ],
    reply: '🏢 PrimeSoul Web Solutions:\n\nEk full-service digital agency based in Rajgarh, Madhya Pradesh 🇮🇳\n\n📌 Founded: 2022\n👥 Team: 8-10 professionals\n🎯 Projects: 35+ delivered\n⭐ Satisfaction: 100%\n\n🛠️ Kya karte hain:\n• Website Design & Development\n• Digital Marketing\n• Graphic Design\n• SEO & Branding\n\nMission: Har business ko powerful online presence dena! 💪',
    options: ['🛠️ Services', '📁 Portfolio', '📞 Contact'],
  },
  {
    id: 'founder_team',
    triggers: [
      'founder', 'owner', 'ceo', 'team', 'param', 'shyam', 'who owns',
      'founder name', 'kisne banaya', 'team members', 'employees',
      'kitne log hain', 'staff', 'team size', 'developer kaun hai',
      'designer kaun hai', 'co-founder',
    ],
    reply: '👥 PrimeSoul Team:\n\n👨‍💻 Founder: Param Sisodiya\n👔 CEO: Shyam Sisodiya\n\n🏢 Team Size: 8-10 dedicated professionals\n• Web Developers\n• UI/UX Designers\n• Graphic Designers\n• Digital Marketers\n• Content Writers\n• Project Managers\n\nHar team member experienced aur passionate hai! 💪',
    options: ['📞 Contact', '📁 Portfolio'],
  },
  {
    id: 'experience_years',
    triggers: [
      'experience', 'kitne saal', 'purani company', 'how many years',
      'how long', 'established', 'since when', 'kab se kaam kar rahe',
      'kitna experience', 'years of experience',
    ],
    reply: '📅 Experience:\n\n✅ 3+ saal ka industry experience\n✅ 35+ projects successfully delivered\n✅ Multiple industries mein kaam kiya\n✅ Constantly learning new technologies\n✅ Up-to-date with latest trends\n\nExperience + passion = quality results! 🚀',
    options: ['📁 Portfolio', '📞 Contact'],
  },
  {
    id: 'vision_mission',
    triggers: [
      'vision', 'mission', 'goal', 'aim', 'objective', 'values',
      'kya soochte ho', 'company ka goal', 'future plan',
    ],
    reply: '🎯 Hamara Vision & Mission:\n\n🌟 Vision: Har Indian business ko world-class digital presence dena\n\n🎯 Mission:\n• Affordable mein premium quality\n• Local businesses ko online grow karna\n• Technology ko accessible banana\n• Long-term client relationships\n\nHum sirf project nahi banate — partnerships banate hain! 🤝',
    options: ['🛠️ Services', '📞 Contact'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SUPPORT, MAINTENANCE & AFTER-SALES
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'support',
    triggers: [
      'support', 'maintenance', 'baad mein help', 'after sales',
      'maintenance plan', 'website support', 'technical support',
      'help chahiye', 'issue aa raha', 'problem hai', 'error aa raha',
      'site down', 'website down', 'kaam nahi kar rahi',
    ],
    reply: '🔧 Support & Maintenance:\n\n✅ 30 days free support — har project ke saath\n✅ Monthly maintenance plans available:\n   • Basic: ₹299/month (hosting check + minor fixes)\n   • Standard: ₹499/month (+ content updates)\n   • Premium: ₹999/month (+ feature additions)\n\n✅ Emergency support bhi available hai!\n\nKoi issue hai? Turant WhatsApp karein: 8770404559',
    options: ['💰 Pricing', '📞 Contact', '💬 Open WhatsApp'],
  },
  {
    id: 'hosting_domain',
    triggers: [
      'hosting', 'domain', 'server', 'domain name', 'web hosting',
      'domain kaise le', 'hosting kaise le', 'shared hosting',
      'vps', 'dedicated server', 'cloud hosting', 'domain register',
      'website kahan host hogi', 'renewal', 'domain renewal',
    ],
    reply: '🌐 Hosting & Domain:\n\n✅ Domain registration help\n✅ Hosting setup & configuration\n✅ SSL certificate (free)\n✅ Email hosting\n✅ Annual renewal reminders\n✅ Hosting migration\n\nHum recommend karte hain:\n• Vercel (free for small sites)\n• Firebase Hosting\n• Hostinger/Bluehost (budget)\n\nSetup hum kar denge — aapko sirf enjoy karna hai! 😊',
    options: ['🛠️ Services', '📞 Contact'],
  },
  {
    id: 'warranty_guarantee',
    triggers: [
      'warranty', 'guarantee', 'agar kuch toot gaya', 'bug fix',
      'free support', '30 days support', 'guarantee kya hai',
      'agar kaam nahi kiya', 'quality guarantee', 'satisfaction guarantee',
    ],
    reply: '🛡️ Hamari Guarantee:\n\n✅ 30 days free bug-fix support\n✅ Koi bhi technical issue — free fix\n✅ Design revisions until satisfied\n✅ Performance guarantee\n✅ Code quality assurance\n✅ Cross-browser testing\n\nAgar delivery ke baad koi issue aaye — hum fix karenge, free! 💪',
    options: ['📞 Contact'],
  },
  {
    id: 'backup_recovery',
    triggers: [
      'backup', 'data recovery', 'data loss', 'restore', 'backup hai',
      'agar data delete ho jaye', 'website crash',
    ],
    reply: '💾 Backup & Recovery:\n\n✅ Regular automated backups\n✅ Version control (Git)\n✅ Database backups\n✅ Quick restoration possible\n✅ Disaster recovery plan\n\nAapka data safe hai humare paas! 🔒',
    options: ['📞 Contact', '🛠️ Services'],
  },
  {
    id: 'update_content',
    triggers: [
      'content update', 'website update karna', 'photo change', 'text change',
      'naya content daalna', 'page add karna', 'edit karna hai',
      'khud se edit', 'admin panel', 'cms access', 'self manage',
    ],
    reply: '📝 Content Updates:\n\n✅ Admin panel milta hai — khud se content update kar sakte hain\n✅ Images, text, pages — sab change kar sakte hain\n✅ Training bhi dete hain admin panel use karne ka\n✅ Agar khud nahi kar sakte — hum kar denge!\n\nMaintenance plan mein monthly content updates included hain.',
    options: ['📞 Contact', '💰 Pricing'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // JOBS, INTERNSHIPS & CAREERS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'jobs_careers',
    triggers: [
      'job', 'naukri', 'vacancy', 'hiring', 'openings', 'career',
      'kaam chahiye', 'job chahiye', 'work with you', 'join team',
      'recruitment', 'position', 'apply', 'resume bhejo',
      'job opening', 'koi vacancy hai',
    ],
    reply: '💼 Careers at PrimeSoul:\n\nHum talented logon ki talash mein rehte hain!\n\n🔍 Current interests:\n• Web Developers (React/Next.js)\n• Graphic Designers\n• Digital Marketing Executives\n• Content Writers\n• Sales & Business Development\n\n📧 Resume bhejein: info@primesoul.tech\n🌐 Career page: primesoul.tech/careers\n\nSubject line mein position likhen! 📩',
    options: ['📞 Contact'],
  },
  {
    id: 'internship',
    triggers: [
      'internship', 'intern', 'training', 'apprentice', 'stipend',
      'internship chahiye', 'student internship', 'summer internship',
      'fresher', 'no experience', 'sikhna chahte hain', 'learn',
      'seekhna hai', 'sikha do', 'course',
    ],
    reply: '🎓 Internship & Training:\n\n✅ Internship opportunities available!\n• Web Development Intern\n• Graphic Design Intern\n• Digital Marketing Intern\n\n📌 Duration: 1-3 months\n📌 Mode: Remote/Hybrid\n📌 Certificate + Letter of Recommendation\n📌 Real project experience\n\nInterested? WhatsApp karein with resume: 8770404559',
    options: ['📞 Contact', '💬 Open WhatsApp'],
  },
  {
    id: 'learn_course',
    triggers: [
      'course', 'sikhao', 'learn web development', 'web development course',
      'graphic design sikhao', 'tutorial', 'coaching', 'mentorship',
      'freelancing sikhao', 'kaise sikhe', 'coding sikhe',
    ],
    reply: '📚 Learning Resources:\n\nAbhi hum formal courses offer nahi karte, lekin:\n\n✅ Internship mein hands-on training milti hai\n✅ 1-on-1 mentorship available hai select students ke liye\n✅ Free tips hamare social media par milte hain\n\nSerious hain sikhne ke liye? Baat karte hain: 8770404559',
    options: ['📞 Contact'],
  },
  {
    id: 'freelance_collab',
    triggers: [
      'freelancer', 'collaboration', 'partner', 'collab', 'partnership',
      'saath kaam karna', 'joint venture', 'associate', 'agency partnership',
      'white label', 'outsource', 'subcontract',
    ],
    reply: '🤝 Collaboration & Partnership:\n\nHum freelancers aur agencies ke saath collaborate karte hain!\n\n✅ White-label services available\n✅ Project-based collaboration\n✅ Referral partnership program\n✅ Agency-to-agency outsourcing\n\nInterested? Email karein details ke saath: info@primesoul.tech',
    options: ['📞 Contact'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SPECIFIC SCENARIOS & USE CASES
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'restaurant_food',
    triggers: [
      'restaurant website', 'hotel website', 'food delivery', 'menu card',
      'dhaba', 'cafe website', 'cloud kitchen', 'food business',
      'restaurant', 'hotel', 'khana', 'food',
    ],
    reply: '🍽️ Restaurant/Hotel Website:\n\n✅ Beautiful menu display\n✅ Online ordering (optional)\n✅ Table reservation system\n✅ Photo gallery\n✅ Google Maps integration\n✅ WhatsApp order button\n✅ QR code menu\n\nStarting ₹8,000. Aapke customers online order kar payenge! 📱',
    options: ['💰 Pricing', '📞 Contact', '📁 Portfolio'],
  },
  {
    id: 'doctor_clinic',
    triggers: [
      'doctor website', 'clinic website', 'hospital website', 'healthcare',
      'medical', 'dentist', 'doctor', 'clinic', 'hospital',
      'appointment booking', 'patient management',
    ],
    reply: '🏥 Doctor/Clinic Website:\n\n✅ Online appointment booking\n✅ Doctor profiles & specializations\n✅ Services & treatments list\n✅ Patient testimonials\n✅ Location & timing display\n✅ Emergency contact number\n✅ WhatsApp appointment button\n\nStarting ₹8,000. Patient flow badhega! 📈',
    options: ['💰 Pricing', '📞 Contact'],
  },
  {
    id: 'real_estate',
    triggers: [
      'real estate', 'property', 'builder', 'construction', 'flat',
      'plot', 'ghar', 'makan', 'property dealer', 'real estate website',
      'builder website', 'property listing',
    ],
    reply: '🏠 Real Estate Website:\n\n✅ Property listings with filters\n✅ Photo galleries & virtual tours\n✅ Location maps\n✅ EMI calculator\n✅ Inquiry forms\n✅ Agent profiles\n✅ WhatsApp inquiry button\n\nStarting ₹12,000. Properties online dikhao, leads paao! 📊',
    options: ['💰 Pricing', '📞 Contact'],
  },
  {
    id: 'solar_energy',
    triggers: [
      'solar', 'solar company', 'solar website', 'renewable energy',
      'solar panel', 'solar business', 'energy company',
    ],
    reply: '☀️ Solar Company Website:\n\nHumne A&S Solar Solutions ka website banaya hai!\n\n✅ Product showcase\n✅ Subsidy calculator\n✅ Installation gallery\n✅ Customer testimonials\n✅ Service area map\n✅ Lead generation forms\n\nStarting ₹8,000. Solar businesses ke liye perfect! ⚡',
    options: ['📁 Portfolio', '💰 Pricing', '📞 Contact'],
  },
  {
    id: 'ngo_nonprofit',
    triggers: [
      'ngo', 'non profit', 'nonprofit', 'charity', 'trust website',
      'foundation', 'social cause', 'donation website',
    ],
    reply: '🤲 NGO/Non-Profit Website:\n\n✅ Mission & vision showcase\n✅ Donation integration\n✅ Volunteer registration\n✅ Event calendar\n✅ Impact stories\n✅ Photo/video gallery\n\nNGOs ke liye special discounted rates available! 💛',
    options: ['💰 Pricing', '📞 Contact'],
  },
  {
    id: 'gym_fitness',
    triggers: [
      'gym', 'fitness', 'yoga', 'health club', 'gym website',
      'fitness center', 'trainer', 'personal trainer',
    ],
    reply: '💪 Gym/Fitness Website:\n\n✅ Membership plans display\n✅ Trainer profiles\n✅ Class schedule\n✅ Before/After gallery\n✅ Online booking\n✅ WhatsApp inquiry\n✅ Client transformations\n\nStarting ₹8,000. Members online attract karo! 🏋️',
    options: ['💰 Pricing', '📞 Contact'],
  },
  {
    id: 'wedding_event',
    triggers: [
      'wedding', 'event', 'shaadi', 'event management', 'wedding planner',
      'event website', 'wedding website', 'invitation website',
    ],
    reply: '💍 Wedding/Event Website:\n\n✅ Beautiful invitation pages\n✅ RSVP system\n✅ Photo/Video gallery\n✅ Event schedule\n✅ Venue details with map\n✅ Guest management\n\nDigital invitation se guests ko impress karo! Starting ₹3,000. 🎉',
    options: ['💰 Pricing', '📞 Contact'],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // COMMON USER QUESTIONS & MISC
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'referral',
    triggers: [
      'referral', 'refer', 'recommend', 'friend ko batana', 'reference',
      'kisi ko bhejna', 'affiliate', 'commission', 'referral program',
    ],
    reply: '🎁 Referral Program:\n\n✅ Kisi ko refer karo — dono ko benefit!\n✅ Successful referral par discount ya cashback\n✅ No limit — jitne zyada refer, utna zyada benefit\n\nDetails ke liye: WhatsApp 8770404559\n\nHum aapki recommendation value karte hain! 🙏',
    options: ['📞 Contact', '💬 Open WhatsApp'],
  },
  {
    id: 'contract_agreement',
    triggers: [
      'contract', 'agreement', 'nda', 'legal', 'mou', 'terms',
      'likha hua', 'written agreement', 'paper work', 'documentation',
    ],
    reply: '📜 Contracts & Agreements:\n\n✅ Har project ke liye formal proposal/agreement\n✅ Scope of work clearly defined\n✅ Payment terms mentioned\n✅ Timeline committed\n✅ NDA available (for sensitive projects)\n\nSab kuch transparent aur documented! 📋',
    options: ['📞 Contact'],
  },
  {
    id: 'multilingual',
    triggers: [
      'hindi website', 'multilingual', 'english website', 'multiple language',
      'hindi mein website', 'regional language', 'marathi', 'gujarati',
      'bhasha', 'translation',
    ],
    reply: '🌐 Multilingual Websites:\n\n✅ Hindi + English websites\n✅ Any Indian language support\n✅ RTL language support\n✅ Language switcher feature\n✅ Content translation help\n\nHum aapki website target audience ki language mein bana sakte hain! 🇮🇳',
    options: ['📞 Contact', '🛠️ Services'],
  },
  {
    id: 'government',
    triggers: [
      'government', 'sarkari', 'tender', 'government project',
      'municipality', 'nagar palika', 'panchayat', 'government website',
    ],
    reply: '🏛️ Government Projects:\n\nHum government aur semi-government organizations ke liye bhi kaam karte hain:\n\n✅ Government portal design\n✅ Tender-compliant documentation\n✅ Accessibility standards\n✅ Bilingual support (Hindi/English)\n\nDetails ke liye formal inquiry bhejein: info@primesoul.tech',
    options: ['📞 Contact'],
  },
  {
    id: 'startup_help',
    triggers: [
      'startup', 'new business', 'naya business', 'business shuru karna',
      'idea hai', 'startup package', 'complete solution', 'full package',
      'sab chahiye', 'everything need', 'startup help',
    ],
    reply: '🚀 Startup Package:\n\nNaya business start kar rahe hain? Hum complete digital setup dete hain:\n\n✅ Logo + Brand Identity: ₹2,000\n✅ Professional Website: ₹5,000+\n✅ Google Business Profile: ₹1,500\n✅ Social Media Setup: ₹2,000\n✅ Business Cards: ₹500\n\n🎉 Combo deal: Sab saath lein toh 15-20% discount!\n\nFree consultation se shuru karein? 📞',
    options: ['📞 Contact', '💰 Pricing', '💬 Open WhatsApp'],
  },
  {
    id: 'existing_website_issue',
    triggers: [
      'website mein problem', 'error aa raha', 'bug hai', 'fix karo',
      'repair', 'site crash', 'kuch galat hai', 'issue solve',
      'website theek karo', 'not working', 'broken', 'debug',
    ],
    reply: '🔧 Website Issue? Hum fix kar denge!\n\n✅ Bug fixing\n✅ Error resolution\n✅ Performance issues\n✅ Design fixes\n✅ Compatibility issues\n✅ Security patches\n\nIssue ka screenshot ya URL WhatsApp par bhejein: 8770404559\nHum jaldi se jaldi solve karenge! ⚡',
    options: ['💬 Open WhatsApp', '📞 Contact'],
  },
  {
    id: 'migration',
    triggers: [
      'migrate', 'migration', 'shift', 'transfer website', 'move website',
      'platform change', 'hosting change', 'wordpress se',
      'dusre developer se', 'purani website ko shift',
    ],
    reply: '🔄 Website Migration:\n\n✅ Platform migration (WordPress → Custom, etc.)\n✅ Hosting migration\n✅ Domain transfer\n✅ Data migration\n✅ Email migration\n✅ Zero downtime\n\nPurani website ko new platform par safely shift kar denge! Starting ₹3,000.',
    options: ['📞 Contact', '💰 Pricing'],
  },
  {
    id: 'competitor_analysis',
    triggers: [
      'competitor', 'competition', 'market research', 'analysis',
      'competitor website', 'mere competitor', 'doosron jaisa',
      'same jaisa banana', 'aise banana hai', 'reference website',
    ],
    reply: '🔍 Competitor Analysis:\n\nHum aapke competitors ka analysis karke better website banate hain!\n\n✅ Competitor website review\n✅ Features comparison\n✅ Design inspiration\n✅ SEO gap analysis\n✅ Better user experience\n\nReference website ka link bhejein — hum usse better banayenge! 💪',
    options: ['📞 Contact', '💬 Open WhatsApp'],
  },
  {
    id: 'training_handover',
    triggers: [
      'training', 'handover', 'sikhana', 'tutorial dena', 'guide',
      'kaise chalaye', 'website chalana', 'manage karna sikhao',
    ],
    reply: '📚 Training & Handover:\n\n✅ Complete website training (video call par)\n✅ Admin panel walkthrough\n✅ Content update guide\n✅ Video tutorials (recorded)\n✅ Documentation\n✅ WhatsApp par doubt solving\n\nAapko confident feel hona chahiye apni website manage karne mein! 🎓',
    options: ['📞 Contact'],
  },
  {
    id: 'testimonial_leave',
    triggers: [
      'review dena', 'feedback dena', 'testimonial dena', 'rating dena',
      'google review dena', 'review likhna',
    ],
    reply: '⭐ Review Dena Chahte Hain?\n\nBahut shukriya! Aap yahan review de sakte hain:\n\n🌐 primesoul.tech/leave-review\n📍 Google Business par review\n\nAapka feedback hamare liye bahut valuable hai! 🙏',
    options: ['📞 Contact'],
  },
  {
    id: 'not_happy',
    triggers: [
      'khush nahi', 'satisfied nahi', 'complaint', 'shikayat',
      'problem hai', 'issue hai', 'not happy', 'not satisfied',
      'disappointed', 'unhappy', 'galat kiya',
    ],
    reply: '😔 Aapko koi problem hai toh hum solve karenge!\n\n✅ Hum 100% satisfaction guarantee dete hain\n✅ Free revisions until happy\n✅ Direct founder se baat kar sakte hain\n\nPlease seedha call karein: 8770404559\nYa email karein: info@primesoul.tech\n\nHum zaroor solution nikalenge! 🤝',
    options: ['📞 Contact', '💬 Open WhatsApp'],
  },
  {
    id: 'sample_demo',
    triggers: [
      'demo dikhao', 'sample dikhao', 'trial', 'free trial',
      'pehle dikhao', 'prototype', 'preview', 'try before',
      'test karna', 'dekhna hai pehle',
    ],
    reply: '👀 Demo & Preview:\n\n✅ Free consultation mein concept discuss karte hain\n✅ Design mockup approval ke baad hi development shuru\n✅ Portfolio mein live projects dekh sakte hain\n✅ Similar project ka demo dikha sakte hain\n\nFree call book karein — sab samjha denge! 📞',
    options: ['📁 Portfolio', '📞 Contact'],
  },
  {
    id: 'multiple_projects',
    triggers: [
      'multiple projects', 'bulk order', 'bahut saare kaam', 'zyada kaam',
      'regular kaam', 'monthly kaam', 'retainer', 'ongoing work',
      'long term', 'lambe samay', 'continuous work',
    ],
    reply: '📦 Bulk/Ongoing Projects:\n\n✅ Multiple projects par special pricing\n✅ Monthly retainer plans available\n✅ Dedicated team assigned\n✅ Priority support\n✅ Volume discounts\n\nLong-term partnership ke liye custom plan banate hain! 🤝',
    options: ['📞 Contact', '💰 Pricing'],
  },
  {
    id: 'specific_feature',
    triggers: [
      'chatbot banana', 'chat feature', 'live chat', 'whatsapp integrate',
      'payment integrate', 'razorpay', 'stripe', 'map add karna',
      'form banana', 'login page', 'signup', 'otp', 'notification',
      'push notification', 'email notification', 'calendar',
    ],
    reply: '⚙️ Custom Features:\n\nHaan! Hum ye sab integrate kar sakte hain:\n\n✅ Live chat / Chatbot\n✅ WhatsApp integration\n✅ Payment gateways (Razorpay, Stripe)\n✅ Google Maps\n✅ Custom forms\n✅ User login/signup with OTP\n✅ Push notifications\n✅ Email notifications\n✅ Calendar/Booking systems\n✅ Social media feeds\n\nKaunsa feature chahiye? Baat karte hain!',
    options: ['📞 Contact', '💰 Pricing'],
  },
  {
    id: 'accessibility',
    triggers: [
      'accessibility', 'disabled', 'screen reader', 'wcag',
      'visually impaired', 'handicapped', 'ada compliance',
    ],
    reply: '♿ Accessibility:\n\n✅ WCAG guidelines follow karte hain\n✅ Screen reader compatible\n✅ Keyboard navigation\n✅ Proper alt text for images\n✅ High contrast options\n✅ Readable font sizes\n\nInclusive design hamari priority hai! 🌟',
    options: ['📞 Contact', '🛠️ Services'],
  },
  {
    id: 'international',
    triggers: [
      'international', 'foreign client', 'abroad', 'usa', 'uk', 'dubai',
      'australia', 'canada', 'outside india', 'global', 'overseas',
      'dollar mein', 'foreign currency',
    ],
    reply: '🌍 International Clients:\n\n✅ Hum globally serve karte hain!\n✅ USD/GBP/AED mein payment accept\n✅ PayPal & Wise bhi available\n✅ Time zone ke according meetings\n✅ English communication\n\nIndia se bahar hain? No problem — online sab ho jayega! 🌐',
    options: ['📞 Contact', '💬 Open WhatsApp'],
  },
]

// ─── ACTION LINKS ────────────────────────────────────────────────────────────
const ACTION_LINKS: Record<string, string> = {
  'go to contact page': '/contact',
  'go to contact form': '/contact',
  'contact form': '/contact',
  'contact page': '/contact',
  'open portfolio page': '/portfolio',
  'view portfolio': '/portfolio',
  'open portfolio': '/portfolio',
  'portfolio page': '/portfolio',
  'open whatsapp': 'https://wa.me/918770404559?text=Hi%20PrimeSoul%2C%20I%20need%20help%20with%20a%20project!',
  '💬 open whatsapp': 'https://wa.me/918770404559?text=Hi%20PrimeSoul%2C%20I%20need%20help%20with%20a%20project!',
  '🌐 open portfolio page': '/portfolio',
}

// ─── TEXT PROCESSING ─────────────────────────────────────────────────────────
function cleanText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function applySynonyms(words: string[]): string[] {
  return words.map(w => SYNONYM_MAP[w] || w)
}

function extractKeywords(text: string): string[] {
  const words = cleanText(text).split(' ').filter(w => w.length > 0)
  const withSynonyms = applySynonyms(words)
  const filtered = withSynonyms.filter(w => !STOP_WORDS.has(w))
  return filtered.length > 0 ? filtered : withSynonyms
}

// ─── SMART MATCHING ENGINE ──────────────────────────────────────────────────
function findBestMatch(userInput: string): QAItem | null {
  const cleanedUser = cleanText(userInput)
  const userKeywords = extractKeywords(userInput)
  if (userKeywords.length === 0) return null

  let bestMatch: QAItem | null = null
  let maxScore = 0

  for (const item of QA_DATABASE) {
    let itemBestScore = 0

    for (const trigger of item.triggers) {
      const cleanedTrigger = cleanText(trigger)

      // 1. Exact phrase match → instant return
      if (cleanedUser === cleanedTrigger) {
        return item
      }

      let score = 0

      // 2. Substring containment
      if (cleanedUser.length > 2 && cleanedTrigger.length > 2) {
        if (cleanedUser.includes(cleanedTrigger) || cleanedTrigger.includes(cleanedUser)) {
          score = Math.max(score, 0.95)
        }
      }

      // 3. Keyword overlap with synonym support
      const triggerKeywords = extractKeywords(trigger)
      let overlapCount = 0
      for (const uKw of userKeywords) {
        const matched = triggerKeywords.some(tKw =>
          tKw === uKw ||
          (tKw.length > 2 && uKw.length > 2 && (tKw.includes(uKw) || uKw.includes(tKw))) ||
          (tKw.length > 3 && uKw.length > 3 && levenshteinClose(tKw, uKw))
        )
        if (matched) overlapCount++
      }
      const keywordScore = userKeywords.length > 0 ? overlapCount / userKeywords.length : 0

      // 4. Bonus for trigger keyword coverage
      const triggerCoverage = triggerKeywords.length > 0 ? overlapCount / triggerKeywords.length : 0
      const combinedScore = (keywordScore * 0.7) + (triggerCoverage * 0.3)

      score = Math.max(score, combinedScore)
      itemBestScore = Math.max(itemBestScore, score)
    }

    if (itemBestScore > maxScore) {
      maxScore = itemBestScore
      bestMatch = item
    }
  }

  // 30% threshold
  return maxScore >= 0.30 ? bestMatch : null
}

// Simple Levenshtein-like "close enough" check for typo tolerance
function levenshteinClose(a: string, b: string): boolean {
  if (Math.abs(a.length - b.length) > 2) return false
  const maxLen = Math.max(a.length, b.length)
  let matches = 0
  const shorter = a.length <= b.length ? a : b
  const longer = a.length <= b.length ? b : a
  for (let i = 0; i < shorter.length; i++) {
    if (longer.includes(shorter[i])) matches++
  }
  return (matches / maxLen) >= 0.75
}

// ─── COMPONENT ──────────────────────────────────────────────────────────────
export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')) return
  }, [])

  const scrollToBottom = () => {
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100)
  }

  const addBotMessage = (text: string, options?: string[]) => {
    setIsTyping(true)
    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now(), text, sender: 'bot', options }])
      setIsTyping(false)
      scrollToBottom()
    }, 600 + Math.random() * 400)
  }

  const handleOpen = () => {
    setIsOpen(true)
    if (messages.length === 0) {
      addBotMessage(
        "Namaste! 🙏 Main PrimeSoul AI Assistant hoon.\n\nAapki kaise madad kar sakta hoon? Neeche diye options tap karein ya apna sawaal type karein:",
        ['💰 Pricing', '🛠️ Services', '⏱️ Timeline', '📁 Portfolio', '📞 Contact']
      )
    }
    setTimeout(() => inputRef.current?.focus(), 300)
  }

  const handleUserMessage = (text: string) => {
    if (!text.trim()) return
    const userText = text.trim()
    setMessages(prev => [...prev, { id: Date.now(), text: userText, sender: 'user' }])
    setInputText('')
    scrollToBottom()

    // Check for action links
    const lowerInput = userText.toLowerCase()
    let actionTarget: string | null = null
    for (const [key, link] of Object.entries(ACTION_LINKS)) {
      if (lowerInput.includes(key)) {
        actionTarget = link
        break
      }
    }

    if (actionTarget) {
      setTimeout(() => {
        if (actionTarget!.startsWith('http')) {
          window.open(actionTarget!, '_blank')
        } else {
          window.location.href = actionTarget!
        }
      }, 500)
    }

    // Find matching response
    const match = findBestMatch(userText)

    if (match) {
      addBotMessage(match.reply, match.options)
    } else {
      addBotMessage(
        "Maine aapka sawaal samjha nahi 🤔 Lekin koi baat nahi!\n\nAap seedha baat kar sakte hain:\n📱 WhatsApp: wa.me/918770404559\n📋 Contact Form: primesoul.tech/contact\n\nYa neeche diye topics try karein:",
        ['💰 Pricing', '🛠️ Services', '📁 Portfolio', '📞 Contact', '💬 Open WhatsApp']
      )
    }
  }

  if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')) return null

  return (
    <>
      {/* Chat bubble */}
      {!isOpen && (
        <button
          onClick={handleOpen}
          className="fixed bottom-28 right-8 z-40 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-2xl transition-all hover:scale-110 hover:-translate-y-1 animate-glow-pulse"
          style={{ background: 'linear-gradient(135deg, #7B2FF2 0%, #A855F7 100%)', boxShadow: '0 8px 32px -4px rgba(123,47,242,0.5)' }}
          aria-label="Open chat"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] rounded-3xl overflow-hidden shadow-2xl" style={{ boxShadow: '0 24px 80px -12px rgba(123,47,242,0.3), 0 8px 24px rgba(0,0,0,0.1)', animation: 'scale-in 0.3s cubic-bezier(0.22,1,0.36,1) forwards' }}>
          {/* Header */}
          <div className="px-5 py-4 flex items-center gap-3" style={{ background: 'linear-gradient(135deg, #7B2FF2 0%, #A855F7 100%)' }}>
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>
            </div>
            <div className="flex-1">
              <p className="text-white text-sm font-semibold">{BOT_NAME}</p>
              <p className="text-white/60 text-xs flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" /> Online now
              </p>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white transition-colors text-lg">✕</button>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-3 bg-[#FAFAFE]" style={{ scrollbarWidth: 'thin' }}>
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] ${msg.sender === 'user' ? '' : ''}`}>
                  <div
                    className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                      msg.sender === 'user'
                        ? 'bg-[#7B2FF2] text-white rounded-br-md'
                        : 'bg-white text-[#0E0E2C] border border-[#E8E5F5] rounded-bl-md shadow-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                  {msg.options && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {msg.options.map(opt => (
                        <button
                          key={opt}
                          onClick={() => handleUserMessage(opt)}
                          className="px-3 py-1.5 rounded-full text-xs font-medium bg-white border border-[#7B2FF2]/20 text-[#7B2FF2] hover:bg-[#7B2FF2] hover:text-white transition-all"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-white border border-[#E8E5F5] shadow-sm">
                  <div className="flex gap-1"><span className="w-2 h-2 rounded-full bg-[#7B2FF2]/40 animate-bounce" style={{ animationDelay: '0s' }} /><span className="w-2 h-2 rounded-full bg-[#7B2FF2]/40 animate-bounce" style={{ animationDelay: '0.15s' }} /><span className="w-2 h-2 rounded-full bg-[#7B2FF2]/40 animate-bounce" style={{ animationDelay: '0.3s' }} /></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="px-4 py-3 bg-white border-t border-[#E8E5F5] flex items-center gap-2">
            <input
              ref={inputRef}
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleUserMessage(inputText)}
              placeholder="Type a message..."
              className="flex-1 bg-[#F4F4F8] rounded-full px-4 py-2.5 text-sm text-[#0E0E2C] placeholder-[#AEAEC8] focus:outline-none focus:ring-2 focus:ring-[#7B2FF2]/20"
            />
            <button
              onClick={() => handleUserMessage(inputText)}
              className="w-9 h-9 rounded-full flex items-center justify-center text-white flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #7B2FF2, #A855F7)' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}
