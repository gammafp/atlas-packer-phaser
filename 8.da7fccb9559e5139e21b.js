(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{s5gv:function(l,n,t){"use strict";t.r(n);var u=t("CcnG"),e=function(){},i=t("pMnS"),o=t("Ip0R"),s=t("gIcY"),r=t("sRS0"),a=t("sX7g"),c=function(){function l(){this.atlasPuro=[]}return l.prototype.generateAtlas=function(l){var n=this;this.atlasPuro=[],l.length>=1&&(l.map(function(l,t,u){n.atlasPuro[t]=[],l.map(function(l,u){n.atlasPuro[t][u]={filename:l.name,frame:{x:void 0===n.atlasPuro[t][u-1]?0:n.atlasPuro[t][u-1].frame.x+n.atlasPuro[t][u-1].frame.w,y:void 0===n.atlasPuro[t-1]?0:n.atlasPuro[t-1][u].frame.y+n.atlasPuro[t-1][u].frame.h,w:l.width,h:l.height},anchor:{x:.5,y:.5}}})}),this.atlasJson={frames:Object(a.b)(this.atlasPuro),meta:{description:"Atlas generado con Atlas Packer Phaser3",web:"https://gammafp.github.io/atlas-packer-phaser/"}})},l.prototype.getAtlas=function(){return this.atlasJson},l.ngInjectableDef=u.V({factory:function(){return new l},token:l,providedIn:"root"}),l}(),p=t("fDnD"),b=t("HXk2"),g=t("db6O"),d=t("m7g1"),h=function(l,n,t,u){return new(t||(t=Promise))(function(e,i){function o(l){try{r(u.next(l))}catch(l){i(l)}}function s(l){try{r(u.throw(l))}catch(l){i(l)}}function r(l){l.done?e(l.value):new t(function(n){n(l.value)}).then(o,s)}r((u=u.apply(l,n||[])).next())})},m=function(l,n){var t,u,e,i,o={label:0,sent:function(){if(1&e[0])throw e[1];return e[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(t)throw new TypeError("Generator is already executing.");for(;o;)try{if(t=1,u&&(e=2&i[0]?u.return:i[0]?u.throw||((e=u.return)&&e.call(u),0):u.next)&&!(e=e.call(u,i[1])).done)return e;switch(u=0,e&&(i=[2&i[0],e.value]),i[0]){case 0:case 1:e=i;break;case 4:return o.label++,{value:i[1],done:!1};case 5:o.label++,u=i[1],i=[0];continue;case 7:i=o.ops.pop(),o.trys.pop();continue;default:if(!(e=(e=o.trys).length>0&&e[e.length-1])&&(6===i[0]||2===i[0])){o=0;continue}if(3===i[0]&&(!e||i[1]>e[0]&&i[1]<e[3])){o.label=i[1];break}if(6===i[0]&&o.label<e[1]){o.label=e[1],e=i;break}if(e&&o.label<e[2]){o.label=e[2],o.ops.push(i);break}e[2]&&o.ops.pop(),o.trys.pop();continue}i=n.call(l,o)}catch(l){i=[6,l],u=0}finally{t=e=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}},f=function(){function l(l,n,t,u,e,i){this.imgFilesService=l,this.atlasJsonService=n,this.localStorage=t,this.router=u,this.animatorService=e,this.elementRef=i,this.nombreSprite="Atlas name",this.spritePerRow=1,this.zoomScale=1,this.nameSpriteSheet="",this.printSpriteSheet="",this.spriteSheetWidth=16,this.spriteSheetHeight=16,this.spritePerRow=this.imgFilesService.getSpritesheetRow(),this.nc=new NacatamalON,this.canvasSize={width:0,height:0}}return l.prototype.ngOnInit=function(){this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor="#1A2226",this.refresh()},l.prototype.refresh=function(){this.elementOutput=_$("#output"),this.imagesFiles=multiRE(this.imgFilesService.getImages(),this.spritePerRow),this.atlasJsonService.generateAtlas(this.imagesFiles),$(function(){$('[data-toggle="tooltip"]').tooltip()}),this.scrollBar()},l.prototype.uploadAddFilesMulti=function(l){var n=this,t=Array.from(l.target.files),u=[];t.map(function(l,e){return h(n,void 0,void 0,function(){var n;return m(this,function(i){switch(i.label){case 0:return[4,readMultipleFiles(l)];case 1:return n=i.sent(),u.push(n),t.length-1===e&&(this.imgFilesService.insertNewSprites(u),this.refresh()),[2]}})})})},l.prototype.uploadSpritesheet=function(l){return h(this,void 0,void 0,function(){var n;return m(this,function(t){switch(t.label){case 0:return[4,readMultipleFiles(l.target.files[0])];case 1:return n=t.sent(),this.printSpriteSheet=n.result,this.nameSpriteSheet=n.name,this.changeSizeGridCut(),$("#modalSpriteSheet").modal("show"),[2]}})})},l.prototype.changeSizeGridCut=function(){var l=this.nc.getSizeImage(this.printSpriteSheet),n=new Array(Math.floor(l.x/this.spriteSheetWidth)).fill(0),t=new Array(Math.floor(l.y/this.spriteSheetHeight)).fill(0);this.cutterLines=t.map(function(){return n.map(function(){return 0})}),this.canvasSize.width=l.x,this.canvasSize.height=l.y},l.prototype.cutSpritesheet=function(){var l=this.nc.cutSpriteSheet(this.nameSpriteSheet),n=Object(a.b)(l(this.printSpriteSheet,this.cutterLines,this.spriteSheetWidth,this.spriteSheetHeight));this.filesCharged(n,this.cutterLines[0].length)},l.prototype.filesCharged=function(l,n){void 0===n&&(n=1),this.imgFilesService.insertNewSprites(l),$("#modalSpriteSheet").modal("hide"),this.refresh()},l.prototype.zoom=function(l){this.zoomScale="zoomIn"===l?this.zoomScale+1>=4?4:this.zoomScale+1:this.zoomScale-1<=1?1:this.zoomScale-1;var n=(this.elementOutput.offsetWidth*this.zoomScale-_$(".outputIMG").offsetWidth)/4,t=(this.elementOutput.offsetHeight*this.zoomScale-_$(".outputIMG").offsetHeight)/4,u=this.elementOutput.offsetWidth*this.zoomScale>_$(".outputIMG").offsetWidth?"scale("+this.zoomScale+")\n            translate("+n+"px, "+t+"px)":"scale("+this.zoomScale+")";this.elementOutput.style.transform=u,this.scrollBar()},l.prototype.scrollBar=function(){new PerfectScrollbar(".outputIMG").update()},l.prototype.deleteSprite=function(l){this.imgFilesService.deleteOneSprite(l),this.refresh()},l.prototype.generatePNGJSON=function(){var l=this,n=new p,t=clearString(this.nombreSprite),u=this.elementOutput.getBoundingClientRect().width/this.elementOutput.offsetWidth;this.elementOutput.style.transform="scale(1)";var e=JSON.stringify(this.atlasJsonService.getAtlas(),null,"    ");n.file(t+"_atlas.json",e),html2canvas(_$("#output"),{backgroundColor:"rgba(0, 0, 0, 0)"}).then(function(e){n.file(t+".png",e.toDataURL().replace("data:image/png;base64,",""),{base64:!0}),n.generateAsync({type:"blob"}).then(function(l){Object(b.saveAs)(l,"PP3.zip")}),l.elementOutput.style.transform="scale("+u+")"})},l.prototype.animate=function(){var l=this;this.elementOutput.style.transform="scale(1)",swal({title:"\xbfEstas seguro?",text:"Saldr\xe1s de esta p\xe1gina, \xbfest\xe1s seguro?",type:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"S\xed, \xa1vamos a animar!",cancelButtonText:"Cancelar"}).then(function(n){n.value&&html2canvas(_$("#output"),{backgroundColor:"rgba(0, 0, 0, 0)"}).then(function(n){l.animatorService.setAtlas([{name:clearString(l.nombreSprite),spritesheet_array:l.imagesFiles,spritesheet:n.toDataURL(),atlas:l.atlasJsonService.getAtlas()}]),l.router.navigate(["animator"])})})},l.prototype.anchorEditor=function(){console.log("Editor del ancla")},l}(),v=t("ZYCi"),S=u.qb({encapsulation:0,styles:[["#output[_ngcontent-%COMP%]{outline:1px solid var(--color-primary)}#output[_ngcontent-%COMP%]   .col-gamma[_ngcontent-%COMP%]{display:flex}#output[_ngcontent-%COMP%]   span.content_box[_ngcontent-%COMP%]{display:flex;width:100%}#output[_ngcontent-%COMP%]   span.content_box[_ngcontent-%COMP%]   .box[_ngcontent-%COMP%]{line-height:0}.tooltip-inner[_ngcontent-%COMP%]{margin-left:5px}.spriteSheet[_ngcontent-%COMP%]{line-height:0}.spriteSheet[_ngcontent-%COMP%]   .linesCut[_ngcontent-%COMP%], .spriteSheet[_ngcontent-%COMP%]   .spriteSheetIMG[_ngcontent-%COMP%]{position:absolute}.gridCut[_ngcontent-%COMP%]{display:flex}.gridCut[_ngcontent-%COMP%]   span.grid[_ngcontent-%COMP%]{display:inline-block;outline:#000 solid 1px}main[_ngcontent-%COMP%]{min-height:calc(100vh - 146px);color:#fff;font-family:pressStart;font-size:12px}.outputIMG[_ngcontent-%COMP%]{overflow:hidden}.btn-gamma-primary[_ngcontent-%COMP%]{background-color:var(--color-primary);color:#fff}.btn-gamma-primary[_ngcontent-%COMP%]:hover{background-color:var(--color-primary-hover)}.content-row-editor[_ngcontent-%COMP%]{min-height:calc(100vh - 122px)}.controls-border-right[_ngcontent-%COMP%]{border-right:1px solid var(--bg-dark-color)}.btn-styles[_ngcontent-%COMP%]{cursor:pointer;transition:1s}.btn-styles[_ngcontent-%COMP%]:hover{-webkit-transform:scale(1.2);transform:scale(1.2)}"]],data:{}});function y(l){return u.Gb(0,[(l()(),u.sb(0,0,null,null,4,"span",[["class","content_box"],["data-placement","top"],["data-toggle","tooltip"],["ng-click","editarImage(img.name)"]],[[8,"title",0]],null,null,null,null)),u.rb(1,278528,null,0,o.l,[u.v,u.l,u.F],{ngStyle:[0,"ngStyle"]},null),u.Cb(2,{width:0}),(l()(),u.sb(3,0,null,null,1,"div",[["class","box"]],null,null,null,null,null)),(l()(),u.sb(4,0,null,null,0,"img",[],[[8,"src",4]],[[null,"click"]],function(l,n,t){var u=!0;return"click"===n&&(u=!1!==l.component.anchorEditor()&&u),u},null,null))],function(l,n){l(n,1,0,l(n,2,0,n.context.$implicit.width+"px"))},function(l,n){l(n,0,0,u.ub(1,"",n.context.$implicit.name,"")),l(n,4,0,u.ub(1,"",n.context.$implicit.result,""))})}function C(l){return u.Gb(0,[(l()(),u.sb(0,0,null,null,2,"div",[["class","col-gamma"]],null,null,null,null,null)),(l()(),u.jb(16777216,null,null,1,null,y)),u.rb(2,278528,null,0,o.i,[u.R,u.O,u.u],{ngForOf:[0,"ngForOf"]},null)],function(l,n){l(n,2,0,n.context.$implicit)},null)}function B(l){return u.Gb(0,[(l()(),u.sb(0,0,null,null,2,"span",[["class","grid"]],null,null,null,null,null)),u.rb(1,278528,null,0,o.l,[u.v,u.l,u.F],{ngStyle:[0,"ngStyle"]},null),u.Cb(2,{width:0,height:1})],function(l,n){var t=n.component;l(n,1,0,l(n,2,0,t.spriteSheetWidth+"px",t.spriteSheetHeight+"px"))},null)}function O(l){return u.Gb(0,[(l()(),u.sb(0,0,null,null,2,"div",[["class","gridCut"]],null,null,null,null,null)),(l()(),u.jb(16777216,null,null,1,null,B)),u.rb(2,278528,null,0,o.i,[u.R,u.O,u.u],{ngForOf:[0,"ngForOf"]},null)],function(l,n){l(n,2,0,n.context.$implicit)},null)}function P(l){return u.Gb(0,[(l()(),u.sb(0,0,null,null,4,"nav",[["class","pr-5 d-flex justify-content-end align-items-center menu"]],null,null,null,null,null)),(l()(),u.sb(1,0,null,null,3,"span",[["class","d-flex justify-content-end align-items-center animated fadeInRight"]],null,null,null,null,null)),(l()(),u.sb(2,0,null,null,0,"img",[["class","img-logo-nav"],["src","./assets/img/logo.gif"]],null,null,null,null,null)),(l()(),u.sb(3,0,null,null,1,"span",[["class","logo-text ml-3"]],null,null,null,null,null)),(l()(),u.Fb(-1,null,[" ATLAS PACKER PHASER 3 "])),(l()(),u.sb(5,0,null,null,53,"main",[["class","container-fluid"]],null,null,null,null,null)),(l()(),u.sb(6,0,null,null,52,"div",[["class","row content-row-editor"]],null,null,null,null,null)),(l()(),u.sb(7,0,null,null,46,"div",[["class","col-12 col-sm-12 col-md-3 controls-border-right py-5 order-2 order-md-1 animated fadeInLeft"]],null,null,null,null,null)),(l()(),u.sb(8,0,null,null,0,"hr",[["class","d-md-none"]],null,null,null,null,null)),(l()(),u.sb(9,0,null,null,10,"div",[["class","form-group text-center"]],null,null,null,null,null)),(l()(),u.sb(10,0,null,null,1,"div",[["for","moreSprites"]],null,null,null,null,null)),(l()(),u.Fb(-1,null,["Add more sprites"])),(l()(),u.sb(12,0,null,null,3,"div",[["class","fileUpload btn-input mr-4"]],null,null,null,null,null)),(l()(),u.sb(13,0,null,null,1,"span",[],null,null,null,null,null)),(l()(),u.sb(14,0,null,null,0,"img",[["class","btn-image-xs img-crisp"],["src","./assets/img/frame.png"]],null,null,null,null,null)),(l()(),u.sb(15,0,null,null,0,"input",[["class","upload"],["id","moreSprites"],["multiple",""],["title","Click to import sprite"],["type","file"]],null,[[null,"change"]],function(l,n,t){var u=!0;return"change"===n&&(u=!1!==l.component.uploadAddFilesMulti(t)&&u),u},null,null)),(l()(),u.sb(16,0,null,null,3,"div",[["class","fileUpload btn-input"]],null,null,null,null,null)),(l()(),u.sb(17,0,null,null,1,"span",[],null,null,null,null,null)),(l()(),u.sb(18,0,null,null,0,"img",[["class","btn-image-xs img-crisp"],["src","./assets/img/spritesheet.png"]],null,null,null,null,null)),(l()(),u.sb(19,0,null,null,0,"input",[["class","upload"],["id","uploadSpritesheet"],["title","Click to import spritesheet"],["type","file"]],null,[[null,"change"]],function(l,n,t){var u=!0;return"change"===n&&(u=!1!==l.component.uploadSpritesheet(t)&&u),u},null,null)),(l()(),u.sb(20,0,null,null,0,"hr",[],null,null,null,null,null)),(l()(),u.sb(21,0,null,null,8,"div",[["class","form-group"]],null,null,null,null,null)),(l()(),u.sb(22,0,null,null,1,"label",[["for","nameSprite"]],null,null,null,null,null)),(l()(),u.Fb(-1,null,["Sprite name"])),(l()(),u.sb(24,0,null,null,5,"input",[["class","form-control-file"],["id","nameSprite"],["type","text"]],[[8,"placeholder",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(l,n,t){var e=!0,i=l.component;return"input"===n&&(e=!1!==u.Bb(l,25)._handleInput(t.target.value)&&e),"blur"===n&&(e=!1!==u.Bb(l,25).onTouched()&&e),"compositionstart"===n&&(e=!1!==u.Bb(l,25)._compositionStart()&&e),"compositionend"===n&&(e=!1!==u.Bb(l,25)._compositionEnd(t.target.value)&&e),"ngModelChange"===n&&(e=!1!==(i.nombreSprite=t)&&e),e},null,null)),u.rb(25,16384,null,0,s.b,[u.F,u.l,[2,s.a]],null,null),u.Db(1024,null,s.d,function(l){return[l]},[s.b]),u.rb(27,671744,null,0,s.g,[[8,null],[8,null],[8,null],[6,s.d]],{model:[0,"model"]},{update:"ngModelChange"}),u.Db(2048,null,s.e,null,[s.g]),u.rb(29,16384,null,0,s.f,[[4,s.e]],null,null),(l()(),u.sb(30,0,null,null,9,"div",[["class","form-group"]],null,null,null,null,null)),(l()(),u.sb(31,0,null,null,1,"label",[["for","spritePerRow"]],null,null,null,null,null)),(l()(),u.Fb(-1,null,["Sprite per row"])),(l()(),u.sb(33,0,null,null,6,"input",[["class","form-control-file"],["id","spritePerRow"],["min","1"],["type","number"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"change"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(l,n,t){var e=!0,i=l.component;return"input"===n&&(e=!1!==u.Bb(l,34)._handleInput(t.target.value)&&e),"blur"===n&&(e=!1!==u.Bb(l,34).onTouched()&&e),"compositionstart"===n&&(e=!1!==u.Bb(l,34)._compositionStart()&&e),"compositionend"===n&&(e=!1!==u.Bb(l,34)._compositionEnd(t.target.value)&&e),"change"===n&&(e=!1!==u.Bb(l,35).onChange(t.target.value)&&e),"input"===n&&(e=!1!==u.Bb(l,35).onChange(t.target.value)&&e),"blur"===n&&(e=!1!==u.Bb(l,35).onTouched()&&e),"ngModelChange"===n&&(e=!1!==(i.spritePerRow=t)&&e),"change"===n&&(e=!1!==i.ngOnInit()&&e),e},null,null)),u.rb(34,16384,null,0,s.b,[u.F,u.l,[2,s.a]],null,null),u.rb(35,16384,null,0,s.i,[u.F,u.l],null,null),u.Db(1024,null,s.d,function(l,n){return[l,n]},[s.b,s.i]),u.rb(37,671744,null,0,s.g,[[8,null],[8,null],[8,null],[6,s.d]],{model:[0,"model"]},{update:"ngModelChange"}),u.Db(2048,null,s.e,null,[s.g]),u.rb(39,16384,null,0,s.f,[[4,s.e]],null,null),(l()(),u.sb(40,0,null,null,0,"hr",[],null,null,null,null,null)),(l()(),u.sb(41,0,null,null,6,"div",[["class","form-group text-center"]],null,null,null,null,null)),(l()(),u.sb(42,0,null,null,1,"div",[["class","my-3"]],null,null,null,null,null)),(l()(),u.Fb(-1,null,[" Zoom: "])),(l()(),u.sb(44,0,null,null,1,"span",[],null,[[null,"click"]],function(l,n,t){var u=!0;return"click"===n&&(u=!1!==l.component.zoom("zoomIn")&&u),u},null,null)),(l()(),u.sb(45,0,null,null,0,"img",[["alt","ZoomIn"],["class","btn-styles zoom-in"],["src","./assets/img/zoomIn.png"]],null,null,null,null,null)),(l()(),u.sb(46,0,null,null,1,"span",[["class","btn-zooms"]],null,[[null,"click"]],function(l,n,t){var u=!0;return"click"===n&&(u=!1!==l.component.zoom("zoomOut")&&u),u},null,null)),(l()(),u.sb(47,0,null,null,0,"img",[["alt","ZoomOut"],["class","btn-styles zoom-out"],["src","./assets/img/zoomOut.png"]],null,null,null,null,null)),(l()(),u.sb(48,0,null,null,0,"hr",[],null,null,null,null,null)),(l()(),u.sb(49,0,null,null,4,"div",[["class","form-group text-center"]],null,null,null,null,null)),(l()(),u.sb(50,0,null,null,1,"button",[["class","btn btn-gamma-primary"]],null,[[null,"click"]],function(l,n,t){var u=!0;return"click"===n&&(u=!1!==l.component.generatePNGJSON()&&u),u},null,null)),(l()(),u.sb(51,0,null,null,0,"img",[["alt","Save"],["src","./assets/img/save.png"]],null,null,null,null,null)),(l()(),u.sb(52,0,null,null,1,"button",[["class","btn btn-gamma-primary ml-3 disabled"]],null,[[null,"click"]],function(l,n,t){var u=!0;return"click"===n&&(u=!1!==l.component.animate()&&u),u},null,null)),(l()(),u.Fb(-1,null,["Animate!"])),(l()(),u.sb(54,0,null,null,4,"div",[["class","col-12 col-sm-12 col-md-9 outputIMG d-flex align-items-center order-1 order-md-2 my-4 m-md-0"]],null,null,null,null,null)),(l()(),u.sb(55,0,null,null,3,"div",[["class","w-100 justify-content-center d-flex"]],null,null,null,null,null)),(l()(),u.sb(56,0,null,null,2,"div",[["class","debug"],["id","output"],["ng-style","styleOut"]],null,null,null,null,null)),(l()(),u.jb(16777216,null,null,1,null,C)),u.rb(58,278528,null,0,o.i,[u.R,u.O,u.u],{ngForOf:[0,"ngForOf"]},null),(l()(),u.sb(59,0,null,null,12,"footer",[["class","py-3"]],null,null,null,null,null)),(l()(),u.sb(60,0,null,null,11,"div",[["class","animated fadeInUp text-center"]],null,null,null,null,null)),(l()(),u.Fb(-1,null,[" Credits: "])),(l()(),u.sb(62,0,null,null,1,"a",[["href","https://github.com/gammafp"]],null,null,null,null,null)),(l()(),u.Fb(-1,null,["Gammafp"])),(l()(),u.sb(64,0,null,null,1,"span",[],null,null,null,null,null)),(l()(),u.Fb(-1,null,[", "])),(l()(),u.sb(66,0,null,null,1,"a",[["href","https://twitter.com/veryeviltomato/media"]],null,null,null,null,null)),(l()(),u.Fb(-1,null,["Evil tomato"])),(l()(),u.sb(68,0,null,null,1,"span",[],null,null,null,null,null)),(l()(),u.Fb(-1,null,[" & "])),(l()(),u.sb(70,0,null,null,1,"a",[["href","#"]],null,null,null,null,null)),(l()(),u.Fb(-1,null,["Magdiel"])),(l()(),u.sb(72,0,null,null,42,"div",[["aria-hidden","true"],["aria-labelledby","exampleModalLabel"],["class","modal fade"],["data-backdrop","static"],["data-keyboard","false"],["id","modalSpriteSheet"],["role","dialog"],["tabindex","-1"]],null,null,null,null,null)),(l()(),u.sb(73,0,null,null,41,"div",[["class","modal-dialog"],["role","document"]],null,null,null,null,null)),(l()(),u.sb(74,0,null,null,40,"div",[["class","modal-content"]],null,null,null,null,null)),(l()(),u.sb(75,0,null,null,5,"div",[["class","modal-header"]],null,null,null,null,null)),(l()(),u.sb(76,0,null,null,1,"h5",[["class","modal-title"],["id","exampleModalLabel"]],null,null,null,null,null)),(l()(),u.Fb(-1,null,["Import sprite sheet"])),(l()(),u.sb(78,0,null,null,2,"button",[["aria-label","Close"],["class","close"],["data-dismiss","modal"],["type","button"]],null,null,null,null,null)),(l()(),u.sb(79,0,null,null,1,"span",[["aria-hidden","true"]],null,null,null,null,null)),(l()(),u.Fb(-1,null,["\xd7"])),(l()(),u.sb(81,0,null,null,28,"div",[["class","modal-body"]],null,null,null,null,null)),(l()(),u.sb(82,0,null,null,7,"div",[["class","spriteSheet my-5"]],null,null,null,null,null)),u.rb(83,278528,null,0,o.l,[u.v,u.l,u.F],{ngStyle:[0,"ngStyle"]},null),u.Cb(84,{height:0}),(l()(),u.sb(85,0,null,null,4,"div",[],null,null,null,null,null)),(l()(),u.sb(86,0,null,null,1,"div",[["class","spriteSheetIMG"]],null,null,null,null,null)),(l()(),u.sb(87,0,null,null,0,"img",[],[[8,"src",4]],null,null,null,null)),(l()(),u.jb(16777216,null,null,1,null,O)),u.rb(89,278528,null,0,o.i,[u.R,u.O,u.u],{ngForOf:[0,"ngForOf"]},null),(l()(),u.sb(90,0,null,null,19,"div",[],null,null,null,null,null)),(l()(),u.Fb(-1,null,[" Sprite width: "])),(l()(),u.sb(92,0,null,null,6,"input",[["type","number"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"change"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(l,n,t){var e=!0,i=l.component;return"input"===n&&(e=!1!==u.Bb(l,93)._handleInput(t.target.value)&&e),"blur"===n&&(e=!1!==u.Bb(l,93).onTouched()&&e),"compositionstart"===n&&(e=!1!==u.Bb(l,93)._compositionStart()&&e),"compositionend"===n&&(e=!1!==u.Bb(l,93)._compositionEnd(t.target.value)&&e),"change"===n&&(e=!1!==u.Bb(l,94).onChange(t.target.value)&&e),"input"===n&&(e=!1!==u.Bb(l,94).onChange(t.target.value)&&e),"blur"===n&&(e=!1!==u.Bb(l,94).onTouched()&&e),"ngModelChange"===n&&(e=!1!==(i.spriteSheetWidth=t)&&e),"change"===n&&(e=!1!==i.changeSizeGridCut()&&e),e},null,null)),u.rb(93,16384,null,0,s.b,[u.F,u.l,[2,s.a]],null,null),u.rb(94,16384,null,0,s.i,[u.F,u.l],null,null),u.Db(1024,null,s.d,function(l,n){return[l,n]},[s.b,s.i]),u.rb(96,671744,null,0,s.g,[[8,null],[8,null],[8,null],[6,s.d]],{model:[0,"model"]},{update:"ngModelChange"}),u.Db(2048,null,s.e,null,[s.g]),u.rb(98,16384,null,0,s.f,[[4,s.e]],null,null),(l()(),u.Fb(-1,null,[" px "])),(l()(),u.sb(100,0,null,null,0,"br",[],null,null,null,null,null)),(l()(),u.Fb(-1,null,[" Sprite height: "])),(l()(),u.sb(102,0,null,null,6,"input",[["type","number"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"change"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(l,n,t){var e=!0,i=l.component;return"input"===n&&(e=!1!==u.Bb(l,103)._handleInput(t.target.value)&&e),"blur"===n&&(e=!1!==u.Bb(l,103).onTouched()&&e),"compositionstart"===n&&(e=!1!==u.Bb(l,103)._compositionStart()&&e),"compositionend"===n&&(e=!1!==u.Bb(l,103)._compositionEnd(t.target.value)&&e),"change"===n&&(e=!1!==u.Bb(l,104).onChange(t.target.value)&&e),"input"===n&&(e=!1!==u.Bb(l,104).onChange(t.target.value)&&e),"blur"===n&&(e=!1!==u.Bb(l,104).onTouched()&&e),"ngModelChange"===n&&(e=!1!==(i.spriteSheetHeight=t)&&e),"change"===n&&(e=!1!==i.changeSizeGridCut()&&e),e},null,null)),u.rb(103,16384,null,0,s.b,[u.F,u.l,[2,s.a]],null,null),u.rb(104,16384,null,0,s.i,[u.F,u.l],null,null),u.Db(1024,null,s.d,function(l,n){return[l,n]},[s.b,s.i]),u.rb(106,671744,null,0,s.g,[[8,null],[8,null],[8,null],[6,s.d]],{model:[0,"model"]},{update:"ngModelChange"}),u.Db(2048,null,s.e,null,[s.g]),u.rb(108,16384,null,0,s.f,[[4,s.e]],null,null),(l()(),u.Fb(-1,null,[" px "])),(l()(),u.sb(110,0,null,null,4,"div",[["class","modal-footer"]],null,null,null,null,null)),(l()(),u.sb(111,0,null,null,1,"button",[["class","btn btn-secondary"],["data-dismiss","modal"],["type","button"]],null,null,null,null,null)),(l()(),u.Fb(-1,null,["Close"])),(l()(),u.sb(113,0,null,null,1,"button",[["class","btn btn-primary"],["type","button"]],null,[[null,"click"]],function(l,n,t){var u=!0;return"click"===n&&(u=!1!==l.component.cutSpritesheet()&&u),u},null,null)),(l()(),u.Fb(-1,null,["Save changes"]))],function(l,n){var t=n.component;l(n,27,0,t.nombreSprite),l(n,37,0,t.spritePerRow),l(n,58,0,t.imagesFiles),l(n,83,0,l(n,84,0,t.canvasSize.height+"px")),l(n,89,0,t.cutterLines),l(n,96,0,t.spriteSheetWidth),l(n,106,0,t.spriteSheetHeight)},function(l,n){var t=n.component;l(n,24,0,u.ub(1,"",t.nombreSprite,""),u.Bb(n,29).ngClassUntouched,u.Bb(n,29).ngClassTouched,u.Bb(n,29).ngClassPristine,u.Bb(n,29).ngClassDirty,u.Bb(n,29).ngClassValid,u.Bb(n,29).ngClassInvalid,u.Bb(n,29).ngClassPending),l(n,33,0,u.Bb(n,39).ngClassUntouched,u.Bb(n,39).ngClassTouched,u.Bb(n,39).ngClassPristine,u.Bb(n,39).ngClassDirty,u.Bb(n,39).ngClassValid,u.Bb(n,39).ngClassInvalid,u.Bb(n,39).ngClassPending),l(n,87,0,u.ub(1,"",t.printSpriteSheet,"")),l(n,92,0,u.Bb(n,98).ngClassUntouched,u.Bb(n,98).ngClassTouched,u.Bb(n,98).ngClassPristine,u.Bb(n,98).ngClassDirty,u.Bb(n,98).ngClassValid,u.Bb(n,98).ngClassInvalid,u.Bb(n,98).ngClassPending),l(n,102,0,u.Bb(n,108).ngClassUntouched,u.Bb(n,108).ngClassTouched,u.Bb(n,108).ngClassPristine,u.Bb(n,108).ngClassDirty,u.Bb(n,108).ngClassValid,u.Bb(n,108).ngClassInvalid,u.Bb(n,108).ngClassPending)})}var w=u.ob("app-editor",f,function(l){return u.Gb(0,[(l()(),u.sb(0,0,null,null,1,"app-editor",[],null,null,null,P,S)),u.rb(1,114688,null,0,f,[r.a,c,g.b,v.k,d.a,u.l],null,null)],function(l,n){l(n,1,0)},null)},{},{},[]),x=function(){};t.d(n,"EditorModuleNgFactory",function(){return M});var M=u.pb(e,[],function(l){return u.zb([u.Ab(512,u.k,u.eb,[[8,[i.a,w]],[3,u.k],u.z]),u.Ab(4608,o.k,o.j,[u.w,[2,o.r]]),u.Ab(4608,s.j,s.j,[]),u.Ab(4608,g.b,g.b,[]),u.Ab(4608,g.c,g.c,[]),u.Ab(4608,g.a,g.a,[]),u.Ab(4608,g.d,g.d,[]),u.Ab(1073742336,o.b,o.b,[]),u.Ab(1073742336,v.l,v.l,[[2,v.r],[2,v.k]]),u.Ab(1073742336,x,x,[]),u.Ab(1073742336,s.h,s.h,[]),u.Ab(1073742336,s.c,s.c,[]),u.Ab(1073742336,g.e,g.e,[]),u.Ab(1073742336,e,e,[]),u.Ab(1024,v.i,function(){return[[{path:"",component:f}]]},[])])})}}]);