import React from "react";
import Logo from "./Logo";
import { colors } from "../styles/colors";

const footerLinks = ["Home", "About Us", "Leader Board", "Contact Us"];

function FooterLinkColumn({ title, links }) {
  return (
    <div>
      <p className="text-white font-bold text-sm mb-3">{title}</p>
      <ul className="space-y-2">
        {links.map((l) => (
          <li key={l}>
            <a href="#" className="text-xs underline" style={{ color: colors.textMuted }}>
              {l}
            </a>
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