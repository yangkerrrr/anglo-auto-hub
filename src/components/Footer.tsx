import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";
import logo from "@/assets/anglo-auto-logo.png";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <img src={logo} alt="Anglo Auto" className="h-12 brightness-0 invert" />
            <p className="text-background/70 text-sm leading-relaxed">
              Anglo Auto - Your trusted partner for quality pre-owned vehicles in Cape Town. 
              Great prices, flexible finance, and exceptional service.
            </p>
            <div className="flex gap-4 pt-2">
              <a
                href="https://www.facebook.com/angloautoza"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/anglo.auto/?hl=en"
                className="h-10 w-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { href: "/showroom", label: "Cars for Sale" },
                { href: "/finance", label: "Finance Calculator" },
                { href: "/contact", label: "Contact Us" },
                { href: "/admin", label: "Admin Panel" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-background/70 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-background/70 text-sm">
                  35 Belgravia Road,<br />Athlone, Cape Town
                </span>
              </li>
              <li>
                <a href="tel:0216971063" className="flex items-center gap-3 text-background/70 hover:text-primary transition-colors text-sm">
                  <Phone className="h-5 w-5 text-primary" />
                  021 697 1063
                </a>
              </li>
              <li>
                <a href="mailto:info@angloauto.co.za" className="flex items-center gap-3 text-background/70 hover:text-primary transition-colors text-sm">
                  <Mail className="h-5 w-5 text-primary" />
                  info@angloauto.co.za
                </a>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h4 className="font-display font-bold text-lg mb-6">Business Hours</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between text-background/70">
                <span>Monday - Friday</span>
                <span>08:00 - 17:30</span>
              </li>
              <li className="flex justify-between text-background/70">
                <span>Saturday</span>
                <span>08:00 - 13:00</span>
              </li>
              <li className="flex justify-between text-background/70">
                <span>Sunday</span>
                <span>Closed</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-background/10">
        <div className="container py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-background/50 text-sm text-center md:text-left">
            © {new Date().getFullYear()} Anglo Auto. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <span className="text-background/50">No driver's license needed</span>
            <span className="text-background/50">•</span>
            <span className="text-background/50">Finance available</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
