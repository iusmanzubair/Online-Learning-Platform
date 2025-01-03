import { Home } from "./components/Home"
import { MaxWidthWrapper } from "./components/MaxWidthWrapper"
import { Searchbar } from "./components/Searchbar"

function App() {
  return (
    <MaxWidthWrapper>
      <div className="w-full h-full mt-36 flex flex-col items-center justify-center">
        <Home />
        <Searchbar />
     </div>
    </MaxWidthWrapper>
  )
}

export default App
