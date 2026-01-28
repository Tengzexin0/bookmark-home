import googleIcon from '@/assets/icons/google_icon.svg';
import bingIcon from '@/assets/icons/bing_icon.svg';
import baiduIcon from '@/assets/icons/baidu_icon.svg';
import githubIcon from '@/assets/icons/github_icon.svg';
import joomlaIcon from '@/assets/icons/joomla_icon.svg'; // 站內的 icon

export interface Bookmark {
  name: string;
  url?: string;
  icon?: string;
  domain?: string;
  category?: string;
}

export const navItems = [
  'Home',
  'Mail & Domain',
  'Tools',
  'Ai-stuff',
  'Cloud',
  'Container',
  'Software',
  'Dev',
] as const;

export type NavItems = (typeof navItems)[number];
export type SearchEngine = (typeof searchEngines)[number];

export const searchEngines = [
  {
    label: 'Google',
    base: 'https://www.google.com/search?q=',
    icon: googleIcon,
  },
  {
    label: 'Bing',
    base: 'https://www.bing.com/search?q=',
    icon: bingIcon,
  },
  {
    label: '百度',
    base: 'https://www.baidu.com/s?wd=',
    icon: baiduIcon,
  },
  {
    label: 'github',
    base: 'https://github.com/search?q=',
    icon: githubIcon,
  },
  { label: '站内', base: '#', icon: joomlaIcon },
] as const;

const bookmarkHome: Bookmark[] = [
  {
    name: 'Youtube',
    domain: 'youtube.com',
    url: 'https://youtube.com',
    category: 'Home',
  },
  {
    name: 'GitHub',
    domain: 'github.com',
    url: 'https://github.com',
    category: 'Home',
  },
  {
    name: 'Sora',
    domain: 'https://sora.chatgpt.com',
    category: 'Home',
  },
  {
    name: 'Moontv',
    icon: '🎬',
    domain: 'https://moon-tv-chi-green-64.vercel.app',
    category: 'Home',
  },
  {
    name: 'deepwiki',
    domain: 'https://deepwiki.com/zhw2590582/ArtPlayer/1-overview',
    category: 'Home',
  },
  {
    name: 'NodeSeek',
    domain: 'nodeseek.com',
    url: 'https://www.nodeseek.com',
    category: 'Home',
  },
  {
    name: 'Linuxdo',
    domain: 'https://linux.do',
    category: 'Home',
  },
  {
    name: 'nodeloc',
    domain: 'https://www.nodeloc.com',
    category: 'Home',
  },
  {
    name: 'NeoDB',
    domain: 'https://neodb.social/discover',
    category: 'Home',
  },
];
const bookmarkMailDomain: Bookmark[] = [
  {
    name: 'Gmail',
    domain: 'https://mail.google.com',
    category: 'Mail & Domain',
  },
  {
    name: 'Outlook',
    domain: 'https://outlook.live.com',
    category: 'Mail & Domain',
  },
  {
    name: 'dnshe',
    domain: 'https://my.dnshe.com/clientarea.php',
    category: 'Mail & Domain',
  },
  {
    name: 'Sitelutions',
    domain: 'https://sitelutions.com',
    category: 'Mail & Domain',
  },
  {
    name: 'Dns he',
    domain:
      'https://dns.he.net/?hosted_dns_zoneid=1257683&menu=edit_zone&hosted_dns_editzone#',
    category: 'Mail & Domain',
  },
  {
    name: 'tunnelbroker',
    domain: 'https://tunnelbroker.net',
    category: 'Mail & Domain',
  },
  {
    name: 'bluu',
    domain: 'https://bluu.pl',
    category: 'Mail & Domain',
  },
  {
    name: 'cloudns',
    domain: 'https://www.cloudns.net',
    category: 'Mail & Domain',
  },
  {
    name: 'us kg',
    icon: '🐬',
    domain:
      'https://dash.domain.digitalplat.org/auth/login?next=%2Fpanel%2Fmain%3Fpage%3D%2Fpanel%2Foverview',
    category: 'Mail & Domain',
  },
  {
    name: 'Zone.id',
    domain: 'https://www.zone.id',
    category: 'Mail & Domain',
  },
  {
    name: 'Zoneabc',
    icon: '🐬',
    domain: 'https://zoneabc.net',
    category: 'Mail & Domain',
  },
  {
    name: 'dynv6',
    domain: 'https://dynv6.com',
    category: 'Mail & Domain',
  },
  {
    name: 'HiDNS',
    domain: 'https://www.hidoha.net',
    category: 'Mail & Domain',
  },
  {
    name: 'L53',
    domain: 'https://customer.l53.net',
    category: 'Mail & Domain',
  },
  {
    name: 'netlib',
    icon: '🐬',
    domain: 'https://www.netlib.re',
    category: 'Mail & Domain',
  },
  {
    name: 'Freedns',
    icon: '🐬',
    domain: 'https://freedns.fun',
    category: 'Mail & Domain',
  },
  {
    name: 'NameSilo',
    domain: 'www.namesilo.com',
    url: 'https://www.namesilo.com',
    category: 'Mail & Domain',
  },
  {
    name: 'Nic',
    domain: 'https://nic.ua/en',
    category: 'Mail & Domain',
  },
  {
    name: 'Spaceship',
    domain: 'https://www.spaceship.com',
    category: 'Mail & Domain',
  },
  {
    name: 'tempumail',
    domain: 'https://tempumail.com',
    category: 'Mail & Domain',
  },
  {
    name: 'etempmail',
    domain: 'https://etempmail.com/email?id=1',
    category: 'Mail & Domain',
  },
  {
    name: '临时邮箱',
    icon: '📨',
    domain: 'https://www.linshi-email.com',
    category: 'Mail & Domain',
  },
  {
    name: 'mffac',
    domain: 'https://www.mffac.com',
    category: 'Mail & Domain',
  },
];
const bookmarkTools: Bookmark[] = [
  {
    name: 'tzx订阅转换',
    icon: '🦀',
    domain: 'https://www.subweb-modify.zone.id',
    category: 'Tools',
  },
  {
    name: 'MISUB',
    icon: '🕸️',
    domain: 'https://misub.tzx.hidns.co',
    category: 'Tools',
  },
  {
    name: '短链接生成器',
    icon: '📎',
    domain: 'https://urls.tzxls.ggff.net',
    category: 'Tools',
  },
  {
    name: 'Base64编码转换',
    icon: '🐏',
    domain: 'www.tzxcc.zone.id',
    category: 'Tools',
  },
  {
    name: 'CF优选/网络信息',
    icon: '☁️',
    domain: 'https://ipcheckinfo.zone.id',
    category: 'Tools',
  },
  { name: 'ip.sb', domain: 'ip.sb', url: 'https://ip.sb', category: 'Tools' },
  {
    name: 'smser',
    domain: 'https://smser.net',
    category: 'Tools',
  },
  {
    name: 'itdog-在线ping',
    domain: 'https://www.itdog.cn/tcping',
    category: 'Tools',
  },
  {
    name: 'ping0',
    domain: 'https://ping0.cc',
    category: 'Tools',
  },
  {
    name: 'US地址生成',
    icon: '🐏',
    domain: 'https://www.ssnzk.com',
    category: 'Tools',
  },
  {
    name: 'US地址生成',
    domain: 'https://ratenn.com/american.html',
    category: 'Tools',
  },
  {
    name: 'ip查询网',
    domain: 'https://site.ip138.com/13.230.34.30',
    category: 'Tools',
  },
  {
    name: '文本图标生成',
    domain: 'https://favicon.io/favicon-generator',
    category: 'Tools',
  },
  {
    name: '图标库',
    domain: 'https://icon-icons.com',
    category: 'Tools',
  },
];
const bookmarkCloud: Bookmark[] = [
  {
    name: 'Cloudflare',
    domain: 'https://dash.cloudflare.com',
    category: 'Cloud',
  },
  {
    name: 'zeabur',
    domain: 'https://zeabur.com',
    category: 'Cloud',
  },
  {
    name: 'clawcloud',
    domain: 'https://claw.cloud',
    category: 'Cloud',
  },
  {
    name: 'Huggingface',
    domain: 'https://huggingface.co',
    category: 'Cloud',
  },
  {
    name: 'vercel',
    domain: 'https://vercel.com',
    category: 'Cloud',
  },
];
const bookmarkDev: Bookmark[] = [
  {
    name: '佬王专属页',
    domain: 'https://nav.eooce.com',
    category: 'Dev',
  },
  {
    name: 'CF优选域名',
    domain: 'https://cf.090227.xyz',
    category: 'Dev',
  },
  {
    name: 'CF IP优选排名',
    domain: 'https://blog.upx8.com/app/cfip',
    category: 'Dev',
  },
  {
    name: 'CF优选IPV4地址',
    domain: 'https://www.wetest.vip/page/cloudflare/address_v4.html',
    category: 'Dev',
  },
  {
    name: 'CF优选IP',
    domain: 'https://stock.hostmonit.com/CloudFlareYes',
    category: 'Dev',
  },
  {
    name: 'zrf博客',
    domain: 'https://blog.zrf.me/p/Cloudflare-Snippets',
    category: 'Dev',
  },
  {
    name: '天诚订阅部署面板',
    icon: '🐬',
    domain: 'https://snis.sosorg.nyc.mn',
    category: 'Dev',
  },
  {
    name: 'senflare节点订阅',
    icon: '🐬',
    domain: 'https://www.senflarelink.de5.net/user',
    category: 'Dev',
  },
  {
    name: 'ccfly节点订阅',
    icon: '🐬',
    domain: 'https://ccfly.me/user#account',
    category: 'Dev',
  },
  {
    name: 'ECH-CF',
    domain: 'https://github.com/ethgan/ECH-CF',
    category: 'Dev',
  },
  {
    name: 'newsnow',
    domain: 'https://github.com/ourongxing/newsnow',
    category: 'Dev',
  },
  {
    name: 'CF IP优选',
    icon: '🍁',
    domain: 'https://vpn.vpnc.eu.org',
    category: 'Dev',
  },
];

export const bookmarks: Bookmark[] = [
  ...bookmarkHome,
  ...bookmarkMailDomain,
  ...bookmarkTools,
  ...bookmarkCloud,
  ...bookmarkDev,
];

export { googleIcon, bingIcon, baiduIcon, githubIcon, joomlaIcon };
