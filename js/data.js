// Chord definitions and Mandopop song data for Chordie 初弦
const CHORDS = [
  {
    day: 1,
    name: 'C',
    type: 'Major',
    notes: ['C4', 'E4', 'G4'],
    description: '最基本的和弦，由 Do-Mi-Sol 三个音组成。几乎所有流行歌都会用到。',
    songs: [
      { title: '小幸运', artist: '田馥甄 (Hebe)', chordProgression: ['C', 'G', 'Am', 'F'], lyric: '我听见雨滴落在青青草地' },
      { title: '晴天', artist: '周杰伦 (Jay Chou)', chordProgression: ['C', 'G', 'Am', 'Em', 'F'], lyric: '故事的小黄花 从出生那年就飘着' },
      { title: '知足', artist: '五月天 (Mayday)', chordProgression: ['C', 'G', 'Am', 'Em', 'F'], lyric: '怎么去拥有一道彩虹' }
    ]
  },
  {
    day: 2,
    name: 'G',
    type: 'Major',
    notes: ['G3', 'B3', 'D4'],
    description: 'G 大调和弦，由 Sol-Si-Re 组成。是 C 大调中最常搭配的和弦之一。',
    songs: [
      { title: '倔强', artist: '五月天 (Mayday)', chordProgression: ['G', 'D', 'Em', 'C'], lyric: '我和我最后的倔强' },
      { title: '那些年', artist: '胡夏 (Hu Xia)', chordProgression: ['G', 'Em', 'C', 'D'], lyric: '那些年错过的大雨' },
      { title: '拥抱', artist: '五月天 (Mayday)', chordProgression: ['G', 'D', 'Em', 'Bm', 'C'], lyric: '脱下长日的假面 奔向梦幻的疆界' }
    ]
  },
  {
    day: 3,
    name: 'Am',
    type: 'Minor',
    notes: ['A3', 'C4', 'E4'],
    description: 'A 小调和弦，听起来忧伤柔和。是 C 大调的关系小调。',
    songs: [
      { title: '后来', artist: '刘若英 (René Liu)', chordProgression: ['Am', 'F', 'C', 'G'], lyric: '后来 我总算学会了如何去爱' },
      { title: '说好的幸福呢', artist: '周杰伦 (Jay Chou)', chordProgression: ['Am', 'F', 'C', 'G'], lyric: '你的回话凌乱着 在这个时刻' },
      { title: '突然好想你', artist: '五月天 (Mayday)', chordProgression: ['Am', 'F', 'C', 'G'], lyric: '突然好想你 你会在哪里' }
    ]
  },
  {
    day: 4,
    name: 'F',
    type: 'Major',
    notes: ['F3', 'A3', 'C4'],
    description: 'F 大调和弦，由 Fa-La-Do 组成。在流行乐中极为常见。',
    songs: [
      { title: '情非得已', artist: '庾澄庆 (Harlem Yu)', chordProgression: ['C', 'Am', 'F', 'G'], lyric: '难以忘记初次见你 一双迷人的眼睛' },
      { title: '遇见', artist: '孙燕姿 (Stefanie Sun)', chordProgression: ['F', 'G', 'C', 'Am'], lyric: '听见冬天的离开 我在某年某月醒过来' },
      { title: '童话', artist: '光良 (Michael Wong)', chordProgression: ['C', 'G', 'Am', 'F'], lyric: '我愿变成童话里 你爱的那个天使' }
    ]
  },
  {
    day: 5,
    name: 'Em',
    type: 'Minor',
    notes: ['E3', 'G3', 'B3'],
    description: 'E 小调和弦，忧郁却温暖。常出现在抒情段落。',
    songs: [
      { title: '安静', artist: '周杰伦 (Jay Chou)', chordProgression: ['Em', 'C', 'G', 'D'], lyric: '只剩下钢琴陪我谈了一天' },
      { title: '温柔', artist: '五月天 (Mayday)', chordProgression: ['C', 'G', 'Am', 'Em', 'F'], lyric: '不知道不明了不想要为什么我的心' },
      { title: '爱情转移', artist: '陈奕迅 (Eason Chan)', chordProgression: ['Em', 'C', 'G', 'D'], lyric: '把一个人的温暖 转移到另一个的胸膛' }
    ]
  },
  {
    day: 6,
    name: 'Dm',
    type: 'Minor',
    notes: ['D4', 'F4', 'A4'],
    description: 'D 小调和弦，由 Re-Fa-La 组成。带有深沉的情感色彩。',
    songs: [
      { title: '龙卷风', artist: '周杰伦 (Jay Chou)', chordProgression: ['Dm', 'G', 'C', 'Am'], lyric: '爱情来的太快就像龙卷风' },
      { title: '好久不见', artist: '陈奕迅 (Eason Chan)', chordProgression: ['C', 'Am', 'Dm', 'G'], lyric: '我来到你的城市 走过你来时的路' },
      { title: '如果的事', artist: '范玮琪 (Christine Fan)', chordProgression: ['C', 'Dm', 'G', 'Am'], lyric: '我想过一件事 不是什么如果的事' }
    ]
  },
  {
    day: 7,
    name: 'D',
    type: 'Major',
    notes: ['D4', 'F#4', 'A4'],
    description: 'D 大调和弦，明亮有力。常用在 G 调歌曲中。',
    songs: [
      { title: '倔强', artist: '五月天 (Mayday)', chordProgression: ['G', 'D', 'Em', 'C'], lyric: '握紧双手绝对不放' },
      { title: '星晴', artist: '周杰伦 (Jay Chou)', chordProgression: ['G', 'Em', 'C', 'D'], lyric: '一步两步三步四步望着天' },
      { title: '小情歌', artist: '苏打绿 (Sodagreen)', chordProgression: ['G', 'D', 'Em', 'C'], lyric: '这是一首简单的小情歌' }
    ]
  },
  {
    day: 8,
    name: 'A',
    type: 'Major',
    notes: ['A3', 'C#4', 'E4'],
    description: 'A 大调和弦，温暖明亮。是很多经典情歌的基础。',
    songs: [
      { title: '告白气球', artist: '周杰伦 (Jay Chou)', chordProgression: ['A', 'E', 'F#m', 'D'], lyric: '亲爱的爱上你 从那天起' },
      { title: '修炼爱情', artist: '林俊杰 (JJ Lin)', chordProgression: ['A', 'E', 'F#m', 'D'], lyric: '修炼爱情的悲欢 我们这些努力不简单' },
      { title: '小酒窝', artist: '林俊杰 (JJ Lin)', chordProgression: ['A', 'E', 'F#m', 'D'], lyric: '小酒窝长睫毛 是你最美的记号' }
    ]
  },
  {
    day: 9,
    name: 'E',
    type: 'Major',
    notes: ['E3', 'G#3', 'B3'],
    description: 'E 大调和弦，饱满有力。常用作摇滚和流行歌的基调。',
    songs: [
      { title: '听海', artist: '张惠妹 (A-Mei)', chordProgression: ['E', 'B', 'C#m', 'A'], lyric: '听海哭的声音 叹息着谁又被伤了心' },
      { title: '你不知道的事', artist: '王力宏 (Leehom Wang)', chordProgression: ['E', 'B', 'C#m', 'A'], lyric: '我飞行 但你坠落之际' },
      { title: '背对背拥抱', artist: '林俊杰 (JJ Lin)', chordProgression: ['E', 'B', 'C#m', 'A'], lyric: '背对背拥抱 真的比分开还要辛苦' }
    ]
  },
  {
    day: 10,
    name: 'Bm',
    type: 'Minor',
    notes: ['B3', 'D4', 'F#4'],
    description: 'B 小调和弦，深沉而有张力。是 D 大调中的关系小调。',
    songs: [
      { title: '给我一首歌的时间', artist: '周杰伦 (Jay Chou)', chordProgression: ['G', 'D', 'Bm', 'A'], lyric: '给我一首歌的时间 紧紧的把那拥抱变成永远' },
      { title: '不能说的秘密', artist: '周杰伦 (Jay Chou)', chordProgression: ['D', 'A', 'Bm', 'G'], lyric: '最美的不是下雨天 是曾与你躲过雨的屋檐' },
      { title: '退后', artist: '周杰伦 (Jay Chou)', chordProgression: ['D', 'A', 'Bm', 'G'], lyric: '天亮了 雨下了 你走了' }
    ]
  },
  {
    day: 11,
    name: 'C7',
    type: 'Dominant 7th',
    notes: ['C4', 'E4', 'G4', 'Bb4'],
    description: '属七和弦，比大三和弦多一个降七音，有强烈的解决倾向。常用来过渡到 F 和弦。',
    songs: [
      { title: '月亮代表我的心', artist: '邓丽君 (Teresa Teng)', chordProgression: ['C', 'C7', 'F', 'G'], lyric: '你问我爱你有多深 月亮代表我的心' },
      { title: '甜蜜蜜', artist: '邓丽君 (Teresa Teng)', chordProgression: ['C', 'C7', 'F', 'G'], lyric: '甜蜜蜜 你笑得甜蜜蜜' },
      { title: '我只在乎你', artist: '邓丽君 (Teresa Teng)', chordProgression: ['C', 'C7', 'F', 'Fm'], lyric: '任时光匆匆流去 我只在乎你' }
    ]
  },
  {
    day: 12,
    name: 'G7',
    type: 'Dominant 7th',
    notes: ['G3', 'B3', 'D4', 'F4'],
    description: 'G 属七和弦，强烈想要回到 C 和弦。是 C 大调中最重要的属和弦。',
    songs: [
      { title: '朋友', artist: '周华健 (Emil Wakin Chau)', chordProgression: ['C', 'F', 'G7', 'C'], lyric: '朋友一生一起走 那些日子不再有' },
      { title: '光辉岁月', artist: 'Beyond', chordProgression: ['C', 'Am', 'F', 'G7'], lyric: '风雨中抱紧自由' },
      { title: '海阔天空', artist: 'Beyond', chordProgression: ['C', 'Am', 'F', 'G7'], lyric: '原谅我这一生不羁放纵爱自由' }
    ]
  },
  {
    day: 13,
    name: 'D7',
    type: 'Dominant 7th',
    notes: ['D4', 'F#4', 'A4', 'C5'],
    description: 'D 属七和弦，常用来引导到 G 和弦。增加音乐的推动力。',
    songs: [
      { title: '那些年', artist: '胡夏 (Hu Xia)', chordProgression: ['G', 'Em', 'C', 'D7'], lyric: '又回到最初的起点 记忆中你青涩的脸' },
      { title: '知足', artist: '五月天 (Mayday)', chordProgression: ['C', 'G', 'Am', 'D7'], lyric: '如果我爱上你的笑容' },
      { title: '拥抱', artist: '五月天 (Mayday)', chordProgression: ['G', 'D7', 'Em', 'C'], lyric: '昨天太近 明天太远' }
    ]
  },
  {
    day: 14,
    name: 'Am7',
    type: 'Minor 7th',
    notes: ['A3', 'C4', 'E4', 'G4'],
    description: '小七和弦，比 Am 多了一个七音，更加柔和梦幻。',
    songs: [
      { title: '说了再见', artist: '周杰伦 (Jay Chou)', chordProgression: ['Am7', 'Dm7', 'G7', 'C'], lyric: '说了再见 才发现再也见不到' },
      { title: '一路向北', artist: '周杰伦 (Jay Chou)', chordProgression: ['Am7', 'F', 'C', 'G'], lyric: '一路向北 离开有你的季节' },
      { title: '可惜不是你', artist: '梁静茹 (Fish Leong)', chordProgression: ['C', 'Am7', 'F', 'G'], lyric: '可惜不是你 陪我到最后' }
    ]
  },
  {
    day: 15,
    name: 'Dm7',
    type: 'Minor 7th',
    notes: ['D4', 'F4', 'A4', 'C5'],
    description: 'D 小七和弦，温润流畅。在 II-V-I 进行中扮演重要角色。',
    songs: [
      { title: '简单爱', artist: '周杰伦 (Jay Chou)', chordProgression: ['C', 'Dm7', 'Em', 'F'], lyric: '想说你懂我说的 是我不该沉默时' },
      { title: '暧昧', artist: '杨丞琳 (Rainie Yang)', chordProgression: ['C', 'Dm7', 'G', 'C'], lyric: '暧昧让人变得贪心' },
      { title: '爱笑的眼睛', artist: '林俊杰 (JJ Lin)', chordProgression: ['C', 'Dm7', 'G7', 'C'], lyric: '如果不是那镜子不想面对' }
    ]
  },
  {
    day: 16,
    name: 'Em7',
    type: 'Minor 7th',
    notes: ['E3', 'G3', 'B3', 'D4'],
    description: 'E 小七和弦，空灵而开阔。常用在前奏和桥段。',
    songs: [
      { title: '我不愿让你一个人', artist: '五月天 (Mayday)', chordProgression: ['C', 'Em7', 'Am', 'F'], lyric: '我不愿让你一个人 一个人在人海浮沉' },
      { title: '彩虹', artist: '周杰伦 (Jay Chou)', chordProgression: ['C', 'Em7', 'F', 'G'], lyric: '你的爱就像彩虹 我张开了手却变成雨滴' },
      { title: '知足', artist: '五月天 (Mayday)', chordProgression: ['C', 'Em7', 'Am', 'F'], lyric: '知足的快乐 叫我忍受心痛' }
    ]
  },
  {
    day: 17,
    name: 'Fmaj7',
    type: 'Major 7th',
    notes: ['F3', 'A3', 'C4', 'E4'],
    description: '大七和弦，梦幻唯美。比普通 F 和弦多了一丝浪漫感。',
    songs: [
      { title: '光年之外', artist: '邓紫棋 (G.E.M.)', chordProgression: ['Am', 'Fmaj7', 'C', 'G'], lyric: '缘分让我们相遇乱世以外' },
      { title: '说好不哭', artist: '周杰伦 (Jay Chou)', chordProgression: ['C', 'G', 'Am', 'Fmaj7'], lyric: '说好不哭让我走 眼泪就留在雨天' },
      { title: '等你下课', artist: '周杰伦 (Jay Chou)', chordProgression: ['C', 'Em', 'Fmaj7', 'G'], lyric: '我等你下课 从那时候起' }
    ]
  },
  {
    day: 18,
    name: 'Cmaj7',
    type: 'Major 7th',
    notes: ['C4', 'E4', 'G4', 'B4'],
    description: 'C 大七和弦，清澈透亮。用来替代普通 C 和弦，增添色彩。',
    songs: [
      { title: '蒲公英的约定', artist: '周杰伦 (Jay Chou)', chordProgression: ['Cmaj7', 'Am7', 'Fmaj7', 'G'], lyric: '一起长大的约定 那样清晰' },
      { title: '稻香', artist: '周杰伦 (Jay Chou)', chordProgression: ['Cmaj7', 'G', 'Am', 'Em'], lyric: '对这个世界如果你有太多的抱怨' },
      { title: '小宇', artist: '张震岳 (A-Yue)', chordProgression: ['Cmaj7', 'Am', 'Fmaj7', 'G'], lyric: '终于让自己属于我自己' }
    ]
  },
  {
    day: 19,
    name: 'Bm7',
    type: 'Minor 7th',
    notes: ['B3', 'D4', 'F#4', 'A4'],
    description: 'B 小七和弦，暗色调中带着一丝希望。常出现在 D/G 大调歌曲中。',
    songs: [
      { title: '七里香', artist: '周杰伦 (Jay Chou)', chordProgression: ['G', 'Bm7', 'C', 'D'], lyric: '窗外的麻雀 在电线杆上多嘴' },
      { title: '听见下雨的声音', artist: '周杰伦 (Jay Chou)', chordProgression: ['G', 'Bm7', 'Em', 'C'], lyric: '竹篱上 停留着蜻蜓' },
      { title: '她说', artist: '林俊杰 (JJ Lin)', chordProgression: ['G', 'D', 'Em', 'Bm7'], lyric: '她说无所谓 只要能在夜里翻来覆去的时候有寄托' }
    ]
  },
  {
    day: 20,
    name: 'A7',
    type: 'Dominant 7th',
    notes: ['A3', 'C#4', 'E4', 'G4'],
    description: 'A 属七和弦，有蓝调感的色彩。引导到 D 和弦时特别有效。',
    songs: [
      { title: '发如雪', artist: '周杰伦 (Jay Chou)', chordProgression: ['Dm', 'A7', 'Dm', 'C'], lyric: '你发如雪 凄美了离别' },
      { title: '东风破', artist: '周杰伦 (Jay Chou)', chordProgression: ['Am', 'A7', 'Dm', 'G'], lyric: '一盏离愁 孤单伫立在窗口' },
      { title: '千里之外', artist: '周杰伦 (Jay Chou)', chordProgression: ['Am', 'A7', 'Dm', 'E7'], lyric: '我送你离开 千里之外' }
    ]
  },
  {
    day: 21,
    name: 'Cadd9',
    type: 'Add 9',
    notes: ['C4', 'E4', 'G4', 'D5'],
    description: '加九和弦，在 C 和弦基础上添加了第九音 (Re)。清新明亮，现代感十足。',
    songs: [
      { title: '突然好想你', artist: '五月天 (Mayday)', chordProgression: ['Cadd9', 'G', 'Am', 'F'], lyric: '最怕空气突然安静' },
      { title: '温柔', artist: '五月天 (Mayday)', chordProgression: ['Cadd9', 'G', 'Am', 'Em'], lyric: '走在风中今天阳光 突然好温柔' },
      { title: '离开地球表面', artist: '五月天 (Mayday)', chordProgression: ['Cadd9', 'G', 'Am', 'F'], lyric: '离开地球表面 让我离开' }
    ]
  },
  {
    day: 22,
    name: 'Gsus4',
    type: 'Suspended 4th',
    notes: ['G3', 'C4', 'D4'],
    description: '挂四和弦，用四音 (Do) 替代了三音。有一种悬而未决的感觉，常解决到 G。',
    songs: [
      { title: '天黑黑', artist: '孙燕姿 (Stefanie Sun)', chordProgression: ['Gsus4', 'G', 'C', 'D'], lyric: '天黑黑 欲落雨 天黑黑 黑黑' },
      { title: '后来的我们', artist: '五月天 (Mayday)', chordProgression: ['G', 'Gsus4', 'G', 'C'], lyric: '后来的我们什么都有了 却没有了我们' },
      { title: '你好不好', artist: '周兴哲 (Eric Chou)', chordProgression: ['G', 'Gsus4', 'Em', 'C'], lyric: '好久不见 你还好不好' }
    ]
  },
  {
    day: 23,
    name: 'Dsus2',
    type: 'Suspended 2nd',
    notes: ['D4', 'E4', 'A4'],
    description: '挂二和弦，用二音 (Mi) 替代了三音。空灵飘渺，常用在前奏。',
    songs: [
      { title: '拥抱', artist: '五月天 (Mayday)', chordProgression: ['G', 'Dsus2', 'Em', 'C'], lyric: '谁能够 不带伤的飞翔' },
      { title: '知足', artist: '五月天 (Mayday)', chordProgression: ['C', 'G', 'Dsus2', 'Am'], lyric: '当一阵风吹来 风筝飞上天空' },
      { title: '我不愿让你一个人', artist: '五月天 (Mayday)', chordProgression: ['G', 'Dsus2', 'Em', 'C'], lyric: '你说呢 是否我们都不够成熟' }
    ]
  },
  {
    day: 24,
    name: 'F/C',
    type: 'Slash Chord',
    notes: ['C3', 'F3', 'A3', 'C4'],
    description: 'F 和弦的转位，以 C 为低音。让低音线条更平滑。',
    songs: [
      { title: '晴天', artist: '周杰伦 (Jay Chou)', chordProgression: ['C', 'G', 'Am', 'F/C'], lyric: '刮风这天 我试过握着你手' },
      { title: '情非得已', artist: '庾澄庆 (Harlem Yu)', chordProgression: ['C', 'Am', 'F/C', 'G'], lyric: '只怕我自己会爱上你' },
      { title: '小幸运', artist: '田馥甄 (Hebe)', chordProgression: ['C', 'G', 'Am', 'F/C'], lyric: '与你相遇 好幸运' }
    ]
  },
  {
    day: 25,
    name: 'G/B',
    type: 'Slash Chord',
    notes: ['B3', 'D4', 'G4'],
    description: 'G 和弦的转位，以 B 为低音。常用于 C → G/B → Am 的经典下行低音线。',
    songs: [
      { title: '小幸运', artist: '田馥甄 (Hebe)', chordProgression: ['C', 'G/B', 'Am', 'F'], lyric: '你是我心中最美的风景' },
      { title: '后来', artist: '刘若英 (René Liu)', chordProgression: ['C', 'G/B', 'Am', 'F'], lyric: '栀子花 白花瓣 落在我蓝色百褶裙上' },
      { title: '知足', artist: '五月天 (Mayday)', chordProgression: ['C', 'G/B', 'Am', 'F'], lyric: '怎么去拥有一片天空' }
    ]
  },
  {
    day: 26,
    name: 'Bb',
    type: 'Major',
    notes: ['Bb3', 'D4', 'F4'],
    description: '降 B 大调和弦。在 F 大调中是 IV 级和弦，增加歌曲的丰富度。',
    songs: [
      { title: '泡沫', artist: '邓紫棋 (G.E.M.)', chordProgression: ['Dm', 'Bb', 'F', 'C'], lyric: '阳光下的泡沫 是彩色的' },
      { title: '喜欢你', artist: 'Beyond', chordProgression: ['F', 'Bb', 'C', 'F'], lyric: '细雨带风湿透黄昏的街道' },
      { title: '光辉岁月', artist: 'Beyond', chordProgression: ['F', 'Dm', 'Bb', 'C'], lyric: '钟声响起归家的讯号' }
    ]
  },
  {
    day: 27,
    name: 'Eb',
    type: 'Major',
    notes: ['Eb4', 'G4', 'Bb4'],
    description: '降 E 大调和弦。在降调系统中很常见，适合温暖的抒情歌。',
    songs: [
      { title: '富士山下', artist: '陈奕迅 (Eason Chan)', chordProgression: ['Eb', 'Cm', 'Ab', 'Bb'], lyric: '谁能凭爱意要富士山私有' },
      { title: '十年', artist: '陈奕迅 (Eason Chan)', chordProgression: ['Eb', 'Bb', 'Cm', 'Ab'], lyric: '十年之后 我们是朋友 还可以问候' },
      { title: '淘汰', artist: '陈奕迅 (Eason Chan)', chordProgression: ['Ab', 'Eb', 'Bb', 'Cm'], lyric: '我说了所有的谎 你全都相信' }
    ]
  },
  {
    day: 28,
    name: 'Ab',
    type: 'Major',
    notes: ['Ab3', 'C4', 'Eb4'],
    description: '降 A 大调和弦。温暖而饱满，常出现在感性的段落中。',
    songs: [
      { title: '单身情歌', artist: '林志炫 (Terry Lin)', chordProgression: ['Ab', 'Eb', 'Fm', 'Bb'], lyric: '抓不住爱情的我 总是眼睁睁看它溜走' },
      { title: '我怀念的', artist: '孙燕姿 (Stefanie Sun)', chordProgression: ['Ab', 'Eb', 'Bb', 'Cm'], lyric: '我怀念的 是无话不说' },
      { title: '如果没有你', artist: '莫文蔚 (Karen Mok)', chordProgression: ['Ab', 'Eb', 'Fm', 'Db'], lyric: '如果没有你 日子怎么过' }
    ]
  },
  {
    day: 29,
    name: 'Bdim',
    type: 'Diminished',
    notes: ['B3', 'D4', 'F4'],
    description: '减三和弦，紧张不安的音响效果。常用在经过性的和弦进行中。',
    songs: [
      { title: '夜曲', artist: '周杰伦 (Jay Chou)', chordProgression: ['Am', 'Bdim', 'C', 'G'], lyric: '一群嗜血的蚂蚁 被腐肉所吸引' },
      { title: '黑色幽默', artist: '周杰伦 (Jay Chou)', chordProgression: ['C', 'Bdim', 'Am', 'G'], lyric: '难过的痛 哭不出来 笑也没有声音' },
      { title: '搁浅', artist: '周杰伦 (Jay Chou)', chordProgression: ['C', 'Bdim', 'Am', 'F'], lyric: '这爱情已经搁浅' }
    ]
  },
  {
    day: 30,
    name: 'Fm',
    type: 'Minor',
    notes: ['F3', 'Ab3', 'C4'],
    description: 'F 小调和弦。用来替代 F 大调时，能带来意想不到的忧伤转折。',
    songs: [
      { title: '我只在乎你', artist: '邓丽君 (Teresa Teng)', chordProgression: ['C', 'F', 'Fm', 'G'], lyric: '如果没有遇见你 我将会是在哪里' },
      { title: '月半小夜曲', artist: '李克勤 (Hacken Lee)', chordProgression: ['C', 'Am', 'F', 'Fm'], lyric: '仍然倚在失眠夜 望天边星宿' },
      { title: '漂洋过海来看你', artist: '娃娃 (WaWa)', chordProgression: ['C', 'F', 'Fm', 'G'], lyric: '为你我用了半年的积蓄 漂洋过海的来看你' }
    ]
  }
];

// Note name to frequency mapping
const NOTE_FREQUENCIES = {
  'C3': 130.81, 'C#3': 138.59, 'Db3': 138.59, 'D3': 146.83, 'D#3': 155.56, 'Eb3': 155.56,
  'E3': 164.81, 'F3': 174.61, 'F#3': 185.00, 'Gb3': 185.00, 'G3': 196.00, 'G#3': 207.65,
  'Ab3': 207.65, 'A3': 220.00, 'A#3': 233.08, 'Bb3': 233.08, 'B3': 246.94,
  'C4': 261.63, 'C#4': 277.18, 'Db4': 277.18, 'D4': 293.66, 'D#4': 311.13, 'Eb4': 311.13,
  'E4': 329.63, 'F4': 349.23, 'F#4': 369.99, 'Gb4': 369.99, 'G4': 392.00, 'G#4': 415.30,
  'Ab4': 415.30, 'A4': 440.00, 'A#4': 466.16, 'Bb4': 466.16, 'B4': 493.88,
  'C5': 523.25
};

/**
 * Convert a note name (e.g. 'C4', 'F#3', 'Bb4') to jianpu (简谱) HTML.
 * Octave 4 = plain, octave 3 = dot below, octave 5 = dot above.
 */
function noteToJianpu(note) {
  const map = {
    'C': '1', 'D': '2', 'E': '3', 'F': '4',
    'G': '5', 'A': '6', 'B': '7'
  };
  // Parse note: letter + optional accidental + octave
  const m = note.match(/^([A-G])(#|b)?(\d)$/);
  if (!m) return '';
  const letter = m[1];
  const acc = m[2] || '';
  const octave = parseInt(m[3]);
  const num = map[letter];
  const prefix = acc === '#' ? '#' : acc === 'b' ? 'b' : '';

  if (octave <= 3) {
    return `<span class="jianpu"><span class="jp-num">${prefix}${num}</span><span class="jp-dot-below">.</span></span>`;
  } else if (octave >= 5) {
    return `<span class="jianpu"><span class="jp-dot-above">.</span><span class="jp-num">${prefix}${num}</span></span>`;
  }
  return `<span class="jianpu"><span class="jp-num">${prefix}${num}</span></span>`;
}

/** Plain-text jianpu for piano key labels */
function noteToJianpuText(note) {
  const map = {
    'C': '1', 'D': '2', 'E': '3', 'F': '4',
    'G': '5', 'A': '6', 'B': '7'
  };
  const m = note.match(/^([A-G])(#|b)?(\d)$/);
  if (!m) return '';
  const letter = m[1];
  const acc = m[2] || '';
  const octave = parseInt(m[3]);
  const num = map[letter];
  const prefix = acc === '#' ? '#' : acc === 'b' ? 'b' : '';
  return prefix + num;
}

/**
 * Chord name → notes lookup for progression playback.
 * Covers all 30 curriculum chords + extra chords appearing in song progressions.
 */
const CHORD_NOTES = {
  'C':     ['C4', 'E4', 'G4'],
  'G':     ['G3', 'B3', 'D4'],
  'Am':    ['A3', 'C4', 'E4'],
  'F':     ['F3', 'A3', 'C4'],
  'Em':    ['E3', 'G3', 'B3'],
  'Dm':    ['D4', 'F4', 'A4'],
  'D':     ['D4', 'F#4', 'A4'],
  'A':     ['A3', 'C#4', 'E4'],
  'E':     ['E3', 'G#3', 'B3'],
  'Bm':    ['B3', 'D4', 'F#4'],
  'C7':    ['C4', 'E4', 'G4', 'Bb4'],
  'G7':    ['G3', 'B3', 'D4', 'F4'],
  'D7':    ['D4', 'F#4', 'A4', 'C5'],
  'Am7':   ['A3', 'C4', 'E4', 'G4'],
  'Dm7':   ['D4', 'F4', 'A4', 'C5'],
  'Em7':   ['E3', 'G3', 'B3', 'D4'],
  'Fmaj7': ['F3', 'A3', 'C4', 'E4'],
  'Cmaj7': ['C4', 'E4', 'G4', 'B4'],
  'Bm7':   ['B3', 'D4', 'F#4', 'A4'],
  'A7':    ['A3', 'C#4', 'E4', 'G4'],
  'Cadd9': ['C4', 'E4', 'G4', 'D5'],
  'Gsus4': ['G3', 'C4', 'D4'],
  'Dsus2': ['D4', 'E4', 'A4'],
  'F/C':   ['C3', 'F3', 'A3', 'C4'],
  'G/B':   ['B3', 'D4', 'G4'],
  'Bb':    ['Bb3', 'D4', 'F4'],
  'Eb':    ['Eb4', 'G4', 'Bb4'],
  'Ab':    ['Ab3', 'C4', 'Eb4'],
  'Bdim':  ['B3', 'D4', 'F4'],
  'Fm':    ['F3', 'Ab3', 'C4'],
  // Extra chords from song progressions
  'B':     ['B3', 'D#4', 'F#4'],
  'F#m':   ['F#3', 'A3', 'C#4'],
  'C#m':   ['C#4', 'E4', 'G#4'],
  'E7':    ['E3', 'G#3', 'B3', 'D4'],
  'Cm':    ['C4', 'Eb4', 'G4'],
  'Db':    ['Db4', 'F4', 'Ab4'],
};

// Ordered list of all keys in the 2-octave range for piano rendering
const PIANO_KEYS = [
  { note: 'C3', type: 'white' }, { note: 'C#3', type: 'black' },
  { note: 'D3', type: 'white' }, { note: 'D#3', type: 'black' },
  { note: 'E3', type: 'white' },
  { note: 'F3', type: 'white' }, { note: 'F#3', type: 'black' },
  { note: 'G3', type: 'white' }, { note: 'G#3', type: 'black' },
  { note: 'A3', type: 'white' }, { note: 'A#3', type: 'black' },
  { note: 'B3', type: 'white' },
  { note: 'C4', type: 'white' }, { note: 'C#4', type: 'black' },
  { note: 'D4', type: 'white' }, { note: 'D#4', type: 'black' },
  { note: 'E4', type: 'white' },
  { note: 'F4', type: 'white' }, { note: 'F#4', type: 'black' },
  { note: 'G4', type: 'white' }, { note: 'G#4', type: 'black' },
  { note: 'A4', type: 'white' }, { note: 'A#4', type: 'black' },
  { note: 'B4', type: 'white' },
  { note: 'C5', type: 'white' }
];
