setButtonImage("https://image.itmedia.co.jp/nl/articles/1408/26/ah_rk03.jpg");
setWindowDrag(0, 0, 350, 60);
// 画面の幅と高さを取得
let screenWidth = window.innerWidth;
let screenHeight = window.innerHeight;

// 任意のウィンドウの幅と高さ
let windowWidth = 200;
let windowHeight = 350;

// 画面の中心座標を計算
let centerX = (screenWidth - windowWidth) / 2;
let centerY = screenHeight / 2;

// ウィンドウの位置を変更せず、サイズのみを変更して中心を設定
setWindowRect(centerX, centerY, windowWidth, windowHeight);

var UserteamHP;
let HPAddress;
let clear;
let KaihukuMezameTurn;

function updateAddresses() {
	// HP値を検索
	h5gg.searchNumber(UserteamHP, "I32", "0x00000000", "0x200000000");
	let results = h5gg.getResults(20, 0);
	let filteredResults = [];

	// アドレスの末尾が '44' の結果を絞り込む
	for (let i = 0; i < results.length; i++) {
		let address = results[i].address;
		if (address.endsWith("44")) {
			filteredResults.push(results[i]);
		}
	}

	// 絞り込んだ結果からアドレスを取得して更新
	if (filteredResults.length > 0) {
		//ここに登録する数値たち入れるこここここおおおこおここここここここここここここここここここここここここここ
		HPAddress = parseInt(filteredResults[0].address, 16); // 数値型としてアドレスを扱う
		KaihukuMezameTurn = HPAddress - 0x9168; // 回復目覚めターン用アドレス
		SousaTime = KaihukuMezameTurn - 0x98;
		KakuseiMukou = KaihukuMezameTurn + 0x250; //HPAdress - 8f18
		AttackDown = KakuseiMukou + 0x14;
		Seal = AttackDown + 0x34;
		ComboPlus = Seal + 0x38;
		Cloud = ComboPlus + 0x64;
		ZokuseiKyushu = Cloud + 0x14;
		ComboKyushu = ZokuseiKyushu + 0x14;
		DamageKyushu = ComboKyushu + 0x14;
		DropUnable = DamageKyushu + 0x48;
		TurnHPKaihuku = DropUnable + 0x14;
		MaxHP = TurnHPKaihuku + 0x34;
		Roulette = MaxHP + 0x14;
		PlusDropMezame = Roulette + 0x94;
		EnemyLockon = PlusDropMezame + 0x14;
		OchicomNashi = EnemyLockon + 0x14;
		MaxAttack = OchicomNashi + 0x24;
		DamageMukou = MaxAttack + 0x54;
		Masuchange = DamageMukou + 0x14;
		Chokurayami = Masuchange + 0x24;
		ComboDropMezame = Chokurayami + 0x28;
		SkillHooin = ComboDropMezame + 0xc4;
		AssistMukou = SkillHooin + 0x14;
		ComboGensho = AssistMukou + 0x14;
		TogeDropMezame = ComboGensho + 0x14;

		clear = HPAddress - 0x14;
		//敵一体目 = HPAddress - 0x55dc;
		//敵二体目 = HPAddress - 0x4aec;

		// ボタン表示を更新
		document.getElementById("KaihukuMezame").innerText =
			"回復目覚め (0x" + KaihukuMezameTurn.toString(16) + ")";
	} else {
		console.log("No valid results found.");
	}
	h5gg.clearResults();
}

function KaihukuMezame() {
	h5gg.setValue(KaihukuMezameTurn, 99, "I32");
}

function Seigyo() {
	h5gg.setValue(ZokuseiKyushu, 99, "I32");
	h5gg.setValue(ComboKyushu, 99, "I32");
	h5gg.setValue(DamageKyushu, 99, "I32");
	h5gg.setValue(DamageMukou, 99, "I32");
	h5gg.setValue(Chokurayami, 0, "I32");
}

function ZokuseiKyushuMukou() {
	h5gg.setValue(ZokuseiKyushu, 99, "I32");
}

function setCheatValues(value) {
	const cheatValues = [
		KaihukuMezameTurn,
		SousaTime,
		KakuseiMukou,
		AttackDown,
		Seal,
		ComboPlus,
		Cloud,
		ZokuseiKyushu,
		ComboKyushu,
		DamageKyushu,
		DropUnable,
		TurnHPKaihuku,
		MaxHP,
		Roulette,
		PlusDropMezame,
		EnemyLockon,
		OchicomNashi,
		MaxAttack,
		DamageMukou,
		Chokurayami,
		ComboDropMezame,
		SkillHooin,
		AssistMukou,
		ComboGensho,
		TogeDropMezame,
	];
	cheatValues.forEach((key) => h5gg.setValue(key, value, "I32"));
}

let cheatflag = false;

function cheatMode() {
	if (!cheatflag) {
		setCheatValues(99); // チートオン
		cheatflag = true;
	} else {
		setCheatValues(0); // チートオフ
		cheatflag = false;
	}
}

function checkAlert(checkbox) {
	if (checkbox.checked) {
		//   alert('Checked!');
		intervalID = setInterval(change_stage, 500);
	} else {
		clearInterval(intervalID);
	}
}

HPhyouji = setInterval(() => {
	if (!isNaN(HPAddress)) {
		let value = h5gg.getValue(HPAddress, "I32");
		const label = document.getElementById("checkbox-label");

		// HTML 要素が存在する場合にのみ更新
		if (label) {
			label.innerText = "即クリア (" + value + ")";
		}
	} else {
		clearInterval(HPhyouji);
	}
}, 1000);

let inputHPFlag = false;

function showPrompt() {
	var userInput = prompt("ここに入力してください:");
	if (userInput != null) {
		inputHPFlag = true;
		// 入力された値を使用する処理をここに書く
		UserteamHP = userInput;
		// document.getElementById("checkbox-label").innerText =
		// 	"即クリア (" + UserteamHP + ")";
		// alert("入力された値: " + userInput);
		// 入力値に基づいてアドレスを検索し更新
		updateAddresses();
		if (isNaN(HPAddress)) {
			inputHPFlag = false;
		}
	}
}

let HPLock;

function LockHP() {
	var userInput = prompt("ここに入力してください:");
	if (userInput != null) {
		HPLock = setInterval(() => {
			if (!inputHPFlag) {
				// 入力された値を使用する処理をここに書く
				UserteamHP = userInput;
				// 入力値に基づいてアドレスを検索し更新
				updateAddresses();
			}
		}, 1000);
	}
}

function change_stage() {
	if (HPAddress) {
		h5gg.setValue(clear, 0, "I32");
		h5gg.setValue(clear + 4, 0, "I32");
	} else {
		console.log("HPアドレスが設定されていません。");
	}
}

let stopwatchflag = false;
let Timer;
let second = 0;

function stopwatch() {
	if (!stopwatchflag) {
		second = 0;
		Timer = setInterval(startcount, 2000);
		stopwatchflag = true;
	} else {
		clearInterval(Timer); // タイマー停止
		stopwatchflag = false;
		document.getElementById("stopwatch").innerText = "ストップウォッチ"; // 表示リセット
	}
}

function startcount() {
	second++;
	second++;
	document.getElementById("stopwatch").innerText = second;
}

function copyText() {
	// 16進数形式に変換
	const hexValue = "0x" + KaihukuMezameTurn.toString(16).toUpperCase(); // 0xプレフィックスを追加

	// 一時的にテキストエリアを作成して16進数形式のアドレスをコピー
	const textarea = document.createElement("textarea");
	textarea.value = hexValue; // 16進数形式に変換したアドレスを設定
	document.body.appendChild(textarea); // テキストエリアを追加

	// テキストを選択してコピー
	textarea.select();
	textarea.setSelectionRange(0, 99999); // モバイル対応のため範囲を指定

	// コピーコマンドを実行
	document.execCommand("copy");

	// コピー後にテキストエリアを削除
	document.body.removeChild(textarea);

	alert("コピーしました: " + hexValue); // コピーした16進数形式のアドレスを表示
}

function updatePage() {
	const updatedFileURL =
		"https://yamaguccidaiki.github.io/Padmod/Padain.html";

	fetch(updatedFileURL, { cache: "no-cache" }) // キャッシュ無効化
		.then((response) => {
			if (!response.ok) {
				throw new Error("Failed to fetch the updated file.");
			}
			return response.text();
		})
		.then((newHtml) => {
			// 新しいHTMLをパース
			const parser = new DOMParser();
			const doc = parser.parseFromString(newHtml, "text/html");

			// body部分を置き換え
			document.body.innerHTML = doc.body.innerHTML;

			// スクリプトを再ロード
			const newScripts = doc.querySelectorAll("script");
			newScripts.forEach((script) => {
				const newScript = document.createElement("script");
				if (script.src) {
					// 外部スクリプトの場合
					newScript.src = script.src;
				} else {
					// インラインスクリプトの場合
					newScript.textContent = script.textContent;
				}
				document.body.appendChild(newScript);
			});

			alert("ページが更新されました。");
		})
		.catch((error) => {
			console.error("更新に失敗しました:", error);
			alert("更新に失敗しました。もう一度試してください。");
		});
}

//他に処理を追加する
