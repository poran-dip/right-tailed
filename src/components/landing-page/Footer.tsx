import Link from "next/link"

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-slate-50/60 dark:bg-slate-900/60 backdrop-blur-md">
      <div className="container mx-auto px-6 py-6 lg:py-10">
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-8 text-sm">
          <div className="col-span-2 space-y-3 text-left">
            <h3 className="text-lg font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              RightTailed
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Data-driven exam prep using past questions, topic weightage,
              and smart prioritization.
            </p>
          </div>

          <div className="col-span-1 flex flex-col items-start gap-2">
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              Product
            </span>
            <Link href="#features" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
              Features
            </Link>
            <Link href="#how-it-works" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
              How it works
            </Link>
            <Link href="#benefits" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
              Benefits
            </Link>
          </div>

          <div className="col-span-1 flex flex-col items-start gap-2">
            <span className="font-semibold text-gray-900 dark:text-gray-100">
             Team
            </span>
            <Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
              About Us
            </Link>
            <Link href="/terms" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
              Terms
            </Link>
          </div>

          <div className="col-span-1 flex flex-col items-start gap-2">
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              Resources
            </span>
            <Link href="/docs" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
              Documentation
            </Link>
            <Link href="https://github.com/poran-dip/right-tailed" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
              View on GitHub
            </Link>
          </div>

          <div className="col-span-1 lg:hidden" />

          <div className="col-span-2 -mx-6 lg:mx-0 border-t border-slate-900/40 dark:border-slate-100/40 pt-4 lg:pt-0 lg:border-t-0 lg:col-span-1 flex flex-col justify-center items-center lg:items-end text-center lg:text-right gap-2 text-gray-600 dark:text-gray-400">
            <p>Built by <span className="font-medium">Pyroflies</span></p>
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
