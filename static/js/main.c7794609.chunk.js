(this["webpackJsonpcoin-mosaic"]=this["webpackJsonpcoin-mosaic"]||[]).push([[0],{127:function(e,t,a){e.exports=a.p+"static/media/Colour.ea7c2539.gif"},128:function(e,t,a){e.exports=a.p+"static/media/FileUpload.bef6d7eb.gif"},129:function(e,t,a){e.exports=a.p+"static/media/Running_small.182e6dcf.gif"},130:function(e,t,a){e.exports=a.p+"static/media/Sliders.200dcde6.gif"},131:function(e,t,a){e.exports=a.p+"static/media/Validation.564419d1.gif"},133:function(e,t,a){e.exports=a(327)},139:function(e,t,a){},140:function(e,t,a){},327:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(25),o=a.n(l),i=a(24),c=(a(138),a(139),a(2)),s=a(6),d=a(4),u=a(3),m=a(10),h=(a(140),a(41)),p=a.n(h),f=a(74),g=a(132),b=a(9),v=(a(33),function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(s.a)(a,[{key:"render",value:function(){var e=this,t=this.props,a=t.onSliderChange,n=t.lowVal,l=t.highVal,o=t.min,i=t.max;return r.a.createElement("div",{className:"wrap",role:"group"},r.a.createElement("input",{id:"highVal",className:"high",type:"range",min:o,max:i,value:l,onChange:function(t){return a(Object(b.a)(Object(b.a)({},e.props),{},{e:t}))}}),r.a.createElement("input",{id:"lowVal",className:"low",type:"range",min:o,max:i,value:n,onChange:function(t){return a(Object(b.a)(Object(b.a)({},e.props),{},{e:t}))}}))}}],[{key:"increasing",value:function(e,t){var a=t,n=a.index,r=a.max,l=a.value,o=a.totalSliders,i=a.id,c=a.minGap,s=l+c,d=n+1,u="lowVal"===i?"highVal":"lowVal",m=r-(o-d)*c+("lowVal"===i?-parseInt(c):0);if(m>=r)return e;t=Object(b.a)(Object(b.a)({},t),{},{value:s,index:d});var h=l;if(d>=o)return l>=m&&(h=m),e[n][i]=e[n-1][u]=h,e;if(e[n][i]=h,"lowVal"===i?e[n-1][u]=h:e[d][u]=h,l>=m)h=m,e[n][i]=h,"lowVal"===i?e[n-1][u]=h:e[d][u]=h,e=this.increasing(e,t);else{if(l<e[d][i]-c)return e;t[i]!==parseInt(r)&&(e=this.increasing(e,t))}return e}},{key:"decreasing",value:function(e,t){var a=t,n=a.index,r=a.min,l=a.value,o=a.id,i=a.minGap,c=l-i,s=n-1,d="lowVal"===o?"highVal":"lowVal",u=r+n*i+("highVal"===o?parseInt(i):0);if(u<=r)return e;t=Object(b.a)(Object(b.a)({},t),{},{value:c,index:s});var m=l;return n<=0?(l<=u&&(m=u),e[n][o]=e[n+1][d]=m,e):(n>0&&m>u?(e[n][o]=m,"lowVal"===o?e[s][d]=m:e[n+1][d]=m,l<=e[s][o]+i&&(e=this.decreasing(e,t))):l<=u?(m=u,e[n][o]=m,"lowVal"===o?e[s][d]=m:e[n+1][d]=m,n>0&&(e=this.decreasing(e,t))):e[n][o]=l,e)}}]),a}(n.Component)),y=a(32),E=a(121),w=function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).dismissModal=function(){e.props.toggle()},e}return Object(s.a)(a,[{key:"render",value:function(){var e=this,t=this.props,a=t.colour,n=t.onColourChange,l={backgroundColor:"".concat(a)};return r.a.createElement("div",{className:"modal fade WelcomeModal ".concat(this.props.showModal?"show":""),style:{display:"".concat(this.props.showModal?"block":"none")},id:"WelcomeModal",tabIndex:"-1",role:"dialog","aria-hidden":"true"},r.a.createElement("div",{className:"modal-dialog modal-lg modal-dialog-centered",role:"document"},r.a.createElement("div",{className:"modal-content"},r.a.createElement("div",{className:"modal-header"},r.a.createElement("h5",{className:"modal-title",id:"exampleModalLongTitle"},"Select Colour"),r.a.createElement("button",{type:"button",className:"close","data-dismiss":"modal","aria-label":"Close",onClick:this.dismissModal},r.a.createElement("span",{"aria-hidden":"true"},"\xd7"))),r.a.createElement("div",{className:"modal-body align-center modal-opened",style:l,align:"center"},r.a.createElement(E.ChromePicker,{color:a,disableAlpha:!0,onChange:function(t){return n(Object(b.a)(Object(b.a)({},e.props),{},{selectedColour:t}))}})))))}}]),a}(n.Component),C=function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).state={showModal:!1},e.toggleModal=function(){return e.setState({showModal:!e.state.showModal})},e}return Object(s.a)(a,[{key:"render",value:function(){var e=this.props,t=e.diameter,a=e.colour,n=e.defaultValue,l=e.onColourChange,o=Object(y.a)(e,["diameter","colour","defaultValue","onColourChange"]),i={color:"white",borderRadius:"50%",cursor:"pointer",width:"".concat(t,"px"),height:"".concat(t,"px"),lineHeight:"".concat(t,"px"),textAlign:"center",fontSize:"16pt",boxShadow:"-5px 5px 5px 5px #c9c9c9"};return r.a.createElement("div",{className:"row justify-content-center"},r.a.createElement("div",{className:"noselect",style:Object(b.a)(Object(b.a)({},i),{},{backgroundColor:a}),onClick:this.toggleModal},n),r.a.createElement(w,Object.assign({toggle:this.toggleModal,showModal:this.state.showModal,colour:a,onColourChange:l},o)))}}]),a}(n.Component),j=function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(s.a)(a,[{key:"render",value:function(){var e=this.props,t=e.sliders,a=e.limits,n=e.onColourChange,l=e.onSliderChange,o=t.filter((function(e){return e.enabled}));return r.a.createElement("div",{className:"container m-2"},r.a.createElement("div",{className:"row justify-content-between"},r.a.createElement("div",{className:"col-2 d-flex justify-content-center"},r.a.createElement("p",null,"MIN")),r.a.createElement("div",{className:"col-2 d-flex justify-content-center"},r.a.createElement("p",null,"MAX"))),o.map((function(e){return r.a.createElement("div",{className:"slider-row",key:e.id},r.a.createElement("div",{key:"colour1"+e.id,className:"col-2",align:"center"},r.a.createElement(C,{colour:e.colour,slider:e,diameter:"40",defaultValue:e.lowVal,id:"slider",onColourChange:n})),r.a.createElement("div",{key:"slider"+e.id,className:" col-8 "},r.a.createElement(v,{min:a.min,max:a.max,slider:e,lowVal:e.lowVal,highVal:e.highVal,onSliderChange:l})),r.a.createElement("div",{key:"colour2"+e.id,className:"col-2 ",align:"center"},r.a.createElement(C,{colour:e.colour,slider:e,diameter:"40",defaultValue:e.highVal,id:"slider",onColourChange:n})))})))}}]),a}(n.Component),O=function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(s.a)(a,[{key:"render",value:function(){var e=this.props,t=e.onClick,a=e.onChange;return r.a.createElement("div",{className:"container  "},r.a.createElement("div",{className:"row p-4"},r.a.createElement("div",{id:"drop",className:"input-group"},r.a.createElement("input",{type:"file",className:"form-control ",placeholder:"Upload Image",onChange:a}),r.a.createElement("span",{className:"input-group-btn input-group-append"},r.a.createElement("button",{type:"button",className:"btn btn-primary",onClick:t},"Process")))))}}]),a}(n.Component),x=a(40),k=a(122),N=a(30),V=a.n(N),S=function e(t){var a=t.name,n=t.label,l=t.error,o=t.type,i=void 0===o?"tel":o,c=Object(y.a)(t,["name","label","error","type"]);return e.defaultProps={type:"tel"},r.a.createElement("div",{className:"form-group m-2"},r.a.createElement("p",{className:"justify-content-center d-flex m-2",htmlFor:a},n),r.a.createElement("input",Object.assign({className:"form-control text-center"},c,{name:a,id:a,type:i})),l&&r.a.createElement("div",{className:"alert alert-danger"},l))},I=function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,l=new Array(n),o=0;o<n;o++)l[o]=arguments[o];return(e=t.call.apply(t,[this].concat(l))).state={data:{},errors:{}},e.validate=function(){var t=V.a.validate(e.state.data,e.schema,{abortEarly:!1}).error;if(!t)return null;var a,n={},r=Object(k.a)(t.details);try{for(r.s();!(a=r.n()).done;){var l=a.value;n[l.path[0]]=l.message}}catch(o){r.e(o)}finally{r.f()}return console.log(n),n},e.validateProperty=function(t){var a=t.name,n=t.value,r=Object(x.a)({},a,n),l=Object(x.a)({},a,e.schema[a]),o=V.a.validate(r,l).error;return o?o.details[0].message:null},e.handleChange=function(t){var a=t.currentTarget,n=Object(b.a)({},e.state.errors),r=Object(b.a)({},e.state.data),l=e.validateProperty(a);l?n[a.name]=l:(delete n[a.name],r[a.name]=a.value),e.setState({data:r,errors:n})},e.renderButton=function(t){return r.a.createElement("button",{disabled:e.validate(),className:"btn btn-primary"},t)},e.renderInput=function(t){var a=e.state.errors,n=t.name,l=Object(y.a)(t,["name"]);return r.a.createElement(S,Object.assign({name:n,onChange:e.handleChange,error:a[n]},l))},e}return a}(n.Component),R=(a(53),function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).state={limits:{min:0,max:255},sliders:[{id:0,lowVal:0,highVal:50,enabled:!0,colour:"#2B0D01"},{id:1,lowVal:50,highVal:100,enabled:!0,colour:"#612B09"},{id:2,lowVal:100,highVal:200,enabled:!0,colour:"#8C3D0E"},{id:3,lowVal:200,highVal:255,enabled:!0,colour:"#C2580C"}],minGap:10,data:{width:1600,time:30,coinSize:20.3},errors:{},backgroundColour:"#000000"},e.schema={width:V.a.number().min(100).max(3e3).required().label("Width in mm"),time:V.a.number().min(5).max(300).required().label("Time in seconds"),coinSize:V.a.number().precision(1).min(15).max(30).required().label("Coin diameter in mm")},e.handleSliderChange=function(t){var a=e.state,n=a.minGap,r=a.sliders,l=parseInt(t.e.target.value),o=t.e.target,i=o.id,c=o.min,s=o.max;(t=Object(b.a)(Object(b.a)({},t),{},{index:r.indexOf(t.slider),value:l,totalSliders:r.length,id:i,minGap:n}))[i]!==parseInt(c)&&t[i]!==parseInt(s)&&(r=l>t[i]?v.increasing(r,t):v.decreasing(r,t),e.setState({sliders:r}))},e.handleColourChange=function(t){if("slider"===t.id){var a=Object(g.a)(e.state.sliders),n=a.indexOf(t.slider);a[n].colour=t.selectedColour.hex,e.setState({sliders:a})}else e.setState({backgroundColour:t.selectedColour.hex})},e}return Object(s.a)(a,[{key:"render",value:function(){var e=this,t=this.state,a=t.limits,n=t.sliders,l=t.minGap,o=t.backgroundColour,i=t.data,c=this.props,s=c.onClick,d=c.onChange;return r.a.createElement("form",{autoComplete:"off",className:"my-container-clipped p-2"},r.a.createElement("div",{className:"row "},r.a.createElement(O,{onChange:d,onClick:function(){return s(Object(b.a)({},e.state))}})),r.a.createElement("div",{className:"row "},r.a.createElement(j,{limits:a,sliders:n,minGap:l,onSliderChange:this.handleSliderChange,onColourChange:this.handleColourChange})),r.a.createElement("div",{className:"row p-2 mt-2"},r.a.createElement("div",{className:"col-xs-12 col-md-4 p-2 "},this.renderInput({name:"width",label:"Desired width in mm",defaultValue:i.width})),r.a.createElement("div",{className:"col-xs-12 col-md-4 p-2"},this.renderInput({name:"time",label:"Seconds per coin",defaultValue:i.time})),r.a.createElement("div",{className:"col-xs-12 col-md-4 p-2"},this.renderInput({name:"coinSize",label:"Coin diameter in mm",defaultValue:i.coinSize}))),r.a.createElement("div",{className:"row align-items-center m-2"},r.a.createElement("div",{className:"col-6 text-center"},r.a.createElement("h4",null,"Select background colour:")),r.a.createElement("div",{className:"col-6 text-center"},r.a.createElement(C,{colour:o,diameter:"80",defaultValue:"",id:"bg",onColourChange:this.handleColourChange}))))}}]),a}(I)),M=a(22),D=function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(s.a)(a,[{key:"render",value:function(){var e=a.srcFormatter(this.props.file);return window.scrollTo(0,0),r.a.createElement("div",null,r.a.createElement(M.a,{src:e,alt:"This has not gone well",fluid:!0}))}}],[{key:"validURL",value:function(e){return!!new RegExp("^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$","i").test(e)}},{key:"srcFormatter",value:function(e){return a.validURL(e)?e:URL.createObjectURL(e)}}]),a}(n.Component),T=function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(s.a)(a,[{key:"componentDidMount",value:function(){window.scrollTo(0,0)}},{key:"buildSVG",value:function(){var e=this.props,t=e.innerResponseData,a=e.outerResponseData;return r.a.createElement("svg",{viewBox:"0 0 ".concat(1*a.width," ").concat(1*a.height),id:"coinMosaicSVG"},r.a.createElement("rect",{x:"0",y:"0",width:1*a.width,height:1*a.height,fill:a.bgColour}),r.a.createElement("g",null,a.coinArray.map((function(e,t){return r.a.createElement("g",{key:"outer".concat(t)},e.map((function(e,a){return r.a.createElement("circle",{key:"outer".concat(t).concat(a),cx:1*a+.5,cy:1*t+.5,r:"0.5",fill:e})})))}))),r.a.createElement("g",null,t.coinArray.map((function(e,t){return r.a.createElement("g",{key:"inner".concat(t)},e.map((function(e,a){return r.a.createElement("circle",{key:"inner".concat(t).concat(a),cx:1*a+1,cy:1*t+1,r:"0.5",fill:e})})))}))))}},{key:"downloadDimensions",value:function(){var e=this.props.outerResponseData,t=e.height/e.width,a={width:0,height:0};return a.width=2e3,a.height=Math.round(a.width*t),a}},{key:"handleOnClick",value:function(){var e=document.createElement("canvas",{id:"c"}),t=document.getElementById("coinMosaicSVG").cloneNode(!0),a=new XMLSerializer,n=this.downloadDimensions(),r=n.width,l=n.height,o="CoinMosaic".concat(r,"x").concat(l,".png");t.setAttribute("width",r),t.setAttribute("height",l),t.setAttribute("name",o),e.width=r,e.height=l;var i=a.serializeToString(t),c=window.URL||window.webkitURL||window,s=new Image,d=new Blob([i],{type:"image/svg+xml"}),u=c.createObjectURL(d);s.onload=function(){e.getContext("2d").drawImage(s,0,0),c.revokeObjectURL(u);var t=e.toDataURL("image/png"),a=document.createElement("a");document.body.appendChild(a),a.style="display: none",a.href=t,a.download=o,a.click(),window.URL.revokeObjectURL(t),document.body.removeChild(a)},s.src=u}},{key:"render",value:function(){var e=this,t=Date.now(),a=Date.now();return console.log(a-t),r.a.createElement("div",{className:"align-items-center"},this.buildSVG(),r.a.createElement("button",{onClick:function(t){return e.handleOnClick(t)},className:"btn btn-primary m-2"},"Download Image"),r.a.createElement("div",{id:"d"}),r.a.createElement("br",null))}}]),a}(n.Component),A=function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(s.a)(a,[{key:"render",value:function(){var e=this.props.data,t=e.totalCoins,a=e.totalTime,n=e.totalMass;return r.a.createElement("div",{className:"container"},r.a.createElement("h1",null,"The Headline Stats"),r.a.createElement("table",{className:"table "},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("td",{className:"text-center"},"Total Coins:"),r.a.createElement("td",{className:"text-center"},t)),r.a.createElement("tr",null,r.a.createElement("td",{className:"text-center"},"Time Taken:"),r.a.createElement("td",{className:"text-center"},a)),r.a.createElement("tr",null,r.a.createElement("td",{className:"text-center"},"Mass of Mosaic:"),r.a.createElement("td",{className:"text-center"},n," kg")))))}}]),a}(n.Component),U=a(27),z=a(123),F=a.n(z),L=a(124),P=a(125),G=a.n(P),B=(a(324),function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).state={file:"",downscaledImage:"",displayCanvas:!1,displayUpload:!1,outerResponseData:{width:null,height:null,coinArray:null,bgColour:null,sliders:null,stats:null},innerResponseData:{width:"",height:"",coinArray:[]},fetchInProgress:!1},e.downscaleImage=function(e){return new Promise((function(t){G.a.imageFileResizer(e,900,900,"JPEG",100,0,(function(e){t(e)}),"blob")}))},e}return Object(s.a)(a,[{key:"handleFile",value:function(){var e=Object(f.a)(p.a.mark((function e(t){var a,n;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("undefined"!==typeof(a=t.target.files[0])){e.next=5;break}this.setState({file:"",displayUpload:!1,displayCanvas:!1}),e.next=15;break;case 5:if("image/jpeg"===a.type||"image/png"===a.type){e.next=11;break}t.target.value=null,this.setState({file:""}),U.b.error("File needs to be a jpeg or png"),e.next=15;break;case 11:return e.next=13,this.downscaleImage(a);case 13:n=e.sent,this.setState({file:a,downscaledImage:n,displayUpload:!0,displayCanvas:!1});case 15:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"handleUpload",value:function(){var e=Object(f.a)(p.a.mark((function e(t){var a,n,r,l=this;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a=this.state,n=a.downscaledImage,""!==a.file){e.next=4;break}return U.b.error("Need to select an image"),e.abrupt("return");case 4:if(Object(L.isEmpty)(t.errors)){e.next=7;break}return U.b.error("The is some error in your input"),e.abrupt("return");case 7:return(r=new FormData).append("image",n),r.append("userInput",JSON.stringify(t)),this.setState({fetchInProgress:!1}),e.next=13,F()({url:"https://coin-mosaic.azurewebsites.net/api/imagetransfer",method:"POST",headers:{"Content-Type":"multipart/form-data"},data:r,contentType:!1,processData:!1}).then((function(e){l.handleReturn(e.data)})).catch((function(e){l.handleError(e)}));case 13:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"handleError",value:function(e){e.response?U.b.error("".concat(e.message," occured whilst processing the image")):e.request?U.b.error("".concat(e.request," occured whilst processing the image")):U.b.error("".concat(e," occured whilst processing the image"))}},{key:"handleReturn",value:function(e){var t=this.state,a=t.innerResponseData,n=t.outerResponseData,r=e.outer;if(n={width:r.width,height:r.height,coinArray:r.coin_array,bgColour:r.bg_colour,stats:r.stats},"None"!==e.inner){var l=e.inner;a={width:l.width,height:l.height,coinArray:l.coin_array}}this.setState({displayCanvas:!0,innerResponseData:a,outerResponseData:n,fetchInProgress:!1})}},{key:"render",value:function(){var e=this,t=this.state,a=t.displayCanvas,n=t.displayUpload,l=t.innerResponseData,o=t.outerResponseData,i={};return t.fetchInProgress?i={display:"none"}:{display:"none"},r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{style:i},r.a.createElement(U.a,null),r.a.createElement("div",{className:"container"},a?r.a.createElement("div",{className:"row justify-content-center mb-2 mt-4"},r.a.createElement(A,{data:o.stats})):null,r.a.createElement("div",{className:"row justify-content-center mb-4"},r.a.createElement("div",{className:"col-xs-12 col-md-6 p-2"},n?r.a.createElement(D,{file:this.state.file}):null),r.a.createElement("div",{className:"col-xs-12 col-md-6 p-2"},a?r.a.createElement(T,{innerResponseData:l,outerResponseData:o}):null)),r.a.createElement("div",{className:"mb-4"},r.a.createElement(R,{onChange:function(t){return e.handleFile(t)},onClick:function(t){return e.handleUpload(t)}})))))}}]),a}(n.Component)),q=function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(s.a)(a,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("div",{className:"container-fluid"},r.a.createElement("div",{className:"row justify-content-md-center p-2"},r.a.createElement("div",{className:"col col-lg-2"}),r.a.createElement(i.b,{to:"/home",style:{color:"black",textDecoration:"none"},className:"col-md-4 display-4  text-center"},"Coin Mosaic"),r.a.createElement(i.b,{to:"/about",style:{color:"grey",textDecoration:"none"},activeStyle:{fontWeight:"bold",color:"black"},className:"col col-lg-2 display-6 text-center align-self-center "},"About"))),r.a.createElement("div",{className:"lead strap-line noselect"},"Convert your pictures into excessively large coin mosaics in one easy click."))}}]),a}(n.Component),_=a(127),W=a.n(_),J=a(128),X=a.n(J),H=a(129),$=a.n(H),K=a(130),Q=a.n(K),Y=a(131),Z=a.n(Y),ee=function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(s.a)(a,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("div",{className:"container text-justify mt-4"},r.a.createElement("h2",{className:"display-5 text-left"},"Overview"),r.a.createElement("p",null,'The conversion process takes your image, coverts it to a low resolution, greyscale image, and replaces the pixels with "coins". At the moment this combines a base layer of coins with an upper layer laid on top. Although this does almost double the amount of coins required, the resolution is enhanced without the need to increase the coin mosaic size.',r.a.createElement("br",null),r.a.createElement("br",null),"The colour of each coin is dictated by the average intensity of the pixels it is replacing, as well as the positioning of the slider ranges. The intensity range is between 0 (darkest) to 255 (lightest). By adjusting the range of each slider, the quality of the conversion can be influenced. For best results, use a high-contrast black and white close-up image. The colour of each coin is also randomised to create a more realistic interpretation of what the coin mosaic could look like if produced."),r.a.createElement("figure",{className:"m-2 text-center"},r.a.createElement("figcaption",{class:"figure-caption text-center mb-2"},"Effect of changing the desired width input"),r.a.createElement(M.a,{className:"border border-dark rounded-lg",src:$.a,alt:"Short run gif",fluid:!0})),r.a.createElement("h2",{className:"display-5 mt-4 text-left"},"Adjusting the Intensity Ranges"),r.a.createElement("p",null,"The conversion of the image can be heavily influenced by changing the lower and upper bounds of each slider. The values of the other sliders will automatically update to ensure each coin has at some representation over the intensity spectrum. This cascading effect can be seen in the demo below."),r.a.createElement("figure",{className:"m-2 text-center"},r.a.createElement("figcaption",{class:"figure-caption text-center mb-2"},"Change the ranges for each coin colour"),r.a.createElement(M.a,{className:"border border-dark rounded-lg",src:Q.a,alt:"Sliders info gif",fluid:!0})),r.a.createElement("h2",{className:"display-5 mt-4 text-left"},"Colour Selection"),r.a.createElement("p",null,"Change the default colours by selecting the relevant circle. Use the colour slider to change the hue and the picker to further customise your colour. Click the X to close and save selection."),r.a.createElement("figure",{className:"m-2 text-center"},r.a.createElement("figcaption",{class:"figure-caption text-center mb-2"},"Change the coin / background colour"),r.a.createElement(M.a,{className:"border border-dark rounded-lg",src:W.a,alt:"Colour info gif",fluid:!0})),r.a.createElement("h2",{className:"display-5 mt-4 text-left"},"Uploading an Image"),r.a.createElement("p",null,'Select an image by clicking "Choose file" and navigating to your chosen image. The file needs to be in either a "jpeg" or "png" format to be successfully uploaded. The conversion will still work if a colour image is used; however, results will be less predictable (i.e. a shade of blue and green may look different in the image, but the intensity values may be the same).'),r.a.createElement("figure",{className:"m-2 text-center"},r.a.createElement("figcaption",{class:"figure-caption text-center mb-2"},"Choose file will default to your native file explorer"),r.a.createElement(M.a,{className:"border border-dark rounded-lg",src:X.a,alt:"File upload info gif",fluid:!0})),r.a.createElement("h2",{className:"display-5 mt-4 text-left"},"Other Input Parameters"),r.a.createElement("p",null,"The parameters of desired width, seconds per coin, and coin diameter can all be customised. Each field has to be a number and fall within set limits in order for validation to be passed. By default, the coin diameter used is that of a 1p. The seconds per coin field is used to provide a very rough indication of how long the coin mosaic may take to be built in reality."),r.a.createElement("figure",{className:"m-2 text-center"},r.a.createElement("figcaption",{class:"figure-caption  mb-2"},"Validation of user input"),r.a.createElement(M.a,{className:"border border-dark rounded-lg",src:Z.a,alt:"Validation info gif",fluid:!0}))),r.a.createElement("footer",{className:"m-4"}))}}]),a}(n.Component),te=function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).state={},e}return Object(s.a)(a,[{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(q,null),r.a.createElement("main",{className:"App"},r.a.createElement(m.d,null,r.a.createElement(m.b,{path:"/home",component:B}),r.a.createElement(m.b,{path:"/about",component:ee}),r.a.createElement(m.a,{from:"/*",exact:!0,to:"/home"}))))}}]),a}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(i.a,null,r.a.createElement(te,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},33:function(e,t,a){},53:function(e,t,a){}},[[133,1,2]]]);
//# sourceMappingURL=main.c7794609.chunk.js.map