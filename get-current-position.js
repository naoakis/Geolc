// ユーザーの端末がGeoLocation APIに対応しているかの判定

// 対応している場合
if (navigator.geolocation) {
	// 現在地を取得
	navigator.geolocation.getCurrentPosition(

		// [第1引数] 取得に成功した場合の関数
		function (position) {
			// 取得したデータの整理
			var data = position.coords;

			// データの整理
			var lat = data.latitude;
			var lng = data.longitude;
			var alt = data.altitude;
			var accLatlng = data.accuracy;
			var accAlt = data.altitudeAccuracy;
			var heading = data.heading;			//0=北,90=東,180=南,270=西
			var speed = data.speed;

			// アラート表示
			//			alert( "あなたの現在位置は、\n[" + lat + "," + lng + "]\nです。" ) ;

			// HTMLへの書き出し
			document.getElementById('result').innerHTML = '<dl><dt>緯度</dt><dd>' + lat + '</dd><dt>経度</dt><dd>' + lng + '</dd><dt>高度</dt><dd>' + alt + '</dd><dt>緯度、経度の精度</dt><dd>' + accLatlng + '</dd><dt>高度の精度</dt><dd>' + accAlt + '</dd><dt>方角</dt><dd>' + heading + '</dd><dt>速度</dt><dd>' + speed + '</dd></dl>';

			// 地図を作成する
			var mymap = L.map('map-canvas');

			// タイルレイヤーを作成し、地図にセットする
			L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
				maxZoom: 18,
				attribution: '<a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank">国土地理院</a>',
			}).addTo(mymap);

			mymap.setView([lat,lng],13);

			var marker = L.marker([lat, lng]).addTo(mymap);

		},

		// [第2引数] 取得に失敗した場合の関数
		function (error) {
			// エラーコード(error.code)の番号
			// 0:UNKNOWN_ERROR				原因不明のエラー
			// 1:PERMISSION_DENIED			利用者が位置情報の取得を許可しなかった
			// 2:POSITION_UNAVAILABLE		電波状況などで位置情報が取得できなかった
			// 3:TIMEOUT					位置情報の取得に時間がかかり過ぎた…

			// エラー番号に対応したメッセージ
			var errorInfo = [
				"原因不明のエラーが発生しました…。",
				"位置情報の取得が許可されませんでした…。",
				"電波状況などで位置情報が取得できませんでした…。",
				"位置情報の取得に時間がかかり過ぎてタイムアウトしました…。"
			];

			// エラー番号
			var errorNo = error.code;

			// エラーメッセージ
			var errorMessage = "[エラー番号: " + errorNo + "]\n" + errorInfo[errorNo];

			// アラート表示
			alert(errorMessage);

			// HTMLに書き出し
			document.getElementById("result").innerHTML = errorMessage;
		},

		// [第3引数] オプション
		{
			"enableHighAccuracy": false,
			"timeout": 8000,
			"maximumAge": 2000,
		}

	);
}

// 対応していない場合
else {
	// エラーメッセージ
	var errorMessage = "お使いの端末は、GeoLacation APIに対応していません。";

	// アラート表示
	alert(errorMessage);

	// HTMLに書き出し
	document.getElementById('result').innerHTML = errorMessage;
}
