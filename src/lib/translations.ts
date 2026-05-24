export type Locale = 'en' | 'he' | 'it';

export interface Tour {
  id: string;
  name: string;
  location: string;
  description: string;
  imageUrl: string;
  price: string;
}

export interface Guide {
  name: string;
  designation: string;
  quote: string;
  src: string;
}

export interface Testimonial {
  id: string;
  name: string;
  designation: string;
  quote: string;
  src: string;
}

export interface Dictionary {
  app_name: string;
  nav_home: string;
  nav_expeditions: string;
  nav_guides: string;
  nav_testimonials: string;
  nav_faq: string;
  nav_about: string;
  hero_title: string;
  hero_lede: string;
  hero_cta: string;
  tours_title: string;
  tours_subtitle: string;
  guides_title: string;
  guides_subtitle: string;
  testimonials_title: string;
  testimonials_subtitle: string;
  faq_title: string;
  faq_subtitle: string;
  faq_q1: string;
  faq_a1: string;
  faq_q2: string;
  faq_a2: string;
  faq_q3: string;
  faq_a3: string;
  faq_q4: string;
  faq_a4: string;
  faq_q5: string;
  faq_a5: string;
  about_title: string;
  about_subtitle: string;
  about_desc: string;
  contact_title: string;
  contact_subtitle: string;
  contact_success: string;
  fee_pp: string;
  phone: string;
  email: string;
  address_label: string;
  address_line1: string;
  address_line2: string;
  address_line3: string;
  label_name: string;
  label_email: string;
  label_mission: string;
  btn_initiate: string;
  btn_book: string;
  hours_title: string;
  hours_sun_thu: string;
  hours_fri: string;
  hours_sat: string;
  social_x: string;
  social_github: string;
  social_sourceforge: string;
  credit_inscription: string;
  close: string;
  ok_inscription: string;
  madeBy: string;
  using: string;
  and: string;
  powered_by: string;
  nav_header: string;
  links_header: string;
  tours: Tour[];
  guides: Guide[];
  testimonials: Testimonial[];
}

export type TranslationKey = keyof Omit<Dictionary, 'tours' | 'guides' | 'testimonials'>;

const MISSION_BRIEF_EN = 'Feral Sky is a free open source template made using Firebase Studio, distributed under the MIT license, and built with open-source components from CodePen and Namer UI.';
const MISSION_BRIEF_IT = 'Feral Sky è un template open source gratuito creato utilizzando Firebase Studio, distribuito sotto licenza MIT e costruito con componenti open source di CodePen e Namer UI.';
const MISSION_BRIEF_HE = 'פרל סקיי היא תבנית קוד פתוח בחינם שנוצרה באמצעות פיירבייס סטודיו, מופצת תחת רישיון MIT, ונבנתה עם רכיבי קוד פתוח מ-CodePen ו-Namer UI.';

const TOURS_EN: Tour[] = [
  { id: '1', name: 'Pollock Pines', location: 'California, United States', description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.', imageUrl: '/emily-karakis-HlJSzoWNhPY-unsplash.webp', price: '$1,250.00' },
  { id: '2', name: 'Kings Canyon', location: 'California, United States', description: 'Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', imageUrl: '/matt-artz-nTRDnDdDYk8-unsplash.webp', price: '$2,400.00' },
  { id: '3', name: 'Yosemite Valley', location: 'California, United States', description: 'Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.', imageUrl: '/griffin-wooldridge-AlfcpJS7OLw-unsplash.webp', price: '$3,100.00' },
  { id: '4', name: 'Seebensee Lake', location: 'Seebensee, Austria', description: 'Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.', imageUrl: '/philipp-4hZPYyaXOH4-unsplash.webp', price: '$1,850.00' },
  { id: '5', name: 'Val Rendena', location: 'Trentino, Italy', description: 'Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi.', imageUrl: '/cristina-gottardi-Of1jWtdnQCY-unsplash.webp', price: '$2,200.00' },
  { id: '6', name: 'Beautiful Place', location: 'Somewhere on Earth', description: 'Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.', imageUrl: '/kendall-wooldridge-IxFF1c2vELM-unsplash.webp', price: '$5,100.00' },
  { id: '7', name: 'Rogue River', location: 'Oregon, United States', description: 'Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet.', imageUrl: '/spencer-demera-Xk5scnUMV9w-unsplash.webp', price: '$1,950.00' },
  { id: '8', name: 'French Alps', location: 'Chamonix, France', description: 'Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui.', imageUrl: '/marek-piwnicki-OXKmcihJgEE-unsplash.webp', price: '$4,500.00' },
  { id: '9', name: 'Tara Mountain', location: 'Mokra Gora, Serbia', description: 'Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.', imageUrl: '/stefan-kostic-Eptb7X_NUvU-unsplash.webp', price: '$1,400.00' }
];

const TOURS_IT: Tour[] = [
  { 
    id: '1', 
    name: 'Pollock Pines', 
    location: 'California, Stati Uniti', 
    description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.', 
    imageUrl: '/emily-karakis-HlJSzoWNhPY-unsplash.webp', 
    price: '$1,250.00' 
  },
  { 
    id: '2', 
    name: 'Kings Canyon', 
    location: 'California, Stati Uniti', 
    description: 'Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', 
    imageUrl: '/matt-artz-nTRDnDdDYk8-unsplash.webp', 
    price: '$2,400.00' 
  },
  { 
    id: '3', 
    name: 'Valle di Yosemite', 
    location: 'California, Stati Uniti', 
    description: 'Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.', 
    imageUrl: '/griffin-wooldridge-AlfcpJS7OLw-unsplash.webp', 
    price: '$3,100.00' 
  },
  { 
    id: '4', 
    name: 'Lago di Seebensee', 
    location: 'Seebensee, Austria', 
    description: 'Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.', 
    imageUrl: '/philipp-4hZPYyaXOH4-unsplash.webp', 
    price: '$1,850.00' 
  },
  { 
    id: '5', 
    name: 'Val Rendena', 
    location: 'Trentino, Italia', 
    description: 'Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi.', 
    imageUrl: '/cristina-gottardi-Of1jWtdnQCY-unsplash.webp', 
    price: '$2,200.00' 
  },
  { 
    id: '6', 
    name: 'Un Posto Bellissimo', 
    location: 'Da qualche parte sulla Terra', 
    description: 'Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.', 
    imageUrl: '/kendall-wooldridge-IxFF1c2vELM-unsplash.webp', 
    price: '$5,100.00' 
  },
  { 
    id: '7', 
    name: 'Fiume Rogue', 
    location: 'Oregon, Stati Uniti', 
    description: 'Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet.', 
    imageUrl: '/spencer-demera-Xk5scnUMV9w-unsplash.webp', 
    price: '$1,950.00' 
  },
  { 
    id: '8', 
    name: 'Alpi Francesi', 
    location: 'Chamonix, Francia', 
    description: 'Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui.', 
    imageUrl: '/marek-piwnicki-OXKmcihJgEE-unsplash.webp', 
    price: '$4,500.00' 
  },
  { 
    id: '9', 
    name: 'Monte Tara', 
    location: 'Mokra Gora, Serbia', 
    description: 'Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.', 
    imageUrl: '/stefan-kostic-Eptb7X_NUvU-unsplash.webp', 
    price: '$1,400.00' 
  }
];

const TOURS_HE: Tour[] = [
  { id: '1', name: 'פולוק פיינס', location: 'קליפורניה, ארצות הברית', description: 'לורם איפסום דולור סיט אמט, קונסקטטור אדיפיסינג אלית. אניאן קומודו ליגולה אגת דולור.', imageUrl: '/emily-karakis-HlJSzoWNhPY-unsplash.webp', price: '$1,250.00' },
  { id: '2', name: 'קינגס קניון', location: 'קליפורניה, ארצות הברית', description: 'אניאן מאסה. קום סוציאיס נאטוקה פנאטיבוס את מגניס דיס פרטוריינט מונטס, נססטור רידיקולוס מוס.', imageUrl: '/matt-artz-nTRDnDdDYk8-unsplash.webp', price: '$2,400.00' },
  { id: '3', name: 'יוסמיטי ואלי', location: 'קליפורניה, ארצות הברית', description: 'דונק קוואם פליס, אולטריציאס נק, פלנטסק איו, פרטיום קוויס, סם. נולה קונסקוואט מאסה קוויס אנים.', imageUrl: '/griffin-wooldridge-AlfcpJS7OLw-unsplash.webp', price: '$3,100.00' },
  { id: '4', name: 'זיבנזה לייק', location: 'זיבנזה, אוסטריה', description: 'דונק פדה יוסטו, פרינגילה וול, אליקט נק, וולפוטאטה אגת, ארקו. אינאנים יוסטו, רונקוס אוט, אימפרדיט א, וננאטיס ויטאה, יוסטו.', imageUrl: '/philipp-4hZPYyaXOH4-unsplash.webp', price: '$1,850.00' },
  { id: '5', name: 'ואל רנדנה', location: 'טרנטינו, איטליה', description: 'נולאם דיקטום פליס איו פדה מוליס פרטיום. אינטגר טינסידונט. קראס דאפיבוס. ויואמוס אלמנטום סמפר ניזי.', imageUrl: '/cristina-gottardi-Of1jWtdnQCY-unsplash.webp', price: '$2,200.00' },
  { id: '6', name: 'ביוטיפול פלייס', location: 'סאמוור און ארת׳', description: 'אניאן וולפוטאטה אלייפנד טלוס. אניאן לאו ליגולה, פורטיטור איו, קונסקוואט ויטאה, אלייפנד אק, אנים.', imageUrl: '/kendall-wooldridge-IxFF1c2vELM-unsplash.webp', price: '$5,100.00' },
  { id: '7', name: 'רוג ריבר', location: 'אורגון, ארצות הברית', description: 'אליקוואם לורם אנטה, דאפיבוס אין, ויברה קוויס, פאוגיאט א, טלוס. פזלוס ויברה נולה אוט מטוס וריאוס לאורט.', imageUrl: '/spencer-demera-Xk5scnUMV9w-unsplash.webp', price: '$1,950.00' },
  { id: '8', name: 'פרנץ׳ אלפס', location: 'שאמוני, צרפת', description: 'קוויסקוה רוטרום. אניאן אימפרדיט. אטיאם אולטריציאס ניזי וול אוגה. קוראביטור אולאמקורפר אולטריציאס ניזי. נאם אגת דוי.', imageUrl: '/marek-piwnicki-OXKmcihJgEE-unsplash.webp', price: '$4,500.00' },
  { id: '9', name: 'טארה מאונטיין', location: 'מוקרה גורה, סרביה', description: 'מצנאס טמפוס, טלוס אגת קונדימנטום רונקוס, סם קוואם סמפר ליברו, סיט אמט אדיפיסינג סם נקווה סד איפסום.', imageUrl: '/stefan-kostic-Eptb7X_NUvU-unsplash.webp', price: '$1,400.00' }
];

export const translations: Record<Locale, Dictionary> = {
  en: {
    app_name: 'Feral Sky',
    nav_home: 'Home',
    nav_expeditions: 'Expeditions',
    nav_guides: 'Guides',
    nav_testimonials: 'Testimonials',
    nav_faq: 'FAQ',
    nav_about: 'About Us',
    hero_title: 'Explore Nature',
    hero_lede: MISSION_BRIEF_EN,
    hero_cta: 'Discover Expeditions',
    tours_title: 'Expeditions',
    tours_subtitle: 'Proprietary routes for the documented and the wild.',
    guides_title: 'Guides',
    guides_subtitle: 'Expert pathfinders in remote logistics and technical survival.',
    testimonials_title: 'Testimonials',
    testimonials_subtitle: 'Verified field documentation from completed missions.',
    faq_title: 'FAQ',
    faq_subtitle: 'Technical guidelines for template utilization.',
    faq_q1: 'Can I use it as a base for my project?',
    faq_a1: 'Yes, absolutely. Feral Sky is distributed under the MIT License, which means you are free to clone, modify, and build upon this architecture for any commercial or personal use-case. Its modular components are designed to be easily re-skinned for different brand identities.',
    faq_q2: 'Where can I get the source code of that template?',
    faq_a2: 'You can get the complete source code of that template from its GitHub repository or SourceForge page. The links to both are present in the "Links" column in the footer below.',
    faq_q3: 'Lorem ipsum?',
    faq_a3: 'Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh.',
    faq_q4: 'Donec quam felis?',
    faq_a4: 'Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Nullam accumsan lorem in dui. Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia.',
    faq_q5: 'Nulla consequat massa quis enim?',
    faq_a5: 'Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris. Praesent adipiscing. Phasellus ullamcorper ipsum rutrum nunc. Nunc nonummy metus. Vestibulum volutpat pretium libero. Cras id dui. Aenean ut eros et nisl sagittis vestibulum. Nullam nulla eros, ultricies sit amet, nonummy id, imperdiet feugiat, pede. Sed lectus. Donec mollis hendrerit risus. Phasellus nec sem in justo pellentesque facilisis. Etiam imperdiet imperdiet orci. Nunc nec neque. Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi.',
    about_title: 'About Us',
    about_subtitle: 'Natural Habitat Adventures Website Template',
    about_desc: MISSION_BRIEF_EN,
    contact_title: 'Contact Us',
    contact_subtitle: "Let's discuss your next trip.",
    contact_success: 'Coordinates Received',
    fee_pp: 'Fee / P.P.',
    phone: 'Phone',
    email: 'Email',
    address_label: 'Address',
    address_line1: '123 Andrew Jackson St.',
    address_line2: 'Dallas, TX 123456',
    address_line3: 'USA',
    label_name: 'Name',
    label_email: 'Email',
    label_mission: 'Message',
    btn_initiate: 'Submit',
    btn_book: 'Book',
    hours_title: 'Working hours',
    hours_sun_thu: 'Sun-Thu: 9AM - 9PM',
    hours_fri: 'Fri: 9AM - 5PM',
    hours_sat: 'Sat: Closed',
    social_x: 'X',
    social_github: 'GitHub',
    social_sourceforge: 'SourceForge',
    credit_inscription: 'Credits',
    close: 'Close',
    ok_inscription: 'OK',
    madeBy: 'Made by',
    using: 'using',
    and: 'and',
    powered_by: 'Powered by',
    nav_header: 'Navigation',
    links_header: 'Links',
    tours: TOURS_EN,
    guides: [
      { name: 'Aviva Mar', designation: 'Wildlife Explorer', quote: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', src: '/aviva-mar.webp' },
      { name: 'Itamar West', designation: 'Experienced Hunter', quote: 'Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.', src: '/itamar-west.webp' },
      { name: 'Maria Weiss', designation: 'Wildlife Guide', quote: 'Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.', src: '/maria-weiss.webp' },
      { name: 'Samuel Franklin', designation: 'Alpine Specialist', quote: 'In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.', src: '/samuel-franklin.webp' }
    ],
    testimonials: [
      { id: 'rep-1', name: 'Naomi Bright', designation: 'Seasoned Traveler', quote: 'Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.', src: '/naomi-bright.webp' },
      { id: 'rep-2', name: 'Talia Lewin', designation: 'Cinematographer', quote: 'Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet.', src: '/talia-lewin.webp' },
      { id: 'rep-3', name: 'Nathan Miller', designation: 'Expedition Member', quote: 'Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.', src: '/nathan-miller.webp' }
    ]
  },
  he: {
    app_name: 'פרל סקיי',
    nav_home: 'בית',
    nav_expeditions: 'משלחות',
    nav_guides: 'מדריכים',
    nav_testimonials: 'המלצות',
    nav_faq: 'שאלות נפוצות',
    nav_about: 'אודותינו',
    hero_title: 'לגלות את הטבע',
    hero_lede: MISSION_BRIEF_HE,
    hero_cta: 'גלה משלחות',
    tours_title: 'משלחות',
    tours_subtitle: 'מסלולים ייחודיים עבור המתועד והפראי.',
    guides_title: 'מדריכים',
    guides_subtitle: 'מומחי ניווט והישרדות טכנית בלוגיסטיקה מרוחקת.',
    testimonials_title: 'המלצות',
    testimonials_subtitle: 'תיעוד שטח מאומת ממשימות שהושלמו.',
    faq_title: 'שאלות נפוצות',
    faq_subtitle: 'הנחיות טכניות לניצול התבנית.',
    faq_q1: 'האם אוכל להשתמש בתבנית כבסיס לפרויקט שלי?',
    faq_a1: 'כן, בהחלט. פרל סקיי מופצת תחת רישיון MIT, מה שאומר שאתה חופשי לשכפל, לשנות ולבנות על בסיס ארכיטקטורה זו לכל שימוש מסחרי או אישי. הרכיבים המודולריים שלה תוכננו כך שיהיה קל להתאימם לזהויות מותג שונות.',
    faq_q2: 'היכן אוכל למצוא את קוד המקור של התבנית?',
    faq_a2: 'ניתן לקבל את קוד המקור המלא של תבנית זו ממאגר ה-GitHub או מדף ה-SourceForge שלה. הקישורים לשניהם מופיעים בעמודת "Links" בתחתית העמוד.',
    faq_q3: 'לורם איפסום?',
    faq_a3: 'לורם איפסום דולור סיט אמט, קונסקטטור אדיפיסקינג אלית. מאצנס נק אודיו אט אנטה טינסידונט טמפוס. דונק ויטה סאפיין אוט ליברו ווננאטיס פאוסיבוס. נולאם קוויס אנטה. אטיאם סיט אמט אורקי אגט ארוס פאוסיבוס טינסידונט. דואיס ליאו. סד פרינגילה מאוריס סיט אמט ניבה.',
    faq_q4: 'דונק קוואם פליס?',
    faq_a4: 'דונק סודאלס סגיטיס מאגנה. סד קונסקוואט, ליאו אגט ביבנדום סודאלס, אוגואה וליט קורסוס נונק, קוויס גרווידה מאגנה מי א ליברו. פוסקה וולפוטאטה אלפנד סאפיין. וסטיבולום פורוס קוואם, סקלריסקה אוט, מוליס סד, נונומי איד, מטוסי. נולאם אקומסן לורם אין דואי. קראס אולטריסיס מי אוט טורפיס הנדריט פרינגילה. וסטיבולום אנטה איפסום פרימיס אין פאוסיבוס אורקי לוקטוס אט אולטריסס פוסוארה קוביליה קוראה; אין אק דואי קוויס מי קונסקטטור לסיניה.',
    faq_q5: 'נולא קונסקוואט מאסה קוויס אניס?',
    faq_a5: 'נם פרטיום טורפיס אט ארקו. דואיס ארקו טורטור, סוסקיפיט אגט, אימפרדיט נק, אימפרדיט יאקוליס, איפסום. סד אליקוואם אולטריסיס מאוריס. אינטגר אנטה ארקו, אקומסן א, קונסקטטור אגט, פוסוארה אוט, מאוריס. פראזנט אדיפיסקינג. פאסלוס אולאמקורפור איפסום רוטרום נונק. נונק נונומי מטוסי. וסטיבולום וולופטאט פרטיום ליברו. קראס איד דואי. אנאיה אוט ארוס אט ניסל סגיטיס וסטיבולום. נולאם נולא ארוס, אולטריסיס סיט אמט, נונומי איד, אימפרדיט פאוגיט, פדה. סד לקטוס. דונק מוליס הנדריט ריסוס. פאסלוס נק סם אין יוסטו פלנטסקה פסיליסיס. אטיאם אימפרדיט אימפרדיט אורקי. נונק נק נקווא. פאסלוס ליאו דולור, טמפוס נון, אוקטור אט, הנדריט קוויס, ניסי.',
    about_title: 'אודותינו',
    about_subtitle: 'תבנית אתר Natural Habitat Adventures',
    about_desc: MISSION_BRIEF_HE,
    contact_title: 'צור קשר',
    contact_subtitle: "בואו נדבר על הטיול הבא שלכם.",
    contact_success: 'הקואורדינטות התקבלו',
    fee_pp: 'דמי השתתפות / לאדם',
    phone: 'טלפון',
    email: 'אימייל',
    address_label: 'כתובת',
    address_line1: 'אנדרו ג׳קסון 123',
    address_line2: 'דאלאס, טקסס 123456',
    address_line3: 'ארצות הברית',
    label_name: 'שם',
    label_email: 'אימייל',
    label_mission: 'הודעה',
    btn_initiate: 'שלח',
    btn_book: 'הזמן',
    hours_title: 'שעות פעילות',
    hours_sun_thu: 'ראשון - חמישי: 9 לפ׳ - 9 אח׳',
    hours_fri: 'שישי: 9 לפ׳ - 5 אח׳',
    hours_sat: 'שבת: סגור',
    social_x: 'X',
    social_github: 'GitHub',
    social_sourceforge: 'SourceForge',
    credit_inscription: 'קרדיטים',
    close: 'סגור',
    ok_inscription: 'אוקיי',
    madeBy: 'נוצר על ידי',
    using: 'באמצעות',
    and: 'ו',
    powered_by: 'נתמך על ידי',
    nav_header: 'ניווט',
    links_header: 'קישורים',
    tours: TOURS_HE,
    guides: [
      { name: 'אביבה מר', designation: 'סיירת חיי בר', quote: 'לורם איפסום דולור סיט אמט, קונסקטטור אדיפיסקינג אלית. אנאיה קומודו ליגולה אגט דולור. אנאיה מאסה. קום סוסייס נאטוקו פנאטיבוס אט מאגניס דיס פרטוריינט מונטס, נסקטור רידיקולוס מוס.', src: '/aviva-mar.webp' },
      { name: 'איתמר ווסט', designation: 'צייד מנוסה', quote: 'דונק קוואם פליס, אולטריסיס נק, פלנטסקה אי-או, פרטיום קוויס, סם.', src: '/itamar-west.webp' },
      { name: 'מריה וייס', designation: 'מדריכת חיי בר', quote: 'נולא קונסקוואט מאסה קוויס אניס. דונק פדה יוסטו, פרינגילה וול, אליקוואט נק, וולפוטאטה אגט, ארקו.', src: '/maria-weiss.webp' },
      { name: 'סמואל פרנקלין', designation: 'מומחה אלפיני', quote: 'אין אניס יוסטו, רונקוס אוט, אימפרדיט א, ווננאטיס ויטה, יוסטו. נולאם דיקטום פליס אי-או פדה מוליס פרטיום. אינטגר טינסידונט. קראס דאפיבוס. ויוואמוס אלמנטום סמפר ניסי. אנאיה וולפוטאטה אלפנד טלוס.', src: '/samuel-franklin.webp' }
    ],
    testimonials: [
      { id: 'rep-1', name: 'נעמי ברייט', designation: 'מטיילת מנוסה', quote: 'אנאיה ליאו ליגולה, פורטיטור אי-או, קונסקוואט ויטה, אלפנד אק, אניס. אליקוואם לורם אנטה, דאפיבוס אין, ויווארה קוויס, פאוגיט א, טלוס.', src: '/naomi-bright.webp' },
      { id: 'rep-2', name: 'טליה לוין', designation: 'צלמת קולנוע', quote: 'פאסלוס ויווארה נולא אוט מטוסי ואריוס לאורט. קוויסקה רוטרום. אנאיה אימפרדיט.', src: '/talia-lewin.webp' },
      { id: 'rep-3', name: 'נתן מילר', designation: 'חבר משלחת', quote: 'אטיאם אולטריסיס ניסי וול אוגואה. קוראביטור אולאמקורפור אולטריסיס ניסי. נם אגט דואי. אטיאם רונקוס. מאצנס טמפוס, טלוס אגט קונדימנטום רונקוס, סם קוואם סמפר ליברו, לורם איפסום דולור סיט אמט.', src: '/nathan-miller.webp' }
    ]
  },
  it: {
    app_name: 'Feral Sky',
    nav_home: 'Home',
    nav_expeditions: 'Spedizioni',
    nav_guides: 'Guide',
    nav_testimonials: 'Testimonianze',
    nav_faq: 'FAQ',
    nav_about: 'Chi Siamo',
    hero_title: 'Esplora la natura',
    hero_lede: MISSION_BRIEF_IT,
    hero_cta: 'Scopri Spedizioni',
    tours_title: 'Spedizioni',
    tours_subtitle: 'Percorsi proprietari per il documentato e il selvaggio.',
    guides_title: 'Guide',
    guides_subtitle: 'Esperti cercatori di percorsi in logistica remota e sopravvivenza tecnica.',
    testimonials_title: 'Testimonianze',
    testimonials_subtitle: 'Documentazione verificata da missioni completate.',
    faq_title: 'FAQ',
    faq_subtitle: 'Linee guida tecniche per l\'utilizzo del template.',
    faq_q1: 'Can I use it as a base for my project?',
    faq_a1: 'Yes, absolutely. Feral Sky is distributed under the MIT License, which means you are free to clone, modify, and build upon this architecture for any commercial or personal use-case. I suoi componenti modulari sono progettati per essere facilmente personalizzati per diverse identità di marca.',
    faq_q2: 'Where can I get the source code of that template?',
    faq_a2: 'You can get the complete source code of that template from its GitHub repository or SourceForge page. The links to both are present in the "Links" column nel footer qui sotto.',
    faq_q3: 'Lorem ipsum?',
    faq_a3: 'Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh.',
    faq_q4: 'Donec quam felis?',
    faq_a4: 'Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Nullam accumsan lorem in dui. Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia.',
    faq_q5: 'Nulla consequat massa quis enim?',
    faq_a5: 'Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris. Praesent adipiscing. Phasellus ullamcorper ipsum rutrum nunc. Nunc nonummy metus. Vestibulum volutpat pretium libero. Cras id dui. Aenean ut eros et nisl sagittis vestibulum. Nullam nulla eros, ultricies sit amet, nonummy id, imperdiet feugiat, pede. Sed lectus. Donec mollis hendrerit risus. Phasellus nec sem in justo pillentesque facilisis. Etiam imperdiet imperdiet orci. Nunc nec neque. Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi.',
    about_title: 'Chi Siamo',
    about_subtitle: 'Template per Natural Habitat Adventures',
    about_desc: MISSION_BRIEF_IT,
    contact_title: 'Contattaci',
    contact_subtitle: "Parliamo del vostro prossimo viaggio.",
    contact_success: 'Richiesta Ricevuta',
    fee_pp: 'Quota / P.P.',
    phone: 'Telefono',
    email: 'E-mail',
    address_label: 'Indirizzo',
    address_line1: '123 Andrew Jackson St.',
    address_line2: 'Dallas, TX 123456',
    address_line3: 'Stati Uniti',
    label_name: 'Nome',
    label_email: 'E-mail',
    label_mission: 'Messaggio',
    btn_initiate: 'Invia',
    btn_book: 'Prenota',
    hours_title: 'Orari di lavoro',
    hours_sun_thu: 'Dom-Gio: 9AM - 9PM',
    hours_fri: 'Ven: 9AM - 5PM',
    hours_sat: 'Sab: Chiuso',
    social_x: 'X',
    social_github: 'GitHub',
    social_sourceforge: 'SourceForge',
    credit_inscription: 'Crediti',
    close: 'Chiudi',
    ok_inscription: 'OK',
    madeBy: 'Creato da',
    using: 'usando',
    and: 'e',
    powered_by: 'Sviluppato con',
    nav_header: 'Navigation',
    links_header: 'Links',
    tours: TOURS_IT,
    guides: [
      { name: 'Aviva Mar', designation: 'Esploratrice della fauna selvatica', quote: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', src: '/aviva-mar.webp' },
      { name: 'Itamar West', designation: 'Cacciatore esperto', quote: 'Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.', src: '/itamar-west.webp' },
      { name: 'Maria Weiss', designation: 'Guida naturalistica', quote: 'Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.', src: '/maria-weiss.webp' },
      { name: 'Samuel Franklin', designation: 'Specialista alpino', quote: 'In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.', src: '/samuel-franklin.webp' }
    ],
    testimonials: [
      { id: 'rep-1', name: 'Naomi Bright', designation: 'Viaggiatrice Esperta', quote: 'Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.', src: '/naomi-bright.webp' },
      { id: 'rep-2', name: 'Talia Lewin', designation: 'Direttore della Fotografia', quote: 'Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet.', src: '/talia-lewin.webp' },
      { id: 'rep-3', name: 'Nathan Miller', designation: 'Membro Spedizione', quote: 'Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.', src: '/nathan-miller.webp' }
    ]
  }
};

export const getDictionary = async (lang: string): Promise<Dictionary> => {
  return translations[lang as Locale] || translations.en;
};