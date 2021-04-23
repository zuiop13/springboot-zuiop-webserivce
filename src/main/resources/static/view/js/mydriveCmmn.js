//gl.socket.disconnectFtpServer
var isFtpConnect = false;

$(function() {
	/*
	$(window).bind("beforeunload", function(e) {
		if (isFtpConnect) {
			var $queueTab = $(".tab").filter("[data-id='transfer.transfering']");
			var qcnt = $queueTab.find('.counter').text();
			qcnt = qcnt.substring(1, 2);
			
			var $transferingTab = $(".tab").filter("[data-id='transfer.transfering']");
			var trscnt = $transferingTab.find('.counter').text();
			trscnt = trscnt.substring(1, 2);
			
			if (qcnt != "0" || trscnt != "0") {
				return "전송중인 파일이 있습니다. 그래도 연결해제 하시겠습니까?";
			}
		}
	});
	
	$(window).bind("unload", function(e) {
		// ftp disconnect
		if (isFtpConnect) {
			//gl.socket.disconnectFtpServer(function() {});
		}
	});
	*/
});


