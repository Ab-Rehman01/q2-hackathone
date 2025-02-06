// pages/products/[id].js

"use client";


import { useRouter } from 'next/navigation';  // Correct import for server components


const ProductPage = ({ product }) => {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>{product.title.rendered}</h1>
      <div dangerouslySetInnerHTML={{ __html: product.content.rendered }} />
      <img src={product.featured_media_url} alt={product.title.rendered} />
    </div>
  )
}

export async function getStaticPaths() {
  const res = await fetch('https://bullet-mart.net.pk/wp-json/wp/v2/product')
  const products = await res.json()

  const paths = products.map(product => ({
    params: { id: product.id.toString() }
  }))

  return { paths, fallback: true }
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://bullet-mart.net.pk/wp-json/wp/v2/product/${params.id}`)
  const product = await res.json()

  return {
    props: { product }
  }
}

export default ProductPage
