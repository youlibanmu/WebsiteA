// ページ読み込み時に動画リストをローカルストレージから読み込む
document.addEventListener('DOMContentLoaded', loadVideos);

function loadVideos() {
    const videoList = JSON.parse(localStorage.getItem('videoList')) || [];
    videoList.forEach(video => {
        addVideoToList(video.url, video.description, video.rating, false);
    });
}

function insertYouTubeVideo() {
    const url = document.getElementById('video-url').value;
    const description = document.getElementById('video-description').value;
    const rating = document.getElementById('videoRating').value;

    // 動画をリストに追加
    addVideoToList(url, description, rating, true);

    // フォームをリセット
    document.getElementById('video-url').value = '';
    document.getElementById('video-description').value = '';
    document.getElementById('videoRating').value = '1';
}

function addVideoToList(url, description, rating, saveToLocalStorage) {
    const videoId = url.split('v=')[1]?.split('&')[0] || url.split('/').pop();
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;

    const videoItem = document.createElement('div');
    videoItem.classList.add('video-item');
    videoItem.setAttribute('data-rating', rating);

    const iframe = document.createElement('iframe');
    iframe.width = "560";
    iframe.height = "315";
    iframe.src = embedUrl;
    iframe.title = "YouTube video player";
    iframe.frameborder = "0";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;

    const videoDescription = document.createElement('p');
    videoDescription.classList.add('description');
    videoDescription.textContent = `${description}　レア度：${'★'.repeat(rating)}`;

    const editButton = document.createElement('button');
    editButton.textContent = '編集';
    editButton.onclick = () => editVideo(videoItem, url, description, rating);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '削除';
    deleteButton.onclick = () => deleteVideo(videoItem, url);

    videoItem.appendChild(iframe);
    videoItem.appendChild(videoDescription);
    videoItem.appendChild(editButton);
    videoItem.appendChild(deleteButton);

    const videoList = document.getElementById('video-list');
    videoList.insertBefore(videoItem, videoList.firstChild);

    if (saveToLocalStorage) {
        saveVideoToLocalStorage(url, description, rating);
    }
}

function saveVideoToLocalStorage(url, description, rating) {
    const videoList = JSON.parse(localStorage.getItem('videoList')) || [];
    videoList.unshift({ url, description, rating });
    localStorage.setItem('videoList', JSON.stringify(videoList));
}

function editVideo(videoItem, url, description, rating) {
    const newUrl = prompt('新しい動画URLを入力してください:', url);
    const newDescription = prompt('新しい説明を入力してください:', description);
    const newRating = prompt('新しいレア度を入力してください (1-5):', rating);

    if (newUrl && newDescription && newRating) {
        videoItem.querySelector('iframe').src = `https://www.youtube.com/embed/${newUrl.split('v=')[1]?.split('&')[0] || newUrl.split('/').pop()}`;
        videoItem.querySelector('.description').textContent = `${newDescription}　レア度：${'★'.repeat(newRating)}`;
        updateVideoInLocalStorage(url, newUrl, newDescription, newRating);
    }
}

function updateVideoInLocalStorage(oldUrl, newUrl, newDescription, newRating) {
    const videoList = JSON.parse(localStorage.getItem('videoList')) || [];
    const videoIndex = videoList.findIndex(video => video.url === oldUrl);
    if (videoIndex !== -1) {
        videoList[videoIndex] = { url: newUrl, description: newDescription, rating: newRating };
        localStorage.setItem('videoList', JSON.stringify(videoList));
    }
}

function deleteVideo(videoItem, url) {
    videoItem.remove();
    removeVideoFromLocalStorage(url);
}

function removeVideoFromLocalStorage(url) {
    const videoList = JSON.parse(localStorage.getItem('videoList')) || [];
    const updatedList = videoList.filter(video => video.url !== url);
    localStorage.setItem('videoList', JSON.stringify(updatedList));
  }

// 選んだレア度の動画を選択
document.addEventListener('DOMContentLoaded', function() {
    // フィルターリンクにクリックイベントリスナーを追加
    document.querySelectorAll('.filter').forEach(filterLink => {
        filterLink.addEventListener('click', function(event) {
            event.preventDefault();

            const selectedRating = this.getAttribute('data-rating');

            // すべての動画アイテムを非表示にする
            document.querySelectorAll('.video-item').forEach(video => {
                video.style.display = 'none';
            });

            // 選択されたレア度と一致する動画アイテムのみを表示する
            document.querySelectorAll(`.video-item[data-rating="${selectedRating}"]`).forEach(video => {
                video.style.display = 'block';
            });
        });
    });
});

const probabilities = {
    'リーチ': 41.6,
    'ツモ': 18.8,
    '一発': 10.2,
    '赤ドラ': 35,
    'ドラ1': 35,
    '東': 33.0,
    '南': 33.0,
    '西': 33.0,
    '北': 33.0,
    '白': 33.0,
    '發': 33.0,
    '中': 33.0,
    '裏ドラ': 31,
    'ドラ2': 30.2,
    'タンヤオ': 22.4,
    'ピンフ': 21.5,
    'ドラ3': 13.8,
    'ホンイツ': 6.3,
    '一盃口': 4.6,
    '三色': 3.8,
    'トイトイ': 3.2,
    'チートイ': 2.4,
    '一通': 1.8,
    'チャンタ': 1.0,
    'ドラ4': 3.6,
    'ハイテイ': 0.9,
    'チンイツ': 0.8,
    '三暗刻': 0.7,
    '純チャン': 0.4,
    'リンシャン': 0.3,
    '二盃口': 0.1,
    '小三元': 0.1,
    '混老頭': 0.1,
    'ダブリー': 0.1,
    'ドラ5枚': 0.54,
    'スーアンコ': 0.04,
    '三色同刻': 0.04,
    '国士無双': 0.03,
    '大三元': 0.03,
    'ドラ6': 0.043,
    '字一色': 0.005,
    '四喜和': 0.011,
    'ドラ7': 0.0014,
    '清老頭': 0.0018,
    '地和': 0.0015,
    '緑一色': 0.0011,
    '九連宝燈': 0.0004,
    'スーカンツ': 0.0002,
    '天和': 0.0001,
};

function calculateRarity(probability) {
    if (42 >= probability && probability >= 10) {
        return '★';
    } else if (10 > probability && probability >= 0.1) {
        return '★★';
    } else if (0.1 > probability && probability >= 0.01) {
        return '★★★';
    } else if (0.01 > probability && probability >= 0.001) {
        return '★★★★';
    } else {
        return '★★★★★';
    }
}

function calculateProbability() {
    const input = document.getElementById('winning-hand').value;
    const winningHand = input.split(',').map(item => item.trim());

    let totalProbability = 1.0;
    winningHand.forEach(yaku => {
        totalProbability *= probabilities[yaku] / 100 || 0;
    });

    const winningProbability = totalProbability * 100;
    const rarity = calculateRarity(winningProbability);

    document.getElementById('probability-result').textContent = `確率: ${winningProbability.toFixed(4)}%`;
    document.getElementById('rarity-result').textContent = `レア度: ${rarity}`;
}
