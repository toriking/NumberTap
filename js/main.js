const modal = document.querySelector('.modal');
const borde = document.querySelector('.borde');
const start = document.querySelector('.start');
const next = document.getElementById('next');
const tweet = document.getElementById('tweet');
const retry = document.getElementById('retry');
next.addEventListener('click', () => {
    // テキストボックスの入力された値を取得
    const num = document.getElementById('number').value;
    // 有効範囲指定
    if(0 < num && num <= 5){
        //モーダルウィンドウの削除 
        modal.style.display = 'none';
        // スタート文字表示
        start.textContent = 'START';
        // ゲームレベル表示
        const level = document.createElement('div')
        level.classList.add('level');
        level.textContent = 'Level ' + num;
        borde.appendChild(level);
        // ボードの大きさ調整
        if(document.body.offsetWidth <= 414){
        borde.style.width = 70*num+10+'px';
    }
    else if(document.body.offsetWidth <= 768){
        borde.style.width = 180*num+10+'px';
    }
        else if(document.body.offsetWidth <= 1024){
            borde.style.width = 150*num+10+'px';
        }
        else if(document.body.offsetWidth <= 2200){
            borde.style.width = 160*num+10+'px';
        }
        // パネルの数と同じ重複しない乱数生成
        const randoms = [];
        // 最小値と最大値
        const min = 1, max = num**2;
        // 重複チェックしながら乱数作成
        for(i= min; i <= max; i++){
            while(true){
            const tmp = intRandom(min, max);
            if(!randoms.includes(tmp)){
                randoms.push(tmp);
                break;
            }
        }
    } 
        // min以上max以下の整数値の乱数を返す
        function intRandom(min, max){
          return Math.floor( Math.random() * (max - min + 1)) + min;
        }
        for(let i =0; i < num**2; i++){
        //パネルの生成 
        const panel = document.createElement('div');
        // パネルに数字を付与
        panel.textContent = randoms[i];
        // クラス付与
        panel.classList.add('push', 'unpush');
        borde.appendChild(panel);
    }  
    }else{
    // テキストボックスに空の値を入力
    document.getElementById('number').value = '';
    // Windowからのアラート
    window.alert('1～5を入力してください。');
    }
// タイマー
let timerId;
let startTime;
function countUp(){
    timerId = setTimeout(function(){
        start.textContent = ((Date.now()-startTime) / 1000).toFixed(2);
countUp();
    },10);
}
// パネルイベント
const push = document.querySelectorAll('.push');
let currentNum = 0;
push.forEach(function(target) {
    target.addEventListener('click', () => {
        if((target.textContent-1) == currentNum){
            target.style.visibility = 'hidden';
            currentNum++;
    }
    // ゲームクリアイベント
    if(currentNum === num**2){
        clearTimeout(timerId);
　　　　 // ツイートとリロード表示
        tweet.classList.add('active');
        tweet.classList.remove('unactive');
        retry.classList.add('active');
        retry.classList.remove('unactive');
    }
},false);
});
// STARTクリックイベント
start.addEventListener('click',()=>{
    for(let i =0; i<push.length; i++){
        push[i].classList.remove('unpush')
    }
    start.style.pointerEvents = 'none';
    startTime = Date.now();
    countUp();
});
// リトライイベント
retry.addEventListener('click',()=>{
// ページのリロード
    location.reload();
});
// Tweet機能
tweet.addEventListener('click',()=>{
    tweet.href = 'https://twitter.com/intent/tweet?text=ゲームレベル' + 
    num + 'でタイムは' + start.textContent + 'でした' +
    '%0a' +
    '@toriton2020' + 'が作ったミニアプリです' +
    '%0a' +
    'toriking.github.io/NumberTap/';
});
});