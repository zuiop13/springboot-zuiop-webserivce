function cn_bStart(path){
	msg = '<img src="'+path+'/resources/images/cmmn/loading.gif" alt="loading" />';

	$.blockUI({
		message : msg,
		css : {
			border : null,
			backgroundColor : null,
			cursor : null
		},
		overlayCSS : {
			backgroundColor : '#E8E8E8'
		},
		modal : true
	});
}


function cn_bEnd(){
	$.unblockUI();
}


function cn_isNull(val){
	if (new String(val).valueOf() == 'undefined') return '';
	if (val == null) return '';
	if (('x'+val == 'xNaN') && ( new String(val.length).valueOf() == 'undefined')) return '';
	if (val.toString().length == 0 ) return '';

	return val;
};


function cn_isNullReplace(val, repStr){
	val = cn_isNull(val);
	if(val=='') val = repStr;
	return val;
};


function cn_postSubmit(action, params, target){
	if(cn_isNull(action) === '') return false;

	var $frm = $('<form/>');
	$frm.attr({
		 'action' : action
		,'method' : 'post'
		,'target' : cn_isNull(target)
	}).appendTo('body');

	for (var x in params){
		if (params.hasOwnProperty(x)){
			$frm.append(
				$('<input/>').attr({
					'type' : 'hidden'
					,'name' : x
					,'value': cn_isNull(params[x])
				})
			);
		}
	}
	$frm.submit().remove();
}

/**
 * form 객체 obj 담기
 * @param $form : form 객체
 * @param selector : jquery selecot 표현식(select된 객체만 return)
 */
function cn_serializeObject($form, selector){
	var result = {};
	var formArray;

	if(cn_isNull(selector) !== ''){
		formArray = $form.find(selector).serializeArray();
	}else{
		formArray = $form.serializeArray();
	}

	$.each(formArray, function() {
		result[this.name] = this.value;
	});

	return result;
}


function cn_debounce(fn, delay) {
	var timer = null;
	return function () {
		var context = this, args = arguments;
		clearTimeout(timer);
		timer = setTimeout(function () {
			fn.apply(context, args);
		}, delay);
	};
}


function cn_capitalizeFirstLetter(type, string) {
	switch (type) {
		case 'upper':	string = string.charAt(0).toUpperCase() + string.slice(1);	break;
		case 'lower':	string = string.charAt(0).toLowerCase() + string.slice(1);	break;
		default:		break;
	}

	return string;
}


function cn_convertTreeData(childList){
	var parent,
		nodeMap = {};

	$.each(childList, function(i, c){
		nodeMap[c.key] = c;
	});

	childList = $.map(childList, function(c){
		// Check if c is a child node
		if( c.parent ) {
			parent = nodeMap[c.parentKey];
			parent['folder'] = true;

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
}

/*
* 패스워드 유효성 체크
* ======================================================================================================
* cn_isValidPasswd(str) : 영문대소문자, 숫자, 특수문자 조합
* ======================================================================================================
*/
function cn_isValidPasswd(str) {

    var cnt = 0, cnt2 = 0;
    if (str == "") {

        return false;
    }
    if (str.search(/\s/) != -1) {   // space

        return false;
    }
    if (str.length < 8) {           // length

        return false;
    }
    for (var i = 0; i < str.length; ++i) {
        if (str.charAt(0) == str.substring(i, i + 1))
            ++cnt;
    }
    if (cnt == str.length) {        // 한문자열로만 된 경우

        return false;
    }
    var regexp = /^[0-9+]{8,16}$/;
    if (regexp.test(str)) {         // 숫자로만 된 경우

        return false;
    }
    var regexp2 = /^[a-zA-Z+]{8,16}$/;
    if (regexp2.test(str)) {        // 문자로만 된 경우

        return false;
    }
    var regexp3 = /^[a-zA-Z0-9+]$/;
    for (var i = 0; i < str.length; ++i) {
        //alert(regexp3.test(str.charAt(i)));
        if (regexp3.test(str.charAt(i)))
            ++cnt2;
    }
    if (cnt2 == str.length) {       // 특수문자 없음

        return false;
    }
    var isPW = /^[A-Za-z0-9`\-=\\\[\];',\./~!@#\$%\^&\*\(\)_\+|\{\}:"<>\?]{8,16}$/;
    if (!isPW.test(str)) {

        return false;
    }

    return true;
}

/*
* 패스워드 유효성 체크  ID와 비교 부분 추가
* ======================================================================================================
* cn_isValidPasswd(str, id) : 영문대소문자, 숫자, 특수문자 조합
* str : 암호
* id : 사용자id
* ======================================================================================================
*/
function cn_isValidPasswdVsId(str, id) {
    var cnt = 0, cnt2 = 0;
    if (str == "") {
        return false;
    }
    if (str.search(/\s/) != -1) {   // space
        return false;
    }
    if (str.length < 8) {           // length
        return false;
    }
    for (var i = 0; i < str.length; ++i) {
        if (str.charAt(0) == str.substring(i, i + 1))
            ++cnt;
    }
    if (cnt == str.length) {        // 한문자열로만 된 경우
        return false;
    }
    var regexp = /^[0-9+]{8,16}$/;
    if (regexp.test(str)) {         // 숫자로만 된 경우
        return false;
    }
    var regexp2 = /^[a-zA-Z+]{8,16}$/;
    if (regexp2.test(str)) {        // 문자로만 된 경우
        return false;
    }
    var regexp3 = /^[a-zA-Z0-9+]$/;
    for (var i = 0; i < str.length; ++i) {
        //alert(regexp3.test(str.charAt(i)));
        if (regexp3.test(str.charAt(i)))
            ++cnt2;
    }
    if (cnt2 == str.length) {       // 특수문자 없음
        return false;
    }
    var isPW = /^[A-Za-z0-9`\-=\\\[\];',\./~!@#\$%\^&\*\(\)_\+|\{\}:"<>\?]{8,20}$/;
    if (!isPW.test(str)) {
        return false;
    }
    if(str.indexOf(id) > -1) {
    	return false;
    }

    return true;
}

function engKorChkWord(obj, maxByte) {

    var strValue = obj.value;
    var strLen = strValue.length;
    var totalByte = 0;
    var len = 0;
    var oneChar = "";
    var str2 = "";
    var maxByte_K = Math.floor(maxByte/3);			// 알림창 출력

    for (var i = 0; i < strLen; i++) {
        oneChar = strValue.charAt(i);
        if (escape(oneChar).length > 4) {			// 한글 입력의 경우
            totalByte += 3;							// DB 저장을 위해 3byte 처리
        } else {
            totalByte++;
        }

        // 입력한 문자 길이보다 넘치면 잘라내기 위해 저장
        if (totalByte <= maxByte) {
            len = i + 1;
        }
    }

    // 넘어가는 글자는 자른다.
    if (totalByte > maxByte) {
    	// 알림창 처리
        alert("영문 " + maxByte + "글자, 한글 " + maxByte_K + "글자를 초과 입력 할 수 없습니다.");
        str2 = strValue.substr(0, len);
        obj.value = str2;
        chkword(obj, maxByte);
    }
}


/////////////////////////////////////////////////////

function facebook(){
	var currentURL = window.location.href;
	var option = "width=400, height=400, toolbar=no, scrollbars=yes, menubar=no, resizable=no, location=no, status=no";
	window.open("https://www.facebook.com/sharer/sharer.php?u="+currentURL,"facebook", option);
}

// 트위터 공유하기
function twitter() {
	var currentURL = window.location.href;
	var option = "width=400, height=400, toolbar=no, scrollbars=yes, menubar=no, resizable=no, location=no, status=no";
	window.open("http://twitter.com/share?url="+currentURL,"twitter", option);
}

function cn_addComma(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


//  마이드라이브 이동 (라시트 메뉴)
function fn_siderMydriveMove(url, check){
	
	var nWidth = "1400";
	var nHeight = "800";
	
	var curX = window.screenLeft;
	var curY = window.screenTop;
	var curWidth = document.body.clientWidth;
	var curHeight = document.body.clientHeight;
	
	var nLeft = curX + (curWidth / 2) - (nWidth / 2);
	var nTop = curY + (curHeight / 2) - (nHeight / 2);
	
	if(check == "Y"){
		window.open(url, "popMydrive"
				, "width=" + nWidth + ", height=" + nHeight + ", toolbar=no,scrollbars=yes,menubar=no,resizable=no,location=no,status=no,left=" + nLeft + ", top=" + nTop);
	}else{
		alert("로그인이 필요한 메뉴 입니다.");
		return false;
	}
}
 

 /**
 * id : 메뉴ID
 * pid : 메뉴ID의 부모 메뉴ID
 * url : 접속URL
 * menuNm : 메뉴ID의 명
 * menuUseChecked : 접속여부
 * pMenuNm : 부모메뉴ID명
 * @returns {String}
 */
function fn_sideMenuMove(id, pid, url, menuNm, menuUseChecked, pMenuNm){
	var menuUseChecked = "false";
	 
	for(var i = 0; i < topMenuId.length; i++){
		if(topMenuId[i] == id){
			//alert(topMenuId[i]);
			menuUseChecked = topMenuChecked[i]; 
		}
	}
				
	document.sideForm.mm.value=pid;
	document.sideForm.sm.value=id;
	document.sideForm.action = contextPath + url;
	if(menuUseChecked == "false"){
		alert("사용권한이 없습니다.");
	}else{
		document.sideForm.submit();
	}
}

/**
 * byte 용량을 환산하여 반환
 * 용량의 크기에 따라 MB, KB, byte 단위로 환산함
 * @param fileSize  byte 값
 * @param fixed    환산된 용량의 소수점 자릿수
 * @returns {String}
 */
function generateByte(fileSize, fixed) {
   var str;
   //console.log(typeof(fileSize) + ", fileSize=" + fileSize);
   //MB 단위 이상일때 MB 단위로 환산
   if (fileSize >= 1024 * 1024) {
      fileSize = fileSize / (1024 * 1024);
      fileSize = (fixed === undefined) ? fileSize : fileSize.toFixed(fixed);
      str = cn_addComma(fileSize) + ' MB';
   }
   //KB 단위 이상일때 KB 단위로 환산
   else if (fileSize >= 1024) {
      fileSize = fileSize / 1024;
      fileSize = (fixed === undefined) ? fileSize : fileSize.toFixed(fixed);
      str = cn_addComma(fileSize) + ' KB';
   }
   //KB 단위보다 작을때 byte 단위로 환산
   else {
      var floatCheck=/^([0-9]*)[\.]?([0-9])?$/;
      if(!floatCheck.test(fileSize)){
         fileSize = (fixed === undefined) ? fileSize : fileSize.toFixed(fixed);
      }
      
      str = cn_addComma(fileSize) + ' byte';
   }
   return str;
}