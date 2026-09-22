// インターネット上の公開日本語辞書（SKK辞書）を直接読み込むプログラム
(function() {
  window.MAHJONG_WORDS = [];
  window.IS_DICT_LOADED = false;

  // ネット上の本物の日本語大辞書（数十万語規模）の raw データURL
  const dictionaryUrl = 'https://raw.githubusercontent.com/skk-dev/dict/master/SKK-JISYO.L';

  fetch(dictionaryUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('辞書の取得に失敗しました');
      }
      return response.text();
    })
    .then(text => {
      const lines = text.split('\n');
      const wordSet = new Set();

      lines.forEach(line => {
        // コメント行や空行をスキップ
        if (line.startsWith(';') || !line.includes(' /')) return;

        // 見出し語（読み）を取得
        const parts = line.split(' ');
        const kana = parts[0].trim();

        // 完全な「ひらがな」のみ、かつ「2文字または3文字」の単語だけを集める
        if (/^[ぁ-ん]+$/.test(kana) && (kana.length === 2 || kana.length === 3)) {
          wordSet.add(kana);
        }
      });

      window.MAHJONG_WORDS = Array.from(wordSet);
      window.IS_DICT_LOADED = true;
      console.log(`外部辞書の自動読み込み完了！ 語彙数: ${window.MAHJONG_WORDS.length}語`);
    })
    .catch(err => {
      console.error('辞書データの読み込みエラー:', err);
    });
})();
