import Head from 'next/head';
import { useContext } from "react";
import { GlobalContext } from "@utils/GlobalContext";
import Link from 'next/link';
import Code from '@components/Code';

export default function Docs() {
  const { darkMode, setDarkMode } = useContext(GlobalContext);

  return (
    <div>
      <Head>
        <title>Docs | Image Blur Loader</title>
        <meta name="description" content="Image Blur Loader" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="dark:bg-neutral-900 min-h-screen">

        <div className="mx-auto max-w-7xl py-8 px-8 xl:px-0">
          <div className="flex items-center justify-between mb-8">
            <h1 className="dark:text-white text-2xl font-semibold">
              Image Blur Loader
              <Link href="/">
                <a className="text-blue-500 hover:text-blue-600 transition-all cursor-pointer text-base pl-2">
                  Home
                </a>
              </Link>
            </h1>
            <div onClick={() => setDarkMode(!darkMode)} className="transition-all cursor-pointer w-12 h-7 dark:bg-blue-500 bg-neutral-200 rounded-full relative">
              <div className="h-5 w-5 bg-white rounded-full absolute top-1 transition-all dark:left-6 left-1"></div>
            </div>
          </div>

          <div>
            <Code name="components/BlurImage" code={`import Image from "next/image"
import { useState } from "react"

function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function BlurImage({ image }) {
  const [isLoading, setLoading] = useState(true)

  return (
    <a href={image.href} className="group" target="_blank" rel="noopener noreferrer">
      <div className="relative overflow-hidden rounded-lg h-64">
        <Image
          alt={'Images \${image.id}'}
          src={image.imageSrc}
          layout="fill"
          objectFit="cover"
          className={cn(
            'duration-700 ease-in-out group-hover:opacity-80',
            isLoading
              ? 'scale-110 blur-2xl grayscale'
              : 'scale-100 blur-0 grayscale-0'
          )}
          onLoadingComplete={() => setLoading(false)}
        />
      </div>
    </a>
  )
}`} />
          </div>

          <div>
            <Code name="pages/index" code={`import BlurImage from '@components/BlurImage';

export async function getServerSideProps(context) {
  const res = await fetch('\${process.env.API_ROUTE}/api/images');
  const images = await res.json();
  return {
    props: {
      images
    },
  }
}

export default function Home({images}) {
  return (
    <div className="grid grid-cols-1 gap-y-8 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
      {images.map((image) => (
        <BlurImage key={image.id} image={image} />
      ))}
    </div>
  )
}`} />
          </div>

          <div>
            <Code name="pages/api/images" code={`const images = [
  {
    id: 1,
    href: "https://unsplash.com/photos/X5REiD-cIlw",
    imageSrc: "https://images.unsplash.com/photo-1656268164012-119304af0c69?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 2,
    href: "https://unsplash.com/photos/z6BYp6it5Rg",
    imageSrc: "https://images.unsplash.com/photo-1655853459092-a7bae19f9806?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 3,
    href: "https://unsplash.com/photos/t9MP5ZyTxlI",
    imageSrc: "https://images.unsplash.com/photo-1506368670575-2ecb8dd6d86e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
  }
]

export default function handler(req, res) {
  res.status(200).json(images)
}`} />
          </div>

        </div>

      </main>
    </div>
  )
}

