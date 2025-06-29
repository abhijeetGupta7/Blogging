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
    <Footer container className="border border-t-8 border-teal-500">
      <div className="w-full mx-auto px-4">

        {/* Top section with brand and footer columns */}
        <div className="grid w-full justify-between sm:flex">
          <div>
            {/* Brand name */}
            <Link
              to="/"
              className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg">
                Abhijeet's
              </span>
              <span className="text-black">Blog</span>
            </Link>
          </div>

          {/* Footer sections */}
          <div className="grid grid-cols-2 mt-5 gap-8 sm:mt-6 sm:grid-cols-3 sm:gap-6">
            {/* About section */}
            <div>
              <FooterTitle title="About" />
              <FooterLinkGroup col>
                <FooterLink href="/about">Abhijeet's Blog</FooterLink>
                <FooterLink
                  href="https://linkedin.com/in/abhijeetgupta1204"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </FooterLink>
              </FooterLinkGroup>
            </div>

            {/* Follow us section */}
            <div>
              <FooterTitle title="Follow Me" />
              <FooterLinkGroup col>
                <FooterLink
                  href="https://github.com/abhijeetGupta7"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </FooterLink>
                <FooterLink
                  href="https://portfolio-lovat-psi-50.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Portfolio
                </FooterLink>
              </FooterLinkGroup>
            </div>

            {/* Legal section */}
            <div>
              <FooterTitle title="Legal" />
              <FooterLinkGroup col>
                <FooterLink href="#">Privacy Policy</FooterLink>
                <FooterLink href="#">Terms &amp; Conditions</FooterLink>
              </FooterLinkGroup>
            </div>
          </div>
        </div>

        {/* Bottom copyright and social icons */}
        <div className="w-full sm:flex sm:items-center sm:justify-between mt-3">
          <FooterCopyright
            href="/"
            by="Abhijeet's Blog"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 sm:mt-2 sm:justify-center">
            <FooterIcon
              href="https://github.com/abhijeetGupta7"
              icon={BsGithub}
              target="_blank"
              rel="noopener noreferrer"
            />
            <FooterIcon
              href="https://linkedin.com/in/abhijeetgupta1204"
              icon={BsLinkedin}
              target="_blank"
              rel="noopener noreferrer"
            />
            <FooterIcon
              href="https://portfolio-lovat-psi-50.vercel.app"
              icon={BsGlobe}
              target="_blank"
              rel="noopener noreferrer"
            />
          </div>
        </div>
      </div>
    </Footer>
  );
}
