import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { colors } from "../styles/colors";

const footerLinks = [
  { name: "Home", path: "/whispering-woods" },
  { name: "About Us", path: "/aboutus" },
  { name: "Leader Board", path: "/player-journey" },
  { name: "Contact Us", path: "/contactus" },
];

function FooterLinkColumn({ title, links }) {
  return (
    <div>
      <p className="text-white font-bold text-sm mb-3">{title}</p>
      <ul className="space-y-2">
        {links.map((l) => (
          <li key={l.name}>
            <Link to={l.path} className="text-xs hover:text-[#d9b74f] transition-colors" style={{ color: colors.textMuted }}>
              {l.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer
      className="px-6 md:px-10 py-10 flex flex-col md:flex-row md:items-start md:justify-between gap-8"
      style={{ backgroundColor: colors.nav }}
    >
      <div className="max-w-xs">
        <Logo />
        <p className="text-xs mt-4 italic" style={{ color: colors.textMuted }}>
          "Enhance your speaking and learning through interactive quizzes."
        </p>
      </div>
      <div className="flex gap-12">
        <FooterLinkColumn title="Quick Links" links={footerLinks} />
        <FooterLinkColumn title="Features" links={footerLinks} />
      </div>
    </footer>
  );
}