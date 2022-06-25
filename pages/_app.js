function MyApp({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
        body {
          margin: 0;
          min-height: 100vh;
          width: 100vw;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          font-family: Euclid Circular B,sans-serif;
        }
      `}</style>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
