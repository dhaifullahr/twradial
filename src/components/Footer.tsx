const Footer = () => {
  return (
    <footer className="w-full bg-slate-800 text-slate-400 border-t border-white/10 mt-20 py-8 px-6 text-sm">
      <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        
        <div className="space-y-1">
          <p className="font-medium text-white">© {new Date().getFullYear()} twradial</p>
          <p>
            Made with ❤️ by{" "}
            <a
              href="mailto:ouh@ro.ru"
              className="hover:underline text-blue-400"
            >
              Dhaifullah
            </a>
          </p>
          <p>
            Contact me on{" "}
            <a
              href="https://x.com/dhaifulahr"
              className="hover:underline text-white"
            >
              @X
            </a>
          </p>
        </div>


        <div className="text-right space-y-1 text-xs">
          <p>
            Icons by{" "}
            <a
              href="https://phosphoricons.com/"
              className="underline hover:text-white"
            >
              Phosphor Icons
            </a>{" "}
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
