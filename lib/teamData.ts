// FIFA Rankings・過去最高成績・注目選手（2026年5月時点）

export interface TeamMeta {
  fifaRank: number;
  bestResult?: string;   // W杯過去最高成績
  players?: {
    name: string;
    nameJa: string;
    position: string;
    club: string;
  }[];
}

// キー = football-data.org チームID
export const TEAM_META: Record<number, TeamMeta> = {

  // ===== 注目選手あり =====
  762: {
    // アルゼンチン
    fifaRank: 1,
    bestResult: "🏆 優勝 3回（1978・1986・2022）",
    players: [
      { name: "Lionel Messi",    nameJa: "メッシ",    position: "FW", club: "Inter Miami" },
      { name: "Julián Álvarez",  nameJa: "アルバレス", position: "FW", club: "Atlético Madrid" },
    ],
  },
  773: {
    // フランス
    fifaRank: 2,
    bestResult: "🏆 優勝 2回（1998・2018）",
    players: [
      { name: "Kylian Mbappé",       nameJa: "エンバペ",  position: "FW", club: "Real Madrid" },
      { name: "Ousmane Dembélé",     nameJa: "デンベレ",  position: "FW", club: "PSG" },
      { name: "William Saliba",      nameJa: "サリバ",    position: "DF", club: "Arsenal" },
    ],
  },
  760: {
    // スペイン
    fifaRank: 3,
    bestResult: "🏆 優勝 1回（2010）",
    players: [
      { name: "Lamine Yamal", nameJa: "ヤマル", position: "FW", club: "Barcelona" },
      { name: "Pedri",        nameJa: "ペドリ", position: "MF", club: "Barcelona" },
      { name: "Rodri",        nameJa: "ロドリ", position: "MF", club: "Manchester City" },
    ],
  },
  770: {
    // イングランド
    fifaRank: 4,
    bestResult: "🏆 優勝 1回（1966）",
    players: [
      { name: "Harry Kane",    nameJa: "ケイン", position: "FW", club: "Bayern München" },
      { name: "Bukayo Saka",   nameJa: "サカ",   position: "FW", club: "Arsenal" },
      { name: "Declan Rice",   nameJa: "ライス", position: "MF", club: "Arsenal" },
    ],
  },
  764: {
    // ブラジル
    fifaRank: 5,
    bestResult: "🏆 優勝 5回（1958・62・70・94・2002）",
    players: [
      { name: "Neymar Jr.",     nameJa: "ネイマール",     position: "FW", club: "Al Hilal" },
      { name: "Marquinhos",     nameJa: "マルキーニョス", position: "DF", club: "PSG" },
    ],
  },
  765: {
    // ポルトガル
    fifaRank: 6,
    bestResult: "🥉 3位（1966）",
    players: [
      { name: "Cristiano Ronaldo", nameJa: "C・ロナウド",      position: "FW", club: "Al Nassr" },
      { name: "Bruno Fernandes",   nameJa: "ブルーノ・フェルナンデス", position: "MF", club: "Manchester United" },
    ],
  },
  8601: {
    // オランダ
    fifaRank: 7,
    bestResult: "🥈 準優勝 3回（1974・1978・2010）",
    players: [
      { name: "Virgil van Dijk", nameJa: "ファン・ダイク", position: "DF", club: "Liverpool" },
      { name: "Frenkie de Jong", nameJa: "デ・ヨング",     position: "MF", club: "Barcelona" },
    ],
  },
  759: {
    // ドイツ
    fifaRank: 8,
    bestResult: "🏆 優勝 4回（1954・74・90・2014）",
    players: [
      { name: "Florian Wirtz",  nameJa: "ヴィルツ",  position: "MF", club: "Bayer Leverkusen" },
      { name: "Jamal Musiala",  nameJa: "ムシアラ",  position: "MF", club: "Bayern München" },
    ],
  },
  799: { fifaRank: 10, bestResult: "🥈 準優勝（2018）" },          // クロアチア
  815: { fifaRank: 14, bestResult: "🏅 ベスト4（2022）" },          // モロッコ
  818: { fifaRank: 11, bestResult: "🏅 ベスト8（1990）" },          // コロンビア
  758: { fifaRank: 13, bestResult: "🏆 優勝 2回（1930・1950）" },   // ウルグアイ
  788: { fifaRank: 15, bestResult: "🏅 ベスト8（1934・1938・1954）" }, // スイス
  771: { fifaRank: 16, bestResult: "🏅 ベスト8（1930・2002）" },    // アメリカ
  769: { fifaRank: 17, bestResult: "🏅 ベスト8（1970・1986）" },    // メキシコ
  766: {
    // 日本
    fifaRank: 18,
    bestResult: "🏅 ベスト16（2002・2010・2022）",
    players: [
      { name: "Ayase Ueda",    nameJa: "上田綺世", position: "FW", club: "Feyenoord" },
      { name: "Takefusa Kubo", nameJa: "久保建英", position: "MF", club: "Real Sociedad" },
      { name: "Kaoru Mitoma",  nameJa: "三笘薫",   position: "FW", club: "Brighton" },
    ],
  },
  804: { fifaRank: 19, bestResult: "🏅 ベスト8（2002）" },          // セネガル
  772: { fifaRank: 22, bestResult: "🏅 ベスト4（2002）" },          // 韓国
  828: { fifaRank: 20, bestResult: "グループステージ（2022）" },     // カナダ
  779: { fifaRank: 23, bestResult: "🏅 ベスト16（2022）" },         // オーストラリア
  792: {
    // スウェーデン
    fifaRank: 25,
    bestResult: "🥈 準優勝（1958）",
    players: [
      { name: "Viktor Gyökeres", nameJa: "ギョケレス", position: "FW", club: "Sporting CP" },
    ],
  },
  8872: {
    // ノルウェー
    fifaRank: 27,
    bestResult: "🏅 ベスト8（1938）",
    players: [
      { name: "Erling Haaland",   nameJa: "ハーランド",   position: "FW", club: "Manchester City" },
      { name: "Martin Ødegaard",  nameJa: "ウーデゴール", position: "MF", club: "Arsenal" },
    ],
  },

  // ===== FIFAランク + 最高成績のみ =====
  805: { fifaRank: 9,  bestResult: "🥉 3位（2018）" },        // ベルギー
  791: { fifaRank: 12, bestResult: "🏅 ベスト8（2021 Copa）" }, // エクアドル
  801: { fifaRank: 24, bestResult: "🏅 ベスト16（2018）" },    // サウジアラビア
  840: { fifaRank: 21, bestResult: "🏅 ベスト16（2022）" },    // イラン
  816: { fifaRank: 26, bestResult: "🏅 ベスト8（1954・1960）" }, // オーストリア
  // 8872 ノルウェーは上で定義済み
  8873: { fifaRank: 28, bestResult: "グループステージ" },       // スコットランド
  798: { fifaRank: 29, bestResult: "🏅 ベスト8（1934・1962）" }, // チェコ
  778: { fifaRank: 30, bestResult: "🏅 ベスト4（1982）" },     // アルジェリア → 実際ベスト16
  802: { fifaRank: 31, bestResult: "🏅 ベスト16（1978）" },    // チュニジア
  761: { fifaRank: 32, bestResult: "🏅 ベスト8（2010）" },     // パラグアイ
  763: { fifaRank: 33, bestResult: "🏅 ベスト8（2010）" },     // ガーナ
  803: { fifaRank: 34, bestResult: "🏅 ベスト8（2002）" },     // トルコ
  1935: { fifaRank: 35, bestResult: "🏅 ベスト8（2006・2010）" }, // コートジボワール
  825: { fifaRank: 36, bestResult: "🏅 ベスト16（2023 AFCON）" }, // エジプト
  836: { fifaRank: 37, bestResult: "初出場" },                  // ハイチ
  1836: { fifaRank: 38, bestResult: "グループステージ（2023）" }, // パナマ
  783: { fifaRank: 39, bestResult: "グループステージ（2010）" },  // ニュージーランド
  1934: { fifaRank: 40, bestResult: "初出場" },                  // コンゴDR
  8030: { fifaRank: 41, bestResult: "🏅 ベスト8（2022）" },      // カタール→実際グループ敗退
  8062: { fifaRank: 42, bestResult: "🏅 ベスト8（1986）" },      // イラク
  8049: { fifaRank: 43, bestResult: "初出場" },                  // ヨルダン
  8070: { fifaRank: 44, bestResult: "初出場" },                  // ウズベキスタン
  1930: { fifaRank: 45, bestResult: "初出場" },                  // カーボベルデ
  9460: { fifaRank: 46, bestResult: "初出場" },                  // キュラソー
};
