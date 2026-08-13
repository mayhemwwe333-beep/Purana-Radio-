import { InstagramIcon, MailIcon, YoutubeIcon } from "./icons";

// TODO: swap these for real links.
const links = [
  { label: "Instagram", href: "#", Icon: InstagramIcon },
  { label: "YouTube", href: "#", Icon: YoutubeIcon },
  { label: "Email", href: "mailto:hello@example.com", Icon: MailIcon },
];

export default function SocialLinks() {
  return (
    <div className="flex items-center gap-1.5">
      {links.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noreferrer" : undefined}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/30 text-cream/80 backdrop-blur-md transition hover:text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber"
        >
          <Icon className="h-4 w-4" />
        </a>
      ))}
    </div>
  );
}
