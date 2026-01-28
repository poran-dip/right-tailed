import Link from "next/link"

const Footer = () => {
  return (
    <footer className="bg-purple-600 dark:bg-slate-900 text-slate-100">
      <div className="container mx-auto px-6 py-8 lg:py-12">
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-8 text-sm">
          <div className="col-span-2 space-y-3 text-left">
            <h3 className="text-lg font-bold text-white">
              RightTailed
            </h3>
            <p className="text-slate-200 leading-relaxed max-w-sm">
              Data-driven exam preparation using past questions,
              topic weightage, and focused prioritization.
            </p>
          </div>
          <div className="flex flex-col items-start gap-2">
            <span className="font-semibold text-white">
              Product
            </span>
            <Link href="#features" className="text-slate-200 hover:text-white transition">
              Features
            </Link>
            <Link href="#how-it-works" className="text-slate-200 hover:text-white transition">
              How it works
            </Link>
            <Link href="#benefits" className="text-slate-200 hover:text-white transition">
              Benefits
            </Link>
          </div>
          <div className="flex flex-col items-start gap-2">
            <span className="font-semibold text-white">
              Team
            </span>
            <Link href="/about" className="text-slate-200 hover:text-white transition">
              About Us
            </Link>
            <Link href="/terms" className="text-slate-200 hover:text-white transition">
              Terms
            </Link>
          </div>
          <div className="flex flex-col items-start gap-2">
            <span className="font-semibold text-white">
              Resources
            </span>
            <Link href="/docs" className="text-slate-200 hover:text-white transition">
              Documentation
            </Link>
            <Link
              href="https://github.com/poran-dip/right-tailed"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-200 hover:text-white transition"
            >
              GitHub
            </Link>
          </div>

          <div className="col-span-2 lg:hidden" />
          <div className="col-span-2 lg:col-span-1 lg:ml-auto flex flex-col justify-center items-center lg:items-end text-center lg:text-right gap-2 text-slate-200 border-t border-white/20 pt-4 lg:border-t-0">
            <p>
              Built by <span className="font-medium text-white">Pyroflies</span>
            </p>
            <p>© {new Date().getFullYear()} All rights reserved</p>
            <p className="text-xs opacity-80">
              Built during Pandu College Hackathon 2026
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
