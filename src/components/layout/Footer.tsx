"use client"

import { ArrowUp } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-background text-foreground border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Top Banner */}
        <div className="bg-muted rounded-2xl p-6 flex items-center justify-between mb-12">
          <div className="flex items-center gap-2 text-lg font-semibold">
            📘 EducateX
          </div>
          <h2 className="text-lg font-semibold">
            SUBSCRIBE <span className="text-primary">NEWSLETTER</span>
          </h2>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Get In Touch */}
          <div>
            <h3 className="font-semibold mb-4">Get In Touch</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Educate the ultimate destination for transforming without standards
            </p>
            <p className="text-sm">📞 +123 (4567) 890</p>
            <p className="text-sm mt-2">✉️ example@gmail.com</p>
          </div>

          {/* Online Platform */}
          <div>
            <h3 className="font-semibold mb-4">Online Platform</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>→ About Us</li>
              <li>→ Our Courses</li>
              <li>→ Instructors</li>
              <li>→ Enroll Now</li>
              <li>→ Career</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>→ Latest Blog</li>
              <li>→ Our Gallery</li>
              <li>→ Contact Us</li>
              <li>→ Privacy Policy</li>
              <li>→ FAQ s</li>
            </ul>
          </div>

          {/* Recent Posts */}
          <div>
            <h3 className="font-semibold mb-4">Recent Posts</h3>

            <div className="flex gap-3 mb-4">
              <div className="w-14 h-14 bg-muted rounded-md" />
              <div>
                <p className="text-sm font-medium">
                  10 Essential Strategies for Ramadan
                </p>
                <p className="text-xs text-primary">September 28, 2025</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-14 h-14 bg-muted rounded-md" />
              <div>
                <p className="text-sm font-medium">
                  A Journey Through Wisdom
                </p>
                <p className="text-xs text-primary">September 28, 2025</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-border mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© 2025 Educate. Designed by Dream IT Solution</p>

          <div className="flex gap-4 mt-4 md:mt-0">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">f</div>
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">x</div>
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">ig</div>
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">p</div>
          </div>
        </div>

      </div>

      {/* Scroll To Top */}
      <button className="fixed bottom-6 right-6 bg-primary text-primary-foreground p-3 rounded-full shadow-lg">
        <ArrowUp size={18} />
      </button>
    </footer>
  )
}