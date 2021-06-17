import Head from 'next/head';
import { MainLayout } from '../components/layouts';

export default function Home() {
  return (
    <MainLayout>
      <div className="container">
        <Head>
          <title> Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <p className="description">Learn more about nextjs</p>
        </main>
        <style jsx global>{``}</style>
      </div>
    </MainLayout>
  );
}
