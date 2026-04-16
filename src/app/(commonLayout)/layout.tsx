import Navbar from "@/components/layout/navber"

function layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Navbar />
            {children}

        </div>
    )
}
export default layout