// Garden Gnome Software - Skin
// Pano2VR 6.0.1/17227
// Filename: 360.ggsk
// Generated lun feb 16 02:14:05 2026

function pano2vrSkin(player,base) {
	var me=this;
	var skin=this;
	var flag=false;
	var nodeMarker=[];
	var activeNodeMarker=[];
	var hotspotTemplates={};
	var skinKeyPressed = 0;
	this.player=player;
	this.player.skinObj=this;
	this.divSkin=player.divSkin;
	this.ggUserdata=player.userdata;
	this.lastSize={ w: -1,h: -1 };
	var basePath="";
	// auto detect base path
	if (base=='?') {
		var scripts = document.getElementsByTagName('script');
		for(var i=0;i<scripts.length;i++) {
			var src=scripts[i].src;
			if (src.indexOf('skin.js')>=0) {
				var p=src.lastIndexOf('/');
				if (p>=0) {
					basePath=src.substr(0,p+1);
				}
			}
		}
	} else
	if (base) {
		basePath=base;
	}
	this.elementMouseDown=[];
	this.elementMouseOver=[];
	var cssPrefix='';
	var domTransition='transition';
	var domTransform='transform';
	var prefixes='Webkit,Moz,O,ms,Ms'.split(',');
	var i;
	var hs,el,els,elo,ela,elHorScrollFg,elHorScrollBg,elVertScrollFg,elVertScrollBg,elCornerBg;
	if (typeof document.body.style['transform'] == 'undefined') {
		for(var i=0;i<prefixes.length;i++) {
			if (typeof document.body.style[prefixes[i] + 'Transform'] !== 'undefined') {
				cssPrefix='-' + prefixes[i].toLowerCase() + '-';
				domTransition=prefixes[i] + 'Transition';
				domTransform=prefixes[i] + 'Transform';
			}
		}
	}
	
	player.setMargins(0,0,0,0);
	
	this.updateSize=function(startElement) {
		var stack=[];
		stack.push(startElement);
		while(stack.length>0) {
			var e=stack.pop();
			if (e.ggUpdatePosition) {
				e.ggUpdatePosition();
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
	}
	
	this.callNodeChange=function(startElement) {
		var stack=[];
		stack.push(startElement);
		while(stack.length>0) {
			var e=stack.pop();
			if (e.ggNodeChange) {
				e.ggNodeChange();
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
	}
	player.addListener('configloaded', function() { me.callNodeChange(me.divSkin); });
	player.addListener('changenodeid', function() { me.callNodeChange(me.divSkin); });
	
	var parameterToTransform=function(p) {
		var hs='translate(' + p.rx + 'px,' + p.ry + 'px) rotate(' + p.a + 'deg) scale(' + p.sx + ',' + p.sy + ')';
		return hs;
	}
	
	this.findElements=function(id,regex) {
		var r=[];
		var stack=[];
		var pat=new RegExp(id,'');
		stack.push(me.divSkin);
		while(stack.length>0) {
			var e=stack.pop();
			if (regex) {
				if (pat.test(e.ggId)) r.push(e);
			} else {
				if (e.ggId==id) r.push(e);
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
		return r;
	}
	
	this.addSkin=function() {
		var hs='';
		this.ggCurrentTime=new Date().getTime();
		el=me._hide_template=document.createElement('div');
		el.ggId="hide_template";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 45px;';
		hs+='left : 0px;';
		hs+='overflow : hidden;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : hidden;';
		hs+='width : 187px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._hide_template.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._hide_template.ggUpdatePosition=function (useTransition) {
		}
		el=me._markertemplate=document.createElement('div');
		el.ggMarkerNodeId='';
		el.ggMarkerInstances = [];
		nodeMarker.push(el);
		el.ggId="markertemplate";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_mark ";
		el.ggType='mark';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 0px;';
		hs+='left : 60px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._markertemplate.ggIsActive=function() {
			return this.ggIsMarkerActive==true;
		}
		el.ggElementNodeId=function() {
			var hs=String(this.ggMarkerNodeId);
			if (hs.charAt(0)=='{') {
				return hs.substr(1, hs.length - 2);
			}
			return '';
		}
		me._markertemplate.onmouseover=function (e) {
			me.elementMouseOver['markertemplate']=true;
			me._marker_title.logicBlock_visible();
		}
		me._markertemplate.onmouseout=function (e) {
			me.elementMouseOver['markertemplate']=false;
			me._marker_title.logicBlock_visible();
		}
		me._markertemplate.ontouchend=function (e) {
			me.elementMouseOver['markertemplate']=false;
			me._marker_title.logicBlock_visible();
		}
		me._markertemplate.ggUpdatePosition=function (useTransition) {
		}
		el=me._marker_title=document.createElement('div');
		els=me._marker_title__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="marker_title";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='z-index: 100;';
		hs+='height : 20px;';
		hs+='left : -35px;';
		hs+='position : absolute;';
		hs+='top : 35px;';
		hs+='visibility : hidden;';
		hs+='width : 100px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='background: #000000;';
		hs+='background: rgba(0,0,0,0.666667);';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 2px 5px 2px 5px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		me._marker_title.ggUpdateText=function() {
			var hs=me.ggUserdata.title;
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._marker_title.ggUpdateText();
		el.appendChild(els);
		me._marker_title.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._marker_title.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				(player.getIsMobile() == true)
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._marker_title.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._marker_title.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._marker_title.style[domTransition]='left 0s, top 0s';
				if (me._marker_title.ggCurrentLogicStatePosition == 0) {
					me._marker_title.style.left='-35px';
					me._marker_title.style.top='-25px';
				}
				else {
					me._marker_title.style.left='-35px';
					me._marker_title.style.top='35px';
				}
			}
		}
		me._marker_title.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				(me.elementMouseOver['markertemplate'] == true) || 
				(me.elementMouseOver['marker_title'] == true)
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._marker_title.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._marker_title.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._marker_title.style[domTransition]='left 0s, top 0s';
				if (me._marker_title.ggCurrentLogicStateVisible == 0) {
					me._marker_title.style.visibility=(Number(me._marker_title.style.opacity)>0||!me._marker_title.style.opacity)?'inherit':'hidden';
					me._marker_title.ggVisible=true;
				}
				else {
					me._marker_title.style.visibility="hidden";
					me._marker_title.ggVisible=false;
				}
			}
		}
		me._marker_title.onmouseover=function (e) {
			me.elementMouseOver['marker_title']=true;
			me._marker_title.logicBlock_visible();
		}
		me._marker_title.onmouseout=function (e) {
			if (e && e.toElement) {
				var current = e.toElement;
				while (current = current.parentNode) {
				if (current == me._marker_title__text)
					return;
				}
			}
			me.elementMouseOver['marker_title']=false;
			me._marker_title.logicBlock_visible();
		}
		me._marker_title.ontouchend=function (e) {
			me.elementMouseOver['marker_title']=false;
			me._marker_title.logicBlock_visible();
		}
		me._marker_title.ggUpdatePosition=function (useTransition) {
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((98-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._markertemplate.appendChild(me._marker_title);
		me._hide_template.appendChild(me._markertemplate);
		me.divSkin.appendChild(me._hide_template);
		el=me._web=document.createElement('div');
		el.ggId="web";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='bottom : 0%;';
		hs+='height : 297px;';
		hs+='left : 0%;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 300px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='0% 100%';
		me._web.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._web.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				(player.getIsMobile() == true) || 
				(player.getViewerSize().width == 500)
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._web.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._web.ggCurrentLogicStateScaling = newLogicStateScaling;
				me._web.style[domTransition]='' + cssPrefix + 'transform 0s';
				if (me._web.ggCurrentLogicStateScaling == 0) {
					me._web.ggParameter.sx = 0.7;
					me._web.ggParameter.sy = 0.7;
					me._web.style[domTransform]=parameterToTransform(me._web.ggParameter);
				}
				else {
					me._web.ggParameter.sx = 1;
					me._web.ggParameter.sy = 1;
					me._web.style[domTransform]=parameterToTransform(me._web.ggParameter);
				}
			}
		}
		me._web.ggUpdatePosition=function (useTransition) {
		}
		el=me._image_1=document.createElement('div');
		els=me._image_1__img=document.createElement('img');
		els.className='ggskin ggskin_image_1';
		hs=basePath + 'images/image_1.png';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_image';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Image 1";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_image ";
		el.ggType='image';
		hs ='';
		hs+='bottom : 0%;';
		hs+='height : 300px;';
		hs+='left : 0%;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 300px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._image_1.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._image_1.ggUpdatePosition=function (useTransition) {
		}
		el=me._marker_active_1=document.createElement('div');
		els=me._marker_active_1__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE1LjAuMiwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDMwIDMwIiB5PSIwcHgiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDMwIDMwIiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bW'+
			'xuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSIwcHgiIGhlaWdodD0iMzBweCIgd2lkdGg9IjMwcHgiPgogPGcgaWQ9IkxheWVyXzEiPgogIDxjaXJjbGUgY3g9IjE0Ljk4MSIgc3Ryb2tlLW9wYWNpdHk9IjEiIHN0cm9rZS13aWR0aD0iNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiByPSIxMC45OTQiIGN5PSIxNC45ODciIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIvPgogPC9nPgogPGcgaWQ9IkxheWVyXzFfY29weSI+CiAgPGNpcmNsZSBjeD0iMTQuOTgxIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9r'+
			'ZS1taXRlcmxpbWl0PSIxMCIgcj0iMTAuOTk0IiBjeT0iMTQuOTg3IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkZGRkYiLz4KIDwvZz4KIDxnIGRpc3BsYXk9Im5vbmUiIGlkPSJMYXllcl8zIj4KICA8Y2lyY2xlIGRpc3BsYXk9ImlubGluZSIgY3g9IjE0Ljk4IiBmaWxsLW9wYWNpdHk9IjEiIHN0cm9rZS1vcGFjaXR5PSIwIiBzdHJva2Utd2lkdGg9IjAuNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiByPSIyLjExNyIgY3k9IjMuOTk0IiBmaWxsPSIjMDAwMDAwIiBzdHJva2U9IiNlZTFkM2EiLz4KIDwvZz4KIDxnIGRpc3BsYXk9Im5vbmUiIGlkPSJMYXllcl8yIj4KICA8Y2lyY2xlIGRpc3BsYX'+
			'k9ImlubGluZSIgY3g9IjE0Ljk4MSIgc3Ryb2tlLW9wYWNpdHk9IjEiIHN0cm9rZS13aWR0aD0iNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiByPSIxMC45OTQiIGN5PSIxNC45ODciIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIvPgogPC9nPgogPGcgZGlzcGxheT0ibm9uZSIgaWQ9IkxheWVyXzFfY29weSI+CiAgPGNpcmNsZSBkaXNwbGF5PSJpbmxpbmUiIGN4PSIxNC45ODEiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiByPSIxMC45OTQiIGN5PSIxNC45ODciIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0ZGRkZGRiIvPgogPC9nPgogPGcgaWQ9IkxheWVyXzMiPgog'+
			'IDxjaXJjbGUgY3g9IjE0Ljk4IiBmaWxsLW9wYWNpdHk9IjEiIHN0cm9rZS1vcGFjaXR5PSIwIiBzdHJva2Utd2lkdGg9IjAuNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiByPSIyLjExNyIgY3k9IjMuOTk0IiBmaWxsPSIjMDAwMDAwIiBzdHJva2U9IiNlZTFkM2EiLz4KIDwvZz4KPC9zdmc+Cg==';
		me._marker_active_1__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;marker_active_1;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="marker_active_1";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 30px;';
		hs+='left : 118px;';
		hs+='position : absolute;';
		hs+='top : 75px;';
		hs+='visibility : inherit;';
		hs+='width : 30px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._marker_active_1.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._marker_active_1.onclick=function (e) {
			player.openNext("{node17}","");
		}
		me._marker_active_1.ggUpdatePosition=function (useTransition) {
		}
		me._image_1.appendChild(me._marker_active_1);
		el=me._marker_active_2=document.createElement('div');
		els=me._marker_active_2__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE1LjAuMiwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDMwIDMwIiB5PSIwcHgiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDMwIDMwIiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bW'+
			'xuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSIwcHgiIGhlaWdodD0iMzBweCIgd2lkdGg9IjMwcHgiPgogPGcgaWQ9IkxheWVyXzEiPgogIDxjaXJjbGUgY3g9IjE0Ljk4MSIgc3Ryb2tlLW9wYWNpdHk9IjEiIHN0cm9rZS13aWR0aD0iNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiByPSIxMC45OTQiIGN5PSIxNC45ODciIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIvPgogPC9nPgogPGcgaWQ9IkxheWVyXzFfY29weSI+CiAgPGNpcmNsZSBjeD0iMTQuOTgxIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9r'+
			'ZS1taXRlcmxpbWl0PSIxMCIgcj0iMTAuOTk0IiBjeT0iMTQuOTg3IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkZGRkYiLz4KIDwvZz4KIDxnIGRpc3BsYXk9Im5vbmUiIGlkPSJMYXllcl8zIj4KICA8Y2lyY2xlIGRpc3BsYXk9ImlubGluZSIgY3g9IjE0Ljk4IiBmaWxsLW9wYWNpdHk9IjEiIHN0cm9rZS1vcGFjaXR5PSIwIiBzdHJva2Utd2lkdGg9IjAuNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiByPSIyLjExNyIgY3k9IjMuOTk0IiBmaWxsPSIjMDAwMDAwIiBzdHJva2U9IiNlZTFkM2EiLz4KIDwvZz4KIDxnIGRpc3BsYXk9Im5vbmUiIGlkPSJMYXllcl8yIj4KICA8Y2lyY2xlIGRpc3BsYX'+
			'k9ImlubGluZSIgY3g9IjE0Ljk4MSIgc3Ryb2tlLW9wYWNpdHk9IjEiIHN0cm9rZS13aWR0aD0iNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiByPSIxMC45OTQiIGN5PSIxNC45ODciIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIvPgogPC9nPgogPGcgZGlzcGxheT0ibm9uZSIgaWQ9IkxheWVyXzFfY29weSI+CiAgPGNpcmNsZSBkaXNwbGF5PSJpbmxpbmUiIGN4PSIxNC45ODEiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiByPSIxMC45OTQiIGN5PSIxNC45ODciIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0ZGRkZGRiIvPgogPC9nPgogPGcgaWQ9IkxheWVyXzMiPgog'+
			'IDxjaXJjbGUgY3g9IjE0Ljk4IiBmaWxsLW9wYWNpdHk9IjEiIHN0cm9rZS1vcGFjaXR5PSIwIiBzdHJva2Utd2lkdGg9IjAuNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiByPSIyLjExNyIgY3k9IjMuOTk0IiBmaWxsPSIjMDAwMDAwIiBzdHJva2U9IiNlZTFkM2EiLz4KIDwvZz4KPC9zdmc+Cg==';
		me._marker_active_2__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;marker_active_2;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="marker_active_2";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 30px;';
		hs+='left : 118px;';
		hs+='position : absolute;';
		hs+='top : 107px;';
		hs+='visibility : inherit;';
		hs+='width : 30px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._marker_active_2.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._marker_active_2.onclick=function (e) {
			player.openNext("{node16}","");
		}
		me._marker_active_2.ggUpdatePosition=function (useTransition) {
		}
		me._image_1.appendChild(me._marker_active_2);
		el=me._marker_active_3=document.createElement('div');
		els=me._marker_active_3__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE1LjAuMiwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDMwIDMwIiB5PSIwcHgiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDMwIDMwIiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bW'+
			'xuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSIwcHgiIGhlaWdodD0iMzBweCIgd2lkdGg9IjMwcHgiPgogPGcgaWQ9IkxheWVyXzEiPgogIDxjaXJjbGUgY3g9IjE0Ljk4MSIgc3Ryb2tlLW9wYWNpdHk9IjEiIHN0cm9rZS13aWR0aD0iNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiByPSIxMC45OTQiIGN5PSIxNC45ODciIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIvPgogPC9nPgogPGcgaWQ9IkxheWVyXzFfY29weSI+CiAgPGNpcmNsZSBjeD0iMTQuOTgxIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9r'+
			'ZS1taXRlcmxpbWl0PSIxMCIgcj0iMTAuOTk0IiBjeT0iMTQuOTg3IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkZGRkYiLz4KIDwvZz4KIDxnIGRpc3BsYXk9Im5vbmUiIGlkPSJMYXllcl8zIj4KICA8Y2lyY2xlIGRpc3BsYXk9ImlubGluZSIgY3g9IjE0Ljk4IiBmaWxsLW9wYWNpdHk9IjEiIHN0cm9rZS1vcGFjaXR5PSIwIiBzdHJva2Utd2lkdGg9IjAuNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiByPSIyLjExNyIgY3k9IjMuOTk0IiBmaWxsPSIjMDAwMDAwIiBzdHJva2U9IiNlZTFkM2EiLz4KIDwvZz4KIDxnIGRpc3BsYXk9Im5vbmUiIGlkPSJMYXllcl8yIj4KICA8Y2lyY2xlIGRpc3BsYX'+
			'k9ImlubGluZSIgY3g9IjE0Ljk4MSIgc3Ryb2tlLW9wYWNpdHk9IjEiIHN0cm9rZS13aWR0aD0iNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiByPSIxMC45OTQiIGN5PSIxNC45ODciIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIvPgogPC9nPgogPGcgZGlzcGxheT0ibm9uZSIgaWQ9IkxheWVyXzFfY29weSI+CiAgPGNpcmNsZSBkaXNwbGF5PSJpbmxpbmUiIGN4PSIxNC45ODEiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiByPSIxMC45OTQiIGN5PSIxNC45ODciIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0ZGRkZGRiIvPgogPC9nPgogPGcgaWQ9IkxheWVyXzMiPgog'+
			'IDxjaXJjbGUgY3g9IjE0Ljk4IiBmaWxsLW9wYWNpdHk9IjEiIHN0cm9rZS1vcGFjaXR5PSIwIiBzdHJva2Utd2lkdGg9IjAuNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiByPSIyLjExNyIgY3k9IjMuOTk0IiBmaWxsPSIjMDAwMDAwIiBzdHJva2U9IiNlZTFkM2EiLz4KIDwvZz4KPC9zdmc+Cg==';
		me._marker_active_3__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;marker_active_3;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="marker_active_3";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 30px;';
		hs+='left : 118px;';
		hs+='position : absolute;';
		hs+='top : 138px;';
		hs+='visibility : inherit;';
		hs+='width : 30px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._marker_active_3.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._marker_active_3.onclick=function (e) {
			player.openNext("{node15}","");
		}
		me._marker_active_3.ggUpdatePosition=function (useTransition) {
		}
		me._image_1.appendChild(me._marker_active_3);
		el=me._marker_active_4=document.createElement('div');
		els=me._marker_active_4__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE1LjAuMiwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDMwIDMwIiB5PSIwcHgiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDMwIDMwIiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bW'+
			'xuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSIwcHgiIGhlaWdodD0iMzBweCIgd2lkdGg9IjMwcHgiPgogPGcgaWQ9IkxheWVyXzEiPgogIDxjaXJjbGUgY3g9IjE0Ljk4MSIgc3Ryb2tlLW9wYWNpdHk9IjEiIHN0cm9rZS13aWR0aD0iNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiByPSIxMC45OTQiIGN5PSIxNC45ODciIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIvPgogPC9nPgogPGcgaWQ9IkxheWVyXzFfY29weSI+CiAgPGNpcmNsZSBjeD0iMTQuOTgxIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9r'+
			'ZS1taXRlcmxpbWl0PSIxMCIgcj0iMTAuOTk0IiBjeT0iMTQuOTg3IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkZGRkYiLz4KIDwvZz4KIDxnIGRpc3BsYXk9Im5vbmUiIGlkPSJMYXllcl8zIj4KICA8Y2lyY2xlIGRpc3BsYXk9ImlubGluZSIgY3g9IjE0Ljk4IiBmaWxsLW9wYWNpdHk9IjEiIHN0cm9rZS1vcGFjaXR5PSIwIiBzdHJva2Utd2lkdGg9IjAuNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiByPSIyLjExNyIgY3k9IjMuOTk0IiBmaWxsPSIjMDAwMDAwIiBzdHJva2U9IiNlZTFkM2EiLz4KIDwvZz4KIDxnIGRpc3BsYXk9Im5vbmUiIGlkPSJMYXllcl8yIj4KICA8Y2lyY2xlIGRpc3BsYX'+
			'k9ImlubGluZSIgY3g9IjE0Ljk4MSIgc3Ryb2tlLW9wYWNpdHk9IjEiIHN0cm9rZS13aWR0aD0iNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiByPSIxMC45OTQiIGN5PSIxNC45ODciIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIvPgogPC9nPgogPGcgZGlzcGxheT0ibm9uZSIgaWQ9IkxheWVyXzFfY29weSI+CiAgPGNpcmNsZSBkaXNwbGF5PSJpbmxpbmUiIGN4PSIxNC45ODEiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiByPSIxMC45OTQiIGN5PSIxNC45ODciIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0ZGRkZGRiIvPgogPC9nPgogPGcgaWQ9IkxheWVyXzMiPgog'+
			'IDxjaXJjbGUgY3g9IjE0Ljk4IiBmaWxsLW9wYWNpdHk9IjEiIHN0cm9rZS1vcGFjaXR5PSIwIiBzdHJva2Utd2lkdGg9IjAuNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiByPSIyLjExNyIgY3k9IjMuOTk0IiBmaWxsPSIjMDAwMDAwIiBzdHJva2U9IiNlZTFkM2EiLz4KIDwvZz4KPC9zdmc+Cg==';
		me._marker_active_4__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;marker_active_4;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="marker_active_4";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 30px;';
		hs+='left : 79px;';
		hs+='position : absolute;';
		hs+='top : 140px;';
		hs+='visibility : inherit;';
		hs+='width : 30px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._marker_active_4.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._marker_active_4.onclick=function (e) {
			player.openNext("{node14}","");
		}
		me._marker_active_4.ggUpdatePosition=function (useTransition) {
		}
		me._image_1.appendChild(me._marker_active_4);
		el=me._marker_active_5=document.createElement('div');
		els=me._marker_active_5__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE1LjAuMiwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDMwIDMwIiB5PSIwcHgiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDMwIDMwIiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bW'+
			'xuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSIwcHgiIGhlaWdodD0iMzBweCIgd2lkdGg9IjMwcHgiPgogPGcgaWQ9IkxheWVyXzEiPgogIDxjaXJjbGUgY3g9IjE0Ljk4MSIgc3Ryb2tlLW9wYWNpdHk9IjEiIHN0cm9rZS13aWR0aD0iNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiByPSIxMC45OTQiIGN5PSIxNC45ODciIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIvPgogPC9nPgogPGcgaWQ9IkxheWVyXzFfY29weSI+CiAgPGNpcmNsZSBjeD0iMTQuOTgxIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9r'+
			'ZS1taXRlcmxpbWl0PSIxMCIgcj0iMTAuOTk0IiBjeT0iMTQuOTg3IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkZGRkYiLz4KIDwvZz4KIDxnIGRpc3BsYXk9Im5vbmUiIGlkPSJMYXllcl8zIj4KICA8Y2lyY2xlIGRpc3BsYXk9ImlubGluZSIgY3g9IjE0Ljk4IiBmaWxsLW9wYWNpdHk9IjEiIHN0cm9rZS1vcGFjaXR5PSIwIiBzdHJva2Utd2lkdGg9IjAuNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiByPSIyLjExNyIgY3k9IjMuOTk0IiBmaWxsPSIjMDAwMDAwIiBzdHJva2U9IiNlZTFkM2EiLz4KIDwvZz4KIDxnIGRpc3BsYXk9Im5vbmUiIGlkPSJMYXllcl8yIj4KICA8Y2lyY2xlIGRpc3BsYX'+
			'k9ImlubGluZSIgY3g9IjE0Ljk4MSIgc3Ryb2tlLW9wYWNpdHk9IjEiIHN0cm9rZS13aWR0aD0iNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiByPSIxMC45OTQiIGN5PSIxNC45ODciIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIvPgogPC9nPgogPGcgZGlzcGxheT0ibm9uZSIgaWQ9IkxheWVyXzFfY29weSI+CiAgPGNpcmNsZSBkaXNwbGF5PSJpbmxpbmUiIGN4PSIxNC45ODEiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiByPSIxMC45OTQiIGN5PSIxNC45ODciIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0ZGRkZGRiIvPgogPC9nPgogPGcgaWQ9IkxheWVyXzMiPgog'+
			'IDxjaXJjbGUgY3g9IjE0Ljk4IiBmaWxsLW9wYWNpdHk9IjEiIHN0cm9rZS1vcGFjaXR5PSIwIiBzdHJva2Utd2lkdGg9IjAuNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiByPSIyLjExNyIgY3k9IjMuOTk0IiBmaWxsPSIjMDAwMDAwIiBzdHJva2U9IiNlZTFkM2EiLz4KIDwvZz4KPC9zdmc+Cg==';
		me._marker_active_5__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;marker_active_5;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="marker_active_5";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 30px;';
		hs+='left : 118px;';
		hs+='position : absolute;';
		hs+='top : 167px;';
		hs+='visibility : inherit;';
		hs+='width : 30px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._marker_active_5.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._marker_active_5.onclick=function (e) {
			player.openNext("{node21}","");
		}
		me._marker_active_5.ggUpdatePosition=function (useTransition) {
		}
		me._image_1.appendChild(me._marker_active_5);
		el=me._marker_active_6=document.createElement('div');
		els=me._marker_active_6__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE1LjAuMiwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDMwIDMwIiB5PSIwcHgiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDMwIDMwIiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bW'+
			'xuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSIwcHgiIGhlaWdodD0iMzBweCIgd2lkdGg9IjMwcHgiPgogPGcgaWQ9IkxheWVyXzEiPgogIDxjaXJjbGUgY3g9IjE0Ljk4MSIgc3Ryb2tlLW9wYWNpdHk9IjEiIHN0cm9rZS13aWR0aD0iNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiByPSIxMC45OTQiIGN5PSIxNC45ODciIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIvPgogPC9nPgogPGcgaWQ9IkxheWVyXzFfY29weSI+CiAgPGNpcmNsZSBjeD0iMTQuOTgxIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9r'+
			'ZS1taXRlcmxpbWl0PSIxMCIgcj0iMTAuOTk0IiBjeT0iMTQuOTg3IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkZGRkYiLz4KIDwvZz4KIDxnIGRpc3BsYXk9Im5vbmUiIGlkPSJMYXllcl8zIj4KICA8Y2lyY2xlIGRpc3BsYXk9ImlubGluZSIgY3g9IjE0Ljk4IiBmaWxsLW9wYWNpdHk9IjEiIHN0cm9rZS1vcGFjaXR5PSIwIiBzdHJva2Utd2lkdGg9IjAuNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiByPSIyLjExNyIgY3k9IjMuOTk0IiBmaWxsPSIjMDAwMDAwIiBzdHJva2U9IiNlZTFkM2EiLz4KIDwvZz4KIDxnIGRpc3BsYXk9Im5vbmUiIGlkPSJMYXllcl8yIj4KICA8Y2lyY2xlIGRpc3BsYX'+
			'k9ImlubGluZSIgY3g9IjE0Ljk4MSIgc3Ryb2tlLW9wYWNpdHk9IjEiIHN0cm9rZS13aWR0aD0iNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiByPSIxMC45OTQiIGN5PSIxNC45ODciIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIvPgogPC9nPgogPGcgZGlzcGxheT0ibm9uZSIgaWQ9IkxheWVyXzFfY29weSI+CiAgPGNpcmNsZSBkaXNwbGF5PSJpbmxpbmUiIGN4PSIxNC45ODEiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiByPSIxMC45OTQiIGN5PSIxNC45ODciIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0ZGRkZGRiIvPgogPC9nPgogPGcgaWQ9IkxheWVyXzMiPgog'+
			'IDxjaXJjbGUgY3g9IjE0Ljk4IiBmaWxsLW9wYWNpdHk9IjEiIHN0cm9rZS1vcGFjaXR5PSIwIiBzdHJva2Utd2lkdGg9IjAuNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiByPSIyLjExNyIgY3k9IjMuOTk0IiBmaWxsPSIjMDAwMDAwIiBzdHJva2U9IiNlZTFkM2EiLz4KIDwvZz4KPC9zdmc+Cg==';
		me._marker_active_6__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;marker_active_6;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="marker_active_6";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 30px;';
		hs+='left : 118px;';
		hs+='position : absolute;';
		hs+='top : 195px;';
		hs+='visibility : inherit;';
		hs+='width : 30px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._marker_active_6.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._marker_active_6.onclick=function (e) {
			player.openNext("{node23}","");
		}
		me._marker_active_6.ggUpdatePosition=function (useTransition) {
		}
		me._image_1.appendChild(me._marker_active_6);
		el=me._marker_active_7=document.createElement('div');
		els=me._marker_active_7__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE1LjAuMiwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDMwIDMwIiB5PSIwcHgiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDMwIDMwIiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bW'+
			'xuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSIwcHgiIGhlaWdodD0iMzBweCIgd2lkdGg9IjMwcHgiPgogPGcgaWQ9IkxheWVyXzEiPgogIDxjaXJjbGUgY3g9IjE0Ljk4MSIgc3Ryb2tlLW9wYWNpdHk9IjEiIHN0cm9rZS13aWR0aD0iNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiByPSIxMC45OTQiIGN5PSIxNC45ODciIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIvPgogPC9nPgogPGcgaWQ9IkxheWVyXzFfY29weSI+CiAgPGNpcmNsZSBjeD0iMTQuOTgxIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9r'+
			'ZS1taXRlcmxpbWl0PSIxMCIgcj0iMTAuOTk0IiBjeT0iMTQuOTg3IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkZGRkYiLz4KIDwvZz4KIDxnIGRpc3BsYXk9Im5vbmUiIGlkPSJMYXllcl8zIj4KICA8Y2lyY2xlIGRpc3BsYXk9ImlubGluZSIgY3g9IjE0Ljk4IiBmaWxsLW9wYWNpdHk9IjEiIHN0cm9rZS1vcGFjaXR5PSIwIiBzdHJva2Utd2lkdGg9IjAuNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiByPSIyLjExNyIgY3k9IjMuOTk0IiBmaWxsPSIjMDAwMDAwIiBzdHJva2U9IiNlZTFkM2EiLz4KIDwvZz4KIDxnIGRpc3BsYXk9Im5vbmUiIGlkPSJMYXllcl8yIj4KICA8Y2lyY2xlIGRpc3BsYX'+
			'k9ImlubGluZSIgY3g9IjE0Ljk4MSIgc3Ryb2tlLW9wYWNpdHk9IjEiIHN0cm9rZS13aWR0aD0iNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiByPSIxMC45OTQiIGN5PSIxNC45ODciIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIvPgogPC9nPgogPGcgZGlzcGxheT0ibm9uZSIgaWQ9IkxheWVyXzFfY29weSI+CiAgPGNpcmNsZSBkaXNwbGF5PSJpbmxpbmUiIGN4PSIxNC45ODEiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiByPSIxMC45OTQiIGN5PSIxNC45ODciIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0ZGRkZGRiIvPgogPC9nPgogPGcgaWQ9IkxheWVyXzMiPgog'+
			'IDxjaXJjbGUgY3g9IjE0Ljk4IiBmaWxsLW9wYWNpdHk9IjEiIHN0cm9rZS1vcGFjaXR5PSIwIiBzdHJva2Utd2lkdGg9IjAuNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiByPSIyLjExNyIgY3k9IjMuOTk0IiBmaWxsPSIjMDAwMDAwIiBzdHJva2U9IiNlZTFkM2EiLz4KIDwvZz4KPC9zdmc+Cg==';
		me._marker_active_7__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;marker_active_7;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="marker_active_7";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 30px;';
		hs+='left : 153px;';
		hs+='position : absolute;';
		hs+='top : 195px;';
		hs+='visibility : inherit;';
		hs+='width : 30px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._marker_active_7.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._marker_active_7.onclick=function (e) {
			player.openNext("{node24}","");
		}
		me._marker_active_7.ggUpdatePosition=function (useTransition) {
		}
		me._image_1.appendChild(me._marker_active_7);
		el=me._marker_active_8=document.createElement('div');
		els=me._marker_active_8__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE1LjAuMiwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDMwIDMwIiB5PSIwcHgiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDMwIDMwIiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bW'+
			'xuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSIwcHgiIGhlaWdodD0iMzBweCIgd2lkdGg9IjMwcHgiPgogPGcgaWQ9IkxheWVyXzEiPgogIDxjaXJjbGUgY3g9IjE0Ljk4MSIgc3Ryb2tlLW9wYWNpdHk9IjEiIHN0cm9rZS13aWR0aD0iNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiByPSIxMC45OTQiIGN5PSIxNC45ODciIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIvPgogPC9nPgogPGcgaWQ9IkxheWVyXzFfY29weSI+CiAgPGNpcmNsZSBjeD0iMTQuOTgxIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9r'+
			'ZS1taXRlcmxpbWl0PSIxMCIgcj0iMTAuOTk0IiBjeT0iMTQuOTg3IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkZGRkYiLz4KIDwvZz4KIDxnIGRpc3BsYXk9Im5vbmUiIGlkPSJMYXllcl8zIj4KICA8Y2lyY2xlIGRpc3BsYXk9ImlubGluZSIgY3g9IjE0Ljk4IiBmaWxsLW9wYWNpdHk9IjEiIHN0cm9rZS1vcGFjaXR5PSIwIiBzdHJva2Utd2lkdGg9IjAuNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiByPSIyLjExNyIgY3k9IjMuOTk0IiBmaWxsPSIjMDAwMDAwIiBzdHJva2U9IiNlZTFkM2EiLz4KIDwvZz4KIDxnIGRpc3BsYXk9Im5vbmUiIGlkPSJMYXllcl8yIj4KICA8Y2lyY2xlIGRpc3BsYX'+
			'k9ImlubGluZSIgY3g9IjE0Ljk4MSIgc3Ryb2tlLW9wYWNpdHk9IjEiIHN0cm9rZS13aWR0aD0iNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiByPSIxMC45OTQiIGN5PSIxNC45ODciIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIvPgogPC9nPgogPGcgZGlzcGxheT0ibm9uZSIgaWQ9IkxheWVyXzFfY29weSI+CiAgPGNpcmNsZSBkaXNwbGF5PSJpbmxpbmUiIGN4PSIxNC45ODEiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiByPSIxMC45OTQiIGN5PSIxNC45ODciIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0ZGRkZGRiIvPgogPC9nPgogPGcgaWQ9IkxheWVyXzMiPgog'+
			'IDxjaXJjbGUgY3g9IjE0Ljk4IiBmaWxsLW9wYWNpdHk9IjEiIHN0cm9rZS1vcGFjaXR5PSIwIiBzdHJva2Utd2lkdGg9IjAuNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiByPSIyLjExNyIgY3k9IjMuOTk0IiBmaWxsPSIjMDAwMDAwIiBzdHJva2U9IiNlZTFkM2EiLz4KIDwvZz4KPC9zdmc+Cg==';
		me._marker_active_8__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;marker_active_8;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="marker_active_8";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 30px;';
		hs+='left : 189px;';
		hs+='position : absolute;';
		hs+='top : 195px;';
		hs+='visibility : inherit;';
		hs+='width : 30px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._marker_active_8.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._marker_active_8.onclick=function (e) {
			player.openNext("{node25}","");
		}
		me._marker_active_8.ggUpdatePosition=function (useTransition) {
		}
		me._image_1.appendChild(me._marker_active_8);
		el=me._marker_active_9=document.createElement('div');
		els=me._marker_active_9__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE1LjAuMiwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDMwIDMwIiB5PSIwcHgiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDMwIDMwIiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bW'+
			'xuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSIwcHgiIGhlaWdodD0iMzBweCIgd2lkdGg9IjMwcHgiPgogPGcgaWQ9IkxheWVyXzEiPgogIDxjaXJjbGUgY3g9IjE0Ljk4MSIgc3Ryb2tlLW9wYWNpdHk9IjEiIHN0cm9rZS13aWR0aD0iNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiByPSIxMC45OTQiIGN5PSIxNC45ODciIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIvPgogPC9nPgogPGcgaWQ9IkxheWVyXzFfY29weSI+CiAgPGNpcmNsZSBjeD0iMTQuOTgxIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9r'+
			'ZS1taXRlcmxpbWl0PSIxMCIgcj0iMTAuOTk0IiBjeT0iMTQuOTg3IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkZGRkYiLz4KIDwvZz4KIDxnIGRpc3BsYXk9Im5vbmUiIGlkPSJMYXllcl8zIj4KICA8Y2lyY2xlIGRpc3BsYXk9ImlubGluZSIgY3g9IjE0Ljk4IiBmaWxsLW9wYWNpdHk9IjEiIHN0cm9rZS1vcGFjaXR5PSIwIiBzdHJva2Utd2lkdGg9IjAuNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiByPSIyLjExNyIgY3k9IjMuOTk0IiBmaWxsPSIjMDAwMDAwIiBzdHJva2U9IiNlZTFkM2EiLz4KIDwvZz4KIDxnIGRpc3BsYXk9Im5vbmUiIGlkPSJMYXllcl8yIj4KICA8Y2lyY2xlIGRpc3BsYX'+
			'k9ImlubGluZSIgY3g9IjE0Ljk4MSIgc3Ryb2tlLW9wYWNpdHk9IjEiIHN0cm9rZS13aWR0aD0iNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiByPSIxMC45OTQiIGN5PSIxNC45ODciIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIvPgogPC9nPgogPGcgZGlzcGxheT0ibm9uZSIgaWQ9IkxheWVyXzFfY29weSI+CiAgPGNpcmNsZSBkaXNwbGF5PSJpbmxpbmUiIGN4PSIxNC45ODEiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiByPSIxMC45OTQiIGN5PSIxNC45ODciIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0ZGRkZGRiIvPgogPC9nPgogPGcgaWQ9IkxheWVyXzMiPgog'+
			'IDxjaXJjbGUgY3g9IjE0Ljk4IiBmaWxsLW9wYWNpdHk9IjEiIHN0cm9rZS1vcGFjaXR5PSIwIiBzdHJva2Utd2lkdGg9IjAuNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiByPSIyLjExNyIgY3k9IjMuOTk0IiBmaWxsPSIjMDAwMDAwIiBzdHJva2U9IiNlZTFkM2EiLz4KIDwvZz4KPC9zdmc+Cg==';
		me._marker_active_9__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;marker_active_9;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="marker_active_9";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 30px;';
		hs+='left : 154px;';
		hs+='position : absolute;';
		hs+='top : 164px;';
		hs+='visibility : inherit;';
		hs+='width : 30px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._marker_active_9.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._marker_active_9.onclick=function (e) {
			player.openNext("{node22}","");
		}
		me._marker_active_9.ggUpdatePosition=function (useTransition) {
		}
		me._image_1.appendChild(me._marker_active_9);
		el=me._marker_active_10=document.createElement('div');
		els=me._marker_active_10__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE1LjAuMiwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDMwIDMwIiB5PSIwcHgiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDMwIDMwIiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bW'+
			'xuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSIwcHgiIGhlaWdodD0iMzBweCIgd2lkdGg9IjMwcHgiPgogPGcgaWQ9IkxheWVyXzEiPgogIDxjaXJjbGUgY3g9IjE0Ljk4MSIgc3Ryb2tlLW9wYWNpdHk9IjEiIHN0cm9rZS13aWR0aD0iNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiByPSIxMC45OTQiIGN5PSIxNC45ODciIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIvPgogPC9nPgogPGcgaWQ9IkxheWVyXzFfY29weSI+CiAgPGNpcmNsZSBjeD0iMTQuOTgxIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9r'+
			'ZS1taXRlcmxpbWl0PSIxMCIgcj0iMTAuOTk0IiBjeT0iMTQuOTg3IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkZGRkYiLz4KIDwvZz4KIDxnIGRpc3BsYXk9Im5vbmUiIGlkPSJMYXllcl8zIj4KICA8Y2lyY2xlIGRpc3BsYXk9ImlubGluZSIgY3g9IjE0Ljk4IiBmaWxsLW9wYWNpdHk9IjEiIHN0cm9rZS1vcGFjaXR5PSIwIiBzdHJva2Utd2lkdGg9IjAuNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiByPSIyLjExNyIgY3k9IjMuOTk0IiBmaWxsPSIjMDAwMDAwIiBzdHJva2U9IiNlZTFkM2EiLz4KIDwvZz4KIDxnIGRpc3BsYXk9Im5vbmUiIGlkPSJMYXllcl8yIj4KICA8Y2lyY2xlIGRpc3BsYX'+
			'k9ImlubGluZSIgY3g9IjE0Ljk4MSIgc3Ryb2tlLW9wYWNpdHk9IjEiIHN0cm9rZS13aWR0aD0iNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiByPSIxMC45OTQiIGN5PSIxNC45ODciIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIvPgogPC9nPgogPGcgZGlzcGxheT0ibm9uZSIgaWQ9IkxheWVyXzFfY29weSI+CiAgPGNpcmNsZSBkaXNwbGF5PSJpbmxpbmUiIGN4PSIxNC45ODEiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiByPSIxMC45OTQiIGN5PSIxNC45ODciIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0ZGRkZGRiIvPgogPC9nPgogPGcgaWQ9IkxheWVyXzMiPgog'+
			'IDxjaXJjbGUgY3g9IjE0Ljk4IiBmaWxsLW9wYWNpdHk9IjEiIHN0cm9rZS1vcGFjaXR5PSIwIiBzdHJva2Utd2lkdGg9IjAuNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiByPSIyLjExNyIgY3k9IjMuOTk0IiBmaWxsPSIjMDAwMDAwIiBzdHJva2U9IiNlZTFkM2EiLz4KIDwvZz4KPC9zdmc+Cg==';
		me._marker_active_10__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;marker_active_10;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="marker_active_10";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 30px;';
		hs+='left : 154px;';
		hs+='position : absolute;';
		hs+='top : 134px;';
		hs+='visibility : inherit;';
		hs+='width : 30px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._marker_active_10.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._marker_active_10.onclick=function (e) {
			player.openNext("{node20}","");
		}
		me._marker_active_10.ggUpdatePosition=function (useTransition) {
		}
		me._image_1.appendChild(me._marker_active_10);
		el=me._marker_active_11=document.createElement('div');
		els=me._marker_active_11__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE1LjAuMiwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDMwIDMwIiB5PSIwcHgiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDMwIDMwIiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bW'+
			'xuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSIwcHgiIGhlaWdodD0iMzBweCIgd2lkdGg9IjMwcHgiPgogPGcgaWQ9IkxheWVyXzEiPgogIDxjaXJjbGUgY3g9IjE0Ljk4MSIgc3Ryb2tlLW9wYWNpdHk9IjEiIHN0cm9rZS13aWR0aD0iNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiByPSIxMC45OTQiIGN5PSIxNC45ODciIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIvPgogPC9nPgogPGcgaWQ9IkxheWVyXzFfY29weSI+CiAgPGNpcmNsZSBjeD0iMTQuOTgxIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9r'+
			'ZS1taXRlcmxpbWl0PSIxMCIgcj0iMTAuOTk0IiBjeT0iMTQuOTg3IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkZGRkYiLz4KIDwvZz4KIDxnIGRpc3BsYXk9Im5vbmUiIGlkPSJMYXllcl8zIj4KICA8Y2lyY2xlIGRpc3BsYXk9ImlubGluZSIgY3g9IjE0Ljk4IiBmaWxsLW9wYWNpdHk9IjEiIHN0cm9rZS1vcGFjaXR5PSIwIiBzdHJva2Utd2lkdGg9IjAuNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiByPSIyLjExNyIgY3k9IjMuOTk0IiBmaWxsPSIjMDAwMDAwIiBzdHJva2U9IiNlZTFkM2EiLz4KIDwvZz4KIDxnIGRpc3BsYXk9Im5vbmUiIGlkPSJMYXllcl8yIj4KICA8Y2lyY2xlIGRpc3BsYX'+
			'k9ImlubGluZSIgY3g9IjE0Ljk4MSIgc3Ryb2tlLW9wYWNpdHk9IjEiIHN0cm9rZS13aWR0aD0iNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiByPSIxMC45OTQiIGN5PSIxNC45ODciIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIvPgogPC9nPgogPGcgZGlzcGxheT0ibm9uZSIgaWQ9IkxheWVyXzFfY29weSI+CiAgPGNpcmNsZSBkaXNwbGF5PSJpbmxpbmUiIGN4PSIxNC45ODEiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiByPSIxMC45OTQiIGN5PSIxNC45ODciIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0ZGRkZGRiIvPgogPC9nPgogPGcgaWQ9IkxheWVyXzMiPgog'+
			'IDxjaXJjbGUgY3g9IjE0Ljk4IiBmaWxsLW9wYWNpdHk9IjEiIHN0cm9rZS1vcGFjaXR5PSIwIiBzdHJva2Utd2lkdGg9IjAuNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiByPSIyLjExNyIgY3k9IjMuOTk0IiBmaWxsPSIjMDAwMDAwIiBzdHJva2U9IiNlZTFkM2EiLz4KIDwvZz4KPC9zdmc+Cg==';
		me._marker_active_11__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;marker_active_11;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="marker_active_11";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 30px;';
		hs+='left : 154px;';
		hs+='position : absolute;';
		hs+='top : 74px;';
		hs+='visibility : inherit;';
		hs+='width : 30px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._marker_active_11.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._marker_active_11.onclick=function (e) {
			player.openNext("{node18}","");
		}
		me._marker_active_11.ggUpdatePosition=function (useTransition) {
		}
		me._image_1.appendChild(me._marker_active_11);
		el=me._marker_active_12=document.createElement('div');
		els=me._marker_active_12__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE1LjAuMiwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDMwIDMwIiB5PSIwcHgiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDMwIDMwIiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bW'+
			'xuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSIwcHgiIGhlaWdodD0iMzBweCIgd2lkdGg9IjMwcHgiPgogPGcgaWQ9IkxheWVyXzEiPgogIDxjaXJjbGUgY3g9IjE0Ljk4MSIgc3Ryb2tlLW9wYWNpdHk9IjEiIHN0cm9rZS13aWR0aD0iNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiByPSIxMC45OTQiIGN5PSIxNC45ODciIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIvPgogPC9nPgogPGcgaWQ9IkxheWVyXzFfY29weSI+CiAgPGNpcmNsZSBjeD0iMTQuOTgxIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9r'+
			'ZS1taXRlcmxpbWl0PSIxMCIgcj0iMTAuOTk0IiBjeT0iMTQuOTg3IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkZGRkYiLz4KIDwvZz4KIDxnIGRpc3BsYXk9Im5vbmUiIGlkPSJMYXllcl8zIj4KICA8Y2lyY2xlIGRpc3BsYXk9ImlubGluZSIgY3g9IjE0Ljk4IiBmaWxsLW9wYWNpdHk9IjEiIHN0cm9rZS1vcGFjaXR5PSIwIiBzdHJva2Utd2lkdGg9IjAuNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiByPSIyLjExNyIgY3k9IjMuOTk0IiBmaWxsPSIjMDAwMDAwIiBzdHJva2U9IiNlZTFkM2EiLz4KIDwvZz4KIDxnIGRpc3BsYXk9Im5vbmUiIGlkPSJMYXllcl8yIj4KICA8Y2lyY2xlIGRpc3BsYX'+
			'k9ImlubGluZSIgY3g9IjE0Ljk4MSIgc3Ryb2tlLW9wYWNpdHk9IjEiIHN0cm9rZS13aWR0aD0iNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiByPSIxMC45OTQiIGN5PSIxNC45ODciIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIvPgogPC9nPgogPGcgZGlzcGxheT0ibm9uZSIgaWQ9IkxheWVyXzFfY29weSI+CiAgPGNpcmNsZSBkaXNwbGF5PSJpbmxpbmUiIGN4PSIxNC45ODEiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiByPSIxMC45OTQiIGN5PSIxNC45ODciIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0ZGRkZGRiIvPgogPC9nPgogPGcgaWQ9IkxheWVyXzMiPgog'+
			'IDxjaXJjbGUgY3g9IjE0Ljk4IiBmaWxsLW9wYWNpdHk9IjEiIHN0cm9rZS1vcGFjaXR5PSIwIiBzdHJva2Utd2lkdGg9IjAuNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiByPSIyLjExNyIgY3k9IjMuOTk0IiBmaWxsPSIjMDAwMDAwIiBzdHJva2U9IiNlZTFkM2EiLz4KIDwvZz4KPC9zdmc+Cg==';
		me._marker_active_12__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;marker_active_12;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="marker_active_12";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 30px;';
		hs+='left : 188px;';
		hs+='position : absolute;';
		hs+='top : 104px;';
		hs+='visibility : inherit;';
		hs+='width : 30px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._marker_active_12.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._marker_active_12.onclick=function (e) {
			player.openNext("{node19}","");
		}
		me._marker_active_12.ggUpdatePosition=function (useTransition) {
		}
		me._image_1.appendChild(me._marker_active_12);
		me._web.appendChild(me._image_1);
		me.divSkin.appendChild(me._web);
		var clonedNormalElement = new SkinElement_marker_normal_Class(this,me._markertemplate);
		me._markertemplate__normal = clonedNormalElement._marker_normal;
		me._markertemplate__normal.style.visibility='inherit';
		me._markertemplate__normal.style.left='0px';
		me._markertemplate__normal.style.top='0px';
		me._markertemplate.ggMarkerNormal=me._markertemplate__normal;
		me._markertemplate.ggMarkerInstances.push(me._markertemplate__normal);
		var clonedActiveElement = new SkinElement_marker_active_Class(this,me._markertemplate);
		me._markertemplate__active= clonedActiveElement._marker_active;
		me._markertemplate__active.style.visibility='hidden';
		me._markertemplate__active.style.left='0px';
		me._markertemplate__active.style.top='0px';
		me._markertemplate.ggMarkerActive=me._markertemplate__active;
		me._markertemplate.ggMarkerInstances.push(me._markertemplate__active);
		if (me._markertemplate.firstChild) {
			me._markertemplate.insertBefore(me._markertemplate__active,me._markertemplate.firstChild);
		} else {
			me._markertemplate.appendChild(me._markertemplate__active);
		}
		if (me._markertemplate.firstChild) {
			me._markertemplate.insertBefore(me._markertemplate__normal,me._markertemplate.firstChild);
		} else {
			me._markertemplate.appendChild(me._markertemplate__normal);
		}
		player.addListener('sizechanged', function() {
			me.updateSize(me.divSkin);
		});
	};
	this.hotspotProxyClick=function(id, url) {
	}
	this.hotspotProxyDoubleClick=function(id, url) {
	}
	me.hotspotProxyOver=function(id, url) {
		if (url=='{}') {
			me._marker_title.onmouseover();
		}
	}
	me.hotspotProxyOut=function(id, url) {
		if (url=='{}') {
			me._marker_title.onmouseout();
		}
	}
	player.addListener('changenodeid', function() {
		me.ggUserdata=player.userdata;
		var newMarker=[];
		var id=player.getCurrentNode();
		var i,j;
		var tags=me.ggUserdata.tags;
		for (i=0;i<nodeMarker.length;i++) {
			var match=false;
			if ((nodeMarker[i].ggMarkerNodeId.length > 0) && (nodeMarker[i].ggMarkerNodeId.charAt(0)=='{') && (nodeMarker[i].ggMarkerNodeId.substr(1, nodeMarker[i].ggMarkerNodeId.length - 2)==id) && (id!='')) match=true;
			for(j=0;j<tags.length;j++) {
				if (nodeMarker[i].ggMarkerNodeId==tags[j]) match=true;
			}
			if (match) {
				newMarker.push(nodeMarker[i]);
			}
		}
		for(i=0;i<activeNodeMarker.length;i++) {
			if (newMarker.indexOf(activeNodeMarker[i])<0) {
				if (activeNodeMarker[i].ggMarkerNormal) {
					activeNodeMarker[i].ggMarkerNormal.style.visibility='inherit';
				}
				if (activeNodeMarker[i].ggMarkerActive) {
					activeNodeMarker[i].ggMarkerActive.style.visibility='hidden';
				}
				if (activeNodeMarker[i].ggDeactivate) {
					activeNodeMarker[i].ggDeactivate();
				}
				activeNodeMarker[i].ggIsMarkerActive=false;
			}
		}
		for(i=0;i<newMarker.length;i++) {
			if (activeNodeMarker.indexOf(newMarker[i])<0) {
				if (newMarker[i].ggMarkerNormal) {
					newMarker[i].ggMarkerNormal.style.visibility='hidden';
				}
				if (newMarker[i].ggMarkerActive) {
					newMarker[i].ggMarkerActive.style.visibility='inherit';
				}
				if (newMarker[i].ggActivate) {
					newMarker[i].ggActivate();
				}
				newMarker[i].ggIsMarkerActive=true;
			}
		}
		activeNodeMarker=newMarker;
	});
	me.skinTimerEvent=function() {
		me.ggCurrentTime=new Date().getTime();
		me._marker_title.ggUpdateText();
	};
	player.addListener('timer', me.skinTimerEvent);
	function SkinHotspotClass_hotspot_1(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):'';
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._hotspot_1=document.createElement('div');
		el.ggId="Hotspot 1";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 0px;';
		hs+='left : 240px;';
		hs+='position : absolute;';
		hs+='top : 107px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._hotspot_1.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
		}
		me._hotspot_1.onclick=function (e) {
			player.openNext(me.hotspot.url,me.hotspot.target);
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._hotspot_1.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._hotspot_1.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._hotspot_1.onmouseout=function (e) {
			player.setActiveHotspot(null);
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._hotspot_1.ggUpdatePosition=function (useTransition) {
		}
		el=me._marker_active0=document.createElement('div');
		els=me._marker_active0__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE1LjAuMiwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDMwIDMwIiB5PSIwcHgiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDMwIDMwIiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bW'+
			'xuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSIwcHgiIGhlaWdodD0iMzBweCIgd2lkdGg9IjMwcHgiPgogPGcgaWQ9IkxheWVyXzEiPgogIDxjaXJjbGUgY3g9IjE0Ljk4MSIgc3Ryb2tlLW9wYWNpdHk9IjEiIHN0cm9rZS13aWR0aD0iNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiByPSIxMC45OTQiIGN5PSIxNC45ODciIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIvPgogPC9nPgogPGcgaWQ9IkxheWVyXzFfY29weSI+CiAgPGNpcmNsZSBjeD0iMTQuOTgxIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9r'+
			'ZS1taXRlcmxpbWl0PSIxMCIgcj0iMTAuOTk0IiBjeT0iMTQuOTg3IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkZGRkYiLz4KIDwvZz4KIDxnIGRpc3BsYXk9Im5vbmUiIGlkPSJMYXllcl8zIj4KICA8Y2lyY2xlIGRpc3BsYXk9ImlubGluZSIgY3g9IjE0Ljk4IiBmaWxsLW9wYWNpdHk9IjEiIHN0cm9rZS1vcGFjaXR5PSIwIiBzdHJva2Utd2lkdGg9IjAuNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiByPSIyLjExNyIgY3k9IjMuOTk0IiBmaWxsPSIjMDAwMDAwIiBzdHJva2U9IiNlZTFkM2EiLz4KIDwvZz4KIDxnIGRpc3BsYXk9Im5vbmUiIGlkPSJMYXllcl8yIj4KICA8Y2lyY2xlIGRpc3BsYX'+
			'k9ImlubGluZSIgY3g9IjE0Ljk4MSIgc3Ryb2tlLW9wYWNpdHk9IjEiIHN0cm9rZS13aWR0aD0iNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiByPSIxMC45OTQiIGN5PSIxNC45ODciIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIvPgogPC9nPgogPGcgZGlzcGxheT0ibm9uZSIgaWQ9IkxheWVyXzFfY29weSI+CiAgPGNpcmNsZSBkaXNwbGF5PSJpbmxpbmUiIGN4PSIxNC45ODEiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiByPSIxMC45OTQiIGN5PSIxNC45ODciIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0ZGRkZGRiIvPgogPC9nPgogPGcgaWQ9IkxheWVyXzMiPgog'+
			'IDxjaXJjbGUgY3g9IjE0Ljk4IiBmaWxsLW9wYWNpdHk9IjEiIHN0cm9rZS1vcGFjaXR5PSIwIiBzdHJva2Utd2lkdGg9IjAuNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiByPSIyLjExNyIgY3k9IjMuOTk0IiBmaWxsPSIjMDAwMDAwIiBzdHJva2U9IiNlZTFkM2EiLz4KIDwvZz4KPC9zdmc+Cg==';
		me._marker_active0__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;marker_active0;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="marker_active";
		el.ggDx=0;
		el.ggDy=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 30px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -10000px;';
		hs+='visibility : inherit;';
		hs+='width : 30px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._marker_active0.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._marker_active0.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
				var ph=this.parentNode.clientHeight;
				var h=this.offsetHeight;
					this.style.top=(this.ggDy + ph/2 - h/2) + 'px';
			}
		}
		me._hotspot_1.appendChild(me._marker_active0);
			me.hotspotTimerEvent=function() {
				setTimeout(function() { me.hotspotTimerEvent(); }, 10);
				var hs='';
				if (me._marker_active0.ggParameter) {
					hs+=parameterToTransform(me._marker_active0.ggParameter) + ' ';
				}
				hs+='rotate(' + (-1.0*(1 * player.getPanNorth() + 0)) + 'deg) ';
				me._marker_active0.style[domTransform]=hs;
			}
			me.hotspotTimerEvent();
		me.__div = me._hotspot_1;
	};
	me.addSkinHotspot=function(hotspot) {
		var hsinst = null;
		{
			hotspot.skinid = 'Hotspot 1';
			hsinst = new SkinHotspotClass_hotspot_1(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
		}
		return hsinst;
	}
	me.removeSkinHotspots=function() {
		if(hotspotTemplates['Hotspot 1']) {
			var i;
			for(i = 0; i < hotspotTemplates['Hotspot 1'].length; i++) {
				hotspotTemplates['Hotspot 1'][i] = null;
			}
		}
		hotspotTemplates = [];
	}
	function SkinElement_marker_normal_Class(parentScope,ggParent) {
		var me=this;
		var flag=false;
		me.parentScope=parentScope;
		me.ggParent=ggParent;
		var nodeId=ggParent.ggElementNodeId();
		me.ggNodeId=nodeId;
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		
		el=me._marker_normal=document.createElement('div');
		els=me._marker_normal__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNS4wLjIsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMH'+
			'B4IiB5PSIwcHgiIHdpZHRoPSIzMHB4Ig0KCSBoZWlnaHQ9IjMwcHgiIHZpZXdCb3g9IjAgMCAzMCAzMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMzAgMzAiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGcgaWQ9IkxheWVyXzEiIGRpc3BsYXk9Im5vbmUiPg0KCTxwYXRoIGRpc3BsYXk9ImlubGluZSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjOTk5OTk5IiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgZD0iTTE5Ljc1NCwyLjkxNQ0KCQljLTAuMzUzLDIuMTUzLTEuOTM5LDQuMDY2LTQuNzYsNC4wNjZjLTIuODI1LDAtNC40MTItMS45MTktNC43NjItNC4wNzZjLTQu'+
			'ODI5LDEuODk5LTguMjU3LDYuNTgtOC4yNTcsMTIuMDgzDQoJCWMwLDcuMTgzLDUuODIzLDEzLjAwNywxMy4wMDYsMTMuMDA3YzcuMTg0LDAsMTMuMDA3LTUuODI0LDEzLjAwNy0xMy4wMDdDMjcuOTg3LDkuNDk0LDI0LjU3LDQuODIxLDE5Ljc1NCwyLjkxNXoiLz4NCjwvZz4NCjxnIGlkPSJMYXllcl8xX2NvcHkiIGRpc3BsYXk9Im5vbmUiPg0KCTxwYXRoIGRpc3BsYXk9ImlubGluZSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgZD0iTTE5Ljc1NCwyLjkxNQ0KCQljLTAuMzUzLDIuMTUzLTEuOTM5LDQuMDY2LTQuNz'+
			'YsNC4wNjZjLTIuODI1LDAtNC40MTItMS45MTktNC43NjItNC4wNzZjLTQuODI5LDEuODk5LTguMjU3LDYuNTgtOC4yNTcsMTIuMDgzDQoJCWMwLDcuMTgzLDUuODIzLDEzLjAwNywxMy4wMDYsMTMuMDA3YzcuMTg0LDAsMTMuMDA3LTUuODI0LDEzLjAwNy0xMy4wMDdDMjcuOTg3LDkuNDk0LDI0LjU3LDQuODIxLDE5Ljc1NCwyLjkxNXoiLz4NCjwvZz4NCjxnIGlkPSJMYXllcl8zIj4NCgk8Y2lyY2xlIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzk5OTk5OSIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIGN4PSIxNSIgY3k9IjE1IiByPSI4LjA1MyIvPg0KPC9nPg0KPGcgaWQ9'+
			'IkxheWVyXzNfY29weSI+DQoJPGNpcmNsZSBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBjeD0iMTUiIGN5PSIxNSIgcj0iOC4wNTMiLz4NCjwvZz4NCjxnIGlkPSJMYXllcl81IiBkaXNwbGF5PSJub25lIj4NCgk8Y2lyY2xlIGRpc3BsYXk9ImlubGluZSIgZmlsbD0iI0VFMUQzQSIgY3g9IjE1IiBjeT0iMi4wMDciIHI9IjIuMDUzIi8+DQo8L2c+DQo8L3N2Zz4NCg==';
		me._marker_normal__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;marker_normal;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="marker_normal";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 30px;';
		hs+='left : 140px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 30px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._marker_normal.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._marker_normal.ggUpdatePosition=function (useTransition) {
		}
	};
	function SkinElement_marker_active_Class(parentScope,ggParent) {
		var me=this;
		var flag=false;
		me.parentScope=parentScope;
		me.ggParent=ggParent;
		var nodeId=ggParent.ggElementNodeId();
		me.ggNodeId=nodeId;
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		
		el=me._marker_active=document.createElement('div');
		els=me._marker_active__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE1LjAuMiwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDMwIDMwIiB5PSIwcHgiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDMwIDMwIiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bW'+
			'xuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSIwcHgiIGhlaWdodD0iMzBweCIgd2lkdGg9IjMwcHgiPgogPGcgaWQ9IkxheWVyXzEiPgogIDxjaXJjbGUgY3g9IjE0Ljk4MSIgc3Ryb2tlLW9wYWNpdHk9IjEiIHN0cm9rZS13aWR0aD0iNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiByPSIxMC45OTQiIGN5PSIxNC45ODciIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIvPgogPC9nPgogPGcgaWQ9IkxheWVyXzFfY29weSI+CiAgPGNpcmNsZSBjeD0iMTQuOTgxIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9r'+
			'ZS1taXRlcmxpbWl0PSIxMCIgcj0iMTAuOTk0IiBjeT0iMTQuOTg3IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkZGRkYiLz4KIDwvZz4KIDxnIGRpc3BsYXk9Im5vbmUiIGlkPSJMYXllcl8zIj4KICA8Y2lyY2xlIGRpc3BsYXk9ImlubGluZSIgY3g9IjE0Ljk4IiBmaWxsLW9wYWNpdHk9IjEiIHN0cm9rZS1vcGFjaXR5PSIwIiBzdHJva2Utd2lkdGg9IjAuNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiByPSIyLjExNyIgY3k9IjMuOTk0IiBmaWxsPSIjMDAwMDAwIiBzdHJva2U9IiNlZTFkM2EiLz4KIDwvZz4KIDxnIGRpc3BsYXk9Im5vbmUiIGlkPSJMYXllcl8yIj4KICA8Y2lyY2xlIGRpc3BsYX'+
			'k9ImlubGluZSIgY3g9IjE0Ljk4MSIgc3Ryb2tlLW9wYWNpdHk9IjEiIHN0cm9rZS13aWR0aD0iNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiByPSIxMC45OTQiIGN5PSIxNC45ODciIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIvPgogPC9nPgogPGcgZGlzcGxheT0ibm9uZSIgaWQ9IkxheWVyXzFfY29weSI+CiAgPGNpcmNsZSBkaXNwbGF5PSJpbmxpbmUiIGN4PSIxNC45ODEiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiByPSIxMC45OTQiIGN5PSIxNC45ODciIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0ZGRkZGRiIvPgogPC9nPgogPGcgaWQ9IkxheWVyXzMiPgog'+
			'IDxjaXJjbGUgY3g9IjE0Ljk4IiBmaWxsLW9wYWNpdHk9IjEiIHN0cm9rZS1vcGFjaXR5PSIwIiBzdHJva2Utd2lkdGg9IjAuNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiByPSIyLjExNyIgY3k9IjMuOTk0IiBmaWxsPSIjMDAwMDAwIiBzdHJva2U9IiNlZTFkM2EiLz4KIDwvZz4KPC9zdmc+Cg==';
		me._marker_active__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;marker_active;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="marker_active";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 30px;';
		hs+='left : 105px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 30px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._marker_active.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._marker_active.ggUpdatePosition=function (useTransition) {
		}
		me._marker_active.ggUpdateConditionTimer=function() {
			var hs='';
			if (me._marker_active.ggParameter) {
				hs+=parameterToTransform(me._marker_active.ggParameter) + ' ';
			}
			hs+='rotate(' + (-1.0*(1 * player.getPanNorth() + 0)) + 'deg) ';
			me._marker_active.style[domTransform]=hs;
		}
player.addListener('timer', me._marker_active.ggUpdateConditionTimer);
	};
	me.addSkin();
	me._web.logicBlock_scaling();
	me._marker_title.logicBlock_position();
	player.addListener('sizechanged', function(args) { me._web.logicBlock_scaling(); });
	player.addListener('configloaded', function(args) { me._marker_title.logicBlock_position();me._web.logicBlock_scaling(); });
	me.skinTimerEvent();
};