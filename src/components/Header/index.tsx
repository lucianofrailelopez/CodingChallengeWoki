import Link from 'next/link';
import { Login } from '../Login';
import { SearchComponent } from '../Search';
import { SelectComponent } from "@/components/Select";
import { SwitchComponent } from '../Switch';

export const Header = () => {
    return (
        <header className="flex w-full flex-col items-center gap-2 py-4 px-10 bg-[#fff] border-b dark:bg-[#000] md:flex-row md:justify-between">
            <Link className="text-[#FF6F61] text-2xl" href={'/'}>MOVIEFLIX</Link>
            <SelectComponent />
            <SwitchComponent />
            <SearchComponent />
            <Login />
        </header >
    );
};