import React from 'react';
import ThemeToggle from './ThemeToggle';
import SearchBar from './SearchBar';
import CategoriesLinks from './CategoryLinks';
import { categories } from '../../utils/categoryUtils';

function Header({setSearchTerm}) {
    const links = [
        { name: 'News', path: '/' },
        { name: 'Articles', path: '/articles' },
    ];

    return (
        <div className="bg-white text-white dark:bg-darkgray600 pt-2 text-center transition-all border-b-[1px] border-darkgray300 dark:border-[#3c4043] xl:pb-0 pb-2 sticky top-0 z-10">
            <div className="flex xl:block container justify-center justify-items-center mx-auto px-5 space-y-5">
                {/* Top bar with SearchBar and ThemeToggle */}
                <div className="flex gap-3">
                    <SearchBar setSearchTerm={setSearchTerm} />
                    <ThemeToggle />
                </div>

                <CategoriesLinks categories={categories} links={links} />
            </div>
        </div>
    );
}

export default Header;
