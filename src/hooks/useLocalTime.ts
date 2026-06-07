import { useState, useEffect, useCallback } from 'react';

export interface TimeInfo {
  localTime: string;
  localDate: string;
  localTimezone: string;
  offset: string;
  city: string;
  country: string;
}

function getUserTimezone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

function getTimezoneOffsetName(timezone: string): string {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    timeZoneName: 'shortOffset',
  });
  const parts = formatter.formatToParts(now);
  const offsetPart = parts.find(p => p.type === 'timeZoneName');
  return offsetPart?.value || '';
}

function getCityFromTimezone(timezone: string): { city: string; country: string } {
  const mapping: Record<string, { city: string; country: string }> = {
    'Asia/Shanghai': { city: '上海', country: '中国' },
    'Asia/Beijing': { city: '北京', country: '中国' },
    'Asia/Hong_Kong': { city: '香港', country: '中国' },
    'Asia/Taipei': { city: '台北', country: '中国' },
    'Asia/Tokyo': { city: '东京', country: '日本' },
    'Asia/Seoul': { city: '首尔', country: '韩国' },
    'Asia/Singapore': { city: '新加坡', country: '新加坡' },
    'Asia/Bangkok': { city: '曼谷', country: '泰国' },
    'Asia/Dubai': { city: '迪拜', country: '阿联酋' },
    'Asia/Kolkata': { city: '新德里', country: '印度' },
    'Asia/Jakarta': { city: '雅加达', country: '印尼' },
    'Asia/Manila': { city: '马尼拉', country: '菲律宾' },
    'Asia/Kuala_Lumpur': { city: '吉隆坡', country: '马来西亚' },
    'Asia/Ho_Chi_Minh': { city: '胡志明市', country: '越南' },
    'Europe/London': { city: '伦敦', country: '英国' },
    'Europe/Paris': { city: '巴黎', country: '法国' },
    'Europe/Berlin': { city: '柏林', country: '德国' },
    'Europe/Madrid': { city: '马德里', country: '西班牙' },
    'Europe/Rome': { city: '罗马', country: '意大利' },
    'Europe/Amsterdam': { city: '阿姆斯特丹', country: '荷兰' },
    'Europe/Moscow': { city: '莫斯科', country: '俄罗斯' },
    'Europe/Istanbul': { city: '伊斯坦布尔', country: '土耳其' },
    'America/New_York': { city: '纽约', country: '美国' },
    'America/Los_Angeles': { city: '洛杉矶', country: '美国' },
    'America/Chicago': { city: '芝加哥', country: '美国' },
    'America/Denver': { city: '丹佛', country: '美国' },
    'America/Toronto': { city: '多伦多', country: '加拿大' },
    'America/Vancouver': { city: '温哥华', country: '加拿大' },
    'America/Mexico_City': { city: '墨西哥城', country: '墨西哥' },
    'America/Sao_Paulo': { city: '圣保罗', country: '巴西' },
    'America/Buenos_Aires': { city: '布宜诺斯艾利斯', country: '阿根廷' },
    'America/Lima': { city: '利马', country: '秘鲁' },
    'Australia/Sydney': { city: '悉尼', country: '澳大利亚' },
    'Australia/Melbourne': { city: '墨尔本', country: '澳大利亚' },
    'Pacific/Auckland': { city: '奥克兰', country: '新西兰' },
    'Africa/Cairo': { city: '开罗', country: '埃及' },
    'Africa/Lagos': { city: '拉各斯', country: '尼日利亚' },
    'Africa/Johannesburg': { city: '约翰内斯堡', country: '南非' },
  };

  return mapping[timezone] || { city: timezone.split('/').pop()?.replace('_', ' ') || timezone, country: '' };
}

export function convertToLocalTime(dateStr: string, timeStr: string, sourceTimezone: string): TimeInfo {
  const tz = getUserTimezone();
  const { city, country } = getCityFromTimezone(tz);

  // Parse source time as if it's in the source timezone
  const [year, month, day] = dateStr.split('-').map(Number);
  const [hour, minute] = timeStr.split(':').map(Number);

  const date = new Date(year, month - 1, day, hour, minute);
  const sourceOffset = getTimezoneOffsetName(sourceTimezone);
  const localOffset = getTimezoneOffsetName(tz);

  // Create a proper ISO string with source timezone offset
  const sourceDateStr = `${dateStr}T${timeStr}:00`;

  // Convert to local time
  const localFormatter = new Intl.DateTimeFormat('zh-CN', {
    timeZone: tz,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  // Parse the date assuming it's America/New_York (EDT) for World Cup
  const sourceDate = new Date(sourceDateStr + '-04:00');
  const localParts = localFormatter.formatToParts(sourceDate);

  const getPart = (type: string) => localParts.find(p => p.type === type)?.value || '';

  return {
    localDate: `${getPart('year')}-${getPart('month')}-${getPart('day')}`,
    localTime: `${getPart('hour')}:${getPart('minute')}`,
    localTimezone: tz,
    offset: `${localOffset}`,
    city,
    country,
  };
}

export function useLocalTime() {
  const [timezone, setTimezone] = useState(getUserTimezone());
  const [location, setLocation] = useState(getCityFromTimezone(getUserTimezone()));

  useEffect(() => {
    const tz = getUserTimezone();
    setTimezone(tz);
    setLocation(getCityFromTimezone(tz));
  }, []);

  const formatMatchTime = useCallback((dateStr: string, timeStr: string, sourceTz: string = 'America/New_York') => {
    return convertToLocalTime(dateStr, timeStr, sourceTz);
  }, []);

  return { timezone, location, formatMatchTime };
}

export function getRelativeTime(dateStr: string, timeStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number);
  const [hour, minute] = timeStr.split(':').map(Number);
  const matchDate = new Date(year, month - 1, day, hour, minute);
  const now = new Date();
  const diff = matchDate.getTime() - now.getTime();

  if (diff < 0) return '已结束';

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (days > 0) return `${days}天 ${hours}小时后`;
  if (hours > 0) return `${hours}小时 ${minutes}分钟后`;
  return `${minutes}分钟后`;
}
