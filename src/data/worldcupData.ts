import type { Team, Match } from '../types';

export const teams: Team[] = [
  // A组
  { id: 'arg', name: '阿根廷', nameEn: 'Argentina', flag: '🇦🇷', continent: '南美洲', fifaRank: 1, group: 'A', titles: 3, bestResult: '冠军 (1978, 1986, 2022)', description: '2022年卡塔尔世界杯卫冕冠军，拥有梅西等世界级球星，南美洲足球霸主。', starPlayers: ['梅西', '阿尔瓦雷斯', '恩佐·费尔南德斯', '麦卡利斯特'], coach: '斯卡洛尼' },
  { id: 'swe', name: '瑞典', nameEn: 'Sweden', flag: '🇸🇪', continent: '欧洲', fifaRank: 24, group: 'A', titles: 0, bestResult: '亚军 (1958)', description: '北欧劲旅，身体对抗出色，曾培养出伊布拉希莫维奇等传奇球星。', starPlayers: ['伊萨克', '库卢塞夫斯基', '林德洛夫', '埃兰加'], coach: '安德松' },
  { id: 'cmr', name: '喀麦隆', nameEn: 'Cameroon', flag: '🇨🇲', continent: '非洲', fifaRank: 45, group: 'A', titles: 0, bestResult: '8强 (1990)', description: '非洲雄狮，以激情和身体天赋著称，曾创造非洲球队世界杯最佳战绩。', starPlayers: ['奥纳纳', '阿布巴卡尔', '姆贝莫', '恩查姆'], coach: '里戈贝特·宋' },
  { id: 'nzl', name: '新西兰', nameEn: 'New Zealand', flag: '🇳🇿', continent: '大洋洲', fifaRank: 94, group: 'A', titles: 0, bestResult: '小组赛', description: '大洋洲霸主，首次以独立名额参加世界杯，实力相对较弱但斗志顽强。', starPlayers: ['伍德', '卡卡切', '刘易斯'], coach: '达克尼什' },
  // B组
  { id: 'fra', name: '法国', nameEn: 'France', flag: '🇫🇷', continent: '欧洲', fifaRank: 2, group: 'B', titles: 2, bestResult: '冠军 (1998, 2018)', description: '2018年世界杯冠军，人才济济，拥有姆巴佩等超级巨星，实力强劲。', starPlayers: ['姆巴佩', '格列兹曼', '登贝莱', '楚阿梅尼'], coach: '德尚' },
  { id: 'kor', name: '韩国', nameEn: 'South Korea', flag: '🇰🇷', continent: '亚洲', fifaRank: 23, group: 'B', titles: 0, bestResult: '4强 (2002)', description: '亚洲足球劲旅，以奔跑能力和团队协作著称，拥有孙兴慜等欧洲顶级球星。', starPlayers: ['孙兴慜', '李刚仁', '金玟哉', '黄喜灿'], coach: '洪明甫' },
  { id: 'jam', name: '牙买加', nameEn: 'Jamaica', flag: '🇯🇲', continent: '中北美', fifaRank: 58, group: 'B', titles: 0, bestResult: '小组赛', description: '加勒比海盗，中北美新军，以速度和身体素质见长。', starPlayers: ['安东尼奥', '贝利', '尼科尔森'], coach: '霍尔格里姆松' },
  { id: 'slo', name: '斯洛文尼亚', nameEn: 'Slovenia', flag: '🇸🇮', continent: '欧洲', fifaRank: 56, group: 'B', titles: 0, bestResult: '小组赛', description: '中欧小国，2002年世界杯曾给人留下深刻印象，门将位置实力不俗。', starPlayers: ['奥布拉克', '塞斯科', '洛夫里奇'], coach: '凯克' },
  // C组
  { id: 'bra', name: '巴西', nameEn: 'Brazil', flag: '🇧🇷', continent: '南美洲', fifaRank: 5, group: 'C', titles: 5, bestResult: '冠军 (1958, 1962, 1970, 1994, 2002)', description: '五星巴西，世界杯历史上最成功的球队，桑巴足球的代表，技术华丽。', starPlayers: ['维尼修斯', '罗德里戈', '马尔基尼奥斯', '阿利松'], coach: '多里瓦尔' },
  { id: 'den', name: '丹麦', nameEn: 'Denmark', flag: '🇩🇰', continent: '欧洲', fifaRank: 19, group: 'C', titles: 0, bestResult: '8强 (1998)', description: '北欧童话，战术纪律严明，团队配合默契，是欧洲不可小觑的力量。', starPlayers: ['霍伊伦', '埃里克森', '霍伊别尔', '克里斯滕森'], coach: '吕斯特吕普' },
  { id: 'chn', name: '中国', nameEn: 'China', flag: '🇨🇳', continent: '亚洲', fifaRank: 88, group: 'C', titles: 0, bestResult: '小组赛 (2002)', description: '中国男足时隔24年再度晋级世界杯，举国关注，承载着亿万球迷的梦想。', starPlayers: ['武磊', '张玉宁', '韦世豪', '蒋光太'], coach: '布兰科·伊万科维奇' },
  { id: 'par', name: '巴拉圭', nameEn: 'Paraguay', flag: '🇵🇾', continent: '南美洲', fifaRank: 48, group: 'C', titles: 0, bestResult: '8强 (2010)', description: '南美传统劲旅，防守硬朗，反击犀利，曾多次闯入世界杯淘汰赛。', starPlayers: ['阿尔米隆', '萨纳夫里亚', '维拉桑蒂'], coach: '加内罗' },
  // D组
  { id: 'eng', name: '英格兰', nameEn: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', continent: '欧洲', fifaRank: 4, group: 'D', titles: 1, bestResult: '冠军 (1966)', description: '现代足球发源地，近年人才井喷，连续两届世界杯杀入四强，剑指冠军。', starPlayers: ['凯恩', '贝林厄姆', '福登', '萨卡'], coach: '图赫尔' },
  { id: 'mex', name: '墨西哥', nameEn: 'Mexico', flag: '🇲🇽', continent: '中北美', fifaRank: 15, group: 'D', titles: 0, bestResult: '8强 (1970, 1986)', description: '2026年世界杯主办国之一，中北美足球霸主，连续多届杀入16强。', starPlayers: ['阿尔瓦雷斯', '希门尼斯', '埃德松·阿尔瓦雷斯'], coach: '洛萨诺' },
  { id: 'egy', name: '埃及', nameEn: 'Egypt', flag: '🇪🇬', continent: '非洲', fifaRank: 36, group: 'D', titles: 0, bestResult: '小组赛', description: '非洲法老，拥有萨拉赫等顶级球星，技术细腻，是非洲杯常客。', starPlayers: ['萨拉赫', '马尔穆什', '埃尔内尼'], coach: '哈桑' },
  { id: 'jpn', name: '日本', nameEn: 'Japan', flag: '🇯🇵', continent: '亚洲', fifaRank: 18, group: 'D', titles: 0, bestResult: '16强 (2002, 2010, 2018, 2022)', description: '亚洲足球标杆，战术执行力极强，近年多次击败欧洲和南美强队。', starPlayers: ['三笘薰', '久保建英', '富安健洋', '远藤航'], coach: '森保一' },
  // E组
  { id: 'ger', name: '德国', nameEn: 'Germany', flag: '🇩🇪', continent: '欧洲', fifaRank: 10, group: 'E', titles: 4, bestResult: '冠军 (1954, 1974, 1990, 2014)', description: '四星德国，日耳曼战车的严谨与效率，世界杯历史上最稳定的强队之一。', starPlayers: ['穆西亚拉', '哈弗茨', '基米希', '维尔茨'], coach: '纳格尔斯曼' },
  { id: 'usa', name: '美国', nameEn: 'USA', flag: '🇺🇸', continent: '中北美', fifaRank: 13, group: 'E', titles: 0, bestResult: '季军 (1930)', description: '2026年世界杯主办国之一，足球发展迅速，拥有多名效力欧洲五大联赛的球员。', starPlayers: ['普利西奇', '巴洛贡', '麦肯尼', '雷纳'], coach: '波切蒂诺' },
  { id: 'mar', name: '摩洛哥', nameEn: 'Morocco', flag: '🇲🇦', continent: '非洲', fifaRank: 14, group: 'E', titles: 0, bestResult: '4强 (2022)', description: '2022年世界杯黑马，历史性闯入四强，防守反击战术堪称教科书级别。', starPlayers: ['阿什拉夫', '齐耶赫', '阿姆拉巴特', '恩内斯里'], coach: '雷格拉吉' },
  { id: 'ecu', name: '厄瓜多尔', nameEn: 'Ecuador', flag: '🇪🇨', continent: '南美洲', fifaRank: 31, group: 'E', titles: 0, bestResult: '16强', description: '南美高原雄鹰，主场优势明显，2022年世界杯表现令人印象深刻。', starPlayers: ['凯塞多', '恩纳·瓦伦西亚', '因卡皮耶'], coach: '桑切斯' },
  // F组
  { id: 'esp', name: '西班牙', nameEn: 'Spain', flag: '🇪🇸', continent: '欧洲', fifaRank: 3, group: 'F', titles: 1, bestResult: '冠军 (2010)', description: '斗牛士军团，传控足球鼻祖，2024年欧洲杯冠军，新生代球员实力强劲。', starPlayers: ['亚马尔', '佩德里', '罗德里', '威廉姆斯'], coach: '德拉富恩特' },
  { id: 'can', name: '加拿大', nameEn: 'Canada', flag: '🇨🇦', continent: '中北美', fifaRank: 40, group: 'F', titles: 0, bestResult: '小组赛 (1986, 2022)', description: '2026年世界杯主办国之一，近年足球水平突飞猛进，拥有戴维斯等明星球员。', starPlayers: ['阿方索·戴维斯', '乔纳森·戴维', '布坎南'], coach: '马什' },
  { id: 'civ', name: '科特迪瓦', nameEn: 'Ivory Coast', flag: '🇨🇮', continent: '非洲', fifaRank: 42, group: 'F', titles: 0, bestResult: '小组赛', description: '非洲大象，身体素质出众，曾拥有德罗巴、亚亚·图雷等传奇球星。', starPlayers: ['扎哈', '桑加雷', '福法纳'], coach: '埃默塞·法埃' },
  { id: 'uzb', name: '乌兹别克斯坦', nameEn: 'Uzbekistan', flag: '🇺🇿', continent: '亚洲', fifaRank: 64, group: 'F', titles: 0, bestResult: '首次参赛', description: '中亚足球代表，历史上首次闯入世界杯决赛圈，技术细腻战术灵活。', starPlayers: ['肖穆罗多夫', '马沙里波夫', '图赫塔胡贾耶夫'], coach: '卡塔尼奇' },
  // G组
  { id: 'por', name: '葡萄牙', nameEn: 'Portugal', flag: '🇵🇹', continent: '欧洲', fifaRank: 7, group: 'G', titles: 0, bestResult: '季军 (1966)', description: '新黄金一代崛起，C罗之后的葡萄牙依然星光熠熠，欧洲杯卫冕冠军。', starPlayers: ['C罗', '莱奥', 'B费', 'B席'], coach: '马丁内斯' },
  { id: 'irn', name: '伊朗', nameEn: 'Iran', flag: '🇮🇷', continent: '亚洲', fifaRank: 20, group: 'G', titles: 0, bestResult: '小组赛', description: '波斯铁骑，亚洲传统强队，身体对抗出色，防守坚韧。', starPlayers: ['塔雷米', '阿兹蒙', '贾汉巴赫什'], coach: '阿米尔·加莱诺伊' },
  { id: 'gha', name: '加纳', nameEn: 'Ghana', flag: '🇬🇭', continent: '非洲', fifaRank: 68, group: 'G', titles: 0, bestResult: '8强 (2010)', description: '非洲黑星，速度和爆发力惊人，2010年世界杯险些创造历史。', starPlayers: ['库杜斯', '帕尔特伊', '阿尤'], coach: '克里斯·休顿' },
  { id: 'svk', name: '斯洛伐克', nameEn: 'Slovakia', flag: '🇸🇰', continent: '欧洲', fifaRank: 43, group: 'G', titles: 0, bestResult: '16强 (2010)', description: '中欧球队，独立后首次参加2010世界杯即晋级16强，防守反击见长。', starPlayers: ['什克里尼亚尔', '哈姆西克', '洛博特卡'], coach: '卡尔佐纳' },
  // H组
  { id: 'ned', name: '荷兰', nameEn: 'Netherlands', flag: '🇳🇱', continent: '欧洲', fifaRank: 6, group: 'H', titles: 0, bestResult: '亚军 (1974, 1978, 2010)', description: '橙衣军团，全攻全守足球的代表，三次世界杯亚军，无冕之王。', starPlayers: ['范戴克', '加克波', '德容', '西蒙斯'], coach: '科曼' },
  { id: 'sen', name: '塞内加尔', nameEn: 'Senegal', flag: '🇸🇳', continent: '非洲', fifaRank: 17, group: 'H', titles: 0, bestResult: '8强 (2022)', description: '特兰加雄狮，2022年非洲杯冠军，拥有马内等世界级球员，非洲最强球队之一。', starPlayers: ['马内', '萨尔', '迪亚洛', '库利巴利'], coach: '阿利乌·西塞' },
  { id: 'srb', name: '塞尔维亚', nameEn: 'Serbia', flag: '🇷🇸', continent: '欧洲', fifaRank: 30, group: 'H', titles: 0, bestResult: '4强 (1930, 1962 作为南斯拉夫)', description: '巴尔干雄鹰，技术型球队，拥有多名效力欧洲顶级联赛的球星。', starPlayers: ['米特罗维奇', '弗拉霍维奇', '塔迪奇'], coach: '斯托伊科维奇' },
  { id: 'pan', name: '巴拿马', nameEn: 'Panama', flag: '🇵🇦', continent: '中北美', fifaRank: 72, group: 'H', titles: 0, bestResult: '小组赛 (2018)', description: '中北美黑马，2018年历史性首次晋级世界杯，虽败犹荣。', starPlayers: ['法哈多', '巴塞纳斯', '穆里略'], coach: '克里斯蒂安森' },
  // I组
  { id: 'ita', name: '意大利', nameEn: 'Italy', flag: '🇮🇹', continent: '欧洲', fifaRank: 9, group: 'I', titles: 4, bestResult: '冠军 (1934, 1938, 1982, 2006)', description: '四星意大利，混凝土防守的代表，2021年欧洲杯冠军，渴望重返世界杯巅峰。', starPlayers: ['巴雷拉', '基耶萨', '托纳利', '巴斯托尼'], coach: '斯帕莱蒂' },
  { id: 'uru', name: '乌拉圭', nameEn: 'Uruguay', flag: '🇺🇾', continent: '南美洲', fifaRank: 11, group: 'I', titles: 2, bestResult: '冠军 (1930, 1950)', description: '天蓝军团，首届世界杯冠军，虽是小国但足球底蕴深厚，防守凶悍。', starPlayers: ['巴尔韦德', '努涅斯', '阿劳霍', '本坦库尔'], coach: '贝尔萨' },
  { id: 'nig', name: '尼日利亚', nameEn: 'Nigeria', flag: '🇳🇬', continent: '非洲', fifaRank: 29, group: 'I', titles: 0, bestResult: '16强 (1994, 1998, 2014)', description: '非洲雄鹰，速度和身体素质出众，曾多次闯入世界杯淘汰赛。', starPlayers: ['奥斯梅恩', '卢克曼', '伊沃比'], coach: '菲尼迪·乔治' },
  { id: 'wal', name: '威尔士', nameEn: 'Wales', flag: '🏴󠁧󠁢󠁷󠁬󠁳󠁿', continent: '欧洲', fifaRank: 35, group: 'I', titles: 0, bestResult: '8强 (1958)', description: '红龙军团，贝尔时代曾辉煌一时，重返世界杯舞台展现韧性。', starPlayers: ['约翰逊', '威尔逊', '沃德-普劳斯'], coach: '贝拉米' },
  // J组
  { id: 'bel', name: '比利时', nameEn: 'Belgium', flag: '🇧🇪', continent: '欧洲', fifaRank: 8, group: 'J', titles: 0, bestResult: '季军 (2018)', description: '欧洲红魔，黄金一代的谢幕演出，依然拥有德布劳内等顶级球星。', starPlayers: ['德布劳内', '卢卡库', '多库', '特罗萨德'], coach: '特德斯科' },
  { id: 'cro', name: '克罗地亚', nameEn: 'Croatia', flag: '🇭🇷', continent: '欧洲', fifaRank: 12, group: 'J', titles: 0, bestResult: '亚军 (2018)', description: '格子军团，加时赛之王，2018年世界杯亚军，莫德里奇领衔的坚韧之师。', starPlayers: ['莫德里奇', '格瓦迪奥尔', '科瓦契奇', '佩里西奇'], coach: '达利奇' },
  { id: 'aus', name: '澳大利亚', nameEn: 'Australia', flag: '🇦🇺', continent: '亚洲', fifaRank: 25, group: 'J', titles: 0, bestResult: '16强 (2006)', description: '澳洲袋鼠，身体强壮拼抢积极，连续多届杀入世界杯正赛。', starPlayers: ['古德温', '博伊尔', '苏塔'], coach: '波波维奇' },
  { id: 'tun', name: '突尼斯', nameEn: 'Tunisia', flag: '🇹🇳', continent: '非洲', fifaRank: 41, group: 'J', titles: 0, bestResult: '小组赛', description: '迦太基之鹰，北非劲旅，技术细腻，曾多次参加世界杯。', starPlayers: ['姆萨克尼', '拉伊杜尼', '哈兹里'], coach: '卡德里' },
  // K组
  { id: 'col', name: '哥伦比亚', nameEn: 'Colombia', flag: '🇨🇴', continent: '南美洲', fifaRank: 16, group: 'K', titles: 0, bestResult: '8强 (2014)', description: '咖啡农，南美技术流代表，2014年世界杯J罗一战成名。', starPlayers: ['迪亚斯', 'J罗', '库德拉多', '阿里亚斯'], coach: '洛伦索' },
  { id: 'alg', name: '阿尔及利亚', nameEn: 'Algeria', flag: '🇩🇿', continent: '非洲', fifaRank: 34, group: 'K', titles: 0, bestResult: '16强 (2014)', description: '沙漠之狐，北非技术流球队，速度和反击犀利。', starPlayers: ['马赫雷斯', '本拉赫马', '本纳赛尔'], coach: '贝尔马迪' },
  { id: 'sui', name: '瑞士', nameEn: 'Switzerland', flag: '🇨🇭', continent: '欧洲', fifaRank: 22, group: 'K', titles: 0, bestResult: '8强 (1934, 1938, 1954)', description: '十字军团，防守稳固纪律严明，多次在世界杯中扮演巨人杀手。', starPlayers: ['扎卡', '沙奇里', '阿坎吉', '索默'], coach: '雅金' },
  { id: 'qat', name: '卡塔尔', nameEn: 'Qatar', flag: '🇶🇦', continent: '亚洲', fifaRank: 55, group: 'K', titles: 0, bestResult: '小组赛 (2022)', description: '2022年世界杯主办国，连续第二次参赛，以技术型足球为主。', starPlayers: ['阿菲夫', '阿里', '海多斯'], coach: '马尔克斯' },
  // L组
  { id: 'tur', name: '土耳其', nameEn: 'Turkey', flag: '🇹🇷', continent: '欧洲', fifaRank: 28, group: 'L', titles: 0, bestResult: '季军 (2002)', description: '星月军团，2002年世界杯季军，主场氛围狂热，进攻火力强劲。', starPlayers: ['居莱尔', '恰尔汗奥卢', '伊尔马兹', '阿克图尔科格鲁'], coach: '蒙特拉' },
  { id: 'ukr', name: '乌克兰', nameEn: 'Ukraine', flag: '🇺🇦', continent: '欧洲', fifaRank: 26, group: 'L', titles: 0, bestResult: '8强 (2006)', description: '东欧劲旅，2006年首次参赛即杀入8强，舍甫琴科之后的延续。', starPlayers: ['津琴科', '穆德里克', '亚尔莫连科'], coach: '雷布罗夫' },
  { id: 'ksa', name: '沙特阿拉伯', nameEn: 'Saudi Arabia', flag: '🇸🇦', continent: '亚洲', fifaRank: 53, group: 'L', titles: 0, bestResult: '16强 (1994)', description: '西亚绿鹰，1994年世界杯曾闯入16强，2022年爆冷击败阿根廷。', starPlayers: ['达瓦萨里', '谢赫里', '马尔基'], coach: '雷纳德' },
  { id: 'bol', name: '玻利维亚', nameEn: 'Bolivia', flag: '🇧🇴', continent: '南美洲', fifaRank: 78, group: 'L', titles: 0, bestResult: '小组赛', description: '高原之国，主场海拔优势巨大，首次以扩军后名额进入世界杯。', starPlayers: ['莫雷诺', '阿尔加拉尼亚斯'], coach: '维勒加斯' },
];

export const groups = ['A','B','C','D','E','F','G','H','I','J','K','L'];

export function getTeamById(id: string): Team | undefined {
  return teams.find(t => t.id === id);
}

export function getTeamsByGroup(group: string): Team[] {
  return teams.filter(t => t.group === group);
}

// 生成小组赛赛程
function generateGroupMatches(): Match[] {
  const matches: Match[] = [];
  const groupSchedule: Record<string, [string, string][]> = {};

  groups.forEach(g => {
    const gt = getTeamsByGroup(g);
    groupSchedule[g] = [
      [gt[0].id, gt[1].id],
      [gt[2].id, gt[3].id],
      [gt[0].id, gt[2].id],
      [gt[1].id, gt[3].id],
      [gt[0].id, gt[3].id],
      [gt[1].id, gt[2].id],
    ];
  });

  // 小组赛日期: 6月11日 - 6月24日
  const dates = [
    '2026-06-11', '2026-06-12', '2026-06-13', '2026-06-14',
    '2026-06-15', '2026-06-16', '2026-06-17', '2026-06-18',
    '2026-06-19', '2026-06-20', '2026-06-21', '2026-06-22',
    '2026-06-23', '2026-06-24',
  ];

  const times = ['14:00', '17:00', '20:00', '22:00'];
  const stadiums = [
    { name: '阿兹特克体育场', city: '墨西哥城', country: '墨西哥' },
    { name: '大都会人寿体育场', city: '纽约', country: '美国' },
    { name: 'AT&T体育场', city: '达拉斯', country: '美国' },
    { name: 'SoFi体育场', city: '洛杉矶', country: '美国' },
    { name: '硬石体育场', city: '迈阿密', country: '美国' },
    { name: '流明球场', city: '西雅图', country: '美国' },
    { name: 'BC Place', city: '温哥华', country: '加拿大' },
    { name: '蒙特利尔奥林匹克体育场', city: '蒙特利尔', country: '加拿大' },
    { name: '玫瑰碗', city: '洛杉矶', country: '美国' },
    { name: '吉列体育场', city: '波士顿', country: '美国' },
    { name: 'NRG体育场', city: '休斯顿', country: '美国' },
    { name: '李维斯体育场', city: '旧金山', country: '美国' },
    { name: '探索球场', city: '奥兰多', country: '美国' },
    { name: '联邦快递球场', city: '华盛顿', country: '美国' },
  ];

  let matchId = 1;
  let dateIdx = 0;

  for (let md = 1; md <= 3; md++) {
    for (const g of groups) {
      const pair = groupSchedule[g][(md - 1) * 2];
      const pair2 = groupSchedule[g][(md - 1) * 2 + 1];

      const stadium1 = stadiums[(matchId - 1) % stadiums.length];
      matches.push({
        id: `m${matchId}`,
        round: 'group',
        group: g,
        matchday: md,
        date: dates[dateIdx % dates.length],
        time: times[(matchId - 1) % times.length],
        timezone: 'UTC-4',
        stadium: stadium1.name,
        city: stadium1.city,
        country: stadium1.country,
        homeTeam: pair[0],
        awayTeam: pair[1],
        status: 'upcoming',
        prediction: { homeWin: Math.floor(Math.random() * 40) + 30, draw: Math.floor(Math.random() * 20) + 15, awayWin: Math.floor(Math.random() * 30) + 20 },
      });
      matchId++;

      const stadium2 = stadiums[(matchId - 1) % stadiums.length];
      matches.push({
        id: `m${matchId}`,
        round: 'group',
        group: g,
        matchday: md,
        date: dates[dateIdx % dates.length],
        time: times[(matchId - 1) % times.length],
        timezone: 'UTC-4',
        stadium: stadium2.name,
        city: stadium2.city,
        country: stadium2.country,
        homeTeam: pair2[0],
        awayTeam: pair2[1],
        status: 'upcoming',
        prediction: { homeWin: Math.floor(Math.random() * 40) + 30, draw: Math.floor(Math.random() * 20) + 15, awayWin: Math.floor(Math.random() * 30) + 20 },
      });
      matchId++;
      dateIdx++;
    }
  }

  return matches;
}

// 生成淘汰赛赛程
function generateKnockoutMatches(): Match[] {
  const matches: Match[] = [];
  const knockoutStadiums = [
    { name: '大都会人寿体育场', city: '纽约', country: '美国' },
    { name: 'AT&T体育场', city: '达拉斯', country: '美国' },
    { name: 'SoFi体育场', city: '洛杉矶', country: '美国' },
    { name: '硬石体育场', city: '迈阿密', country: '美国' },
    { name: '阿兹特克体育场', city: '墨西哥城', country: '墨西哥' },
    { name: 'BC Place', city: '温哥华', country: '加拿大' },
  ];

  // Round of 32: 6月27-30日
  const round32Dates = ['2026-06-27', '2026-06-28', '2026-06-29', '2026-06-30'];
  for (let i = 1; i <= 16; i++) {
    const s = knockoutStadiums[i % knockoutStadiums.length];
    matches.push({
      id: `r32-${i}`,
      round: 'round32',
      date: round32Dates[Math.floor((i - 1) / 4)],
      time: i % 2 === 0 ? '20:00' : '17:00',
      timezone: 'UTC-4',
      stadium: s.name,
      city: s.city,
      country: s.country,
      homeTeam: `Winner ${i}`,
      awayTeam: `Runner-up ${i}`,
      status: 'upcoming',
      prediction: { homeWin: 40, draw: 20, awayWin: 40 },
    });
  }

  // Round of 16: 7月2-5日
  const round16Dates = ['2026-07-02', '2026-07-03', '2026-07-04', '2026-07-05'];
  for (let i = 1; i <= 8; i++) {
    const s = knockoutStadiums[i % knockoutStadiums.length];
    matches.push({
      id: `r16-${i}`,
      round: 'round16',
      date: round16Dates[Math.floor((i - 1) / 2)],
      time: i % 2 === 0 ? '20:00' : '17:00',
      timezone: 'UTC-4',
      stadium: s.name,
      city: s.city,
      country: s.country,
      homeTeam: `Winner R32-${i * 2 - 1}`,
      awayTeam: `Winner R32-${i * 2}`,
      status: 'upcoming',
      prediction: { homeWin: 40, draw: 20, awayWin: 40 },
    });
  }

  // Quarter-finals: 7月8-9日
  const quarterDates = ['2026-07-08', '2026-07-09'];
  for (let i = 1; i <= 4; i++) {
    const s = knockoutStadiums[i % knockoutStadiums.length];
    matches.push({
      id: `qf-${i}`,
      round: 'quarter',
      date: quarterDates[Math.floor((i - 1) / 2)],
      time: i % 2 === 0 ? '20:00' : '17:00',
      timezone: 'UTC-4',
      stadium: s.name,
      city: s.city,
      country: s.country,
      homeTeam: `Winner R16-${i * 2 - 1}`,
      awayTeam: `Winner R16-${i * 2}`,
      status: 'upcoming',
      prediction: { homeWin: 40, draw: 20, awayWin: 40 },
    });
  }

  // Semi-finals: 7月12-13日
  for (let i = 1; i <= 2; i++) {
    const s = knockoutStadiums[i];
    matches.push({
      id: `sf-${i}`,
      round: 'semi',
      date: i === 1 ? '2026-07-12' : '2026-07-13',
      time: '20:00',
      timezone: 'UTC-4',
      stadium: s.name,
      city: s.city,
      country: s.country,
      homeTeam: `Winner QF-${i * 2 - 1}`,
      awayTeam: `Winner QF-${i * 2}`,
      status: 'upcoming',
      prediction: { homeWin: 40, draw: 20, awayWin: 40 },
    });
  }

  // Final: 7月19日
  matches.push({
    id: 'final',
    round: 'final',
    date: '2026-07-19',
    time: '20:00',
    timezone: 'UTC-4',
    stadium: '大都会人寿体育场',
    city: '纽约',
    country: '美国',
    homeTeam: 'Winner SF-1',
    awayTeam: 'Winner SF-2',
    status: 'upcoming',
    prediction: { homeWin: 40, draw: 20, awayWin: 40 },
  });

  // Third place: 7月18日
  matches.push({
    id: 'third',
    round: 'third',
    date: '2026-07-18',
    time: '17:00',
    timezone: 'UTC-4',
    stadium: 'AT&T体育场',
    city: '达拉斯',
    country: '美国',
    homeTeam: 'Loser SF-1',
    awayTeam: 'Loser SF-2',
    status: 'upcoming',
    prediction: { homeWin: 40, draw: 20, awayWin: 40 },
  });

  return matches;
}

export const allMatches: Match[] = [...generateGroupMatches(), ...generateKnockoutMatches()];

export const roundLabels: Record<string, string> = {
  group: '小组赛',
  round32: '32强赛',
  round16: '16强赛',
  quarter: '1/4决赛',
  semi: '半决赛',
  final: '决赛',
  third: '季军赛',
};

export const roundOrder = ['group', 'round32', 'round16', 'quarter', 'semi', 'third', 'final'];
