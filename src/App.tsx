import { useCallback, useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn, getFavicon } from '@/lib/utils';
import { BackgroundVideo } from './components/BackgroundVideo';
import {
  bookmarks,
  googleIcon,
  navItems,
  searchEngines,
  type BookmarkWithFavicon,
  type NavItems,
  type SearchEngine,
} from '@/lib/const';

function App() {
  const [activeTab, setActiveTab] = useState<NavItems>('Home');
  const [activeSearchEngine, setActiveSearchEngine] = useState<SearchEngine>({
    label: 'Google',
    base: 'https://www.google.com/search?q=',
    icon: googleIcon,
  });

  const filteredBookmarks = useMemo<BookmarkWithFavicon[]>(() => {
    return bookmarks.reduce<BookmarkWithFavicon[]>((acc, bm) => {
      if (bm.category === activeTab) {
        acc.push({
          ...bm,
          favicon: getFavicon(bm.domain),
        });
      }
      return acc;
    }, []);
  }, [activeTab]);

  const BackInformation = useMemo(() => {
    const R2_URL = 'https://assets-cdn.tzx.cc.cd';
    const BgVideo = `${R2_URL}/video/girls.mp4`;
    const BgSmVideo = `${R2_URL}/video/originos.mp4`;
    const girlsPoster = `${R2_URL}/video/girls_poster.jpg`;
    const originosPoster = `${R2_URL}/video/originos_poster.jpg`;
    return { BgVideo, BgSmVideo, girlsPoster, originosPoster };
  }, []);

  const handleSearch = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && e.currentTarget.value.trim()) {
        const q = encodeURIComponent(e.currentTarget.value.trim());
        window.open(`${activeSearchEngine.base}${q}`, '_blank');
      }
    },
    [activeSearchEngine]
  );

  function handleClickNav(item: NavItems) {
    setActiveTab(item);
  }

  function handleClickEngine(eng: SearchEngine) {
    setActiveSearchEngine(eng);
  }

  return (
    <div className="relative h-screen flex flex-col overflow-hidden">
      <BackgroundVideo
        media="(min-width: 768px)"
        src={BackInformation.BgVideo}
        className="hidden md:block brightness-75"
        poster={BackInformation.girlsPoster}
      />
      <BackgroundVideo
        media="(max-width: 767px)"
        src={BackInformation.BgSmVideo}
        className="block md:hidden brightness-75"
        poster={BackInformation.originosPoster}
      />
      <div className="absolute inset-0 bg-black/50 z-[-1]" />
      <div className="flex flex-col w-full h-full">
        <nav className="flex-shrink-0 flex flex-wrap justify-center items-center mx-auto h-16 gap-x-3 md:gap-x-16 font-medium">
          {navItems.map((item) => (
            <button
              key={item}
              className={cn(
                'transition-colors rounded-sm px-3 py-1.5',
                activeTab === item
                  ? 'text-white border-b-2 border-blue-500 pb-1'
                  : 'text-gray-400 hover:text-white hover:bg-white/10',
                'text-sm md:text-base lg:text-base'
              )}
              onClick={() => handleClickNav(item)}
            >
              {item}
            </button>
          ))}
        </nav>

        <main className="flex-1 flex flex-col items-center p-4 sm:p-6 md:p-8 overflow-hidden">
          <div className="flex-shrink-0 w-full max-w-xl">
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {searchEngines.map((eng) => (
                <Button
                  key={eng.label}
                  variant="outline"
                  size="sm"
                  className={cn(
                    'border-none bg-black/30 border-white/20 text-gray-300 hover:bg-white/10 hover:text-white',
                    activeSearchEngine.label === eng.label
                      ? 'text-blue-600 hover:text-blue-600'
                      : ''
                  )}
                  onClick={() => handleClickEngine(eng)}
                >
                  {eng.label}
                </Button>
              ))}
            </div>
            <div className="w-full relative max-w-xl mb-8 md:mb-16">
              <Input
                placeholder={`${activeSearchEngine.label}搜索...`}
                className="border-none pl-12 pr-12 py-7 text-sm bg-black/50 border-white/20 text-white placeholder:text-gray-400 rounded-full shadow-2xl backdrop-blur-md"
                onKeyDown={handleSearch}
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <img
                src={activeSearchEngine.icon}
                alt={`${activeSearchEngine.label}图标`}
                className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
              />
            </div>
          </div>

          <div className="flex-1 w-full overflow-y-auto overscroll-contain px-2 sm:px-4 lg:px-8 pb-20">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4 sm:gap-6 md:gap-10 lg:gap-12 xl:gap-14 w-full max-w-7xl mx-auto">
              {filteredBookmarks.map((bm, i) => {
                return (
                  <a
                    key={i}
                    href={bm.url ?? '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-24"
                  >
                    <Card className="h-full border-none backdrop-blur-sm bg-white/10 hover:bg-white/25 transition-opacity duration-300 rounded-2xl overflow-hidden shadow-xl flex flex-col items-center justify-center p-5 gap-3">
                      {bm.icon ? (
                        <div className="text-[32px]/[32px]">{bm.icon}</div>
                      ) : bm.favicon ? (
                        <img
                          src={bm.favicon}
                          alt={bm.name}
                          className="w-8 h-8 rounded-lg object-contain"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-14 h-14 bg-gray-700 rounded-lg" />
                      )}
                      <span className="text-xs text-nowrap text-center text-gray-200 group-hover:text-white transition-colors">
                        {bm.name}
                      </span>
                    </Card>
                  </a>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
