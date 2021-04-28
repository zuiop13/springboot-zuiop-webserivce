/**
 * workflow common function
 * @namespace workflow
 */

;(function( factory ) {
	if ( typeof define === "function" && define.amd ) {
		define( ["jquery"], factory );
	} else if (typeof module === "object" && module.exports) {
		module.exports = factory( require( "jquery" ) );
	} else {
		factory( jQuery );
	}
}(function( $ ) {
	
	/***************************************************************************
	 * util
	 **************************************************************************/

	/**
	 * block UI start
	 * 
	 * @method bStart
	 */
	$.bStart = function() {
		var msg = '<img src="' + contextPath + '/resources/images/cmmn/loading.gif" alt="loading" />'; 
	
		$.blockUI({
			message : msg,
			css : {
				border : null,
				backgroundColor : null,
				cursor : null
			},
			overlayCSS : {
				backgroundColor : '#fff',
				opacity : '0.5'
			},
			modal : true
		});
	};
	
	
	/**
	 * block UI end
	 * 
	 * @method bEnd
	 */
	$.bEnd = function() {
		$.unblockUI();
	};
	
	
	/**
	 * 브라우저
	 * 
	 * @method browser
	 * @return boolean
	 */
	$.unsupportedBrowser = function() {
		var agent = navigator.userAgent.toLowerCase(),
			msie = agent.indexOf('msie'),
			trident = agent.indexOf('trident/'),
			edge = agent.indexOf('edge/');
		
		if( navigator.appName === 'Netscape' && msie > 0 ) {
			var version = parseInt(agent.substring(msie + 5, agent.indexOf('.', msie))) || 0;
			
			if(version < 10) {
				return false;
			} else {
				return true;
			}
			
		} else if ( navigator.appName === 'Netscape' && trident > 0 ) {
			return true;
		} else if ( edge > 0 ) {
			return true;
		} else {
			return true;
		}
	}
	
	
	/**
	 * Null 체크
	 * 
	 * @method isNull
	 * @param {?} Null 체크할 값
	 * @return {?} val
	 */
	$.isNull = function(val) {
		if (new String(val).valueOf() == 'undefined')
			return '';
		if (val == null)
			return '';
		if (('x' + val == 'xNaN') && (new String(val.length).valueOf() == 'undefined'))
			return '';
		if (val.toString().length == 0)
			return '';
		return val;
	};
	
	
	/**
	 * 객체 존재 확인
	 * 
	 * @method exists
	 * @return {boolean} true, false
	 */
	$.fn.exists = function() {
		return this.length > 0;
	};
	
	
	/**
	 * 천 단위 콤마
	 * 
	 * @method comma
	 * @return String
	 */
	$.comma = function(str) {
		str = String(str) || '';
		return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
	}
	
	/**
	 * 현재 날짜 가저오기
	 * 
	 * @method dateHHmmss
	 * @return String
	 */
	$.dateHHmmss = function(timestamp, type) {
		if($.isNull(timestamp) === '') {
			return titmestamp;
		} else {
			var date = new Date(timestamp),
				year = date.getFullYear(),
				day = date.getDate(),
				month = (date.getMonth() + 1);
			
			if (day < 10) day = "0" + day;
			if (month < 10) month = "0" + month;
			
			var cur_day = year + "-" + month + "-" + day,
				hours = date.getHours(),
				minutes = date.getMinutes(),
				seconds = date.getSeconds();
			
			if (hours < 10) hours = "0" + hours;
			if (minutes < 10) minutes = "0" + minutes;
			if (seconds < 10) seconds = "0" + seconds;
			
			if(type === 'day'){
				return cur_day;
			}else{
				return cur_day + " " + hours + ":" + minutes + ":" + seconds;
			}
		}
	}
	
	
	/**
	 * portion - 계산 대상
	 * total - 전체값
	 */
	$.fn.percent = function(portion, total) {
		if(portion==0){
			return 0;
		}else{
			var percent = ((portion/total) * 100);
			var num_check=/^([0-9]*)[\.]?([0-9])?$/;
			if(num_check.test(percent)){
				return percent;
			}else{
				return percent.toFixed(2);
			}
		}
	};

	
	/**
	 * byte 용량을 환산하여 반환
	 * 용량의 크기에 따라 MB, KB, byte 단위로 환산함
	 * @param fileSize  byte 값
	 * @param fixed	 환산된 용량의 소수점 자릿수
	 * @returns {String}
	 */
	$.generateByte = function(fileSize, fixed) {
		var str;
		
		//MB 단위 이상일때 MB 단위로 환산
		if (fileSize >= 1024 * 1024) {
			fileSize = fileSize / (1024 * 1024);
			fileSize = (fixed === undefined) ? fileSize : fileSize.toFixed(fixed);
			str = $.comma(fileSize) + ' MB';
		}
		//KB 단위 이상일때 KB 단위로 환산
		else if (fileSize >= 1024) {
			fileSize = fileSize / 1024;
			fileSize = (fixed === undefined) ? fileSize : fileSize.toFixed(fixed);
			str = $.comma(fileSize) + ' KB';
		}
		//KB 단위보다 작을때 byte 단위로 환산
		else {
			var floatCheck=/^([0-9]*)[\.]?([0-9])?$/;
			if(!floatCheck.test(fileSize)){
				fileSize = (fixed === undefined) ? fileSize : fileSize.toFixed(fixed);
			}
			
			str = $.comma(fileSize) + ' byte';
		}
		return str;
	}
	
	
	/**
	 * 개행문자 <-> <br/>
	 * @method replaceLineFormat
	 * @param fileSize  byte 값
	 * @param fixed	 환산된 용량의 소수점 자릿수
	 * @returns {String}
	 */
	$.replaceLineFormat = function(str, type) {

		switch (type) {
		case 'br':
			return str.replace(/(?:\r\n|\r|\n)/g, '<br />');
		default:
			return str.replace(/(<br>|<br\/>|<br \/>)/g, '\r\n');
		}
		
		
		//MB 단위 이상일때 MB 단위로 환산
		if (fileSize >= 1024 * 1024) {
			fileSize = fileSize / (1024 * 1024);
			fileSize = (fixed === undefined) ? fileSize : fileSize.toFixed(fixed);
			str = $.comma(fileSize) + ' MB';
		}
		//KB 단위 이상일때 KB 단위로 환산
		else if (fileSize >= 1024) {
			fileSize = fileSize / 1024;
			fileSize = (fixed === undefined) ? fileSize : fileSize.toFixed(fixed);
			str = $.comma(fileSize) + ' KB';
		}
		//KB 단위보다 작을때 byte 단위로 환산
		else {
			var floatCheck=/^([0-9]*)[\.]?([0-9])?$/;
			if(!floatCheck.test(fileSize)){
				fileSize = (fixed === undefined) ? fileSize : fileSize.toFixed(fixed);
			}
			
			str = $.comma(fileSize) + ' byte';
		}
		return str;
	}
	
	
	/**
	 * format
	 * 
	 * @method format
	 * @return {string} str
	 */
	$.format = function( source, params ) {
		if ( arguments.length === 1 ) {
			return function() {
				var args = $.makeArray( arguments );
				args.unshift( source );
				return $.validator.format.apply( this, args );
			};
		}
		if ( params === undefined ) {
			return source;
		}
		if ( arguments.length > 2 && params.constructor !== Array  ) {
			params = $.makeArray( arguments ).slice( 1 );
		}
		if ( params.constructor !== Array ) {
			params = [ params ];
		}
		$.each( params, function( i, n ) {
			source = source.replace( new RegExp( "\\{" + i + "\\}", "g" ), function() {
				return n;
			} );
		} );
		return source;
	};
	
	
	/**
	 * 
	 * 
	 * @method escapeRegex
	 * @return {string} str
	 */
	$.escapeRegex = function(str) {
		return (str + "").replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
	};
	
	
	/**
	 * form 자동 생성 후, submit
	 * 
	 * @method postSubmit
	 * @param {string} form action
	 * @param {object} form data
	 * @param {string} form target
	 */
	$.postSubmit = function(action, params, target) {
		if ($.isNull(action) === '')
			return false;
	
		var $frm = $('<form/>');
		$frm.attr({
			'action' : $.generateAction(action),
			'method' : 'post',
			'target' : $.isNull(target)
		}).appendTo('body');
	
		for ( var x in params) {
			if (params.hasOwnProperty(x)) {
				$frm.append($('<input/>').attr({
					'type' : 'hidden',
					'name' : x,
					'value' : $.isNull(params[x])
				}));
			}
		}
		$frm.submit().remove();
	};
	
	
	/**
	 * 팝업위치를 화면중앙으로 설정 Parameter를 POST 방식으로 전송 - 파라미터 갯수 5개 이상일 경우 winName - POPUP
	 * 이름 (필수값) URL - POPUP URL (필수값) w - POPUP 넓이 (필수값) h - POPUP 높이 (필수값) data -
	 * POPUP controller 에 전송할 파라미터 EX){ "content_seq" : 2, "book_id" : 1 }; options -
	 * POPUP OPTION
	 */
	$.popup = function(winName, url, w, h, data, options){
		var left = 0, top = 0;
		var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
		var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;
		
		left = ((screen.width / 2) - (w / 2)) + dualScreenLeft;
		top = ((screen.height / 2) - (h / 2)) + dualScreenTop;
		
		if( arguments.length==6 ){
			options = "," + options;
		}else{
			options = "";
		}
		
		if(!data || data === null){
			window.open(url, winName,'width='+w+', height='+h+', left='+left+', top='+top+options);
		}else{
			var object_string = Object.keys(data)+"";
			var object_arr= object_string.split(",");
			
			var popup_form = document.createElement("form");
			popup_form.method = "post";
			
			for(var pI = 0; pI < object_arr.length; pI++){
				var popup_input = document.createElement("input");
				popup_input.type="hidden";
				popup_input.name=object_arr[pI];
				popup_input.value=data[object_arr[pI]];
				popup_form.appendChild(popup_input);
			}
			window.open('', winName,'width='+w+', height='+h+', left='+left+', top='+top + ',' + options);
			
			popup_form.target = winName;
			popup_form.action = url;
			
			document.body.appendChild(popup_form);
			popup_form.submit();
		}
	}
	
	
	/**
	 * event 지연
	 * 
	 * @method debounce
	 * @param {function}
	 * @param {number} delay(지연시간)
	 */
	$.debounce = function(func, wait, immediate) {
		var timeout;
		return function() {
			var context = this, args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	};
	
	
	/**
	 * 첫번째 문자 대/소문자 변경
	 * 
	 * @method changeFirstLetter
	 * @param {string} case type ( upper, lower )
	 * @param {?} 변경할 값
	 * @return {?} 변경된 값
	 */
	$.changeFirstLetter = function(type, val) {
		if ($.isNull(val) === '')
			return '';
	
		switch (type) {
		case 'upper':
			val = val.charAt(0).toUpperCase() + val.slice(1);
			break;
		case 'lower':
			val = val.charAt(0).toLowerCase() + val.slice(1);
			break;
		default:
			break;
		}
		return val;
	};
	
	
	/**
	 * url generate
	 * 
	 * @method generateAction
	 * @param {string} url
	 * @return {string} url
	 */
	$.generateAction = function(url){
		if($.isNull(url) !== ''){
			url = contextPath.concat('/').concat(url.split('_').join('/')).concat('.do');
		}
		return url;
	};
	
	
	/**
	 * 파일명에서 확장자명 추출
	 * 
	 * @method getExtension
	 * @param filename   파일명
	 * @returns _fileExt 확장자명
	 */
	$.getExtension = function(fileName) {
		if( $.isNull(fileName) === '' ) {
			return null;
		}else{
			var _fileLen = fileName.length;
			var _lastDot = fileName.lastIndexOf('.') + 1;
			
			if(_lastDot !== 0) {
				return fileName.substring(_lastDot, _fileLen).toLowerCase();
			}else{
				return null;
			}
		}
	}
	
	
	/**
	 * tree data generate
	 * 
	 * @method generateTreeData
	 * @param {Object} childList
	 * @param {Boolean} isLazy
	 * @param {String} lanuage
	 * @return {Object} childList
	 */
	$.generateTreeData = function(childList, isLazy, lanuage){
		var parent,
			nodeMap = {};
		
		$.each(childList, function(i, c){
			nodeMap[c.key] = c;
		});
		
		childList = $.map(childList, function(c){
			
			if( $.type(c.title) === 'object') {
				c.title = c.title[lanuage];
			}
			
			if( c.parent === 'true') {
				parent = nodeMap[c.parentkey];
				parent['folder'] = true;
				
				if(isLazy) {
					parent['lazy'] = isLazy;
				}
				
				if( parent.children ) {
					parent.children.push(c);
				} else {
					parent.children = [c];
				}
				return null;
			}
			return c;
		});
		
		$.each(childList, function(i, c){
			if( c.children && c.children.length > 1 ) {
				c.children.sort(function(a, b){
					return ((a.position < b.position) ? -1 : ((a.position > b.position) ? 1 : 0));
				});
			}
		});
		return childList;
	};

	/**
	 * tree data generate
	 * 
	 * @method generateTreeData
	 * @param {Object} childList
	 * @param {Boolean} isLazy
	 * @param {String} lanuage
	 * @return {Object} childList
	 */
	$.generateTreeIcon = function(extension, iconClass){
		var imgs = ['gif', 'jpg', 'jpeg', 'png', 'bmp'],
			zips = ['zip', 'tar', 'tar.gz'],
			xlss = ['xls', 'xlsx', 'csv'],
			etcs = ['hwp', 'doc', 'folder', 'pdf', 'ppt', 'txt','docx'],
			iconName = '';
		
		if(imgs.includes(extension)) {
			iconName = 'icon_img';
		} else if(zips.includes(extension)) {
			iconName = 'icon_zip';
		} else if(xlss.includes(extension)) {
			iconName = 'icon_xls';
		} else if(etcs.includes(extension)) {
			iconName = 'icon_'.concat(extension);
		} else {
			iconName = 'icon_file';
		} 
		return {
			html : '<img src="' + contextPath + '/resources/images/sub/' + iconName + '.png" alt="' + extension + '" class="' + iconClass + '" />'
		};
	}
	
	
	$.createEditor = function(container, extension) {
		var oAce = ace.edit(container);
			oAce.setTheme('ace/theme/gitlab');
			oAce.setHighlightActiveLine(false);
			oAce.setReadOnly(true);
			oAce.setShowPrintMargin(false);
			oAce.setOptions({
				//maxLines: Infinity,
				autoScrollEditorIntoView: true
				//,hScrollBarAlwaysVisible : false
			});
			
		var mode = extension || 'txt';
			oAce.session.setMode('ace/mode/' + extensionToMode(mode));
		
		/*var etcExtensions = ['nc'];
		if(etcExtensions.includes(extension)) {
			var text = $('#' + container).text() || '';
				$('#' + container).text('');
			oAce.setValue(JSON.stringify(text, null, '\t'));
		}*/
			
		function extensionToMode(sExt) {
			sExt = sExt.toLowerCase();
			
			var extMap = {
				'actionscript' : [ 'as', 'actionscript' ],
				'assembly_x86' : [ 'a', 'a86' ],
				'ada' : [ 'ada' ],
				'batchfile' : [ 'bat' ],
				'coffee' : [ 'coffee' ],
				'c_cpp' : [ 'c', 'cp', 'cpp', 'c__', 'cxx' ],
				'css' : [ 'css' ],
				'd' : [ 'd' ],
				'r' : [ 'r' ],
				'diff' : [ 'diff' ],
				'dart' : [ 'dart' ],
				'erlang' : [ 'erl' ],
				'html' : [ 'html', 'htm' ],
				'ini' : [ 'ini', 'config' ],
				'jade' : [ 'jade' ],
				'java' : [ 'java' ],
				'javascript' : [ 'js' ],
				'json' : [ 'json', 'nc', 'fits', 'h5', 'cdf' ],
				'jsp' : [ 'jsp' ],
				'latex' : [ 'dtx', 'tex' ],
				'less' : [ 'less' ],
				'makefile' : [ 'mk', 'emakrfile', 'emakerfile' ],
				'markdown' : [ 'md', 'readme', 'license' ],
				'php' : [ 'php', 'php3', 'php4', 'php5', 'php6', 'phps', 'inc' ],
				'python' : [ 'py' ],
				'ruby' : [ 'rb', 'ruby' ],
				'sh' : [ 'sh' ],
				'svg' : [ 'svg' ],
				'scala' : [ 'scala' ],
				'sql' : [ 'sql' ],
				'text' : [ 'txt', 'gitignore', 'sbt' ],
				'vbscript' : [ 'vbs' ],
				'xml' : [ 'xml', 'kml' ],
				'yaml' : [ 'yaml', 'yml' ]
			};

			for ( var sMode in extMap) {
				if (extMap[sMode].indexOf(sExt) > -1) {
					return sMode;
				}
			}
			return 'text';
		}
	};
	
	/****************************************************************************************************************************
	 *		form
	 ****************************************************************************************************************************/
	/**
	 * form file reset
	 * 
	 * @method fileReset
	 */
	$.fn.fileReset = function(){
		var isIe = (navigator.userAgent.match(/MSIE ([0-9])\./)) ? true : false;
		$(':file', this).each(function(i, el) {
			if(isIe) {
				$(el).replaceWith( $(el).clone(true) );
			} else{
				$(el).val('');
			}
			
			$(el).next('.custom-file-label').html($(el).next('.custom-file-label').data('placeholder'));
		});
	};
	
	
	/**
	 * form input, select, textarea 변경 유무 확인
	 * 
	 * @method changeDetection
	 * @return {boolean} true, false
	 */
	$.fn.changeDetection = function() {
		var changed = false;
		this.find('input, select, textarea').each(function() {
			if ($(this).prop('defaultValue') !== $(this).val()) {
				changed = true;
				return false;
			}
		});
		
		return changed;
	};
	
	
	/**
	 * form input, select, textarea defaultValue 변경
	 * 
	 * @method setDefailtValues
	 */
	$.fn.setDefailtValues = function() {
		this.find('input, select, textarea').each(function() {
			$(this).prop('defaultValue', $(this).val());
		});
	};
	
	
	/**
	 * form 객체 obj 형태로 return
	 * 일반적으로 key, value 형태로 담김
	 * 배열 형태의 name (ex: name[key])는 {name : [ { key, value}, ... ] 형태로 담김
	 * 
	 * @param {string} jquery selecot 표현식(select된 객체만 return)
	 * @return {object} obj
	 */
	$.fn.serializeObject = function(selector) {
		var result = {};
		try {
			if (this.prop('tagName') && this.prop('tagName').toLowerCase() === 'form') {
				
				//workflow form data common serialize
				function serializer($form){
					var data = {},
						pushes = {};
					
					function makeObject(root, value) {
						var keys = root.match(/[a-z0-9_]+|(?=\[\])/gi),
							key;
						
						while ((key = keys.pop()) !== undefined) {
							//case : name[]
							if (/^$/.test(key)) {
								var idx = incrementPush(root.replace(/\[\]$/, ''));
								value = transData([], idx, value);
								
							//case : name[n]	
							}else if (/^\d+$/.test(key)) {
								value = transData([], key, value);
								
							//case : name[str]
							}else if (/^[a-z0-9_]+$/i.test(key)) {
								value = transData({}, key, value);
							}
						}
						return value;
					}
					
					function transData(self, key, value) {
						self[key] = value;
						return self;
					}
					
					function incrementPush(key) {
						if (pushes[key] === undefined) {
							pushes[key] = 0;
						}
						return pushes[key]++;
					}
					
					function addKey(key) {
						if (!/^[a-z_][a-z0-9_]*(?:\[(?:\d*|[a-z0-9_]+)\])*$/i.test(key.name)) return this;
						var obj = makeObject(key.name, encode(key));
						return $.extend(true, data, obj), this;
					}
					
					function addKeys(keys) {
						for (var i = 0, len = keys.length; i < len; i++) {
							this.addKey(keys[i]);
						}
						return this;
					}
					
					function encode(key) {
						switch ($('[name="' + key.name + '"]', this).attr('type')) {
						case 'checkbox':
							return key.value === "on" ? true : key.value;
						default:
							return key.value;
						}
					}
					
					function get() {
						return data;
					}
					
					this.addKey = addKey;
					this.addKeys = addKeys;
					this.get = get;
				}
				
				if ($.isNull(selector) !== '') {
					result = new serializer(this).addKeys(this.find(selector).serializeArray()).get();
				} else {
					result = new serializer(this).addKeys(this.serializeArray()).get();
				}
			}
		} catch (e) {
			console.log('serializeObject function error : %o', e.message);
		}
		return result;
	};
	
	
	/**
	 * form 객체 obj 형태로 json 형태로 return
	 * 일반적으로 key, value 형태로 담김
	 * 배열 형태의 name (ex: name[key])는 {name : [ { key, value}, ... ] 형태로 담김
	 * 
	 * @param {string} jquery selecot 표현식(select된 객체만 return)
	 * @return {object} obj
	 */
	$.fn.serializeJson = function(selector) {
		return JSON.stringify(this.serializeObject(selector));
	};
	
	/***************************************************************************
	 * ajax
	 **************************************************************************/
	
	/**
	 * method 별 load, post ajax 실행
	 * 
	 * @method event
	 * @param {string} render or post (ajax)
	 * @param {string} action
	 * @param {object} model
	 * @param {function} callback
	 * @param {string} jquery selecot 표현식
	 * 			method : 'render' => html 그려지는 target
	 * 			method : 'file' => multipart form
	 */
	$.eventMap = function(options, callback, errorCallback){
		var defaults = {
			method : '',
			action : '',
			target : null,
			block : true,
			async : true,
			timeout : 10000,
			model : {}
		};
		try {
			options = $.extend({}, defaults, options || {});
			if(options.method === '') {
				console.log('eventMap (' + options.method + ') ==> required method!!');
				return false;
			}else if(options.action === '') {
				console.log('eventMap (' + options.method + ') ==> required action!!');
				return false;
			}else if( (options.method === 'render' || options.method === 'filePost') && !$(options.target).exists()) {
				console.log('eventMap (' + options.method + ') ==> not exist target!!');
				return false;
			}
			
			switch (options.method) {
			case 'get':
				$.ajax({
					url : $.generateAction(options.action)
					,data : options.model
					,method : 'get'
					,async : options.async
					,timeout : options.timeout
					,beforeSend : function() {
						if(options.block){
							NProgress.start();
						}
					}
					,success : function(result) { 
						console.log('------------ ' + options.action + ' success');
						if (callback) {
							callback(result);
						}
					}
					,error : function(xhr, status, err) {
						console.log('------------ ' + options.action + ' error');
						if (errorCallback) {
							errorCallback();
						}
					}
					,complete : function() {
						if(options.block) {
							NProgress.done();
						}
					}
				});
				break;
								
			case 'post':
				$.ajax({
					 url : $.generateAction(options.action)
					,data : options.model
					,method : 'POST' 
					,async : options.async
					,dataType : 'json'
					,timeout : options.timeout
					,beforeSend : function() {
						if(options.block){
							$.bStart();
						}
					}
					,success : function(result) {
						console.log('------------ ' + options.action + ' success');
						if (callback) {
							//callback(result);
						}
					}
					,error : function(xhr, status, err) {
						console.log('------------ ' + options.action + ' error');
						if (errorCallback) {
							errorCallback();
						}
					}
					,complete : function() {
						if(options.block) {
							$.bEnd();
						}
					}
				});
				break;
				
			case 'postJson':
				$.ajax({
					url : $.generateAction(options.action)
					,data : options.model
					,method : 'POST'
					,dataType : 'json'
					,async : options.async
					,contentType: 'application/json; charset=utf-8'
					,mimeType: 'application/json'
					,timeout : options.timeout
					,beforeSend : function() {
						if(options.block){
							$.bStart();
						}
					}
					,success : function(result) {
						console.log('------------ ' + options.action + ' success');
						if (callback) {
							callback(result);
						}
					}
					,error : function(xhr, status, err) {
						console.log('------------ ' + options.action + ' error');
						if (errorCallback) {
							errorCallback();
						}
					}
					,complete : function() {
						if(options.block) {
							$.bEnd();
						}
					}
				});
				break;
				
			case 'render':
				$.ajax({
					 url : $.generateAction(options.action)
					,data : options.model
					,method : 'post'
					,dataType : 'html'
					,async : options.async
					,timeout : options.timeout
					,beforeSend : function() {
						if(options.block){
							NProgress.start();
						}
					}
					,success : function(result) {
						console.log('------------ ' + options.action + ' success');
						$(options.target).html(result); //성공시 그리기
						if (callback) {
							callback(result);
						}
					}
					,error : function(xhr, status, err) {
						console.log('------------ ' + options.action + ' error');
						$(options.target).empty(); //실패시 이전 그려진거 삭제 (내용지우기)
						if (errorCallback) {
							errorCallback();
						}
					}
					,complete : function() {
						if(options.block) {
							NProgress.done();
						}
					}
				});
				break;
				
			case 'append':
				$.ajax({
					 url : $.generateAction(options.action)
					,data : options.model
					,method : 'POST'
					,dataType : 'html'
					,async : options.async
					,timeout : options.timeout
					,beforeSend : function() {
						if(options.block){
							$.bStart();
						}
					}
					,success : function(result) {
						console.log('------------ ' + options.action + ' success');
						$(options.target).append(result);
						if (callback) {
							callback(result);
						}
					}
					,error : function(xhr, status, err) {
						console.log('------------ ' + options.action + ' error');
						if (errorCallback) {
							errorCallback();
						}
					}
					,complete : function() {
						if(options.block) {
							$.bEnd();
						}
					}
				});
				break;
				
			case 'prepend':
				$.ajax({
					url : $.generateAction(options.action)
					,data : options.model
					,method : 'POST'
						,dataType : 'html'
							,async : options.async
							,timeout : options.timeout
							,beforeSend : function() {
								if(options.block){
									$.bStart();
								}
							}
				,success : function(result) {
					console.log('------------ ' + options.action + ' success');
					$(options.target).prepend(result);
					if (callback) {
						callback(result);
					}
				}
				,error : function(xhr, status, err) {
					console.log('------------ ' + options.action + ' error');
					if (errorCallback) {
						errorCallback();
					}
				}
				,complete : function() {
					if(options.block) {
						$.bEnd();
					}
				}
				});
				break;
				
			case 'filePost':
				$(options.target).ajaxSubmit({
					 dataType : 'json'
					,method : 'POST'
					,url : $.generateAction(options.action)
					,statusCode : { 
						 400: function() { console.log('400'); }
						,500: function() { console.log('500'); }
					}
					,beforeSend : function() {
						if(options.block){
							$.bStart();
						}
					}
					,success : function(result) {
						console.log('------------ ' + options.action + ' success');
						if (callback) {
							callback(result);
						}
					}
					,error : function(xhr, status, err) {
						console.log('------------ ' + options.action + ' error');
						if (errorCallback) {
							errorCallback();
						}
					}
					,complete : function() {
						if(options.block) {
							$.bEnd();
						}
					}
				});
				break;
			}
		} catch(e) {
			console.log(e.message);
		}
	};
	
	
	/***************************************************************************
	 * common action
	 **************************************************************************/
	
	/**
	 * spring message converter
	 * 
	 * @method getLocalizedMessage
	 * @param {string} spring message code
	 * @comment jsp 외부의 독립적인 js에서 다국어정보를 사용하고 싶을 경우 사용..
	 */
	$.getLocalizedMessage = function(code, param) {
		var msg = '';
		
		if($.isNull(code) !== '') {
			$.eventMap({
				method : 'get',
				action : 'cmmn_component_getLocalizedMessage_' + code,
				async : false,
				block : false
			}
			,function(r){
				msg = $.isNull(r.result || '');
				
				if($.isNull(param) !== '' && $.type(param) === 'array') {
					$.each(param, function(i, n) {
						msg = msg.replace(new RegExp('\\{' + i + '\\}', 'g'), function() {
							return n;
						});
					});
				}
			});
		}
		return msg;
	};
	
	
	/**
	 * 파일 다운로드
	 * 
	 * @method fileDownload
	 * @param {String} type
	 * @param {object} params
	 */
	$.fileDownload = function(type, params) {
		if ($.isNull(type) === '') {
			return false;
		} else if ($.isEmptyObject(params)) {
			return false;
		}else{
			$(document).find('iframe').remove();
		}
		
		var $iframe = $('<iframe/>').css('display', 'none').appendTo('body'),
			action;
		
		switch (type) {
		case 'attach':
			action = $.generateAction('cmmn_component_downloadAttachFile');
			break;
		case 'agent':
			action = $.generateAction('cmmn_component_downloadAgentFile');
			break;
		default:
			return false;
		}
		
		if(Object.keys(params).length > 0) {
			action += '?';
			action += $.param( params );
		}
		$iframe.attr('src', action);
	};
	
	
	/**
	 * CSV 파일 다운로드
	 * 
	 * @method csvDownload
	 * @param {String} url
	 * @param {object} params
	 */
	$.csvDownload = function(url, params) {
		if ($.isNull(url) === '') {
			return false;
		} else if ($.isEmptyObject(params)) {
			return false;
		}else{
			$(document).find('iframe').remove();
		}
		
		var $iframe = $('<iframe/>').css('display', 'none').appendTo('body'),
			action = $.generateAction(url);
		
		if(Object.keys(params).length > 0) {
			action += '?';
			action += $.param( params );
		}
		$iframe.attr('src', action);
	};
	
	
	/**
	 * CSV 파일 다운로드
	 * 
	 * @method csvDownload
	 * @param {String} url
	 * @param {object} params
	 */
	$.jupyterLab = function(type, params) {
		/*if ($.isEmptyObject(params)) {
			return false;
		}*/
		
		switch (type) {
		case 'request':
			$.eventMap({
				block : true,
				method : 'post',
				action : 'api_new_getRequestJupyerLabURL'
			}
			,function(r){
				var data = r.result || {};
				console.log(data);
				
				if(data.result) {
					window.open(data.data);
				} else {
					toastr['warning']('', $.isNull(data.message), {'positionClass' : 'application-toastr'});
				}
			}, function() {
				console.log('$.jupyterLab : request error!!');
			});
			break;
		case 'stop':
			$.eventMap({
				block : true,
				method : 'post',
				action : 'api_new_stopJpuyterLab'
			}
			,function(r){
				var data = r.result || {};
				toastr[(data.result)? 'success' : 'warning']('', $.isNull(data.message), {'positionClass' : 'application-toastr'});
			}, function() {
				console.log('$.jupyterLab : stop error!!');
			});
			break;
		default:
			break;
		}
		
		
	};
	
	
	
	/**
	 * 파일 목록 모달 호출
	 * 
	 * @method fileTree
	 * @param {object} modalOptions
	 * @param {function} callback
	 */
	$.fn.fileTree = function(modalOptions, callback) {
		var $this = $(this),
			options = $.extend(true, {
				title : '',
				height : '400px', 
				moadlDialogClass : 'modal-md',
				activeButtonTitle : $.getLocalizedMessage('btn.select'),
				closeButtonTitle : $.getLocalizedMessage('btn.close')
			}, modalOptions);

		$.workflowModal({
			isBackdrop : true,
			title : options.title,
			footer : '<button type="button" class="btn btn-line-blue" data-dismiss="modal">' + options.closeButtonTitle + '</button><button type="button" class="btn btn-blue" data-role="submit">' + options.activeButtonTitle + '</button>',
			modalDialogClass : options.moadlDialogClass,
			onCreate : function(modal) {
				
				var $tree = $(modal.bodyElement).css({
					'height' : options.height,
					'overflow' : 'auto'
				});
				$tree.fancytree({
					minExpandLevel: 1,
					clickFolderMode: 3,
					source: {
						url: $.generateAction('api_getWorkspaceHomeDirList'),
						toggleEffect: { effect: 'slideToggle', duration: 200 }
					},
					lazyLoad: function(event, data) {
						data.result = {	
							url: $.generateAction('api_getWorkspaceLazyDirList'),
							dataType: 'json',
							data : data.node.data
						}
					},
					icon : function(event, data){
						return $.generateTreeIcon(data.node.data.extension, 'w-100 h-100');
					},
					postProcess: function(event, data) {
						data.result = $.generateTreeData(data.response.tree, true);
					}
				});
				
				
				/*	event : [data-btn="submit"]
				*	description : 선택 버튼 클릭 시, 값 매핑
				*/
				$(modal.element).on('click', '[data-role="submit"]', function(e) {
					e.stopPropagation();
					
					if (callback) {
						var activateNode = $tree.fancytree('getActiveNode');
						var path = '';
						
						if(activateNode) {
							path = activateNode.getPath();
							if(path.indexOf('/') > 0 || path.indexOf('/') === -1){
								path = '/'.concat(path);
							}
						}
						
						callback(modal, activateNode, path);
					} else {
						$this.val('/'.concat(activateNode.getPath()));
					}
				});
			}
		});
	};
}));