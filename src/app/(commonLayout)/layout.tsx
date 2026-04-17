import Footer from "@/components/layout/Footer"
import Navbar from "@/components/layout/Navber"

function layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Navbar />
            {children}
            <Footer />
        </div>
    )
}
export default layout