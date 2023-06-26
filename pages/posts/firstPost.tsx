export default function FirstPost() {
  return <h1>First Post</h1>
}

FirstPost.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <div>
      <h5>First Post Head</h5>
      <section>
        {page}
      </section>
    </div>
  )
}