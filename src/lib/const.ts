import googleIcon from '@/assets/icons/google_icon.svg';
import bingIcon from '@/assets/icons/bing_icon.svg';
import baiduIcon from '@/assets/icons/baidu_icon.svg';
import githubIcon from '@/assets/icons/github_icon.svg';
import joomlaIcon from '@/assets/icons/joomla_icon.svg'; // 站內的 icon

export interface Bookmark {
  name: string;
  domain: string;
  url?: string;
  icon?: string;
  category?: string;
}

export const navItems = [
  'Home',
  'Tools',
  'Ai-stuff',
  'Cloud',
  'Container',
  'Software',
  'Dev',
  'Mail & Domain',
] as const;

export type NavItems = (typeof navItems)[number];
export type SearchEngine = (typeof searchEngines)[number];

export type GistData = Partial<Record<NavItems, Bookmark[]>>;

export const GIST_URL = `https://gist.githubusercontent.com/Tengzexin0/8954a8f73d83c29ce2d87fbdd85431b0/raw/bookmarks.json`;

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
    domain: 'sora.chatgpt.com',
    url: 'https://sora.chatgpt.com',
    category: 'Home',
  },
  {
    name: 'Moontv',
    icon: '🎬',
    domain: 'moon-tv-chi-green-64.vercel.app',
    url: 'https://moon-tv-chi-green-64.vercel.app',
    category: 'Home',
  },
  {
    name: 'deepwiki',
    domain: 'deepwiki.com',
    url: 'https://deepwiki.com/zhw2590582/ArtPlayer/1-overview',
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
    domain: 'linux.do',
    url: 'https://linux.do',
    category: 'Home',
  },
  {
    name: 'nodeloc',
    domain: 'www.nodeloc.com',
    url: 'https://www.nodeloc.com',
    category: 'Home',
  },
  {
    name: 'NeoDB',
    domain: 'neodb.social',
    url: 'https://neodb.social/discover',
    category: 'Home',
  },
];
const bookmarkMailDomain: Bookmark[] = [
  {
    name: 'Gmail',
    domain: 'mail.google.com',
    url: 'https://mail.google.com',
    category: 'Mail & Domain',
  },
  {
    name: 'Outlook',
    domain: 'outlook.live.com',
    url: 'https://outlook.live.com',
    category: 'Mail & Domain',
  },
  {
    name: 'dnshe',
    domain: 'my.dnshe.com',
    url: 'https://my.dnshe.com/clientarea.php',
    category: 'Mail & Domain',
  },
  {
    name: 'us kg',
    domain: 'dash.domain.digitalplat.org',
    url: 'https://dash.domain.digitalplat.org/auth/login?next=%2Fpanel%2Fmain%3Fpage%3D%2Fpanel%2Foverview',
    category: 'Mail & Domain',
  },
  {
    name: 'Zone.id',
    domain: 'www.zone.id',
    url: 'https://www.zone.id',
    category: 'Mail & Domain',
  },
  {
    name: 'Zoneabc',
    domain: 'zoneabc.net',
    url: 'https://zoneabc.net',
    category: 'Mail & Domain',
  },
  {
    name: 'HiDNS',
    domain: 'www.hidoha.net',
    url: 'https://www.hidoha.net',
    category: 'Mail & Domain',
  },
  {
    name: 'L53',
    domain: 'customer.l53.net',
    url: 'https://customer.l53.net',
    category: 'Mail & Domain',
  },
  {
    name: 'netlib',
    domain: 'www.netlib.re',
    url: 'https://www.netlib.re',
    category: 'Mail & Domain',
  },
  {
    name: 'dynv6',
    domain: 'dynv6.com',
    url: 'https://dynv6.com',
    category: 'Mail & Domain',
  },
  {
    name: 'bluu',
    domain: 'bluu.pl',
    url: 'https://bluu.pl',
    category: 'Mail & Domain',
  },
  {
    name: 'cloudns',
    domain: 'www.cloudns.net',
    url: 'https://www.cloudns.net',
    category: 'Mail & Domain',
  },
  {
    name: 'Dns he',
    domain: 'dns.he.net',
    url: 'https://dns.he.net/?hosted_dns_zoneid=1257683&menu=edit_zone&hosted_dns_editzone#',
    category: 'Mail & Domain',
  },
  {
    name: 'tunnelbroker',
    domain: 'tunnelbroker.net',
    url: 'https://tunnelbroker.net',
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
    domain: 'nic.ua',
    url: 'https://nic.ua/en',
    category: 'Mail & Domain',
  },
  {
    name: 'Spaceship',
    domain: 'www.spaceship.com',
    url: 'https://www.spaceship.com',
    category: 'Mail & Domain',
  },
  {
    name: 'Sitelutions',
    domain: 'sitelutions.com',
    url: 'https://sitelutions.com',
    category: 'Mail & Domain',
  },
  {
    name: 'tempumail',
    domain: 'tempumail.com',
    url: 'https://tempumail.com',
    category: 'Mail & Domain',
  },
  {
    name: 'etempmail',
    domain: 'etempmail.com',
    url: 'https://etempmail.com/email?id=1',
    category: 'Mail & Domain',
  },
  {
    name: '临时邮箱',
    icon: '📨',
    domain: 'www.linshi-email.com',
    url: 'https://www.linshi-email.com',
    category: 'Mail & Domain',
  },
  {
    name: 'mffac',
    domain: 'www.mffac.com',
    url: 'https://www.mffac.com',
    category: 'Mail & Domain',
  },
];

const bookmarkTools: Bookmark[] = [
  {
    name: 'tzx订阅转换',
    icon: '🦀',
    domain: 'www.subweb-modify.zone.id',
    url: 'https://www.subweb-modify.zone.id',
    category: 'Tools',
  },
  {
    name: 'MISUB',
    icon: '🕸️',
    domain: 'misub.tzx.hidns.co',
    url: 'https://misub.tzx.hidns.co',
    category: 'Tools',
  },
  {
    name: '短链接生成器',
    icon: '📎',
    domain: 'urls.tzxls.ggff.net',
    url: 'https://urls.tzxls.ggff.net',
    category: 'Tools',
  },
  {
    name: 'Base64编码转换',
    icon: '🐏',
    domain: 'www.tzxcc.zone.id',
    url: 'https://www.tzxcc.zone.id',
    category: 'Tools',
  },
  {
    name: 'CF优选/网络信息',
    icon: '🦀',
    domain: 'ipcheckinfo.zone.id',
    url: 'https://ipcheckinfo.zone.id',
    category: 'Tools',
  },
  {
    name: 'checkproxyip',
    domain: 'https://check.proxyip.cmliussss.net',
    category: 'Tools',
  },
  {
    name: 'checkadblock',
    domain: 'https://checkadblock.ru',
    category: 'Tools',
  },
  {
    name: 'smser',
    domain: 'smser.net',
    url: 'https://smser.net',
    category: 'Tools',
  },
  {
    name: 'itdog-在线ping',
    domain: 'www.itdog.cn',
    url: 'https://www.itdog.cn/tcping',
    category: 'Tools',
  },
  {
    name: 'ping0',
    domain: 'ping0.cc',
    url: 'https://ping0.cc',
    category: 'Tools',
  },
  { name: 'ip.sb', domain: 'ip.sb', url: 'https://ip.sb', category: 'Tools' },
  {
    name: 'ip查询网',
    domain: 'site.ip138.com',
    url: 'https://site.ip138.com/13.230.34.30',
    category: 'Tools',
  },
  {
    name: '文本图标生成',
    domain: 'favicon.io',
    url: 'https://favicon.io/favicon-generator',
    category: 'Tools',
  },
  {
    name: '图标库',
    domain: 'icon-icons.com',
    url: 'https://icon-icons.com',
    category: 'Tools',
  },
  {
    name: 'png-to-svg',
    domain: 'www.adobe.com',
    url: 'https://www.adobe.com/cn/express/feature/image/convert/png-to-svg',
    category: 'Tools',
  },
];

const bookmarkCloud: Bookmark[] = [
  {
    name: 'Cloudflare',
    domain: 'dash.cloudflare.com',
    url: 'https://dash.cloudflare.com',
    category: 'Cloud',
  },
  {
    name: 'zeabur',
    domain: 'zeabur.com',
    url: 'https://zeabur.com',
    category: 'Cloud',
  },
  {
    name: 'clawcloud',
    domain: 'claw.cloud',
    url: 'https://claw.cloud',
    category: 'Cloud',
  },
  {
    name: 'Huggingface',
    domain: 'huggingface.co',
    url: 'https://huggingface.co',
    category: 'Cloud',
  },
  {
    name: 'vercel',
    domain: 'vercel.com',
    url: 'https://vercel.com',
    category: 'Cloud',
  },
];

const bookmarkDev: Bookmark[] = [
  {
    name: '佬王专属页',
    domain: 'nav.eooce.com',
    url: 'https://nav.eooce.com',
    category: 'Dev',
  },
  {
    name: 'CF优选域名',
    domain: 'cf.090227.xyz',
    url: 'https://cf.090227.xyz',
    category: 'Dev',
  },
  {
    name: 'CF IP优选排名',
    domain: 'blog.upx8.com',
    url: 'https://blog.upx8.com/app/cfip',
    category: 'Dev',
  },
  {
    name: 'CF优选IPV4地址',
    domain: 'www.wetest.vip',
    url: 'https://www.wetest.vip/page/cloudflare/address_v4.html',
    category: 'Dev',
  },
  {
    name: 'CF优选IP',
    domain: 'stock.hostmonit.com',
    url: 'https://stock.hostmonit.com/CloudFlareYes',
    category: 'Dev',
  },
  {
    name: 'zrf博客',
    domain: 'blog.zrf.me',
    url: 'https://blog.zrf.me/p/Cloudflare-Snippets',
    category: 'Dev',
  },
  {
    name: '天诚订阅部署面板',
    icon: '',
    domain: 'snis.sosorg.nyc.mn',
    url: 'https://snis.sosorg.nyc.mn',
    category: 'Dev',
  },
  {
    name: 'senflare节点订阅',
    icon: '',
    domain: 'www.senflarelink.de5.net',
    url: 'https://www.senflarelink.de5.net/user',
    category: 'Dev',
  },
  {
    name: 'ccfly节点订阅',
    icon: '',
    domain: 'ccfly.me',
    url: 'https://ccfly.me/user#account',
    category: 'Dev',
  },
  {
    name: 'ECH-CF',
    domain: 'github.com',
    url: 'https://github.com/ethgan/ECH-CF',
    category: 'Dev',
  },
  {
    name: 'newsnow',
    domain: 'github.com',
    url: 'https://github.com/ourongxing/newsnow',
    category: 'Dev',
  },
  {
    name: 'CF IP优选',
    domain: 'vpn.vpnc.eu.org',
    url: 'https://vpn.vpnc.eu.org',
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
