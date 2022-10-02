import Head from 'next/head';
import Link from 'next/link';

import './MainLayout.module.scss';

type AppProps = {
  children: React.ReactElement | React.ReactElement[];
  home?: boolean;
  post?: boolean;
  siteTitle?: string;
};

export function MainLayout({
  children,
  home = false,
  post = false,
  siteTitle = 'Nextjs'
}: AppProps): React.ReactElement {
  return (
    <div className="w-full">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Learn how to build a personal website using Next.js" />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <div className="w-full text-gray-700 border-b-2 bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800">
        <div
          x-data="{ open: false }"
          className="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
          <div className="p-4 flex flex-row items-center justify-between">
            <a
              href="/"
              className="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline">
              Next Js
            </a>
          </div>
          <nav className="flex-col flex-grow pb-4 md:pb-0 hidden md:flex md:justify-end md:flex-row">
            <Link href="/posts">
              <a className="px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-gray-200 rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                Blog
              </a>
            </Link>
          </nav>
        </div>
      </div>
      <main className='min-h-screen'>{children}</main>
      {(!home && !post) && (
        <div className="px-12 py-10">
          <Link href="/">
            <a className='text-secondary'>← Back to home</a>
          </Link>
        </div>
      )}
      {post && (
        <div className="px-12 py-10">
          <Link href="/posts">
            <a className='text-secondary'>← Back to Post List</a>
          </Link>
        </div>
      )}
      <footer className='px-12 py-2 bg-light-300 text-info'>
        Let's learn Nextjs
      </footer>
    </div>
  );
}
