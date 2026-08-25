ierPrefix!==void 0&&(c=t.identifierPrefix),t.onUncaughtError!==void 0&&(l=t.onUncaughtError),t.onCaughtError!==void 0&&(h=t.onCaughtError),t.onRecoverableError!==void 0&&(y=t.onRecoverableError)),t=eH(e,1,!1,null,null,a,c,null,l,h,y,hH),e[$a]=t.current,YA(e),new yI(t)},S0.hydrateRoot=function(e,t,a){if(!u(e))throw Error(r(299));var c=!1,l="",h=g$,y=v$,v=b$,N=null;return a!=null&&(a.unstable_strictMode===!0&&(c=!0),a.identifierPrefix!==void 0&&(l=a.identifierPrefix),a.onUncaughtError!==void 0&&(h=a.onUncaughtError),a.onCaughtError!==void 0&&(y=a.onCaughtError),a.onRecoverableError!==void 0&&(v=a.onRecoverableError),a.formState!==void 0&&(N=a.formState)),t=eH(e,1,!0,t,a??null,c,l,N,h,y,v,hH),t.context=tH(null),a=t.current,c=ia(),c=P1(c),l=r1(c),l.callback=null,d1(a,l,c),a=c,t.current.lanes=a,bn(t,a),on(t),e[$a]=t.current,YA(e),new vd(t)},S0.version="19.2.8",S0}var MH;function jE(){if(MH)return xI.exports;MH=1;function o(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(o)}catch(i){console.error(i)}}return o(),xI.exports=NE(),xI.exports}var LE=jE();const SE=[{id:"restaurants",label:"مطاعم وجبات",icon:"Utensils"},{id:"supermarkets",label:"سوبرماركت",icon:"ShoppingBag"},{id:"pharmacies",label:"صيدليات",icon:"Pill"},{id:"vegetables",label:"خضار وفواكه",icon:"Leaf"},{id:"sweets",label:"حلويات ومعجنات",icon:"CakeSlice"},{id:"doctors",label:"عيادات وأطباء",icon:"Stethoscope"},{id:"crafts",label:"مهن وصيانة",icon:"Wrench"},{id:"drivers",label:"خدمات وسائقين",icon:"Car"}],T1=[{id:"center",name:"Center Circle",x:50,y:50,type:"intersection",arabicName:"دوار الساعة (وسط البلد)"},{id:"north_junction",name:"North Junction",x:50,y:20,type:"intersection",arabicName:"تقاطع الشمال"},{id:"south_junction",name:"South Junction",x:50,y:80,type:"intersection",arabicName:"تقاطع الجنوب"},{id:"east_junction",name:"East Junction",x:80,y:50,type:"intersection",arabicName:"مفرق الشرق"},{id:"west_junction",name:"West Junction",x:20,y:50,type:"intersection",arabicName:"مستودع الغرب"},{id:"store_yasmin",name:"Al-Yasmin Restaurant",x:35,y:30,type:"store",arabicName:"مطعم الياسمين الدمشقي"},{id:"store_baraka",name:"Al-Baraka Supermarket",x:65,y:35,type:"store",arabicName:"سوبرماركت البركة للغذاء"},{id:"store_shifa",name:"Al-Shifa Pharmacy",x:25,y:65,type:"store",arabicName:"صيدلية الشفاء المركزية"},{id:"store_elite",name:"Elite Fruits & Veg",x:75,y:65,type:"store",arabicName:"خضروات وفواكه النخبة"},{id:"store_baghdad",name:"Baghdad Sweets",x:45,y:45,type:"store",arabicName:"حلويات بغداد الشرقية"},{id:"store_pizza",name:"Village Pizza",x:55,y:25,type:"store",arabicName:"مطعم بيتزا الضيعة"},{id:"landmark_mosque",name:"Grand Mosque",x:15,y:15,type:"landmark",arabicName:"مسجد الروضة الكبير"},{id:"landmark_school",name:"High School",x:85,y:15,type:"landmark",arabicName:"مدرسة المتفوقين الثانوية"},{id:"landmark_clinic",name:"Health Clinic",x:15,y:85,type:"landmark",arabicName:"مستوصف القرية الصحي"},{id:"landmark_municipality",name:"Town Hall",x:85,y:85,type:"landmark",arabicName:"ساحة البلدية والديوان"},{id:"landmark_jasmine_complex",name:"Jasmine Complex",x:48,y:70,type:"landmark",arabicName:"مجمع الياسمين السكني"}],OV=[{id:"store_yasmin",name:"مطعم الياسمين الدمشقي",category:"restaurants",image:"https://images.unsplash.com/photo-1561651823-34feb02250e4?w=500&auto=format&fit=crop&q=60",rating:4.8,deliveryTime:"20-30 دقيقة",deliveryFee:5,locationNode:"store_yasmin",featuredProduct:"شاورما دجاج سوبر محمرة"},{id:"store_pizza",name:"مطعم بيتزا الضيعة",category:"restaurants",image:"https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=60",rating:4.6,deliveryTime:"25-35 دقيقة",deliveryFee:6,locationNode:"store_pizza",featuredProduct:"بيتزا نابوليتانا بالفرن العربي"},{id:"store_baraka",name:"سوبرماركت البركة للغذاء",category:"supermarkets",image:"https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=500&auto=format&fit=crop&q=60",rating:4.9,deliveryTime:"15-25 دقيقة",deliveryFee:4,locationNode:"store_baraka",featuredProduct:"سلة تموين العائلة الأسبوعية"},{id:"store_shifa",name:"صيدلية الشفاء المركزية",category:"pharmacies",image:"https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=500&auto=format&fit=crop&q=60",rating:4.7,deliveryTime:"10-20 دقيقة",deliveryFee:5,locationNode:"store_shifa",featuredProduct:"جهاز فحص السكر الذكي"},{id:"store_elite",name:"خضروات وفواكه النخبة",category:"vegetables",image:"https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop&q=60",rating:4.5,deliveryTime:"15-30 دقيقة",deliveryFee:4,locationNode:"store_elite",featuredProduct:"صندوق فواكه الموسم المشكلة"},{id:"store_baghdad",name:"حلويات بغداد الشرقية",category:"sweets",image:"https://images.unsplash.com/photo-1508737027454-e6454ef45afd?w=500&auto=format&fit=crop&q=60",rating:4.9,deliveryTime:"20-30 دقيقة",deliveryFee:6,locationNode:"store_baghdad",featuredProduct:"كنافة نابلسية بالجبن البلدي فاخرة"},{id:"service_clinic",name:"عيادة د. سمير للأطفال",category:"doctors",image:"https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=500&auto=format&fit=crop&q=60",rating:4.9,deliveryTime:"حجز موعد",deliveryFee:0,locationNode:"landmark_jasmine_complex",featuredProduct:"معاينة طبية ومتابعة صحية",contactPhone:"0933445566"},{id:"service_blacksmith",name:"ورشة حدادة أبو علي",category:"crafts",image:"https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=500&auto=format&fit=crop&q=60",rating:4.8,deliveryTime:"اتصال فوري",deliveryFee:0,locationNode:"center",featuredProduct:"صيانة وتركيب أبواب حديدية",contactPhone:"0944112233"},{id:"service_painter",name:"دهان وصيانة أبو أحمد",category:"crafts",image:"https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=500&auto=format&fit=crop&q=60",rating:4.7,deliveryTime:"تواصل مباشر",deliveryFee:0,locationNode:"center",featuredProduct:"دهانات وديكورات داخلية وخارجية",contactPhone:"0955667788"},{id:"service_taxi",name:"كابتن تيسير للتوصيل الخاص",category:"drivers",image:"https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=500&auto=format&fit=crop&q=60",rating:4.9,deliveryTime:"طلب فوري",deliveryFee:0,locationNode:"center",featuredProduct:"توصيل ركاب ورحلات خارجية",contactPhone:"0966778899"}],dq=[{id:"p_yasmin_1",name:"شاورما دجاج سوبر محمرة",price:18,unit:"وجبة",stock:15,description:"شاورما دجاج بخبز الصاج المحمص مع الثومية المميزة والبطاطا والمخلل.",image:"https://images.unsplash.com/photo-1561651823-34feb02250e4?w=400&auto=format&fit=crop&q=60",category:"restaurants",storeId:"store_yasmin"},{id:"p_yasmin_2",name:"وجبة فروج بروستد عائلي (4 قطع)",price:38,unit:"وجبة عائلية",stock:3,description:"نصف فروج بروستد مقرمش، بطاطا مقلية، كريم الثوم، مخلل، وخبز دافئ.",image:"https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&auto=format&fit=crop&q=60",category:"restaurants",storeId:"store_yasmin",isOffer:!0,originalPrice:48,offerLabel:"خصم 20%"},{id:"p_yasmin_3",name:"ساندويش شاورما عربي دبل",price:24,unit:"وجبة",stock:8,description:"سندويشين شاورما مقطعين مع صحن بطاطا، ثومية، ومخلل مشكل.",image:"https://images.unsplash.com/photo-1626700051175-6518c4793f4f?w=400&auto=format&fit=crop&q=60",category:"restaurants",storeId:"store_yasmin"},{id:"p_pizza_1",name:"بيتزا نابوليتانا بالفرن العربي",price:22,unit:"حبة",stock:20,description:"صلصة طماطم بلدي، جبنة موزاريلا طازجة، ريحان بري، زيت زيتون بكر.",image:"https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&auto=format&fit=crop&q=60",category:"restaurants",storeId:"store_pizza",sizes:[{name:"صغيرة",price:15},{name:"وسط",price:22},{name:"كبيرة",price:28}],additions:[{name:"جبنة موزاريلا إضافية",price:4},{name:"زيتون أسود وأخضر",price:2},{name:"فطر بري طازج",price:3},{name:"قطع دجاج مشوية",price:5}]},{id:"p_pizza_2",name:"بيتزا دجاج باربكيو وسط",price:26,unit:"حبة",stock:12,description:"شرائح دجاج مشوية، بصل أحمر، فلفل أخضر، جبنة غنية مع صوص الباربكيو المدخن.",image:"https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&auto=format&fit=crop&q=60",category:"restaurants",storeId:"store_pizza",sizes:[{name:"وسط",price:26},{name:"كبيرة عائلية",price:34}],additions:[{name:"صلصة باربكيو إضافية",price:2},{name:"جبنة موزاريلا إضافية",price:4},{name:"فلفل حار (سبايسي)",price:1}]},{id:"p_pizza_3",name:"عرض التوفير: 2 بيتزا عائلية + لتر بيبسي",price:45,unit:"عرض عائلي",stock:2,description:"اختر أي نوعين من البيتزا العائلية واستمتع بلتر بيبسي مجاناً.",image:"https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=400&auto=format&fit=crop&q=60",category:"restaurants",storeId:"store_pizza",isOffer:!0,originalPrice:60,offerLabel:"عائلي مميز"},{id:"p_baraka_1",name:"سلة تموين العائلة الأسبوعية",price:75,unit:"سلة تموينية",stock:5,description:"أرز بسمتي 5كج، سكر 5كج، زيت نباتي 3 لتر، شاي لبتون، ومعكرونة.",image:"https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&auto=format&fit=crop&q=60",category:"supermarkets",storeId:"store_baraka",isOffer:!0,originalPrice:90,offerLabel:"أقوى توفير"},{id:"p_baraka_2",name:"طبق بيض بلدي طازج (30 بيضة)",price:14,unit:"طبق (30 بيضة)",stock:18,description:"بيض بلدي من مزارع القرية المحلية طازج ومغذي.",image:"https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=400&auto=format&fit=crop&q=60",category:"supermarkets",storeId:"store_baraka"},{id:"p_baraka_3",name:"زيت زيتون بكر ممتاز عصارة أولى (1 لتر)",price:25,unit:"لتر",stock:10,description:"من معاصر جبال المحافظة، نقي 100% وطعم بلدي غني.",image:"https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&auto=format&fit=crop&q=60",category:"supermarkets",storeId:"store_baraka"},{id:"p_shifa_1",name:"جهاز فحص السكر الذكي OneTouch",price:85,unit:"جهاز",stock:4,description:"جهاز فحص سكر الدم سريع ودقيق مع 10 شرائح فحص مجانية.",image:"https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400&auto=format&fit=crop&q=60",category:"pharmacies",storeId:"store_shifa"},{id:"p_shifa_2",name:"علبة كمامات طبي 3 طبقات (50 قطعة)",price:5,unit:"علبة (50 قطعة)",stock:25,description:"كمامات طبية عالية الجودة حماية ممتازة ومريحة في الاستخدام التنفسي.",image:"https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&auto=format&fit=crop&q=60",category:"pharmacies",storeId:"store_shifa",isOffer:!0,originalPrice:10,offerLabel:"عرض نصف السعر"},{id:"p_shifa_3",name:"فيتامين سي 1000 ملغ فوار (20 قرص)",price:8,unit:"علبة (20 قرص)",stock:7,description:"مكمل غذائي بنكهة البرتقال لتعزيز المناعة والصحة العامة.",image:"https://images.unsplash.com/photo-1616679911721-fe6eec14f7d9?w=400&auto=format&fit=crop&q=60",category:"pharmacies",storeId:"store_shifa"},{id:"p_elite_1",name:"صندوق فواكه الموسم المشكلة (5 كج)",price:22,unit:"صندوق (5 كغ)",stock:3,description:"تشكيلة طازجة تضم التفاح، الموز، البرتقال، الخوخ، والعنب حسب الموسم.",image:"https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=400&auto=format&fit=crop&q=60",category:"vegetables",storeId:"store_elite",isOffer:!0,originalPrice:30,offerLabel:"عرض الحصاد"},{id:"p_elite_2",name:"سلة الخضار الأساسية للطبخ (7 كج)",price:18,unit:"سلة (7 كغ)",stock:9,description:"بطاطا، بصل، طماطم، خيار، كوسا، جزر، فلفل أخضر بارد طازج ونظيف.",image:"https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&auto=format&fit=crop&q=60",category:"vegetables",storeId:"store_elite"},{id:"p_sweets_1",name:"كنافة نابلسية بالجبن البلدي فاخرة (1 كج)",price:32,unit:"كغ",stock:6,description:"كنافة نابلسية خشنة أو ناعمة بالجبن العكاوي البلدي، غنية بالسمن والقطر.",image:"https://images.unsplash.com/photo-1508737027454-e6454ef45afd?w=400&auto=format&fit=crop&q=60",category:"sweets",storeId:"store_baghdad"},{id:"p_sweets_2",name:"كيلو مشكل بقلاوة بالفستق والحلبي",price:55,unit:"كغ",stock:4,description:"تشكيلة فاخرة من أصابع، عش البلبل، وبول الجمل الغنية بالفستق الحلبي والسمن البلدي.",image:"https://images.unsplash.com/photo-1519676867240-f03562e64548?w=400&auto=format&fit=crop&q=60",category:"sweets",storeId:"store_baghdad",isOffer:!0,originalPrice:65,offerLabel:"ضيافة الأعياد"}],CE=dq.filter(o=>o.isOffer);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const AE=o=>o.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),IE=o=>o.replace(/^([A-Z])|[\s-_]+(\w)/g,(i,d,r)=>r?r.toUpperCase():d.toLowerCase()),wH=o=>{const i=IE(o);return i.charAt(0).toUpperCase()+i.slice(1)},PV=(...o)=>o.filter((i,d,r)=>!!i&&i.trim()!==""&&r.indexOf(i)===d).join(" ").trim(),qE=o=>{for(const i in o)if(i.startsWith("aria-")||i==="role"||i==="title")return!0};/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var zE={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const UV=_.forwardRef(({color:o="currentColor",size:i=24,strokeWidth:d=2,absoluteStrokeWidth:r,className:u="",children:f,iconNode:p,...m},g)=>_.createElement("svg",{ref:g,...zE,width:i,height:i,stroke:o,strokeWidth:r?Number(d)*24/Number(i):d,className:PV("lucide",u),...!f&&!qE(m)&&{"aria-hidden":"true"},...m},[...p.map(([x,b])=>_.createElement(x,b)),...Array.isArray(f)?f:[f]]));/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const s=(o,i)=>{const d=_.forwardRef(({className:r,...u},f)=>_.createElement(UV,{ref:f,iconNode:i,className:PV(`lucide-${AE(wH(o))}`,`lucide-${o}`,r),...u}));return d.displayName=wH(o),d};/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $E=[["path",{d:"m14 12 4 4 4-4",key:"buelq4"}],["path",{d:"M18 16V7",key:"ty0viw"}],["path",{d:"m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16",key:"d5nyq2"}],["path",{d:"M3.304 13h6.392",key:"1q3zxz"}]],Sd=s("a-arrow-down",$E);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const TE=[["path",{d:"m14 11 4-4 4 4",key:"1pu57t"}],["path",{d:"M18 16V7",key:"ty0viw"}],["path",{d:"m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16",key:"d5nyq2"}],["path",{d:"M3.304 13h6.392",key:"1q3zxz"}]],Cd=s("a-arrow-up",TE);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const HE=[["path",{d:"m15 16 2.536-7.328a1.02 1.02 1 0 1 1.928 0L22 16",key:"xik6mr"}],["path",{d:"M15.697 14h5.606",key:"1stdlc"}],["path",{d:"m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16",key:"d5nyq2"}],["path",{d:"M3.304 13h6.392",key:"1q3zxz"}]],Ad=s("a-large-small",HE);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const VE=[["circle",{cx:"16",cy:"4",r:"1",key:"1grugj"}],["path",{d:"m18 19 1-7-6 1",key:"r0i19z"}],["path",{d:"m5 8 3-3 5.5 3-2.36 3.5",key:"9ptxx2"}],["path",{d:"M4.24 14.5a5 5 0 0 0 6.88 6",key:"10kmtu"}],["path",{d:"M13.76 17.5a5 5 0 0 0-6.88-6",key:"2qq6rc"}]],Id=s("accessibility",VE);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const DE=[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",key:"169zse"}]],qd=s("activity",DE);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const RE=[["path",{d:"M18 17.5a2.5 2.5 0 1 1-4 2.03V12",key:"yd12zl"}],["path",{d:"M6 12H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",key:"larmp2"}],["path",{d:"M6 8h12",key:"6g4wlu"}],["path",{d:"M6.6 15.572A2 2 0 1 0 10 17v-5",key:"1x1kqn"}]],zd=s("air-vent",RE);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const BE=[["path",{d:"M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1",key:"ns4c3b"}],["path",{d:"m12 15 5 6H7Z",key:"14qnn2"}]],$d=s("airplay",BE);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const EE=[["circle",{cx:"12",cy:"13",r:"8",key:"3y4lt7"}],["path",{d:"M5 3 2 6",key:"18tl5t"}],["path",{d:"m22 6-3-3",key:"1opdir"}],["path",{d:"M6.38 18.7 4 21",key:"17xu3x"}],["path",{d:"M17.64 18.67 20 21",key:"kv2oe2"}],["path",{d:"m9 13 2 2 4-4",key:"6343dt"}]],ko=s("alarm-clock-check",EE);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const OE=[["circle",{cx:"12",cy:"13",r:"8",key:"3y4lt7"}],["path",{d:"M5 3 2 6",key:"18tl5t"}],["path",{d:"m22 6-3-3",key:"1opdir"}],["path",{d:"M6.38 18.7 4 21",key:"17xu3x"}],["path",{d:"M17.64 18.67 20 21",key:"kv2oe2"}],["path",{d:"M9 13h6",key:"1uhe8q"}]],go=s("alarm-clock-minus",OE);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const PE=[["path",{d:"M6.87 6.87a8 8 0 1 0 11.26 11.26",key:"3on8tj"}],["path",{d:"M19.9 14.25a8 8 0 0 0-9.15-9.15",key:"15ghsc"}],["path",{d:"m22 6-3-3",key:"1opdir"}],["path",{d:"M6.26 18.67 4 21",key:"yzmioq"}],["path",{d:"m2 2 20 20",key:"1ooewy"}],["path",{d:"M4 4 2 6",key:"1ycko6"}]],Td=s("alarm-clock-off",PE);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const UE=[["circle",{cx:"12",cy:"13",r:"8",key:"3y4lt7"}],["path",{d:"M5 3 2 6",key:"18tl5t"}],["path",{d:"m22 6-3-3",key:"1opdir"}],["path",{d:"M6.38 18.7 4 21",key:"17xu3x"}],["path",{d:"M17.64 18.67 20 21",key:"kv2oe2"}],["path",{d:"M12 10v6",key:"1bos4e"}],["path",{d:"M9 13h6",key:"1uhe8q"}]],vo=s("alarm-clock-plus",UE);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const FE=[["circle",{cx:"12",cy:"13",r:"8",key:"3y4lt7"}],["path",{d:"M12 9v4l2 2",key:"1c63tq"}],["path",{d:"M5 3 2 6",key:"18tl5t"}],["path",{d:"m22 6-3-3",key:"1opdir"}],["path",{d:"M6.38 18.7 4 21",key:"17xu3x"}],["path",{d:"M17.64 18.67 20 21",key:"kv2oe2"}]],Hd=s("alarm-clock",FE);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const GE=[["path",{d:"M11 21c0-2.5 2-2.5 2-5",key:"1sicvv"}],["path",{d:"M16 21c0-2.5 2-2.5 2-5",key:"1o3eny"}],["path",{d:"m19 8-.8 3a1.25 1.25 0 0 1-1.2 1H7a1.25 1.25 0 0 1-1.2-1L5 8",key:"1bvca4"}],["path",{d:"M21 3a1 1 0 0 1 1 1v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a1 1 0 0 1 1-1z",key:"x3qr1j"}],["path",{d:"M6 21c0-2.5 2-2.5 2-5",key:"i3w1gp"}]],Vd=s("alarm-smoke",GE);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ZE=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["polyline",{points:"11 3 11 11 14 8 17 11 17 3",key:"1wcwz3"}]],Dd=s("album",ZE);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const XE=[["path",{d:"M2 12h20",key:"9i4pu4"}],["path",{d:"M10 16v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4",key:"11f1s0"}],["path",{d:"M10 8V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v4",key:"t14dx9"}],["path",{d:"M20 16v1a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-1",key:"1w07xs"}],["path",{d:"M14 8V7c0-1.1.9-2 2-2h2a2 2 0 0 1 2 2v1",key:"1apec2"}]],Rd=s("align-center-horizontal",XE);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const YE=[["path",{d:"M12 2v20",key:"t6zp3m"}],["path",{d:"M8 10H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h4",key:"14d6g8"}],["path",{d:"M16 10h4a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-4",key:"1e2lrw"}],["path",{d:"M8 20H7a2 2 0 0 1-2-2v-2c0-1.1.9-2 2-2h1",key:"1fkdwx"}],["path",{d:"M16 14h1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-1",key:"1euafb"}]],Bd=s("align-center-vertical",YE);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const KE=[["rect",{width:"6",height:"16",x:"4",y:"2",rx:"2",key:"z5wdxg"}],["rect",{width:"6",height:"9",x:"14",y:"9",rx:"2",key:"um7a8w"}],["path",{d:"M22 22H2",key:"19qnx5"}]],Ed=s("align-end-horizontal",KE);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const QE=[["rect",{width:"16",height:"6",x:"2",y:"4",rx:"2",key:"10wcwx"}],["rect",{width:"9",height:"6",x:"9",y:"14",rx:"2",key:"4p5bwg"}],["path",{d:"M22 22V2",key:"12ipfv"}]],Od=s("align-end-vertical",QE);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const WE=[["rect",{width:"6",height:"14",x:"4",y:"5",rx:"2",key:"1wwnby"}],["rect",{width:"6",height:"10",x:"14",y:"7",rx:"2",key:"1fe6j6"}],["path",{d:"M17 22v-5",key:"4b6g73"}],["path",{d:"M17 7V2",key:"hnrr36"}],["path",{d:"M7 22v-3",key:"1r4jpn"}],["path",{d:"M7 5V2",key:"liy1u9"}]],Pd=s("align-horizontal-distribute-center",WE);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const JE=[["rect",{width:"6",height:"14",x:"4",y:"5",rx:"2",key:"1wwnby"}],["rect",{width:"6",height:"10",x:"14",y:"7",rx:"2",key:"1fe6j6"}],["path",{d:"M10 2v20",key:"uyc634"}],["path",{d:"M20 2v20",key:"1tx262"}]],Ud=s("align-horizontal-distribute-end",JE);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const eO=[["rect",{width:"6",height:"14",x:"4",y:"5",rx:"2",key:"1wwnby"}],["rect",{width:"6",height:"10",x:"14",y:"7",rx:"2",key:"1fe6j6"}],["path",{d:"M4 2v20",key:"gtpd5x"}],["path",{d:"M14 2v20",key:"tg6bpw"}]],Fd=s("align-horizontal-distribute-start",eO);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tO=[["rect",{width:"6",height:"14",x:"2",y:"5",rx:"2",key:"dy24zr"}],["rect",{width:"6",height:"10",x:"16",y:"7",rx:"2",key:"13zkjt"}],["path",{d:"M12 2v20",key:"t6zp3m"}]],Gd=s("align-horizontal-justify-center",tO);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const aO=[["rect",{width:"6",height:"14",x:"2",y:"5",rx:"2",key:"dy24zr"}],["rect",{width:"6",height:"10",x:"12",y:"7",rx:"2",key:"1ht384"}],["path",{d:"M22 2v20",key:"40qfg1"}]],Zd=s("align-horizontal-justify-end",aO);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nO=[["rect",{width:"6",height:"14",x:"6",y:"5",rx:"2",key:"hsirpf"}],["rect",{width:"6",height:"10",x:"16",y:"7",rx:"2",key:"13zkjt"}],["path",{d:"M2 2v20",key:"1ivd8o"}]],Xd=s("align-horizontal-justify-start",nO);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oO=[["rect",{width:"6",height:"10",x:"9",y:"7",rx:"2",key:"yn7j0q"}],["path",{d:"M4 22V2",key:"tsjzd3"}],["path",{d:"M20 22V2",key:"1bnhr8"}]],Yd=s("align-horizontal-space-around",oO);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sO=[["rect",{width:"6",height:"14",x:"3",y:"5",rx:"2",key:"j77dae"}],["rect",{width:"6",height:"10",x:"15",y:"7",rx:"2",key:"bq30hj"}],["path",{d:"M3 2v20",key:"1d2pfg"}],["path",{d:"M21 2v20",key:"p059bm"}]],Kd=s("align-horizontal-space-between",sO);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cO=[["rect",{width:"6",height:"16",x:"4",y:"6",rx:"2",key:"1n4dg1"}],["rect",{width:"6",height:"9",x:"14",y:"6",rx:"2",key:"17khns"}],["path",{d:"M22 2H2",key:"fhrpnj"}]],Qd=s("align-start-horizontal",cO);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const iO=[["rect",{width:"9",height:"6",x:"6",y:"14",rx:"2",key:"lpm2y7"}],["rect",{width:"16",height:"6",x:"6",y:"4",rx:"2",key:"rdj6ps"}],["path",{d:"M2 2v20",key:"1ivd8o"}]],Wd=s("align-start-vertical",iO);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lO=[["path",{d:"M22 17h-3",key:"1lwga1"}],["path",{d:"M22 7h-5",key:"o2endc"}],["path",{d:"M5 17H2",key:"1gx9xc"}],["path",{d:"M7 7H2",key:"6bq26l"}],["rect",{x:"5",y:"14",width:"14",height:"6",rx:"2",key:"1qrzuf"}],["rect",{x:"7",y:"4",width:"10",height:"6",rx:"2",key:"we8e9z"}]],Jd=s("align-vertical-distribute-center",lO);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rO=[["rect",{width:"14",height:"6",x:"5",y:"14",rx:"2",key:"jmoj9s"}],["rect",{width:"10",height:"6",x:"7",y:"4",rx:"2",key:"aza5on"}],["path",{d:"M2 20h20",key:"owomy5"}],["path",{d:"M2 10h20",key:"1ir3d8"}]],eh=s("align-vertical-distribute-end",rO);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dO=[["rect",{width:"14",height:"6",x:"5",y:"14",rx:"2",key:"jmoj9s"}],["rect",{width:"10",height:"6",x:"7",y:"4",rx:"2",key:"aza5on"}],["path",{d:"M2 14h20",key:"myj16y"}],["path",{d:"M2 4h20",key:"mda7wb"}]],th=s("align-vertical-distribute-start",dO);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hO=[["rect",{width:"14",height:"6",x:"5",y:"16",rx:"2",key:"1i8z2d"}],["rect",{width:"10",height:"6",x:"7",y:"2",rx:"2",key:"ypihtt"}],["path",{d:"M2 12h20",key:"9i4pu4"}]],ah=s("align-vertical-justify-center",hO);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const uO=[["rect",{width:"14",height:"6",x:"5",y:"12",rx:"2",key:"4l4tp2"}],["rect",{width:"10",height:"6",x:"7",y:"2",rx:"2",key:"ypihtt"}],["path",{d:"M2 22h20",key:"272qi7"}]],nh=s("align-vertical-justify-end",uO);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pO=[["rect",{width:"14",height:"6",x:"5",y:"16",rx:"2",key:"1i8z2d"}],["rect",{width:"10",height:"6",x:"7",y:"6",rx:"2",key:"13squh"}],["path",{d:"M2 2h20",key:"1ennik"}]],oh=s("align-vertical-justify-start",pO);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yO=[["rect",{width:"10",height:"6",x:"7",y:"9",rx:"2",key:"b1zbii"}],["path",{d:"M22 20H2",key:"1p1f7z"}],["path",{d:"M22 4H2",key:"1b7qnq"}]],sh=s("align-vertical-space-around",yO);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fO=[["rect",{width:"14",height:"6",x:"5",y:"15",rx:"2",key:"1w91an"}],["rect",{width:"10",height:"6",x:"7",y:"3",rx:"2",key:"17wqzy"}],["path",{d:"M2 21h20",key:"1nyx9w"}],["path",{d:"M2 3h20",key:"91anmk"}]],ch=s("align-vertical-space-between",fO);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mO=[["path",{d:"M10 10H6",key:"1bsnug"}],["path",{d:"M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2",key:"wrbu53"}],["path",{d:"M19 18h2a1 1 0 0 0 1-1v-3.28a1 1 0 0 0-.684-.948l-1.923-.641a1 1 0 0 1-.578-.502l-1.539-3.076A1 1 0 0 0 16.382 8H14",key:"lrkjwd"}],["path",{d:"M8 8v4",key:"1fwk8c"}],["path",{d:"M9 18h6",key:"x1upvd"}],["circle",{cx:"17",cy:"18",r:"2",key:"332jqn"}],["circle",{cx:"7",cy:"18",r:"2",key:"19iecd"}]],ih=s("ambulance",mO);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xO=[["path",{d:"M17.5 12c0 4.4-3.6 8-8 8A4.5 4.5 0 0 1 5 15.5c0-6 8-4 8-8.5a3 3 0 1 0-6 0c0 3 2.5 8.5 12 13",key:"1o9ehi"}],["path",{d:"M16 12h3",key:"4uvgyw"}]],lh=s("ampersand",xO);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kO=[["path",{d:"M10 17c-5-3-7-7-7-9a2 2 0 0 1 4 0c0 2.5-5 2.5-5 6 0 1.7 1.3 3 3 3 2.8 0 5-2.2 5-5",key:"12lh1k"}],["path",{d:"M22 17c-5-3-7-7-7-9a2 2 0 0 1 4 0c0 2.5-5 2.5-5 6 0 1.7 1.3 3 3 3 2.8 0 5-2.2 5-5",key:"173c68"}]],rh=s("ampersands",kO);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gO=[["path",{d:"M10 2v5.632c0 .424-.272.795-.653.982A6 6 0 0 0 6 14c.006 4 3 7 5 8",key:"1h8rid"}],["path",{d:"M10 5H8a2 2 0 0 0 0 4h.68",key:"3ezsi6"}],["path",{d:"M14 2v5.632c0 .424.272.795.652.982A6 6 0 0 1 18 14c0 4-3 7-5 8",key:"yt6q09"}],["path",{d:"M14 5h2a2 2 0 0 1 0 4h-.68",key:"8f95yk"}],["path",{d:"M18 22H6",key:"mg6kv4"}],["path",{d:"M9 2h6",key:"1jrp98"}]],dh=s("amphora",gO);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vO=[["path",{d:"M12 22V8",key:"qkxhtm"}],["path",{d:"M5 12H2a10 10 0 0 0 20 0h-3",key:"1hv3nh"}],["circle",{cx:"12",cy:"5",r:"3",key:"rqqgnr"}]],hh=s("anchor",vO);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bO=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M16 16s-1.5-2-4-2-4 2-4 2",key:"epbg0q"}],["path",{d:"M7.5 8 10 9",key:"olxxln"}],["path",{d:"m14 9 2.5-1",key:"1j6cij"}],["path",{d:"M9 10h.01",key:"qbtxuw"}],["path",{d:"M15 10h.01",key:"1qmjsl"}]],uh=s("angry",bO);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const MO=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M8 15h8",key:"45n4r"}],["path",{d:"M8 9h2",key:"1g203m"}],["path",{d:"M14 9h2",key:"116p9w"}]],ph=s("annoyed",MO);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wO=[["path",{d:"M2 12 7 2",key:"117k30"}],["path",{d:"m7 12 5-10",key:"1tvx22"}],["path",{d:"m12 12 5-10",key:"ev1o1a"}],["path",{d:"m17 12 5-10",key:"1e4ti3"}],["path",{d:"M4.5 7h15",key:"vlsxkz"}],["path",{d:"M12 16v6",key:"c8a4gj"}]],yh=s("antenna",wO);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _O=[["path",{d:"M7 10H6a4 4 0 0 1-4-4 1 1 0 0 1 1-1h4",key:"1hjpb6"}],["path",{d:"M7 5a1 1 0 0 1 1-1h13a1 1 0 0 1 1 1 7 7 0 0 1-7 7H8a1 1 0 0 1-1-1z",key:"1qn45f"}],["path",{d:"M9 12v5",key:"3anwtq"}],["path",{d:"M15 12v5",key:"5xh3zn"}],["path",{d:"M5 20a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3 1 1 0 0 1-1 1H6a1 1 0 0 1-1-1",key:"1fi4x8"}]],fh=s("anvil",_O);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const NO=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m14.31 8 5.74 9.94",key:"1y6ab4"}],["path",{d:"M9.69 8h11.48",key:"1wxppr"}],["path",{d:"m7.38 12 5.74-9.94",key:"1grp0k"}],["path",{d:"M9.69 16 3.95 6.06",key:"libnyf"}],["path",{d:"M14.31 16H2.83",key:"x5fava"}],["path",{d:"m16.62 12-5.74 9.94",key:"1vwawt"}]],mh=s("aperture",NO);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jO=[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"M6 8h.01",key:"x9i8wu"}],["path",{d:"M10 8h.01",key:"1r9ogq"}],["path",{d:"M14 8h.01",key:"1primd"}]],xh=s("app-window-mac",jO);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const LO=[["rect",{x:"2",y:"4",width:"20",height:"16",rx:"2",key:"izxlao"}],["path",{d:"M10 4v4",key:"pp8u80"}],["path",{d:"M2 8h20",key:"d11cs7"}],["path",{d:"M6 4v4",key:"1svtjw"}]],kh=s("app-window",LO);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const SO=[["path",{d:"M12 6.528V3a1 1 0 0 1 1-1h0",key:"11qiee"}],["path",{d:"M18.237 21A15 15 0 0 0 22 11a6 6 0 0 0-10-4.472A6 6 0 0 0 2 11a15.1 15.1 0 0 0 3.763 10 3 3 0 0 0 3.648.648 5.5 5.5 0 0 1 5.178 0A3 3 0 0 0 18.237 21",key:"110c12"}]],gh=s("apple",SO);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const CO=[["rect",{width:"20",height:"5",x:"2",y:"3",rx:"1",key:"1wp1u1"}],["path",{d:"M4 8v11a2 2 0 0 0 2 2h2",key:"tvwodi"}],["path",{d:"M20 8v11a2 2 0 0 1-2 2h-2",key:"1gkqxj"}],["path",{d:"m9 15 3-3 3 3",key:"1pd0qc"}],["path",{d:"M12 12v9",key:"192myk"}]],vh=s("archive-restore",CO);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const AO=[["rect",{width:"20",height:"5",x:"2",y:"3",rx:"1",key:"1wp1u1"}],["path",{d:"M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8",key:"1s80jp"}],["path",{d:"m9.5 17 5-5",key:"nakeu6"}],["path",{d:"m9.5 12 5 5",key:"1hccrj"}]],bh=s("archive-x",AO);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const IO=[["rect",{width:"20",height:"5",x:"2",y:"3",rx:"1",key:"1wp1u1"}],["path",{d:"M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8",key:"1s80jp"}],["path",{d:"M10 12h4",key:"a56b0p"}]],Mh=s("archive",IO);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qO=[["path",{d:"M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3",key:"irtipd"}],["path",{d:"M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z",key:"1qyhux"}],["path",{d:"M5 18v2",key:"ppbyun"}],["path",{d:"M19 18v2",key:"gy7782"}]],wh=s("armchair",qO);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zO=[["path",{d:"M15 11a1 1 0 0 0 1 1h2.939a1 1 0 0 1 .75 1.811l-6.835 6.836a1.207 1.207 0 0 1-1.707 0L4.31 13.81a1 1 0 0 1 .75-1.811H8a1 1 0 0 0 1-1V9a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1z",key:"1hy3w3"}],["path",{d:"M9 4h6",key:"10am2s"}]],_h=s("arrow-big-down-dash",zO);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $O=[["path",{d:"M15 11a1 1 0 0 0 1 1h2.939a1 1 0 0 1 .75 1.811l-6.835 6.836a1.207 1.207 0 0 1-1.707 0L4.31 13.81a1 1 0 0 1 .75-1.811H8a1 1 0 0 0 1-1V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1z",key:"1eaqc3"}]],Nh=s("arrow-big-down",$O);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const TO=[["path",{d:"M13 9a1 1 0 0 1-1-1V5.061a1 1 0 0 0-1.811-.75l-6.835 6.836a1.207 1.207 0 0 0 0 1.707l6.835 6.835a1 1 0 0 0 1.811-.75V16a1 1 0 0 1 1-1h2a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1z",key:"p8w4w5"}],["path",{d:"M20 9v6",key:"14roy0"}]],jh=s("arrow-big-left-dash",TO);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const HO=[["path",{d:"M13 9a1 1 0 0 1-1-1V5.061a1 1 0 0 0-1.811-.75l-6.835 6.836a1.207 1.207 0 0 0 0 1.707l6.835 6.835a1 1 0 0 0 1.811-.75V16a1 1 0 0 1 1-1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1z",key:"aztept"}]],Lh=s("arrow-big-left",HO);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const VO=[["path",{d:"M11 9a1 1 0 0 0 1-1V5.061a1 1 0 0 1 1.811-.75l6.836 6.836a1.207 1.207 0 0 1 0 1.707l-6.836 6.835a1 1 0 0 1-1.811-.75V16a1 1 0 0 0-1-1H9a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1z",key:"67vhrh"}],["path",{d:"M4 9v6",key:"bns7oa"}]],Sh=s("arrow-big-right-dash",VO);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const DO=[["path",{d:"M11 9a1 1 0 0 0 1-1V5.061a1 1 0 0 1 1.811-.75l6.836 6.836a1.207 1.207 0 0 1 0 1.707l-6.836 6.835a1 1 0 0 1-1.811-.75V16a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1z",key:"1232du"}]],Ch=s("arrow-big-right",DO);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const RO=[["path",{d:"M9 13a1 1 0 0 0-1-1H5.061a1 1 0 0 1-.75-1.811l6.836-6.835a1.207 1.207 0 0 1 1.707 0l6.835 6.835a1 1 0 0 1-.75 1.811H16a1 1 0 0 0-1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1z",key:"pnzqmc"}],["path",{d:"M9 20h6",key:"s66wpe"}]],Ah=s("arrow-big-up-dash",RO);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const BO=[["path",{d:"M9 13a1 1 0 0 0-1-1H5.061a1 1 0 0 1-.75-1.811l6.836-6.835a1.207 1.207 0 0 1 1.707 0l6.835 6.835a1 1 0 0 1-.75 1.811H16a1 1 0 0 0-1 1v6a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1z",key:"lh0v7k"}]],Ih=s("arrow-big-up",BO);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const EO=[["path",{d:"m3 16 4 4 4-4",key:"1co6wj"}],["path",{d:"M7 20V4",key:"1yoxec"}],["path",{d:"M17 10V4h-2",key:"zcsr5x"}],["path",{d:"M15 10h4",key:"id2lce"}],["rect",{x:"15",y:"14",width:"4",height:"6",ry:"2",key:"33xykx"}]],qh=s("arrow-down-1-0",EO);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const OO=[["path",{d:"m3 16 4 4 4-4",key:"1co6wj"}],["path",{d:"M7 20V4",key:"1yoxec"}],["rect",{x:"15",y:"4",width:"4",height:"6",ry:"2",key:"1bwicg"}],["path",{d:"M17 20v-6h-2",key:"1qp1so"}],["path",{d:"M15 20h4",key:"1j968p"}]