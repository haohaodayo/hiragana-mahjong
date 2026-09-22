// インターネット上の無料日本語辞書（約2万語）を自動で読み込むプログラム
(function() {
  window.MAHJONG_WORDS = [];
  window.IS_DICT_LOADED = false;

  // オープンソースの日本語辞書データ（ひらがな単語リスト）を取得
  const dictUrl = 'https://cdn.jsdelivr.net/gh/kuromoji/kuromoji.js@master/demo/dict/base.dat'; // 代替の軽量ひらがな辞書APIデータ
  
  // ネット上の辞書データから2文字・3文字の言葉を自動ロード
  fetch('https://raw.githubusercontent.com/skk-dev/dict/master/SKK-JISYO.L')
    .then(res => res.text())
    .then(text => {
      const lines = text.split('\n');
      const wordSet = new Set();
      
      lines.forEach(line => {
        if (line.startsWith(';') || !line.includes(' /')) return;
        const parts = line.split(' /');
        const kana = parts[0].trim();
        
        // ひらがなのみ、かつ 2文字か3文字の言葉を抽出
        if (/^[ぁ-ん]+$/.test(kana) && (kana.length === 2 || kana.length === 3)) {
          wordSet.add(kana);
        }
      });

      window.MAHJONG_WORDS = Array.from(wordSet);
      window.IS_DICT_LOADED = true;
      console.log('辞書読み込み完了！ 語彙数:', window.MAHJONG_WORDS.length);
    })
    .catch(err => {
      console.error('辞書の読み込みに失敗しました', err);
    });
})();
