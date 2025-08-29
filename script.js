document.addEventListener('DOMContentLoaded', () => {
    // LIFFの初期化
    liff.init({
        liffId: "2008016077-vmnXlA5d" // あなたのLIFF ID
    })
    .then(() => {
        initializeApp();
    })
    .catch((err) => {
        console.error(err);
        alert('LIFFの初期化に失敗しました。');
    });
});

function initializeApp() {
    // ユーザー名を表示
    liff.getProfile().then(profile => {
        document.getElementById('user-display-name').textContent = `${profile.displayName}さんの番です`;
    }).catch(err => console.error(err));

    // ゲームの要素を取得
    const stickButtons = document.querySelectorAll('.stick-btn');
    const guessButtons = document.querySelectorAll('.guess-btn');
    const resultDisplay = document.getElementById('result-display');
    const playerHandDisplay = document.getElementById('player-hand');
    const cpuHandDisplay = document.getElementById('cpu-hand');
    const resetButton = document.getElementById('reset-button');
    const controlsDiv = document.getElementById('controls');

    let playerSticks = -1;

    // ゲームの状態をリセットする関数
    function resetGame() {
        playerSticks = -1;
        playerHandDisplay.textContent = '？';
        cpuHandDisplay.textContent = '？';
        resultDisplay.textContent = '自分の棒と合計本数の予想を選んでください';
        stickButtons.forEach(btn => {
            btn.classList.remove('selected');
            btn.disabled = false;
        });
        guessButtons.forEach(btn => btn.disabled = false);
        controlsDiv.style.display = 'block';
        resetButton.style.display = 'none';
    }
    
    // 棒選択ボタンの処理
    stickButtons.forEach(button => {
        button.addEventListener('click', () => {
            playerSticks = parseInt(button.dataset.sticks);
            playerHandDisplay.textContent = playerSticks;
            
            stickButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
        });
    });

    // 予想ボタンの処理
    guessButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (playerSticks === -1) {
                alert('先に自分の棒の数を選んでください！');
                return;
            }

            const playerGuess = parseInt(button.dataset.guess);
            
            // CPUの手をランダムに決定 (0〜3)
            const cpuSticks = Math.floor(Math.random() * 4);
            
            // 結果を表示
            playerHandDisplay.textContent = playerSticks;
            cpuHandDisplay.textContent = cpuSticks;

            const totalSticks = playerSticks + cpuSticks;
            
            if (playerGuess === totalSticks) {
                resultDisplay.textContent = `的中！あなたの勝ちです！ (合計: ${totalSticks})`;
            } else {
                resultDisplay.textContent = `はずれ...残念！ (合計: ${totalSticks}, 予想: ${playerGuess})`;
            }

            // ボタンを無効化し、リセットボタンを表示
            stickButtons.forEach(btn => btn.disabled = true);
            guessButtons.forEach(btn => btn.disabled = true);
            controlsDiv.style.display = 'none';
            resetButton.style.display = 'block';
        });
    });

    // リセットボタンの処理
    resetButton.addEventListener('click', resetGame);

    // 初期状態に設定
    resetGame();
}
