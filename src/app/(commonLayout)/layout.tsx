import Footer from "@/components/layout/Footer"
import Navbar from "@/components/layout/Navber"

function layout({ children }: { children: React.ReactNode }) {
    return (
        <div >
            <Navbar />
            <div className="min-h-[calc(100vh-343px)]">
                {children}
                
            </div>
            <Footer />
        </div>
    )
}
export default layout