export default function Header() {
    return (
<header>
    <nav className="px-4 lg:px-6 py-2.5 bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <a href="/" className="flex items-center">
                <span className="self-center text-xl font-semibold whitespace-nowrap text-white">Doc Sync</span>
            </a>
            <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                    <li>
                        <a href="/" className="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 text-white" aria-current="page">Home</a>
                    </li>
                    <li>
                        <a href="/notes" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 text-gray-400 hover:text-white hover:bg-gray-700 hover:text-white hover:bg-transparent dark:border-gray-700">Notes</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</header>
    );
  }
  