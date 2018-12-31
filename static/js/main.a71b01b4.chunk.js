(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{262:function(e,t,a){},264:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(84),o=a.n(r),i=(a(96),a(85)),c=a(86),h=a(87),s=a(89),u=a(88),d=a(90),m=a(47),C=(a(262),function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).handleChange=function(e){var t=e.target,n=t.value,l=t.name;a.setState(Object(i.a)({},l,n))},a.handleSubmit=function(e){e.preventDefault();var t=document.querySelector("#pixel_canvas");t.innerHTML="",t.style.backgroundColor="white";for(var n=0;n<a.state.height;n++){var l=document.createElement("tr");t.appendChild(l);for(var r=0;r<a.state.width;r++){var o=document.createElement("td");l.appendChild(o)}}},a.handleCellColor=function(e){a.setState({cellColor:e.hex})},a.handleCellColorOnClick=function(e){e.target.style.backgroundColor=a.state.cellColor},a.handleBackgroundColor=function(e){a.setState({background:e.hex})},a.handleColorRemove=function(e){e.target.style.backgroundColor=""},a.state={height:15,width:15,background:"#fff",cellColor:"#000"},a}return Object(d.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){return l.a.createElement("div",{className:"App"},l.a.createElement("header",{className:"App-header"},l.a.createElement("h1",null,"Pixel Art Maker")),l.a.createElement("div",{className:"App-Content"},l.a.createElement("div",{className:"App-Settings"},l.a.createElement("h2",null,"Canvas Settings"),l.a.createElement("form",{id:"sizePicker"},l.a.createElement("label",null,"Grid Height:",l.a.createElement("input",{type:"number",id:"input_height",name:"height",min:"1",value:this.state.height,onChange:this.handleChange})),l.a.createElement("br",null),l.a.createElement("label",null,"Grid Width:",l.a.createElement("input",{type:"number",id:"input_width",name:"width",min:"1",value:this.state.width,onChange:this.handleChange})),l.a.createElement("p",null,l.a.createElement("input",{type:"submit",id:"input_submit",value:"Create grid",onClick:this.handleSubmit}))),l.a.createElement("hr",{className:"Separator"}),l.a.createElement("h3",null,"Pick A Background Color"),l.a.createElement(m.CirclePicker,{onChangeComplete:this.handleBackgroundColor,color:this.state.background}),l.a.createElement("hr",{className:"Separator"}),l.a.createElement("h3",null,"Pick A Color"),l.a.createElement(m.CirclePicker,{onChangeComplete:this.handleCellColor,color:this.state.cellColor}),l.a.createElement("p",null,"Hint: Double click to remove a color")),l.a.createElement("div",{className:"Canvas"},l.a.createElement("h2",null,"Design Canvas"),l.a.createElement("table",{id:"pixel_canvas",style:{backgroundColor:this.state.background},onMouseDown:this.handleCellColorOnClick,onDoubleClick:this.handleColorRemove}))))}}]),t}(n.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(l.a.createElement(C,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},91:function(e,t,a){e.exports=a(264)},96:function(e,t,a){}},[[91,2,1]]]);
//# sourceMappingURL=main.a71b01b4.chunk.js.map