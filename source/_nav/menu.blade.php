<nav class="hidden lg:flex items-center justify-end text-lg">
    <a title="{{ $page->siteName }} Blog" href="/blog"
        class="ml-6 text-gray-700 hover:text-blue-600 {{ $page->isActive('/blog') ? 'active text-blue-600' : '' }}">
        Blog
    </a>

    <a title="{{ $page->siteName }} Speaking" href="/speaking"
        class="ml-6 text-gray-700 hover:text-blue-600 {{ $page->isActive('/speaking') ? 'active text-blue-600' : '' }}">
        Speaking
    </a>

    <a title="{{ $page->siteName }} Project" href="/project"
       class="ml-6 text-gray-700 hover:text-blue-600 {{ $page->isActive('/project') ? 'active text-blue-600' : '' }}">
        Project
    </a>

    <a title="{{ $page->siteName }} Contact" href="/contact"
        class="ml-6 text-gray-700 hover:text-blue-600 {{ $page->isActive('/contact') ? 'active text-blue-600' : '' }}">
        Contact
    </a>
</nav>
