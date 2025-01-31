import { Link } from 'react-router'
import './App.css'

function InterfaceCard({
  imageUrl, caption
}) {
  return <div className="relative grid h-[25rem] max-w-lg flex-col items-end justify-center overflow-hidden rounded-lg bg-white mx-2">
    <div className={`absolute inset-0 m-0 h-full w-full overflow-hidden rounded-none bg-transparent bg-cover bg-center`} style={{backgroundImage: `url(${imageUrl})`}}>
      <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
    </div>
    <div className="relative text-center p-6 px-6 py-14 md:px-12">
      <h2 className="mb-6 text-3xl font-medium text-white">
        {caption}
      </h2>
    </div>
  </div>;

}

function App() {
  return (
    <>
      <div className='flex items-center justify-center flex-col w-[100vw]'>
        <div className='text-4xl font-bold' >
          Choose an Interface
        </div>

        <div className='flex mt-10'>
          <InterfaceCard imageUrl={"/assets/visual.png"} caption={"Visual Programming"} />
          <Link to="/blockprogramming">
            <InterfaceCard imageUrl={"/assets/block.png"} caption={"Block Programming"} />
          </Link>
          <InterfaceCard imageUrl={"/assets/code.png"} caption={"Textual Programming"} />
        </div>
      </div>
    </>
  )
}

export default App
