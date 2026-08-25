function getOrderTypeContext(order) {
  if (!order) {
    return {
      type: "general",
      name: "الطلب",
      categoryName: "المتجر",
      preparingText: "جاري تجهيز وتأمين طلبك بعناية تامة في المتجر ⏳",
      driverAcceptedText: "أبشر يا محترم! قبلت طلبك وأنا متوجه حالياً في طريقي للمتجر لاستلام الأغراض 🏍️.",
      driverPreparingText: "وصلت الآن إلى المتجر وجاري تجهيز ومراجعة محتويات طلبك للتأكد من سلامتها 👍.",
      driverPickedUpText: (l) => `استلمت طلبك من المتجر بحالة ممتازة وجاري التحرك باتجاه موقعك عند (${l}) 🚀.`,
      driverDeliveredText: "الحمد لله، تم تسليم طلبك بنجاح وبحالة ممتازة. شكراً لتعاملك معنا ويسعدنا دائماً خدمتكم 💐.",
      customerPickedUpStatus: "الطلب مع كابتن التوصيل وهو في طريقه إليك الآن!",
      customerPreparingStatus: "طلبك يتم تجهيزه ومراجعته الآن بالمتجر بعناية.",
      customerDeliveredStatus: "تم تسليم الطلب بنجاح. نأمل أن الخدمة نالت رضاك.",
      voicePresetPickedUp: "استلمت طلبك من المتجر بحالة ممتازة وبدأت التحرك إليك",
      hotQueryReply: "أكيد، تم التأكد من جودة الطلب وتأمينه بعناية ليصلك بأفضل حالة."
    };
  }
  
  const storeId = (order.storeId || "").toLowerCase();
  const storeName = (order.storeName || "").toLowerCase();
  const itemsText = (order.items || []).map(it => (it.product && it.product.name ? it.product.name : "")).join(" ").toLowerCase();
  const allText = `${storeId} ${storeName} ${itemsText}`;

  // 1. Gas / Fuel
  if (allText.includes("غاز") || allText.includes("اسطوانة") || allText.includes("أنبوبة") || allText.includes("gas") || allText.includes("محروقات") || allText.includes("بنزين") || allText.includes("مازوت")) {
    return {
      type: "gas",
      name: "أسطوانة الغاز",
      categoryName: "مركز توزيع الغاز",
      preparingText: "يتم الآن فحص وتأمين أسطوانة الغاز والتأكد من سلامة الصمام والأمان في المركز ⏳",
      driverAcceptedText: "أبشر يا محترم! قبلت طلب أسطوانة الغاز وأنا متوجه حالياً لمركز التوزيع لاستلامها 🏍️.",
      driverPreparingText: "وصلت إلى مركز الغاز وجاري استلام وفحص الأسطوانة والتأكد من وزنها وسلامتها 👍.",
      driverPickedUpText: (l) => `استلمت أسطوانة الغاز بحرص وأمان وبدأت التحرك باتجاه موقعك عند (${l}) 🚀.`,
      driverDeliveredText: "تم تسليم أسطوانة الغاز وتفقدها بأمان بحمد الله. شكراً لثقتكم ويسعدنا خدمتكم دائماً! 💐",
      customerPickedUpStatus: "كابتن التوصيل استلم الأسطوانة بحرص وهو في طريقه إليك الآن بأمان!",
      customerPreparingStatus: "جاري فحص وتأمين أسطوانة الغاز والتأكد من سلامتها من المركز.",
      customerDeliveredStatus: "تم تسليم أسطوانة الغاز بنجاح وأمان. نأمل أن الخدمة نالت رضاك.",
      voicePresetPickedUp: "استلمت أسطوانة الغاز وجاري نقلها إليك بحرص وأمان",
      hotQueryReply: "الطلب عبارة عن أسطوانة غاز، جاري نقلها بأعلى معايير السلامة والأمان لتصلك سالمة."
    };
  }

  // 2. Pharmacy
  if (allText.includes("صيدلية") || allText.includes("دواء") || allText.includes("أدوية") || allText.includes("علاج") || allText.includes("شفا") || allText.includes("pharmacy") || allText.includes("طبية") || allText.includes("مسكن")) {
    return {
      type: "pharmacy",
      name: "الأدوية والمستلزمات الطبية",
      categoryName: "الصيدلية",
      preparingText: "الصيدلي يقوم الآن بتجهيز الوصفة والأدوية المطلوبة ومطابقتها بعناية ⏳",
      driverAcceptedText: "أبشر يا طيب! قبلت طلب الأدوية ومتوجه فوراً للصيدلية لمطابقة الوصفة واستلامها 🏍️.",
      driverPreparingText: "وصلت إلى الصيدلية وجاري تجهيز ومطابقة الأدوية والمستلزمات الطبية بعناية تامة 👍💊.",
      driverPickedUpText: (l) => `استلمت الأدوية والمستلزمات الطبية مغلفة بعناية وبدأت التحرك نحو (${l}) 🚀.`,
      driverDeliveredText: "تم تسليم الأدوية والمستلزمات الطبية. بالشفاء العاجل ودوام الصحة والعافية لكم دائماً 💐.",
      customerPickedUpStatus: "الطلب الطبي مع كابتن التوصيل وهو في طريقه إليك بأسرع وقت!",
      customerPreparingStatus: "يتم تجهيز ومراجعة الأدوية والمستلزمات الطبية في الصيدلية الآن.",
      customerDeliveredStatus: "تم تسليم الطلب بالسلامة والشفاء العاجل بإذن الله.",
      voicePresetPickedUp: "استلمت الأدوية من الصيدلية مغلفة وجاري التوصيل فوراً",
      hotQueryReply: "أكيد، الأدوية والمستلزمات محفوظة ومغلفة بعناية تامة لتصلك سليمة."
    };
  }

  // 3. Grocery / Supermarket / Vegetables
  if (allText.includes("بقالة") || allText.includes("سوبرماركت") || allText.includes("خضار") || allText.includes("فواكه") || allText.includes("تموينات") || allText.includes("grocery") || allText.includes("market")) {
    return {
      type: "grocery",
      name: "المقاضي والمواد التموينية",
      categoryName: "البقالة / السوبرماركت",
      preparingText: "جاري جمع وفرز مشترياتك ومقاضيك وتعبئتها بعناية ⏳",
      driverAcceptedText: "أبشر يا محترم! قبلت طلبك وأنا متوجه للمتجر لجمع وتأكيد المقاضي والمشتريات 🏍️.",
      driverPreparingText: "وصلت للمتجر وجاري فرز وتعبئة جميع الأغراض والمقاضي المطلوبة بأفضل جودة 👍🛒.",
      driverPickedUpText: (l) => `استلمت جميع المقاضي والمشتريات طازجة ومرتبة، وجاري التوصيل إلى (${l}) 🚀.`,
      driverDeliveredText: "تم تسليم المقاضي والمشتريات كاملة بحمد الله. صحتين وعافية ومستعدون لخدمتكم دائماً 💐.",
      customerPickedUpStatus: "المشتريات مع كابتن التوصيل وهو في طريقه إليك الآن!",
      customerPreparingStatus: "يتم جمع وفرز المقاضي والمشتريات من المتجر الآن بعناية.",
      customerDeliveredStatus: "تم تسليم المشتريات كاملة. نأمل أن الخدمة نالت رضاكم.",
      voicePresetPickedUp: "استلمت المقاضي والمشتريات كاملة وجاري التوصيل فوراً",
      hotQueryReply: "أكيد، تم فرز وحفظ جميع الأغراض والمقاضي بعناية لتصلك طازجة وكاملة."
    };
  }

  // 4. Butchery / Meat
  if (allText.includes("لحوم") || allText.includes("قصابة") || allText.includes("ملحمة") || allText.includes("دجاج") || allText.includes("فروج طازج") || allText.includes("كباب ناعم") || allText.includes("شقف") || allText.includes("butcher")) {
    return {
      type: "meat",
      name: "اللحوم الطازجة",
      categoryName: "الملحمة / القصابة",
      preparingText: "القصاب يجهز طلبكم من اللحوم الطازجة وتوضيبها وتغليفها الصحي ⏳",
      driverAcceptedText: "أبشر يا محترم! قبلت طلب اللحوم ومتوجه للقصاب لاستلام الطلب طازجاً ومحفوظاً 🏍️.",
      driverPreparingText: "وصلت للملحمة والقصاب يقوم بتجهيز وتغليف طلب اللحم الطازج بعناية 👍🥩.",
      driverPickedUpText: (l) => `استلمت اللحوم الطازجة مغلفة ومبردة، وبدأت التحرك فوراً باتجاه (${l}) 🚀.`,
      driverDeliveredText: "تم تسليم اللحوم الطازجة بحمد الله. صحتين وهنا على قلوبكم دائماً 💐.",
      customerPickedUpStatus: "اللحوم الطازجة محفوظة مع كابتن التوصيل وهو في طريقه إليك!",
      customerPreparingStatus: "يتم توضيب وتغليف اللحوم الطازجة بالملحمة الآن بعناية.",
      customerDeliveredStatus: "تم تسليم طلب اللحوم بنجاح. صحتين وهنا!",
      voicePresetPickedUp: "استلمت اللحوم الطازجة ومحفوظة بعناية وجاري التوصيل",
      hotQueryReply: "أكيد، اللحوم طازجة ومحفوظة بطريقة صحية لتصلك بأعلى جودة."
    };
  }

  // 5. Bakery & Sweets
  if (allText.includes("حلويات") || allText.includes("مخبز") || allText.includes("أفران") || allText.includes("كيك") || allText.includes("معجنات") || allText.includes("بقلاوة") || allText.includes("sweets") || allText.includes("bakery")) {
    return {
      type: "sweets",
      name: "الحلويات والمخبوزات الطازجة",
      categoryName: "المخبز / محل الحلويات",
      preparingText: "يتم تجهيز وتغليف الحلويات والمخبوزات الطازجة من الفرن ⏳",
      driverAcceptedText: "أبشر يا طيب! قبلت طلبك ومتوجه للمخبز/محل الحلويات لاستلامها طازجة 🏍️.",
      driverPreparingText: "وصلت لمحل الحلويات وجاري توضيب وتغليف الأصناف الطازجة بحرص 👍🧁.",
      driverPickedUpText: (l) => `استلمت الحلويات والمخبوزات طازجة وفي علبها، وجاري التوصيل إلى (${l}) 🚀.`,
      driverDeliveredText: "تم تسليم الحلويات والمخبوزات بحمد الله. صحتين وعافية ومطرح ما يسري يمري 💐.",
      customerPickedUpStatus: "الطلب مع كابتن التوصيل وهو في طريقه إليك بعناية!",
      customerPreparingStatus: "يتم توضيب وتغليف الحلويات والمخبوزات الطازجة الآن.",
      customerDeliveredStatus: "تم تسليم الطلب بحمد الله. صحتين وعافية!",
      voicePresetPickedUp: "استلمت الحلويات والمخبوزات طازجة ومرتبة وجاري التوصيل",
      hotQueryReply: "أكيد، الحلويات والمخبوزات مغلفة ومرتبة بعناية لتصلك طازجة تماماً."
    };
  }

  // 6. Food / Restaurant (Meals)
  if (allText.includes("مطعم") || allText.includes("وجبة") || allText.includes("شاورما") || allText.includes("بروستد") || allText.includes("فطائر") || allText.includes("ساندويش") || allText.includes("restaurant") || allText.includes("مأكولات") || allText.includes("مشاوي")) {
    return {
      type: "food",
      name: "الوجبة الساخنة",
      categoryName: "المطعم",
      preparingText: "وجبتك الشهية يتم تحضيرها وطهيها بالمطعم لتصلك ساخنة وطازجة ⏳",
      driverAcceptedText: "أبشر يا طيب! لقد قبلت طلبك وأنا متوجه للمطعم لاستلام الوجبة والتحقق منها 🏍️.",
      driverPreparingText: "وصلت الآن إلى المطعم وبدأت عملية التجهيز والطهي لتكون الوجبة ساخنة وطازجة 👍🔥.",
      driverPickedUpText: (l) => `استلمت الوجبة ساخنة من المطعم وبدأت التحرك نحو (${l}) 🚀.`,
      driverDeliveredText: "الحمد لله، وصلت إلى موقعك وتم تسليم الوجبة ساخنة. بالهناء والشفاء التام لك ولعائلتك الكريمة 💐.",
      customerPickedUpStatus: "الطلب في الصندوق الحراري مع كابتن التوصيل وهو في طريقه إليك!",
      customerPreparingStatus: "وجبتك الشهية يتم تجهيزها الآن بالمطعم بطلب من الكابتن.",
      customerDeliveredStatus: "بالهناء والشفاء! نأمل أن الخدمة والوجبة نالت رضاك.",
      voicePresetPickedUp: "استلمت وجبتك الساخنة من المطعم وجاري التوصيل فوراً",
      hotQueryReply: "أكيد، الوجبة موضوعة في الحافظة الحرارية وستصلك ساخنة وطازجة كأنك في المطعم!"
    };
  }

  // 7. General
  return {
    type: "general",
    name: "الطلب والمشتريات",
    categoryName: "المتجر",
    preparingText: "جاري تجهيز وتأمين طلبك بعناية تامة في المتجر ⏳",
    driverAcceptedText: "أبشر يا محترم! قبلت طلبك وأنا متوجه حالياً في طريقي للمتجر لاستلام الأغراض 🏍️.",
    driverPreparingText: "وصلت الآن إلى المتجر وجاري تجهيز ومراجعة محتويات طلبك للتأكد من سلامتها 👍.",
    driverPickedUpText: (l) => `استلمت طلبك من المتجر بحالة ممتازة وجاري التحرك باتجاه موقعك عند (${l}) 🚀.`,
    driverDeliveredText: "الحمد لله، تم تسليم طلبك بنجاح وبحالة ممتازة. شكراً لتعاملك معنا ويسعدنا دائماً خدمتكم 💐.",
    customerPickedUpStatus: "الطلب مع كابتن التوصيل وهو في طريقه إليك الآن!",
    customerPreparingStatus: "طلبك يتم تجهيزه ومراجعته الآن بالمتجر بعناية.",
    customerDeliveredStatus: "تم تسليم الطلب بنجاح. نأمل أن الخدمة نالت رضاك.",
    voicePresetPickedUp: "استلمت طلبك من المتجر بحالة ممتازة وبدأت التحرك إليك",
    hotQueryReply: "أكيد، تم التأكد من جودة الطلب وتأمينه بعناية ليصلك بأفضل حالة."
  };
}

function AudioMessageBubble({ msg, isMe, role }) {
  const [isPlaying, setIsPlaying] = _.useState(false);
  const [progress, setProgress] = _.useState(0);
  const [currentTime, setCurrentTime] = _.useState("0:00");
  const audioRef = _.useRef(null);

  const cleanText = (msg.audioText || msg.text || "").replace(/^🎙️\s*رسالة صوتية\s*(\(.*?\))?:?\s*/, "").replace(/^"|"$/g, "");

  const handleToggle = () => {
    if (isPlaying) {
      if (audioRef.current) audioRef.current.pause();
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    if (msg.audioUrl) {
      if (!audioRef.current) {
        audioRef.current = new Audio(msg.audioUrl);
        audioRef.current.ontimeupdate = () => {
          if (audioRef.current && audioRef.current.duration) {
            const pct = (audioRef.current.currentTime / audioRef.current.duration) * 100;
            setProgress(pct);
            const m = Math.floor(audioRef.current.currentTime / 60);
            const s = Math.floor(audioRef.current.currentTime % 60);
            setCurrentTime(`${m}:${s < 10 ? '0' : ''}${s}`);
          }
        };
        audioRef.current.onended = () => {
          setIsPlaying(false);
          setProgress(0);
          setCurrentTime("0:00");
        };
        audioRef.current.onerror = () => {
          // Fallback to speech synthesis
          if ('speechSynthesis' in window && cleanText) {
            const u = new SpeechSynthesisUtterance(cleanText);
            u.lang = 'ar';
            u.onend = () => setIsPlaying(false);
            window.speechSynthesis.speak(u);
          } else {
            setIsPlaying(false);
          }
        };
      }
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {
        if ('speechSynthesis' in window && cleanText) {
          const u = new SpeechSynthesisUtterance(cleanText);
          u.lang = 'ar';
          u.onend = () => setIsPlaying(false);
          window.speechSynthesis.speak(u);
          setIsPlaying(true);
        }
      });
    } else if ('speechSynthesis' in window && cleanText) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(cleanText);
      u.lang = 'ar';
      u.rate = 0.95;
      u.onend = () => {
        setIsPlaying(false);
        setProgress(0);
      };
      setIsPlaying(true);
      window.speechSynthesis.speak(u);
      
      // Simulate progress bar for speech synthesis
      let p = 0;
      const dur = 4000;
      const interval = setInterval(() => {
        p += 5;
        setProgress(p);
        if (p >= 100 || !window.speechSynthesis.speaking) {
          clearInterval(interval);
          setIsPlaying(false);
          setProgress(0);
        }
      }, dur / 20);
    } else {
      // Simple tone audio simulation
      setIsPlaying(true);
      setTimeout(() => {
        setIsPlaying(false);
      }, 3000);
    }
  };

  return n.jsxs("div", {
    className: "space-y-2 select-none min-w-[200px] sm:min-w-[240px]",
    children: [
      n.jsxs("div", {
        className: "flex items-center gap-2.5",
        children: [
          n.jsx("button", {
            type: "button",
            onClick: handleToggle,
            className: `w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-md active:scale-90 shrink-0 ${
              isMe ? "bg-orange-500 hover:bg-orange-600 text-white" : "bg-emerald-600 hover:bg-emerald-700 text-white"
            }`,
            children: isPlaying ? n.jsx("span", { className: "text-base font-black", children: "⏸️" }) : n.jsx("span", { className: "text-base font-black mr-0.5", children: "▶️" })
          }),
          n.jsxs("div", {
            className: "flex-1 space-y-1.5",
            children: [
              // Waveform visualization bars
              n.jsx("div", {
                className: "flex items-center gap-1 h-6 cursor-pointer",
                onClick: handleToggle,
                children: [6, 12, 18, 24, 16, 10, 20, 26, 14, 8, 22, 18, 12, 20, 15, 9, 22, 16].map((h, idx) => (
                  n.jsx("div", {
                    key: idx,
                    style: { height: isPlaying ? `${Math.max(4, (h * (0.6 + Math.random() * 0.8)))}px` : `${h * 0.7}px` },
                    className: `w-1 rounded-full transition-all duration-150 ${
                      (idx / 18) * 100 <= progress
                        ? (isMe ? "bg-orange-400" : "bg-emerald-500")
                        : (isMe ? "bg-slate-700" : "bg-slate-300")
                    }`
                  })
                ))
              }),
              n.jsxs("div", {
                className: "flex items-center justify-between text-[10px] opacity-75 font-mono",
                children: [
                  n.jsx("span", { children: isPlaying ? currentTime : (msg.duration || "0:06") }),
                  n.jsx("span", { className: "font-sans font-bold flex items-center gap-1", children: "🎙️ رسالة صوتية" })
                ]
              })
            ]
          })
        ]
      }),
      cleanText && n.jsx("p", {
        className: `text-xs leading-relaxed italic border-t pt-1.5 ${isMe ? "text-slate-300 border-slate-800" : "text-slate-600 border-slate-100"}`,
        children: `"${cleanText}"`
      })
    ]
  });
}

function BV({order:o,role:i,messages:d,onSendMessage:r,onAutoReply:u}){
  const [f,p] = _.useState("");
  const [m,g] = _.useState(!1);
  const [isRecording, setIsRecording] = _.useState(false);
  const [recSeconds, setRecSeconds] = _.useState(0);
  const [showVoicePresets, setShowVoicePresets] = _.useState(false);
  const x = _.useRef(null);
  const mediaRecorderRef = _.useRef(null);
  const audioChunksRef = _.useRef([]);
  const recTimerRef = _.useRef(null);

  _.useEffect(()=>{
    var L;
    (L=x.current)==null||L.scrollIntoView({behavior:"smooth"});
  },[d,m]);

  const b=L=>{
    const H=T1.find(q=>q.id===L);
    return H?H.arabicName:L;
  };

  _.useEffect(()=>{
    if(d.length===0||!u) return;
    const L=d[d.length-1];
    if(L.sender!=="customer"||i==="driver") return;
    g(!0);
    const H=setTimeout(()=>{
      g(!1);
      let q="أهلاً بك يا فندم، تم استلام رسالتك وسأوافيك بالتفاصيل قريباً.";
      const E=b(o.addressLandmark);
      const isAudio = L.type === "audio" || (L.text && L.text.includes("🎙️"));
      const ctx = getOrderTypeContext(o);
      
      if (isAudio) {
        q = o.status === "picked_up" 
          ? `سمعت رسالتك الصوتية يا محترم! أنا الآن متجه بأقصى سرعة نحو موقعك عند (${E}) وبحوزتي ${ctx.name} 🚀` 
          : `أهلاً بك، استلمت رسالتك الصوتية وجاري متابعة ${ctx.name} بأعلى اهتمام 👍`;
        u({
          text: `🎙️ رسالة صوتية: "${q}"`,
          type: "audio",
          audioText: q,
          duration: "0:05"
        });
        return;
      }

      if (o.status === "accepted") {
        q = ctx.driverAcceptedText;
      } else if (o.status === "preparing") {
        q = `أنا متواجد حالياً عند ${ctx.categoryName} بانتظار استلام وتجهيز ${ctx.name}، دقائق قليلة ويجهز ⏳`;
      } else if (o.status === "picked_up") {
        q = ctx.driverPickedUpText(E);
      } else if (o.status === "delivered") {
        q = ctx.driverDeliveredText;
      }
      
      const U=L.text.toLowerCase();
      if (U.includes("تأخر") || U.includes("وينك") || U.includes("أين أنت")) {
        q = o.status === "picked_up"
          ? `أنا في الطريق حالياً ومعي ${ctx.name}، تبقت مسافة قصيرة جداً وسأكون عندك خلال دقيقتين إن شاء الله.`
          : `جاري تجهيز ${ctx.name} في ${ctx.categoryName} الآن، وسأنطلق فوراً لتسليمه لك بأسرع وقت.`;
      } else if (U.includes("شكرا") || U.includes("يسلمو") || U.includes("يعطيك العافية")) {
        q = "على الرحب والسعة! هذا واجبي لخدمة أهل حارتنا الكرام بكل محبة واحترام 😊";
      } else if (U.includes("حار") || U.includes("ساخن") || U.includes("سلامة") || U.includes("أمان") || U.includes("بارد")) {
        q = ctx.hotQueryReply;
      }
      u(q);
    }, 2e3);
    return()=>clearTimeout(H);
  },[d.length,o.status]);

  const M=()=>{
    if (f.trim()) {
      r(f.trim());
      p("");
    }
  };

  const w=L=>{
    L.key==="Enter"&&M();
  };

  const C=L=>L==="customer"?"الزبون (أحمد)":"كابتن التوصيل (أبو شهاب)";

  // Target contact info
  const targetPhone = i === "customer" ? (o.driverPhone || "0955114477") : (o.customerPhone || "0933445566");
  const targetName = i === "customer" ? "كابتن التوصيل (أبو شهاب)" : ("الزبون: " + o.customerName);
  const cleanPhoneForWa = targetPhone.replace(/\D/g, "").replace(/^0/, "963");

  // Real Web Audio Recording Functions
  const startRecording = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        sendCannedVoiceNote(i === "driver" ? "أنا في الطريق إليك ومقترب من موقعك" : "السلام عليكم، بانتظار استلام الطلب");
        return;
      }
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const mr = new MediaRecorder(stream);
      mediaRecorderRef.current = mr;
      
      mr.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mr.onstop = () => {
        stream.getTracks().forEach(t => t.stop());
        if (audioChunksRef.current.length > 0) {
          const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64Audio = reader.result;
            const secs = recSeconds || 3;
            const durStr = `0:${secs < 10 ? '0' : ''}${secs}`;
            r({
              text: `🎙️ رسالة صوتية (${durStr})`,
              type: "audio",
              audioUrl: base64Audio,
              duration: durStr
            });
          };
          reader.readAsDataURL(blob);
        }
      };

      mr.start();
      setIsRecording(true);
      setRecSeconds(0);
      recTimerRef.current = setInterval(() => {
        setRecSeconds(s => s + 1);
      }, 1000);
    } catch (err) {
      console.warn("Microphone access:", err);
      // Friendly fallback to instant voice note
      sendCannedVoiceNote(i === "driver" ? "أنا في الطريق إليك حالياً وأقترب من موقعك" : "السلام عليكم، بانتظار استلام الطلب عند الموقع المحدد");
    }
  };

  const stopAndSendRecording = () => {
    if (recTimerRef.current) clearInterval(recTimerRef.current);
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  const cancelRecording = () => {
    if (recTimerRef.current) clearInterval(recTimerRef.current);
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      try {
        mediaRecorderRef.current.stream.getTracks().forEach(t => t.stop());
      } catch(e){}
    }
    audioChunksRef.current = [];
    setIsRecording(false);
    setRecSeconds(0);
  };

  const sendCannedVoiceNote = (speechText) => {
    r({
      text: `🎙️ رسالة صوتية: "${speechText}"`,
      type: "audio",
      audioText: speechText,
      duration: "0:05"
    });
  };

  // Driver 1-Tap Voice Presets (for driver on the road)
  const ctx = getOrderTypeContext(o);
  const driverVoicePresets = [
    { label: "🛵 في الطريق إليك", text: `أنا في الطريق إليك حالياً وبحوزتي ${ctx.name}، دقائق وأكون عندك إن شاء الله` },
    { label: "📍 وصلت تحت البناء", text: `السلام عليكم، أنا وصلت الآن تحت موقعك ومعي ${ctx.name} وبانتظارك لاستلامه` },
    { label: `📦 استلمت ${ctx.name.split(" ")[0]}`, text: ctx.voicePresetPickedUp },
    { label: "📞 يرجى الرد على الهاتف", text: "أنا عند موقع التسليم، يرجى الرد على مكالمة الهاتف لتحديد المكان بدقة" }
  ];

  const customerVoicePresets = [
    { label: "📍 أنا عند الباب بانتظارك", text: "أنا بانتظارك عند الباب أو المدخل الرئيسي" },
    { label: "💵 جهزت المبلغ نقداً", text: "جهزت المبلغ المطلوب نقداً وبالكامل" },
    { label: "📞 اتصل بي عند وصولك", text: "يرجى الاتصال بي هاتفياً فور وصولك للموقع" }
  ];

  const activePresets = i === "driver" ? driverVoicePresets : customerVoicePresets;

  return n.jsxs("div",{
    className:"flex flex-col h-full bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden",
    children:[
      // Header with direct phone call and WhatsApp buttons
      n.jsxs("div",{
        className:"bg-slate-900 text-white p-3.5 sm:p-4 flex items-center justify-between gap-2 select-none border-b border-slate-800",
        children:[
          n.jsxs("div",{
            className:"flex items-center gap-2.5",
            children:[
              n.jsxs("div",{
                className:"relative",
                children:[
                  n.jsx("div",{
                    className:"w-10 h-10 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center border border-orange-500/30 text-lg",
                    children: i === "customer" ? "🛵" : "👤"
                  }),
                  n.jsx("span",{className:"absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-slate-900"})
                ]
              }),
              n.jsxs("div",{
                children:[
                  n.jsx("h4",{className:"font-extrabold text-white text-xs sm:text-sm",children: targetName}),
                  n.jsxs("p",{
                    className:"text-[10px] text-slate-300 flex items-center gap-1 mt-0.5",
                    children:[
                      n.jsx("span",{className:"w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse"}),
                      "تواصل صوتي ومباشر"
                    ]
                  })
                ]
              })
            ]
          }),

          // Quick Action Call & WhatsApp Buttons
          n.jsxs("div",{
            className:"flex items-center gap-1.5",
            children:[
              // Direct Phone Call
              n.jsxs("a",{
                href: `tel:${targetPhone}`,
                className:"bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white text-xs font-black py-2 px-3 rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer transition-all border border-emerald-500/50",
                title: "مكالمة هاتفية عادية مباشرة",
                children:[
                  n.jsx("span",{className:"text-sm",children:"📞"}),
                  n.jsx("span",{className:"hidden xs:inline text-[11px]",children:"اتصال هاتفي"})
                ]
              }),

              // Direct WhatsApp Regular
              n.jsxs("a",{
                href: `https://wa.me/${cleanPhoneForWa}?text=${encodeURIComponent(i==="customer" ? `السلام عليكم كابتن أبو شهاب، أنا الزبون بخصوص طلب رقم (${o.id})...` : `السلام عليكم يا محترم، أنا كابتن التوصيل بخصوص طلبك رقم (${o.id})...`)}`,
                target:"_blank",
                rel:"noopener noreferrer",
                className:"bg-green-600 hover:bg-green-500 active:scale-95 text-white text-xs font-black py-2 px-2 rounded-xl shadow-md flex items-center gap-1 cursor-pointer transition-all border border-green-400/40",
                title: "محادثة أو مكالمة عبر واتساب العادي",
                children:[
                  n.jsx("span",{className:"text-sm",children:"💬"}),
                  n.jsx("span",{className:"hidden sm:inline text-[11px]",children:"واتساب"})
                ]
              }),

              // Direct WhatsApp Business
              n.jsxs("a",{
                href: /Android/i.test(navigator.userAgent) ? `intent://send?phone=${cleanPhoneForWa}&text=${encodeURIComponent(i==="customer" ? `السلام عليكم كابتن أبو شهاب، أنا الزبون بخصوص طلب رقم (${o.id})...` : `السلام عليكم يا محترم، أنا كابتن التوصيل بخصوص طلبك رقم (${o.id})...`)}#Intent;package=com.whatsapp.w4b;scheme=whatsapp;end` : `https://wa.me/${cleanPhoneForWa}?text=${encodeURIComponent(i==="customer" ? `السلام عليكم كابتن أبو شهاب، أنا الزبون بخصوص طلب رقم (${o.id})...` : `السلام عليكم يا محترم، أنا كابتن التوصيل بخصوص طلبك رقم (${o.id})...`)}`,
                target:"_blank",
                rel:"noopener noreferrer",
                className:"bg-emerald-800 hover:bg-emerald-700 active:scale-95 text-emerald-100 text-xs font-black py-2 px-2 rounded-xl shadow-md flex items-center gap-1 cursor-pointer transition-all border border-emerald-400/40",
                title: "محادثة أو مكالمة عبر واتساب للأعمال (Business)",
                children:[
                  n.jsx("span",{className:"text-sm",children:"💼"}),
                  n.jsx("span",{className:"hidden sm:inline text-[11px]",children:"واتس أعمال"})
                ]
              })
            ]
          })
        ]
      }),

      // Messages scroll list
      n.jsxs("div",{
        className:"flex-1 overflow-y-auto p-4 bg-slate-50/60 space-y-3.5 min-h-[220px]",
        children:[
          d.length===0?n.jsxs("div",{
            className:"h-full flex flex-col items-center justify-center text-center p-6 text-slate-400",
            children:[
              n.jsx("div",{className:"w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-2 text-2xl",children:"🎙️"}),
              n.jsx("p",{className:"text-sm font-black text-slate-700",children:"محادثة ورسائل صوتية مباشرة"}),
              n.jsx("p",{className:"text-xs max-w-[240px] mt-1 text-slate-400",children:"يمكنك الضغط على الميكروفون للتسجيل الصوتي أو استخدام الاتصال الهاتفي السريع."})
            ]
          }):n.jsx(xr,{
            initial:!1,
            children:d.map(L=>{
              const H=L.sender===i;
              const isAudioMsg = L.type === "audio" || (L.text && L.text.startsWith("🎙️"));

              return n.jsx(V1.div,{
                initial:{opacity:0,y:10,scale:.95},
                animate:{opacity:1,y:0,scale:1},
                className:`flex ${H?"justify-start":"justify-end"}`,
                children:n.jsxs("div",{
                  className:`max-w-[85%] rounded-2xl p-3.5 shadow-sm relative ${H?"bg-slate-900 text-white rounded-br-none":"bg-white text-slate-850 border border-slate-200/80 rounded-bl-none"}`,
                  children:[
                    n.jsxs("div",{
                      className:"flex items-center justify-between gap-3 mb-1.5",
                      children:[
                        n.jsx("span",{className:`text-[9px] font-bold tracking-wider uppercase ${H?"text-orange-400":"text-emerald-600"}`,children:C(L.sender)}),
                        n.jsx("span",{className:"text-[9px] opacity-60",children:new Date(L.timestamp).toLocaleTimeString("ar-EG",{hour:"2-digit",minute:"2-digit"})})
                      ]
                    }),

                    isAudioMsg ? n.jsx(AudioMessageBubble, { msg: L, isMe: H, role: i }) : n.jsx("p",{className:"text-sm leading-relaxed whitespace-pre-wrap",children:L.text}),

                    H&&n.jsx("div",{className:"absolute bottom-1 left-2 flex items-center gap-0.5 opacity-60 text-orange-400 text-xs",children:"✓✓"})
                  ]
                })
              },L.id);
            })
          }),

          m&&n.jsx(V1.div,{
            initial:{opacity:0,y:5},
            animate:{opacity:1,y:0},
            className:"flex justify-end",
            children:n.jsxs("div",{
              className:"bg-white border border-slate-100 rounded-2xl rounded-bl-none p-3 shadow-sm flex items-center gap-2",
              children:[
                n.jsx("span",{className:"text-xs text-slate-500 font-bold",children: i === "customer" ? "الكابتن يسجل رداً صوتياً..." : "الزبون يكتب..."}),
                n.jsxs("span",{className:"flex gap-1 items-center py-1",children:[
                  n.jsx("span",{className:"h-1.5 w-1.5 bg-orange-500 rounded-full animate-bounce",style:{animationDelay:"0ms"}}),
                  n.jsx("span",{className:"h-1.5 w-1.5 bg-orange-500 rounded-full animate-bounce",style:{animationDelay:"150ms"}}),
                  n.jsx("span",{className:"h-1.5 w-1.5 bg-orange-500 rounded-full animate-bounce",style:{animationDelay:"300ms"}})
                ]})
              ]
            })
          }),
          n.jsx("div",{ref:x})
        ]
      }),

      // 1-Tap Voice Presets bar (Extremely useful for driver on the road!)
      n.jsxs("div",{
        className:"px-3.5 py-2 bg-slate-100/90 border-t border-slate-200 overflow-x-auto flex items-center gap-2 select-none scrollbar-none shrink-0",
        children:[
          n.jsxs("span",{
            className:"text-[10px] text-slate-600 font-black self-center ml-1 flex items-center gap-1 whitespace-nowrap",
            children:[
              n.jsx("span",{className:"text-sm",children:"📢"}),
              "صوتيات سريعة بنقرة:"
            ]
          }),
          activePresets.map((preset, idx) => (
            n.jsxs("button",{
              key: idx,
              onClick: () => sendCannedVoiceNote(preset.text),
              className: `text-xs py-1.5 px-3 rounded-full transition-all whitespace-nowrap shadow-xs hover:shadow-md cursor-pointer shrink-0 font-bold flex items-center gap-1 active:scale-95 ${
                i === "driver" 
                  ? "bg-slate-900 hover:bg-orange-600 text-white border border-slate-800" 
                  : "bg-white hover:bg-emerald-50 text-slate-800 hover:text-emerald-700 border border-slate-300"
              }`,
              children:[
                n.jsx("span",{children: preset.label})
              ]
            })
          ))
        ]
      }),

      // Active Recording Overlay Bar OR Text Input Bar
      isRecording ? n.jsxs("div",{
        className:"p-3 bg-red-600 text-white flex items-center justify-between gap-3 animate-pulse",
        children:[
          n.jsxs("div",{
            className:"flex items-center gap-2",
            children:[
              n.jsx("span",{className:"w-3 h-3 rounded-full bg-white animate-ping"}),
              n.jsxs("span",{className:"text-xs sm:text-sm font-black",children:[
                "🔴 جاري تسجيل رسالة صوتية... (0:",
                recSeconds < 10 ? `0${recSeconds}` : recSeconds,
                ")"
              ]})
            ]
          }),
          n.jsxs("div",{
            className:"flex items-center gap-2",
            children:[
              n.jsx("button",{
                type:"button",
                onClick: cancelRecording,
                className:"bg-white/20 hover:bg-white/30 text-white text-xs font-bold py-1.5 px-3 rounded-xl transition-all cursor-pointer",
                children: "إلغاء ✕"
              }),
              n.jsxs("button",{
                type:"button",
                onClick: stopAndSendRecording,
                className:"bg-white text-red-600 hover:bg-red-50 text-xs font-black py-1.5 px-3.5 rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1 active:scale-95",
                children:[
                  n.jsx("span",{children:"إرسال الصوت"}),
                  n.jsx("span",{children:"⬆️"})
                ]
              })
            ]
          })
        ]
      }) : n.jsxs("div",{
        className:"p-3 border-t border-slate-200 bg-white flex items-center gap-2",
        children:[
          // Voice Record Button (Microphone)
          n.jsxs("button",{
            type:"button",
            onClick: startRecording,
            className:"bg-orange-50 hover:bg-orange-100 text-orange-600 border border-orange-200 rounded-2xl p-3 flex items-center justify-center transition-all shadow-sm active:scale-90 cursor-pointer shrink-0 font-black",
            title:"تسجيل رسالة صوتية بالميكروفون",
            children:[
              n.jsx("span",{className:"text-lg",children:"🎙️"}),
              n.jsx("span",{className:"hidden md:inline text-xs mr-1 font-bold",children:"تسجيل صوتي"})
            ]
          }),

          // Text input
          n.jsx("input",{
            type:"text",
            value:f,
            onChange:L=>p(L.target.value),
            onKeyDown:w,
            placeholder:i==="customer"?"اكتب رسالة أو سجل صوتك...":"اكتب رسالتك للزبون...",
            className:"flex-1 bg-slate-50 border border-slate-200 focus:border-slate-900 focus:bg-white rounded-2xl py-3 px-4 text-sm outline-none text-slate-800 placeholder-slate-400 transition-all shadow-inner font-medium"
          }),

          // Send button
          n.jsx("button",{
            type:"button",
            onClick:M,
            disabled:!f.trim(),
            className:"bg-slate-900 text-white rounded-2xl p-3 hover:bg-orange-600 hover:text-white transition-all shadow-md active:scale-95 disabled:opacity-40 disabled:hover:bg-slate-900 disabled:hover:text-white disabled:pointer-events-none cursor-pointer shrink-0",
            children:n.jsx(Y0,{className:"w-4 h-4 transform rotate-180"})
          })
        ]
      })
    ]
  });
}
