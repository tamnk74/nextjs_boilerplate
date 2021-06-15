import Head from 'next/head';
import Link from 'next/link';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';

import './main-layout.module.scss';

type AppProps = {
  children: React.ReactElement | React.ReactElement[];
  home?: boolean;
  siteTitle?: string;
};

export function MainLayout({
  children,
  home = false,
  siteTitle = 'Nextjs'
}: AppProps): React.ReactElement {
  return (
    <div className="container">
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

      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/to-do">To do</Nav.Link>
          <Nav.Link href="/posts">Posts</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-info">Search</Button>
        </Form>
      </Navbar>
      <main>{children}</main>
      {!home && (
        <div className="back-to-home">
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  );
}
