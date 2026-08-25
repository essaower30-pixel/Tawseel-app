function axe({stores:o,onBack:i,activeOrder:d,onAcceptDemoOrder:r}){
  const [u, f] = _.useState("available");
  const [ordersList, setOrdersList] = _.useState(() => {
    try {
      const raw = localStorage.getItem("tw_orders_list");
      return raw ? JSON.parse(raw) : [];
    } catch(e) {
      return [];
    }
  });

  // Sync orders with localStorage and storage events in real-time
  _.useEffect(() => {
    const syncOrders = () => {
      try {
        const raw = localStorage.getItem("tw_orders_list");
        if (raw) {
          setOrdersList(JSON.parse(raw));
        }
      } catch(e) {}
    };
    window.addEventListener("storage", syncOrders);
    const interval = setInterval(syncOrders, 2000);
    return () => {
      window.removeEventListener("storage", syncOrders);
      clearInterval(interval);
    };
  }, []);

  // Strict check: only real physical goods delivery orders for the motorcycle driver
  const isDeliveryOrder = (order) => {
    if (!order) return false;
    if (order.isDirectService || order.isCraftService || order.isService || order.orderType === "service" || order.orderType === "craft") return false;
    const sId = (order.storeId || "").toLowerCase();
    const sName = (order.storeName || "").toLowerCase();
    if (sId.startsWith("service_") || sId.includes("clinic") || sId.includes("blacksmith") || sId.includes("painter") || sId.includes("craft") || sId.includes("doctor")) return false;
    if (["doctors", "crafts", "craft", "clinic", "clinics", "services"].includes(order.storeCategory || order.category)) return false;
    if (sName.includes("ورشة") || sName.includes("حدادة") || sName.includes("عيادة") || sName.includes("نجارة") || sName.includes("سباكة") || sName.includes("دهان") || sName.includes("صيانة") || sName.includes("د. ") || sName.includes("دكتور")) return false;
    if (order.items && order.items.some(it => {
      const pName = (it.product?.name || it.name || "").toLowerCase();
      const pId = (it.product?.id || it.id || "").toLowerCase();
      return pId.startsWith("service_") || pName.includes("خدمة وتنسيق مباشر") || pName.includes("طلب خدمة") || pName.includes("استشارة");
    })) return false;
    return true;
  };

  // Filter orders for Abu Shehab
  const isAssignedToAbuShehab = (order) => {
    if (!order) return false;
    const drId = (order.driverId || "").toLowerCase();
    const drName = (order.driverName || "").toLowerCase();
    return drId === "d1" || drId === "dr-01" || drName.includes("أبو شهاب") || drName.includes("شهاب");
  };

  // Merge activeOrder if not present
  const allOrders = [...ordersList];
  if (d && !allOrders.find(it => it.id === d.id)) {
    allOrders.unshift(d);
  }

  // Categories of orders (Strictly physical delivery orders only)
  const assignedOrders = allOrders.filter(it => isDeliveryOrder(it) && isAssignedToAbuShehab(it) && it.status !== "delivered" && it.status !== "cancelled");
  const availableOrders = allOrders.filter(it => isDeliveryOrder(it) && !isAssignedToAbuShehab(it) && it.status === "pending");
  const completedOrders = allOrders.filter(it => isDeliveryOrder(it) && isAssignedToAbuShehab(it) && it.status === "delivered");

  // Handle Accepting / Opening an order
  const handleStartDelivery = (order) => {
    const updated = {
      ...order,
      status: order.status === "pending" ? "accepted" : order.status,
      driverId: "d1",
      driverName: "أبو شهاب (كابتن الضيعة)"
    };
    try {
      localStorage.setItem("tw_active_order", JSON.stringify(updated));
      const nextList = ordersList.map(it => it.id === order.id ? updated : it);
      if (!nextList.find(it => it.id === order.id)) {
        nextList.unshift(updated);
      }
      localStorage.setItem("tw_orders_list", JSON.stringify(nextList));
      setOrdersList(nextList);
      window.dispatchEvent(new Event("storage"));
    } catch(e) {}
    r(updated);
  };

  // Demo generator
  const p = () => {
    const g = o[Math.floor(Math.random() * o.length)] || o[0];
    const x = T1.filter(w => w.type === "landmark");
    const b = x[Math.floor(Math.random() * x.length)] || T1[1];
    const M = {
      id: "tw-" + Math.floor(Math.random() * 9e4 + 1e4),
      storeId: g.id,
      storeName: g.name,
      items: [
        {
          product: {
            id: "demo-p1",
            name: "وجبة دبل برجر لحم بقر سوبريم",
            price: 45e3,
            description: "قطعتين من اللحم المشوي، جبنة شيدر سائلة، صصوص خاص",
            image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
            category: "fastfood",
            storeId: g.id
          },
          quantity: 2,
          totalItemPrice: 9e4
        }
      ],
      subtotal: 9e4,
      deliveryFee: g.deliveryFee || 5e3,
      discount: 0,
      total: 9e4 + (g.deliveryFee || 5e3),
      status: "pending",
      paymentMethod: "cod",
      addressLandmark: b.id,
      additionalDirections: "بجانب المسجد الكبير - الطابق الثاني",
      createdAt: new Date().toISOString(),
      customerName: "أحمد الرفاعي",
      customerPhone: "0933123456",
      notes: "الرجاء الحرص على أن يكون الطعام ساخناً",
      driverId: "d1",
      driverName: "أبو شهاب (كابتن الضيعة)"
    };
    try {
      const nextList = [M, ...ordersList];
      localStorage.setItem("tw_orders_list", JSON.stringify(nextList));
      localStorage.setItem("tw_active_order", JSON.stringify(M));
      setOrdersList(nextList);
      window.dispatchEvent(new Event("storage"));
    } catch(e) {}
    r(M);
  };

  const totalAssignedCount = assignedOrders.length;
  const totalAvailableCount = availableOrders.length;

  return n.jsxs("div", {
    className: "space-y-6 max-w-4xl mx-auto",
    dir: "rtl",
    children: [
      // Top Header Card
      n.jsxs("div", {
        className: "bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden select-none",
        children: [
          n.jsx("div", {
            className: "absolute inset-0 bg-cover bg-center opacity-10",
            style: { backgroundImage: "url('https://images.unsplash.com/photo-1512412046876-f386342eddb3?w=800')" }
          }),
          n.jsx("div", { className: "absolute top-0 right-0 w-48 h-48 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" }),
          n.jsxs("div", {
            className: "relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4",
            children: [
              n.jsxs("div", {
                className: "space-y-2",
                children: [
                  n.jsxs("span", {
                    className: "text-orange-500 font-extrabold text-xs sm:text-sm tracking-wider uppercase flex items-center gap-1.5",
                    children: [
                      n.jsx(Aa, { className: "w-5 h-5 animate-bounce-slow" }),
                      n.jsx("span", { children: "بوابة الكباتن والمناديب - الكابتن أبو شهاب 🏍️" })
                    ]
                  }),
                  n.jsx("h2", {
                    className: "text-2xl sm:text-3xl font-extrabold tracking-tight",
                    children: "لوحة تحكم كابتن التوصيل"
                  }),
                  n.jsx("p", {
                    className: "text-slate-300 text-xs sm:text-sm leading-relaxed max-w-lg",
                    children: "مرحباً بك يا كابتن أبو شهاب! هنا تظهر كافة الطلبات المكلف بها من الإدارة والطلبات المتاحة في بلدتك لتنفيذها ومتابعة مسار الخريطة والدردشة مع الزبون."
                  })
                ]
              }),
              n.jsx("button", {
                onClick: i,
                className: "self-start sm:self-center px-4 py-2 bg-slate-800 hover:bg-slate-750 text-white border border-slate-700 text-xs font-bold rounded-xl cursor-pointer transition-all shrink-0",
                children: "العودة للرئيسية"
              })
            ]
          })
        ]
      }),

      // Stats Grid
      n.jsxs("div", {
        className: "grid grid-cols-1 sm:grid-cols-3 gap-4",
        children: [
          n.jsxs("div", {
            className: "bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4",
            children: [
              n.jsx("div", {
                className: "w-12 h-12 rounded-xl bg-orange-500/10 text-orange-600 flex items-center justify-center shrink-0",
                children: n.jsx(rr, { className: "w-6 h-6" })
              }),
              n.jsxs("div", {
                children: [
                  n.jsx("span", { className: "text-slate-400 text-[10px] sm:text-xs block font-bold", children: "محفظة الكابتن والأرباح" }),
                  n.jsx("span", { className: "text-slate-800 font-black text-lg sm:text-xl", children: "145,000 ل.س" })
                ]
              })
            ]
          }),
          n.jsxs("div", {
            className: "bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4",
            children: [
              n.jsx("div", {
                className: "w-12 h-12 rounded-xl bg-yellow-500/10 text-yellow-600 flex items-center justify-center shrink-0",
                children: n.jsx(Wn, { className: "w-6 h-6 fill-current" })
              }),
              n.jsxs("div", {
                children: [
                  n.jsx("span", { className: "text-slate-400 text-[10px] sm:text-xs block font-bold", children: "تقييم الأداء والسرعة" }),
                  n.jsxs("div", {
                    className: "flex items-center gap-1",
                    children: [
                      n.jsx("span", { className: "text-slate-800 font-black text-lg sm:text-xl", children: "4.9" }),
                      n.jsx("span", { className: "text-slate-400 text-xs", children: "(120 طلب منجز)" })
                    ]
                  })
                ]
              })
            ]
          }),
          n.jsxs("div", {
            className: "bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between",
            children: [
              n.jsxs("div", {
                className: "flex items-center gap-3",
                children: [
                  n.jsx("div", {
                    className: `w-3.5 h-3.5 rounded-full ${u === "available" ? "bg-green-500 animate-pulse" : u === "busy" ? "bg-orange-500" : "bg-slate-400"}`
                  }),
                  n.jsxs("div", {
                    children: [
                      n.jsx("span", { className: "text-slate-400 text-[10px] sm:text-xs block font-bold", children: "حالة اتصالك الآن" }),
                      n.jsx("span", {
                        className: "text-slate-800 font-extrabold text-sm",
                        children: u === "available" ? "جاهز لاستلام طلبات" : u === "busy" ? "في مهمة حالية" : "غير متصل بالشبكة"
                      })
                    ]
                  })
                ]
              }),
              n.jsxs("select", {
                value: u,
                onChange: g => f(g.target.value),
                className: "bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold p-1.5 rounded-xl cursor-pointer outline-none focus:border-orange-500",
                children: [
                  n.jsx("option", { value: "available", children: "متصل (متاح)" }),
                  n.jsx("option", { value: "busy", children: "مشغول" }),
                  n.jsx("option", { value: "offline", children: "غير متصل" })
                ]
              })
            ]
          })
        ]
      }),

      // Section 1: Assigned Orders (From Admin)
      n.jsxs("div", {
        className: "bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-lg space-y-6",
        children: [
          n.jsxs("div", {
            className: "flex items-center justify-between border-b border-slate-100 pb-4",
            children: [
              n.jsxs("div", {
                children: [
                  n.jsxs("h3", {
                    className: "font-extrabold text-slate-800 text-base sm:text-lg flex items-center gap-2",
                    children: [
                      n.jsx("span", { className: "text-xl", children: "🎖️" }),
                      n.jsx("span", { children: "الطلبات المسندة إليك من الإدارة (أبو شهاب)" }),
                      totalAssignedCount > 0 && n.jsx("span", {
                        className: "bg-red-500 text-white text-xs font-black px-2 py-0.5 rounded-full animate-pulse",
                        children: `${totalAssignedCount} طلب جاهز`
                      })
                    ]
                  }),
                  n.jsx("p", {
                    className: "text-slate-400 text-xs mt-0.5",
                    children: "الطلبات التي تم تكليفك بها مباشرة من لوحة الإدارة لمتابعتها وتوصيلها فوراً."
                  })
                ]
              }),
              n.jsx("span", {
                className: "bg-orange-500/10 text-orange-600 font-extrabold text-[10px] sm:text-xs px-3 py-1 rounded-full border border-orange-500/10",
                children: "تحديث فوري نشط"
              })
            ]
          }),

          totalAssignedCount > 0 ? (
            n.jsx("div", {
              className: "space-y-4",
              children: assignedOrders.map(order => {
                var lm;
                const landmark = T1.find(g => g.id === order.addressLandmark);
                const landmarkName = (landmark == null ? void 0 : landmark.arabicName) || order.addressLandmark || "المعلم المختار";
                const ctx = getOrderTypeContext(order);
                const isAccepted = order.status === "accepted" || order.status === "preparing" || order.status === "picked_up";

                return n.jsxs("div", {
                  key: order.id,
                  className: "border-2 border-orange-500/40 bg-orange-50/20 rounded-2xl overflow-hidden hover:border-orange-500 transition-all shadow-md",
                  children: [
                    // Order Header
                    n.jsxs("div", {
                      className: "bg-slate-900 text-white p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3",
                      children: [
                        n.jsxs("div", {
                          className: "flex items-center gap-2.5",
                          children: [
                            n.jsx("span", {
                              className: "bg-orange-500 text-slate-950 font-mono font-black text-xs px-2.5 py-1 rounded-lg shadow-sm",
                              children: order.id.toUpperCase()
                            }),
                            n.jsx("span", {
                              className: "bg-emerald-500 text-white text-[10px] font-black px-2 py-0.5 rounded-md",
                              children: "🎖️ تم تكليفك من الإدارة"
                            }),
                            n.jsxs("div", {
                              children: [
                                n.jsx("span", { className: "text-[10px] text-slate-400 block font-bold", children: "تاريخ ووقت الطلب:" }),
                                n.jsx("span", { className: "text-slate-200 font-bold text-xs", children: new Date(order.createdAt).toLocaleTimeString("ar-SY") })
                              ]
                            })
                          ]
                        }),
                        n.jsxs("div", {
                          className: "flex items-center gap-2 text-xs font-bold",
                          children: [
                            n.jsx("span", { className: "text-slate-400", children: "طريقة الدفع:" }),
                            n.jsx("span", {
                              className: "text-emerald-400 bg-emerald-500/20 border border-emerald-400/30 px-2 py-0.5 rounded-md font-black",
                              children: order.paymentMethod === "online" ? "دفع إلكتروني مدفوع" : "كاش عند الاستلام"
                            })
                          ]
                        })
                      ]
                    }),

                    // Order Body
                    n.jsxs("div", {
                      className: "p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center",
                      children: [
                        n.jsxs("div", {
                          className: "sm:col-span-8 space-y-3.5",
                          children: [
                            // Customer Info
                            n.jsxs("div", {
                              className: "flex items-start gap-3 bg-white p-3 rounded-xl border border-slate-200/80 shadow-xs",
                              children: [
                                n.jsx("div", {
                                  className: "w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0 font-bold",
                                  children: "👤"
                                }),
                                n.jsxs("div", {
                                  className: "flex-1",
                                  children: [
                                    n.jsx("span", { className: "text-[10px] text-slate-400 block font-bold", children: "صاحب الطلب (الزبون):" }),
                                    n.jsxs("div", {
                                      className: "flex items-center gap-2 flex-wrap",
                                      children: [
                                        n.jsx("span", { className: "text-slate-900 font-black text-sm", children: order.customerName || "أحمد الرفاعي" }),
                                        order.customerPhone && n.jsxs("a", {
                                          href: `tel:${order.customerPhone}`,
                                          className: "text-xs text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded-md hover:underline",
                                          children: ["📞 ", order.customerPhone]
                                        })
                                      ]
                                    })
                                  ]
                                })
                              ]
                            }),

                            // Store Info
                            n.jsxs("div", {
                              className: "flex items-start gap-3",
                              children: [
                                n.jsx("div", {
                                  className: "w-9 h-9 rounded-xl bg-orange-500/10 text-orange-600 flex items-center justify-center shrink-0",
                                  children: n.jsx(Za, { className: "w-4.5 h-4.5" })
                                }),
                                n.jsxs("div", {
                                  children: [
                                    n.jsx("span", { className: "text-[10px] text-slate-400 block font-semibold", children: "المحل / المتجر المجهّز:" }),
                                    n.jsx("span", { className: "text-slate-800 font-extrabold text-sm", children: order.storeName || "متجر محلي" })
                                  ]
                                })
                              ]
                            }),

                            // Destination Info
                            n.jsxs("div", {
                              className: "flex items-start gap-3",
                              children: [
                                n.jsx("div", {
                                  className: "w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0",
                                  children: n.jsx(Ia, { className: "w-4.5 h-4.5" })
                                }),
                                n.jsxs("div", {
                                  children: [
                                    n.jsx("span", { className: "text-[10px] text-slate-400 block font-semibold", children: "وجهة التسليم (المعلم الجغرافي):" }),
                                    n.jsx("span", { className: "text-slate-800 font-extrabold text-sm", children: landmarkName }),
                                    order.additionalDirections && n.jsx("p", { className: "text-xs text-slate-500 mt-0.5", children: order.additionalDirections })
                                  ]
                                })
                              ]
                            }),

                            // Items List
                            n.jsxs("div", {
                              className: "bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs font-semibold text-slate-600",
                              children: [
                                n.jsx("span", { className: "text-slate-400 block text-[10px] font-bold mb-1", children: "محتويات وأصناف الطلب:" }),
                                (order.items || []).map(g => `${g.product ? g.product.name : "صنف"} (x${g.quantity})`).join(" ، ") || "طلب مخصص"
                              ]
                            })
                          ]
                        }),

                        // Price & Action Button
                        n.jsxs("div", {
                          className: "sm:col-span-4 border-t sm:border-t-0 sm:border-r border-slate-200 pt-4 sm:pt-0 sm:pr-5 flex flex-col justify-between space-y-4",
                          children: [
                            n.jsxs("div", {
                              className: "text-right bg-white p-3 rounded-xl border border-slate-200/80",
                              children: [
                                n.jsx("span", { className: "text-[10px] text-slate-400 block font-bold", children: "المبلغ الإجمالي:" }),
                                n.jsxs("span", { className: "text-orange-600 font-black text-2xl", children: [order.total || (order.subtotal + order.deliveryFee), " ل.س"] }),
                                n.jsxs("span", {
                                  className: "text-[10px] text-emerald-600 block font-bold mt-1",
                                  children: ["🛵 أرباح التوصيل للكابتن: ", order.deliveryFee || 5e3, " ل.س"]
                                })
                              ]
                            }),
                            n.jsxs("button", {
                              onClick: () => handleStartDelivery(order),
                              className: "w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-extrabold text-xs sm:text-sm py-3.5 px-4 rounded-xl transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center gap-1.5 cursor-pointer active:scale-95",
                              children: [
                                n.jsx(P0, { className: "w-4.5 h-4.5 text-white fill-current" }),
                                n.jsx("span", { children: isAccepted ? "متابعة الرحلة والتواصل مع الزبون 🗺️" : "قبول المهمة وبدء التوصيل فوراً 🚀" })
                              ]
                            })
                          ]
                        })
                      ]
                    })
                  ]
                });
              })
            })
          ) : (
            n.jsxs("div", {
              className: "p-6 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 space-y-2",
              children: [
                n.jsx("div", { className: "text-3xl", children: "☕" }),
                n.jsx("h4", { className: "font-extrabold text-slate-700 text-sm", children: "لا توجد طلبات مسندة إليك حالياً من الإدارة" }),
                n.jsx("p", { className: "text-slate-400 text-xs", children: "عندما يقوم المشرف أو مسؤول الطلبات بتكليفك بطلب، سيظهر هنا فوراً مع تنبيه باللون البرتقالي." })
              ]
            })
          )
        ]
      }),

      // Section 2: Available Unassigned Orders in the Village
      n.jsxs("div", {
        className: "bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-lg space-y-6",
        children: [
          n.jsxs("div", {
            className: "flex items-center justify-between border-b border-slate-100 pb-4",
            children: [
              n.jsxs("div", {
                children: [
                  n.jsxs("h3", {
                    className: "font-extrabold text-slate-800 text-base sm:text-lg flex items-center gap-2",
                    children: [
                      n.jsx($0, { className: "w-5.5 h-5.5 text-orange-500 animate-swing" }),
                      n.jsx("span", { children: "الطلبات المتاحة للتوصيل في القرية" }),
                      totalAvailableCount > 0 && n.jsx("span", {
                        className: "bg-orange-500 text-white text-xs font-black px-2 py-0.5 rounded-full",
                        children: `${totalAvailableCount} متاح`
                      })
                    ]
                  }),
                  n.jsx("p", {
                    className: "text-slate-400 text-xs mt-0.5",
                    children: "طلبات الزبائن التي بانتظار سائق حر. يمكنك قبول أي منها فوراً."
                  })
                ]
              })
            ]
          }),

          totalAvailableCount > 0 ? (
            n.jsx("div", {
              className: "space-y-4",
              children: availableOrders.map(order => {
                const landmark = T1.find(g => g.id === order.addressLandmark);
                const landmarkName = (landmark == null ? void 0 : landmark.arabicName) || order.addressLandmark || "المعلم المختار";

                return n.jsxs("div", {
                  key: order.id,
                  className: "border border-slate-200 rounded-2xl overflow-hidden hover:border-orange-500/40 transition-all shadow-xs bg-white",
                  children: [
                    n.jsxs("div", {
                      className: "bg-slate-50 p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3",
                      children: [
                        n.jsxs("div", {
                          className: "flex items-center gap-2.5",
                          children: [
                            n.jsx("span", { className: "bg-slate-900 text-white font-mono font-bold text-xs px-2.5 py-1 rounded-lg", children: order.id.toUpperCase() }),
                            n.jsxs("div", {
                              children: [
                                n.jsx("span", { className: "text-[10px] text-slate-400 block font-bold", children: "وقت الطلب:" }),
                                n.jsx("span", { className: "text-slate-600 font-bold text-xs", children: new Date(order.createdAt).toLocaleTimeString("ar-SY") })
                              ]
                            })
                          ]
                        }),
                        n.jsxs("div", {
                          className: "flex items-center gap-1 text-xs font-bold",
                          children: [
                            n.jsx("span", { className: "text-slate-400", children: "طريقة الدفع:" }),
                            n.jsx("span", { className: "text-emerald-600 bg-emerald-500/10 border border-emerald-500/10 px-2 py-0.5 rounded-md", children: "كاش عند الاستلام" })
                          ]
                        })
                      ]
                    }),
                    n.jsxs("div", {
                      className: "p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center",
                      children: [
                        n.jsxs("div", {
                          className: "sm:col-span-8 space-y-3",
                          children: [
                            n.jsxs("div", {
                              className: "flex items-start gap-3",
                              children: [
                                n.jsx("div", { className: "w-9 h-9 rounded-xl bg-orange-500/10 text-orange-600 flex items-center justify-center shrink-0", children: n.jsx(Za, { className: "w-4.5 h-4.5" }) }),
                                n.jsxs("div", {
                                  children: [
                                    n.jsx("span", { className: "text-[10px] text-slate-400 block font-semibold", children: "المحل / المتجر:" }),
                                    n.jsx("span", { className: "text-slate-800 font-extrabold text-sm", children: order.storeName || "متجر محلي" })
                                  ]
                                })
                              ]
                            }),
                            n.jsxs("div", {
                              className: "flex items-start gap-3",
                              children: [
                                n.jsx("div", { className: "w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0", children: n.jsx(Ia, { className: "w-4.5 h-4.5" }) }),
                                n.jsxs("div", {
                                  children: [
                                    n.jsx("span", { className: "text-[10px] text-slate-400 block font-semibold", children: "المعلم الجغرافي:" }),
                                    n.jsx("span", { className: "text-slate-800 font-extrabold text-sm", children: landmarkName }),
                                    order.additionalDirections && n.jsx("p", { className: "text-xs text-slate-500 mt-0.5", children: order.additionalDirections })
                                  ]
                                })
                              ]
                            }),
                            n.jsxs("div", {
                              className: "bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs font-semibold text-slate-600",
                              children: [
                                (order.items || []).map(g => `${g.product ? g.product.name : "صنف"} (x${g.quantity})`).join(" ، ") || "طلب مخصص"
                              ]
                            })
                          ]
                        }),
                        n.jsxs("div", {
                          className: "sm:col-span-4 border-t sm:border-t-0 sm:border-r border-slate-100 pt-4 sm:pt-0 sm:pr-5 flex flex-col justify-between space-y-4",
                          children: [
                            n.jsxs("div", {
                              className: "text-right",
                              children: [
                                n.jsx("span", { className: "text-[10px] text-slate-400 block font-bold", children: "المبلغ الإجمالي:" }),
                                n.jsxs("span", { className: "text-orange-600 font-black text-2xl", children: [order.total || (order.subtotal + order.deliveryFee), " ل.س"] })
                              ]
                            }),
                            n.jsxs("button", {
                              onClick: () => handleStartDelivery(order),
                              className: "w-full bg-slate-900 hover:bg-slate-850 text-white font-extrabold text-xs sm:text-sm py-3 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer active:scale-95",
                              children: [
                                n.jsx(P0, { className: "w-4.5 h-4.5 text-orange-500 fill-current" }),
                                n.jsx("span", { children: "قبول وتكليف نفسي بهذا الطلب 🏍️" })
                              ]
                            })
                          ]
                        })
                      ]
                    })
                  ]
                });
              })
            })
          ) : (
            n.jsxs("div", {
              className: "p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 space-y-4",
              children: [
                n.jsx("div", { className: "w-14 h-14 rounded-full bg-slate-100 border border-slate-200 text-slate-400 flex items-center justify-center mx-auto", children: n.jsx(Ga, { className: "w-7 h-7" }) }),
                n.jsxs("div", {
                  className: "space-y-1 max-w-md mx-auto",
                  children: [
                    n.jsx("h4", { className: "font-extrabold text-slate-800 text-sm", children: "لا توجد طلبات غير مسندة بانتظار سائق حالياً" }),
                    n.jsx("p", { className: "text-slate-400 text-xs leading-relaxed", children: "يمكنك إنشاء طلب كزبون من المتجر، أو إسناد طلب من لوحة الإدارة، أو توليد طلب تجريبي فوراً لاختبار المسار." })
                  ]
                }),
                n.jsxs("button", {
                  onClick: p,
                  className: "bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs py-2.5 px-5 rounded-xl shadow-md transition-all flex items-center gap-1.5 mx-auto cursor-pointer",
                  children: [
                    n.jsx(Sa, { className: "w-4 h-4 text-white" }),
                    n.jsx("span", { children: "توليد طلب تجريبي لأبو شهاب ⚡" })
                  ]
                })
              ]
            })
          )
        ]
      }),

      // Info note
      n.jsxs("div", {
        className: "bg-orange-50/60 border border-orange-200 p-4 rounded-2xl flex items-start gap-3",
        children: [
          n.jsx(Sa, { className: "w-5 h-5 text-orange-500 shrink-0 mt-0.5" }),
          n.jsxs("div", {
            className: "text-xs text-orange-950 leading-normal",
            children: [
              n.jsx("p", { className: "font-black", children: "ملاحظة كابتن التوصيل (أبو شهاب):" }),
              n.jsx("p", { className: "mt-0.5", children: "عند الضغط على قبول وبدء التوصيل، تنفتح فوراً شاشة الخريطة الحية ومسار التوصيل مع نافذة الدردشة والرسائل الصوتية للتواصل مع الزبون وإعلامه بكل مرحلة!" })
            ]
          })
        ]
      })
    ]
  });
}

const nxe=[{id:"restaurants",label:"🍔 مأكولات ومطاعم"},{id:"supermarket",label:"🏪 سوبرماركت وتموينات"},{id:"pharmacy",label:"💊 أدوية وصيدليات"},{id:"vegetables",label:"🍎 خضار وفواكه طازجة"},{id:"sweets",label:"🍰 حلويات ومعجنات"}],Ld=[{id:"rest_img",label:"🍔 مطعم وجبات",url:"https://images.unsplash.com/photo-1542838132-92c53300491e?w=600"},{id:"grocery_img",label:"🍏 خضار وبقالة",url:"https://images.unsplash.com/photo-1542838132-92c53300491e?w=600"},{id:"pharm_img",label:"💊 صيدلية وعناية",url:"https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600"},{id:"sweets_img",label:"🍰 كيك وحلويات",url:"https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600"}];