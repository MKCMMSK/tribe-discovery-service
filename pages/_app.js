function MyApp({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
        body {
          margin: 0;
          min-height: 100vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
      `}</style>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
