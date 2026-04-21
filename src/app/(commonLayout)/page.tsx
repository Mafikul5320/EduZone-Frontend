import CollaboratorsSection from "@/components/modules/home/Collaborators"
import Hero from "@/components/modules/home/heroSection"
import HowItWorks from "@/components/modules/home/howItWork"
import { TestimonialsSection } from "@/components/modules/home/studentReview"



function Home() {
  return (
    <div>
      <Hero />
      <TestimonialsSection />
      <HowItWorks />
      <CollaboratorsSection />
    </div>
  )
}
export default Home