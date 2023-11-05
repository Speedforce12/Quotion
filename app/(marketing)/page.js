import Banner from "./_components/Banner";
import Footer from "./_components/Footer";
import Header from "./_components/Header";

export default function Home() {
  return (
    <main className='flex flex-col min-h-full dark:bg-[#1F1F1F]'>
      <div className='flex items-center justify-center md:justify-start gap-y-8  flex-col flex-1 px-6 w-full text-center pb-8'>
        <Header />
        <Banner />
      </div>
      <Footer />
    </main>
  );
}
