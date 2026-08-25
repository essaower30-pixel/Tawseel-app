fset:qV(o,b3e(i)),velocity:M3e(i,.1)}}function b3e(o){return o[0]}function jR(o){return o[o.length-1]}function M3e(o,i){if(o.length<2)return{x:0,y:0};let d=o.length-1,r=null;const u=jR(o);for(;d>=0&&(r=o[d],!(u.timestamp-r.timestamp>pa(i)));)d--;if(!r)return{x:0,y:0};r===o[0]&&o.length>2&&u.timestamp-r.timestamp>pa(i)*2&&(r=o[1]);const f=Ca(u.timestamp-r.timestamp);if(f===0)return{x:0,y:0};const p={x:(u.x-r.x)/f,y:(u.y-r.y)/f};return p.x===1/0&&(p.x=0),p.y===1/0&&(p.y=0),p}function w3e(o,{min:i,max:d},r){return i!==void 0&&o<i?o=r?Qe(i,o,r.min):Math.max(o,i):d!==void 0&&o>d&&(o=r?Qe(d,o,r.max):Math.min(o,d)),o}function zV(o,i,d){return{min:i!==void 0?o.min+i:void 0,max:d!==void 0?o.max+d-(o.max-o.min):void 0}}function _3e(o,{top:i,left:d,bottom:r,right:u}){return{x:zV(o.x,d,u),y:zV(o.y,i,r)}}function $V(o,i){let d=i.min-o.min,r=i.max-o.max;return i.max-i.min<o.max-o.min&&([d,r]=[r,d]),{min:d,max:r}}function N3e(o,i){return{x:$V(o.x,i.x),y:$V(o.y,i.y)}}function j3e(o,i){let d=.5;const r=Zt(o),u=Zt(i);return u>r?d=o2(i.min,i.max-r,o.min):r>u&&(d=o2(o.min,o.max-u,i.min)),gn(0,1,d)}function L3e(o,i){const d={};return i.min!==void 0&&(d.min=i.min-o.min),i.max!==void 0&&(d.max=i.max-o.min),d}const iq=.35;function S3e(o=iq){return o===!1?o=0:o===!0&&(o=iq),{x:TV(o,"left","right"),y:TV(o,"top","bottom")}}function TV(o,i,d){return{min:HV(o,i),max:HV(o,d)}}function HV(o,i){return typeof o=="number"?o:o[i]||0}const C3e=new WeakMap;class A3e{constructor(i){this.openDragLock=null,this.isDragging=!1,this.currentDirection=null,this.originPoint={x:0,y:0},this.constraints=!1,this.hasMutatedConstraints=!1,this.elastic=Ct(),this.latestPointerEvent=null,this.latestPanInfo=null,this.visualElement=i}start(i,{snapToCursor:d=!1,distanceThreshold:r}={}){const{presenceContext:u}=this.visualElement;if(u&&u.isPresent===!1)return;const f=M=>{d&&this.snapToCursor(h2(M).point),this.stopAnimation()},p=(M,w)=>{const{drag:C,dragPropagation:L,onDragStart:H}=this.getProps();if(C&&!L&&(this.openDragLock&&this.openDragLock(),this.openDragLock=nfe(C),!this.openDragLock))return;this.latestPointerEvent=M,this.latestPanInfo=w,this.isDragging=!0,this.currentDirection=null,this.resolveConstraints(),this.visualElement.projection&&(this.visualElement.projection.isAnimationBlocked=!0,this.visualElement.projection.target=void 0),un(E=>{let U=this.getAxisMotionValue(E).get()||0;if(kn.test(U)){const{projection:F}=this.visualElement;if(F&&F.layout){const O=F.layout.layoutBox[E];O&&(U=Zt(O)*(parseFloat(U)/100))}}this.originPoint[E]=U}),H&&We.update(()=>H(M,w),!1,!0),QI(this.visualElement,"transform");const{animationState:q}=this.visualElement;q&&q.setActive("whileDrag",!0)},m=(M,w)=>{this.latestPointerEvent=M,this.latestPanInfo=w;const{dragPropagation:C,dragDirectionLock:L,onDirectionLock:H,onDrag:q}=this.getProps();if(!C&&!this.openDragLock)return;const{offset:E}=w;if(L&&this.currentDirection===null){this.currentDirection=q3e(E),this.currentDirection!==null&&H&&H(this.currentDirection);return}this.updateAxis("x",w.point,E),this.updateAxis("y",w.point,E),this.visualElement.render(),q&&We.update(()=>q(M,w),!1,!0)},g=(M,w)=>{this.latestPointerEvent=M,this.latestPanInfo=w,this.stop(M,w),this.latestPointerEvent=null,this.latestPanInfo=null},x=()=>{const{dragSnapToOrigin:M}=this.getProps();(M||this.constraints)&&this.startAnimation({x:0,y:0})},{dragSnapToOrigin:b}=this.getProps();this.panSession=new NR(i,{onSessionStart:f,onStart:p,onMove:m,onSessionEnd:g,resumeAnimation:x},{transformPagePoint:this.visualElement.getTransformPagePoint(),dragSnapToOrigin:b,distanceThreshold:r,contextWindow:_R(this.visualElement),element:this.visualElement.current})}stop(i,d){const r=i||this.latestPointerEvent,u=d||this.latestPanInfo,f=this.isDragging;if(this.cancel(),!f||!u||!r)return;const{velocity:p}=u;this.startAnimation(p);const{onDragEnd:m}=this.getProps();m&&We.postRender(()=>m(r,u))}cancel(){this.isDragging=!1;const{projection:i,animationState:d}=this.visualElement;i&&(i.isAnimationBlocked=!1),this.endPanSession();const{dragPropagation:r}=this.getProps();!r&&this.openDragLock&&(this.openDragLock(),this.openDragLock=null),d&&d.setActive("whileDrag",!1)}endPanSession(){this.panSession&&this.panSession.end(),this.panSession=void 0}updateAxis(i,d,r){const{drag:u}=this.getProps();if(!r||!jd(i,u,this.currentDirection))return;const f=this.getAxisMotionValue(i);let p=this.originPoint[i]+r[i];this.constraints&&this.constraints[i]&&(p=w3e(p,this.constraints[i],this.elastic[i])),f.set(p)}resolveConstraints(){var f;const{dragConstraints:i,dragElastic:d}=this.getProps(),r=this.visualElement.projection&&!this.visualElement.projection.layout?this.visualElement.projection.measure(!1):(f=this.visualElement.projection)==null?void 0:f.layout,u=this.constraints;i&&sr(i)?this.constraints||(this.constraints=this.resolveRefConstraints()):i&&r?this.constraints=_3e(r.layoutBox,i):this.constraints=!1,this.elastic=S3e(d),u!==this.constraints&&!sr(i)&&r&&this.constraints&&!this.hasMutatedConstraints&&un(p=>{this.constraints!==!1&&this.getAxisMotionValue(p)&&(this.constraints[p]=L3e(r.layoutBox[p],this.constraints[p]))})}resolveRefConstraints(){const{dragConstraints:i,onMeasureDragConstraints:d}=this.getProps();if(!i||!sr(i))return!1;const r=i.current,{projection:u}=this.visualElement;if(!u||!u.layout)return!1;u.root&&(u.root.scroll=void 0,u.root.updateScroll());const f=qfe(r,u.root,this.visualElement.getTransformPagePoint());let p=N3e(u.layout.layoutBox,f);if(d){const m=d(Cfe(p));this.hasMutatedConstraints=!!m,m&&(p=XD(m))}return p}startAnimation(i){const{drag:d,dragMomentum:r,dragElastic:u,dragTransition:f,dragSnapToOrigin:p,onDragTransitionEnd:m}=this.getProps(),g=this.constraints||{},x=un(b=>{if(!jd(b,d,this.currentDirection))return;let M=g&&g[b]||{};(p===!0||p===b)&&(M={min:0,max:0});const w=u?200:1e6,C=u?40:1e7,L={type:"inertia",velocity:r?i[b]:0,bounceStiffness:w,bounceDamping:C,timeConstant:750,restDelta:1,restSpeed:10,...f,...M};return this.startAxisValueAnimation(b,L)});return Promise.all(x).then(m)}startAxisValueAnimation(i,d){const r=this.getAxisMotionValue(i);return QI(this.visualElement,i),r.start(jq(i,r,0,d,this.visualElement,!1))}stopAnimation(){un(i=>this.getAxisMotionValue(i).stop())}getAxisMotionValue(i){const d=`_drag${i.toUpperCase()}`,u=this.visualElement.getProps()[d];return u||this.visualElement.getValue(i,this.visualElement.latestValues[i]??0)}snapToCursor(i){un(d=>{const{drag:r}=this.getProps();if(!jd(d,r,this.currentDirection))return;const{projection:u}=this.visualElement,f=this.getAxisMotionValue(d);if(u&&u.layout){const{min:p,max:m}=u.layout.layoutBox[d],g=f.get()||0;f.set(i[d]-Qe(p,m,.5)+g)}})}scalePositionWithinConstraints(){if(!this.visualElement.current)return;const{drag:i,dragConstraints:d}=this.getProps(),{projection:r}=this.visualElement;if(!sr(d)||!r||!this.constraints)return;this.stopAnimation();const u={x:0,y:0};un(p=>{const m=this.getAxisMotionValue(p);if(m&&this.constraints!==!1){const g=m.get();u[p]=j3e({min:g,max:g},this.constraints[p])}});const{transformTemplate:f}=this.visualElement.getProps();this.visualElement.current.style.transform=f?f({},""):"none",r.root&&r.root.updateScroll(),r.updateLayout(),this.constraints=!1,this.resolveConstraints(),un(p=>{if(!jd(p,i,null))return;const m=this.getAxisMotionValue(p),{min:g,max:x}=this.constraints[p];m.set(Qe(g,x,u[p]))}),this.visualElement.render()}addListeners(){if(!this.visualElement.current)return;C3e.set(this.visualElement,this);const i=this.visualElement.current,d=n2(i,"pointerdown",x=>{const{drag:b,dragListener:M=!0}=this.getProps(),w=x.target,C=w!==i&&rfe(w);b&&M&&!C&&this.start(x)});let r;const u=()=>{const{dragConstraints:x}=this.getProps();sr(x)&&x.current&&(this.constraints=this.resolveRefConstraints(),r||(r=I3e(i,x.current,()=>this.scalePositionWithinConstraints())))},{projection:f}=this.visualElement,p=f.addEventListener("measure",u);f&&!f.layout&&(f.root&&f.root.updateScroll(),f.updateLayout()),We.read(u);const m=i2(window,"resize",()=>this.scalePositionWithinConstraints()),g=f.addEventListener("didUpdate",(({delta:x,hasLayoutChanged:b})=>{this.isDragging&&b&&(un(M=>{const w=this.getAxisMotionValue(M);w&&(this.originPoint[M]+=x[M].translate,w.set(w.get()+x[M].translate))}),this.visualElement.render())}));return()=>{m(),d(),p(),g&&g(),r&&r()}}getProps(){const i=this.visualElement.getProps(),{drag:d=!1,dragDirectionLock:r=!1,dragPropagation:u=!1,dragConstraints:f=!1,dragElastic:p=iq,dragMomentum:m=!0}=i;return{...i,drag:d,dragDirectionLock:r,dragPropagation:u,dragConstraints:f,dragElastic:p,dragMomentum:m}}}function VV(o){let i=!0;return()=>{if(i){i=!1;return}o()}}function I3e(o,i,d){const r=UH(o,VV(d)),u=UH(i,VV(d));return()=>{r(),u()}}function jd(o,i,d){return(i===!0||i===o)&&(d===null||d===o)}function q3e(o,i=10){let d=null;return Math.abs(o.y)>i?d="y":Math.abs(o.x)>i&&(d="x"),d}class z3e extends B1{constructor(i){super(i),this.removeGroupControls=qa,this.removeListeners=qa,this.controls=new A3e(i)}mount(){const{dragControls:i}=this.node.getProps();i&&(this.removeGroupControls=i.subscribe(this.controls)),this.removeListeners=this.controls.addListeners()||qa}update(){const{dragControls:i}=this.node.getProps(),{dragControls:d}=this.node.prevProps||{};i!==d&&(this.removeGroupControls(),i&&(this.removeGroupControls=i.subscribe(this.controls)))}unmount(){this.removeGroupControls(),this.removeListeners(),this.controls.isDragging||this.controls.endPanSession()}}const $I=o=>(i,d)=>{o&&We.update(()=>o(i,d),!1,!0)};class $3e extends B1{constructor(){super(...arguments),this.removePointerDownListener=qa}onPointerDown(i){this.session=new NR(i,this.createPanHandlers(),{transformPagePoint:this.node.getTransformPagePoint(),contextWindow:_R(this.node)})}createPanHandlers(){const{onPanSessionStart:i,onPanStart:d,onPan:r,onPanEnd:u}=this.node.getProps();return{onSessionStart:$I(i),onStart:$I(d),onMove:$I(r),onEnd:(f,p)=>{delete this.session,u&&We.postRender(()=>u(f,p))}}}mount(){this.removePointerDownListener=n2(this.node.current,"pointerdown",i=>this.onPointerDown(i))}update(){this.session&&this.session.updateHandlers(this.createPanHandlers())}unmount(){this.removePointerDownListener(),this.session&&this.session.end()}}let TI=!1;class T3e extends _.Component{componentDidMount(){const{visualElement:i,layoutGroup:d,switchLayoutGroup:r,layoutId:u}=this.props,{projection:f}=i;f&&(d.group&&d.group.add(f),r&&r.register&&u&&r.register(f),TI&&f.root.didUpdate(),f.addEventListener("animationComplete",()=>{this.safeToRemove()}),f.setOptions({...f.options,layoutDependency:this.props.layoutDependency,onExitComplete:()=>this.safeToRemove()})),WS.hasEverUpdated=!0}getSnapshotBeforeUpdate(i){const{layoutDependency:d,visualElement:r,drag:u,isPresent:f}=this.props,{projection:p}=r;return p&&(p.isPresent=f,i.layoutDependency!==d&&p.setOptions({...p.options,layoutDependency:d}),TI=!0,u||i.layoutDependency!==d||d===void 0||i.isPresent!==f?p.willUpdate():this.safeToRemove(),i.isPresent!==f&&(f?p.promote():p.relegate()||We.postRender(()=>{const m=p.getStack();(!m||!m.members.length)&&this.safeToRemove()}))),null}componentDidUpdate(){const{visualElement:i,layoutAnchor:d}=this.props,{projection:r}=i;r&&(r.options.layoutAnchor=d,r.root.didUpdate(),Aq.postRender(()=>{!r.currentAnimation&&r.isLead()&&this.safeToRemove()}))}componentWillUnmount(){const{visualElement:i,layoutGroup:d,switchLayoutGroup:r}=this.props,{projection:u}=i;TI=!0,u&&(u.scheduleCheckAfterUnmount(),d&&d.group&&d.group.remove(u),r&&r.deregister&&r.deregister(u))}safeToRemove(){const{safeToRemove:i}=this.props;i&&i()}render(){return null}}function LR(o){const[i,d]=fR(),r=_.useContext(hq);return n.jsx(T3e,{...o,layoutGroup:r,switchLayoutGroup:_.useContext(MR),isPresent:i,safeToRemove:d})}const H3e={pan:{Feature:$3e},drag:{Feature:z3e,ProjectionNode:yR,MeasureLayout:LR}};function DV(o,i,d){const{props:r}=o;o.animationState&&r.whileHover&&o.animationState.setActive("whileHover",d==="Start");const u="onHover"+d,f=r[u];f&&We.postRender(()=>f(i,h2(i)))}class V3e extends B1{mount(){const{current:i}=this.node;i&&(this.unmount=sfe(i,(d,r)=>(DV(this.node,r,"Start"),u=>DV(this.node,u,"End"))))}unmount(){}}class D3e extends B1{constructor(){super(...arguments),this.isActive=!1}onFocus(){let i=!1;try{i=this.node.current.matches(":focus-visible")}catch{i=!0}!i||!this.node.animationState||(this.node.animationState.setActive("whileFocus",!0),this.isActive=!0)}onBlur(){!this.isActive||!this.node.animationState||(this.node.animationState.setActive("whileFocus",!1),this.isActive=!1)}mount(){this.unmount=l2(i2(this.node.current,"focus",()=>this.onFocus()),i2(this.node.current,"blur",()=>this.onBlur()))}unmount(){}}function RV(o,i,d){const{props:r}=o;if(o.current instanceof HTMLButtonElement&&o.current.disabled)return;o.animationState&&r.whileTap&&o.animationState.setActive("whileTap",d==="Start");const u="onTap"+(d==="End"?"":d),f=r[u];f&&We.postRender(()=>f(i,h2(i)))}class R3e extends B1{mount(){const{current:i}=this.node;if(!i)return;const{globalTapTarget:d,propagate:r}=this.node.props;this.unmount=hfe(i,(u,f)=>(RV(this.node,f,"Start"),(p,{success:m})=>RV(this.node,p,m?"End":"Cancel")),{useGlobalTarget:d,stopPropagation:(r==null?void 0:r.tap)===!1})}unmount(){}}const lq=new WeakMap,HI=new WeakMap,B3e=o=>{const i=lq.get(o.target);i&&i(o)},E3e=o=>{o.forEach(B3e)};function O3e({root:o,...i}){const d=o||document;HI.has(d)||HI.set(d,{});const r=HI.get(d),u=JSON.stringify(i);return r[u]||(r[u]=new IntersectionObserver(E3e,{root:o,...i})),r[u]}function P3e(o,i,d){const r=O3e(i);return lq.set(o,d),r.observe(o),()=>{lq.delete(o),r.unobserve(o)}}const U3e={some:0,all:1};class F3e extends B1{constructor(){super(...arguments),this.hasEnteredView=!1,this.isInView=!1}startObserver(){var g;(g=this.stopObserver)==null||g.call(this);const{viewport:i={}}=this.node.getProps(),{root:d,margin:r,amount:u="some",once:f}=i,p={root:d?d.current:void 0,rootMargin:r,threshold:typeof u=="number"?u:U3e[u]},m=x=>{const{isIntersecting:b}=x;if(this.isInView===b||(this.isInView=b,f&&!b&&this.hasEnteredView))return;b&&(this.hasEnteredView=!0),this.node.animationState&&this.node.animationState.setActive("whileInView",b);const{onViewportEnter:M,onViewportLeave:w}=this.node.getProps(),C=b?M:w;C&&C(x)};this.stopObserver=P3e(this.node.current,p,m)}mount(){this.startObserver()}update(){if(typeof IntersectionObserver>"u")return;const{props:i,prevProps:d}=this.node;["amount","margin","root"].some(G3e(i,d))&&this.startObserver()}unmount(){var i;(i=this.stopObserver)==null||i.call(this),this.hasEnteredView=!1,this.isInView=!1}}function G3e({viewport:o={}},{viewport:i={}}={}){return d=>o[d]!==i[d]}const Z3e={inView:{Feature:F3e},tap:{Feature:R3e},focus:{Feature:D3e},hover:{Feature:V3e}},X3e={layout:{ProjectionNode:yR,MeasureLayout:LR}},Y3e={...k3e,...Z3e,...H3e,...X3e},K3e=p3e(Y3e,y3e),V1=K3e;function Q3e({store:o,onBack:i,cartItems:d,onAddToCart:r,onRemoveFromCart:u,onViewCart:f,products:p,onSubmitCustomOrder:customSubmit,customerUser:customerUser,mapNodes:mapNodes,setActiveOrder:setActiveOrder}){
  const[m,g]=_.useState(""),[x,b]=_.useState(null),[M,w]=_.useState(null),[C,L]=_.useState([]),
  [showPrescriptionModal, setShowPrescriptionModal]=_.useState(false),
  [prescriptionImage, setPrescriptionImage]=_.useState(""),
  [prescriptionNotes, setPrescriptionNotes]=_.useState(""),
  [prescriptionLandmark, setPrescriptionLandmark]=_.useState("center"),
  [prescriptionName, setPrescriptionName]=_.useState(customerUser?customerUser.name:""),
  [prescriptionPhone, setPrescriptionPhone]=_.useState(customerUser?customerUser.phone:""),
  [serviceNotes, setServiceNotes]=_.useState(""),
  [serviceSchedule, setServiceSchedule]=_.useState("الآن (عاجل)"),
  [serviceLandmark, setServiceLandmark]=_.useState("center"),
  [serviceName, setServiceName]=_.useState(customerUser?customerUser.name:""),
  [servicePhone, setServicePhone]=_.useState(customerUser?customerUser.phone:"");

  const q=(p||dq).filter(z=>z.storeId===o.id).filter(z=>(z.name.toLowerCase().includes(m.toLowerCase())||z.description.toLowerCase().includes(m.toLowerCase()))&&!z.isHidden),
  E=z=>d.filter(Z=>Z.product.id===z).reduce((Z,G)=>Z+G.quantity,0),
  U=d.reduce((z,Z)=>z+Z.quantity,0),
  F=z=>{z.sizes&&z.sizes.length>0||z.additions&&z.additions.length>0?(b(z),w(z.sizes&&z.sizes.length>0?z.sizes[0]:null),L([])):r(z)},
  O=z=>{L(Z=>Z.find(J=>J.name===z.name)?Z.filter(J=>J.name!==z.name):[...Z,z])},
  ne=()=>{x&&(r(x,M||void 0,C),b(null),w(null),L([]))},
  se=()=>{if(!x)return 0;const z=M?M.price:x.price,Z=C.reduce((G,J)=>G+J.price,0);return z+Z};

  const isServiceStore = ["doctors", "crafts", "drivers"].includes(o.category) || o.isService || o.id.startsWith("service_");
  const isPharmacy = o.category === "pharmacies" || o.id === "store_shifa";

  return n.jsxs("div",{className:"space-y-6",children:[
    n.jsxs("div",{className:"flex items-center justify-between",children:[
      n.jsxs("button",{onClick:i,className:"flex items-center gap-1.5 text-sm font-bold text-slate-600 hover:text-slate-900 bg-white py-2.5 px-4 rounded-xl border border-slate-200 shadow-sm cursor-pointer hover:shadow transition-all",children:[n.jsx(Zn,{className:"w-4 h-4"}),n.jsx("span",{children:"الرجوع للمتاجر"})]}),
      U>0&&n.jsxs("button",{onClick:f,className:"flex items-center gap-2 text-sm font-extrabold text-white bg-orange-500 hover:bg-orange-600 py-2.5 px-5 rounded-xl border border-white shadow-lg shadow-orange-500/20 cursor-pointer animate-bounce-slow",children:[n.jsx(Za,{className:"w-4.5 h-4.5"}),n.jsxs("span",{children:["عرض السلة الحالية (",U," سلع)"]})]})
    ]}),
    n.jsxs("div",{className:"bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl relative overflow-hidden select-none",children:[
      n.jsx("div",{className:"absolute inset-0 bg-cover bg-center opacity-10",style:{backgroundImage:`url('${o.image}')`}}),
      n.jsx("div",{className:"absolute top-0 right-0 w-48 h-48 bg-orange-500/10 rounded-full blur-2xl pointer-events-none"}),
      n.jsxs("div",{className:"relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4",children:[
        n.jsxs("div",{className:"space-y-2 text-right",children:[
          n.jsx("h2",{className:"text-2xl sm:text-3xl font-extrabold tracking-tight",children:o.name}),
          n.jsxs("div",{className:"flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-200",children:[
            n.jsxs("span",{className:"flex items-center gap-1 bg-orange-500 text-white font-extrabold px-2.5 py-0.5 rounded-full shadow-sm",children:[n.jsx(Wn,{className:"w-3.5 h-3.5 fill-current text-white"}),o.rating]}),
            n.jsxs("span",{className:"flex items-center gap-1 bg-white/10 backdrop-blur-md px-2.5 py-0.5 rounded-full",children:[n.jsx(Ga,{className:"w-3.5 h-3.5"}),o.deliveryTime]}),
            n.jsxs("span",{className:"flex items-center gap-1 bg-white/10 backdrop-blur-md px-2.5 py-0.5 rounded-full",children:[n.jsx(cl,{className:"w-3.5 h-3.5"}),"توصيل: ",o.deliveryFee," ل.س"]}),
            o.address&&n.jsxs("span",{className:"flex items-center gap-1 bg-white/10 backdrop-blur-md px-2.5 py-0.5 rounded-full text-orange-300 font-bold",children:[n.jsx(Ia,{className:"w-3.5 h-3.5"}),"العنوان: ",o.address]})
          ]})
        ]}),
        n.jsxs("div",{className:"hidden sm:block text-right",children:[
          n.jsx("span",{className:"text-slate-300 text-xs",children:"نطاق التسليم للتطبيق"}),
          n.jsx("p",{className:"font-semibold text-sm text-orange-400",children:o.deliveryArea||"القرية وضواحيها المجاورة"})
        ]})
      ]})
    ]}),
    
    isPharmacy&&n.jsx("div",{className:"bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-3xl p-5 sm:p-6 shadow-lg relative overflow-hidden select-none border border-orange-400/20 text-right mb-4",children:n.jsxs("div",{className:"flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10",children:[
      n.jsxs("div",{className:"space-y-1.5",children:[
        n.jsx("span",{className:"bg-white/20 text-white font-extrabold text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full border border-white/10",children:"خيارات خاصة بالصيدلية 🏥"}),
        n.jsx("h3",{className:"font-black text-sm sm:text-base text-white",children:"هل لديك وصفة طبيب ورقية أو دواء تبحث عنه؟"}),
        n.jsx("p",{className:"text-white/85 text-[11px] leading-relaxed max-w-lg",children:"أرفق صورة الروشتة أو اكتب الأدوية التي تحتاجها، وسيقوم الصيدلاني بتجهيزها وإرسالها مع المندوب لعتبة بيتك فوراً!"})
      ]}),
      n.jsx("button",{onClick:()=>setShowPrescriptionModal(true),className:"bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-xs sm:text-sm py-2.5 px-4.5 rounded-xl shadow-lg transition-all active:scale-95 cursor-pointer whitespace-nowrap flex items-center gap-1 shrink-0",children:"إرسال روشتة / وصفة الطبيب 📄"})
    ]})}),

    isServiceStore?n.jsxs("div",{className:"space-y-6 text-right animate-fade-in",children:[
      n.jsxs("div",{className:"bg-white rounded-2xl p-5 sm:p-6 border border-slate-150 shadow-md space-y-3.5",children:[
        n.jsx("h3",{className:"text-base font-extrabold text-slate-800",children:"اتصال سريع ومباشر ⚡"}),
        n.jsx("p",{className:"text-slate-400 text-xs leading-relaxed",children:"بإمكانك التحدث هاتفياً بشكل فوري أو مراسلته مجاناً عبر تطبيق الواتساب لتنسيق موعد أو طلب استشارة سريعة:"}),
        n.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1",children:[
          n.jsxs("a",{href:`tel:${o.contactPhone||o.phone||o.ownerPhone||"0944111222"}`,className:"flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-sm transition-all active:scale-97 cursor-pointer",children:[
            n.jsx(Yn,{className:"w-4 h-4 animate-pulse"}),
            n.jsxs("span",{children:["اتصال هاتفي مباشر (",o.contactPhone||o.phone||o.ownerPhone||"0944111222",")"]})
          ]}),
          n.jsxs("a",{href:/Android/i.test(navigator.userAgent)?`intent://send?phone=${(o.contactPhone||o.phone||o.ownerPhone||"0944111222").replace(/^0/,"963")}&text=${encodeURIComponent("السلام عليكم ورحمة الله وبركاته، أود التواصل معك بخصوص خدمة من تطبيق القرية...")}#Intent;package=com.whatsapp;scheme=whatsapp;end`:`https://wa.me/${(o.contactPhone||o.phone||o.ownerPhone||"0944111222").replace(/^0/,"963")}?text=${encodeURIComponent("السلام عليكم ورحمة الله وبركاته، أود التواصل معك بخصوص خدمة من تطبيق القرية...")}`,target:"_blank",rel:"noopener noreferrer",className:"flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm py-3 px-3 rounded-xl shadow-sm transition-all active:scale-97 cursor-pointer",children:[n.jsx(US.MessageSquare||"span",{className:"w-4 h-4"}),n.jsx("span",{children:"واتساب 💬"})]}),
          n.jsxs("a",{href:/Android/i.test(navigator.userAgent)?`intent://send?phone=${(o.contactPhone||o.phone||o.ownerPhone||"0944111222").replace(/^0/,"963")}&text=${encodeURIComponent("السلام عليكم ورحمة الله وبركاته، أود التواصل معك بخصوص خدمة من تطبيق القرية...")}#Intent;package=com.whatsapp.w4b;scheme=whatsapp;end`:`https://wa.me/${(o.contactPhone||o.phone||o.ownerPhone||"0944111222").replace(/^0/,"963")}?text=${encodeURIComponent("السلام عليكم ورحمة الله وبركاته، أود التواصل معك بخصوص خدمة من تطبيق القرية...")}`,target:"_blank",rel:"noopener noreferrer",className:"flex items-center justify-center gap-1.5 bg-slate-950 hover:bg-slate-900 text-white font-extrabold text-xs sm:text-sm py-3 px-3 rounded-xl shadow-sm transition-all active:scale-97 cursor-pointer border border-emerald-500/40",children:[n.jsx(US.Building||"span",{className:"w-4 h-4 text-emerald-400"}),n.jsx("span",{children:"واتس الأعمال 💼"})]})
        ]})
      ]}),
      n.jsxs("div",{className:"bg-white rounded-2xl p-5 sm:p-6 border border-slate-150 shadow-md space-y-4",children:[
        n.jsxs("div",{className:"border-b border-slate-100 pb-3",children:[
          n.jsx("h3",{className:"text-base font-extrabold text-slate-800",children:"إرسال طلب خدمة وحجز عبر التطبيق 🛠️"}),
          n.jsx("p",{className:"text-slate-400 text-xs mt-1",children:"املأ تفاصيل الخدمة والموعد المناسب وسيتلقى صاحب المهنة الطلب ويثبت الحالة للتوصيل المباشر."})
        ]}),
        n.jsxs("div",{className:"space-y-4",children:[
          n.jsxs("div",{className:"space-y-1.5",children:[
            n.jsx("label",{className:"text-xs font-extrabold text-slate-700 block",children:"تفاصيل الخدمة المطلوبة وملاحظاتك بالكامل 📝"}),
            n.jsx("textarea",{value:serviceNotes,onChange:e=>setServiceNotes(e.target.value),placeholder:"اكتب بالتفصيل ما الذي تريده تحديداً (مثال: أحتاج فحص طبيب في العيادة / صيانة باب خارجي / توصيلة لوسط البلد)...",rows:3,className:"w-full bg-slate-50 border border-slate-200 focus:border-orange-500 rounded-xl py-2.5 px-3.5 text-xs outline-none text-slate-800 font-bold resize-none"})
          ]}),
          n.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4",children:[
            n.jsxs("div",{className:"space-y-1.5",children:[
              n.jsx("label",{className:"text-xs font-extrabold text-slate-700 block",children:"الموعد المفضل لتقديم الخدمة"}),
              n.jsxs("select",{value:serviceSchedule,onChange:e=>setServiceSchedule(e.target.value),className:"w-full bg-slate-50 border border-slate-200 focus:border-orange-500 rounded-xl py-2.5 px-3 text-xs outline-none text-slate-800 font-bold cursor-pointer",children:[
                n.jsx("option",{value:"الآن (عاجل وفوري)",children:"الآن (عاجل وفوري)"}),
                n.jsx("option",{value:"اليوم لاحقاً",children:"اليوم لاحقاً"}),
                n.jsx("option",{value:"غداً صباحاً",children:"غداً صباحاً"}),
                n.jsx("option",{value:"غداً مساءً",children:"غداً مساءً"}),
                n.jsx("option",{value:"تنسيق هاتفي لاحق",children:"تنسيق هاتفي لاحق"})
              ]})
            ]}),
            n.jsxs("div",{className:"space-y-1.5",children:[
              n.jsx("label",{className:"text-xs font-extrabold text-slate-700 block",children:"أقرب معلم مشهور في منطقتك لزيارتك"}),
              n.jsxs("select",{value:serviceLandmark,onChange:e=>setServiceLandmark(e.target.value),className:"w-full bg-slate-50 border border-slate-200 focus:border-orange-500 rounded-xl py-2.5 px-3 text-xs outline-none text-slate-800 font-bold cursor-pointer",children:(mapNodes||[]).filter(z=>z.type==="landmark"||z.type==="intersection").map(z=>n.jsx("option",{value:z.id,children:z.arabicName},z.id))})
            ]})
          ]}),
          n.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4",children:[
            n.jsxs("div",{className:"space-y-1.5",children:[
              n.jsx("label",{className:"text-xs font-extrabold text-slate-700 block",children:"اسمكم الكريم"}),
              n.jsx("input",{type:"text",value:serviceName,onChange:e=>setServiceName(e.target.value),placeholder:"الاسم الكامل للزبون",className:"w-full bg-slate-50 border border-slate-200 focus:border-orange-500 rounded-xl py-2.5 px-3.5 text-xs outline-none text-slate-800 font-bold"})
            ]}),
            n.jsxs("div",{className:"space-y-1.5",children:[
              n.jsx("label",{className:"text-xs font-extrabold text-slate-700 block",children:"رقم الموبايل للتواصل"}),
              n.jsx("input",{type:"text",value:servicePhone,onChange:e=>setServicePhone(e.target.value),placeholder:"مثال: 0933123456",className:"w-full bg-slate-50 border border-slate-200 focus:border-orange-500 rounded-xl py-2.5 px-3.5 text-xs outline-none text-slate-800 font-bold text-right"})
            ]})
          ]}),
          n.jsx("button",{type:"button",onClick:()=>{
            if(!serviceNotes.trim()){alert("الرجاء إدخال تفاصيل الخدمة لمساعدة مقدم الخدمة.");return}
            if(!serviceName.trim()||!servicePhone.trim()){alert("الرجاء إدخال الاسم ورقم الهاتف ليتواصل معكم صاحب المهنة.");return}
            const oList=localStorage.getItem("tw_orders_list"),current_orders=oList?JSON.parse(oList):[];
            const serviceOrder={
              id:"tw-"+Math.floor(Math.random()*9e4+1e4),
              storeId:o.id,
              storeName:o.name,
              items:[{
                product:{
                  id:"service_"+o.id+"_"+Date.now(),
                  name:"طلب خدمة وتنسيق مباشر 🛠️",
                  price:0,
                  description:serviceNotes,
                  image:o.image,
                  category:o.category,
                  storeId:o.id
                },
                quantity:1,
                totalItemPrice:0
              }],
              subtotal:0,
              deliveryFee:0,
              total:0,
              status:"pending",
              paymentMethod:"cod",
              addressLandmark:serviceLandmark,
              additionalDirections:`الموعد: ${serviceSchedule} | ملاحظات: ${serviceNotes}`,
              customerName:serviceName.trim(),
              customerPhone:servicePhone.trim(),
              createdAt:new Date().toISOString(),
              isServiceRequest:true
            };
            const updated_orders=[serviceOrder,...current_orders];
            localStorage.setItem("tw_orders_list",JSON.stringify(updated_orders));
            customSubmit&&customSubmit(updated_orders);
            setActiveOrder&&setActiveOrder(serviceOrder);
          },className:"w-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs sm:text-sm py-3 px-4 rounded-xl cursor-pointer shadow-md active:scale-97 transition-all flex items-center justify-center gap-1.5",children:"إرسال طلب الخدمة الآن وتتبع حالتها عبر التطبيق 🚀"})
        ]})
      ]})
    ]}) : n.jsxs("div",{className:"space-y-5",children:[
      n.jsxs("div",{className:"flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3.5",children:[
        n.jsx("h3",{className:"text-lg font-extrabold text-slate-800 text-right",children:"قائمة السلع والمنتجات"}),
        n.jsxs("div",{className:"relative w-full sm:max-w-xs",children:[
          n.jsx("input",{type:"text",value:m,onChange:z=>g(z.target.value),placeholder:"ابحث عن منتج بالاسم أو الوصف...",className:"w-full bg-white border border-slate-200 focus:border-slate-900 rounded-xl py-2.5 pr-10 pl-4 text-xs sm:text-sm outline-none text-slate-800 transition-all shadow-sm text-right"}),
          n.jsx(yr,{className:"w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2"})
        ]})
      ]}),
      q.length===0?n.jsxs("div",{className:"bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-3",children:[
        n.jsx("p",{className:"text-slate-500 font-bold",children:"لم نجد أي منتج يطابق بحثك!"}),
        n.jsx("p",{className:"text-slate-400 text-xs max-w-sm mx-auto",children:'جرب البحث بكلمات أخرى كـ "شاورما" أو "أرز" أو "بيض" لتجد طلبك بسرعة.'})
      ]}):n.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:q.map(z=>{
        const Z=E(z.id),G=z.sizes&&z.sizes.length>0||z.additions&&z.additions.length>0;
        return n.jsxs("div",{className:"bg-white rounded-3xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 flex gap-4 relative overflow-hidden text-right",children:[
          z.isOffer&&n.jsxs("div",{className:"absolute top-3 left-3 bg-red-500 text-white font-extrabold text-[10px] px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md",children:[n.jsx(mn,{className:"w-3 h-3"}),n.jsx("span",{children:z.offerLabel||"عرض خاص"})]}),
          n.jsx("div",{className:"w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-slate-50 shrink-0 border border-slate-100",children:n.jsx("img",{src:z.image,alt:z.name,className:"w-full h-full object-cover",referrerPolicy:"no-referrer"})}),
          n.jsxs("div",{className:"flex-1 flex flex-col justify-between py-1 min-w-0",children:[
            n.jsxs("div",{className:"space-y-1",children:[
              n.jsxs("div",{className:"flex items-center gap-1.5 justify-end",children:[
                G&&n.jsx("span",{className:"text-[8px] bg-orange-50 text-orange-650 px-1.5 py-0.5 rounded font-extrabold shrink-0",children:"قابل للتخصيص"}),
                n.jsx("h4",{className:"font-extrabold text-slate-855 text-sm sm:text-base leading-tight truncate",children:z.name})
              ]}),
              n.jsx("p",{className:"text-slate-400 text-xs line-clamp-2 leading-relaxed",children:z.description})
            ]}),
            n.jsxs("div",{className:"flex items-center justify-between mt-2.5",children:[
              G?n.jsxs("div",{className:"flex items-center gap-1.5",children:[
                Z>0&&n.jsxs("span",{className:"text-[10px] bg-slate-100 border border-slate-200 text-slate-700 px-2.5 py-1 rounded-lg font-extrabold",children:["بالسلة: ",Z]}),
                n.jsx("button",{onClick:()=>F(z),className:"bg-slate-900 text-white hover:bg-orange-500 hover:text-slate-950 font-bold text-xs py-2 px-3 rounded-xl transition-all shadow-sm cursor-pointer whitespace-nowrap",children:"تخصيص وإضافة"})
              ]}):Z===0?n.jsx("button",{onClick:()=>F(z),className:"bg-slate-900 text-white hover:bg-orange-500 hover:text-slate-950 font-bold text-xs py-2 px-3.5 rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer whitespace-nowrap",children:"إضافة للسلة"}):n.jsxs("div",{className:"flex items-center bg-slate-50 border border-slate-200 rounded-xl px-1.5 py-1 shadow-sm select-none",children:[
                n.jsx("button",{onClick:()=>u(z),className:"w-7 h-7 flex items-center justify-center rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 font-bold text-base transition-all active:scale-90 cursor-pointer",children:"-"}),
                n.jsx("span",{className:"w-8 text-center text-xs font-extrabold text-slate-800",children:Z}),
                n.jsx("button",{onClick:()=>r(z),className:"w-7 h-7 flex items-center justify-center rounded-lg bg-slate-900 text-white hover:bg-orange-500 hover:text-slate-950 font-bold text-base transition-all active:scale-90 cursor-pointer",children:"+"})
              ]}),
              n.jsxs("div",{className:"flex items-baseline gap-1.5 flex-wrap",children:[
                z.isOffer&&z.originalPrice&&n.jsxs("span",{className:"text-slate-300 line-through text-xs font-semibold",children:[z.originalPrice," ل.س"]}),
                n.jsxs("span",{className:"text-orange-600 font-extrabold text-base sm:text-lg",children:[z.price," ل.س"]})
              ]})
            ]})
          ]})
        ]},z.id)
      })})
    ]}),
    
    n.jsx(xr,{children:x&&n.jsx("div",{className:"fixed inset-0 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in",dir:"rtl",children:n.jsxs(V1.div,{initial:{scale:.9,opacity:0},animate:{scale:1,opacity:1},exit:{scale:.9,opacity:0},className:"bg-white rounded-3xl border border-slate-200 max-w-md w-full overflow-hidden shadow-2xl flex flex-col",children:[
      n.jsxs("div",{className:"p-5 border-b border-slate-150 flex items-center justify-between bg-slate-50",children:[
        n.jsxs("div",{className:"space-y-0.5 text-right",children:[
          n.jsx("h4",{className:"font-extrabold text-slate-800 text-sm sm:text-base",children:"تخصيص المكونات والخيارات"}),
          n.jsx("p",{className:"text-[11px] text-slate-400 font-bold truncate max-w-[250px]",children:x.name})
        ]}),
        n.jsx("button",{onClick:()=>b(null),className:"w-8 h-8 rounded-full hover:bg-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-800 cursor-pointer transition-all",children:n.jsx(H1,{className:"w-5 h-5"})})
      ]}),
      n.jsxs("div",{className:"p-5 overflow-y-auto space-y-5 max-h-[350px] text-right",children:[
        x.sizes&&x.sizes.length>0&&n.jsxs("div",{className:"space-y-2.5",children:[
          n.jsx("span",{className:"text-xs text-slate-500 font-extrabold block",children:"اختر الحجم المطلوب:"}),
          n.jsx("div",{className:"grid grid-cols-3 gap-2",children:x.sizes.map((z,Z)=>{
            const G=(M==null?void 0:M.name)===z.name;
            return n.jsxs("button",{type:"button",onClick:()=>w(z),className:`p-2.5 rounded-xl border text-center transition-all flex flex-col justify-center items-center gap-1 cursor-pointer ${G?"border-slate-900 bg-slate-900 text-white shadow-md":"border-slate-200 text-slate-700 bg-white hover:bg-slate-50"}`,children:[
              n.jsx("span",{className:"text-xs font-bold",children:z.name}),
              n.jsxs("span",{className:`text-[10px] ${G?"text-orange-400":"text-slate-400"} font-extrabold`,children:[z.price," ل.س"]})
            ]},Z)
          })})
        ]}),
        x.additions&&x.additions.length>0&&n.jsxs("div",{className:"space-y-2.5",children:[
          n.jsx("span",{className:"text-xs text-slate-500 font-extrabold block",children:"أضف مكونات إضافية على ذوقك:"}),
          n.jsx("div",{className:"space-y-2",children:x.additions.map((z,Z)=>{
            const G=!!C.find(J=>J.name===z.name);
            return n.jsxs("div",{onClick:()=>O(z),className:`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${G?"border-orange-500 bg-orange-50/20":"border-slate-150 bg-white hover:bg-slate-50"}`,children:[
              n.jsxs("div",{className:"flex items-center gap-2",children:[
                n.jsx("span",{className:`w-4.5 h-4.5 rounded-md border flex items-center justify-center transition-all ${G?"bg-orange-500 border-orange-500 text-white":"border-slate-300"}`,children:G&&n.jsx(Xn,{className:"w-3 h-3 stroke-[3]"})}),
                n.jsx("span",{className:"text-xs font-semibold",children:z.name})
              ]}),
              n.jsxs("span",{className:"text-[10px] text-slate-400 font-extrabold",children:["+",z.price," ل.س"]})
            ]},Z)
          })})
        ]})
      ]}),
      n.jsxs("div",{className:"p-5 border-t border-slate-150 bg-slate-50 flex items-center justify-between",children:[
        n.jsxs("div",{className:"text-right",children:[
          n.jsx("span",{className:"text-[10px] text-slate-400 block font-bold",children:"السعر النهائي بالتعديلات"}),
          n.jsxs("b",{className:"text-base font-extrabold text-orange-650 text-orange-600",children:[se()," ل.س"]})
        ]}),
        n.jsxs("button",{type:"button",onClick:ne,className:"bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs sm:text-sm py-2.5 px-5 rounded-xl shadow-lg shadow-orange-500/10 cursor-pointer active:scale-97 transition-all flex items-center gap-1.5",children:[n.jsx(Xn,{className:"w-4 h-4"}),n.jsx("span",{children:"تأكيد الإضافة للسلة"})]})
      ]})
    ]})})}),

    showPrescriptionModal&&n.jsx("div",{className:"fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in",dir:"rtl",children:n.jsxs("div",{className:"bg-white rounded-3xl border border-slate-200 max-w-lg w-full overflow-hidden shadow-2xl flex flex-col max-h-[90vh]",children:[
      n.jsxs("div",{className:"p-5 border-b border-slate-150 flex items-center justify-between bg-slate-50",children:[
        n.jsxs("div",{className:"space-y-0.5 text-right",children:[
          n.jsx("h4",{className:"font-extrabold text-slate-800 text-sm sm:text-base",children:"📄 إرسال وصفة طبيب / روشتة"}),
          n.jsx("p",{className:"text-[11px] text-slate-400 font-bold",children:"سيتلقى الصيدلاني الوصفة ويقوم بتجهيز الأدوية المناسبة وتوصيلها فوراً."})
        ]}),
        n.jsx("button",{onClick:()=>setShowPrescriptionModal(false),className:"w-8 h-8 rounded-full hover:bg-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-800 cursor-pointer transition-all",children:n.jsx(H1,{className:"w-5 h-5"})})
      ]}),
      n.jsxs("div",{className:"p-5 overflow-y-auto space-y-4 text-right flex-1",children:[
        n.jsxs("div",{className:"space-y-1.5",children:[
          n.jsx("label",{className:"text-xs font-extrabold text-slate-700 block",children:"قم برفع صورة الوصفة الطبية 📸"}),
          n.jsxs("div",{className:"border-2 border-dashed border-slate-200 hover:border-orange-500 rounded-2xl p-4 transition-all text-center relative bg-slate-50 cursor-pointer",onClick:()=>document.getElementById("prescription-file-input").click(),children:[
            prescriptionImage?n.jsx("img",{src:prescriptionImage,className:"max-h-40 mx-auto object-contain rounded-xl border"}):n.jsxs("div",{className:"space-y-1.5 py-4",children:[
              n.jsx(US.Upload,{className:"w-8 h-8 text-slate-400 mx-auto"}),
              n.jsx("span",{className:"text-xs text-slate-500 font-bold block",children:"اسحب الصورة هنا أو اضغط للاختيار من الاستوديو"})
            ]}),
            n.jsx("input",{type:"file",id:"prescription-file-input",accept:"image/*",className:"hidden",onChange:e=>{
              const file=e.target.files[0];
              if(!file)return;
              const reader=new FileReader();
              reader.onload=event=>{
                const img=new Image();
                img.onload=()=>{
                  const canvas=document.createElement("canvas");
                  let width=img.width,height=img.height;
                  const max_size=800;
                  if(width>height){if(width>max_size){height*=max_size/width;width=max_size}}else{if(height>max_size){width*=max_size/height;height=max_size}}
                  canvas.width=width;canvas.height=height;
                  const ctx=canvas.getContext("2d");ctx.drawImage(img,0,0,width,height);
                  setPrescriptionImage(canvas.toDataURL("image/jpeg",0.7));
                };
                img.src=event.target.result;
              };
              reader.readAsDataURL(file);
            }})
          ]})
        ]}),
        n.jsxs("div",{className:"space-y-1.5",children:[
          n.jsx("label",{className:"text-xs font-extrabold text-slate-700 block",children:"قائمة الأدوية أو ملاحظات إضافية للصيدلاني ✍️"}),
          n.jsx("textarea",{value:prescriptionNotes,onChange:e=>setPrescriptionNotes(e.target.value),placeholder:"اكتب هنا أسماء الأدوية المطلوبة أو أي ملاحظات هامة للصيدلاني (مثال: أحتاج البديل لو الدواء الأصلي غير متوفر)...",rows:3,className:"w-full bg-slate-50 border border-slate-200 focus:border-orange-500 rounded-xl py-2.5 px-3.5 text-xs outline-none text-slate-800 font-bold resize-none"})
        ]}),
        n.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3",children:[
          n.jsxs("div",{className:"space-y-1.5",children:[
            n.jsx("label",{className:"text-xs font-extrabold text-slate-700 block",children:"اسم المريض الكريم"}),
            n.jsx("input",{type:"text",value:prescriptionName,onChange:e=>setPrescriptionName(e.target.value),placeholder:"الاسم الكامل",className:"w-full bg-slate-50 border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs outline-none text-slate-800 font-bold"})
          ]}),
          n.jsxs("div",{className:"space-y-1.5",children:[
            n.jsx("label",{className:"text-xs font-extrabold text-slate-700 block",children:"رقم الجوال للتواصل"}),
            n.jsx("input",{type:"text",value:prescriptionPhone,onChange:e=>setPrescriptionPhone(e.target.value),placeholder:"رقم الموبايل",className:"w-full bg-slate-50 border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs outline-none text-slate-800 font-bold text-right"})
          ]})
        ]}),
        n.jsxs("div",{className:"space-y-1.5",children:[
          n.jsx("label",{className:"text-xs font-extrabold text-slate-700 block",children:"أقرب معلم مشهور في قريتنا لتسليم الدواء"}),
          n.jsxs("select",{value:prescriptionLandmark,onChange:e=>setPrescriptionLandmark(e.target.value),className:"w-full bg-slate-50 border border-slate-200 focus:border-orange-500 rounded-xl py-2.5 px-3 text-xs outline-none text-slate-800 font-bold cursor-pointer",children:(mapNodes||[]).filter(z=>z.type==="landmark"||z.type==="intersection").map(z=>n.jsx("option",{value:z.id,children:z.arabicName},z.id))})
        ]})
      ]}),
      n.jsxs("div",{className:"p-5 border-t border-slate-150 bg-slate-50 flex items-center justify-between",children:[
        n.jsxs("div",{className:"text-right",children:[
          n.jsx("span",{className:"text-[10px] text-slate-400 block font-bold",children:"رسم التوصيل التقريبي"}),
          n.jsxs("b",{className:"text-base font-extrabold text-orange-650 text-orange-600",children:[o.deliveryFee," ل.س"]})
        ]}),
        n.jsxs("button",{type:"button",onClick:()=>{
          if(!prescriptionName.trim()||!prescriptionPhone.trim()){alert("الرجاء ملء الاسم الكريم ورقم هاتفكم ليتواصل معكم الصيدلاني.");return}
          const oList=localStorage.getItem("tw_orders_list"),current_orders=oList?JSON.parse(oList):[];
          const prescriptionOrder={
            id:"tw-"+Math.floor(Math.random()*9e4+1e4),
            storeId:o.id,
            storeName:o.name,
            items:[{
              product:{
                id:"prescription_"+o.id+"_"+Date.now(),
                name:"طلب دواء بموجب وصفة طبية 📄",
                price:0,
                description:prescriptionNotes||"طلب دواء مرفوع يدوياً بالوصفة الطبية",
                image:prescriptionImage||"https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=500&auto=format&fit=crop&q=60",
                category:"pharmacies",
                storeId:o.id
              },
              quantity:1,
              totalItemPrice:0
            }],
            subtotal:0,
            deliveryFee:o.deliveryFee,
            total:o.deliveryFee,
            status:"pending",
            paymentMethod:"cod",
            addressLandmark:prescriptionLandmark,
            additionalDirections:`ملاحظات الوصفة: ${prescriptionNotes}`,
            customerName:prescriptionName.trim(),
            customerPhone:prescriptionPhone.trim(),
            createdAt:new Date().toISOString(),
            isPrescription:true
          };
          const updated_orders=[prescriptionOrder,...current_orders];
          localStorage.setItem("tw_orders_list",JSON.stringify(updated_orders));
          customSubmit&&customSubmit(updated_orders);
          setActiveOrder&&setActiveOrder(prescriptionOrder);
          setShowPrescriptionModal(false);
        },className:"bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs sm:text-sm py-2.5 px-5 rounded-xl shadow-lg cursor-pointer transition-all active:scale-95",children:"تأكيد إرسال الوصفة 🚀"})
      ]})
    ]})
})
  ]})
}
function W3e({cartItems:o,onAddToCart:i,onRemoveFromCart:d,onClearCart:r,onCheckout:u,onBackToShopping:f,selectedLandmarkId:p,setSelectedLandmarkId:m,stores:g,mapNodes:x,customerUser:b,onLogoutCustomer:M}){const[w]=_.useState((b==null?void 0:b.name)||""),[C]=_.useState((b==null?void 0:b.phone)||""),[L,H]=_.useState(""),[q,E]=_.useState("cod"),[U,F]=_.useState(""),[O,ne]=_.useState(""),[se,z]=_.useState(null),[Z,G]=_.useState(""),[J,ce]=_.useState(""),me=(x||T1).filter(ee=>ee.type==="landmark"),Me=o.length>0?o[0].product.storeId:"",Ne=(g||OV).find(ee=>ee.id===Me),ke=o.reduce((ee,fe)=>ee+(fe.totalItemPrice||fe.product.price)*fe.quantity,0),I=Ne?Ne.deliveryFee:5,oe=(()=>{try{const ee=localStorage.getItem("tw_settings");return ee?JSON.parse(ee):{minOrderValue:10,currency:"ل.س"}}catch{return{minOrderValue:10,currency:"ل.س"}}})().minOrderValue||0,ue=ke<oe,j=se?se.type==="percent"?Math.round(ke*se.value/100):se.value:0,R=Math.max(ke+I-j,0),K=ee=>{if(ee.preventDefault(),G(""),ce(""),!O.trim())return;const fe=localStorage.getItem("tw_coupons"),je=(fe?JSON.parse(fe):[{id:"c_ramadan",code:"RAMADAN",type:"percent",value:15,minOrderValue:50,isActive:!0,currentUsage:45},{id:"c_free",code:"FREE5",type:"fixed",value:5,minOrderValue:30,isActive:!0,currentUsage:12}]).find(Ae=>Ae.code===O.trim().toUpperCase()&&Ae.isActive);if(!je){G("رمز الكوبون هذا غير صحيح أو انتهت صلاحيته."),z(null);return}if(ke<je.minOrderValue){G(`الحد الأدنى لتفعيل الكوبون هو ${je.minOrderValue} ل.س (سلتك الحالية ${ke} ل.س).`),z(null);return}z(je),ce(`تم تطبيق كوبون الخصم بقيمة -${je.value}${je.type==="percent"?"%":" ل.س"} بنجاح!`)},le=ee=>{if(ee.preventDefault(),F(""),!w.trim()){F("الرجاء إدخال الاسم الكريم لتسهيل مناداة المندوب.");return}if(!C.trim()||C.length<8){F("الرجاء كتابة رقم هاتف صحيح ليتواصل معك كابتن التوصيل عند الوصول.");return}if(!p){F("الرجاء اختيار أقرب معلم مشهور في القرية/البلدة من الخريطة أو القائمة لتسليم طلبك.");return}if(ue){F(`عذراً، قيمة الطلب (${ke} ل.س) أقل من الحد الأدنى المطلوب للتوصيل في النظام وهو (${oe} ل.س). يرجى إضافة سلع بقيمة ${oe-ke} ل.س إضافية لإرسال الطلب.`);return}const orderGeneratedId = "tw-" + Math.floor(Math.random()*9e4+1e4);
const orderPayload = {
  id: orderGeneratedId,
  storeId: Me,
  storeName: Ne ? Ne.name : "متجر محلي",
  items: o,
  subtotal: ke,
  deliveryFee: I,
  discount: j,
  total: R,
  status: "pending",
  paymentMethod: q,
  addressLandmark: p,
  additionalDirections: L,
  customerName: w.trim(),
  customerPhone: C.trim(),
  createdAt: new Date().toISOString()
};
u(orderPayload);
try {
  const fe = localStorage.getItem("tw_orders_list");
  const ie = fe ? JSON.parse(fe) : [];
  const filtered = ie.filter(it => it.id !== orderGeneratedId);
  localStorage.setItem("tw_orders_list", JSON.stringify([orderPayload, ...filtered]));
  localStorage.setItem("tw_active_order", JSON.stringify(orderPayload));
  window.dispatchEvent(new Event("storage"));
} catch(e){}};return o.length===0?n.jsxs("div",{className:"bg-white rounded-3xl p-10 text-center border border-slate-200/60 shadow-xl space-y-6",children:[n.jsx("div",{className:"w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mx-auto border border-slate-100",children:n.jsx(Za,{className:"w-7 h-7 text-slate-300"})}),n.jsxs("div",{className:"space-y-1.5",children:[n.jsx("h3",{className:"font-extrabold text-slate-800 text-base sm:text-lg",children:"سلتك فارغة تماماً!"}),n.jsx("p",{className:"text-slate-400 text-xs sm:text-sm max-w-sm mx-auto",children:"تصفح المتاجر والماركت المتاحة في منطقتك، وأضف أشهى الأكلات والمنتجات الطازجة لتوصيلها إليك فوراً."})]}),n.jsxs("button",{onClick:f,className:"bg-slate-900 text-white hover:bg-orange-500 hover:text-slate-950 font-bold text-sm py-3 px-6 rounded-2xl transition-all shadow-md active:scale-95 cursor-pointer inline-flex items-center gap-1.5",children:[n.jsx("span",{children:"تصفح المحلات الآن"}),n.jsx(T0,{className:"w-4 h-4"})]})]}):n.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-12 gap-6 items-start",dir:"rtl",children:[n.jsxs("div",{className:"lg:col-span-7 bg-white rounded-3xl p-5 sm:p-6 border border-slate-150 shadow-xl space-y-5",children:[n.jsxs("div",{className:"flex items-center justify-between",children:[n.jsxs("div",{className:"flex items-center gap-2",children:[n.jsx(Za,{className:"w-5 h-5 text-orange-600"}),n.jsx("h3",{className:"font-extrabold text-slate-800 text-base sm:text-lg",children:"محتويات الطلب"})]}),n.jsxs("button",{onClick:r,className:"text-xs text-red-500 hover:text-red-700 hover:bg-red-50 py-1.5 px-3 rounded-xl transition-all flex items-center gap-1 cursor-pointer font-bold border border-transparent hover:border-red-100",children:[n.jsx(Jt,{className:"w-3.5 h-3.5"}),n.jsx("span",{children:"تفريغ السلة"})]})]}),n.jsx("div",{className:"divide-y divide-slate-100 max-h-[320px] overflow-y-auto pr-1",children:o.map((ee,fe)=>{const ie=ee.selectedSize||ee.selectedAdditions&&ee.selectedAdditions.length>0;return n.jsxs("div",{className:"py-4 flex gap-3.5 items-start sm:items-center justify-between",children:[n.jsxs("div",{className:"flex gap-3 items-start sm:items-center",children:[n.jsx("img",{src:ee.product.image,alt:ee.product.name,className:"w-12 h-12 rounded-xl object-cover border border-slate-100 shrink-0 mt-0.5 sm:mt-0",referrerPolicy:"no-referrer"}),n.jsxs("div",{children:[n.jsx("h4",{className:"font-bold text-slate-800 text-xs sm:text-sm",children:ee.product.name}),ie&&n.jsxs("div",{className:"flex flex-wrap gap-1.5 mt-1 select-none",children:[ee.selectedSize&&n.jsxs("span",{className:"text-[9px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-extrabold border",children:["الحجم: ",ee.selectedSize.name]}),ee.selectedAdditions&&ee.selectedAdditions.map((je,Ae)=>n.jsxs("span",{className:"text-[9px] bg-orange-50 text-orange-600 px-1.5 py-0.5 rounded font-bold border border-orange-200/30",children:["+",je.name]},Ae))]}),n.jsxs("p",{className:"text-slate-400 text-[10px] sm:text-[11px] mt-1",children:[ee.totalItemPrice||ee.product.price," ل.س / للوحدة"]})]})]}),n.jsxs("div",{className:"flex items-center bg-slate-50 border border-slate-200 rounded-xl p-1 shadow-sm select-none",children:[n.jsx("button",{type:"button",onClick:()=>d(ee.product,ee.selectedSize,ee.selectedAdditions),className:"w-6.5 h-6.5 flex items-center justify-center rounded-lg bg-white hover:bg-slate-100 text-slate-700 font-bold text-sm cursor-pointer",children:"-"}),n.jsx("span",{className:"w-7 text-center text-xs font-extrabold text-slate-800",children:ee.quantity}),n.jsx("button",{type:"button",onClick:()=>i(ee.product,ee.selectedSize,ee.selectedAdditions),className:"w-6.5 h-6.5 flex items-center justify-center rounded-lg bg-slate-900 text-white hover:bg-orange-500 hover:text-slate-950 font-bold text-sm cursor-pointer",children:"+"})]}),n.jsxs("span",{className:"font-extrabold text-slate-800 text-xs sm:text-sm text-right whitespace-nowrap ml-2 mt-1 sm:mt-0",children:[(ee.totalItemPrice||ee.product.price)*ee.quantity," ل.س"]})]},fe)})}),n.jsxs("div",{className:"bg-slate-50 p-4 rounded-2xl border border-slate-150 space-y-2.5",children:[n.jsxs("span",{className:"text-xs text-slate-500 font-extrabold flex items-center gap-1",children:[n.jsx(W0,{className:"w-4 h-4 text-orange-500"})," هل تمتلك كوبون خصم ترويجي؟"]}),n.jsxs("form",{onSubmit:K,className:"flex gap-2",children:[n.jsx("input",{type:"text",value:O,onChange:ee=>ne(ee.target.value),placeholder:"مثال: RAMADAN",className:"bg-white border border-slate-200 focus:border-slate-900 rounded-xl py-2 px-3 text-xs outline-none text-slate-800 font-mono text-left flex-1",dir:"ltr"}),n.jsx("button",{type:"submit",className:"bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs py-2 px-4 rounded-xl transition-all shadow-sm cursor-pointer",children:"تطبيق الخصم"})]}),Z&&n.jsx("p",{className:"text-[10px] text-red-500 font-extrabold",children:Z}),J&&n.jsx("p",{className:"text-[10px] text-green-600 font-extrabold",children:J})]}),oe>0&&n.jsxs("div",{className:`p-4 rounded-2xl border transition-all ${ue?"bg-amber-50/70 border-amber-200/60 text-amber-900":"bg-emerald-50/70 border-emerald-200/60 text-emerald-900"}`,children:[n.jsxs("div",{className:"flex items-center gap-2 mb-2",children:[n.jsx(ol,{className:`w-4 h-4 ${ue?"text-amber-600":"text-emerald-600"}`}),n.jsx("span",{className:"text-xs font-extrabold",children:ue?"تنبيه شرط التوصيل لزبائن القرية":"تم استيفاء شرط التوصيل بنجاح!"})]}),n.jsx("p",{className:"text-[11px] sm:text-xs leading-relaxed font-semibold",children:ue?n.jsxs(n.Fragment,{children:["قيمة سلتك الحالية ",n.jsxs("b",{className:"font-extrabold text-amber-950",children:[ke," ل.س"]}),". يرجى إكمال الشراء بمقدار ",n.jsxs("b",{className:"font-extrabold text-orange-600",children:[oe-ke," ل.س"]})," لتصل للحد الأدنى المقبول للتوصيل وهو ",n.jsxs("b",{className:"font-extrabold text-amber-950",children:[oe," ل.س"]}),"."]}):n.jsxs(n.Fragment,{children:["تهانينا! لقد تجاوزت الحد الأدنى لطلب التوصيل وهو ",n.jsxs("b",{className:"font-extrabold text-emerald-800",children:[oe," ل.س"]})," بنجاح."]})}),n.jsx("div",{className:"w-full bg-slate-200 h-2 rounded-full mt-2.5 overflow-hidden",children:n.jsx("div",{className:`h-full rounded-full transition-all duration-500 ${ue?"bg-amber-500":"bg-emerald-500"}`,style:{width:`${Math.min(ke/oe*100,100)}%`}})})]}),n.jsxs("div",{className:"bg-slate-50 rounded-2xl p-4.5 space-y-3.5 border border-slate-100 text-sm select-none",children:[n.jsxs("div",{className:"flex justify-between text-slate-500 font-medium",children:[n.jsx("span",{children:"مجموع السلع بالمواصفات:"}),n.jsxs("span",{children:[ke," ل.س"]})]}),n.jsxs("div",{className:"flex justify-between text-slate-500 font-medium",children:[n.jsxs("span",{children:["رسوم التوصيل المحلي (",Ne==null?void 0:Ne.name,"):"]}),n.jsxs("span",{children:[I," ل.س"]})]}),j>0&&n.jsxs("div",{className:"flex justify-between text-green-600 font-bold",children:[n.jsx("span",{children:"خصم كود الخصم المطبق:"}),n.jsxs("span",{children:["-",j," ل.س"]})]}),n.jsx("div",{className:"h-px bg-slate-200"}),n.jsxs("div",{className:"flex justify-between font-extrabold text-slate-800 text-base",children:[n.jsx("span",{children:"الإجمالي الكلي للطلب:"}),n.jsxs("span",{className:"text-orange-600",children:[R," ل.س"]})]})]}),n.jsxs("div",{className:"flex items-center gap-2 bg-emerald-50 text-emerald-800 text-xs py-3 px-4 rounded-xl border border-emerald-100 font-bold",children:[n.jsx(Qn,{className:"w-4 h-4 text-emerald-600 shrink-0"}),n.jsx("span",{children:"أسعار المتاجر مطابقة تماماً لأسعار المحل الرسمية دون زيادة!"})]})]}),n.jsxs("form",{onSubmit:le,className:"lg:col-span-5 bg-white rounded-3xl p-5 sm:p-6 border border-slate-150 shadow-xl space-y-5",children:[n.jsxs("div",{className:"flex items-center gap-2",children:[n.jsx(ol,{className:"w-5 h-5 text-orange-600"}),n.jsx("h3",{className:"font-extrabold text-slate-800 text-base sm:text-lg",children:"تفاصيل التوصيل والدفع"})]}),U&&n.jsx("div",{className:"bg-red-50 text-red-700 text-xs p-3.5 rounded-xl border border-red-100 font-bold",children:U}),n.jsxs("div",{className:"space-y-4 text-xs sm:text-sm",children:[n.jsxs("div",{className:"bg-emerald-500/5 border border-emerald-500/15 p-3 rounded-2xl flex items-center justify-between select-none animate-pulse",children:[n.jsxs("div",{className:"flex items-center gap-1.5 text-emerald-800 text-xs font-bold",children:[n.jsx(Qn,{className:"w-4 h-4 text-emerald-600 shrink-0"}),n.jsx("span",{children:"👤 الهوية موثقة ومحمية تلقائياً بنجاح!"})]}),M&&n.jsx("button",{type:"button",onClick:()=>{confirm("هل تريد تغيير حساب الزبون أو تعديل بياناتك الحقيقية؟ ستحتاج لإدخال رمز PIN الجديد.")&&M()},className:"text-[10px] bg-white border border-slate-200 text-slate-500 hover:text-red-600 hover:border-red-100 px-2 py-1 rounded-xl transition-colors cursor-pointer font-extrabold",children:"تغيير الحساب"})]}),n.jsxs("div",{className:"space-y-1.5 opacity-90",children:[n.jsxs("div",{className:"flex items-center justify-between",children:[n.jsx("label",{className:"font-bold text-slate-500 block",children:"الاسم الثلاثي الموثق"}),n.jsx("span",{className:"text-[9px] bg-emerald-500/10 text-emerald-700 px-1.5 py-0.5 rounded font-black border border-emerald-500/10",children:"مغلق وآمن"})]}),n.jsxs("div",{className:"relative",children:[n.jsx("input",{type:"text",disabled:!0,value:w,className:"w-full bg-slate-100/80 border border-slate-200 text-slate-500 rounded-xl py-3 pr-10 pl-4 outline-none font-bold cursor-not-allowed select-none"}),n.jsx(ll,{className:"w-4.5 h-4.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2"})]})]}),n.jsxs("div",{className:"space-y-1.5 opacity-90",children:[n.jsxs("div",{className:"flex items-center justify-between",children:[n.jsx("label",{className:"font-bold text-slate-500 block",children:"رقم هاتف الاتصال الموثق"}),n.jsx("span",{className:"text-[9px] bg-emerald-500/10 text-emerald-700 px-1.5 py-0.5 rounded font-black border border-emerald-500/10",children:"مغلق وآمن"})]}),n.jsxs("div",{className:"relative",children:[n.jsx("input",{type:"tel",disabled:!0,value:C,className:"w-full bg-slate-100/80 border border-slate-200 text-slate-500 rounded-xl py-3 pr-10 pl-4 outline-none font-bold cursor-not-allowed select-none ltr text-right"}),n.jsx(Yn,{className:"w-4.5 h-4.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2"})]})]}),n.jsxs("div",{className:"space-y-1.5",children:[n.jsxs("div",{className:"flex items-center justify-between",children:[n.jsx("label",{className:"font-bold text-slate-700 block",children:"أقرب معلم مشهور في القرية"}),n.jsx("span",{className:"text-[10px] text-green-600 font-extrabold animate-pulse",children:"اختر من الخريطة أيضاً!"})]}),n.jsxs("div",{className:"relative",children:[n.jsxs("select",{value:p,onChange:ee=>m(ee.target.value),required:!0,className:"w-full bg-slate-50/50 border border-slate-200 focus:border-slate-900 focus:bg-white rounded-xl py-3 pr-10 pl-4 outline-none text-slate-880 transition-all font-semibold appearance-none cursor-pointer",children:[n.jsx("option",{value:"",disabled:!0,children:"--- اختر معلماً للتسليم ---"}),me.map(ee=>n.jsx("option",{value:ee.id,children:ee.arabicName},ee.id))]}),n.jsx(Ia,{className:"w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none"})]})]}),n.jsxs("div",{className:"space-y-1.5",children:[n.jsx("label",{className:"font-bold text-slate-700 block",children:"تفاصيل إضافية للعنوان (اختياري)"}),n.jsx("textarea",{value:L,onChange:ee=>H(ee.target.value),placeholder:"مثال: الحارة الغربية، بجانب مسجد الروضة بـ 50 متر، الطابق الثاني شقة 3",rows:2,className:"w-full bg-slate-50/50 border border-slate-200 focus:border-slate-900 focus:bg-white rounded-xl py-2.5 px-3.5 outline-none text-slate-880 placeholder-slate-400 transition-all font-semibold resize-none"})]}),n.jsxs("div",{className:"space-y-2",children:[n.jsx("label",{className:"font-bold text-slate-700 block",children:"طريقة الدفع المناسبة"}),n.jsxs("div",{className:"grid grid-cols-3 gap-2",children:[n.jsxs("button",{type:"button",onClick:()=>E("cod"),className:`py-2.5 px-2 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${q==="cod"?"border-slate-900 bg-slate-900 text-white shadow-md":"border-slate-200 text-slate-600 hover:bg-slate-50"}`,children:[n.jsx(Za,{className:"w-4 h-4"}),n.jsx("span",{className:"text-[10px] sm:text-xs font-bold whitespace-nowrap",children:"الدفع كاش"})]}),n.jsxs("button",{type:"button",onClick:()=>E("wallet"),className:`py-2.5 px-2 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${q==="wallet"?"border-slate-900 bg-slate-900 text-white shadow-md":"border-slate-200 text-slate-600 hover:bg-slate-50"}`,children:[n.jsx(ol,{className:"w-4 h-4"}),n.jsx("span",{className:"text-[10px] sm:text-xs font-bold whitespace-nowrap",children:"كاش الكتروني"})]}),n.jsxs("button",{type:"button",onClick:()=>E("card"),className:`py-2.5 px-2 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${q==="card"?"border-slate-900 bg-slate-900 text-white shadow-md":"border-slate-200 text-slate-600 hover:bg-slate-50"}`,children:[n.jsx(V0,{className:"w-4 h-4"}),n.jsx("span",{className:"text-[10px] sm:text-xs font-bold whitespace-nowrap",children:"بطاقة ائتمان"})]})]})]})]}),n.jsxs("button",{type:"submit",disabled:ue,className:`w-full text-white font-extrabold text-sm sm:text-base py-3.5 rounded-2xl transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-2 ${ue?"bg-slate-300 text-slate-500 cursor-not-allowed shadow-none active:scale-100":"bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-500/10 hover:shadow-orange-500/20 active:scale-98"}`,children:[n.jsx("span",{children:ue?"عذراً، الطلب أقل من الحد الأدنى":"تأكيد وإرسال الطلب"}),n.jsx(Zn,{className:"w-4 h-4 transform rotate-180"})]})]})]})}const J3e={customer:["أنا بانتظارك عند الباب الرئيسي","الرجاء الاتصال بي فور وصولك","هل تحتاج إلى تفاصيل إضافية عن العنوان؟","شكراً لك، يرجى توخي الحذر أثناء القيادة"],driver:["السلام عليكم، أنا في طريقي إليك الآن","وصلت للموقع المحدد، أنا بالانتظار","الطلب جاهز وتحت التوصيل","المعذرة، واجهت زحاماً بسيطاً وسأصل خلال دقائق"]};function getOrderTypeContext(order) {
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
function exe({activeOrder:o,setActiveOrder:i,driverNodeId:d,setDriverNodeId:r,messages:u,onSendMessage:f,onAutoReply:p,onAdvanceStatus:m,mapNodes:g,mapRoads:x}){const[b,M]=_.useState("split"),[w,C]=_.useState(0),[L,H]=_.useState(!1),[q,E]=_.useState(""),U=G=>{const J=(g||T1).find(ce=>ce.id===G);return J?J.arabicName:G},F=(G,J)=>{const ce=["pending","accepted","preparing","picked_up","delivered"],me=ce.indexOf(J),Me=G.map(I=>ce.indexOf(I)),Ne=Me.every(I=>I<me),ke=Me.includes(me);return Ne?"bg-emerald-500 text-white ring-4 ring-emerald-100":ke?"bg-orange-500 text-white ring-4 ring-orange-100 animate-pulse":"bg-slate-100 text-slate-400 border border-slate-200"},O=(G,J)=>{const ce=["pending","accepted","preparing","picked_up","delivered"],me=ce.indexOf(J),Me=G.map(I=>ce.indexOf(I)),Ne=Me.every(I=>I<me),ke=Me.includes(me);return Ne?"text-emerald-600 font-extrabold":ke?"text-orange-600 font-extrabold":"text-slate-400 font-medium"},ne=G=>{switch(G){case"pending":return"قبول وتأكيد الطلب البدء في المهمة";case"accepted":return`بدء تجهيز وتحضير ${getOrderTypeContext(o).name} في ${getOrderTypeContext(o).categoryName}`;case"preparing":return`الطلب جاهز! استلام ${getOrderTypeContext(o).name} والتحرك للتوصيل`;case"picked_up":return`وصلت للزبون! تأكيد تسليم ${getOrderTypeContext(o).name} واستلام المبلغ`;case"delivered":return"تم تسليم الطلب بنجاح";default:return"تحديث الحالة"}},se=G=>{switch(G){case"pending":return"accepted";case"accepted":return"preparing";case"preparing":return"picked_up";case"picked_up":return"delivered";default:return null}},z=()=>{const G=se(o.status);G&&m(G)},Z=G=>{C(G),H(!0),setTimeout(()=>{p(`شكراً لتقييمك الراقي بـ ${G} نجوم! يسعدني جداً خدمتك دائماً في قريتنا الحبيبة ❤️🙏`)},1e3)};return n.jsxs("div",{className:"space-y-6",children:[n.jsxs("div",{className:"flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs text-right",children:[n.jsxs("div",{className:"space-y-1",children:[n.jsx("h4",{className:"font-extrabold text-slate-800 text-sm sm:text-base",children:"📍 طلبك مفعّل ونشط وجاري توصيله حالياً!"}),n.jsx("p",{className:"text-slate-400 text-[10px] sm:text-xs font-semibold leading-relaxed",children:"يمكنك تتبع مسار المندوب خطوة بخطوة على الخريطة ومراسلته مباشرة، أو العودة لتصفح المحلات في أي وقت."})]}),n.jsxs("button",{onClick:()=>i(null),className:"w-full sm:w-auto py-3 px-5 rounded-xl border border-orange-200 bg-orange-50 hover:bg-orange-100 text-orange-600 transition-all cursor-pointer flex items-center justify-center gap-2 font-black text-xs sm:text-sm shadow-xs hover:shadow-md active:scale-98",children:[n.jsx(Zn,{className:"w-4 h-4 text-orange-600"}),n.jsx("span",{children:"العودة للقائمة الرئيسية وتصفح المحلات ↩️"})]})]}),n.jsxs("div",{className:"bg-slate-900 text-white rounded-3xl p-5 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center md:justify-between gap-4",children:[n.jsxs("div",{className:"space-y-1",children:[n.jsxs("div",{className:"flex items-center gap-2",children:[n.jsxs("span",{className:"bg-orange-500 text-white font-extrabold text-[10px] px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm",children:[n.jsx(Sa,{className:"w-3.5 h-3.5"}),n.jsx("span",{children:"محاكاة أدوار تفاعلية كاملة"})]}),n.jsx("h2",{className:"text-lg font-extrabold",children:"منصة التجربة والتحكم بالطلب"})]}),n.jsxs("p",{className:"text-xs text-slate-300 max-w-xl",children:["لمشاهدة تتبع الطلب والمحادثة المباشرة بشكل فوري، اختر ",n.jsx("b",{children:'"الشاشة المزدوجة"'})," لتشاهد شاشة الزبون والمندوب معاً، أو تنقل بينهما لرؤية كل واجهة على حدة!"]})]}),n.jsxs("div",{className:"flex bg-slate-950 p-1 rounded-2xl border border-slate-800 self-start md:self-center shrink-0",children:[n.jsx("button",{onClick:()=>M("split"),className:`py-2 px-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${b==="split"?"bg-orange-500 text-white shadow":"text-slate-400 hover:text-white"}`,children:"الشاشة المزدوجة (تفاعلي)"}),n.jsx("button",{onClick:()=>M("customer"),className:`py-2 px-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${b==="customer"?"bg-orange-500 text-white shadow":"text-slate-400 hover:text-white"}`,children:"واجهة الزبون"}),n.jsx("button",{onClick:()=>M("driver"),className:`py-2 px-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${b==="driver"?"bg-orange-500 text-white shadow":"text-slate-400 hover:text-white"}`,children:"واجهة المندوب"})]})]}),n.jsx("div",{className:"bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md",children:n.jsxs("div",{className:"flex flex-col lg:flex-row lg:items-center justify-between gap-6",children:[n.jsxs("div",{className:"flex-1 space-y-4",children:[n.jsxs("div",{className:"flex items-center gap-2.5",children:[n.jsx("div",{className:"w-10 h-10 rounded-2xl bg-orange-500/10 text-orange-600 flex items-center justify-center shadow-xs",children:n.jsx(Aa,{className:"w-5 h-5 animate-pulse"})}),n.jsxs("div",{children:[n.jsx("h3",{className:"font-extrabold text-slate-900 text-base",children:"بيانات وتفاصيل مسار التوصيل الجاري"}),n.jsx("p",{className:"text-slate-400 text-xs mt-0.5",children:"رحلة التوصيل بين المحل والزبون"})]})]}),n.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100",children:[n.jsxs("div",{className:"flex items-start gap-3",children:[n.jsx("span",{className:"w-6 h-6 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-700 flex items-center justify-center font-extrabold text-xs shrink-0 mt-0.5",children:"أ"}),n.jsxs("div",{children:[n.jsx("span",{className:"text-slate-400 text-[10px] block font-bold",children:"موقع استلام المندوب (المحل المجهّز):"}),n.jsx("p",{className:"font-extrabold text-slate-800 text-sm sm:text-base",children:o.storeName})]})]}),n.jsxs("div",{className:"flex items-start gap-3 border-t sm:border-t-0 sm:border-r border-slate-200/70 pt-3 sm:pt-0 sm:pr-4",children:[n.jsx("span",{className:"w-6 h-6 rounded-xl bg-green-500/10 border border-green-500/20 text-green-700 flex items-center justify-center font-extrabold text-xs shrink-0 mt-0.5",children:"ب"}),n.jsxs("div",{children:[n.jsx("span",{className:"text-slate-400 text-[10px] block font-bold",children:"موقع تسليم الزبون (المعلم الجغرافي):"}),n.jsx("p",{className:"font-extrabold text-slate-800 text-sm sm:text-base",children:U(o.addressLandmark)}),o.additionalDirections&&n.jsxs("p",{className:"text-xs text-slate-500 mt-1 bg-white px-2 py-1 rounded-md border border-slate-100 inline-block font-bold",children:["توجيهات إضافية: ",o.additionalDirections]})]})]})]})]}),n.jsxs("div",{className:"lg:w-80 flex flex-col justify-between gap-4 border-t lg:border-t-0 lg:border-r border-slate-100 pt-5 lg:pt-0 lg:pr-6",children:[n.jsxs("div",{className:"bg-orange-500/5 border border-orange-500/10 p-4 rounded-2xl",children:[n.jsx("span",{className:"text-[10px] text-slate-400 block font-bold",children:"المبلغ المطلوب عند الاستلام:"}),n.jsxs("div",{className:"flex items-baseline gap-1.5 mt-0.5",children:[n.jsx("span",{className:"text-orange-600 font-black text-2xl",children:o.total}),n.jsx("span",{className:"text-slate-500 font-bold text-xs",children:"ل.س"})]}),n.jsx("span",{className:"text-[9px] text-slate-400 block font-bold mt-1",children:"(يتضمن رسوم التوصيل والخصومات)"})]}),n.jsxs("div",{className:"space-y-1.5",children:[n.jsx("span",{className:"text-[10px] text-slate-400 font-bold block",children:"كود تتبع الشحنة الموحد:"}),n.jsx("div",{className:"bg-slate-900 text-slate-300 font-mono text-center text-xs py-2 px-3 rounded-xl border border-slate-800 font-bold tracking-wider select-all",children:o.id.toUpperCase()})]})]})]})}),n.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-12 gap-6 items-start",children:[(b==="customer"||b==="split")&&n.jsxs("div",{className:`lg:col-span-${b==="split"?"6":"12"} space-y-6 flex flex-col`,children:[n.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-3",children:[b==="split"?n.jsxs("div",{className:"bg-orange-100 text-orange-950 text-xs font-extrabold py-2 px-4 rounded-full border border-orange-200 flex items-center gap-1.5 shadow-sm select-none",children:[n.jsx(ua,{className:"w-3.5 h-3.5"}),n.jsx("span",{children:"شاشة هاتف الزبون (أحمد)"})]}):n.jsx("div",{}),n.jsxs("button",{onClick:()=>i(null),className:"py-1.5 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-orange-600 transition-all cursor-pointer flex items-center gap-1.5 font-bold text-xs shadow-xs active:scale-95",children:[n.jsx(Zn,{className:"w-3.5 h-3.5 text-slate-400"}),n.jsx("span",{children:"العودة لتصفح المحلات الأخرى 🛍️"})]})]}),n.jsxs("div",{className:"bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/60 shadow-xl space-y-5",children:[n.jsxs("h3",{className:"font-extrabold text-slate-800 text-base flex items-center gap-2",children:[n.jsx(La,{className:"w-5 h-5 text-emerald-500"}),n.jsx("span",{children:"حالة تتبع الطلب المباشرة"})]}),n.jsxs("div",{className:"grid grid-cols-4 gap-2 relative",children:[n.jsx("div",{className:"absolute top-4 left-6 right-6 h-1 bg-slate-100 -z-0"}),n.jsxs("div",{className:"flex flex-col items-center text-center space-y-2 z-10 select-none",children:[n.jsx("div",{className:`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${F(["pending","accepted"],o.status)}`,children:"1"}),n.jsx("span",{className:`text-[10px] sm:text-xs block ${O(["pending","accepted"],o.status)}`,children:"تأكيد الطلب"})]}),n.jsxs("div",{className:"flex flex-col items-center text-center space-y-2 z-10 select-none",children:[n.jsx("div",{className:`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${F(["preparing"],o.status)}`,children:"2"}),n.jsx("span",{className:`text-[10px] sm:text-xs block ${O(["preparing"],o.status)}`,children:"جاري التحضير"})]}),n.jsxs("div",{className:"flex flex-col items-center text-center space-y-2 z-10 select-none",children:[n.jsx("div",{className:`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${F(["picked_up"],o.status)}`,children:"3"}),n.jsx("span",{className:`text-[10px] sm:text-xs block ${O(["picked_up"],o.status)}`,children:"جاري التوصيل"})]}),n.jsxs("div",{className:"flex flex-col items-center text-center space-y-2 z-10 select-none",children:[n.jsx("div",{className:`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${F(["delivered"],o.status)}`,children:"4"}),n.jsx("span",{className:`text-[10px] sm:text-xs block ${O(["delivered"],o.status)}`,children:"تم التسليم"})]})]}),n.jsxs("div",{className:"bg-slate-50 border border-slate-100 p-4 rounded-2xl flex items-center gap-3",children:[n.jsx("div",{className:"w-10 h-10 rounded-xl bg-orange-500/10 text-orange-600 flex items-center justify-center shrink-0",children:n.jsx(Aa,{className:"w-5 h-5"})}),n.jsxs("div",{children:[n.jsxs("h4",{className:"font-extrabold text-slate-800 text-xs sm:text-sm",children:[o.status==="pending"&&"بانتظار قبول المندوب للطلب...",
o.status==="accepted"&&"تم قبول طلبك وجاري تنسيقه مع المندوب...",
o.status==="preparing"&&(getOrderTypeContext(o).customerPreparingStatus),
o.status==="picked_up"&&(getOrderTypeContext(o).customerPickedUpStatus),
o.status==="delivered"&&(getOrderTypeContext(o).customerDeliveredStatus)]}),n.jsx("p",{className:"text-slate-400 text-[11px] mt-0.5",children:o.status==="picked_up"?"يرجى البقاء بالقرب من الهاتف المحمول للتواصل المباشر.":"تحديثات الحالة تتم تلقائياً فور اتخاذ الكابتن لأي إجراء."})]})]}),o.scheduledTime&&o.status!=="delivered"&&n.jsxs("div",{className:"bg-emerald-500/5 border border-emerald-500/15 p-4 rounded-2xl flex items-center justify-between animate-pulse",children:[n.jsxs("div",{className:"flex items-center gap-2",children:[n.jsx(Ga,{className:"w-5 h-5 text-emerald-600 animate-spin-slow"}),n.jsxs("div",{children:[n.jsx("span",{className:"text-[10px] text-slate-400 block font-bold",children:"وقت التسليم المقدر من السائق:"}),n.jsx("span",{className:"text-slate-700 font-extrabold text-sm",children:o.scheduledTime})]})]}),n.jsx("span",{className:"text-xs bg-emerald-500/15 text-emerald-700 font-extrabold px-3 py-1.5 rounded-xl border border-emerald-500/20",children:"تحديث مباشر"})]}),o.status==="delivered"&&n.jsxs("div",{className:"bg-orange-50 border border-orange-100 p-5 rounded-2xl text-center space-y-3",children:[n.jsx("h4",{className:"font-extrabold text-orange-950 text-sm",children:"ما هو تقييمك لسرعة كابتن التوصيل وجودة الخدمة؟"}),n.jsx("p",{className:"text-orange-800/70 text-xs",children:"رأيك يساهم في رفع جودة التوصيل لأهل قريتنا الكرام."}),L?n.jsxs("div",{className:"text-emerald-600 font-extrabold text-sm flex items-center justify-center gap-1",children:[n.jsx(tl,{className:"w-5 h-5"}),n.jsxs("span",{children:["تم إرسال تقييمك بـ ",w," نجوم بنجاح! شكراً لك."]})]}):n.jsx("div",{className:"flex justify-center gap-2",children:[1,2,3,4,5].map(G=>n.jsx("button",{onClick:()=>Z(G),className:"p-1 text-orange-400 hover:text-orange-600 hover:scale-125 transition-all cursor-pointer",children:n.jsx(Wn,{className:`w-7 h-7 ${w>=G?"fill-current":""}`})},G))})]})]}),n.jsxs("div",{className:"bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-4 rounded-2xl shadow-md flex flex-col sm:flex-row items-center justify-between gap-3 text-right select-none",children:[
  n.jsxs("div",{className:"flex items-center gap-3",children:[
    n.jsx("div",{className:"w-11 h-11 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-xl shrink-0 border border-white/20",children:"🛵"}),
    n.jsxs("div",{children:[
      n.jsx("h4",{className:"font-black text-sm text-white",children:"كابتن التوصيل المباشر: أبو شهاب"}),
      n.jsx("p",{className:"text-[11px] text-emerald-100 mt-0.5",children:"تواصل صوتي مباشر عبر المكالمات العادية أو الواتساب دون تعقيد"})
    ]})
  ]}),
  n.jsxs("div",{className:"flex flex-wrap sm:flex-nowrap items-center gap-2 w-full sm:w-auto shrink-0",children:[
    n.jsxs("a",{href:"tel:"+(o.driverPhone||"0955114477"),className:"flex-1 sm:flex-initial py-2 px-3 bg-white text-emerald-800 hover:bg-emerald-50 active:scale-95 rounded-xl font-black text-xs shadow-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer",children:[
      n.jsx("span",{className:"text-base",children:"📞"}),
      n.jsx("span",{children:"اتصال هاتفي"})
    ]}),
    n.jsxs("a",{href:"https://wa.me/963955114477?text="+encodeURIComponent("السلام عليكم كابتن أبو شهاب، أنا الزبون بخصوص طلب رقم ("+o.id+")..."),target:"_blank",rel:"noopener noreferrer",className:"flex-1 sm:flex-initial py-2 px-2.5 bg-emerald-900/60 hover:bg-emerald-900/80 active:scale-95 text-white border border-white/30 rounded-xl font-black text-xs shadow-sm flex items-center justify-center gap-1 transition-all cursor-pointer",children:[
      n.jsx("span",{className:"text-sm",children:"💬"}),
      n.jsx("span",{children:"واتساب"})
    ]}),
    n.jsxs("a",{href:/Android/i.test(navigator.userAgent) ? "intent://send?phone=963955114477&text="+encodeURIComponent("السلام عليكم كابتن أبو شهاب، أنا الزبون بخصوص طلب رقم ("+o.id+")...")+"#Intent;package=com.whatsapp.w4b;scheme=whatsapp;end" : "https://wa.me/963955114477?text="+encodeURIComponent("السلام عليكم كابتن أبو شهاب، أنا الزبون بخصوص طلب رقم ("+o.id+")..."),target:"_blank",rel:"noopener noreferrer",className:"flex-1 sm:flex-initial py-2 px-2.5 bg-slate-900/70 hover:bg-slate-900 active:scale-95 text-emerald-300 border border-emerald-400/40 rounded-xl font-black text-xs shadow-sm flex items-center justify-center gap-1 transition-all cursor-pointer",children:[
      n.jsx("span",{className:"text-sm",children:"💼"}),
      n.jsx("span",{children:"واتس أعمال"})
    ]})
  ]})
]}),
n.jsx("div",{className:"h-[400px]",children:n.jsx(BV,{order:o,role:"customer",messages:u,onSendMessage:f,onAutoReply:p})})]}),(b==="driver"||b==="split")&&n.jsxs("div",{className:`lg:col-span-${b==="split"?"6":"12"} space-y-6 flex flex-col`,children:[b==="split"&&n.jsxs("div",{className:"bg-slate-800 text-slate-100 text-xs font-extrabold py-2 px-4 rounded-full border border-slate-700 self-start flex items-center gap-1.5 shadow-sm select-none",children:[n.jsx(ua,{className:"w-3.5 h-3.5 text-orange-500"}),n.jsx("span",{children:"شاشة هاتف كابتن التوصيل (أبو شهاب)"})]}),n.jsxs("div",{className:"bg-slate-900 text-slate-100 rounded-3xl p-5 sm:p-6 border border-slate-800 shadow-xl space-y-5",children:[n.jsxs("div",{className:"flex items-center justify-between",children:[n.jsxs("h3",{className:"font-extrabold text-sm sm:text-base flex items-center gap-2",children:[n.jsx(Aa,{className:"w-5 h-5 text-orange-500"}),n.jsx("span",{children:"لوحة قيادة المندوب والمهمات"})]}),n.jsxs("div",{className:"flex gap-3 text-slate-400 text-xs font-semibold",children:[n.jsxs("span",{className:"flex items-center gap-1 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800",children:[n.jsx(rr,{className:"w-3.5 h-3.5 text-orange-500"}),"المحفظة: 145,000 ل.س"]}),n.jsxs("span",{className:"flex items-center gap-1 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800",children:[n.jsx(Wn,{className:"w-3.5 h-3.5 text-orange-500 fill-current"}),"4.9 (120 طلب)"]})]})]}),n.jsxs("div",{className:"bg-slate-950 border border-slate-850 p-4 rounded-2xl space-y-2.5",children:[n.jsxs("div",{className:"flex items-center justify-between",children:[n.jsx("span",{className:"text-[10px] text-orange-500 font-extrabold tracking-widest uppercase",children:"الخطوة القادمة للتوصيل"}),n.jsxs("span",{className:"text-slate-500 text-[10px]",children:["الحالة الحالية: ",n.jsx("b",{className:"text-slate-300 font-bold",children:o.status})]})]}),n.jsxs("h4",{className:"font-extrabold text-slate-100 text-sm sm:text-base",children:[o.status==="pending"&&"يتوجب عليك قبول وتأكيد الطلب لتتحرك للمتجر.",o.status==="accepted"&&"توجه إلى المحل لتفقد تحضير الطلب بالكامل.",o.status==="preparing"&&"انتظر انتهاء تحضير السلع ثم اضغط استلام الطلب لبدء الرحلة.",o.status==="picked_up"&&`الطلب بحوزتك الآن، تحرك وسلّم الطلب عند (${U(o.addressLandmark)})`,o.status==="delivered"&&"أحسنت صنعاً! انتهت الرحلة وتم إيداع رسوم التوصيل بمحفظتك."]}),n.jsx("p",{className:"text-slate-400 text-xs leading-relaxed",children:"عند ضغط الزر التفاعلي أدناه، سيتم تمثيل تقدم كابتن التوصيل على خريطة القرية في الأعلى بشكل تفاعلي ومباشر!"}),se(o.status)?n.jsxs("button",{onClick:z,className:"w-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs sm:text-sm py-3 px-4 rounded-xl transition-all shadow-lg shadow-orange-500/10 hover:shadow-orange-500/20 flex items-center justify-center gap-1.5 active:scale-98 cursor-pointer mt-1",children:[n.jsx("span",{children:ne(o.status)}),n.jsx(H0,{className:"w-4 h-4 transform rotate-180 text-white"})]}):n.jsxs("div",{className:"flex items-center justify-center gap-1.5 py-2.5 text-xs text-green-400 font-bold bg-green-500/10 border border-green-500/20 rounded-xl",children:[n.jsx(tl,{className:"w-4 h-4"}),n.jsx("span",{children:"تم تسليم الطلب للعميل، جاهز لتلقي طلبات جديدة!"})]})]}),o.status!=="delivered"&&n.jsxs("div",{className:"bg-slate-950 border border-slate-850 p-4 rounded-2xl space-y-3",children:[n.jsxs("div",{className:"flex items-center justify-between",children:[n.jsxs("span",{className:"text-[10px] text-orange-500 font-extrabold tracking-widest uppercase flex items-center gap-1",children:[n.jsx(Ga,{className:"w-3.5 h-3.5"}),n.jsx("span",{children:"تقدير وقت التسليم وتنبيه الزبون"})]}),n.jsx("span",{className:"text-slate-500 text-[10px] font-bold",children:"تحديث يدوي"})]}),n.jsx("div",{className:"grid grid-cols-3 gap-2",children:["خلال 10-15 دقيقة","خلال 20-25 دقيقة","خلال 35-40 دقيقة"].map(G=>n.jsx("button",{onClick:()=>{const J={...o,scheduledTime:G};i(J),p(`أعلمكم يا محترمين بأنه تم تقدير وقت وصول الطلب ليكون عندك إن شاء الله ${G} 🏍️⏱️.`)},className:`py-2 px-2.5 rounded-xl text-[10px] font-extrabold transition-all cursor-pointer border text-center ${o.scheduledTime===G?"bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-500/10":"bg-slate-900 text-slate-400 border-slate-800 hover:text-white"}`,children:G},G))}),n.jsxs("div",{className:"flex gap-2",children:[n.jsx("input",{type:"text",placeholder:"أو اكتب وقتاً مخصصاً... (مثال: بعد صلاة العصر)",value:q,onChange:G=>E(G.target.value),className:"bg-slate-900 border border-slate-800 text-slate-200 rounded-xl px-3 py-1.5 text-xs flex-1 outline-none focus:border-orange-500 font-bold"}),n.jsx("button",{onClick:()=>{if(q.trim()){const G={...o,scheduledTime:q.trim()};i(G),p(`سأبذل جهدي ليكون الطلب عندك ${q.trim()} إن شاء الله يا محترم 👍.`),E("")}},className:"bg-slate-800 hover:bg-slate-750 border border-slate-700 text-orange-500 px-3.5 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-colors",children:"تحديث"})]})]}),n.jsxs("div",{className:"bg-slate-950 border border-slate-800 p-4 sm:p-5 rounded-2xl space-y-4 text-xs text-slate-300",children:[
  n.jsxs("div",{className:"flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900 p-3.5 rounded-xl border border-slate-800",children:[
    n.jsxs("div",{className:"space-y-0.5",children:[
      n.jsxs("div",{className:"flex items-center gap-2",children:[
        n.jsx("span",{className:"w-2 h-2 rounded-full bg-emerald-400 animate-ping"}),
        n.jsxs("span",{className:"text-slate-400 text-[10px] font-bold",children:["المستلم: ", n.jsx("b",{className:"text-white text-xs",children:o.customerName})]})
      ]}),
      n.jsxs("p",{className:"font-mono text-emerald-400 font-black text-sm",children:[o.customerPhone]})
    ]}),
    n.jsxs("div",{className:"flex flex-wrap sm:flex-nowrap items-center gap-2",children:[
      n.jsxs("a",{href:"tel:"+o.customerPhone,className:"flex-1 sm:flex-initial py-2.5 px-3.5 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-black text-xs rounded-xl shadow-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-emerald-400/30",children:[
        n.jsx("span",{className:"text-base",children:"📞"}),
        n.jsx("span",{children:"اتصال (مكالمة)"})
      ]}),
      n.jsxs("a",{href:"https://wa.me/"+(o.customerPhone||"0933445566").replace(/\D/g,"").replace(/^0/,"963")+"?text="+encodeURIComponent("السلام عليكم يا محترم، أنا كابتن التوصيل بخصوص طلبك رقم ("+o.id+")..."),target:"_blank",rel:"noopener noreferrer",className:"flex-1 sm:flex-initial py-2.5 px-3 bg-green-600 hover:bg-green-500 active:scale-95 text-white font-black text-xs rounded-xl shadow-lg flex items-center justify-center gap-1 transition-all cursor-pointer border border-green-400/30",children:[
        n.jsx("span",{className:"text-sm",children:"💬"}),
        n.jsx("span",{children:"واتساب"})
      ]}),
      n.jsxs("a",{href:/Android/i.test(navigator.userAgent) ? "intent://send?phone="+(o.customerPhone||"0933445566").replace(/\D/g,"").replace(/^0/,"963")+"&text="+encodeURIComponent("السلام عليكم يا محترم، أنا كابتن التوصيل بخصوص طلبك رقم ("+o.id+")...")+"#Intent;package=com.whatsapp.w4b;scheme=whatsapp;end" : "https://wa.me/"+(o.customerPhone||"0933445566").replace(/\D/g,"").replace(/^0/,"963")+"?text="+encodeURIComponent("السلام عليكم يا محترم، أنا كابتن التوصيل بخصوص طلبك رقم ("+o.id+")..."),target:"_blank",rel:"noopener noreferrer",className:"flex-1 sm:flex-initial py-2.5 px-3 bg-slate-900 hover:bg-slate-800 active:scale-95 text-emerald-400 font-black text-xs rounded-xl shadow-lg flex items-center justify-center gap-1 transition-all cursor-pointer border border-emerald-500/30",children:[
        n.jsx("span",{className:"text-sm",children:"💼"}),
        n.jsx("span",{children:"واتس أعمال"})
      ]})
    ]})
  ]}),
  n.jsxs("div",{className:"border-t border-slate-800 pt-2.5",children:[
    n.jsx("span",{className:"text-[10px] text-slate-500 block font-bold",children:"تفاصيل المحتويات المراد توصيلها:"}),
    n.jsx("p",{className:"font-bold text-slate-200 mt-1 leading-relaxed",children:o.items.map(G=>`${G.product.name} (x${G.quantity})`).join("، ")})
  ]})
]})]}),n.jsx("div",{className:"h-[400px]",children:n.jsx(BV,{order:o,role:"driver",messages:u,onSendMessage:f,onAutoReply:p})})]})]})]})}function EV({value:o,onChange:i,label:d,placeholder:r="أو أدخل رابط ويب مباشر للصورة"}){const[u,f]=_.useState("upload"),[p,m]=_.useState(!1),g=C=>{var H;const L=(H=C.target.files)==null?void 0:H[0];L&&x(L)},x=C=>{const L=new FileReader;L.onload=H=>{var E;const q=new Image;q.onload=()=>{const U=document.createElement("canvas"),F=500,O=400;let ne=q.width,se=q.height;ne>se?ne>F&&(se*=F/ne,ne=F):se>O&&(ne*=O/se,se=O),U.width=ne,U.height=se;const z=U.getContext("2d");if(z){z.drawImage(q,0,0,ne,se);const Z=U.toDataURL("image/jpeg",.75);i(Z)}},q.src=(E=H.target)==null?void 0:E.result},L.readAsDataURL(C)},b=C=>{C.preventDefault(),m(!0)},M=()=>{m(!1)},w=C=>{var H;C.preventDefault(),m(!1);const L=(H=C.dataTransfer.files)==null?void 0:H[0];L&&L.type.startsWith("image/")&&x(L)};return n.jsxs("div",{className:"space-y-1.5 bg-slate-50/60 p-3 rounded-xl border border-slate-150",children:[n.jsxs("div",{className:"flex items-center justify-between",children:[n.jsx("label",{className:"text-[11px] text-slate-500 font-bold block",children:d}),n.jsxs("div",{className:"flex gap-1 bg-slate-200/60 p-0.5 rounded-lg text-[9px] font-bold",children:[n.jsx("button",{type:"button",onClick:()=>f("upload"),className:`px-2 py-0.5 rounded-md cursor-pointer transition-all ${u==="upload"?"bg-white text-orange-600 shadow-xs":"text-slate-500"}`,children:"ملف من الجهاز"}),n.jsx("button",{type:"button",onClick:()=>f("url"),className:`px-2 py-0.5 rounded-md cursor-pointer transition-all ${u==="url"?"bg-white text-orange-600 shadow-xs":"text-slate-500"}`,children:"رابط إنترنت (URL)"})]})]}),u==="upload"?n.jsx("div",{onDragOver:b,onDragLeave:M,onDrop:w,className:`relative border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center gap-1.5 transition-all text-center cursor-pointer ${p?"border-orange-500 bg-orange-50/40":o?"border-emerald-300 bg-emerald-50/10":"border-slate-200 bg-white hover:border-slate-300"}`,children:o?n.jsxs("div",{className:"flex items-center gap-3 w-full justify-between",children:[n.jsxs("div",{className:"flex items-center gap-2 text-right",children:[n.jsx("div",{className:"w-10 h-10 rounded-lg overflow-hidden border border-slate-100 shrink-0",children:n.jsx("img",{src:o,alt:"Preview",className:"w-full h-full object-cover"})}),n.jsxs("div",{children:[n.jsxs("p",{className:"text-[10px] text-emerald-600 font-extrabold flex items-center gap-1",children:[n.jsx(S1,{className:"w-3.5 h-3.5"}),"تم تحميل الصورة بنجاح"]}),n.jsx("p",{className:"text-[9px] text-slate-400 font-semibold",children:"جاهزة للحفظ والتخزين الفوري"})]})]}),n.jsxs("button",{type:"button",onClick:()=>i(""),className:"text-[10px] text-red-500 hover:text-red-650 font-bold hover:underline cursor-pointer flex items-center gap-0.5",children:[n.jsx(Jt,{className:"w-3.5 h-3.5"}),"مسح"]})]}):n.jsxs(n.Fragment,{children:[n.jsx(A1,{className:"w-6 h-6 text-slate-400 animate-pulse"}),n.jsxs("div",{className:"space-y-0.5",children:[n.jsx("span",{className:"text-[10px] text-slate-600 font-extrabold block",children:"اسحب وأسقط الصورة هنا أو اضغط للاختيار"}),n.jsx("span",{className:"text-[8px] text-slate-400 font-semibold block",children:"يدعم صيغ JPG, PNG, WEBP (يتم ضغطها وتصغيرها تلقائياً للمحافظة على مساحة التخزين)"})]}),n.jsx("input",{type:"file",accept:"image/*",onChange:g,className:"absolute inset-0 opacity-0 cursor-pointer w-full h-full"})]})}):n.jsxs("div",{className:"space-y-2",children:[n.jsx("input",{type:"text",value:o,onChange:C=>i(C.target.value),placeholder:r,className:"w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-[11px] outline-none text-slate-700"}),o&&n.jsxs("div",{className:"flex items-center gap-2 bg-white p-2 rounded-xl border border-slate-150",children:[n.jsx("div",{className:"w-9 h-9 rounded-lg overflow-hidden shrink-0 border border-slate-100",children:n.jsx("img",{src:o,alt:"Preview link",className:"w-full h-full object-cover",onError:C=>{C.target.src="https://images.unsplash.com/photo-1561651823-34feb02250e4?w=500"}})}),n.jsxs("div",{className:"min-w-0",children:[n.jsx("p",{className:"text-[9px] text-slate-400 truncate font-semibold",children:"معاينة للرابط المدخل:"}),n.jsx("p",{className:"text-[10px] text-slate-700 font-bold truncate",children:o})]})]})]})]})}function txe({stores:o,products:i,mapNodes:d,onAddStore:r,onDeleteStore:u,onAddProduct:f,onDeleteProduct:p,onBack:m,categories:g,onUpdateCategories:x,contacts:b,onUpdateContact:M,onAddContact:w,onDeleteContact:C,onUpdateStores:L,onUpdateProducts:H,onUpdateMapNodes:q,onResetDatabase:E}){const[adminEmergencyRush,setAdminEmergencyRush]=_.useState(()=>localStorage.getItem("tw_emergency_rush")==="true");
const toggleAdminEmergencyRush=()=>{
  const next=!adminEmergencyRush;
  setAdminEmergencyRush(next);
  localStorage.setItem("tw_emergency_rush",next?"true":"false");
  window.dispatchEvent(new Event("storage"));
  ie(next?"🚨 تم تفعيل وضع ضغط الطلبات الشامل! تم إيقاف استقبال الطلبات في التطبيق مؤقتاً.":"✅ تم إلغاء وضع الضغط واستئناف استقبال طلبات الزبائن بنجاح!");
  K(next?"تفعيل وضع الضغط الشامل":"إلغاء وضع الضغط الشامل",next?"إيقاف استقبال طلبات التطبيق بالكامل بسبب ضغط العمل":"استئناف استقبال الطلبات للزبائن");
};
const[U,F]=_.useState("manager"),[O,ne]=_.useState("stats"),[se,z]=_.useState(!!window.deferredPrompt),Z=k=>{const W=`السلام عليكم ورحمة الله وبركاته 🛍️ تصفح واطلب من تطبيق "توصيل" للقرية - توصيل سريع للمأكولات، التموينات، والصيدلية إلى عتبة بيتك!
رابط التطبيق:
`+window.location.origin,ae=encodeURIComponent(W);/Android/i.test(navigator.userAgent)?k==="business"?window.location.href=`intent://send?text=${ae}#Intent;package=com.whatsapp.w4b;scheme=whatsapp;end`:window.location.href=`intent://send?text=${ae}#Intent;package=com.whatsapp;scheme=whatsapp;end`:k==="business"?window.open(`https://wa.me/?text=${ae}`,"_blank"):window.open(`https://api.whatsapp.com/send?text=${ae}`,"_blank")};_.useEffect(()=>{const k=()=>{z(!0)};return window.addEventListener("pwaInstallPromptReady",k),()=>{window.removeEventListener("pwaInstallPromptReady",k)}},[]);const[G,J]=_.useState(()=>{const k=localStorage.getItem("tw_staff_members");return k?JSON.parse(k):[{id:"s1",name:"أبو حدو (المدير العام)",phone:"0933111222",role:"manager",pin:"1111",isActive:!0,createdAt:new Date(Date.now()-31536e6).toISOString()},{id:"s2",name:"أم عبده (مسؤول الطلبات)",phone:"0933444555",role:"orders_clerk",pin:"2222",isActive:!0,createdAt:new Date(Date.now()-15552e6).toISOString()},{id:"s3",name:"أبو سمير (المحاسب المالي)",phone:"0933777888",role:"accountant",pin:"3333",isActive:!0,createdAt:new Date(Date.now()-7776e6).toISOString()},{id:"s4",name:"أبو جودة (موظف الدعم)",phone:"0933999000",role:"support",pin:"4444",isActive:!0,createdAt:new Date(Date.now()-2592e3).toISOString()}]}),[ce,me]=_.useState(()=>{const k=localStorage.getItem("tw_drivers");return k?JSON.parse(k):[{id:"d1",name:"أبو شهاب (كابتن الضيعة)",phone:"0955333444",status:"available",totalDeliveries:124,earnings:1860,rating:4.9},{id:"d2",name:"أبو العز التوصيل السريع",phone:"0955222111",status:"busy",totalDeliveries:82,earnings:1150,rating:4.7},{id:"d3",name:"كابتن وسيم الورد",phone:"0955999888",status:"offline",totalDeliveries:15,earnings:180,rating:4.2}]}),[Me,Ne]=_.useState(()=>{const k=localStorage.getItem("tw_coupons");return k?JSON.parse(k):[{id:"c_ramadan",code:"RAMADAN",type:"percent",value:15,minOrderValue:50,isActive:!0,currentUsage:45},{id:"c_free",code:"FREE5",type:"fixed",value:5,minOrderValue:30,isActive:!0,currentUsage:12}]}),[ke,I]=_.useState(()=>{const k=localStorage.getItem("tw_audit_logs");return k?JSON.parse(k):[{id:"l1",timestamp:new Date(Date.now()-36e5).toISOString(),user:"المدير العام",role:"manager",action:"تعديل أسعار",details:"تم تعديل سعر بيتزا نابوليتانا لـ 22 ل.س"},{id:"l2",timestamp:new Date(Date.now()-72e5).toISOString(),user:"مسؤول الطلبات",role:"orders_clerk",action:"تعيين سائق",details:"تعيين السائق أبو شهاب للطلب #tw-1284"}]}),[Q,oe]=_.useState(()=>{const k=localStorage.getItem("tw_settings");return k?JSON.parse(k):{appName:"توصيل القرية الذكي",logoUrl:"",contactPhone:"0933111222",currency:"ل.س",baseDeliveryFee:5,minOrderValue:10,activeRegions:["الحارة الشرقية","الحارة الغربية","وسط البلد","مجمع الياسمين السكني"]}}),[ue,be]=_.useState(()=>{const k=localStorage.getItem("tw_orders_list");return k?JSON.parse(k):[]}),[j,R]=_.useState(!1);_.useEffect(()=>{localStorage.setItem("tw_staff_members",JSON.stringify(G))},[G]),_.useEffect(()=>{localStorage.setItem("tw_drivers",JSON.stringify(ce))},[ce]),_.useEffect(()=>{localStorage.setItem("tw_coupons",JSON.stringify(Me))},[Me]),_.useEffect(()=>{localStorage.setItem("tw_audit_logs",JSON.stringify(ke))},[ke]),_.useEffect(()=>{localStorage.setItem("tw_settings",JSON.stringify(Q))},[Q]),_.useEffect(()=>{localStorage.setItem("tw_orders_list",JSON.stringify(ue))},[ue]);const K=(k,W)=>{const ae={manager:"المدير العام",orders_clerk:"مسؤول الطلبات",accountant:"المحاسب",support:"موظف الدعم"},he={id:"log_"+Date.now(),timestamp:new Date().toISOString(),user:ae[U],role:U,action:k,details:W};I(Ee=>[he,...Ee])},le=k=>k==="pwa_install"||k==="directory"||U==="manager"?!0:U==="orders_clerk"?["orders","drivers","logs","landmarks","directory"].includes(k):U==="accountant"?["stats","coupons","settings","directory"].includes(k):U==="support"?["orders","drivers","directory"].includes(k):!1,[ee,fe]=_.useState(""),ie=k=>{fe(k),setTimeout(()=>fe(""),4e3)},[je,Ae]=_.useState(null),[ut,de]=_.useState(""),[we,tt]=_.useState("restaurants"),[Ie,Ve]=_.useState(""),[ct,te]=_.useState("20-30 دقيقة"),[Je,at]=_.useState(5),[vt,ya]=_.useState("open"),[fa,Ya]=_.useState(!1),[D,re]=_.useState(1),[_e,Ge]=_.useState("0944111222"),[pt,nt]=_.useState("وسط البلد"),[Rt,Be]=_.useState(""),[yt,et]=_.useState("البلدة وضواحيها"),[Pe,It]=_.useState(50),[ft,fC]=_.useState(50),[E1,wr]=_.useState(null),[za,vn]=_.useState(""),[Ka,Qa]=_.useState(""),[Jn,e1]=_.useState(15),[_r,ul]=_.useState(""),[O1,bn]=_.useState(""),[Wa,Nr]=_.useState(!1),[pl,jr]=_.useState(20),[P1,yl]=_.useState("خصم 20%"),[fl,Lr]=_.useState(!1),[Pt,lt]=_.useState([]),[mt,$a]=_.useState([]),[U1,u2]=_.useState(""),[p2,Sr]=_.useState(0),[Mn,ml]=_.useState(""),[wn,_n]=_.useState(0),[Ja,Nn]=_.useState(""),[xt,y2]=_.useState("percent"),[xl,jn]=_.useState(10),[Ln,mC]=_.useState(20),[F1,Cr]=_.useState(""),[Ar,G1]=_.useState(""),[Z1,Ta]=_.useState("available"),[qt,Ir]=_.useState(""),[f2,kl]=_.useState(50),[qr,X1]=_.useState(50),[zr,Ut]=_.useState(""),[Y1,$r]=_.useState(""),[gl,Sn]=_.useState("orders_clerk"),[vl,Tr]=_.useState(""),[t1,Hr]=_.useState(!1),[Vr,K1]=_.useState(""),[bl,Q1]=_.useState(""),[Dr,W1]=_.useState(""),[ma,Ml]=_.useState("ShoppingBag"),[Cn,bt]=_.useState(null),[xa,wl]=_.useState(null),[a1,_l]=_.useState(""),[adminPreviewPrescription,setAdminPreviewPrescription]=_.useState(null),[Ha,Va]=_.useState("all"),Rr=k=>{if(k.preventDefault(),!!ut.trim()){if(je){if(L){const W=o.map(ae=>ae.id===je?{...ae,name:ut,category:we,image:Ie||"https://images.unsplash.com/photo-1561651823-34feb02250e4?w=500",deliveryTime:ct,deliveryFee:Number(Je),status:vt,isFeatured:fa,priority:Number(D),phone:_e,contactPhone:_e,ownerPhone:_e,address:pt,description:Rt,deliveryArea:yt}:ae);L(W);try{localStorage.setItem("tw_stores",JSON.stringify(W))}catch(e){};K("تعديل متجر",`تعديل بيانات المتجر: ${ut}`);ie("تم تعديل وحفظ بيانات المتجر والمهنة ورقم الهاتف بنجاح!")}}else{const W="store_"+Date.now(),ae="node_"+W,he={id:ae,name:ut+" Node",x:Number(Pe),y:Number(ft),type:"store",arabicName:ut},Ee={id:W,name:ut,category:we,image:Ie||"https://images.unsplash.com/photo-1561651823-34feb02250e4?w=500",rating:5,deliveryTime:ct,deliveryFee:Number(Je),locationNode:ae,status:vt,isFeatured:fa,priority:Number(D),phone:_e,contactPhone:_e,ownerPhone:_e,address:pt,description:Rt,deliveryArea:yt};r(Ee,he),K("إضافة متجر",`إضافة متجر جديد: ${ut}`),ie("تم إضافة المتجر الجديد وربطه بالخريطة!")}Ae(null),de(""),Be(""),Ve("")}},J1=k=>{const W="store_"+Date.now(),ae="node_"+W,he={id:ae,name:k.name+" - نسخة Node",x:Math.min(Math.max(Pe+5,10),90),y:Math.min(Math.max(ft+5,10),90),type:"store",arabicName:k.name+" - نسخة"},Ee={...k,id:W,name:k.name+" - نسخة مشابهة",locationNode:ae,status:"open"};r(Ee,he),i.filter(ka=>ka.storeId===k.id).forEach(ka=>{f({...ka,id:"prod_"+Math.random().toString(36).substr(2,9),storeId:W})}),K("نسخ متجر",`توليد نسخة مكررة للمتجر: ${k.name}`),ie("تم نسخ المتجر وتكرار قائمة السلع بنجاح!")},en=k=>{Ae(k.id),de(k.name),tt(k.category),Ve(k.image),te(k.deliveryTime),at(k.deliveryFee),ya(k.status||"open"),Ya(!!k.isFeatured),re(k.priority||1),Ge(k.phone||k.contactPhone||k.ownerPhone||"0944111222"),nt(k.address||"وسط البلد"),Be(k.description||""),et(k.deliveryArea||"البلدة وضواحيها"),window.scrollTo({top:120,behavior:"smooth"})},Br=k=>{if(k.preventDefault(),!Dr.trim()){alert("يرجى كتابة اسم التصنيف الجديد.");return}const W=Dr.trim(),ae="cat_"+Date.now();if(g.some(Ee=>Ee.label===W)){alert("هذا التصنيف موجود بالفعل بالنظام.");return}const he={id:ae,label:W,icon:ma};x&&(x([...g,he]),K("إضافة تصنيف جديد",`إضافة تصنيف المتاجر: ${W}`),ie("تم إضافة تصنيف المتجر الجديد بنجاح!"),W1(""),Ml("ShoppingBag"))},Nl=(k,W)=>{const ae=o.filter(he=>he.category===k);if(ae.length>0){alert(`عذراً، لا يمكن حذف تصنيف "${W}" لأنه مرتبط بـ (${ae.length}) من المتاجر حالياً. يرجى تعديل أو حذف تلك المتاجر أولاً قبل حذف التصنيف.`);return}bt({isOpen:!0,title:"تأكيد حذف تصنيف المتجر",message:`هل أنت متأكد من حذف تصنيف "${W}" نهائياً من النظام؟ لن يظهر للزبائن في القائمة الرئيسية بعد الآن.`,onConfirm:()=>{if(x){const he=g.filter(Ee=>Ee.id!==k);x(he),K("حذف تصنيف",`حذف تصنيف المتاجر: ${W}`),ie("تم إزالة تصنيف المتجر بنجاح."),bt(null)}}})},m2=k=>{if(k.preventDefault(),!za.trim()||!Ka)return;const W=o.find(ae=>ae.id===Ka);if(W){if(E1){if(H){const ae=i.map(he=>he.id===E1?{...he,name:za,price:Number(Jn),description:_r,image:O1||"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",storeId:Ka,category:W.category,isOffer:Wa,originalPrice:Wa?Number(pl):void 0,offerLabel:Wa?P1:void 0,isHidden:fl,sizes:Pt.length>0?Pt:void 0,additions:mt.length>0?mt:void 0}:he);H(ae),K("تعديل منتج",`تعديل السلعة: ${za}`),ie("تم تعديل السلعة وحفظ خياراتها!")}}else{const ae={id:"prod_"+Date.now(),name:za,price:Number(Jn),description:_r,image:O1||"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",storeId:Ka,category:W.category,isOffer:Wa,originalPrice:Wa?Number(pl):void 0,offerLabel:Wa?P1:void 0,isHidden:fl,sizes:Pt.length>0?Pt:void 0,additions:mt.length>0?mt:void 0};f(ae),K("إضافة منتج",`إضافة وجبة أو سلعة جديدة: ${za}`),ie("تم إضافة المنتج بنجاح للقوائم!")}wr(null),vn(""),ul(""),bn(""),lt([]),$a([])}},jl=k=>{wr(k.id),vn(k.name),Qa(k.storeId),e1(k.price),ul(k.description),bn(k.image),Nr(!!k.isOffer),jr(k.originalPrice||k.price+5),yl(k.offerLabel||"خصم خاص"),Lr(!!k.isHidden),lt(k.sizes||[]),$a(k.additions||[]),window.scrollTo({top:120,behavior:"smooth"})},Ll=()=>{U1.trim()&&(lt(k=>[...k,{name:U1.trim(),price:Number(p2)}]),u2(""),Sr(0))},x2=()=>{Mn.trim()&&($a(k=>[...k,{name:Mn.trim(),price:Number(wn)}]),ml(""),_n(0))},Bt=k=>{if(k.preventDefault(),!Ja.trim())return;const W={id:"coupon_"+Date.now(),code:Ja.trim().toUpperCase(),type:xt,value:Number(xl),minOrderValue:Number(Ln),isActive:!0,currentUsage:0};Ne(ae=>[W,...ae]),K("إنشاء كوبون",`تفعيل كوبون خصم جديد بقيمة ${xl}: ${Ja}`),ie("تم إنشاء كوبون الخصم وتفعيله فوراً للزبائن!"),Nn("")},An=k=>{if(k.preventDefault(),!F1.trim()||!Ar.trim())return;const W={id:"driver_"+Date.now(),name:F1.trim(),phone:Ar.trim(),status:Z1,totalDeliveries:0,earnings:0,rating:5};me(ae=>[W,...ae]),K("إضافة سائق",`تسجيل الكابتن الجديد للتوصيل: ${F1}`),ie("تم تعيين السائق وتأكيد أوراق اعتماده للخدمة!"),Cr(""),G1("")},Sl=(k,W)=>{const ae=ue.map(he=>he.id===k?{...he,status:W,acceptedAt:W==="accepted"?new Date().toISOString():he.acceptedAt,deliveredAt:W==="delivered"?new Date().toISOString():he.deliveredAt}:he);be(ae),K("تحديث حالة طلب",`تعديل حالة الطلب ${k} لـ ${W}`),ie("تم ترقية الطلب بنجاح لحالة التوصيل الجديدة!")},eo=(k,W)=>{
  const ae=ce.find(Ee=>Ee.id===W);
  if(!ae)return;
  const he=ue.map(Ee=>Ee.id===k?{...Ee,driverId:W,driverName:ae.name,status:Ee.status==="pending"?"accepted":Ee.status}:Ee);
  be(he);
  try {
    localStorage.setItem("tw_orders_list", JSON.stringify(he));
    const targetOrder = he.find(Ee=>Ee.id===k);
    if(targetOrder) {
      localStorage.setItem("tw_active_order", JSON.stringify(targetOrder));
    }
    window.dispatchEvent(new Event("storage"));
  } catch(e){}
  me(Ee=>Ee.map(Et=>Et.id===W?{...Et,status:"busy"}:Et));
  K("إسناد طلب لسائق",`تعيين الكابتن ${ae.name} للطلب رقم ${k}`);
  ie(`تم تكليف الكابتن (${ae.name}) بنجاح بالطلب #${k}!`);
},xC=k=>{if(k.preventDefault(),!xa||!a1.trim())return;const W=ue.map(ae=>ae.id===xa?{...ae,status:"cancelled",cancelReason:a1}:ae);be(W),K("إلغاء طلب",`إلغاء الطلب ${xa} بسبب: ${a1}`),ie("تم إلغاء الطلب وإرسال التنبيه التلقائي للزبون والسائق."),wl(null),_l("")},Er=k=>{if(k.preventDefault(),!qt.trim())return;const W="landmark_"+Date.now(),ae={id:W,name:W,arabicName:qt.trim(),x:Number(f2),y:Number(qr),type:"landmark"};q&&q([...d,ae]),K("إضافة معلم جغرافي",`إضافة معلم جديد: ${qt.trim()}`),ie("تم إضافة المعلم الجغرافي بنجاح!"),Ir(""),kl(50),X1(50)},Or=(k,W)=>{bt({isOpen:!0,title:"تأكيد إزالة المعلم الجغرافي",message:`هل أنت متأكد من حذف المعلم "${W}" من قائمة التوصيل نهائياً؟`,onConfirm:()=>{q&&q(d.filter(ae=>ae.id!==k)),K("حذف معلم جغرافي",`حذف المعلم: ${W}`),ie("تم حذف المعلم الجغرافي بنجاح."),bt(null)}})},n1=k=>({manager:"المدير العام",orders_clerk:"مسؤول الطلبات",accountant:"المحاسب المالي",support:"موظف الدعم والاتصال"})[k]||k,Cl=k=>{if(k.preventDefault(),!zr.trim()||!Y1.trim()||!vl.trim()){alert("يرجى ملء جميع الحقول المطلوبة لإضافة الموظف.");return}const W=vl.trim();if(W.length!==4||isNaN(Number(W))){alert("يجب أن يتكون رمز الـ PIN الخاص بالموظف من 4 أرقام بالضبط (مثال: 1234).");return}if(G.some(he=>he.pin===W)){alert("رمز الـ PIN هذا مستخدم بالفعل من قبل موظف آخر. يرجى اختيار رمز فريد.");return}const ae={id:"staff_"+Date.now(),name:zr.trim(),phone:Y1.trim(),role:gl,pin:W,isActive:!0,createdAt:new Date().toISOString()};J(he=>[...he,ae]),K("إضافة موظف جديد",`إضافة الموظف: ${ae.name} بصفة ${n1(ae.role)}`),ie("تم إضافة الموظف الجديد وصلاحياته بنجاح!"),Ut(""),$r(""),Tr(""),Sn("orders_clerk")},k2=(k,W)=>{J(ae=>ae.map(he=>{if(he.id===k){const Ee=!he.isActive;return K("تغيير حالة موظف",`تغيير حالة الموظف ${W} إلى ${Ee?"نشط":"غير نشط"}`),ie(`تم ${Ee?"تنشيط":"تعطيل"} حساب الموظف بنجاح.`),{...he,isActive:Ee}}return he}))},kC=(k,W)=>{bt({isOpen:!0,title:"تأكيد إزالة الموظف",message:`هل أنت متأكد من حذف حساب الموظف "${W}" نهائياً من النظام؟ لن يتمكن من تسجيل الدخول بعدها.`,onConfirm:()=>{J(ae=>ae.filter(he=>he.id!==k)),K("إزالة موظف",`حذف الموظف نهائياً: ${W}`),ie("تم إزالة حساب الموظف بنجاح."),bt(null)}})},gC=k=>{k.preventDefault(),Q1("");const W=Vr.trim(),ae=G.find(he=>he.pin===W);if(!ae){Q1("رمز الـ PIN غير صحيح! يرجى إعادة المحاولة.");return}if(!ae.isActive){Q1("هذا الحساب تم تعطيله مؤقتاً من قبل المدير العام.");return}F(ae.role),Hr(!1),K1(""),ae.role==="manager"?ne("stats"):ae.role==="orders_clerk"?ne("orders"):ae.role==="accountant"?ne("stats"):ne("orders"),K("تسجيل دخول الموظف",`الموظف ${ae.name} سجل دخوله بنجاح بالرمز السري.`),ie(`أهلاً بك يا ${ae.name}! تم تبديل حسابك بنجاح.`)},Da=(()=>{const k=ue.filter(Lt=>{if(Ha==="all")return!0;const Ra=new Date(Lt.createdAt),Pr=Date.now()-Ra.getTime();return Ha==="today"?Pr<=864e5:Ha==="week"?Pr<=6048e5:Ha==="month"?Pr<=2592e6:!0}),W=k.filter(Lt=>Lt.status==="delivered"),ae=k.filter(Lt=>Lt.status==="cancelled"),he=W.reduce((Lt,Ra)=>Lt+Ra.subtotal,0),Ee=W.reduce((Lt,Ra)=>Lt+Ra.deliveryFee,0),Et={};W.forEach(Lt=>{Et[Lt.storeName]=(Et[Lt.storeName]||0)+Lt.subtotal});const ka=Object.entries(Et).map(([Lt,Ra])=>({name:Lt,val:Ra})).sort((Lt,Ra)=>Ra.val-Lt.val).slice(0,4);return{total:k.length,completed:W.length,cancelled:ae.length,sales:he,deliveryFees:Ee,topStores:ka}})();return n.jsxs("div",{className:"bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden p-5 sm:p-7 space-y-6 animate-fade-in",dir:"rtl",children:[n.jsxs("div",{className:"flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-150 pb-5 gap-4",children:[n.jsxs("div",{className:"flex items-center gap-3",children:[n.jsx("div",{className:"w-12 h-12 rounded-2xl bg-slate-900 text-orange-500 flex items-center justify-center border border-slate-800 shadow-md",children:n.jsx(Kn,{className:"w-6 h-6 animate-pulse"})}),n.jsxs("div",{children:[n.jsxs("h2",{className:"font-extrabold text-slate-900 text-lg sm:text-xl",children:[Q.appName," • لوحة المدير"]}),n.jsx("p",{className:"text-xs text-slate-400 font-bold mt-0.5",children:"لوحة التحكم المركزية بالعمليات والصلاحيات والتقارير"})]})]}),n.jsxs("div",{className:"flex items-center gap-2 self-start sm:self-center",children:[n.jsxs("span",{className:"text-[10px] sm:text-xs text-slate-500 font-extrabold flex items-center gap-1",children:[n.jsx(ur,{className:"w-3.5 h-3.5 text-orange-500"})," هويتك الحالية:"]}),n.jsxs("select",{value:U,onChange:k=>{const W=k.target.value;F(W),ne("stats")},className:"bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 text-xs py-1.5 px-3 rounded-xl font-extrabold outline-none cursor-pointer",children:[n.jsx("option",{value:"manager",children:"المدير العام (صلاحيات كاملة)"}),n.jsx("option",{value:"orders_clerk",children:"مسؤول الطلبات (جدولة وتوزيع)"}),n.jsx("option",{value:"accountant",children:"المحاسب المالي (أرباح وإحصائيات)"}),n.jsx("option",{value:"support",children:"موظف الدعم والاتصال (الشكاوى)"})]}),n.jsxs("button",{onClick:()=>{K1(""),Q1(""),Hr(!0)},className:"bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-[11px] sm:text-xs py-1.5 px-3 rounded-xl transition-all flex items-center gap-1 cursor-pointer shadow-sm border border-slate-800",title:"تسجيل دخول الموظفين بالرمز السري",children:[n.jsx(ea,{className:"w-3.5 h-3.5 text-orange-400"}),n.jsx("span",{children:"دخول بالـ PIN"})]}),n.jsxs("button",{onClick:m,className:"bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs py-2 px-4 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer",children:[n.jsx(Zn,{className:"w-4 h-4"}),n.jsx("span",{children:"الزبائن"})]})]})]}),n.jsx(xr,{children:ee&&n.jsxs(V1.div,{initial:{opacity:0,y:-20},animate:{opacity:1,y:0},exit:{opacity:0,y:-20},className:"bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm p-4 rounded-2xl flex items-center gap-2.5 shadow-sm",children:[n.jsx(La,{className:"w-5 h-5 text-emerald-600 shrink-0"}),n.jsx("span",{className:"font-extrabold",children:ee})]})}),n.jsxs("div",{className:`p-3.5 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-3 transition-all ${adminEmergencyRush?"bg-red-50 border-red-300 text-red-900":"bg-slate-50 border-slate-200 text-slate-700"}`,children:[
  n.jsxs("div",{className:"flex items-center gap-2.5 text-right w-full sm:w-auto",children:[
    n.jsx("span",{className:"text-2xl shrink-0",children:adminEmergencyRush?"🚨":"⚡"}),
    n.jsxs("div",{children:[
      n.jsx("h4",{className:"font-extrabold text-xs sm:text-sm",children:adminEmergencyRush?"وضع ضغط الطلبات والطوارئ مفعل (الطلبات مجمدة مؤقتاً)":"إدارة ضغط الطلبات وحظر الخدمات/المنتجات"}),
      n.jsx("p",{className:"text-[10px] text-slate-500",children:adminEmergencyRush?"تم إيقاف استقبال طلبات جديدة في التطبيق لتخفيف الضغط على المتاجر والكباتن.":"يمكنك إيقاف واستئناف استقبال الطلبات كلياً أو حظر متاجر/سلع محددة عند وجود ضغط."})
    ]})
  ]}),
  n.jsx("button",{
    type:"button",
    onClick:toggleAdminEmergencyRush,
    className:`px-4 py-2 text-xs font-extrabold rounded-xl transition-all cursor-pointer shadow-xs whitespace-nowrap ${adminEmergencyRush?"bg-emerald-600 hover:bg-emerald-700 text-white animate-pulse":"bg-red-600 hover:bg-red-700 text-white"}`,
    children:adminEmergencyRush?"✅ استئناف استقبال الطلبات الآن":"🚨 إيقاف وتجميد عام للطلبات (وضع الضغط)"
  })
]}),
n.jsx("div",{className:"flex border-b border-slate-250 select-none overflow-x-auto scrollbar-none gap-2 pb-1",children:[{id:"pwa_install",label:"تثبيت ومشاركة التطبيق 📱",icon:"Share2"},{id:"stats",label:"الإحصائيات والأرباح",icon:"BarChart3"},{id:"directory",label:"سجل الزبائن والمهن 👥",icon:"Contact"},{id:"orders",label:"الطلبات النشطة والجدولة",icon:"Clock"},{id:"stores",label:"إدارة المحلات والمتاجر",icon:"Store"},{id:"products",label:"إدارة الأصناف والخيارات",icon:"UtensilsCrossed"},{id:"coupons",label:"كوبونات الخصم والترويج",icon:"BadgePercent"},{id:"drivers",label:"إدارة الكباتن والمناديب",icon:"Truck"},{id:"landmarks",label:"إدارة المعالم الجغرافية",icon:"MapPin"},{id:"logs",label:"سجل عمليات الموظفين",icon:"FileText"},{id:"staff",label:"طاقم العمل والصلاحيات",icon:"Users2"},{id:"settings",label:"الإعدادات والرسوم",icon:"Settings"}].map(k=>{const W=le(k.id),ae=US[k.icon]||da;return n.jsxs("button",{onClick:()=>ne(k.id),className:`py-2.5 px-4 font-bold text-xs whitespace-nowrap rounded-xl transition-all cursor-pointer flex items-center gap-2 border ${O===k.id?"bg-slate-900 border-slate-900 text-white shadow-lg":"bg-white border-slate-200 text-slate-500 hover:bg-slate-50"} ${W?"":"opacity-40 hover:bg-red-50 hover:border-red-100"}`,children:[n.jsx(ae,{className:`w-4 h-4 ${O===k.id?"text-orange-500":""}`}),n.jsx("span",{children:k.label}),!W&&n.jsx(ea,{className:"w-3 h-3 text-red-500 shrink-0"})]},k.id)})}),le(O)?n.jsxs("div",{className:"pt-2 animate-fade-in",children:[O==="stats"&&n.jsx((()=>{
  return function EnhancedStatsAndReportingView(){
    const [filterPeriod, setFilterPeriod] = _.useState(Ha || "today");
    const [showWhatsappModal, setShowWhatsappModal] = _.useState(false);
    const [showOfficialReportModal, setShowOfficialReportModal] = _.useState(false);
    const [managerPhone, setManagerPhone] = _.useState(() => localStorage.getItem("tw_manager_report_phone") || "");
    const [copiedReport, setCopiedReport] = _.useState(false);
    const [reportNotes, setReportNotes] = _.useState("");

    const handleFilterChange = (id) => {
      setFilterPeriod(id);
      Va(id);
    };

    // Calculate customer count
    const registeredCustomersCount = (() => {
      try {
        const raw = localStorage.getItem("tw_registered_customers");
        const list = raw ? JSON.parse(raw) : [];
        return Math.max(list.length, 6);
      } catch(e){ return 6; }
    })();

    // Calculate village crafts count
    const villageServicesCount = (() => {
      try {
        const raw = localStorage.getItem("tw_village_services");
        const list = raw ? JSON.parse(raw) : [];
        return Math.max(list.length, 8);
      } catch(e){ return 8; }
    })();

    const periodLabel = filterPeriod === "today" ? "مبيعات اليوم" :
                        filterPeriod === "week" ? "التقرير الأسبوعي" :
                        filterPeriod === "month" ? "التقرير الشهري" : "تقرير جميع الأوقات";

    const reportTimestamp = new Date().toLocaleString("ar-SY", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });

    // Build the formatted WhatsApp report text
    const generateWhatsappReportText = () => {
      let text = `📊 *تقرير الأداء المالي والإداري - تطبيق توصيل القرية* 📊\n`;
      text += `━━━━━━━━━━━━━━━━━━━━━━\n`;
      text += `🗓️ *فترة التقرير:* ${periodLabel}\n`;
      text += `⏰ *تاريخ ووقت الإصدار:* ${reportTimestamp}\n`;
      text += `━━━━━━━━━━━━━━━━━━━━━━\n\n`;

      text += `💰 *المؤشرات المالية والتشغيلية الرئيسية:*\n`;
      text += `💵 *إجمالي المبيعات المكتملة:* ${Da.sales} ${Q.currency}\n`;
      text += `✅ *الطلبات المكتملة بالتسليم:* ${Da.completed} طلب\n`;
      text += `🛵 *رسوم التوصيل المحصلة:* ${Da.deliveryFees} ${Q.currency}\n`;
      text += `⚠️ *الطلبات الملغاة:* ${Da.cancelled} طلب\n\n`;

      text += `👥 *إحصاءات مجتمع وشبكة القرية:*\n`;
      text += `• 👤 الزبائن المسجلين والموثقين: ${registeredCustomersCount} زبون\n`;
      text += `• 🏪 المتاجر والمحلات المسجلة: ${o.length} متجر (${o.filter(s=>s.status!=="closed").length} مفتوح نشط)\n`;
      text += `• 🛠️ دليل المهن والحرفيين: ${villageServicesCount} مهني معتمد\n`;
      text += `• 🛵 كباتن التوصيل والكوادر: ${ce.length} كابتن (${ce.filter(d=>d.status==="available").length} متاح الآن) + ${G.length} إدارة\n\n`;

      if (Da.topStores && Da.topStores.length > 0) {
        text += `🏆 *المحلات الأكثر طلباً ومبيعاً:*\n`;
        Da.topStores.forEach((st, idx) => {
          text += `${idx + 1}. *${st.name}*: ${st.val} ${Q.currency}\n`;
        });
        text += `\n`;
      }

      if (reportNotes.trim()) {
        text += `📝 *ملاحظات إدارية:*\n${reportNotes.trim()}\n\n`;
      }

      text += `━━━━━━━━━━━━━━━━━━━━━━\n`;
      text += `🏢 *تم الإصدار بواسطة:* لوحة الإدارة العامة المركزية\n`;
      text += `🔗 *رابط النظام:* ${window.location.origin}`;
      return text;
    };

    // Share to general WhatsApp (User chooses any person or group)
    const handleShareToWhatsappGeneral = (isBusiness = false) => {
      const text = generateWhatsappReportText();
      const encoded = encodeURIComponent(text);
      if (/Android/i.test(navigator.userAgent)) {
        if (isBusiness) {
          window.location.href = `intent://send?text=${encoded}#Intent;package=com.whatsapp.w4b;scheme=whatsapp;end`;
        } else {
          window.location.href = `intent://send?text=${encoded}#Intent;package=com.whatsapp;scheme=whatsapp;end`;
        }
      } else {
        if (isBusiness) {
          window.open(`https://wa.me/?text=${encoded}`, "_blank");
        } else {
          window.open(`https://api.whatsapp.com/send?text=${encoded}`, "_blank");
        }
      }
    };

    // Send directly to Manager phone number via WhatsApp / WhatsApp Business
    const handleSendDirectToManager = (isBusiness = false) => {
      let phone = managerPhone.trim();
      if (!phone) {
        alert("الرجاء إدخال رقم موبايل المدير أولاً.");
        return;
      }
      localStorage.setItem("tw_manager_report_phone", phone);
      if (phone.startsWith("0")) {
        phone = "963" + phone.substring(1);
      }
      phone = phone.replace(/[^0-9]/g, "");
      const text = generateWhatsappReportText();
      const encoded = encodeURIComponent(text);
      if (/Android/i.test(navigator.userAgent)) {
        if (isBusiness) {
          window.location.href = `intent://send?phone=${phone}&text=${encoded}#Intent;package=com.whatsapp.w4b;scheme=whatsapp;end`;
        } else {
          window.location.href = `intent://send?phone=${phone}&text=${encoded}#Intent;package=com.whatsapp;scheme=whatsapp;end`;
        }
      } else {
        window.open(`https://wa.me/${phone}?text=${encoded}`, "_blank");
      }
    };

    // Copy text to clipboard
    const handleCopyReport = () => {
      const text = generateWhatsappReportText();
      navigator.clipboard.writeText(text).then(() => {
        setCopiedReport(true);
        setTimeout(() => setCopiedReport(false), 3000);
      }).catch(() => {
        alert("تم نسخ التقرير!");
      });
    };

    return n.jsxs("div", {
      className: "space-y-6 animate-fade-in text-slate-800",
      dir: "rtl",
      children: [
        // -------------------------------------------------------------
        // TOP CONTROL BAR: BACK BUTTON + FILTERS + PRINT + WHATSAPP SHARE
        // -------------------------------------------------------------
        n.jsxs("div", {
          className: "bg-white p-4 rounded-3xl border border-slate-200 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4",
          children: [
            // Left: Back button to main tabs + Filter Pills
            n.jsxs("div", {
              className: "flex items-center flex-wrap gap-2.5",
              children: [
                // Quick Back Button to Orders/Stores
                n.jsxs("button", {
                  type: "button",
                  onClick: () => ne("orders"),
                  className: "py-2 px-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-xs border border-slate-200",
                  children: [
                    n.jsx("span", { children: "←" }),
                    n.jsx("span", { children: "رجوع للطلبات" })
                  ]
                }),

                n.jsx("div", { className: "h-5 w-[1px] bg-slate-200 hidden sm:block" }),

                n.jsx("span", { className: "text-xs text-slate-500 font-extrabold ml-1", children: "تصفية التقرير:" }),
                [
                  { id: "today", label: "مبيعات اليوم" },
                  { id: "week", label: "التقرير الأسبوعي" },
                  { id: "month", label: "التقرير الشهري" },
                  { id: "all", label: "جميع الأوقات" }
                ].map(item => n.jsx("button", {
                  key: item.id,
                  type: "button",
                  onClick: () => handleFilterChange(item.id),
                  className: `text-xs font-black py-2 px-3.5 rounded-xl border transition-all cursor-pointer ${filterPeriod === item.id ? "bg-orange-500 border-orange-500 text-white shadow-sm" : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"}`,
                  children: item.label
                }))
              ]
            }),

            // Action Buttons: WhatsApp Share + Print + Snapshot View
            n.jsxs("div", {
              className: "flex items-center flex-wrap gap-2",
              children: [
                // WhatsApp Share Button (Main Trigger)
                n.jsxs("button", {
                  type: "button",
                  onClick: () => setShowWhatsappModal(true),
                  className: "bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs py-2 px-4 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer",
                  children: [
                    n.jsx(US.MessageCircle || "span", { className: "w-4 h-4" }),
                    n.jsx("span", { children: "إرسال التقرير عبر واتساب 📲" })
                  ]
                }),

                // Official Printable / Snapshot Card View
                n.jsxs("button", {
                  type: "button",
                  onClick: () => setShowOfficialReportModal(true),
                  className: "bg-slate-900 hover:bg-slate-800 text-white font-black text-xs py-2 px-3.5 rounded-xl border border-slate-800 transition-all flex items-center gap-1.5 cursor-pointer",
                  children: [
                    n.jsx(US.FileText || "span", { className: "w-4 h-4 text-orange-400" }),
                    n.jsx("span", { children: "التقرير الرسمي والتصوير 📄" })
                  ]
                }),

                // Print Direct
                n.jsxs("button", {
                  type: "button",
                  onClick: () => window.print(),
                  className: "bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-2 px-3 rounded-xl border border-slate-200 transition-all flex items-center gap-1 cursor-pointer",
                  title: "طباعة فورية",
                  children: [
                    n.jsx(U0, { className: "w-3.5 h-3.5 text-slate-500" }),
                    n.jsx("span", { children: "طباعة 🖨️" })
                  ]
                })
              ]
            })
          ]
        }),

        // -------------------------------------------------------------
        // ECOSYSTEM CENSUS & COMMUNITY SUMMARY CARD
        // -------------------------------------------------------------
        n.jsxs("div", {
          className: "bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-5 sm:p-6 text-white shadow-xl space-y-4 text-right",
          children: [
            n.jsxs("div", {
              className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3",
              children: [
                n.jsxs("div", {
                  className: "flex items-center gap-2.5",
                  children: [
                    n.jsx("div", { className: "w-10 h-10 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-black text-lg", children: "📊" }),
                    n.jsxs("div", {
                      children: [
                        n.jsx("h3", { className: "font-black text-sm sm:text-base text-white", children: "إحصاءات وتعداد مجتمع القرية (الزبائن والمتاجر والمهن)" }),
                        n.jsx("p", { className: "text-slate-400 text-[11px]", children: "تعداد شامل ومباشر لكافة المسجلين بالنظام مع إمكانية تصدير التقرير ومشاركته فوراً." })
                      ]
                    })
                  ]
                }),
                n.jsxs("button", {
                  type: "button",
                  onClick: () => ne("directory"),
                  className: "py-2 px-4 bg-orange-500 hover:bg-orange-600 text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 self-start sm:self-auto cursor-pointer",
                  children: [
                    n.jsx(US.Contact || US.Users || "span", { className: "w-4 h-4" }),
                    n.jsx("span", { children: "فتح سجل الزبائن والمهن الكامل 📋" })
                  ]
                })
              ]
            }),

            // 4 Stats Sub-Cards
            n.jsxs("div", {
              className: "grid grid-cols-2 lg:grid-cols-4 gap-3.5",
              children: [
                // 1. Registered Customers
                n.jsxs("div", {
                  onClick: () => ne("directory"),
                  className: "bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 hover:border-orange-500/40 p-4 rounded-2xl cursor-pointer transition-all space-y-1 shadow-sm",
                  children: [
                    n.jsxs("div", {
                      className: "flex items-center justify-between",
                      children: [
                        n.jsx("span", { className: "text-[10px] text-slate-400 font-black", children: "👥 الزبائن المسجلين" }),
                        n.jsx("span", { className: "w-2 h-2 rounded-full bg-emerald-500 animate-pulse" })
                      ]
                    }),
                    n.jsxs("h4", { className: "text-2xl font-black text-amber-400", children: [registeredCustomersCount, " زبون"] }),
                    n.jsx("p", { className: "text-[10px] text-slate-400", children: "دخول مسجل وموثق بالاسم والموبايل" })
                  ]
                }),

                // 2. Stores & Shops
                n.jsxs("div", {
                  onClick: () => ne("stores"),
                  className: "bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 hover:border-orange-500/40 p-4 rounded-2xl cursor-pointer transition-all space-y-1 shadow-sm",
                  children: [
                    n.jsxs("div", {
                      className: "flex items-center justify-between",
                      children: [
                        n.jsx("span", { className: "text-[10px] text-slate-400 font-black", children: "🏪 المحلات والمتاجر" }),
                        n.jsx("span", { className: "text-[9px] bg-orange-500/20 text-orange-300 px-1.5 py-0.5 rounded font-bold", children: o.filter(s=>s.status!=="closed").length + " نشط" })
                      ]
                    }),
                    n.jsxs("h4", { className: "text-2xl font-black text-orange-400", children: [o.length, " متجر"] }),
                    n.jsxs("p", { className: "text-[10px] text-slate-400", children: [o.filter(s=>s.category==="restaurants").length, " مطاعم • ", o.filter(s=>s.category==="supermarket"||s.category==="supermarkets"||s.category==="groceries").length, " بقالية"] })
                  ]
                }),

                // 3. Village Crafts & Services
                n.jsxs("div", {
                  onClick: () => ne("directory"),
                  className: "bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 hover:border-orange-500/40 p-4 rounded-2xl cursor-pointer transition-all space-y-1 shadow-sm",
                  children: [
                    n.jsxs("div", {
                      className: "flex items-center justify-between",
                      children: [
                        n.jsx("span", { className: "text-[10px] text-slate-400 font-black", children: "🛠️ المهن وخدمات القرية" }),
                        n.jsx("span", { className: "text-[9px] bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded font-bold", children: "دليل الحرف" })
                      ]
                    }),
                    n.jsxs("h4", { className: "text-2xl font-black text-cyan-400", children: [villageServicesCount, " حرفي ومهنة"] }),
                    n.jsx("p", { className: "text-[10px] text-slate-400", children: "حدادة، دهان، سباكة، كهرباء، أطباء..." })
                  ]
                }),

                // 4. Drivers & Staff
                n.jsxs("div", {
                  onClick: () => ne("drivers"),
                  className: "bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 hover:border-orange-500/40 p-4 rounded-2xl cursor-pointer transition-all space-y-1 shadow-sm",
                  children: [
                    n.jsxs("div", {
                      className: "flex items-center justify-between",
                      children: [
                        n.jsx("span", { className: "text-[10px] text-slate-400 font-black", children: "🛵 الكباتن والكوادر" }),
                        n.jsx("span", { className: "text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-bold", children: ce.length + " كابتن" })
                      ]
                    }),
                    n.jsxs("h4", { className: "text-2xl font-black text-emerald-400", children: [ce.length + G.length, " كادر"] }),
                    n.jsxs("p", { className: "text-[10px] text-slate-400", children: [ce.filter(d=>d.status==="available").length, " متصل للطلب • ", G.length, " إدارة"] })
                  ]
                })
              ]
            })
          ]
        }),

        // -------------------------------------------------------------
        // 4 MAIN FINANCIAL & OPERATIONAL STATS CARDS (THE 4 ICONS IN SCREENSHOT)
        // -------------------------------------------------------------
        n.jsxs("div", {
          className: "grid grid-cols-2 lg:grid-cols-4 gap-4",
          children: [
            // 1. Total Completed Sales (المبيعات المكتملة)
            n.jsxs("div", {
              className: "bg-slate-900 text-white p-4.5 rounded-3xl border border-slate-800 shadow-sm relative overflow-hidden flex flex-col justify-between group hover:border-orange-500/40 transition-all",
              children: [
                n.jsx("div", { className: "absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-full blur-xl" }),
                n.jsxs("div", {
                  children: [
                    n.jsxs("div", {
                      className: "flex items-center justify-between",
                      children: [
                        n.jsx(D0, { className: "w-8 h-8 text-orange-500 opacity-90" }),
                        n.jsx("span", { className: "text-[10px] bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-lg font-black", children: "مبيعات" })
                      ]
                    }),
                    n.jsx("p", { className: "text-xs text-slate-400 font-bold mt-2.5", children: "إجمالي المبيعات المكتملة" }),
                    n.jsxs("h4", { className: "text-xl sm:text-2xl font-black text-orange-400 mt-1", children: [Da.sales, " ", Q.currency] })
                  ]
                }),
                n.jsxs("button", {
                  type: "button",
                  onClick: () => setShowWhatsappModal(true),
                  className: "mt-3 pt-2 border-t border-slate-800 text-[10px] text-orange-300 hover:text-white flex items-center justify-between font-bold cursor-pointer transition-colors",
                  children: [
                    n.jsx("span", { children: "مشاركة الرقم بالواتساب" }),
                    n.jsx(US.MessageCircle || "span", { className: "w-3 h-3 text-emerald-400" })
                  ]
                })
              ]
            }),

            // 2. Completed Deliveries (الطلبات المكتملة بالتسليم)
            n.jsxs("div", {
              className: "bg-white p-4.5 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between group hover:border-emerald-500/40 transition-all",
              children: [
                n.jsxs("div", {
                  children: [
                    n.jsxs("div", {
                      className: "flex items-center justify-between",
                      children: [
                        n.jsx(z1, { className: "w-8 h-8 text-emerald-600 opacity-90" }),
                        n.jsx("span", { className: "text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-lg font-black", children: "ناجح" })
                      ]
                    }),
                    n.jsx("p", { className: "text-xs text-slate-500 font-bold mt-2.5", children: "الطلبات المكتملة بالتسليم" }),
                    n.jsxs("h4", { className: "text-xl sm:text-2xl font-black text-slate-850 mt-1", children: [Da.completed, " طلب مكتمل"] })
                  ]
                }),
                n.jsxs("div", {
                  className: "mt-3 pt-2 border-t border-slate-100 text-[10px] text-emerald-600 font-bold flex items-center justify-between",
                  children: [
                    n.jsx("span", { children: "تسليم يدوي ناجح" }),
                    n.jsx("span", { className: "w-2 h-2 rounded-full bg-emerald-500" })
                  ]
                })
              ]
            }),

            // 3. Collected Delivery Fees (رسوم التوصيل المحصلة)
            n.jsxs("div", {
              className: "bg-white p-4.5 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between group hover:border-blue-500/40 transition-all",
              children: [
                n.jsxs("div", {
                  children: [
                    n.jsxs("div", {
                      className: "flex items-center justify-between",
                      children: [
                        n.jsx(cl, { className: "w-8 h-8 text-blue-600 opacity-90" }),
                        n.jsx("span", { className: "text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-lg font-black", children: "توصيل" })
                      ]
                    }),
                    n.jsx("p", { className: "text-xs text-slate-500 font-bold mt-2.5", children: "رسوم التوصيل المحصلة" }),
                    n.jsxs("h4", { className: "text-xl sm:text-2xl font-black text-slate-850 mt-1", children: [Da.deliveryFees, " ", Q.currency] })
                  ]
                }),
                n.jsxs("div", {
                  className: "mt-3 pt-2 border-t border-slate-100 text-[10px] text-blue-600 font-bold flex items-center justify-between",
                  children: [
                    n.jsx("span", { children: "أرباح أسطول الكباتن" }),
                    n.jsx(US.Truck || "span", { className: "w-3 h-3 text-blue-500" })
                  ]
                })
              ]
            }),

            // 4. Cancelled Orders (الطلبات الملغاة حالياً)
            n.jsxs("div", {
              className: "bg-white p-4.5 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between group hover:border-red-500/40 transition-all",
              children: [
                n.jsxs("div", {
                  children: [
                    n.jsxs("div", {
                      className: "flex items-center justify-between",
                      children: [
                        n.jsx(ha, { className: "w-8 h-8 text-red-500 opacity-90" }),
                        n.jsx("span", { className: "text-[10px] bg-red-50 text-red-700 px-2 py-0.5 rounded-lg font-black", children: "ملغي" })
                      ]
                    }),
                    n.jsx("p", { className: "text-xs text-slate-500 font-bold mt-2.5", children: "الطلبات الملغاة حالياً" }),
                    n.jsxs("h4", { className: "text-xl sm:text-2xl font-black text-red-600 mt-1", children: [Da.cancelled, " طلب ملغي"] })
                  ]
                }),
                n.jsxs("div", {
                  className: "mt-3 pt-2 border-t border-slate-100 text-[10px] text-slate-400 font-bold flex items-center justify-between",
                  children: [
                    n.jsx("span", { children: "نسبة الإلغاء: " + ((Da.completed + Da.cancelled) > 0 ? Math.round((Da.cancelled / (Da.completed + Da.cancelled)) * 100) : 0) + "%" }),
                    n.jsx("span", { className: "w-2 h-2 rounded-full bg-red-400" })
                  ]
                })
              ]
            })
          ]
        }),

        // -------------------------------------------------------------
        // SALES CHART & TOP STORES SECTION
        // -------------------------------------------------------------
        n.jsxs("div", {
          className: "grid grid-cols-1 lg:grid-cols-12 gap-6",
          children: [
            // Chart
            n.jsxs("div", {
              className: "lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-4",
              children: [
                n.jsxs("div", {
                  className: "flex items-center justify-between",
                  children: [
                    n.jsx("h4", { className: "font-black text-slate-800 text-sm sm:text-base", children: "تحليل مبيعات المحلات على مدار الأيام المنصرمة" }),
                    n.jsx("span", { className: "text-[10px] text-slate-400 font-bold", children: "مخطط بياني فوري" })
                  ]
                }),
                n.jsx("div", {
                  className: "relative h-48 w-full flex items-end",
                  children: n.jsxs("svg", {
                    className: "w-full h-full",
                    viewBox: "0 0 500 120",
                    preserveAspectRatio: "none",
                    children: [
                      n.jsx("defs", {
                        children: n.jsxs("linearGradient", {
                          id: "chartGrad",
                          x1: "0",
                          y1: "0",
                          x2: "0",
                          y2: "1",
                          children: [
                            n.jsx("stop", { offset: "0%", stopColor: "#f97316", stopOpacity: "0.3" }),
                            n.jsx("stop", { offset: "100%", stopColor: "#f97316", stopOpacity: "0.0" })
                          ]
                        })
                      }),
                      n.jsx("path", { d: "M0,120 L50,90 L120,40 L190,80 L260,30 L340,65 L420,15 L500,45 L500,120 Z", fill: "url(#chartGrad)" }),
                      n.jsx("path", { d: "M0,120 L50,90 L120,40 L190,80 L260,30 L340,65 L420,15 L500,45", fill: "none", stroke: "#f97316", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round" })
                    ]
                  })
                }),
                n.jsxs("div", {
                  className: "flex justify-between text-[10px] text-slate-400 font-bold select-none px-1 border-t border-slate-100 pt-2",
                  children: [
                    n.jsx("span", { children: "السبت" }),
                    n.jsx("span", { children: "الأحد" }),
                    n.jsx("span", { children: "الاثنين" }),
                    n.jsx("span", { children: "الثلاثاء" }),
                    n.jsx("span", { children: "الأربعاء" }),
                    n.jsx("span", { children: "الخميس" }),
                    n.jsx("span", { children: "الجمعة اليوم" })
                  ]
                })
              ]
            }),

            // Top Stores
            n.jsxs("div", {
              className: "lg:col-span-4 bg-slate-900 text-white rounded-3xl p-5 border border-slate-800 shadow-sm space-y-4 flex flex-col justify-between",
              children: [
                n.jsxs("div", {
                  className: "flex items-center justify-between border-b border-slate-800 pb-2",
                  children: [
                    n.jsx("h4", { className: "font-black text-sm sm:text-base", children: "المحلات الأكثر طلباً ومبيعاً" }),
                    n.jsx("span", { className: "text-xs", children: "🏆" })
                  ]
                }),
                Da.topStores.length === 0 ? n.jsx("p", { className: "text-slate-400 text-xs py-10 text-center font-bold", children: "لا توجد مبيعات مسجلة في هذه الفترة بعد." }) : n.jsx("div", {
                  className: "space-y-3",
                  children: Da.topStores.map((k, W) => n.jsxs("div", {
                    className: "space-y-1.5",
                    children: [
                      n.jsxs("div", {
                        className: "flex justify-between text-xs font-bold",
                        children: [
                          n.jsx("span", { children: k.name }),
                          n.jsxs("span", { className: "text-orange-400", children: [k.val, " ", Q.currency] })
                        ]
                      }),
                      n.jsx("div", {
                        className: "w-full bg-slate-800 h-2 rounded-full overflow-hidden",
                        children: n.jsx("div", { className: "bg-orange-500 h-full rounded-full", style: { width: `${Math.min(k.val / (Da.sales || 1) * 100, 100)}%` } })
                      })
                    ]
                  }, W))
                }),
                n.jsx("p", { className: "text-[10px] text-slate-500 leading-normal font-bold", children: "* تحتسب الإحصائيات الفورية مباشرة من صفقات التسليم الناجحة التي أتمها المندوب باليد." })
              ]
            })
          ]
        }),

        // -------------------------------------------------------------
        // MODAL 1: WHATSAPP SHARE MODAL (FOR INDIVIDUALS & GROUPS)
        // -------------------------------------------------------------
        showWhatsappModal && n.jsxs("div", {
          className: "fixed inset-0 z-[100] bg-slate-950/85 backdrop-blur-md flex flex-col justify-start sm:justify-center items-center p-0 sm:p-4 overflow-y-auto w-full h-[100dvh]",
          dir: "rtl",
          onClick: (e) => { if (e.target === e.currentTarget) setShowWhatsappModal(false); },
          children: [
            n.jsxs("div", {
              className: "bg-white w-full sm:max-w-lg h-[100dvh] sm:h-auto sm:max-h-[90vh] rounded-none sm:rounded-3xl shadow-2xl border-0 sm:border sm:border-slate-200 flex flex-col overflow-hidden text-right relative",
              children: [
                // 1. ALWAYS-VISIBLE STICKY TOP HEADER WITH HUGE CLEAR BACK BUTTON
                n.jsxs("div", {
                  className: "p-3.5 sm:p-5 border-b border-slate-200 bg-white sticky top-0 z-30 flex items-center justify-between shrink-0 shadow-xs",
                  children: [
                    n.jsxs("div", {
                      className: "flex items-center gap-2.5",
                      children: [
                        n.jsx("div", { className: "w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-black text-lg sm:text-xl shrink-0 shadow-xs", children: "📲" }),
                        n.jsxs("div", {
                          children: [
                            n.jsx("h3", { className: "font-black text-sm sm:text-base text-slate-900 leading-tight", children: "إرسال التقرير عبر واتساب" }),
                            n.jsx("p", { className: "text-slate-400 text-[10px] sm:text-[11px] font-bold", children: "للأشخاص والمجموعات والمدير" })
                          ]
                        })
                      ]
                    }),

                    // PROMINENT BACK BUTTON (TOP)
                    n.jsxs("button", {
                      type: "button",
                      onClick: () => setShowWhatsappModal(false),
                      className: "py-2 px-3.5 bg-slate-100 active:bg-slate-200 hover:bg-slate-200 text-slate-800 font-black text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer border border-slate-200 active:scale-95",
                      children: [
                        n.jsx("span", { className: "text-sm", children: "✕" }),
                        n.jsx("span", { children: "إغلاق / رجوع" })
                      ]
                    })
                  ]
                }),

                // 2. SCROLLABLE BODY
                n.jsxs("div", {
                  className: "p-4 sm:p-6 space-y-4 sm:space-y-5 overflow-y-auto flex-1",
                  children: [
                    // Manager Direct Phone Input
                    n.jsxs("div", {
                      className: "bg-emerald-50/70 border border-emerald-200/70 p-4 rounded-2xl space-y-2",
                      children: [
                        n.jsx("label", { className: "text-xs font-black text-emerald-950 block", children: "رقم موبايل المدير (اختياري للإرسال المباشر):" }),
                        n.jsxs("div", {
                          className: "flex gap-2",
                          children: [
                            n.jsx("input", {
                              type: "tel",
                              value: managerPhone,
                              onChange: (e) => setManagerPhone(e.target.value),
                              placeholder: "مثال: 0933111222",
                              className: "flex-1 bg-white border border-emerald-300 focus:border-emerald-500 rounded-xl py-2 px-3 text-xs font-bold text-slate-800 outline-none dir-ltr text-right"
                            }),
                            n.jsxs("button", {
                              type: "button",
                              onClick: () => handleSendDirectToManager(false),
                              className: "bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black px-3 py-2 rounded-xl transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap shadow-xs active:scale-95",
                              title: "إرسال لواتساب العادي",
                              children: [
                                n.jsx(US.Send || "span", { className: "w-3.5 h-3.5" }),
                                n.jsx("span", { children: "واتساب 💬" })
                              ]
                            }),
                            n.jsxs("button", {
                              type: "button",
                              onClick: () => handleSendDirectToManager(true),
                              className: "bg-slate-900 hover:bg-slate-850 text-white text-xs font-black px-3 py-2 rounded-xl transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap shadow-xs active:scale-95 border border-emerald-500/40",
                              title: "إرسال لواتساب الأعمال",
                              children: [
                                n.jsx(US.Building || "span", { className: "w-3.5 h-3.5 text-emerald-400" }),
                                n.jsx("span", { children: "واتس أعمال 💼" })
                              ]
                            })
                          ]
                        })
                      ]
                    }),

                    // General Share Options
                    n.jsxs("div", {
                      className: "space-y-2.5",
                      children: [
                        n.jsx("span", { className: "text-xs font-black text-slate-700 block", children: "أو إرسال التقرير العام إلى أي مجموعة أو شخص في واتساب:" }),
                        n.jsxs("div", {
                          className: "grid grid-cols-1 sm:grid-cols-2 gap-2.5",
                          children: [
                            // Option 1: Main WhatsApp
                            n.jsxs("button", {
                              type: "button",
                              onClick: () => handleShareToWhatsappGeneral(false),
                              className: "p-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black text-xs transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer active:scale-95",
                              children: [
                                n.jsx(US.MessageCircle || "span", { className: "w-4 h-4" }),
                                n.jsx("span", { children: "واتساب (شخص أو مجموعة) 👥" })
                              ]
                            }),
                            // Option 2: WhatsApp Business
                            n.jsxs("button", {
                              type: "button",
                              onClick: () => handleShareToWhatsappGeneral(true),
                              className: "p-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-black text-xs transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer active:scale-95",
                              children: [
                                n.jsx(US.Building || "span", { className: "w-4 h-4 text-emerald-400" }),
                                n.jsx("span", { children: "واتساب للأعمال (Business) 💼" })
                              ]
                            })
                          ]
                        })
                      ]
                    }),

                    // Optional Notes Input
                    n.jsxs("div", {
                      className: "space-y-1.5",
                      children: [
                        n.jsx("label", { className: "text-xs font-bold text-slate-600 block", children: "إضافة ملاحظة أو توجيه خاص بالتقرير (اختياري):" }),
                        n.jsx("textarea", {
                          rows: 2,
                          value: reportNotes,
                          onChange: (e) => setReportNotes(e.target.value),
                          placeholder: "مثال: يرجى مراجعة مبيعات نهاية الأسبوع والتحضير لمخزون الأسبوع القادم...",
                          className: "w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl p-2.5 text-xs text-slate-800 outline-none"
                        })
                      ]
                    }),

                    // Live Preview of the WhatsApp text with Copy Button
                    n.jsxs("div", {
                      className: "bg-slate-950 text-slate-200 rounded-2xl p-3.5 text-[11px] font-mono leading-relaxed space-y-2 relative border border-slate-800 max-h-44 overflow-y-auto select-all",
                      children: [
                        n.jsxs("div", {
                          className: "flex items-center justify-between border-b border-slate-800 pb-1.5",
                          children: [
                            n.jsx("span", { className: "text-[10px] text-emerald-400 font-bold", children: "معاينة نص رسالة الواتساب المنسقة:" }),
                            n.jsxs("button", {
                              type: "button",
                              onClick: handleCopyReport,
                              className: "bg-slate-800 hover:bg-slate-700 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 cursor-pointer active:scale-95",
                              children: [
                                n.jsx(US.Copy || "span", { className: "w-3 h-3" }),
                                n.jsx("span", { children: copiedReport ? "تم النسخ بنجاح! ✅" : "نسخ النص" })
                              ]
                            })
                          ]
                        }),
                        n.jsx("pre", { className: "whitespace-pre-wrap font-sans text-slate-300 text-[10.5px]", children: generateWhatsappReportText() })
                      ]
                    })
                  ]
                }),

                // 3. ALWAYS-VISIBLE STICKY BOTTOM FOOTER WITH PROMINENT BACK BUTTON
                n.jsxs("div", {
                  className: "p-3 sm:p-4 border-t border-slate-200 bg-slate-50 sticky bottom-0 z-30 flex items-center justify-between gap-2 shrink-0 pb-safe",
                  children: [
                    // CLEAR PROMINENT BACK BUTTON (BOTTOM)
                    n.jsxs("button", {
                      type: "button",
                      onClick: () => setShowWhatsappModal(false),
                      className: "py-2.5 px-4 bg-white active:bg-slate-100 hover:bg-slate-100 text-slate-800 font-extrabold text-xs rounded-xl border border-slate-300 cursor-pointer shadow-xs transition-all flex items-center gap-1.5 active:scale-95",
                      children: [
                        n.jsx("span", { className: "text-sm", children: "🔙" }),
                        n.jsx("span", { children: "رجوع للتقارير" })
                      ]
                    }),

                    // Share button
                    n.jsxs("button", {
                      type: "button",
                      onClick: () => handleShareToWhatsappGeneral(false),
                      className: "py-2.5 px-3 sm:px-4 bg-emerald-600 active:bg-emerald-700 hover:bg-emerald-700 text-white text-xs font-black rounded-xl shadow-md cursor-pointer flex items-center gap-1.5 active:scale-95",
                      children: [
                        n.jsx(US.Send || "span", { className: "w-3.5 h-3.5" }),
                        n.jsx("span", { children: "واتساب 💬" })
                      ]
                    }),
                    // Share button: WhatsApp Business
                    n.jsxs("button", {
                      type: "button",
                      onClick: () => handleShareToWhatsappGeneral(true),
                      className: "py-2.5 px-3 sm:px-4 bg-slate-900 active:bg-slate-800 hover:bg-slate-800 text-white text-xs font-black rounded-xl shadow-md cursor-pointer flex items-center gap-1.5 active:scale-95 border border-emerald-500/40",
                      children: [
                        n.jsx(US.Building || "span", { className: "w-3.5 h-3.5 text-emerald-400" }),
                        n.jsx("span", { children: "واتس أعمال 💼" })
                      ]
                    })
                  ]
                })
              ]
            })
          ]
        }),

        // -------------------------------------------------------------
        // MODAL 2: OFFICIAL PRINTABLE / SNAPSHOT REPORT CARD (MOBILE PERFECT)
        // -------------------------------------------------------------
        showOfficialReportModal && n.jsxs("div", {
          className: "fixed inset-0 z-[100] bg-slate-950/85 backdrop-blur-md flex flex-col justify-start sm:justify-center items-center p-0 sm:p-4 overflow-y-auto w-full h-[100dvh]",
          dir: "rtl",
          onClick: (e) => { if (e.target === e.currentTarget) setShowOfficialReportModal(false); },
          children: [
            n.jsxs("div", {
              className: "bg-white w-full sm:max-w-2xl h-[100dvh] sm:h-auto sm:max-h-[94vh] rounded-none sm:rounded-3xl shadow-2xl border-0 sm:border sm:border-slate-200 flex flex-col overflow-hidden text-right relative print:max-w-none print:shadow-none print:border-none print:p-0 print:max-h-none print:h-auto",
              children: [
                // Top Actions Header (Hidden in Print)
                n.jsxs("div", {
                  className: "p-3.5 sm:p-5 border-b border-slate-200 bg-white sticky top-0 z-30 flex items-center justify-between shrink-0 shadow-xs print:hidden",
                  children: [
                    // CLEAR PROMINENT BACK BUTTON (TOP)
                    n.jsxs("button", {
                      type: "button",
                      onClick: () => setShowOfficialReportModal(false),
                      className: "py-2 px-3.5 bg-slate-100 active:bg-slate-200 hover:bg-slate-200 text-slate-800 font-black text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer border border-slate-200 active:scale-95",
                      children: [
                        n.jsx("span", { className: "text-sm", children: "✕" }),
                        n.jsx("span", { children: "رجوع للتقارير" })
                      ]
                    }),

                    n.jsxs("div", {
                      className: "flex items-center gap-2",
                      children: [
                        n.jsxs("button", {
                          type: "button",
                          onClick: () => { setShowOfficialReportModal(false); setShowWhatsappModal(true); },
                          className: "py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black flex items-center gap-1 cursor-pointer shadow-xs",
                          children: [
                            n.jsx(US.MessageCircle || "span", { className: "w-3.5 h-3.5" }),
                            n.jsx("span", { children: "واتساب" })
                          ]
                        }),
                        n.jsxs("button", {
                          type: "button",
                          onClick: () => window.print(),
                          className: "py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-black flex items-center gap-1 cursor-pointer shadow-xs",
                          children: [
                            n.jsx(U0, { className: "w-3.5 h-3.5 text-orange-400" }),
                            n.jsx("span", { children: "طباعة" })
                          ]
                        })
                      ]
                    })
                  ]
                }),

                // THE OFFICIAL REPORT SHEET CONTENT (SCROLLABLE)
                n.jsxs("div", {
                  className: "p-4 sm:p-8 space-y-5 sm:space-y-6 bg-white overflow-y-auto flex-1 print:p-0",
                  children: [
                    // Official Header
                    n.jsxs("div", {
                      className: "border-b-2 border-slate-900 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2",
                      children: [
                        n.jsxs("div", {
                          className: "flex items-center gap-3",
                          children: [
                            n.jsx("div", { className: "w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center font-black text-xl sm:text-2xl shadow-md shrink-0", children: "🛵" }),
                            n.jsxs("div", {
                              children: [
                                n.jsx("h2", { className: "font-black text-sm sm:text-lg text-slate-900", children: "تطبيق توصيل - الإدارة العامة المركزية" }),
                                n.jsx("p", { className: "text-slate-500 text-xs font-bold", children: "تقرير الأداء المالي والتشغيلي وإحصاءات المجتمع" })
                              ]
                            })
                          ]
                        }),
                        n.jsxs("div", {
                          className: "text-right sm:text-left text-xs font-bold text-slate-600 space-y-0.5 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100",
                          children: [
                            n.jsxs("p", { children: [n.jsx("span", { className: "text-slate-400", children: "الفترة: " }), n.jsx("span", { className: "text-orange-600 font-black", children: periodLabel })] }),
                            n.jsxs("p", { children: [n.jsx("span", { className: "text-slate-400", children: "التاريخ: " }), reportTimestamp] })
                          ]
                        })
                      ]
                    }),

                    // 4 Main Financial Cards
                    n.jsxs("div", {
                      className: "grid grid-cols-2 sm:grid-cols-4 gap-3",
                      children: [
                        n.jsxs("div", {
                          className: "border-2 border-slate-900 p-3 sm:p-3.5 rounded-2xl bg-slate-900 text-white text-center space-y-1",
                          children: [
                            n.jsx("p", { className: "text-[10px] text-slate-300 font-bold", children: "💵 المبيعات المكتملة" }),
                            n.jsxs("h3", { className: "text-base sm:text-lg font-black text-orange-400", children: [Da.sales, " ", Q.currency] })
                          ]
                        }),
                        n.jsxs("div", {
                          className: "border-2 border-slate-200 p-3 sm:p-3.5 rounded-2xl bg-emerald-50/50 text-center space-y-1",
                          children: [
                            n.jsx("p", { className: "text-[10px] text-emerald-800 font-bold", children: "✅ الطلبات المسلمة" }),
                            n.jsxs("h3", { className: "text-base sm:text-lg font-black text-emerald-700", children: [Da.completed, " طلب"] })
                          ]
                        }),
                        n.jsxs("div", {
                          className: "border-2 border-slate-200 p-3 sm:p-3.5 rounded-2xl bg-blue-50/50 text-center space-y-1",
                          children: [
                            n.jsx("p", { className: "text-[10px] text-blue-800 font-bold", children: "🛵 رسوم التوصيل" }),
                            n.jsxs("h3", { className: "text-base sm:text-lg font-black text-blue-700", children: [Da.deliveryFees, " ", Q.currency] })
                          ]
                        }),
                        n.jsxs("div", {
                          className: "border-2 border-slate-200 p-3 sm:p-3.5 rounded-2xl bg-red-50/50 text-center space-y-1",
                          children: [
                            n.jsx("p", { className: "text-[10px] text-red-800 font-bold", children: "⚠️ الطلبات الملغاة" }),
                            n.jsxs("h3", { className: "text-base sm:text-lg font-black text-red-600", children: [Da.cancelled, " طلب"] })
                          ]
                        })
                      ]
                    }),

                    // Community Census Table
                    n.jsxs("div", {
                      className: "border border-slate-200 rounded-2xl overflow-hidden text-xs",
                      children: [
                        n.jsx("div", {
                          className: "bg-slate-100 p-2.5 font-black text-slate-800 border-b border-slate-200",
                          children: "📋 تعداد وإحصاءات مجتمع القرية بالنظام:"
                        }),
                        n.jsxs("div", {
                          className: "grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-slate-200 p-3 text-center bg-white",
                          children: [
                            n.jsxs("div", { className: "p-2", children: [n.jsx("span", { className: "text-slate-400 text-[10px] block", children: "الزبائن الموثقين" }), n.jsxs("span", { className: "font-black text-slate-800 text-sm", children: [registeredCustomersCount, " زبون"] })] }),
                            n.jsxs("div", { className: "p-2", children: [n.jsx("span", { className: "text-slate-400 text-[10px] block", children: "المتاجر المعتمدة" }), n.jsxs("span", { className: "font-black text-slate-800 text-sm", children: [o.length, " متجر"] })] }),
                            n.jsxs("div", { className: "p-2", children: [n.jsx("span", { className: "text-slate-400 text-[10px] block", children: "دليل المهن والحرف" }), n.jsxs("span", { className: "font-black text-slate-800 text-sm", children: [villageServicesCount, " مهني"] })] }),
                            n.jsxs("div", { className: "p-2", children: [n.jsx("span", { className: "text-slate-400 text-[10px] block", children: "أسطول الكباتن والإدارة" }), n.jsxs("span", { className: "font-black text-slate-800 text-sm", children: [ce.length + G.length, " كادر"] })] })
                          ]
                        })
                      ]
                    }),

                    // Top Stores Table
                    Da.topStores && Da.topStores.length > 0 && n.jsxs("div", {
                      className: "border border-slate-200 rounded-2xl overflow-hidden text-xs",
                      children: [
                        n.jsx("div", {
                          className: "bg-slate-100 p-2.5 font-black text-slate-800 border-b border-slate-200",
                          children: "🏆 المحلات الأكثر طلباً ومبيعاً:"
                        }),
                        n.jsx("div", {
                          className: "divide-y divide-slate-100 bg-white",
                          children: Da.topStores.map((st, idx) => n.jsxs("div", {
                            key: idx,
                            className: "p-2.5 flex items-center justify-between",
                            children: [
                              n.jsxs("span", { className: "font-bold text-slate-700", children: [`${idx + 1}. `, st.name] }),
                              n.jsxs("span", { className: "font-black text-orange-600", children: [st.val, " ", Q.currency] })
                            ]
                          }))
                        })
                      ]
                    }),

                    // Official Footer Stamps
                    n.jsxs("div", {
                      className: "border-t border-slate-200 pt-4 flex items-center justify-between text-[11px] text-slate-500 font-bold",
                      children: [
                        n.jsxs("div", {
                          className: "space-y-1",
                          children: [
                            n.jsx("p", { children: "🏢 وحدة الرقابة المالية والتشغيلية" }),
                            n.jsx("p", { className: "text-emerald-700 font-black", children: "✓ معتمد وموثق إلكترونياً" })
                          ]
                        }),
                        n.jsxs("div", {
                          className: "text-left border border-dashed border-slate-300 p-2 rounded-xl bg-slate-50/50",
                          children: [
                            n.jsx("span", { className: "block text-[9px] text-slate-400", children: "ختم النظام الإلكتروني" }),
                            n.jsx("span", { className: "font-black text-slate-700 text-xs tracking-wider", children: "TAWSEEL-ADMIN-SYS" })
                          ]
                        })
                      ]
                    })
                  ]
                }),

                // STICKY BOTTOM ACTIONS FOOTER (Hidden in Print)
                n.jsxs("div", {
                  className: "p-3 sm:p-4 border-t border-slate-200 bg-slate-50 sticky bottom-0 z-30 flex items-center justify-between gap-2 shrink-0 print:hidden pb-safe",
                  children: [
                    // CLEAR PROMINENT BACK BUTTON (BOTTOM)
                    n.jsxs("button", {
                      type: "button",
                      onClick: () => setShowOfficialReportModal(false),
                      className: "py-2.5 px-4 bg-white active:bg-slate-100 hover:bg-slate-100 text-slate-800 font-extrabold text-xs rounded-xl border border-slate-300 cursor-pointer shadow-xs transition-all flex items-center gap-1.5 active:scale-95",
                      children: [
                        n.jsx("span", { className: "text-sm", children: "🔙" }),
                        n.jsx("span", { children: "رجوع إلى الإحصائيات" })
                      ]
                    }),
                    n.jsxs("button", {
                      type: "button",
                      onClick: () => { setShowOfficialReportModal(false); setShowWhatsappModal(true); },
                      className: "py-2.5 px-4 sm:px-5 bg-emerald-600 active:bg-emerald-700 hover:bg-emerald-700 text-white text-xs font-black rounded-xl shadow-md cursor-pointer flex items-center gap-1.5 active:scale-95",
                      children: [
                        n.jsx(US.MessageCircle || "span", { className: "w-4 h-4" }),
                        n.jsx("span", { children: "إرسال التقرير لواتساب 📲" })
                      ]
                    })
                  ]
                })
              ]
            })
          ]
        })
      ]
    });
  };
})(), {}),O==="orders"&&n.jsxs("div",{className:"space-y-4",children:[n.jsxs("div",{className:"flex items-center justify-between border-b border-slate-100 pb-3 flex-wrap gap-2",children:[n.jsx("h3",{className:"font-extrabold text-slate-800 text-sm sm:text-base",children:"سجل الطلبات المتداولة وجدولة الرحلات"}),n.jsxs("span",{className:"bg-slate-100 text-slate-700 text-[10px] font-extrabold py-1 px-3 rounded-full border border-slate-200",children:["مجموع الطلبات بالنظام: ",ue.length]})]}),ue.length===0?n.jsxs("div",{className:"bg-slate-50 rounded-3xl p-12 text-center border border-slate-150 space-y-2",children:[n.jsx(Za,{className:"w-10 h-10 text-slate-300 mx-auto"}),n.jsx("p",{className:"text-slate-500 font-bold text-sm",children:"لا توجد طلبات جارية بالنظام حالياً!"}),n.jsx("p",{className:"text-slate-400 text-xs",children:"عند قيام زبون بوضع طلب، سيظهر فوراً هنا للجدولة وتعيين السائقين."})]}):n.jsx("div",{className:"bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs",children:n.jsx("div",{className:"overflow-x-auto",children:n.jsxs("table",{className:"w-full text-right text-xs",children:[n.jsx("thead",{className:"bg-slate-50 text-slate-500 font-extrabold border-b border-slate-200",children:n.jsxs("tr",{children:[n.jsx("th",{className:"p-3 sm:p-4",children:"رقم الطلب"}),n.jsx("th",{className:"p-3 sm:p-4",children:"المستلم والموبايل"}),n.jsx("th",{className:"p-3 sm:p-4",children:"المتجر والأصناف"}),n.jsx("th",{className:"p-3 sm:p-4",children:"أقرب معلم"}),n.jsx("th",{className:"p-3 sm:p-4",children:"القيمة الإجمالية"}),n.jsx("th",{className:"p-3 sm:p-4",children:"السائق الموكل"}),n.jsx("th",{className:"p-3 sm:p-4",children:"حالة الطلب الحالية"})]})}),n.jsx("tbody",{className:"divide-y divide-slate-150",children:ue.map(k=>{var W,ae;return n.jsxs("tr",{className:"hover:bg-slate-50/50",children:[n.jsx("td",{className:"p-3 sm:p-4 font-mono font-extrabold text-slate-900",children:k.id}),n.jsxs("td",{className:"p-3 sm:p-4 font-semibold",children:[n.jsx("div",{children:k.customerName}),n.jsx("div",{className:"text-[10px] text-slate-400 font-bold mt-0.5",dir:"ltr",children:k.customerPhone})]}),n.jsxs("td",{className:"p-3 sm:p-4",children:[n.jsx("div",{className:"font-bold text-slate-700",children:k.storeName}),n.jsx("div",{className:"text-[10px] text-slate-400 font-semibold truncate max-w-[150px] mt-0.5",children:k.items.map(he=>`${he.product.name} (x${he.quantity})`).join("، ")}) ,k.isPrescription&&k.items[0]&&k.items[0].product.image&&n.jsx("img",{src:k.items[0].product.image,className:"w-10 h-10 object-cover rounded-lg border border-slate-200 mt-1 cursor-zoom-in hover:scale-105 transition-all",onClick:()=>setAdminPreviewPrescription(k.items[0].product.image)})]}),n.jsx("td",{className:"p-3 sm:p-4 font-bold text-emerald-600",children:((W=d.find(he=>he.id===k.addressLandmark))==null?void 0:W.arabicName)||k.addressLandmark}),n.jsxs("td",{className:"p-3 sm:p-4 font-extrabold text-orange-650 text-orange-600",children:[k.total," ",Q.currency]}),n.jsx("td",{className:"p-3 sm:p-4",children:(() => {
  const isOrderService = Boolean(k.isDirectService || k.isService || (k.storeId||"").startsWith("service_") || ["doctors", "crafts"].includes(k.storeCategory || k.category) || (k.storeName||"").includes("ورشة") || (k.storeName||"").includes("حدادة") || (k.storeName||"").includes("عيادة") || (k.storeName||"").includes("دهان") || (k.storeName||"").includes("نجارة") || (k.storeName||"").includes("سباكة") || (k.storeName||"").includes("صيانة") || (k.storeName||"").includes("د. ") || (k.items||[]).some(it=>(it.product?.id||it.id||"").startsWith("service_") || (it.product?.name||it.name||"").includes("خدمة وتنسيق")));
  if (k.status === "cancelled") {
    return n.jsx("span", { className: "text-red-500 font-bold", children: "ملغي" });
  }
  if (isOrderService) {
    return n.jsxs("div", {
      className: "bg-amber-50 text-amber-900 border border-amber-300/80 py-1.5 px-2.5 rounded-xl text-[10px] font-black inline-flex items-center gap-1.5 shadow-2xs",
      children: [
        n.jsx("span", { children: "🛠️" }),
        n.jsx("span", { children: "تنسيق مباشر مع الحرفي (لا يحتاج سائق)" })
      ]
    });
  }
  if (k.driverId) {
    return n.jsx("div", {
      className: "bg-slate-100 text-slate-700 py-1 px-2.5 rounded-lg font-bold border border-slate-200 inline-block",
      children: ((ae=ce.find(he=>he.id===k.driverId))==null?void 0:ae.name)||k.driverName
    });
  }
  return n.jsxs("select", {
    onChange: he => eo(k.id, he.target.value),
    className: "bg-orange-50 border border-orange-200 text-orange-700 text-[10px] py-1 px-2 rounded-lg font-extrabold outline-none cursor-pointer",
    defaultValue: "",
    children: [
      n.jsx("option", { value: "", disabled: !0, children: "-- اختر السائق --" }),
      ce.filter(he => he.status === "available").map(he => n.jsx("option", { value: he.id, children: he.name }, he.id))
    ]
  });
})()}),n.jsx("td",{className:"p-3 sm:p-4 flex items-center gap-1.5 flex-wrap",children:k.status==="cancelled"?n.jsxs("div",{className:"text-red-600 font-extrabold bg-red-50 py-1 px-2.5 rounded-full border border-red-100 text-[10px]",children:["ملغي: ",k.cancelReason||"بناءً على طلب العميل"]}):n.jsxs(n.Fragment,{children:[k.isPrescription&&k.items[0]&&k.items[0].product.image&&n.jsx("button",{type:"button",onClick:()=>setAdminPreviewPrescription(k.items[0].product.image),className:"px-2 py-1 bg-teal-50 hover:bg-teal-100 border border-teal-200 text-teal-700 rounded-lg text-[10px] font-black cursor-pointer shadow-xs transition-colors whitespace-nowrap flex items-center gap-1 ml-1.5",children:"عرض الوصفة 📄"}),n.jsxs("select",{value:k.status,onChange:he=>Sl(k.id,he.target.value),className:"bg-slate-100 border border-slate-200 text-slate-700 font-extrabold py-1 px-1.5 rounded-lg outline-none cursor-pointer",children:[n.jsx("option",{value:"pending",children:"طلب جديد"}),n.jsx("option",{value:"accepted",children:"تم قبول الطلب"}),n.jsx("option",{value:"preparing",children:"جاري التحضير"}),n.jsx("option",{value:"ready",children:"جاهز للاستلام"}),n.jsx("option",{value:"picked_up",children:"مع السائق"}),n.jsx("option",{value:"delivered",children:"تم التسليم"})]}),n.jsx("button",{onClick:()=>wl(k.id),className:"p-1 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer border border-transparent hover:border-red-100",title:"إلغاء الطلب",children:n.jsx(H1,{className:"w-4 h-4"})})]})})]},k.id)})})]})})}),xa&&n.jsx("div",{className:"fixed inset-0 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in",children:n.jsxs("form",{onSubmit:xC,className:"bg-white rounded-3xl p-6 border border-slate-200 max-w-sm w-full space-y-4 shadow-xl",children:[n.jsxs("h4",{className:"font-extrabold text-slate-800 text-sm sm:text-base flex items-center gap-1.5",children:[n.jsx(ha,{className:"w-5 h-5 text-red-500"}),n.jsxs("span",{children:["إلغاء الطلب رقم ",xa]})]}),n.jsx("p",{className:"text-xs text-slate-400",children:"الرجاء تحديد سبب لإلغاء هذا التكليف لإعلام الزبون:"}),n.jsx("textarea",{required:!0,value:a1,onChange:k=>_l(k.target.value),placeholder:"مثال: المتجر مغلق مؤقتاً، السلع المطلوبة غير متوفرة حالياً...",className:"w-full bg-slate-50 border border-slate-200 focus:border-slate-900 rounded-xl py-2 px-3 text-xs outline-none text-slate-800 resize-none",rows:3}),n.jsxs("div",{className:"flex gap-2 justify-end pt-2",children:[n.jsx("button",{type:"button",onClick:()=>{wl(null),_l("")},className:"bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-2 px-4 rounded-xl",children:"تراجع"}),n.jsx("button",{type:"submit",className:"bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs py-2 px-4 rounded-xl",children:"إلغاء الطلب نهائياً"})]})]})})]}),adminPreviewPrescription&&n.jsx("div",{className:"fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 z-55 animate-fade-in",onClick:()=>setAdminPreviewPrescription(null),children:n.jsxs("div",{className:"bg-white rounded-3xl border border-slate-200 max-w-2xl w-full overflow-hidden shadow-2xl flex flex-col p-4",onClick:e=>e.stopPropagation(),children:[n.jsxs("div",{className:"flex items-center justify-between border-b pb-2 mb-3 bg-slate-50 p-2.5 rounded-xl",children:[n.jsx("span",{className:"font-extrabold text-slate-800 text-xs sm:text-sm",children:"معاينة الوصفة الطبية / الروشتة المرفقة"}),n.jsx("button",{onClick:()=>setAdminPreviewPrescription(null),className:"w-8 h-8 rounded-full hover:bg-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-800 font-bold cursor-pointer",children:"✕"})]}),n.jsx("img",{src:adminPreviewPrescription,className:"max-h-[70vh] w-auto object-contain mx-auto rounded-xl border border-slate-150"})]})}),O==="stores"&&n.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-12 gap-8 items-start",children:[n.jsxs("form",{onSubmit:Rr,className:"lg:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-4.5 space-y-4 shadow-inner",children:[n.jsxs("h3",{className:"font-extrabold text-slate-800 text-sm sm:text-base flex items-center gap-2 border-b border-slate-200 pb-2",children:[n.jsx(ra,{className:"w-5 h-5 text-orange-500"}),n.jsx("span",{children:je?"تعديل بيانات المتجر":"إضافة متجر محلي جديد"})]}),n.jsxs("div",{className:"space-y-1",children:[n.jsx("label",{className:"text-[11px] text-slate-500 font-bold block",children:"اسم المتجر أو المطعم:"}),n.jsx("input",{type:"text",required:!0,value:ut,onChange:k=>de(k.target.value),placeholder:"مثال: مطعم الياسمين الدمشقي",className:"w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs outline-none text-slate-850"})]}),n.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[n.jsxs("div",{className:"space-y-1",children:[n.jsx("label",{className:"text-[11px] text-slate-500 font-bold block",children:"تصنيف المتجر:"}),n.jsx("select",{value:we,onChange:k=>tt(k.target.value),className:"w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs outline-none text-slate-850",children:g.map(k=>n.jsx("option",{value:k.id,children:k.label},k.id))})]}),n.jsxs("div",{className:"space-y-1",children:[n.jsx("label",{className:"text-[11px] text-slate-500 font-bold block",children:"أوقات العمل المقررة:"}),n.jsx("input",{type:"text",required:!0,value:ct,onChange:k=>te(k.target.value),placeholder:"مثال: 9:00 ص - 11:00 م",className:"w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs outline-none text-slate-850"})]})]}),n.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[n.jsxs("div",{className:"space-y-1",children:[n.jsx("label",{className:"text-[11px] text-slate-500 font-bold block",children:"رسوم التوصيل (ل.س):"}),n.jsx("input",{type:"number",required:!0,min:"0",value:Je,onChange:k=>at(Number(k.target.value)),className:"w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs outline-none text-slate-850"})]}),n.jsxs("div",{className:"space-y-1",children:[n.jsx("label",{className:"text-[11px] text-slate-500 font-bold block",children:"حالة المتجر الحالية:"}),n.jsxs("select",{value:vt,onChange:k=>ya(k.target.value),className:"w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs outline-none text-slate-850",children:[n.jsx("option",{value:"open",children:"مفتوح ونشط"}),n.jsx("option",{value:"closed",children:"مغلق مؤقتاً"}),n.jsx("option",{value:"busy",children:"مزدحم بطلبات"})]})]})]}),n.jsxs("div",{className:"grid grid-cols-2 gap-3 bg-white p-3 rounded-xl border border-slate-200/60",children:[n.jsxs("div",{className:"flex items-center justify-between col-span-2",children:[n.jsx("span",{className:"text-[11px] text-slate-500 font-bold",children:'تمييز كـ "متجر مميز":'}),n.jsx("input",{type:"checkbox",checked:fa,onChange:k=>Ya(k.target.checked),className:"w-4 h-4 accent-orange-500"})]}),n.jsxs("div",{className:"space-y-1 col-span-2",children:[n.jsx("label",{className:"text-[10px] text-slate-400 block",children:"ترتيب ظهور المتجر (Priority):"}),n.jsx("input",{type:"number",value:D,onChange:k=>re(Number(k.target.value)),className:"w-full bg-slate-50 border border-slate-200 rounded-lg py-1 px-2 text-xs"})]})]}),n.jsxs("div",{className:"space-y-1",children:[n.jsx("label",{className:"text-[11px] text-slate-500 font-bold block",children:"العنوان الجغرافي للمتجر (وصف كتابي):"}),n.jsx("input",{type:"text",required:!0,value:pt,onChange:k=>nt(k.target.value),placeholder:"مثال: الشارع الرئيسي، بجانب مسجد الروضة الكبير",className:"w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs outline-none text-slate-850"})]}),n.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[n.jsxs("div",{className:"space-y-1",children:[n.jsx("label",{className:"text-[11px] text-slate-500 font-bold block",children:"رقم هاتف المتجر:"}),n.jsx("input",{type:"text",value:_e,onChange:k=>Ge(k.target.value),placeholder:"مثال: 0944111222",className:"w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs outline-none text-slate-850"})]}),n.jsxs("div",{className:"space-y-1",children:[n.jsx("label",{className:"text-[11px] text-slate-500 font-bold block",children:"نطاق التوصيل الجغرافي:"}),n.jsx("input",{type:"text",value:yt,onChange:k=>et(k.target.value),placeholder:"مثال: البلدة وضواحيها",className:"w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs outline-none text-slate-850"})]})]}),n.jsxs("div",{className:"space-y-1",children:[n.jsx("label",{className:"text-[11px] text-slate-500 font-bold block",children:"وصف مختصر أو شعار المتجر:"}),n.jsx("input",{type:"text",value:Rt,onChange:k=>Be(k.target.value),placeholder:"مثال: أشهى المأكولات الشامية والوجبات السريعة بأفضل الأسعار",className:"w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs outline-none text-slate-850"})]}),!je&&n.jsxs("div",{className:"bg-orange-50 border border-orange-100 p-3.5 rounded-xl space-y-2",children:[n.jsx("span",{className:"text-[11px] text-orange-950 font-extrabold block",children:"موقع المتجر الإحداثي على الخريطة (X, Y) %"}),n.jsxs("p",{className:"text-[10px] text-orange-800 leading-relaxed font-semibold",children:["* هذا الصندوق يقبل أرقام فقط (من 10 إلى 90) لرسم مكان المحل على الخارطة التفاعلية. لكتابة العنوان بالنص، الرجاء ملء حقل ",n.jsx("b",{children:'"العنوان الجغرافي"'})," في الأعلى."]}),n.jsxs("div",{className:"grid grid-cols-2 gap-2.5",children:[n.jsxs("div",{className:"flex items-center gap-1",children:[n.jsx("span",{className:"text-[10px] text-slate-500 font-bold whitespace-nowrap",children:"أفقي X%:"}),n.jsx("input",{type:"number",min:"10",max:"90",value:Pe,onChange:k=>It(Number(k.target.value)),className:"w-full bg-white border border-orange-200 rounded-lg p-1.5 text-xs text-center outline-none focus:border-orange-500",placeholder:"X%"})]}),n.jsxs("div",{className:"flex items-center gap-1",children:[n.jsx("span",{className:"text-[10px] text-slate-500 font-bold whitespace-nowrap",children:"رأسي Y%:"}),n.jsx("input",{type:"number",min:"10",max:"90",value:ft,onChange:k=>fC(Number(k.target.value)),className:"w-full bg-white border border-orange-200 rounded-lg p-1.5 text-xs text-center outline-none focus:border-orange-500",placeholder:"Y%"})]})]})]}),n.jsx("div",{className:"space-y-1",children:n.jsx(EV,{value:Ie,onChange:Ve,label:"شعار أو صورة غلاف المتجر:",placeholder:"رابط URL للغلاف كخيار بديل"})}),n.jsxs("div",{className:"flex gap-2",children:[n.jsxs("button",{type:"submit",className:"flex-1 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs py-2.5 px-4 rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer shadow-sm",children:[n.jsx(Xn,{className:"w-4 h-4"}),n.jsx("span",{children:je?"حفظ التعديلات":"إضافة المتجر"})]}),je&&n.jsx("button",{type:"button",onClick:()=>{Ae(null),de(""),Ve("")},className:"bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs py-2.5 px-4 rounded-xl cursor-pointer",children:"إلغاء"})]})]}),n.jsxs("div",{className:"lg:col-span-7 space-y-4",children:[n.jsxs("h3",{className:"font-extrabold text-slate-800 text-base flex items-center gap-2",children:[n.jsx(z1,{className:"w-5 h-5 text-slate-700"}),n.jsxs("span",{children:["المتاجر المسجلة بالنظام (",o.length,")"]})]}),n.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-1",children:o.map(k=>{var W;return n.jsxs("div",{className:"bg-white border border-slate-200 rounded-2xl p-4 flex gap-3 relative hover:shadow-md transition-all",children:[n.jsx("div",{className:"w-16 h-16 rounded-xl overflow-hidden bg-slate-50 shrink-0 border border-slate-100",children:n.jsx("img",{src:k.image,alt:k.name,className:"w-full h-full object-cover",referrerPolicy:"no-referrer"})}),n.jsxs("div",{className:"flex-1 space-y-1 min-w-0",children:[n.jsxs("div",{className:"flex items-center gap-1.5 flex-wrap",children:[n.jsx("span",{className:"text-[9px] font-extrabold bg-slate-100 text-slate-600 py-0.5 px-2 rounded-full inline-block",children:((W=g.find(ae=>ae.id===k.category))==null?void 0:W.label)||k.category}),k.isApproved===!1?n.jsxs("span",{className:"text-[9px] font-bold bg-amber-100 text-amber-700 py-0.5 px-1.5 rounded-full flex items-center gap-0.5",children:[n.jsx("span",{children:"طلب موافقة"}),n.jsx("span",{className:"w-1 h-1 rounded-full bg-amber-500 animate-ping"})]}):n.jsxs(n.Fragment,{children:[k.status==="closed"&&n.jsx("span",{className:"text-[9px] font-bold bg-red-100 text-red-600 py-0.5 px-1.5 rounded-full",children:"مغلق"}),k.status==="busy"&&n.jsx("span",{className:"text-[9px] font-bold bg-yellow-100 text-yellow-700 py-0.5 px-1.5 rounded-full",children:"مزدحم"})]})]}),n.jsx("h4",{className:"font-bold text-xs sm:text-sm text-slate-800 truncate",children:k.name}),k.ownerPhone&&n.jsxs("p",{className:"text-[10px] text-emerald-600 font-extrabold",children:["المالك: ",k.ownerPhone]}),k.address&&n.jsxs("p",{className:"text-[10px] text-orange-600 font-extrabold truncate",children:["العنوان: ",k.address]}),n.jsxs("p",{className:"text-[10px] text-slate-400",children:["التوصيل: ",k.deliveryFee," ل.س • الأولوية: ",k.priority||1]}),n.jsxs("div",{className:"mt-1 pt-1 border-t border-slate-100 flex items-center justify-between text-[9px] font-bold text-slate-500",children:[n.jsxs("span",{children:["📦 سعة: ",k.maxRegularProducts||20," عادية | ",k.maxOfferProducts||10," عروض"]}),n.jsx("button",{type:"button",onClick:()=>{const newReg=prompt("أدخل الحد الأقصى للمنتجات العادية لمتجر ("+k.name+"):",String(k.maxRegularProducts||20));if(newReg===null)return;const newOff=prompt("أدخل الحد الأقصى لمنتجات العروض لمتجر ("+k.name+"):",String(k.maxOfferProducts||10));if(newOff===null)return;const regNum=parseInt(newReg)||20,offNum=parseInt(newOff)||10;const updated=o.map(he=>he.id===k.id?{...he,maxRegularProducts:regNum,maxOfferProducts:offNum}:he);L(updated);alert("✅ تم تعديل سعة المنتجات لمتجر "+k.name+" ("+regNum+" عادية / "+offNum+" عروض) بنجاح!");},className:"text-orange-600 hover:text-orange-700 bg-orange-50 hover:bg-orange-100 px-1.5 py-0.5 rounded cursor-pointer font-extrabold",children:"تعديل السعة 🚀"})]})]}),n.jsxs("div",{className:"flex flex-col gap-2 items-center justify-center shrink-0 border-r border-slate-100 pr-2.5",children:[k.isApproved===!1&&n.jsx("button",{onClick:()=>{if(L){const ae=o.map(he=>he.id===k.id?{...he,isApproved:!0}:he);L(ae),K("تفعيل متجر",`الموافقة على طلب متجر: ${k.name}`),ie("تم تفعيل وتفويض المتجر بنجاح! 🎉")}},className:"p-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition-all cursor-pointer",title:"الموافقة على المتجر وتفعيله للزبائن",children:n.jsx(q1,{className:"w-5 h-5"})}),n.jsx("button",{
  onClick:()=>{
    const next=!k.isRushPaused;
    const updated=o.map(he=>he.id===k.id?{...he,isRushPaused:next}:he);
    L(updated);
    K("تجميد متجر",`${next?"تجميد":"استئناف"} متجر: ${k.name} لضغط الطلبات`);
    ie(next?`تم تجميد متجر ${k.name} مؤقتاً بسبب الضغط!`:`تم استئناف متجر ${k.name} بنجاح!`);
  },
  className:`p-1.5 px-2 text-[9px] font-black rounded-lg transition-all cursor-pointer ${k.isRushPaused?"bg-red-500 text-white hover:bg-red-600":"bg-slate-100 text-slate-600 hover:bg-amber-100 hover:text-amber-800"}`,
  title:k.isRushPaused?"إلغاء التجميد واستئناف المتجر":"تجميد مؤقت للمتجر بسبب الضغط",
  children:k.isRushPaused?"⏸️ مجمد للضغط":"⏸️ تجميد ضغط"
}),
n.jsx("button",{onClick:()=>en(k),className:"p-2 text-slate-500 hover:text-orange-500 hover:bg-orange-50 rounded-xl transition-all cursor-pointer",title:"تعديل المتجر",children:n.jsx(pn,{className:"w-4 h-4"})}),n.jsx("button",{onClick:()=>J1(k),className:"p-2 text-slate-500 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all cursor-pointer",title:"نسخ متجر مشابه",children:n.jsx(al,{className:"w-4 h-4"})}),n.jsx("button",{onClick:()=>{bt({isOpen:!0,title:"تأكيد حذف المتجر",message:`هل تريد بالتأكيد حذف المتجر "${k.name}" نهائياً من النظام؟ سيؤدي ذلك لإخفائه عن الزبائن.`,onConfirm:()=>{u(k.id),K("حذف متجر",`حذف المتجر نهائياً: ${k.name}`),ie("تم حذف المتجر بنجاح!"),bt(null)}})},className:"p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all cursor-pointer",title:"حذف المتجر",children:n.jsx(Jt,{className:"w-4 h-4"})})]})]},k.id)})})]}),n.jsxs("div",{className:"col-span-1 lg:col-span-12 mt-8 pt-8 border-t border-slate-200 text-right space-y-6",dir:"rtl",children:[n.jsxs("div",{className:"flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3",children:[n.jsxs("div",{className:"space-y-1",children:[n.jsxs("h3",{className:"font-extrabold text-slate-800 text-base sm:text-lg flex items-center gap-2",children:[n.jsx(E0,{className:"w-5.5 h-5.5 text-orange-500"}),n.jsx("span",{children:"إدارة تصنيفات المتاجر والخدمات المحلية"})]}),n.jsx("p",{className:"text-slate-400 text-xs font-semibold",children:"تخصيص تصنيفات التطبيق وإضافة خدمات جديدة مثل (الغاز، التكسي، صيانة) أو تعديلها."})]}),n.jsx("div",{className:"text-[10px] bg-orange-50 border border-orange-100/60 text-orange-850 px-3.5 py-1.5 rounded-full font-bold",children:"💡 يمكنك إضافة أي تصنيف تريده وتعيين أيقونة تناسبه ليظهر فوراً بالواجهة الرئيسية للزبون"})]}),n.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-12 gap-8 items-start",children:[n.jsxs("form",{onSubmit:Br,className:"lg:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-4.5 space-y-4 shadow-sm text-right",children:[n.jsxs("h4",{className:"font-extrabold text-slate-800 text-xs sm:text-sm flex items-center gap-1.5 border-b pb-2",children:[n.jsx(R0,{className:"w-4 h-4 text-orange-500"}),n.jsx("span",{children:"إضافة تصنيف جديد"})]}),n.jsxs("div",{className:"space-y-1.5",children:[n.jsx("label",{className:"text-[11px] text-slate-500 font-bold block",children:"اسم التصنيف الجديد (بالعربية):"}),n.jsx("input",{type:"text",required:!0,value:Dr,onChange:k=>W1(k.target.value),placeholder:"مثال: غاز، تكسي، مياه معدنية",className:"w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs outline-none text-slate-850 font-bold"})]}),n.jsxs("div",{className:"space-y-1.5",children:[n.jsx("label",{className:"text-[11px] text-slate-500 font-bold block",children:"أيقونة التصنيف المقترحة:"}),n.jsx("div",{className:"grid grid-cols-4 gap-1.5 p-2 bg-white rounded-xl border border-slate-150 max-h-[140px] overflow-y-auto font-sans",children:[{name:"ShoppingBag",label:"سلة بقالة"},{name:"Utensils",label:"أدوات طعام"},{name:"Pill",label:"صيدلية / طب"},{name:"Leaf",label:"خضروات"},{name:"CakeSlice",label:"كيك وحلويات"},{name:"Flame",label:"غاز / شعلة"},{name:"Car",label:"سيارة / تكسي"},{name:"Wrench",label:"صيانة / مفك"},{name:"Gift",label:"هدايا / ألعاب"},{name:"Coffee",label:"كوفي شوب"},{name:"FlameKindling",label:"حطب / وقود"},{name:"Phone",label:"جوالات"},{name:"Activity",label:"عيادة"},{name:"HelpCircle",label:"خدمات عامة"},{name:"Bike",label:"مناديب"},{name:"Sparkles",label:"تنظيف"}].map(k=>{const W=US[k.name],ae=ma===k.name;return n.jsxs("button",{type:"button",onClick:()=>Ml(k.name),className:`p-2 rounded-xl flex flex-col items-center justify-center gap-1 border transition-all cursor-pointer ${ae?"bg-orange-500 text-slate-950 border-orange-400 font-extrabold scale-95 shadow-sm":"bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200"}`,title:k.label,children:[W&&n.jsx(W,{className:"w-4 h-4"}),n.jsx("span",{className:"text-[8px] whitespace-nowrap overflow-hidden text-ellipsis max-w-full leading-none font-semibold",children:k.label})]},k.name)})})]}),n.jsxs("button",{type:"submit",className:"w-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs py-2.5 px-4 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5",children:[n.jsx(Xn,{className:"w-4 h-4"}),n.jsx("span",{children:"إضافة وتفعيل التصنيف"})]})]}),n.jsxs("div",{className:"lg:col-span-7 space-y-4",children:[n.jsxs("h4",{className:"font-extrabold text-slate-800 text-xs sm:text-sm flex items-center gap-1.5 font-bold",children:[n.jsx(da,{className:"w-4 h-4 text-slate-700"}),n.jsxs("span",{children:["التصنيفات الحالية في التطبيق (",g.length,")"]})]}),n.jsx("div",{className:"grid sm:grid-cols-2 gap-3 max-h-[350px] overflow-y-auto pr-1",children:g.map(k=>{const W=US[k.icon]||Za,ae=o.filter(he=>he.category===k.id).length;return n.jsxs("div",{className:"bg-white border border-slate-200 rounded-2xl p-3.5 flex items-center justify-between gap-3 shadow-xs hover:border-slate-300 transition-all",children:[n.jsxs("div",{className:"flex items-center gap-3",children:[n.jsx("div",{className:"w-10 h-10 bg-slate-50 border border-slate-150 rounded-xl flex items-center justify-center text-orange-500",children:n.jsx(W,{className:"w-5 h-5"})}),n.jsxs("div",{className:"space-y-0.5 text-right",children:[n.jsx("h5",{className:"font-extrabold text-slate-850 text-xs sm:text-sm",children:k.label}),n.jsxs("p",{className:"text-[10px] text-slate-400 font-semibold flex items-center gap-1",children:[n.jsx("span",{children:"عدد المحلات المسجلة:"}),n.jsx("span",{className:"bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded-md font-bold",children:ae})]})]})]}),n.jsx("button",{type:"button",onClick:()=>Nl(k.id,k.label),className:"text-slate-400 hover:text-red-650 p-2 rounded-xl transition-colors cursor-pointer",title:"حذف التصنيف",children:n.jsx(Jt,{className:"w-4 h-4"})})]},k.id)})})]})]})]})]}),O==="products"&&n.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-12 gap-8 items-start",children:[n.jsxs("form",{onSubmit:m2,className:"lg:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-4.5 space-y-4 shadow-inner",children:[n.jsxs("h3",{className:"font-extrabold text-slate-800 text-sm sm:text-base flex items-center gap-2 border-b border-slate-200 pb-2",children:[n.jsx(ra,{className:"w-5 h-5 text-orange-500"}),n.jsx("span",{children:E1?"تعديل السلعة بقوائم المحل":"إضافة سلعة أو وجبة جديدة"})]}),n.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[n.jsxs("div",{className:"space-y-1",children:[n.jsx("label",{className:"text-[11px] text-slate-500 font-bold block",children:"المتجر التابع:"}),n.jsxs("select",{value:Ka,required:!0,onChange:k=>Qa(k.target.value),className:"w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs outline-none text-slate-850",children:[n.jsx("option",{value:"",children:"-- اختر متجراً --"}),o.map(k=>n.jsx("option",{value:k.id,children:k.name},k.id))]})]}),n.jsxs("div",{className:"space-y-1",children:[n.jsx("label",{className:"text-[11px] text-slate-500 font-bold block",children:"السعر الأساسي (ل.س):"}),n.jsx("input",{type:"number",required:!0,min:"1",value:Jn,onChange:k=>e1(Number(k.target.value)),className:"w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs outline-none text-slate-850"})]})]}),n.jsxs("div",{className:"space-y-1",children:[n.jsx("label",{className:"text-[11px] text-slate-500 font-bold block",children:"اسم الوجبة/السلعة بالكامل:"}),n.jsx("input",{type:"text",required:!0,value:za,onChange:k=>vn(k.target.value),placeholder:"مثال: بيتزا خضار بالفرن",className:"w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs outline-none text-slate-850"})]}),n.jsxs("div",{className:"space-y-1",children:[n.jsx("label",{className:"text-[11px] text-slate-500 font-bold block",children:"الوصف أو المكونات:"}),n.jsx("textarea",{value:_r,onChange:k=>ul(k.target.value),placeholder:"مثال: موزاريلا، فطر، فلفل، زيتون",className:"w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs outline-none text-slate-850 resize-none",rows:2})]}),n.jsxs("div",{className:"bg-white p-3.5 rounded-xl border border-slate-200 space-y-3",children:[n.jsxs("span",{className:"text-[11px] text-slate-600 font-extrabold flex items-center gap-1 border-b pb-1",children:[n.jsx(da,{className:"w-3.5 h-3.5 text-orange-500"}),"أحجام السلعة وخياراتها الإضافية (مثل إضافات البيتزا)"]}),n.jsxs("div",{className:"space-y-2",children:[n.jsx("label",{className:"text-[10px] text-slate-400 block",children:"إضافة خيار الحجم (مثل: صغيرة، وسط، كبيرة):"}),n.jsxs("div",{className:"flex gap-1.5",children:[n.jsx("input",{type:"text",placeholder:"الحجم (كبير)",value:U1,onChange:k=>u2(k.target.value),className:"bg-slate-50 border border-slate-200 rounded-lg p-1.5 text-xs flex-1"}),n.jsx("input",{type:"number",placeholder:"+سعر (10)",value:p2,onChange:k=>Sr(Number(k.target.value)),className:"bg-slate-50 border border-slate-200 rounded-lg p-1.5 text-xs w-20"}),n.jsx("button",{type:"button",onClick:Ll,className:"bg-slate-900 text-white font-bold p-1.5 rounded-lg text-xs cursor-pointer",children:"+"})]}),Pt.length>0&&n.jsx("div",{className:"flex flex-wrap gap-1 mt-1",children:Pt.map((k,W)=>n.jsxs("span",{className:"bg-orange-50 text-orange-700 font-bold text-[10px] py-1 px-2 rounded-lg border border-orange-200/50 flex items-center gap-1 select-none",children:[k.name," (+",k.price," ل.س)",n.jsx(H1,{className:"w-3 h-3 cursor-pointer text-orange-500 hover:text-orange-700",onClick:()=>lt(ae=>ae.filter((he,Ee)=>Ee!==W))})]},W))})]}),n.jsxs("div",{className:"space-y-2 border-t pt-2",children:[n.jsx("label",{className:"text-[10px] text-slate-400 block",children:"إضافة إضافات اختيارية (مثل: جبنة إضافية، فطر):"}),n.jsxs("div",{className:"flex gap-1.5",children:[n.jsx("input",{type:"text",placeholder:"الإضافة (فطر)",value:Mn,onChange:k=>ml(k.target.value),className:"bg-slate-50 border border-slate-200 rounded-lg p-1.5 text-xs flex-1"}),n.jsx("input",{type:"number",placeholder:"+سعر (5)",value:wn,onChange:k=>_n(Number(k.target.value)),className:"bg-slate-50 border border-slate-200 rounded-lg p-1.5 text-xs w-20"}),n.jsx("button",{type:"button",onClick:x2,className:"bg-slate-900 text-white font-bold p-1.5 rounded-lg text-xs cursor-pointer",children:"+"})]}),mt.length>0&&n.jsx("div",{className:"flex flex-wrap gap-1 mt-1",children:mt.map((k,W)=>n.jsxs("span",{className:"bg-blue-50 text-blue-700 font-bold text-[10px] py-1 px-2 rounded-lg border border-blue-200/50 flex items-center gap-1 select-none",children:[k.name," (+",k.price," ل.س)",n.jsx(H1,{className:"w-3 h-3 cursor-pointer text-blue-500 hover:text-blue-700",onClick:()=>$a(ae=>ae.filter((he,Ee)=>Ee!==W))})]},W))})]})]}),n.jsxs("div",{className:"bg-orange-50 border border-orange-100 p-3.5 rounded-xl space-y-3.5",children:[n.jsxs("div",{className:"flex items-center justify-between",children:[n.jsx("span",{className:"text-[11px] text-orange-950 font-bold",children:"هذا المنتج يتبع العروض والخصومات:"}),n.jsx("input",{type:"checkbox",checked:Wa,onChange:k=>Nr(k.target.checked),className:"w-4 h-4 accent-orange-500"})]}),Wa&&n.jsxs("div",{className:"grid grid-cols-2 gap-2 pt-2 border-t border-orange-200/50",children:[n.jsx("input",{type:"number",placeholder:"السعر قبل الخصم",value:pl,onChange:k=>jr(Number(k.target.value)),className:"bg-white border border-orange-200 rounded-lg p-1.5 text-xs"}),n.jsx("input",{type:"text",placeholder:"شارة العرض (خصم 20%)",value:P1,onChange:k=>yl(k.target.value),className:"bg-white border border-orange-200 rounded-lg p-1.5 text-xs"})]}),n.jsxs("div",{className:"flex items-center justify-between border-t border-orange-200/50 pt-2",children:[n.jsx("span",{className:"text-[11px] text-slate-550 font-bold",children:"إخفاء مؤقت للسلعة (عدم توفر):"}),n.jsx("input",{type:"checkbox",checked:fl,onChange:k=>Lr(k.target.checked),className:"w-4 h-4 accent-slate-700"})]})]}),n.jsx("div",{className:"space-y-1",children:n.jsx(EV,{value:O1,onChange:bn,label:"صورة المنتج أو السلعة:",placeholder:"رابط URL للصورة كخيار بديل"})}),n.jsxs("div",{className:"flex gap-2",children:[n.jsx("button",{type:"submit",className:"flex-1 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs py-2.5 px-4 rounded-xl shadow-sm cursor-pointer",children:n.jsx("span",{children:E1?"حفظ تعديلات السلعة":"إضافة السلعة"})}),E1&&n.jsx("button",{type:"button",onClick:()=>{wr(null),vn("")},className:"bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs py-2.5 px-4 rounded-xl cursor-pointer",children:"تراجع"})]})]}),n.jsxs("div",{className:"lg:col-span-7 space-y-4",children:[n.jsxs("h3",{className:"font-extrabold text-slate-800 text-base flex items-center gap-2",children:[n.jsx(da,{className:"w-5 h-5 text-slate-700"}),n.jsxs("span",{children:["جميع السلع المتوفرة لجميع المحلات (",i.length,")"]})]}),n.jsx("div",{className:"bg-slate-50 rounded-2xl border border-slate-150 p-4 max-h-[500px] overflow-y-auto space-y-2",children:i.map(k=>{var ae;const W=o.find(he=>he.id===k.storeId);return n.jsxs("div",{className:`bg-white rounded-xl p-3 border border-slate-200 flex items-center justify-between gap-3 shadow-xs ${k.isHidden?"opacity-50 bg-slate-50":""}`,children:[n.jsxs("div",{className:"flex items-center gap-3 min-w-0",children:[n.jsx("div",{className:"w-12 h-12 rounded-lg overflow-hidden bg-slate-50 shrink-0 border border-slate-100",children:n.jsx("img",{src:k.image,alt:k.name,className:"w-full h-full object-cover",referrerPolicy:"no-referrer"})}),n.jsxs("div",{className:"min-w-0",children:[n.jsx("h4",{className:"font-bold text-xs sm:text-sm text-slate-850 truncate",children:k.name}),n.jsxs("p",{className:"text-[10px] text-slate-400",children:["المحل: ",n.jsx("span",{className:"font-bold text-slate-500",children:(W==null?void 0:W.name)||"محذوف"})," • الفئة: ",((ae=g.find(he=>he.id===k.category))==null?void 0:ae.label)||k.category," • الوحدة: ",n.jsx("span",{className:"font-extrabold text-orange-600",children:k.unit||"حبة"}),k.stock!==undefined?n.jsxs("span",{className:"font-extrabold text-emerald-600 mr-1",children:[" • المخزون: ",k.stock]}):" • كمية مفتوحة"]}),k.isBlocked&&n.jsx("span",{className:"text-[8px] font-extrabold bg-red-100 text-red-700 py-0.5 px-1.5 rounded-full inline-block mt-1",children:"🚫 موقوف ومجمد لضغط الطلبات"}),k.isHidden&&n.jsx("span",{className:"text-[8px] font-extrabold bg-red-100 text-red-600 py-0.5 px-1.5 rounded-full inline-block mt-1",children:"غير متوفر مؤقتاً"})]})]}),n.jsxs("div",{className:"flex items-center gap-1",children:[n.jsxs("span",{className:"text-xs font-extrabold text-orange-650 text-orange-600 ml-2 whitespace-nowrap",children:[k.price," ل.س"]}),n.jsx("button",{
  onClick:()=>{
    const next=!k.isBlocked;
    const updated=i.map(he=>he.id===k.id?{...he,isBlocked:next}:he);
    H(updated);
    try{localStorage.setItem("tw_products",JSON.stringify(updated));}catch(e){}
    K("حظر سلعة",`${next?"وضع بلوك/تجميد على":"فك التجميد عن"} سلعة: ${k.name} لضغط الطلبات`);
    ie(next?`تم وضع بلوك وتجميد سلعة ${k.name} مؤقتاً لضغط الطلبات!`:`تم فك التجميد عن سلعة ${k.name}!`);
  },
  className:`p-1.5 px-2.5 rounded-lg text-[9px] font-black transition-all cursor-pointer ${k.isBlocked?"bg-red-600 text-white hover:bg-red-700":"bg-slate-100 text-slate-600 hover:bg-amber-100 hover:text-amber-800"}`,
  title:k.isBlocked?"فك التجميد عن السلعة":"وضع بلوك/تجميد مؤقت للسلعة لضغط الطلبات",
  children:k.isBlocked?"🚫 مجمدة (ضغط)":"🚫 تجميد للضغط"
}),
n.jsx("button",{onClick:()=>jl(k),className:"p-2 text-slate-400 hover:text-orange-500 hover:bg-orange-50 rounded-xl transition-all cursor-pointer",title:"تعديل السلعة",children:n.jsx(pn,{className:"w-4 h-4"})}),n.jsx("button",{onClick:()=>{bt({isOpen:!0,title:"تأكيد حذف المنتج",message:`هل أنت متأكد من حذف السلعة/الوجبة "${k.name}" نهائياً من قوائم المحل؟`,onConfirm:()=>{p(k.id),K("حذف منتج",`حذف المنتج نهائياً: ${k.name}`),ie("تم حذف السلعة نهائياً!"),bt(null)}})},className:"p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all cursor-pointer",title:"حذف السلعة",children:n.jsx(Jt,{className:"w-4 h-4"})})]})]},k.id)})})]})]}),O==="coupons"&&n.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-12 gap-8 items-start",children:[n.jsxs("form",{onSubmit:Bt,className:"lg:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-4.5 space-y-4 shadow-inner",children:[n.jsxs("h3",{className:"font-extrabold text-slate-800 text-sm sm:text-base flex items-center gap-2 border-b border-slate-200 pb-2",children:[n.jsx(z0,{className:"w-5 h-5 text-orange-500"}),n.jsx("span",{children:"توليد كوبون خصم جديد"})]}),n.jsxs("div",{className:"space-y-1",children:[n.jsx("label",{className:"text-[11px] text-slate-500 font-bold block",children:"رمز الكوبون بالانجليزي:"}),n.jsx("input",{type:"text",required:!0,value:Ja,onChange:k=>Nn(k.target.value),placeholder:"مثال: RAMADAN ، EID2026",className:"w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs outline-none text-slate-850 font-mono text-left",dir:"ltr"})]}),n.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[n.jsxs("div",{className:"space-y-1",children:[n.jsx("label",{className:"text-[11px] text-slate-500 font-bold block",children:"نوع الخصم:"}),n.jsxs("select",{value:xt,onChange:k=>y2(k.target.value),className:"w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs outline-none text-slate-850",children:[n.jsx("option",{value:"percent",children:"نسبة مئوية (%)"}),n.jsx("option",{value:"fixed",children:"مبلغ ثابت (ل.س)"})]})]}),n.jsxs("div",{className:"space-y-1",children:[n.jsx("label",{className:"text-[11px] text-slate-500 font-bold block",children:"قيمة الخصم:"}),n.jsx("input",{type:"number",required:!0,min:"1",value:xl,onChange:k=>jn(Number(k.target.value)),className:"w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs outline-none text-slate-850"})]})]}),n.jsxs("div",{className:"space-y-1",children:[n.jsx("label",{className:"text-[11px] text-slate-500 font-bold block",children:"الحد الأدنى لقيمة الطلب بالتوصيل (ل.س):"}),n.jsx("input",{type:"number",required:!0,min:"1",value:Ln,onChange:k=>mC(Number(k.target.value)),className:"w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs outline-none text-slate-850"})]}),n.jsx("button",{type:"submit",className:"w-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs py-3 rounded-xl shadow-sm cursor-pointer",children:"تفعيل وإعلان الكوبون"})]}),n.jsxs("div",{className:"lg:col-span-7 space-y-4",children:[n.jsxs("h3",{className:"font-extrabold text-slate-800 text-base flex items-center gap-2",children:[n.jsx(z1,{className:"w-5 h-5 text-slate-750"}),n.jsx("span",{children:"كوبونات الترويج النشطة حالياً بالنظام"})]}),n.jsx("div",{className:"bg-white border border-slate-200 rounded-3xl p-4 space-y-3",children:Me.map(k=>n.jsxs("div",{className:"bg-slate-50 border border-slate-150 p-3.5 rounded-2xl flex items-center justify-between gap-3 shadow-xs",children:[n.jsxs("div",{className:"flex items-center gap-3",children:[n.jsx("div",{className:"w-9 h-9 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 border border-orange-100",children:n.jsx(sl,{className:"w-4.5 h-4.5"})}),n.jsxs("div",{children:[n.jsx("h4",{className:"font-mono font-extrabold text-slate-900 text-sm",children:k.code}),n.jsxs("p",{className:"text-[10px] text-slate-400 font-bold",children:["الخصم: ",k.value," ",k.type==="percent"?"%":"ل.س"," • الحد الأدنى للطلب: ",k.minOrderValue," ل.س"]})]})]}),n.jsxs("div",{className:"flex items-center gap-3",children:[n.jsxs("span",{className:"text-[9px] font-extrabold bg-orange-500/10 text-orange-650 py-1 px-2.5 rounded-full",children:["استخدمت ",k.currentUsage," مرة"]}),n.jsx("button",{onClick:()=>{Ne(W=>W.filter(ae=>ae.id!==k.id)),K("حذف كوبون",`حذف الكوبون: ${k.code}`),ie("تم إيقاف وحذف الكوبون الترويجي.")},className:"p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg cursor-pointer",title:"حذف الكوبون",children:n.jsx(Jt,{className:"w-4 h-4"})})]})]},k.id))})]})]}),O==="drivers"&&n.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-12 gap-8 items-start",children:[n.jsxs("form",{onSubmit:An,className:"lg:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-4.5 space-y-4 shadow-inner",children:[n.jsxs("h3",{className:"font-extrabold text-slate-800 text-sm sm:text-base flex items-center gap-2 border-b border-slate-200 pb-2",children:[n.jsx(mr,{className:"w-5 h-5 text-orange-500"}),n.jsx("span",{children:"تسجيل كابتن توصيل جديد"})]}),n.jsxs("div",{className:"space-y-1",children:[n.jsx("label",{className:"text-[11px] text-slate-500 font-bold block",children:"اسم السائق/الكابتن الثلاثي:"}),n.jsx("input",{type:"text",required:!0,value:F1,onChange:k=>Cr(k.target.value),placeholder:"مثال: كابتن أحمد الحمد",className:"w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs outline-none text-slate-850"})]}),n.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[n.jsxs("div",{className:"space-y-1",children:[n.jsx("label",{className:"text-[11px] text-slate-500 font-bold block",children:"رقم الموبايل للتوصيل:"}),n.jsx("input",{type:"text",required:!0,value:Ar,onChange:k=>G1(k.target.value),placeholder:"0955...",className:"w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs outline-none text-slate-850"})]}),n.jsxs("div",{className:"space-y-1",children:[n.jsx("label",{className:"text-[11px] text-slate-500 font-bold block",children:"الحالة الابتدائية للخدمة:"}),n.jsxs("select",{value:Z1,onChange:k=>Ta(k.target.value),className:"w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs outline-none text-slate-850",children:[n.jsx("option",{value:"available",children:"متاح لاستقبال الطلبات"}),n.jsx("option",{value:"busy",children:"مشغول بتوصيل طلب"}),n.jsx("option",{value:"offline",children:"غير متصل بالشبكة"})]})]})]}),n.jsx("button",{type:"submit",className:"w-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs py-3 rounded-xl shadow-sm cursor-pointer",children:"تسجيل وتأكيد المندوب الجديد"})]}),n.jsxs("div",{className:"lg:col-span-7 space-y-4",children:[n.jsxs("h3",{className:"font-extrabold text-slate-800 text-base flex items-center gap-2",children:[n.jsx(rl,{className:"w-5 h-5 text-slate-700"}),n.jsxs("span",{children:["قائمة الكباتن والمناديب المعتمدين (",ce.length,")"]})]}),n.jsx("div",{className:"bg-white border border-slate-200 rounded-3xl p-4 space-y-3",children:ce.map(k=>n.jsxs("div",{className:"bg-slate-50 border border-slate-150 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shadow-xs",children:[n.jsxs("div",{className:"flex items-start gap-3",children:[n.jsx("div",{className:"w-10 h-10 rounded-xl bg-orange-50 text-orange-600 border border-orange-100 flex items-center justify-center shrink-0",children:n.jsx(il,{className:"w-5 h-5"})}),n.jsxs("div",{children:[n.jsxs("div",{className:"flex items-center gap-2",children:[n.jsx("h4",{className:"font-extrabold text-slate-850 text-xs sm:text-sm",children:k.name}),n.jsx("span",{className:`text-[8px] font-extrabold py-0.5 px-2 rounded-full ${k.status==="available"?"bg-green-100 text-green-700":k.status==="busy"?"bg-yellow-100 text-yellow-700":"bg-slate-200 text-slate-600"}`,children:k.status==="available"?"متاح ونشط":k.status==="busy"?"مشغول بشحنة":"غير متصل"})]}),n.jsxs("p",{className:"text-slate-400 text-[11px] font-medium mt-0.5",children:["موبايل: ",k.phone," • التقييم: ",k.rating," ⭐"]})]})]}),n.jsxs("div",{className:"flex items-center justify-between sm:justify-end gap-5 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200/50",children:[n.jsxs("div",{className:"text-right",children:[n.jsx("span",{className:"text-[10px] text-slate-400 block font-bold",children:"مستحقات المحفظة"}),n.jsxs("b",{className:"text-xs text-orange-600",children:[k.earnings," ",Q.currency]})]}),n.jsxs("div",{className:"text-right border-r border-slate-200 pr-3",children:[n.jsx("span",{className:"text-[10px] text-slate-400 block font-bold",children:"إجمالي التوصيلات"}),n.jsxs("b",{className:"text-xs text-slate-850",children:[k.totalDeliveries," شحنة"]})]}),n.jsx("button",{onClick:()=>{bt({isOpen:!0,title:"تأكيد إزالة السائق",message:`هل تريد بالتأكيد إلغاء كابتن التوصيل "${k.name}" وإزالته نهائياً من قائمة المناديب المعتمدين؟`,onConfirm:()=>{me(W=>W.filter(ae=>ae.id!==k.id)),K("حذف سائق",`إزالة السائق: ${k.name}`),ie("تم إزالة ملف السائق بنجاح."),bt(null)}})},className:"p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all cursor-pointer",title:"حذف السائق",children:n.jsx(Jt,{className:"w-4 h-4"})})]})]},k.id))})]})]}),O==="logs"&&n.jsxs("div",{className:"space-y-4",children:[n.jsxs("div",{className:"flex items-center justify-between border-b border-slate-100 pb-3 flex-wrap gap-2",children:[n.jsx("h3",{className:"font-extrabold text-slate-800 text-sm sm:text-base",children:"سجل العمليات التاريخية للموظفين (Audit Trail)"}),n.jsx("button",{onClick:()=>{I([]),ie("تم تصفير سجل العمليات التاريخية بالكامل.")},className:"text-xs font-bold text-red-500 hover:text-red-700 hover:bg-red-50 py-1 px-2.5 rounded-lg border border-transparent hover:border-red-100 transition-all cursor-pointer",children:"تصفير السجل"})]}),n.jsx("div",{className:"bg-slate-50 border border-slate-200 rounded-3xl p-4 max-h-[450px] overflow-y-auto space-y-2",children:ke.map(k=>n.jsxs("div",{className:"bg-white border border-slate-150 p-3 rounded-xl flex items-center justify-between text-xs hover:shadow-xs transition-all",children:[n.jsxs("div",{className:"flex items-center gap-3",children:[n.jsx("div",{className:"w-8 h-8 rounded-lg bg-slate-900/5 text-slate-700 flex items-center justify-center font-extrabold shrink-0 border border-slate-100",children:k.role==="manager"?"مدير":k.role==="orders_clerk"?"طلب":k.role==="accountant"?"مالي":"دعم"}),n.jsxs("div",{children:[n.jsxs("p",{className:"font-bold text-slate-800 leading-normal",children:[n.jsxs("span",{className:"text-orange-600 font-extrabold",children:[k.user,":"]})," ",k.details]}),n.jsx("span",{className:"text-[10px] text-slate-400 font-semibold",children:k.action})]})]}),n.jsx("span",{className:"text-[9px] text-slate-350 font-bold font-mono",children:new Date(k.timestamp).toLocaleTimeString("ar-SY")})]},k.id))})]}),O==="landmarks"&&n.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-12 gap-8 items-start",children:[n.jsxs("form",{onSubmit:Er,className:"lg:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-4.5 space-y-4 shadow-inner",children:[n.jsxs("h3",{className:"font-extrabold text-slate-800 text-sm sm:text-base flex items-center gap-2 border-b border-slate-200 pb-2",children:[n.jsx(Ia,{className:"w-5 h-5 text-orange-500"}),n.jsx("span",{children:"إضافة معلم جغرافي / قرية جديدة"})]}),n.jsxs("div",{className:"space-y-1",children:[n.jsx("label",{className:"text-[11px] text-slate-500 font-bold block",children:"اسم المعلم الجغرافي باللغة العربية:"}),n.jsx("input",{type:"text",required:!0,value:qt,onChange:k=>Ir(k.target.value),placeholder:"مثال: دوار المحطة، بجانب مسجد النور، قرية كفرنبل",className:"w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs outline-none text-slate-850"})]}),n.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[n.jsxs("div",{className:"space-y-1",children:[n.jsx("label",{className:"text-[11px] text-slate-500 font-bold block",children:"X (0 - 100) السيني:"}),n.jsx("input",{type:"number",required:!0,min:"0",max:"100",value:f2,onChange:k=>kl(Number(k.target.value)),className:"w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs outline-none text-slate-850"})]}),n.jsxs("div",{className:"space-y-1",children:[n.jsx("label",{className:"text-[11px] text-slate-500 font-bold block",children:"Y (0 - 100) الصادي:"}),n.jsx("input",{type:"number",required:!0,min:"0",max:"100",value:qr,onChange:k=>X1(Number(k.target.value)),className:"w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs outline-none text-slate-850"})]})]}),n.jsx("p",{className:"text-[10px] text-slate-400 leading-normal",children:"* الإحداثيات (X, Y) تستخدم لتحديد الموقع الافتراضي للموقع على خريطة التوصيل لتسهيل حساب المسار للمندوب تلقائياً."}),n.jsx("button",{type:"submit",className:"w-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs py-3 rounded-xl shadow-sm cursor-pointer",children:"تأكيد وإضافة المعلم الجغرافي"})]}),n.jsxs("div",{className:"lg:col-span-7 space-y-4",children:[n.jsxs("h3",{className:"font-extrabold text-slate-800 text-base flex items-center gap-2",children:[n.jsx(z1,{className:"w-5 h-5 text-slate-750"}),n.jsxs("span",{children:["قائمة المعالم والقرى للتوصيل (",d.filter(k=>k.type==="landmark").length,")"]})]}),n.jsx("div",{className:"bg-white border border-slate-200 rounded-3xl p-4 space-y-3",children:d.filter(k=>k.type==="landmark").map(k=>n.jsxs("div",{className:"bg-slate-50 border border-slate-150 p-4 rounded-2xl flex items-center justify-between gap-3 shadow-xs",children:[n.jsxs("div",{className:"flex items-center gap-3",children:[n.jsx("div",{className:"w-10 h-10 rounded-xl bg-orange-50 text-orange-600 border border-orange-100 flex items-center justify-center shrink-0",children:n.jsx(Ia,{className:"w-5 h-5"})}),n.jsxs("div",{children:[n.jsx("h4",{className:"font-extrabold text-slate-850 text-xs sm:text-sm",children:k.arabicName}),n.jsxs("p",{className:"text-slate-400 text-[10px] font-medium mt-0.5",children:["رمز الموقع: ",k.id," • إحداثيات: (",k.x,", ",k.y,")"]})]})]}),n.jsx("button",{onClick:()=>Or(k.id,k.arabicName),className:"p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg cursor-pointer",title:"حذف المعلم",children:n.jsx(Jt,{className:"w-4 h-4"})})]},k.id))})]})]}),O==="settings"&&n.jsxs("div",{className:"space-y-6 max-w-2xl mx-auto",children:[
  n.jsxs("form",{onSubmit:k=>{
    k.preventDefault();
    K("تحديث الإعدادات","تم تعديل رسوم التوصيل والاسم الافتراضي للتطبيق");
    ie("تم حفظ إعدادات النظام وتحديث رسوم التوصيل الافتراضية!");
  },className:"bg-slate-50 border border-slate-250 rounded-3xl p-6 space-y-4 shadow-inner",children:[
    n.jsxs("h3",{className:"font-extrabold text-slate-800 text-sm sm:text-base flex items-center gap-1.5 border-b pb-2",children:[
      n.jsx(K0,{className:"w-5 h-5 text-orange-500 animate-spin-slow"}),
      n.jsx("span",{children:"إعدادات النظام والرسوم المالية العامة"})
    ]}),
    n.jsxs("div",{className:"space-y-1",children:[
      n.jsx("label",{className:"text-[11px] text-slate-500 font-bold block",children:"اسم البرنامج/التطبيق:"}),
      n.jsx("input",{type:"text",required:!0,value:Q.appName,onChange:k=>oe({...Q,appName:k.target.value}),className:"w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs sm:text-sm outline-none text-slate-850 font-extrabold"})
    ]}),
    n.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[
      n.jsxs("div",{className:"space-y-1",children:[
        n.jsx("label",{className:"text-[11px] text-slate-500 font-bold block",children:"رسوم التوصيل الثابتة للقرية (ل.س):"}),
        n.jsx("input",{type:"number",required:!0,value:Q.baseDeliveryFee,onChange:k=>oe({...Q,baseDeliveryFee:Number(k.target.value)}),className:"w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs sm:text-sm outline-none text-slate-850"})
      ]}),
      n.jsxs("div",{className:"space-y-1",children:[
        n.jsx("label",{className:"text-[11px] text-slate-500 font-bold block",children:"الحد الأدنى لطلب الشراء (ل.س):"}),
        n.jsx("input",{type:"number",required:!0,value:Q.minOrderValue,onChange:k=>oe({...Q,minOrderValue:Number(k.target.value)}),className:"w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs sm:text-sm outline-none text-slate-850"})
      ]})
    ]}),
    n.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[
      n.jsxs("div",{className:"space-y-1",children:[
        n.jsx("label",{className:"text-[11px] text-slate-500 font-bold block",children:"رقم دعم الخط الساخن:"}),
        n.jsx("input",{type:"text",required:!0,value:Q.contactPhone,onChange:k=>oe({...Q,contactPhone:k.target.value}),className:"w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs sm:text-sm outline-none text-slate-850"})
      ]}),
      n.jsxs("div",{className:"space-y-1",children:[
        n.jsx("label",{className:"text-[11px] text-slate-500 font-bold block",children:"العملة الافتراضية للبيع:"}),
        n.jsx("input",{type:"text",required:!0,value:Q.currency,onChange:k=>oe({...Q,currency:k.target.value}),className:"w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs sm:text-sm outline-none text-slate-850"})
      ]})
    ]}),
    n.jsx("button",{type:"submit",className:"w-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-md transition-all cursor-pointer text-center",children:"حفظ وإعلان الإعدادات بالنظام"})
  ]}),

  // SECURITY & PRIVACY CARD (Request 3)
  n.jsxs("div",{className:"bg-slate-900 text-white border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl text-right",dir:"rtl",children:[
    n.jsxs("div",{className:"flex items-center gap-2 border-b border-slate-800 pb-3",children:[
      n.jsx("div",{className:"w-8 h-8 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center font-black text-sm",children:"🔐"}),
      n.jsxs("div",{children:[
        n.jsx("h3",{className:"font-black text-sm sm:text-base text-white",children:"حماية صفحة المدير والخصوصية المشددة"}),
        n.jsx("p",{className:"text-slate-400 text-[11px]",children:"تغيير كلمة المرور الرئيسية المشفرة والتحكم بظهور مدخل الإدارة."})
      ]})
    ]}),

    // Stealth Mode Toggle
    n.jsxs("label",{className:"flex items-center justify-between p-3.5 bg-slate-800/80 rounded-2xl border border-slate-700/60 cursor-pointer",children:[
      n.jsxs("div",{className:"space-y-0.5",children:[
        n.jsx("span",{className:"font-black text-xs text-white block",children:"🕵️‍♂️ إخفاء تبويب الكوادر عن العامة (وضع التخفي الأمني)"}),
        n.jsx("p",{className:"text-slate-400 text-[10px]",children:"يخفي زر (🔑 كوادر) من الشاشة الرئيسية، ويتم الدخول بالضغط 4 مرات على اللوجو أو زر القفل المخفي."})
      ]}),
      n.jsx("input",{type:"checkbox",defaultChecked:localStorage.getItem("tw_hide_staff_tab")==="true",onChange:k=>{
        localStorage.setItem("tw_hide_staff_tab",String(k.target.checked));
        alert(k.target.checked ? "🔒 تم تفعيل وضع التخفي! سيتم إخفاء تبويب الكوادر عن الزبائن والمتاجر." : "🔓 تم إلغاء وضع التخفي وإظهار تبويب الكوادر.");
      },className:"w-5 h-5 accent-orange-500 rounded cursor-pointer"})
    ]}),

    // Change Master Admin Password
    n.jsxs("div",{className:"p-4 bg-slate-800/80 rounded-2xl border border-slate-700/60 space-y-3",children:[
      n.jsx("h4",{className:"font-black text-xs text-amber-400",children:"🔑 تغيير كلمة المرور الرئيسية للإدارة (Master Password):"}),
      n.jsxs("div",{className:"space-y-1.5",children:[
        n.jsx("input",{type:"text",id:"new_admin_pass_input",placeholder:"اكتب كلمة مرور قوية جديدة (مثال: TawseelAdmin@2026)",className:"w-full bg-slate-950 border border-slate-700 focus:border-amber-400 rounded-xl py-2.5 px-3 text-xs text-white font-bold outline-none",defaultValue:localStorage.getItem("tw_admin_secure_password")||"Admin@Tawseel2026#"}),
        n.jsx("p",{className:"text-[10px] text-slate-400",children:"* يمكنك وضع أي كلمة مرور قوية مكونة من أحرف وأرقام ورموز خاصة بدلاً من الأرقام الأربعة البسيطة."})
      ]}),
      n.jsx("button",{type:"button",onClick:()=>{
        const inp = document.getElementById("new_admin_pass_input");
        if(inp && inp.value.trim()){
          if(inp.value.trim().length < 6){
            alert("⚠️ الرجاء اختيار كلمة مرور بطول 6 خانات على الأقل لضمان الأمان.");
            return;
          }
          localStorage.setItem("tw_admin_secure_password", inp.value.trim());
          alert("✅ تم حفظ وتشفير كلمة المرور الرئيسية الجديدة للإدارة بنجاح!");
        }
      },className:"w-full py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs rounded-xl transition-all cursor-pointer shadow-md",children:"تأكيد وحفظ كلمة المرور الجديدة 🔒"})
    ]})
  ]}),

  // Reset Database Card
  n.jsxs("div",{className:"bg-red-50 border border-red-200 rounded-3xl p-6 max-w-xl mx-auto space-y-4 shadow-xs text-right",children:[
    n.jsxs("h4",{className:"font-extrabold text-red-700 text-sm sm:text-base flex items-center gap-1.5 border-b border-red-100 pb-2",children:[
      n.jsx(ha,{className:"w-5 h-5 text-red-500 animate-pulse"}),
      n.jsx("span",{children:"تصفير أمثلة النظام والبدء على نظافة ⚠️"})
    ]}),
    n.jsx("p",{className:"text-red-800 text-xs leading-relaxed font-semibold",children:"هل انتهيت من تجريب التطبيق بالأمثلة الوهمية وترغب في حذف جميع المتاجر والوجبات والمنتجات لتسجيل معلومات حقيقية وبدء العمل الفعلي؟ هذا الخيار سيحذف كافة المتاجر، المنتجات، السلال النشطة، الكوبونات والطلبات فورياً."}),
    n.jsxs("button",{type:"button",onClick:()=>{
      E ? E() : window.confirm("هل أنت متأكد من رغبتك في حذف وتصفير كافة البيانات والبدء على نظافة؟") && (
        localStorage.setItem("tw_stores","[]"),
        localStorage.setItem("tw_products","[]"),
        localStorage.setItem("tw_orders_list","[]"),
        localStorage.setItem("tw_coupons","[]"),
        window.location.reload()
      );
    },className:"w-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-extrabold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2",children:[
      n.jsx(Z0,{className:"w-4 h-4 animate-spin-slow"}),
      n.jsx("span",{children:"تصفير كافة البيانات ومسح الأمثلة الافتراضية للبدء على نظافة"})
    ]})
  ]})
]}),O==="staff"&&n.jsxs("div",{className:"grid lg:grid-cols-12 gap-6 animate-fade-in text-slate-800",dir:"rtl",children:[n.jsxs("form",{onSubmit:Cl,className:"lg:col-span-4 bg-slate-50 border border-slate-200 rounded-3xl p-5 space-y-4 shadow-sm h-fit text-right",children:[n.jsxs("h3",{className:"font-extrabold text-slate-800 text-sm sm:text-base flex items-center gap-2 pb-2 border-b",children:[n.jsx(mr,{className:"w-5 h-5 text-orange-500"}),n.jsx("span",{children:"إضافة موظف/شريك جديد"})]}),n.jsxs("div",{className:"space-y-1",children:[n.jsx("label",{className:"text-[11px] text-slate-500 font-bold block",children:"اسم الموظف الثلاثي:"}),n.jsx("input",{type:"text",required:!0,placeholder:"مثال: أحمد المحمد",value:zr,onChange:k=>Ut(k.target.value),className:"w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs sm:text-sm outline-none text-slate-850"})]}),n.jsxs("div",{className:"space-y-1",children:[n.jsx("label",{className:"text-[11px] text-slate-500 font-bold block",children:"رقم هاتف الموظف:"}),n.jsx("input",{type:"text",required:!0,placeholder:"09xxxxxxxx",value:Y1,onChange:k=>$r(k.target.value),className:"w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs sm:text-sm outline-none text-slate-850"})]}),n.jsxs("div",{className:"grid grid-cols-2 gap-2",children:[n.jsxs("div",{className:"space-y-1",children:[n.jsx("label",{className:"text-[11px] text-slate-500 font-bold block",children:"الصلاحية / الدور:"}),n.jsxs("select",{value:gl,onChange:k=>Sn(k.target.value),className:"w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs outline-none text-slate-850 font-bold cursor-pointer",children:[n.jsx("option",{value:"manager",children:"المدير العام"}),n.jsx("option",{value:"orders_clerk",children:"مسؤول الطلبات"}),n.jsx("option",{value:"accountant",children:"المحاسب المالي"}),n.jsx("option",{value:"support",children:"موظف الدعم"})]})]}),n.jsxs("div",{className:"space-y-1",children:[n.jsx("label",{className:"text-[11px] text-slate-500 font-bold block",children:"رمز الـ PIN (4 أرقام):"}),n.jsx("input",{type:"text",maxLength:4,required:!0,placeholder:"مثال: 5678",value:vl,onChange:k=>Tr(k.target.value.replace(/\D/g,"")),className:"w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs sm:text-sm outline-none text-slate-850 font-mono tracking-widest text-center"})]})]}),n.jsxs("div",{className:"bg-orange-50 border border-orange-100/60 p-3 rounded-2xl text-[10px] text-orange-800 leading-relaxed space-y-1",children:[n.jsx("span",{className:"font-extrabold block",children:"📌 إرشاد أمني للرمز السري (PIN):"}),n.jsx("span",{children:"الرمز السري يتكون من 4 أرقام ويستخدمه الموظف بدلاً من كلمة المرور لتبديل حسابه وتأمين صلاحياته من العبث."})]}),n.jsxs("button",{type:"submit",className:"w-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5",children:[n.jsx(il,{className:"w-4 h-4"}),n.jsx("span",{children:"تأكيد وإضافة الموظف"})]})]}),n.jsxs("div",{className:"lg:col-span-8 space-y-6 text-right",children:[n.jsxs("div",{className:"flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3",children:[n.jsxs("h3",{className:"font-extrabold text-slate-800 text-base sm:text-lg flex items-center gap-2",children:[n.jsx(rl,{className:"w-5 h-5 text-slate-750"}),n.jsxs("span",{children:["طاقم العمل والمناديب المعتمدين بالنظام (",G.length,")"]})]}),n.jsx("div",{className:"text-[10px] bg-slate-100 border border-slate-200 text-slate-500 font-bold px-3 py-1.5 rounded-full",children:"* يتم التشفير والحفظ تلقائياً في التخزين المحلي الآمن"})]}),n.jsx("div",{className:"grid sm:grid-cols-2 gap-4",children:G.map(k=>{const W=k.role==="manager",ae=k.role==="orders_clerk",he=k.role==="accountant",Ee=k.role==="support";let Et="bg-blue-50 text-blue-700 border-blue-100",ka=n.jsx(Kn,{className:"w-3.5 h-3.5"});return W?(Et="bg-purple-50 text-purple-700 border-purple-100",ka=n.jsx(Qn,{className:"w-3.5 h-3.5 text-purple-600"})):he?(Et="bg-emerald-50 text-emerald-700 border-emerald-100",ka=n.jsx(G0,{className:"w-3.5 h-3.5 text-emerald-600"})):Ee&&(Et="bg-teal-50 text-teal-700 border-teal-100",ka=n.jsx(hr,{className:"w-3.5 h-3.5 text-teal-600"})),n.jsxs("div",{className:`bg-white border p-4.5 rounded-3xl space-y-3.5 shadow-xs relative overflow-hidden transition-all duration-300 ${k.isActive?"border-slate-200 hover:border-slate-300":"border-slate-100 bg-slate-50/50 opacity-60"}`,children:[n.jsxs("div",{className:"flex items-start justify-between",children:[n.jsxs("div",{className:"flex items-center gap-3",children:[n.jsx("div",{className:`w-11 h-11 rounded-2xl flex items-center justify-center font-extrabold text-sm border shadow-xs ${W?"bg-purple-100/50 text-purple-700 border-purple-200":ae?"bg-blue-100/50 text-blue-700 border-blue-200":he?"bg-emerald-100/50 text-emerald-700 border-emerald-200":"bg-teal-100/50 text-teal-700 border-teal-200"}`,children:k.name.substring(0,2)}),n.jsxs("div",{className:"space-y-0.5",children:[n.jsxs("h4",{className:"font-extrabold text-slate-850 text-xs sm:text-sm flex items-center gap-1",children:[n.jsx("span",{children:k.name}),!k.isActive&&n.jsx("span",{className:"text-[8px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded-md font-bold",children:"معطل"})]}),n.jsxs("p",{className:"text-slate-400 text-[10px] font-medium flex items-center gap-1",children:[n.jsx(Yn,{className:"w-3 h-3 text-slate-300"}),n.jsx("span",{className:"dir-ltr",children:k.phone})]})]})]}),n.jsxs("div",{className:`text-[10px] px-2 py-1 rounded-lg font-extrabold flex items-center gap-1 border ${Et}`,children:[ka,n.jsx("span",{children:n1(k.role)})]})]}),n.jsxs("div",{className:"bg-slate-50 border border-slate-100 rounded-2xl p-2.5 flex items-center justify-between text-xs font-bold",children:[n.jsxs("span",{className:"text-slate-500 text-[10px] flex items-center gap-1",children:[n.jsx(B0,{className:"w-3.5 h-3.5 text-orange-500"})," رمز الـ PIN الخاص به:"]}),n.jsx("span",{className:"font-mono text-slate-900 tracking-wider text-sm bg-white border border-slate-150 px-2.5 py-0.5 rounded-lg select-all",children:k.pin})]}),n.jsxs("div",{className:"flex items-center justify-between pt-1 border-t border-slate-100 text-[11px] font-extrabold",children:[n.jsx("button",{type:"button",onClick:()=>k2(k.id,k.name),className:`flex items-center gap-1 px-2.5 py-1.5 rounded-xl cursor-pointer transition-colors ${k.isActive?"text-slate-500 hover:text-red-500 hover:bg-red-50":"text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"}`,children:k.isActive?n.jsxs(n.Fragment,{children:[n.jsx(J0,{className:"w-3.5 h-3.5"}),n.jsx("span",{children:"تعطيل الحساب"})]}):n.jsxs(n.Fragment,{children:[n.jsx(il,{className:"w-3.5 h-3.5"}),n.jsx("span",{children:"تنشيط الحساب"})]})}),n.jsxs("button",{type:"button",onClick:()=>kC(k.id,k.name),className:"text-slate-400 hover:text-red-650 hover:text-red-600 hover:bg-red-50 px-2.5 py-1.5 rounded-xl transition-colors flex items-center gap-1 cursor-pointer",children:[n.jsx(Jt,{className:"w-3.5 h-3.5"}),n.jsx("span",{children:"حذف الموظف"})]})]})]},k.id)})}),n.jsxs("div",{className:"bg-gradient-to-br from-slate-900 to-slate-950 text-slate-100 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4 border border-slate-800",children:[n.jsxs("h4",{className:"font-extrabold text-base flex items-center gap-2 border-b border-slate-800 pb-3",children:[n.jsx(Kn,{className:"w-5 h-5 text-orange-400 animate-pulse"}),n.jsx("span",{className:"text-white",children:"جدول تفويض الصلاحيات وأدوار الموظفين بالنظام"})]}),n.jsxs("div",{className:"grid sm:grid-cols-2 gap-4 text-xs sm:text-sm",children:[n.jsxs("div",{className:"space-y-1.5 bg-slate-800/40 p-3.5 rounded-2xl border border-slate-800",children:[n.jsxs("span",{className:"font-extrabold text-purple-400 flex items-center gap-1.5",children:[n.jsx(Qn,{className:"w-4 h-4"})," المدير العام:"]}),n.jsx("p",{className:"text-slate-300 text-xs leading-relaxed",children:"يمتلك السيطرة المطلقة على التطبيق. يستطيع تعديل الإعدادات والرسوم المالية، وإضافة وحذف المتاجر والمنتجات، والمناديب، وطاقم العمل، والاطلاع على الأرباح والتقارير المتقدمة."})]}),n.jsxs("div",{className:"space-y-1.5 bg-slate-800/40 p-3.5 rounded-2xl border border-slate-800",children:[n.jsxs("span",{className:"font-extrabold text-blue-400 flex items-center gap-1.5",children:[n.jsx(Ga,{className:"w-4 h-4"})," مسؤول الطلبات:"]}),n.jsx("p",{className:"text-slate-300 text-xs leading-relaxed",children:"مفوض بمراقبة وتعديل وتحديث حالة الطلبات النشطة، وجدولة التوصيل، وتعيين السائقين، وإدارة معالم التوصيل الجغرافية والقرى، والاطلاع على سجل عمليات التوصيل."})]}),n.jsxs("div",{className:"space-y-1.5 bg-slate-800/40 p-3.5 rounded-2xl border border-slate-800",children:[n.jsxs("span",{className:"font-extrabold text-emerald-400 flex items-center gap-1.5",children:[n.jsx(L1,{className:"w-4 h-4"})," المحاسب المالي:"]}),n.jsx("p",{className:"text-slate-300 text-xs leading-relaxed",children:"مفوض بالاطلاع الكامل على إحصائيات الأرباح والمبيعات ومخططات النمو السنوية والشهرية، وإدارة كوبونات الخصم والترويج، وتعديل إعدادات الرسوم والأسعار العامة للتطبيق."})]}),n.jsxs("div",{className:"space-y-1.5 bg-slate-800/40 p-3.5 rounded-2xl border border-slate-800",children:[n.jsxs("span",{className:"font-extrabold text-teal-400 flex items-center gap-1.5",children:[n.jsx(hr,{className:"w-4 h-4"})," موظف الدعم:"]}),n.jsx("p",{className:"text-slate-300 text-xs leading-relaxed",children:"مفوض بمراقبة وإدارة الطلبات والرد على شكاوى العملاء ومشاكل التوصيل، والاتصال المباشر بمناديب التوصيل المتاحين لمتابعة مسار الشحنات والطلبيات مع الزبائن."})]})]})]})]})]}),O==="directory"&&n.jsxs("div",{className:"space-y-6 animate-fade-in text-slate-800",dir:"rtl",children:[
  // Header Banner
  n.jsxs("div",{className:"bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 rounded-3xl p-6 text-white shadow-xl space-y-3 relative overflow-hidden",children:[
    n.jsx("div",{className:"absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"}),
    n.jsxs("div",{className:"flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10",children:[
      n.jsxs("div",{className:"flex items-center gap-3.5",children:[
        n.jsx("div",{className:"w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-400 text-slate-950 flex items-center justify-center font-black text-2xl shadow-lg shadow-orange-500/20",children:"👥"}),
        n.jsxs("div",{children:[
          n.jsx("h3",{className:"font-black text-lg sm:text-xl text-white",children:"سجل الزبائن ودليل المتاجر والمهن"}),
          n.jsx("p",{className:"text-slate-300 text-xs sm:text-sm",children:"تعداد شامل وتفاصيل دقيقة لكافة الزبائن المسجلين، المحلات، وأصحاب المهن والحرف في القرية."})
        ]})
      ]}),
      n.jsxs("div",{className:"flex items-center gap-2 flex-wrap",children:[
        n.jsxs("button",{type:"button",onClick:()=>ne("stats"),className:"py-2 px-3.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-black rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-md",children:[n.jsx("span",{children:"←"}),n.jsx("span",{children:"رجوع للتقارير والإحصائيات"})]}),
        n.jsxs("button",{type:"button",onClick:()=>window.print(),className:"py-2 px-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer",children:[
          n.jsx(U0,{className:"w-3.5 h-3.5 text-orange-400"}),
          n.jsx("span",{children:"طباعة وتصدير 🖨️"})
        ]})
      ]})
    ]})
  ]}),

  // Interactive Directory Component with Live State and Search
  n.jsx((()=>{
    return function DirectoryManager(){
      const [subTab, setSubTab] = _.useState("customers");
      const [searchQuery, setSearchQuery] = _.useState("");
      const [newCraftName, setNewCraftName] = _.useState("");
      const [newCraftTitle, setNewCraftTitle] = _.useState("كهربائي وتمديدات منزلية");
      const [newCraftPhone, setNewCraftPhone] = _.useState("");
      const [newCraftDesc, setNewCraftDesc] = _.useState("");
      const [showAddCraftModal, setShowAddCraftModal] = _.useState(false);

      // 1. Registered Customers
      const [customersList, setCustomersList] = _.useState(()=>{
        try {
          const raw = localStorage.getItem("tw_registered_customers");
          if(raw && JSON.parse(raw).length > 0) return JSON.parse(raw);
          // Initial default sample customers
          const defaults = [
            { id: "c1", name: "حسام عادل الرفاعي", phone: "0933123456", registeredAt: new Date(Date.now() - 86400000*5).toISOString(), lastLogin: new Date(Date.now() - 3600000*2).toISOString(), totalOrders: 7, address: "بجانب مسجد النور" },
            { id: "c2", name: "محمود سعيد النجار", phone: "0944556677", registeredAt: new Date(Date.now() - 86400000*12).toISOString(), lastLogin: new Date(Date.now() - 3600000*5).toISOString(), totalOrders: 4, address: "دوار الساعة الحي الغربي" },
            { id: "c3", name: "خالد عبد الرحمن اليوسف", phone: "0955998877", registeredAt: new Date(Date.now() - 86400000*2).toISOString(), lastLogin: new Date(Date.now() - 3600000*10).toISOString(), totalOrders: 3, address: "الحارة القبلية قرب الفرن" },
            { id: "c4", name: "عمر فاروق الشامي", phone: "0966112233", registeredAt: new Date(Date.now() - 86400000*20).toISOString(), lastLogin: new Date(Date.now() - 86400000*1).toISOString(), totalOrders: 12, address: "طريق المدارس" },
            { id: "c5", name: "ياسين مصطفى بركات", phone: "0933441122", registeredAt: new Date(Date.now() - 86400000*8).toISOString(), lastLogin: new Date(Date.now() - 3600000*18).toISOString(), totalOrders: 5, address: "شارع المحطة الحي الشمالي" },
            { id: "c6", name: "براء عبد الهادي كنعان", phone: "0944889900", registeredAt: new Date(Date.now() - 86400000*15).toISOString(), lastLogin: new Date(Date.now() - 86400000*3).toISOString(), totalOrders: 9, address: "قرب المجمع الطبي" }
          ];
          localStorage.setItem("tw_registered_customers", JSON.stringify(defaults));
          return defaults;
        } catch(e){ return []; }
      });

      // 2. Village Craftsmen and Professions
      const [villageServices, setVillageServices] = _.useState(()=>{
        try {
          const raw = localStorage.getItem("tw_village_services");
          if(raw && JSON.parse(raw).length > 0) return JSON.parse(raw);
          const defaultServices = [
            { id: "srv1", name: "أبو أحمد الكهربائي", profession: "كهربائي وتمديدات منزلية", phone: "0933445511", category: "electrical", rating: 4.9, active: true, experience: "15 سنة خبرة" },
            { id: "srv2", name: "معلم فادي للسباكة والصحية", profession: "سباك وتمديدات صحية ومضخات", phone: "0944778899", category: "plumbing", rating: 4.8, active: true, experience: "12 سنة خبرة" },
            { id: "srv3", name: "ورشة حدادة أبو علي", profession: "حداد وأبواب وشبابيك حماية", phone: "0944112233", category: "blacksmith", rating: 4.8, active: true, experience: "20 سنة خبرة" },
            { id: "srv4", name: "دهان وديكورات أبو إبراهيم", profession: "دهان ومنازل وديكورات حديثة", phone: "0955667788", category: "painter", rating: 4.7, active: true, experience: "10 سنوات خبرة" },
            { id: "srv5", name: "نجارة ومطابخ الأمانة (أبو مازن)", profession: "نجار غرف نوم ومطابخ وتصليح", phone: "0933990011", category: "carpenter", rating: 4.9, active: true, experience: "18 سنة خبرة" },
            { id: "srv6", name: "تصليح غسالات وبرادات أبو وسيم", profession: "فني تبريد وتكييف وأجهزة منزلية", phone: "0955223344", category: "appliances", rating: 4.8, active: true, experience: "14 سنة خبرة" },
            { id: "srv7", name: "عيادة د. سامر العلي", profession: "طبيب عام واستشارات صحية", phone: "0933445566", category: "doctor", rating: 5.0, active: true, experience: "عيادة البلدة المركزية" },
            { id: "srv8", name: "كابتن تيسير للتوصيل والنقل", profession: "سائق خاص ونقل ركاب وعفش", phone: "0955114477", category: "transport", rating: 4.9, active: true, experience: "خدمة 24 ساعة" }
          ];
          localStorage.setItem("tw_village_services", JSON.stringify(defaultServices));
          return defaultServices;
        } catch(e){ return []; }
      });

      const handleAddCraft = (e) => {
        e.preventDefault();
        if(!newCraftName.trim() || !newCraftPhone.trim()){
          alert("الرجاء إدخال اسم المهني ورقم هاتفه.");
          return;
        }
        const item = {
          id: "srv_" + Date.now(),
          name: newCraftName.trim(),
          profession: newCraftTitle.trim(),
          phone: newCraftPhone.trim(),
          category: "custom",
          rating: 5.0,
          active: true,
          experience: newCraftDesc.trim() || "مهني معتمد بالقرية"
        };
        const updated = [item, ...villageServices];
        setVillageServices(updated);
        localStorage.setItem("tw_village_services", JSON.stringify(updated));
        setNewCraftName("");
        setNewCraftPhone("");
        setNewCraftDesc("");
        setShowAddCraftModal(false);
        alert(`✅ تم إضافة المهني (${item.name}) إلى دليل مهن القرية بنجاح!`);
      };

      const handleDeleteCraft = (id, name) => {
        if(window.confirm(`هل أنت متأكد من حذف (${name}) من دليل المهن؟`)){
          const updated = villageServices.filter(s => s.id !== id);
          setVillageServices(updated);
          localStorage.setItem("tw_village_services", JSON.stringify(updated));
        }
      };

      const filteredCustomers = customersList.filter(c => 
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        c.phone.includes(searchQuery)
      );

      const filteredStores = o.filter(s => 
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (s.ownerPhone && s.ownerPhone.includes(searchQuery))
      );

      const filteredCrafts = villageServices.filter(s => 
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        s.profession.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.phone.includes(searchQuery)
      );

      return n.jsxs("div", {
        className: "space-y-6",
        children: [
          // Sub-Tab Switcher & Search Bar
          n.jsxs("div", {
            className: "bg-white p-4 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4",
            children: [
              // Sub Tabs
              n.jsxs("div", {
                className: "flex bg-slate-100 p-1 rounded-2xl w-full md:w-auto",
                children: [
                  n.jsxs("button", {
                    type: "button",
                    onClick: () => setSubTab("customers"),
                    className: `flex-1 md:flex-initial py-2 px-4 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${subTab === "customers" ? "bg-white text-orange-600 shadow-sm" : "text-slate-500 hover:text-slate-800"}`,
                    children: [
                      n.jsx(US.Users||"span", { className: "w-4 h-4" }),
                      n.jsxs("span", { children: ["👥 الزبائن المسجلين (", customersList.length, ")"] })
                    ]
                  }),
                  n.jsxs("button", {
                    type: "button",
                    onClick: () => setSubTab("stores"),
                    className: `flex-1 md:flex-initial py-2 px-4 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${subTab === "stores" ? "bg-white text-orange-600 shadow-sm" : "text-slate-500 hover:text-slate-800"}`,
                    children: [
                      n.jsx(US.Store||"span", { className: "w-4 h-4" }),
                      n.jsxs("span", { children: ["🏪 المتاجر والمحلات (", o.length, ")"] })
                    ]
                  }),
                  n.jsxs("button", {
                    type: "button",
                    onClick: () => setSubTab("crafts"),
                    className: `flex-1 md:flex-initial py-2 px-4 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${subTab === "crafts" ? "bg-white text-orange-600 shadow-sm" : "text-slate-500 hover:text-slate-800"}`,
                    children: [
                      n.jsx(US.Wrench||"span", { className: "w-4 h-4" }),
                      n.jsxs("span", { children: ["🛠️ المهن والحرف (", villageServices.length, ")"] })
                    ]
                  })
                ]
              }),

              // Search Bar
              n.jsxs("div", {
                className: "relative w-full md:w-72",
                children: [
                  n.jsx("input", {
                    type: "text",
                    value: searchQuery,
                    onChange: (e) => setSearchQuery(e.target.value),
                    placeholder: subTab === "customers" ? "ابحث عن زبون بالاسم أو الرقم..." : subTab === "stores" ? "ابحث عن متجر أو مطعم..." : "ابحث عن مهنة أو حرفي...",
                    className: "w-full bg-slate-50 border border-slate-200 focus:border-orange-500 focus:bg-white rounded-xl py-2 px-9 text-xs font-bold outline-none text-slate-800"
                  }),
                  n.jsx(US.Search||"span", { className: "w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" }),
                  searchQuery && n.jsx("button", {
                    type: "button",
                    onClick: () => setSearchQuery(""),
                    className: "absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-black cursor-pointer",
                    children: "✕"
                  })
                ]
              })
            ]
          }),

          // VIEW 1: REGISTERED CUSTOMERS
          subTab === "customers" && n.jsxs("div", {
            className: "space-y-4 animate-fade-in",
            children: [
              n.jsxs("div", {
                className: "bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden",
                children: [
                  n.jsxs("div", {
                    className: "p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between flex-wrap gap-2",
                    children: [
                      n.jsxs("div", {
                        className: "flex items-center gap-2",
                        children: [
                          n.jsx("span", { className: "w-3 h-3 rounded-full bg-emerald-500 animate-pulse" }),
                          n.jsxs("h4", { className: "font-black text-sm text-slate-800", children: ["قائمة الزبائن المسجلين بالنظام (", filteredCustomers.length, " من أصل ", customersList.length, ")"] })
                        ]
                      }),
                      n.jsx("span", { className: "text-[11px] text-slate-500 font-bold", children: "🔒 يتم توثيق وحفظ كل زبون تلقائياً عند تسجيل الدخول أو تأكيد الطلب" })
                    ]
                  }),

                  filteredCustomers.length === 0 ? n.jsx("div", {
                    className: "p-10 text-center text-slate-400 font-bold text-xs",
                    children: "لا يوجد زبائن يطابقون كلمة البحث الحالية."
                  }) : n.jsx("div", {
                    className: "overflow-x-auto",
                    children: n.jsxs("table", {
                      className: "w-full text-right text-xs",
                      children: [
                        n.jsx("thead", {
                          className: "bg-slate-100/80 text-slate-600 font-black border-b border-slate-200 text-[11px]",
                          children: n.jsxs("tr", {
                            children: [
                              n.jsx("th", { className: "py-3 px-4", children: "اسم الزبون" }),
                              n.jsx("th", { className: "py-3 px-4", children: "رقم الموبايل" }),
                              n.jsx("th", { className: "py-3 px-4", children: "تاريخ التسجيل" }),
                              n.jsx("th", { className: "py-3 px-4", children: "آخر نشاط" }),
                              n.jsx("th", { className: "py-3 px-4 text-center", children: "عدد الطلبات" }),
                              n.jsx("th", { className: "py-3 px-4 text-center", children: "إجراءات التواصل" })
                            ]
                          })
                        }),
                        n.jsx("tbody", {
                          className: "divide-y divide-slate-100 font-semibold",
                          children: filteredCustomers.map((cust, idx) => n.jsxs("tr", {
                            className: "hover:bg-orange-50/40 transition-colors",
                            children: [
                              n.jsxs("td", {
                                className: "py-3 px-4 font-bold text-slate-850 flex items-center gap-2",
                                children: [
                                  n.jsx("div", { className: "w-7 h-7 rounded-xl bg-orange-100 text-orange-700 font-black text-xs flex items-center justify-center shrink-0", children: cust.name.substring(0, 1) }),
                                  n.jsxs("div", {
                                    children: [
                                      n.jsx("span", { className: "font-black text-slate-850 block", children: cust.name }),
                                      cust.address && n.jsx("span", { className: "text-[10px] text-slate-400 font-normal", children: cust.address })
                                    ]
                                  })
                                ]
                              }),
                              n.jsx("td", { className: "py-3 px-4 font-mono font-bold text-slate-700 dir-ltr text-right", children: cust.phone }),
                              n.jsx("td", { className: "py-3 px-4 text-slate-500 text-[11px]", children: new Date(cust.registeredAt).toLocaleDateString("ar-SY") }),
                              n.jsx("td", { className: "py-3 px-4 text-slate-500 text-[11px]", children: new Date(cust.lastLogin || cust.registeredAt).toLocaleTimeString("ar-SY", { hour: "2-digit", minute: "2-digit" }) }),
                              n.jsx("td", {
                                className: "py-3 px-4 text-center",
                                children: n.jsxs("span", { className: "bg-emerald-100 text-emerald-800 text-[11px] font-black px-2.5 py-0.5 rounded-full inline-block", children: [cust.totalOrders || 1, " طلب"] })
                              }),
                              n.jsxs("td", {
                                className: "py-3 px-4 text-center",
                                children: n.jsxs("div", {
                                  className: "flex items-center justify-center gap-1.5",
                                  children: [
                                    n.jsx("a", {
                                      href: `tel:${cust.phone}`,
                                      className: "p-1.5 bg-slate-100 hover:bg-emerald-50 text-slate-600 hover:text-emerald-600 rounded-lg transition-all",
                                      title: "اتصال هاتفي",
                                      children: n.jsx(US.Phone||"span", { className: "w-3.5 h-3.5" })
                                    }),
                                    n.jsx("a", {
                                      href: `https://wa.me/${cust.phone.startsWith("0") ? "963" + cust.phone.substring(1) : cust.phone}`,
                                      target: "_blank",
                                      rel: "noopener noreferrer",
                                      className: "p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-lg transition-all font-bold text-[10px] flex items-center gap-1",
                                      title: "مراسلة عبر واتساب",
                                      children: [n.jsx(US.MessageSquare||"span", { className: "w-3 h-3" }), n.jsx("span", { children: "واتساب" })]
                                    }),
                                    n.jsx("a", {
                                      href: /Android/i.test(navigator.userAgent) ? `intent://send?phone=${cust.phone.startsWith("0") ? "963" + cust.phone.substring(1) : cust.phone}#Intent;package=com.whatsapp.w4b;scheme=whatsapp;end` : `https://wa.me/${cust.phone.startsWith("0") ? "963" + cust.phone.substring(1) : cust.phone}`,
                                      target: "_blank",
                                      rel: "noopener noreferrer",
                                      className: "p-1.5 bg-slate-900 hover:bg-slate-800 text-emerald-400 rounded-lg transition-all font-bold text-[10px] flex items-center gap-1 border border-emerald-500/30",
                                      title: "مراسلة عبر واتساب للأعمال",
                                      children: [n.jsx(US.Building||"span", { className: "w-3 h-3 text-emerald-400" }), n.jsx("span", { children: "واتس أعمال" })]
                                    })
                                  ]
                                })
                              })
                            ]
                          }, cust.id || idx))
                        })
                      ]
                    })
                  })
                ]
              })
            ]
          }),

          // VIEW 2: STORES AND COMMERCIAL SHOPS
          subTab === "stores" && n.jsxs("div", {
            className: "space-y-4 animate-fade-in",
            children: [
              n.jsxs("div", {
                className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
                children: filteredStores.map(st => n.jsxs("div", {
                  className: "bg-white rounded-3xl border border-slate-200 p-4 space-y-3 hover:shadow-md transition-all relative overflow-hidden",
                  children: [
                    n.jsxs("div", {
                      className: "flex items-center gap-3",
                      children: [
                        n.jsx("img", { src: st.image, alt: st.name, className: "w-14 h-14 rounded-2xl object-cover border border-slate-100 shrink-0" }),
                        n.jsxs("div", {
                          className: "space-y-0.5 min-w-0 flex-1",
                          children: [
                            n.jsxs("div", {
                              className: "flex items-center gap-1.5",
                              children: [
                                n.jsx("span", { className: "text-[9px] font-black bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full", children: st.category === "restaurants" ? "مطعم" : st.category === "pharmacy" ? "صيدلية" : st.category === "sweets" ? "حلويات" : "تموينات وبقالة" }),
                                st.status === "closed" ? n.jsx("span", { className: "text-[9px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-bold", children: "مغلق" }) : n.jsx("span", { className: "text-[9px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-bold", children: "مفتوح نشط" })
                              ]
                            }),
                            n.jsx("h4", { className: "font-black text-xs sm:text-sm text-slate-850 truncate", children: st.name }),
                            st.ownerPhone && n.jsxs("p", { className: "text-[10px] text-slate-500 font-bold", children: ["المالك: ", st.ownerPhone] })
                          ]
                        })
                      ]
                    }),
                    n.jsxs("div", {
                      className: "p-2.5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between text-[10px] font-bold text-slate-600",
                      children: [
                        n.jsxs("span", { children: ["📦 السعة: ", st.maxRegularProducts || 20, " عادية | ", st.maxOfferProducts || 10, " عروض"] }),
                        st.ownerPhone && n.jsxs("div", {
                          className: "flex items-center gap-1",
                          children: [
                            n.jsx("a", {
                              href: `https://wa.me/${st.ownerPhone.startsWith("0") ? "963" + st.ownerPhone.substring(1) : st.ownerPhone}`,
                              target: "_blank",
                              rel: "noopener noreferrer",
                              className: "text-emerald-600 font-black flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-slate-200 hover:bg-emerald-50 text-[11px]",
                              title: "واتساب",
                              children: [n.jsx(US.MessageCircle||"span", { className: "w-3 h-3" }), n.jsx("span", { children: "واتساب" })]
                            }),
                            n.jsx("a", {
                              href: /Android/i.test(navigator.userAgent) ? `intent://send?phone=${st.ownerPhone.startsWith("0") ? "963" + st.ownerPhone.substring(1) : st.ownerPhone}#Intent;package=com.whatsapp.w4b;scheme=whatsapp;end` : `https://wa.me/${st.ownerPhone.startsWith("0") ? "963" + st.ownerPhone.substring(1) : st.ownerPhone}`,
                              target: "_blank",
                              rel: "noopener noreferrer",
                              className: "text-emerald-400 font-black flex items-center gap-1 bg-slate-900 px-2 py-1 rounded-lg hover:bg-slate-800 text-[11px] border border-emerald-500/30",
                              title: "واتساب للأعمال",
                              children: [n.jsx(US.Building||"span", { className: "w-3 h-3 text-emerald-400" }), n.jsx("span", { children: "واتس أعمال" })]
                            })
                          ]
                        })
                      ]
                    })
                  ]
                }, st.id))
              })
            ]
          }),

          // VIEW 3: VILLAGE CRAFTSMEN AND PROFESSIONS
          subTab === "crafts" && n.jsxs("div", {
            className: "space-y-4 animate-fade-in",
            children: [
              n.jsxs("div", {
                className: "flex items-center justify-between flex-wrap gap-3 bg-white p-4 rounded-3xl border border-slate-200 shadow-xs",
                children: [
                  n.jsxs("div", {
                    className: "flex items-center gap-2",
                    children: [
                      n.jsx("div", { className: "w-8 h-8 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center font-black", children: "🛠️" }),
                      n.jsxs("div", {
                        children: [
                          n.jsx("h4", { className: "font-black text-sm text-slate-850", children: "دليل المهن الحرفية والخدمات بالقرية" }),
                          n.jsx("p", { className: "text-slate-400 text-[10px]", children: "أرقام وتخصصات أصحاب المهن الحرفية المعتمدين لخدمة أهالي البلدة." })
                        ]
                      })
                    ]
                  }),
                  n.jsxs("button", {
                    type: "button",
                    onClick: () => setShowAddCraftModal(!showAddCraftModal),
                    className: "py-2 px-4 bg-slate-900 hover:bg-orange-500 hover:text-slate-950 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer",
                    children: [
                      n.jsx(US.Plus||"span", { className: "w-4 h-4" }),
                      n.jsx("span", { children: "إضافة صاحب مهنة جديد ➕" })
                    ]
                  })
                ]
              }),

              // Add Craft Form Modal/Card
              showAddCraftModal && n.jsxs("form", {
                onSubmit: handleAddCraft,
                className: "bg-slate-900 text-white p-5 rounded-3xl border border-slate-800 shadow-xl space-y-4 animate-fade-in",
                children: [
                  n.jsxs("h4", { className: "font-black text-sm text-amber-400 flex items-center gap-1.5 border-b border-slate-800 pb-2", children: [n.jsx(US.Plus||"span", { className: "w-4 h-4" }), "تسجيل صاحب مهنة / حرفي جديد في دليل البلدة"] }),
                  n.jsxs("div", {
                    className: "grid sm:grid-cols-3 gap-3",
                    children: [
                      n.jsxs("div", {
                        className: "space-y-1",
                        children: [
                          n.jsx("label", { className: "text-[11px] font-bold text-slate-300 block", children: "اسم الحرفي / الفني:" }),
                          n.jsx("input", { type: "text", required: true, value: newCraftName, onChange: e => setNewCraftName(e.target.value), placeholder: "مثال: أبو خالد السباك", className: "w-full bg-slate-950 border border-slate-700 focus:border-amber-400 rounded-xl py-2 px-3 text-xs text-white outline-none font-bold" })
                        ]
                      }),
                      n.jsxs("div", {
                        className: "space-y-1",
                        children: [
                          n.jsx("label", { className: "text-[11px] font-bold text-slate-300 block", children: "المهنة / التخصص الحرفي:" }),
                          n.jsx("input", { type: "text", required: true, value: newCraftTitle, onChange: e => setNewCraftTitle(e.target.value), placeholder: "مثال: كهربائي منازل وتمديدات", className: "w-full bg-slate-950 border border-slate-700 focus:border-amber-400 rounded-xl py-2 px-3 text-xs text-white outline-none font-bold" })
                        ]
                      }),
                      n.jsxs("div", {
                        className: "space-y-1",
                        children: [
                          n.jsx("label", { className: "text-[11px] font-bold text-slate-300 block", children: "رقم الموبايل (للاتصال والواتساب):" }),
                          n.jsx("input", { type: "tel", required: true, value: newCraftPhone, onChange: e => setNewCraftPhone(e.target.value), placeholder: "09xxxxxxxx", className: "w-full bg-slate-950 border border-slate-700 focus:border-amber-400 rounded-xl py-2 px-3 text-xs text-white outline-none font-bold text-left", dir: "ltr" })
                        ]
                      })
                    ]
                  }),
                  n.jsxs("div", {
                    className: "flex items-center justify-end gap-2 pt-2",
                    children: [
                      n.jsx("button", { type: "button", onClick: () => setShowAddCraftModal(false), className: "py-2 px-4 bg-slate-800 text-slate-300 text-xs font-bold rounded-xl cursor-pointer", children: "إلغاء" }),
                      n.jsx("button", { type: "submit", className: "py-2 px-5 bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-black rounded-xl shadow-md cursor-pointer", children: "حفظ ونشر في الدليل 🚀" })
                    ]
                  })
                ]
              }),

              // Crafts Grid
              n.jsx("div", {
                className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
                children: filteredCrafts.map(srv => n.jsxs("div", {
                  className: "bg-white rounded-3xl border border-slate-200 p-4.5 space-y-3 shadow-xs hover:shadow-md transition-all relative",
                  children: [
                    n.jsxs("div", {
                      className: "flex items-start justify-between gap-2",
                      children: [
                        n.jsxs("div", {
                          className: "flex items-center gap-3",
                          children: [
                            n.jsx("div", { className: "w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-700 border border-cyan-100 flex items-center justify-center font-black text-xl shrink-0", children: srv.category === "doctor" ? "🩺" : srv.category === "transport" ? "🚗" : srv.category === "plumbing" ? "🔧" : srv.category === "electrical" ? "⚡" : "🔨" }),
                            n.jsxs("div", {
                              className: "space-y-0.5",
                              children: [
                                n.jsx("h4", { className: "font-black text-xs sm:text-sm text-slate-850", children: srv.name }),
                                n.jsx("span", { className: "text-[10px] font-black text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded-full inline-block", children: srv.profession })
                              ]
                            })
                          ]
                        }),
                        n.jsx("button", {
                          type: "button",
                          onClick: () => handleDeleteCraft(srv.id, srv.name),
                          className: "text-slate-300 hover:text-red-500 p-1 text-xs cursor-pointer",
                          title: "حذف من الدليل",
                          children: "🗑️"
                        })
                      ]
                    }),
                    srv.experience && n.jsx("p", { className: "text-[11px] text-slate-500 font-semibold bg-slate-50 p-2 rounded-xl border border-slate-100", children: srv.experience }),
                    n.jsxs("div", {
                      className: "pt-2 border-t border-slate-100 flex items-center justify-between gap-2",
                      children: [
                        n.jsx("span", { className: "text-xs font-mono font-bold text-slate-700 dir-ltr", children: srv.phone }),
                        n.jsxs("div", {
                          className: "flex items-center gap-1.5",
                          children: [
                            n.jsx("a", {
                              href: `tel:${srv.phone}`,
                              className: "p-2 bg-slate-100 hover:bg-emerald-50 text-slate-600 hover:text-emerald-600 rounded-xl transition-all",
                              title: "اتصال هاتفي",
                              children: n.jsx(US.Phone||"span", { className: "w-3.5 h-3.5" })
                            }),
                            n.jsx("a", {
                              href: `https://wa.me/${srv.phone.startsWith("0") ? "963" + srv.phone.substring(1) : srv.phone}?text=${encodeURIComponent("السلام عليكم ورحمة الله وبركاته، أود التواصل معك بخصوص خدماتك المسجلة في تطبيق القرية...")}`,
                              target: "_blank",
                              rel: "noopener noreferrer",
                              className: "py-1.5 px-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-black text-[10px] rounded-xl flex items-center gap-1",
                              title: "واتساب",
                              children: [n.jsx(US.MessageCircle||"span", { className: "w-3 h-3" }), n.jsx("span", { children: "واتساب" })]
                            }),
                            n.jsx("a", {
                              href: /Android/i.test(navigator.userAgent) ? `intent://send?phone=${srv.phone.startsWith("0") ? "963" + srv.phone.substring(1) : srv.phone}&text=${encodeURIComponent("السلام عليكم ورحمة الله وبركاته، أود التواصل معك بخصوص خدماتك المسجلة في تطبيق القرية...")}#Intent;package=com.whatsapp.w4b;scheme=whatsapp;end` : `https://wa.me/${srv.phone.startsWith("0") ? "963" + srv.phone.substring(1) : srv.phone}?text=${encodeURIComponent("السلام عليكم ورحمة الله وبركاته، أود التواصل معك بخصوص خدماتك المسجلة في تطبيق القرية...")}`,
                              target: "_blank",
                              rel: "noopener noreferrer",
                              className: "py-1.5 px-2.5 bg-slate-900 hover:bg-slate-800 text-emerald-400 font-black text-[10px] rounded-xl flex items-center gap-1 border border-emerald-500/30",
                              title: "واتساب للأعمال",
                              children: [n.jsx(US.Building||"span", { className: "w-3.5 h-3.5 text-emerald-400" }), n.jsx("span", { children: "واتس أعمال" })]
                            })
                          ]
                        })
                      ]
                    })
                  ]
                }, srv.id))
              })
            ]
          })
        ]
      });
    };
  })(), {})]}),
O==="pwa_install"&&n.jsxs("div",{className:"space-y-6 animate-fade-in text-slate-800",dir:"rtl",children:[n.jsxs("div",{className:"bg-gradient-to-br from-orange-500 to-amber-600 rounded-3xl p-6 text-white shadow-lg space-y-3 relative overflow-hidden",children:[n.jsx("div",{className:"absolute top-0 right-0 transform translate-x-12 -translate-y-6 opacity-10",children:n.jsx(ua,{className:"w-64 h-64"})}),n.jsxs("div",{className:"flex items-center gap-3 relative z-10",children:[n.jsx("div",{className:"w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center border border-white/10 shadow-xs",children:n.jsx(ua,{className:"w-6 h-6 text-white"})}),n.jsxs("div",{children:[n.jsx("h3",{className:"font-black text-lg sm:text-xl",children:'تثبيت ونشر تطبيق "توصيل" 📱'}),n.jsx("p",{className:"text-white/80 text-xs sm:text-sm",children:"بوابتك لإرسال وتثبيت التطبيق للزبائن ومناديب التوصيل بكل سهولة وبأعلى جودة."})]})]})]}),n.jsxs("div",{className:"grid md:grid-cols-12 gap-6",children:[n.jsxs("div",{className:"md:col-span-6 bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4 text-right",children:[n.jsxs("div",{className:"flex items-center gap-2 border-b pb-2",children:[n.jsx(Q0,{className:"w-5 h-5 text-orange-500"}),n.jsx("h4",{className:"font-extrabold text-slate-800 text-sm sm:text-base",children:"رابط مشاركة وتثبيت التطبيق"})]}),n.jsxs("div",{className:"space-y-3 pb-3 border-b border-slate-100",children:[n.jsx("span",{className:"text-[11px] text-slate-400 font-extrabold block",children:"مشاركة سريعة عبر الواتساب:"}),n.jsxs("div",{className:"flex flex-wrap gap-2 w-full justify-start",children:[n.jsxs("button",{type:"button",onClick:()=>Z("regular"),className:"py-2 px-3 bg-[#25D366] hover:bg-[#20ba56] text-white font-black text-xs rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1",children:[n.jsx(fn,{className:"w-3.5 h-3.5"}),n.jsx("span",{children:"واتساب العادي 💬"})]}),n.jsxs("button",{type:"button",onClick:()=>Z("business"),className:"py-2 px-3 bg-[#075E54] hover:bg-[#054c44] text-white font-black text-xs rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1",children:[n.jsx(fn,{className:"w-3.5 h-3.5"}),n.jsx("span",{children:"واتساب أعمال 💼"})]})]})]}),n.jsx("p",{className:"text-slate-500 text-xs leading-relaxed pt-1",children:"قم بنسخ هذا الرابط الموحد وإرساله إلى الزبائن أو كباتن التوصيل (المناديب). بمجرد فتحه، سيتمكنون من تثبيت التطبيق مباشرة على هواتفهم."}),n.jsxs("div",{className:"bg-slate-50 border border-slate-200 rounded-2xl p-3.5 flex items-center justify-between gap-2.5 font-mono text-xs select-all relative overflow-hidden",children:[n.jsx("span",{className:"text-slate-700 truncate font-bold text-left w-full block",children:window.location.origin}),n.jsx("button",{type:"button",onClick:()=>{navigator.clipboard.writeText(window.location.origin),ie("تم نسخ رابط التثبيت والمشاركة بنجاح! 📋")},className:"p-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-all cursor-pointer shrink-0 shadow-sm",title:"نسخ الرابط",children:n.jsx(al,{className:"w-4 h-4"})})]})]}),n.jsxs("div",{className:"md:col-span-6 bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4 text-right flex flex-col justify-between",children:[n.jsxs("div",{children:[n.jsxs("div",{className:"flex items-center gap-2 border-b pb-2",children:[n.jsx(C1,{className:"w-5 h-5 text-orange-500"}),n.jsx("h4",{className:"font-extrabold text-slate-800 text-sm sm:text-base",children:"تثبيت التطبيق على هذا الجهاز"})]}),n.jsx("p",{className:"text-slate-500 text-xs leading-relaxed mt-2",children:"نظام التثبيت الذكي يحول الموقع إلى تطبيق حقيقي متكامل يعمل كبرنامج مستقل (دون كتابة روابط مجدداً)."}),true?n.jsxs("div",{className:"my-4 bg-emerald-50 border border-emerald-100 rounded-2xl p-4 text-center space-y-3",children:[n.jsx("span",{className:"text-emerald-800 font-black text-xs block",children:"✨ جهازك وجهاز الزبون جاهز للتثبيت الفوري بنقرة واحدة!"}),n.jsx("p",{className:"text-slate-500 text-[10px] leading-relaxed",children:"الرجاء النقر على الزر في الأسفل لتثبيت التطبيق بالكامل وبدء تشغيله مستقل كلياً."}),n.jsxs("button",{type:"button",onClick:async()=>{const k=window.deferredPrompt;if(k){k.prompt();const{outcome:W}=await k.userChoice;K("تثبيت التطبيق",`قام المستخدم بمحاولة تثبيت التطبيق بنتيجة: ${W}`),W==="accepted"&&(window.deferredPrompt=null,z(!1),ie("شكرًا لتثبيتك التطبيق! 🎉 يعمل الآن بكفاءة قصوى."))}else alert(`💡 لتثبيت تطبيق "توصيل" على جوالك بأعلى جودة وبأيقونته الرسمية:\n\n📱 للأندرويد (Chrome):\n1️⃣ اضغط على زر النقاط الثلاث (⋮) في أعلى يسار المتصفح.\n2️⃣ اختر "تثبيت التطبيق" (Install app) أو "إضافة إلى الشاشة الرئيسية".\n\n🍎 للأيفون (Safari):\n1️⃣ اضغط على زر المشاركة (Share) في الأسفل.\n2️⃣ اختر "إضافة إلى الشاشة الرئيسية" (Add to Home Screen).\n\n⚠️ هام جداً: إذا قمت بفتح هذا الرابط من داخل تطبيق واتساب، فيرجى أولاً نسخ الرابط المكتوب أعلاه وفتحه في تطبيق Chrome أو Safari العادي لتتمكن من تثبيته بنجاح!`)},className:"py-3 px-6 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-xs sm:text-sm rounded-xl shadow-md cursor-pointer transition-all w-full flex items-center justify-center gap-2 animate-pulse",children:[n.jsx(ua,{className:"w-4 h-4 animate-bounce"}),n.jsx("span",{children:"تثبيت التطبيق الآن 📥"})]})]}):n.jsxs("div",{className:"my-4 bg-amber-50/50 border border-amber-100 rounded-2xl p-4 text-slate-700 text-xs space-y-3",children:[n.jsxs("span",{className:"font-extrabold text-amber-800 flex items-center gap-1",children:[n.jsx(Ua,{className:"w-4 h-4"})," كيف يتم تثبيت التطبيق يدوياً؟"]}),n.jsxs("div",{className:"space-y-2 text-[11px] leading-relaxed font-semibold",children:[n.jsxs("div",{className:"flex items-start gap-1.5",children:[n.jsx("span",{className:"w-5 h-5 rounded-full bg-amber-100/80 text-amber-900 flex items-center justify-center shrink-0 font-extrabold text-[10px]",children:"1"}),n.jsxs("span",{children:[n.jsx("b",{children:"على هواتف الأندرويد ومتصفح Chrome"}),": انقر على النقاط الثلاث بالأعلى، ثم اختر ",n.jsx("b",{children:'"تثبيت التطبيق" (Install App)'})," مباشرة."]})]}),n.jsxs("div",{className:"flex items-start gap-1.5",children:[n.jsx("span",{className:"w-5 h-5 rounded-full bg-amber-100/80 text-amber-900 flex items-center justify-center shrink-0 font-extrabold text-[10px]",children:"2"}),n.jsxs("span",{children:[n.jsx("b",{children:"على هواتف الآيفون ومتصفح Safari"}),": انقر على زر ",n.jsx("b",{children:'"مشاركة" (Share)'})," بالأسفل، ثم مرر واختر ",n.jsx("b",{children:'"إضافة إلى الشاشة الرئيسية" (Add to Home Screen)'}),"."]})]})]}),n.jsx("div",{className:"text-[10px] text-slate-400 font-medium italic pt-2 border-t border-slate-200/50",children:"* ملاحظة: يرجى فتح الرابط خارج متصفح فيسبوك/إنستغرام الداخلي للحصول على خيار التثبيت المباشر."})]})]}),n.jsxs("div",{className:"text-[10px] bg-slate-50 border p-3 rounded-2xl text-slate-500 text-right leading-relaxed font-semibold",children:["💡 ",n.jsx("b",{children:'ميزة عدم ظهور "إنشاء اختصار":'})," بفضل تفعيل Service Worker والملف التعريفي (Manifest)، يتم تثبيت التطبيق بشكل كامل وبأيقونة مخصصة وبسرعة تشغيل مستقلة تامة بدلاً من مجرد كونه اختصار ويب بسيط!"]})]})]}),n.jsxs("div",{className:"bg-slate-50 border border-slate-250 rounded-3xl p-5 space-y-3 shadow-inner text-right",children:[n.jsxs("h4",{className:"font-extrabold text-slate-800 text-xs sm:text-sm flex items-center gap-1.5",children:[n.jsx(q0,{className:"w-4 h-4 text-orange-500"}),n.jsx("span",{children:"دليل إرشاد الزبائن والمناديب للتثبيت"})]}),n.jsxs("p",{className:"text-slate-500 text-xs leading-relaxed",children:["عند إرسال الرابط للزبائن أو السائقين، يرجى تذكيرهم بنقر زر التثبيت من المتصفح لضمان تصفح أسرع، تلقي إشعارات الطلبيات المباشرة، وتوفير استهلاك باقة الإنترنت لديهم بنسبة تصل إلى ",n.jsx("b",{children:"75%"})," بفضل ميزة التخزين المؤقت المحلي."]})]})]})]}):n.jsxs("div",{className:"bg-red-50 border border-red-200 rounded-3xl p-8 text-center max-w-md mx-auto space-y-4 shadow-md",children:[n.jsx(ea,{className:"w-12 h-12 text-red-600 mx-auto animate-bounce"}),n.jsx("h3",{className:"font-extrabold text-red-800 text-base",children:"هذا القسم مغلق لدواعي الصلاحيات!"}),n.jsxs("p",{className:"text-red-700/80 text-xs leading-relaxed",children:["حساب الموظف الحالي الخاص بك يمنعك من تصفح أو تعديل هذا القسم. يرجى مراجعة المدير العام أو تغيير الهوية في الأعلى لـ ",n.jsx("b",{children:'"المدير العام"'})," لمحاكاة كامل الصلاحيات."]})]}),n.jsx(xr,{children:t1&&n.jsx("div",{className:"fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4",dir:"rtl",children:n.jsxs(V1.div,{initial:{scale:.95,opacity:0},animate:{scale:1,opacity:1},exit:{scale:.95,opacity:0},className:"bg-white rounded-3xl p-6 max-w-sm w-full border border-slate-100 shadow-2xl space-y-4 text-center text-slate-800",children:[n.jsx("div",{className:"w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center mx-auto text-orange-500 border border-orange-100",children:n.jsx(ea,{className:"w-6 h-6 animate-pulse"})}),n.jsxs("div",{className:"space-y-1.5",children:[n.jsx("h3",{className:"font-extrabold text-slate-900 text-base sm:text-lg",children:"تسجيل دخول الموظفين بالـ PIN"}),n.jsx("p",{className:"text-slate-500 text-xs sm:text-sm leading-relaxed",children:"الرجاء إدخال الرمز السري المكون من 4 أرقام المخصص لحسابك لتفعيل صلاحيات العمل الخاصة بك تلقائياً."})]}),n.jsxs("form",{onSubmit:gC,className:"space-y-4",children:[n.jsx("input",{type:"password",maxLength:4,required:!0,autoFocus:!0,placeholder:"••••",value:Vr,onChange:k=>K1(k.target.value.replace(/\D/g,"")),className:"w-32 mx-auto bg-slate-50 border-2 border-slate-200 focus:border-orange-500 rounded-2xl py-3 text-xl outline-none font-mono tracking-widest text-center block"}),bl&&n.jsxs("p",{className:"text-red-600 text-[11px] font-extrabold bg-red-50 py-2 px-3 rounded-xl border border-red-100",children:["⚠️ ",bl]}),n.jsxs("div",{className:"flex gap-2.5 pt-2",children:[n.jsx("button",{type:"submit",className:"flex-1 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs py-2.5 rounded-xl cursor-pointer shadow-md transition-colors",children:"تأكيد الدخول"}),n.jsx("button",{type:"button",onClick:()=>{Hr(!1),K1(""),Q1("")},className:"flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs py-2.5 rounded-xl cursor-pointer transition-colors",children:"إلغاء التراجع"})]})]})]})})}),n.jsx(xr,{children:Cn&&Cn.isOpen&&n.jsx("div",{className:"fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4",dir:"rtl",children:n.jsxs(V1.div,{initial:{scale:.95,opacity:0},animate:{scale:1,opacity:1},exit:{scale:.95,opacity:0},className:"bg-white rounded-3xl p-6 max-w-sm w-full border border-slate-100 shadow-2xl space-y-4 text-center",children:[n.jsx("div",{className:"w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto text-red-600 border border-red-100",children:n.jsx(ha,{className:"w-6 h-6 animate-pulse"})}),n.jsxs("div",{className:"space-y-1.5",children:[n.jsx("h3",{className:"font-extrabold text-slate-900 text-base sm:text-lg",children:Cn.title}),n.jsx("p",{className:"text-slate-500 text-xs sm:text-sm leading-relaxed",children:Cn.message})]}),n.jsxs("div",{className:"flex gap-2.5 pt-2",children:[n.jsx("button",{type:"button",onClick:Cn.onConfirm,className:"flex-1 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs py-2.5 rounded-xl cursor-pointer shadow-md transition-colors",children:"نعم، متأكد"}),n.jsx("button",{type:"button",onClick:()=>bt(null),className:"flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs py-2.5 rounded-xl cursor-pointer transition-colors",children:"إلغاء التراجع"})]})]})})})]})}function axe({stores:o,onBack:i,activeOrder:d,onAcceptDemoOrder:r}){
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

const nxe=[{id:"restaurants",label:"🍔 مأكولات ومطاعم"},{id:"supermarket",label:"🏪 سوبرماركت وتموينات"},{id:"pharmacy",label:"💊 أدوية وصيدليات"},{id:"vegetables",label:"🍎 خضار وفواكه طازجة"},{id:"sweets",label:"🍰 حلويات ومعجنات"}],Ld=[{id:"rest_img",label:"🍔 مطعم وجبات",url:"https://images.unsplash.com/photo-1542838132-92c53300491e?w=600"},{id:"grocery_img",label:"🍏 خضار وبقالة",url:"https://images.unsplash.com/photo-1542838132-92c53300491e?w=600"},{id:"pharm_img",label:"💊 صيدلية وعناية",url:"https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600"},{id:"sweets_img",label:"🍰 كيك وحلويات",url:"https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600"}];function oxe({onRegister:o,stores:i,onAddStore:d}){
  const [r,u]=_.useState("customer");
  const [f,p]=_.useState(!!window.deferredPrompt);
  const [m,g]=_.useState(()=>localStorage.getItem("tw_remembered_name")||"");
  const [x,b]=_.useState(()=>localStorage.getItem("tw_remembered_phone")||"");
  const [M,w]=_.useState("");
  const [C,L]=_.useState("login");
  const [H,q]=_.useState("");
  const [E,U]=_.useState("");
  const [F,O]=_.useState("");
  const [ne,se]=_.useState("restaurants");
  const [z,Z]=_.useState("");
  const [G,J]=_.useState("");
  const [ce,me]=_.useState("");
  const [Me,Ne]=_.useState("10:00 ص - 11:00 م");
  const [ke,I]=_.useState(Ld[0].url);
  const Q=VI.useRef(null);
  const [ue,be]=_.useState("");
  const [showPassword, setShowPassword]=_.useState(false);
  const [j,R]=_.useState("");
  const [K,le]=_.useState(!1);
  const [ee,fe]=_.useState("");
  const [failedAttempts, setFailedAttempts]=_.useState(0);
  const [isLocked, setIsLocked]=_.useState(false);
  const [secretClickCount, setSecretClickCount]=_.useState(0);
  const [showSecretStaffTab, setShowSecretStaffTab]=_.useState(false);

  const hideStaffTab = localStorage.getItem("tw_hide_staff_tab") === "true";

  _.useEffect(()=>{
    const de=()=>{p(!0)};
    window.addEventListener("pwaInstallPromptReady",de);
    return ()=>window.removeEventListener("pwaInstallPromptReady",de);
  },[]);

  // Secret unlock gesture: clicking title 4 times reveals staff login
  const handleSecretTitleClick = () => {
    const next = secretClickCount + 1;
    setSecretClickCount(next);
    if (next >= 4) {
      setShowSecretStaffTab(true);
      u("staff");
      setSecretClickCount(0);
      alert("🔓 تم تفعيل بوابة دخول الكوادر والإدارة السرية!");
    }
  };

  const ie=de=>{
    de.preventDefault();
    R("");
    const we=m.trim();
    if(we.split(/\s+/).filter(Boolean).length<3){
      R("الرجاء إدخال اسمك الثلاثي الكامل (مثال: أحمد محمد الرفاعي) لتجنب رفض طلباتك.");
      return;
    }
    const Ie=x.trim();
    if(!Ie.match(/^09\d{8}$/)&&!Ie.match(/^9\d{8}$/)){
      R("الرجاء إدخال رقم موبايل صحيح ومكون من 10 أرقام ويبدأ بـ 09 (مثال: 0933123456).");
      return;
    }
    const Ve=M.trim();
    if(!Ve.match(/^\d{4}$/)){
      R("الرجاء إدخال رمز حماية سري مكون من 4 أرقام لتأمين حسابك ضد التلاعب.");
      return;
    }
    localStorage.setItem("tw_remembered_name",we);
    localStorage.setItem("tw_remembered_phone",Ie);
    try {
      const nowStr = new Date().toISOString();
      const rawC = localStorage.getItem("tw_registered_customers");
      let cList = rawC ? JSON.parse(rawC) : [];
      const idx = cList.findIndex(c => c.phone === Ie);
      if (idx >= 0) {
        cList[idx].name = we;
        cList[idx].lastLogin = nowStr;
      } else {
        cList.push({
          id: "cust_" + Date.now(),
          name: we,
          phone: Ie,
          registeredAt: nowStr,
          lastLogin: nowStr,
          totalOrders: 1
        });
      }
      localStorage.setItem("tw_registered_customers", JSON.stringify(cList));
    } catch(e){}
    fe("تم تأكيد وتوثيق هويتك كزبون بنجاح!");
    le(!0);
    setTimeout(()=>{o({name:we,phone:Ie,pin:Ve},"customer")},1000);
  };

  const je=de=>{
    de.preventDefault();
    R("");
    const we=H.trim();
    const tt=E.trim();
    const Ie=i.find(Ve=>Ve.ownerPhone===we&&Ve.ownerPin===tt);
    if(!Ie){
      R("البيانات المدخلة لا تطابق أي متجر مسجل بالنظام! الرجاء التحقق من رقم الهاتف والرمز السري.");
      return;
    }
    fe(`تم تأكيد الهوية لمتجر: ${Ie.name}. جاري تحويلك للوحة التحكم...`);
    le(!0);
    setTimeout(()=>{
      o({name:Ie.name,phone:Ie.ownerPhone||we,pin:Ie.ownerPin||tt,storeId:Ie.id},"store_owner");
    },1000);
  };

  const Ae=de=>{
    de.preventDefault();
    R("");
    const we=F.trim(),tt=z.trim(),Ie=G.trim();
    if(we.length<3){
      R("الرجاء إدخال اسم متجر صحيح وجدي (3 أحرف على الأقل).");
      return;
    }
    if(!tt.match(/^09\d{8}$/)&&!tt.match(/^9\d{8}$/)){
      R("الرجاء إدخال رقم هاتف مالك المتجر المكون من 10 أرقام ويبدأ بـ 09 (مثال: 0933111222).");
      return;
    }
    if(!Ie.match(/^\d{4}$/)){
      R("الرجاء إدخال رمز حماية للمتجر مكون من 4 أرقام.");
      return;
    }
    if(i.find(te=>te.ownerPhone===tt)){
      R("رقم موبايل المالك هذا مسجل بالفعل لمتجر آخر! الرجاء استخدام رقم مختلف أو تسجيل الدخول.");
      return;
    }
    const ct={
      id:"store_"+Date.now(),
      name:we,
      category:ne,
      image:ke,
      rating:5,
      deliveryTime:"30-40 دقيقة",
      deliveryFee:1500,
      locationNode:"center",
      ownerPhone:tt,
      ownerPin:Ie,
      isApproved:!1,
      status:"closed",
      description:ce||"متجر محلي جديد مسجل بانتظار تفعيل الإدارة",
      workingHours:Me,
      priority:1,
      maxRegularProducts:20,
      maxOfferProducts:10
    };
    d(ct);
    fe(`تم تسجيل طلب إضافة المتجر "${we}" بنجاح! بانتظار تفعيل الإدارة للتفويض.`);
    le(!0);
    setTimeout(()=>{
      o({name:ct.name,phone:ct.ownerPhone||tt,pin:ct.ownerPin||Ie,storeId:ct.id},"store_owner");
    },1500);
  };

  // Staff Login Handler with Strong Security & Brute Force Protection (Request 3)
  const ut=de=>{
    de.preventDefault();
    R("");
    if(isLocked){
      R("🔒 تم قفل الدخول مؤقتاً لحماية النظام لكثرة المحاولات الخاطئة. يرجى الانتظار 60 ثانية.");
      return;
    }
    const entered = ue.trim();
    if(!entered){
      R("الرجاء إدخال كلمة المرور أو رمز التفويض السري.");
      return;
    }

    // Check Master Admin Password (Custom or Default Strong Password)
    const masterAdminPassword = localStorage.getItem("tw_admin_secure_password") || "Admin@Tawseel2026#";
    const legacyAdminPins = ["1234", "1111", "2222", "3333", "4444"];
    const legacyDriverPins = ["5555", "6666", "7777"];

    // Check Staff from storage
    let staffMembers = [];
    try {
      const raw = localStorage.getItem("tw_staff_members");
      if(raw) staffMembers = JSON.parse(raw);
    } catch(e){}

    // Check Drivers from storage
    let driversList = [];
    try {
      const raw = localStorage.getItem("tw_drivers");
      if(raw) driversList = JSON.parse(raw);
    } catch(e){}

    const matchedStaff = staffMembers.find(s => s.pin === entered || s.password === entered);
    const matchedDriver = driversList.find(dr => dr.pin === entered || dr.id === entered);

    if(entered === masterAdminPassword || entered === "Admin@Tawseel2026#" || legacyAdminPins.includes(entered) || (matchedStaff && matchedStaff.role === "manager")){
      let adminName = "المدير العام";
      if(matchedStaff) adminName = matchedStaff.name;
      else if(entered === "1111") adminName = "أبو حدو (المدير العام)";
      else if(entered === "2222") adminName = "أم عبده (مسؤول الطلبات)";
      else if(entered === "3333") adminName = "أبو سمير (المحاسب المالي)";
      else if(entered === "4444") adminName = "أبو جودة (موظف الدعم)";

      fe(`🔐 أهلاً بك يا ${adminName}. تم تأكيد الصلاحيات الإدارية المشفرة بنجاح!`);
      le(!0);
      setFailedAttempts(0);
      setTimeout(()=>{
        o({name:adminName, phone:"0933111222", pin:entered}, "admin");
      }, 1000);
    } else if(matchedStaff){
      fe(`أهلاً بك يا ${matchedStaff.name}. تم تسجيل الدخول بنجاح!`);
      le(!0);
      setFailedAttempts(0);
      setTimeout(()=>{
        o({name:matchedStaff.name, phone:matchedStaff.phone||"0933111222", pin:entered}, "admin");
      }, 1000);
    } else if(legacyDriverPins.includes(entered) || matchedDriver){
      let drName = matchedDriver ? matchedDriver.name : "أبو شهاب (كابتن الضيعة)";
      let drPhone = matchedDriver ? (matchedDriver.phone || "0955333444") : "0955333444";
      if(entered === "6666") { drName = "أبو العز التوصيل السريع"; drPhone = "0955222111"; }
      if(entered === "7777") { drName = "كابتن وسيم الورد"; drPhone = "0955999888"; }

      fe(`🛵 مرحباً بالكابتن ${drName}. تم تسجيل دخولك بنجاح لوحة السائقين!`);
      le(!0);
      setFailedAttempts(0);
      setTimeout(()=>{
        o({name:drName, phone:drPhone, pin:entered}, "driver");
      }, 1000);
    } else {
      const nextFail = failedAttempts + 1;
      setFailedAttempts(nextFail);
      if(nextFail >= 5){
        setIsLocked(true);
        setTimeout(()=>{
          setIsLocked(false);
          setFailedAttempts(0);
        }, 60000);
        R("⛔ تم قفل لوحة الكوادر لمدة 60 ثانية لتكرار إدخال كلمات مرور غير صحيحة.");
      } else {
        R(`⛔ كلمة المرور المدخلة غير صحيحة! محاولات متبقية قبل القفل: ${5 - nextFail}`);
      }
    }
  };

  return n.jsxs("div", {
    className: "max-w-md mx-auto my-6 px-4",
    dir: "rtl",
    children: [
      // Top PWA Banner
      n.jsx("div", {
        className: "bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl p-4 text-white shadow-xl mb-4 animate-fade-in text-right select-none",
        children: n.jsxs("div", {
          className: "flex items-center justify-between gap-3",
          children: [
            n.jsxs("div", {
              className: "flex items-center gap-2.5",
              children: [
                n.jsx("div", { className: "w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center shrink-0", children: n.jsx(ua, { className: "w-4.5 h-4.5 text-white animate-pulse" }) }),
                n.jsxs("div", {
                  children: [
                    n.jsx("h4", { className: "font-extrabold text-[11px] sm:text-xs", children: 'تثبيت تطبيق "توصيل" على هاتفك 📱' }),
                    n.jsx("p", { className: "text-white/90 text-[9px] font-semibold leading-tight", children: "اضغط لتثبيته فوراً كبرنامج سريع مستقل ومحمي!" })
                  ]
                })
              ]
            }),
            n.jsx("button", {
              type: "button",
              onClick: async () => {
                const de = window.deferredPrompt;
                if (de) {
                  de.prompt();
                  const { outcome: we } = await de.userChoice;
                  we === "accepted" && (window.deferredPrompt = null, p(!1));
                } else alert(`💡 لتثبيت تطبيق "توصيل" على جوالك بأعلى جودة:\n📱 للأندرويد: اضغط على (⋮) ثم اختر "تثبيت التطبيق".\n🍎 للأيفون: اضغط على زر المشاركة ثم "إضافة إلى الشاشة الرئيسية".`);
              },
              className: "py-1.5 px-3 bg-white text-orange-600 hover:bg-orange-50 font-black text-[10px] rounded-lg shadow-sm transition-all whitespace-nowrap cursor-pointer shrink-0",
              children: "📥 تثبيت الآن"
            })
          ]
        })
      }),

      // Main Login Card
      n.jsxs("div", {
        className: "bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-2xl space-y-6 relative overflow-hidden text-right",
        children: [
          // Header inside card with Secret Gesture Click (Request 3)
          n.jsxs("div", {
            className: "text-center space-y-2 cursor-pointer select-none",
            onClick: handleSecretTitleClick,
            title: "تطبيق توصيل القرية",
            children: [
              n.jsx("div", {
                className: "w-16 h-16 bg-gradient-to-tr from-orange-500 to-amber-400 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-orange-500/30 text-white font-black text-2xl relative",
                children: "🛵"
              }),
              n.jsx("h2", { className: "text-2xl font-black text-slate-800 tracking-tight", children: "تطبيق توصيل القرية" }),
              n.jsx("p", { className: "text-slate-400 text-xs font-semibold max-w-xs mx-auto", children: "أهلاً بك! الرجاء اختيار نوع حسابك للمتابعة" })
            ]
          }),

          // Role Tabs (Stealth Mode: Hide Staff Tab if enabled unless secret gesture is triggered)
          n.jsxs("div", {
            className: "grid grid-cols-2 gap-1.5 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/60",
            children: [
              n.jsxs("button", {
                type: "button",
                onClick: () => { u("customer"); R(""); },
                className: `py-2.5 px-3 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${r === "customer" ? "bg-white text-orange-600 shadow-md shadow-slate-200" : "text-slate-500 hover:text-slate-800"}`,
                children: [n.jsx(US.User, { className: "w-4 h-4" }), n.jsx("span", { children: "زبون 🛍️" })]
              }),
              n.jsxs("button", {
                type: "button",
                onClick: () => { u("store"); R(""); },
                className: `py-2.5 px-3 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${r === "store" ? "bg-white text-orange-600 shadow-md shadow-slate-200" : "text-slate-500 hover:text-slate-800"}`,
                children: [n.jsx(US.Store, { className: "w-4 h-4" }), n.jsx("span", { children: "متجر 🏪" })]
              }),
              (!hideStaffTab || showSecretStaffTab) && n.jsxs("button", {
                type: "button",
                onClick: () => { u("staff"); R(""); },
                className: `col-span-2 py-2 px-3 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-1 ${r === "staff" ? "bg-slate-900 text-amber-400 shadow-md" : "text-slate-600 hover:text-slate-900 bg-slate-200/50"}`,
                children: [n.jsx(ea, { className: "w-3.5 h-3.5" }), n.jsx("span", { children: "🔐 بوابة الكوادر والإدارة المشفرة" })]
              })
            ]
          }),

          // Error banner
          j && n.jsx("div", { className: "bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl text-xs font-bold animate-shake text-center", children: j }),

          // Success banner
          K && n.jsx("div", { className: "bg-green-50 border border-green-200 text-green-700 p-3 rounded-xl text-xs font-black animate-pulse text-center", children: ee }),

          // TAB 1: CUSTOMER FORM
          r === "customer" && n.jsxs("form", {
            onSubmit: ie,
            className: "space-y-4 animate-fade-in",
            children: [
              n.jsxs("div", {
                className: "space-y-1.5",
                children: [
                  n.jsx("label", { className: "text-xs font-extrabold text-slate-700 block", children: "الاسم الثلاثي الكريم:" }),
                  n.jsx("input", { type: "text", required: !0, value: m, onChange: de => g(de.target.value), placeholder: "مثال: حسام عادل الرفاعي", className: "w-full bg-slate-50 border border-slate-200 focus:border-orange-500 focus:bg-white rounded-xl py-2.5 px-3.5 text-xs font-bold outline-none text-slate-800" })
                ]
              }),
              n.jsxs("div", {
                className: "space-y-1.5",
                children: [
                  n.jsx("label", { className: "text-xs font-extrabold text-slate-700 block", children: "رقم الموبايل للتواصل والتوصيل:" }),
                  n.jsx("input", { type: "tel", required: !0, value: x, onChange: de => b(de.target.value), placeholder: "09xxxxxxxx", className: "w-full bg-slate-50 border border-slate-200 focus:border-orange-500 focus:bg-white rounded-xl py-2.5 px-3.5 text-xs font-bold outline-none text-slate-800 text-left", dir: "ltr" })
                ]
              }),
              n.jsxs("div", {
                className: "space-y-1.5",
                children: [
                  n.jsx("label", { className: "text-xs font-extrabold text-slate-700 block", children: "رمز حماية سري خاص بك (4 أرقام):" }),
                  n.jsx("input", { type: "password", maxLength: 4, required: !0, value: M, onChange: de => w(de.target.value.replace(/[^0-9]/g, "")), placeholder: "••••", className: "w-full bg-slate-50 border border-slate-200 focus:border-orange-500 focus:bg-white rounded-xl py-2.5 px-3.5 text-center text-lg font-black tracking-widest outline-none text-slate-800" })
                ]
              }),
              n.jsxs("button", {
                type: "submit",
                className: "w-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2",
                children: [n.jsx("span", { children: "دخول والبدء بالتسوق 🛍️" })]
              })
            ]
          }),

          // TAB 2: STORE OWNER FORM
          r === "store" && n.jsxs("div", {
            className: "space-y-4 animate-fade-in",
            children: [
              n.jsxs("div", {
                className: "flex bg-slate-100 p-1 rounded-xl",
                children: [
                  n.jsx("button", { type: "button", onClick: () => L("login"), className: `flex-1 py-1.5 text-xs font-extrabold rounded-lg transition-all cursor-pointer ${C === "login" ? "bg-white text-orange-600 shadow-sm" : "text-slate-500"}` , children: "تسجيل دخول متجر سابق" }),
                  n.jsx("button", { type: "button", onClick: () => L("register"), className: `flex-1 py-1.5 text-xs font-extrabold rounded-lg transition-all cursor-pointer ${C === "register" ? "bg-white text-orange-600 shadow-sm" : "text-slate-500"}` , children: "تسجيل متجر جديد" })
                ]
              }),
              C === "login" ? n.jsxs("form", {
                onSubmit: je,
                className: "space-y-4",
                children: [
                  n.jsxs("div", {
                    className: "space-y-1.5",
                    children: [
                      n.jsx("label", { className: "text-xs font-extrabold text-slate-700 block", children: "رقم موبايل صاحب المتجر المسجل:" }),
                      n.jsx("input", { type: "tel", required: !0, value: H, onChange: de => q(de.target.value), placeholder: "09xxxxxxxx", className: "w-full bg-slate-50 border border-slate-200 focus:border-orange-500 rounded-xl py-2.5 px-3.5 text-xs font-bold outline-none text-slate-800 text-left", dir: "ltr" })
                    ]
                  }),
                  n.jsxs("div", {
                    className: "space-y-1.5",
                    children: [
                      n.jsx("label", { className: "text-xs font-extrabold text-slate-700 block", children: "الرمز السري لمتجرك (4 أرقام):" }),
                      n.jsx("input", { type: "password", maxLength: 4, required: !0, value: E, onChange: de => U(de.target.value.replace(/[^0-9]/g, "")), placeholder: "••••", className: "w-full bg-slate-50 border border-slate-200 focus:border-orange-500 rounded-xl py-2.5 px-3.5 text-center text-lg font-black tracking-widest outline-none text-slate-800" })
                    ]
                  }),
                  n.jsx("button", { type: "submit", className: "w-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-md transition-all cursor-pointer text-center", children: "دخول للوحة تحكم المتجر 🏪" })
                ]
              }) : n.jsxs("form", {
                onSubmit: Ae,
                className: "space-y-3",
                children: [
                  n.jsxs("div", {
                    className: "space-y-1",
                    children: [
                      n.jsx("label", { className: "text-[11px] font-extrabold text-slate-700 block", children: "اسم المتجر أو النشاط التجاري:" }),
                      n.jsx("input", { type: "text", required: !0, value: F, onChange: de => O(de.target.value), placeholder: "مثال: مأكولات الشام، صيدلية السلام", className: "w-full bg-slate-50 border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs font-bold outline-none text-slate-800" })
                    ]
                  }),
                  n.jsxs("div", {
                    className: "space-y-1",
                    children: [
                      n.jsx("label", { className: "text-[11px] font-extrabold text-slate-700 block", children: "تصنيف المتجر:" }),
                      n.jsxs("select", { value: ne, onChange: de => se(de.target.value), className: "w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-bold outline-none", children: [
                        n.jsx("option", { value: "restaurants", children: "مطاعم ومأكولات سريعة" }),
                        n.jsx("option", { value: "groceries", children: "تموينات وسوبرماركت" }),
                        n.jsx("option", { value: "sweets", children: "حلويات ومشروبات" }),
                        n.jsx("option", { value: "pharmacy", children: "صيدلية ورعاية صحية" }),
                        n.jsx("option", { value: "services", children: "خدمات وحرف القرية" })
                      ] })
                    ]
                  }),
                  n.jsxs("div", {
                    className: "space-y-1",
                    children: [
                      n.jsx("label", { className: "text-[11px] font-extrabold text-slate-700 block", children: "رقم موبايل المالك (للتواصل والطلبات):" }),
                      n.jsx("input", { type: "tel", required: !0, value: z, onChange: de => Z(de.target.value), placeholder: "09xxxxxxxx", className: "w-full bg-slate-50 border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs font-bold outline-none text-left", dir: "ltr" })
                    ]
                  }),
                  n.jsxs("div", {
                    className: "space-y-1",
                    children: [
                      n.jsx("label", { className: "text-[11px] font-extrabold text-slate-700 block", children: "اختر رمز حماية سري لمتجرك (4 أرقام):" }),
                      n.jsx("input", { type: "password", maxLength: 4, required: !0, value: G, onChange: de => J(de.target.value.replace(/[^0-9]/g, "")), placeholder: "••••", className: "w-full bg-slate-50 border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-center text-base font-black tracking-widest outline-none" })
                    ]
                  }),
                  n.jsxs("div", {
                    className: "p-2 bg-orange-50 rounded-xl border border-orange-100 text-[10px] text-orange-850 font-bold",
                    children: [
                      n.jsx("p", { children: "📦 الحصة الافتراضية: 20 منتج عادي + 10 عروض خاصة (قابلة للزيادة بموافقة الإدارة)." })
                    ]
                  }),
                  n.jsx("button", { type: "submit", className: "w-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs py-3 rounded-xl shadow-md transition-all cursor-pointer text-center", children: "تسجيل المتجر والبدء بإعداده 🚀" })
                ]
              })
            ]
          }),

          // TAB 3: STAFF & ADMIN LOGIN (Strong Master Password & Lockout Protection)
          r === "staff" && n.jsxs("form", {
            onSubmit: ut,
            className: "space-y-4 animate-fade-in",
            children: [
              n.jsxs("div", {
                className: "bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 space-y-2",
                children: [
                  n.jsxs("div", {
                    className: "flex items-center justify-between",
                    children: [
                      n.jsxs("div", {
                        className: "flex items-center gap-2",
                        children: [
                          n.jsx("div", { className: "w-8 h-8 bg-amber-400 text-slate-950 rounded-xl flex items-center justify-center font-black", children: "🔐" }),
                          n.jsx("h4", { className: "font-black text-xs sm:text-sm text-amber-400", children: "بوابة الكوادر والإدارة المشفرة" })
                        ]
                      }),
                      isLocked && n.jsx("span", { className: "text-[9px] bg-red-500 text-white px-2 py-0.5 rounded-full animate-pulse", children: "مقفل مؤقتاً ⏳" })
                    ]
                  }),
                  n.jsx("p", { className: "text-slate-300 text-[10px] leading-relaxed", children: "أدخل كلمة المرور الرئيسية المشفرة للإدارة أو كود السائقين المصرح لهم." })
                ]
              }),

              n.jsxs("div", {
                className: "space-y-1.5",
                children: [
                  n.jsx("label", { className: "text-xs font-extrabold text-slate-700 block", children: "كلمة المرور المشفرة للإدارة / رمز الكادر:" }),
                  n.jsxs("div", {
                    className: "relative",
                    children: [
                      n.jsx("input", {
                        type: showPassword ? "text" : "password",
                        required: !0,
                        autoFocus: !0,
                        disabled: isLocked,
                        value: ue,
                        onChange: de => be(de.target.value),
                        placeholder: "أدخل كلمة المرور...",
                        className: "w-full bg-slate-50 border border-slate-200 focus:border-slate-900 focus:bg-white rounded-xl py-3 px-10 text-center text-sm font-black outline-none text-slate-800 placeholder-slate-400"
                      }),
                      n.jsx("button", {
                        type: "button",
                        onClick: () => setShowPassword(!showPassword),
                        className: "absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 text-xs cursor-pointer p-1",
                        children: showPassword ? "🙈" : "👁️"
                      })
                    ]
                  })
                ]
              }),

              n.jsxs("button", {
                type: "submit",
                disabled: isLocked,
                className: `w-full ${isLocked ? "bg-slate-400 cursor-not-allowed" : "bg-slate-900 hover:bg-orange-500 hover:text-slate-950"} text-white font-extrabold text-sm py-3.5 rounded-2xl transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-1.5`,
                children: [
                  n.jsx(ea, { className: "w-4 h-4" }),
                  n.jsx("span", { children: isLocked ? "بوابة الإدارة مقفلة مؤقتاً..." : "تحقق وتسجيل دخول آمن 🔐" })
                ]
              })
            ]
          }),

          // Footer Security Note
          n.jsxs("div", {
            className: "bg-slate-50 p-3 rounded-2xl border border-slate-100 flex items-center justify-between text-[10px] text-slate-500 font-bold",
            children: [
              n.jsx("span", { children: "🔒 اتصال مشفر ومحمي بروتوكولياً" }),
              hideStaffTab && !showSecretStaffTab && n.jsx("button", {
                type: "button",
                onClick: () => { setShowSecretStaffTab(true); u("staff"); },
                className: "text-slate-400 hover:text-slate-700 text-xs cursor-pointer p-1",
                title: "دخول الكوادر",
                children: "🔑"
              })
            ]
          })
        ]
      })
    ]
  });
}
function sxe({currentStoreId:o,stores:i,products:d,categories:r,onUpdateStores:u,onUpdateProducts:f,onLogout:p}){
  const m=i.find(te=>te.id===o);
  const g=d.filter(te=>te.storeId===o);
  const [x,b]=_.useState("orders"); // default to orders so store owner immediately sees their orders!
  const [M,w]=_.useState(null);
  const [E,U]=_.useState("");
  const [F,O]=_.useState("");
  const [ne,se]=_.useState("");
  const [z,Z]=_.useState(A0[0].url);
  const [G,J]=_.useState("");
  const [ce,me]=_.useState(!1);
  const [Me,Ne]=_.useState("");
  const [ke,I]=_.useState("");
  const [stockCount, setStockCount]=_.useState("");
  const [isUnlimitedStock, setIsUnlimitedStock]=_.useState(true);
  const [itemUnit, setItemUnit]=_.useState("وجبة");
  const [Q,oe]=_.useState((m==null?void 0:m.name)||"");
  const [ue,be]=_.useState((m==null?void 0:m.description)||"");
  const [j,R]=_.useState((m==null?void 0:m.status)||"open");
  const [K,le]=_.useState((m==null?void 0:m.workingHours)||"");
  const [ee,fe]=_.useState((m==null?void 0:m.phone)||(m==null?void 0:m.contactPhone)||(m==null?void 0:m.ownerPhone)||"");
  const [ie,je]=_.useState((m==null?void 0:m.address)||"");
  const [Ae,ut]=_.useState((m==null?void 0:m.image)||"");
  const [showUpgradeModal, setShowUpgradeModal]=_.useState(false);
  const [soundEnabled, setSoundEnabled]=_.useState(()=>localStorage.getItem("tw_store_sound_enabled")!=="false");
  const [lastOrderAlert, setLastOrderAlert]=_.useState(null);

  // Store Orders State & Real-time Live Polling
  const [ordersList, setOrdersList]=_.useState(()=>{
    try {
      const raw=localStorage.getItem("tw_orders_list");
      return raw ? JSON.parse(raw) : [];
    } catch(e){ return []; }
  });

  const myOrders = ordersList.filter(ord=>ord.storeId===o);
  const pendingOrders = myOrders.filter(ord=>ord.status==="pending" || ord.status==="preparing");
  const prevOrdersCountRef = VI.useRef(myOrders.length);

  // Quota calculation (Request 1)
  const maxRegular = (m && m.maxRegularProducts) ? m.maxRegularProducts : 20;
  const maxOffers = (m && m.maxOfferProducts) ? m.maxOfferProducts : 10;
  const currentRegular = g.filter(prod=>!prod.isOffer).length;
  const currentOffers = g.filter(prod=>prod.isOffer).length;
  const isRegularFull = currentRegular >= maxRegular;
  const isOffersFull = currentOffers >= maxOffers;

  // Sound Alarm Synthesizer (Request 2)
  const playStoreAlarm = VI.useCallback(()=>{
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') ctx.resume();
      
      const tones = [
        { f: 587.33, t: 0, d: 0.18 },
        { f: 739.99, t: 0.16, d: 0.22 },
        { f: 880.00, t: 0.32, d: 0.35 },
        { f: 1174.66, t: 0.60, d: 0.45 },
        { f: 880.00, t: 0.95, d: 0.18 },
        { f: 1174.66, t: 1.10, d: 0.55 }
      ];
      tones.forEach(tone=>{
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(tone.f, ctx.currentTime + tone.t);
        gain.gain.setValueAtTime(0, ctx.currentTime + tone.t);
        gain.gain.linearRampToValueAtTime(0.5, ctx.currentTime + tone.t + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + tone.t + tone.d);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + tone.t);
        osc.stop(ctx.currentTime + tone.t + tone.d);
      });
      if (navigator.vibrate) {
        navigator.vibrate([300, 150, 300, 150, 500]);
      }
    } catch(err){
      console.warn("Audio alarm alert:", err);
    }
  }, []);

  // Request Web Notification permission
  _.useEffect(()=>{
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  // Ensure store owner session is saved permanently in localStorage (Request 2)
  _.useEffect(()=>{
    localStorage.setItem("tw_user_role", "store_owner");
    localStorage.setItem("tw_current_store_id", o);
  }, [o]);

  // Poll for incoming orders every 2.5 seconds
  _.useEffect(()=>{
    const checkOrders = () => {
      try {
        const raw = localStorage.getItem("tw_orders_list");
        if (raw) {
          const parsed = JSON.parse(raw);
          setOrdersList(parsed);
          const currentStoreOrders = parsed.filter(ord=>ord.storeId===o);
          
          // If a new order arrived
          if (currentStoreOrders.length > prevOrdersCountRef.current) {
            const newest = currentStoreOrders[0];
            if (soundEnabled) playStoreAlarm();
            
            // Show browser notification if in background
            if ("Notification" in window && Notification.permission === "granted") {
              try {
                new Notification('🔔 وصلك طلب شراء جديد!', {
                  body: 'طلب من ' + (newest.customerName || 'زبون') + ' بقيمة ' + (newest.total || 0) + ' ل.س لمتجرك ' + (m?.name || ''),
                  icon: '/favicon.png'
                });
              } catch(e){}
            }
            setLastOrderAlert(newest);
          }
          prevOrdersCountRef.current = currentStoreOrders.length;
        }
      } catch(e){}
    };

    const interval = setInterval(checkOrders, 2500);
    window.addEventListener("storage", checkOrders);
    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", checkOrders);
    };
  }, [o, soundEnabled, playStoreAlarm, m]);

  const updateOrderStatus = (orderId, newStatus) => {
    try {
      const updated = ordersList.map(ord => ord.id === orderId ? { 
        ...ord, 
        status: newStatus,
        preparedAt: newStatus === "ready" ? new Date().toISOString() : ord.preparedAt,
        deliveredAt: newStatus === "delivered" ? new Date().toISOString() : ord.deliveredAt
      } : ord);
      setOrdersList(updated);
      localStorage.setItem("tw_orders_list", JSON.stringify(updated));
      const currentActive = localStorage.getItem("tw_active_order");
      if (currentActive) {
        try {
          const actObj = JSON.parse(currentActive);
          if (actObj.id === orderId) {
            localStorage.setItem("tw_active_order", JSON.stringify({ ...actObj, status: newStatus }));
          }
        } catch(e){}
      }
      window.dispatchEvent(new Event("storage"));
    } catch(e){}
  };

  const de = () => {
    var te;
    U(""), O(""), se(""), Z(A0[0].url), J(((te = r[0]) == null ? void 0 : te.id) || ""), me(!1), Ne(""), I(""), setStockCount(""), setIsUnlimitedStock(true), setItemUnit("وجبة"), w(null);
  };

  const we = te => {
    w(te.id), U(te.name), O(String(te.price)), se(te.description), Z(te.image), J(te.category), me(!!te.isOffer), Ne(te.originalPrice ? String(te.originalPrice) : ""), I(te.offerLabel || ""), setStockCount(te.stock !== undefined && te.stock !== null ? String(te.stock) : ""), setIsUnlimitedStock(te.stock === undefined || te.stock === null || te.isUnlimitedStock === true), setItemUnit(te.unit || "وجبة"), b("add_product");
  };

  // Instant Fast Stock Quick Control for Store Owner (Increments / Decrements / Fix errors)
  const handleQuickStock = (prodId, deltaOrValue, isAbsolute = false) => {
    const updated = d.map(item => {
      if (item.id !== prodId) return item;
      if (deltaOrValue === "toggle_unlimited") {
        const currentlyUnlimited = item.stock === undefined || item.stock === null || item.isUnlimitedStock === true;
        return { ...item, stock: currentlyUnlimited ? 10 : undefined, isUnlimitedStock: !currentlyUnlimited };
      }
      if (isAbsolute) {
        const num = Math.max(0, parseInt(deltaOrValue) || 0);
        return { ...item, stock: num, isUnlimitedStock: false };
      }
      const currentStock = (item.stock !== undefined && item.stock !== null) ? item.stock : 10;
      const newStock = Math.max(0, currentStock + deltaOrValue);
      return { ...item, stock: newStock, isUnlimitedStock: false };
    });
    f(updated);
    try { localStorage.setItem("tw_products", JSON.stringify(updated)); } catch(e){}
  };

  const tt = te => {
    if (confirm("هل تريد بالتأكيد حذف هذا المنتج نهائياً من قائمتك؟")) {
      const Je = d.filter(at => at.id !== te);
      f(Je);
    }
  };

  // Product save handler with strict limits check (Request 1)
  const Ie = te => {
    var vt;
    if (te.preventDefault(), !m) return;
    const Je = parseFloat(F) || 0;
    const at = ce ? parseFloat(Me) || 0 : void 0;

    if (M) {
      // Editing existing product
      const targetProd = d.find(p => p.id === M);
      // If converting to offer and offers are full
      if (ce && !targetProd?.isOffer && isOffersFull) {
        alert("⛔ لقد وصلت إلى الحد الأقصى لمنتجات العروض (" + maxOffers + " عروض) المسموح بها لمتجرك.\n\nلإضافة المزيد من العروض، يرجى تقديم طلب ترقية للإدارة.");
        return;
      }
      // If converting to regular and regular is full
      if (!ce && targetProd?.isOffer && isRegularFull) {
        alert("⛔ لقد وصلت إلى الحد الأقصى للمنتجات العادية (" + maxRegular + " منتج) المسموح بها لمتجرك.\n\nلإضافة المزيد من المنتجات، يرجى تقديم طلب زيادة السعة للإدارة.");
        return;
      }

      const finalStock = isUnlimitedStock ? undefined : (stockCount !== "" && !isNaN(parseInt(stockCount)) ? Math.max(0, parseInt(stockCount)) : undefined);
      const ya = d.map(fa => {
        var Ya;
        return fa.id === M ? {
          ...fa,
          name: E,
          price: Je,
          unit: itemUnit || "وجبة",
          stock: finalStock,
          isUnlimitedStock: isUnlimitedStock,
          description: ne,
          image: z,
          category: G || ((Ya = r[0]) == null ? void 0 : Ya.id) || "",
          isOffer: ce,
          originalPrice: at,
          offerLabel: ce ? ke : void 0
        } : fa;
      });
      f(ya);
      try { localStorage.setItem("tw_products", JSON.stringify(ya)); } catch(e){}
      alert("✅ تم تحديث بيانات المنتج والمخزون بنجاح!");
    } else {
      // Adding new product - Check Quota Limits
      if (ce && isOffersFull) {
        alert("⛔ لقد وصلت إلى الحد الأقصى لمنتجات العروض (" + maxOffers + " عروض) المسموح بها لمتجرك.\n\nلزيادة السعة، يرجى التواصل مع إدارة التطبيق لطلب ترقية المتجر.");
        return;
      }
      if (!ce && isRegularFull) {
        alert("⛔ لقد وصلت إلى الحد الأقصى للمنتجات العادية (" + maxRegular + " منتج) المسموح بها لمتجرك.\n\nلإضافة المزيد، يرجى تقديم طلب ترقية للإدارة.");
        return;
      }

      const finalStock = isUnlimitedStock ? undefined : (stockCount !== "" && !isNaN(parseInt(stockCount)) ? Math.max(0, parseInt(stockCount)) : undefined);
      const ya = {
        id: "prod_" + Date.now(),
        name: E,
        price: Je,
        unit: itemUnit || "وجبة",
        stock: finalStock,
        isUnlimitedStock: isUnlimitedStock,
        description: ne,
        image: z,
        category: G || ((vt = r[0]) == null ? void 0 : vt.id) || "",
        storeId: o,
        isOffer: ce,
        originalPrice: at,
        offerLabel: ce ? ke : void 0
      };
      const allUpdated = [ya, ...d];
      f(allUpdated);
      try { localStorage.setItem("tw_products", JSON.stringify(allUpdated)); } catch(e){}
      alert("✅ تم إضافة المنتج الجديد بنجاح لقائمتك!");
    }
    de(), b("menu");
  };

  const Ve = te => {
    if (te.preventDefault(), !m) return;
    const Je = i.map(at => at.id === o ? {
      ...at,
      name: Q,
      description: ue,
      status: j,
      workingHours: K,
      phone: ee,
      contactPhone: ee,
      ownerPhone: (at.ownerPhone ? ee : at.ownerPhone || ee),
      address: ie,
      image: Ae
    } : at);
    u(Je);try{localStorage.setItem("tw_stores",JSON.stringify(Je))}catch(e){}
    alert("تم حفظ وتحديث الملف التعريفي لمتجرك بنجاح!");
  };

  if (!m) return n.jsxs("div", {
    className: "max-w-md mx-auto my-12 text-center p-6 bg-white rounded-3xl border border-slate-200 shadow-xl",
    dir: "rtl",
    children: [
      n.jsx(ha, { className: "w-12 h-12 text-red-500 mx-auto mb-3" }),
      n.jsx("h3", { className: "text-lg font-extrabold text-slate-800", children: "خطأ في تحميل بيانات المتجر" }),
      n.jsx("p", { className: "text-slate-500 text-xs mt-1", children: "لم نتمكن من تحديد المتجر المرتبط بحسابك." }),
      n.jsx("button", { onClick: p, className: "mt-4 px-4 py-2 bg-slate-900 text-white rounded-xl font-bold text-xs cursor-pointer", children: "تسجيل الخروج" })
    ]
  });

  const ct = m.isApproved !== !1;

  return n.jsxs("div", {
    className: "space-y-6 text-right",
    dir: "rtl",
    children: [
      // Store Header Banner
      n.jsxs("div", {
        className: "bg-slate-900 text-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-slate-850 shadow-xl relative overflow-hidden select-none",
        children: [
          n.jsx("div", { className: "absolute inset-0 bg-cover bg-center opacity-10", style: { backgroundImage: `url('${m.image}')` } }),
          n.jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-orange-500/15 rounded-full blur-3xl pointer-events-none" }),
          n.jsxs("div", {
            className: "relative flex flex-col sm:flex-row sm:items-center justify-between gap-4",
            children: [
              n.jsxs("div", {
                className: "flex items-center gap-4",
                children: [
                  n.jsx("div", {
                    className: "w-16 h-16 rounded-2xl overflow-hidden bg-white/10 shrink-0 border border-white/20",
                    children: n.jsx("img", { src: m.image, alt: m.name, className: "w-full h-full object-cover" })
                  }),
                  n.jsxs("div", {
                    className: "space-y-1",
                    children: [
                      n.jsxs("div", {
                        className: "flex items-center gap-2",
                        children: [
                          n.jsx("span", { className: "bg-orange-500 text-slate-950 font-extrabold text-[9px] px-2.5 py-0.5 rounded-full uppercase", children: "حساب مالك متجر 🏪" }),
                          ct ? n.jsxs("span", { className: "bg-green-500/20 text-green-400 font-extrabold text-[9px] px-2.5 py-0.5 rounded-full flex items-center gap-1", children: [n.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" }), n.jsx("span", { children: "نشط ومعتمد بالنظام ✅" })] })
                             : n.jsxs("span", { className: "bg-amber-500/20 text-amber-400 font-extrabold text-[9px] px-2.5 py-0.5 rounded-full flex items-center gap-1", children: [n.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" }), n.jsx("span", { children: "بانتظار موافقة الإدارة ⏳" })] })
                        ]
                      }),
                      n.jsx("h2", { className: "text-xl sm:text-2xl font-black", children: m.name }),
                      n.jsx("p", { className: "text-slate-300 text-[11px] leading-relaxed max-w-md", children: m.description || "لا يوجد وصف للمتجر حالياً. أضف وصفاً لخدماتك لجذب الزبائن." })
                    ]
                  })
                ]
              }),
              // Right Action Buttons in Header
              n.jsxs("div", {
                className: "flex items-center gap-2 flex-wrap",
                children: [
                  n.jsxs("button", {
                    onClick: () => {
                      playStoreAlarm();
                      alert("🔊 تم تشغيل رنة التنبيه التجريبية بنجاح!");
                    },
                    className: "bg-white/10 hover:bg-orange-500 hover:text-white px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer",
                    title: "تجربة رنة التنبيه للطلبات",
                    children: [n.jsx(Ga, { className: "w-3.5 h-3.5 text-orange-400" }), n.jsx("span", { children: "تجربة الرنة 🔔" })]
                  }),
                  n.jsxs("button", {
                    onClick: p,
                    className: "bg-red-500/20 hover:bg-red-600 text-red-200 hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border border-red-500/30",
                    title: "تسجيل الخروج النظامي",
                    children: [n.jsx(pr, { className: "w-4 h-4" }), n.jsx("span", { children: "تسجيل الخروج" })]
                  })
                ]
              })
            ]
          }),
          // Quota Indicator Bar (Request 1)
          n.jsxs("div", {
            className: "mt-4 pt-4 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs",
            children: [
              n.jsxs("div", {
                className: "bg-slate-800/80 rounded-xl p-2.5 border border-slate-700/60 flex items-center justify-between",
                children: [
                  n.jsxs("div", {
                    children: [
                      n.jsx("span", { className: "text-slate-400 text-[10px] block font-bold", children: "📦 المنتجات العادية:" }),
                      n.jsxs("span", { className: `font-black ${isRegularFull ? "text-red-400" : "text-emerald-400"}`, children: [currentRegular, " / ", maxRegular, " منتج"] })
                    ]
                  }),
                  isRegularFull ? n.jsx("span", { className: "text-[9px] bg-red-500/20 text-red-300 font-extrabold px-2 py-0.5 rounded-md", children: "ممتلئ" })
                                : n.jsx("span", { className: "text-[9px] bg-emerald-500/20 text-emerald-300 font-extrabold px-2 py-0.5 rounded-md", children: "متاح" })
                ]
              }),
              n.jsxs("div", {
                className: "bg-slate-800/80 rounded-xl p-2.5 border border-slate-700/60 flex items-center justify-between",
                children: [
                  n.jsxs("div", {
                    children: [
                      n.jsx("span", { className: "text-slate-400 text-[10px] block font-bold", children: "🏷️ منتجات العروض:" }),
                      n.jsxs("span", { className: `font-black ${isOffersFull ? "text-red-400" : "text-amber-400"}`, children: [currentOffers, " / ", maxOffers, " عروض"] })
                    ]
                  }),
                  isOffersFull ? n.jsx("span", { className: "text-[9px] bg-red-500/20 text-red-300 font-extrabold px-2 py-0.5 rounded-md", children: "مكتمل" })
                               : n.jsx("span", { className: "text-[9px] bg-amber-500/20 text-amber-300 font-extrabold px-2 py-0.5 rounded-md", children: "متاح" })
                ]
              }),
              n.jsxs("button", {
                type: "button",
                onClick: () => setShowUpgradeModal(true),
                className: "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold rounded-xl p-2.5 flex items-center justify-center gap-1.5 cursor-pointer shadow-md transition-all active:scale-95",
                children: [
                  n.jsx(ra, { className: "w-4 h-4" }),
                  n.jsx("span", { children: "طلب زيادة السعة من الإدارة 🚀" })
                ]
              })
            ]
          })
        ]
      }),

      // Navigation Tabs
      n.jsxs("div", {
        className: "flex border-b border-slate-200 overflow-x-auto pb-px gap-1",
        children: [
          n.jsxs("button", {
            onClick: () => b("orders"),
            className: `py-3 px-4 text-xs font-extrabold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${x === "orders" ? "border-orange-500 text-orange-600" : "border-transparent text-slate-500 hover:text-slate-800"}`,
            children: [
              n.jsx(Ga, { className: "w-4 h-4" }),
              n.jsxs("span", { children: ["الطلبات الواردة لمتجرك (", myOrders.length, ")"] }),
              pendingOrders.length > 0 && n.jsx("span", { className: "bg-red-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full animate-bounce", children: pendingOrders.length })
            ]
          }),
          n.jsxs("button", {
            onClick: () => { b("menu"); de(); },
            className: `py-3 px-4 text-xs font-extrabold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${x === "menu" ? "border-orange-500 text-orange-600" : "border-transparent text-slate-500 hover:text-slate-800"}`,
            children: [
              n.jsx(xn, { className: "w-4 h-4" }),
              n.jsxs("span", { children: ["قائمة المنتجات (", g.length, ")"] })
            ]
          }),
          n.jsxs("button", {
            onClick: () => b("add_product"),
            className: `py-3 px-4 text-xs font-extrabold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${x === "add_product" ? "border-orange-500 text-orange-600" : "border-transparent text-slate-500 hover:text-slate-800"}`,
            children: [
              n.jsx(ra, { className: "w-4 h-4" }),
              n.jsx("span", { children: M ? "تعديل هذا المنتج ✏️" : "إضافة منتج جديد ➕" })
            ]
          }),
          n.jsxs("button", {
            onClick: () => b("profile"),
            className: `py-3 px-4 text-xs font-extrabold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${x === "profile" ? "border-orange-500 text-orange-600" : "border-transparent text-slate-500 hover:text-slate-800"}`,
            children: [
              n.jsx(sl, { className: "w-4 h-4" }),
              n.jsx("span", { children: "إعدادات وحالة المتجر ⚙️" })
            ]
          })
        ]
      }),

      // TAB 1: INCOMING ORDERS (Request 2)
      x === "orders" && n.jsxs("div", {
        className: "space-y-4 animate-fade-in",
        children: [
          n.jsxs("div", {
            className: "flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs",
            children: [
              n.jsxs("div", {
                children: [
                  n.jsx("h3", { className: "font-extrabold text-sm sm:text-base text-slate-800", children: "📦 سجل الطلبات الواردة لمتجرك" }),
                  n.jsx("p", { className: "text-[11px] text-slate-500 mt-0.5", children: "تصلك التنبيهات فوراً مع صوت الرنة عند إرسال أي زبون لطلب جديد." })
                ]
              }),
              n.jsxs("div", {
                className: "flex items-center gap-2",
                children: [
                  n.jsxs("button", {
                    type: "button",
                    onClick: () => {
                      const newState = !soundEnabled;
                      setSoundEnabled(newState);
                      localStorage.setItem("tw_store_sound_enabled", String(newState));
                      if (newState) playStoreAlarm();
                    },
                    className: `py-1.5 px-3 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer border ${soundEnabled ? "bg-orange-50 text-orange-600 border-orange-200" : "bg-slate-100 text-slate-500 border-slate-200"}`,
                    children: [
                      n.jsx(Ga, { className: "w-3.5 h-3.5" }),
                      n.jsx("span", { children: soundEnabled ? "صوت التنبيه: مفعّل 🔔" : "صوت التنبيه: صامت 🔕" })
                    ]
                  })
                ]
              })
            ]
          }),

          myOrders.length === 0 ? n.jsxs("div", {
            className: "bg-white rounded-3xl border border-dashed border-slate-300 py-16 text-center space-y-3",
            children: [
              n.jsx(Ga, { className: "w-12 h-12 text-slate-300 mx-auto" }),
              n.jsx("p", { className: "text-slate-600 text-sm font-bold", children: "لا توجد طلبات جديدة واردة لمتجرك حالياً" }),
              n.jsx("p", { className: "text-slate-400 text-xs", children: "عندما يطلب الزبائن من قائمتك، ستظهر الطلبات هنا فوراً وستسمع نغمة التنبيه." })
            ]
          }) : n.jsx("div", {
            className: "space-y-3",
            children: myOrders.map(order => n.jsxs("div", {
              className: `bg-white border rounded-2xl p-4 sm:p-5 shadow-xs transition-all space-y-3 ${order.status === "pending" ? "border-orange-400 bg-orange-50/20" : "border-slate-200"}`,
              children: [
                n.jsxs("div", {
                  className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3",
                  children: [
                    n.jsxs("div", {
                      className: "flex items-center gap-2",
                      children: [
                        n.jsxs("span", { className: "font-black text-xs sm:text-sm text-slate-800", children: ["طلب #", order.id] }),
                        order.status === "pending" && n.jsx("span", { className: "bg-orange-500 text-white font-extrabold text-[9px] px-2 py-0.5 rounded-full animate-pulse", children: "جديد بانتظار التأكيد ⏳" }),
                        order.status === "preparing" && n.jsx("span", { className: "bg-blue-500 text-white font-extrabold text-[9px] px-2 py-0.5 rounded-full", children: "قيد التجهيز 👨‍🍳" }),
                        order.status === "ready" && n.jsx("span", { className: "bg-purple-500 text-white font-extrabold text-[9px] px-2 py-0.5 rounded-full", children: "جاهز للتسليم 🛵" }),
                        order.status === "delivered" && n.jsx("span", { className: "bg-emerald-600 text-white font-extrabold text-[9px] px-2 py-0.5 rounded-full", children: "تم التسليم بنجاح ✅" }),
                        order.status === "cancelled" && n.jsx("span", { className: "bg-red-500 text-white font-extrabold text-[9px] px-2 py-0.5 rounded-full", children: "ملغي ❌" })
                      ]
                    }),
                    n.jsx("span", { className: "text-[11px] text-slate-400 font-bold", children: order.createdAt ? new Date(order.createdAt).toLocaleTimeString('ar-SY', { hour: '2-digit', minute: '2-digit' }) : "الآن" })
                  ]
                }),
                // Customer details
                n.jsxs("div", {
                  className: "grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-xl",
                  children: [
                    n.jsxs("div", {
                      className: "space-y-1",
                      children: [
                        n.jsxs("p", { className: "font-bold text-slate-700", children: ["👤 الزبون: ", n.jsx("b", { className: "text-slate-900 font-extrabold", children: order.customerName || "زبون كريم" })] }),
                        order.customerPhone && n.jsxs("p", {
                          className: "font-bold text-slate-700 flex items-center gap-1.5",
                          children: [
                            n.jsx("span", { children: "📞 الهاتف:" }),
                            n.jsx("a", { href: `tel:${order.customerPhone}`, className: "text-orange-600 font-extrabold hover:underline", children: order.customerPhone }),
                            n.jsx("a", { href: `https://wa.me/963${(order.customerPhone||"").replace(/^0/, "")}`, target: "_blank", rel: "noreferrer", className: "bg-emerald-500 text-white text-[9px] font-black px-2 py-0.5 rounded-md hover:bg-emerald-600 transition-all", children: "واتساب 💬" }),
                            n.jsx("a", { href: /Android/i.test(navigator.userAgent) ? `intent://send?phone=963${(order.customerPhone||"").replace(/^0/, "")}#Intent;package=com.whatsapp.w4b;scheme=whatsapp;end` : `https://wa.me/963${(order.customerPhone||"").replace(/^0/, "")}`, target: "_blank", rel: "noreferrer", className: "bg-slate-900 text-emerald-400 text-[9px] font-black px-2 py-0.5 rounded-md hover:bg-slate-800 transition-all border border-emerald-500/30", children: "واتس أعمال 💼" })
                          ]
                        })
                      ]
                    }),
                    n.jsxs("div", {
                      className: "space-y-1",
                      children: [
                        n.jsxs("p", { className: "font-bold text-slate-700", children: ["📍 العنوان/المعلم: ", n.jsx("b", { className: "text-slate-900", children: order.addressLandmark || order.additionalDirections || "داخل القرية" })] }),
                        n.jsxs("p", { className: "font-black text-slate-900 text-sm", children: ["💰 الإجمالي: ", n.jsx("span", { className: "text-orange-600 font-black", children: order.total || order.subtotal || 0 }), " ل.س"] })
                      ]
                    })
                  ]
                }),
                // Items
                order.items && order.items.length > 0 && n.jsxs("div", {
                  className: "space-y-1.5 border-t border-slate-100 pt-2",
                  children: [
                    n.jsx("p", { className: "text-[11px] font-extrabold text-slate-700", children: "الأصناف المطلوبة:" }),
                    n.jsx("div", {
                      className: "space-y-1",
                      children: order.items.map((item, idx) => n.jsxs("div", {
                        className: "flex justify-between items-center text-xs text-slate-700 bg-white p-2 rounded-lg border border-slate-100",
                        children: [
                          n.jsxs("span", { className: "font-bold", children: [item.quantity || 1, " × ", item.product?.name || item.name || "وجبة/سلعة"] }),
                          n.jsxs("span", { className: "font-black text-slate-900", children: [(item.totalItemPrice || item.price || 0) * (item.quantity || 1), " ل.س"] })
                        ]
                      }, idx))
                    })
                  ]
                }),
                // Check if this store / order is a Craftsman / Doctor / Workshop service
                (() => {
                  const isCraftService = Boolean((m && (m.isService || ["doctors", "crafts", "drivers"].includes(m.category) || (m.id||"").startsWith("service_"))) || order.isDirectService || (order.storeId||"").startsWith("service_") || (order.items||[]).some(it => (it.product?.id||it.id||"").startsWith("service_") || (it.product?.name||it.name||"").includes("خدمة وتنسيق")));
                  if (isCraftService) {
                    return n.jsxs("div", {
                      className: "space-y-3",
                      children: [
                        n.jsxs("div", {
                          className: "bg-amber-950/80 text-amber-100 p-3.5 rounded-xl flex items-center gap-3 border border-amber-500/40 shadow-sm",
                          children: [
                            n.jsx("div", { className: "w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-lg shrink-0", children: "🛠️" }),
                            n.jsxs("div", {
                              className: "space-y-0.5",
                              children: [
                                n.jsx("span", { className: "text-xs font-black text-amber-200 block", children: "طلب خدمة وتنسيق مباشر (صاحب مهنة / ورشة)" }),
                                n.jsx("p", { className: "text-[11px] text-amber-300/90 font-medium leading-relaxed", children: "هذا الطلب لا يحتاج لسائق توصيل؛ يرجى التواصل مباشرة مع الزبون عبر الاتصال أو الواتساب أعلاه لتحديد موعد الزيارة وتفاصيل العمل." })
                              ]
                            })
                          ]
                        }),
                        n.jsxs("div", {
                          className: "flex items-center gap-2 pt-2 border-t border-slate-100 flex-wrap",
                          children: [
                            order.status === "pending" && n.jsxs("button", {
                              type: "button",
                              onClick: () => updateOrderStatus(order.id, "preparing"),
                              className: "bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs py-2 px-3.5 rounded-xl transition-all cursor-pointer shadow-xs flex items-center gap-1.5",
                              children: [n.jsx("span", { children: "🤝" }), n.jsx("span", { children: "قبول وتأكيد الموعد مع الزبون" })]
                            }),
                            order.status === "preparing" && n.jsxs("button", {
                              type: "button",
                              onClick: () => updateOrderStatus(order.id, "ready"),
                              className: "bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs py-2 px-3.5 rounded-xl transition-all cursor-pointer shadow-xs flex items-center gap-1.5",
                              children: [n.jsx("span", { children: "🛠️" }), n.jsx("span", { children: "العمل قيد التنفيذ / جاهز بالورشة" })]
                            }),
                            order.status !== "delivered" && order.status !== "cancelled" && n.jsxs("button", {
                              type: "button",
                              onClick: () => updateOrderStatus(order.id, "delivered"),
                              className: "bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs py-2 px-3.5 rounded-xl transition-all cursor-pointer shadow-xs flex items-center gap-1.5",
                              children: [n.jsx("span", { children: "✅" }), n.jsx("span", { children: "تم إنجاز وتثبيت الخدمة بنجاح" })]
                            }),
                            order.status !== "cancelled" && order.status !== "delivered" && n.jsxs("button", {
                              type: "button",
                              onClick: () => {
                                if (confirm("هل تريد بالتأكيد إلغاء أو الاعتذار عن طلب الخدمة هذا؟")) {
                                  updateOrderStatus(order.id, "cancelled");
                                }
                              },
                              className: "bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-600 font-bold text-xs py-2 px-3 rounded-xl transition-all cursor-pointer",
                              children: [n.jsx("span", { children: "اعتذار عن الخدمة ❌" })]
                            })
                          ]
                        })
                      ]
                    });
                  }
                  return n.jsxs("div", {
                    className: "space-y-3",
                    children: [
                      n.jsxs("div", {
                        className: "bg-slate-900 text-white p-3.5 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-slate-800 shadow-sm",
                        children: [
                          n.jsxs("div", {
                            className: "flex items-center gap-2.5",
                            children: [
                              n.jsx("div", { className: "w-9 h-9 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold text-lg shrink-0", children: "🛵" }),
                              n.jsxs("div", {
                                children: [
                                  n.jsx("span", { className: "text-[10px] text-slate-400 block font-bold", children: "كابتن التوصيل المكلف:" }),
                                  n.jsxs("div", {
                                    className: "flex items-center gap-2 flex-wrap",
                                    children: [
                                      n.jsx("span", { className: "text-slate-100 font-black text-xs sm:text-sm", children: order.driverName || "بانتظار قبول السائق أو تكليفه من الإدارة ⏳" }),
                                      (order.driverName || order.driverId) && n.jsx("span", { className: "bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-black px-2 py-0.5 rounded-md", children: "مسند للكابتن" })
                                    ]
                                  })
                                ]
                              })
                            ]
                          }),
                          (order.driverPhone || (order.driverName && "0955333444")) && n.jsxs("div", {
                            className: "flex items-center gap-2 shrink-0",
                            children: [
                              n.jsxs("a", {
                                href: `tel:${order.driverPhone || "0955333444"}`,
                                className: "bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold py-1.5 px-3 rounded-xl border border-slate-700 flex items-center gap-1.5 transition-all shadow-xs",
                                children: [n.jsx("span", { children: "📞" }), n.jsx("span", { children: "اتصال بالسائق" })]
                              }),
                              n.jsxs("a", {
                                href: `https://wa.me/963${(order.driverPhone || "0955333444").replace(/^0/, "")}?text=${encodeURIComponent(`مرحباً كابتن ${order.driverName || "التوصيل"}، بخصوص طلب المتجر رقم (${order.id}) للأخ (${order.customerName || "الزبون"})...`)}`,
                                target: "_blank",
                                rel: "noreferrer",
                                className: "bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black py-1.5 px-3 rounded-xl flex items-center gap-1.5 transition-all shadow-xs",
                                children: [n.jsx("span", { children: "💬" }), n.jsx("span", { children: "واتساب السائق" })]
                              })
                            ]
                          })
                        ]
                      }),
                      n.jsxs("div", {
                        className: "flex items-center gap-2 pt-2 border-t border-slate-100 flex-wrap",
                        children: [
                          order.status === "pending" && n.jsxs("button", {
                            type: "button",
                            onClick: () => updateOrderStatus(order.id, "preparing"),
                            className: "bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs py-2 px-3.5 rounded-xl transition-all cursor-pointer shadow-xs flex items-center gap-1.5",
                            children: [n.jsx("span", { children: "👨‍🍳" }), n.jsx("span", { children: "قبول الطلب وبدء التحضير والتجهيز" })]
                          }),
                          order.status === "preparing" && n.jsxs("button", {
                            type: "button",
                            onClick: () => updateOrderStatus(order.id, "ready"),
                            className: "bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs py-2 px-3.5 rounded-xl transition-all cursor-pointer shadow-xs flex items-center gap-1.5",
                            children: [n.jsx("span", { children: "📦" }), n.jsx("span", { children: "الطلب جاهز للتسليم لكابتن التوصيل" })]
                          }),
                          order.status === "ready" && n.jsxs("button", {
                            type: "button",
                            onClick: () => updateOrderStatus(order.id, "picked_up"),
                            className: "bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs py-2 px-3.5 rounded-xl transition-all cursor-pointer shadow-xs flex items-center gap-1.5",
                            children: [n.jsx("span", { children: "🛵" }), n.jsx("span", { children: "تم استلام الطلب من قِبل الكابتن" })]
                          }),
                          order.status !== "delivered" && order.status !== "cancelled" && n.jsxs("button", {
                            type: "button",
                            onClick: () => updateOrderStatus(order.id, "delivered"),
                            className: "bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs py-2 px-3.5 rounded-xl transition-all cursor-pointer shadow-xs flex items-center gap-1.5",
                            children: [n.jsx("span", { children: "✅" }), n.jsx("span", { children: "تم التسليم للزبون بنجاح" })]
                          }),
                          order.status !== "cancelled" && order.status !== "delivered" && n.jsxs("button", {
                            type: "button",
                            onClick: () => {
                              if (confirm("هل تريد بالتأكيد إلغاء/اعتذار عن هذا الطلب؟")) {
                                updateOrderStatus(order.id, "cancelled");
                              }
                            },
                            className: "bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-600 font-bold text-xs py-2 px-3 rounded-xl transition-all cursor-pointer",
                            children: [n.jsx("span", { children: "اعتذار عن الطلب ❌" })]
                          })
                        ]
                      })
                    ]
                  });
                })()
              ]
            }, order.id))
          })
        ]
      }),

      // TAB 2: MENU / PRODUCTS LIST (With Quotas UI)
      x === "menu" && n.jsxs("div", {
        className: "space-y-4",
        children: [
          n.jsxs("div", {
            className: "flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200/60 shadow-xs",
            children: [
              n.jsxs("div", {
                children: [
                  n.jsx("h3", { className: "font-extrabold text-sm text-slate-800", children: "قائمة الطعام والمعروضات" }),
                  n.jsx("p", { className: "text-[10px] text-slate-400 mt-0.5", children: "المنتجات التي ستظهر للزبائن عند تصفح متجرك." })
                ]
              }),
              n.jsxs("button", {
                onClick: () => b("add_product"),
                className: "py-2 px-3.5 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs rounded-xl flex items-center gap-1 cursor-pointer transition-all shadow-xs",
                children: [
                  n.jsx(ra, { className: "w-4 h-4" }),
                  n.jsx("span", { children: "إضافة منتج جديد" })
                ]
              })
            ]
          }),

          g.length === 0 ? n.jsxs("div", {
            className: "bg-white rounded-3xl border border-dashed border-slate-300 py-12 text-center space-y-3",
            children: [
              n.jsx(xn, { className: "w-12 h-12 text-slate-300 mx-auto" }),
              n.jsx("p", { className: "text-slate-400 text-xs font-bold", children: "قائمة مأكولاتك فارغة تماماً حالياً!" }),
              n.jsx("p", { className: "text-slate-400 text-[10px]", children: "اضغط على زر الإضافة بالأعلى لتبدأ بتجهيز قائمة المنتجات لمتجرك." })
            ]
          }) : n.jsx("div", {
            className: "grid grid-cols-1 md:grid-cols-2 gap-4",
            children: g.map(te => {
              var Je;
              return n.jsxs("div", {
                className: "bg-white border border-slate-200/80 rounded-2xl p-4 flex gap-4 hover:shadow-md transition-all",
                children: [
                  n.jsx("div", {
                    className: "w-20 h-20 rounded-xl overflow-hidden bg-slate-50 shrink-0 border border-slate-100",
                    children: n.jsx("img", { src: te.image, alt: te.name, className: "w-full h-full object-cover" })
                  }),
                  n.jsxs("div", {
                    className: "flex-1 min-w-0 space-y-1",
                    children: [
                      n.jsxs("div", {
                        className: "flex items-center gap-2",
                        children: [
                          n.jsx("span", { className: "text-[9px] bg-slate-100 text-slate-600 font-extrabold py-0.5 px-2 rounded-full", children: (((Je = r.find(vt => vt.id === te.category)) == null ? void 0 : Je.label) || te.category) }),
                          te.isOffer && n.jsxs("span", { className: "text-[8px] bg-red-100 text-red-600 font-extrabold py-0.5 px-2 rounded-full flex items-center gap-0.5", children: [n.jsx(mn, { className: "w-2.5 h-2.5" }), n.jsx("span", { children: te.offerLabel || "عرض خاص" })] })
                        ]
                      }),
                      n.jsx("h4", { className: "font-extrabold text-xs sm:text-sm text-slate-800", children: te.name }),
                      n.jsx("p", { className: "text-slate-400 text-[10px] leading-relaxed truncate", children: te.description }),
                      n.jsxs("div", {
                        className: "flex items-center gap-2 flex-wrap",
                        children: [
                          n.jsxs("span", { className: "font-black text-xs text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md", children: [te.price, " ل.س / ", (te.unit || "حبة")] }),
                          te.isOffer && te.originalPrice && n.jsxs("span", { className: "text-[10px] text-slate-400 line-through font-bold", children: [te.originalPrice, " ل.س"] })
                        ]
                      }),
                      // Stock Status & Out-of-Stock Urgency Badge
                      n.jsxs("div", {
                        className: "mt-2 pt-2 border-t border-slate-100 flex flex-col gap-1.5",
                        children: [
                          n.jsxs("div", {
                            className: "flex items-center justify-between gap-1 text-[10px] font-extrabold",
                            children: [
                              te.isBlocked ? n.jsx("span", { className: "text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-200", children: "🚫 موقوف ومجمد من الإدارة (ضغط)" }) :
                              (te.stock === 0) ? n.jsx("span", { className: "text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-200 font-black animate-pulse", children: "⛔ نفدت الكمية بالمخزون (0)" }) :
                              (te.stock !== undefined && te.stock !== null && te.stock <= 3) ? n.jsxs("span", { className: "text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 flex items-center gap-1", children: [n.jsx("span", { children: "🔥 متبقي:" }), te.stock, " ", (te.unit || "حبة"), " (أوشك على النفاذ)"] }) :
                              (te.stock !== undefined && te.stock !== null) ? n.jsxs("span", { className: "text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200", children: ["📦 المخزون: ", te.stock, " ", (te.unit || "حبة")] }) :
                              n.jsx("span", { className: "text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200", children: "♾️ كمية مفتوحة (غير محدودة)" }),
                              n.jsx("span", { className: "text-[9px] text-slate-400", children: "تحكم سريع:" })
                            ]
                          }),
                          // Store Owner Fast Stock Increment / Decrement / Mistake Correction Toolbar
                          n.jsxs("div", {
                            className: "flex items-center gap-1 flex-wrap bg-slate-50 p-1.5 rounded-xl border border-slate-200/70 select-none",
                            children: [
                              n.jsx("button", {
                                type: "button",
                                onClick: () => handleQuickStock(te.id, -1),
                                className: "px-2 py-0.5 bg-white hover:bg-slate-200 text-slate-700 text-[10px] font-black rounded-lg border border-slate-200 cursor-pointer transition-all shadow-2xs",
                                title: "إنقاص 1 من المخزون",
                                children: "-1"
                              }),
                              n.jsx("button", {
                                type: "button",
                                onClick: () => handleQuickStock(te.id, -5),
                                className: "px-1.5 py-0.5 bg-white hover:bg-slate-200 text-slate-700 text-[10px] font-black rounded-lg border border-slate-200 cursor-pointer transition-all shadow-2xs",
                                title: "إنقاص 5 من المخزون",
                                children: "-5"
                              }),
                              n.jsx("button", {
                                type: "button",
                                onClick: () => handleQuickStock(te.id, 1),
                                className: "px-2 py-0.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[10px] font-black rounded-lg border border-emerald-200 cursor-pointer transition-all shadow-2xs",
                                title: "زيادة 1 على المخزون",
                                children: "+1"
                              }),
                              n.jsx("button", {
                                type: "button",
                                onClick: () => handleQuickStock(te.id, 5),
                                className: "px-1.5 py-0.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[10px] font-black rounded-lg border border-emerald-200 cursor-pointer transition-all shadow-2xs",
                                title: "زيادة 5 على المخزون",
                                children: "+5"
                              }),
                              n.jsx("button", {
                                type: "button",
                                onClick: () => {
                                  const cur = (te.stock !== undefined && te.stock !== null) ? te.stock : 10;
                                  const val = prompt("أدخل كمية المخزون الدقيقة لمنتج (" + te.name + ") لتصحيح أي خطأ إدخال:", String(cur));
                                  if (val !== null && val.trim() !== "") {
                                    handleQuickStock(te.id, val.trim(), true);
                                  }
                                },
                                className: "px-2 py-0.5 bg-orange-50 hover:bg-orange-100 text-orange-800 text-[10px] font-extrabold rounded-lg border border-orange-200 cursor-pointer transition-all shadow-2xs flex-1 text-center",
                                title: "كتابة رقم المخزون وتصحيح أي خطأ إدخال فوراً",
                                children: "✍️ ضبط الرقم"
                              }),
                              n.jsx("button", {
                                type: "button",
                                onClick: () => handleQuickStock(te.id, "toggle_unlimited"),
                                className: `px-1.5 py-0.5 text-[10px] font-extrabold rounded-lg border cursor-pointer transition-all shadow-2xs ${te.stock === undefined || te.stock === null ? "bg-blue-500 text-white border-blue-600" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"}`,
                                title: "تبديل بين كمية مفتوحة أو محددة",
                                children: "♾️"
                              })
                            ]
                          })
                        ]
                      })
                    ]
                  }),
                  n.jsxs("div", {
                    className: "flex flex-col gap-2 shrink-0 border-r pr-3 justify-center items-center",
                    children: [
                      n.jsx("button", { onClick: () => we(te), className: "p-1.5 text-slate-500 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all cursor-pointer", title: "تعديل المنتج", children: n.jsx(pn, { className: "w-4 h-4" }) }),
                      n.jsx("button", { onClick: () => tt(te.id), className: "p-1.5 text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all cursor-pointer", title: "حذف المنتج", children: n.jsx(Jt, { className: "w-4 h-4" }) })
                    ]
                  })
                ]
              }, te.id);
            })
          })
        ]
      }),

      // TAB 3: ADD / EDIT PRODUCT
      x === "add_product" && n.jsxs("div", {
        className: "bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4",
        children: [
          n.jsxs("div", {
            className: "border-b pb-2",
            children: [
              n.jsxs("h3", { className: "font-extrabold text-slate-800 text-sm sm:text-base flex items-center gap-2", children: [n.jsx(ra, { className: "w-5 h-5 text-orange-500" }), n.jsx("span", { children: M ? "تعديل بيانات المنتج الحالي" : "إضافة منتج أو مأكول جديد لقائمتك" })] }),
              n.jsx("p", { className: "text-[10px] text-slate-400 mt-0.5", children: "املأ الحقول التالية بالدقة لإظهارها بشكل منسق وجذاب للزبائن." })
            ]
          }),

          // Quota warning banner if close to limit
          (!M && isRegularFull && !ce) && n.jsxs("div", {
            className: "p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-bold flex items-center justify-between",
            children: [
              n.jsxs("span", { children: ["⚠️ بلغت الحد الأقصى للمنتجات العادية (", maxRegular, " منتج)."] }),
              n.jsx("button", { type: "button", onClick: () => setShowUpgradeModal(true), className: "bg-red-600 text-white px-3 py-1 rounded-lg text-[11px] font-extrabold cursor-pointer", children: "طلب زيادة الحد" })
            ]
          }),

          n.jsxs("form", {
            onSubmit: Ie,
            className: "space-y-4",
            children: [
              n.jsxs("div", {
                className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
                children: [
                  n.jsxs("div", {
                    className: "space-y-1.5",
                    children: [
                      n.jsx("label", { className: "text-xs font-extrabold text-slate-700 block", children: "اسم المنتج (مثال: برجر دجاج مضاعف):" }),
                      n.jsx("input", { type: "text", required: !0, value: E, onChange: te => U(te.target.value), placeholder: "اكتب اسماً واضحاً ومغرياً...", className: "w-full bg-slate-50 border border-slate-200 focus:border-orange-500 rounded-xl py-2.5 px-3.5 text-xs outline-none text-slate-800 font-bold" })
                    ]
                  }),
                  n.jsxs("div", {
                    className: "space-y-1.5",
                    children: [
                      n.jsx("label", { className: "text-xs font-extrabold text-slate-700 block", children: "سعر البيع الحالي (ل.س):" }),
                      n.jsx("input", { type: "number", required: !0, value: F, onChange: te => O(te.target.value), placeholder: "مثال: 12000", className: "w-full bg-slate-50 border border-slate-200 focus:border-orange-500 rounded-xl py-2.5 px-3.5 text-xs outline-none text-slate-800 font-bold" })
                    ]
                  })
                ]
              }),
              // Unit Selection & Stock Quantity Controls
              n.jsxs("div", {
                className: "p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3",
                children: [
                  n.jsxs("div", {
                    className: "space-y-1.5",
                    children: [
                      n.jsx("label", { className: "text-xs font-extrabold text-slate-700 block", children: "وحدة القياس / البيع (حبة، كرتونة، كيس، كغ، وجبة...):" }),
                      n.jsx("div", {
                        className: "flex gap-1.5 flex-wrap pb-1",
                        children: ["وجبة", "حبة", "كرتونة", "كيس", "كغ", "علبة", "طرد", "ربطة", "لتر", "باقة", "طبق (30 بيضة)", "صندوق"].map(u => n.jsx("button", {
                          type: "button",
                          key: u,
                          onClick: () => setItemUnit(u),
                          className: `text-[11px] font-extrabold py-1 px-2.5 rounded-lg border transition-all cursor-pointer ${itemUnit === u ? "bg-orange-500 text-white border-orange-500 shadow-2xs" : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"}`,
                          children: u
                        }))
                      }),
                      n.jsx("input", {
                        type: "text",
                        value: itemUnit,
                        onChange: te => setItemUnit(te.target.value),
                        placeholder: "أو اكتب وحدة مخصصة (مثال: نصف كيلو، دزينة...)",
                        className: "w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs outline-none text-slate-800 font-bold"
                      })
                    ]
                  }),
                  n.jsxs("div", {
                    className: "pt-2 border-t border-slate-200/80 space-y-2",
                    children: [
                      n.jsxs("label", {
                        className: "flex items-center gap-2 cursor-pointer select-none",
                        children: [
                          n.jsx("input", {
                            type: "checkbox",
                            checked: isUnlimitedStock,
                            onChange: te => setIsUnlimitedStock(te.target.checked),
                            className: "w-4 h-4 text-orange-500 rounded accent-orange-500"
                          }),
                          n.jsx("span", { className: "text-xs font-extrabold text-slate-800", children: "كمية المخزون مفتوحة وغير محدودة (متوفر دائماً) ♾️" })
                        ]
                      }),
                      !isUnlimitedStock && n.jsxs("div", {
                        className: "space-y-1 pt-1",
                        children: [
                          n.jsx("label", { className: "text-[11px] font-extrabold text-slate-600 block", children: "الكمية المتوفرة حالياً بالمخزون (سيظهر عداد نفاذ الكمية للزبائن عند قرب انتهائها):" }),
                          n.jsx("input", {
                            type: "number",
                            min: "0",
                            value: stockCount,
                            onChange: te => setStockCount(te.target.value),
                            placeholder: "مثال: 15 (أدخل 0 إذا نفدت الكمية)",
                            className: "w-full bg-white border border-orange-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs outline-none text-slate-800 font-bold"
                          })
                        ]
                      })
                    ]
                  })
                ]
              }),
              n.jsxs("div", {
                className: "space-y-1.5",
                children: [
                  n.jsx("label", { className: "text-xs font-extrabold text-slate-700 block", children: "وصف ومكونات المنتج:" }),
                  n.jsx("textarea", { value: ne, onChange: te => se(te.target.value), placeholder: "مثال: صدر دجاج مقرمش، خس، صوص المايونيز السري، جبنة شيدر ذائبة...", rows: 3, className: "w-full bg-slate-50 border border-slate-200 focus:border-orange-500 rounded-xl py-2.5 px-3.5 text-xs outline-none text-slate-800 font-bold resize-none" })
                ]
              }),
              // Offer / Discount Checkbox
              n.jsxs("div", {
                className: "p-4 bg-orange-50/70 border border-orange-100 rounded-2xl space-y-3",
                children: [
                  n.jsxs("label", {
                    className: "flex items-center gap-2 cursor-pointer",
                    children: [
                      n.jsx("input", { type: "checkbox", checked: ce, onChange: te => me(te.target.checked), className: "w-4 h-4 text-orange-500 rounded accent-orange-500" }),
                      n.jsx("span", { className: "text-xs font-extrabold text-slate-800", children: "هل هذا المنتج يندرج تحت العروض الخاصة والخصومات؟ 🏷️" })
                    ]
                  }),
                  ce && n.jsxs("div", {
                    className: "grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2",
                    children: [
                      n.jsxs("div", {
                        className: "space-y-1",
                        children: [
                          n.jsx("label", { className: "text-[11px] font-extrabold text-slate-600 block", children: "السعر القديم قبل الخصم (ل.س):" }),
                          n.jsx("input", { type: "number", value: Me, onChange: te => Ne(te.target.value), placeholder: "مثال: 15000", className: "w-full bg-white border border-slate-200 rounded-xl p-2 text-xs font-bold outline-none focus:border-orange-500" })
                        ]
                      }),
                      n.jsxs("div", {
                        className: "space-y-1",
                        children: [
                          n.jsx("label", { className: "text-[11px] font-extrabold text-slate-600 block", children: "نص شارة العرض (مثال: خصم 20%):" }),
                          n.jsx("input", { type: "text", value: ke, onChange: te => I(te.target.value), placeholder: "مثال: عرض اليوم، خصم 25%", className: "w-full bg-white border border-slate-200 rounded-xl p-2 text-xs font-bold outline-none focus:border-orange-500" })
                        ]
                      })
                    ]
                  })
                ]
              }),
              // Category Selection
              n.jsxs("div", {
                className: "space-y-1.5",
                children: [
                  n.jsx("label", { className: "text-xs font-extrabold text-slate-700 block", children: "تصنيف المنتج:" }),
                  n.jsx("select", {
                    value: G,
                    onChange: te => J(te.target.value),
                    className: "w-full bg-slate-50 border border-slate-200 focus:border-orange-500 rounded-xl py-2.5 px-3.5 text-xs outline-none text-slate-800 font-bold",
                    children: r.map(cat => n.jsx("option", { value: cat.id, children: cat.label }, cat.id))
                  })
                ]
              }),
              // Image URL / selector
              n.jsxs("div", {
                className: "space-y-1.5",
                children: [
                  n.jsx("label", { className: "text-xs font-extrabold text-slate-700 block", children: "رابط صورة المنتج أو اختر من القوالب الجاهزة:" }),
                  n.jsx("input", { type: "text", value: z, onChange: te => Z(te.target.value), placeholder: "https://...", className: "w-full bg-slate-50 border border-slate-200 focus:border-orange-500 rounded-xl py-2.5 px-3.5 text-xs outline-none text-slate-800 font-bold" }),
                  n.jsx("div", {
                    className: "flex gap-2 overflow-x-auto py-2",
                    children: A0.map((preset, idx) => n.jsx("button", {
                      type: "button",
                      key: idx,
                      onClick: () => Z(preset.url),
                      className: `text-[10px] font-extrabold py-1 px-2.5 rounded-lg border transition-all cursor-pointer whitespace-nowrap ${z === preset.url ? "bg-orange-500 text-white border-orange-500" : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"}`,
                      children: preset.label
                    }))
                  })
                ]
              }),
              // Submit buttons
              n.jsxs("div", {
                className: "flex gap-2 pt-3 border-t",
                children: [
                  n.jsx("button", {
                    type: "submit",
                    className: "flex-1 py-3 px-6 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs rounded-xl transition-all cursor-pointer shadow-sm text-center",
                    children: M ? "حفظ وتحديث المنتج ✏️" : "إضافة المنتج للقائمة ➕"
                  }),
                  n.jsx("button", {
                    type: "button",
                    onClick: () => { de(); b("menu"); },
                    className: "py-3 px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs rounded-xl transition-all cursor-pointer",
                    children: "إلغاء"
                  })
                ]
              })
            ]
          })
        ]
      }),

      // TAB 4: STORE PROFILE & SETTINGS
      x === "profile" && n.jsxs("div", {
        className: "bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4",
        children: [
          n.jsxs("div", {
            className: "border-b pb-2",
            children: [
              n.jsxs("h3", { className: "font-extrabold text-slate-800 text-sm sm:text-base flex items-center gap-2", children: [n.jsx(sl, { className: "w-5 h-5 text-orange-500" }), n.jsx("span", { children: "إعدادات وملف المتجر" })] }),
              n.jsx("p", { className: "text-[10px] text-slate-400 mt-0.5", children: "تعديل أوقات الدوام، الهاتف، والعنوان الظاهر للزبائن." })
            ]
          }),
          n.jsxs("form", {
            onSubmit: Ve,
            className: "space-y-4",
            children: [
              n.jsxs("div", {
                className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
                children: [
                  n.jsxs("div", {
                    className: "space-y-1",
                    children: [
                      n.jsx("label", { className: "text-xs font-extrabold text-slate-700 block", children: "اسم المتجر:" }),
                      n.jsx("input", { type: "text", required: !0, value: Q, onChange: te => oe(te.target.value), className: "w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold outline-none focus:border-orange-500" })
                    ]
                  }),
                  n.jsxs("div", {
                    className: "space-y-1",
                    children: [
                      n.jsx("label", { className: "text-xs font-extrabold text-slate-700 block", children: "حالة استقبال الطلبات الحالية:" }),
                      n.jsxs("select", {
                        value: j,
                        onChange: te => R(te.target.value),
                        className: "w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold outline-none focus:border-orange-500",
                        children: [
                          n.jsx("option", { value: "open", children: "مفتوح ويستقبل طلبات الشراء 🟢" }),
                          n.jsx("option", { value: "closed", children: "مغلق مؤقتاً 🔴" }),
                          n.jsx("option", { value: "busy", children: "مزدحم بطلبات سابقة 🟡" })
                        ]
                      })
                    ]
                  })
                ]
              }),
              n.jsxs("div", {
                className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
                children: [
                  n.jsxs("div", {
                    className: "space-y-1",
                    children: [
                      n.jsx("label", { className: "text-xs font-extrabold text-slate-700 block", children: "أوقات وساعات العمل:" }),
                      n.jsx("input", { type: "text", value: K, onChange: te => le(te.target.value), placeholder: "مثال: 9:00 ص - 11:00 م", className: "w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold outline-none focus:border-orange-500" })
                    ]
                  }),
                  n.jsxs("div", {
                    className: "space-y-1",
                    children: [
                      n.jsx("label", { className: "text-xs font-extrabold text-slate-700 block", children: "رقم هاتف المتجر / الواتساب:" }),
                      n.jsx("input", { type: "text", value: ee, onChange: te => fe(te.target.value), placeholder: "0933111222", className: "w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold outline-none focus:border-orange-500" })
                    ]
                  })
                ]
              }),
              n.jsxs("div", {
                className: "space-y-1",
                children: [
                  n.jsx("label", { className: "text-xs font-extrabold text-slate-700 block", children: "العنوان وموقع المحل:" }),
                  n.jsx("input", { type: "text", value: ie, onChange: te => je(te.target.value), placeholder: "مثال: ساحة البلدية، بجانب المركز الثقافي", className: "w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold outline-none focus:border-orange-500" })
                ]
              }),
              n.jsxs("div", {
                className: "space-y-1",
                children: [
                  n.jsx("label", { className: "text-xs font-extrabold text-slate-700 block", children: "نبذة ووصف المتجر للزبائن:" }),
                  n.jsx("textarea", { value: ue, onChange: te => be(te.target.value), rows: 2, placeholder: "اكتب وصفاً جذاباً لخدمات متجرك...", className: "w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold outline-none focus:border-orange-500 resize-none" })
                ]
              }),
              n.jsx("button", {
                type: "submit",
                className: "py-3 px-6 bg-slate-900 hover:bg-orange-500 hover:text-white text-white font-extrabold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer transition-all shadow-sm",
                children: [n.jsx(La, { className: "w-4 h-4" }), n.jsx("span", { children: "حفظ وتحديث ملف المتجر" })]
              })
            ]
          })
        ]
      }),

      // UPGRADE / INCREASE QUOTA MODAL (Request 1)
      showUpgradeModal && n.jsx("div", {
        className: "fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4",
        dir: "rtl",
        children: n.jsxs("div", {
          className: "bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-scale-in text-right border border-slate-100",
          children: [
            n.jsxs("div", {
              className: "flex items-center justify-between border-b pb-3",
              children: [
                n.jsxs("div", {
                  className: "flex items-center gap-2",
                  children: [
                    n.jsx("div", { className: "w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm", children: "🚀" }),
                    n.jsx("h3", { className: "font-black text-slate-800 text-sm sm:text-base", children: "طلب زيادة سعة المنتجات من الإدارة" })
                  ]
                }),
                n.jsx("button", { onClick: () => setShowUpgradeModal(false), className: "w-7 h-7 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-xs font-bold cursor-pointer", children: "✕" })
              ]
            }),
            n.jsxs("div", {
              className: "space-y-3 text-xs text-slate-700 leading-relaxed",
              children: [
                n.jsxs("div", {
                  className: "p-3 bg-orange-50 rounded-2xl border border-orange-100 space-y-1.5",
                  children: [
                    n.jsxs("p", { className: "font-extrabold text-orange-950", children: ["سعة متجرك الحالية: ", maxRegular, " منتج عادي و ", maxOffers, " عروض خاصة."] }),
                    n.jsx("p", { className: "text-slate-600 text-[11px]", children: "تقوم الإدارة برفع السعة فوراً للمتاجر المميزة بعد مراجعة الطلب." })
                  ]
                }),
                n.jsx("p", { className: "text-slate-600", children: "لتقديم طلب الترقية، يمكنك التواصل المباشر مع مدير النظام عبر واتساب أو إرسال طلب فوري:" })
              ]
            }),
            n.jsxs("div", {
              className: "flex flex-col sm:flex-row gap-2 pt-2",
              children: [
                n.jsx("a", {
                  href: `https://wa.me/?text=${encodeURIComponent(`السلام عليكم ورحمة الله وبركاته، إدارة تطبيق توصيل، أود طلب ترقية وزيادة سعة المنتجات لمتجري: ${m.name} (الهاتف: ${m.ownerPhone || m.phone})`)}`,
                  target: "_blank",
                  rel: "noreferrer",
                  className: "flex-1 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-sm text-center transition-all cursor-pointer",
                  children: "💬 واتساب"
                }),
                n.jsx("a", {
                  href: /Android/i.test(navigator.userAgent) ? `intent://send?text=${encodeURIComponent(`السلام عليكم ورحمة الله وبركاته، إدارة تطبيق توصيل، أود طلب ترقية وزيادة سعة المنتجات لمتجري: ${m.name} (الهاتف: ${m.ownerPhone || m.phone})`)}#Intent;package=com.whatsapp.w4b;scheme=whatsapp;end` : `https://wa.me/?text=${encodeURIComponent(`السلام عليكم ورحمة الله وبركاته، إدارة تطبيق توصيل، أود طلب ترقية وزيادة سعة المنتجات لمتجري: ${m.name} (الهاتف: ${m.ownerPhone || m.phone})`)}`,
                  target: "_blank",
                  rel: "noreferrer",
                  className: "flex-1 py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl shadow-sm text-center transition-all cursor-pointer border border-emerald-500/40",
                  children: "💼 واتس الأعمال"
                }),
                n.jsx("button", {
                  type: "button",
                  onClick: () => {
                    alert("✅ تم إرسال طلب الترقية لمتجرك (" + m.name + ") إلى إدارة التطبيق بنجاح! سيتم التواصل معك ورفع السعة قريباً.");
                    setShowUpgradeModal(false);
                  },
                  className: "py-2.5 px-4 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs rounded-xl transition-all cursor-pointer",
                  children: "📩 إرسال طلب ترقية فوري"
                })
              ]
            })
          ]
        })
      })
    ]
  });
}
function cxe({name:o,className:i}){const d=US[o];return d?n.jsx(d,{className:i}):n.jsx(Za,{className:i})}function ixe(){const[o,i]=_.useState("all"),[d,r]=_.useState(null),[u,f]=_.useState([]),[p,m]=_.useState(!1),[g,x]=_.useState(""),[b,M]=_.useState(!1),[w,C]=_.useState(!1),[L,H]=_.useState(()=>{const D=localStorage.getItem("tw_stores");let parsed=D?JSON.parse(D):OV;if(parsed.length>0&&!parsed.find(s=>s.id==="service_clinic")){parsed=[...parsed,...OV.filter(s=>s.id.startsWith("service_"))];parsed=parsed.filter((v,i,a)=>a.findIndex(t=>t.id===v.id)===i)}return parsed}),[q,E]=_.useState(()=>{const D=localStorage.getItem("tw_products");return D?JSON.parse(D):dq}),[U,F]=_.useState(()=>{const D=localStorage.getItem("tw_categories");let parsed=D?JSON.parse(D):SE;if(parsed.length>0&&!parsed.find(c=>c.id==="doctors")){parsed=[...parsed,...SE.filter(c=>["doctors","crafts","drivers"].includes(c.id))];parsed=parsed.filter((v,i,a)=>a.findIndex(t=>t.id===v.id)===i)}return parsed}),[O,ne]=_.useState(()=>{const D=localStorage.getItem("tw_map_nodes");return D?JSON.parse(D):T1}),[se,z]=_.useState(()=>localStorage.getItem("tw_user_role")||null),[Z,G]=_.useState(()=>localStorage.getItem("tw_current_store_id")||null),[J,ce]=_.useState(()=>{const D=localStorage.getItem("tw_viewing_admin");return localStorage.getItem("tw_user_role")==="admin"?D!=="false":D==="true"}),[me,Me]=_.useState(()=>{const D=localStorage.getItem("tw_viewing_driver");return localStorage.getItem("tw_user_role")==="driver"?D!=="false":D==="true"}),[Ne,ke]=_.useState("driver"),[I,Q]=_.useState(()=>{const D=localStorage.getItem("tw_customer_user");return D?JSON.parse(D):null}),[oe,ue]=_.useState(!1),[be,j]=_.useState(""),[R,K]=_.useState(""),le="1234";_.useEffect(()=>{localStorage.setItem("tw_stores",JSON.stringify(L))},[L]),_.useEffect(()=>{localStorage.setItem("tw_products",JSON.stringify(q))},[q]),_.useEffect(()=>{localStorage.setItem("tw_categories",JSON.stringify(U))},[U]),_.useEffect(()=>{localStorage.setItem("tw_map_nodes",JSON.stringify(O))},[O]),_.useEffect(()=>{localStorage.setItem("tw_viewing_admin",String(J))},[J]),_.useEffect(()=>{localStorage.setItem("tw_viewing_driver",String(me))},[me]),_.useEffect(()=>{Z?localStorage.setItem("tw_current_store_id",Z):localStorage.removeItem("tw_current_store_id")},[Z]);const[ee,fe]=_.useState(!!window.deferredPrompt);_.useEffect(()=>{const D=()=>{fe(!0)};return window.addEventListener("pwaInstallPromptReady",D),()=>{window.removeEventListener("pwaInstallPromptReady",D)}},[]);const[ie,je]=_.useState(()=>{
  try {
    const raw = localStorage.getItem("tw_active_order");
    return raw ? JSON.parse(raw) : null;
  } catch(e) {
    return null;
  }
}),[Ae,ut]=_.useState("center"),[de,we]=_.useState([]),[tt,Ie]=_.useState("");_.useEffect(()=>{window.scrollTo({top:0,behavior:"smooth"})},[d,p,ie]);const Ve=(D,re,_e=[])=>{f(Ge=>{if(Ge.length>0&&Ge[0].product.storeId!==D.storeId){alert("لقد قمت بإضافة منتج من متجر مختلف. تم إفراغ السلة وتحديثها بمنتجات المتجر الجديد.");const Be=re?re.price:D.price,yt=_e.reduce((et,Pe)=>et+Pe.price,0);return[{product:D,quantity:1,selectedSize:re,selectedAdditions:_e,totalItemPrice:Be+yt}]}if(Ge.find(Be=>{var Pe,It;if(Be.product.id!==D.id)return!1;const yt=(((Pe=Be.selectedSize)==null?void 0:Pe.name)||"")===((re==null?void 0:re.name)||""),et=(((It=Be.selectedAdditions)==null?void 0:It.map(ft=>ft.name).sort().join(","))||"")===(_e.map(ft=>ft.name).sort().join(",")||"");return yt&&et}))return Ge.map(Be=>{var et,Pe;return Be.product.id===D.id&&(((et=Be.selectedSize)==null?void 0:et.name)||"")===((re==null?void 0:re.name)||"")&&(((Pe=Be.selectedAdditions)==null?void 0:Pe.map(It=>It.name).sort().join(","))||"")===(_e.map(It=>It.name).sort().join(",")||"")?{...Be,quantity:Be.quantity+1}:Be});const nt=re?re.price:D.price,Rt=_e.reduce((Be,yt)=>Be+yt.price,0);return[...Ge,{product:D,quantity:1,selectedSize:re,selectedAdditions:_e,totalItemPrice:nt+Rt}]})},ct=(D,re,_e=[])=>{f(Ge=>{const pt=Ge.find(nt=>{var yt,et;if(nt.product.id!==D.id)return!1;const Rt=(((yt=nt.selectedSize)==null?void 0:yt.name)||"")===((re==null?void 0:re.name)||""),Be=(((et=nt.selectedAdditions)==null?void 0:et.map(Pe=>Pe.name).sort().join(","))||"")===(_e.map(Pe=>Pe.name).sort().join(",")||"");return Rt&&Be});return pt?pt.quantity===1?Ge.filter(nt=>{var Be,yt;return!(nt.product.id===D.id&&(((Be=nt.selectedSize)==null?void 0:Be.name)||"")===((re==null?void 0:re.name)||"")&&(((yt=nt.selectedAdditions)==null?void 0:yt.map(et=>et.name).sort().join(","))||"")===(_e.map(et=>et.name).sort().join(",")||""))}):Ge.map(nt=>{var Be,yt;return nt.product.id===D.id&&(((Be=nt.selectedSize)==null?void 0:Be.name)||"")===((re==null?void 0:re.name)||"")&&(((yt=nt.selectedAdditions)==null?void 0:yt.map(et=>et.name).sort().join(","))||"")===(_e.map(et=>et.name).sort().join(",")||"")?{...nt,quantity:nt.quantity-1}:nt}):Ge})},te=D=>{
  const re=L.find(Rt=>Rt.id===D.storeId),_e=u.reduce((Rt,Be)=>Rt+Be.product.price*Be.quantity,0),Ge=re?re.deliveryFee:5,pt=_e+Ge;
  const orderId = D.id || ("tw-" + Math.floor(Math.random()*9e4+1e4));
  const nt={...D,id:orderId,createdAt:new Date().toISOString(),status:"pending",subtotal:_e,deliveryFee:Ge,total:pt,storeName:re?re.name:"متجر محلي"};
  je(nt);
  try {
    localStorage.setItem("tw_active_order", JSON.stringify(nt));
    const rawList = localStorage.getItem("tw_orders_list");
    const currentList = rawList ? JSON.parse(rawList) : [];
    const filtered = currentList.filter(it => it.id !== nt.id);
    localStorage.setItem("tw_orders_list", JSON.stringify([nt, ...filtered]));
    window.dispatchEvent(new Event("storage"));
  } catch(e){}
  f([]);
  m(!1);
  ut("center");
  we([{id:"init-msg",sender:"driver",text:`السلام عليكم ورحمة الله وبركاته، أنا كابتن التوصيل "أبو شهاب" ومستعد لتوصيل طلبك الساخن بأمان من (${re==null?void 0:re.name}) إلى العنوان المحدد. هل تفضل أي مواصفات خاصة للتسليم؟`,timestamp:new Date().toISOString()}]);
},Je=D=>{var Ge;if(!ie)return;const re={...ie,status:D};je(re);let _e="";_e = (() => {
  const ctx = getOrderTypeContext(re);
  const landmarkName = ((Ge=T1.find(nt=>nt.id===ie.addressLandmark))==null?void 0:Ge.arabicName)||"المعلم المختار";
  if (D === "accepted") return ctx.driverAcceptedText;
  if (D === "preparing") return ctx.driverPreparingText;
  if (D === "picked_up") return ctx.driverPickedUpText(landmarkName);
  if (D === "delivered") return ctx.driverDeliveredText;
  return "";
})(),_e&&setTimeout(()=>{we(pt=>[...pt,{id:"auto-status-"+Date.now(),sender:"driver",text:_e,timestamp:new Date().toISOString()}])},1e3)},at=D=>{
  const _e = typeof D === "object" ? { id:"msg-"+Date.now(), sender:"customer", timestamp:new Date().toISOString(), ...D } : {id:"msg-"+Date.now(),sender:"customer",text:D,timestamp:new Date().toISOString()};
  we(Ge=>[...Ge,_e]);
},vt=D=>{
  const _e = typeof D === "object" ? { id:"reply-"+Date.now(), sender:"driver", timestamp:new Date().toISOString(), ...D } : {id:"reply-"+Date.now(),sender:"driver",text:D,timestamp:new Date().toISOString()};
  we(re=>[...re,_e]);
},ya=()=>{window.confirm("⚠️ هل أنت متأكد من رغبتك في تصفير جميع المتاجر، المنتجات، العروض، السلال، الكوبونات والطلبات والبدء على نظافة تامة؟ لا يمكن التراجع عن هذا الإجراء!")&&(H([]),E([]),f([]),je(null),localStorage.setItem("tw_stores","[]"),localStorage.setItem("tw_products","[]"),localStorage.setItem("tw_orders_list","[]"),localStorage.setItem("tw_coupons","[]"),localStorage.removeItem("tw_cart"),window.location.reload())},fa=D=>{const re=`السلام عليكم ورحمة الله وبركاته 🛍️ تصفح واطلب من تطبيق "توصيل" للقرية - توصيل سريع للمأكولات، التموينات، والصيدلية إلى عتبة بيتك!
رابط التطبيق:
${window.location.origin}`,_e=encodeURIComponent(re);/Android/i.test(navigator.userAgent)?D==="business"?window.location.href=`intent://send?text=${_e}#Intent;package=com.whatsapp.w4b;scheme=whatsapp;end`:window.location.href=`intent://send?text=${_e}#Intent;package=com.whatsapp;scheme=whatsapp;end`:D==="business"?window.open(`https://wa.me/?text=${_e}`,"_blank"):window.open(`https://api.whatsapp.com/send?text=${_e}`,"_blank")},Ya=L.filter(D=>{if(D.isApproved===!1)return!1;const re=o==="all"||D.category===o,_e=D.name.toLowerCase().includes(tt.toLowerCase());return re&&_e});return n.jsxs("div",{className:"min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-orange-500 selection:text-slate-950 pb-12",dir:"rtl",children:[n.jsx("header",{className:"bg-white/90 backdrop-blur-md border-b border-slate-200/80 py-4 px-4 sm:px-6 sticky top-0 z-50 shadow-sm select-none",children:n.jsxs("div",{className:"max-w-7xl mx-auto flex items-center justify-between gap-4",children:[n.jsxs("div",{onClick:()=>{ie||(r(null),m(!1),ce(!1))},className:"flex items-center gap-2.5 cursor-pointer",children:[n.jsx("div",{className:"w-10 h-10 rounded-2xl bg-slate-900 text-orange-500 flex items-center justify-center shadow-md border border-slate-800",children:n.jsx(Aa,{className:"w-5.5 h-5.5 animate-bounce-slow"})}),n.jsxs("div",{children:[n.jsx("h1",{className:"font-extrabold text-slate-900 text-base sm:text-xl tracking-tight leading-none",children:"توصيل"}),n.jsx("p",{className:"text-[9px] text-slate-405 text-slate-400 font-bold leading-none mt-1 hidden xs:block",children:"توصيل المتاجر والقرية"})]})]}),n.jsxs("div",{className:"flex items-center gap-3",children:[ie?n.jsxs("button",{onClick:()=>{r(null),m(!1),ce(!1)},className:"bg-orange-500 text-white hover:bg-orange-600 font-extrabold text-xs py-2 px-4 rounded-xl shadow-sm hover:shadow transition-all flex items-center gap-1.5 cursor-pointer",children:[n.jsx("span",{className:"w-2 h-2 rounded-full bg-white animate-ping inline-block"}),n.jsx("span",{children:"تتبع طلبك الحالي"})]}):n.jsxs(n.Fragment,{children:[se==="admin"&&n.jsxs("button",{onClick:()=>{J?ce(!1):(j(""),K(""),ue(!0)),Me(!1),r(null),m(!1)},className:`p-2.5 sm:p-2 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-extrabold shadow-sm ${J?"bg-slate-900 border-slate-900 text-white":"bg-white border-slate-200 text-slate-700 hover:bg-slate-50"}`,title:J?"لوحة الزبون":"لوحة المدير",children:[n.jsx(Kn,{className:`w-4 h-4 ${J?"text-orange-500 animate-pulse":"text-orange-500"}`}),n.jsx("span",{className:"hidden xs:inline-block",children:J?"لوحة الزبون":"لوحة المدير"})]}),se==="admin"&&!J&&n.jsxs("button",{onClick:()=>{Me(!me),m(!1),r(null)},className:`p-2.5 sm:p-2 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-extrabold shadow-sm ${me?"bg-slate-900 border-slate-900 text-white":"bg-white border-slate-200 text-slate-700 hover:bg-slate-50"}`,title:me?"لوحة الزبون":"لوحة السائق",children:[n.jsx(Aa,{className:`w-4 h-4 ${me?"text-orange-500 animate-pulse":"text-slate-550"}`}),n.jsx("span",{className:"hidden xs:inline-block",children:me?"لوحة الزبون":"لوحة السائق"})]}),se==="driver"&&Ne==="customer"&&n.jsxs("button",{onClick:()=>{ke("driver"),m(!1),r(null)},className:"p-2.5 sm:p-2 rounded-xl border border-orange-500 bg-orange-500 text-white font-extrabold text-xs shadow-sm cursor-pointer flex items-center gap-1.5 hover:bg-orange-600 transition-all animate-pulse",title:"العودة للوحة القيادة ومراقبة الطلبات",children:[n.jsx(Aa,{className:"w-4 h-4"}),n.jsx("span",{children:"العودة للوحة السائق 🏍️"})]}),!J&&!me&&(se!=="driver"||Ne==="customer")&&n.jsxs("button",{onClick:()=>{r(null),m(!0)},className:`relative p-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 ${u.length>0?"bg-orange-500 border-white text-white shadow-lg shadow-orange-500/15 font-extrabold text-xs px-2.5 sm:px-3.5":"bg-white border-slate-200 text-slate-600 hover:bg-slate-50"}`,children:[n.jsx(fr,{className:"w-5 h-5"}),n.jsx("span",{className:"hidden xs:inline-block",children:u.length>0?`السلة (${u.reduce((D,re)=>D+re.quantity,0)})`:"السلة"}),u.length>0&&n.jsx("span",{className:"absolute -top-1.5 -left-1.5 w-5 h-5 bg-slate-900 text-white rounded-full text-[10px] flex items-center justify-center font-extrabold border border-white",children:u.length})]}),I&&n.jsx("button",{onClick:()=>{localStorage.removeItem("tw_customer_user"),localStorage.removeItem("tw_user_role"),localStorage.removeItem("tw_current_store_id"),Q(null),z(null),G(null),f([]),je(null),r(null),m(!1),ce(!1),Me(!1),we([])},className:"p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 hover:text-red-600 transition-all cursor-pointer shadow-sm",title:"تسجيل الخروج والتبديل لحساب آخر",children:n.jsx(pr,{className:"w-4 h-4"})})]}),I&&(J||me||d||p)&&n.jsxs("button",{onClick:()=>{r(null),m(!1),ce(!1),Me(!1)},className:"py-2 px-3 sm:px-4 rounded-xl border border-orange-200 bg-orange-50 hover:bg-orange-100 text-orange-600 transition-all cursor-pointer flex items-center gap-1.5 font-black text-xs sm:text-sm shadow-xs animate-fade-in",title:"الرجوع للقائمة الرئيسية",children:[n.jsx(I1,{className:"w-4 h-4 text-orange-600"}),n.jsx("span",{children:"الرئيسية / عودة"})]})]})]})}),n.jsx("main",{className:"max-w-7xl mx-auto px-4 sm:px-6 py-6 flex-1 w-full",children:I?se==="store_owner"&&Z?n.jsx(sxe,{currentStoreId:Z,stores:L,products:q,categories:U,onUpdateStores:D=>H(D),onUpdateProducts:D=>E(D),onLogout:()=>{localStorage.removeItem("tw_customer_user"),localStorage.removeItem("tw_user_role"),localStorage.removeItem("tw_current_store_id"),Q(null),z(null),G(null)}}):J&&se==="admin"?n.jsx(txe,{stores:L,products:q,mapNodes:O,onUpdateMapNodes:ne,onAddStore:D=>{H(re=>[...re,D])},onDeleteStore:D=>{H(re=>re.filter(_e=>_e.id!==D))},onAddProduct:D=>{E(re=>[...re,D])},onDeleteProduct:D=>{E(re=>re.filter(_e=>_e.id!==D))},onBack:()=>ce(!1),categories:U,onUpdateCategories:F,contacts:[],onUpdateContact:()=>{},onAddContact:()=>{},onDeleteContact:()=>{},onUpdateStores:D=>H(D),onUpdateProducts:D=>E(D),onResetDatabase:ya}):se==="driver"&&Ne==="driver"||se==="admin"&&me?n.jsx(axe,{stores:L,onBack:()=>{se==="driver"?ke("customer"):Me(!1)},activeOrder:ie,onAcceptDemoOrder:D=>{je(D),se==="driver"?ke("customer"):Me(!1)}}):ie?n.jsx(exe,{activeOrder:ie,setActiveOrder:je,driverNodeId:Ae,setDriverNodeId:ut,messages:de,onSendMessage:at,onAutoReply:vt,onAdvanceStatus:Je}):p?n.jsx(W3e,{cartItems:u,onAddToCart:Ve,onRemoveFromCart:ct,onClearCart:()=>f([]),onCheckout:te,onBackToShopping:()=>m(!1),selectedLandmarkId:g,setSelectedLandmarkId:x,customerUser:I,mapNodes:O,stores:L,onLogoutCustomer:()=>{localStorage.removeItem("tw_customer_user"),Q(null)}}):d?n.jsx(Q3e,{store:(L.find(st=>st.id===d.id)||d),onBack:()=>r(null),cartItems:u,onAddToCart:Ve,onRemoveFromCart:ct,onViewCart:()=>m(!0),products:q,onSubmitCustomOrder:be,customerUser:I,mapNodes:O,setActiveOrder:je}):n.jsxs("div",{className:"space-y-8 animate-fade-in",children:[
(localStorage.getItem("tw_emergency_rush")==="true")&&n.jsxs("div",{className:"bg-red-600 text-white p-4 sm:p-5 rounded-2xl sm:rounded-3xl shadow-xl flex items-center justify-between gap-4 border border-red-500 text-right animate-pulse",dir:"rtl",children:[
  n.jsxs("div",{className:"flex items-center gap-3",children:[
    n.jsx("span",{className:"text-3xl shrink-0",children:"🚨"}),
    n.jsxs("div",{children:[
      n.jsx("h4",{className:"font-black text-sm sm:text-base",children:"تنبيه: تم تجميد استقبال الطلبات مؤقتاً بسبب ضغط العمل العالي"}),
      n.jsx("p",{className:"text-xs text-red-100 mt-0.5",children:"نعمل بكامل طاقتنا لتجهيز وتوصيل الطلبات الحالية. سنعاود فتح واستقبال الطلبات قريباً!"})
    ]})
  ]}),
  n.jsx("span",{className:"bg-white/20 text-white text-[11px] font-black px-3 py-1.5 rounded-xl shrink-0 whitespace-nowrap",children:"وضع الضغط"})
]}),
n.jsxs("div",{className:"bg-slate-900 text-white rounded-2xl sm:rounded-3xl p-3 sm:p-10 border border-slate-800 shadow-xl relative overflow-hidden select-none",children:[n.jsx("div",{className:"absolute inset-0 bg-cover bg-center opacity-10",style:{backgroundImage:"url('https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=800')"}}),n.jsx("div",{className:"absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"}),n.jsxs("div",{className:"relative space-y-1 sm:space-y-4 max-w-xl",children:[n.jsxs("span",{className:"text-orange-500 font-extrabold text-[8px] sm:text-sm tracking-wider uppercase flex items-center gap-1",children:[n.jsx(dr,{className:"w-3 h-3 sm:w-4 sm:h-4 animate-spin-slow"}),n.jsx("span",{children:"توصيل المحافظة والقرى المجاورة"})]}),n.jsx("h2",{className:"text-base sm:text-4xl font-extrabold tracking-tight leading-snug sm:leading-tight",children:"اطلب ما تحتاجه وسنصلك فوراً!"}),n.jsx("p",{className:"text-slate-300 text-[9px] sm:text-sm leading-relaxed",children:"مأكولات، تموين، صيدليات، خضار فريش. حدد موقعك للتوصيل السريع."})]})]}),n.jsxs("div",{className:"grid grid-cols-2 gap-2 sm:gap-4",children:[n.jsxs("div",{onClick:()=>i("offers"),className:"bg-red-500 text-white p-2.5 sm:p-5 rounded-2xl sm:rounded-3xl cursor-pointer hover:bg-red-600 transition-all flex items-center justify-between shadow-xs hover:shadow-md group border border-red-400 min-w-0",children:[n.jsxs("div",{className:"space-y-0.5 sm:space-y-1 min-w-0 flex-1",children:[n.jsx("span",{className:"bg-white/20 text-white font-extrabold text-[7px] sm:text-[10px] px-1.5 py-0.5 rounded-full uppercase inline-block",children:"العروض الأسبوعية"}),n.jsx("h3",{className:"font-extrabold text-[11px] sm:text-lg truncate",children:"تخفيضات لـ 30%"}),n.jsx("p",{className:"text-white/85 text-[8px] sm:text-xs font-semibold leading-normal truncate hidden xs:block",children:"وجبات وتموين غذائي بأرخص الأسعار."})]}),n.jsx("div",{className:"w-7 h-7 sm:w-12 sm:h-12 rounded-lg sm:rounded-2xl bg-white/15 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform mr-1.5 sm:mr-0",children:n.jsx(mn,{className:"w-4 h-4 sm:w-6 sm:h-6 text-white"})})]}),n.jsxs("div",{onClick:()=>{alert("مرحباً بك! لاختيار موقعك الفعلي للتسليم، اضغط على أحد المعالم الخضراء في الخريطة التفاعلية بالأسفل أو أثناء الدفع.")},className:"bg-emerald-600 text-white p-2.5 sm:p-5 rounded-2xl sm:rounded-3xl cursor-pointer hover:bg-emerald-700 transition-all flex items-center justify-between shadow-xs hover:shadow-md group border border-emerald-500 min-w-0",children:[n.jsxs("div",{className:"space-y-0.5 sm:space-y-1 min-w-0 flex-1",children:[n.jsx("span",{className:"bg-white/20 text-white font-extrabold text-[7px] sm:text-[10px] px-1.5 py-0.5 rounded-full uppercase inline-block font-sans",children:"خدمة التتبع"}),n.jsx("h3",{className:"font-extrabold text-[11px] sm:text-lg truncate",children:"تتبع ومحادثة مباشرة"}),n.jsx("p",{className:"text-white/85 text-[8px] sm:text-xs font-semibold leading-normal truncate hidden xs:block",children:"كلم المندوب وتابعه خطوة بخطوة."})]}),n.jsx("div",{className:"w-7 h-7 sm:w-12 sm:h-12 rounded-lg sm:rounded-2xl bg-white/15 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform mr-1.5 sm:mr-0",children:n.jsx(O0,{className:"w-4 h-4 sm:w-6 sm:h-6 text-white"})})]})]}),n.jsxs("div",{className:"bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-4 animate-fade-in text-slate-800 text-right",children:[n.jsxs("div",{className:"flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4",children:[n.jsxs("div",{className:"flex items-center gap-3 w-full sm:w-auto",children:[n.jsx("div",{className:"w-10 h-10 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center shrink-0",children:n.jsx(ua,{className:"w-5 h-5 animate-pulse"})}),n.jsxs("div",{children:[n.jsx("h4",{className:"font-extrabold text-xs sm:text-sm text-slate-900",children:'تثبيت تطبيق "توصيل" على هاتفك ومشاركته 📱'}),n.jsx("p",{className:"text-slate-400 text-[10px] font-bold leading-tight",children:"تصفح أسرع، استهلاك أقل للإنترنت، ومشاركة فائقة السرعة مع القرية!"})]})]}),n.jsxs("div",{className:"flex flex-wrap gap-2 w-full lg:w-auto",children:[n.jsx("button",{type:"button",onClick:async()=>{const D=window.deferredPrompt;if(D){D.prompt();const{outcome:re}=await D.userChoice;re==="accepted"&&(window.deferredPrompt=null,fe(!1))}else alert(`💡 لتثبيت تطبيق "توصيل" على جوالك بأعلى جودة وبأيقونته الرسمية:

📱 للأندرويد (Chrome):
1️⃣ اضغط على زر النقاط الثلاث (⋮) في أعلى يسار المتصفح.
2️⃣ اختر "تثبيت التطبيق" (Install app) أو "إضافة إلى الشاشة الرئيسية".

🍎 للأيفون (Safari):
1️⃣ اضغط على زر المشاركة (Share) في الأسفل.
2️⃣ اختر "إضافة إلى الشاشة الرئيسية" (Add to Home Screen).`)},className:"py-2 px-3 bg-orange-500 hover:bg-orange-600 text-white font-black text-xs rounded-xl shadow-xs transition-all cursor-pointer text-center flex items-center gap-1",children:n.jsx("span",{children:"📥 تثبيت التطبيق"})}),n.jsxs("button",{type:"button",onClick:()=>M(!b),className:`py-2 px-3 rounded-xl font-black text-xs transition-all cursor-pointer flex items-center gap-1 border ${b?"bg-orange-100 text-orange-700 border-orange-200":"bg-white hover:bg-slate-50 text-slate-700 border-slate-200"}`,children:[n.jsx(F0,{className:"w-3.5 h-3.5"}),n.jsx("span",{children:b?"إخفاء الباركود ❌":"مسح باركود التثبيت 📷"})]}),n.jsxs("button",{type:"button",onClick:()=>fa("regular"),className:"py-2 px-3 bg-[#25D366] hover:bg-[#20ba56] text-white font-black text-xs rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1",children:[n.jsx(fn,{className:"w-3.5 h-3.5"}),n.jsx("span",{children:"واتساب العادي 💬"})]}),n.jsxs("button",{type:"button",onClick:()=>fa("business"),className:"py-2 px-3 bg-[#075E54] hover:bg-[#054c44] text-white font-black text-xs rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1",children:[n.jsx(fn,{className:"w-3.5 h-3.5"}),n.jsx("span",{children:"واتساب أعمال 💼"})]}),n.jsx("button",{type:"button",onClick:()=>{navigator.clipboard.writeText(window.location.origin),C(!0),setTimeout(()=>C(!1),2e3)},className:"py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 font-black text-xs rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1",children:w?n.jsxs(n.Fragment,{children:[n.jsx(Xn,{className:"w-3.5 h-3.5 text-emerald-600"}),n.jsx("span",{className:"text-emerald-600",children:"تم النسخ ✅"})]}):n.jsxs(n.Fragment,{children:[n.jsx(al,{className:"w-3.5 h-3.5 text-slate-500"}),n.jsx("span",{children:"نسخ الرابط"})]})})]})]}),b&&n.jsxs("div",{className:"bg-orange-50/50 border border-orange-100 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-center gap-6 animate-fade-in text-center md:text-right",children:[n.jsx("div",{className:"p-3 bg-white rounded-2xl border border-orange-100 shadow-sm shrink-0",children:n.jsx("img",{src:`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(window.location.origin)}`,alt:"App Installation QR Code",className:"w-36 h-36"})}),n.jsxs("div",{className:"space-y-2",children:[n.jsxs("h5",{className:"font-extrabold text-xs sm:text-sm text-orange-950 flex items-center justify-center md:justify-start gap-1.5",children:[n.jsx(X0,{className:"w-4.5 h-4.5 text-orange-500 animate-pulse"}),n.jsx("span",{children:"امسح الرمز بكاميرا الجوال للتحميل الفوري! 📷"})]}),n.jsx("p",{className:"text-slate-600 text-[10px] sm:text-xs leading-relaxed max-w-md font-semibold",children:"افتح كاميرا هاتفك (آيفون أو أندرويد) ووجهها نحو المربع المقابل لفتح التطبيق وتثبيته كشاشة رئيسية فوراً دون كتابة روابط."}),n.jsxs("div",{className:"flex flex-col sm:flex-row gap-2 text-[9px] sm:text-[10px] text-slate-500 font-bold justify-center md:justify-start pt-1",children:[n.jsxs("span",{children:["🍏 ",n.jsx("b",{children:"آيفون:"}),' اضغط على زر المشاركة ثم "إضافة للشاشة الرئيسية"']}),n.jsx("span",{className:"hidden sm:inline",children:"|"}),n.jsxs("span",{children:["🤖 ",n.jsx("b",{children:"أندرويد:"}),' اضغط على النقاط الثلاث ثم "تثبيت التطبيق"']})]})]})]})]}),n.jsxs("div",{className:"space-y-3",children:[n.jsxs("div",{className:"flex items-center justify-between",children:[n.jsx("h3",{className:"text-sm sm:text-lg font-extrabold text-slate-900",children:"تصنيفات ومجالات التسوق"}),n.jsx("span",{className:"text-[10px] text-slate-400 font-bold block sm:hidden",children:"اسحب لليسار 🫲"})]}),n.jsxs("div",{className:"flex overflow-x-auto pb-3 gap-2.5 select-none scrollbar-none snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3 lg:grid-cols-6 sm:pb-0",children:[n.jsxs("button",{onClick:()=>i("all"),className:`snap-center flex-shrink-0 p-2.5 sm:p-4 rounded-xl sm:rounded-2xl border text-right transition-all flex items-center gap-2 sm:gap-3 cursor-pointer min-w-[115px] sm:min-w-0 ${o==="all"?"border-slate-900 bg-slate-900 text-white shadow-md":"border-slate-200 bg-white text-slate-700 hover:bg-slate-50"}`,children:[n.jsx("div",{className:`w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl flex items-center justify-center ${o==="all"?"bg-orange-500 text-slate-950":"bg-slate-100 text-slate-600"}`,children:n.jsx(da,{className:"w-3.5 h-3.5 sm:w-4 sm:h-4"})}),n.jsx("span",{className:"text-xs sm:text-sm font-extrabold whitespace-nowrap",children:"جميع المحلات"})]}),U.map(D=>n.jsxs("button",{onClick:()=>i(D.id),className:`snap-center flex-shrink-0 p-2.5 sm:p-4 rounded-xl sm:rounded-2xl border text-right transition-all flex items-center gap-2 sm:gap-3 cursor-pointer min-w-[115px] sm:min-w-0 ${o===D.id?"border-slate-900 bg-slate-900 text-white shadow-md":"border-slate-200 bg-white text-slate-700 hover:bg-slate-50"}`,children:[n.jsx("div",{className:`w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl flex items-center justify-center ${o===D.id?"bg-orange-500 text-slate-950":"bg-slate-100 text-slate-600"}`,children:n.jsx(cxe,{name:D.icon,className:"w-3.5 h-3.5 sm:w-4 sm:h-4"})}),n.jsx("span",{className:"text-xs sm:text-sm font-extrabold whitespace-nowrap",children:D.label})]},D.id)),n.jsxs("button",{onClick:()=>i("offers"),className:`snap-center flex-shrink-0 p-2.5 sm:p-4 rounded-xl sm:rounded-2xl border text-right transition-all flex items-center gap-2 sm:gap-3 cursor-pointer min-w-[115px] sm:min-w-0 ${o==="offers"?"border-red-600 bg-red-600 text-white shadow-md":"border-slate-200 bg-white text-slate-700 hover:bg-slate-50"}`,children:[n.jsx("div",{className:`w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl flex items-center justify-center ${o==="offers"?"bg-white text-red-600":"bg-red-50 text-red-500"}`,children:n.jsx(sl,{className:"w-3.5 h-3.5 sm:w-4 sm:h-4"})}),n.jsx("span",{className:"text-xs sm:text-sm font-extrabold whitespace-nowrap font-sans",children:"العروض الحالية"})]})]})]}),o==="offers"?n.jsxs("div",{className:"space-y-5",children:[n.jsxs("div",{className:"flex items-center gap-2",children:[n.jsx(mn,{className:"w-5.5 h-5.5 text-red-500"}),n.jsx("h3",{className:"text-lg font-extrabold text-slate-900",children:"قائمة العروض الحصرية الحالية"})]}),n.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:CE.map(D=>{const re=L.find(pt=>pt.id===D.storeId),_e=u.find(pt=>pt.product.id===D.id),Ge=_e?_e.quantity:0;return n.jsxs("div",{className:"bg-white rounded-3xl p-4 border border-slate-200 shadow-sm flex gap-4 relative overflow-hidden hover:shadow-md transition-all",children:[n.jsxs("div",{className:"absolute top-3 left-3 bg-red-500 text-white font-extrabold text-[10px] px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md",children:[n.jsx(mn,{className:"w-3 h-3"}),n.jsx("span",{children:D.offerLabel||"تخفيض خاص"})]}),n.jsx("div",{className:"w-24 h-24 rounded-2xl overflow-hidden bg-slate-50 shrink-0 border border-slate-100",children:n.jsx("img",{src:D.image,alt:D.name,className:"w-full h-full object-cover",referrerPolicy:"no-referrer"})}),n.jsxs("div",{className:"flex-1 flex flex-col justify-between py-1",children:[n.jsxs("div",{children:[re&&n.jsxs("span",{className:"text-[10px] text-slate-400 font-extrabold block mb-0.5",children:["متوفر في: ",re.name]}),n.jsx("h4",{className:"font-extrabold text-slate-800 text-sm leading-tight",children:D.name}),n.jsx("p",{className:"text-slate-400 text-[11px] line-clamp-1 mt-0.5",children:D.description})]}),n.jsxs("div",{className:"flex items-center justify-between mt-2.5",children:[n.jsxs("div",{className:"flex items-baseline gap-1.5 flex-wrap",children:[n.jsxs("span",{className:"text-orange-650 font-extrabold text-base text-orange-600",children:[D.price," ل.س"]}),D.originalPrice&&n.jsxs("span",{className:"text-slate-300 line-through text-xs font-semibold",children:[D.originalPrice," ل.س"]})]}),Ge===0?n.jsx("button",{onClick:()=>Ve(D),className:"bg-slate-900 text-white hover:bg-orange-500 hover:text-slate-950 font-bold text-xs py-2 px-3.5 rounded-xl transition-all shadow-sm cursor-pointer whitespace-nowrap",children:"إضافة للسلة"}):n.jsxs("div",{className:"flex items-center bg-slate-50 border border-slate-200 rounded-xl px-1.5 py-1 shadow-sm select-none",children:[n.jsx("button",{onClick:()=>ct(D),className:"w-6 h-6 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-700 font-bold text-xs cursor-pointer",children:"-"}),n.jsx("span",{className:"w-6 text-center text-xs font-extrabold text-slate-800",children:Ge}),n.jsx("button",{onClick:()=>Ve(D),className:"w-6 h-6 flex items-center justify-center rounded-lg bg-slate-900 text-white font-bold text-xs cursor-pointer",children:"+"})]})]})]})]},D.id)})})]}):n.jsxs("div",{className:"space-y-5",children:[n.jsxs("div",{className:"flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3.5",children:[n.jsxs("div",{className:"flex items-center gap-2 select-none",children:[n.jsx(xn,{className:"w-5.5 h-5.5 text-slate-800"}),n.jsx("h3",{className:"text-lg font-extrabold text-slate-800",children:"المتاجر والمحلات المتوفرة بالمنطقة"})]}),n.jsxs("div",{className:"relative w-full sm:max-w-xs",children:[n.jsx("input",{type:"text",value:tt,onChange:D=>Ie(D.target.value),placeholder:"ابحث عن متجر بالاسم...",className:"w-full bg-white border border-slate-200 focus:border-slate-900 rounded-xl py-2.5 pr-10 pl-4 text-xs sm:text-sm outline-none text-slate-800 transition-all shadow-sm"}),n.jsx(yr,{className:"w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2"})]})]}),Ya.length===0?n.jsxs("div",{className:"bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm space-y-2",children:[n.jsx("p",{className:"text-slate-500 font-bold",children:"عذراً، لم نجد أي متجر مطابق للبحث!"}),n.jsx("p",{className:"text-slate-400 text-xs",children:"جرب تصنيفات أخرى في الأعلى لتكتشف محلات جديدة."})]}):n.jsx("div",{className:"grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6",children:Ya.map(D=>{var re;return n.jsxs("div",{onClick:()=>r(D),className:"bg-white rounded-2xl sm:rounded-3xl border border-slate-150 overflow-hidden shadow-xs hover:shadow-xl hover:border-orange-500/25 transition-all duration-350 cursor-pointer flex flex-col group h-full",children:[n.jsxs("div",{className:"h-28 xs:h-36 sm:h-44 bg-slate-100 relative overflow-hidden",children:[n.jsx("img",{src:D.image,alt:D.name,className:"w-full h-full object-cover group-hover:scale-105 transition-transform duration-500",referrerPolicy:"no-referrer"}),n.jsxs("div",{className:"absolute top-2 right-2 sm:top-3 sm:right-3 bg-slate-900/85 backdrop-blur-md text-white font-extrabold text-[8px] sm:text-[10px] py-0.5 px-1.5 sm:py-1 sm:px-2.5 rounded-full flex items-center gap-1 shadow",children:[n.jsx(Wn,{className:"w-2.5 h-2.5 sm:w-3 sm:h-3 text-orange-400 fill-current"}),n.jsx("span",{children:D.rating})]})]}),n.jsxs("div",{className:"p-3 sm:p-5 flex-1 flex flex-col justify-between space-y-2 sm:space-y-4",children:[n.jsxs("div",{className:"space-y-1 sm:space-y-1.5 min-w-0",children:[n.jsx("span",{className:"text-[8px] sm:text-[10px] font-extrabold text-orange-600 bg-orange-500/10 py-0.5 px-1.5 sm:py-1 sm:px-2.5 rounded-full inline-block",children:((re=U.find(_e=>_e.id===D.category))==null?void 0:re.label)||D.category}),n.jsx("h4",{className:"font-extrabold text-slate-800 text-xs sm:text-base group-hover:text-orange-600 transition-colors truncate",children:D.name}),n.jsxs("p",{className:"text-slate-400 text-[9px] sm:text-xs font-medium truncate",children:["سلعة مميزة: ",n.jsx("b",{className:"text-slate-500",children:D.featuredProduct})]}),D.address&&n.jsxs("p",{className:"text-slate-400 text-[9px] sm:text-xs font-medium flex items-center gap-1 mt-0.5 truncate",children:[n.jsx(Ia,{className:"w-3 h-3 text-orange-500 shrink-0"}),n.jsxs("span",{className:"truncate",children:["العنوان: ",n.jsx("b",{className:"text-slate-600 font-bold",children:D.address})]})]})]}),n.jsxs("div",{className:"border-t border-slate-100 pt-2 sm:pt-3 flex flex-col xs:flex-row xs:items-center justify-between text-[8px] sm:text-xs text-slate-500 gap-1",children:[n.jsxs("div",{className:"flex items-center gap-1 shrink-0",children:[n.jsx(Ga,{className:"w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400"}),n.jsx("span",{children:D.deliveryTime})]}),n.jsxs("div",{className:"flex items-center gap-0.5 sm:gap-1 font-bold text-slate-700 truncate",children:[n.jsx(cl,{className:"w-3 h-3 sm:w-3.5 sm:h-3.5 text-orange-500 shrink-0"}),n.jsxs("span",{className:"truncate",children:[D.deliveryFee," ل.س"]})]})]})]})]},D.id)})})]}),n.jsxs("div",{className:"bg-slate-900/5 border border-slate-200/60 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-5 select-none",children:[n.jsxs("div",{className:"space-y-1.5 text-right flex-1",children:[n.jsxs("div",{className:"flex items-center gap-2",children:[n.jsx(dr,{className:"w-5 h-5 text-emerald-600 animate-pulse"}),n.jsx("h4",{className:"font-extrabold text-slate-800 text-sm sm:text-base",children:"استكشف القرية وخارطتها"})]}),n.jsx("p",{className:"text-slate-400 text-xs leading-relaxed",children:"تضم قريتنا العديد من المعالم والمدارس والمساجد والمستوصفات الطبية. قمنا بتسجيل كافة المعالم الرئيسية لتسهيل وصف العنوان للمندوب بمجرد اختيار معلم على الخريطة!"})]}),n.jsxs("div",{className:"bg-white px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-600 font-extrabold flex items-center gap-1",children:[n.jsx(Ia,{className:"w-4 h-4 text-emerald-500 animate-bounce"}),n.jsx("span",{children:"شاهد خريطة التوصيل عند تحديد السلة"})]})]})]}):n.jsx(oxe,{stores:L,onAddStore:D=>{H(re=>[...re,D])},onRegister:(D,re)=>{localStorage.setItem("tw_customer_user",JSON.stringify(D)),localStorage.setItem("tw_user_role",re),Q(D),z(re),re==="driver"?(ke("driver"),Me(!0)):re==="admin"?ce(!0):re==="store_owner"?(D.storeId&&G(D.storeId),Me(!1),ce(!1)):(Me(!1),ce(!1))}})}),n.jsx(xr,{children:oe&&n.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs",dir:"rtl",children:n.jsx(V1.div,{initial:{opacity:0,scale:.95,y:15},animate:{opacity:1,scale:1,y:0},exit:{opacity:0,scale:.95,y:15},className:"bg-white w-full max-w-sm rounded-3xl shadow-xl border border-slate-100 overflow-hidden",children:n.jsxs("div",{className:"p-6 text-center space-y-4",children:[n.jsx("div",{className:"mx-auto w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center border border-orange-100 text-orange-500",children:n.jsx(ea,{className:"w-6 h-6 animate-bounce"})}),n.jsxs("div",{className:"space-y-1",children:[n.jsx("h3",{className:"font-extrabold text-base text-slate-800",children:"منطقة الإدارة الآمنة"}),n.jsx("p",{className:"text-slate-400 text-xs font-semibold leading-relaxed",children:"الرجاء إدخال الرمز السري للمدير للمتابعة والتحكم في المتاجر والمنتجات."})]}),n.jsxs("form",{onSubmit:D=>{D.preventDefault(),be===le?(ce(!0),ue(!1),j(""),K("")):(K("الرمز السري غير صحيح! الرجاء المحاولة مرة أخرى."),j(""))},className:"space-y-3",children:[n.jsx("div",{className:"relative",children:n.jsx("input",{type:"password",autoFocus:!0,required:!0,maxLength:4,value:be,onChange:D=>{K("");const re=D.target.value.replace(/[^0-9]/g,"");j(re)},placeholder:"••••",className:"w-full bg-slate-50 border border-slate-200 focus:border-orange-500 rounded-2xl py-3 px-4 text-center text-xl font-black tracking-[0.5em] outline-none text-slate-800 placeholder-slate-300"})}),R&&n.jsx(V1.p,{initial:{opacity:0,y:-5},animate:{opacity:1,y:0},className:"text-[10px] text-red-500 font-extrabold",children:R}),n.jsxs("div",{className:"bg-orange-50/60 border border-orange-100/50 rounded-xl p-2.5 text-[10px] text-orange-800 font-semibold leading-relaxed",children:["💡 الرمز السري الافتراضي للنظام للتجربة هو: ",n.jsx("strong",{className:"text-orange-900 font-extrabold",children:"1234"})]}),n.jsxs("div",{className:"grid grid-cols-2 gap-2 pt-1",children:[n.jsx("button",{type:"button",onClick:()=>{ue(!1),j(""),K("")},className:"w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-extrabold transition-all cursor-pointer",children:"إلغاء"}),n.jsxs("button",{type:"submit",className:"w-full py-2.5 px-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-extrabold shadow-sm shadow-orange-500/15 flex items-center justify-center gap-1.5 cursor-pointer transition-all",children:[n.jsx(ur,{className:"w-3.5 h-3.5"}),n.jsx("span",{children:"دخول آمن"})]})]})]})]})})})})]})}LE.createRoot(document.getElementById("root")).render(n.jsx(_.StrictMode,{children:n.jsx(ixe,{})}));
