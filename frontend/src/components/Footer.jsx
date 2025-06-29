import { Link } from "react-router-dom";
import {
  Footer,
  FooterCopyright,
  FooterIcon,
  FooterLink,
  FooterLinkGroup,
  FooterTitle,
} from "flowbite-react";
import { BsGithub, BsLinkedin, BsGlobe } from "react-icons/bs";

export default function FooterComponent() {
  return (
    <Footer
      container
      className="border-t-8 border-teal-500 bg-gradient-to-br from-indigo-50 via-white to-pink-50 shadow-lg"
    >
      <div className="w-full mx-auto px-4 py-8">
        {/* Top section with brand and footer columns */}
        <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-8">
          {/* Brand name */}
          <Link
            to="/"
            className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
          >
            <span className="px-2 py-1 bg-gradient-to-r from bg-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg">
              Abhijeet's
            </span>
            <span className="text-black">Blog</span>
          </Link>

          {/* Footer sections */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-12">
            {/* About section */}
            <div>
              <FooterTitle title="About" className="text-indigo-600" />
              <FooterLinkGroup col>
                <FooterLink
                  href="/about"
                  className="hover:text-indigo-500 transition-colors"
                >
                  Abhijeet's Blog
                </FooterLink>
                <FooterLink
                  href="https://linkedin.com/in/abhijeetgupta1204"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-indigo-500 transition-colors"
                >
                  LinkedIn
                </FooterLink>
              </FooterLinkGroup>
            </div>

            {/* Follow Me section */}
            <div>
              <FooterTitle title="Follow Me" className="text-purple-600" />
              <FooterLinkGroup col>
                <FooterLink
                  href="https://github.com/abhijeetGupta7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-purple-500 transition-colors"
                >
                  GitHub
                </FooterLink>
                <FooterLink
                  href="https://portfolio-lovat-psi-50.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-purple-500 transition-colors"
                >
                  Portfolio
                </FooterLink>
              </FooterLinkGroup>
            </div>

            {/* Legal section */}
            <div>
              <FooterTitle title="Legal" className="text-pink-600" />
              <FooterLinkGroup col>
                <FooterLink
                  href="#"
                  className="hover:text-pink-500 transition-colors"
                >
                  Privacy Policy
                </FooterLink>
                <FooterLink
                  href="#"
                  className="hover:text-pink-500 transition-colors"
                >
                  Terms &amp; Conditions
                </FooterLink>
              </FooterLinkGroup>
            </div>
          </div>
        </div>

        {/* Bottom copyright and social icons */}
        <div className="w-full flex flex-col sm:flex-row justify-between items-center mt-8 border-t pt-6 border-gray-200">
          <FooterCopyright
            href="/"
            by="Abhijeet's Blog"
            year={new Date().getFullYear()}
            className="text-gray-600"
          />
          <div className="flex gap-6 mt-4 sm:mt-0">
            <FooterIcon
              href="https://github.com/abhijeetGupta7"
              icon={BsGithub}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-600 transition-colors"
            />
            <FooterIcon
              href="https://linkedin.com/in/abhijeetgupta1204"
              icon={BsLinkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-700 transition-colors"
            />
            <FooterIcon
              href="https://portfolio-lovat-psi-50.vercel.app"
              icon={BsGlobe}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-600 transition-colors"
            />
          </div>
        </div>

        <div className="text-center mt-6 text-sm text-gray-500">
          Made with <span className="text-pink-500">♥</span> by{" "}
          <span className="font-semibold text-indigo-600">Abhijeet</span>
        </div>
      </div>
    </Footer>
  );
}
